class CatastroSimplifiedElement {
  cm: string = ''; //Código INE de Municipio
  cp: string = ''; //Código INE de Provincia
  cv: string = ''; //Código de vía
  dis: number = 0; //Distancia en Metros
  ldt: string = ''; //DIRECCIÓN (CALLE, NÚMERO, MUNICIPIO O POLÍGONO, PARCELA Y MUNICIPIO) DE LA PARCELA
  pc1: string = ''; //POSICIONES 1-7 DE LA REFERENCIA CATASTRAL (RC) DEL INMUEBLE</pc1>
  pc2: string = ''; //POSICIONES 8-14 DE LA RC DEL INMUEBLE
  pnp: string = ''; //Primer número de policía

  /**
   * Returns full size (20 digits) catastral reference.
   * @returns {string}
   */
  getRC() {
    return `${this.pc1}${this.pc2}`;
  }
}

export default CatastroSimplifiedElement;
