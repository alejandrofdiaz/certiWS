const eulogo = require('./eulogo');
const sass = require('node-sass');
const STYLESHEET_PATH = '_etiquetaEnergetica.scss';
const path = require('path');

module.exports = () => {
	const result = sass.renderSync({
		file: path.resolve(__dirname, STYLESHEET_PATH),
		outputStyle: 'compressed'
	})
	return result.css.toString()
}
