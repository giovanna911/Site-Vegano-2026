/* ==========================================================================
   1. LÓGICA DO CARROSSEL (SLIDER)
   ========================================================================== */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval = setInterval(nextSlide, 5000); // Troca automática a cada 5s

/**
 * Exibe o slide baseado no índice fornecido
 */
function showSlide(index) {
    // Ajusta o índice para ser cíclico
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Remove classes ativas de todos
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Adiciona classe ativa apenas ao slide atual
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Função para os botões Próximo e Anterior
 */
function changeSlide(direction) {
    resetTimer();
    showSlide(currentSlide + direction);
}

/**
 * Função para clicar diretamente nos pontos (dots)
 */
function currentSlideTo(index) {
    resetTimer();
    showSlide(index);
}

/**
 * Avança para o próximo slide (usado pelo intervalo automático)
 */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/**
 * Reinicia o temporizador para evitar que o slide mude 
 * logo após uma interação manual do usuário
 */
function resetTimer() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

/* ==========================================================================
   2. EFEITO DO HEADER (MUDANÇA AO ROLAR)
   ========================================================================== */
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    // Adiciona a classe 'scrolled' se a rolagem for maior que 50px
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ==========================================================================
   3. EFEITO DE REVELAR/ESCONDER (INTERSECTION OBSERVER)
   ========================================================================== */
const observerOptions = {
    threshold: 0.1,         // Dispara quando 10% do elemento está visível
    rootMargin: "0px 0px -50px 0px" // Margem inferior para o efeito ser mais suave
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Elemento entra na tela
            entry.target.classList.add('visible');
        } else {
            // Elemento sai da tela (permite o efeito de sumir e aparecer de novo)
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Aplica o observador em todos os elementos que devem "revelar"
const elementsToAnimate = document.querySelectorAll('.reveal, .slider-container, .feature-item');

elementsToAnimate.forEach(el => {
    // Garante que todos tenham a classe base 'reveal' para o CSS funcionar
    el.classList.add('reveal'); 
    revealObserver.observe(el);
});

window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150; // Ajuste quanto antes o efeito começa
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Executa uma vez ao carregar para mostrar elementos que já estão no topo
reveal();

function toggleAlerta() {
    const alerta = document.getElementById('aviso-venda');
    const btnReabrir = document.getElementById('btn-reabrir');

    if (alerta.style.display === 'none') {
        alerta.style.display = 'block';
        btnReabrir.style.display = 'none';
    } else {
        alerta.style.display = 'none';
        btnReabrir.style.display = 'block';
    }
}