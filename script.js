let palabra;
let palabraAleatoria;
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button").addEventListener("click", async function() {
      palabra = document.getElementById("adivinar").value;
      if(!palabraAleatoria) {
        palabraAleatoria = await obtenerPalabraAleatoria();
        console.log('Palabra aleatoria:', palabraAleatoria);
      }
      jugarWordle();

    });
});
    
// Función para obtener una palabra aleatoria de la lista
//url del archivo de texto de github
let diccionario = "https://raw.githubusercontent.com/huntergregal/wordlists/master/spanish.txt";
//asyn para esperar la respuesta de la solicitud fetch()
//funcion asincrona para obtener una palabra aleatoria
async function obtenerPalabraAleatoria() {
  try {
    //obtener la respuesta con fetch
    const response = await fetch(diccionario);
    //obtener el texto de la respuesta
    const data = await response.text();
    //el texto de la respuesta se convierte en un arreglo de palabras con un salto de linea
    const palabras = data.split("\n");
    //filtrar las palabras de 5 letras
    const palabrasDe5Letras = palabras.filter(palabra => palabra.length === 6);
    //obtener una palabra aleatoria utilizando Math.random() y Math.floor()
    const palabraAleatoria = palabrasDe5Letras[Math.floor(Math.random() * palabrasDe5Letras.length)];
    //retorna la palabra aleatoria
    return palabraAleatoria;
  } catch (error) {
    console.error('Error al obtener la palabra aleatoria:', error);
  }
  
}

    function compararLetras(palabra, palabraAleatoria){
        let aciertos = 0;
        let fallos = 0;
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === palabraAleatoria[i]) {
                aciertos++;
            } else if (palabra.includes(palabraAleatoria[i])) {
                fallos++;
    }
}
return [aciertos, fallos];
};

//console.log('letras acertadas: ' + compararLetras(palabra, palabraAleatoria));
async function jugarWordle () {
    for (let i = 0; i < 6; i++) {
        let [aciertos, fallos] = compararLetras(palabra, palabraAleatoria);
        document.getElementById("msg").innerHTML = `Letras acertadas: ${aciertos} Letras falladas: ${fallos}`;
        if (aciertos === 6) {
            document.getElementById("msg").innerHTML = `¡GANASTE! La palabra era ${palabraAleatoria}`;
        } else if (fallos === 6) {
            document.getElementById("msg").innerHTML = `PERDISTE! La palabra era ${palabraAleatoria}`;
        }
}
}

