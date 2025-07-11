// // // // // // // // // src/utils/ocr.ts
// // // // // // // // import Tesseract from 'tesseract.js';
// // // // // // // // import path from 'path';

// // // // // // // // export enum OCRMode {
// // // // // // // //   TYPED = 'TYPED',
// // // // // // // //   HANDWRITTEN = 'HANDWRITTEN'
// // // // // // // // }

// // // // // // // // function isProbablyTyped(text: string): boolean {
// // // // // // // //   const lines = text.split('\n').filter(line => line.trim() !== '');
// // // // // // // //   const avgLength = lines.reduce((sum, line) => sum + line.length, 0) / (lines.length || 1);
// // // // // // // //   const punctuation = (text.match(/[.,;:!?]/g) || []).length;
// // // // // // // //   return avgLength > 40 && punctuation > 5;
// // // // // // // // }

// // // // // // // // export async function extractTextFromImage(imagePath: string): Promise<string> {
// // // // // // // //   console.log('[OCR] Performing initial detection...');

// // // // // // // //   const tessdataPath = path.join(__dirname, '../../tessdata_best');

// // // // // // // //   const initialScan = await Tesseract.recognize(
// // // // // // // //     imagePath,
// // // // // // // //     'eng',
// // // // // // // //     {
// // // // // // // //       tessdata: tessdataPath,
// // // // // // // //       tessedit_pageseg_mode: '11',
// // // // // // // //       preserve_interword_spaces: '1',
// // // // // // // //       logger: (m: { status: string; progress: number }) => {
// // // // // // // //         if (m.status) console.log(`[Initial OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // // // // // //       }
// // // // // // // //     } as any
// // // // // // // //   );

// // // // // // // //   const draftText = initialScan.data.text;
// // // // // // // //   const isTyped = isProbablyTyped(draftText);
// // // // // // // //   const mode = isTyped ? OCRMode.TYPED : OCRMode.HANDWRITTEN;
// // // // // // // //   console.log(`[OCR] Auto-detected mode: ${mode}`);

// // // // // // // //   const config: Record<string, string> = {
// // // // // // // //     tessedit_pageseg_mode: isTyped ? '6' : '13',
// // // // // // // //     preserve_interword_spaces: '1'
// // // // // // // //   };

// // // // // // // //   if (isTyped) {
// // // // // // // //     config.tessedit_char_whitelist = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
// // // // // // // //   }

// // // // // // // //   const finalScan = await Tesseract.recognize(
// // // // // // // //     imagePath,
// // // // // // // //     'eng',
// // // // // // // //     {
// // // // // // // //       ...config,
// // // // // // // //       tessdata: tessdataPath,
// // // // // // // //       logger: (m: { status: string; progress: number }) => {
// // // // // // // //         if (m.status) console.log(`[Final OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // // // // // //       }
// // // // // // // //     } as any
// // // // // // // //   );

// // // // // // // //   const result = finalScan.data.text
// // // // // // // //     .split('\n')
// // // // // // // //     .filter(line => line.trim().length > 2 && !line.match(/^[^\w]+$/))
// // // // // // // //     .join('\n');

// // // // // // // //   return result.trim();
// // // // // // // // }

// // // // // // // // Developed by Manjistha Bidkar
// // // // // // // import Tesseract from 'tesseract.js';
// // // // // // // import path from 'path';
// // // // // // // import { PreprocessMode } from './preprocess';

// // // // // // // export enum OCRMode {
// // // // // // //   TYPED = 'TYPED',
// // // // // // //   HANDWRITTEN = 'HANDWRITTEN'
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Heuristically determine if the OCR text is probably typed.
// // // // // // //  */
// // // // // // // function isProbablyTyped(text: string): boolean {
// // // // // // //   const lines = text.split('\n').filter(line => line.trim() !== '');
// // // // // // //   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
// // // // // // //   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
// // // // // // //   return avgLineLength > 40 && punctuationCount > 5;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Performs OCR on an image and optionally detects mode (typed vs handwritten).
// // // // // // //  * 
// // // // // // //  * @param imagePath - Path to the image file.
// // // // // // //  * @param isInitialScan - If true, returns detected OCR mode.
// // // // // // //  * @returns OCR text and optionally the detected mode.
// // // // // // //  */
// // // // // // // export async function extractTextFromImage(
// // // // // // //   imagePath: string,
// // // // // // //   isInitialScan: boolean = false
// // // // // // // ): Promise<{ text: string; mode?: OCRMode }> {
// // // // // // //   const langPath = path.join(__dirname, '../../tessdata_best');

// // // // // // //   const config: Record<string, string> = {
// // // // // // //     tessedit_pageseg_mode: isInitialScan ? '11' : '6',
// // // // // // //     preserve_interword_spaces: '1'
// // // // // // //   };

// // // // // // //   if (!isInitialScan) {
// // // // // // //     config.tessedit_char_whitelist = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
// // // // // // //   }

// // // // // // //   const result = await Tesseract.recognize(imagePath, 'eng', {
// // // // // // //     langPath,
// // // // // // //     logger: (m: { status: string; progress: number }) => {
// // // // // // //       if (m.status)
// // // // // // //         console.log(`[${isInitialScan ? 'Initial' : 'Final'} OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // // // // //     },
// // // // // // //     ...(config as any)
// // // // // // //   });

// // // // // // //   const text = result.data.text.trim();

// // // // // // //   if (isInitialScan) {
// // // // // // //     const isTyped = isProbablyTyped(text);
// // // // // // //     const mode = isTyped ? OCRMode.TYPED : OCRMode.HANDWRITTEN;
// // // // // // //     console.log(`[OCR] Detected mode: ${mode}`);
// // // // // // //     return { text, mode };
// // // // // // //   }

// // // // // // //   return { text };
// // // // // // // }



// // // // // // // Developed by Manjistha Bidkar
// // // // // // // Performs the following :
// // // // // // // - Initial scan to detect whether text is typed or handwritten
// // // // // // // - Final optimized OCR pass with tuned config for detected type

// // // // // // import Tesseract from 'tesseract.js';
// // // // // // import path from 'path';
// // // // // // import { PreprocessMode } from './preprocess';

// // // // // // // Enum to tag OCR content type
// // // // // // export enum OCRMode {
// // // // // //   TYPED = 'TYPED',
// // // // // //   HANDWRITTEN = 'HANDWRITTEN'
// // // // // // }

// // // // // // // Heuristic: check if likely typed
// // // // // // function isProbablyTyped(text: string): boolean {
// // // // // //   const lines = text.split('\n').filter(line => line.trim() !== '');
// // // // // //   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
// // // // // //   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
// // // // // //   return avgLineLength > 40 && punctuationCount > 5;
// // // // // // }

// // // // // // export async function extractTextFromImage(imagePath: string): Promise<{ text: string, mode: PreprocessMode }> {
// // // // // //   const langPath = path.join(__dirname, '../../tessdata_best');

// // // // // //   console.log(`[OCR] Running initial scan to detect content type...`);

// // // // // //   // Light scan using generic config
// // // // // //   const lightScan = await Tesseract.recognize(imagePath, 'eng', {
// // // // // //     langPath,
// // // // // //     logger: (m: { status: string; progress: number }) => {
// // // // // //       if (m.status) console.log(`[Initial]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // // // //     },
// // // // // //     tessedit_pageseg_mode: '11',
// // // // // //     preserve_interword_spaces: '1'
// // // // // //   } as any);

// // // // // //   const initialText = lightScan.data.text;

// // // // // //   // Use heuristic to determine text type
// // // // // //   const isTyped = isProbablyTyped(initialText);
// // // // // //   const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

// // // // // //   console.log(`[OCR] Detected mode: ${mode}`);

// // // // // //   // Configure Tesseract settings for final scan
// // // // // //   const finalConfig: Record<string, string> = {
// // // // // //     tessedit_pageseg_mode: isTyped ? '6' : '11',
// // // // // //     preserve_interword_spaces: '1'
// // // // // //   };

// // // // // //   // Restrict character set for typed content
// // // // // //   if (isTyped) {
// // // // // //     finalConfig.tessedit_char_whitelist =
// // // // // //       'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
// // // // // //   }

// // // // // //   // Final OCR scan with tuned settings
// // // // // //   const finalScan = await Tesseract.recognize(imagePath, 'eng', {
// // // // // //     langPath,
// // // // // //     logger: (m: { status: string; progress: number }) => {
// // // // // //       if (m.status) console.log(`[Final OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // // // //     },
// // // // // //     ...(finalConfig as any)
// // // // // //   });

// // // // // //   return { text: finalScan.data.text.trim(), mode };
// // // // // // }

// // // // //--------------------------------------  WORKING FOR TESSDATA_FAST---------------------------------------------------------
// // // // Developed by Manjistha Bidkar
// // // // Performs the following :
// // // // - Initial scan to detect whether text is typed or handwritten
// // // // - Final optimized OCR pass with tuned config for detected type

// // // import Tesseract from 'tesseract.js';
// // // import path from 'path';
// // // import { PreprocessMode } from './preprocess';

// // // // Enum to tag OCR content type
// // // export enum OCRMode {
// // //   TYPED = 'TYPED',
// // //   HANDWRITTEN = 'HANDWRITTEN'
// // // }

// // // // Heuristic: check if likely typed
// // // function isProbablyTyped(text: string): boolean {
// // //   const lines = text.split('\n').filter(line => line.trim() !== '');
// // //   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
// // //   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
// // //   return avgLineLength > 40 && punctuationCount > 5;
// // // }

// // // export async function extractTextFromImage(imagePath: string): Promise<{ text: string, mode: PreprocessMode }> {
// // //   //const langPath = path.join(__dirname, '../../tessdata_best');
// // //   const langPath = path.join(__dirname, '../../tessdata_fast');

// // //   console.log(`[OCR] Running initial scan to detect content type...`);

// // //   // Light scan using generic config
// // //   const lightScan = await Tesseract.recognize(imagePath, 'eng+osd', {
// // //     langPath,
// // //     logger: (m: { status: string; progress: number }) => {
// // //       if (m.status) console.log(`[Initial]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // //     },
// // //     tessedit_pageseg_mode: '13',
// // //     preserve_interword_spaces: '1'
// // //   } as any);

// // //   const initialText = lightScan.data.text;

// // //   // Use heuristic to determine text type
// // //   const isTyped = isProbablyTyped(initialText);
// // //   const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

// // //   console.log(`[OCR] Detected mode: ${mode}`);

// // //   // Configure Tesseract settings for final scan
// // //   const finalConfig: Record<string, string> = {
// // //     tessedit_pageseg_mode: isTyped ? '6' : '13',
// // //     preserve_interword_spaces: '1'
// // //   };

// // //   // Restrict character set for typed content
// // //   if (isTyped) {
// // //     finalConfig.tessedit_char_whitelist =
// // //       'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
// // //   }

// // //   // Final OCR scan with tuned settings
// // //   const finalScan = await Tesseract.recognize(imagePath, 'eng', {
// // //     langPath,
// // //     logger: (m: { status: string; progress: number }) => {
// // //       if (m.status) console.log(`[Final OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // //     },
// // //     ...(finalConfig as any)
// // //   });

// // //   return { text: finalScan.data.text.trim(), mode };
// // // }
// // // //-------------------------------------- END WORKING FOR TESSDATA_FAST---------------------------------------------------------


// // // // import Tesseract from 'tesseract.js';
// // // // import path from 'path';
// // // // import fs from 'fs';
// // // // import { PreprocessMode } from './preprocess';
// // // // import { segmentLines } from './segmentLines';

// // // // // Enum to tag OCR content type
// // // // export enum OCRMode {
// // // //   TYPED = 'TYPED',
// // // //   HANDWRITTEN = 'HANDWRITTEN'
// // // // }

// // // // // Heuristic: check if likely typed
// // // // function isProbablyTyped(text: string): boolean {
// // // //   const lines = text.split('\n').filter(line => line.trim() !== '');
// // // //   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
// // // //   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
// // // //   return avgLineLength > 40 && punctuationCount > 5;
// // // // }

// // // // export async function extractTextFromImage(
// // // //   imagePath: string
// // // // ): Promise<{ text: string; mode: PreprocessMode }> {
// // // //   const langPath = path.join(__dirname, '../../tessdata_fast');

// // // //   console.log(`[OCR] Running initial scan to detect content type...`);

// // // //   const lightScan = await Tesseract.recognize(imagePath, 'eng+osd', {
// // // //     langPath,
// // // //     logger: (m: { status: string; progress: number }) => {
// // // //       if (m.status) {
// // // //         console.log(`[Initial]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // //       }
// // // //     },
// // // //     tessedit_pageseg_mode: '13',
// // // //     preserve_interword_spaces: '1'
// // // //   } as any);

// // // //   const initialText = lightScan.data.text;
// // // //   const isTyped = isProbablyTyped(initialText);
// // // //   const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

// // // //   console.log(`[OCR] Detected mode: ${mode}`);

// // // //   let finalText = '';

// // // //   if (mode === PreprocessMode.HANDWRITTEN) {
// // // //     const lineImages = await segmentLines(imagePath);

// // // //     for (const linePath of lineImages) {
// // // //       const lineResult = await Tesseract.recognize(linePath, 'eng+osd', {
// // // //         langPath,
// // // //         tessedit_pageseg_mode: '7', // Treat as single line
// // // //         preserve_interword_spaces: '1'
// // // //       } as any);

// // // //       finalText += lineResult.data.text.trim() + ' ';
// // // //       fs.unlinkSync(linePath); // Clean up temporary segmented file
// // // //     }
// // // //   } else {
// // // //     const finalScan = await Tesseract.recognize(imagePath, 'eng+osd', {
// // // //       langPath,
// // // //       logger: (m: { status: string; progress: number }) => {
// // // //         if (m.status) {
// // // //           console.log(`[Final OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // //         }
// // // //       },
// // // //       tessedit_pageseg_mode: '6',
// // // //       preserve_interword_spaces: '1',
// // // //       tessedit_char_whitelist:
// // // //         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" '
// // // //     } as any);

// // // //     finalText = finalScan.data.text.trim();
// // // //   }

// // // //   return { text: finalText, mode };
// // // // }



// // // // import Tesseract from 'tesseract.js';
// // // // import path from 'path';
// // // // import fs from 'fs';
// // // // import { PreprocessMode } from './preprocess';
// // // // import { segmentLines } from './segmentLines';

// // // // // Enum to tag OCR content type
// // // // export enum OCRMode {
// // // //   TYPED = 'TYPED',
// // // //   HANDWRITTEN = 'HANDWRITTEN'
// // // // }

// // // // // Heuristic: check if likely typed
// // // // function isProbablyTyped(text: string): boolean {
// // // //   const lines = text.split('\n').filter(line => line.trim() !== '');
// // // //   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
// // // //   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
// // // //   return avgLineLength > 40 && punctuationCount > 5;
// // // // }

// // // // export async function extractTextFromImage(
// // // //   imagePath: string
// // // // ): Promise<{ text: string; mode: PreprocessMode }> {
// // // //   // 🧠 Use LSTM-trained data for better recognition
// // // //   const langPath = path.resolve(__dirname, '../../tessdata_best');

// // // //   console.log(`[OCR] Running initial scan to detect content type...`);

// // // //   const lightScan = await Tesseract.recognize(imagePath, 'eng+osd', {
// // // //     langPath,
// // // //     logger: (m: { status: string; progress: number }) => {
// // // //       if (m.status) {
// // // //         console.log(`[Initial]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // //       }
// // // //     },
// // // //     tessedit_pageseg_mode: '13', // Raw line detection
// // // //     preserve_interword_spaces: '1'
// // // //   } as any);

// // // //   const initialText = lightScan.data.text;
// // // //   const isTyped = isProbablyTyped(initialText);
// // // //   const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

// // // //   console.log(`[OCR] Detected mode: ${mode}`);

// // // //   let finalText = '';

// // // //   if (mode === PreprocessMode.HANDWRITTEN) {
// // // //     const lineImages = await segmentLines(imagePath);

// // // //     for (const linePath of lineImages) {
// // // //       const lineResult = await Tesseract.recognize(linePath, 'eng+osd', {
// // // //         langPath,
// // // //         tessedit_pageseg_mode: '7', // Treat as a single line
// // // //         preserve_interword_spaces: '1'
// // // //       } as any);

// // // //       finalText += lineResult.data.text.trim() + ' ';
// // // //       fs.unlinkSync(linePath); // Clean up temporary segmented file
// // // //     }
// // // //   } else {
// // // //     const finalScan = await Tesseract.recognize(imagePath, 'eng+osd', {
// // // //       langPath,
// // // //       logger: (m: { status: string; progress: number }) => {
// // // //         if (m.status) {
// // // //           console.log(`[Final OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
// // // //         }
// // // //       },
// // // //       tessedit_pageseg_mode: '6', // Assume a uniform block of text
// // // //       preserve_interword_spaces: '1',
// // // //       tessedit_char_whitelist:
// // // //         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" '
// // // //     } as any);

// // // //     finalText = finalScan.data.text.trim();
// // // //   }

// // // //   return { text: finalText, mode };
// // // // }


// // // src/utils/ocr.ts
// // // Developed by Manjistha Bidkar

// // import Tesseract from 'tesseract.js';
// // import path from 'path';
// // import { PreprocessMode } from './preprocess';
// // import { CONFIG } from '../config';

// // export enum OCRMode {
// //   TYPED = 'TYPED',
// //   HANDWRITTEN = 'HANDWRITTEN'
// // }

// // function isProbablyTyped(text: string): boolean {
// //   const lines = text.split('\n').filter(line => line.trim() !== '');
// //   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
// //   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
// //   return avgLineLength > 40 && punctuationCount > 5;
// // }

// // export async function extractTextFromImage(imagePath: string): Promise<{ text: string, mode: PreprocessMode }> {
// //   const langPath = CONFIG.TESSDATA_PATH;

// //   try {
// //     const lightScan = await Tesseract.recognize(imagePath, 'eng+osd', {
// //       langPath,
// //       logger: () => {},
// //       tessedit_pageseg_mode: '13',
// //       preserve_interword_spaces: '1'
// //     } as any);

// //     const initialText = lightScan.data.text;
// //     const isTyped = isProbablyTyped(initialText);
// //     const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

// //     const finalConfig: Record<string, string> = {
// //       tessedit_pageseg_mode: isTyped ? '6' : '13',
// //       preserve_interword_spaces: '1'
// //     };

// //     if (isTyped) {
// //       finalConfig.tessedit_char_whitelist =
// //         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
// //     }

// //     const finalScan = await Tesseract.recognize(imagePath, 'eng', {
// //       langPath,
// //       logger: () => {},
// //       ...(finalConfig as any)
// //     });

// //     return { text: finalScan.data.text.trim(), mode };
// //   } catch (error) {
// //     console.error(`OCR failed for ${imagePath}:`, error);
// //     throw new Error(`OCR failed for image: ${imagePath}`);
// //   }
// // }


// // Developed by Manjistha Bidkar
// // Performs the following :
// // - Initial scan to detect whether text is typed or handwritten
// // - Final optimized OCR pass with tuned config for detected type

// import Tesseract from 'tesseract.js';
// import path from 'path';
// import { PreprocessMode } from './preprocess';
// import { config } from '../config';


// // Enum to tag OCR content type
// export enum OCRMode {
//   TYPED = 'TYPED',
//   HANDWRITTEN = 'HANDWRITTEN'
// }

// // Heuristic: check if likely typed
// function isProbablyTyped(text: string): boolean {
//   const lines = text.split('\n').filter(line => line.trim() !== '');
//   const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
//   const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
//   return avgLineLength > 40 && punctuationCount > 5;
// }

// export async function extractTextFromImage(imagePath: string): Promise<{ text: string, mode: PreprocessMode }> {
//   //const langPath = path.join(__dirname, '../../tessdata_best');
//   //const langPath = path.join(__dirname, '../../tessdata_fast');
//   const langPath = config.TESSDATA_PATH;

//   console.log("[OCR] Running initial scan to detect content type...");

//   // Light scan using generic config
//   const lightScan = await Tesseract.recognize(imagePath, 'eng+osd', {
//     langPath,
//     logger: (m: { status: string; progress: number }) => {
//       if (m.status) console.log(`[Initial]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
//     },
//     tessedit_pageseg_mode: '13',
//     preserve_interword_spaces: '1'
//   } as any);

//   const initialText = lightScan.data.text;

//   // Use heuristic to determine text type
//   const isTyped = isProbablyTyped(initialText);
//   const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

//   console.log(`[OCR] Detected mode: ${mode}`);

//   // Configure Tesseract settings for final scan
//   const finalConfig: Record<string, string> = {
//     tessedit_pageseg_mode: isTyped ? '6' : '13',
//     preserve_interword_spaces: '1'
//   };

//   // Restrict character set for typed content
//   if (isTyped) {
//     finalConfig.tessedit_char_whitelist =
//       'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
//   }

//   // Final OCR scan with tuned settings
//   const finalScan = await Tesseract.recognize(imagePath, 'eng', {
//     langPath,
//     logger: (m: { status: string; progress: number }) => {
//       if (m.status) console.log(`[Final OCR]: ${m.status} - ${Math.round((m.progress || 0) * 100)}%`);
//     },
//     ...(finalConfig as any)
//   });

//   return { text: finalScan.data.text.trim(), mode };
// }
// //-------------------------------------- END WORKING FOR TESSDATA_FAST---------------------------------------------------------


// Developed by Manjistha Bidkar
// Performs the following :
// - Initial scan to detect whether text is typed or handwritten
// - Final optimized OCR pass with tuned config for detected type

import Tesseract from 'tesseract.js';
import path from 'path';
import { PreprocessMode } from './preprocess';
import { config } from '../config';

// Enum to tag OCR content type
export enum OCRMode {
  TYPED = 'TYPED',
  HANDWRITTEN = 'HANDWRITTEN'
}

// Heuristic: check if likely typed
function isProbablyTyped(text: string): boolean {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / (lines.length || 1);
  const punctuationCount = (text.match(/[.,;:!?]/g) || []).length;
  return avgLineLength > 40 && punctuationCount > 5;
}

export async function extractTextFromImage(imagePath: string): Promise<{ text: string, mode: PreprocessMode }> {
  const langPath = config.TESSDATA_PATH;
  
  try {
     const lightScan = await Tesseract.recognize(imagePath, 'eng+osd', {
      langPath,
      logger: () => {},
      tessedit_pageseg_mode: '13',
      preserve_interword_spaces: '1'
    } as any);

    const initialText = lightScan.data.text;
    const isTyped = isProbablyTyped(initialText);
    const mode = isTyped ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

    // Configure Tesseract settings for final scan
    const finalConfig: Record<string, string> = {
      tessedit_pageseg_mode: isTyped ? '6' : '13',
      preserve_interword_spaces: '1'
    };

    // Restrict character set for typed content
    if (isTyped) {
      finalConfig.tessedit_char_whitelist =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-()[]{}!?\'" ';
    }

    // Final OCR scan with tuned settings
    const finalScan = await Tesseract.recognize(imagePath, 'eng', {
      langPath,
      logger: () => {},
      ...(finalConfig as any)
    });

    return { text: finalScan.data.text.trim(), mode };
  } catch (error) {
    throw new Error(`OCR failed for image: ${imagePath}`);
  }
}
