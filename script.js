let palabra;
let palabraAleatoria;
let intentos = 0;

document.addEventListener("DOMContentLoaded", async function () {
  palabraAleatoria = await obtenerPalabraAleatoria();
  palabraAleatoria = palabraAleatoria.toUpperCase();
  console.log('Palabra aleatoria:', palabraAleatoria);
});

document.querySelector("button").addEventListener("click", function () {
  palabra = document.getElementById("adivinar").value;
  palabra = palabra.toUpperCase();
  intentos++;
  jugarWordle();
  document.getElementById("adivinar").value = ""; //limpiar el campo de entrada despues de cada intento
});

//obtener las palabras de la api
let diccionario = "https://random-word-api.herokuapp.com/word?lang=es&length=5";

//funcion asincrona para obtener una palabra aleatoria
async function obtenerPalabraAleatoria() {
  try {
    //obtener la respuesta con fetch
    const response = await fetch(diccionario);
    //obtener el texto de la respuesta
    const data = await response.json();
    console.log('Palabra aleatoria:', data);
    const palabras = data;
    //obtener una palabra aleatoria 
    const palabraAleatoria = palabras[0];
    //retorna la palabra aleatoria
    return palabraAleatoria;
  } catch (error) {
    console.error('Error al obtener la palabra aleatoria:', error);
  }

}
//funcion para comparar las letras con cada letra de la palabra aleatoria
function compararLetras(palabra, palabraAleatoria) {
  let aciertos = 0;
  let fallos = 0;
  let letraEnPosicionEq = 0;
  let letras = new Array(palabra.length).fill('');
  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] === palabraAleatoria[i]) {
      letras[i] = 'green';
      aciertos++;
    } else if (palabra.includes(palabraAleatoria[i])) {
      letras[i] = 'yellow';
      letraEnPosicionEq++;
    } else {
      letras[i] = 'gray';
      fallos++;
    }
  }
  return [aciertos, fallos, letraEnPosicionEq, letras];
};
//juego principal
async function jugarWordle() {
  let [aciertos, fallos, letraEnPosicionEq, letras] = compararLetras(palabra, palabraAleatoria);
  const caritaTriste = '\u{1F622}';
  const caritaFesteja = '\u{1F389}';
  console.log('comparar Letras', aciertos, fallos, letras)
  document.getElementById("msg").innerHTML = `Letras acertadas: ${aciertos} Letras falladas: ${fallos}`;
  if (aciertos === palabra.length) {
    document.getElementById("msg").innerHTML = `¡GANASTE! La palabra era ${palabraAleatoria}` + caritaFesteja;
  }
  if (intentos === 6) {
    document.getElementById("msg").innerHTML = `PERDISTE! La palabra era ${palabraAleatoria}` + caritaTriste;
  }
  else {
    const contenedor = document.querySelector("div.grid-container.intento" + (intentos));
    contenedor.classList.remove('hide');
    contenedor.classList.add('show');
    // Obtener los divs por su clase
    const divs = document.querySelectorAll("div.grid-container.intento" + (intentos) + " .grid-item");
    // Mostrar los aciertos en los divs correspondientes
    // Verificar la longitud de los arrays de aciertos y fallo
    divs.forEach((div, index) => {
      div.innerHTML = palabra[index];
      div.classList.remove('gray', 'yellow', 'green');
      div.classList.add(letras[index]);
    });
  }


}