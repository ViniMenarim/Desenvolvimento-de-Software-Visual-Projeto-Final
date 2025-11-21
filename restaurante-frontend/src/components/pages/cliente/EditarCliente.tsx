import axios from "axios";
import { useEffect, useState } from "react";
import Cliente from "../../../models/Cliente";
import { useNavigate, useParams } from "react-router-dom";

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
            const resposta = await axios.get(`http://localhost:5219/api/cliente/buscar/${id}`);
            setNome(resposta.data.nome);
            setEmail(resposta.data.email);
            setTelefone(resposta.data.telefone);

        } catch (error) {
            console.log("Erro na requisição" + error);
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
                telefone: telefone
            };
            const resposta = await axios.patch(`http://localhost:5219/api/cliente/alterar/${id}`, cliente);
            console.log(await resposta.data);
            alert("Cliente editado com sucesso!");
            navigate("/");

        } catch (error: any) {
            console.log("Cliente já cadastrado!");
        }
    }

    return (
        <div>
            <h1>Editar Cliente</h1>
            <form onSubmit={enviarCliente}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e: any) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>E-Mail:</label>
                    <input type="text" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input type="text" value={telefone} onChange={(e: any) => setTelefone(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Alterar</button>
                </div>
            </form>
        </div>
    )

}
export default EditarCliente;