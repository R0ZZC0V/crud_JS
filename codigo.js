let listaEmpleados = [];
let contadorID = 1;

const objetoEmpleado = {
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    puesto: '',
    sueldo: '',
}

// actualizar o agregar información
let publicar = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const puestoInput = document.querySelector('#puesto');
const sueldoInput = document.querySelector('#sueldo');

// AL MOMENTO DE DAR CLIC EN EL BOTON LO GUARDARA
formulario.addEventListener('submit', validarFormulario);

// Verificar si los campos estan vacios
function validarFormulario(evento) {
    evento.preventDefault();

    // Verifica si los campos estan vacios
    if (nombreInput.value === '' || apellidoInput.value === '' || telefonoInput.value === '' || puestoInput.value === '' || sueldoInput.value === '') {
        alert('Debes rellenar todos los campos');
        return; // Detener la ejecución si hay campos vacios
    }

    if (publicar) {
        publicar = false;
    } else {
        objetoEmpleado.id = contadorID++;
        objetoEmpleado.nombre = nombreInput.value;
        objetoEmpleado.apellido = apellidoInput.value;
        objetoEmpleado.telefono = telefonoInput.value;
        objetoEmpleado.puesto = puestoInput.value;
        objetoEmpleado.sueldo = sueldoInput.value;

        // Funcion agregar empleados
        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({ ...objetoEmpleado });

    mostrarEmpleados();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
    objetoEmpleado.id = '';
    objetoEmpleado.nombre
    objetoEmpleado.apellido
    objetoEmpleado.telefono
    objetoEmpleado.puesto
    objetoEmpleado.sueldo
}

function mostrarEmpleados() {
    const divEmpleados = document.querySelector('.div-empleados');
    divEmpleados.innerHTML = ''; // Limpiar el contenido antes de mostrar

    listaEmpleados.forEach(empleado => {
        const { id, nombre, apellido, telefono, puesto, sueldo } = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} | ${nombre} | ${apellido} | ${telefono} | ${puesto} | ${sueldo} |`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button'); 
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}




