using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.persona
{
    public class Usuario
    {
        public virtual int idUsuario { get; set; }
        public virtual int idPerfil { get; set; }
        public virtual string clave { get; set; }
        public virtual string mail { get; set; }
        public virtual int estado { get; set; }

    }
}