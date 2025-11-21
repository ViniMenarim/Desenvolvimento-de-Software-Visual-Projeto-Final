import { useEffect, useState } from "react";
import Mesa from "../../../models/Mesa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditarMesa() {
    const { id } = useParams();

    const [numero, setNumero] = useState(0);
    const [capacidade, setCapacidade] = useState(0);
    const [disponibilidade, setDisponibilidade] = useState(true); // true = disponível

    const navigate = useNavigate();

    useEffect(() => {
        buscarMesasAPI();
    }, []);

    async function buscarMesasAPI() {
        try {
            const resposta = await axios.get(`http://localhost:5219/api/mesa/buscar/${id}`);
            setNumero(resposta.data.numero);
            setCapacidade(resposta.data.capacidade);
            setDisponibilidade(resposta.data.disponivel);

        } catch (error) {
            console.log("Erro na requisição" + error);
        }
    }

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

            const resposta = await axios.patch(`http://localhost:5219/api/mesa/alterar/${id}`, mesa);
            alert("Mesa editada com sucesso!");
            navigate("/mesa/listar");

        } catch (error: any) {
            console.log("Mesa já cadastrada!");
        }
    }

    return (
        <div>
            <h1>Editar Mesa</h1>
            <form onSubmit={enviarMesa}>
                <div>
                    <label>Número:</label>
                    <input type="number" value={numero} onChange={(e: any) => setNumero(e.target.value)} />
                </div>
                <div>
                    <label>Capacidade:</label>
                    <input type="number" value={capacidade} onChange={(e: any) => setCapacidade(e.target.value)} />
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
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    )



}
export default EditarMesa;