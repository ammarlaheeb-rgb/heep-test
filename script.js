// ===== مكتبة الإشعارات =====

function showNotification(message, type = 'success') {
    // إزالة الإشعارات القديمة
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// ===== تحميل إعدادات الموقع =====

function loadSiteData() {
    const settings = db.getSiteSettings();
    
    if (!settings) return;
    
    // تحديث عنوان الموقع
    document.title = settings.siteName;
    
    // تحديث الشعار والاسم
    const logos = document.querySelectorAll('#site-logo, #footer-logo');
    logos.forEach(logo => {
        if (logo) logo.src = settings.logo;
    });
    
    const siteNameElements = document.querySelectorAll('#site-name');
    siteNameElements.forEach(element => {
        if (element) element.textContent = settings.siteName;
    });
    
    // تحديث الصورة الرئيسية
    const mainImage = document.getElementById('main-hero-image');
    if (mainImage) mainImage.src = settings.mainImage;
    
    // تحديث نص "لماذا تختارنا"
    const whyChooseText = document.getElementById('why-choose-text');
    if (whyChooseText) whyChooseText.textContent = settings.whyChooseUs;
    
    // تحديث نص الفوتر
    const footerText = document.getElementById('footer-text');
    if (footerText) footerText.textContent = settings.footerText;
    
    // تحديث وسائل التواصل الاجتماعي
    const socialLinks = document.getElementById('social-links');
    if (socialLinks && settings.socialMedia) {
        socialLinks.innerHTML = `
            ${settings.socialMedia.facebook ? `<a href="${settings.socialMedia.facebook}"><i class="fab fa-facebook"></i></a>` : ''}
            ${settings.socialMedia.instagram ? `<a href="${settings.socialMedia.instagram}"><i class="fab fa-instagram"></i></a>` : ''}
            ${settings.socialMedia.whatsapp ? `<a href="${settings.socialMedia.whatsapp}"><i class="fab fa-whatsapp"></i></a>` : ''}
            ${settings.socialMedia.telegram ? `<a href="${settings.socialMedia.telegram}"><i class="fab fa-telegram"></i></a>` : ''}
        `;
    }
    
    // تحديث معلومات الاتصال
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo && settings.contactInfo) {
        contactInfo.innerHTML = `
            <p><i class="fas fa-phone"></i> <span id="contact-phone">${settings.contactInfo.phone}</span></p>
            <p><i class="fas fa-envelope"></i> <span id="contact-email">${settings.contactInfo.email}</span></p>
            <p><i class="fas fa-map-marker-alt"></i> <span id="contact-address">${settings.contactInfo.address}</span></p>
        `;
    }
    
    // تحديث حقوق النشر
    const copyrightText = document.getElementById('copyright-text');
    if (copyrightText) copyrightText.textContent = settings.copyright;
}

// ===== المنتجات المميزة =====

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = db.getFeaturedProducts();
    
    if (featuredProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>لا توجد منتجات مميزة حالياً</h3>
                <p>سيتم إضافة المنتجات المميزة قريباً</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-section">
                    <span class="product-price">${product.price.toLocaleString()} SP</span>
                    ${product.oldPrice ? `<span class="product-old-price">${product.oldPrice.toLocaleString()} SP</span>` : ''}
                </div>
                <p class="product-description">${product.description.substring(0, 60)}...</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="viewProduct('${product.id}')">
                        <i class="fas fa-eye"></i> عرض التفاصيل
                    </button>
                    <button class="btn btn-outline" onclick="addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i> أضف للسلة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== العروض الخاصة =====

function loadSpecialOffers() {
    const container = document.getElementById('special-offers');
    if (!container) return;
    
    const specialOffers = db.getSpecialOffers();
    
    if (specialOffers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tags"></i>
                <h3>لا توجد عروض خاصة حالياً</h3>
                <p>تابعنا للحصول على أحدث العروض</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = specialOffers.map(product => `
        <div class="offer-card">
            <div class="offer-badge">عرض خاص</div>
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="offer-content">
                <h3>${product.name}</h3>
                <p class="offer-description">${product.description.substring(0, 80)}...</p>
                <div class="offer-price-section">
                    <span class="offer-price">${product.price.toLocaleString()} SP</span>
                    ${product.oldPrice ? `<span class="offer-old-price">${product.oldPrice.toLocaleString()} SP</span>` : ''}
                </div>
                <div class="offer-actions">
                    <button class="btn" onclick="viewProduct('${product.id}')">اطلب الآن</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== وظائف المنتجات =====

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function addToCart(productId, quantity = 1) {
    if (db.addToCart(productId, quantity)) {
        showNotification('تمت إضافة المنتج إلى السلة', 'success');
        
        // تحديث عدد السلة في الواجهة
        db.updateCartCount();
    } else {
        showNotification('حدث خطأ في إضافة المنتج', 'error');
    }
}

// ===== نظام الشرائح للمنتج =====

class ProductSlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        
        if (this.container && this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.container.innerHTML = `
            <div class="slider-container">
                <div class="main-slider">
                    <img src="${this.images[0]}" alt="صورة المنتج" id="main-slide-image">
                    ${this.images.length > 1 ? `
                        <button class="slider-btn prev" onclick="window.currentSlider.prev()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button class="slider-btn next" onclick="window.currentSlider.next()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    ` : ''}
                </div>
                ${this.images.length > 1 ? `
                    <div class="slider-thumbnails">
                        ${this.images.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="window.currentSlider.goTo(${index})">
                                <img src="${img}" alt="صورة ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        // تعيين المربع العام للتحكم
        window.currentSlider = this;
    }
    
    goTo(index) {
        if (index < 0) index = this.images.length - 1;
        if (index >= this.images.length) index = 0;
        
        this.currentIndex = index;
        this.update();
    }
    
    next() {
        this.goTo(this.currentIndex + 1);
    }
    
    prev() {
        this.goTo(this.currentIndex - 1);
    }
    
    update() {
        const mainImage = document.getElementById('main-slide-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (mainImage) {
            mainImage.src = this.images[this.currentIndex];
        }
        
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// ===== نظام المودال =====

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// ===== تهيئة عامة =====

document.addEventListener('DOMContentLoaded', function() {
    // تحميل إعدادات الموقع
    loadSiteData();
    
    // تحديث عدد السلة
    db.updateCartCount();
    
    // إعداد القائمة المتحركة للأجهزة المحمولة
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('show');
            }
        });
    }
    
    // إغلاق المودال عند النقر خارجها
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
});

// ===== تصدير الوظائف =====

window.loadSiteData = loadSiteData;
window.loadFeaturedProducts = loadFeaturedProducts;
window.loadSpecialOffers = loadSpecialOffers;
window.viewProduct = viewProduct;
window.addToCart = addToCart;
window.openModal = openModal;
window.closeModal = closeModal;