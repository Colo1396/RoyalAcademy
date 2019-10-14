
/**
 * obtiene las claves que se pasan por ULR, a partir del nombre de la clave
 * @param {any} name nombre de la clave
 */
function obtenerClaveUrl(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
        data: JSON.stringify(paramJSON), // aca se pasa el JSON a string sino da problemas con el WS
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: asincrono,
        success: function (respuesta) {

            // al volver del WS, los datos retornados estaran en respuesta.d,  el nombre de la variable "respuesta" la elije uno.
            // pero el ".d" es propio de javascript, es donde estara la cadena devuelta en mis caso.
            // si quieren ver todo lo que tiene respuesta , coloquen aqui debajo. console.log(respuesta); imprime por consola
            //console.log(respuesta);
            // para ver la consola se abre con F12 en el explorador.

            // aqui devolvera true o false en formato string , no estoy seguro si reconoce booleanos, yo siempre maneje todo por Strings u JSON.
            retorno = respuesta.d;
        }
    });
    return retorno;
}


