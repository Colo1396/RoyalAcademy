
window.onload = function () {
    cargarNavMenu();
    var accion = obtenerClaveUrl("accion");
    var clave = obtenerClaveUrl("clave");
    switch (accion) {
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q
        case "editar":
            {
                $("#tituloHtml").append("Modificar Persona:");
                var claveArray = clave.split("-");
                var ultimaPosicion = claveArray.length
                //voy a buscar lo que necesito para completar el html
               //---------------------------COMPLETO EL HTML--------------------------------------------------------------
                var idAEditar = {
                    "idABuscar": claveArray[ultimaPosicion - 1]
                }

                //Persona
                var personaRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerPersona", false);
                console.log(personaRetorno);
                $("#idPersona").val(personaRetorno.idPersona);
                $("#nombre").val(personaRetorno.nombre);
                $("#apellido").val(personaRetorno.apellido);
                $("#cuil").val(personaRetorno.cuil);


                //Usuario
                var usuarioRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerUsuario", false);
                console.log(usuarioRetorno);

                $("#idUsuario").val(usuarioRetorno.idUsuario);
                $("#idPerfilUsuario").val(usuarioRetorno.idPerfil);
                $("#clave").val(usuarioRetorno.clave);
                $("#mail").val(usuarioRetorno.mail);
                

                $("#estado").empty();
                if (usuarioRetorno.estado == 0) {
                    $("#estado").append("<option value=\"" + usuarioRetorno.estado + "\">Desactivado</option>");
                    $("#estado").append("<option value=\"1\">Activado</option>");
                }
                else if (usuarioRetorno.estado == 1) {
                    $("#estado").append("<option value=\"" + usuarioRetorno.estado + "\">Activado</option>");
                    $("#estado").append("<option value=\"0\">Desactivado</option>");
                }

                $("#idPerfil").empty();
                if (usuarioRetorno.idPerfil == 1) {
                    $("#idPerfil").append("<option value=\"" + usuarioRetorno.idPerfil + "\">Administrador</option>");
                    $("#idPerfil").append("<option value=\"2\">Alumno</option>");
                }
                else if (usuarioRetorno.idPerfil == 2) {
                    $("#idPerfil").append("<option value=\"" + usuarioRetorno.idPerfil + "\">Alumno</option>");
                    $("#idPerfil").append("<option value=\"1\">Administrador</option>");
                }


                // en base al perfil del Usuario me traigo:
                if (usuarioRetorno.idPerfil == 1) {
                    //Admin
                    cargarDivAdmin();
                    var adminRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerAdmin", false); 
                    console.log(adminRetorno);
                    $("#idAdmin").val(adminRetorno.idAdmin);
                    $("#nombreAdmin").val(adminRetorno.nombre);

                    $("#idTipo").empty();
                    if (adminRetorno.idTipo == 1) {
                        $("#idTipo").append("<option value=\"" + usuarioRetorno.idPerfil + "\">AG</option>");
                        $("#idTipo").append("<option value=\"2\">AP</option>");
                        $("#idTipo").append("<option value=\"3\">AS</option>");
                    }
                    else if (adminRetorno.idTipo == 2) {
                        $("#idTipo").append("<option value=\"" + usuarioRetorno.idPerfil + "\">AP</option>");
                        $("#idTipo").append("<option value=\"1\">AG</option>");
                        $("#idTipo").append("<option value=\"3\">AS</option>");
                    }
                    else if (adminRetorno.idTipo == 3) {
                        $("#idTipo").append("<option value=\"" + usuarioRetorno.idPerfil + "\">AS</option>");
                        $("#idTipo").append("<option value=\"1\">AG</option>");
                        $("#idTipo").append("<option value=\"2\">AP</option>");
                    }

                }
                else {
                    //Alumno
                    cargarDivAlumno();
                    var alumnoRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerAlumno", false);
                    console.log(alumnoRetorno);
                    $("#idAlumno").val(alumnoRetorno.idAlumno);
                    $("#nroLegajo").val(alumnoRetorno.nroLegajo);
                   
                }
              //-----------------------------------------------------------------------------------------

               


                $("#divButton").append("<br /><input type=\"button\" id=\"btn_Mod_Persona\" value=\"Enviar Edicion\" />");

                var btn_enviarEdicion = $("#btn_Mod_Persona");
                btn_enviarEdicion.on("click", function () {
                   // altaPersona();
                    persistirEdicion();
                });
                break;
            }
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q
        case "baja":
            {
                $("#tituloHtml").append("Baja de Persona:");
                var claveArray = clave.split("-");
                var ultimaPosicion = claveArray.length

                //voy a buscar lo que necesito para completar el html
                //---------------------------COMPLETO EL HTML--------------------------------------------------------------
                var idAEditar = {
                    "idABuscar": claveArray[ultimaPosicion - 1]
                }

                //Persona
                var personaRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerPersona", false);
                console.log(personaRetorno);
                $("#idPersona").val(personaRetorno.idPersona);
                $("#nombre").val(personaRetorno.nombre);
                $("#apellido").val(personaRetorno.apellido);
                $("#cuil").val(personaRetorno.cuil);


                //Usuario
                var usuarioRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerUsuario", false);
                console.log(usuarioRetorno);

                $("#idUsuario").val(usuarioRetorno.idUsuario);
                $("#idPerfilUsuario").val(usuarioRetorno.idPerfil);
                $("#clave").val(usuarioRetorno.clave);
                $("#mail").val(usuarioRetorno.mail);


                $("#estado").empty();
                if (usuarioRetorno.estado == 0) {
                    $("#estado").append("<option value=\"" + usuarioRetorno.estado + "\">Desactivado</option>");
                    $("#estado").append("<option value=\"1\">Activado</option>");
                }
                else if (usuarioRetorno.estado == 1) {
                    $("#estado").append("<option value=\"" + usuarioRetorno.estado + "\">Activado</option>");
                    $("#estado").append("<option value=\"0\">Desactivado</option>");
                }

                $("#idPerfil").empty();
                if (usuarioRetorno.idPerfil == 1) {
                    $("#idPerfil").append("<option value=\"" + usuarioRetorno.idPerfil + "\">Administrador</option>");
                    $("#idPerfil").append("<option value=\"2\">Alumno</option>");
                }
                else if (usuarioRetorno.idPerfil == 2) {
                    $("#idPerfil").append("<option value=\"" + usuarioRetorno.idPerfil + "\">Alumno</option>");
                    $("#idPerfil").append("<option value=\"1\">Administrador</option>");
                }


                // en base al perfil del Usuario me traigo:
                if (usuarioRetorno.idPerfil == 1) {
                    //Admin
                    cargarDivAdmin();
                    var adminRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerAdmin", false);
                    console.log(adminRetorno);
                    $("#idAdmin").val(adminRetorno.idAdmin);
                    $("#nombreAdmin").val(adminRetorno.nombre);

                    $("#idTipo").empty();
                    if (adminRetorno.idTipo == 1) {
                        $("#idTipo").append("<option value=\"" + usuarioRetorno.idPerfil + "\">AG</option>");
                        $("#idTipo").append("<option value=\"2\">AP</option>");
                        $("#idTipo").append("<option value=\"3\">AS</option>");
                    }
                    else if (adminRetorno.idTipo == 2) {
                        $("#idTipo").append("<option value=\"" + usuarioRetorno.idPerfil + "\">AP</option>");
                        $("#idTipo").append("<option value=\"1\">AG</option>");
                        $("#idTipo").append("<option value=\"3\">AS</option>");
                    }
                    else if (adminRetorno.idTipo == 3) {
                        $("#idTipo").append("<option value=\"" + usuarioRetorno.idPerfil + "\">AS</option>");
                        $("#idTipo").append("<option value=\"1\">AG</option>");
                        $("#idTipo").append("<option value=\"2\">AP</option>");
                    }

                }
                else {
                    //Alumno
                    cargarDivAlumno();
                    var alumnoRetorno = llamarWS(idAEditar, "/ws/abmAlumnos.asmx/TraerAlumno", false);
                    console.log(alumnoRetorno);
                    $("#idAlumno").val(alumnoRetorno.idAlumno);
                    $("#nroLegajo").val(alumnoRetorno.nroLegajo);

                }
              //-----------------------------------------------------------------------------------------





                $("#divButton").append("<br /><input type=\"button\" id=\"btn_Baja_Persona\" value=\"Enviar Baja\" />");

                var btn_enviarBaja = $("#btn_Baja_Persona");
                btn_enviarBaja.on("click", function () {
                   
                    var retorno = llamarWS({ "idBaja": personaRetorno.idPersona }, "/ws/abmAlumnos.asmx/PersistirBaja", false);
                    if (retorno == "true") {
                        // redireccion al menu
                        location.href = "/web/menu.html";//esto es mal pero no se como se hace hay borrarlo porque hay 2 menu.html
                    } else {
                        alert("No se pudo enviar alta de persona");
                    }
                });
                break;
            }
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q
        default:
            {   //Se carga titulo
                $("#tituloHtml").append("Alta de Persona:");

                //Se inicializa Perfil
                console.log($("#idPerfil").val());
                $("#idPerfil").change(function () {
                    console.log($("#idPerfil").val());

                    if ($("#idPerfil").val() == 1) {
                        console.log("se eligio administrador");
                        cargarDivAdmin();

                    }
                    else {
                        console.log("se eligio Alumno");
                        cargarDivAlumno();

                    }

                });

                //Busco los id de Persona , Usuario, Alumno, Admin 
                var sql = "select max(idPersona)as idMax from persona";
                var jsonSql ={"sql":sql}
                var maxIdPersona = this.llamarWS(jsonSql, "/ws/abmAlumnos.asmx/TraerMaxId", false);
                $("#idPersona").val(maxIdPersona+1);

                var sql = "select max(idUsuario)as idMax from usuario";
                var jsonSql = { "sql": sql }
                var maxIdUsuario = this.llamarWS(jsonSql, "/ws/abmAlumnos.asmx/TraerMaxId", false);
                $("#idUsuario").val(maxIdUsuario + 1);

                

                $("#divButton").append("<br /><input type=\"button\" id=\"btn_Alta_Persona\" value=\"Enviar Alta\" />");

                var btn_enviarAlta = $("#btn_Alta_Persona");
                btn_enviarAlta.on("click", function () {
                    altaPersona();
                });


            }

    }

}


function cargarDivAdmin() {
    $("#tipoPerfil").empty();
    $("#tipoPerfil").append(
        "Id Admin: <input type=\"text\" id=\"idAdmin\" readonly=\"readonly\"><br />"+
            "Nombre: <input type=\"text\" id=\"nombreAdmin\"><br />"+
                "Tipo: <select id=\"idTipo\">"+
                    "<option value=\"1\">AG</option>" +
                    "<option value=\"2\">AP</option>"+
                    "<option value=\"3\">AS</option>"+
                 "</select>"
    );
    $("#idPerfilUsuario").val($("#idPerfil").val());
    $("#idAdmin").val($("#idPersona").val());
}

function cargarDivAlumno() {
    $("#tipoPerfil").empty();
    $("#tipoPerfil").append(
        "Id Alumno: <input type=\"text\" id=\"idAlumno\" readonly=\"readonly\"><br />" +
        "Legajo: <input type=\"text\" id=\"nroLegajo\"><br />"
    );
    $("#idPerfilUsuario").val($("#idPerfil").val());
    $("#idAlumno").val($("#idPersona").val());
}

function altaPersona() {
    var idPersona = $("#idPersona").val();
    var nombrePersona = $("#nombre").val();
    var apellidoPersona = $("#apellido").val();
    var cuilPersona = $("#cuil").val();
    /*console.log(idPersona);
    console.log(nombrePersona);
    console.log(apellidoPersona);
    console.log(cuilPersona);*/

    var paramPersona = {
        "idPersona": $("#idPersona").val(),
        "nombre": $("#nombre").val(),
        "apellido": $("#apellido").val(),
        "cuil": $("#cuil").val()
    }

    var paramUsuario = {
        "idUsuario": $("#idUsuario").val(),
        "idPerfil": $("#idPerfilUsuario").val(),
        "clave": $("#clave").val(),
        "mail": $("#mail").val(),
        "estado":$("#estado").val()
    }

    var paramAdmin = {
        "idAdmin": $("#idAdmin").val(),
        "nombre": $("#nombreAdmin").val(),
        "idTipo": $("#idTipo").val()
    }
    var paramAlumno = {
        "idAlumno": $("#idAlumno").val(),
        "nroLegajo": $("#nroLegajo").val()
       
    }   

    var parametros = {
        "persona": paramPersona,
        "usuario": paramUsuario,
        "admin": paramAdmin,
        "alumno": paramAlumno,
        "idPerfil": $("#idPerfil").val()
    }

    console.log(parametros);
    var retornoWs = llamarWS(parametros, "/ws/abmAlumnos.asmx/PersistirAltaPersona",false);
    console.log(retornoWs);


    if (retornoWs == "true") {
        // redireccion al menu
        location.href = "/web/menu.html";//esto es mal pero no se como se hace hay borrarlo porque hay 2 menu.html
    } else {
        alert("No se pudo enviar alta de persona");
    }
}


function persistirEdicion() {

    var idPersona = $("#idPersona").val();
    var nombrePersona = $("#nombre").val();
    var apellidoPersona = $("#apellido").val();
    var cuilPersona = $("#cuil").val();
    /*console.log(idPersona);
    console.log(nombrePersona);
    console.log(apellidoPersona);
    console.log(cuilPersona);*/

    var paramPersona = {
        "idPersona": $("#idPersona").val(),
        "nombre": $("#nombre").val(),
        "apellido": $("#apellido").val(),
        "cuil": $("#cuil").val()
    }

    var paramUsuario = {
        "idUsuario": $("#idUsuario").val(),
        "idPerfil": $("#idPerfilUsuario").val(),
        "clave": $("#clave").val(),
        "mail": $("#mail").val(),
        "estado": $("#estado").val()
    }

    var paramAdmin = {
        "idAdmin": $("#idAdmin").val(),
        "nombre": $("#nombreAdmin").val(),
        "idTipo": $("#idTipo").val()
    }
    var paramAlumno = {
        "idAlumno": $("#idAlumno").val(),
        "nroLegajo": $("#nroLegajo").val()

    }

    var parametros = {
        "persona": paramPersona,
        "usuario": paramUsuario,
        "admin": paramAdmin,
        "alumno": paramAlumno,
        "idPerfil": $("#idPerfil").val()
    }

    console.log(parametros);
    var retornoWs = llamarWS(parametros, "/ws/abmAlumnos.asmx/PersistirEdicion", false);
    console.log(retornoWs);

    if (retornoWs == "true") {
        // redireccion al menu
        location.href = "/web/menu.html";//esto es mal pero no se como se hace hay borrarlo porque hay 2 menu.html
    } else {
        alert("No se pudo enviar alta de persona");
    }

}