/**
 * Libraries
 */
import * as request from 'request';
import { fromLatLon } from 'utm';

/**
 * Models
 */
import CatastroSimplifiedElement from '../models/CatastroSimplifiedElement.model';
import ConsultaDNP from '../models/ConsultaDNP.model';

/**
 * Api
 */
import * as municipiosApi from './municipios.api';

/**
 * Utils
 */
import { consultaDNPRBodyParser, refCatastralSimplifiedListParser } from '../common/catastro.data.utils';

/**
 * Constants
 */
const URL_BASE_CATASTRO = 'http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/';

/**
 * Fetches Consulta Municipio service.
 *
 * @param {string} provincia
 * @returns {Promise<any>}
 */
function getMunicipios(provincia: string): Promise<any> {
  const [service, action] = ['ovccallejero.asmx', 'ConsultaMunicipio'];
  const options = {
    url: `${URL_BASE_CATASTRO}${service}/${action}`,
    method: 'POST',
    formData: {
      Provincia: 'Madrid',
      Municipio: ''
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  };

  return new Promise((resolve, reject) => {
    request.post(options, (err, httpResponse, body) => {
      resolve(httpResponse);
    });
  });
}

/**
 * Fetches consulta RCCOOR Distancia service.
 * Getting Catastral references list from Coordinates.
 *
 * @param {string} lat
 * @param {string} long
 * @returns {Promise<any>}
 */
function getReferenciasCatastrales(lat: string, long: string): Promise<any> {
  const [service, action] = ['ovccoordenadas.asmx', 'Consulta_RCCOOR_Distancia'];

  const SRS = {
    27: 'EPSG:32627',
    28: 'EPSG:32628',
    29: 'EPSG:32629',
    30: 'EPSG:32630',
    31: 'EPSG:32631'
  };
  const CONVERSION = fromLatLon(Number(lat), Number(long));
  const DATA = {
    lat: CONVERSION.easting,
    long: CONVERSION.northing,
    zone: CONVERSION.zoneNum
  };

  const options = {
    url: `${URL_BASE_CATASTRO}${service}/${action}`,
    method: 'GET',
    qs: {
      Coordenada_X: DATA.lat,
      Coordenada_Y: DATA.long,
      SRS: SRS[DATA.zone]
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  };
  return new Promise((resolve, reject) => {
    request.get(options, (err, httpResponse, body) => {
      const _body = refCatastralSimplifiedListParser(body);
      resolve(_body);
    });
  });
}

/**
 * Fetches non-protected-data from catastro service.
 *
 * @param {CatastroSimplifiedElement} inmuebleSeleccionado
 * @returns {Promise<ConsultaDNP>} Promise With ConsultaDNP
 */
function getCatastroDatosNoProtegidos(
  inmuebleSeleccionado: CatastroSimplifiedElement
): Promise<ConsultaDNP> {
  const [service, action] = ['ovccallejero.asmx', 'Consulta_DNPRC'];

  const [provincia, municipio] = [
    municipiosApi.getProvincia(inmuebleSeleccionado.cp) || null,
    municipiosApi.getMunicipio(inmuebleSeleccionado.cp, inmuebleSeleccionado.cm) || null
  ];

  const options = {
    url: `${URL_BASE_CATASTRO}${service}/${action}`,
    method: 'GET',
    qs: {
      Provincia: provincia ? provincia.value : null,
      Municipio: municipio ? municipio.nm : null,
      RC: `${inmuebleSeleccionado.pc1}${inmuebleSeleccionado.pc2}`
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  };
  return new Promise((resolve, reject) => {
    request.get(options, (err, httpResponse, body) => {
      switch (httpResponse.statusCode) {
        case 400:
          reject(body);
          break;
        case 200:
          resolve(consultaDNPRBodyParser(body));
          break;
        default:
          reject(body);
          break;
      }
    });
  });
}

export { getCatastroDatosNoProtegidos, getReferenciasCatastrales, getMunicipios };
