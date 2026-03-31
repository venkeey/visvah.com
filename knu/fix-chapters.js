const fs = require('fs');
const path = require('path');

// Function to add interactive learning section to chapter content
function addInteractiveSection(content, chapterId) {
  const interactiveSection = `

<hr>

<div style="background: rgba(102, 126, 234, 0.1); border: 1px solid rgba(102, 126, 234, 0.3); border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
  <h3 style="color: #4c51bf; margin-top: 0;">🎯 Interactive Learning</h3>
  <p style="color: #4c51bf; margin-bottom: 20px;">Test your knowledge and explore concepts interactively:</p>
  
  <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
    <a href="/quiz/${chapterId}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;">
      🧠 Chapter ${chapterId} Quiz
    </a>
    <a href="/simulation/${chapterId}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;">
      🚀 Chapter ${chapterId} Simulation
    </a>
  </div>
  
  <p style="color: #4c51bf; font-size: 14px; margin-top: 15px; margin-bottom: 0;">
    <strong>Quiz:</strong> Test your understanding of chapter concepts<br>
    <strong>Simulation:</strong> Explore concepts in an interactive environment
  </p>
</div>`;

  return content + interactiveSection;
}

// Function to fix a chapter file
function fixChapterFile(chapterPath, chapterId) {
  try {
    const content = fs.readFileSync(chapterPath, 'utf8');
    
    // Check if the file already has the interactive section
    if (content.includes('🎯 Interactive Learning')) {
      console.log(`Chapter ${chapterId} already has interactive section`);
      return;
    }
    
    // Find the end of the content (before the closing backtick and brace)
    const lastDivIndex = content.lastIndexOf('</div>');
    if (lastDivIndex === -1) {
      console.log(`Chapter ${chapterId} has no closing div, adding interactive section at end`);
      const newContent = addInteractiveSection(content, chapterId);
      fs.writeFileSync(chapterPath, newContent);
      console.log(`Fixed Chapter ${chapterId}`);
      return;
    }
    
    // Insert interactive section before the last closing div
    const beforeLastDiv = content.substring(0, lastDivIndex);
    const afterLastDiv = content.substring(lastDivIndex);
    
    const newContent = beforeLastDiv + addInteractiveSection('', chapterId) + afterLastDiv;
    fs.writeFileSync(chapterPath, newContent);
    
    console.log(`Fixed Chapter ${chapterId}`);
  } catch (error) {
    console.error(`Error fixing Chapter ${chapterId}:`, error.message);
  }
}

// Main execution
console.log('🔧 Fixing Chapter Files...\n');

const chaptersDir = path.join(__dirname, 'src', 'data', 'chapters');

// Fix each chapter file
for (let i = 1; i <= 12; i++) {
  const chapterPath = path.join(chaptersDir, `chapter${i.toString().padStart(2, '0')}.js`);
  if (fs.existsSync(chapterPath)) {
    fixChapterFile(chapterPath, i);
  } else {
    console.log(`Chapter ${i} file not found`);
  }
}

console.log('\n✅ Chapter files fixed!');
console.log('🚀 You can now start the application with: npm start');
