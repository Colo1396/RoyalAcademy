
window.onload = function () {

 
    $("#idTipoPregunta").change(function () {
        alert("cambio el combo");
        if ($("#idTipoPregunta").val() == 2) {
            alert("se eligio multiple choise");
            $("#RtaPreg").empty();
            $("#RtaPreg").append("<div id=\"RtaMultipleChoice\"><p>Preguntas Multiple Choise:<br /><ol id=\"listaMC\"></ol><input type=\"button\" name=\"agregar\" id=\"btn_AddRtaMC\" value=\"+Rta\" /></p></div>");
            var btn_AddRtaMC = $("#btn_AddRtaMC");
            btn_AddRtaMC.on("click", function () {
                agregarPregMC()
            });
        }
        else {
            alert("se eligio VoF");
            $("#RtaPreg").empty();
            $("#RtaPreg").append(" <div id=\"RtaVoF\"><p>Preguntas Verdadero/Falso:<br /><ol><li><input type=\"checkbox\" id=\"correcta\" /><input type=\"text\" id=\"respuesta\" value=\"V\" /></li><li><input type=\"checkbox\" id=\"correcta\" /><input type=\"text\" id=\"respuesta\" value=\"F\" /></li></ol></p></div>");
        }
    });



    // Se captura el boton de "enviar alta " 
    var btn_enviarAlta = $("#btn_Alta_preg");
     btn_enviarAlta.on("click", function () {
         
         validaAltaPregunta()
         validaAltaRta()
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
//-----------------------------------------------------------------------------------------
function validaAltaPregunta() {
    //pregunta
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

//-----------------------------------------------------------------------------------------
function validaAltaRta() {
    //pregunta
    /*var idPregunta = $("#idPregunta").val();
    console.log($("#correctaMC").prop('checked'));
    if ($("#correctaMC").prop('checked') == true) {
        var correcta = 1;
    }
    else {
        var correcta = 0;
    }
    var respuesta = $("#respuestaMC").val();
    console.log(idPregunta);
    console.log(correcta);
    console.log(respuesta);*/

    var idPregunta = $("#idPregunta").val();
    console.log($("#correcta").prop('checked'));
    if ($("#correcta").prop('checked') == true) {
        var correcta = 1;
    }
    else {
        var correcta = 0;
    }
    var respuesta = $("#respuesta").val();
    console.log(idPregunta);
    console.log(correcta);
    console.log(respuesta);


    var urlCompletaAltaPregunta = "/ws/altaRtaPreg.asmx/AltaRta"

    var parametros = {
        "idPregunta": idPregunta,
        "correcta": correcta,
        "respuesta": respuesta
    }

    var retorno = llamarWS(parametros, urlCompletaAltaPregunta, false);

    if (retorno == "true") {
        // redireccion al menu
        location.href = "menu.html";
    } else {
        alert("No se pudo enviar alta de respuesta");
    }
}

//-------------------------------------------------------------------------

function agregarPregMC() {

    //$("#listaMC").append("<li>  <input type=\"checkbox\" id=\"correctaMC\" />  <input type=\"text\" id=\"respuestaMC\" value=\"respuesta1\" /></li>");
    $("#listaMC").append("<li>  <input type=\"checkbox\" id=\"correcta\" />  <input type=\"text\" id=\"respuesta\" value=\"respuesta1\" /></li>");
  
}