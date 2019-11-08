
using AutoEvaluacionG6.clases.carreras;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.GestorListas
{
    public class GestorCarreras
    {
        public virtual List<Carrera> lstCarreras { get; set; }



        public GestorCarreras()
        {
            this.lstCarreras = new List<Carrera>();
        }
    }

    
}