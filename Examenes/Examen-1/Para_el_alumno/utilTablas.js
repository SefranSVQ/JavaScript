/*      Función genTabla
    Esta función genera una tabla (con thead y tbody) a partir de un array.
    Tendrá tantas filas y columnas como el array tenga. Además, los valores de
    dicho array será introducido en cada una de las celdas de dicha tabla.
    (Ejercicio 10)
*/

function genTabla(aTabla){

    var tabla = document.createElement("table");
    var cabecera = document.createElement("thead");
    var cuerpo = document.createElement("tbody");
    var texto = document.createTextNode("");
    var fila, columna;

    tabla.border = 1;
    tabla.appendChild(cabecera);
    tabla.appendChild(cuerpo);

    for (i = 0; i < aTabla.length ; i++){
        if (i != 0) fila = document.createElement("tr");
        for (j = 0; j < aTabla[i].length ; j++){
            columna = document.createElement("td");
            texto.value = aTabla[i][j];
            columna.innerHTML = texto.value;
            if (i != 0) fila.appendChild(columna);
            else cabecera.appendChild(columna);
        }
        if (i != 0) cuerpo.appendChild(fila);
    }
    return tabla;
}

/*      Función aDeTabla
    Esta función genera un array con el contenido de las celdas de una tabla,
    la cual será asignada por parámetro en la función. En el caso de que
    no se pase una tabla, se devolverá un array vacio.
    (Ejercicio 11)
*/

function aDeTabla(tabla = document.createElement("table")){

    var array = [];

    for (var i = 0 ; i < tabla.children.length ; i++){
        if (tabla.children[i].nodeName == "THEAD") {
            for (var j = 0 ; j < tabla.children[i].children.length ; j++) {
                if (tabla.children[i].children[j].nodeName == "TD") array.push(tabla.children[i].children[j].innerHTML);
            }
        }
        
        if (tabla.children[i].nodeName == "TBODY") {
            for (var j = 0 ; j < tabla.children[i].children.length ; j++) {
                if (tabla.children[i].children[j].nodeName == "TR") {
                    for (var k = 0 ; k < tabla.children[i].children[j].children.length ; k++) {
                        if (tabla.children[i].children[j].children[k].nodeName == "TD") array.push(tabla.children[i].children[j].children[k].innerHTML);
                    }
                }
            }
        }
    }
    return array;
}


// Test 
window.onload = function(){

    // Test de genTabla
    var info = document.getElementById("info");
    var miArray =   [
                    [1,2,3,4],
                    ['h','o','y'," Estoy feliz por lo bien que me ha salido el examen (o eso creo)"],
                    [1,2,3,4],
                    ];
    var miTabla = genTabla(miArray);

    info.innerHTML += "<p> Test del método genTabla : </p>";
    info.append(miTabla);

    // Test de aDeTabla
    info.innerHTML += " <p> Test del método aDeTabla sin parámetro: </p>";
    miArray = info.append(aDeTabla());
    info.innerHTML += " <p> Test del método aDeTabla con parámetro: </p>";
    miArray = info.append(aDeTabla(miTabla));

}

