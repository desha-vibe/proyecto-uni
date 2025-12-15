let currentSlide = 0;
const slides = document.querySelectorAll('.hero-section');
const totalSlides = slides.length;
let autoPlayInterval;

function createIndicators() {
    const indicatorsContainer = document.getElementById('carousel-indicators');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('indicator-dot');
        dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
    }
}

function goToSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    currentSlide = n;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
    
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    resetAutoPlay();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

function initCarousel() {
    document.getElementById('next-slide').addEventListener('click', nextSlide);
    document.getElementById('prev-slide').addEventListener('click', prevSlide);

    const carouselContainer = document.querySelector('.hero-carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide(); // Swipe izquierda
        if (touchEndX > touchStartX + 50) prevSlide(); // Swipe derecha
    }

    createIndicators();
    startAutoPlay();
}


function hacerTest() {
    const resultado = document.getElementById('resultado-test');
    const tipos = ['Piel de gallina', 'Verde', 'Algodón de azucar', 'Chuec', 'Brillante como diamante', 'Chocolate', 'Bob esponja', 'Piel de salamandra'];
    const randomTipo = tipos[Math.floor(Math.random() * tipos.length)];
    
    resultado.innerHTML = `Analizando... 🧪`;
    
    setTimeout(() => {
        resultado.innerHTML = `Según nuestro algoritmo rápido, tu piel parece ser: <strong>${randomTipo}</strong> ✨`;
    }, 1000);
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function irATiendaConFiltro(filtro) {
    window.location.href = `pages/tienda.html?filtro=${filtro}`;
}

function initNavigation() {
    document.getElementById('marcas').addEventListener('click', () => scrollToSection('marcas-populares'));
    document.getElementById('tipo-de-piel').addEventListener('click', () => scrollToSection('tipo-de-piel-q'));
    document.getElementById('skincare').addEventListener('click', () => scrollToSection('pasos-de-tu-rutina'));
    document.getElementById('inicio').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
    const logo = document.querySelector('.logo-imagen');
    if (logo) {
        logo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initNavigation();
    
    console.log("Sistema de Capturando Momentos inicializado correctamente. 🚀");
});