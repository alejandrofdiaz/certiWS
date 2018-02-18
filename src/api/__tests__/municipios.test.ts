import { getMunicipio, getProvincia } from '../municipios.api';

describe('Municipios API test', () => {
  test('Get Provincia existant', () => {
    expect(getProvincia('2')).toHaveProperty('value', 'ALBACETE');
  });

  test('GetProvincia non-existant', () => {
    //Test alava
    expect(getProvincia('1')).not.toBeDefined();
  });

  test('Get municipio existant', () => {
    expect(getMunicipio('2', '1')).toHaveProperty('nm', 'ABENGIBRE');
  });

  test('Get municipio non-existant', () => {
    expect(getMunicipio('2', '22222')).not.toBeDefined();
  });

  test('Get municipio test from provincia non-existant', () => {
    expect(getMunicipio('469', '22222')).not.toBeDefined();
  });
});
