import axios, { AxiosRequestConfig } from 'axios';
import { PrismaClient } from '@prisma/client';
import { Game } from '@prisma/client';
import fs from 'fs';

const db = new PrismaClient();

type Cover = {
    id: number,
    url: string,
}

const BASE_API_URL = "https://api.igdb.com/v4/";
const GAME_LIMIT = 50;

async function fetchData(url: string, headers: any, payload: string): Promise<any> {
    const config: AxiosRequestConfig = {
        headers: headers
    };
    try {
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(`Error fetching data from ${url}: ${error.message}`);
    }
}

async function fetchCoversInBatches(coverIds: number[], gameHeaders: any): Promise<Cover[]> {
    const batchSize = 10; // batch size
    const delayMs = 350; // delay to stay within rate limit of igdb api
    const coverData: Cover[] = [];

    for (let i = 0; i < coverIds.length; i += batchSize) {
        const batchIds = coverIds.slice(i, i + batchSize);
        const coverPayload: string = `fields url; where id = (${batchIds.join(',')});`;
        const batchCoverData: Cover[] = await fetchData(`${BASE_API_URL}covers`, gameHeaders, coverPayload);
        console.log(`batch size: ${batchSize} and the batchId is: ${i}`);
        coverData.push(...batchCoverData);
        if (i + batchSize < coverIds.length) {
            await new Promise(resolve => setTimeout(resolve, delayMs)); // delay between batches
        }
    }

    return coverData;
}

async function fetchGameData(gameHeaders: any): Promise<Game[]> {
    const gameUrl: string = `${BASE_API_URL}games`;
    const gamePayload: string = `fields name, cover; sort rating_count desc; limit ${GAME_LIMIT};`;

    return await fetchData(gameUrl, gameHeaders, gamePayload);
}


function mapCoverUrls(gameData: Game[], coverData: Cover[]): Game[] {
    const coverMap: { [key: number]: string } = {};
    coverData.forEach(cover => {
        coverMap[cover.id] = cover.url.replace("t_thumb", "t_logo_med"); // better cover image resolution, for docs see: https://api-docs.igdb.com/#images
    });

    return gameData.map(game => {
        if (game.cover && coverMap[Number(game.cover)]) {
            return { ...game, cover: coverMap[Number(game.cover)] };
        }
        return game;
    });
}


async function populateDatabase(gameData: Game[]): Promise<void> {
    await db.game.createMany({ // batched
        data: gameData.map(game => ({
            name: game.name,
            cover: game.cover
        }))
    });
}

async function seedDatabase(gameHeaders: any): Promise<void> {
    const gameData: Game[] = await fetchGameData(gameHeaders);
    const coverIds: number[] = gameData.filter(game => game.cover).map(game => Number(game.cover));
    const coverData: Cover[] = await fetchCoversInBatches(coverIds, gameHeaders);

    const updatedGameData: Game[] = mapCoverUrls(gameData, coverData); // change game cover photo size

    await populateDatabase(updatedGameData);

    console.log("Finished database seeding");
    console.log("To check the db content use: npx prisma studio");
}


async function resetGameTable() {
    await db.$executeRaw`DELETE FROM "Game"`;
    // reset auto-increment - for repeated database restarts when testing
    await db.$executeRaw`ALTER SEQUENCE "Game_id_seq" RESTART WITH 1`;
}

async function fetchGames(): Promise<void> {
    const gameHeaders: any = {
        "Client-ID": `${process.env.CLIENT_ID}`,
        "Authorization": `${process.env.IGDB_AUTHENTICATION_TOKEN}`,
    };

    const gameCount = await db.game.count();
    if (gameCount === 0) {
        resetGameTable();
        console.log("Game database is empty, seeding now...");
        await seedDatabase(gameHeaders);
    } else {
        console.log("Game database is already seeded.");
    }
}

export default fetchGames;
