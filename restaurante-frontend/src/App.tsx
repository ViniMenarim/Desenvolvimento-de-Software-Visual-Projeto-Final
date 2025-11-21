import React from 'react';
import ListarClientes from './components/pages/cliente/ListarClientes';
import CadastrarCliente from './components/pages/cliente/CadastrarCliente';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import EditarCliente from './components/pages/cliente/EditarCliente';


function App() {
  return (
    <div className="App">
      <h1>Restaurante</h1>
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Clientes</Link></li>
          <li><Link to="/cliente/cadastrar">Cadastrar Cliente</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<ListarClientes/>}></Route>
        <Route path='/cliente/cadastrar' element={<CadastrarCliente/>}></Route>
        <Route path='/cliente/alterar/:id' element={<EditarCliente/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
