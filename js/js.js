window.onload = function () {

  // fichoro xml que está en el servidor rawgit
  var url = "https://cdn.rawgit.com/Pauuu/JSONprueba/7fabcde0/json/json.json";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // función personalizada que gestiona la respuesta a la petición de fichero
      gestionarJson(this.responseText);
    }
  }
  xhttp.open("GET", url, true); //url del fichero
  xhttp.send();



  // función personalizada que gestiona la respuesta a la petición de fichero
  function gestionarJson(dadesJson) {
    var obj = JSON.parse(dadesJson);

    var questionLength = Object.keys(obj.question).length;
    var questionsSelect;
    var questionCheckbox;



    titulos();

    for (i = 0; i < 8; i++) {

      if (obj.question[0].type == "select") {
        preguntasSelect(0);
      }
    }



    //funciones   **********************
    function preguntasSelect(numQuestion) {
      var opcionSelect = [];
      var nopt = obj.question[numQuestion].option.length;

      for (i = 0; i < nopt; i++) {
        opcionSelect[i] = obj.question[numQuestion].option[i];
        document.getElementById("0").getElementsByTagName("option")[i].innerHTML = opcionSelect[i];
      }
    }



    function titulos() {
      for (i = 0; i < questionLength; i++) {
        document.getElementsByTagName("h3")[i].innerHTML = obj.question[i].title;
      }
    }


  }
}