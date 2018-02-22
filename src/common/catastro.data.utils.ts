/**
 * Libraries
 */
import { xml2js as xmlToJS, Options } from 'xml-js';
import { isArray } from 'lodash';

/**
 * Models
 */
import CatastroSimplifiedElement from '../models/CatastroSimplifiedElement.model';
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
  const xmlParsed = xmlToJS(xmlBody, xml2JsConfig);
  if (isValidListReferenciaCatastral(xmlParsed)) {
    let parcelasCatastralesFound = <any[] | any>xmlParsed.consulta_coordenadas_distancias
      .coordenadas_distancias.coordd.lpcd.pcd;

    /**
     * Sometimes, when xml fetching only retrieves 1 element, our xml library doesn't know
     * that a xml node should be an array with children nodes.
     */
    if (!isArray(parcelasCatastralesFound)) {
      parcelasCatastralesFound = [parcelasCatastralesFound];
    }

    return (
      parcelasCatastralesFound
        .map(el => {
          let simplifiedElement = new CatastroSimplifiedElement();
          simplifiedElement.pc1 = el.pc ? el.pc.pc1._text : '';
          simplifiedElement.pc2 = el.pc ? el.pc.pc2._text : '';
          simplifiedElement.cp = el.dt.loine ? el.dt.loine.cp._text : '';
          simplifiedElement.cm = el.dt.loine ? el.dt.loine.cm._text : '';
          simplifiedElement.cv = el.dt.lourb.dir.cv ? el.dt.lourb.dir.cv._text : '';
          simplifiedElement.pnp = el.dt.lourb.dir.pnp ? el.dt.lourb.dir.pnp._text : '';
          simplifiedElement.ldt = el.ldt ? el.ldt._text : '';
          simplifiedElement.dis = el.dis ? el.dis._text : '';
          return simplifiedElement;
        })
        /**
         * Sorts array, closest first.
         */
        .sort((a, b) => a.dis - b.dis)
    );
  } else return [];
}

/**
 * It takes a XML parsed object and checks if has any element.
 * It may be triggered as false when a service returns an xml out of the boundaries of
 * the country.
 *
 * @param {any} xmlElement
 * @returns {boolean} If true or not
 */
function isValidListReferenciaCatastral(xmlElement: any): boolean {
  return !!xmlElement.consulta_coordenadas_distancias.coordenadas_distancias.coordd.lpcd;
}

function consultaDNPRBodyParser(body: string) {
  let _parcela = new ConsultaDNP();
  let isSingleEstate: boolean = null;
  const _body = xmlToJS(body, xml2JsConfig).consulta_dnp;

  let _bodyBi: any;

  /**
   * Difference between single building and multiple units
  */
  if (!!_body.bico) {
    _bodyBi = _body.bico.bi;
    isSingleEstate = true;
  } else {
    // If multiple building, has to be an Array, at least one item
    if (isArray(_body.lrcdnp.rcdnp)) {
      _bodyBi = _body.lrcdnp.rcdnp;
    } else {
      _bodyBi = [_body.lrcdnp.rcdnp];
    }
    isSingleEstate = false;
  }

  /**
   * bi -> Ibdi
   */
  const _bodyIbdi = _bodyBi.idbi;
  _parcela.cn = _bodyIbdi.cn._text;

  /**
   * bi -> Ibdi -> Rc
   */
  const _bodyRC = _bodyIbdi.rc;
  _parcela.pc1 = _bodyRC.pc1._text;
  _parcela.pc2 = _bodyRC.pc2._text;
  _parcela.car = _bodyRC.car._text;
  _parcela.cc1 = _bodyRC.cc1._text;
  _parcela.cc2 = _bodyRC.cc2._text;

  /**
   * bi -> dt
   */
  const _bodyDt = _bodyBi.dt;

  _parcela.cp = _bodyDt.loine.cp._text;
  _parcela.cm = _bodyDt.loine.cm._text;
  _parcela.cmc = _bodyDt.cmc._text;
  _parcela.np = _bodyDt.np._text;
  _parcela.nm = _bodyDt.nm._text;

  /**
   * bi -> dt -> locs -> lous-> lourb
   */
  const _bodyLourb = _bodyDt.locs.lous.lourb;

  _parcela.dp = _bodyLourb.dp._text;
  _parcela.dm = _bodyLourb.dm._text;

  _parcela.dir = {
    cv: _bodyLourb.dir.cv._text,
    tv: _bodyLourb.dir.tv._text,
    nv: _bodyLourb.dir.nv._text,
    pnp: _bodyLourb.dir.pnp._text
  };

  _parcela.loint = {
    es: _bodyLourb.loint.es._text,
    bq: _bodyLourb.loint.bq || '',
    pt: _bodyLourb.loint.pt._text,
    pu: _bodyLourb.loint.pu._text
  };

  /**
   * bi -> ldt
   */
  _parcela.ldt = _bodyBi.ldt._text;

  /**
   * bi -> debi
   */
  const _bodyDebi = _bodyBi.debi;
  _parcela.debi = {
    luso: _bodyDebi.luso._text,
    sfc: _bodyDebi.sfc._text,
    cpt: _bodyDebi.cpt._text,
    ant: _bodyDebi.ant._text
  };

  /**
   * Lcons
   */
  let _bodyLcons = <any[]>_body.bico.lcons.cons || [];

  if (!isArray(_bodyLcons)) _bodyLcons = [_bodyLcons];

  _parcela.lcons = _bodyLcons.map(item => {
    let unidadCons = new UnidadConstructiva();

    unidadCons.lcd = item.lcd._text;
    unidadCons.stl = item.dfcons.stl._text;

    if (!!item.dt) {
      const _loint = item.dt.lourb.loint;

      unidadCons.es = _loint.es ? _loint.es._text : '';
      unidadCons.pt = _loint.pt ? _loint.pt._text : '';
      unidadCons.pu = _loint.pu ? _loint.pu._text : '';
    }
    return unidadCons;
  });

  return _parcela;
}

export { refCatastralSimplifiedListParser, consultaDNPRBodyParser };
