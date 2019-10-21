using AutoEvaluacionG6.clases.ejemplo;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de EjemploWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class EjemploWS : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public Ejemplo ejemploParametroClase(Ejemplo ejemplo)
        {

            // aqui imprime lo que contien el objeto ejemplo que llega.
            Debug.WriteLine("ID:" + ejemplo.id);
            Debug.WriteLine("Descripcion:" + ejemplo.id);

            for (int i = 0; i < ejemplo.detalle.Count; i++)
            {
                Debug.WriteLine("***** Detalle " + i);

                Debug.WriteLine("id ejemplo:" + ejemplo.detalle[i].idEjemplo);
                Debug.WriteLine("id Detalle:" + ejemplo.detalle[i].idDetalle);
                Debug.WriteLine("Nombre :" + ejemplo.detalle[i].nombre);

            }


            //  ACA Voyu a crear el objeto a devolver 
            Ejemplo ejeploRetorno = new Ejemplo();

            ejeploRetorno.id = 150;
            ejeploRetorno.descripcion = "Ejemplo retorno";

            DetalleEjemplo detEjemplo = new DetalleEjemplo();

            detEjemplo.idEjemplo = 150;
            detEjemplo.idDetalle = 10;
            detEjemplo.nombre = "detalle retorno ejemplo 1";

            ejeploRetorno.detalle.Add(detEjemplo);


            DetalleEjemplo detEjemplo2 = new DetalleEjemplo();

            detEjemplo2.idEjemplo = 150;
            detEjemplo2.idDetalle = 20;
            detEjemplo2.nombre = "detalle retorno ejemplo 2";

            ejeploRetorno.detalle.Add(detEjemplo2);


            return ejeploRetorno;
        }
    }
}
