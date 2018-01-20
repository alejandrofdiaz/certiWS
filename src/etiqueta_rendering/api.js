const parserFromXml = require('./parser').parseDataFromSummary;
const fs = require('fs');
const fillWithData = require('./contentHtml').fillWithData;
const render = require('./render').render;

/**
 * Method that build PDF retrieved to user from
 * data in a XML
 *
 * @param {string} absolutePath
 * @param {string} numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 */
async function getPDFFromXml(absolutePath, numReferencia) {
  const xml = fs.readFileSync(absolutePath);
  const summary = parserFromXml(xml);
  summary.setRegistro(numReferencia);
  const htmlString = fillWithData(summary);
  const pdfFilePath = await render(htmlString, numReferencia);
  return pdfFilePath;
}

module.exports = {
  getPDFFromXml
};
