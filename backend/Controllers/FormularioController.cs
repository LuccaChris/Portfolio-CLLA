using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class FormularioController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public FormularioController(IHttpClientFactory factory, IConfiguration configuration)
    {
        _httpClient = factory.CreateClient("Telegram");
        _configuration = configuration;
    }

    [HttpPost]
    [EnableRateLimiting("contato")]
    [RequestSizeLimit(32768)]
    public async Task<IActionResult> EnviarMensagem([FromBody] Mensagem mensagem, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(mensagem.Nome) || mensagem.Conteudo.Trim().Length < 10)
            return BadRequest(new { mensagem = "Preencha o nome e uma mensagem com pelo menos 10 caracteres." });

        var botToken = _configuration["TELEGRAM_BOT_TOKEN"];
        var chatId = _configuration["TELEGRAM_CHAT_ID"];
        if (string.IsNullOrWhiteSpace(botToken) || string.IsNullOrWhiteSpace(chatId))
            return StatusCode(503, new { mensagem = "Contato temporariamente indisponível." });

        var texto = $"📬 Nova mensagem do portfólio:\n\n👤 {mensagem.Nome.Trim()}\n📧 {mensagem.Email.Trim()}\n📝 {mensagem.Conteudo.Trim()}";
        try
        {
            using var response = await _httpClient.PostAsJsonAsync(
                $"https://api.telegram.org/bot{botToken}/sendMessage",
                new { chat_id = chatId, text = texto }, cancellationToken);
            if (!response.IsSuccessStatusCode)
                return StatusCode(502, new { mensagem = "Não foi possível entregar a mensagem." });

            using var result = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync(cancellationToken), cancellationToken: cancellationToken);
            if (!result.RootElement.TryGetProperty("ok", out var ok) || ok.ValueKind != JsonValueKind.True)
                return StatusCode(502, new { mensagem = "Não foi possível confirmar a entrega." });

            return Ok(new { sucesso = true, mensagem = "Mensagem enviada!" });
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            return StatusCode(504, new { mensagem = "O serviço de mensagens demorou para responder." });
        }
        catch (HttpRequestException)
        {
            return StatusCode(502, new { mensagem = "Serviço de mensagens indisponível." });
        }
        catch (JsonException)
        {
            return StatusCode(502, new { mensagem = "Resposta inválida do serviço de mensagens." });
        }
    }
}
