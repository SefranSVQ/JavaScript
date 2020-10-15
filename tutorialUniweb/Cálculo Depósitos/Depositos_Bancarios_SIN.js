window.onload = function(){
    document.getElementsByName("calculo")[0].onclick = calcularBeneficio;

    var periodos = document.getElementsByName("pm");
    var otroPeriodo = document.getElementsByName("otro_periodo")[0].onkeypress = soloNumeros;
    var cantidadDeposito = document.getElementsByName("cantidad")[0].onkeypress = soloNumeros;

    var rentabilidades = document.getElementsByName("tipo_rentabilidad");

    for(var i in periodos){
        periodos[i].onclick = manejarPeriodo;
    }
    document.getElementsByName("pm")[0].onclick = manejarPeriodo;

    for (var i in rentabilidades){
        rentabilidades[i].onclick = manejarRentabilidad;
    }
}

function soloNumeros(e){
    var valido = true;
    if ("0123456789".indexOf(e.key) == -1) valido = false;
    return valido;
}	

function manejarPeriodo(){
    var otroPeriodo = document.getElementsByName("otro_periodo")[0];
    if (this.value == "0") otroPeriodo.disabled = false;
    else otroPeriodo.disabled = true;
}

function manejarRentabilidad(){

    var rentabilidadTAE = document.getElementsByName("rentabilidad_TAE")[0];
    var rentabilidadTIN = document.getElementsByName("rentabilidad_TIN")[0];

    switch (this.value){
        case "T":
            rentabilidadTAE.disabled = false;
            rentabilidadTIN.disabled = true;
            console.log("rentabilidad tae");
            break;
        case "N":
            rentabilidadTAE.disabled = true;
            rentabilidadTIN.disabled = false;
            console.log("rentabilidad tin");
            break;
    }
}

function calcularBeneficio(){
 
    // Variables
    var periodos = document.getElementsByName("pm");
    var otroPeriodo = document.getElementsByName("otro_periodo")[0];
    var periodoElegido;

    var rentabilidadTAE = document.getElementsByName("rentabilidad_TAE")[0];
    var rentabilidadTIN = document.getElementsByName("rentabilidad_TIN")[0];

    console.log(periodos);
    // Periodo
    for (var i in periodos){
        if (periodos[i].checked) periodoElegido = periodos[i];
    }




}