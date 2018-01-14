const fs = require('fs');
const path = require('path');
const HTML_PATH = 'etiquetaEn.html';

const getHtml = () =>
	fs.readFileSync(path.resolve(__dirname, HTML_PATH), { encoding: 'utf8' })

const fillWithData = (summary) => {
	let rawContent = getHtml();
	let finalContent = Object
		.keys(summary)
		.reduce((prev, key) => prev.replace(`{{${key}}}`, summary[key]), rawContent);

		console.log(finalContent)
	return finalContent
}

module.exports = {
	fillWithData
} 