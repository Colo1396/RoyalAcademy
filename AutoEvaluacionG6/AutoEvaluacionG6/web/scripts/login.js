//Aclaraciones
/*
TODO LO QUE EMPIEZE CON $ ADELANTE ES jQUERY, PARA LOS QUE NO LO SEPAN.

Definicion General

WS: Web Service

*/

// este se ejecuta solito nada mas cargar el script.
// aca se inicializan y se setean los eventos principales.
window.onload = function () {

    // buscamos el boton de logeo por el id con Jqery y lo guardamos en una nueva variable
    var btn_logear = $("#btn_logear");

    // le asignamos el evento que sucedera al pulsar el boton
    btn_logear.on("click", function () {//al hacer click validamos el login
        validarLogin() 
    });
        /*
    btn_logear.keypress(function (e) {
        if (e.charCode == 13 || e.keyCode == 13) {//ENTER
            validarLogin() 
        }
    });
      */
    $("#clave").keypress(function (e) {
        if (e.charCode == 13 || e.keyCode == 13) {//ENTER
            validarLogin() 
        }
    });

  

    // NOTA TAMBIEN Se podia haber hecho sin guardar el boton en la variable de la siguiente manera.
    /*
    $("#btn_logear").on("click", function () {//al hacer click validamos el login
        validarLogin();
    });
    */
}


/*


*/

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
 

function validarLogin() {
    // buscamos el input con el id usuario y tomamos su valor ejecutando la funcion .val()
    var usuarioNombre = $("#usuario").val();
    var clave = $("#clave").val();


    // valido que los campos esten llenos
    if (usuarioNombre != '' && clave != '') {

        // URL donde se aloja el WS y el metodo a llamar.
        var urlCompletaLogeo = "/ws/Login.asmx/Logear" 
        /**
          vamos a descomponer la URL para ver como esta formada.
            "ws";          // como se ve parte de la raiz del proyecto y desde la carpeta ws, 
            "login.asmx";  // asmx es el tipo de archivo WS
            "Logear";      // Es el nombre del Metodo que llamara dentro del WS.

         */
        // esto es un JSON: basicamente es una estructura compuesta de clave y valor. Esto veanlo en internet que es facil.
        var parametros = {
            "usuario": usuarioNombre,
            "clave": clave
        }

        // llamamos al metodo y le pasamos los parametros, la URL, y con el false al final  le decimos que no es asincronico
        // al no ser asincronico se va a quedar a esperar la vuelta del WS.
        var retorno = llamarWS(parametros, urlCompletaLogeo, false);
        var registro = JSON.parse(retorno);
    
        // chekeamos el resultado. Checkeo un string porque retorne un string en el WS.
        if (registro.estado == "true") {
            // redireccion al menu
            cargarSesion(registro.usuario); 
            location.href = "menu.html";
        } else {
            alert("Tu usuario es incorrecto");
        }

    } else {
        // dispara una alerta informando la situacion
        alert("complete los campos para iniciar sesion")
    }
} 

function cargarSesion(datosUsuario) {
    localStorage.setItem("idUsuario", datosUsuario.idUsuario);
    localStorage.setItem("nombre", datosUsuario.nombre);
    localStorage.setItem("apellido", datosUsuario.apellido);
    localStorage.setItem("idPerfil", datosUsuario.idPerfil);
}