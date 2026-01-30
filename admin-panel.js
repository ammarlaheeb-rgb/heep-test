// ===== إدارة لوحة التحكم - النسخة المحسنة =====

// متغيرات التحرير
let editingProductId = null;
let editingOrderId = null;

// ===== التبويبات والشريط الجانبي =====

function switchTab(tabId) {
    // تحديث الروابط النشطة
    document.querySelectorAll('.dashboard-menu a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="#${tabId}"]`).classList.add('active');
    
    // إخفاء جميع المحتويات
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // إظهار المحتوى المطلوب
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
        
        // تحديث العنوان الرئيسي
        const settings = db.getSiteSettings();
        const titles = {
            'dashboard': `${settings.siteName || 'متجر الإلكترونيات'} - لوحة التحكم`,
            'products': 'إدارة المنتجات',
            'orders': 'إدارة الطلبات',
            'settings': 'إعدادات الموقع',
            'main-image': 'الصورة الرئيسية',
            'why-choose': 'لماذا تختارنا',
            'footer': 'إعدادات الفوتر',
            'social': 'وسائل التواصل',
            'barcode': 'باركود الدفع',
            'shipping': 'ملاحظة الشحن'
        };
        
        document.getElementById('dashboard-title-main').innerHTML = 
            `<i class="fas fa-tachometer-alt"></i> ${titles[tabId] || 'لوحة التحكم'}`;
        
        // تحميل البيانات الخاصة بالتبويب
        loadTabData(tabId);
    }
    
    // تشغيل الأنيميشن
    setupAnimations();
}

function setupAnimations() {
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

function loadTabData(tabId) {
    switch(tabId) {
        case 'dashboard':
            loadDashboardStats();
            break;
        case 'products':
            loadProductsTable();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'settings':
            loadSiteSettings();
            break;
        case 'main-image':
            loadMainImageSettings();
            break;
        case 'why-choose':
            loadWhyChooseSettings();
            break;
        case 'footer':
            loadFooterSettings();
            break;
        case 'social':
            loadSocialMediaSettings();
            break;
        case 'barcode':
            loadBarcodeSettings();
            break;
        case 'shipping':
            loadShippingSettings();
            break;
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('dashboard-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

function logout() {
    if (confirm('هل تريد تسجيل الخروج من لوحة التحكم؟')) {
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'admin-login.html';
    }
}

// ===== الإحصائيات =====

function loadDashboardStats() {
    const products = db.getProducts();
    const orders = db.getOrders();
    const featuredProducts = db.getFeaturedProducts();
    const specialOffers = db.getSpecialOffers();
    
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('featured-products').textContent = featuredProducts.length;
    document.getElementById('special-offers').textContent = specialOffers.length;
    
    // تحديث الأنيميشن
    setTimeout(setupAnimations, 100);
}

// ===== إدارة المنتجات =====

function loadProductsTable() {
    const products = db.getProducts();
    const searchTerm = document.getElementById('product-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    
    let filteredProducts = products;
    
    // تطبيق البحث
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // تطبيق الفلترة
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter
        );
    }
    
    const tableBody = document.getElementById('products-table-body');
    
    if (!tableBody) return;
    
    if (filteredProducts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center" style="padding: 50px;">
                    <div class="empty-state">
                        <i class="fas fa-box-open" style="font-size: 3rem; color: #ddd; margin-bottom: 15px;"></i>
                        <p style="color: var(--gray-color); font-size: 1.1rem;">لا توجد منتجات مطابقة للبحث</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredProducts.map(product => {
        // الحصول على اسم الفئة بالعربية
        const categoryNames = {
            'phones': 'هواتف',
            'accessories': 'إكسسوارات',
            'used-phones': 'مستعملة'
        };
        
        const categoryName = categoryNames[product.category] || product.category;
        
        return `
            <tr class="animate-in">
                <td>
                    <img src="${product.images[0] || 'images/placeholder.jpg'}" 
                         alt="${product.name}" 
                         class="product-thumbnail">
                </td>
                <td>
                    <strong>${product.name}</strong>
                    ${product.description ? `<br><small style="color: #666;">${product.description.substring(0, 50)}...</small>` : ''}
                </td>
                <td>
                    <span style="font-weight: bold; color: var(--accent-color);">
                        $${product.price.toFixed(2)}
                    </span>
                    ${product.oldPrice ? `
                        <br><small style="color: #999; text-decoration: line-through;">
                            $${product.oldPrice.toFixed(2)}
                        </small>
                    ` : ''}
                </td>
                <td>
                    <span class="badge ${product.category === 'phones' ? 'badge-info' : 
                                      product.category === 'accessories' ? 'badge-secondary' : 
                                      'badge-warning'}">
                        ${categoryName}
                    </span>
                </td>
                <td>
                    <span class="badge ${product.featured ? 'badge-success' : 'badge-secondary'}">
                        ${product.featured ? 'نعم' : 'لا'}
                    </span>
                </td>
                <td>
                    <span class="badge ${product.specialOffer ? 'badge-danger' : 'badge-secondary'}">
                        ${product.specialOffer ? 'نعم' : 'لا'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editProduct('${product.id}')" 
                            style="margin-left: 5px; margin-bottom: 5px;">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function openAddProductModal() {
    editingProductId = null;
    document.getElementById('product-modal-title').innerHTML = '<i class="fas fa-plus"></i> إضافة منتج جديد';
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-old-price').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-images').value = '';
    document.getElementById('product-category').value = 'phones';
    document.getElementById('product-featured').checked = false;
    document.getElementById('product-special').checked = false;
    document.getElementById('save-product-btn').innerHTML = '<i class="fas fa-save"></i> إضافة المنتج';
    
    openModal('add-product-modal');
}

function editProduct(productId) {
    const product = db.getProductById(productId);
    if (!product) return;
    
    editingProductId = productId;
    document.getElementById('product-modal-title').innerHTML = '<i class="fas fa-edit"></i> تعديل المنتج';
    document.getElementById('product-id').value = productId;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-old-price').value = product.oldPrice || '';
    document.getElementById('product-description').value = product.description || '';
    document.getElementById('product-images').value = product.images.join('\n');
    document.getElementById('product-category').value = product.category || 'phones';
    document.getElementById('product-featured').checked = product.featured || false;
    document.getElementById('product-special').checked = product.specialOffer || false;
    document.getElementById('save-product-btn').innerHTML = '<i class="fas fa-save"></i> تحديث المنتج';
    
    openModal('add-product-modal');
}

function saveProduct() {
    const id = editingProductId || 'product-' + Date.now();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const oldPrice = document.getElementById('product-old-price').value ? 
                    parseFloat(document.getElementById('product-old-price').value) : null;
    const description = document.getElementById('product-description').value;
    const imagesText = document.getElementById('product-images').value;
    const category = document.getElementById('product-category').value;
    const featured = document.getElementById('product-featured').checked;
    const specialOffer = document.getElementById('product-special').checked;
    
    if (!name || !price || isNaN(price)) {
        showEnhancedNotification('يرجى ملء اسم المنتج والسعر بشكل صحيح', 'error');
        return;
    }
    
    // تحويل النص إلى مصفوفة صور
    const images = imagesText.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    
    // إضافة صورة افتراضية إذا لم تكن هناك صور
    if (images.length === 0) {
        images.push('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80');
    }
    
    const productData = {
        id,
        name,
        price,
        oldPrice,
        description,
        images,
        category,
        featured,
        specialOffer,
        inStock: true,
        createdAt: editingProductId ? undefined : new Date().toISOString().split('T')[0]
    };
    
    let success = false;
    let message = '';
    
    if (editingProductId) {
        // تحديث المنتج
        success = db.updateProduct(id, productData);
        message = success ? 'تم تحديث المنتج بنجاح' : 'حدث خطأ في تحديث المنتج';
    } else {
        // إضافة منتج جديد
        const newProduct = db.addProduct(productData);
        success = !!newProduct;
        message = success ? 'تم إضافة المنتج بنجاح' : 'حدث خطأ في إضافة المنتج';
    }
    
    if (success) {
        showEnhancedNotification(message, 'success');
        closeModal('add-product-modal');
        loadProductsTable();
        loadDashboardStats();
    } else {
        showEnhancedNotification(message, 'error');
    }
}

function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟ سيتم حذفه بشكل نهائي.')) {
        const deleted = db.deleteProduct(productId);
        if (deleted) {
            showEnhancedNotification('تم حذف المنتج بنجاح', 'success');
            loadProductsTable();
            loadDashboardStats();
        } else {
            showEnhancedNotification('حدث خطأ في حذف المنتج', 'error');
        }
    }
}

// ===== إدارة الطلبات =====

function loadOrdersTable() {
    const orders = db.getOrders();
    const statusFilter = document.getElementById('order-status-filter')?.value || 'all';
    
    let filteredOrders = orders;
    
    if (statusFilter !== 'all') {
        filteredOrders = orders.filter(order => order.status === statusFilter);
    }
    
    const tableBody = document.getElementById('orders-table-body');
    
    if (!tableBody) return;
    
    if (filteredOrders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center" style="padding: 50px;">
                    <div class="empty-state">
                        <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #ddd; margin-bottom: 15px;"></i>
                        <p style="color: var(--gray-color); font-size: 1.1rem;">لا توجد طلبات مطابقة للفلتر</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredOrders.map(order => {
        const statusBadge = {
            'pending': '<span class="badge badge-warning">قيد الانتظار</span>',
            'processing': '<span class="badge badge-info">قيد المعالجة</span>',
            'shipped': '<span class="badge badge-primary">تم الشحن</span>',
            'completed': '<span class="badge badge-success">مكتمل</span>',
            'cancelled': '<span class="badge badge-danger">ملغي</span>'
        }[order.status] || '<span class="badge badge-secondary">غير معروف</span>';
        
        const date = new Date(order.createdAt);
        const formattedDate = date.toLocaleDateString('ar-SA');
        const formattedTime = date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
        
        const totalAmount = order.total || order.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0) || 0;
        
        return `
            <tr class="animate-in">
                <td><strong>${order.id || 'N/A'}</strong></td>
                <td>${order.customerName || 'غير معروف'}</td>
                <td>${order.customerPhone || 'غير معروف'}</td>
                <td><strong>$${totalAmount.toFixed(2)}</strong></td>
                <td>${statusBadge}</td>
                <td>${formattedDate}<br><small>${formattedTime}</small></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewOrderDetails('${order.id}')" 
                            style="margin-left: 5px; margin-bottom: 5px;">
                        <i class="fas fa-eye"></i> عرض
                    </button>
                    <select class="form-control form-control-sm d-inline-block" 
                            style="width: auto; margin-right: 5px;"
                            onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>قيد الانتظار</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>قيد المعالجة</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>تم الشحن</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>مكتمل</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>ملغي</option>
                    </select>
                </td>
            </tr>
        `;
    }).join('');
}

function viewOrderDetails(orderId) {
    const order = db.getOrders().find(o => o.id === orderId);
    if (!order) {
        showEnhancedNotification('لم يتم العثور على الطلب', 'error');
        return;
    }
    
    editingOrderId = orderId;
    
    const statusText = {
        'pending': 'قيد الانتظار',
        'processing': 'قيد المعالجة',
        'shipped': 'تم الشحن',
        'completed': 'مكتمل',
        'cancelled': 'ملغي'
    }[order.status] || 'غير معروف';
    
    const date = new Date(order.createdAt);
    const formattedDate = date.toLocaleDateString('ar-SA') + ' ' + date.toLocaleTimeString('ar-SA');
    
    // حساب الإجمالي
    const totalAmount = order.total || order.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0) || 0;
    
    let itemsHTML = '';
    if (order.items && order.items.length > 0) {
        itemsHTML = order.items.map(item => {
            const product = item.product || {};
            const itemTotal = product.price * item.quantity;
            return `
                <tr>
                    <td>
                        <img src="${product.images?.[0] || 'images/placeholder.jpg'}" 
                             style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                    </td>
                    <td>${product.name || 'منتج محذوف'}</td>
                    <td>$${product.price?.toFixed(2) || '0.00'}</td>
                    <td>${item.quantity}</td>
                    <td><strong>$${itemTotal.toFixed(2)}</strong></td>
                </tr>
            `;
        }).join('');
    } else {
        itemsHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 20px;">
                    <i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i>
                    <p>لا توجد منتجات في هذا الطلب</p>
                </td>
            </tr>
        `;
    }
    
    document.getElementById('order-details-content').innerHTML = `
        <div class="order-details">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-user"></i> معلومات العميل
                    </h4>
                    <p><strong>الاسم:</strong> ${order.customerName || 'غير معروف'}</p>
                    <p><strong>الهاتف:</strong> ${order.customerPhone || 'غير معروف'}</p>
                    <p><strong>العنوان:</strong> ${order.customerAddress || 'غير معروف'}</p>
                    <p><strong>الملاحظات:</strong> ${order.notes || 'لا توجد ملاحظات'}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-receipt"></i> معلومات الطلب
                    </h4>
                    <p><strong>رقم الطلب:</strong> ${order.id}</p>
                    <p><strong>التاريخ:</strong> ${formattedDate}</p>
                    <p><strong>الحالة:</strong> ${statusText}</p>
                    <p><strong>طريقة الدفع:</strong> ${order.paymentMethod === 'sham-cash' ? 'شام كاش' : order.paymentMethod || 'غير محدد'}</p>
                    <p><strong>الإجمالي:</strong> <span style="color: var(--accent-color); font-size: 1.2rem; font-weight: bold;">$${totalAmount.toFixed(2)}</span></p>
                </div>
            </div>
            
            <h4 style="color: var(--primary-color); margin: 25px 0 15px; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-boxes"></i> المنتجات
            </h4>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden;">
                    <thead style="background: var(--primary-color); color: white;">
                        <tr>
                            <th style="padding: 15px; text-align: right;">الصورة</th>
                            <th style="padding: 15px; text-align: right;">المنتج</th>
                            <th style="padding: 15px; text-align: right;">السعر</th>
                            <th style="padding: 15px; text-align: right;">الكمية</th>
                            <th style="padding: 15px; text-align: right;">المجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
            </div>
            
            ${order.paymentProof ? `
                <h4 style="color: var(--primary-color); margin: 30px 0 15px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-receipt"></i> إشعار التحويل
                </h4>
                <div style="text-align: center; background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <img src="${order.paymentProof}" 
                         alt="إشعار التحويل" 
                         style="max-width: 300px; max-height: 400px; border: 1px solid #ddd; padding: 5px; background: white; border-radius: 5px;">
                </div>
            ` : ''}
        </div>
    `;
    
    openModal('order-details-modal');
}

function updateOrderStatus(orderId, newStatus) {
    const updated = db.updateOrderStatus(orderId, newStatus);
    if (updated) {
        showEnhancedNotification('تم تحديث حالة الطلب بنجاح', 'success');
        loadOrdersTable();
    } else {
        showEnhancedNotification('حدث خطأ في تحديث حالة الطلب', 'error');
    }
}

// ===== إعدادات الموقع =====

function loadAllSettings() {
    loadSiteSettings();
    loadMainImageSettings();
    loadWhyChooseSettings();
    loadFooterSettings();
    loadSocialMediaSettings();
    loadBarcodeSettings();
    loadShippingSettings();
}

function loadSiteSettings() {
    const settings = db.getSiteSettings();
    if (!settings) return;
    
    document.getElementById('site-name').value = settings.siteName || '';
    document.getElementById('site-logo').value = settings.logo || '';
}

function saveSiteSettings() {
    const siteName = document.getElementById('site-name').value;
    const logo = document.getElementById('site-logo').value;
    
    if (!siteName || !logo) {
        showEnhancedNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    const updated = db.updateSiteSettings({
        siteName: siteName,
        logo: logo
    });
    
    if (updated) {
        showEnhancedNotification('تم حفظ إعدادات الموقع بنجاح', 'success');
        
        // تحديث الشعار والعنوان في لوحة التحكم
        document.getElementById('dashboard-logo').src = logo;
        document.getElementById('dashboard-title').textContent = siteName + ' - لوحة التحكم';
        document.getElementById('dashboard-title-main').innerHTML = `<i class="fas fa-tachometer-alt"></i> ${siteName} - لوحة التحكم`;
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ الإعدادات', 'error');
    }
}

// ===== الصورة الرئيسية =====

function loadMainImageSettings() {
    const settings = db.getSiteSettings();
    const mainImageUrl = settings.mainImage || '';
    
    document.getElementById('main-image-url').value = mainImageUrl;
    
    // تحديث المعاينة
    const preview = document.getElementById('main-image-preview');
    if (preview) {
        preview.src = mainImageUrl;
        preview.onerror = function() {
            this.src = 'images/placeholder-banner.jpg';
            this.style.display = 'block';
        };
        preview.style.display = mainImageUrl ? 'block' : 'none';
    }
    
    // تحديث المعاينة عند الكتابة
    document.getElementById('main-image-url').addEventListener('input', function() {
        const preview = document.getElementById('main-image-preview');
        if (preview) {
            preview.src = this.value;
            preview.style.display = 'block';
        }
    });
}

function saveMainImage() {
    const mainImageUrl = document.getElementById('main-image-url').value;
    
    if (!mainImageUrl) {
        showEnhancedNotification('يرجى إدخال رابط الصورة', 'error');
        return;
    }
    
    const updated = db.updateSiteSettings({ mainImage: mainImageUrl });
    
    if (updated) {
        showEnhancedNotification('تم حفظ الصورة الرئيسية بنجاح', 'success');
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ الصورة', 'error');
    }
}

// ===== لماذا تختارنا =====

function loadWhyChooseSettings() {
    const settings = db.getSiteSettings();
    document.getElementById('why-choose-text').value = settings.whyChooseUs || '';
}

function saveWhyChooseText() {
    const whyChooseText = document.getElementById('why-choose-text').value;
    
    if (!whyChooseText) {
        showEnhancedNotification('يرجى إدخال نص القسم', 'error');
        return;
    }
    
    const updated = db.updateSiteSettings({ whyChooseUs: whyChooseText });
    
    if (updated) {
        showEnhancedNotification('تم حفظ النص بنجاح', 'success');
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ النص', 'error');
    }
}

// ===== إعدادات الفوتر =====

function loadFooterSettings() {
    const settings = db.getSiteSettings();
    
    document.getElementById('footer-text').value = settings.footerText || '';
    document.getElementById('footer-phone').value = settings.contactInfo?.phone || '';
    document.getElementById('footer-email').value = settings.contactInfo?.email || '';
    document.getElementById('footer-address').value = settings.contactInfo?.address || '';
}

function saveFooterSettings() {
    const footerText = document.getElementById('footer-text').value;
    const phone = document.getElementById('footer-phone').value;
    const email = document.getElementById('footer-email').value;
    const address = document.getElementById('footer-address').value;
    
    if (!footerText || !phone || !email || !address) {
        showEnhancedNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    const updates = {
        footerText,
        contactInfo: {
            phone,
            email,
            address
        }
    };
    
    const updated = db.updateSiteSettings(updates);
    
    if (updated) {
        showEnhancedNotification('تم حفظ إعدادات الفوتر بنجاح', 'success');
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ الإعدادات', 'error');
    }
}

// ===== وسائل التواصل الاجتماعي =====

function loadSocialMediaSettings() {
    const settings = db.getSiteSettings();
    const social = settings.socialMedia || {};
    
    document.getElementById('social-facebook').value = social.facebook || '';
    document.getElementById('social-instagram').value = social.instagram || '';
    document.getElementById('social-whatsapp').value = social.whatsapp || '';
    document.getElementById('social-telegram').value = social.telegram || '';
}

function saveSocialMedia() {
    const facebook = document.getElementById('social-facebook').value;
    const instagram = document.getElementById('social-instagram').value;
    const whatsapp = document.getElementById('social-whatsapp').value;
    const telegram = document.getElementById('social-telegram').value;
    
    const updates = {
        socialMedia: {
            facebook,
            instagram,
            whatsapp,
            telegram
        }
    };
    
    const updated = db.updateSiteSettings(updates);
    
    if (updated) {
        showEnhancedNotification('تم حفظ وسائل التواصل بنجاح', 'success');
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ وسائل التواصل', 'error');
    }
}

// ===== باركود الدفع =====

function loadBarcodeSettings() {
    const settings = db.getSiteSettings();
    const barcodeUrl = settings.barcode || '';
    
    document.getElementById('barcode-url').value = barcodeUrl;
    
    // تحديث المعاينة
    const preview = document.getElementById('barcode-preview');
    if (preview) {
        preview.src = barcodeUrl;
        preview.onerror = function() {
            this.src = 'images/placeholder-barcode.png';
            this.style.display = 'block';
        };
        preview.style.display = barcodeUrl ? 'block' : 'none';
    }
    
    // تحديث المعاينة عند الكتابة
    document.getElementById('barcode-url').addEventListener('input', function() {
        const preview = document.getElementById('barcode-preview');
        if (preview) {
            preview.src = this.value;
            preview.style.display = 'block';
        }
    });
}

function saveBarcode() {
    const barcodeUrl = document.getElementById('barcode-url').value;
    
    if (!barcodeUrl) {
        showEnhancedNotification('يرجى إدخال رابط صورة الباركود', 'error');
        return;
    }
    
    const updated = db.updateSiteSettings({ barcode: barcodeUrl });
    
    if (updated) {
        showEnhancedNotification('تم حفظ الباركود بنجاح', 'success');
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ الباركود', 'error');
    }
}

// ===== ملاحظة الشحن =====

function loadShippingSettings() {
    const settings = db.getSiteSettings();
    document.getElementById('shipping-note').value = settings.shippingNote || '';
}

function saveShippingNote() {
    const shippingNote = document.getElementById('shipping-note').value;
    
    if (!shippingNote) {
        showEnhancedNotification('يرجى إدخال ملاحظة الشحن', 'error');
        return;
    }
    
    const updated = db.updateSiteSettings({ shippingNote: shippingNote });
    
    if (updated) {
        showEnhancedNotification('تم حفظ ملاحظة الشحن بنجاح', 'success');
        
        // تحديث الموقع
        if (typeof loadSiteData === 'function') {
            loadSiteData();
        }
    } else {
        showEnhancedNotification('حدث خطأ في حفظ ملاحظة الشحن', 'error');
    }
}

// ===== المودال =====

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ===== الإشعارات =====

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
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: ${type === 'success' ? '#d4edda' : 
                     type === 'error' ? '#f8d7da' : 
                     type === 'warning' ? '#fff3cd' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : 
                type === 'error' ? '#721c24' : 
                type === 'warning' ? '#856404' : '#0c5460'};
        padding: 20px 30px;
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
        max-width: 90%;
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // ظهور مع أنيميشن
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // إخفاء تلقائي
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => notification.remove(), 500);
        }
    }, duration);
}

// ===== تهيئة لوحة التحكم =====

document.addEventListener('DOMContentLoaded', function() {
    // إضافة أنيميشن CSS
    const style = document.createElement('style');
    style.textContent = `
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
            color: inherit;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .text-center {
            text-align: center;
        }
        
        .d-inline-block {
            display: inline-block;
        }
        
        .ml-2 {
            margin-right: 10px;
        }
        
        .w-auto {
            width: auto;
        }
    `;
    document.head.appendChild(style);
    
    // إعداد مستمعات الأحداث للبحث
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        if (input.id.includes('search')) {
            let timeout;
            input.addEventListener('input', function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (this.id === 'product-search') {
                        loadProductsTable();
                    }
                }, 500);
            });
        }
    });
    
    // تحديث البيانات بشكل دوري
    setInterval(() => {
        if (document.querySelector('#dashboard.tab-content.active')) {
            loadDashboardStats();
        }
        if (document.querySelector('#orders.tab-content.active')) {
            loadOrdersTable();
        }
    }, 30000); // كل 30 ثانية
    
    console.log('تم تحميل لوحة التحكم بنجاح');
});

// ===== تصدير الوظائف =====

window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.logout = logout;
window.openAddProductModal = openAddProductModal;
window.editProduct = editProduct;
window.saveProduct = saveProduct;
window.deleteProduct = deleteProduct;
window.viewOrderDetails = viewOrderDetails;
window.updateOrderStatus = updateOrderStatus;
window.openModal = openModal;
window.closeModal = closeModal;
window.saveSiteSettings = saveSiteSettings;
window.saveMainImage = saveMainImage;
window.saveWhyChooseText = saveWhyChooseText;
window.saveFooterSettings = saveFooterSettings;
window.saveSocialMedia = saveSocialMedia;
window.saveBarcode = saveBarcode;
window.saveShippingNote = saveShippingNote;
window.showEnhancedNotification = showEnhancedNotification;