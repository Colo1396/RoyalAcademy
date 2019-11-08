using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using AutoEvaluacionG6.conexion;
using System.Diagnostics;
using AutoEvaluacionG6.clases.persona;


namespace AutoEvaluacionG6.ws
{
    /// <summary>
    /// Descripción breve de abmAlumnos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class abmAlumnos : System.Web.Services.WebService
    {
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@qq
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
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@qq

        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@qq
        [WebMethod]
        public String PersistirAltaPersona(Persona persona,Usuario usuario,Admin admin,Alumno alumno,int idPerfil)
        {
            MySqlConnection connection = null;
            MySqlDataReader lector = null;
            MySqlTransaction trans = null; 
            String retorno = "false";
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


                System.Diagnostics.Debug.WriteLine(persona.idPersona);
                System.Diagnostics.Debug.WriteLine(persona.nombre);
                System.Diagnostics.Debug.WriteLine(persona.apellido);
                System.Diagnostics.Debug.WriteLine(persona.cuil);
                
                System.Diagnostics.Debug.WriteLine(admin.idAdmin);
                System.Diagnostics.Debug.WriteLine(admin.nombre);
                System.Diagnostics.Debug.WriteLine(admin.idTipo);
              
                System.Diagnostics.Debug.WriteLine(alumno.idAlumbo);
                System.Diagnostics.Debug.WriteLine(alumno.nroLegajo);

                System.Diagnostics.Debug.WriteLine(usuario.idUsuario);
                System.Diagnostics.Debug.WriteLine(usuario.idPerfil);
                System.Diagnostics.Debug.WriteLine(usuario.clave);
                System.Diagnostics.Debug.WriteLine(usuario.mail);
                System.Diagnostics.Debug.WriteLine(usuario.estado);


                cmd.CommandText = "insert into persona (nombre,apellido,cuil) values ('"+persona.nombre+"','"+persona.apellido+"','"+persona.cuil+"')";
                cmd.ExecuteNonQuery();//cone sta funcion ejecuto el sql

                cmd.CommandText = "insert into usuario (idUsuario,idPerfil,clave,mail,estado) values ("+persona.idPersona+"," + usuario.idPerfil + ",'" + usuario.clave + "','" + usuario.mail + "',"+usuario.estado+")";
                cmd.ExecuteNonQuery();//cone sta funcion ejecuto el sql

                if (idPerfil == 1)
                {

                    cmd.CommandText = "insert into admin (idAdmin,nombre,idTipo) values ("+persona.idPersona+",'" + admin.nombre + "'," + admin.idTipo + ")";
                    cmd.ExecuteNonQuery();//cone sta funcion ejecuto el sql
                                          
                }
                if (idPerfil == 2)
                {
                    cmd.CommandText = "insert into alumno (idAlumno,nroLegajo) values ("+persona.idPersona+",'" + alumno.nroLegajo + "')";
                    cmd.ExecuteNonQuery();//cone sta funcion ejecuto el sql
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
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@qq



    }
}
