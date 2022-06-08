var cont_correcto = 0; // contador que indicará el avance de la palabra
var cont_incorrecto = 0; //  contador que indicará el avance de la horca
console.log(selected_word);
console.log(cont_correcto);
console.log(cont_incorrecto);

document.addEventListener("keydown", function(event){
    var key_value = event.key;
    console.log(key_value);
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
                    dibujar_letra_correcta(letra_mayuscula);
                    cont_correcto++;
                    cont_aux++;
                }
            } else {
                // letra no está contenida en la palabra
                dibujar_letra_incorrecta(letra_mayuscula);
                cont_incorrecto++;
                dibujar_horca(letra_mayuscula, cont_incorrecto);
            }

            console.log(cont_correcto);
            console.log(cont_incorrecto);

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

function dibujar_letra_incorrecta(letra){
    console.log("Te equivocaste");
}

function dibujar_horca(letra, contador){
    console.log("dibujando horca");
}

function dibujar_letra_correcta(letra){
    console.log("Acertaste");
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