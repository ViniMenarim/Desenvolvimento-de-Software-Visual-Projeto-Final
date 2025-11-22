import { useState } from "react";
import { Cliente } from "../../../Models/Cliente";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CadastrarCliente() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();

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
      await axios.post("http://localhost:5219/api/cliente/cadastrar", cliente);

      Swal.fire({
        title: "Sucesso!",
        text: "Cliente cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#27ae60",
      }).then(() => {
        navigate("/");
      });
    } catch (error: any) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível cadastrar (verifique se o e-mail já existe).",
        icon: "error",
        confirmButtonColor: "#e74c3c",
      });
    }
  }

  return (
    <div>
      <h1>Cadastrar Cliente</h1>
      <form onSubmit={enviarCliente}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-Mail:</label>
          <input
            type="email"
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            onChange={(e: any) => setTelefone(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
export default CadastrarCliente;
