import express from "express";
import {
    getGameByID,
    getAllGames,
    getGameByName
} from "./game.service";

const gameRouter = express.Router();

gameRouter.get("/id/:id", getGameByID);
gameRouter.get("/:limit?", getAllGames);
gameRouter.get("/name/:name", getGameByName);

export default gameRouter;
