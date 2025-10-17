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

// ==========================================
// CRUD DE MESA
// ==========================================

app.MapGet("/api/mesa/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Mesas.Any())
    {
        return Results.Ok(ctx.Mesas.ToList());
    }
    return Results.BadRequest("A lista de mesas está vazia!");
});


//Buscar mesa pelo ID 
app.MapGet("/api/mesa/buscar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var mesaBuscada = ctx.Mesas.Find(id);
    if (mesaBuscada == null)
        return Results.NotFound("Mesa não encontrada.");

    return Results.Ok(mesaBuscada);
});

//Cadastrar mesa
app.MapPost("/api/mesa/cadastrar", ([FromBody] Mesa mesa, [FromServices] AppDbContext ctx) =>
{
    var existente = ctx.Mesas.FirstOrDefault(m => m.Numero == mesa.Numero);
    if (existente != null)
        return Results.Conflict("Já existe uma mesa com esse número.");

    ctx.Mesas.Add(mesa);
    ctx.SaveChanges();
    return Results.Created("", mesa);
});

//Alterar mesa
app.MapPatch("/api/mesa/alterar/{id}", ([FromRoute] int id, [FromBody] Mesa mesaAlterada, [FromServices] AppDbContext ctx) =>
{
    var mesa = ctx.Mesas.Find(id);
    if (mesa == null)
        return Results.NotFound("Mesa não encontrada.");

    mesa.Numero = mesaAlterada.Numero;
    mesa.Capacidade = mesaAlterada.Capacidade;
    mesa.Disponivel = mesaAlterada.Disponivel;

    ctx.Mesas.Update(mesa);
    ctx.SaveChanges();
    return Results.Ok("Mesa alterada com sucesso!");
});

//Remover mesa
app.MapDelete("/api/mesa/remover/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Mesa? mesa = ctx.Mesas.Find(id);
    if (mesa == null)
        return Results.NotFound("Mesa não encontrada.");

    ctx.Mesas.Remove(mesa);
    ctx.SaveChanges();
    return Results.Ok("Mesa removida com sucesso!");
});


app.Run();
