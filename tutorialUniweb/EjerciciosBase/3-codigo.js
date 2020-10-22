//Ejercicio 4
var valores = [true, 5, false, "hola", "adios", 2];
var resultado;

if (valores[3].length > valores[4].length){
    resultado = "El primer valor es mayor";
}
else if (valores[3].length < valores[4].length){
    resultado = "El segundo valor es mayor";
}
else {
    resultado = "Los 2 valores son iguales";
}

alert(resultado);