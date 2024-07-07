import sharp from 'sharp';
import fs from 'fs';
import { extname } from 'path';

const UPLOAD_DIR = 'uploads';

export function generateUniquePath(originalname: string): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = extname(originalname);
    return `${UPLOAD_DIR}/${uniqueSuffix}${extension}`;
};

export async function compressAndSave(file: Express.Multer.File, savePath: string) {
    const compressedImageBuffer = await sharp(file.buffer)
        .resize({ width: 150, height: 150 })
        .jpeg({ quality: 70 })
        .toBuffer();

    fs.mkdirSync('uploads', { recursive: true });
    fs.writeFileSync(savePath, compressedImageBuffer);
}