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

    const contactForm = document.querySelector('form') as HTMLFormElement | null;
    if (contactForm) {
        contactForm.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            alert('Obrigado pela sua mensagem! Em um ambiente real, isso seria enviado para um servidor.');
            contactForm.reset();
        });
    }
});
