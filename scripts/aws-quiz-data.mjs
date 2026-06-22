/** AWS Solutions Architect (SAA-C03) topic quiz definitions — source for quiz-catalog.json */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentPath = join(__dirname, 'aws-quiz-content.json');
const rawTopics = JSON.parse(readFileSync(contentPath, 'utf8'));

function q(question, options, correctIndex) {
  return { question, options, correctAnswer: options[correctIndex] };
}

function topic(moduleNumber, topicSort, topicTitle, questions) {
  return {
    courseCode: 'AWS',
    moduleNumber,
    topicSort,
    topicTitle,
    quizTitle: `${topicTitle} — Topic Quiz`,
    passScore: 70,
    maxAttempts: 3,
    questions,
  };
}

export const AWS_TOPIC_QUIZZES = rawTopics.map((entry) =>
  topic(
    entry.moduleNumber,
    entry.topicSort,
    entry.topicTitle,
    entry.questions.map((item) => q(item.question, item.options, item.correctIndex)),
  ),
);
