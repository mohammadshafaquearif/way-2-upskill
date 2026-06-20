#!/usr/bin/env node
/**
 * Merges AAC quiz definitions into quiz-catalog.json (replaces all AAC entries).
 * Run: node scripts/merge-aac-quizzes.mjs && npm run sync:quiz-seed
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AAC_TOPIC_QUIZZES } from './aac-quiz-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const catalogPath = join(root, 'src/lib/lms/quiz-catalog.json');

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const nonAac = catalog.filter((entry) => entry.courseCode !== 'AAC');
const merged = [...nonAac, ...AAC_TOPIC_QUIZZES];

merged.sort((a, b) => {
  if (a.courseCode !== b.courseCode) return a.courseCode.localeCompare(b.courseCode);
  if (a.moduleNumber !== b.moduleNumber) return a.moduleNumber - b.moduleNumber;
  return a.topicSort - b.topicSort;
});

writeFileSync(catalogPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
console.log(`Updated ${catalogPath}: ${AAC_TOPIC_QUIZZES.length} AAC quizzes (${merged.length} total)`);
