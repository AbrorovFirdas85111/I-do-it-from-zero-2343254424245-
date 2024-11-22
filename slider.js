// slider.js - 0-200 qator kod

// Select necessary DOM elements
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.slider-item');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
const paginationDots = document.querySelector('.slider-pagination-dots');

let currentSlide = 0;
const totalSlides = sliderItems.length;
const slideWidth = sliderItems[0].offsetWidth;
let isTransitioning = false;

// Set initial styles and positions
function initializeSlider() {
    sliderTrack.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    createPaginationDots();
    updatePagination();
}
initializeSlider();

// Move to the next slide
function moveToNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide++;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    updateSliderPosition();
    updatePagination();
}

// Move to the previous slide
function moveToPrevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateSliderPosition();
    updatePagination();
}

// Update the slider's position
function updateSliderPosition() {
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(${-currentSlide * slideWidth}px)`;

    sliderTrack.addEventListener('transitionend', () => {
        isTransitioning = false;
    });
}

// Create pagination dots
function createPaginationDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        paginationDots.appendChild(dot);

        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            moveToSlide(index);
        });
    }
}

// Move to a specific slide
function moveToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide = index;
    updateSliderPosition();
    updatePagination();
}

// Update pagination dots
function updatePagination() {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Handle touch events for mobile
let startX = 0;
let endX = 0;

sliderTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sliderTrack.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

// Handle swipe gesture
function handleSwipe() {
    const threshold = 50; // Minimum distance to detect a swipe
    const swipeDistance = startX - endX;

    if (swipeDistance > threshold) {
        moveToNextSlide();
    } else if (swipeDistance < -threshold) {
        moveToPrevSlide();
    }
}

// Add event listeners to navigation buttons
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Auto-slide functionality
let autoSlideInterval = setInterval(() => {
    moveToNextSlide();
}, 5000);

// Pause auto-slide on hover
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        moveToNextSlide();
    }, 5000);
});

// Resize event listener to handle responsive behavior
window.addEventListener('resize', () => {
    const newSlideWidth = sliderItems[0].offsetWidth;
    sliderTrack.style.transition = 'none';
    sliderTrack.style.transform = `translateX(${-currentSlide * newSlideWidth}px)`;
});
