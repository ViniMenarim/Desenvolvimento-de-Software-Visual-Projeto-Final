using System.Collections.Generic;

namespace ProjetoRestaurante.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;


        // Relacionamento
        public List<Reserva>? Reservas { get; set; }
    
    }
}