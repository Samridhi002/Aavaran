// Sample product data
const products = [
    { id: 1, name: "Bamboo Toothbrush", price: 4.99, ecoScore: 9.5, category: "Bathroom", description: "Eco-friendly alternative to plastic toothbrushes." },
    { id: 2, name: "Reusable Water Bottle", price: 19.99, ecoScore: 9.0, category: "On-the-go", description: "Durable stainless steel bottle to reduce plastic waste." },
    { id: 3, name: "Organic Cotton Tote", price: 14.99, ecoScore: 8.5, category: "On-the-go", description: "Sturdy tote bag made from organic cotton." },
    { id: 4, name: "Beeswax Food Wraps", price: 12.99, ecoScore: 9.2, category: "Kitchen", description: "Reusable alternative to plastic wrap for food storage." },
    { id: 5, name: "Bamboo Cutlery Set", price: 9.99, ecoScore: 8.8, category: "Kitchen", description: "Portable cutlery set made from sustainable bamboo." },
    { id: 6, name: "Reusable Produce Bags", price: 7.99, ecoScore: 9.3, category: "Kitchen", description: "Mesh bags for plastic-free grocery shopping." },
];

// DOM elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const categoryFilters = document.getElementById('categoryFilters');
const priceRange = document.getElementById('priceRange');
const priceRangeValue = document.getElementById('priceRangeValue');
const ecoScoreSelect = document.getElementById('ecoScoreSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const themeToggle = document.getElementById('themeToggle');

// State
let viewMode = 'grid';
let filters = {
    category: [],
    priceRange: 100,
    ecoScore: 0
};
let cart = [];

// Initialize the page
function init() {
    renderProducts();
    renderCategoryFilters();
    setupEventListeners();
    initializeAnimations();
    updateFeaturedProduct();
    updateEcoImpact();
    lucide.createIcons();
}

// Render products
function renderProducts() {
    const filteredProducts = filterProducts();
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card ${viewMode === 'list' ? 'list-view' : ''}" data-aos="fade-up">
            <div class="product-image">
                <img src="/api/placeholder/300/200?text=${product.name}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <span class="eco-score">Eco Score: ${product.ecoScore}</span>
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    <i data-lucide="shopping-cart" class="mr-2"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Filter products based on current filters
function filterProducts() {
    return products.filter(product =>
        product.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        (filters.category.length === 0 || filters.category.includes(product.category)) &&
        product.price <= filters.priceRange &&
        product.ecoScore >= filters.ecoScore
    ).sort((a, b) => {
        switch (sortSelect.value) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'eco-score':
                return b.ecoScore - a.ecoScore;
            default:
                return 0;
        }
    });
}

// Render category filters
function renderCategoryFilters() {
    const categories = [...new Set(products.map(p => p.category))];
    categoryFilters.innerHTML = categories.map(category => `
        <label class="checkbox-container">
            <input type="checkbox" value="${category}" class="category-checkbox">
            <span class="checkmark"></span>
            ${category}
        </label>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', renderProducts);
    sortSelect.addEventListener('change', renderProducts);
    gridViewBtn.addEventListener('click', () => toggleView('grid'));
    listViewBtn.addEventListener('click', () => toggleView('list'));
    priceRange.addEventListener('input', updatePriceRange);
    ecoScoreSelect.addEventListener('change', updateEcoScore);
    categoryFilters.addEventListener('change', updateCategoryFilters);
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    productGrid.addEventListener('click', handleAddToCart);
    cartButton.addEventListener('click', openCartModal);
    closeCartModal.addEventListener('click', closeCartModal);
    checkoutBtn.addEventListener('click', handleCheckout);
    themeToggle.addEventListener('click', toggleTheme);
}

// Toggle view between grid and list
// Toggle view between grid and list
function toggleView(mode) {
    viewMode = mode;
    productGrid.classList.toggle('list-view', mode === 'list');
    gridViewBtn.classList.toggle('active', mode === 'grid');
    listViewBtn.classList.toggle('active', mode === 'list');
    renderProducts();
}

// Update price range filter
function updatePriceRange() {
    filters.priceRange = parseInt(priceRange.value);
    priceRangeValue.textContent = `$${filters.priceRange}`;
    renderProducts();
}

// Update eco score filter
function updateEcoScore() {
    filters.ecoScore = parseFloat(ecoScoreSelect.value);
    renderProducts();
}

// Update category filters
function updateCategoryFilters(e) {
    if (e.target.classList.contains('category-checkbox')) {
        const category = e.target.value;
        if (e.target.checked) {
            filters.category.push(category);
        } else {
            filters.category = filters.category.filter(c => c !== category);
        }
        renderProducts();
    }
}

// Load more products (placeholder function)
function loadMoreProducts() {
    alert('This feature would load more products in a real application.');
}

// Handle adding product to cart
function handleAddToCart(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.productId);
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCartCount();
            showNotification(`Added ${product.name} to cart!`);
        }
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Open cart modal
function openCartModal() {
    renderCartItems();
    cartModal.style.display = 'block';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Handle checkout (placeholder function)
function handleCheckout() {
    alert('This would proceed to checkout in a real application.');
    cart = [];
    updateCartCount();
    closeCartModal();
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = `<i data-lucide="${isDarkMode ? 'sun' : 'moon'}"></i>`;
    lucide.createIcons();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }, 100);
}

// Initialize animations
function initializeAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero section
    gsap.to('.parallax-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            scrub: true
        },
    });

    // Animate product cards
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
        });
    });

    // Animate featured product section
    gsap.from('.featured-product-content > *', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.featured-product',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate eco impact section
    gsap.from('.eco-impact-content > *', {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.eco-impact',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });
}

// Update featured product
function updateFeaturedProduct() {
    const featuredProduct = products[Math.floor(Math.random() * products.length)];
    document.getElementById('featuredProductName').textContent = featuredProduct.name;
    document.getElementById('featuredProductDescription').textContent = featuredProduct.description;
    document.getElementById('featuredProductPrice').textContent = `$${featuredProduct.price.toFixed(2)}`;
    document.getElementById('featuredProductEcoScore').textContent = `Eco Score: ${featuredProduct.ecoScore}`;
}

// Update eco impact
function updateEcoImpact() {
    const ecoImpactList = document.getElementById('ecoImpactList');
    const impacts = [
        'Saved 100 trees',
        'Reduced plastic waste by 500kg',
        'Conserved 10,000 liters of water',
        'Decreased carbon emissions by 2 tons'
    ];
    ecoImpactList.innerHTML = impacts.map(impact => `<li>${impact}</li>`).join('');

    // Create a simple chart using Chart.js
    const ctx = document.getElementById('ecoImpactChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Trees Saved', 'Plastic Reduced (kg)', 'Water Conserved (L)', 'Carbon Reduced (kg)'],
            datasets: [{
                label: 'Environmental Impact',
                data: [100, 500, 10000, 2000],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize the page
init();