using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.resolucionExamen
{
    public class RtaAlumnoInst
    {
        public virtual int idExamen { get; set; }
        public virtual int nroPregunta { get; set; }
        public virtual int nroRespuesta { get; set; }
    }
}