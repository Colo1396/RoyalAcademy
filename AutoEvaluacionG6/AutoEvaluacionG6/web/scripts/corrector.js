window.onload = function () {
    var carreras;
    $.ajax({

        type: 'POST',
        url: '/ws/Corrector.asmx/ObtenerCarreras',
        data: "{'sql':'" + "SELECT * FROM carrera" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data.d != null) {
                //console.log(data.d);
                //carreras = JSON.stringify(data.d);
                //var $select = $('#idCarrera');

                //var registros = JSON.parse(carreras)
                //console.log(registros);
                ////alert(options);
                ////$.each(registros, function (idCarrera, nombreCarrera) {
                ////    $("#idCarrera").append('<option name="' + registros[i].idCarrera + '">' + registros[i].nombreCarrera + '</option>');
                ////}); 
                //$.each(data, function (key, value) {
                //    //    // alert(key + ": " + value);
                //    $("#idCarrera").append('<option name="' + key + '">' + value + '</option>');
                //})
                carreras = data.d.lstCarreras;
                console.log(carreras)
                //$.each(carreras, function (key, value) {
                //    $("#idCarrera").append('<option name="' + carreras[key].idCarrera + '">' + carreras[key].nombre + '</option>');

                //});
                for (var i in carreras) {
                    if (carreras.hasOwnProperty(i)) {
                        $("#idCarrera").append('<option value="' + carreras[i].idCarrera + '">' + carreras[i].nombreCarrera + '</option>');

                    }

                }
                //error: function (jqXHR, textStatus, errorThrown) {
            }

        }
    });





    /**
     * Metodo Ajax para las llamadas a WS, estructura basica.
     * @param { any } paramJSON: son los parametros que enviara al Ws, en este caso son de tipo JSON, aunque igual se pasa a cadena con el metodo JSON.stringify().
     * @param { any } urlWS: es la Url donde se aloja el WEbService a llamar.
     * @param { any } asincrono: indica si la llamada es asincronica, generalmente es false(llamada sincronica, espera retorno)
        * /
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
    }*/
    ///"/ws/Login.asmx/Logear"
    $('select#idCarrera').on('change', function () {
        var carrera = $(this).val();
        console.log(carrera);
        var idCarrera = {
            "id": carrera
             
        }
        $.ajax({
            type: 'POST',
            url: '/ws/Corrector.asmx/ObtenerFechasExamen',
            data: JSON.stringify(idCarrera),
            contentType: 'application/json; utf-8',
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.d != null) {
                    console.log(data.d);
                    var fechas = data.d

                    var obj = $.parseJSON(fechas)
                    for (var i in fechas) {
                        if (carreras.hasOwnProperty(i)) {
                            $("#idFecha").append('<option value="' + fechas[i].fecha + '">' + fechas[i] + '</option>');



                        }

                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


         
    });
    }