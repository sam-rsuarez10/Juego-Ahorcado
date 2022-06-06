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


document.addEventListener("keydown", function(event){
    var key_value = event.key;
    console.log(key_value.charCodeAt());
    var cont_correcto = 0; // contador que indicará el avance de la palabra
    var cont_incorrecto = 0; //  contador que indicará el avance de la horca

    /*if (!verificar_key(key_value)){
        // break;
        console.log("not printable");
    } else{
        console.log("printable");
    }*/

    if (!verificar_simbolo(key_value)){
        // break
        console.log("No es una letra");
    } else {
        console.log("Es una letra");
    }

    /*while(cont_incorrecto < 9 || cont_correcto < selected_word.length){
        // code
    }*/
});


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

function verificar_key(key){
    // Función que retorna true si la tecla presionada es un símbolo que se pueda imprimir
    if (key.length == 1){
        // es un símbolo que se puede imprimir
        return true
    } else{
        return false;
    }
}

function verificar_simbolo(key){
    // Función que retorna true si el símbolo es una letra
    var key_ascii = key.charCodeAt();
    if (key_ascii >= 65 && key_ascii <= 90){
        // símbolo es una letra mayúscula
        return true;
    } else if (key_ascii >= 97 && key_ascii <= 122){
        // símolo es una letra minúscula
        return true;
    } else {
        return false;
    }
}

function verificar_letra(key, palabra){
    // Función que verifica si una letra está en la palabra pasada como parámetro y realiza las acciones correspondientes
    var letra_mayuscula = key.toUpperCase();
    var expresion = new RegExp(letra_mayuscula, "g");

    if(!expresion.test(palabra)){
        // letra no pertenece a la palabra
        dibujar_letra_incorrecta(letra_mayuscula);
        //dibujar_horca()
    } else {
        // letra pertenece a la palabra, ahora se procede a evaluar cuántas veces está contenida en la palabra
        while(expresion.exec(palabra) != null){
            dibujar_letra_correcta(letra_mayuscula);
        }
    }
}

function dibujar_letra_correcta(letra){
    // code
}

function dibujar_letra_incorrecta(letra){
    // code
}

function dibujar_horca(letra, contador){
    // code
}

