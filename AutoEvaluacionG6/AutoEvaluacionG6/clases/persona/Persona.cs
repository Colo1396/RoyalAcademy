using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.persona
{
    public class Persona
    {
        public virtual int idPersona { get; set; }
        public virtual string nombre { get; set; }
        public virtual string apellido { get; set; }
        public virtual string cuil { get; set; }
    }
}