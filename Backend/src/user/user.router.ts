import { Router } from "express";
import { updateUser, getUserByUsername, findMatchingUsers } from "./user.service";

const userRouter = Router();

userRouter.post("/update", updateUser);
userRouter.post("/match", findMatchingUsers);
userRouter.get("/:username", getUserByUsername);

export default userRouter;
