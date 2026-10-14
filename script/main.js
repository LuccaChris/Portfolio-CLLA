"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("#menu-toggle");
    const close = document.querySelector("#menu-close");
    const menu = document.querySelector("#mobile-menu");
    const main = document.querySelector("main");
    let previousOverflow = "";
    const setMenu = (open) => {
        if (!menu || !toggle)
            return;
        if (open) {
            previousOverflow = document.body.style.overflow;
        }
        menu.classList.toggle("hidden", !open);
        menu.classList.toggle("flex", open);
        toggle.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : previousOverflow;
        if (main) {
            main.inert = open;
        }
        (open ? close : toggle)?.focus();
    };
    toggle?.addEventListener("click", () => {
        setMenu(true);
    });
    close?.addEventListener("click", () => {
        setMenu(false);
    });
    menu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenu(false);
        });
    });
    document.addEventListener("keydown", (event) => {
        if (!menu || menu.classList.contains("hidden"))
            return;
        if (event.key === "Escape") {
            event.preventDefault();
            setMenu(false);
        }
        if (event.key === "Tab") {
            const items = Array.from(menu.querySelectorAll("button, a[href]"));
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        }
    });
    window
        .matchMedia("(min-width: 768px)")
        .addEventListener("change", (event) => {
        if (event.matches && menu && !menu.classList.contains("hidden")) {
            setMenu(false);
        }
    });
    document.querySelectorAll("[data-current-year]").forEach((el) => {
        el.textContent = String(new Date().getFullYear());
    });
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");
    let sending = false;
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (sending || !form.reportValidity() || !status) {
            return;
        }
        const data = new FormData(form);
        const payload = {
            nome: String(data.get("nome") ?? "").trim(),
            email: String(data.get("email") ?? "").trim(),
            conteudo: String(data.get("conteudo") ?? "").trim(),
        };
        if (!payload.nome || !payload.email || payload.conteudo.length < 10) {
            status.textContent =
                "Preencha seu nome, e-mail e uma mensagem com pelo menos 10 caracteres.";
            return;
        }
        const button = form.querySelector('button[type="submit"]');
        sending = true;
        if (button) {
            button.disabled = true;
            button.textContent = "Enviando…";
        }
        form.setAttribute("aria-busy", "true");
        status.textContent =
            "Enviando sua mensagem. O servidor pode levar alguns segundos para responder.";
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 60000);
        try {
            const response = await fetch(form.dataset.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });
            if (!response.ok) {
                status.textContent =
                    response.status === 429
                        ? "Limite de envios atingido. Aguarde alguns minutos e tente novamente."
                        : "Não foi possível confirmar o envio. Tente novamente ou use o e-mail abaixo.";
                return;
            }
            status.textContent =
                "Mensagem enviada com sucesso! Obrigado pelo contato.";
            form.reset();
        }
        catch {
            status.textContent =
                "Não foi possível confirmar o envio. Verifique sua conexão ou entre em contato pelo e-mail abaixo.";
        }
        finally {
            window.clearTimeout(timeout);
            sending = false;
            form.removeAttribute("aria-busy");
            if (button) {
                button.disabled = false;
                button.textContent = "Enviar Mensagem";
            }
        }
    });
    const projectCarousel = document.querySelector("#projectCarousel");
    const projectPrev = document.querySelector("#projectPrev");
    const projectNext = document.querySelector("#projectNext");
    const carouselProgress = document.querySelector("#carouselProgress");
    const getProjectScrollAmount = () => {
        if (!projectCarousel)
            return 0;
        const card = projectCarousel.querySelector(".carousel-card");
        if (!card)
            return 0;
        const styles = window.getComputedStyle(projectCarousel);
        const gap = parseFloat(styles.gap) || 24;
        return card.offsetWidth + gap;
    };
    projectNext?.addEventListener("click", () => {
        projectCarousel?.scrollBy({
            left: getProjectScrollAmount(),
            behavior: "smooth",
        });
    });
    projectPrev?.addEventListener("click", () => {
        projectCarousel?.scrollBy({
            left: -getProjectScrollAmount(),
            behavior: "smooth",
        });
    });
    projectCarousel?.addEventListener("scroll", () => {
        if (!projectCarousel || !carouselProgress) {
            return;
        }
        const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
        if (maxScroll <= 0) {
            carouselProgress.style.transform = "translateX(0%)";
            return;
        }
        const progress = projectCarousel.scrollLeft / maxScroll;
        carouselProgress.style.transform = `translateX(${progress * 300}%)`;
    });
});
