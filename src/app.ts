// // // // // // // // // Developed by Manjistha Bidkar
// // // // // // // // import express, { Request, Response } from 'express';
// // // // // // // // import multer from 'multer';
// // // // // // // // import path from 'path';
// // // // // // // // import fs from 'fs';
// // // // // // // // import { preprocessImage, PreprocessMode } from './utils/preprocess';
// // // // // // // // import { extractTextFromImage, OCRMode } from './utils/ocr';
// // // // // // // // // @ts-ignore
// // // // // // // // const dictionary = require('dictionary-en');
// // // // // // // // // @ts-ignore
// // // // // // // // import nspell from 'nspell';

// // // // // // // // const app = express();
// // // // // // // // const PORT = 3000;

// // // // // // // // const IMAGE_DIR = path.join(__dirname, '../images');
// // // // // // // // if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

// // // // // // // // const upload = multer({ dest: IMAGE_DIR });

// // // // // // // // app.post('/extract-text', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
// // // // // // // //   try {
// // // // // // // //     if (!req.file) {
// // // // // // // //       res.status(400).send('No file uploaded');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const originalPath = req.file.path;
// // // // // // // //     const processedPath = path.join(IMAGE_DIR, `processed-${Date.now()}.png`);

// // // // // // // //     // Step 1: Initial scan
// // // // // // // //     const initialResult = await extractTextFromImage(originalPath, true);
// // // // // // // //     const detectedMode: OCRMode = initialResult.mode!;
// // // // // // // //     const preprocessMode: PreprocessMode =
// // // // // // // //       detectedMode === OCRMode.TYPED ? PreprocessMode.TYPED : PreprocessMode.HANDWRITTEN;

// // // // // // // //     // Step 2: Preprocess
// // // // // // // //     await preprocessImage(originalPath, processedPath, preprocessMode);

// // // // // // // //     // Step 3: Final OCR
// // // // // // // //     const finalResult = await extractTextFromImage(processedPath);
// // // // // // // //     const finalText: string = finalResult.text;

// // // // // // // //     // Step 4: Spell correction
// // // // // // // //     const correctedText = await new Promise<string>((resolve, reject) => {
// // // // // // // //       dictionary((err: Error | null, dict: any) => {
// // // // // // // //         if (err) return reject(err);
// // // // // // // //         const spell = nspell(dict);
// // // // // // // //         const corrected = finalText
// // // // // // // //           .split(/\s+/)
// // // // // // // //           .map((word: string) => (spell.correct(word) ? word : spell.suggest(word)[0] || word))
// // // // // // // //           .join(' ');
// // // // // // // //         resolve(corrected);
// // // // // // // //       });
// // // // // // // //     });

// // // // // // // //     // Step 5: Cleanup
// // // // // // // //     fs.unlinkSync(originalPath);
// // // // // // // //     fs.unlinkSync(processedPath);

// // // // // // // //     res.json({ text: correctedText.trim() });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error('OCR error:', err);
// // // // // // // //     res.status(500).send('Error processing image');
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // app.listen(PORT, () => {
// // // // // // // //   console.log(`Server running at http://localhost:${PORT}`);
// // // // // // // // });


// // // // // // // //--------------------------------------- WORKING -----------------------------------------
// // // // // // // // Developed by Manjistha Bidkar
// // // // // // // import express from 'express';
// // // // // // // import multer from 'multer';
// // // // // // // import path from 'path';
// // // // // // // import fs from 'fs';
// // // // // // // import { preprocessImage, PreprocessMode } from './utils/preprocess';
// // // // // // // import { extractTextFromImage } from './utils/ocr';

// // // // // // // const app = express();
// // // // // // // const PORT = 3000;

// // // // // // // // Ensure images folder exists
// // // // // // // const IMAGE_DIR = path.join(__dirname, '../images');
// // // // // // // if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

// // // // // // // // Multer config
// // // // // // // const upload = multer({ dest: IMAGE_DIR });

// // // // // // // app.post('/extract-text', upload.single('image'), async (req, res) => {
// // // // // // //   try {
// // // // // // //     if (!req.file) {
// // // // // // //       res.status(400).send('No file uploaded');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const originalPath = req.file.path;
// // // // // // //     const processedPath = path.join(IMAGE_DIR, `processed-${Date.now()}.jpg`);

// // // // // // //     // Run initial OCR to determine type
// // // // // // //     const { text: initialText, mode } = await extractTextFromImage(originalPath);

// // // // // // //     // Re-preprocess based on mode (fix for TS error)
// // // // // // //     await preprocessImage(originalPath, processedPath, mode);

// // // // // // //     // Run final OCR on preprocessed image
// // // // // // //     const { text: finalText } = await extractTextFromImage(processedPath);

// // // // // // //     fs.unlinkSync(originalPath);
// // // // // // //     fs.unlinkSync(processedPath);

// // // // // // //     res.json({ text: finalText });
// // // // // // //   } catch (err) {
// // // // // // //     console.error('OCR error:', err);
// // // // // // //     res.status(500).send('Error processing image');
// // // // // // //   }
// // // // // // // });

// // // // // // // app.listen(PORT, () => {
// // // // // // //   console.log(`Server running at http://localhost:${PORT}`);
// // // // // // // });
// // // // // // // //-------------------------------------  END WORKING ------------------------------------------------ 



// // // // // // // Developed by Manjistha Bidkar
// // // // // // // This Express server accepts image uploads, detects whether the content is typed or handwritten,
// // // // // // // preprocesses the image accordingly, extracts text using Tesseract OCR, and returns cleaned text for topic matching.

// // // // // // import express from 'express';
// // // // // // import multer from 'multer';
// // // // // // import path from 'path';
// // // // // // import fs from 'fs';
// // // // // // import dayjs from 'dayjs';
// // // // // // import { preprocessImage, PreprocessMode } from './utils/preprocess';
// // // // // // import { extractTextFromImage } from './utils/ocr';

// // // // // // const app = express();
// // // // // // const PORT = 3000;

// // // // // // // Directory to store uploaded and processed images
// // // // // // const IMAGE_DIR = path.join(__dirname, '../images');
// // // // // // if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: (req, file, cb) => cb(null, IMAGE_DIR),
// // // // // //   filename: (req, file, cb) => {
// // // // // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // // // // //     const ext = path.extname(file.originalname);
// // // // // //     cb(null, `upload-${timestamp}${ext}`);
// // // // // //   }
// // // // // // });

// // // // // // // Multer setup for file upload
// // // // // // const upload = multer({ dest: IMAGE_DIR });

// // // // // // // Text cleanup function
// // // // // // function cleanText(text: string): string {
// // // // // //   return text
// // // // // //     .replace(/[^\x20-\x7E\n]/g, '')     // Remove non-ASCII
// // // // // //     .replace(/[^\w\s\n]/g, '')          // Remove punctuation
// // // // // //     .replace(/\b\w{1,2}\b/g, '')        // Remove very short words like "j", "oo" if needed
// // // // // //     .replace(/\s{2,}/g, ' ')            // Collapse extra spaces
// // // // // //     .replace(/\n+/g, ' ')               // Remove all newlines
// // // // // //     .toLowerCase()
// // // // // //     .trim();
// // // // // //   }

// // // // // // app.post('/extract-text', upload.single('image'), async (req, res) => {
// // // // // //   try {
// // // // // //     if (!req.file) {
// // // // // //       res.status(400).send('No file uploaded');
// // // // // //       return;
// // // // // //     }

// // // // // //     const originalPath = req.file.path;
// // // // // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // // // // //     const processedPath = path.join(IMAGE_DIR, `processed-${timestamp}.jpg`);

// // // // // //     console.log(`[UPLOAD] Received file: ${req.file.originalname} -> Saved as: ${req.file.path}`);

// // // // // //     // Step 1: Initial scan to detect mode
// // // // // //     const { text: initialText, mode } = await extractTextFromImage(originalPath);

// // // // // //     // Step 2: Preprocess based on mode
// // // // // //     await preprocessImage(originalPath, processedPath, mode);

// // // // // //     // Step 3: Final OCR
// // // // // //     const { text: finalText } = await extractTextFromImage(processedPath);

// // // // // //     // Step 4: Clean text
// // // // // //     const cleanedText = cleanText(finalText);

// // // // // //     // Step 5: Cleanup
// // // // // //     fs.unlinkSync(originalPath);
// // // // // //     fs.unlinkSync(processedPath);

// // // // // //     res.json({ text: cleanedText });
// // // // // //   } catch (err) {
// // // // // //     console.error('OCR error:', err);
// // // // // //     res.status(500).send('Error processing image');
// // // // // //   }
// // // // // // });

// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`Server running at http://localhost:${PORT}`);
// // // // // // });


// // // // // // Developed by Manjistha Bidkar
// // // // // // Express server that accepts an image, detects typed vs handwritten,
// // // // // // applies preprocessing, extracts text via Tesseract, cleans it, and
// // // // // // matches it against topics listed in an Excel file.

// // // // // import express from 'express';
// // // // // import multer from 'multer';
// // // // // import path from 'path';
// // // // // import fs from 'fs';
// // // // // import dayjs from 'dayjs';

// // // // // import { preprocessImage, PreprocessMode } from './utils/preprocess';
// // // // // import { extractTextFromImage } from './utils/ocr';
// // // // // import { cleanText } from './utils/textCleaner';
// // // // // import { loadTopicsFromExcel, matchTopics } from './utils/topicMatcher';

// // // // // const app = express();
// // // // // const PORT = 3000;

// // // // // // Directory to store uploaded and processed images
// // // // // const IMAGE_DIR = path.join(__dirname, '../images');
// // // // // if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

// // // // // // Path to Excel file containing topic list
// // // // // const EXCEL_PATH = path.join(__dirname, '../DSA_Concept_Graph.xlsx');
// // // // // const topicsList = loadTopicsFromExcel(EXCEL_PATH); // Load once

// // // // // // Multer config to save uploaded image with timestamped filename
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => cb(null, IMAGE_DIR),
// // // // //   filename: (req, file, cb) => {
// // // // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // // // //     const ext = path.extname(file.originalname);
// // // // //     cb(null, `upload-${timestamp}${ext}`);
// // // // //   }
// // // // // });

// // // // // const upload = multer({ storage });

// // // // // // Main API: receives image, runs OCR, matches topics
// // // // // app.post('/extract-text', upload.single('image'), async (req, res) => {
// // // // //   try {
// // // // //     if (!req.file) {
// // // // //       res.status(400).send('No file uploaded');
// // // // //       return;
// // // // //     }

// // // // //     const originalPath = req.file.path;
// // // // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // // // //     const processedPath = path.join(IMAGE_DIR, `processed-${timestamp}.jpg`);

// // // // //     console.log(`[UPLOAD] Received file: ${req.file.originalname} -> Saved as: ${originalPath}`);

// // // // //     // Initial scan to detect content type
// // // // //     const { text: initialText, mode } = await extractTextFromImage(originalPath);

// // // // //     // Preprocess based on detected mode
// // // // //     await preprocessImage(originalPath, processedPath, mode);

// // // // //     // Final OCR on preprocessed image
// // // // //     const { text: finalText } = await extractTextFromImage(processedPath);

// // // // //     // Clean text
// // // // //     const cleanedText = cleanText(finalText);

// // // // //     // Match topics
// // // // //     const matchedTopics = matchTopics(cleanedText, topicsList);

// // // // //     // Cleanup uploaded/processed files
// // // // //     fs.unlinkSync(originalPath);
// // // // //     fs.unlinkSync(processedPath);

// // // // //     // Final response
// // // // //     res.json({ text: cleanedText, topics: matchedTopics });
// // // // //   } catch (err) {
// // // // //     console.error('OCR error:', err);
// // // // //     res.status(500).send('Error processing image');
// // // // //   }
// // // // // });

// // // // // app.listen(PORT, () => {
// // // // //   console.log(`Server running at http://localhost:${PORT}`);
// // // // // });


// // // // // Developed by Manjistha Bidkar
// // // // // Express server that accepts image uploads, detects typed vs handwritten,
// // // // // applies preprocessing, extracts text via Tesseract, cleans it,
// // // // // and matches it against topics listed in an Excel file.


// // // // // Developed by Manjistha Bidkar
// // // // // Express server that accepts an image, detects typed vs handwritten,
// // // // // applies preprocessing, extracts text via Tesseract, cleans it, and
// // // // // matches it against topics listed in an Excel file.

// // // // import express from 'express';
// // // // import multer from 'multer';
// // // // import path from 'path';
// // // // import fs from 'fs-extra'; // ✅ fixed import
// // // // import dayjs from 'dayjs';

// // // // import { preprocessImage, PreprocessMode } from './utils/preprocess';
// // // // import { extractTextFromImage } from './utils/ocr';
// // // // import { cleanText } from './utils/textCleaner';
// // // // import { loadConceptsFromExcel as loadTopicsFromExcel, identifyConcepts as matchTopics } from './utils/topicMatcher';

// // // // const app = express();
// // // // const PORT = 3000;

// // // // // Ensure image directory exists
// // // // const IMAGE_DIR = path.join(__dirname, '../images');
// // // // if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

// // // // // Load concepts once from Excel
// // // // const EXCEL_PATH = path.join(__dirname, '../DSA_Concept_Graph.xlsx');
// // // // const topicsList = loadTopicsFromExcel(EXCEL_PATH);

// // // // // Configure Multer to store uploaded files with timestamped name
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => cb(null, IMAGE_DIR),
// // // //   filename: (req, file, cb) => {
// // // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // // //     const ext = path.extname(file.originalname);
// // // //     cb(null, `upload-${timestamp}${ext}`);
// // // //   }
// // // // });

// // // // const upload = multer({ storage });

// // // // // OCR API endpoint
// // // // app.post('/extract-text', upload.single('image'), async (req, res): Promise<void> => {
// // // //   try {
// // // //     if (!req.file) {
// // // //       res.status(400).send('No file uploaded');
// // // //       return;
// // // //     }

// // // //     const originalPath = req.file.path;
// // // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // // //     const processedPath = path.join(IMAGE_DIR, `processed-${timestamp}.jpg`);

// // // //     console.log(`[UPLOAD] File received: ${req.file.originalname}`);

// // // //     // Step 1: Detect typed/handwritten
// // // //     const { text: initialText, mode } = await extractTextFromImage(originalPath);

// // // //     // Step 2: Preprocess based on mode
// // // //     await preprocessImage(originalPath, processedPath, mode);

// // // //     // Step 3: Final OCR on processed image
// // // //     const { text: finalText } = await extractTextFromImage(processedPath);

// // // //     // Step 4: Cleanup text
// // // //     const cleanedText = cleanText(finalText);

// // // //     // Step 5: Topic matching
// // // //     const matchedTopics = matchTopics(cleanedText, topicsList);

// // // //     // Step 6: Delete image files
// // // //     await fs.remove(originalPath);
// // // //     await fs.remove(processedPath);

// // // //     res.json({ text: cleanedText, topics: matchedTopics });
// // // //   } catch (err) {
// // // //     console.error('OCR error:', err);
// // // //     res.status(500).send('Error processing image');
// // // //   }
// // // // });

// // // // app.listen(PORT, () => {
// // // //   console.log(`✅ Server running at http://localhost:${PORT}`);
// // // // });


// // // // src/app.ts
// // // // Developed by Manjistha Bidkar

// // // import express, { Request, Response } from 'express';
// // // import multer from 'multer';
// // // import path from 'path';
// // // import fs from 'fs-extra';
// // // import dayjs from 'dayjs';

// // // import { preprocessImage } from './utils/preprocess';
// // // import { extractTextFromImage } from './utils/ocr';
// // // import { cleanText } from './utils/textCleaner';
// // // import { loadConceptsFromExcel, identifyConcepts } from './utils/topicMatcher';

// // // const app = express();
// // // const PORT = 3000;

// // // const IMAGE_DIR = path.join(__dirname, '../images');
// // // fs.ensureDirSync(IMAGE_DIR);

// // // const storage = multer.diskStorage({
// // //   destination: (_, __, cb) => cb(null, IMAGE_DIR),
// // //   filename: (_, file, cb) => {
// // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // //     const ext = path.extname(file.originalname);
// // //     cb(null, `upload-${timestamp}${ext}`);
// // //   }
// // // });
// // // const upload = multer({ storage });

// // // // Load topic concepts once
// // // const EXCEL_PATH = path.join(__dirname, '../DSA_Concept_Graph.xlsx');
// // // const topicsList = loadConceptsFromExcel(EXCEL_PATH);

// // // app.post('/extract-text', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
// // //   try {
// // //     if (!req.file) {
// // //       res.status(400).send('No file uploaded');
// // //       return;
// // //     }

// // //     const originalPath = req.file.path;
// // //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// // //     const processedPath = path.join(IMAGE_DIR, `processed-${timestamp}.jpg`);

// // //     console.log(`[UPLOAD] File received: ${req.file.originalname}`);

// // //     const { text: initialText, mode } = await extractTextFromImage(originalPath);
// // //     await preprocessImage(originalPath, processedPath, mode);
// // //     const { text: finalText } = await extractTextFromImage(processedPath);
// // //     const cleaned = cleanText(finalText);
// // //     const matchedTopics = identifyConcepts(cleaned, topicsList);

// // //     fs.removeSync(originalPath);
// // //     fs.removeSync(processedPath);

// // //     res.json({ text: cleaned, topics: matchedTopics });
// // //   } catch (err) {
// // //     console.error('OCR error:', err);
// // //     res.status(500).send('Error processing image');
// // //   }
// // // });

// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running at http://localhost:${PORT}`);
// // // });


// // // src/app.ts
// // import express from 'express';
// // import multer from 'multer';
// // import path from 'path';
// // import fs from 'fs-extra';
// // import dayjs from 'dayjs';

// // import { preprocessImage } from './utils/preprocess';
// // import { extractTextFromImage } from './utils/ocr';
// // import { cleanText } from './utils/textCleaner';
// // import { loadConceptsFromExcel, identifyConcepts } from './utils/topicMatcher';

// // const app = express();
// // const PORT = 3000;

// // const IMAGE_DIR = path.join(__dirname, '../images');
// // if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

// // // Load concepts once from Excel
// // const EXCEL_PATH = path.join(__dirname, '../DSA_Concept_Graph.xlsx');
// // const conceptList = loadConceptsFromExcel(EXCEL_PATH);

// // // Setup multer
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, IMAGE_DIR),
// //   filename: (req, file, cb) => {
// //     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
// //     const ext = path.extname(file.originalname);
// //     cb(null, `upload-${timestamp}${ext}`);
// //   }
// // });
// // const upload = multer({ storage });

// // app.post('/extract-text', upload.single('image'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       res.status(400).send('No file uploaded');
// //       return;
// //     }

// //     const originalPath = req.file.path;
// //     const processedPath = path.join(IMAGE_DIR, `processed-${Date.now()}.jpg`);

// //     const { text: initialText, mode } = await extractTextFromImage(originalPath);
// //     await preprocessImage(originalPath, processedPath, mode);
// //     const { text: finalText } = await extractTextFromImage(processedPath);
// //     const cleaned = cleanText(finalText);
// //     const matchedConcepts = identifyConcepts(cleaned, conceptList);

// //     await fs.remove(originalPath);
// //     await fs.remove(processedPath);

// //     // ✅ DO NOT return this
// //     res.json({ text: cleaned, topics: matchedConcepts });
// //   } catch (err) {
// //     console.error('Error:', err);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });


// // app.listen(PORT, () => {
// //   console.log(`✅ Server running at http://localhost:${PORT}`);
// // });


// // src/app.ts
// // Developed by Manjistha Bidkar

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs-extra';
// import dayjs from 'dayjs';
// // Replace hardcoded paths with config
// import { config } from './config';

// const IMAGE_DIR = config.IMAGE_DIR;
// const EXCEL_PATH = config.EXCEL_PATH;
// const PORT = 3000;


// import { preprocessImage, PreprocessMode } from './utils/preprocess';
// import { extractTextFromImage } from './utils/ocr';
// import { cleanText } from './utils/textCleaner';
// import { loadConceptsFromExcel, identifyConcepts } from './utils/topicMatcher';

// const app = express();

// // Ensure images directory exists
// fs.ensureDirSync(IMAGE_DIR);

// // Load concepts once during boot
// const concepts = loadConceptsFromExcel(EXCEL_PATH);

// // Multer config to store uploaded images
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, IMAGE_DIR),
//   filename: (_, file, cb) => {
//     const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
//     const ext = path.extname(file.originalname);
//     cb(null, `upload-${timestamp}${ext}`);
//   }
// });
// const upload = multer({ storage });

// app.post('/extract-text', upload.single('image'), async (req, res): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).send('No file uploaded');
//       return;
//     }

//     const originalPath = req.file.path;
//     const processedPath = path.join(IMAGE_DIR, `processed-${Date.now()}.jpg`);

//     console.log(`[UPLOAD] Processing ${originalPath}`);

//     const { text: initialText, mode } = await extractTextFromImage(originalPath);
//     await preprocessImage(originalPath, processedPath, mode);

//     const { text: finalText } = await extractTextFromImage(processedPath);
//     const cleaned = cleanText(finalText);
//     const topics = identifyConcepts(cleaned, concepts);

//     await fs.remove(originalPath);
//     await fs.remove(processedPath);

//     res.json({ text: cleaned, topics });
//   } catch (err) {
//     console.error('OCR error:', err);
//     res.status(500).send('Error processing image');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });




import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { config } from './config';
import { preprocessImage, PreprocessMode } from './utils/preprocess';
import { extractTextFromImage } from './utils/ocr';
import { cleanText } from './utils/textCleaner';
import { loadConceptsFromExcel, identifyConcepts } from './utils/topicMatcher';

const app = express();
const IMAGE_DIR = config.IMAGE_DIR;
const EXCEL_PATH = config.EXCEL_PATH;

// Ensure the port is a number for app.listen
const PORT = typeof config.PORT === 'string' ? parseInt(config.PORT, 10) : config.PORT;

// Ensure directories exist
fs.ensureDirSync(IMAGE_DIR);

// Load concepts once during boot
const concepts = loadConceptsFromExcel(EXCEL_PATH);

// Multer config with timestamp + UUID for safe multi-user upload
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, IMAGE_DIR),
  filename: (_, file, cb) => {
    const timestamp = dayjs().format('YYYYMMDD-HHmmss-SSS');
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `upload-${timestamp}-${uniqueId}${ext}`);
  }
});

const upload = multer({ storage });

// POST /extract-text
app.post('/extract-text', upload.single('image'), async (req, res): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded');
      return;
    }

    const originalPath = req.file.path;
    const processedPath = path.join(IMAGE_DIR, `processed-${Date.now()}.jpg`);

    console.log(`[UPLOAD] Processing ${originalPath}`);

    const { text: initialText, mode } = await extractTextFromImage(originalPath);
    await preprocessImage(originalPath, processedPath, mode);

    const { text: finalText } = await extractTextFromImage(processedPath);
    const cleaned = cleanText(finalText);
    const topics = identifyConcepts(cleaned, concepts);

    await fs.remove(originalPath);
    await fs.remove(processedPath);

    res.json({ text: cleaned, topics });
  } catch (err) {
    console.error('OCR error:', err);
    res.status(500).send('Error processing image');
  }
});

app.listen(PORT, () => {
  console.log(`Server running and listening on port ${PORT}`);
});

