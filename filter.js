// filter.js - 0-200 qatorlar

// Function to filter products by category
const categoryFilters = document.querySelectorAll('.category-filter');
const products = document.querySelectorAll('.product');

categoryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const category = filter.getAttribute('data-category');
        filterProductsByCategory(category);
    });
});

function filterProductsByCategory(category) {
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to filter products by price range
const priceSlider = document.querySelector('#price-range');
const priceOutput = document.querySelector('#price-output');

priceSlider.addEventListener('input', () => {
    const priceValue = priceSlider.value;
    priceOutput.textContent = `$${priceValue}`;
    filterProductsByPrice(priceValue);
});

function filterProductsByPrice(maxPrice) {
    products.forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));
        if (productPrice <= maxPrice) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to filter products by rating
const ratingFilters = document.querySelectorAll('.rating-filter');

ratingFilters.forEach(ratingFilter => {
    ratingFilter.addEventListener('click', () => {
        const rating = ratingFilter.getAttribute('data-rating');
        filterProductsByRating(rating);
    });
});

function filterProductsByRating(rating) {
    products.forEach(product => {
        const productRating = parseFloat(product.getAttribute('data-rating'));
        if (productRating >= rating) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to clear all filters
const clearFiltersButton = document.querySelector('#clear-filters');

clearFiltersButton.addEventListener('click', () => {
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
    });
    priceSlider.value = priceSlider.max;
    priceOutput.textContent = `$${priceSlider.max}`;
    filterProductsByPrice(priceSlider.max);
    products.forEach(product => {
        product.classList.remove('hidden');
    });
});

// Search bar functionality to filter products by name
const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterProductsBySearchTerm(searchTerm);
});

function filterProductsBySearchTerm(term) {
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(term)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Sorting functionality
const sortBySelect = document.querySelector('#sort-by');

sortBySelect.addEventListener('change', () => {
    const sortBy = sortBySelect.value;
    sortProducts(sortBy);
});

function sortProducts(criteria) {
    const sortedProducts = Array.from(products);
    if (criteria === 'price-asc') {
        sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB;
        });
    } else if (criteria === 'price-desc') {
        sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceB - priceA;
        });
    } else if (criteria === 'rating-asc') {
        sortedProducts.sort((a, b) => {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            return ratingA - ratingB;
        });
    } else if (criteria === 'rating-desc') {
        sortedProducts.sort((a, b) => {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            return ratingB - ratingA;
        });
    }

    // Re-append sorted products to the product container
    const productContainer = document.querySelector('.product-container');
    sortedProducts.forEach(product => {
        productContainer.appendChild(product);
    });
}

// Function to initialize the filters on page load
window.addEventListener('load', () => {
    filterProductsByPrice(priceSlider.max);
});
// filter.js - 200-300 qatorlar

// Function to handle the category selection and activate/deactivate the filter buttons
categoryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const category = filter.getAttribute('data-category');
        // Toggle active class on filters for visual feedback
        categoryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        filterProductsByCategory(category);
    });
});

// Function to apply the category filter
function filterProductsByCategory(category) {
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to handle price range slider functionality
priceSlider.addEventListener('input', () => {
    const priceValue = priceSlider.value;
    priceOutput.textContent = `$${priceValue}`;
    filterProductsByPrice(priceValue);
});

// Function to filter products based on price
function filterProductsByPrice(maxPrice) {
    products.forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));
        if (productPrice <= maxPrice) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to handle filtering based on rating
ratingFilters.forEach(ratingFilter => {
    ratingFilter.addEventListener('click', () => {
        const rating = ratingFilter.getAttribute('data-rating');
        filterProductsByRating(rating);
    });
});

// Function to filter products by rating
function filterProductsByRating(rating) {
    products.forEach(product => {
        const productRating = parseFloat(product.getAttribute('data-rating'));
        if (productRating >= rating) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to reset all filters to default state
clearFiltersButton.addEventListener('click', () => {
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
    });
    // Reset price slider to max value and show all products
    priceSlider.value = priceSlider.max;
    priceOutput.textContent = `$${priceSlider.max}`;
    filterProductsByPrice(priceSlider.max);
    // Show all products
    products.forEach(product => {
        product.classList.remove('hidden');
    });
});

// Function to handle the search input for product names
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterProductsBySearchTerm(searchTerm);
});

// Function to filter products by the search term
function filterProductsBySearchTerm(term) {
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(term)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// Function to handle sorting of products by price and rating
sortBySelect.addEventListener('change', () => {
    const sortBy = sortBySelect.value;
    sortProducts(sortBy);
});

// Function to sort products by different criteria
function sortProducts(criteria) {
    const sortedProducts = Array.from(products);
    if (criteria === 'price-asc') {
        sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB;
        });
    } else if (criteria === 'price-desc') {
        sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceB - priceA;
        });
    } else if (criteria === 'rating-asc') {
        sortedProducts.sort((a, b) => {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            return ratingA - ratingB;
        });
    } else if (criteria === 'rating-desc') {
        sortedProducts.sort((a, b) => {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            return ratingB - ratingA;
        });
    }

    // Re-append sorted products to the container to update the view
    const productContainer = document.querySelector('.product-container');
    sortedProducts.forEach(product => {
        productContainer.appendChild(product);
    });
}

// Initialize the filters and set the default settings on page load
window.addEventListener('load', () => {
    filterProductsByPrice(priceSlider.max); // Show products based on max price by default
    categoryFilters[0].classList.add('active'); // Set the first category filter as active
});
