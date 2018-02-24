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

/**
 * From xml fetched from catastro service, normalize or parse into a confortable
 * object to handle.
 *
 * @param {string} body
 * @returns {ConsultaDNP} ConsultaDNP Object
 */
function consultaDNPRBodyParser(body: string) {
  let _parcela = new ConsultaDNP();
  let isSingleEstate: boolean = null;
  const _body = xmlToJS(body, xml2JsConfig).consulta_dnp;

  let _bodyBi: any;

  /**
   * Difference between single building and multiple units
   */
  if (!!_body.bico) {
    return dnpOneState(_body);
  } else {
    // If multiple building, has to be an Array, at least one item
    if (isArray(_body.lrcdnp.rcdnp)) {
      _bodyBi = _body.lrcdnp.rcdnp;
    } else {
      _bodyBi = [_body.lrcdnp.rcdnp];
    }
    return _parcela;
  }
}

/**
 * Parse function for One State due to following model
 * <consulta_dnp>
 * <control>
 * <cudnp>NÚMERO DE INMUEBLES DE LOS QUE SE * PROPORCIONAN DATOS</cudnp>
 * <cucons>NÚMERO DE UNIDADES CONSTRUCTIVAS * (INCLUYENDO ELEMENTOS COMUNES)</cucons>
 * <cucul>NUMERO DE SUBPARCELAS (CULTIVOS)</cucul>
 * </control>
 * <bico>
 * <bi>
 * <idbi>
 * <cn>TIPO DE BIEN INMUEBLE</cn>
 * <rc>
 * <pc1> POSICIONES 1-7 DE LA REFERENCIA CATASTRAL * (RC) DEL INMUEBLE</pc1>
 * <pc2>POSICIONES 8-14 DE LA RC DEL INMUEBLE</pc1>
 * <car>POSICIONES 15-19 DE LA RC (CARGO)</car>
 * <cc1>PRIMER DÍGITO DE CONTROL DE LA RC</cc1>
 * <cc2>SEGUNDO DÍGITO DE CONTROL DE LA RC </cc2>
 * </rc>
 * </idbi>
 * <ldt>DOMICILIO TRIBUTARIO NO ESTRUCTURADO * (TEXTO)</ldt>
 * <debi> DATOS ECONÓMICOS DEL INMUEBLE
 * <luso>Residencial</luso>
 * <sfc>SUPERFICIE</sfc>
 * <cpt>COEFICIENTE DE PARTICIPACIÓN</cpt>
 * <ant>ANTIGUEDAD</ant>
 * </debi>
 * </bi>
 * <lcons>LISTA DE UNIDADES CONSTRUCTIVAS
 * <cons>UNIDAD CONSTRUCTIVA
 * <lcd>USO DE LA UNIDAD CONSTRUCTIVA</lcd>
 * <dt>
 * <lourb>
 * <loint>
 * <es>ESCALERA</es>
 * <pt>PLANTA</pt>
 * <pu>PUERTA</pu>
 * </loint>
 * </lourb>
 * </dt>
 * <dfcons>
 * <stl>SUPERFICIE DE LA UNIDAD CONSTRUCTIVA</stl>
 * </dfcons>
 * </cons>
 * <cons>
 * <dfcons>
 * <stl>SUPERFICIE DE LOS ELEMENTOS COMUNES</stl>
 * </dfcons>
 * </cons>
 * </lcons>
 * <lspr>LISTA DE SUBPARCELAS
 * <spr>SUBPARCELA
 * <cspr>CÓDIGO DE SUBPARCELA</cspr>
 * <dspr>DATOS DE SUBPARCELA
 * <ccc>CALIFICACIÓN CATASTRAL</ccc>
 * <dcc>DENOMINACIÓN DE LA CLASE CULTIVO</dcc>
 * <ip>INTENSIDAD PRODUCTIVA</ip>
 * <ssp>SUPERFICIE DE LA SUBPARCELA EN METROS * CUADRADOS</ssp>
 * </dspr>
 * </spr>
 * </lspr>
 * </bico>
 * </consulta_dnp>
 * @param {string} xmlBody
 * @returns {ConsultaDNP} ConsultaDNP
 */
function dnpOneState(xmlBody): ConsultaDNP {
  let consultaDNP = new ConsultaDNP();

  const _bodyBi = xmlBody.bico.bi;
  /**
   * bi -> Ibdi
   */
  const _bodyIbdi = _bodyBi.idbi;
  consultaDNP.cn = _bodyIbdi.cn._text;

  /**
   * bi -> Ibdi -> Rc
   */
  const _bodyRC = _bodyIbdi.rc;
  consultaDNP.pc1 = _bodyRC.pc1._text;
  consultaDNP.pc2 = _bodyRC.pc2._text;
  consultaDNP.car = _bodyRC.car._text;
  consultaDNP.cc1 = _bodyRC.cc1._text;
  consultaDNP.cc2 = _bodyRC.cc2._text;

  /**
   * bi -> dt
   */
  const _bodyDt = _bodyBi.dt;

  consultaDNP.cp = _bodyDt.loine.cp._text;
  consultaDNP.cm = _bodyDt.loine.cm._text;
  consultaDNP.cmc = _bodyDt.cmc._text;
  consultaDNP.np = _bodyDt.np._text;
  consultaDNP.nm = _bodyDt.nm._text;

  /**
   * bi -> dt -> locs -> lous-> lourb
   */
  const _bodyLourb = _bodyDt.locs.lous.lourb;

  consultaDNP.dp = _bodyLourb.dp._text;
  consultaDNP.dm = _bodyLourb.dm._text;

  consultaDNP.dir = {
    cv: _bodyLourb.dir.cv._text,
    tv: _bodyLourb.dir.tv._text,
    nv: _bodyLourb.dir.nv._text,
    pnp: _bodyLourb.dir.pnp._text
  };

  consultaDNP.loint = {
    es: _bodyLourb.loint.es._text,
    bq: _bodyLourb.loint.bq || '',
    pt: _bodyLourb.loint.pt._text,
    pu: _bodyLourb.loint.pu._text
  };

  /**
   * bi -> ldt
   */
  consultaDNP.ldt = _bodyBi.ldt._text;

  /**
   * bi -> debi
   */
  const _bodyDebi = _bodyBi.debi;
  consultaDNP.debi = {
    luso: _bodyDebi.luso._text,
    sfc: _bodyDebi.sfc._text,
    cpt: _bodyDebi.cpt._text,
    ant: _bodyDebi.ant._text
  };

  /**
   * Lcons
   */
  let _bodyLcons = <any[]>xmlBody.bico.lcons.cons || [];

  if (!isArray(_bodyLcons)) _bodyLcons = [_bodyLcons];

  consultaDNP.lcons = _bodyLcons.map(item => {
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

  return consultaDNP;
}

export { refCatastralSimplifiedListParser, consultaDNPRBodyParser };
