import { useEffect, useState } from "react";
import Mesa from "../../../models/Mesa";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarMesas(){
    const[mesas, setMesas] = useState<Mesa[]>([]);

    useEffect(() => {
        console.log("Componente carregado!");
        buscarMesasAPI();
    }, []);

    async function buscarMesasAPI(){
        try {
            const resposta = await axios.get("http://localhost:5219/api/mesa/listar");
            setMesas(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log("Erro na requisição" + error);
        }
    }

    async function removerMesa(id : string){
        const resposta = await axios.delete(`http://localhost:5219/api/mesa/remover/${id}`);
        buscarMesasAPI();
        alert("Mesa removida!");
    }

    return(
        <div id = "listar_produtos">
            <h1>Lista de Mesas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Número</th>
                        <th>Capacidade</th>
                        <th>Disponibilidade</th>
                        <th>Remover</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {mesas.map((mesa) =>(
                        <tr>
                            <td>{mesa.id}</td>
                            <td>{mesa.numero}</td>
                            <td>{mesa.capacidade}</td>
                            <td>{mesa.disponivel ? "Disponível" : "Ocupada"}</td>
                            <td><button onClick={() => removerMesa(mesa.id!)}>Remover</button></td>
                            <td><Link to={`/mesa/alterar/${mesa.id}`} className="btn-editar">Editar</Link></td>
                        </tr>
                    ))}
                   
                </tbody>

            </table>
        </div>
    )


}
export default ListarMesas;