using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace AutoEvaluacionG6.conexion
{
    public class Conexion
    {
        public static SqlConnection getConexion()
        {
            string cn = "server=localhost;uid=root;pwd=root;database=autoevaluaciong6";
            return new SqlConnection(cn);
        }
    }
}