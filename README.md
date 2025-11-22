# Sistema de Gerenciamento de Restaurante 🍽️

Projeto final para a disciplina de **Desenvolvimento de Software Visual**.
Uma solução Full Stack para administração de reservas, clientes e mesas de um restaurante.

**Grupo:**
* Vinicius Menarim
* Enzo Xavier

---

## 📋 Sobre o Projeto

Este sistema foi desenvolvido para gerenciar o fluxo de reservas de um restaurante. Ele é composto por uma **API REST** robusta no backend e uma interface web moderna (**Frontend**) para interação do usuário.

O principal diferencial é a validação de conflitos: o sistema impede que uma mesma mesa seja reservada duplicadamente no mesmo horário, além de evitar cadastros duplicados de clientes.

---

## 🚀 Tecnologias Utilizadas

### Backend (API)
* **C# .NET**: Utilizando o modelo de **Minimal API** para alta performance e simplicidade.
* **Entity Framework Core**: ORM para manipulação de dados.
* **SQLite**: Banco de dados relacional leve e portátil.
* **Swagger**: Documentação e teste das rotas da API.

### Frontend (Web)
* **React + TypeScript**: Biblioteca para construção da interface de usuário.
* **Axios**: Para requisições HTTP e comunicação com a API.
* **SweetAlert2**: Para alertas modais personalizados, bonitos e responsivos.
* **CSS Moderno**: Estilização limpa e responsiva.
* **React Router DOM**: Gerenciamento de rotas e navegação (SPA).

---

## ⚙️ Funcionalidades

### 👤 Clientes
* Cadastro de novos clientes (com validação de e-mail único).
* Listagem completa de clientes.
* Edição de dados cadastrais.
* Remoção de clientes (com confirmação de segurança).

### 🪑 Mesas
* Cadastro de mesas (número, capacidade, status).
* Controle de disponibilidade (Mesa Livre/Ocupada).
* Visualização visual no frontend se a mesa está indisponível para reserva.
* Edição e remoção de mesas.

### 📅 Reservas
* **Criação de Reservas**: Seleção de cliente e mesa via listas dinâmicas.
* **Validação Inteligente**: O sistema **bloqueia** a reserva se a mesa já estiver ocupada no horário solicitado ou se estiver marcada como indisponível.
* Listagem de todas as reservas com formatação de data brasileira.
* Edição de data, mesa ou cliente da reserva.
* Cancelamento de reservas.

---

## 🔗 Relacionamento das Entidades

1.  **Cliente ↔ Reserva:** Relacionamento *Um-para-Muitos*. Um cliente pode realizar várias reservas, mas cada reserva está atrelada a um único cliente.
2.  **Mesa ↔ Reserva:** Relacionamento *Um-para-Muitos*. Uma mesa pode receber várias reservas em horários distintos.
3.  **Reserva:** Entidade associativa que conecta Cliente e Mesa, adicionando a dimensão de tempo (Data/Hora) para garantir a integridade da agenda do restaurante.

---

## 📦 Como Executar o Projeto

### Pré-requisitos
* .NET SDK instalado.
* Node.js e NPM instalados.

### Passo 1: Rodar a API (Backend)
1.  Abra a pasta `RestauranteAPI`.
2.  No terminal, execute:
    ```bash
    dotnet run
    ```
3.  A API estará rodando (geralmente em `http://localhost:5219` ou porta similar configurada).

### Passo 2: Rodar o Frontend
1.  Abra a pasta `RestauranteFrontend`.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
4.  O navegador abrirá a aplicação (geralmente em `http://localhost:3000`).

---

## 🤖 Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante todo o ciclo de desenvolvimento deste projeto. Suas contribuições incluíram:
* Planejamento inicial e estruturação da ideia do sistema.
* Sugestões de implementação para validações de regras de negócio (ex: conflito de horários).
* Auxílio na construção da estrutura do Frontend (React components e CSS).
* Apoio na elaboração desta documentação.