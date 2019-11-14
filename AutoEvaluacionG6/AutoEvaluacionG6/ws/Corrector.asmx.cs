using AutoEvaluacionG6.clases.carreras;
using AutoEvaluacionG6.clases.GestorListas;
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
    /// Descripción breve de Corrector
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class Corrector : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string TraerCarreras(String Usuario)
        {
            String sql = "SELECT * FROM carrera";

            MySqlConnection connection = null;
            MySqlDataReader lector = null;

            GestorCarreras carreras = new GestorCarreras();

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

                while (lector.Read())
                {
                    Console.WriteLine(lector);

                }
            }
            catch (Exception ex)
            {

                System.Diagnostics.Debug.WriteLine("SQL ERROR: " + sql);
                System.Diagnostics.Debug.WriteLine("Error: " + ex.Message);
            }

            if (connection != null) connection.Close();

            return lector.ToString();
        }

        [WebMethod]
        public GestorCarreras ObtenerCarreras(String sql)
        {
            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            System.Diagnostics.Debug.WriteLine("ListarWS.ObtenerRegistros SQL : " + sql);



            GestorCarreras carreras = new GestorCarreras();
            try
            {
                connection = Conexion.getConexion();
                MySqlCommand cmd = new MySqlCommand(sql, connection);

                cmd.CommandType = System.Data.CommandType.Text;
                connection.Open();
                cmd.CommandTimeout = 240;

                lector = cmd.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        Carrera carrera = new Carrera();
                        carrera.idCarrera = lector.GetInt32(lector.GetOrdinal("idCarrera"));
                        carrera.nombreCarrera = lector.GetString(lector.GetOrdinal("nombre"));

                        carreras.lstCarreras.Add(carrera);
                        //registros += "{\"idCarrera\":\"" + lector.GetValue(0).ToString() + "\",\"nombreCarrera\":\"" + lector.GetValue(1).ToString() + "\"}";
                    }
                }
                lector.Close();



            }
            //    while (lector.Read())
            //    {
            //        registros += "{\"idCarrera\":\"" + lector.GetValue(0).ToString() + "\",\"nombreCarrera\":\"" + lector.GetValue(1).ToString() + "\"}";
            //        //reg = "id";
            //        //coma = "";
            //        //for (int i = 0; i < lector.FieldCount; i++)
            //        //{
            //        //    reg += coma + "\"" + lector.GetValue(i).ToString() + "\"";
            //        //    if (i == 0) coma = ",";
            //        //}
            //        //registros += coma_lista + "[" + reg + "]";
            //        //coma_lista = ",";
            //    }

            //   // registros = "{\"registros\":[" + registros + "]}";
            //    lector.Close();
            //}
            //catch (Exception ex)
            //{
            //    registros = "{\"registros\":[]}";
            //    System.Diagnostics.Debug.WriteLine("SQL ERROR: " + sql);
            //    System.Diagnostics.Debug.WriteLine("Error: " + ex.Message);
            //}

            //if (connection != null) connection.Close();

            //return registros;
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error durante la generación automática del examen!" + ex.Message);
            }
            finally
            {
                if (lector != null) lector.Close();
                if (connection != null) connection.Close();
            }
            return carreras;
        }

        [WebMethod]
        //public List<DateTime> ObtenerFechasExamen(String id)
        //{

        //    MySqlConnection connection = null;
        //    MySqlDataReader lector = null;
        //    System.Diagnostics.Debug.WriteLine("ListarWS.ObtenerRegistros SQL : " + id);
        //    List<DateTime> listFechas = new List<DateTime>();
        //    List<String> listFechasString = new List<String>();
        //    int idCarrera = Int32.Parse(id);

        //    GestorCarreras carreras = new GestorCarreras();
        //    try
        //    {
        //        connection = Conexion.getConexion();




        //        String consulta = "SELECT  instanciaexamen.fecha  FROM instanciaexamen INNER JOIN modeloexamen on instanciaexamen.idModeloExamen = modeloexamen.idModeloExamen  WHERE modeloexamen.idCarrera= '" + idCarrera + "'";


        //        MySqlCommand cmd = new MySqlCommand(consulta, connection);

        //        cmd.CommandType = System.Data.CommandType.Text;
        //        connection.Open();
        //        cmd.CommandTimeout = 240;

        //        lector = cmd.ExecuteReader();
        //        System.Diagnostics.Debug.WriteLine(consulta);
        //        if (lector.HasRows)
        //        {
        //            while (lector.Read())
        //            {
        //                DateTime fecha = new DateTime();
        //                String fechaS = "";
        //                // fecha=(lector.GetMySqlDateTime(1));
        //                fecha = lector.GetDateTime("fecha");
        //                System.Diagnostics.Debug.WriteLine(fecha);
        //                listFechas.Add(fecha);


        //                //carreras.lstCarreras.Add(carrera);
        //                //registros += "{\"idCarrera\":\"" + lector.GetValue(0).ToString() + "\",\"nombreCarrera\":\"" + lector.GetValue(1).ToString() + "\"}";
        //            }
        //        }
        //        lector.Close();
        //    }
        //    catch (Exception ex)
        //    {
        //        System.Diagnostics.Debug.WriteLine("Error durante la generación automática del examen!" + ex.Message);
        //    }
        //    finally
        //    {
        //        if (lector != null) lector.Close();
        //        if (connection != null) connection.Close();
        //    }
        //    return listFechas;
        //}
        public String ObtenerFechasExamen(String id)
        {

            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            System.Diagnostics.Debug.WriteLine("ListarWS.ObtenerRegistros SQL : " + id);

            int idCarrera = Int32.Parse(id);
            String fechas = "";
            String registros = "";
            GestorCarreras carreras = new GestorCarreras();
            try
            {
                connection = Conexion.getConexion();




                String consulta = "SELECT  instanciaexamen.fecha  FROM instanciaexamen INNER JOIN modeloexamen on instanciaexamen.idModeloExamen = modeloexamen.idModeloExamen  WHERE modeloexamen.idCarrera= '" + idCarrera + "'";


                MySqlCommand cmd = new MySqlCommand(consulta, connection);

                cmd.CommandType = System.Data.CommandType.Text;
                connection.Open();
                cmd.CommandTimeout = 240;

                lector = cmd.ExecuteReader();
                System.Diagnostics.Debug.WriteLine(consulta);
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        DateTime fecha = new DateTime();
                        String fechaS = "";
                        // fecha=(lector.GetMySqlDateTime(1));
                        fecha = lector.GetDateTime("fecha");
                        fechas = Funciones.deFechaDateAstringSQL(fecha);
                        registros += "{\"fecha\":\"" + fechas + "\"}";


                        //carreras.lstCarreras.Add(carrera);
                        //registros += "{\"idCarrera\":\"" + lector.GetValue(0).ToString() + "\",\"nombreCarrera\":\"" + lector.GetValue(1).ToString() + "\"}";
                    }
                }
                lector.Close();
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
            //    {
            //        "arrayColores":[{
            //    "nombreColor":"rojo",
            //                "valorHexadec":"#f00"
            //},

            //{ "fechas":"{"fecha":"2019 - 11 - 08"}{"fecha":"2019 - 11 - 15"}"}
            // registros = "{\"fechas\"[\":\"" + registros + "\"}";
            //registros = "{\"fechas\":[{\"" + registros + "\"}]}";
            registros = "" + registros + "";
            return registros;
        }





        [WebMethod]
        public String cantidadPreguntas(String id)
        {
            String c = "";
            int cantidadPreguntas;
            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            System.Diagnostics.Debug.WriteLine("ListarWS.ObtenerRegistros SQL : " + id);

            int idCarrera = Int32.Parse(id);
            String fechas = "";
            String registros = "";
            GestorCarreras carreras = new GestorCarreras();
            try
            {
                connection = Conexion.getConexion();




                String consulta = "SELECT  COUNT(modeloexamen.idModeloExamen) as cantidad FROM `modeloexamen` " +
                     "INNER JOIN examenpregunta on modeloexamen.idModeloExamen = examenpregunta.idModeloExamen " +
                     "INNER JOIN pregunta on  examenpregunta.idPregunta = pregunta.idPregunta" +
                     " INNER JOIN rtapregunta on pregunta.idPregunta = rtapregunta.idPregunta " +
                     "INNER JOIN instanciaexamen on instanciaexamen.idModeloExamen = modeloexamen.idModeloExamen" +
                     "WHERE modeloexamen.idModeloExamen = 1" +
                     "and rtapregunta.correcta = 1";

                MySqlCommand cmd = new MySqlCommand(consulta, connection);

                cmd.CommandType = System.Data.CommandType.Text;
                connection.Open();
                cmd.CommandTimeout = 240;

                lector = cmd.ExecuteReader();
                System.Diagnostics.Debug.WriteLine(consulta);
                if (lector.HasRows)
                {
                    cantidadPreguntas = lector.GetInt32("cantidad");
                    while (lector.Read())
                    {
                        DateTime fecha = new DateTime();
                        String fechaS = "";
                        // fecha=(lector.GetMySqlDateTime(1));
                        fecha = lector.GetDateTime("fecha");
                        fechas = Funciones.deFechaDateAstringSQL(fecha);
                        registros += "{\"fecha\":\"" + fechas + "\"}";


                        //carreras.lstCarreras.Add(carrera);
                        //registros += "{\"idCarrera\":\"" + lector.GetValue(0).ToString() + "\",\"nombreCarrera\":\"" + lector.GetValue(1).ToString() + "\"}";
                    }
                }
                lector.Close();
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
            c = cantidadPreguntas.ToString();
            return c;
        }
    }
}
   

