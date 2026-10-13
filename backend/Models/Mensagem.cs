using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Mensagem
{
    [Required, StringLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(254)]
    public string Email { get; set; } = string.Empty;

    [Required, StringLength(3000, MinimumLength = 10)]
    public string Conteudo { get; set; } = string.Empty;
}
