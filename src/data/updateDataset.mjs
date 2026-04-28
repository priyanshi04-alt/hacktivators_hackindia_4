import fs from 'fs';

const filePath = './SchemesData.js';

let content = fs.readFileSync(filePath, 'utf8');

// Replace "category": "something" with "occupation": "something",\n    "category": ["General", "SC", "ST", "OBC"]
content = content.replace(/"category":\s*"([^"]+)"/g, `"occupation": "$1",
    "category": ["General", "SC", "ST", "OBC"]`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('SchemesData.js updated successfully!');
