using System.Collections.Generic;

namespace ProjetoRestaurante.Models
{
    public class Mesa
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public int Capacidade { get; set; }
        public bool Disponivel { get; set; } = true;

        public List<Reserva>? Reservas { get; set; }
    }
}