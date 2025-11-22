import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import ListarClientes from "./Components/Pages/Cliente/ListarClientes";
import CadastrarCliente from "./Components/Pages/Cliente/CadastrarCliente";
import EditarCliente from "./Components/Pages/Cliente/EditarCliente";

import ListarMesas from "./Components/Pages/Mesa/ListarMesas";
import CadastrarMesa from "./Components/Pages/Mesa/CadastrarMesa";
import EditarMesa from "./Components/Pages/Mesa/EditarMesa";

import ListarReservas from "./Components/Pages/Reserva/ListarReservas";
import CadastrarReserva from "./Components/Pages/Reserva/CadastrarReserva";
import EditarReserva from "./Components/Pages/Reserva/EditarReserva";

function App() {
  return (
    <div className="App">
      <h1>Restaurante</h1>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Lista de Clientes</Link>
            </li>
            <li>
              <Link to="/cliente/cadastrar">Cadastrar Cliente</Link>
            </li>
            <li>
              <Link to="/mesa/listar">Lista de Mesas</Link>
            </li>
            <li>
              <Link to="/mesa/cadastrar">Cadastrar Mesa</Link>
            </li>
            <li>
              <Link to="/reserva/listar">Lista de Reservas</Link>
            </li>
            <li>
              <Link to="/reserva/cadastrar">Fazer Reserva</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarClientes />}></Route>
          <Route
            path="/cliente/cadastrar"
            element={<CadastrarCliente />}
          ></Route>
          <Route
            path="/cliente/alterar/:id"
            element={<EditarCliente />}
          ></Route>

          <Route path="/mesa/listar" element={<ListarMesas />}></Route>
          <Route path="/mesa/cadastrar" element={<CadastrarMesa />}></Route>
          <Route path="/mesa/alterar/:id" element={<EditarMesa />}></Route>

          <Route path="/reserva/listar" element={<ListarReservas />}></Route>
          <Route
            path="/reserva/cadastrar"
            element={<CadastrarReserva />}
          ></Route>
          <Route
            path="/reserva/alterar/:id"
            element={<EditarReserva />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
