import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cliente } from "../../../Models/Cliente";
import { Mesa } from "../../../Models/Mesa";
import { Reserva } from "../../../Models/Reserva";
import Swal from "sweetalert2";

function CadastrarReserva() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [mesaId, setMesaId] = useState("");
  const [dataHora, setDataHora] = useState("");

  useEffect(() => {
    fetch("http://localhost:5219/api/cliente/listar")
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setClientes(data);
        }
      })
      .catch((error) => console.log("Erro ao carregar clientes:", error));

    fetch("http://localhost:5219/api/mesa/listar")
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMesas(data);
        }
      })
      .catch((error) => console.log("Erro ao carregar mesas:", error));
  }, []);

  function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    const novaReserva: Reserva = {
      clienteId: parseInt(clienteId),
      mesaId: parseInt(mesaId),
      dataHora: dataHora,
    };

    fetch("http://localhost:5219/api/reserva/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaReserva),
    }).then((resposta) => {
      if (resposta.ok) {
        Swal.fire({
          title: "Sucesso!",
          text: "Reserva realizada com sucesso!",
          icon: "success",
          confirmButtonColor: "#27ae60",
        }).then(() => {
          navigate("/reserva/listar");
        });
      } else {
        resposta.text().then((erro) => {
          Swal.fire({
            title: "Atenção!",
            text: erro,
            icon: "warning",
            confirmButtonColor: "#e74c3c",
          });
        });
      }
    });
  }

  return (
    <div>
      <h2>Nova Reserva</h2>
      <form onSubmit={cadastrar}>
        <div>
          <label>Cliente:</label>
          <select
            onChange={(e) => setClienteId(e.target.value)}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um cliente
            </option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Mesa:</label>
          <select
            onChange={(e) => setMesaId(e.target.value)}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione uma mesa
            </option>
            {mesas.map((m) => (
              <option
                key={m.id}
                value={m.id}
                disabled={!m.disponivel}
                style={!m.disponivel ? { color: "red" } : {}}
              >
                Mesa {m.numero} {m.disponivel ? "(Livre)" : "(INDISPONÍVEL)"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
}
export default CadastrarReserva;
