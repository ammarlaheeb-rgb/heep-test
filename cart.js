// cart.js - إدارة سلة التسوق ونظام الدفع
class ShoppingCart {
    constructor() {
        this.cart = db.getCart();
        this.init();
    }
    
    init() {
        this.renderCart();
        this.setupEventListeners();
        this.updateTotals();
    }
    
    renderCart() {
        const container = document.getElementById('cart-items');
        if (!container) return;
        
        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>سلة التسوق فارغة</h3>
                    <p>أضف بعض المنتجات لتظهر هنا</p>
                    <a href="products.html" class="btn">تصفح المنتجات</a>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.productId}">
                <div class="item-image">
                    <img src="${item.product.images[0]}" alt="${item.product.name}">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.product.name}</h3>
                    <p class="item-price">${item.product.price} SP</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn minus" onclick="cart.updateQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn plus" onclick="cart.updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">
                    <span>${item.product.price * item.quantity} SP</span>
                </div>
                <button class="remove-btn" onclick="cart.removeItem('${item.productId}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }
        
        db.updateCartItemQuantity(productId, newQuantity);
        this.cart = db.getCart();
        this.renderCart();
        this.updateTotals();
    }
    
    removeItem(productId) {
        if (confirm('هل تريد إزالة هذا المنتج من السلة؟')) {
            db.removeFromCart(productId);
            this.cart = db.getCart();
            this.renderCart();
            this.updateTotals();
        }
    }
    
    updateTotals() {
        const subtotal = db.getCartTotal();
        const shipping = 0; // الشحن على المشتري
        const total = subtotal;
        
        document.getElementById('cart-subtotal')?.textContent = subtotal + ' SP';
        document.getElementById('cart-shipping')?.textContent = shipping + ' SP';
        document.getElementById('cart-total')?.textContent = total + ' SP';
    }
    
    setupEventListeners() {
        // زر تفريغ السلة
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('هل تريد تفريغ سلة التسوق بالكامل؟')) {
                    db.clearCart();
                    this.cart = db.getCart();
                    this.renderCart();
                    this.updateTotals();
                }
            });
        }
        
        // نموذج إكمال الطلب
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processCheckout();
            });
        }
    }
    
    processCheckout() {
        if (this.cart.length === 0) {
            alert('السلة فارغة، أضف منتجات أولاً');
            return;
        }
        
        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('customer-phone').value;
        const address = document.getElementById('customer-address').value;
        const notes = document.getElementById('order-notes').value;
        
        if (!name || !phone || !address) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        const orderData = {
            customerName: name,
            customerPhone: phone,
            customerAddress: address,
            notes: notes,
            paymentMethod: 'sham-cash'
        };
        
        const order = db.createOrder(orderData);
        if (order) {
            // توجيه إلى صفحة تأكيد الطلب
            window.location.href = `order-confirmation.html?orderId=${order.id}`;
        }
    }
}

// تهيئة السلة
let cart;
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        cart = new ShoppingCart();
    }
});

// وظائف عامة للسلة
function addToCart(productId) {
    if (db.addToCart(productId)) {
        alert('تمت إضافة المنتج إلى السلة');
        if (cart) {
            cart.cart = db.getCart();
            cart.renderCart();
            cart.updateTotals();
        }
    }
}

function goToCart() {
    window.location.href = 'cart.html';
}