import React from 'react';
import ListarClientes from './components/pages/cliente/ListarClientes';
import CadastrarCliente from './components/pages/cliente/CadastrarCliente';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import EditarCliente from './components/pages/cliente/EditarCliente';
import ListarMesas from './components/pages/mesa/ListarMesas';
import CadastrarMesa from './components/pages/mesa/CadastrarMesa';
import EditarMesa from './components/pages/mesa/EditarMesa';


function App() {
  return (
    <div className="App">
      <h1>Restaurante</h1>
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Lista de Clientes</Link></li>
          <li><Link to="/cliente/cadastrar">Cadastrar Cliente</Link></li>
          <li><Link to="/mesa/listar">Lista de Mesas</Link></li>
          <li><Link to="/mesa/cadastrar">Cadastrar Mesa</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<ListarClientes/>}></Route>
        <Route path='/cliente/cadastrar' element={<CadastrarCliente/>}></Route>
        <Route path='/cliente/alterar/:id' element={<EditarCliente/>}></Route>
        <Route path='/mesa/listar' element={<ListarMesas/>}></Route>
        <Route path='/mesa/cadastrar' element={<CadastrarMesa/>}></Route>
        <Route path='/mesa/alterar/:id' element={<EditarMesa/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
