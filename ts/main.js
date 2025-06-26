document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var menuClose = document.getElementById('menu-close');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileLinks = document.querySelectorAll('.mobile-link');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
    }
    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    }
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });
    });
    var contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Obrigado pela sua mensagem! Em um ambiente real, isso seria enviado para um servidor.');
            contactForm.reset();
        });
    }
});
