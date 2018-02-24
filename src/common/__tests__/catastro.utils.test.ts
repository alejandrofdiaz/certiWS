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
const tempFolder = path.resolve(process.cwd(), 'temp');
const tempFilePath = (fileName: string) => path.resolve(tempFolder, fileName + '.xml');
/**
 * Read files inside a temp folder, due to batch-xml-processing testing
 *
 * @returns {string[]} file Paths
 */
function readFilesFromContainer() {
  const _containerPath = path.resolve(process.cwd(), 'temp');
  const _filesName = fs.readdirSync(_containerPath).reduce((acc, filename) => {
    return [].concat(acc, path.resolve(_containerPath, filename));
  }, []);
  return _filesName;
}

const _filesFromContainer = readFilesFromContainer();

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
    expect(consultaDNPRBodyParser(DNPMostoles)[0]).toEqual(
      JSON.parse(
        '{"car": "0001", "cc1": "O", "cc2": "D", "cm": "92", "cmc": "92", "cn": "UR", "cp": "28", "debi": {"ant": "1998", "cpt": "100,000000", "luso": "Residencial", "sfc": "204"}, "dir": {"cv": "921", "nv": "PRUEBA", "pnp": "7", "tv": "CL"}, "dm": "4", "dp": "28888", "lcons": [{"es": "1","lcd": "VIVIENDA", "lsrp": [], "pt": "00", "pu": "01", "stl": "56"}, {"es": "1", "lcd": "VIVIENDA", "lsrp": [], "pt": "01", "pu": "01", "stl": "60"}, {"es": "1", "lcd": "VIVIENDA", "lsrp": [], "pt": "02", "pu": "01", "stl": "24"}, {"es": "1", "lcd": "APARCAMIENTO", "lsrp": [], "pt": "SM", "pu": "01", "stl": "64"}], "ldt": "CL PRUEBA 7 28888 MOSTOLES (MADRID)", "loint": {"bq": "", "es": "T", "pt": "OD", "pu": "OS"}, "nm": "MOSTOLES", "np": "MADRID", "pc1": "1111111", "pc2": "1111111"}'
      )
    );
  });

  test('Has test files', () => {
    expect(readFilesFromContainer().length).toBeGreaterThanOrEqual(1);
  });

  test('Get DNP Existant from single file', () => {
    const _file = tempFilePath('108');
    expect(() => {
      const test = consultaDNPRBodyParser(fs.readFileSync(_file, 'utf-8'));
    }).not.toThrow();
  });

  test('DNP batch-parsing not throwing any exception', () => {
    expect(() =>
      _filesFromContainer.map(item => {
        console.log(item);
        consultaDNPRBodyParser(fs.readFileSync(item, 'utf-8'));
      })
    ).not.toThrow();
  });
});
