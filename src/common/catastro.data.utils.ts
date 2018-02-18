/**
 * Libraries
 */
import { xml2js as xmlToJS, Options } from 'xml-js';

/**
 * Models
 */
import CatastroSimplifiedElement from '../models/CatastroSimplifiedElement.model';
import Subparcela from '../models/Subparcela.model';
import UnidadConstructiva from '../models/UnidadConstructiva.model';
import ConsultaDNP from '../models/ConsultaDNP.model';

/**
 * Constants
 */
const xml2JsConfig: Options.XML2JS = {
  compact: true,
  trim: true,
  ignoreDeclaration: true,
  ignoreDoctype: true,
  ignoreAttributes: true
};

/**
 * Parses xml from catastro service that returns a list of catastral references.
 * List is being ordered from closer distance.
 *
 * @param xmlBody //Xml
 * @returns {CatastroSimplifiedElement[]}
 */
function refCatastralSimplifiedListParser(xmlBody: string): CatastroSimplifiedElement[] {
  const test = xmlToJS(xmlBody, xml2JsConfig).consulta_coordenadas_distancias.coordenadas_distancias
    .coordd.lpcd.pcd;
  console.log(test);
  return xmlToJS(xmlBody)
    .elements[0].elements //consulta_coordenadas_distancias
    .find(el => el.name === 'coordenadas_distancias')
    .elements.find(el => el.name === 'coordd')
    .elements.find(el => el.name === 'lpcd')
    .elements.filter(el => el.name === 'pcd')
    .map(_el => {
      let simplifiedElement = new CatastroSimplifiedElement();
      try {
        simplifiedElement.pc1 = _el.elements
          .find(el => el.name === 'pc')
          .elements.find(el => el.name === 'pc1').elements[0].text;
        simplifiedElement.pc2 = _el.elements
          .find(el => el.name === 'pc')
          .elements.find(el => el.name === 'pc2').elements[0].text;

        simplifiedElement.cp = _el.elements
          .find(el => el.name === 'dt')
          .elements.find(el => el.name === 'loine')
          .elements.find(el => el.name === 'cp').elements[0].text;
        simplifiedElement.cm = _el.elements
          .find(el => el.name === 'dt')
          .elements.find(el => el.name === 'loine')
          .elements.find(el => el.name === 'cm').elements[0].text;
        simplifiedElement.cv = _el.elements
          .find(el => el.name === 'dt')
          .elements.find(el => el.name === 'lourb')
          .elements.find(el => el.name === 'dir')
          .elements.find(el => el.name === 'cv').elements[0].text;
        simplifiedElement.pnp = _el.elements
          .find(el => el.name === 'dt')
          .elements.find(el => el.name === 'lourb')
          .elements.find(el => el.name === 'dir')
          .elements.find(el => el.name === 'pnp').elements[0].text;
        simplifiedElement.ldt = _el.elements.find(el => el.name === 'ldt').elements[0].text;
        simplifiedElement.dis = _el.elements.find(el => el.name === 'dis').elements[0].text;
      } catch (err) {
        throw new Error(err);
      }
      return simplifiedElement;
    })
    .sort((a, b) => a.dis - b.dis); //Ordena ascendente por distancia
}

function DNPRCXmlHelper(body: string) {
  let _parcela = new ConsultaDNP();
  const _body = xmlToJS(body, xml2JsConfig);

  _body.elements[0].elements //consulta_dnp
    .find(item => item.name === 'bico')
    .elements.find(item => item.name === 'bi')
    .elements.forEach(item => {
      switch (item.name) {
        case 'idbi':
          _parcela.cn = item.elements.find(el => el.name === 'cn').elements[0].text;
          _parcela.pc1 = item.elements
            .find(el => el.name === 'rc')
            .elements.find(el => el.name === 'pc1').elements[0].text;
          _parcela.pc2 = item.elements
            .find(el => el.name === 'rc')
            .elements.find(el => el.name === 'pc1').elements[0].text;
          _parcela.car = item.elements
            .find(el => el.name === 'rc')
            .elements.find(el => el.name === 'car').elements[0].text;
          _parcela.cc1 = item.elements
            .find(el => el.name === 'rc')
            .elements.find(el => el.name === 'cc1').elements[0].text;
          _parcela.cc2 = item.elements
            .find(el => el.name === 'rc')
            .elements.find(el => el.name === 'cc2').elements[0].text;
          break;
        case 'dt':
          _parcela.cp = item.elements
            .find(el => el.name === 'loine')
            .elements.find(el => el.name === 'cp').elements[0].text;
          _parcela.cm = item.elements
            .find(el => el.name === 'loine')
            .elements.find(el => el.name === 'cm').elements[0].text;
          _parcela.cmc = item.elements.find(el => el.name === 'cmc').elements[0].text;
          _parcela.np = item.elements.find(el => el.name === 'np').elements[0].text;
          _parcela.nm = item.elements.find(el => el.name === 'nm').elements[0].text;

          const _lourb = item.elements
            .find(el => el.name === 'locs')
            .elements.find(el => el.name === 'lous')
            .elements.find(el => el.name === 'lourb').elements;

          _parcela.dir = {
            cv: _lourb.find(el => el.name === 'dir').elements.find(el => el.name == 'cv')
              .elements[0].text,
            tv: _lourb.find(el => el.name === 'dir').elements.find(el => el.name == 'tv')
              .elements[0].text,
            nv: _lourb.find(el => el.name === 'dir').elements.find(el => el.name == 'nv')
              .elements[0].text,
            pnp: _lourb.find(el => el.name === 'dir').elements.find(el => el.name == 'pnp')
              .elements[0].text
          };

          _parcela.loint = {
            es: _lourb.find(el => el.name === 'loint').elements.find(el => el.name == 'es')
              .elements[0].text,
            pt: _lourb.find(el => el.name === 'loint').elements.find(el => el.name == 'pt')
              .elements[0].text,
            pu: _lourb.find(el => el.name === 'loint').elements.find(el => el.name == 'pu')
              .elements[0].text
          };

          _parcela.dp = _lourb.find(el => el.name == 'dp').elements[0].text;
          _parcela.dm = _lourb.find(el => el.name == 'dm').elements[0].text;
          break;
        case 'ldt':
          _parcela.ldt = item.elements[0].text;
          break;
        case 'debi':
          _parcela.debi = {
            luso: item.elements.find(el => el.name === 'luso').elements[0].text,
            sfc: item.elements.find(el => el.name === 'sfc').elements[0].text,
            cpt: item.elements.find(el => el.name === 'cpt').elements[0].text,
            ant: item.elements.find(el => el.name === 'ant').elements[0].text
          };
          break;
        default:
          break;
      }
    }, _parcela);

  _parcela.lcons = _body.elements[0].elements //consulta_dnp
    .find(item => item.name === 'bico')
    .elements.find(item => item.name === 'lcons')
    .elements.filter(item => item.name === 'cons')
    .map(cons => {
      let unidadCons = new UnidadConstructiva();

      let _loint = cons.elements
        .find(el => el.name === 'dt')
        .elements.find(el => el.name === 'lourb')
        .elements.find(el => el.name === 'loint').elements;

      unidadCons.lcd = cons.elements.find(el => el.name === 'lcd').elements[0].text;
      unidadCons.es = _loint.find(el => el.name === 'es').elements[0].text;
      unidadCons.pt = _loint.find(el => el.name === 'pt').elements[0].text;
      unidadCons.pu = _loint.find(el => el.name === 'pu').elements[0].text;
      unidadCons.stl = cons.elements
        .find(el => el.name === 'dfcons')
        .elements.find(el => el.name === 'stl').elements[0].text;

      return unidadCons;
    });

  return _parcela;
}

export { refCatastralSimplifiedListParser, DNPRCXmlHelper };
