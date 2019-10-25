using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.resolucionExamen
{
    public class PreguntaInst
    {
        public virtual int idPregunta { get; set; }
        public virtual int idTipoPregunta { get; set; }
        public virtual string consigna { get; set; }
        public virtual List<RespuestaInst> respuestas { get; set; }

        public PreguntaInst()
        {
            this.respuestas = new List<RespuestaInst>();
        }

    }
}