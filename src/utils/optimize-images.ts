import fs from 'node:fs';
import sharp from 'sharp';
export const optimizeImages = async (outputDir: string) => {
    const contents = fs.readdirSync(outputDir, { recursive: true });
    const pngs = Array.from(contents as string[]).filter((file) => {
        if (typeof file === 'string') {
            return file.endsWith('.png');
        }
        return false;
    });

    for (const png of pngs) {
        const filepath = `${outputDir}/${png}`;
        const outputPath = `${filepath.slice(0, -4)}-opt${filepath.slice(-4)}`;

        await sharp(filepath)
            .png({ compressionLevel: 9 })
            .toFile(outputPath)
            .catch((err) => console.error(err.message));

        await fs.unlinkSync(filepath);
        await fs.renameSync(outputPath, filepath);
    }
}
