import { useEffect, useState } from "react";
import Cliente from "../../../models/Cliente";
import axios from "axios";
import { Link } from 'react-router-dom';

function ListarClientes(){
    const[clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        console.log("Componente carregado!");
        buscarClientesAPI();
    }, []);

    async function buscarClientesAPI(){
        try {
            const resposta = await axios.get("http://localhost:5219/api/cliente/listar");
            setClientes(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log("Erro na requisição" + error);
        }
    }

    async function removerCliente(id : string){
        const resposta = await axios.delete(`http://localhost:5219/api/cliente/remover/${id}`);
        buscarClientesAPI();
        alert("Cliente removido!");
    }

    return(
        <div id = "listar_produtos">
            <h1>Lista de Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Remover</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) =>(
                        <tr>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td><button onClick={() => removerCliente(cliente.id!)}>Remover</button></td>
                            <td><Link to={`/cliente/alterar/${cliente.id}`} className="btn-editar">Editar</Link></td>
                        </tr>
                    ))}
                   
                </tbody>

            </table>
        </div>
    )


}
export default ListarClientes;