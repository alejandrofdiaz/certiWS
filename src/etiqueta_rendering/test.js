const parser = require('./parser')
const contentHtml = require('./contentHtml')

const test = new parser.SummaryCertificado();

test.anio = 1888;
test.normativa = 'hooola';
test.comunidadAutonoma = '231233';
test.referenciaCatastral = '3213213';
test.generateResumen();
contentHtml.fillWithData(test)