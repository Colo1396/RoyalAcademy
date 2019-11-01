using AutoEvaluacionG6.clases.resolucionExamen;
using AutoEvaluacionG6.conexion;
using AutoEvaluacionG6.util;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de ResolucionExamen
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class ResolucionExamen : System.Web.Services.WebService
    {

        [WebMethod]
        public InstExamen obtenerInstanciaExamen(int idExamen)
        {
            InstExamen instExamen = new InstExamen();
            instExamen.idExamen = idExamen;

            string sql = " select E.idExamen, E.fecha, E.idInstanciaExamen, E.idAlumno, I.idModeloExamen from Examen E  "  +
                        " inner join instanciaexamen I on I.idInstanciaExamen = E.idInstanciaExamen "  +
                        " where E.idExamen = " + idExamen;

            MySqlConnection connection = null;
            MySqlDataReader lector = null;
          
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandTimeout = 240;
                connection.Open();

                cmd.CommandText = sql;
                lector = cmd.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        instExamen.fecha = Funciones.deFechaDateAstring(lector.GetDateTime(lector.GetOrdinal("fecha"))); 
                        instExamen.idInstanciaExamen = lector.GetInt32(lector.GetOrdinal("idInstanciaExamen")); ;
                        instExamen.idAlumno = lector.GetInt32(lector.GetOrdinal("idAlumno")); ;
                        instExamen.idModeloExamen = lector.GetInt32(lector.GetOrdinal("idModeloExamen")); ;

                    }
                }
                if (lector != null) lector.Close();

                sql = "select P.idPregunta, P.idTipoPregunta, P.consigna,   " +
                           " R.idRespuesta,R.respuesta,R.correcta   " +
                           "  from pregunta P  " +
                           " CROSS JOIN rtapregunta R on P.idPregunta = R.idPregunta  " +
                           " inner join examenpregunta M on M.idPregunta = P.idPregunta   " +
                           " where M.idModeloExamen = " + instExamen.idModeloExamen;


                cmd.CommandText = sql;
                lector = cmd.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        int idPregunta = lector.GetInt32(lector.GetOrdinal("idPregunta"));
 
                        PreguntaInst preguntaInst = new PreguntaInst();
                        preguntaInst.idPregunta = idPregunta;
                        preguntaInst.idTipoPregunta = lector.GetInt32(lector.GetOrdinal("idTipoPregunta")); ;
                        preguntaInst.consigna = lector.GetString(lector.GetOrdinal("consigna")); ;

                        instExamen.agregarPregunta(preguntaInst);

                        RespuestaInst respuesta = new RespuestaInst();
                        respuesta.idPregunta = idPregunta;
                        respuesta.idRespuesta= lector.GetInt32(lector.GetOrdinal("idRespuesta"));
                        respuesta.respuesta = lector.GetString(lector.GetOrdinal("respuesta"));
                        respuesta.correcta = lector.GetInt32(lector.GetOrdinal("correcta"));

                        instExamen.agregarRespuesta(respuesta);

                    }
                }
                if (lector != null) lector.Close();

            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error WS.ResolucionExamen.obtenerInstanciaExamen:" + ex.Message);
            }
            finally
            {
                if (lector != null) lector.Close();
                if (connection != null) connection.Close();
            }

            return instExamen;
        }

        [WebMethod]
        public string guardarResolucionExamen(List<RtaAlumnoInst> respuestas)
        {
            string sql;
            string retorno = "false";
 
            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            MySqlTransaction trans = null;
    
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandTimeout = 240;
                connection.Open();

                trans = connection.BeginTransaction();
                cmd.Transaction = trans;

                //recorro la pregunta que recibi por parametro y por cada iteracion inserto los valores que recibi
                for (int i = 0; i < respuestas.Count; i++)
                {
                    sql = "INSERT INTO rtaAlumno(`nroPregunta`, `nroRespuesta`, `idExamen`) " +
                          " VALUES (" + respuestas[i].nroPregunta + "," + respuestas[i].nroRespuesta + "," + respuestas[i].idExamen + ")";
                    cmd.CommandText = sql;
                    cmd.ExecuteNonQuery();
                }

                retorno = "true";
              
                if (trans != null) trans.Commit();

            }
            catch (Exception ex)
            {
                if (lector != null) lector.Close();
                if (trans != null) trans.Rollback();
                System.Diagnostics.Debug.WriteLine("Error WS.ResolucionExamen.guardarResolucionExamen:" + ex.Message);
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
