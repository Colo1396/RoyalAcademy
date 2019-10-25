using System;
using System.Collections.Generic;
//using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using MySql.Data.MySqlClient;

/*namespace AutoEvaluacionG6.conexion
{
    public class Conexion
    {
        public static SqlConnection getConexion()
        {
            string cn = "server=localhost;uid=root;pwd=root;database=autoevaluaciong6";
            return new SqlConnection(cn);
        }
    }
}*/

namespace AutoEvaluacionG6.conexion
{
    public class Conexion
    {
        public static MySqlConnection getConexion()
        {
            string cn = "datasource=localhost;port=3306;username=root;password='root';database=autoevaluaciong6;"; 
            //cambiado por Ro!
            return new MySqlConnection(cn);
        }
    }
}
