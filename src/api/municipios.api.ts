/**
 * Api
 */
import PROVINCIAS from '../assets/provincias';

/**
 * Models
 */
import MunicipioModel from '../models/Municipio.model';
import ProvinciaModel from '../models/Provincia.model';

/**
 * Assets
 */
const A_CORUÑA: MunicipioModel[] = require('../assets/15A CORUÑA.json');
const ALACANT: MunicipioModel[] = require('../assets/3ALACANT.json');
const ALBACETE: MunicipioModel[] = require('../assets/2ALBACETE.json');
const ALMERIA: MunicipioModel[] = require('../assets/4ALMERIA.json');
const ASTURIAS: MunicipioModel[] = require('../assets/33ASTURIAS.json');
const AVILA: MunicipioModel[] = require('../assets/5AVILA.json');
const BADAJOZ: MunicipioModel[] = require('../assets/6BADAJOZ.json');
const BARCELONA: MunicipioModel[] = require('../assets/8BARCELONA.json');
const BURGOS: MunicipioModel[] = require('../assets/9BURGOS.json');
const CACERES: MunicipioModel[] = require('../assets/10CACERES.json');
const CADIZ: MunicipioModel[] = require('../assets/11CADIZ.json');
const CANTABRIA: MunicipioModel[] = require('../assets/39CANTABRIA.json');
const CASTELLO: MunicipioModel[] = require('../assets/12CASTELLO.json');
const CEUTA: MunicipioModel[] = require('../assets/51CEUTA.json');
const CIUDAD_REAL: MunicipioModel[] = require('../assets/13CIUDAD REAL.json');
const CORDOBA: MunicipioModel[] = require('../assets/14CORDOBA.json');
const CUENCA: MunicipioModel[] = require('../assets/16CUENCA.json');
const GIRONA: MunicipioModel[] = require('../assets/17GIRONA.json');
const GRANADA: MunicipioModel[] = require('../assets/18GRANADA.json');
const GUADALAJARA: MunicipioModel[] = require('../assets/19GUADALAJARA.json');
const HUELVA: MunicipioModel[] = require('../assets/21HUELVA.json');
const HUESCA: MunicipioModel[] = require('../assets/22HUESCA.json');
const ILLES_BALEARS: MunicipioModel[] = require('../assets/7ILLES BALEARS.json');
const JAEN: MunicipioModel[] = require('../assets/23JAEN.json');
const LA_RIOJA: MunicipioModel[] = require('../assets/26LA RIOJA.json');
const LAS_PALMAS: MunicipioModel[] = require('../assets/35LAS PALMAS.json');
const LEON: MunicipioModel[] = require('../assets/24LEON.json');
const LLEIDA: MunicipioModel[] = require('../assets/25LLEIDA.json');
const LUGO: MunicipioModel[] = require('../assets/27LUGO.json');
const MADRID: MunicipioModel[] = require('../assets/28MADRID.json');
const MALAGA: MunicipioModel[] = require('../assets/29MALAGA.json');
const MELILLA: MunicipioModel[] = require('../assets/52MELILLA.json');
const MURCIA: MunicipioModel[] = require('../assets/30MURCIA.json');
const OURENSE: MunicipioModel[] = require('../assets/32OURENSE.json');
const PALENCIA: MunicipioModel[] = require('../assets/34PALENCIA.json');
const PONTEVEDRA: MunicipioModel[] = require('../assets/36PONTEVEDRA.json');
const SALAMANCA: MunicipioModel[] = require('../assets/37SALAMANCA.json');
const SC_TENERIFE: MunicipioModel[] = require('../assets/38S.C. TENERIFE.json');
const SEGOVIA: MunicipioModel[] = require('../assets/40SEGOVIA.json');
const SEVILLA: MunicipioModel[] = require('../assets/41SEVILLA.json');
const SORIA: MunicipioModel[] = require('../assets/42SORIA.json');
const TARRAGONA: MunicipioModel[] = require('../assets/43TARRAGONA.json');
const TERUEL: MunicipioModel[] = require('../assets/44TERUEL.json');
const TOLEDO: MunicipioModel[] = require('../assets/45TOLEDO.json');
const VALENCIA: MunicipioModel[] = require('../assets/46VALENCIA.json');
const VALLADOLID: MunicipioModel[] = require('../assets/47VALLADOLID.json');
const ZAMORA: MunicipioModel[] = require('../assets/49ZAMORA.json');
const ZARAGOZA: MunicipioModel[] = require('../assets/50ZARAGOZA.json');

/**
 * Returns an Array with all municipios in this Provincia
 *
 * @param codigoINE
 * @returns {MunicipioModel[]}
 */
function getProvinciaSet(codigoINE: string): any[] {
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

/**
 * Finds a Municipio due to INE value.
 * **IMPORTANT sometimes INE value difers from Catastro municipio value
 *
 * @param {string} provincia
 * @param {string} municipio
 * @returns {MunicipioModel}
 */
function getMunicipio(provincia: string, municipio: string): MunicipioModel {
  return getProvinciaSet(provincia).find(item => item.loine && item.loine.cm === municipio);
}

/**
 * Finds a Provincia.
 *
 * @param {string} ine
 * @returns {ProvinciaModel} Provincia
 */
function getProvincia(ine: string): ProvinciaModel | undefined {
  return PROVINCIAS.find(item => item.ine === Number(ine));
}

export { getProvincia, getMunicipio };
