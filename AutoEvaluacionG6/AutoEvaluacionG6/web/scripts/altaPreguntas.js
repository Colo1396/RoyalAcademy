
window.onload = function () {

 
    $("#idTipoPregunta").change(function () {//reviso si el combo box cambia de tipo de pregunta
       // alert("cambio el combo");
        if ($("#idTipoPregunta").val() == 2) { // capturo el id del combo y me fijo: si es 2  habblamos  de preguntas MC si es 1 hablamos  de preguntas VoF
            //alert("se eligio multiple choise");
            $("#RtaPreg").empty();// vacio el div (nodo del DOM)
            //ahora aca agrego en el div RtaPReg  el html que me arma  el formulario de una pregunta MC
            $("#RtaPreg").append("<div id=\"RtaMultipleChoice\">" +
                                    "<p>Preguntas Multiple Choise:" +
                                     "<br /> " +
                                             "<ol id=\"listaMC\">" +
                                            "</ol >"+
                                         "<input type =\"button\" name=\"agregar\" id=\"btn_AddRtaMC\" value=\"+Rta\"/>" +
                                     "</p >"+
                                 "</div > ");
            //genero una variable donde guardo el boton de agregar mas respuetas MC
            var btn_AddRtaMC = $("#btn_AddRtaMC");
            //reviso si el boton se activo
            btn_AddRtaMC.on("click", function () {
                // si se activa llamo a la funcion que agrega un html donde se ingresara mas respuestas MC
                agregarPregMC()
            });
        }
        else {
            //alert("se eligio VoF");
            // si se elije tipo de pregunta 1 entramos  en el formulario de Vof
            $("#RtaPreg").empty();// vacia el div RtaPreg
            // cargo el div con el formulario de Vof
            $("#RtaPreg").append(" <div id=\"RtaVoF\">" +
                                        "<p>Preguntas Verdadero/Falso:<br />" +
                                        "<ol> <li>" +
                                             "<input type=\"checkbox\" id=\"correcta\" />" +
                                             "<input type=\"text\" id=\"respuesta\" value=\"V\" />" +
                                        "</li > " +
                                            "<li><input type=\"checkbox\" id=\"correcta\" />" +
                                                "<input type=\"text\" id=\"respuesta\" value=\"F\" />" +
                                        "</li ></ol ></p ></div > ");
        }
    });



    // Se captura el boton de "enviar alta " 
    var btn_enviarAlta = $("#btn_Alta_preg");
     btn_enviarAlta.on("click", function () {
         //llamo a la funcion que va a llamar al WS para persistir la pregunta con sus respuestas
         validaAltaPregunta()
        // validaAltaRta()
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
    //capturo del html los campos de la pregunta
    var idPregunta = $("#idPregunta").val();
    var idTipoPregunta = $("#idTipoPregunta").val();
    var consigna = $("#consigna").val();
    console.log(idPregunta);
    console.log(idTipoPregunta);
    console.log(consigna);


    //url donde va a ir a buscar el ws
    var urlCompletaAltaPregunta = "/ws/altaPreguntas.asmx/AltaPregunta"

    //genero un json con los atributos de la CLASE PREGUNTA
    var parametros = {
        "idPregunta": idPregunta,
        "idTipoPregunta": idTipoPregunta,
        "consigna": consigna,
        "rtas": []//declare una clave de una lista vacia
    }

    // ----------------------------VERDADERO O FALSO-----------------------------

    // reviso si se cargo el div RtaVof
    var idRtaVoF = $("#RtaVoF");
    //busco si tiene un tag de tipo "li", si lo tiene econtre una lista
    var liRtaVoF = idRtaVoF.find("li");
    //lo imprimo por consola para ver que contiene
    console.log(liRtaVoF);

    // recorro la lista contenida en el campo liRtaVof
    for (var i = 0; i < liRtaVoF.length; i++) {
        //capturo el imtem seleccionaro en la posision de i
        var item = $(liRtaVoF[i]);
        var correcta = -1;
        //reviso el id del input donde donde se carga si es correctaq o no (checkbox),
        // la funcion prop me dice si el checkbox fue activado o no , devuelve true o false y con eso comparo con el if seteo la variable correcta con 1 o 0
        if (item.find("#correcta").prop('checked') == true) {// el find reemplaza el $
             correcta = 1;
        }
        else {
             correcta = 0;
        }
        //armo un json donde contiene los atributos de un objeto RESPUESTA
        var respuesta = {
            "correcta": correcta,
            "respuesta": item.find("#respuesta").val()
        }
        //con el push meto la respuesta en el json Ws
        //con esto quiero decir que voy a buscar al json "parametros" y le inserto a su atributo "rtas" el json "respuesta"
        parametros.rtas.push(respuesta);
        //console.log(parametros.rtas.length);
    }
    //muestro el json "parametros"  que devolveria una especie de "OBJETO" Pregunta que contiene sus atributos y una lista de respuetas.
    console.log(parametros);
     // ------------------------------------------------------------------------


    // ----------------------------MULTIPLE CHOICE-----------------------------
    //es lo mismo que en el VOF pero busca el id del div de MULTIPLE CHOICE
    var idRtaMC = $("#RtaMultipleChoice");
    var liRtaMC = idRtaMC.find("li");
    console.log(liRtaMC);

    for (var i = 0; i < liRtaMC.length; i++) {
        var item = $(liRtaMC[i]);
        var correcta = -1;
        if (item.find("#correcta").prop('checked') == true) {// el find reemplaza el $
            correcta = 1;
        }
        else {
            correcta = 0;
        }
        //armo json
        var respuesta = {
            "correcta": correcta,
            "respuesta": item.find("#respuesta").val()
        }
        //con el push meto la respuesta en el json Wx|
        parametros.rtas.push(respuesta);
        //console.log(parametros.rtas.length);
    }
    console.log(parametros);
     // ------------------------------------------------------------------------

    //COmo el ws recibe un "objeto"/json Pregunta , yo tengo que enviarle una pregunta al WS
    //asi que creo un json con un atributo de tipo pregunta
    var ObjetoPregunta = {
        "pregunta": parametros
    }

    //llamo al ws el cual persiste la pregunta
    var retorno = llamarWS(ObjetoPregunta, urlCompletaAltaPregunta, false);

    if (retorno == "true") {
        // redireccion al menu
        location.href = "menu.html";
    } else {
        alert("No se pudo enviar alta de pregunta");
    }


 
}

//-----------------------------------------------------------------------------------------
/*function validaAltaRta() {


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
*/
//-------------------------------------------------------------------------

function agregarPregMC() {
    // con esta funcion lo que se espera es cargar mas respuestas a una pregunta MC
    $("#listaMC").append("<li>  <input type=\"checkbox\" id=\"correcta\" />  <input type=\"text\" id=\"respuesta\" value=\"respuesta1\" /></li>");
  
}