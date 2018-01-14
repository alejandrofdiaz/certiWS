const puppeteer = require('puppeteer');
const htmlTemplate = require('./contentHtml');
const stylesheet = require('./stylesheet');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.emulateMedia('screen');
	await page.setContent(htmlTemplate);
	await page.addStyleTag({ content: stylesheet() })
	await page.pdf({
		path: __dirname + '/test.pdf',
		printBackground: true,
		format: 'a4'
	});
	await browser.close();
})();