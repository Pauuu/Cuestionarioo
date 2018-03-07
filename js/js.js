var formElement = null;
var respuestasText = [];
var respuestasSelect = [];
var respuestasMultiple1 = [];
var respuestasMultiple2 = [];
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasRadio = [];
var nota = 0;
var comprobado = false;



window.onload = function () {

	formElement = this.document.getElementById("formulario");

	formElement.onsubmit = function () {

		if (comprobado == false) {
			if (comprobar() == true) {
				corregirText();
				corregirSelect();
				corregirMultiple();
				corregirCheckbox();
				corregirRadio();
				darNota();
				comprobado = true;
			}
			return false;
		}
	}

	var url = "https://rawgit.com/Pauuu/Cuestionarioo/master/json/json.json";

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			gestionarJson(this.responseText);
		}
	};
	xhttp.open("GET", url, true); 
	xhttp.send();

}


// función personalizada que gestiona la checkeado a la petición de fichero
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


		//guardamos las respuestas
		if (i == 4) {
			var numRespuestasMultiple = obj.question[i].answer.length;

			for (r = 0; r < numRespuestasMultiple; r++) {
				respuestasMultiple1[r] = obj.question[i].answer[r];  //[index de checkeado]
			}

		} else if (i == 5) {
			var numRespuestasMultiple = obj.question[i].answer.length;

			for (r = 0; r < numRespuestasMultiple; r++) {
				respuestasMultiple2[r] = obj.question[i].answer[r];  //[index de checkeado]
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


		//guardamos las respuestas
		if (i == 6) {
			var numRespuestasCheck = obj.question[i].answer.length;

			for (r = 0; r < numRespuestasCheck; r++) {
				respuestasCheckbox1[r] = obj.question[i].answer[r];
			}

		} else if (i == 7) {
			var numRespuestasCheck = obj.question[i].answer.length;

			for (r = 0; r < numRespuestasCheck; r++) {
				respuestasCheckbox2[r] = obj.question[i].answer[r];  //[index de checkeado]
			}
		}

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
		respuestasRadio[radio] = obj.question[i].answer;
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
		var checkeado = formElement.elements[p].value;

		if (checkeado == respuestasText[p]) {
			darRespuesta("P" + (p + 1) + ": Exacto");
			nota += 1;
		} else {
			if (checkeado != respuestasText[p]) {
				darRespuesta("P" + (p + 1) + ": No es correcto");
			}
		}

	}
}

function corregirSelect() {

	var index = 0;

	for (p = 2; p < 4; p++) {
		var sel = formElement.elements[p];

		if (sel.selectedIndex - 1 == respuestasSelect[index]) {
			nota += 1;
			darRespuesta("P" + (p + 1) + ": Correcto");
		} else {
			darRespuesta("P" + (p + 1) + ": Incorrecto");
		}

		index++;
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

		var sel = formElement.elements[p];
		var acertado = [];

		for (i = 1; i < sel.length; i++) {
			var opt = sel.options[i];
			if (opt.selected) {
				acertado[i - 1] = false;

				for (j = 0; j < resMul.length; j++) {
					if (i - 1 == resMul[j]) {
						acertado[i] = true;
						nota += 1.0 / resMul.length;
					}
				}


				if (acertado[i] == true) {
					darRespuesta("P" + (p + 1) + ": Opción " + (i + 1) + " Correcta");
				} else {
					darRespuesta("P" + (p + 1) + ": Opción " + (i + 1) + " Incorrecta");
				}
			}
		}

	}
}

function corregirCheckbox() {
	var f = formElement;
	var acertado = [];
	for (p = 6; p < 8; p++) {
		var nombre;

		if (p == 6) {
			resCheck = respuestasCheckbox1.slice();
			nombre = f.seis;
		} else if (p == 7) {
			resCheck = respuestasCheckbox2.slice();
			nombre = f.siete;
		}

		for (i = 0; i < nombre.length; i++) {
			if (nombre[i].checked) {
				acertado[i] = false;

				for (j = 0; j < resCheck.length; j++) {
					if (i == resCheck[j]) {
						acertado[i] = true;
					}
				}
				if (acertado[i]) {
					nota += 1.0 / resCheck.length;  //dividido por el número de respuestas correctas   
					darRespuesta("P " + (p + 1) + ": Opción " + (i + 1) + " Correcta");
				} else {
					nota -= 1.0 / resCheck.length;  //dividido por el número de respuestas correctas   
					darRespuesta("P " + (p + 1) + ": Opción " + (i + 1) + " Incorrecta");
				}
			}
		}
	}
}


function corregirRadio() {
	var index = 0;

	for (p = 8; p < 10; p++) {
		var f = formElement;
		var acertado;


		var checkeado;

		if (p == 8) {
			pregunta = f.ocho;
		} else if (p == 9) {
			pregunta = f.nueve;
		}

		for (i = 0; i < pregunta.length; i++) {

			if (pregunta[i].checked == true) {
				acertado = false;

				if (i == respuestasRadio[index]) {
					acertado = true;
				}


				if (acertado == true) {
					nota++;  //dividido por el número de respuestas correctas   
					darRespuesta("P " + (p + 1) + ": Opción " + (i + 1) + " Correcta");
				} else {
					darRespuesta("P " + (p + 1) + ": Opción " + (i + 1) + " Incorrecta");
				}
			}
		}
		index++;
	}

}

function darNota() {
	darRespuesta("NOTA: " + nota);
}



//*PRESENTACIONES**************************/
function darRespuesta(r) {
	document.getElementById("resultadosDiv").style.display = "block";

	var p = document.createElement("p");
	var node = document.createTextNode(r);
	p.appendChild(node);
	document.getElementById("resultadosDiv").appendChild(p);
}

function comprobar() {
	var f = formElement;
	var checked = false;
	var pregunta = 1;

	// Comprobación del text

	for (numPreg = 0; numPreg < 2; numPreg++) {
		if (f.elements[numPreg].value == "") {
			f.elements[numPreg].focus();

			alert("Por favor, selecciona una opcion en la pregunta " + (numPreg + 1));
			return false;
		}

	}

	// Comprobación del select normal
	for (numPreg = 2; numPreg < 4; numPreg++) {
		if (f.elements[(numPreg)].selectedIndex == 0) {
			f.elements[(numPreg)].focus();
			alert("Por favor, selecciona una opcion en la pregunta " + (numPreg + 1));
			return false;
		}

	}

	// Comprobación del select multiple
	for (numPreg = 4; numPreg < 6; numPreg++) {
		var multRespondido = false;

		for (i = 1; i < (f.elements[numPreg].length); i++) {
			var opt = f.elements[numPreg].options[i];
			if (opt.selected) {
				multRespondido = true;
			}
		}

		if (!multRespondido) {
			f.elements[numPreg].focus();
			alert("Por favor, selecciona al menos una opcion en la pregunta " + (numPreg + 1));
			return false;
		}
	}

	// Comprobación del checkbox
	for (numPreg = 6; numPreg < 8; numPreg++) {
		var checked = false;
		var nombre;

		if (numPreg == 6) {
			nombre = f.seis;
		} else {
			nombre = f.siete;
		}

		for (i = 0; i < nombre.length; i++) {
			if (nombre[i].checked) {
				checked = true;
			}
		}

		if (!checked) {
			nombre[0].focus();
			alert("Por favor, selecciona al menos una opcion en la pregunta " + (numPreg + 1));
			return false;
		}



		// Comprobación del radio
		for (numPreg = 8; numPreg < 10; numPreg++) {

			var nombreRadio;

			if (numPreg == 8) {
				nombreRadio = f.ocho;
			} else {
				nombreRadio = f.nueve;
			}

			if (nombreRadio.value == "") {
				nombreRadio[0].focus();
				alert("Por favor, responde la pregunta " + (numPreg + 1));
				return false;
			}
		}

		return true;
	}
}
//**presentaciones*************************/

