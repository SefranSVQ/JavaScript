// Variables utilizadas

document.onmousemove = movimientoRaton;
document.onkeypress = presionarTecla;
document.onclick = hacerClick;

    // Funciones

// movimientoRaton: Muestra las coordenadas del ratón según el nav y también según la pág.

function movimientoRaton(elEvento){
    
    var evento = elEvento || window.event;
    var mensaje = new Array();

    mensaje[0] = "Ratón:";
    mensaje[1] = "Navegador: ("+evento.clientX+","+evento.clientY+")";
    mensaje[2] = "Página: ("+evento.screenX+","+evento.screenY+")";

    document.getElementById("info").style.backgroundColor = "#FFFFFF"; // Color de fondo: blanco

    muestraInformacion(mensaje);
}

// presionarTecla: muestra información por el navegador acerca de la última tecla pulsada.

function presionarTecla(elEvento){
 
    var evento = elEvento || window.event;
    var mensaje = new Array();

    mensaje[0] = "Teclado:";
    mensaje[1] = "Carácter: "+evento.keyCode;
    mensaje[2] = "Código: "+evento.charCode;

    document.getElementById("info").style.backgroundColor = "#CCE6FF"; // Color de fondo: Azul

    muestraInformacion(mensaje);

}

// hacerClick: cambia el color del recuadro de información al hacer click con el ratón. 
// También muestra la información de la ubicación del cursor en ese momento, por motivos de coherencia.

function hacerClick(elEvento){
 
    var evento = elEvento || window.event;
    var mensaje = new Array();

    mensaje[0] = "Ratón:";
    mensaje[1] = "Navegador: ("+evento.clientX+","+evento.clientY+")";
    mensaje[2] = "Página: ("+evento.screenX+","+evento.screenY+")";

    document.getElementById("info").style.backgroundColor = "#FFFFCC"; // Color de fondo: Amarillo

    muestraInformacion(mensaje);

}

// Función para mostrar la información deseada. Código ya proporcionado por el ejercicio.

function muestraInformacion(mensaje) {
    document.getElementById("info").innerHTML = '<h1>'+mensaje[0]+'</h1>';
    for(var i=1; i<mensaje.length; i++) {
        document.getElementById("info").innerHTML += '<p>'+mensaje[i]+'</p>';
    }
}