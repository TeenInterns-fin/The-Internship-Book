const packages = {
    digital: {
        name: 'Digital Edition',
        price: 25,
        originalPrice: 35,
        shipping: 0,
        requiresShipping: false,
        features: [
            '📱 Digital book access',
            '🎥 All video content',
            '📝 Downloadable resources',
            '🔄 Lifetime updates'
        ]
    },
    bundle: {
        name: 'Print + Digital Bundle',
        price: 45,
        originalPrice: 60,
        shipping: 0,
        requiresShipping: true,
        features: [
            '📖 Physical book',
            '📱 Digital access',
            '🎥 All video content',
            '📦 Free shipping',
            '💯 First-edition benefits'
        ]
    },
    premium: {
        name: 'Premium Package',
        price: 75,
        originalPrice: 100,
        shipping: 0,
        requiresShipping: true,
        features: [
            '📖 Signed first edition',
            '📱 Digital access',
            '🎁 Exclusive merchandise',
            '🤝 Virtual meet with authors',
            '🎯 Private community access'
        ]
    }
};

let selectedPackage = null;

function initPreorderSystem() {
    try {
        console.log('Initializing preorder system...');
        updateCountdown();
        setInterval(updateCountdown, 1000);
        setupPreorderButtons();
        setupFormValidation();
        console.log('Preorder system initialized successfully');
    } catch (error) {
        console.error('Error initializing preorder system:', error);
    }
}

function setupPreorderButtons() {
    document.querySelectorAll('.order-btn:not(.bundle-btn)').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const packageTypes = ['digital', 'premium'];
            const packageType = packageTypes[index] || 'digital';
            openPreorderModal(packageType);
        });
    });
}

function openPreorderModal(packageType) {
    selectedPackage = packages[packageType];
    
    if (!document.getElementById('preorderModal')) {
        createPreorderModal();
    }
    
    updateModalContent();
    showModal();
}

function updateModalContent() {
    if (!selectedPackage) return;

    document.getElementById('modalTitle').textContent = `Pre-order ${selectedPackage.name}`;
    
    document.getElementById('selectedPackage').innerHTML = `
        <div class="package-info">
            <h4>${selectedPackage.name}</h4>
            <div class="package-pricing">
                <span class="current-price">$${selectedPackage.price}</span>
                <span class="original-price">$${selectedPackage.originalPrice}</span>
            </div>
        </div>
    `;
    
    document.getElementById('packageFeatures').innerHTML = 
        selectedPackage.features.map(feature => `<li>${feature}</li>`).join('');
    
    document.getElementById('packageName').textContent = selectedPackage.name;
    document.getElementById('packagePrice').textContent = `$${selectedPackage.price}`;
    document.getElementById('totalPrice').textContent = `$${selectedPackage.price + selectedPackage.shipping}`;
    
    const btnAmount = document.querySelector('.btn-amount');
    if (btnAmount) {
        btnAmount.textContent = `$${selectedPackage.price}`;
    }
    
    const shippingSection = document.getElementById('shippingSection');
    if (selectedPackage.requiresShipping) {
        shippingSection.style.display = 'block';
        setShippingFieldsRequired(true);
    } else {
        shippingSection.style.display = 'none';
        setShippingFieldsRequired(false);
    }
}

function createPreorderModal() {
    const modalHTML = `
    <div class="preorder-modal" id="preorderModal">
        <div class="modal-overlay" onclick="closePreorderModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closePreorderModal()">&times;</button>
            
            <div class="modal-header">
                <h2 id="modalTitle">Join Our Pre-order List</h2>
                <div class="selected-package" id="selectedPackage"></div>
            </div>
            
            <form class="preorder-form" id="preorderForm">
                <div class="form-section">
                    <h3>📦 Package Details</h3>
                    <ul class="package-features" id="packageFeatures"></ul>
                </div>
                
                <div class="form-section">
                    <h3>👤 Your Information</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required>
                            <div class="error-message"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                        <div class="error-message"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number (Optional)</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    
                    <div class="form-group">
                        <label for="studentStatus">Are you currently a student?</label>
                        <select id="studentStatus" name="studentStatus">
                            <option value="yes">Yes, I'm a student</option>
                            <option value="no">No, I'm working</option>
                            <option value="recent_graduate">Recent Graduate</option>
                            <option value="parent">Parent/Guardian</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="school">School/Institution (Optional)</label>
                        <input type="text" id="school" name="school">
                    </div>
                </div>
                
                <div class="form-section" id="shippingSection">
                    <h3>🚚 Shipping Information</h3>
                    <div class="form-group">
                        <label for="country">Country *</label>
                        <select id="country" name="country">
                            <option value="">Select Country</option>
                            <option value="IN">India</option>
                            <option value="US">United States</option>
                            <option value="GB">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                            <option value="OTHER">Other</option>
                        </select>
                        <div class="error-message"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="city">City *</label>
                        <input type="text" id="city" name="city">
                        <div class="error-message"></div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>💰 Pre-order Summary</h3>
                    <div class="order-summary">
                        <div class="summary-item">
                            <span id="packageName"></span>
                            <span id="packagePrice"></span>
                        </div>
                        <div class="summary-item discount">
                            <span>Early Bird Discount</span>
                            <span id="discountAmount" class="discount-text">-$10</span>
                        </div>
                        <div class="summary-item">
                            <span>Shipping</span>
                            <span id="shippingCost">Free</span>
                        </div>
                        <div class="summary-item total">
                            <span>Total</span>
                            <span id="totalPrice"></span>
                        </div>
                    </div>
                </div>
                
                <div class="payment-section">
                    <h3>📧 How This Works</h3>
                    <div class="info-box">
                        <p><strong>Step 1:</strong> Join our pre-order list by submitting this form</p>
                        <p><strong>Step 2:</strong> We'll email you when the book launches (July 24, 2025)</p>
                        <p><strong>Step 3:</strong> Complete your purchase with secure payment options</p>
                        <p><strong>Step 4:</strong> Receive your book and start your internship journey!</p>
                    </div>
                    
                    <div class="security-badges">
                        <div class="security-item">
                            <span>✉️</span>
                            <span>Email notifications only</span>
                        </div>
                        <div class="security-item">
                            <span>🔒</span>
                            <span>No payment required now</span>
                        </div>
                        <div class="security-item">
                            <span>🚫</span>
                            <span>No spam, ever</span>
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closePreorderModal()">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <span class="btn-text">Join Pre-order List</span>
                        <span class="btn-amount">Free</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupFormHandlers();
}

function setShippingFieldsRequired(required) {
    const fields = ['country', 'city'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.required = required;
        }
    });
}

function setupFormValidation() {
    document.addEventListener('input', function(e) {
        if (e.target.matches('#email')) {
            validateField(e.target);
        }
        
        if (e.target.matches('input[required], select[required]')) {
            validateField(e.target);
        }
    });
}

function validateField(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    field.classList.remove('error');
    if (errorElement) errorElement.textContent = '';

    if (field.required && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = errorMessage;
    }

    return isValid;
}

function setupFormHandlers() {
    const form = document.getElementById('preorderForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                showNotification('Please fix the errors in the form', 'error');
                return;
            }
            
            const formData = new FormData(this);
            const orderData = collectOrderData(formData);
            
            processStaticPreorder(orderData);
        });
    }
}

function validateForm() {
    const form = document.getElementById('preorderForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function collectOrderData(formData) {
    return {
        package: selectedPackage,
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            studentStatus: formData.get('studentStatus'),
            school: formData.get('school')
        },
        shipping: selectedPackage.requiresShipping ? {
            country: formData.get('country'),
            city: formData.get('city')
        } : null,
        total: selectedPackage.price + selectedPackage.shipping,
        currency: 'USD',
        orderDate: new Date().toISOString(),
        orderId: generateOrderId()
    };
}

function processStaticPreorder(orderData) {
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        saveOrderLocally(orderData);
        
        createEmailNotification(orderData);
        
        showSuccessMessage(orderData);
        
        closePreorderModal();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function createEmailNotification(orderData) {
    const subject = `Pre-order Interest: ${orderData.package.name} - ${orderData.customer.firstName} ${orderData.customer.lastName}`;
    const body = `
New pre-order interest received!

Customer Details:
- Name: ${orderData.customer.firstName} ${orderData.customer.lastName}
- Email: ${orderData.customer.email}
- Phone: ${orderData.customer.phone || 'Not provided'}
- Student Status: ${orderData.customer.studentStatus}
- School: ${orderData.customer.school || 'Not provided'}

Package Details:
- Package: ${orderData.package.name}
- Price: $${orderData.package.price}
${orderData.shipping ? `
Shipping Info:
- Country: ${orderData.shipping.country}
- City: ${orderData.shipping.city}` : ''}

Order ID: ${orderData.orderId}
Date: ${new Date(orderData.orderDate).toLocaleString()}

Please follow up with this customer when the book launches!
    `;

    const mailtoLink = `mailto:support@teeninterns.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    console.log('Pre-order data:', orderData);
    console.log('Email link:', mailtoLink);
}

function saveOrderLocally(orderData) {
    const orders = JSON.parse(localStorage.getItem('preorders') || '[]');
    orders.push({
        ...orderData,
        status: 'interested',
        timestamp: Date.now()
    });
    localStorage.setItem('preorders', JSON.stringify(orders));
}

function generateOrderId() {
    return 'TIB_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function showModal() {
    const modal = document.getElementById('preorderModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (window.gsap) {
        gsap.fromTo(modal.querySelector('.modal-content'), 
            {scale: 0.5, opacity: 0, y: 50},
            {scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)'}
        );
    }
}

function closePreorderModal() {
    const modal = document.getElementById('preorderModal');
    document.body.style.overflow = '';
    
    if (window.gsap) {
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.5,
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
                document.getElementById('preorderForm').reset();
            }
        });
    } else {
        modal.classList.remove('active');
        document.getElementById('preorderForm').reset();
    }
}

function showSuccessMessage(orderData) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal active';
    successModal.innerHTML = `
        <div class="success-overlay"></div>
        <div class="success-content">
            <div class="success-header">
                <div class="success-icon">🎉</div>
                <h2>You're on the list!</h2>
                <p>Thank you ${orderData.customer.firstName} for your interest in The Internship Book!</p>
            </div>
            
            <div class="success-details">
                <div class="detail-item">
                    <strong>Package:</strong> ${orderData.package.name}
                </div>
                <div class="detail-item">
                    <strong>Email:</strong> ${orderData.customer.email}
                </div>
                <div class="detail-item">
                    <strong>Launch Date:</strong> July 24, 2025
                </div>
            </div>
            
            <div class="success-actions">
                <p>📧 We'll email you when the book launches</p>
                <p>📱 Follow us on social media for updates</p>
                <p>🎁 Early bird pricing will be available at launch</p>
            </div>
            
            <button class="success-btn" onclick="this.closest('.success-modal').remove()">
                Continue Exploring
            </button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        if (successModal.parentElement) {
            successModal.remove();
        }
    }, 10000);
}

function updateCountdown() {
    try {
        const launchDate = new Date('2025-08-09T16:00:00').getTime();
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            updateCountdownDisplay(days, hours, minutes, seconds);
        } else {
            updateCountdownDisplay(0, 0, 0, 0);
            handleLaunchComplete();
        }
    } catch (error) {
        console.error('Error updating countdown:', error);
    }
}

function updateCountdownDisplay(days, hours, minutes, seconds) {
    try {
        const timerUnits = document.querySelectorAll('.timer-unit');
        
        if (timerUnits.length === 0) {
            console.warn('No timer units found');
            return;
        }
        
        timerUnits.forEach(unit => {
            const label = unit.querySelector('.timer-label');
            const number = unit.querySelector('.timer-number');
            
            if (label && number) {
                const labelText = label.textContent.toLowerCase();
                
                if (labelText.includes('day')) {
                    number.textContent = days;
                } else if (labelText.includes('hour')) {
                    number.textContent = String(hours).padStart(2, '0');
                } else if (labelText.includes('minute')) {
                    number.textContent = String(minutes).padStart(2, '0');
                } else if (labelText.includes('second')) {
                    number.textContent = String(seconds).padStart(2, '0');
                }
            }
        });
    } catch (error) {
        console.error('Error updating countdown display:', error);
    }
}

function handleLaunchComplete() {
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.textContent = btn.textContent.replace('Pre-order', 'Order Now');
    });
    
    const countdownLabel = document.querySelector('.countdown-label');
    if (countdownLabel) {
        countdownLabel.textContent = 'Book is now available!';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.countdown-timer')) {
        initPreorderSystem();
        initLocationDetection();
    }
});

function initLocationDetection() {
    try {
        detectUserLocation();
    } catch (error) {
        console.log('Location detection failed, showing all content by default');
        showAllContent();
    }
}

function detectUserLocation() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndianTimezone = timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta');
    
    if (isIndianTimezone) {
        handleIndianUser();
        return;
    }
    
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.country_code === 'IN') {
                handleIndianUser();
            } else {
                handleNonIndianUser(data.country_name || 'your country');
            }
        })
        .catch(() => {
            fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(data => {
                    if (data.country === 'IN') {
                        handleIndianUser();
                    } else {
                        handleNonIndianUser(data.country || 'your country');
                    }
                })
                .catch(() => {
                    console.log('All geolocation services failed, showing all content');
                    showAllContent();
                });
        });
}

function handleIndianUser() {
    console.log('Indian user detected - showing India-specific content');
    
    const indiaBadges = document.querySelectorAll('.india-badge');
    indiaBadges.forEach(badge => {
        badge.style.display = 'flex';
    });
    
    updateContentForIndia();
    
    showLocationNotification('🇮🇳 Great! You\'re in India. Enjoy free shipping and exclusive Indian content!', 'success');
}

function handleNonIndianUser(country) {
    console.log(`Non-Indian user detected from ${country} - adjusting content`);
    
    const indiaBadges = document.querySelectorAll('.india-badge');
    indiaBadges.forEach(badge => {
        badge.style.display = 'none';
    });
    
    updateContentForInternational(country);
    
    showLocationNotification(
        `🌍 We see you're in ${country}. Digital access is available worldwide! Physical books available with international shipping.`, 
        'info'
    );
}

function updateContentForIndia() {
    const featuresLists = document.querySelectorAll('.features-list');
    featuresLists.forEach(list => {
        const listItems = list.querySelectorAll('li');
        listItems.forEach(item => {
            if (item.textContent.includes('shipping')) {
                item.innerHTML = '🚚 <strong>Free shipping across India</strong>';
            }
            if (item.textContent.includes('Physical book') && !item.textContent.includes('delivered')) {
                item.innerHTML = '📖 Physical book delivered in India';
            }
        });
    });
    
    featuresLists.forEach(list => {
        const hasIndianContent = Array.from(list.children).some(li => 
            li.textContent.includes('India-exclusive')
        );
        
        if (!hasIndianContent) {
            const indianFeature = document.createElement('li');
            indianFeature.innerHTML = '🇮🇳 Special India-exclusive content';
            list.appendChild(indianFeature);
        }
    });
}

function updateContentForInternational(country) {
    const priceNotes = document.querySelectorAll('.price-note');
    priceNotes.forEach(note => {
        if (note.textContent.includes('early bird')) {
            note.innerHTML = note.innerHTML + '<br><small style="color: #666; font-size: 0.8rem;">+ International shipping to ' + country + '</small>';
        }
    });
    
    const featuresLists = document.querySelectorAll('.features-list');
    featuresLists.forEach(list => {
        const listItems = list.querySelectorAll('li');
        listItems.forEach(item => {
            if (item.textContent.includes('Free shipping')) {
                item.innerHTML = '🌍 International shipping available';
            }
            if (item.textContent.includes('delivered in India')) {
                item.innerHTML = '📖 Physical book (international shipping)';
            }
            if (item.textContent.includes('India-exclusive')) {
                item.style.display = 'none';
            }
        });
    });
    
    const cardHeaders = document.querySelectorAll('.card-header');
    cardHeaders.forEach(header => {
        const subtitle = header.querySelector('.price-note');
        if (subtitle && !subtitle.textContent.includes('Digital access')) {
            const digitalNote = document.createElement('div');
            digitalNote.style.cssText = 'font-size: 0.9rem; color: var(--primary-color); margin-top: 10px; font-weight: 600;';
            digitalNote.innerHTML = '📱 Instant digital access worldwide';
            header.appendChild(digitalNote);
        }
    });
}

function showAllContent() {
    const indiaBadges = document.querySelectorAll('.india-badge');
    indiaBadges.forEach(badge => {
        badge.style.display = 'flex';
    });
}

function showLocationNotification(message, type = 'info') {
    if (document.querySelector('.location-notification')) {
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type} location-notification`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

window.PreorderSystem = {
    openPreorderModal,
    closePreorderModal,
    initPreorderSystem
};