var formElement = null;
var respuestasText = [];
var respuestasSelect = [];
var respuestasMultiple1 = [];
var respuestasMultiple2 = [];
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasRadio = [];
var answ = 0;
var nota = 0; //nota sobre 10 puntos 



window.onload = function () {

  //coorregir al pulsar boton
  formElement = this.document.getElementById("formulario");
  formElement.onsubmit = function () {
    corregirText();
    corregirSelect();
    corregirMultiple();
    corregirRadio();


    return false;
  }


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

    respuestasText[i] = obj.question[i].answer;
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
    respuestasSelect[select] = obj.question[i].answer;
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

    if (i == 4) {
      var numRespuestasMultiple = obj.question[i].answer.length;

      for (r = 0; r < numRespuestasMultiple; r++) {
        respuestasMultiple1[r] = obj.question[i].answer[r];  //[index de respuesta]
      }

    } else if (i == 5) {
      var numRespuestasMultiple = obj.question[i].answer.length;

      for (r = 0; r < numRespuestasMultiple; r++) {
        respuestasMultiple2[r] = obj.question[i].answer[r];  //[index de respuesta]
      }
    }



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

  for (i = 8; i < 10; i++) {

    var tituloRadio = obj.question[i].title;
    var opRadio = [];

    for (preg = 0; preg < obj.question[i].option.length; preg++) {
      opRadio[preg] = obj.question[i].option[preg];
    }

    mostrarRadio(i, tituloRadio, opRadio, radio);
    respuestasRadio[radio] = obj.question[radio].answer;
    radio++;
  }
  //**radio*************************/


}

//FUNCIONES

function mostrarCheckbox(numPreg, titulo, opciones, c) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var checkContainer = document.getElementsByClassName("checkboxDiv")[c];
  var nombrePreg;

  if (numPreg == 6) {
    nombreAsignado = "seis";
  } else {
    nombreAsignado = "siete";
  }

  for (j = 0; j < opciones.length; j++) {

    var input = document.createElement("input");
    var label = document.createElement("label");

    label.innerHTML = opciones[j];
    label.setAttribute("for", nombreAsignado + "_" + j);

    input.type = "checkbox";
    input.name = nombreAsignado;
    input.id = nombreAsignado + "_" + j;

    checkContainer.appendChild(input);
    checkContainer.appendChild(label);
    checkContainer.appendChild(document.createElement("br"));
  }
}

function mostrarRadio(numPreg, titulo, opcionesR, r) {

  document.getElementsByTagName("h3")[numPreg].innerHTML = titulo;

  var radioContainer = document.getElementsByClassName("radioDiv")[r];

  var nombrePreg;

  if (numPreg == 8) {
    nombreAsignado = "ocho";
  } else {
    nombreAsignado = "nueve";
  }

  for (j = 0; j < opcionesR.length; j++) {

    var input = document.createElement("input");
    var label = document.createElement("label");

    label.innerHTML = opcionesR[j];
    label.setAttribute("for", nombreAsignado + "_" + j);

    input.type = "radio";
    input.name = nombreAsignado;
    input.id = nombreAsignado + "_" + j;

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


//*CORRECCIONES**************************/

function corregirText() {

  for (p = 0; p < 2; p++) {
    var respuesta = formElement.elements[answ + 1].value;

    if (respuesta == respuestasText[p]) {
      darRespuesta("P" + p + ": Exacto");
      nota += 1;
    } else {
      if (respuesta != respuestasText[p]) {
        darRespuesta("P" + p + ": No es correcto");
      }
    }
    answ += 2;
  }
}

function corregirSelect() {

  for (p = 2; p < 4; p++) {

    var index = 0;
    var sel = formElement.elements[answ + 1];

    if (sel.selectedIndex == respuestasSelect[index]) {
      nota += 1;
      darRespuesta("P" + p + ": Correcto");
    } else {
      darRespuesta("P" + p + ": Incorrecto");
    }
    index++;
    answ += 2;
  }
}

function corregirMultiple() {
  for (p = 4; p < 6; p++) {
    var resMul = [];

    if (p == 4) {
      resMul = respuestasMultiple1.slice();  //copia los valores del array a al array b
    } else if (p == 5) {
      resMul = respuestasMultiple2.slice();
    }

    var sel = formElement.elements[answ + 1];
    var acertado = [];

    for (i = 1; i < sel.length; i++) {
      var opt = sel.options[i];
      if (opt.selected) {
        acertado[i] = false;

        for (j = 0; j < resMul[j].length; j++) {
          if (i - 1 == resMul[j]) {
            acertado[i] = true;
            nota += 1.0 / resMul[i].length;
          }
        }

        if (acertado[i] == true) {
          darRespuesta("P" + p + "." + i + ": Correcto");
        } else {
          darRespuesta("P" + p + "." + i + ": Incorrecto");
        }
      }
    }
  }
}

function corregirCheckbox(){
  
}


function corregirRadio() {
  answ = 16;
  for (p = 8; p < 10; p++) {
    var respuesta = formElement.elements[answ + 1].value;
    var index = 0;

    if (respuesta == respuestasRadio[index]) {
      nota += 1;
      darRespuesta("P" + p + ": Correcto");

    } else {
      if (respuesta != respuestasRadio[index]) {
        darRespuesta("P" + p + ": Incorrecto");
      }
    }
    index += 1;
    answ += 2;
  }
  darRespuesta(nota);
}







//*PRESENTACIONES**************************/
function darRespuesta(r) {
  var p = document.createElement("p");
  var node = document.createTextNode(r);
  p.appendChild(node);
  document.getElementById("resultadosDiv").appendChild(p);
}
//**presentaciones*************************/
