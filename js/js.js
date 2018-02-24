window.onload = function () {

  // fichoro xml que está en el servidor rawgit
  var url = "https://rawgit.com/Pauuu/Cuestionarioo/master/json/json.json";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // función personalizada que gestiona la respuesta a la petición de fichero
      gestionarJson(this.responseText);
    }
  };
  xhttp.open("GET", url, true); //url del fichero
  xhttp.send();

}


// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarJson(dadesJson) {

  var obj = JSON.parse(dadesJson);

  var questionLength = Object.keys(obj.question).length;
  var preg = document.getElementsByClassName("preg"); //ERR


  //**TEXT*************************/
  var preguntasText;

  for (i = 0; i < 2; i++) { //  TODOS LOS BUCLES EMPIEZAN POR 0 HASTA LLEGRAR A LA PREGUNTA i-1
    preguntasText = obj.question[i].title;
    mostrarText(i, preguntasText);
  }

  //**text**************************/



  //**SELECT************************/

  for (i = 2; i < 4; i++) {

    var tituloSelect = obj.question[i].title; //ALMACENA LA PREGUNTA
    var numOpcionesSelect = obj.question[i].option.length; //ALMACENA EL NUM. DE OPCIONES SELECT
    var opSelect = []; //ALMACENA EN EL ARRAY CADA UNA DE LAS PREGUNTAS

    for (preg = 0; preg < obj.question[i].option.length; preg++) {
      opSelect[preg] = obj.question[i].option[preg];
    }
    mostrarSelect(i, tituloSelect, opSelect);
  }
  //**select************************/


}

//FUNCIONES


function mostrarSelect(numPreg, titulo, opciones) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var select = document.getElementsByTagName("select")[0];

  for (j = 0; j < opciones.length; j++) {
    var option = document.createElement("option");

    option.text = opciones[j];
    option.value = j + 1;
    select.options.add(option);
  }
}


function mostrarText(i, pregunta) {
  document.getElementsByTagName("h3")[i].innerHTML = pregunta;
}



