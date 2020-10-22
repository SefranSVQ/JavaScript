// Comprobación de si un DNI es correcto o no
var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
var digitos;
var letra;
var correcto;
var numeroLetra;

// Obtención y validación de los valores numéricos
do {
    digitos = prompt("Por favor, introduzca los dígitos de su DNI");
    if (digitos.length!=8){
        alert("Valor incorrecto, por favor, introduzca uno válido")
        correcto = false;
    } else {
        correcto = true;
    }
}
while(!correcto)

// Obtención y validación de la letra

letra = prompt("Por favor, introduzca la letra de su DNI");

numeroLetra = digitos % 23;
if (letra = letras[numeroLetra]){
    mensaje="El DNI es válido";
} else {
    mensaje="El DNI NO es válido";
}

alert(mensaje);
