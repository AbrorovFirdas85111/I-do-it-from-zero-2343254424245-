// cart.js - 0-200 qatorlar

// DOM elements for cart functionality
const cartContainer = document.querySelector('.cart-container');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const clearCartButton = document.querySelector('.clear-cart');
const checkoutButton = document.querySelector('.checkout');

// Store cart data in an array
let cartItems = [];

// Function to update the cart display
function updateCartDisplay() {
    // Clear the cart items list before updating
    cartItemsList.innerHTML = '';

    // Calculate the total price and update the cart count
    let total = 0;
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        
        // Append the item to the cart
        cartItemsList.appendChild(cartItemElement);

        // Update the total price
        total += item.price * item.quantity;
    });

    // Update the total price and the number of items in the cart
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cartItems.length;
}

// Function to add a product to the cart
function addProductToCart(product) {
    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        // If the product is already in the cart, increase the quantity
        cartItems[existingProductIndex].quantity += 1;
    } else {
        // If the product is not in the cart, add it
        const newProduct = {
            ...product,
            quantity: 1
        };
        cartItems.push(newProduct);
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to remove a product from the cart
function removeProductFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Function to increase the quantity of a product
function increaseProductQuantity(productId) {
    const productIndex = cartItems.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cartItems[productIndex].quantity += 1;
        updateCartDisplay();
    }
}

// Function to decrease the quantity of a product
function decreaseProductQuantity(productId) {
    const productIndex = cartItems.findIndex(item => item.id === productId);
    if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
        cartItems[productIndex].quantity -= 1;
        updateCartDisplay();
    }
}

// Event listeners for increasing, decreasing and removing items from the cart
cartItemsList.addEventListener('click', (event) => {
    const target = event.target;
    const productId = target.getAttribute('data-id');
    
    if (target.classList.contains('increase-quantity')) {
        increaseProductQuantity(productId);
    } else if (target.classList.contains('decrease-quantity')) {
        decreaseProductQuantity(productId);
    } else if (target.classList.contains('remove-item')) {
        removeProductFromCart(productId);
    }
});

// Event listener for clearing the cart
clearCartButton.addEventListener('click', () => {
    cartItems = [];
    updateCartDisplay();
});

// Event listener for checking out
checkoutButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
        // Proceed to checkout, show the checkout page or redirect to another page
        window.location.href = '/checkout.html';
    } else {
        alert('Your cart is empty!');
    }
});

// Function to initialize the cart from local storage
function initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        updateCartDisplay();
    }
}

// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Event listener to save the cart when the user leaves the page
window.addEventListener('beforeunload', saveCart);

// Initialize the cart when the page loads
initializeCart();

// Example function to add a product (for testing purposes)
function testAddProduct() {
    const product = {
        id: '1',
        name: 'Product Name',
        price: 29.99,
        image: 'product-image.jpg'
    };
    addProductToCart(product);
}

// Simulate adding a product for testing
testAddProduct();
// cart.js - 200-400 qatorlar

// Function to fetch product data from an API or local data
function fetchProductData(productId) {
    // Simulated product data fetch
    return {
        id: productId,
        name: 'Sample Product',
        price: 19.99,
        image: 'product-image.jpg'
    };
}

// Event listener to handle adding products to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-product-id');
        const product = fetchProductData(productId);

        addProductToCart(product);
    });
});

// Function to check if the cart is empty
function isCartEmpty() {
    return cartItems.length === 0;
}

// Function to display a message when the cart is empty
function displayEmptyCartMessage() {
    const emptyCartMessage = document.createElement('p');
    emptyCartMessage.textContent = 'Your cart is empty.';
    cartContainer.appendChild(emptyCartMessage);
}

// Function to update cart item count in the header
function updateCartCountHeader() {
    const cartCountHeader = document.querySelector('.cart-count-header');
    cartCountHeader.textContent = cartItems.length;
}

// Function to check if the cart has reached a certain quantity threshold
function checkCartQuantityThreshold() {
    if (cartItems.length > 10) {
        alert('You have more than 10 items in your cart. Consider checking out!');
    }
}

// Function to clear individual product from the cart by clicking "Remove"
function removeItemFromCartById(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

// Function to update the quantity of a product in the cart
function updateProductQuantityInCart(productId, newQuantity) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1 && newQuantity > 0) {
        cartItems[itemIndex].quantity = newQuantity;
        updateCartDisplay();
    }
}

// Function to reset cart data after checkout or clearing the cart
function resetCartData() {
    cartItems = [];
    updateCartDisplay();
    updateCartCountHeader();
}

// Adding event listeners for product quantity update
cartItemsList.addEventListener('click', (event) => {
    const target = event.target;
    const productId = target.getAttribute('data-id');

    // Increase or decrease product quantity
    if (target.classList.contains('increase-quantity')) {
        increaseProductQuantity(productId);
        checkCartQuantityThreshold();
    } else if (target.classList.contains('decrease-quantity')) {
        decreaseProductQuantity(productId);
    } else if (target.classList.contains('remove-item')) {
        removeItemFromCartById(productId);
    }
});

// Event listener to handle checkout button click
checkoutButton.addEventListener('click', () => {
    if (!isCartEmpty()) {
        // Proceed to checkout page
        window.location.href = '/checkout.html';
    } else {
        alert('Your cart is empty! Add items to your cart before checking out.');
    }
});

// Function to persist cart data in localStorage
function persistCartData() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Event listener to save cart data before leaving the page
window.addEventListener('beforeunload', () => {
    persistCartData();
});

// Function to fetch cart data from localStorage
function fetchCartFromLocalStorage() {
    const storedCartData = localStorage.getItem('cart');
    if (storedCartData) {
        cartItems = JSON.parse(storedCartData);
        updateCartDisplay();
    }
}

// Calling fetchCartFromLocalStorage when the page loads
fetchCartFromLocalStorage();

// Example function to simulate adding a product (for testing purposes)
function simulateAddingProduct() {
    const product = {
        id: '1',
        name: 'Sample Product',
        price: 19.99,
        image: 'product-image.jpg'
    };
    addProductToCart(product);
}

// Simulate adding a product (for testing purposes)
simulateAddingProduct();

// Function to update the cart UI when an item is added
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-container');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');

    cartItemsList.innerHTML = '';

    let total = 0;
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsList.appendChild(cartItemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cartItems.length;

    if (cartItems.length === 0) {
        displayEmptyCartMessage();
    }
}
// cart.js - 400-500 qatorlar

// Function to handle cart update on page load
function initializeCart() {
    if (cartItems.length > 0) {
        updateCartDisplay();
    } else {
        displayEmptyCartMessage();
    }
}

// Function to display empty cart message
function displayEmptyCartMessage() {
    const cartContainer = document.querySelector('.cart-container');
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your cart is empty. Start shopping!';
    emptyMessage.classList.add('empty-cart-message');
    cartContainer.appendChild(emptyMessage);
}

// Function to display cart details (items and total)
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-container');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');

    cartItemsList.innerHTML = '';
    let totalAmount = 0;

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsList.appendChild(cartItemElement);
        totalAmount += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${totalAmount.toFixed(2)}`;
    cartCount.textContent = cartItems.length;

    if (cartItems.length === 0) {
        displayEmptyCartMessage();
    }
}

// Function to add a product to the cart
function addProductToCart(product) {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cartItems.push(product);
    }
    updateCartDisplay();
}

// Function to remove product from the cart
function removeProductFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateCartDisplay();
    }
}

// Function to increase product quantity
function increaseProductQuantity(productId) {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
        updateCartDisplay();
    }
}

// Function to decrease product quantity
function decreaseProductQuantity(productId) {
    const product = cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCartDisplay();
    }
}

// Function to handle "Proceed to Checkout" button click
function handleCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to the cart before proceeding.');
        return;
    }

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Event listeners for cart actions
document.querySelector('.cart-container').addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('remove-item')) {
        const productId = target.getAttribute('data-id');
        removeProductFromCart(productId);
    } else if (target.classList.contains('increase-quantity')) {
        const productId = target.getAttribute('data-id');
        increaseProductQuantity(productId);
    } else if (target.classList.contains('decrease-quantity')) {
        const productId = target.getAttribute('data-id');
        decreaseProductQuantity(productId);
    }
});

// Event listener for the checkout button
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.addEventListener('click', handleCheckout);

// Function to save the cart data to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to load the cart data from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Load cart data on page load
loadCartFromLocalStorage();

// Event listener to save cart to localStorage when the page is unloaded
window.addEventListener('beforeunload', saveCartToLocalStorage);

// Function to clear the cart
function clearCart() {
    cartItems = [];
    updateCartDisplay();
}

// Event listener to clear the cart
document.querySelector('.clear-cart-button').addEventListener('click', clearCart);

// Simulating the checkout process
function simulateCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add some items.');
        return;
    }

    // For the purpose of simulation, we are logging the cart data
    console.log('Proceeding to checkout with the following items:');
    cartItems.forEach(item => {
        console.log(`Product: ${item.name}, Quantity: ${item.quantity}, Price: $${item.price}`);
    });

    // Redirecting to checkout page
    window.location.href = 'checkout.html';
}

// Simulate checkout when button is clicked
document.querySelector('.simulate-checkout-button').addEventListener('click', simulateCheckout);

// Function to apply discount
function applyDiscountCode(discountCode) {
    if (discountCode === 'DISCOUNT10') {
        let discount = 10;
        let totalAmount = calculateTotalAmount();
        let discountedAmount = totalAmount - (totalAmount * (discount / 100));
        alert(`Discount applied! New total: $${discountedAmount.toFixed(2)}`);
    } else {
        alert('Invalid discount code.');
    }
}

// Function to calculate the total amount
function calculateTotalAmount() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Event listener for discount code input
document.querySelector('.apply-discount-button').addEventListener('click', () => {
    const discountCode = document.querySelector('.discount-code-input').value;
    applyDiscountCode(discountCode);
});

// Final confirmation before checkout
function finalCheckoutConfirmation() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items before proceeding.');
        return;
    }

    const totalAmount = calculateTotalAmount();
    if (confirm(`You are about to checkout with a total of $${totalAmount.toFixed(2)}. Do you want to proceed?`)) {
        window.location.href = 'checkout.html';
    }
}

// Final confirmation before clicking checkout button
document.querySelector('.final-checkout-button').addEventListener('click', finalCheckoutConfirmation);
