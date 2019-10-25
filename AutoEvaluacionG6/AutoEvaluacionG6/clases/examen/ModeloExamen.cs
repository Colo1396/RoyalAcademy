using AutoEvaluacionG6.clases.preguntas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AutoEvaluacionG6.clases.examen
{
    public class ModeloExamen
    {
        public virtual int idModeloExamen { get; set; }
        public virtual int idCarrera { get; set; }
        public virtual List<Preguntas> lstPreguntas { get; set; }

        public ModeloExamen()
        {
            this.lstPreguntas = new List<Preguntas>();
        }


    }
}
