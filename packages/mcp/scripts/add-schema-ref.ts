import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(process.cwd(), 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.md'));

const schemaRef = '# yaml-language-server: $schema=../frontmatter.schema.json';

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.startsWith('---\n')) {
    // Check if ref already exists
    if (!content.includes(schemaRef)) {
      const lines = content.split('\n');
      // Insert after first line
      lines.splice(1, 0, schemaRef);
      content = lines.join('\n');
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
        console.log(`Skipped ${file} (already has schema ref)`);
    }
  } else {
      console.warn(`Skipped ${file} (no frontmatter start)`);
  }
}
