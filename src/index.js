/*
    VARIABLES GLOBALES
*/
const formularioUI = document.querySelector('#formulario')
const listaActividadesUI = document.querySelector('#listaActividades')
let arrayActividades = [];


/*
    FUNCIONES
*/
const crearItem = (actividad)=>{
    if(actividad =='') {
      alert("Debes de escribir una actividad")
      exit();
    }
    let item = {
        actividad:actividad,
        estado:false
    }
    arrayActividades.push(item)
    return item;
}
const guardarDB = ()=>{
    localStorage.setItem('rutina', JSON.stringify(arrayActividades))
    pintarDB();
}

const pintarDB = ()=>{
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if(arrayActividades === null) {
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            if(element.estado){
                listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert">
                <i class="material-icons float-left mr-3">account_circle</i> <b>${element.actividad}</b> - ${element.estado}
                <span class="float-right">
                  <i class="material-icons">done</i>
                  <i class="material-icons">delete_outline</i>
                </span>
              </div>`
            }else{
                listaActividadesUI.innerHTML +=`<div class="alert alert-danger" role="alert">
                <i class="material-icons float-left mr-3">account_circle</i> <b>${element.actividad}</b> - ${element.estado}
                <span class="float-right">
                  <i class="material-icons">done</i>
                  <i class="material-icons">delete_outline</i>
                </span>
              </div>`
            }
        });
    }

}
const eliminarDB =(actividad)=>{
    let indexArray;
    arrayActividades.forEach((elemento, index)=>{
        if(elemento.actividad === actividad) {
            indexArray = index;
        }
    });
    arrayActividades.splice(indexArray,1)
    guardarDB();
}
const editarDB = (actividad)=>{
    let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
    arrayActividades[indexArray].estado = true;
    guardarDB();
}

/*
    EVENT LISTENER
*/

formularioUI.addEventListener('submit', (e)=>{
    let actividadUI = document.querySelector('#actividad').value;
    e.preventDefault();
    crearItem(actividadUI)
    guardarDB();
    formularioUI.reset();
});
document.addEventListener('DOMContentLoaded', pintarDB);
listaActividadesUI.addEventListener('click', (e)=>{
    e.preventDefault();

    if (e.target.innerHTML === 'done' || e.target.innerHTML ==='delete_outline') {
        let texto = e.path[2].childNodes[3].innerHTML;
        if (e.target.innerHTML === 'delete_outline') {
            // Accion de eliminar
            eliminarDB(texto);            
        }
        if (e.target.innerHTML === 'done') {
            // Accion de editar
            editarDB(texto);
        }
    }
})








