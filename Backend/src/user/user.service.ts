import { Game, Gender, PrismaClient, UserPreferences } from "@prisma/client";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "..";
import jwt from "jsonwebtoken";

const db = new PrismaClient();

type AccessTokenResult = {
  accessToken?: string;
  error?: string;
  usernameError?: string;
  emailError?: string;
  userNotFoundError?: string;
};

function createAccessToken(user: User): string {
  return jwt.sign(user, process.env.JWT_SECRET_TOKEN as string);
}

export async function fetchUserByUserName(username: string): Promise<AccessTokenResult> {
  try {
    const user = await db.user.findFirst({
      where: { username: { equals: username, mode: "insensitive" } },
      include: {
        preferences: {
          include: { games: true },
        },
      },
    });
    if (!user) {
      return { userNotFoundError: "No user found" };
    }

    const accessToken = createAccessToken(user);
    return { accessToken: accessToken };
  } catch (error: any) {
    return { error: "Internal server error" };
  }
}

export async function getUserByUsername(req: Request, res: Response) {
  const { username } = req.params;
  const userRes = await fetchUserByUserName(username);

  const { accessToken, userNotFoundError, error } = userRes;
  if (accessToken) {
    res.status(200).json({ accessToken: accessToken });
  } else if (userNotFoundError) {
    res.status(200).json({ userNotFoundError: "User does not exist" });
  } else if (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function checkExistingUser(userData: any): Promise<AccessTokenResult | undefined> {
  const existingUsername = await db.user.findUnique({
    where: { username: userData.username },
  });
  if (existingUsername) {
    return { usernameError: "Username already exists" };
  }

  const existingEmail = await db.user.findUnique({
    where: { email: userData.email },
  });
  if (existingEmail) {
    return { emailError: "Email already exists" };
  }

  return undefined;
}

export async function createUser(req: Request, res: Response): Promise<AccessTokenResult> {
  try {
    const { preferences, iat, ...userData } = req.body;
    const userRes = await checkExistingUser(userData);

    if (userRes?.usernameError || userRes?.emailError) {
      return {
        error: "User already exists",
        usernameError: userRes.usernameError,
        emailError: userRes.emailError,
      };
    }

    encryptPassword(userData);

    const createdUser = await createUserInDatabase(userData, preferences);
    const accessToken = createAccessToken(createdUser);

    return { accessToken: accessToken };
  } catch (error: any) {
    console.log(error);
    return { error: "Internal server error" };
  }
}

async function createUserInDatabase(userData: User, preferences: any): Promise<User> {
  const { id: userId, ...userDataWithoutId } = userData;
  const { id: preferencesId, userId: preferencesUserId, ...preferencesDataWithoutId } = preferences;

  return await db.user.create({
    data: {
      ...userDataWithoutId,
      preferences: {
        create: {
          ...preferencesDataWithoutId,
          games: {
            connect: preferences.games.map((game: any) => ({
              id: game.id,
            })),
          },
        },
      },
    },
    include: {
      preferences: {
        include: {
          games: true,
        },
      },
    },
  });
}


function encryptPassword(userData: User) {
  const { password } = userData;
  if (password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    userData.password = hash;
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { preferences, id, iat, ...userData } = req.body;
    const { username } = userData;
    const user = await db.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const usernameExists = await db.user.findFirst({
      where: {
        username: { equals: username, mode: "insensitive" },
        id: { not: id },
      },
    });
    if (usernameExists) {
      return res.status(400).json({ usernameError: "Username is already taken by another user" });
    }

    const updatedUser = await updateUserInDatabase(userData, preferences);
    const accessToken = createAccessToken(updatedUser);

    res.status(200).json({ accessToken: accessToken });
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUserInDatabase(userData: User, preferences: any) {
  const { email } = userData;
  const { id, userId, ...preferencesOmitID } = preferences;

  return await db.user.update({
    where: { email },
    data: {
      ...userData,
      preferences: {
        delete: true,
        create: {
          ...preferencesOmitID,
          games: {
            connect: preferencesOmitID.games.map((game: any) => ({
              id: game.id,
            })),
          },
        },
      },
    },
    include: {
      preferences: {
        include: {
          games: true,
        },
      },
    },
  });
}

export async function findMatchingUsers(req: Request, res: Response) {
  const user = req.body;

  if (!user.preferences || !user.preferences.games || user.preferences.games.length === 0) {
    res.status(200).json({ matchError: "User has no games" });
    return;
  }

  const { preferences } = user;
  const gameIds: number[] = preferences.games.map((game: Game) => game.id);

  try {
    const matchedUsers = await getMatchingUsers(user, preferences, gameIds);

    if (matchedUsers.length === 0) {
      res.status(200).json({ matchError: "No match found" });
      return;
    }

    const filteredUsers = matchedUsers.map((user) => {
      if (user.preferences) {
        user.preferences.games = user.preferences.games.filter((game) =>
          gameIds.includes(game.id)
        );
      }
      return user;
    });

    res.status(200).json({ users: filteredUsers });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getMatchingUsers(user: User, preferences: UserPreferences, gameIds: number[]) {
  const { id } = user;
  const { region, min_age, max_age, preferred_gender, teammate_platform, voice } = preferences;
  const selectedRegion: string | undefined = region !== "None" ? region : undefined;
  const selectedGender: Gender | undefined = preferred_gender !== "Both" ? preferred_gender : undefined;

  return db.user.findMany({
    where: {
      AND: [
        { id: { not: id } },
        selectedRegion ? { preferences: { region: selectedRegion } } : {},
        selectedGender ? { gender: selectedGender } : {},
        { preferences: { voice } },
        { dob: { lte: new Date(new Date().setFullYear(new Date().getFullYear() - min_age + 1)) } },
        { dob: { gte: new Date(new Date().setFullYear(new Date().getFullYear() - max_age - 1)) } },
        { preferences: { games: { some: { id: { in: gameIds } } } } },
        { preferences: { platform: { hasSome: teammate_platform } } },
      ],
    },
    include: { preferences: { include: { games: true } } },
  });
}
