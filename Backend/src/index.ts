import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dotenvexpand from "dotenv-expand";
import gameRouter from "./game/game.router";
import userRouter from "./user/user.router";
import { createUser, fetchUserByUserName, updateUser } from "./user/user.service";
import { jwtDecode } from "jwt-decode";
import fetchGames from "./game/game.seed";
import { User } from "@prisma/client";
import upload from "./multer/multer";
import { compressAndSave, generateUniquePath } from "./multer/multer.service";

import bcrypt from "bcrypt";
export default bcrypt;

import createUsers from "./user/user.seed";

async function seedDataBase() {
  await fetchGames();
  await createUsers();
}

seedDataBase();

const path = require('path')
dotenvexpand.expand(dotenv.config());

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve("/uploads")));
app.use("/api/games", gameRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRes = await fetchUserByUserName(username);
  if (userRes.error) {
    return res.status(401).json({ error: userRes.error });
  }
  if (userRes.accessToken) {
    const user: User = jwtDecode(userRes.accessToken);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  }
  return res.status(200).json({ accessToken: userRes.accessToken });
});

app.post("/api/signup", async (req: Request, res: Response) => {
  const userRes = await createUser(req, res);

  if (!userRes.accessToken) {
    return res.status(401).json({
      error: userRes.error,
      emailError: userRes.emailError,
      usernameError: userRes.usernameError,
    });
  }

  if (userRes.accessToken) {
    return res.status(201).json({ accessToken: userRes.accessToken });
  } else {
    return res.status(500).json({ error: "Unknown error" });
  }
});

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  const data = JSON.parse(req.body.data);
  const { preferences, iat, ...userData } = data;

  const file: Express.Multer.File | undefined = req.file;

  if (file) {
    const savePath = generateUniquePath(file.originalname);
    userData.avatar = `${req.protocol}://${req.get('host')}/${savePath}`;

    try {
      await compressAndSave(file, savePath);
    } catch (error: any) {
      res.status(500).json({ error: "Save image error" });
      return;
    }
  }

  req.body = { ...userData, preferences };
  await updateUser(req, res);
});