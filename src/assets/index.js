const path = require('path');
const fs = require('fs');

const removeString = cadena => {
	return cadena
		.replace('.json', '')
		.replace(' ', '_')
		.replace('.', '')
		.replace(/[0-9]/g, '');
}

fs.readdir(path.resolve(__dirname), (err, items) => {
	items.forEach(item => {
		console.log(`const ${removeString(item)} = require('${item}');`)
	})
})