using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.resolucionExamen
{
    public class InstExamen
    {
        public virtual int idExamen { get; set; }
        public virtual int idAlumno { get; set; }
        public virtual DateTime fecha { get; set; }
        public virtual int idInstanciaExamen { get; set; }

        public virtual List<PreguntaInst> preguntas { get; set; }

        public InstExamen()
        {
            this.preguntas = new List<PreguntaInst>();
        }

    }
}