
window.onload = function () {

    var idEjemplo = 1;


    // JSON que tiene la forma del a clase Ejemplo de c#
    var ejemplo =  {
        "id": 1,
        "descripcion": "Esto es una prueba",
        "detalle": [
            {
                "idEjemplo": idEjemplo,
                "idDetalle": 1,
                "nombre": "nombre detalle 1"
            },
            {
                "idEjemplo": idEjemplo,
                "idDetalle": 2,
                "nombre": "nombre detalle 2"
            }
        ]
    }

    // es importante meter a tu objeto JSON que representa tu clase dentro de un JSON que lo contenga, y como clave debe tener el mismo nombre que la variable en el WebService
    var objetoEjemplo = {
        "ejemplo":ejemplo
    }
    // objeto enviado 
    console.log("Objeto Enviado al WS");
    console.log(objetoEjemplo);
    var obEjemploDevuelto = llamarWS(objetoEjemplo, "/ws/EjemploWS.asmx/ejemploParametroClase", false);


    // objeto enviado 
    console.log("Objeto Retornado del WS");
    console.log(obEjemploDevuelto);

}


