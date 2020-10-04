// Util.js: Librería de utilidades para javascript

/* Funcion validarCC

    cogida de internet

*/

function validarIBAN(IBAN) {

    //Se pasa a Mayusculas
    IBAN = IBAN.toUpperCase();
    //Se quita los blancos de principio y final.
    IBAN = IBAN.trim();
    IBAN = IBAN.replace(/\s/g, ""); //Y se quita los espacios en blanco dentro de la cadena

    var letra1,letra2,num1,num2;
    var isbanaux;
    var numeroSustitucion;
    //La longitud debe ser siempre de 24 caracteres
    if (IBAN.length != 24) {
        return false;
    }

    // Se coge las primeras dos letras y se pasan a números
    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = getnumIBAN(letra1);
    num2 = getnumIBAN(letra2);
    //Se sustituye las letras por números.
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    // Se mueve los 6 primeros caracteres al final de la cadena.
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

    //Se calcula el resto, llamando a la función modulo97, definida más abajo
    resto = modulo97(isbanaux);
    if (resto == 1){
        return true;
    }else{
        return false;
    }
}

function modulo97(iban) {
    var parts = Math.ceil(iban.length/7);
    var remainer = "";

    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
    }

    return remainer;
}

function getnumIBAN(letra) {
    ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letras.search(letra) + 10;
}

/* Función comprobarSiHayItemSeleccionado

Esta función permite saber si hay un item seleccionado en un radio button

 - Entradas: botonRadio (elemento radio button)
 - Salida: haySeleccionado (bool)

*/

function comprobarSiHayItemSeleccionado(botonRadio){

    var haySeleccionado = false;

    for (var i in  botonRadio){
        if (botonRadio[i].checked) haySeleccionado = true;
    }

    return haySeleccionado;
}


/* Función comprobarLongitudTexto

Esta función permite saber si una cadena de caracteres tiene menos de una longitud determinada

 - Entradas: cadena (str), longitud (int)
 - Salida: valido (bool)

*/

function comprobarLongitudTexto(cadena, longitud){

    valido = true;

    if (typeof cadena != "string" || typeof longitud != "number") valido = false;
    if (cadena.length < longitud) valido = false;

    return valido;

}


/* Función validarFecha

Esta función nos comprobará que una fecha es válida o no en función de su día, mes y año.

 - Entradas: día (int), mes (int), anio (int)
 - Salida: valido (booleano)

*/

function validarFecha(dia,mes,anio){

    var fechaHoy = new Date();
    var fechaUsuario = new Date(anio+"-"+mes+"-"+dia);
    var valido = true;
    var bisiesto = anio % 4 == 0;

    // Comprobamos que los datos del usuario son correctos

    if (typeof(dia) != "number" || typeof(mes) != "number" || typeof(anio) != "number") valido = false;

    // Comprobamos los datos básicos de una fecha. (En esta funcion solo se aceptan fechas con años superiores a 1900)

    if (dia < 1 || dia > 31 || 
        mes < 1 || mes > 12 || 
        anio < 1900 || 
        fechaUsuario > fechaHoy){
        valido = false
    }

    // En función del mes, comprobamos si el día es válido o no.

    if (valido){
        switch (mes){
            case 2:
                if (bisiesto && dia > 29) valido = false; // Bisiesto
                else if (!bisiesto && dia > 28) valido = false;
                break;
            case 4: case 6: case 9: case 11:
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

/* Función soloNumerosDecimales

Esta función permite comprobar si una tecla introducida es un valor numérico entero o un punto

 - Entradas: evento (keyUp)
 - Salida: valido (booleano)

*/

function soloNumerosDecimales(e){
	
    var valido = true;

    if (".0123456789".indexOf(e.key) == -1) valido = false;

    return valido;
}	

/* Función soloNumeros

Esta función permite comprobar si una tecla introducida es un valor numérico entero

 - Entradas: evento (keyUp)
 - Salida: valido (booleano)

*/

function soloNumeros(e){
	
    var valido = true;

    if ("0123456789".indexOf(e.key) == -1) valido = false;

    return valido;
}	

/* Función soloAlfanumericos

Esta función permite comprobar si una tecla introducida es un valor numérico o alfabético español

 - Entradas: evento (keyUp)
 - Salida: valido (booleano)

*/

function soloAlfanumericos(e){
	
    var valido = true;

    if ((e.key >= 'a' && e.key <= 'z') ||
        (e.key >= 'A' && e.key <= 'Z' ) || 
        "áéíóúÁÉÍÓÚñÑ ".indexOf(e.key) != -1 ||
        "0123456789".indexOf(e.key) == -1) {
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

    infoFechas.innerHTML += "Fecha kk/k/kkkk : "+validarFecha("kk","kk","kkkk")+"</br></br>";

    infoFechas.innerHTML += "Fecha 11/1/2.19 : "+validarFecha(1.1,1,2.19)+"</br></br>";

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

