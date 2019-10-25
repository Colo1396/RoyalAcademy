using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using AutoEvaluacionG6.conexion;
using AutoEvaluacionG6.clases.preguntas;
using System.Diagnostics;

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
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@--ALTA--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q
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
                for (int i = 0; i < pregunta.rtas.Count; i++)
                {
                    sql = "INSERT INTO rtapregunta(`idPregunta`, `respuesta`, `correcta`) VALUES (" + idMaxPreg + ",'" + pregunta.rtas[i].respuesta + "'," + pregunta.rtas[i].correcta + ")";
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

        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@--EDITAR--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q
        [WebMethod]
        public Preguntas EditarPregunta(int idPregABuscar)
        {
            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            String retorno = "false";
            Preguntas pregunta = new Preguntas();
           // Rtas respuesta = new Rtas();

            //creo la instancia para abrir una transaccion y poder hacer rollback o comitear
            //se crea fuera del try como null para poder agarrarla en el cartch, pero se abri adentro del try
            //MySqlTransaction trans = null;

            try
            {
                MySqlCommand cmd = new MySqlCommand();
                connection = Conexion.getConexion();
                cmd.Connection = connection;
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandTimeout = 240;
                connection.Open();

                //trans = connection.BeginTransaction();
                // cmd.Transaction = trans;

                //TRAIGO LA PREGUNTA
                cmd.CommandText = "select preg.idTipoPregunta,preg.consigna from pregunta preg where preg.idPregunta='"+ idPregABuscar + "'";//cargo el sql en el commandText
                lector = cmd.ExecuteReader();// lo ejecuto para traerme el maximo id de pregunta y lo guardo en un lector
                if (lector.HasRows)//reviso si el lector tiene registros
                {
                    while (lector.Read())
                    {
                        //idMaxPreg = (int)lector.GetValue(0);//capturo la columna 0 del sql que tengo en el lector y lo guardo en el id casteado como int
                        //idMaxPreg = (int)lector.GetValue(lector.GetOrdinal("idPregunta"));//traeme la posicion donde tengo la columna "idPregunta"
                        pregunta.idPregunta = idPregABuscar;
                        pregunta.idTipoPregunta = (int)lector.GetValue(0);
                        pregunta.consigna = (string)lector.GetValue(1);

                        Debug.WriteLine("idPregunta: " + pregunta.idPregunta);
                        Debug.WriteLine("idTipoPregunta: " + pregunta.idTipoPregunta);
                        Debug.WriteLine("consigna: " + pregunta.consigna);

                    }
                   // retorno = "true";
                }
                if (lector != null) lector.Close();// cierro el lector si no queda dando vueltas y te puede tirar un error

                //TRAIGO LA RESPUESTA
                cmd.CommandText = "select rta.idRespuesta,rta.respuesta,rta.correcta from rtapregunta rta  where rta.idPregunta ='" + idPregABuscar + "'";//cargo el sql en el commandText
                lector = cmd.ExecuteReader();// lo ejecuto para traerme el maximo id de pregunta y lo guardo en un lector
                if (lector.HasRows)//reviso si el lector tiene registros
                {
                    while (lector.Read())
                    {
                        //idMaxPreg = (int)lector.GetValue(0);//capturo la columna 0 del sql que tengo en el lector y lo guardo en el id casteado como int
                        //idMaxPreg = (int)lector.GetValue(lector.GetOrdinal("idPregunta"));//traeme la posicion donde tengo la columna "idPregunta"
                        Rtas respuesta = new Rtas();
                        Debug.WriteLine("LECTOR:" + lector);
                        respuesta.idRespuesta = (int)lector.GetValue(0);
                        respuesta.respuesta = (string)lector.GetValue(1);
                        respuesta.correcta = Convert.ToInt32(lector.GetValue(2));

                        Debug.WriteLine("idRespuesta: " + respuesta.idRespuesta);
                        Debug.WriteLine("respuesta: " + respuesta.respuesta);
                        Debug.WriteLine("correcta: " + respuesta.correcta);

                        pregunta.rtas.Add(respuesta);

                    }
                    // retorno = "true";
                }
                if (lector != null) lector.Close();// cierro el lector si no queda dando vueltas y te puede tirar un error

                //comitea la transaccion sino quedara trabada la tabla a insertar
                //if (trans != null) trans.Commit();

            }
            catch (Exception ex)
            {
                //rollback si algo salio mal
                //if (trans != null) trans.Rollback();
                System.Diagnostics.Debug.WriteLine("Error durante el inicio de sesión!" + ex.Message);
            }
            finally
            {
                if (lector != null) lector.Close();
                if (connection != null) connection.Close();
            }
            return pregunta;

        }


        [WebMethod]
        public string PersistirEdicion(Preguntas pregunta)
        {

            //String sql = "insert into pregunta (idPregunta,idTipoPregunta,consigna) values ('" + idPregunta + "','" + idTipoPregunta + "','" + consigna + "')";
            //String sql = "INSERT INTO pregunta( `idTipoPregunta`, `consigna`) VALUES ( " + pregunta.idTipoPregunta + ", '" + pregunta.consigna + "')";
            String sql = "UPDATE pregunta SET idTipoPregunta = '"+ pregunta.idTipoPregunta + "',consigna= '"+ pregunta.consigna + "' WHERE idPregunta = '"+ pregunta.idPregunta + "'";
                
            
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

                cmd.CommandText = "DELETE FROM `rtapregunta` WHERE idPregunta = '"+ pregunta.idPregunta + "'";
                cmd.ExecuteNonQuery();//cone sta funcion ejecuto el sql

                //recorro la pregunta que recibi por parametro y por cada iteracion inserto los valores que recibi
                for (int i = 0; i < pregunta.rtas.Count; i++)
                {
                    sql = "INSERT INTO rtapregunta(`idPregunta`, `respuesta`, `correcta`) VALUES (" + pregunta.idPregunta + ",'" + pregunta.rtas[i].respuesta + "'," + pregunta.rtas[i].correcta + ")";
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
