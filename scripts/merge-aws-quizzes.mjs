#!/usr/bin/env node
/**
 * Merges AWS quiz definitions into quiz-catalog.json (replaces all AWS entries).
 * Run: node scripts/merge-aws-quizzes.mjs && npm run sync:quiz-seed
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AWS_TOPIC_QUIZZES } from './aws-quiz-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const catalogPath = join(root, 'src/lib/lms/quiz-catalog.json');

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const nonAws = catalog.filter((entry) => entry.courseCode !== 'AWS');
const merged = [...nonAws, ...AWS_TOPIC_QUIZZES];

merged.sort((a, b) => {
  if (a.courseCode !== b.courseCode) return a.courseCode.localeCompare(b.courseCode);
  if (a.moduleNumber !== b.moduleNumber) return a.moduleNumber - b.moduleNumber;
  return a.topicSort - b.topicSort;
});

writeFileSync(catalogPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
console.log(`Updated ${catalogPath}: ${AWS_TOPIC_QUIZZES.length} AWS quizzes (${merged.length} total)`);
