// Sample products data
const sampleProducts = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: "15,999",
        currency: "درهم",
        stores: "متوفر في 12 متجر",
        category: "electronics",
        icon: "fas fa-mobile-alt"
    },
    {
        id: 2,
        name: "لابتوب Dell XPS",
        price: "12,500",
        currency: "درهم",
        stores: "متوفر في 8 متاجر",
        category: "electronics",
        icon: "fas fa-laptop"
    },
    {
        id: 3,
        name: "قميص رجالي قطني",
        price: "199",
        currency: "درهم",
        stores: "متوفر في 15 متجر",
        category: "fashion",
        icon: "fas fa-tshirt"
    },
    {
        id: 4,
        name: "حذاء رياضي Nike",
        price: "899",
        currency: "درهم",
        stores: "متوفر في 6 متاجر",
        category: "sports",
        icon: "fas fa-running"
    },
    {
        id: 5,
        name: "كريم مرطب للوجه",
        price: "120",
        currency: "درهم",
        stores: "متوفر في 20 متجر",
        category: "beauty",
        icon: "fas fa-pump-soap"
    },
    {
        id: 6,
        name: "كتاب تعلم البرمجة",
        price: "85",
        currency: "درهم",
        stores: "متوفر في 5 متاجر",
        category: "books",
        icon: "fas fa-book"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('.search-btn');
const productsGrid = document.querySelector('#productsGrid');
const categoryCards = document.querySelectorAll('.category-card');
const loginBtn = document.querySelector('#loginBtn');
const loginModal = document.querySelector('#loginModal');
const purchaseModal = document.querySelector('#purchaseModal');
const userProfile = document.querySelector('#userProfile');
const userName = document.querySelector('#userName');

// User state
let currentUser = null;
let selectedProduct = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    setupSmoothScrolling();
    setupAnimations();
    setupModals();
    checkUserLogin();
});

// Setup modals
function setupModals() {
    // Login modal events
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    }

    // Close modal events
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });

    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });

    // Payment method selection
    document.querySelectorAll('.payment-method input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            showPaymentForm(this.value);
        });
    });

    // Purchase modal actions
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeModal(purchaseModal);
        });
    }

    const purchaseBtn = document.querySelector('.purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', processPurchase);
    }

    // Form submissions
    document.querySelectorAll('.login-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    });
}

// Modal functions
function showLoginModal() {
    if (loginModal) {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function showPurchaseModal(product) {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    selectedProduct = product;
    updatePurchaseModal(product);
    if (purchaseModal) {
        purchaseModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

function showPaymentForm(method) {
    // Hide all payment forms
    document.querySelectorAll('.payment-form').forEach(form => {
        form.classList.remove('active');
    });

    // Show selected payment form
    const selectedForm = document.getElementById(`${method}Details`);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
}

// Login functions
function handleLogin(form) {
    const formData = new FormData(form);
    const isRegister = form.closest('#registerTab');

    // Simulate login process
    setTimeout(() => {
        const userData = {
            id: Math.random().toString(36).substr(2, 9),
            name: isRegister ? formData.get('name') || 'مستخدم جديد' : 'أحمد محمد',
            email: formData.get('email') || 'user@example.com',
            phone: formData.get('phone') || '+212 6XX XXX XXX'
        };

        loginUser(userData);
        closeModal(loginModal);
        showSuccessMessage(isRegister ? 'تم إنشاء الحساب بنجاح!' : 'مرحباً بك مرة أخرى!');
    }, 1000);
}

function loginUser(userData) {
    currentUser = userData;

    // Update UI
    if (loginBtn) loginBtn.style.display = 'none';
    if (userProfile) {
        userProfile.style.display = 'flex';
        userName.textContent = userData.name;
    }

    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
}

function logoutUser() {
    currentUser = null;

    // Update UI
    if (loginBtn) loginBtn.style.display = 'block';
    if (userProfile) userProfile.style.display = 'none';

    // Remove from localStorage
    localStorage.removeItem('currentUser');
}

function checkUserLogin() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        loginUser(JSON.parse(savedUser));
    }
}

// Purchase functions
function updatePurchaseModal(product) {
    const productSummary = document.getElementById('productSummary');
    const productPrice = document.getElementById('productPrice');
    const totalPrice = document.getElementById('totalPrice');

    if (productSummary) {
        productSummary.innerHTML = `
            <div class="product-item">
                <i class="${product.icon}"></i>
                <div>
                    <h4>${product.name}</h4>
                    <p>${product.stores}</p>
                </div>
            </div>
        `;
    }

    const price = parseInt(product.price.replace(/,/g, ''));
    const deliveryFee = 30;
    const total = price + deliveryFee;

    if (productPrice) productPrice.textContent = `${product.price} درهم`;
    if (totalPrice) totalPrice.textContent = `${total.toLocaleString()} درهم`;
}

function processPurchase() {
    if (!selectedProduct || !currentUser) {
        return;
    }

    // Get form data
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const shippingForm = document.querySelector('.shipping-form');
    const formData = new FormData(shippingForm);

    // Validate required fields
    const requiredFields = shippingForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e0d5c7';
        }
    });

    if (!isValid) {
        showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // Simulate purchase process
    const purchaseBtn = document.querySelector('.purchase-btn');
    const originalText = purchaseBtn.innerHTML;

    purchaseBtn.innerHTML = '<div class="loading"></div> جاري المعالجة...';
    purchaseBtn.disabled = true;

    setTimeout(() => {
        const orderData = {
            id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            product: selectedProduct,
            customer: currentUser,
            paymentMethod: paymentMethod,
            totalAmount: parseInt(selectedProduct.price.replace(/,/g, '')) + 30,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };

        closeModal(purchaseModal);
        showOrderConfirmation(orderData);

        purchaseBtn.innerHTML = originalText;
        purchaseBtn.disabled = false;
    }, 2000);
}

function showOrderConfirmation(orderData) {
    const message = `
        ✅ تم تأكيد طلبك بنجاح!

        رقم الطلب: ${orderData.id}
        المنتج: ${orderData.product.name}
        المبلغ الإجمالي: ${orderData.totalAmount.toLocaleString()} درهم

        سيتم التواصل معك قريباً لتأكيد التوصيل.
        شكراً لثقتك في تسعيرة المغرب! 🇲🇦
    `;

    alert(message);
}

function showSuccessMessage(message) {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showErrorMessage(message) {
    // Create and show error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #e74c3c, #c0392b);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile menu toggle
function setupEventListeners() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Category filtering
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });

    // Window resize handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Load and display products
function loadProducts(products = sampleProducts) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Add animation delay to cards
    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-info">
            <div class="product-title">${product.name}</div>
            <div class="product-price">${product.price} ${product.currency}</div>
            <div class="product-stores">${product.stores}</div>
            <button class="compare-btn" onclick="compareProduct(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                شراء الآن
            </button>
        </div>
    `;
    return card;
}

// Search functionality
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        loadProducts();
        return;
    }

    // Show loading state
    searchBtn.innerHTML = '<div class="loading"></div>';

    // Simulate API call delay
    setTimeout(() => {
        const filteredProducts = sampleProducts.filter(product => 
            product.name.toLowerCase().includes(query)
        );

        loadProducts(filteredProducts);
        searchBtn.innerHTML = 'بحث';

        // Show search results message
        showSearchResults(query, filteredProducts.length);
    }, 500);
}

// Filter products by category
function filterProductsByCategory(category) {
    const filteredProducts = sampleProducts.filter(product => 
        product.category === category
    );

    loadProducts(filteredProducts);

    // Scroll to products section
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });

    // Update section title
    const productsTitle = document.querySelector('.products h2');
    const categoryNames = {
        'electronics': 'إلكترونيات',
        'fashion': 'أزياء',
        'home': 'منزل ومطبخ',
        'beauty': 'جمال وعناية',
        'sports': 'رياضة',
        'books': 'كتب وتعليم'
    };

    productsTitle.textContent = `منتجات ${categoryNames[category]}`;
}

// Show search results message
function showSearchResults(query, count) {
    const productsTitle = document.querySelector('.products h2');
    productsTitle.textContent = `نتائج البحث عن "${query}" (${count} منتج)`;
}

// Product comparison function
function compareProduct(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
        showPurchaseModal(product);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup scroll animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(198, 45, 66, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #c62d42, #289c6c)';
        header.style.backdropFilter = 'none';
    }
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Price formatting function
function formatPrice(price) {
    return new Intl.NumberFormat('ar-MA', {
        style: 'currency',
        currency: 'MAD',
        minimumFractionDigits: 0
    }).format(price);
}

// Utility function to get random products
function getRandomProducts(count = 6) {
    const shuffled = sampleProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Auto-refresh products every 30 seconds (simulating real-time updates)
setInterval(() => {
    if (searchInput.value === '') {
        loadProducts(getRandomProducts());
    }
}, 30000);

console.log('✅ موقع تسعيرة المغرب جاهز للاستخدام!');
// User profile clicks
if (userProfile) {
    userProfile.addEventListener('click', function(e) {
        e.preventDefault();
        // Show user menu or logout option
        if (confirm('هل تريد تسجيل الخروج؟')) {
            logoutUser();
        }
    });
}

// Card number formatting
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        input.value = parts.join(' ');
    } else {
        input.value = value;
    }
}

// Expiry date formatting
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// CVV validation
function validateCVV(input) {
    input.value = input.value.replace(/\D/g, '').substring(0, 4);
}

// Detect card type
function detectCardType(input) {
    const cardNumber = input.value.replace(/\s/g, '');
    const indicator = document.querySelector('.card-type-indicator i');

    if (!indicator) return;

    if (cardNumber.startsWith('4')) {
        indicator.className = 'fab fa-cc-visa';
        indicator.style.color = '#1434CB';
    } else if (cardNumber.startsWith('5') || cardNumber.startsWith('2')) {
        indicator.className = 'fab fa-cc-mastercard';
        indicator.style.color = '#EB001B';
    } else if (cardNumber.startsWith('3')) {
        indicator.className = 'fab fa-cc-amex';
        indicator.style.color = '#006FCF';
    } else {
        indicator.className = 'fas fa-credit-card';
        indicator.style.color = '#8b4513';
    }
}

// Validate payment form
function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (paymentMethod === 'card') {
        const cardNumber = document.querySelector('input[placeholder*="1234"]')?.value.replace(/\s/g, '');
        const expiry = document.querySelector('input[placeholder="MM/YY"]')?.value;
        const cvv = document.querySelector('input[placeholder="123"]')?.value;
        const cardName = document.querySelector('input[placeholder*="الاسم"]')?.value;

        if (!cardNumber || cardNumber.length < 13) {
            showErrorMessage('رقم البطاقة غير صحيح');
            return false;
        }

        if (!expiry || expiry.length !== 5) {
            showErrorMessage('تاريخ انتهاء البطاقة غير صحيح');
            return false;
        }

        if (!cvv || cvv.length < 3) {
            showErrorMessage('رمز CVV غير صحيح');
            return false;
        }

        if (!cardName || cardName.trim().length < 2) {
            showErrorMessage('اسم حامل البطاقة مطلوب');
            return false;
        }
    }

    return true;
}