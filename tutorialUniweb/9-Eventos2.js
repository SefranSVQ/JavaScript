
// Inicio

window.onload = function(){
    document.onmousemove = movimientoRaton;
    document.onkeypress = presionarTecla;
    document.onclick = hacerClick;
}

    // Funciones

// movimientoRaton: Muestra las coordenadas del ratón según el nav y también según la pág.

function movimientoRaton(){
    
    var mensaje = generarMensaje();
    cambiarColor("#FFFFFF"); 
    muestraInformacion(mensaje);
    
}

// presionarTecla: muestra información por el navegador acerca de la última tecla pulsada.

function presionarTecla(){

    var mensaje = generarMensaje();
    cambiarColor("#CCE6FF"); // Color de fondo: Azul
    muestraInformacion(mensaje);

}

// hacerClick: cambia el color del recuadro de información al hacer click con el ratón. 
// También muestra la información de la ubicación del cursor en ese momento, por motivos de coherencia.

function hacerClick(){

    var mensaje = generarMensaje();
    cambiarColor("#FFFFCC"); // Color de fondo: Amarillo
    muestraInformacion(mensaje);

}

// generarMensaje: genera un array con el mensaje a mostrar por pantalla

function generarMensaje(){

    var evento = window.event;
    var mensaje = new Array();

    console.log(evento.type);

    switch (evento.type){

        case "mousemove":
        case "click":
        

            mensaje[0] = "Ratón:";
            mensaje[1] = "Navegador: ("+evento.clientX+","+evento.clientY+")";
            mensaje[2] = "Página: ("+evento.screenX+","+evento.screenY+")";

            break;
        
        case "keypress":

            mensaje[0] = "Teclado:";
            mensaje[1] = "Carácter: "+evento.keyCode;
            mensaje[2] = "Código: "+evento.charCode;

            break;
    }
    

    return mensaje;
}

// cambiarColor: cambia el color del contenedor de información

function cambiarColor(color){

    document.getElementById("info").style.backgroundColor = color;

}

// Funcion moverCuadro: Mueve el cuadro de información en función del movimiento del ratón

function moverCuadro(){
    //TODO
}

// Función para mostrar la información deseada. Código ya proporcionado por el ejercicio.

function muestraInformacion(mensaje) {
    document.getElementById("info").innerHTML = '<h1>'+mensaje[0]+'</h1>';
    for(var i=1; i<mensaje.length; i++) {
        document.getElementById("info").innerHTML += '<p>'+mensaje[i]+'</p>';
    }
}