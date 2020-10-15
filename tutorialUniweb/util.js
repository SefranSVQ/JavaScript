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

    if (e.key == '.' && this.value.indexOf(".") != -1) valido = false; // Si ha introducido punto y ya contiene uno en el texto.
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

// Generador de Párrafos

function generarParrafos(){
    var cantidadParrafos = document.getElementById("nParrafos");
    var contenidoParrafos = document.getElementById("contParrafo");
    var parrafosGenerados = document.getElementById("listaParrafos");

    if (cantidadParrafos.value == "" || contenidoParrafos.value == ""){
        parrafosGenerados.innerHTML ="Por favor, introduce todos los campos";
    } 
    else {
        parrafosGenerados.innerHTML = "";
        for (var i = 0; i < cantidadParrafos.value ; i++){
            parrafosGenerados.innerHTML += "<p>"+contenidoParrafos.value+"</p>"; //crear parrafos con createElement y añadir con appendChild
        }
    }
}

// Generador de tabla

function generarTabla(){

    var divTabla = document.getElementById("tabla");
    var numFilas = document.getElementById("nfilas").value;
    var numColumnas = document.getElementById("ncolumnas").value;
    var tabla = document.createElement("table");
    var cabecera = document.createElement("thead");
    var cuerpo = document.createElement("tbody");
    var fila, columna;

    var texto = document.createTextNode("");
    divTabla.innerHTML="";
    tabla.border = 1;
    tabla.appendChild(cabecera);
    tabla.appendChild(cuerpo);

    for (i = 0; i < numFilas ; i++){
        if (i != 0) fila = document.createElement("tr");
        for (j = 0; j < numColumnas ; j++){
            columna = document.createElement("td");
            texto.value = i+","+j
            columna.innerHTML = texto.value;
            if (i != 0) fila.appendChild(columna);
            else cabecera.appendChild(columna);
        }
        if (i != 0) cuerpo.appendChild(fila);
    }
    divTabla.appendChild(tabla);
}

function soloNumerosDecimalesComa(e){
	
    var valido = true;
    // Si ha introducido coma y ya contiene una en el texto, no es correcta la entrada.
    if (e.key == ',' && this.value.indexOf(",") != -1) valido = false; 
    if (",0123456789".indexOf(e.key) == -1) valido = false;

    return valido;
}

function soloNumerosEnteros(e){
	
    var valido = true;

    if ("0123456789".indexOf(e.key) == -1) valido = false;
    // Si la tecla introducida es un - y no hay ninguna al principio del valor del input, agrégalo.
    if (e.key == '-' && e.originalTarget.value[0] != '-') {
        e.originalTarget.value = '-'+e.originalTarget.value;
    } 
    return valido;
}	

function soloNumerosDecimalesE(e){
	
    var valido = true;

        // Si ha introducido punto y ya contiene uno en el texto, no es válido.
    if (e.key == '.' && this.value.indexOf(".") != -1) valido = false; 
    if (".0123456789".indexOf(e.key) == -1) valido = false;
    // Si la tecla introducida es un - y no hay ninguna al principio del valor del input, agrégalo.
    if (e.key == '-' && e.originalTarget.value[0] != '-') {
        e.originalTarget.value = '-'+e.originalTarget.value;
    } 

    return valido;
}	

function cambiarComasPorPuntos(cadena){
    for (var i in cadena){
      if (cadena[i] == ',') cadena[i] = '.';
    }
    return cadena;
  }

function genTabla(array){

    var tabla = document.createElement("table");
    var cabecera = document.createElement("thead");
    var cuerpo = document.createElement("tbody");
    var texto = document.createTextNode("");
    var fila, columna;

    tabla.border = 1;
    tabla.appendChild(cabecera);
    tabla.appendChild(cuerpo);

    for (i = 0; i < array.length ; i++){
        if (i != 0) fila = document.createElement("tr");
        for (j = 0; j < array[i].length ; j++){
            columna = document.createElement("td");
            texto.value = array[i][j];
            columna.innerHTML = texto.value;
            if (i != 0) fila.appendChild(columna);
            else cabecera.appendChild(columna);
        }
        if (i != 0) cuerpo.appendChild(fila);
    }
    return tabla;
}

// Test 
window.onload = function(){

    var info = document.getElementById("info");
    var miArray =   [
                    [1,2,3,4],
                    ['h','o','y'," Estoy feliz por lo bien que me ha salido el examen (o eso creo)"],
                    [1,2,3,4],
                    ];

    var miTabla = genTabla(miArray);
    console.log(miTabla);
    console.log(miArray);
    info.appendChild(miTabla);
    info.append(miTabla);

}


/* Función -

Esta función 

 - Entradas: 
 - Salida:

*/

