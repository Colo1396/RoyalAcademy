

var modeloExamen = {};
const preguntasXPagina = 4;

window.onload = function () {
    cargarNavMenu();

    var accion = obtenerClaveUrl("accion");
    var clave = obtenerClaveUrl("clave");

    if (accion == "realizar") {
        var claveArray = clave.split("-");
        var objBuscar = {
            "idExamen": claveArray[1]
        }

        modeloExamen = llamarWS(objBuscar, "/ws/ResolucionExamen.asmx/obtenerInstanciaExamen", false);
        console.log(modeloExamen);
        if (modeloExamen != null && JSON.stringify(modeloExamen) != "{}") {
            dibujarBtnPaginado();
            dibujarPaginas();
            dibujarExamen();
        }

    }
}

/**
 * arma los divs que contendran a las preguntas, dejando activa la primera pagina y ocultando el resto
 */
function dibujarPaginas() {
    var paginas = "";
    var ocultar = "";
    var cantPreguntas = modeloExamen.preguntas.length;
    var cantPaginas = Math.ceil(cantPreguntas / preguntasXPagina);

    for (var i = 0; i < cantPaginas; i++) {
        paginas += "<div class=\"pagina\" " + ocultar + " data-nro=\"" + (i + 1) + "\"> </div>";
        ocultar = "style=\"display:none;\"";
    }
    $(".miContainer").prepend(paginas);

}

/**
 * Dibuja la botonera para el paginado y le agrega el evento de cambio de pagina
 */
function dibujarBtnPaginado() {

    var paginado = "";
    paginado += "<ul class=\"pagination\">";
    var cantPreguntas = modeloExamen.preguntas.length;
    var cantPaginas = Math.ceil(cantPreguntas / preguntasXPagina);

    var claseActiva = "page-item active";
    for (var i = 0; i < cantPaginas; i++) {
        //<li class="page-item active"><a class="page-link">1</a></li>
        paginado += "<li class=\"" + claseActiva + " pointer\"  data-nro=\"" + (i + 1) + "\"  ><a  class=\"page-link\">" + (i + 1) + "</a></li>";
        claseActiva = "page-item";
    }

    paginado += " <div align=\"center\"><li class=\"\" ><a  class=\"page-link\">" + "-" + "</a></li>  </div>";
    paginado += " <div><li class=\"btn_guardar pointer\" ><a  class=\"page-link\" style=\"background-color:#007bff;\">Guardar</a></li> </div>";

    paginado += "</ul>";
    var nodoPAginado = $(paginado);

    $("#paginador").append(nodoPAginado);

    // agrego el evento del click para cambiar de pagina
    nodoPAginado.find(".page-item").on("click", function () {
        var btn = $(this);
        $(".page-item").removeClass("active");
        btn.addClass("active");
        controlPaginaVisibles(btn.data("nro"));
    });

    nodoPAginado.find(".btn_guardar").on("click", function () {
        guardarRespuestas();
    });

}



function guardarRespuestas() {

    var objResultado = armarObjResultado();

    if (objResultado.estado == true) {
        var obj = {
            "respuestas": objResultado.respuestas
        }
        console.log(obj);
        var retorno = llamarWS(obj, "/ws/ResolucionExamen.asmx/guardarResolucionExamen", false);

        if (retorno == "true") {
            location.href = "/web/menu.html";
        } else {
            alert("ERROR! No se pudo persistir");
        }
    }

}
/**
 * Si todas las preguntas estan contestadas envio el examen.
 */
function armarObjResultado() {

    var msjAlerta = "";
    var comaAux = "";

    var rtaAlumnoBase = {
        "nroPregunta": 0,
        "nroRespuesta": 0,
        "idExamen": 0
    }

    var objResultado = {
        "estado": false,
        "respuestas": []
    }

    var preguntas = $(".pregunta");
    for (var i = 0; i < preguntas.length; i++) {
        var preg = $(preguntas[i]);
        var dataPregunta = preg.data("pregunta");
        var indice = dataPregunta.indice;
        var idPregunta = dataPregunta.id;

        var nodoSeleccionado = $("input[name='" + idPregunta + "']:checked");
        if (nodoSeleccionado.length > 0) {
            // creo una copia del JSON 
            var rtaAlumno = JSON.parse(JSON.stringify(rtaAlumnoBase));
            rtaAlumno.nroPregunta = idPregunta;
            rtaAlumno.nroRespuesta = parseInt(nodoSeleccionado.data("respuesta").id);
            rtaAlumno.idExamen = parseInt(modeloExamen.idExamen);
            objResultado.respuestas.push(rtaAlumno);
        }
        else {
            msjAlerta += comaAux + indice;
            comaAux = ", "
        }

    }
    if (msjAlerta != "") {
        alert("Hay preguntas sin completar: \n" + msjAlerta);
        closeWindow();
    } else {
        objResultado.estado = true;
    }
    return objResultado;
}
/**
 * Deja visible la pagina pasado como parametros y oculta el resto
 * @param {any} nroPagina
 */
function controlPaginaVisibles(nroPagina) {
    $(".pagina").hide();
    var nodoPagina = buscarNodoPaginaXNro(nroPagina);
    nodoPagina.show();
}

/**
 * Busca y retorna el nodo de la pagina a buscar .
 * @param {any} nroPagina   nro de pagina buscado.
 */
function buscarNodoPaginaXNro(nroPagina) {
    var nodoPagina = null;
    var paginas = $(".pagina");
    for (var i = 0; i < paginas.length; i++) {
        var nodoPagina = $(paginas[i]);
        if (nodoPagina.data("nro") == nroPagina) {
            i = paginas.length;
        }
    }
    return nodoPagina;
}

/**
 * REcorre las preguntas para armar y pegar en cada pagina
 */
function dibujarExamen() {
    for (var i = 0; i < modeloExamen.preguntas.length; i++) {
        var pregunta = modeloExamen.preguntas[i];

        var preguntaHtml = armarHTMLPregunta(pregunta, i);
        var nroPAginaBuscada = Math.ceil((i + 1) / preguntasXPagina);
        var nodoPAgina = buscarNodoPaginaXNro(nroPAginaBuscada);
        nodoPAgina.append(preguntaHtml);
    }
}

/**
 * Arma la pregunta a partir los datos de la pregunta
 * @param {any} pregunta
 * @param {any} indice  enumera las preguntas
 */
function armarHTMLPregunta(pregunta, indice) {
    indice = indice + 1;
    // var htmlPregunta = "<div class=\"pregunta\" data-nro=\"1\">";
    var htmlPregunta = '<div class="pregunta" data-pregunta={"id":"' + pregunta.idPregunta + '","indice":' + indice + '}>';
    htmlPregunta += '<div class="container" >';
    htmlPregunta += '<h2 class="consigna">' + indice + " ) " + pregunta.consigna + '</h2>';
    for (var i = 0; i < pregunta.respuestas.length; i++) {
        var resp = pregunta.respuestas[i];
        htmlPregunta += '<label class="container">';
        htmlPregunta += resp.respuesta;
        htmlPregunta += '<input  data-respuesta={"id":"' + resp.idRespuesta + '"} type="radio" name="' + pregunta.idPregunta + '"><span class="checkmark"></span>';
        htmlPregunta += '</label>';
    }
    htmlPregunta += '</div>';
    htmlPregunta += '</div>';

    return htmlPregunta;
}


