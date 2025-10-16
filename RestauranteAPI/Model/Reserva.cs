using System;

namespace ProjetoRestaurante.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }

        // Chaves estrangeiras
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }

        public int MesaId { get; set; }
        public Mesa? Mesa { get; set; }
    }
}