using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using AutoEvaluacionG6.conexion;
using AutoEvaluacionG6.clases.preguntas;

namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
     [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {

        [WebMethod]
        public string AltaPregunta(Preguntas pregunta)
        {

            //String sql = "insert into pregunta (idPregunta,idTipoPregunta,consigna) values ('" + idPregunta + "','" + idTipoPregunta + "','" + consigna + "')";
            String sql = "INSERT INTO pregunta( `idTipoPregunta`, `consigna`) VALUES ( " + pregunta.idTipoPregunta + ", '" + pregunta.consigna + "')";
            MySqlConnection connection = null;
            //MySqlDataReader lector = null;

            String retorno = "false";
            MySqlDataReader lector = null;
            int idMaxPreg = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = sql;
                cmd.CommandTimeout = 240;
                connection.Open();

                cmd.ExecuteNonQuery();

                cmd.CommandText = "select max(idPregunta) as idpregunta from pregunta";
                lector = cmd.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        idMaxPreg = (int)lector.GetValue(0);//capturo la columna 0 del sql que tengo en el lector y lo guardo en el id casteado como int
                        //idMaxPreg = (int)lector.GetValue(lector.GetOrdinal("idPregunta"));//traeme la posicion donde tengo la columna "idPregunta"
                    }
                    retorno = "true";
                }

                if (lector != null) lector.Close();


                for (int i = 0; i < pregunta.rtas.Count; i++)
                {
                    sql = "INSERT INTO rtapregunta(`idPregunta`, `respuesta`, `correcta`) VALUES (" + idMaxPreg + ",'" + pregunta.rtas[i].respuesta + "'," + pregunta.rtas[i].correcta + ")";
                    cmd.CommandText = sql;
                    cmd.ExecuteNonQuery();
                }

                retorno = "true";

            }
            catch (Exception ex)
            {
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
