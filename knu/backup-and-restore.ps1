# Backup and Restore Script for Tokenomics Book React App
# This script helps revert to a working state

Write-Host "🔧 Tokenomics Book React - Backup and Restore Script" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Create backup directory
$backupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "📁 Creating backup directory: $backupDir" -ForegroundColor Yellow

if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

# Backup problematic files
$problemFiles = @(
    "src/data/chapters/chapter01.js",
    "src/data/chapters/chapter02.js", 
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
)

Write-Host "📋 Backing up problematic files..." -ForegroundColor Yellow
foreach ($file in $problemFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir $file
        $backupDirPath = Split-Path $backupPath -Parent
        if (!(Test-Path $backupDirPath)) {
            New-Item -ItemType Directory -Path $backupDirPath -Force | Out-Null
        }
        Copy-Item $file $backupPath -Force
        Write-Host "  ✓ Backed up: $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Backup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 NEXT STEPS TO RESTORE:" -ForegroundColor Cyan
Write-Host "1. The problematic files have been backed up to: $backupDir" -ForegroundColor White
Write-Host "2. You can now safely delete the corrupted files and recreate them" -ForegroundColor White
Write-Host "3. Or restore from a previous working version if you have one" -ForegroundColor White
Write-Host ""
Write-Host "💡 RECOMMENDED APPROACH:" -ForegroundColor Yellow
Write-Host "- Delete the corrupted files" -ForegroundColor White
Write-Host "- Recreate them with clean content" -ForegroundColor White
Write-Host "- Test the application step by step" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To start the application after fixing:" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "📁 Backup location: $backupDir" -ForegroundColor Gray


