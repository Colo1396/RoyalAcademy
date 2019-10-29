
window.onload = function () {

    var sql = {

        "sql": "select isnull(max(idPregunta),1) as idMax from pregunta"

    }

    console.log("Sql Enviado al WS");
    console.log(sql);

    var idMaxDevuelto = llamarWS(sql, "/ws/traerMaxId.asmx/TraerMaxId", false);

    // objeto enviado 
    console.log("Id Max Retornado del WS");
    console.log(idMaxDevuelto);
    $("#idMax").val(idMaxDevuelto);

}



/*
 * Metodo Ajax para las llamadas a WS, estructura basica.
 * @param {any} paramJSON  : son los parametros que enviara al Ws , en este caso son de tipo JSON,  aunque igual se pasa a cadena con el metodo JSON.stringify().
 * @param {any} urlWS      : es la Url donde se aloja el WEbService a llamar.
 * @param {any} asincrono  : indica si la llamada es asincronica, generalmente es false (llamada sincronica, espera retorno)
 */

/*
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
*/