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


  //TEXT****************************/
  var preguntasText = [];

  for (i = 0; i < 2; i++) { //  TODOS LOS BUCLES EMPIEZAN POR 0 HASTA LLEGRAR A LA PREGUNTA i-1
    preguntasText[i] = obj.question[i].title;
  }
  mostrarText(preguntasText);

  //**text**************************/



  //SELECT**************************/
  var preguntaSelect;
  var opSelect = [];

  for (i = 2; i < 4; i++) {
    preguntaSelect = obj.question[i].title;

    for (preg = 0; preg < obj.question[i].option.length; preg++) {
      opSelect[preg] = obj.question[i].option[preg];
    }
    mostrarSelect(i, preguntaSelect, opSelect);
  }
  //**select************************/


  //FUNCIONES

  function mostrarText(pregunta) {
    for (i = 0; i < pregunta.length; i++) {
      document.getElementsByTagName("h3")[i].innerHTML = pregunta[i];
    }
  }


  function mostrarSelect(numPreg, pregunta, opciones) {
    var option = document.createElement("option");
    var createButton = document.createElement('button');

    var select = preg[numPreg].getElementsByTagName("select")[0];

    document.getElementsByTagName("h3")[numPreg].innerHTML = pregunta;

    for (i = 0; i < opciones.length; i++) {
      option.text = opciones[i];

      option.value = i+1;
      select.options.add(option);
    }
  }

}
