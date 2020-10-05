window.onload = function(){
    document.getElementsByName("calculo")[0].onclick = calcularBeneficio;
    var periodos = document.getElementsByName("pm");
    for(var i in radios){
        periodos[i].onclick() = manejarPeriodo;
    }
    document.getElementsByName("pm")[0].onclick = manejarPeriodo;
}

function manejarPeriodo(e){

}

function calcularBeneficio(){
 
    // Variables
    var periodos = document.getElementsByName("pm")[0];
    var otroPeriodo = document.getElementsByName("otro_periodo")[0];
    var periodoElegido;

    console.log(periodos);
    // Periodo
    for (var i in periodos){
        if (periodos[i].checked) periodoElegido = periodos[i];
    }

    if (periodoElegido.value == "0"){
        //TODO hacer cosas
        otroPeriodo.disabled = false;
    }

}