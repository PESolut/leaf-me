const fs = require('fs');
const path = require('path');

function countLinesInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return content.split('\n').length;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return 0;
    }
}

function getAllJsFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        
        // Skip node_modules directory
        if (file === 'node_modules') return;
        
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getAllJsFiles(filePath, fileList);
        } else if (path.extname(file) === '.js') {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Start counting from the current directory
const startDir = process.cwd();
const jsFiles = getAllJsFiles(startDir);

let totalLines = 0;
const fileStats = [];

jsFiles.forEach(file => {
    const lineCount = countLinesInFile(file);
    totalLines += lineCount;
    fileStats.push({
        file: path.relative(startDir, file),
        lines: lineCount
    });
});

// Sort files by line count in descending order
fileStats.sort((a, b) => b.lines - a.lines);

// Print results
console.log('\nJavaScript Files Line Count Summary:');
console.log('=====================================');
fileStats.forEach(stat => {
    console.log(`${stat.lines.toString().padEnd(6)} lines: ${stat.file}`);
});
console.log('=====================================');
console.log(`Total: ${totalLines} lines of JavaScript code`);