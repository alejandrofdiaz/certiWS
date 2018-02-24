interface MunicipioModel {
  nm: string; //Nombre
  //CÓDIGOS DEL MUNICIPIO SEGÚN MHAP
  locat: {
    cd: string; //CÓDIGO DE LA DELEGACIÓN MHAP
    cmc: string; //Código municipio
  };
  //Según INE
  loine: {
    cp: string; //CÓDIGO DE LA PROVINCIA
    cm: string; //CÓDIGO DEL MUNICIPIO
  };
}

export default MunicipioModel;
