import UnidadConstructiva from './UnidadConstructiva.model';

interface DireccionModel {
  cv?: string; //Códgo vía
  tv?: string; //tipo vía
  nv?: string; //nombre vía
  pnp?: string; //número
  snp?: string;
  td?: string; //Nombre extendido ?
}

interface LointModel {
  bq?: string; //Bloque
  es?: string; //Escalera
  pt?: string; //Planta
  pu?: string; //Puerta
}

interface DebiModel {
  luso?: string; //Uso?
  sfc?: string; //SUPERFICIE
  cpt?: string; //COEFICIENTE DE PARTICIPACIÓN
  ant?: string; //ANTIGUEDAD
}

export { DireccionModel, LointModel, DebiModel };

class ConsultaDNP {
  //Simplificado
  cn: string = ''; //<cn>TIPO DE BIEN INMUEBLE</cn>
  pc1: string = ''; //<pc1> POSICIONES 1-7 DE LA REFERENCIA CATASTRAL (RC) DEL INMUEBLE</pc1>
  pc2: string = ''; //<pc2>POSICIONES 8-14 DE LA RC DEL INMUEBLE</pc1>
  car: string = ''; //<car>POSICIONES 15-19 DE LA RC (CARGO)</car>
  cc1: string = ''; //<cc1>PRIMER DÍGITO DE CONTROL DE LA RC</cc1>
  cc2: string = ''; //<cc2>SEGUNDO DÍGITO DE CONTROL DE LA RC </cc2>

  cm: string = ''; //código Municipio según INE
  cp: string = ''; //código provincia ??
  cmc: string = ''; //código municipio según delegación
  np: string = ''; //nombre provincia
  nm: string = ''; //nombre municipio
  dir: DireccionModel = {};
  loint: LointModel = {};
  dp: string = ''; //código postal
  dm: string = '';

  //Extendido
  ldt: string = ''; //calle compuesta
  debi: DebiModel = {};
  lcons: UnidadConstructiva[];

  getFullRc() {
    return [this.pc1, this.pc2, this.cc1, this.cc2].join('');
  }
}

export default ConsultaDNP;
