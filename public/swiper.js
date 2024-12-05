document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide-text');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }
    
    showSlide(slideIndex);
    setInterval(nextSlide, 3000);
});
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.getElementById('scroll-button');
    const scrollToElement = document.getElementById('destino');

    function scrollToDest() {
        scrollToElement.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    scrollButton.addEventListener('click', scrollToDest);
});
