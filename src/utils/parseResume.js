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
 * 依副檔名判斷解析方式，將履歷檔案轉為純文字
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function parseResumeFile(file) {
  if (!file) {
    throw new Error('請選擇一個檔案');
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`檔案大小不能超過 ${MAX_FILE_SIZE_MB}MB`);
  }

  if (file.type === 'application/pdf') {
    return extractPdfText(file);
  }

  if (file.name.toLowerCase().endsWith('.docx')) {
    return extractDocxText(file);
  }

  if (file.name.toLowerCase().endsWith('.doc')) {
    throw new Error('不支援舊版 .doc 格式，請另存為 .docx 或 .pdf');
  }

  throw new Error('僅支援 .pdf 或 .docx 格式');
}
