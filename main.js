// Shopping cart state
let cart = [];
let cartCount = 0;

// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // You could load shared header/footer here
    // For now, each page has its own structure
});

// Product detail functions
function changeImage(src) {
    document.getElementById('mainImg').src = src;
}

function changeQty(delta) {
    const qtyInput = document.getElementById('qty');
    let qty = parseInt(qtyInput.value) + delta;
    if (qty < 1) qty = 1;
    qtyInput.value = qty;
}

function addToCartDetailed() {
    // Get selected options
    const size = document.querySelector('.size-btn.active')?.textContent || 'M';
    const color = document.querySelector('.color-option.active')?.title || 'Black';
    const material = document.querySelector('.material-select').value;
    const fit = document.querySelector('.fit-btn.active')?.textContent || 'Regular';
    const qty = parseInt(document.getElementById('qty').value);
    
    // Add to cart
    cart.push({
        name: document.querySelector('.product-info h1').textContent,
        size, color, material, fit, qty,
        price: 29.99
    });
    
    cartCount += qty;
    updateCartCount();
    
    alert(`✅ Added to cart!\n\nProduct: ${size} ${color}\n Quantity: ${qty}\nTotal items: ${cartCount}`);
}

function buyNow() {
    addToCartDetailed();
    window.location.href = 'checkout.html';
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => el.textContent = cartCount);
}

// Size/color/fit selection
document.addEventListener('click', function(e) {
    // Size buttons
    if (e.target.classList.contains('size-btn')) {
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    }
    
    // Color options
    if (e.target.classList.contains('color-option')) {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        e.target.classList.add('active');
    }
    
    // Fit buttons
    if (e.target.classList.contains('fit-btn')) {
        document.querySelectorAll('.fit-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    }
});

// Cart functions
function updateCartQty(itemId, delta) {
    alert('Quantity updated!');
}

function removeFromCart(itemId) {
    if (confirm('Remove this item from cart?')) {
        alert('Item removed!');
    }
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

// Checkout functions
function placeOrder() {
    alert('🎉 Order placed successfully!\n\nOrder #' + Math.floor(Math.random() * 100000) + '\n\nYou will receive a confirmation email shortly.\n\n(This is a demo - no actual purchase was made)');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// AI Design Generator (from index.html)
function generateDesigns() {
    const prompt = document.getElementById('promptInput')?.value.trim();
    if (!prompt) {
        alert('Please enter a design idea!');
        return;
    }
    
    const resultDiv = document.getElementById('designResult');
    if (!resultDiv) return;
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="loading-spinner"><p>Generating your design...</p></div>';
    
    setTimeout(() => {
        createDesignMockup(prompt);
    }, 1500);
}

function createDesignMockup(prompt) {
    const resultDiv = document.getElementById('designResult');
    
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    
    // Black t-shirt
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 800, 1000);
    
    // Design area
    const colors = ['#00ffff', '#ff00ff', '#FFD700', '#FF4500', '#00ff00'];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    
    const gradient = ctx.createRadialGradient(400, 500, 50, 400, 500, 250);
    gradient.addColorStop(0, bgColor);
    gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(200, 300, 400, 400);
    
    ctx.shadowColor = bgColor;
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 20;
    
    // Wrap text
    const words = prompt.split(' ');
    let line = '';
    let y = 450;
    const maxWidth = 350;
    
    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line.trim(), 400, y);
            line = word + ' ';
            y += 50;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line.trim(), 400, y);
    
    // SKUNKIN branding
    ctx.font = 'italic bold 50px Arial';
    ctx.fillStyle = bgColor;
    ctx.shadowBlur = 30;
    ctx.fillText('SKUNKIN', 400, 650);
    
    resultDiv.innerHTML = `
        <div class="mockup-container">
            <h3 style="color: #00ffff; margin-bottom: 1rem; text-shadow: 0 0 10px #00ffff;">✨ Your Design</h3>
            <img src="${canvas.toDataURL()}" alt="Generated Design" id="generatedDesign">
            <div class="design-actions">
                <button onclick="regenerateDesign()">🔄 Regenerate</button>
                <button onclick="customizeDesign()">⚡ Customize & Order</button>
            </div>
        </div>
    `;
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function regenerateDesign() {
    const prompt = document.getElementById('promptInput').value.trim();
    generateDesigns();
}

function addToCart() {
    cartCount++;
    updateCartCount();
    alert('✅ Added to cart! 🛒\n\nTotal items: ' + cartCount);
}

function openCart() {
    window.location.href = 'cart.html';
}

function openAccount() {
    alert('Account page coming soon!');
}

function showPage(page) {
    if (page === 'contact') {
        document.getElementById('contact-page')?.classList.add('active');
        document.querySelector('.hero-section')?.style.setProperty('display', 'none');
        document.getElementById('design-section')?.style.setProperty('display', 'none');
        document.getElementById('about-page')?.classList.remove('active');
    } else if (page === 'about') {
        document.getElementById('about-page')?.classList.add('active');
        document.querySelector('.hero-section')?.style.setProperty('display', 'none');
        document.getElementById('design-section')?.style.setProperty('display', 'none');
        document.getElementById('contact-page')?.classList.remove('active');
    } else {
        document.querySelector('.hero-section')?.style.setProperty('display', 'block');
        document.getElementById('design-section')?.style.setProperty('display', 'block');
        document.getElementById('contact-page')?.classList.remove('active');
        document.getElementById('about-page')?.classList.remove('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitContactForm(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

// Custom design flow
function customizeDesign() {
    const designImg = document.getElementById('generatedDesign');
    if (designImg) {
        sessionStorage.setItem('customDesign', designImg.src);
        sessionStorage.setItem('customPrompt', document.getElementById('promptInput').value);
    }
    window.location.href = 'customize.html';
}
