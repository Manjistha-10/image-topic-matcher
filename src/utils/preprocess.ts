// // // // // Developed by Manjistha Bidkar
// // // // import sharp from 'sharp';

// // // // /**
// // // //  * Preprocess image to improve OCR accuracy
// // // //  */
// // // // export async function preprocessImage(inputPath: string, outputPath: string) {
// // // //   await sharp(inputPath)
// // // //     .grayscale()
// // // //     .normalize()
// // // //     .sharpen()
// // // //     .resize({ width: 1800 }) // Better for handwriting
// // // //     .threshold(145)
// // // //     .extend({ top: 20, bottom: 20, left: 20, right: 20, background: 'white' })
// // // //     .png()
// // // //     .toFile(outputPath);
// // // // }


// // // // src/utils/preprocess.ts
// // // import sharp from 'sharp';

// // // export enum PreprocessMode {
// // //   TYPED = 'TYPED',
// // //   HANDWRITTEN = 'HANDWRITTEN'
// // // }

// // // /**
// // //  * Dynamically preprocess image based on text type.
// // //  */
// // // export async function preprocessImage(
// // //   inputPath: string,
// // //   outputPath: string,
// // //   mode: PreprocessMode
// // // ) {
// // //   const image = sharp(inputPath).grayscale();

// // //   if (mode === PreprocessMode.HANDWRITTEN) {
// // //     await image
// // //         .linear(1.0, -30) // adjust brightness (darker)
// // //         .normalize()
// // //         .sharpen({ sigma: 1.2 })
// // //         .threshold(120)   // try lower than 140
// // //         .resize({ width: 2200 }) // more zoom-in
// // //         .jpeg({ quality: 100 })
// // //         .toFile(outputPath);

// // //   } else {
// // //     await image
// // //       .resize({ width: 1500 })
// // //       .jpeg({ quality: 100 })
// // //       .toFile(outputPath);
// // //   }
// // // }



// // // src/utils/preprocess.ts

// // // Dynamically adjusts sharp filters based on whether text is typed or handwritten to improve OCR results

// // import sharp from 'sharp';

// // export enum PreprocessMode {
// //   TYPED = 'TYPED',
// //   HANDWRITTEN = 'HANDWRITTEN'
// // }

// // export async function preprocessImage(
// //   inputPath: string,
// //   outputPath: string,
// //   mode: PreprocessMode
// // ) {
// //   const image = sharp(inputPath).grayscale();

// //   // For handwritten text: enhance contrast, sharpen edges, binarize, enlarge
// //   if (mode === PreprocessMode.HANDWRITTEN) {
// //     await image
// //       .normalize()
// //       .sharpen({ sigma: 1 })
// //       .threshold(140)
// //       .resize({ width: 1800 })
// //       .jpeg({ quality: 100 })
// //       .toFile(outputPath);
// //   } else {
// //     // For typed text: just resize and save
// //     await image
// //       .resize({ width: 1500 })
// //       .jpeg({ quality: 100 })
// //       .toFile(outputPath);
// //   }
// // }


// import sharp from 'sharp';

// export enum PreprocessMode {
//   TYPED = 'TYPED',
//   HANDWRITTEN = 'HANDWRITTEN'
// }

// export async function preprocessImage(
//   inputPath: string,
//   outputPath: string,
//   mode: PreprocessMode
// ) {
//   const image = sharp(inputPath).grayscale();

//   if (mode === PreprocessMode.HANDWRITTEN) {
//     await image
//       .normalize() // enhance contrast
//       .blur(0.5) // smooth edges
//       .sharpen({ sigma: 2 }) // boost stroke boundaries
//       .threshold(140) // binarize
//       .resize({ width: 2000 }) // upscale for clearer OCR
//       .jpeg({ quality: 100 })
//       .toFile(outputPath);
//   } else {
//     await image
//       .resize({ width: 1500 })
//       .jpeg({ quality: 100 })
//       .toFile(outputPath);
//   }
// }


// src/utils/preprocess.ts
// Developed by Manjistha Bidkar

import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { config } from '../config';

export enum PreprocessMode {
  TYPED = 'TYPED',
  HANDWRITTEN = 'HANDWRITTEN'
}

export async function preprocessImage(
  inputPath: string,
  outputPath: string,
  mode: PreprocessMode
) {
  await fs.ensureDir(path.dirname(outputPath));

  const image = sharp(inputPath).grayscale();

  if (mode === PreprocessMode.HANDWRITTEN) {
    await image
      .normalize()
      .blur(0.5)
      .sharpen({ sigma: 2 })
      .threshold(140)
      .resize({ width: 2000 })
      .jpeg({ quality: 100 })
      .toFile(outputPath);
  } else {
    await image
      .resize({ width: 1500 })
      .jpeg({ quality: 100 })
      .toFile(outputPath);
  }
}
