let listaEmpleados  = [];

const objEmpleado = {
    id:'',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const puestoInput = document.getElementById('puesto');
const btnAgregar = document.getElementById('btnAgregar');

formulario.addEventListener('submit', validarFormulario); 

function validarFormulario(e){
    e.preventDefault();

    if(nombre.value === '' || puestoInput.value === ''){
        alert('todos los campos son obligatorios');
        return; 
    }

    if(editando){
        editandoEmpleado();
        editando= false;
    }

    else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;
        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objEmpleado});
    guardarLocalStorage(listaEmpleados);
    obtenerLocalStorage();
    formulario.reset();
    limpiaObjecto();
}


function limpiaObjecto(){
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {   

    limpiarHTML();
    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach(empleado=>{
        
        const {id, nombre, puesto } = empleado;
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} -`;
        parrafo.dataset.id = id;//conocer el ID

        //EDITAR BOTTON
        const editarBoton = document.createElement('BUTTON');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn','btn-editar');
        parrafo.append(editarBoton); 

        //ELIMINAR
        const eliminarBoton = document.createElement('BUTTON');
        eliminarBoton.onclick = () => eliminarEmpleado(empleado.id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn','btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');
        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);

    });
}

function cargarEmpleado(empleado){

    const {id,nombre,puesto}= empleado;
    nombreInput.value = nombre;
    puestoInput.value = puesto;
    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;

}

function editandoEmpleado(){

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    listaEmpleados.map( empleado =>{

        if(empleado.id === objEmpleado.id){
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = false;
}

function eliminarEmpleado(id){

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    limpiarHTML();
    mostrarEmpleados();

}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild){
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function guardarLocalStorage(listaEmpleados){
    localStorage.setItem('empleados',JSON.stringify(listaEmpleados));
}

function obtenerLocalStorage(){
    listaEmpleados = JSON.parse(localStorage.getItem('empleados'));
    mostrarEmpleados();
}

obtenerLocalStorage();