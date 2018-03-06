# Cuestionario

Trabajo de la segunda evaluacion del módulo de marcas.

Es un pequeño cuestionario para conocer el funcionamiento de los formularios en HTML.

---
## Composición

Se basa en un conjunto de 10 preguntas en total con unos 5 tipos de pregunta distintos:
+ 2 Text
+ 2 Select
+ 2 Multiple
+ 2 CheckBox
+ 2 Radio

---
## Funcionamiento
El .js lee las preguntas del archivo .JSON desde rawgit.
Una vez leídas las preguntas, las carga en el HTML y guarda las respuestas.

Al final del cuestionario se calculará la nota final SOLO si se han contestado todas las preguntas del cuestionario.
El cuestionario se corrige comparando las respuestas indicadas en el .JSON con las marcadas en el HTML.
Dependiendo del número de correctas, se calcula la nota final.

---
