// Util.js: Librería de utilidades para javascript

/* Función validarFecha

Esta función nos comprobará que una fecha es válida o no en función de su día, mes y año.

 - Entradas: día (int), mes (int), anio (int)
 - Salida: valido (booleano)

*/

function validarFecha(dia,mes,anio){

    var valido = true;
    var bisiesto = anio % 4 == 0;

    // Comprobamos los datos básicos de una fecha. (En esta funcion solo se aceptan fechas con años positivos)

    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 0){
        valido = false
    }

    // En función del mes, comprobamos si el día es válido o no.

    if (valido){
        switch (mes){
            case 2:
                if (bisiesto && dia > 29) valido = false; // Bisiesto
                else if (!bisiesto && dia > 28) valido = false;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if (dia > 30) valido = false;
                break;
            
        }
    }

    return valido;
}

/* Función soloLetras

Esta función permite comprobar si una tecla introducida es un valor alfabético español o no.

 - Entradas: evento (keyUp)
 - Salida: valido (booleano)

*/

function soloLetras(e){
	
    var valido = false;

    if ((e.key >= 'a' && e.key <= 'z') ||
        (e.key >= 'A' && e.key <= 'Z' ) || 
        "áéíóúÁÉÍÓÚñÑ ".indexOf(e.key) != -1) {
            valido = true;
        }

    return valido;
}		

/* Función validarDni

Esta función nos permite comprobar si un DNI es válido o no.

 - Entradas: DNI (string)
 - Salida: valido (booleano)

*/

function validarDni(dni) {

    dni = dni.toUpperCase();
    var valido = true;
    var parteNumerica = "";
    var numeros = "0123456789";
    var letras = "TRWAGMYFPDXBNJZSQVHLCKET";
    var resto = 0;

    if (dni.length != 9){ // Comprobamos la longitud
        valido = false;
    }
    else {
        // Comprobar si es NIE y si es así, cambiar la letra por el número correspondiente
        parteNumerica = dni.substr(0,8);
        if (numeros.indexOf(dni.charAt(0)) == -1){
            switch (dni.charAt(0)){
                case 'X':
                    parteNumerica = '0'+dni.substr(1,8);
                    break;
                case 'Y':
                    parteNumerica = '1'+dni.substr(1,8);
                    break;
                case 'Z':
                    parteNumerica = '2'+dni.substr(1,8);
                    break;
            }
        }
        
        // Comprobamos que los caracteres 0-7 son números
        for (i = 0; i < 8 && valido; i++){
            if (numeros.indexOf(parteNumerica.charAt(i)) == -1){ 
                valido = false;
            }
        }

        // Comprobamos que el último carácter es una letra válida
        resto = parseInt(parteNumerica) % 23;

        if (valido && 
            letras.indexOf(dni.charAt(8)) != -1 && 
            dni.charAt(8) != letras.charAt(resto)) {
                valido = false;
            }
    }

    return valido;
}

// Test 

window.onload = function(){

    var infoFechas = document.getElementById("infoFechas");

    // Test validarFecha

    infoFechas.innerHTML += "Tests de validarFecha: </br></br>";
    infoFechas.innerHTML += "Fecha 1/1/2020 : "+validarFecha(1,1,2020)+"</br>";
    infoFechas.innerHTML += "Fecha 1/12/2020 : "+validarFecha(1,12,2020)+"</br>";
    infoFechas.innerHTML += "Fecha 31/1/2020 : "+validarFecha(31,1,2020)+"</br></br>";

    infoFechas.innerHTML += "Fecha 1/1/-2020 : "+validarFecha(1,1,-2020)+"</br>";
    infoFechas.innerHTML += "Fecha 1/-1/2020 : "+validarFecha(1,-1,2020)+"</br>";
    infoFechas.innerHTML += "Fecha -1/1/2020 : "+validarFecha(-1,1,2020)+"</br></br>";

    infoFechas.innerHTML += "Fecha 1/13/2020 : "+validarFecha(1,13,2020)+"</br>";
    infoFechas.innerHTML += "Fecha 32/1/2020 : "+validarFecha(32,1,2020)+"</br></br>";

    infoFechas.innerHTML += "Fecha 31/4/2020 : "+validarFecha(31,4,2020)+"</br>";
    infoFechas.innerHTML += "Fecha 31/6/2020 : "+validarFecha(31,6,2020)+"</br></br>";

    infoFechas.innerHTML += "Fecha 29/2/2020 : "+validarFecha(29,2,2020)+"</br>";
    infoFechas.innerHTML += "Fecha 29/2/2019 : "+validarFecha(29,2,2019)+"</br></br>";

    // Test soloLetra

    infoFechas.innerHTML += "Tests de soloLetras: </br>";
    var infoFechas = document.getElementById("nombre");
    infoFechas.onkeypress = soloLetras;

    // Test validarDNI
    var infoDNI = document.getElementById("infoDNI");

    infoDNI.innerHTML += "Tests de validarDNI: </br></br>";
    infoDNI.innerHTML += "DNI - 00000000T: "+validarDni("00000000T")+"</br>";
    infoDNI.innerHTML += "DNI - 0000000T: "+validarDni("0000000T")+"</br>";
    infoDNI.innerHTML += "DNI - 00000000t: "+validarDni("00000000t")+"</br>";
    infoDNI.innerHTML += "DNI - x0000000T: "+validarDni("x0000000T")+"</br>";
    infoDNI.innerHTML += "DNI - 00000001R: "+validarDni("00000001R")+"</br>";
    infoDNI.innerHTML += "DNI - y0000001R: "+validarDni("y000001R")+"</br>";



}


/* Función -

Esta función 

 - Entradas: 
 - Salida:

*/

