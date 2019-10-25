using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.ejemplo
{
    public class Ejemplo
    {
        //Atributos de la clase
        //por que virtual??? 
        public virtual int id { get; set; } //los get y set en c# se crean asi
        public virtual string descripcion { get; set; }
        public virtual List<DetalleEjemplo> detalle { get; set; }

        //Constructor de la clase Ejemplo
        public Ejemplo()
        {
            //Crea una lista de DetalleEjemplo una vez que se instancia la clase.
            this.detalle = new List<DetalleEjemplo>();
        }
    }
}