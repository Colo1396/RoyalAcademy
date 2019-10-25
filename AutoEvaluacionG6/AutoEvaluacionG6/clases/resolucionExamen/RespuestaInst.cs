using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.resolucionExamen
{
    public class RespuestaInst
    {
        public virtual int idRespuesta { get; set; }
        public virtual int idPregunta { get; set; }
        public virtual int correcta { get; set; }
        public virtual string respuesta { get; set; }
    }
}