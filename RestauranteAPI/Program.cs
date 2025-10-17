using Microsoft.AspNetCore.Mvc;
using ProjetoRestaurante.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

List<Cliente> clientes = new List<Cliente>();


app.MapGet("/", () => "RESTAURANTE!");

// ==========================================
// CRUD DE CLIENTE
// ==========================================

//Listar Clientes
app.MapGet("/api/cliente/listar", ([FromServicesAttribute] AppDbContext ctx) =>
{
    if (ctx.Clientes.Any())
    {
        return Results.Ok(ctx.Clientes.ToList());
    }
    return Results.BadRequest("A lista de clientes está vazia!");

});

//Buscar cliente pelo ID
app.MapGet("/api/cliente/buscar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var clienteBuscado = ctx.Clientes.Find(id);
    if (clienteBuscado == null)
        return Results.NotFound("Cliente não encontrado.");
    return Results.Ok(clienteBuscado);

});

//Cadastrar Cliente
app.MapPost("/api/cliente/cadastrar", ([FromBodyAttribute] Cliente cliente, [FromServicesAttribute] AppDbContext ctx) =>
{
    var existente = ctx.Clientes.FirstOrDefault(c => c.Email == cliente.Email);
    if (existente != null)
        return Results.Conflict("Cliente já cadastrado!");

    ctx.Clientes.Add(cliente);
    ctx.SaveChanges();
    return Results.Created("", cliente);

});

//Remover Cliente
app.MapDelete("/api/cliente/remover/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Cliente? clienteBuscado = ctx.Clientes.Find(id);

    if (clienteBuscado == null)
    {
        return Results.NotFound("Cliente não encontrado");
    }

    ctx.Clientes.Remove(clienteBuscado);
    ctx.SaveChanges();
    return Results.Ok("Cliente Removido!");
});

//Alterar Cliente
app.MapPatch("/api/cliente/alterar/{id}", ([FromRoute] int id, [FromBody] Cliente clienteAlterado, [FromServices] AppDbContext ctx) =>
{
    var clienteBuscado = ctx.Clientes.Find(id);
    if (clienteBuscado == null)
        return Results.NotFound("Cliente não encontrado.");

    clienteBuscado.Nome = clienteAlterado.Nome;
    clienteBuscado.Email = clienteAlterado.Email;
    clienteBuscado.Telefone = clienteAlterado.Telefone;

    ctx.Clientes.Update(clienteBuscado);
    ctx.SaveChanges();

    return Results.Ok("Cliente alterado com sucesso!");
});


app.Run();
