
/**
* LLama la definicion del Formulario para armar
* @param {any} param
* @param {any} ws
* @param {any} asincrono
*/
/*
function obtenerDefinicionDeListar(param, ws, asincrono = false) {
    var registro = null;
    $.ajax({
        type: "POST",
        url: ws,
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: asincrono,
        success: function (respuesta) {
            registro = JSON.parse(respuesta.d);
        },
        error: function (xhr, status, error) {
            alert("error de obtencion de definicion de formulario");
        }
    });
    return registro;
}

*/
function obtenerDefinicionDeListar(url_def_form) {
    var registro = {};
    $.ajax({
        dataType: "json",
        cache: false,
        url: url_def_form,
        async: false,
        success: function (def) {
            registro = def;
        },
        error: function (xhr, status, error) {
            alert("error de obtencion de definicion de formulario");
        },
    });
    return registro;
}


window.onload = function () {

    var nombreFormulario = obtenerClaveUrl("formulario");
    var url_def_form = "/web/formularios/" + nombreFormulario + ".json";

    var defForm = obtenerDefinicionDeListar(url_def_form);

    var obj = {
        "sql": defForm.sql
    }
    var registros = llamarWS(obj, "/ws/ListarWS.asmx/ObtenerRegistros", false);
    armarFormularioListar(defForm, registros, defForm.redireccion);


}


function armarFormularioListar(defForm, registros) {

    $("#titulo_form").val(defForm.titulo);

    armarColumnasTitulos(defForm.columnas);
    insertarRegistrosFilas(defForm, registros);
}

function armarColumnasTitulos(columnas) {
    var htmtColumnas = "<thead> <tr>";

    for (var i = 0; i < columnas.length; i++){

        htmtColumnas += "<th style=\"width:" + columnas[i].tamaño + "px\">" + columnas[i].titulo + "</th> ";
    }
 
    htmtColumnas += "<th>Acciones</th>";
    htmtColumnas += "</tr></thead>";

    $("#table_form").append(htmtColumnas);
}


function insertarRegistrosFilas( defForm, registros) {

    var htmlAgregar = "<tbody>";

    var registrosObj = JSON.parse(registros);

    var columnas = defForm.columnas;
    var acciones = defForm.acciones;
    var redireccion = defForm.redireccion;

    for (var i = 0; i < registrosObj.registros.length; i++) {
        htmlAgregar += "<tr>";
            var registro = registrosObj.registros[i];

            var claveAux = "";
            var separadorClavesAux = "";
            for (var j = 0; j < registro.length; j++) {
                htmlAgregar += "<td>" + registro[j] + "</td> ";

                if (columnas[j].clave == true) {
                    claveAux += separadorClavesAux + columnas[j].nomBD + "-" + registro[j];
                    separadorClavesAux = "|";
                }

            }

            htmlAgregar += "<td> <div class=\"btn- group btn- group - justified\">";
            if (acciones.alta == true) {

            }
            if (acciones.editar = true) {
                htmlAgregar += "<a href=\"/"+ redireccion + ".html?accion=editar&clave=" + claveAux +"\" class=\"btn btn-link\" style=\"padding-top:0px\">Editar</a>";
            }
            if (acciones.baja == true) {
                htmlAgregar += "<a href=\"/" + redireccion + ".html?accion=baja&clave=" + claveAux +"\" class=\"btn btn-link\" style=\"padding-top:0px\">Eliminar</a>";
            }
     
            htmlAgregar += "</div></td>";
        htmlAgregar += "</tr>";
    }

 
    htmlAgregar += "</tbody>";

    $("#table_form").append(htmlAgregar);
}