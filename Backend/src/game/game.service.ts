import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const db = new PrismaClient();

export const getAllGames = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.params.limit, 10);
        const limitValue = limit ? limit : undefined;
        const allGames = await db.game.findMany({
            take: limitValue,
            orderBy: {
                name: 'asc',
            },
        });
        res.status(200).json(allGames);
    } catch (error: any) {
        res.status(500).json("Internal server error");
    }
}

export const getGameByID = async (req: Request, res: Response) => {
    try {
        const gameID = parseInt(req.params.id, 10);
        const game = await db.game.findUnique({
            where: {
                id: gameID,
            }
        })
        if (game) {
            res.status(200).json({ data: game });
        } else {
            res.status(404).json({ error: 'Game not found' });
        }
    } catch (error: any) {
        res.status(500).json("Internal server error");
    }
}

export const getGameByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const game = await db.game.findFirst({
            where: {
                name: name,
            }
        })
        if (game) {
            res.status(200).json({ data: game });
        } else {
            res.status(404).json({ error: 'Game not found' });
        }
    } catch (error: any) {
        res.status(500).json("Internal server error");
    }
}