document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('toggleDarkMode');
    const targetElement = document.getElementById('targetElement');

    button.addEventListener('click', function() {
        if (targetElement.id === 'targetElement') {
            targetElement.id = 'fark';
        } else {
            targetElement.id = 'targetElement';
        }
    });
});

document.getElementById('toggleMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.navbar').classList.toggle('navbar-dark-mode');
    document.querySelector('.navbar').classList.toggle('navbar-light-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Dia' : 'Modo Noche';
});


document.addEventListener("DOMContentLoaded", function() {
    const fadeContainer = document.querySelector('.fade-container');
    window.addEventListener('scroll', function() {
        const rect = fadeContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.8) {
            fadeContainer.style.transition = 'opacity 1s ease-in-out';
            fadeContainer.style.opacity = 1;
        } else {
            fadeContainer.style.opacity = 0;
        }
    });
});