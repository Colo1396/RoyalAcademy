using AutoEvaluacionG6.conexion;
using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;


namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de Login
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class Login : System.Web.Services.WebService
    {

        [WebMethod]
        public string Logear(String usuario, String clave)
        {
            String sql = "select idUsuario, nombre, apellido,idPerfil from usuario U inner join Persona P on P.idPersona = U.idUsuario where  U.idUsuario = '" + usuario + "' and clave = '" + clave + "'";

            MySqlConnection connection = null;
            MySqlDataReader lector = null;


            string retorno = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = sql;
                cmd.CommandTimeout = 240;
                connection.Open();

                lector = cmd.ExecuteReader();

                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        retorno += "{\"idUsuario\":\"" + lector.GetValue(0).ToString() + "\",\"nombre\":\"" + lector.GetValue(1).ToString() + "\",\"apellido\":\"" + lector.GetValue(2).ToString() + "\", \"idPerfil\":\"" + lector.GetValue(3).ToString() + "\"}";
                    }
                }
                lector.Close();
                string estado = "false";
                if (retorno != "") { estado = "true"; }
                else { retorno = "{}"; }
                retorno = "{\"estado\":\"" + estado + "\",\"usuario\":" + retorno + "}";

            }
            catch (Exception ex)
            {
                retorno = "{\"estado\":\"false\",\"datos\":{}}";
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
