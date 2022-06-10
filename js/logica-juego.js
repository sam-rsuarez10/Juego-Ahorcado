var cont_correcto = 0; // contador que indicará el avance de la palabra
var cont_incorrecto = 0; //  contador que indicará el avance de la horca
var letras_faltantes = [] // array booleano que servirá para indicar si un guión está vacío o ya tiene una letra
var letras_incorrectas = [] // array que servirá para almacenar las letras incorrectas ya ingresadas
var x_inicial_letra_incorrecta = 50;
incializar_array_indicador(letras_faltantes, selected_word);
dibujar_horca(cont_incorrecto); // base de la horca
console.log(selected_word);



document.addEventListener("keydown", function(event){
    var key_value = event.key;
     // Se verifica que la tecla presionada sea un símbolo que se pueda imprimir
    if (verificar_key(key_value)){
        // Se verifica que el símbolo sea una letra
        if (verificar_simbolo(key_value)){
            var letra_mayuscula = key_value.toUpperCase();
            var expresion = new RegExp(letra_mayuscula, "g");

            // Se procede a verificar que la letra está contenida dentro de la palabra seleccionada
            if(verificar_letra(selected_word, expresion)){
                // letra está contenida en la palabra, se procede a evaluar cuántas veces está
                var ocurrencias = evaluar_ocurrencias(letra_mayuscula, selected_word);
                var cont_aux = 1; // contador auxiliar que ayudará a iterar por cada ocurrencia encontrada
                while(cont_aux <= ocurrencias){
                    dibujar_letra_correcta(letra_mayuscula, selected_word, coordenadas_guiones, letras_faltantes);
                    cont_correcto++;
                    cont_aux++;
                }
            } else {
                // letra no está contenida en la palabra
                if(!verificar_ingreso_letra(letra_mayuscula, letras_incorrectas)){
                    // Letra no ha sido ingresada previamente
                    letras_incorrectas.push(letra_mayuscula);
                    dibujar_letra_incorrecta(letra_mayuscula, x_inicial_letra_incorrecta);
                    x_inicial_letra_incorrecta += 20;
                    cont_incorrecto++;
                    dibujar_horca(cont_incorrecto);
                }
            }

            if(cont_incorrecto == 9){
            console.log("Perdiste :(");
            }

            if(cont_correcto == selected_word.length){
            console.log("Ganaste :D");
            }
        }
    }
});


// Funciones

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

function verificar_letra(palabra, exp){
    // Función que retorna true cuando la letra está contenida en la palabra

    if(!exp.test(palabra)){
        // letra no pertenece a la palabra
        return false;
    } else {
        // letra pertenece a la palabra
        return true;
    }
}

function dibujar_letra_incorrecta(letra, coordenada_x){
    var y = 450;
    dibujar_letra(letra, coordenada_x,y);
}

function verificar_ingreso_letra(letra, array_letras){
    // Función que verifica si una letra incorrecta ya fue ingresada
    for(var i = 0; i < array_letras.length; i++){
        if(array_letras[i] == letra){
            // Letra ya ha sido ingresada
            return true;
        }
    }

    return false;
}

function dibujar_horca(contador){
    // Función que dibuja parte correspondiente de la horca dado el contador
    var pencil = board.getContext("2d");
    var x;
    var y;
    pencil.beginPath();
    if(contador == 0){
        // base de la horca
        x = 300;
        y = 325;
        pencil.moveTo(x, y);
        pencil.lineTo(x+200, y);
        pencil.stroke();
    } else if(contador == 1){
        // parte vertical de la horca
        x = 300;
        y = 325;
        pencil.moveTo(x, y);
        pencil.lineTo(x, y-300);
        pencil.stroke();
    } else if (contador == 2){
        // parte horizontal superior de la horca
        x = 300,
        y = 25;
        pencil.moveTo(x, y);
        pencil.lineTo(x+100, y);
        pencil.stroke();
    } else if(contador == 3){
        // parte final de la horca
        x = 400;
        y = 25;
        pencil.moveTo(x, y);
        pencil.lineTo(x, y+50);
        pencil.stroke();
    } else if(contador == 4){
        // cabeza
        x = 400;
        y = 100;
        pencil.arc(x, y, 25, 0, 2*3.14);
        pencil.stroke();
    } else if(contador == 5){
        // tronco
        x = 400;
        y = 125;
        pencil.moveTo(x, y);
        pencil.lineTo(400, y+125);
        pencil.stroke();
    } else if(contador == 6){
        // pierna izquierda
        x = 400;
        y = 250;
        pencil.moveTo(x, y);
        pencil.lineTo(x-50, y+50);
        pencil.stroke();
    } else if( contador == 7){
        // pierna derecha
        x = 400;
        y = 250;
        pencil.moveTo(x, y);
        pencil.lineTo(x+50, y+50);
        pencil.stroke();
    } else if (contador == 8){
        // brazo izquierdo
        x = 400;
        y = 150;
        pencil.moveTo(x, y);
        pencil.lineTo(x-50, y+50);
        pencil.stroke();
    } else if (contador == 9){
        // brazo derecho
        x = 400;
        y = 150;
        pencil.moveTo(x, y);
        pencil.lineTo(x+50, y+50);
        pencil.stroke();
    }

    
}

function dibujar_letra_correcta(letra, palabra, coordenadas_x, espacios_disponibles){
    var y = 390;
    for(var i = 0; i < palabra.length; i++){
        if(letra == palabra[i] && espacios_disponibles[i] == false){
            dibujar_letra(letra, coordenadas_x[i], y);
            espacios_disponibles[i] = true;
        }
    }
}

function dibujar_letra(letra, x, y){
    // Función que dibuja una letra en el tablero
    var pencil = board.getContext("2d");
    pencil.font = "20px Arial";
    pencil.fillStyle = "black";
    pencil.fillText(letra, x, y);
}
function evaluar_ocurrencias(letra, palabra){
    // Función que retorna la cantidad de veces que aparece una letra en la palabra
    var cont = 0;
    for(var i=0; i < palabra.length; i++){
        if(palabra[i] == letra){
            cont++;
        }
    }
    return cont;
}

function incializar_array_indicador(arreglo, palabra){
    // Función que inicializa el arreglo de letras faltantes con false proporcional al largo de la palabra
    for(var i = 0; i < palabra.length; i++){
        arreglo.push(false);
    }
}