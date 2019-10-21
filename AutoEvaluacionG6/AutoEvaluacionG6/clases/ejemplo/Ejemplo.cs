using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.ejemplo
{
    public class Ejemplo
    {
        public virtual int id { get; set; }
        public virtual string descripcion { get; set; }
        public virtual List<DetalleEjemplo> detalle { get; set; }

        public Ejemplo()
        {
            this.detalle = new List<DetalleEjemplo>();
        }
    }
}