window.onload = function () {

  // fichoro xml que está en el servidor rawgit
  var url = "https://rawgit.com/Pauuu/Cuestionarioo/master/json/json.json";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // función personalizada que gestiona la respuesta a la petición de fichero
      gestionarJson(this.responseText);
    }
  }
  xhttp.open("GET", url, true); //url del fichero
  xhttp.send();

}


// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarJson(dadesJson) {
  var obj = JSON.parse(dadesJson);


  var questionLength = Object.keys(obj.question).length;

  for (q = 0; q < obj.question.length; q++) {


    document.getElementsByTagName("h3")[q].innerHTML = obj.question[q].title;


    //SEELECT\\
    if (obj.question[q].type == "select") {

      var opcionesSelect = [];
      var nopt = obj.question[q].option.length;

      for (i = 0; i < nopt; i++) {
        opcionesSelect[i] = obj.question[q].option[i];
      }
      mostrarSelect(q, opcionesSelect);
    }
  }
}

//FUNCIONES//


function presguntasNumber(numQuestion) {
  numeroSecreto = obj.question[numQuestion];
}

function mostrarSelect(q, opcionSelect) {

  for (i = 0; i < opcionSelect.length; i++) {
    document.getElementsByTagName("select")[q].getElementsByTagName("option")[i].innerHTML = opcionSelect[i];
  }
}

function presguntasNumber(numQuestion) {
  numeroSecreto = obj.question[numQuestion];
}

function titulos() { //cambiar
  for (i = 0; i < questionLength; i++) {
    document.getElementsByTagName("h3")[i].innerHTML = obj.question[i].title;
  }
}