import { Game, User } from '@prisma/client';
import fs from 'fs/promises'
import bcrypt from '..';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function createUsers(): Promise<void> {
    try {

        const rawData = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(rawData);
        const results = [];

        const usersExist = await db.user.findMany();
        if (usersExist.length > 0) {
            console.log("users already seeded");
            return;
        }

        let usersSeeded = 0;
        for (const userData of users) {
            const { preferences, ...userDataWithoutPreferences } = userData;

            encryptPassword(userDataWithoutPreferences);
            const createdUser = await createUserInDatabase(userDataWithoutPreferences, preferences);
            usersSeeded++;

            results.push(createdUser);
        }
        console.log(`${usersSeeded} users seeded`);
    } catch (error: any) {
        console.log("Database already seeded with users");
    }
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

async function createUserInDatabase(userData: User, preferences: any): Promise<User> {
    const { id: userId, ...userDataWithoutId } = userData;
    const { id: preferencesId, userId: preferencesUserId, games, ...preferencesDataWithoutId } = preferences;
    const theGames: Game[] = await db.game.findMany({
        where: {
            id: {
                in: games,
            }
        }
    });

    return await db.user.create({
        data: {
            ...userDataWithoutId,
            preferences: {
                create: {
                    ...preferencesDataWithoutId,
                    games: {
                        connect: theGames.map((game: any) => ({
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
export default createUsers;