using AutoEvaluacionG6.clases;
using AutoEvaluacionG6.conexion;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de ListarWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class ListarWS : System.Web.Services.WebService
    {

        [WebMethod]
        public string ObtenerRegistros(String sql)
        {
            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            Debug.WriteLine("ListarWS.ObtenerRegistros SQL : " + sql);
            string registros = "", reg = "", coma = "", coma_lista = "";

            try
            {
                connection = Conexion.getConexion();
                MySqlCommand cmd = new MySqlCommand(sql, connection);

                cmd.CommandType = System.Data.CommandType.Text;
                connection.Open();
                cmd.CommandTimeout = 240;

                lector = cmd.ExecuteReader();
                while (lector.Read())
                {
                    reg = "";
                    coma = "";
                    for (int i = 0; i < lector.FieldCount; i++)
                    {
                        reg += coma + "\"" + lector.GetValue(i).ToString() + "\"";
                        if (i == 0) coma = ",";
                    }
                    registros += coma_lista + "[" + reg + "]";
                    coma_lista = ",";
                }

                registros = "{\"registros\":[" + registros + "]}";
                lector.Close();
            }
            catch (Exception ex)
            {
                registros = "{\"registros\":[]}";
                System.Diagnostics.Debug.WriteLine("SQL ERROR: " + sql);
                System.Diagnostics.Debug.WriteLine("Error: " + ex.Message);
            }

            if (connection != null) connection.Close();

            return registros;
        }
    }
}
