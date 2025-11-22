import { Cliente } from "./Cliente";
import { Mesa } from "./Mesa";

export interface Reserva {
  id?: number;
  dataHora: string;
  clienteId: number;
  mesaId: number;
  cliente?: Cliente;
  mesa?: Mesa;
}
