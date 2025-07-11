using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormularioController : ControllerBase
    {
        [HttpPost]
        public IActionResult EnviarMensagem([FromBody] Mensagem mensagem)
        {
            Console.WriteLine($"Nome: {mensagem.Nome}, Email: {mensagem.Email}, Mensagem: {mensagem.Conteudo}");

            // Futuro: salvar no banco, enviar e-mail, etc.
            return Ok(new { sucesso = true, mensagem = "Mensagem recebida com sucesso!" });
        }
    }
}
