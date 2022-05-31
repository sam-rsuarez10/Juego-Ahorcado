// Creación tablero de juego
var board = document.querySelector("#tablero");
var brush = board.getContext("2d");
brush.fillStyle = "lightgray";
brush.fillRect(0, 0, 800, 500);

// Palabras iniciales
palabras_disponibles = ['alura', 'ahorcado', 'software', 'developer']

desplegar_palabra('ahorcado');
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

