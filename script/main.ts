document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle') as HTMLElement | null;
    const menuClose = document.getElementById('menu-close') as HTMLElement | null;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLElement | null;
    const mobileLinks = document.querySelectorAll('.mobile-link') as NodeListOf<HTMLElement>;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });
    });

    const form = document.querySelector('form') as HTMLFormElement;
form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const conteudo = (document.getElementById('message') as HTMLTextAreaElement).value;

    const payload = { nome, email, conteudo };

    try {
        const res = await fetch('https://portfolio-clla.onrender.com/api/formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        } else {
            alert('Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error(error);
        alert('Erro de conexão com o servidor');
    }
});
});

function downloadcv(): void {
    const link = document.createElement('a');
    link.href = 'assets/curriculo/Currículo Christian 2025.pdf'; // caminho correto no seu projeto
    link.download = 'Christian_Amaral_Curriculo.pdf'; // nome do arquivo ao baixar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Exemplo: conectar com o botão via id
document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.getElementById('btn-download-cv');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadcv);
    }
});
