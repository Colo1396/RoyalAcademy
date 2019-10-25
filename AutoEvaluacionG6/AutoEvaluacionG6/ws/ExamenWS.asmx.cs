using AutoEvaluacionG6.clases.examen;
using AutoEvaluacionG6.clases.preguntas;
using AutoEvaluacionG6.conexion;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de ExamenWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class ExamenWS : System.Web.Services.WebService
    {

        [WebMethod]
        public ModeloExamen obtenerPreguntas() //traer preguntas aleatoriamente
        {
            String sql = "SELECT * FROM pregunta ORDER BY RAND() LIMIT 5";
  
            MySqlConnection connection = null;
            MySqlDataReader lector = null;

            ModeloExamen modeloExamen = new ModeloExamen();

            //AGARRAR UNA CLASE Y LLENARLE LA LISTA DE PREGUNTAS 

            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = sql; //asigna el sql que voy a consultar
                cmd.CommandTimeout = 240;
                connection.Open();

                lector = cmd.ExecuteReader(); //lector es un puntero a las filas. Se para en el principio. 

                if (lector.HasRows) //pregunta si tiene filas
                {
                    while (lector.Read()) //automaticamente cuando lea, va pasar fila por fila. Mientras lea. 
                    {
                        Preguntas preguntas = new Preguntas();
                        preguntas.idPregunta = lector.GetInt32(lector.GetOrdinal("idPregunta")); //devuelve el id de la columna o el alias de la consulta
                        //GetInt32 es para un int 
                        //getOrdinal me devuelve el indice de la columna que pasas por param
                        preguntas.idTipoPregunta = lector.GetInt32(lector.GetOrdinal("idTipoPregunta"));
                        preguntas.consigna = lector.GetString(lector.GetOrdinal("consigna"));

                        modeloExamen.lstPreguntas.Add(preguntas); //se completa el modelo con las preguntas
                    }
                }
                lector.Close(); //SIEMPRE CERRAR EL LECTOR.  cerrar porque si posteriormente hago una consulta, no voy a poder. 


            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error durante la generación automática del examen!" + ex.Message);
            }
            finally
            {
                if (lector != null) lector.Close(); 
                if (connection != null) connection.Close();
            }
            return modeloExamen;
        }

        [WebMethod] //es un webMethodo que se puede acceder desde afuera
        public string guardarModeloExamen(ModeloExamen modelo)
        {
            String sql = "INSERT INTO modeloExamen( `idCarrera`) VALUES (" + modelo.idCarrera + ")";
            MySqlConnection connection = null;
            //MySqlDataReader lector = null;

            String retorno = "false";
            MySqlDataReader lector = null;
            int idMaxPreg = 0;

            //creo la instancia para abrir una transaccion y poder hacer rollback o comitear
            //se crea fuera del try como null para poder agarrarla en el cartch, pero se abri adentro del try
            MySqlTransaction trans = null;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = sql;//con el cmd.CommandText yo seteo el sql a ejecutar
                cmd.CommandTimeout = 240;
                connection.Open();

                trans = connection.BeginTransaction();
                cmd.Transaction = trans;

                cmd.ExecuteNonQuery();//cone sta funcion ejecuto el sql
                //como es un insert no devuelve nada, se usa el metodo EXECUTENONQUERY. 

                //recorro la pregunta que recibi por parametro y por cada iteracion inserto los valores que recibi
                for (int i = 0; i < modelo.lstPreguntas.Count; i++)
                {
                    sql = "INSERT INTO examenpregunta(idModeloExamen, idPregunta) VALUES( (select max(idModeloExamen) as idModeloExamen from modeloExamen) , " + modelo.lstPreguntas[i].idPregunta + ")";
                    cmd.CommandText = sql;//cargo el sql
                    cmd.ExecuteNonQuery();// ejecuto la consulta
                    //y listo ya inserte en la BD las respuesta correspondientes a la pregunta.
                }

                retorno = "true";
                //comitea la transaccion sino quedara trabada la tabla a insertar
                if (trans != null) trans.Commit();

            }
            catch (Exception ex)
            {
                //rollback si algo salio mal
                if (lector != null) lector.Close();
                if (trans != null) trans.Rollback();
                System.Diagnostics.Debug.WriteLine("Error durante el inicio de sesión!" + ex.Message);
            }
            finally
            {
                if (lector != null) lector.Close();
                if (connection != null) connection.Close();
            }
            return retorno;

        }
    }
}