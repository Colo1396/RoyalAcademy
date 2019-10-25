using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using AutoEvaluacionG6.conexion;
using AutoEvaluacionG6.clases.examen;

namespace AutoEvaluacionG6.ws
{
    public class altaExamen
    {
    }
}

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
    public class WebService2 : System.Web.Services.WebService
    {

        [WebMethod]


        public string AltaExamen(ModeloExamen modeloExamen)
        {
            String sql = "INSERT INTO examen( `idCarrera`) VALUES (" + modeloExamen.idCarrera + "')";
            MySqlConnection connection = null;
            //MySqlDataReader lector = null;

            String retorno = "false";
            MySqlDataReader lector = null;
            int idMaxPreg = 0;
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
                cmd.CommandText = "select max(idPregunta) as idpregunta from pregunta";//cargo el sql en el commandText
                lector = cmd.ExecuteReader();// lo ejecuto para traerme el maximo id de pregunta y lo guardo en un lector
                if (lector.HasRows)//reviso si el lector tiene registros
                {
                    while (lector.Read())
                    {
                        idMaxPreg = (int)lector.GetValue(0);//capturo la columna 0 del sql que tengo en el lector y lo guardo en el id casteado como int
                        //idMaxPreg = (int)lector.GetValue(lector.GetOrdinal("idPregunta"));//traeme la posicion donde tengo la columna "idPregunta"
                    }
                    retorno = "true";
                }

                if (lector != null) lector.Close();// cierro el lector si no queda dando vueltas y te puede tirar un error

                //recorro la pregunta que recibi por parametro y por cada iteracion inserto los valores que recibi
                for (int i = 0; i < modeloExamen.lstPreguntas.Count; i++)
                {
                    sql = "INSERT INTO examenPregunta(`idModeloExamen`, `idPregunta`) VALUES (" + idMaxPreg + ",'" + modeloExamen.lstPreguntas[i].idPregunta + ")";
                    cmd.CommandText = sql;//cargo el sql
                    cmd.ExecuteNonQuery();// ejecuto 
                    //y listo ya inserte en la BD las respuesta correspondientes a la pregunta.
                }

                retorno = "true";
                //comitea la transaccion sino quedara trabada la tabla a insertar
                if (trans != null) trans.Commit();

            }
            catch (Exception ex)
            {
                //rollback si algo salio mal
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


          