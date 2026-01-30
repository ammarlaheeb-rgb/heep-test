// ===== مكتبة موحدة لجميع الصفحات =====

// تفعيل الأنيميشن عند التمرير
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('.animate-in').forEach(element => {
        observer.observe(element);
    });
}

// تأثيرات hover متقدمة
function initHoverEffects() {
    // تأثير للبطاقات
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير للأزرار
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

// نظام الإشعارات المحسن
function showEnhancedNotification(message, type = 'success', duration = 3000) {
    // إزالة الإشعارات القديمة
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: ${type === 'success' ? '#d4edda' : 
                     type === 'error' ? '#f8d7da' : 
                     type === 'warning' ? '#fff3cd' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : 
                type === 'error' ? '#721c24' : 
                type === 'warning' : '#856404' : '#0c5460'};
        padding: 20px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 5px solid ${type === 'success' ? '#28a745' : 
                              type === 'error' ? '#dc3545' : 
                              type === 'warning' ? '#ffc107' : '#17a2b8'};
    `;
    
    document.body.appendChild(notification);
    
    // ظهور مع أنيميشن
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // زر الإغلاق
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => notification.remove(), 500);
    });
    
    // إخفاء تلقائي
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => notification.remove(), 500);
        }
    }, duration);
}

// تحسين تحميل الصور
function initImageLoader() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// تأثيرات النموذج
function initFormEffects() {
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// نظام التحميل
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">جاري التحميل...</div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255,255,255,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
}

// تهيئة جميع الميزات
function initUnifiedFeatures() {
    // تحميل إعدادات الموقع
    if (typeof loadSiteData === 'function') {
        loadSiteData();
    }
    
    // تحديث عدد السلة
    if (typeof db !== 'undefined' && typeof db.updateCartCount === 'function') {
        db.updateCartCount();
    }
    
    // تهيئة الميزات
    initScrollAnimations();
    initHoverEffects();
    initImageLoader();
    initFormEffects();
    
    // إعداد القائمة المتحركة للجوال
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('show');
            }
        });
    }
    
    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثيرات النقر على الأزرار
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // تأثير الموجة
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    console.log('تم تحميل الميزات الموحدة بنجاح');
}

// تصدير الوظائف
window.initUnifiedFeatures = initUnifiedFeatures;
window.showEnhancedNotification = showEnhancedNotification;
window.showLoader = showLoader;
window.hideLoader = hideLoader;

// إضافة أنماط Ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid var(--secondary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loader-text {
        color: var(--primary-color);
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    .focused label {
        transform: translateY(-20px) scale(0.8);
        color: var(--secondary-color);
    }
`;
document.head.appendChild(style);

// التشغيل التلقائي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initUnifiedFeatures, 100);
});