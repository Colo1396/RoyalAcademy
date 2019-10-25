using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services;
using MySql.Data.MySqlClient;
using AutoEvaluacionG6.conexion;
using AutoEvaluacionG6.clases.preguntas;
using System.Diagnostics;

namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de traerMaxId
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
     [System.Web.Script.Services.ScriptService]
    public class traerMaxId : System.Web.Services.WebService
    {

        [WebMethod]
        public int TraerMaxId(String sql)
        {
            
            MySqlConnection connection = null;
            String retorno = "false";
            MySqlDataReader lector = null;
            int idMax = 0;

            //creo la instancia para abrir una transaccion y poder hacer rollback o comitear
            //se crea fuera del try como null para poder agarrarla en el cartch, pero se abri adentro del try
            MySqlTransaction trans = null;

            Debug.WriteLine("Sql:" + sql);
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandTimeout = 240;
                connection.Open();

                cmd.CommandText = sql;
                lector = cmd.ExecuteReader();// lo ejecuto para traerme el maximo id de pregunta y lo guardo en un lector
                if (lector.HasRows)//reviso si el lector tiene registros
                {
                    while (lector.Read())
                    {
                        idMax = lector.GetInt32(0);
                            //capturo la columna 0 del sql que tengo en el lector y lo guardo en el id casteado como int
                        //idMaxPreg = (int)lector.GetValue(lector.GetOrdinal("idPregunta"));//traeme la posicion donde tengo la columna "idPregunta"
                    }
                }

                if (lector != null) lector.Close();// cierro el lector si no queda dando vueltas y te puede tirar un error

            }
            catch (Exception ex)
            {
                //rollback si algo salio mal
                if (lector != null) lector.Close();
            
                System.Diagnostics.Debug.WriteLine("Error durante el inicio de sesión!" + ex.Message);
            }
            finally
            {
                if (lector != null) lector.Close();
                if (connection != null) connection.Close();
            }
            return idMax;
        }
    }
}
