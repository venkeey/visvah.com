#!/usr/bin/env python3
import os
import re

def fix_js_file(file_path):
    """Fix JavaScript syntax errors in a file"""
    print(f"Fixing {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix 1: Add missing semicolons after object properties
    content = re.sub(r'(\s+)(title|description|estimatedReadingTime|nextChapter):\s*"([^"]*)"', r'\1\2: "\3",', content)
    
    # Fix 2: Remove orphaned content after export statements
    # Find the last export statement and remove everything after it
    export_match = re.search(r'(export\s+default\s+\w+;)', content, re.DOTALL)
    if export_match:
        content = content[:export_match.end()]
    
    # Fix 3: Remove duplicate styled components and functions
    # Remove any duplicate const declarations after export default
    lines = content.split('\n')
    cleaned_lines = []
    in_export_section = False
    seen_declarations = set()
    
    for line in lines:
        if 'export default' in line:
            in_export_section = True
            cleaned_lines.append(line)
        elif in_export_section and line.strip().startswith('const '):
            # Skip duplicate const declarations
            continue
        elif in_export_section and line.strip().startswith('function '):
            # Skip duplicate function declarations
            continue
        elif in_export_section and line.strip().startswith('export '):
            # Skip duplicate export statements
            continue
        else:
            cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    # Fix 4: Remove orphaned markdown content
    # Remove any lines that start with markdown syntax outside of template literals
    lines = content.split('\n')
    cleaned_lines = []
    in_template_literal = False
    brace_count = 0
    
    for line in lines:
        if '`' in line:
            # Count backticks to track template literal state
            backtick_count = line.count('`')
            if backtick_count % 2 == 1:  # Odd number of backticks
                in_template_literal = not in_template_literal
        
        if in_template_literal:
            cleaned_lines.append(line)
        elif line.strip().startswith('**') and line.strip().endswith('**'):
            # Skip orphaned markdown bold text
            continue
        elif line.strip().startswith('## '):
            # Skip orphaned markdown headers
            continue
        elif line.strip().startswith('# '):
            # Skip orphaned markdown headers
            continue
        else:
            cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    # Fix 5: Ensure proper object structure
    # Make sure the main object has proper closing
    if 'export const' in content and not content.strip().endswith('};'):
        # Find the last closing brace and ensure proper structure
        last_brace = content.rfind('}')
        if last_brace != -1:
            content = content[:last_brace + 1] + ';'
    
    # Write the fixed content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed {file_path}")

def main():
    """Main function to fix all JavaScript files"""
    base_dir = "src"
    
    # Files to fix
    files_to_fix = [
        "src/data/chapters/chapter03.js",
        "src/data/chapters/chapter04.js", 
        "src/data/chapters/chapter05.js",
        "src/data/chapters/chapter06.js",
        "src/data/chapters/chapter07.js",
        "src/data/chapters/chapter08.js",
        "src/data/chapters/chapter09.js",
        "src/data/chapters/chapter10.js",
        "src/data/chapters/chapter11.js",
        "src/data/chapters/chapter12.js",
        "src/data/glossary.js",
        "src/data/quizzesData.js",
        "src/pages/GlossaryPage.js",
        "src/pages/SimulationPage.js",
        "src/utils/glossaryParser.js"
    ]
    
    for file_path in files_to_fix:
        if os.path.exists(file_path):
            fix_js_file(file_path)
        else:
            print(f"File not found: {file_path}")

if __name__ == "__main__":
    main()


