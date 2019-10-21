using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.ejemplo
{
    public class DetalleEjemplo
    {
        public virtual int idEjemplo { get; set; }
        public virtual int idDetalle { get; set; }
        public virtual string nombre { get; set; }
    }
}