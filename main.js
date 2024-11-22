// main.js - Asosiy JavaScript fayli

// DOM elementlarini olish
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const form = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');
const searchInput = document.querySelector('.search-input');

// Mobil menyu ochish
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Modal oynasini ochish
document.querySelector('.open-modal-btn').addEventListener('click', () => {
    modal.classList.add('show');
});

// Modal oynasini yopish
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Kontakt formasi validatsiyasi
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Formani tekshirish
    if (name && email && message) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Yuborilmoqda...';

        // AJAX so'rovi yuborish (masalan, serverga)
        setTimeout(() => {
            alert('Formaningiz muvaffaqiyatli yuborildi!');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Yuborish';
        }, 2000);
    } else {
        alert('Iltimos, barcha maydonlarni to\'ldiring.');
    }
});

// Qidiruv funksiyasi
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.product-item');
    
    items.forEach(item => {
        const title = item.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Animatsiya funksiyasi
const scrollElements = document.querySelectorAll('.animate-on-scroll');
window.addEventListener('scroll', () => {
    scrollElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('in-view');
        }
    });
});

// Formani yuborishdan oldin formadagi barcha inputlarni tekshirish
function validateFormInputs(inputs) {
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// Navbar uchun sticky effekt
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// To'liq ekranli rejim
const fullscreenBtn = document.querySelector('.fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
});

// Toast notifications (masalan, muvaffaqiyatli ish tugagach)
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// main.js - Asosiy JavaScript fayli davom etadi

// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        filterProducts(category);
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || category === productCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add product to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product-item');
        const productId = product.dataset.id;
        const productName = product.querySelector('.product-title').textContent;
        const productPrice = product.querySelector('.product-price').textContent;

        addToCart(productId, productName, productPrice);
    });
});

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Show cart items
const cartModal = document.querySelector('.cart-modal');
const cartToggleButton = document.querySelector('.cart-toggle');
cartToggleButton.addEventListener('click', () => {
    cartModal.classList.toggle('show');
    loadCartItems();
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';  // Clear existing items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price}</span>
            <span class="cart-item-quantity">x${item.quantity}</span>
            <button class="remove-item-btn" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Add remove item functionality
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Checkout process
const checkoutButton = document.querySelector('.checkout-btn');
checkoutButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Sizning savatingiz bo\'sh!');
        return;
    }

    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    alert(`Sizning jami to'lovingiz: $${totalAmount.toFixed(2)}`);
    localStorage.removeItem('cart');
    updateCartCount();
    cartModal.classList.remove('show');
});

// Scroll Animations
const scrollElements = document.querySelectorAll('.animate-scroll');
window.addEventListener('scroll', () => {
    scrollElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;

        if (elementPosition < screenPosition) {
            element.classList.add('in-view');
        }
    });
});

// Image Slider (example)
const sliderImages = document.querySelectorAll('.slider-img');
let currentSlideIndex = 0;
const totalSlides = sliderImages.length;
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

function showSlide(index) {
    if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlideIndex = 0;
    }

    sliderImages.forEach((img, i) => {
        img.style.display = i === currentSlideIndex ? 'block' : 'none';
    });
}

nextButton.addEventListener('click', () => {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
});

prevButton.addEventListener('click', () => {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
});

showSlide(currentSlideIndex);

// Modal for images or product details
const modalBtns = document.querySelectorAll('.modal-btn');
modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const imageUrl = btn.dataset.image;
        openImageModal(imageUrl);
    });
});

const modalContainer = document.querySelector('.image-modal');
const modalImage = document.querySelector('.modal-image');
const modalClose = document.querySelector('.modal-close');

function openImageModal(imageUrl) {
    modalImage.src = imageUrl;
    modalContainer.classList.add('show');
}

modalClose.addEventListener('click', () => {
    modalContainer.classList.remove('show');
});
// main.js - 400-500 qatorlar

// Function to handle scroll to top
const scrollToTopButton = document.querySelector("#scrollToTopBtn");
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Hamburger Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Modal Window for Product Details
const modal = document.querySelector('.modal');
const modalCloseButton = modal.querySelector('.close-modal');
const modalOpenButtons = document.querySelectorAll('.product-detail-button');

modalOpenButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.add('open');
    });
});

modalCloseButton.addEventListener('click', () => {
    modal.classList.remove('open');
});

// Carousel Initialization
const carousel = document.querySelector('.carousel');
const slides = carousel.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});

// Tooltip Functionality
const tooltipElements = document.querySelectorAll('.tooltip');

tooltipElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip-text');
        tooltip.innerText = tooltipText;
        element.appendChild(tooltip);
    });

    element.addEventListener('mouseout', () => {
        const tooltip = element.querySelector('.tooltip-text');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Product Quantity Adjustment in Cart
const increaseButtons = document.querySelectorAll('.increase-quantity');
const decreaseButtons = document.querySelectorAll('.decrease-quantity');

increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quantityInput = button.closest('.product').querySelector('.quantity-input');
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
});

decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quantityInput = button.closest('.product').querySelector('.quantity-input');
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
});

// Event Listener for Checkout Form Validation
const checkoutForm = document.querySelector('#checkout-form');
const submitButton = checkoutForm.querySelector('button[type="submit"]');

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Check if all fields are filled out
    checkoutForm.querySelectorAll('input, select').forEach(input => {
        if (input.value === '') {
            valid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // If valid, submit the form
    if (valid) {
        checkoutForm.submit();
    } else {
        alert('Please fill all the fields correctly.');
    }
});
