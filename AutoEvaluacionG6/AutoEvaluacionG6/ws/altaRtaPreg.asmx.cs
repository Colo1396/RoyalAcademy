using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using AutoEvaluacionG6.conexion;

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
    public class altaRtaPreg : System.Web.Services.WebService
    {

        [WebMethod]
        public string AltaRta(int idPregunta, int correcta, String respuesta)
        {
            //String sql = "insert into pregunta (idPregunta,idTipoPregunta,consigna) values ('" + idPregunta + "','" + idTipoPregunta + "','" + consigna + "')";
            //String sql = "INSERT INTO RtaPregunta( `idPregunta`, `respuesta`, `correcta`) VALUES ( " + idPregunta + ", '" + respuesta + "','"+ correcta + "')";
            String sql = "INSERT INTO rtapregunta(`idPregunta`, `respuesta`, `correcta`) VALUES ("+ idPregunta + ",'"+ respuesta + "',"+ correcta + ")";

            MySqlConnection connection = null;
            //MySqlDataReader lector = null;

            String retorno = "false";
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

                retorno = "true";

            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error durante el inicio de sesión!" + ex.Message);
            }
            finally
            {

                if (connection != null) connection.Close();
            }
            return retorno;

        }
    }
}
