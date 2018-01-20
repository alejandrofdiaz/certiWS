const puppeteer = require('puppeteer');
const htmlTemplate = require('./contentHtml');
const stylesheet = require('./stylesheet');
const path = require('path');

const CWDPath = process.cwd();

/**
 * Renders a html template into a PDF file.
 *
 * @param {string} html
 * @param {string} filename how it should be named
 * @returns {string} absolutePath
 */
async function render(html, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.setContent(htmlTemplate);
  await page.addStyleTag({ content: stylesheet() });

  const absolutePath = path.resolve(CWDPath, 'temp', filename, `${filename}.pdf`);
  await page.pdf({
    path: absolutePath,
    printBackground: true,
    format: 'a4'
  });
  await browser.close();

  return absolutePath;
}

module.exports = {
  render
};
