import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cliente } from "../../../Models/Cliente";
import { Mesa } from "../../../Models/Mesa";
import { Reserva } from "../../../Models/Reserva";
import Swal from "sweetalert2";
import axios from "axios";

function EditarReserva() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mesas, setMesas] = useState<Mesa[]>([]);

  const [clienteId, setClienteId] = useState("");
  const [mesaId, setMesaId] = useState("");
  const [dataHora, setDataHora] = useState("");

  useEffect(() => {
    carregarListas();
    carregarReserva();
  }, []);

  async function carregarListas() {
    try {
      const respClientes = await axios.get(
        "http://localhost:5219/api/cliente/listar"
      );
      if (Array.isArray(respClientes.data)) setClientes(respClientes.data);

      const respMesas = await axios.get(
        "http://localhost:5219/api/mesa/listar"
      );
      if (Array.isArray(respMesas.data)) setMesas(respMesas.data);
    } catch (erro) {
      console.log("Erro ao carregar listas auxiliares");
    }
  }

  async function carregarReserva() {
    try {
      const resposta = await axios.get(
        `http://localhost:5219/api/reserva/buscar/${id}`
      );
      const dados: Reserva = resposta.data;

      setClienteId(dados.clienteId.toString());
      setMesaId(dados.mesaId.toString());

      if (dados.dataHora) {
        const dataFormatada = new Date(dados.dataHora)
          .toISOString()
          .slice(0, 16);
        setDataHora(dataFormatada);
      }
    } catch (error) {
      console.log("Erro ao buscar reserva");
    }
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();

    const reservaEditada: Reserva = {
      id: parseInt(id!),
      clienteId: parseInt(clienteId),
      mesaId: parseInt(mesaId),
      dataHora: dataHora,
    };

    axios
      .patch(`http://localhost:5219/api/reserva/alterar/${id}`, reservaEditada)
      .then((resposta) => {
        Swal.fire({
          title: "Sucesso!",
          text: "Reserva alterada com sucesso!",
          icon: "success",
          confirmButtonColor: "#27ae60",
        }).then(() => {
          navigate("/reserva/listar");
        });
      })
      .catch((erro) => {
        const mensagemErro = erro.response?.data || "Erro ao editar reserva.";
        Swal.fire({
          title: "Erro!",
          text:
            typeof mensagemErro === "string"
              ? mensagemErro
              : JSON.stringify(mensagemErro),
          icon: "error",
          confirmButtonColor: "#e74c3c",
        });
      });
  }

  return (
    <div>
      <h1>Editar Reserva</h1>
      <form onSubmit={salvar}>
        <div>
          <label>Cliente:</label>
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
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
            value={mesaId}
            onChange={(e) => setMesaId(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione uma mesa
            </option>
            {mesas.map((m) => (
              <option key={m.id} value={m.id}>
                Mesa {m.numero}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
export default EditarReserva;
