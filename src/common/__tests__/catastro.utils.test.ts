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
    expect(consultaDNPRBodyParser(DNPMostoles));
  });
});
