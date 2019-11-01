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
        public virtual String fecha { get; set; }
        public virtual int idInstanciaExamen { get; set; }
        public virtual int idModeloExamen { get; set; }

        public virtual List<PreguntaInst> preguntas { get; set; }

        public InstExamen()
        {
            this.preguntas = new List<PreguntaInst>();
        }

        public bool agregarPregunta(PreguntaInst pregunta)
        {
            bool existe = false;

            for (int i =0; i < preguntas.Count && existe==false; i++)
            {
                if (preguntas[i].idPregunta == pregunta.idPregunta)
                {
                    existe = true;
                }
            }
            if (!existe) this.preguntas.Add(pregunta);
            return existe;
        }

        public bool agregarRespuesta(RespuestaInst respueta)
        {
            bool existe = false;

            for (int i = 0; i < preguntas.Count && existe == false; i++)
            {
                if (preguntas[i].idPregunta == respueta.idPregunta)
                {
                    existe = true;
                    this.preguntas[i].respuestas.Add(respueta);
                }
            }
            return existe;
        }

    }
}