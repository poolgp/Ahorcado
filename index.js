// Palabras disponibles para el juego
const palabras = [
  {
    nombre: "perro",
    img: "perro.jpg",
    descripcion: "Animal doméstico",
    tematica: "Animal",
  },
  {
    nombre: "coche",
    img: "coche.jpg",
    descripcion: "Medio de transporte",
    tematica: "Vehículo",
  },
  {
    nombre: "gato",
    img: "gato.jpg",
    descripcion: "Animal doméstico",
    tematica: "Animal",
  },
];

// Event listener para iniciar el juego al hacer clic en el botón "Jugar"
document.querySelector("#idForm button").addEventListener("click", function () {
  iniciarJuego();
});

// Event listener para iniciar el juego al hacer clic en el botón "Jugar"
document.querySelector("#idForm button").addEventListener("click", function () {
  iniciarJuego();
});

// Función para iniciar el juego
function iniciarJuego() {
  const nombreJugador = document.getElementById("inputNameUser").value;
  if (nombreJugador.trim() === "") {
    alert("Por favor, ingresa un nombre válido.");
    return;
  }
  mostrarNombre();
  seleccionarPalabraAleatoria();
  mostrarAbecedario();
  mostrarLineasPalabra();
  mostrarTematica();
  ocultarFormulario();
  ocultarFotoFinish();
  ocultarImagenes();
}

// Función para mostrar el nombre del jugador en el juego
function mostrarNombre() {
  const nombreJugador = document.getElementById("inputNameUser").value;
  document.getElementById("nombre").textContent = nombreJugador;
  localStorage.setItem("nombreJugador", nombreJugador);
}

// Función para seleccionar una palabra aleatoria y guardarla en el localStorage
function seleccionarPalabraAleatoria() {
  const palabraAleatoria =
    palabras[Math.floor(Math.random() * palabras.length)];
  localStorage.setItem("palabraSeleccionada", JSON.stringify(palabraAleatoria));
}

// Función para mostrar el abecedario en el contenedor de letras
function mostrarAbecedario() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const container = document.getElementById("containerLletras");
  container.innerHTML = ""; // Limpiamos el contenedor antes de añadir botones
  for (let letra of letras) {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.classList.add("btn", "btn-primary", "m-1", "letra");
    container.appendChild(boton);
  }
}

// Función para mostrar las líneas correspondientes a la palabra en el juego
function mostrarLineasPalabra() {
  const palabraSeleccionada = JSON.parse(
    localStorage.getItem("palabraSeleccionada")
  );
  const palabra = palabraSeleccionada.nombre;
  const container = document.getElementById("palabra");
  container.innerHTML = ""; // Limpiamos el contenedor antes de añadir las líneas
  for (let letra of palabra) {
    const linea = document.createElement("span");
    linea.textContent = "_ ";
    container.appendChild(linea);
  }
}

// Función para mostrar la temática de la palabra seleccionada
function mostrarTematica() {
  const palabraSeleccionada = JSON.parse(
    localStorage.getItem("palabraSeleccionada")
  );
  const tematica = palabraSeleccionada.tematica;
  document.getElementById("tema").textContent = tematica;
}

// Función para ocultar el formulario al iniciar el juego
function ocultarFormulario() {
  const formulario = document.querySelector(".formulario");
  formulario.style.display = "none";
}

// Función para ocultar el fotoFinish al iniciar el juego
function ocultarFotoFinish() {
  const formulario = document.querySelector(".fotoFinish");
  formulario.style.display = "none";
}

// Función para ocultar las imágenes del juego
function ocultarImagenes() {
  const imagenes = document.querySelectorAll(".imgAhorcado img");
  imagenes.forEach((imagen) => {
    imagen.style.display = "none";
  });
}

// Event listener para las letras del abecedario
document.querySelectorAll(".letra").forEach((boton) => {
    boton.addEventListener("click", function() {
      const letraSeleccionada = this.textContent;
      const palabraSeleccionada = JSON.parse(localStorage.getItem("palabraSeleccionada"));
      const palabra = palabraSeleccionada.nombre;
      const letrasEncontradas = document.querySelectorAll(`.palabra span`);
  
      // Desactivar el botón clicado
      this.disabled = true;
  
      if (palabra.includes(letraSeleccionada)) {
        // Actualizar las letras en la palabra
        for (let i = 0; i < palabra.length; i++) {
          if (palabra[i] === letraSeleccionada) {
            letrasEncontradas[i].textContent = letraSeleccionada;
            letrasEncontradas[i].style.color = "green";
          }
        }
        // Verificar si se ha ganado el juego
        const todasLetrasEncontradas = [...letrasEncontradas].every((letra) => letra.textContent !== "_ ");
        if (todasLetrasEncontradas) {
          alert("¡Felicidades! Has ganado el juego.");
          reiniciarJuego();
        }
      } else {
        // Sumar 1 al contador de errores
        const contadorErrores = document.getElementById("score");
        let errores = parseInt(contadorErrores.textContent);
        errores++;
        contadorErrores.textContent = errores;
  
        // Pintar la letra de rojo
        this.style.backgroundColor = "red";
        this.style.color = "white";
  
        // Verificar si se ha perdido el juego
        if (errores === 6) {
          alert("¡Lo siento! Has perdido el juego.");
          reiniciarJuego();
        }
      }
    });
  });