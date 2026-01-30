// dashboard.js - لوحة التحكم المتكاملة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل الإعدادات عند بدء التشغيل
    loadDashboardData();
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    // تحميل الطلبات
    loadOrders();
});

function loadDashboardData() {
    const settings = db.getSiteSettings();
    
    // تعبئة حقول الإعدادات
    document.getElementById('site-name-input').value = settings.siteName || '';
    document.getElementById('site-logo-input').value = settings.logo || '';
    document.getElementById('main-image-input').value = settings.mainImage || '';
    document.getElementById('why-choose-input').value = settings.whyChooseUs || '';
    document.getElementById('footer-text-input').value = settings.footerText || '';
    document.getElementById('barcode-input').value = settings.barcode || '';
    document.getElementById('shipping-note-input').value = settings.shippingNote || '';
    
    // وسائل التواصل الاجتماعي
    document.getElementById('facebook-input').value = settings.socialMedia?.facebook || '';
    document.getElementById('instagram-input').value = settings.socialMedia?.instagram || '';
    document.getElementById('whatsapp-input').value = settings.socialMedia?.whatsapp || '';
    document.getElementById('telegram-input').value = settings.socialMedia?.telegram || '';
    
    // معلومات الاتصال
    document.getElementById('contact-phone-input').value = settings.contactInfo?.phone || '';
    document.getElementById('contact-email-input').value = settings.contactInfo?.email || '';
    document.getElementById('contact-address-input').value = settings.contactInfo?.address || '';
    
    // تحديث المعاينات
    updatePreviews();
    
    // تحميل المنتجات
    loadProducts();
}

function setupEventListeners() {
    // تحديث الإعدادات
    document.getElementById('save-settings')?.addEventListener('click', saveSiteSettings);
    document.getElementById('save-main-image')?.addEventListener('click', saveMainImage);
    document.getElementById('save-why-choose')?.addEventListener('click', saveWhyChooseUs);
    document.getElementById('save-footer')?.addEventListener('click', saveFooterSettings);
    document.getElementById('save-social-media')?.addEventListener('click', saveSocialMedia);
    document.getElementById('save-contact-info')?.addEventListener('click', saveContactInfo);
    document.getElementById('save-barcode')?.addEventListener('click', saveBarcode);
    document.getElementById('save-shipping-note')?.addEventListener('click', saveShippingNote);
    
    // إدارة المنتجات
    document.getElementById('add-product-btn')?.addEventListener('click', showAddProductModal);
    document.getElementById('save-product-btn')?.addEventListener('click', saveProduct);
    
    // تحديث المعاينة أثناء الكتابة
    const previewInputs = [
        'site-name-input', 'site-logo-input', 'main-image-input',
        'why-choose-input', 'footer-text-input', 'barcode-input'
    ];
    
    previewInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updatePreviews);
        }
    });
    
    // البحث في المنتجات
    document.getElementById('product-search')?.addEventListener('input', filterProducts);
}

function updatePreviews() {
    const siteName = document.getElementById('site-name-input')?.value || '';
    const logoUrl = document.getElementById('site-logo-input')?.value || '';
    const mainImageUrl = document.getElementById('main-image-input')?.value || '';
    const barcodeUrl = document.getElementById('barcode-input')?.value || '';
    
    // معاينة اللوجو
    const logoPreview = document.getElementById('logo-preview');
    if (logoPreview) {
        logoPreview.src = logoUrl || 'images/placeholder-logo.png';
        logoPreview.style.display = logoUrl ? 'block' : 'none';
    }
    
    // معاينة الصورة الرئيسية
    const mainImagePreview = document.getElementById('main-image-preview');
    if (mainImagePreview) {
        mainImagePreview.src = mainImageUrl || 'images/placeholder-banner.jpg';
        mainImagePreview.style.display = mainImageUrl ? 'block' : 'none';
    }
    
    // معاينة الباركود
    const barcodePreview = document.getElementById('barcode-preview');
    if (barcodePreview) {
        barcodePreview.src = barcodeUrl || 'images/placeholder-barcode.png';
        barcodePreview.style.display = barcodeUrl ? 'block' : 'none';
    }
}

// حفظ الإعدادات
function saveSiteSettings() {
    const siteName = document.getElementById('site-name-input').value;
    const logo = document.getElementById('site-logo-input').value;
    
    const updated = db.updateSiteSettings({
        siteName: siteName,
        logo: logo
    });
    
    showNotification(updated ? 'تم حفظ إعدادات الموقع بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveMainImage() {
    const mainImage = document.getElementById('main-image-input').value;
    
    const updated = db.updateSiteSettings({
        mainImage: mainImage
    });
    
    showNotification(updated ? 'تم حفظ الصورة الرئيسية بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveWhyChooseUs() {
    const whyChooseUs = document.getElementById('why-choose-input').value;
    
    const updated = db.updateSiteSettings({
        whyChooseUs: whyChooseUs
    });
    
    showNotification(updated ? 'تم حفظ النص بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveFooterSettings() {
    const footerText = document.getElementById('footer-text-input').value;
    
    const updated = db.updateSiteSettings({
        footerText: footerText
    });
    
    showNotification(updated ? 'تم حفظ إعدادات الفوتر بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveSocialMedia() {
    const facebook = document.getElementById('facebook-input').value;
    const instagram = document.getElementById('instagram-input').value;
    const whatsapp = document.getElementById('whatsapp-input').value;
    const telegram = document.getElementById('telegram-input').value;
    
    const updated = db.updateSiteSettings({
        socialMedia: {
            facebook: facebook,
            instagram: instagram,
            whatsapp: whatsapp,
            telegram: telegram
        }
    });
    
    showNotification(updated ? 'تم حفظ وسائل التواصل بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveContactInfo() {
    const phone = document.getElementById('contact-phone-input').value;
    const email = document.getElementById('contact-email-input').value;
    const address = document.getElementById('contact-address-input').value;
    
    const updated = db.updateSiteSettings({
        contactInfo: {
            phone: phone,
            email: email,
            address: address
        }
    });
    
    showNotification(updated ? 'تم حفظ معلومات الاتصال بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveBarcode() {
    const barcode = document.getElementById('barcode-input').value;
    
    const updated = db.updateSiteSettings({
        barcode: barcode
    });
    
    showNotification(updated ? 'تم حفظ الباركود بنجاح' : 'حدث خطأ في الحفظ', updated);
}

function saveShippingNote() {
    const shippingNote = document.getElementById('shipping-note-input').value;
    
    const updated = db.updateSiteSettings({
        shippingNote: shippingNote
    });
    
    showNotification(updated ? 'تم حفظ ملاحظة الشحن بنجاح' : 'حدث خطأ في الحفظ', updated);
}

// إدارة المنتجات
function loadProducts() {
    const products = db.getAllProducts();
    const container = document.getElementById('products-list');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<tr><td colspan="7" class="text-center">لا توجد منتجات</td></tr>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <tr data-id="${product.id}">
            <td>
                <img src="${product.images[0] || 'images/placeholder-product.jpg'}" 
                     alt="${product.name}" 
                     class="product-thumbnail">
            </td>
            <td>${product.name}</td>
            <td>${product.price} SP</td>
            <td>${product.category || 'غير مصنف'}</td>
            <td>
                <span class="badge ${product.featured ? 'badge-success' : 'badge-secondary'}">
                    ${product.featured ? 'نعم' : 'لا'}
                </span>
            </td>
            <td>
                <span class="badge ${product.specialOffer ? 'badge-warning' : 'badge-secondary'}">
                    ${product.specialOffer ? 'نعم' : 'لا'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function showAddProductModal() {
    // إنشاء وتعبئة مودال إضافة المنتج
    const modalHTML = `
        <div class="modal" id="productModal" style="display: block;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>إضافة منتج جديد</h3>
                    <span class="close" onclick="closeModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="product-form">
                        <div class="form-group">
                            <label>اسم المنتج:</label>
                            <input type="text" id="product-name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>السعر (SP):</label>
                            <input type="number" id="product-price" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>السعر القديم (اختياري):</label>
                            <input type="number" id="product-old-price" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>الوصف:</label>
                            <textarea id="product-description" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>الصور (رابط كل صورة في سطر):</label>
                            <textarea id="product-images" class="form-control" rows="3" 
                                      placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>الفئة:</label>
                                <select id="product-category" class="form-control">
                                    <option value="phones">هواتف</option>
                                    <option value="accessories">إكسسوارات</option>
                                    <option value="used-phones">هواتف مستعملة</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>التصنيف:</label>
                                <select id="product-category-type" class="form-control">
                                    <option value="new">جديد</option>
                                    <option value="used">مستعمل</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" id="product-featured" class="form-check-input">
                            <label class="form-check-label">منتج مميز</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" id="product-special" class="form-check-input">
                            <label class="form-check-label">عرض خاص</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    <button class="btn btn-primary" onclick="saveProduct()">حفظ المنتج</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة المودال إلى الصفحة
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // تعيين focus على أول حقل
    setTimeout(() => {
        document.getElementById('product-name')?.focus();
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.remove();
    }
}

function saveProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const oldPrice = document.getElementById('product-old-price').value ? 
                     parseFloat(document.getElementById('product-old-price').value) : null;
    const description = document.getElementById('product-description').value;
    const imagesText = document.getElementById('product-images').value;
    const category = document.getElementById('product-category').value;
    const categoryType = document.getElementById('product-category-type').value;
    const featured = document.getElementById('product-featured').checked;
    const specialOffer = document.getElementById('product-special').checked;
    
    if (!name || !price) {
        showNotification('يرجى ملء الحقول المطلوبة', false);
        return;
    }
    
    // تحويل النص إلى مصفوفة صور
    const images = imagesText.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    
    // إذا لم تكن هناك صور، إضافة صورة افتراضية
    if (images.length === 0) {
        images.push('images/placeholder-product.jpg');
    }
    
    const productData = {
        name: name,
        price: price,
        oldPrice: oldPrice,
        description: description,
        images: images,
        category: category,
        categoryType: categoryType,
        featured: featured,
        specialOffer: specialOffer,
        inStock: true
    };
    
    const product = db.addProduct(productData);
    
    if (product) {
        showNotification('تم إضافة المنتج بنجاح', true);
        closeModal();
        loadProducts(); // تحديث القائمة
    } else {
        showNotification('حدث خطأ في إضافة المنتج', false);
    }
}

function editProduct(productId) {
    const product = db.getProductById(productId);
    if (!product) return;
    
    showAddProductModal();
    
    // تعبئة الحقول ببيانات المنتج
    setTimeout(() => {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-old-price').value = product.oldPrice || '';
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-images').value = product.images.join('\n');
        document.getElementById('product-category').value = product.category || 'phones';
        document.getElementById('product-category-type').value = product.categoryType || 'new';
        document.getElementById('product-featured').checked = product.featured || false;
        document.getElementById('product-special').checked = product.specialOffer || false;
        
        // تغيير نص الزر
        const saveBtn = document.querySelector('.modal-footer .btn-primary');
        if (saveBtn) {
            saveBtn.textContent = 'تحديث المنتج';
            saveBtn.onclick = function() { updateProduct(productId); };
        }
    }, 100);
}

function updateProduct(productId) {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const oldPrice = document.getElementById('product-old-price').value ? 
                     parseFloat(document.getElementById('product-old-price').value) : null;
    const description = document.getElementById('product-description').value;
    const imagesText = document.getElementById('product-images').value;
    const category = document.getElementById('product-category').value;
    const categoryType = document.getElementById('product-category-type').value;
    const featured = document.getElementById('product-featured').checked;
    const specialOffer = document.getElementById('product-special').checked;
    
    if (!name || !price) {
        showNotification('يرجى ملء الحقول المطلوبة', false);
        return;
    }
    
    const images = imagesText.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    
    const updated = db.updateProduct(productId, {
        name: name,
        price: price,
        oldPrice: oldPrice,
        description: description,
        images: images,
        category: category,
        categoryType: categoryType,
        featured: featured,
        specialOffer: specialOffer
    });
    
    if (updated) {
        showNotification('تم تحديث المنتج بنجاح', true);
        closeModal();
        loadProducts();
    } else {
        showNotification('حدث خطأ في تحديث المنتج', false);
    }
}

function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        const deleted = db.deleteProduct(productId);
        if (deleted) {
            showNotification('تم حذف المنتج بنجاح', true);
            loadProducts();
        } else {
            showNotification('حدث خطأ في حذف المنتج', false);
        }
    }
}

function filterProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    const rows = document.querySelectorAll('#products-list tr');
    
    rows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// إدارة الطلبات
function loadOrders() {
    const orders = db.getOrders();
    const container = document.getElementById('orders-list');
    
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<tr><td colspan="8" class="text-center">لا توجد طلبات</td></tr>';
        return;
    }
    
    container.innerHTML = orders.map(order => {
        const statusBadge = {
            'pending': '<span class="badge badge-warning">قيد الانتظار</span>',
            'processing': '<span class="badge badge-info">قيد المعالجة</span>',
            'shipped': '<span class="badge badge-primary">تم الشحن</span>',
            'completed': '<span class="badge badge-success">مكتمل</span>',
            'cancelled': '<span class="badge badge-danger">ملغي</span>'
        }[order.status] || '<span class="badge badge-secondary">غير معروف</span>';
        
        const total = order.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0) || 0;
        
        return `
            <tr data-id="${order.id}">
                <td>${order.id}</td>
                <td>${order.customerName || 'غير معروف'}</td>
                <td>${order.customerPhone || 'غير معروف'}</td>
                <td>${order.customerAddress || 'غير معروف'}</td>
                <td>${total} SP</td>
                <td>${statusBadge}</td>
                <td>${new Date(order.createdAt).toLocaleDateString('ar-SA')}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <select class="form-control form-control-sm d-inline-block w-auto ml-2" 
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
    const order = db.getOrderById(orderId);
    if (!order) return;
    
    const detailsHTML = `
        <div class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>تفاصيل الطلب #${order.id}</h3>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="order-details">
                        <div class="row">
                            <div class="col-md-6">
                                <h4>معلومات العميل:</h4>
                                <p><strong>الاسم:</strong> ${order.customerName}</p>
                                <p><strong>الهاتف:</strong> ${order.customerPhone}</p>
                                <p><strong>العنوان:</strong> ${order.customerAddress}</p>
                                <p><strong>الملاحظات:</strong> ${order.notes || 'لا توجد ملاحظات'}</p>
                            </div>
                            <div class="col-md-6">
                                <h4>معلومات الطلب:</h4>
                                <p><strong>رقم الطلب:</strong> ${order.id}</p>
                                <p><strong>التاريخ:</strong> ${new Date(order.createdAt).toLocaleString('ar-SA')}</p>
                                <p><strong>الحالة:</strong> ${getStatusText(order.status)}</p>
                                <p><strong>طريقة الدفع:</strong> ${order.paymentMethod === 'sham-cash' ? 'شام كاش' : order.paymentMethod}</p>
                                <p><strong>الإجمالي:</strong> ${order.total} SP</p>
                            </div>
                        </div>
                        
                        <h4 class="mt-4">المنتجات:</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>الصورة</th>
                                    <th>المنتج</th>
                                    <th>السعر</th>
                                    <th>الكمية</th>
                                    <th>المجموع</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items?.map(item => `
                                    <tr>
                                        <td>
                                            <img src="${item.product?.images[0] || 'images/placeholder-product.jpg'}" 
                                                 alt="${item.product?.name}" 
                                                 style="width: 50px; height: 50px; object-fit: cover;">
                                        </td>
                                        <td>${item.product?.name}</td>
                                        <td>${item.product?.price} SP</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.product?.price * item.quantity} SP</td>
                                    </tr>
                                `).join('') || ''}
                            </tbody>
                        </table>
                        
                        ${order.paymentProof ? `
                            <h4>إشعار التحويل:</h4>
                            <div class="payment-proof">
                                <img src="${order.paymentProof}" 
                                     alt="إشعار التحويل" 
                                     style="max-width: 300px; border: 1px solid #ddd; padding: 5px;">
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = detailsHTML;
    document.body.appendChild(modalContainer);
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'قيد الانتظار',
        'processing': 'قيد المعالجة',
        'shipped': 'تم الشحن',
        'completed': 'مكتمل',
        'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
}

function updateOrderStatus(orderId, newStatus) {
    const updated = db.updateOrderStatus(orderId, newStatus);
    if (updated) {
        showNotification('تم تحديث حالة الطلب بنجاح', true);
        loadOrders();
    } else {
        showNotification('حدث خطأ في تحديث حالة الطلب', false);
    }
}

// وظائف مساعدة
function showNotification(message, isSuccess) {
    // إزالة أي إشعارات سابقة
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // إنشاء إشعار جديد
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// تصدير الوظائف إلى window
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.viewOrderDetails = viewOrderDetails;
window.updateOrderStatus = updateOrderStatus;