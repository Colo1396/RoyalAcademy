using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoEvaluacionG6.clases.persona
{
    public class Admin
    {
        public virtual int idAdmin { get; set; }
        public virtual string nombre { get; set; }
        public virtual int idTipo { get; set; }
    }
}