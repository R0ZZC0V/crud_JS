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

// Cargar datos desde localStorage al iniciar la página
cargarDatos();

// Verificar si los campos estan vacios
function validarFormulario(evento) {
    evento.preventDefault();

    // Verifica si los campos estan vacios
    if (nombreInput.value === '' || apellidoInput.value === '' || telefonoInput.value === '' || puestoInput.value === '' || sueldoInput.value === '') {
        alert('Debes rellenar todos los campos');
        return; // Detener la ejecución si hay campos vacios
    }

    if (publicar) {
        // Modo de edición: Actualizar el empleado existente
        const empleadoIndex = listaEmpleados.findIndex(emp => emp.id === objetoEmpleado.id);
        if (empleadoIndex !== -1) {
            // Actualizar los datos del empleado
            listaEmpleados[empleadoIndex] = {
                id: objetoEmpleado.id,
                nombre: nombreInput.value,
                apellido: apellidoInput.value,
                telefono: telefonoInput.value,
                puesto: puestoInput.value,
                sueldo: sueldoInput.value
            };
        }

        publicar = false; // Salir del modo de edición
        formulario.querySelector('button[type="submit"]').textContent = 'Agregar'; // Cambiar el texto del botón
    } else {
        // Modo de agregar: Crear un nuevo empleado
        const idsExistentes = listaEmpleados.map(emp => emp.id);
        let nuevoID = 1;

        // Buscar el ID más bajo disponible
        while (idsExistentes.includes(nuevoID)) {
        nuevoID++;
        }

objetoEmpleado.id = nuevoID;

        objetoEmpleado.nombre = nombreInput.value;
        objetoEmpleado.apellido = apellidoInput.value;
        objetoEmpleado.telefono = telefonoInput.value;
        objetoEmpleado.puesto = puestoInput.value;
        objetoEmpleado.sueldo = sueldoInput.value;

        // Agregar el nuevo empleado a la lista
        agregarEmpleado();
    }

    // Guardar datos en localStorage
    guardarDatos();

    // Mostrar la lista actualizada de empleados
    mostrarEmpleados();

    // Limpiar el formulario y el objeto empleado
    formulario.reset();
    limpiarObjeto();
}

function agregarEmpleado() {
    listaEmpleados.push({ ...objetoEmpleado });
}

function limpiarObjeto() {
    objetoEmpleado.id = '';
    objetoEmpleado.nombre = '';
    objetoEmpleado.apellido = '';
    objetoEmpleado.telefono = '';
    objetoEmpleado.puesto = '';
    objetoEmpleado.sueldo = '';
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
        editarBoton.onclick = () => editarEmpleado(empleado); // Agregar event listener para editar
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.onclick = () => eliminarEmpleado(id); // Agregar event listener para eliminar
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function editarEmpleado(empleado) {
    const { id, nombre, apellido, telefono, puesto, sueldo } = empleado;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    puestoInput.value = puesto;
    sueldoInput.value = sueldo;

    objetoEmpleado.id = id; // Guardar el ID del empleado que se está editando

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'; // Cambiar el texto del botón

    publicar = true; // Entrar en modo de edición
}

function eliminarEmpleado(id) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmar) {
        // Filtrar la lista eliminando el empleado con el ID dado
        listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
        
        // Reasignar los IDs para que sean consecutivos
        listaEmpleados.forEach((empleado, index) => {
            empleado.id = index + 1; // Asigna un nuevo ID basado en la posición
        });

        // Guardar y mostrar los empleados actualizados
        guardarDatos();
        mostrarEmpleados();
    }
}


// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('listaEmpleados', JSON.stringify(listaEmpleados));
    localStorage.setItem('contadorID', contadorID.toString());
}

// Cargar datos desde localStorage
function cargarDatos() {
    const empleadosGuardados = localStorage.getItem('listaEmpleados');
    const idGuardado = localStorage.getItem('contadorID');

    if (empleadosGuardados) {
        listaEmpleados = JSON.parse(empleadosGuardados);
        contadorID = parseInt(idGuardado) || 1; // Si no hay contadorID guardado, usar 1
        mostrarEmpleados(); // Mostrar los empleados cargados
    }
}