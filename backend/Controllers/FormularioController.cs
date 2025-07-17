using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class FormularioController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public FormularioController(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpPost]
    public async Task<IActionResult> EnviarMensagem([FromBody] Mensagem mensagem)
    {
        var botToken = "8152742583:AAEh2upOA9OCaANppm1FTVEsiQ0A9uIt_mY";
        var chatId = "5861319589";
        var texto = $"📬 Nova mensagem do portfólio:\n\n👤 *{mensagem.Nome}*\n📧 {mensagem.Email}\n📝 {mensagem.Conteudo}";

        var url = $"https://api.telegram.org/bot{botToken}/sendMessage?chat_id={chatId}&text={Uri.EscapeDataString(texto)}";

        await _httpClient.GetAsync(url);

        return Ok(new { sucesso = true, mensagem = "Mensagem enviada para o Telegram!" });
    }
}