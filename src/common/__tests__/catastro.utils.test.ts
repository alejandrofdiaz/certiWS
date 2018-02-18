/**
 * Libraries
 */
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utils
 */

import { consultaDNPRBodyParser, refCatastralSimplifiedListParser } from '../catastro.data.utils';

const ALCALA1 = fs.readFileSync(path.resolve(__dirname, 'alcala1.xml'), 'utf-8');
const BOADILLA = fs.readFileSync(path.resolve(__dirname, 'boadilla.xml'), 'utf-8');
const INVALID = fs.readFileSync(path.resolve(__dirname, 'invalid.xml'), 'utf-8');

const DNPMostoles = fs.readFileSync(path.resolve(__dirname, 'DNPmostoles.xml'), 'utf-8');

describe('Catastro Parsers utilities', () => {
  test('Referencia Catastral Simplified List parsed successfull', () => {
    expect(refCatastralSimplifiedListParser(ALCALA1).length).toBeGreaterThan(0);
  });

  test('Referencia Catastral Simplified List parsed successfull, ONLY 1 ELEMENT', () => {
    expect(refCatastralSimplifiedListParser(BOADILLA).length).toBeGreaterThan(0);
  });

  test('Referencia Catastral Simplified List parsed wrong, not found any element', () => {
    expect(refCatastralSimplifiedListParser(INVALID)).toHaveLength(0);
  });

  test('Get DNP existant', () => {
    expect(consultaDNPRBodyParser(DNPMostoles)).toEqual(
      JSON.parse(
        '{"cn":"UR","pc1":"1111111","pc2":"1111111","car":"0001","cc1":"O","cc2":"D","cm":"92","cp":"28","cmc":"92","np":"MADRID","nm":"MOSTOLES","dp":"28888","dm":"4","ldt":"CL PRUEBA 7 28888 MOSTOLES (MADRID)","dir":{"cv":"921","tv":"CL","nv":"PRUEBA","pnp":"7"},"loint":{"es":"T","pt":"OD","pu":"OS"},"debi":{"luso":"Residencial","sfc":"204","cpt":"100,000000","ant":"1998"},"lcons":[{"lcd":"VIVIENDA","es":"1","pt":"00","pu":"01","stl":"56","lsrp":[]},{"lcd":"VIVIENDA","es":"1","pt":"01","pu":"01","stl":"60","lsrp":[]},{"lcd":"VIVIENDA","es":"1","pt":"02","pu":"01","stl":"24","lsrp":[]},{"lcd":"APARCAMIENTO","es":"1","pt":"SM","pu":"01","stl":"64","lsrp":[]}]}'
      )
    );
  });
});
