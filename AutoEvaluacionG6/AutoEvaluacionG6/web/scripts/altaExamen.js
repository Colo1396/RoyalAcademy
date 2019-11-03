window.onload = function () {
    cargarNavMenu();
    var accion = obtenerClaveUrl("accion");
    var clave = obtenerClaveUrl("clave");
    switch (accion) {
        default: {
            //ALTA EXAMEN

            var sql = {"sql": "select ifnull(max(idModeloExamen), 0)+1 as idMax from modeloexamen" }
            var idMaxDevuelto = llamarWS(sql, "/ws/traerMaxId.asmx/TraerMaxId", false);
            console.log(idMaxDevuelto);
            $("#idModeloExamen").val(idMaxDevuelto);

            //--------Carrera----------------------------------------------------
            var sql = { "sql": "select idCarrera,nombre from carrera" }
            var registros = llamarWS(sql, "/ws/altaPreguntas.asmx/TraerListCarreras", false);
            console.log(registros);
            $("#idCarrera").append("<option value=\"0\">Seleccionar Carrera</option>");
            for (var i = 0; i < registros.length; i++) {
                $("#idCarrera").append("<option value=\"" + registros[i].idCarrera + "\">" + registros[i].nombre + "</option>");
            }

            //------------------------------------------------------------
            //CON EL ID DE LA CARRERA NO HAGO NADA AUN

            // Se captura el boton de "enviar alta " 
            var btn_AltaExamenAuto = $("#btn_Alta_Examen_Auto");
            btn_AltaExamenAuto.on("click", function () {
                //llamo a la funcion que va a llamar al WS para persistir la pregunta con sus respuestas
                generarExamenAuto()
                // validaAltaRta()
            });

            var btn_Guardar = $("#btn_Guardar"); 
            btn_Guardar.on("click", function () {
                guardarExamen();
            })
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

var modelo = {}; // es un json vacio


function generarExamenAuto() {
    //capturo del html los campos del examen
    var idExamen = $("#idModeloExamen").val();
    var idCarrera = $("#idCarrera").val();
    console.log(idExamen);
    console.log(idCarrera);

    //url donde va a ir a buscar el ws
    var url = "/ws/ExamenWS.asmx/ObtenerPreguntas"; //esta es una 
    modelo = llamarWS({"idCarrera":idCarrera}, url, false); //ME VA DEVOLVER UN MODELOExamen que puse en el WS, POR ESO RETORNA EL OBJETO MODELO DEL METODO OBTENER PREGUNTAS 
    //como queremos que haga la consulta y la espere, asincrono es false.
    console.log(modelo);

    armarColumnasTitulos();
    insertarRegistrosFilas();
    

}

function armarColumnasTitulos() {
    var htmtColumnas = "<thead> <tr>";

    htmtColumnas += "<th style=\"min-width: 100px\"> idPregunta </th> ";
    htmtColumnas += "<th style=\"min-width: 100px\">idTipo</th> ";
    htmtColumnas += "<th style=\"min-width: 150px\">Consigna</th> ";

    htmtColumnas += "</tr></thead>";

    $("#table_form").empty(); //para vaciar
    $("#table_form").append(htmtColumnas);
}


function insertarRegistrosFilas() {

    var htmlAgregar = "<tbody>";


    for (var i = 0; i < modelo.lstPreguntas.length ; i++) {
        htmlAgregar += "<tr>";
        var registro = modelo.lstPreguntas[i];

        htmlAgregar += "<td>" + registro.idPregunta + "</td> ";
        htmlAgregar += "<td>" + registro.idTipoPregunta + "</td> ";
        htmlAgregar += "<td>" + registro.consigna + "</td> ";
         
        htmlAgregar += "</tr>";
    }


    htmlAgregar += "</tbody>";


    $("#table_form").append(htmlAgregar);
}

function guardarExamen() {
    if (JSON.stringify(modelo) != "{}") { //para saber si un json esta vacio o lleno
        // alert("ESTA LLENO");
        modelo.idModeloExamen = $("#idModeloExamen").val();
        modelo.idCarrera = $("#idCarrera").val();

        console.log(modelo);

        var modeloJson = { //Es lo que después manda al WS en llamarWS
            //empaqueta nuestro json en entro json porque el WS te pido solo un parametro, entonces vos le tenes que mandar un JSON con una sola clave
            //tiene que tener el mismo formato que el tipo que te pide, en este caso una clase. 
            //Tiene que ser el mismo tipo que el que esta ingresando en el metodo que lo voy a utilizar
            "modelo": modelo }

        var url = "/ws/ExamenWS.asmx/guardarModeloExamen";  
        var resultado = llamarWS(modeloJson, url, false); 

        if (resultado == "true") {
            location.href = "/web/menu.html";
        } else {
            alert("ERROR! No se pudo persistir");
        }

    } else {
        alert("Primero presion el boton 'Generar examen automatico' y después guarde.");
    }
}




