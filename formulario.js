// Seleccionar el formulario usando su ID
var formulario = document.querySelector("#form");

// Manejar el evento de envío del formulario
formulario.onsubmit = function(event) {
  // Prevenir el comportamiento predeterminado del formulario
  event.preventDefault();
  
  // Obtener los elementos del formulario
  var nombreInput = formulario.elements[0];
  var edadInput = formulario.elements[1];
  var nacionalidadSelect = formulario.elements[2];

  // Obtener valores de los campos de entrada
  var nombre = nombreInput.value.trim(); // Eliminar espacios al inicio y al final
  var edad = parseInt(edadInput.value.trim(), 10); // Convertir a número entero

  // Obtener el índice seleccionado y el valor de la nacionalidad
  var selectedIndex = nacionalidadSelect.selectedIndex;
  var nacionalidad = nacionalidadSelect.options[selectedIndex].value;

  console.log(nombre, edad);
  console.log(nacionalidad);

  // Validar campos y agregar clases de error si es necesario
  if (nombre.length === 0) {
    nombreInput.classList.add("error");
  } else {
    nombreInput.classList.remove("error");
  }

  if (isNaN(edad) || edad < 18 || edad > 120) {
    edadInput.classList.add("error");
  } else {
    edadInput.classList.remove("error");
  }

  // Agregar invitado si la validación es exitosa
  if (nombre.length > 0 && edad >= 18 && edad <= 120) {
    agregarInvitado(nombre, edad, nacionalidad);
    // Limpiar campos después de agregar al invitado
    nombreInput.value = '';
    edadInput.value = '';
    nacionalidadSelect.selectedIndex = 0;
  }
};

// Crear el botón de borrar fuera de la función de invitado
var botonBorrar = document.createElement("button");
botonBorrar.textContent = "Eliminar invitado";
botonBorrar.id = "boton-borrar";
document.body.appendChild(botonBorrar);

// Función para agregar un nuevo invitado
function agregarInvitado(nombre, edad, nacionalidad) {
  // Convertir el valor de nacionalidad al nombre completo
  if (nacionalidad === "ar") {
    nacionalidad = "Argentina";
  } else if (nacionalidad === "mx") {
    nacionalidad = "Mexicana";
  } else if (nacionalidad === "vnzl") {
    nacionalidad = "Venezolana";
  } else if (nacionalidad === "per") {
    nacionalidad = "Peruana";
  }

  // Obtener el elemento de la lista de invitados
  var lista = document.getElementById("lista-de-invitados");

  // Crear un nuevo elemento para el invitado
  var elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista");
  lista.appendChild(elementoLista);

  // Función para crear elementos de entrada con descripción
  function crearElemento(descripcion, valor) {
    var spanDescripcion = document.createElement("span");
    var inputValor = document.createElement("input");
    var espacio = document.createElement("br");
    spanDescripcion.textContent = descripcion + ": ";
    inputValor.value = valor;
    elementoLista.appendChild(spanDescripcion);
    elementoLista.appendChild(inputValor);
    elementoLista.appendChild(espacio);
  }

  // Crear los elementos para el nombre, edad y nacionalidad
  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidad);

  // Crear botón de eliminar para cada invitado
  var botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar invitado";
  elementoLista.appendChild(botonEliminar);

  botonEliminar.onclick = function() {
    // Eliminar el elemento de lista del DOM
    elementoLista.remove();
  };
}

/* Cambios realizados:
1. Se cambió `e.prevent()` por `event.preventDefault()` para prevenir el comportamiento por defecto del formulario.
2. Se renombraron las variables para evitar conflictos y mejorar la legibilidad (`n`, `e`, `na` a `nombreInput`, `edadInput`, `nacionalidadSelect`).
3. Se cambió `classList.added` por `classList.add` para añadir clases correctamente.
4. Se optimizó el manejo de errores al eliminar la clase "error" una vez corregidos.
5. Se optimizó la función para crear elementos de entrada reutilizables.
6. Se añadieron comentarios explicativos para mejorar la comprensión del código.
7. Se corrigió la lógica para que el botón de "Eliminar invitado" funcione correctamente.
*/
