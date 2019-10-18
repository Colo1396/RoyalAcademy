﻿
/*$(document).ready(function () {
    $("#btnTipoPregunta").click(function () {
        console.log('se clikeo boton');
    });
});
*/



/*$(document).ready(function myfunction() {
    $("#btn_Alta_preg").click(function () {
        alert("se clikeo el boton");
        validadAltaPregunta()
    });

});*/

window.onload = function () {
    // Se captura el boton de "enviar alta " 
    var btn_enviarAlta = $("#btn_Alta_preg");

     btn_enviarAlta.on("click", function () {
         
        validaAltaPregunta()
        
    });
   
}

/**
 * Metodo Ajax para las llamadas a WS, estructura basica.
 * @param {any} paramJSON  : son los parametros que enviara al Ws , en este caso son de tipo JSON,  aunque igual se pasa a cadena con el metodo JSON.stringify().
 * @param {any} urlWS      : es la Url donde se aloja el WEbService a llamar.
 * @param {any} asincrono  : indica si la llamada es asincronica, generalmente es false (llamada sincronica, espera retorno)
 */


function llamarWS(paramJSON, urlWS, asincrono) {
    var retorno = null;
    $.ajax({
        type: "POST",
        url: urlWS,
        data: JSON.stringify(paramJSON),//se convierte el json en cadena para enviar al ws
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: asincrono,
        success: function (respuesta) {
            retorno = respuesta.d;
        }
    });
    return retorno;

}

function validaAltaPregunta() {
    var idPregunta = $("#idPregunta").val();
    var idTipoPregunta = $("#idTipoPregunta").val();
    var consigna = $("#consigna").val();
    console.log(idPregunta);
    console.log(idTipoPregunta);
    console.log(consigna);

    var urlCompletaAltaPregunta = "/ws/altaPreguntas.asmx/AltaPregunta"

    var parametros = {
        "idPregunta": idPregunta,
        "idTipoPregunta": idTipoPregunta,
        "consigna": consigna
    }

    var retorno = llamarWS(parametros, urlCompletaAltaPregunta, false);

    if (retorno == "true") {
        // redireccion al menu
        location.href = "menu.html";
    } else {
        alert("No se pudo enviar alta de pregunta");
    }
}