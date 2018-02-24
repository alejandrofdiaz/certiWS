/**
 * Libraries
 */
import * as express from 'express';
import * as request from 'request';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

/**
 * Api
 */
import * as catastroApi from './api/catastro.api';

/**
 * Constants
 */
const GOOGLE_CAPTCHA_KEY = '6LcXNTMUAAAAALdyHxYG7MDjDbjbWYzexof3Jn2G';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Enable Cors
 */
app.use(cors());

app.get('/testCaptcha', (req, res) => {
  const verificationUrl: request.OptionsWithUri = {
    uri:
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      GOOGLE_CAPTCHA_KEY +
      '&response=' +
      req.query.response +
      '&remoteip=' +
      // TODO: Change this!
      ('88.6.105.181' || req.connection.remoteAddress)
  };

  request(verificationUrl, (_error, _response, body: string) => {
    let _body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (_body.success !== undefined && !_body.success) {
      return res.json({ responseCode: 1, responseDesc: 'Failed captcha verification' });
    }
    res.json({ responseCode: 0, responseDesc: 'Success' });
  });
});

app.get('/getRC', (req, res) => {
  catastroApi.getReferenciasCatastrales(req.query.lat, req.query.long).then(
    response => res.json(response),
    () => {
      res.status(424);
      res.send();
    }
  );
});

app.get('/getDNPPP', (req, res) => {
  catastroApi.getCatastroDatosNoProtegidos(req.query).then(
    response => res.json(response),
    () => {
      res.status(424);
      res.send();
    }
  );
});

app.listen(8080, () => {
  console.log('API listening on port 8080');
});
