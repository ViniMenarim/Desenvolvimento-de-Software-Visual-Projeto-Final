# Desenvolvimento-de-Software-Visual-Projeto-Final
Projeto final para a disciplina de Desenvolvimento de Software Visual

Grupo: Vinicius Menarim e Enzo Xavier

Sistema de Gerenciamento de Restaurante
Este projeto é uma API de gerenciamento de restaurante desenvolvida em C# com Minimal API, utilizando Entity Framework Core e SQLite. O sistema permite o cadastro e gerenciamento de clientes, mesas e reservas, oferecendo funcionalidades de CRUD completo, com validações importantes para evitar inconsistências, como duplicidade de e-mail ou reservas de mesas já ocupadas.

Funcionalidades
Clientes: cadastrar, listar, buscar por ID, atualizar e remover.
Mesas: cadastrar, listar, buscar por ID, atualizar (incluindo disponibilidade) e remover.
Reservas: criar, listar, buscar, atualizar e remover, com validação de conflitos de horário.

Relacionamento das Entidades
Cliente ↔ Reserva: um cliente pode ter várias reservas; cada reserva pertence a um cliente.
Mesa ↔ Reserva: uma mesa pode ter várias reservas em horários diferentes; cada reserva pertence a uma mesa.
Reserva: conecta cliente e mesa e registra o horário da reserva, garantindo que uma mesa não seja reservada por dois clientes no mesmo horário.

Uso de Inteligência Artificial
A Inteligência Artificial foi utilizada para apoiar o desenvolvimento do projeto, ajudando a planejar a ideia do sistema, sugerir algumas funcionalidades e implementar validações e estruturas, além de colaborar na elaboração da documentação.
