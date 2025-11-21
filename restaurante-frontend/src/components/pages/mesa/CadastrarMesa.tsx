import { useState } from "react";
import Mesa from "../../../models/Mesa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastrarMesa() {

    const [numero, setNumero] = useState(0);
    const [capacidade, setCapacidade] = useState(0);
    const [disponibilidade, setDisponibilidade] = useState(true); // true = disponível

    const navigate = useNavigate();

    function enviarMesa(event: any) {
        event.preventDefault();
        submeterMesaAPI();
    }

    async function submeterMesaAPI() {
        try {
            const mesa = {
                numero,
                capacidade,
                disponivel: disponibilidade, // ⚠️ Aqui o nome bate com o C# model
            };

            const resposta = await axios.post("http://localhost:5219/api/mesa/cadastrar", mesa);
            alert("Mesa cadastrada com sucesso!");
            navigate("/mesa/listar");

        } catch (error: any) {
            console.log("Cliente já cadastrado!");
        }
    }

    return (
        <div>
            <h1>Cadastrar Cliente</h1>
            <form onSubmit={enviarMesa}>
                <div>
                    <label>Número:</label>
                    <input type="text" onChange={(e: any) => setNumero(e.target.value)} />
                </div>
                <div>
                    <label>Capacidade:</label>
                    <input type="text" onChange={(e: any) => setCapacidade(e.target.value)} />
                </div>
                <div>
                    <label>Disponibilidade:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                checked={disponibilidade === true}
                                onChange={() => setDisponibilidade(true)}
                            />
                            Disponível
                        </label>
                        <label style={{ marginLeft: "10px" }}>
                            <input
                                type="radio"
                                checked={disponibilidade === false}
                                onChange={() => setDisponibilidade(false)}
                            />
                            Ocupada
                        </label>
                    </div>
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )



}
export default CadastrarMesa;