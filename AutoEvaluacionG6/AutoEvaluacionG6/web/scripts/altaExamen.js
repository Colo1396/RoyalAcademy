window.onload = function () {
    var accion = obtenerClaveUrl("accion");
    var clave = obtenerClaveUrl("clave");
    switch (accion) {
        default: {
            //ALTA EXAMEN

            var sql = { "sql": "select max(idModeloExamen) as idMax from modeloexamen" }
            var idMaxDevuelto = llamarWS(sql, "/ws/traerMaxId.asmx/TraerMaxId", false);
            console.log(idMaxDevuelto)
            $("#idModeloExamen").val(idMaxDevuelto);
            
            //CON EL ID DE LA CARRERA NO HAGO NADA AUN

            // Se captura el boton de "enviar alta " 
            var btn_AltaExamenAuto = $("#btn_Alta_Examen_Auto");
            btn_AltaExamenAuto.on("click", function () {
                //llamo a la funcion que va a llamar al WS para persistir la pregunta con sus respuestas
                generarExamenAuto()
                // validaAltaRta()
            });

        }
    }
}


/**
 * Metodo Ajax para las llamadas a WS, estructura basica.
 * @param {any} paramJSON  : son los parametros que enviara al Ws , en este caso son de tipo JSON,  aunque igual se pasa a cadena con el metodo JSON.stringify().
 * @param {any} urlWS      : es la Url donde se aloja el WEbService a llamar.
 * @param {any} asincrono  : indica si la llamada es asincronica, generalmente es false (llamada sincronica, espera retorno)
 */

//Funcion para llamar al ws
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

function generarExamenAuto() {
    //capturo del html los campos del examen
    var idExamen = $("#idExamen").val();
    var idCarrera = $("#idCarrera").val();
    console.log(idExamen);
    console.log(idCarrera);

    //url donde va a ir a buscar el ws
    var urlCompletaAltaPregunta = "/ws/altaExamen.asmx/AltaExamen"

    //genero un json con los atributos de la CLASE PREGUNTA
    var parametros = {
        "idModeloExamen": idModeloExamen,
        "idCarrera": idCarrera,
        "lstPreguntas": []//declare una clave de una lista vacia
    }

    var consulta = "select * where idCarrera =" + idCarrera + "from modeloexamen";
    var sql = { "sql": consulta }

    console.log(sql)

    for

}






