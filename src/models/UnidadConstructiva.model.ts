import SubparcelaModel from './Subparcela.model';

class UnidadConstructiva {
  lcd: string;
  es: string;
  pt: string;
  pu: string;
  stl: string;
  lsrp: SubparcelaModel[];

  constructor() {
    this.lcd = '';
    this.es = ''; //escalera
    this.pt = ''; //planta
    this.pu = ''; //puerta
    this.stl = ''; //superficie de la unidad  constructiva superficie elementos comunes
    this.lsrp = []; //lista de subparcelas
  }
}

export default UnidadConstructiva;
