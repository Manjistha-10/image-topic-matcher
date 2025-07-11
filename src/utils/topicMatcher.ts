// // // // // // // // Developed by Manjistha Bidkar
// // // // // // // // Loads topic list from Excel and performs direct keyword matching

// // // // // // // import xlsx from 'xlsx';
// // // // // // // import path from 'path';

// // // // // // // /**
// // // // // // //  * Reads the first column of the first sheet in the Excel file.
// // // // // // //  * Each cell in the column is treated as a topic keyword.
// // // // // // //  */
// // // // // // // export function loadTopicsFromExcel(filePath: string): string[] {
// // // // // // //   const workbook = xlsx.readFile(filePath);
// // // // // // //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
// // // // // // //   const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

// // // // // // //   const topics = data.map(row => row[0]?.toLowerCase().trim()).filter(Boolean);
// // // // // // //   return topics;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Matches topics in the input cleaned text.
// // // // // // //  * Returns all topics that are present as substrings.
// // // // // // //  */
// // // // // // // export function matchTopics(text: string, topics: string[]): string[] {
// // // // // // //   const matched = new Set<string>();
// // // // // // //   const lowerText = text.toLowerCase();

// // // // // // //   for (const topic of topics) {
// // // // // // //     if (topic && lowerText.includes(topic)) {
// // // // // // //       matched.add(topic);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   return Array.from(matched);
// // // // // // // }


// // // // // // // Developed by Manjistha Bidkar
// // // // // // // Loads topic list from Excel and performs fuzzy matching using Fuse.js

// // // // // // import xlsx from 'xlsx';
// // // // // // import path from 'path';
// // // // // // import Fuse from 'fuse.js';

// // // // // // /**
// // // // // //  * Loads first column values from Excel as topic keywords
// // // // // //  */
// // // // // // export function loadTopicsFromExcel(filePath: string): string[] {
// // // // // //   const workbook = xlsx.readFile(filePath);
// // // // // //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
// // // // // //   const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

// // // // // //   const topics = data.map(row => row[0]?.toLowerCase().trim()).filter(Boolean);
// // // // // //   return topics;
// // // // // // }

// // // // // // /**
// // // // // //  * Fuzzy matches topics from cleaned text using Fuse.js
// // // // // //  */
// // // // // // export function matchTopics(text: string, topics: string[]): string[] {
// // // // // //   const fuse = new Fuse(topics, {
// // // // // //     includeScore: true,
// // // // // //     threshold: 0.3, // allow minor variations
// // // // // //   });

// // // // // //   const words = text.split(/\s+/); // break cleaned text into words
// // // // // //   const matches = new Set<string>();

// // // // // //   for (const word of words) {
// // // // // //     const results = fuse.search(word);
// // // // // //     for (const result of results) {
// // // // // //       if (result.score !== undefined && result.score < 0.3) {
// // // // // //         matches.add(result.item);
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   return Array.from(matches);
// // // // // // }











// // // // // //FINAL USING FUZZY LOGIC
// // // // // // Developed by Manjistha Bidkar
// // // // // // Fuzzy but safe topic matcher using conservative Fuse.js settings

// // // // // import xlsx from 'xlsx';
// // // // // import path from 'path';
// // // // // import Fuse from 'fuse.js';

// // // // // /**
// // // // //  * Extracts first column of the Excel as topics
// // // // //  */
// // // // // export function loadTopicsFromExcel(filePath: string): string[] {
// // // // //   const workbook = xlsx.readFile(filePath);
// // // // //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
// // // // //   const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

// // // // //   const topics = data.map(row => row[0]?.toLowerCase().trim()).filter(Boolean);
// // // // //   return topics;
// // // // // }

// // // // // /**
// // // // //  * Matches topics more strictly:
// // // // //  * - First by direct substring
// // // // //  * - Then by fuzzy scoring (very low threshold)
// // // // //  */
// // // // // export function matchTopics(text: string, topics: string[]): string[] {
// // // // //   const cleanedText = text.toLowerCase();
// // // // //   const matchedTopics = new Set<string>();

// // // // //   // 1. Direct phrase match first
// // // // //   for (const topic of topics) {
// // // // //     if (cleanedText.includes(topic)) {
// // // // //       matchedTopics.add(topic);
// // // // //     }
// // // // //   }

// // // // //   // 2. Fuzzy match if direct match not found
// // // // //   const fuse = new Fuse(topics, {
// // // // //     includeScore: true,
// // // // //     threshold: 0.02, // tighter match
// // // // //   });

// // // // //   // Break text into words for loose fuzzy match
// // // // //   const words = cleanedText.split(/\s+/);
// // // // //   for (const word of words) {
// // // // //     const results = fuse.search(word);
// // // // //     for (const result of results) {
// // // // //       if (!matchedTopics.has(result.item) && result.score !== undefined && result.score < 0.02) {
// // // // //         matchedTopics.add(result.item);
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   return Array.from(matchedTopics);
// // // // // }






// // // // // STEMMING AND LEMMITIZATION
// // // // // Developed by Manjistha Bidkar
// // // // // Topic matcher with normalized cleaning, stemming, lemmatization, and Fuse.js fuzzy matching

// // // // import xlsx from 'xlsx';
// // // // import path from 'path';
// // // // import Fuse from 'fuse.js';
// // // // import { cleanText } from './textCleaner'; // ✅ use your cleaner

// // // // /**
// // // //  * Extracts first column of the Excel as topics
// // // //  */
// // // // export function loadTopicsFromExcel(filePath: string): string[] {
// // // //   const workbook = xlsx.readFile(filePath);
// // // //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
// // // //   const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

// // // //   const topics = data.map(row => row[0]?.toLowerCase().trim()).filter(Boolean);
// // // //   return topics;
// // // // }

// // // // /**
// // // //  * Matches topics using:
// // // //  * - Direct substring match (on cleaned/stemmed/lemmatized text)
// // // //  * - Fuzzy scoring (on cleaned text) with conservative threshold
// // // //  */
// // // // export function matchTopics(text: string, topics: string[]): string[] {
// // // //   const cleanedOCR = cleanText(text);
// // // //   const cleanedTopics = topics.map(topic => cleanText(topic)); // stemmed + lemmatized

// // // //   const matchedTopics = new Set<string>();

// // // //   // 1. Direct match on normalized form
// // // //   for (let i = 0; i < cleanedTopics.length; i++) {
// // // //     if (cleanedOCR.includes(cleanedTopics[i])) {
// // // //       matchedTopics.add(topics[i]); // return original topic name
// // // //     }
// // // //   }

// // // //   // 2. Fuzzy match using original topic list
// // // //   const fuse = new Fuse(topics, {
// // // //     includeScore: true,
// // // //     threshold: 0.02,
// // // //   });

// // // //   const words = cleanedOCR.split(' ');
// // // //   for (const word of words) {
// // // //     const results = fuse.search(word);
// // // //     for (const result of results) {
// // // //       if (!matchedTopics.has(result.item) && result.score !== undefined && result.score < 0.02) {
// // // //         matchedTopics.add(result.item);
// // // //       }
// // // //     }
// // // //   }

// // // //   return Array.from(matchedTopics);
// // // // }

// // // // Developed by Manjistha Bidkar
// // // // Loads concepts from Excel and identifies matches using strict and fuzzy logic.

// // // import * as XLSX from 'xlsx';
// // // import Fuse from 'fuse.js';
// // // import { cleanText } from './textCleaner'; // Ensure text is normalized

// // // /**
// // //  * Loads topic concepts from a specific sheet in the Excel file.
// // //  * Exported as 'loadConceptsFromExcel' to match usage in app.ts
// // //  */
// // // export function loadConceptsFromExcel(filePath: string): string[] {
// // //   const workbook = XLSX.readFile(filePath);
// // //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
// // //   const data = XLSX.utils.sheet_to_json<{ Concept: string }>(sheet);

// // //   return data
// // //     .map(row => row.Concept?.trim().toLowerCase())
// // //     .filter((v): v is string => !!v);
// // // }

// // // /**
// // //  * Identifies matching concepts from cleaned OCR text.
// // //  * First applies exact match, then uses fuzzy search for close matches.
// // //  */
// // // export function identifyConcepts(text: string, concepts: string[]): string[] {
// // //   const cleanedText = cleanText(text).toLowerCase();
// // //   const matchedConcepts = new Set<string>();

// // //   // 1. Exact phrase match
// // //   for (const concept of concepts) {
// // //     if (cleanedText.includes(concept)) {
// // //       matchedConcepts.add(concept);
// // //     }
// // //   }

// // //   // 2. Fuzzy match for remaining concepts
// // //   const unmatchedConcepts = concepts.filter(c => !matchedConcepts.has(c));
// // //   const fuse = new Fuse(unmatchedConcepts, {
// // //     includeScore: true,
// // //     threshold: 0.03,
// // //     minMatchCharLength: 4,
// // //   });

// // //   // Generate 2-3 word phrases from cleaned OCR
// // //   const words = cleanedText.split(/\s+/);
// // //   const phrases: string[] = [];
// // //   for (let i = 0; i < words.length - 1; i++) {
// // //     phrases.push(`${words[i]} ${words[i + 1]}`);
// // //     if (i < words.length - 2) {
// // //       phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
// // //     }
// // //   }

// // //   for (const phrase of phrases) {
// // //     const results = fuse.search(phrase);
// // //     for (const result of results) {
// // //       if (result.score !== undefined && result.score < 0.03) {
// // //         matchedConcepts.add(result.item);
// // //       }
// // //     }
// // //   }

// // //   return Array.from(matchedConcepts);
// // // }


// // // src/utils/topicMatcher.ts
// // import * as XLSX from 'xlsx';
// // import Fuse from 'fuse.js';
// // import { cleanText } from './textCleaner';

// // /**
// //  * Extracts 'Concept' column from the sheet
// //  */
// // export function loadConceptsFromExcel(filePath: string): string[] {
// //   const workbook = XLSX.readFile(filePath);
// //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
// //   const data = XLSX.utils.sheet_to_json<{ Concept?: string }>(sheet);

// //   return data
// //     .map(row => row.Concept?.toLowerCase().trim())
// //     .filter((v): v is string => !!v);
// // }

// // /**
// //  * Identifies matching concepts using substring + fuzzy matching
// //  */
// // export function identifyConcepts(text: string, concepts: string[]): string[] {
// //   const cleanedText = cleanText(text);
// //   const matched = new Set<string>();

// //   // Direct match
// //   for (const concept of concepts) {
// //     if (cleanedText.includes(concept)) {
// //       matched.add(concept);
// //     }
// //   }

// //   // Fuzzy match
// //   const fuse = new Fuse(concepts, {
// //     includeScore: true,
// //     threshold: 0.03,
// //     minMatchCharLength: 4,
// //   });

// //   const words = cleanedText.split(/\s+/);
// //   const phrases: string[] = [];

// //   for (let i = 0; i < words.length - 1; i++) {
// //     phrases.push(`${words[i]} ${words[i + 1]}`);
// //     if (i < words.length - 2) phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
// //   }

// //   for (const phrase of phrases) {
// //     const results = fuse.search(phrase);
// //     for (const result of results) {
// //       if (result.score !== undefined && result.score < 0.03) {
// //         matched.add(result.item);
// //       }
// //     }
// //   }

// //   return Array.from(matched);
// // }



// // src/utils/topicMatcher.ts
// // Developed by Manjistha Bidkar

// import * as XLSX from 'xlsx';
// import Fuse from 'fuse.js';
// import { cleanText } from './textCleaner';

// export function loadConceptsFromExcel(filePath: string): string[] {
//   const workbook = XLSX.readFile(filePath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const data = XLSX.utils.sheet_to_json<{ Concept: string }>(sheet);

//   return data
//     .map(row => row.Concept?.trim().toLowerCase())
//     .filter((v): v is string => !!v);
// }

// export function identifyConcepts(text: string, concepts: string[]): string[] {
//   const cleanedText = cleanText(text).toLowerCase();
//   const matched = new Set<string>();

//   for (const concept of concepts) {
//     if (cleanedText.includes(concept)) {
//       matched.add(concept);
//     }
//   }

//   const remaining = concepts.filter(c => !matched.has(c));
//   const fuse = new Fuse(remaining, {
//     includeScore: true,
//     threshold: 0.03,
//     minMatchCharLength: 4,
//   });

//   const words = cleanedText.split(/\s+/);
//   const phrases: string[] = [...words]; // add single words

//   for (let i = 0; i < words.length - 1; i++) {
//     phrases.push(`${words[i]} ${words[i + 1]}`);
//     if (i < words.length - 2) {
//       phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
//     }
//   }


//   for (const phrase of phrases) {
//     const results = fuse.search(phrase);
//     for (const result of results) {
//       if (result.score !== undefined && result.score < 0.03) {
//         matched.add(result.item);
//       }
//     }
//   }

//   return Array.from(matched);
// }


// Developed by Manjistha Bidkar
// Identifies topic matches from transcript text using strict and fuzzy logic.

import * as XLSX from 'xlsx';
import Fuse from 'fuse.js';
import { cleanText } from './textCleaner';

export function loadConceptsFromExcel(filePath: string): string[] {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets['DSA_Concept_Graph'];
  const data = XLSX.utils.sheet_to_json<{ Concept: string }>(sheet);

  return data
    .map(row => row.Concept?.trim().toLowerCase())
    .filter((v): v is string => !!v);
}

export function identifyConcepts(text: string, concepts: string[]): string[] {
  const cleanedText = text.toLowerCase();
  const matchedConcepts = new Set<string>();

  // 1. Strict match (direct phrase match)
  for (const concept of concepts) {
    if (cleanedText.includes(concept)) {
      matchedConcepts.add(concept);
    }
  }

  // 2. Fuzzy match on remaining concepts
  const unmatchedConcepts = concepts.filter(c => !matchedConcepts.has(c));
  const fuse = new Fuse(unmatchedConcepts, {
    includeScore: true,
    threshold: 0.03,
    minMatchCharLength: 4
  });

  // Use sliding window of phrases (2-3 words)
  const words = cleanedText.split(/\s+/);
  const phrases: string[] = [...words];
  
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(`${words[i]} ${words[i + 1]}`);
    if (i < words.length - 2) {
      phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
  }

  for (const phrase of phrases) {
    const results = fuse.search(phrase);
    for (const result of results) {
      if (result.score !== undefined && result.score < 0.03) {
        matchedConcepts.add(result.item);
      }
    }
  }

  return Array.from(matchedConcepts);
}
