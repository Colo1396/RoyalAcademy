using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AutoEvaluacionG6.clases.preguntas
{
    public class Preguntas
    {
        public virtual int idPregunta { get; set; }
        public virtual int idTipoPregunta { get; set; }
        public virtual string consigna { get; set; }
        public virtual List<Rtas> rtas { get; set; }

        public Preguntas()
        {
            this.rtas = new List<Rtas>();
        }

    }


}