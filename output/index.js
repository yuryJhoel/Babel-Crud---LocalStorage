"use strict";

/*
    VARIABLES GLOBALES
*/
var formularioUI = document.querySelector('#formulario');
var listaActividadesUI = document.querySelector('#listaActividades');
var arrayActividades = [];
/*
    FUNCIONES
*/

var crearItem = function crearItem(actividad) {
  if (actividad == '') {
    alert("Debes de escribir una actividad");
    exit();
  }

  var item = {
    actividad: actividad,
    estado: false
  };
  arrayActividades.push(item);
  return item;
};

var guardarDB = function guardarDB() {
  localStorage.setItem('rutina', JSON.stringify(arrayActividades));
  pintarDB();
};

var pintarDB = function pintarDB() {
  listaActividadesUI.innerHTML = '';
  arrayActividades = JSON.parse(localStorage.getItem('rutina'));

  if (arrayActividades === null) {
    arrayActividades = [];
  } else {
    arrayActividades.forEach(function (element) {
      if (element.estado) {
        listaActividadesUI.innerHTML += "<div class=\"alert alert-success\" role=\"alert\">\n                <i class=\"material-icons float-left mr-3\">account_circle</i> <b>".concat(element.actividad, "</b> - ").concat(element.estado, "\n                <span class=\"float-right\">\n                  <i class=\"material-icons\">done</i>\n                  <i class=\"material-icons\">delete_outline</i>\n                </span>\n              </div>");
      } else {
        listaActividadesUI.innerHTML += "<div class=\"alert alert-danger\" role=\"alert\">\n                <i class=\"material-icons float-left mr-3\">account_circle</i> <b>".concat(element.actividad, "</b> - ").concat(element.estado, "\n                <span class=\"float-right\">\n                  <i class=\"material-icons\">done</i>\n                  <i class=\"material-icons\">delete_outline</i>\n                </span>\n              </div>");
      }
    });
  }
};

var eliminarDB = function eliminarDB(actividad) {
  var indexArray;
  arrayActividades.forEach(function (elemento, index) {
    if (elemento.actividad === actividad) {
      indexArray = index;
    }
  });
  arrayActividades.splice(indexArray, 1);
  guardarDB();
};

var editarDB = function editarDB(actividad) {
  var indexArray = arrayActividades.findIndex(function (elemento) {
    return elemento.actividad === actividad;
  });
  arrayActividades[indexArray].estado = true;
  guardarDB();
};
/*
    EVENT LISTENER
*/


formularioUI.addEventListener('submit', function (e) {
  var actividadUI = document.querySelector('#actividad').value;
  e.preventDefault();
  crearItem(actividadUI);
  guardarDB();
  formularioUI.reset();
});
document.addEventListener('DOMContentLoaded', pintarDB);
listaActividadesUI.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete_outline') {
    var texto = e.path[2].childNodes[3].innerHTML;

    if (e.target.innerHTML === 'delete_outline') {
      // Accion de eliminar
      eliminarDB(texto);
    }

    if (e.target.innerHTML === 'done') {
      // Accion de editar
      editarDB(texto);
    }
  }
});