// Import all chapter data
import { chapter01 } from './chapter01.js';
import { chapter02 } from './chapter02.js';
import { chapter03 } from './chapter03.js';
import { chapter04 } from './chapter04.js';
import { chapter05 } from './chapter05.js';
import { chapter06 } from './chapter06.js';
import { chapter07 } from './chapter07.js';
import { chapter08 } from './chapter08.js';
import { chapter09 } from './chapter09.js';
import { chapter10 } from './chapter10.js';
import { chapter11 } from './chapter11.js';
import { chapter12 } from './chapter12.js';

// Export all chapter data
export { chapter01 } from './chapter01.js';
export { chapter02 } from './chapter02.js';
export { chapter03 } from './chapter03.js';
export { chapter04 } from './chapter04.js';
export { chapter05 } from './chapter05.js';
export { chapter06 } from './chapter06.js';
export { chapter07 } from './chapter07.js';
export { chapter08 } from './chapter08.js';
export { chapter09 } from './chapter09.js';
export { chapter10 } from './chapter10.js';
export { chapter11 } from './chapter11.js';
export { chapter12 } from './chapter12.js';

// Create a chapters array for easy iteration
export const chapters = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
  chapter12
];

// Helper function to get chapter by ID
export const getChapterById = (id) => {
  return chapters.find(chapter => chapter.id === id);
};

// Helper function to get chapter by title
export const getChapterByTitle = (title) => {
  return chapters.find(chapter => chapter.title === title);
};

// Helper function to get next chapter
export const getNextChapter = (currentChapterId) => {
  const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapterId);
  if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
    return chapters[currentIndex + 1];
  }
  return null;
};

// Helper function to get previous chapter
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapterId);
  if (currentIndex > 0) {
    return chapters[currentIndex - 1];
  }
  return null;
};
