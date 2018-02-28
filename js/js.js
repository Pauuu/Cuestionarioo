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
  var preg = document.getElementsByClassName("preg");


  //**TEXT*************************/
  var preguntasText;

  for (i = 0; i < 2; i++) { //  TODOS LOS BUCLES EMPIEZAN POR 0 HASTA LLEGRAR A LA PREGUNTA i-1
    preguntasText = obj.question[i].title;
    mostrarText(i, preguntasText);
  }

  //**text**************************/



  //**SELECT************************/
  var select = 0; //ENUMERA los selects


  for (i = 2; i < 4; i++) {

    var tituloSelect = obj.question[i].title; //ALMACENA LA PREGUNTA
    var opSelect = []; //ALMACENA EN EL ARRAY CADA UNA DE LAS PREGUNTAS

    for (preg = 0; preg < obj.question[i].option.length; preg++) {
      opSelect[preg] = obj.question[i].option[preg];
    }

    mostrarSelect(i, tituloSelect, opSelect, select);
    select++;
  }
  //**select************************/



  //MULTIPLE*************************/
  for (i = 4; i < 6; i++) {

    var tituloMultiple = obj.question[i].title; //ALMACENA LA PREGUNTA
    var opMultiple = []; //ALMACENA EN EL ARRAY CADA UNA DE LAS PREGUNTAS

    for (preg = 0; preg < obj.question[i].option.length; preg++) {
      opMultiple[preg] = obj.question[i].option[preg];
    }

    mostrarMultiple(i, tituloMultiple, opMultiple, select);
    select++;
  }
  //**multiple***********************/

  //CHECKBOX*************************/
  var checkbox = 0;

  for (i = 6; i < 8; i++) {

    var tituloCheckbox = obj.question[i].title;
    var opCheckbox = [];

    for (preg = 0; preg < obj.question[i].option.length; preg++) {
      opCheckbox[preg] = obj.question[i].option[preg];
    }

    mostrarCheckbox(i, tituloCheckbox, opCheckbox, checkbox);
    checkbox++;
  }
  //**checkbox***********************/

  //RADIO***************************/
  var radio = 0;

  for(i = 8; i < 10; i++){
    
    var tituloRadio = obj.question[i].title;
    var opRadio = [];

    for(preg = 0; preg < obj.question[i].option.length; preg++){
      opRadio[preg] = obj.question[i].option[preg];
    }

    mostrarRadio(i, tituloRadio, opRadio, radio);
  }


  //**radio*************************/


}

//FUNCIONES


function mostrarCheckbox(numPreg, titulo, opciones, c) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var radioContainer = document.getElementsByClassName("checkboxDiv")[c];

  for (j = 0; j < opciones.length; j++) {

    var input = document.createElement("input");
    var label = document.createElement("label");

    label.innerHTML = opciones[j];
    label.setAttribute("for", "color_" + j);

    input.type = "checkbox";
    input.name = "color";
    input.id = "color_" + j;

    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));

  }
}







function mostrarRadio(numPreg, titulo, opciones, r) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var radioContainer = document.getElementsByClassName("radioDiv")[r];

  for (j = 0; j < opciones.length; j++) {

    var input = document.createElement("input");
    var label = document.createElement("label");

    label.innerHTML = opciones[j];
    label.setAttribute("for", "color_" + j);

    input.type = "radio";
    input.name = "color";
    input.id = "color_" + j;

    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));

  }
}




function mostrarMultiple(numPreg, titulo, opciones, s) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var select = document.getElementsByTagName("select")[s];

  for (j = 0; j < opciones.length; j++) {
    var option = document.createElement("option");

    option.text = opciones[j];
    option.value = j + 1;
    select.options.add(option);
  }
}




function mostrarSelect(numPreg, titulo, opciones, s) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var select = document.getElementsByTagName("select")[s];

  for (j = 0; j < opciones.length; j++) {
    var option = document.createElement("option");

    option.text = opciones[j];
    option.value = j + 1;
    select.options.add(option);
  }
}






function mostrarText(i, titulo) {
  document.getElementsByTagName("h3")[i].innerHTML = titulo;
}









