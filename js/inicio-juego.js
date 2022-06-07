// Palabras iniciales
var palabras_disponibles = ['ALURA', 'AHORCADO', 'SOFTWARE', 'DEVELOPER']
var begin_game = document.querySelector("#iniciar-juego");
var body = document.querySelector("#body-juego");

// Seleccionar palabra aleatoria del array de palabras disponibles
var selected_word = seleccionar_palabra(palabras_disponibles);



// Creación tablero de juego
var board = document.querySelector("#tablero");
var brush = board.getContext("2d");
brush.fillStyle = "lightgray";
brush.fillRect(0, 0, 800, 500);

// Despliegue de los guiones de la palabra
desplegar_palabra(selected_word);


// funciones
function desplegar_palabra(palabra){
    /* Función que recibe como parámetro una palabra y 
    despliega los guiones correspondientes al largo de dicha palabra */
    let word_size = palabra.length;
    let x = centrar_guiones(20, 10, word_size, 800);
    let y = 400;
    for(let i=0; i < word_size; i++){
        dibujar_linea(x, y);
        x += 30;
    }
}

function dibujar_linea(x, y){
    /*Función que dibuja una línea dadas las coordenadas x e y */
    brush.beginPath();
    brush.moveTo(x, y);
    brush.lineTo(x+20, y);
    brush.stroke()
}

function centrar_guiones(len_guion, len_espacio, nro_letras, max_lenght){
    /* Función que retorna la coordenada x indicada para centrar los guiones de la palabra en el canvas */
    let largo_total = len_guion*nro_letras + len_espacio*(nro_letras-1); // largo que ocupan los guiones y espacios entre medio
    let x_ideal = (max_lenght-largo_total) / 2;
    return x_ideal;
}

function seleccionar_palabra(palabras){
    /* Dado un array de palabras selecciona aleatoriamente una palabra */
    let max_index = palabras.length - 1;
    let index_palabra = Math.round(Math.random()*max_index);
    return palabras[index_palabra];
}


