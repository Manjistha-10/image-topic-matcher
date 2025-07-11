// // // Developed by Manjistha Bidkar
// // // Utility function to clean OCR-extracted text for accurate topic matching

// // /**
// //  * Cleans the input OCR text by:
// //  * - Removing non-ASCII characters
// //  * - Removing punctuation
// //  * - Removing very short words (1–2 letters)
// //  * - Collapsing extra whitespace and newlines
// //  * - Converting to lowercase
// //  */
// // export function cleanText(text: string): string {
// //   return text
// //     .replace(/[^\x20-\x7E\n]/g, '')     // Remove non-ASCII
// //     .replace(/[^\w\s\n]/g, '')          // Remove punctuation
// //     .replace(/\b\w{1,2}\b/g, '')        // Remove very short words
// //     .replace(/\s{2,}/g, ' ')            // Collapse extra spaces
// //     .replace(/\n+/g, ' ')               // Remove newlines
// //     .toLowerCase()
// //     .trim();
// // }



// // Developed by Manjistha Bidkar
// // Utility function to clean and normalize OCR-extracted text for accurate topic matching

// import natural from 'natural';

// const stemmer = natural.PorterStemmer;

// /**
//  * Basic rule-based lemmatizer for common cases
//  */
// function lemmatize(word: string): string {
//   if (word.endsWith('ing') && word.length > 4) return word.slice(0, -3);
//   if (word.endsWith('ed') && word.length > 3) return word.slice(0, -2);
//   if (word.endsWith('es') && word.length > 3) return word.slice(0, -2);
//   if (word.endsWith('s') && word.length > 2) return word.slice(0, -1);
//   return word;
// }

// /**
//  * Cleans and normalizes the input OCR text:
//  * - Removes non-ASCII and punctuation
//  * - Removes very short words
//  * - Collapses spaces and newlines
//  * - Applies lemmatization and stemming
//  * - Converts to lowercase
//  */
// export function cleanText(text: string): string {
//   return text
//     .replace(/[^\x20-\x7E\n]/g, '')     // Remove non-ASCII
//     .replace(/[^\w\s\n]/g, '')          // Remove punctuation
//     .replace(/\b\w{1,2}\b/g, '')        // Remove very short words
//     .replace(/\s{2,}/g, ' ')            // Collapse extra spaces
//     .replace(/\n+/g, ' ')               // Remove newlines
//     .toLowerCase()
//     .split(' ')
//     .map(word => stemmer.stem(lemmatize(word)))
//     .join(' ')
//     .trim();
// }


// src/utils/textCleaner.ts
// Developed by Manjistha Bidkar

/**
 * Cleans the input OCR text by:
 * - Removing non-ASCII characters
 * - Removing punctuation
 * - Removing very short words (1–2 letters)
 * - Collapsing extra whitespace and newlines
 * - Converting to lowercase
 */
export function cleanText(text: string): string {
  return text
    .replace(/[^\x20-\x7E\n]/g, '')     // Remove non-ASCII
    .replace(/[^\w\s\n]/g, '')          // Remove punctuation
    .replace(/\b\w{1,2}\b/g, '')        // Remove very short words
    .replace(/\s{2,}/g, ' ')            // Collapse extra spaces
    .replace(/\n+/g, ' ')               // Remove newlines
    .toLowerCase()
    .trim();
}
