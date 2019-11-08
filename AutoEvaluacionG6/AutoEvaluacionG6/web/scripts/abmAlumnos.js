
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

                break;
            }
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q
        case "baja":
            {
                $("#tituloHtml").append("Baja de Persona:");
                var claveArray = clave.split("-");
                var ultimaPosicion = claveArray.length

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
        "idAlumbo": $("#idAlumbo").val(),
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

}
