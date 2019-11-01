using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.util
{
    public static class Funciones
    {
        /// <summary>
        ///   return formato DD/MM/YYYY HH:MM:SS
        /// </summary>
        public static string deFechaDateTimeAstring(DateTime fec)
        {
            return deFechaDateAstring(fec) + " " + deTimeAstring(fec);
        }

        /// <summary>
        ///   retorna horas con formato HH:MM:SS
        /// </summary>
        public static string deTimeAstring(DateTime fec)
        {
            string hora = fec.Hour.ToString();
            string min = fec.Minute.ToString();
            string seg = fec.Second.ToString();

            if (hora.Length == 1) hora = "0" + hora;
            if (min.Length == 1) min = "0" + min;
            if (seg.Length == 1) seg = "0" + seg;

            return hora + ":" + min + ":" + seg;
        }

        /// <summary>
        ///   return formato DD/MM/YYYY
        /// </summary>
        public static string deFechaDateAstring(DateTime fec)
        {
            string dia = fec.Day.ToString();
            string mes = fec.Month.ToString();
            string anio = fec.Year.ToString();

            if (dia.Length == 1) dia = "0" + dia;
            if (mes.Length == 1) mes = "0" + mes;

            return dia + "/" + mes + "/" + anio;
        }

        /// <summary>
        ///   return formato YYYY-MM-DD
        /// </summary>
        public static string deFechaDateAstringSQL(DateTime fec)
        {

            string dia = fec.Day.ToString();
            string mes = fec.Month.ToString();
            string anio = fec.Year.ToString();

            if (dia.Length == 1) dia = "0" + dia;
            if (mes.Length == 1) mes = "0" + mes;

            return anio + "-" + mes + "-" + dia;
        }

        /// <summary>
        ///   retorna de fecha con formato DD/MM/YYYY a DATETIME. ej: fecha 02/08/2018 a Datetime
        /// </summary>
        // 
        public static DateTime deFechaStringADateTime(string fec)
        {
            string[] arrFec = fec.Split('/');

            int dia = Int32.Parse(arrFec[0]);
            int mes = Int32.Parse(arrFec[1]);
            int anio = Int32.Parse(arrFec[2]);

            return new DateTime(anio, mes, dia);
        }

        /// <summary>
        ///   retorna string con formato   YYYY-MM-DD HH:MM:SS
        /// </summary>
        /// 
        public static string deFechaDateTimeAstringSQL(DateTime fec)
        {
            return deFechaDateAstringSQL(fec) + " " + deTimeAstring(fec);
        }
    }
}