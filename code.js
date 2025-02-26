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
    }else {
        objEmpleado.id = Data.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objEmpleado});
    mostrarEmpleados();
}

function mostrarEmpleados() {
    const divEmpleados = document.querySelector('div-empleados');

    listaEmpleados.forEach(empleado=>{
        
        const {id, nombre, puesto } = empleado;
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} -`;

        parrafo.dataset.id = id;//conocer el ID
        const editarBoton = document.createElement('BUTTON');
        editando.textContent = 'Editar';
        editarBoton.classList.add('btn','btn-editar');
        
        //editarBoton.onclick = () => cargarEmpleado(empleado);

    })

}