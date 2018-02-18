class CatastroSimplifiedElement {
  pc1: string = ''; //POSICIONES 1-7 DE LA REFERENCIA CATASTRAL (RC) DEL INMUEBLE</pc1>
  pc2: string = ''; //POSICIONES 8-14 DE LA RC DEL INMUEBLE
  cp: string = ''; //Código INE de Provincia
  cm: string = ''; //Código INE de Municipio
  cv: string = ''; //Código de vía
  pnp: string = ''; //Primer número de policía
  ldt: string = ''; //DIRECCIÓN (CALLE, NÚMERO, MUNICIPIO O POLÍGONO, PARCELA Y MUNICIPIO) DE LA PARCELA
  dis: number = 0; //Distancia en Metros

  /**
   * Returns full size (20 digits) catastral reference.
   * @returns {string}
   */
  getRC() {
    return `${this.pc1}${this.pc2}`;
  }
}

export default CatastroSimplifiedElement;
