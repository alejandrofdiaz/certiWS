const path = require('path'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  request = require('request');

const formidable = require('formidable');
const catastroApi = require('./catastro.api');
const CEEPdfRendering = require('./etiqueta_rendering/api.js');

const GOOGLE_CAPTCHA_KEY = '6LcXNTMUAAAAALdyHxYG7MDjDbjbWYzexof3Jn2G';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Enable Cors
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/testCaptcha', (req, res) => {
  var verificationUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' +
      GOOGLE_CAPTCHA_KEY +
      '&response=' +
      req.query.response +
      '&remoteip=' +
      '88.6.105.181' || req.connection.remoteAddress;

  request(verificationUrl, (error, response, body) => {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      return res.json({ responseCode: 1, responseDesc: 'Failed captcha verification' });
    }
    res.json({ responseCode: 0, responseDesc: 'Sucess' });
  });
});

app.get('/getRC', (req, res) => {
  catastroApi
    .getReferenciasCatastrales(req.query.lat, req.query.long)
    .then(response => res.json(response), response => res.json(response));
});

app.get('/getDNPPP', (req, res) => {
  catastroApi
    .getCatastroDatosNoProtegidos(req.query)
    .then(response => res.json(response), response => res.json(response));
});

app.listen(8080, () => {
  console.log('API listening on port 8080');
});

app.post('/retrieveEtiquetaPDF', (req, res) => {
  const files = new formidable.IncomingForm();
  const numRef = req.query.numRef;
  files.uploadDir = path.resolve(__dirname, 'temp');
  files.parse(req, async (err, fields, files) => {
    const xml = files['xml'];

    const test = await CEEPdfRendering.getPDFFromXml(xml.path);
  });

  res.json('holaaa');
});
