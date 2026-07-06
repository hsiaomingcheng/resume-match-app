import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.mjs';

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item) => item.str).join(' ') + '\n';
  }
  return fullText.trim();
}

async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

const MAX_FILE_SIZE_MB = 10;

/**
 * Convert a resume file to plain text based on its extension
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function parseResumeFile(file) {
  if (!file) {
    throw new Error('Please select a file');
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size cannot exceed ${MAX_FILE_SIZE_MB}MB`);
  }

  if (file.type === 'application/pdf') {
    return extractPdfText(file);
  }

  if (file.name.toLowerCase().endsWith('.docx')) {
    return extractDocxText(file);
  }

  if (file.name.toLowerCase().endsWith('.doc')) {
    throw new Error('Legacy .doc format is not supported — please save as .docx or .pdf');
  }

  throw new Error('Only .pdf or .docx files are supported');
}
