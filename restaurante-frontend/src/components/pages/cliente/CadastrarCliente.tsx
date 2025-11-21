import { useState } from "react";
import Cliente from "../../../models/Cliente";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastrarCliente(){

    const[nome, setNome] = useState("");
    const[email, setEmail] = useState("");
    const[telefone, setTelefone] = useState("");
     const navigate = useNavigate();

    function enviarCliente(event : any){
        event.preventDefault();
        submeterClienteAPI();
    }

    async function submeterClienteAPI(){
        try {
            const cliente : Cliente = {
                nome : nome,
                email : email,
                telefone : telefone
            };
            const resposta = await axios.post("http://localhost:5219/api/cliente/cadastrar", cliente);
            alert("Cliente cadastrado com sucesso!");
             navigate("/");
            
        } catch (error : any) {
            console.log("Cliente já cadastrado!");
        }
    }

    return(
        <div>
            <h1>Cadastrar Cliente</h1>
            <form onSubmit={enviarCliente}>
                <div>
                    <label>Nome:</label>
                    <input type="text" onChange={(e : any) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>E-Mail:</label>
                    <input type="text" onChange={(e : any) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input type="text" onChange={(e : any) => setTelefone(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )



}
export default CadastrarCliente;