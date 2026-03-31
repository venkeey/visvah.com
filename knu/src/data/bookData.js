// Import chapter data
import { chapters, getChapterById, getChapterByTitle, getNextChapter, getPreviousChapter } from './chapters/index.js';

// Import other data
import { simulationsData } from './simulationsData.js';
import quizzesData from './quizzesData.js';
import { glossaryData, getGlossaryDefinition, searchGlossary, getAllGlossaryTerms } from './glossary.js';

// Export the complete book data
export const bookData = {
  chapters: chapters,
  simulations: simulationsData,
  quizzes: quizzesData,
  glossary: glossaryData,
  // Helper functions
  getChapterById,
  getChapterByTitle,
  getNextChapter,
  getPreviousChapter,
  getGlossaryDefinition,
  searchGlossary,
  getAllGlossaryTerms
};

// Export individual data for backward compatibility
export { chapters as completeBookData };
export { simulationsData };
export { quizzesData };
export { glossaryData };

// Export helper functions
export { 
  getChapterById, 
  getChapterByTitle, 
  getNextChapter, 
  getPreviousChapter,
  getGlossaryDefinition,
  searchGlossary,
  getAllGlossaryTerms
};



