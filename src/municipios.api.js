const PROVINCIAS = require('./assets/provincias.js');
const CACERES = require('./assets/10CACERES.json');
const CADIZ = require('./assets/11CADIZ.json');
const CASTELLO = require('./assets/12CASTELLO.json');
const CIUDAD_REAL = require('./assets/13CIUDAD REAL.json');
const CORDOBA = require('./assets/14CORDOBA.json');
const A_CORUÑA = require('./assets/15A CORUÑA.json');
const CUENCA = require('./assets/16CUENCA.json');
const GIRONA = require('./assets/17GIRONA.json');
const GRANADA = require('./assets/18GRANADA.json');
const GUADALAJARA = require('./assets/19GUADALAJARA.json');
const HUELVA = require('./assets/21HUELVA.json');
const HUESCA = require('./assets/22HUESCA.json');
const JAEN = require('./assets/23JAEN.json');
const LEON = require('./assets/24LEON.json');
const LLEIDA = require('./assets/25LLEIDA.json');
const LA_RIOJA = require('./assets/26LA RIOJA.json');
const LUGO = require('./assets/27LUGO.json');
const MADRID = require('./assets/28MADRID.json');
const MALAGA = require('./assets/29MALAGA.json');
const ALBACETE = require('./assets/2ALBACETE.json');
const MURCIA = require('./assets/30MURCIA.json');
const OURENSE = require('./assets/32OURENSE.json');
const ASTURIAS = require('./assets/33ASTURIAS.json');
const PALENCIA = require('./assets/34PALENCIA.json');
const LAS_PALMAS = require('./assets/35LAS PALMAS.json');
const PONTEVEDRA = require('./assets/36PONTEVEDRA.json');
const SALAMANCA = require('./assets/37SALAMANCA.json');
const SC_TENERIFE = require('./assets/38S.C. TENERIFE.json');
const CANTABRIA = require('./assets/39CANTABRIA.json');
const ALACANT = require('./assets/3ALACANT.json');
const SEGOVIA = require('./assets/40SEGOVIA.json');
const SEVILLA = require('./assets/41SEVILLA.json');
const SORIA = require('./assets/42SORIA.json');
const TARRAGONA = require('./assets/43TARRAGONA.json');
const TERUEL = require('./assets/44TERUEL.json');
const TOLEDO = require('./assets/45TOLEDO.json');
const VALENCIA = require('./assets/46VALENCIA.json');
const VALLADOLID = require('./assets/47VALLADOLID.json');
const ZAMORA = require('./assets/49ZAMORA.json');
const ALMERIA = require('./assets/4ALMERIA.json');
const ZARAGOZA = require('./assets/50ZARAGOZA.json');
const CEUTA = require('./assets/51CEUTA.json');
const MELILLA = require('./assets/52MELILLA.json');
const AVILA = require('./assets/5AVILA.json');
const BADAJOZ = require('./assets/6BADAJOZ.json');
const ILLES_BALEARS = require('./assets/7ILLES BALEARS.json');
const BARCELONA = require('./assets/8BARCELONA.json');
const BURGOS = require('./assets/9BURGOS.json');


const getProvinciaSet = (codigoINE) => {
	switch (codigoINE) {
		case '1':
			return [];
		case '2':
			return ALBACETE;
		case '3':
			return ALACANT;
		case '4':
			return ALMERIA;
		case '5':
			return AVILA;
		case '6':
			return BADAJOZ;
		case '7':
			return ILLES_BALEARS;
		case '8':
			return BARCELONA;
		case '9':
			return BURGOS;
		case '10':
			return CACERES;
		case '11':
			return CADIZ;
		case '12':
			return CASTELLO;
		case '13':
			return CIUDAD_REAL;
		case '14':
			return CORDOBA;
		case '15':
			return A_CORUÑA;
		case '16':
			return CUENCA;
		case '17':
			return GIRONA;
		case '18':
			return GRANADA;
		case '19':
			return GUADALAJARA;
		case '20':
			return [];
		case '21':
			return HUELVA;
		case '22':
			return HUESCA;
		case '23':
			return JAEN;
		case '24':
			return LEON;
		case '25':
			return LLEIDA;
		case '26':
			return LA_RIOJA;
		case '27':
			return LUGO;
		case '28':
			return MADRID;
		case '29':
			return MALAGA;
		case '30':
			return MURCIA;
		case '31':
			return [];
		case '32':
			return OURENSE;
		case '33':
			return ASTURIAS;
		case '34':
			return PALENCIA;
		case '35':
			return LAS_PALMAS;
		case '36':
			return PONTEVEDRA;
		case '37':
			return SALAMANCA;
		case '38':
			return SC_TENERIFE;
		case '39':
			return CANTABRIA;
		case '40':
			return SEGOVIA;
		case '41':
			return SEVILLA;
		case '42':
			return SORIA;
		case '43':
			return TARRAGONA;
		case '44':
			return TERUEL;
		case '45':
			return TOLEDO;
		case '46':
			return VALENCIA;
		case '47':
			return VALLADOLID;
		case '48':
			return [];
		case '49':
			return ZAMORA;
		case '50':
			return ZARAGOZA;
		case '51':
			return CEUTA;
		case '52':
			return MELILLA;
		default:
			return [];
	}
}

const getMunicipio = (provincia, municipio) => {
	return getProvinciaSet(provincia)
		.find(item => item.loine && item.loine.cm === municipio)
}

const getProvincia = ine => PROVINCIAS.find(item => item.ine === Number(ine))

module.exports = {
	getProvincia, getMunicipio
}