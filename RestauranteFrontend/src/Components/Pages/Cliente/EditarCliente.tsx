import axios from "axios";
import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/Cliente";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditarCliente() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    buscarClientesAPI();
  }, []);

  async function buscarClientesAPI() {
    try {
      const resposta = await axios.get(
        `http://localhost:5219/api/cliente/buscar/${id}`
      );
      setNome(resposta.data.nome);
      setEmail(resposta.data.email);
      setTelefone(resposta.data.telefone);
    } catch (error) {
      console.log(error);
    }
  }

  function enviarCliente(event: any) {
    event.preventDefault();
    submeterClienteAPI();
  }

  async function submeterClienteAPI() {
    try {
      const cliente: Cliente = {
        nome: nome,
        email: email,
        telefone: telefone,
      };
      await axios.patch(
        `http://localhost:5219/api/cliente/alterar/${id}`,
        cliente
      );

      Swal.fire({
        title: "Atualizado!",
        text: "Cliente editado com sucesso!",
        icon: "success",
        confirmButtonColor: "#27ae60",
      }).then(() => {
        navigate("/");
      });
    } catch (error: any) {
      Swal.fire("Erro!", "Erro ao editar cliente.", "error");
    }
  }

  return (
    <div>
      <h1>Editar Cliente</h1>
      <form onSubmit={enviarCliente}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-Mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e: any) => setTelefone(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Alterar</button>
        </div>
      </form>
    </div>
  );
}
export default EditarCliente;
