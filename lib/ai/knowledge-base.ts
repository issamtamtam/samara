import fs from 'fs';
import path from 'path';

const KNOWLEDGE_FILE_PATH = path.join(process.cwd(), 'knowledge.txt');

export async function readKnowledgeFile(): Promise<string> {
  try {
    if (fs.existsSync(KNOWLEDGE_FILE_PATH)) {
      const content = fs.readFileSync(KNOWLEDGE_FILE_PATH, 'utf-8');
      return content;
    }
    return '';
  } catch (error) {
    console.error('Error reading knowledge file:', error);
    return '';
  }
}

export async function writeKnowledgeFile(content: string): Promise<void> {
  try {
    fs.writeFileSync(KNOWLEDGE_FILE_PATH, content, 'utf-8');
  } catch (error) {
    console.error('Error writing knowledge file:', error);
    throw new Error('Failed to save knowledge base');
  }
}

export async function getKnowledgeFilePath(): Promise<string> {
  return KNOWLEDGE_FILE_PATH;
}
