import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function segmentLines(imagePath: string): Promise<string[]> {
  const { data, info } = await sharp(imagePath)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lines: { top: number; height: number }[] = [];
  const rowThreshold = 10; // Row with more than 10 dark pixels is considered text

  for (let y = 0; y < info.height; y++) {
    let darkPixels = 0;
    for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] < 128) darkPixels++;
    }
    if (darkPixels > rowThreshold) {
      if (
        lines.length === 0 ||
        y > lines[lines.length - 1].top + lines[lines.length - 1].height
      ) {
        lines.push({ top: y, height: 1 });
      } else {
        lines[lines.length - 1].height++;
      }
    }
  }

  const linePaths: string[] = [];

  const baseName = path.basename(imagePath, path.extname(imagePath));
  const outputDir = path.dirname(imagePath);

  for (let i = 0; i < lines.length; i++) {
    const uniqueSuffix = crypto.randomBytes(4).toString('hex');
    const lineImgPath = path.join(outputDir, `${baseName}-line-${i}-${uniqueSuffix}.jpg`);

    await sharp(imagePath)
      .extract({
        left: 0,
        top: lines[i].top,
        width: info.width,
        height: lines[i].height + 5
      })
      .toFile(lineImgPath);

    linePaths.push(lineImgPath);
  }

  return linePaths;
}
