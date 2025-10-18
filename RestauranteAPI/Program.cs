using Microsoft.AspNetCore.Mvc;
using ProjetoRestaurante.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
var app = builder.Build();

app.MapGet("/", () => "RESTAURANTE!");

//CRUD DE CLIENTE

app.MapGet("/api/cliente/listar", ([FromServicesAttribute] AppDbContext ctx) =>
{
    if (ctx.Clientes.Any())
    {
        return Results.Ok(ctx.Clientes.ToList());
    }
    return Results.BadRequest("A lista de clientes está vazia!");

});

app.MapGet("/api/cliente/buscar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var clienteBuscado = ctx.Clientes.Find(id);
    if (clienteBuscado == null)
        return Results.NotFound("Cliente não encontrado.");
    return Results.Ok(clienteBuscado);

});

app.MapPost("/api/cliente/cadastrar", ([FromBodyAttribute] Cliente cliente, [FromServicesAttribute] AppDbContext ctx) =>
{
    var existente = ctx.Clientes.FirstOrDefault(c => c.Email == cliente.Email);
    if (existente != null)
        return Results.Conflict("Cliente já cadastrado!");

    ctx.Clientes.Add(cliente);
    ctx.SaveChanges();
    return Results.Created("", cliente);

});

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

//CRUD DE MESA

app.MapGet("/api/mesa/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Mesas.Any())
    {
        return Results.Ok(ctx.Mesas.ToList());
    }
    return Results.BadRequest("A lista de mesas está vazia!");
});

app.MapGet("/api/mesa/buscar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var mesaBuscada = ctx.Mesas.Find(id);
    if (mesaBuscada == null)
        return Results.NotFound("Mesa não encontrada.");

    return Results.Ok(mesaBuscada);
});

app.MapPost("/api/mesa/cadastrar", ([FromBody] Mesa mesa, [FromServices] AppDbContext ctx) =>
{
    var existente = ctx.Mesas.FirstOrDefault(m => m.Numero == mesa.Numero);
    if (existente != null)
        return Results.Conflict("Já existe uma mesa com esse número.");

    ctx.Mesas.Add(mesa);
    ctx.SaveChanges();
    return Results.Created("", mesa);
});

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

app.MapDelete("/api/mesa/remover/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Mesa? mesa = ctx.Mesas.Find(id);
    if (mesa == null)
        return Results.NotFound("Mesa não encontrada.");

    ctx.Mesas.Remove(mesa);
    ctx.SaveChanges();
    return Results.Ok("Mesa removida com sucesso!");
});

//CRUD DE RESERVA

app.MapGet("/api/reserva/listar", ([FromServices] AppDbContext ctx) =>
{
    var reservas = ctx.Reservas
        .Include(r => r.Cliente)
        .Include(r => r.Mesa)
        .ToList();

    if (reservas.Any())
    {
        return Results.Ok(reservas);
    }
    return Results.NotFound("Nenhuma reserva encontrada.");
});

app.MapGet("/api/reserva/buscar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var reserva = ctx.Reservas
        .Include(r => r.Cliente)
        .Include(r => r.Mesa)
        .FirstOrDefault(r => r.Id == id);

    if (reserva == null)
        return Results.NotFound("Reserva não encontrada.");

    return Results.Ok(reserva);
});

app.MapPost("/api/reserva/cadastrar", ([FromBody] Reserva reserva, [FromServices] AppDbContext ctx) =>
{
    var cliente = ctx.Clientes.Find(reserva.ClienteId);
    if (cliente == null)
        return Results.NotFound("Cliente não encontrado.");

    var mesa = ctx.Mesas.Find(reserva.MesaId);
    if (mesa == null)
        return Results.NotFound("Mesa não encontrada.");

    bool mesaOcupada = ctx.Reservas.Any(r =>
        r.MesaId == reserva.MesaId &&
        r.DataHora == reserva.DataHora
    );

    if (mesaOcupada)
    {
        return Results.Conflict("A mesa já está reservada para este horário.");
    }

    ctx.Reservas.Add(reserva);
    ctx.SaveChanges();
    return Results.Created($"/api/reserva/buscar/{reserva.Id}", reserva);
});

app.MapPatch("/api/reserva/alterar/{id}", ([FromRoute] int id, [FromBody] Reserva reservaAlterada, [FromServices] AppDbContext ctx) =>
{
    var reservaBuscada = ctx.Reservas.Find(id);
    if (reservaBuscada == null)
        return Results.NotFound("Reserva não encontrada.");

    if (reservaBuscada.ClienteId != reservaAlterada.ClienteId)
    {
        var cliente = ctx.Clientes.Find(reservaAlterada.ClienteId);
        if (cliente == null)
            return Results.NotFound("Novo cliente não encontrado.");
    }
    if (reservaBuscada.MesaId != reservaAlterada.MesaId)
    {
        var mesa = ctx.Mesas.Find(reservaAlterada.MesaId);
        if (mesa == null)
            return Results.NotFound("Nova mesa não encontrada.");
    }

    bool mesaOcupada = ctx.Reservas.Any(r =>
        r.Id != id && 
        r.MesaId == reservaAlterada.MesaId &&
        r.DataHora == reservaAlterada.DataHora
    );

    if (mesaOcupada)
    {
        return Results.Conflict("A mesa já está reservada para este novo horário.");
    }

    reservaBuscada.ClienteId = reservaAlterada.ClienteId;
    reservaBuscada.MesaId = reservaAlterada.MesaId;
    reservaBuscada.DataHora = reservaAlterada.DataHora;

    ctx.Reservas.Update(reservaBuscada);
    ctx.SaveChanges();
    return Results.Ok("Reserva alterada com sucesso!");
});

app.MapDelete("/api/reserva/remover/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Reserva? reserva = ctx.Reservas.Find(id);
    if (reserva == null)
        return Results.NotFound("Reserva não encontrada.");

    ctx.Reservas.Remove(reserva);
    ctx.SaveChanges();
    return Results.Ok("Reserva removida com sucesso!");
});

app.Run();