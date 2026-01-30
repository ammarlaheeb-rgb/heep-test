// قاعدة بيانات المنتجات والطلبات
const database = {
    // ===== المنتجات =====
    products: [
        {
            id: '1',
            name: 'آيفون 14 برو ماكس',
            description: 'هاتف آيفون 14 برو ماكس بشاشة 6.7 بوصة، كاميرا 48 ميجابكسل، معالج A16 بايونيك',
            price: 1200,
            oldPrice: 1350,
            images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            category: 'phones',
            featured: true,
            specialOffer: true,
            brand: 'apple',
            storage: '256GB',
            color: 'أسود',
            createdAt: '2024-01-15',
            stock: 10
        },
        {
            id: '2',
            name: 'سامسونج جالكسي S23 الترا',
            description: 'هاتف سامسونج جالكسي S23 الترا بشاشة 6.8 بوصة، كاميرا 200 ميجابكسل، معالج سناب دراجون 8 جين 2',
            price: 1100,
            oldPrice: 1250,
            images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            category: 'phones',
            featured: true,
            brand: 'samsung',
            storage: '512GB',
            color: 'أبيض',
            createdAt: '2024-01-10',
            stock: 8
        },
        {
            id: '3',
            name: 'سماعات ايربودز برو 2',
            description: 'سماعات لاسلكية من أبل مع إلغاء الضوضاء النشط، مقاومة للماء والعرق',
            price: 250,
            images: ['https://images.unsplash.com/photo-1599661046286-309c8b1c7b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            category: 'accessories',
            type: 'headphones',
            featured: true,
            brand: 'apple',
            compatibility: 'iPhone',
            createdAt: '2024-01-20',
            stock: 25
        },
        {
            id: '4',
            name: 'هواوي P50 برو مستعمل',
            description: 'هاتف هواوي P50 برو مستعمل بحالة ممتازة، شاشة 6.6 بوصة، كاميرا لييكا',
            price: 400,
            oldPrice: 550,
            images: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            category: 'used-phones',
            condition: 'ممتاز',
            brand: 'huawei',
            storage: '128GB',
            color: 'ذهبي',
            warranty: '3 أشهر',
            createdAt: '2024-01-05',
            stock: 3
        },
        {
            id: '5',
            name: 'شاحن سريع 65W',
            description: 'شاحن سريع بقوة 65 واط، متوافق مع معظم الأجهزة، مع كابل USB-C',
            price: 35,
            images: ['https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            category: 'accessories',
            type: 'chargers',
            brand: 'samsung',
            compatibility: 'متعدد الاستخدام',
            createdAt: '2024-01-25',
            stock: 50
        },
        {
            id: '6',
            name: 'بنك طاقة 20000mAh',
            description: 'بنك طاقة بسعة 20000 ملي أمبير، بشحن سريع 18W، منفذين USB',
            price: 45,
            oldPrice: 55,
            images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            category: 'accessories',
            type: 'power-banks',
            specialOffer: true,
            brand: 'xiaomi',
            compatibility: 'جميع الأجهزة',
            createdAt: '2024-01-18',
            stock: 30
        }
    ],

    // ===== إعدادات الموقع =====
    siteSettings: {
        siteName: 'متجر الإلكترونيات',
        logo: 'images/logo.png',
        mainImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        whyChooseUs: 'نحن نقدم أفضل المنتجات الإلكترونية بأعلى جودة وأسعار تنافسية. فريقنا مخصص لخدمتكم وتقديم أفضل تجربة تسوق مع ضمان المنتجات وخدمة ما بعد البيع المميزة.',
        footerText: 'متجر الإلكترونيات - نقدم لكم أحدث المنتجات التكنولوجية بأفضل الأسعار.',
        contactInfo: {
            phone: '+963 123 456 789',
            email: 'info@store.com',
            address: 'دمشق، سوريا'
        },
        socialMedia: {
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            whatsapp: 'https://wa.me/963123456789',
            telegram: 'https://t.me/store'
        },
        copyright: '© 2024 متجر الإلكترونيات. جميع الحقوق محفوظة.'
    },

    // ===== السلة =====
    cart: [],

    // ===== الطلبات =====
    orders: [],

    // ===== وظائف المنتجات =====
    
    // الحصول على جميع المنتجات
    getProducts: function() {
        return this.products;
    },

    // الحصول على منتج حسب المعرف
    getProductById: function(id) {
        return this.products.find(product => product.id === id);
    },

    // الحصول على المنتجات حسب الفئة
    getProductsByCategory: function(category) {
        return this.products.filter(product => product.category === category);
    },

    // الحصول على المنتجات المميزة
    getFeaturedProducts: function() {
        return this.products.filter(product => product.featured === true);
    },

    // الحصول على العروض الخاصة
    getSpecialOffers: function() {
        return this.products.filter(product => product.specialOffer === true);
    },

    // البحث في المنتجات
    searchProducts: function(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    },

    // إضافة منتج جديد
    addProduct: function(product) {
        product.id = Date.now().toString();
        product.createdAt = new Date().toISOString().split('T')[0];
        this.products.push(product);
        this.saveProductsToLocalStorage();
        return product.id;
    },

    // تحديث منتج
    updateProduct: function(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProductsToLocalStorage();
            return true;
        }
        return false;
    },

    // حذف منتج
    deleteProduct: function(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProductsToLocalStorage();
            return true;
        }
        return false;
    },

    // ===== وظائف إعدادات الموقع =====
    
    // الحصول على إعدادات الموقع
    getSiteSettings: function() {
        return this.siteSettings;
    },

    // تحديث إعدادات الموقع
    updateSiteSettings: function(newSettings) {
        this.siteSettings = { ...this.siteSettings, ...newSettings };
        this.saveSiteSettingsToLocalStorage();
        return true;
    },

    // ===== وظائف السلة =====
    
    // الحصول على محتويات السلة
    getCart: function() {
        return this.cart;
    },

    // إضافة منتج إلى السلة
    addToCart: function(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (!product) return false;

        // التحقق من توفر المنتج
        if (product.stock < quantity) {
            alert('الكمية المطلوبة غير متوفرة في المخزون');
            return false;
        }

        // البحث عن المنتج في السلة
        const existingItem = this.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            // زيادة الكمية إذا المنتج موجود بالفعل
            existingItem.quantity += quantity;
        } else {
            // إضافة منتج جديد إلى السلة
            this.cart.push({
                productId: productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.images[0]
            });
        }
        
        // تحديث المخزون
        product.stock -= quantity;
        
        // حفظ التغييرات
        this.saveProductsToLocalStorage();
        this.saveCartToLocalStorage();
        
        // تحديث العداد
        this.updateCartCount();
        
        return true;
    },

    // تحديث كمية منتج في السلة
    updateCartQuantity: function(productId, newQuantity) {
        const item = this.cart.find(item => item.productId === productId);
        if (!item) return false;

        const product = this.getProductById(productId);
        if (!product) return false;

        const quantityDifference = newQuantity - item.quantity;

        // التحقق من توفر المخزون
        if (product.stock < quantityDifference) {
            alert('الكمية المطلوبة غير متوفرة في المخزون');
            return false;
        }

        if (newQuantity < 1) {
            return this.removeFromCart(productId);
        }

        // تحديث المخزون
        product.stock -= quantityDifference;
        item.quantity = newQuantity;
        
        // حفظ التغييرات
        this.saveProductsToLocalStorage();
        this.saveCartToLocalStorage();
        
        return true;
    },

    // إزالة منتج من السلة
    removeFromCart: function(productId) {
        const index = this.cart.findIndex(item => item.productId === productId);
        if (index !== -1) {
            const item = this.cart[index];
            const product = this.getProductById(productId);
            
            // استعادة المخزون
            if (product) {
                product.stock += item.quantity;
                this.saveProductsToLocalStorage();
            }
            
            // إزالة المنتج من السلة
            this.cart.splice(index, 1);
            this.saveCartToLocalStorage();
            
            // تحديث العداد
            this.updateCartCount();
            
            return true;
        }
        return false;
    },

    // تفريغ السلة
    clearCart: function() {
        // استعادة المخزون للمنتجات في السلة
        this.cart.forEach(item => {
            const product = this.getProductById(item.productId);
            if (product) {
                product.stock += item.quantity;
            }
        });
        
        // تفريغ السلة
        this.cart = [];
        this.saveCartToLocalStorage();
        this.saveProductsToLocalStorage();
        
        // تحديث العداد
        this.updateCartCount();
        
        return true;
    },

    // حساب عدد العناصر في السلة
    getCartItemCount: function() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    // حساب المجموع الكلي للسلة
    getCartTotal: function() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // تحديث عداد السلة
    updateCartCount: function() {
        const cartCount = this.getCartItemCount();
        if (typeof document !== 'undefined') {
            document.querySelectorAll('.cart-count').forEach(element => {
                element.textContent = cartCount;
            });
        }
    },

    // ===== وظائف الطلبات =====
    
    // إضافة طلب جديد
    addOrder: function(order) {
        try {
            // التحقق من أن الطلب يحتوي على المعلومات المطلوبة
            if (!order.id || !order.customerName || !order.customerPhone || !order.items || order.items.length === 0) {
                console.error('معلومات الطلب غير مكتملة');
                return false;
            }

            // إضافة تاريخ الإنشاء
            order.createdAt = new Date().toISOString();
            order.updatedAt = new Date().toISOString();
            
            // إضافة الطلب
            this.orders.push(order);
            
            // حفظ في localStorage
            this.saveOrdersToLocalStorage();
            
            return true;
        } catch (error) {
            console.error('خطأ في إضافة الطلب:', error);
            return false;
        }
    },

    // الحصول على جميع الطلبات
    getOrders: function() {
        return this.orders;
    },

    // الحصول على طلب بواسطة المعرف
    getOrderById: function(orderId) {
        return this.orders.find(order => order.id === orderId);
    },

    // تحديث حالة الطلب
    updateOrderStatus: function(orderId, newStatus, notes = '') {
        try {
            const order = this.getOrderById(orderId);
            if (!order) {
                console.error('الطلب غير موجود');
                return false;
            }

            order.status = newStatus;
            order.notes = notes || order.notes;
            order.updatedAt = new Date().toISOString();
            
            // حفظ في localStorage
            this.saveOrdersToLocalStorage();
            
            return true;
        } catch (error) {
            console.error('خطأ في تحديث حالة الطلب:', error);
            return false;
        }
    },

    // حذف طلب
    deleteOrder: function(orderId) {
        try {
            const index = this.orders.findIndex(order => order.id === orderId);
            if (index === -1) {
                console.error('الطلب غير موجود');
                return false;
            }

            this.orders.splice(index, 1);
            this.saveOrdersToLocalStorage();
            
            return true;
        } catch (error) {
            console.error('خطأ في حذف الطلب:', error);
            return false;
        }
    },

    // الحصول على إحصائيات الطلبات
    getOrderStats: function() {
        const stats = {
            total: this.orders.length,
            pending: this.orders.filter(order => order.status === 'قيد المراجعة' || order.status === 'جديد').length,
            processing: this.orders.filter(order => order.status === 'قيد المعالجة' || order.status === 'قيد التجهيز').length,
            completed: this.orders.filter(order => order.status === 'مكتمل' || order.status === 'تم التوصيل').length,
            cancelled: this.orders.filter(order => order.status === 'ملغي' || order.status === 'مرفوض').length
        };
        
        return stats;
    },

    // ===== وظائف التخزين المحلي (LocalStorage) =====
    
    // تهيئة قاعدة البيانات من localStorage
    initFromLocalStorage: function() {
        try {
            // تحميل المنتجات
            const savedProducts = localStorage.getItem('store_products');
            if (savedProducts) {
                this.products = JSON.parse(savedProducts);
            }

            // تحميل إعدادات الموقع
            const savedSettings = localStorage.getItem('store_settings');
            if (savedSettings) {
                this.siteSettings = JSON.parse(savedSettings);
            }

            // تحميل السلة
            const savedCart = localStorage.getItem('store_cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }

            // تحميل الطلبات
            const savedOrders = localStorage.getItem('store_orders');
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
            }

            console.log('تم تحميل قاعدة البيانات من التخزين المحلي');
        } catch (error) {
            console.error('خطأ في تحميل قاعدة البيانات:', error);
        }
    },

    // حفظ المنتجات في localStorage
    saveProductsToLocalStorage: function() {
        try {
            localStorage.setItem('store_products', JSON.stringify(this.products));
        } catch (error) {
            console.error('خطأ في حفظ المنتجات:', error);
        }
    },

    // حفظ إعدادات الموقع في localStorage
    saveSiteSettingsToLocalStorage: function() {
        try {
            localStorage.setItem('store_settings', JSON.stringify(this.siteSettings));
        } catch (error) {
            console.error('خطأ في حفظ إعدادات الموقع:', error);
        }
    },

    // حفظ السلة في localStorage
    saveCartToLocalStorage: function() {
        try {
            localStorage.setItem('store_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('خطأ في حفظ السلة:', error);
        }
    },

    // حفظ الطلبات في localStorage
    saveOrdersToLocalStorage: function() {
        try {
            localStorage.setItem('store_orders', JSON.stringify(this.orders));
        } catch (error) {
            console.error('خطأ في حفظ الطلبات:', error);
        }
    },

    // تصدير قاعدة البيانات كاملة
    exportDatabase: function() {
        try {
            const data = {
                products: this.products,
                siteSettings: this.siteSettings,
                cart: this.cart,
                orders: this.orders
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.href = url;
            a.download = `store_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error('خطأ في تصدير قاعدة البيانات:', error);
            return false;
        }
    },

    // استيراد قاعدة البيانات
    importDatabase: function(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.products) this.products = data.products;
            if (data.siteSettings) this.siteSettings = data.siteSettings;
            if (data.cart) this.cart = data.cart;
            if (data.orders) this.orders = data.orders;
            
            // حفظ جميع التغييرات في localStorage
            this.saveProductsToLocalStorage();
            this.saveSiteSettingsToLocalStorage();
            this.saveCartToLocalStorage();
            this.saveOrdersToLocalStorage();
            
            console.log('تم استيراد قاعدة البيانات بنجاح');
            return true;
        } catch (error) {
            console.error('خطأ في استيراد قاعدة البيانات:', error);
            return false;
        }
    },

    // إعادة تعيين قاعدة البيانات
    resetDatabase: function() {
        if (confirm('هل أنت متأكد من إعادة تعيين قاعدة البيانات؟ سيتم حذف جميع البيانات بما في ذلك المنتجات والطلبات.')) {
            try {
                // إعادة التعيين إلى القيم الافتراضية
                this.products = [
                    {
                        id: '1',
                        name: 'آيفون 14 برو ماكس',
                        description: 'هاتف آيفون 14 برو ماكس بشاشة 6.7 بوصة، كاميرا 48 ميجابكسل، معالج A16 بايونيك',
                        price: 1200,
                        oldPrice: 1350,
                        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
                        category: 'phones',
                        featured: true,
                        specialOffer: true,
                        brand: 'apple',
                        storage: '256GB',
                        color: 'أسود',
                        createdAt: '2024-01-15',
                        stock: 10
                    },
                    {
                        id: '2',
                        name: 'سامسونج جالكسي S23 الترا',
                        description: 'هاتف سامسونج جالكسي S23 الترا بشاشة 6.8 بوصة، كاميرا 200 ميجابكسل، معالج سناب دراجون 8 جين 2',
                        price: 1100,
                        oldPrice: 1250,
                        images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
                        category: 'phones',
                        featured: true,
                        brand: 'samsung',
                        storage: '512GB',
                        color: 'أبيض',
                        createdAt: '2024-01-10',
                        stock: 8
                    }
                ];
                
                this.siteSettings = {
                    siteName: 'متجر الإلكترونيات',
                    logo: 'images/logo.png',
                    mainImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                    whyChooseUs: 'نحن نقدم أفضل المنتجات الإلكترونية بأعلى جودة وأسعار تنافسية. فريقنا مخصص لخدمتكم وتقديم أفضل تجربة تسوق مع ضمان المنتجات وخدمة ما بعد البيع المميزة.',
                    footerText: 'متجر الإلكترونيات - نقدم لكم أحدث المنتجات التكنولوجية بأفضل الأسعار.',
                    contactInfo: {
                        phone: '+963 123 456 789',
                        email: 'info@store.com',
                        address: 'دمشق، سوريا'
                    },
                    socialMedia: {
                        facebook: 'https://facebook.com',
                        instagram: 'https://instagram.com',
                        whatsapp: 'https://wa.me/963123456789',
                        telegram: 'https://t.me/store'
                    },
                    copyright: '© 2024 متجر الإلكترونيات. جميع الحقوق محفوظة.'
                };
                
                this.cart = [];
                this.orders = [];
                
                // حفظ جميع التغييرات في localStorage
                this.saveProductsToLocalStorage();
                this.saveSiteSettingsToLocalStorage();
                this.saveCartToLocalStorage();
                this.saveOrdersToLocalStorage();
                
                alert('تم إعادة تعيين قاعدة البيانات بنجاح');
                return true;
            } catch (error) {
                console.error('خطأ في إعادة تعيين قاعدة البيانات:', error);
                return false;
            }
        }
        return false;
    }
};

// تهيئة قاعدة البيانات عند تحميل الصفحة
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        database.initFromLocalStorage();
        database.updateCartCount();
    });
}

// جعل قاعدة البيانات متاحة عالمياً
const db = database;
window.db = database;

// تصدير للاستخدام في وحدات ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = database;
}