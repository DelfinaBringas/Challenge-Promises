// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        //////
        limpiarJugadores();
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const estado = prompt("Ingrese el del jugador(suplente/titular):");

        if (estado !== 'suplente' && estado !== 'titular') {
            throw new Error('El estado ingresado no es válido.');
        }

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        if (jugadores.length >= 11) {
            throw new Error('No se pueden agregar jugadores');
        }

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ nombre, edad, posicion, estado });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    try {
        const jugadores = obtenerJugadoresLocalStorage();
        const jugadoresDiv = document.getElementById('jugadores');

        // Limpiar el contenido actual
        jugadoresDiv.innerHTML = '';

        if (jugadores.length === 0) {
            jugadoresDiv.innerHTML = `
                <div class="row">
                    <div class="col">No hay jugadores en el equipo.</div>
                </div>`;
        } else {
            jugadores.forEach(jugador => {
                jugadoresDiv.innerHTML += ` 
                    <div class="row">
                        <div class="col">${jugador.nombre}</div>
                        <div class="col">${jugador.edad}</div>
                        <div class="col">${jugador.posicion}</div>  
                        <div class="col">${jugador.estado}</div>          
                    </div>`;
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};

//////
const limpiarJugadores = () => {  //para borrar la lista de jugadores 
    document.getElementById('jugadores').innerText = "";
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async () => {
    try {
        //////
        limpiarJugadores();
        const nombreJugador = prompt("Ingrese el nombre del jugador para asignar posición:");
        const nuevaPosicion = prompt("Ingrese la nueva posición del jugador:");

        let jugadores = obtenerJugadoresLocalStorage();

        const jugador = jugadores.find(jugador => jugador.nombre === nombreJugador);
        if (!jugador) {
            throw new Error('Jugador no encontrado.');
        }

        jugador.posicion = nuevaPosicion;

        guardarJugadoresLocalStorage(jugadores);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert(`Posición de ${nombreJugador} actualizada a ${nuevaPosicion}.`);
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async () => {
    try {
        limpiarJugadores();
        const jugadorEntrante = prompt("Ingrese el nombre del jugador que entrará:");
        const jugadorSaliente = prompt("Ingrese el nombre del jugador que saldrá:");

        let jugadores = obtenerJugadoresLocalStorage();

        const entrante = jugadores.find(jugador => jugador.nombre === jugadorEntrante);
        const saliente = jugadores.find(jugador => jugador.nombre === jugadorSaliente);

        if (!entrante) {
            throw new Error(`El jugador entrante ${jugadorEntrante} no está en el equipo.`);
        }
        if (!saliente) {
            throw new Error(`El jugador saliente ${jugadorSaliente} no está en el equipo.`);
        }
        if (entrante.estado !== 'suplente') {
            throw new Error(`El jugador entrante ${jugadorEntrante} no está disponible para ingresar.`);
        }
        if (saliente.estado !== 'titular') {
            throw new Error(`El jugador saliente ${jugadorSaliente} no está en el campo.`);
        }
        
        entrante.estado = 'titular';
        saliente.estado = 'suplente';

        guardarJugadoresLocalStorage(jugadores);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert(`Cambio realizado: ${jugadorEntrante} entra por ${jugadorSaliente}.`);
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};



