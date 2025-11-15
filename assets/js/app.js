// Product data
const quantities = { six: 0, twelve: 0, twenty: 0, medium: 0, large: 0 };
const prices = { six: 15, twelve: 27, twenty: 45, medium: 55, large: 65 };
const minOrders = { six: 10, twelve: 10, twenty: 10, medium: 50, large: 50 };
const names = { 
    six: '6 Pcs Pack', 
    twelve: '12 Pcs Pack', 
    twenty: '20 Pcs Pack', 
    medium: '30 Pcs Tray', 
    large: '30 Pcs Large Tray' 
};

// IMPORTANT: REPLACE THIS WITH YOUR WHATSAPP NUMBER (include country code, no + or spaces)
// Example for Ghana: 233241234567
const WHATSAPP_NUMBER = '233502095912';

// IMPORTANT: REPLACE WITH YOUR GOOGLE reCAPTCHA v3 SITE KEY
// Get your keys from: https://www.google.com/recaptcha/admin
// The test key below works for localhost testing only
const RECAPTCHA_SITE_KEY = '6LcAng0sAAAAAMNCvJd1UUV7F5yrsEa0MBMot_q7';

/**
 * Change quantity for a product
 * @param {string} product - Product identifier
 * @param {number} change - Change amount (+1 or -1)
 */
function changeQty(product, change) {
    const currentQty = quantities[product];
    const minOrder = minOrders[product];
    
    if (change > 0) {
        // When clicking +, if at 0, jump to minimum, otherwise increment by 1
        if (currentQty === 0) {
            quantities[product] = minOrder;
        } else {
            quantities[product] = currentQty + 1;
        }
    } else {
        // When clicking -, decrement by 1 but not below minimum (unless going to 0)
        const newQty = currentQty - 1;
        if (newQty < minOrder) {
            quantities[product] = 0;
        } else {
            quantities[product] = newQty;
        }
    }
    
    const inputField = document.getElementById(`qty-${product}`);
    inputField.textContent = quantities[product];
    
    const productCard = document.querySelector(`[data-product="${product}"]`);
    if (quantities[product] > 0) {
        productCard.classList.add('selected');
    } else {
        productCard.classList.remove('selected');
    }
    
    updateSummary();
}

/**
 * Validate quantity input when user types manually
 * @param {string} product - Product identifier
 */
function validateQtyInput(product) {
    const inputField = document.getElementById(`qty-${product}`);
    const minOrder = minOrders[product];
    const rawValue = inputField.value;
    
    // If empty, treat as 0
    if (rawValue === '') {
        quantities[product] = 0;
        inputField.classList.remove('error');
        inputField.title = '';
        
        const productCard = document.querySelector(`[data-product="${product}"]`);
        productCard.classList.remove('selected');
        updateSummary();
        return;
    }
    
    // Remove non-numeric characters
    let cleanValue = rawValue.replace(/[^0-9]/g, '');
    
    // If cleaning changed the value, update it
    if (cleanValue !== rawValue) {
        inputField.value = cleanValue;
    }
    
    // If empty after cleaning, treat as 0
    if (cleanValue === '') {
        quantities[product] = 0;
        inputField.classList.remove('error');
        inputField.title = '';
        
        const productCard = document.querySelector(`[data-product="${product}"]`);
        productCard.classList.remove('selected');
        updateSummary();
        return;
    }
    
    let value = parseInt(cleanValue);
    
    // Update quantity
    quantities[product] = value;
    
    // Check validation
    if (value > 0 && value < minOrder) {
        inputField.classList.add('error');
        inputField.title = `Minimum order is ${minOrder} units`;
    } else {
        inputField.classList.remove('error');
        inputField.title = '';
    }
    
    const productCard = document.querySelector(`[data-product="${product}"]`);
    if (value > 0) {
        productCard.classList.add('selected');
    } else {
        productCard.classList.remove('selected');
    }
    
    updateSummary();
}

/**
 * Update the order summary section
 */
function updateSummary() {
    const summaryDiv = document.getElementById('orderSummary');
    const itemsDiv = document.getElementById('summaryItems');
    const warningDiv = document.getElementById('emptyOrderWarning');
    let total = 0;
    let hasItems = false;
    let html = '';

    for (const product in quantities) {
        if (quantities[product] > 0) {
            hasItems = true;
            const itemTotal = quantities[product] * prices[product];
            total += itemTotal;
            html += `
                <div class="summary-item">
                    <span>${names[product]} × ${quantities[product]}</span>
                    <span>GH₵ ${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }
    }

    itemsDiv.innerHTML = html;
    document.getElementById('totalPrice').textContent = `GH₵ ${total.toFixed(2)}`;
    summaryDiv.style.display = hasItems ? 'block' : 'none';
    
    // Hide warning when items are selected
    if (hasItems && warningDiv) {
        warningDiv.style.display = 'none';
    }
}

/**
 * Initialize the order form
 */
function initializeOrderForm() {
    const orderForm = document.getElementById('orderForm');
    const submitBtn = document.getElementById('submitBtn');
    
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate that at least one item is selected
        const hasItems = Object.values(quantities).some(qty => qty > 0);
        const warningDiv = document.getElementById('emptyOrderWarning');
        
        if (!hasItems) {
            // Show warning message
            if (warningDiv) {
                warningDiv.style.display = 'flex';
                warningDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Validate quantities meet minimum requirements
        let hasInvalidQty = false;
        for (const product in quantities) {
            const qty = quantities[product];
            const minOrder = minOrders[product];
            if (qty > 0 && qty < minOrder) {
                hasInvalidQty = true;
                const inputField = document.getElementById(`qty-${product}`);
                inputField.classList.add('error');
                inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        if (hasInvalidQty) {
            alert('Some products do not meet minimum order quantities. Please check the highlighted items.');
            return;
        }

        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const frequency = document.getElementById('frequency').value;
        const notes = document.getElementById('notes').value.trim();

        if (!name || !phone || !address) {
            alert('Please fill in all required fields');
            return;
        }

        // Disable submit button to prevent double submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying...';

        try {
            // Execute reCAPTCHA v3
            const token = await executeRecaptcha();
            
            if (!token) {
                throw new Error('reCAPTCHA verification failed');
            }

            // Build order message
            let message = `*NEW WHOLESALE EGG ORDER* 🥚\n\n`;
            message += `*Customer Details:*\n`;
            message += `Name: ${name}\n`;
            message += `Phone: ${phone}\n`;
            message += `Address: ${address}\n`;
            if (frequency) {
                message += `Delivery Frequency: ${frequency}\n`;
            }
            message += `\n`;
            
            message += `*Order Items:*\n`;
            let total = 0;
            for (const product in quantities) {
                if (quantities[product] > 0) {
                    const itemTotal = quantities[product] * prices[product];
                    total += itemTotal;
                    message += `${names[product]} × ${quantities[product]} = GH₵ ${itemTotal.toFixed(2)}\n`;
                }
            }
            
            message += `\n*Total: GH₵ ${total.toFixed(2)}*`;
            
            if (notes) {
                message += `\n\n*Additional Notes:*\n${notes}`;
            }

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Open WhatsApp - use different method for mobile vs desktop
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Detect if mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // On mobile, redirect directly
                window.location.href = whatsappURL;
            } else {
                // On desktop, open in new tab
                window.open(whatsappURL, '_blank');
                
                // Reset button after short delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span style="font-size: 1.5em;">📱</span> Send Order via WhatsApp';
                }, 1000);
            }
            
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('There was an error processing your order. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span style="font-size: 1.5em;">📱</span> Send Order via WhatsApp';
        }
    });
}

/**
 * Execute Google reCAPTCHA v3
 * @returns {Promise<string>} reCAPTCHA token
 */
async function executeRecaptcha() {
    return new Promise((resolve, reject) => {
        if (typeof grecaptcha === 'undefined') {
            console.warn('reCAPTCHA not loaded, skipping verification');
            resolve('test-token'); // For testing without reCAPTCHA
            return;
        }

        grecaptcha.ready(() => {
            grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_order' })
                .then(token => {
                    resolve(token);
                })
                .catch(error => {
                    console.error('reCAPTCHA error:', error);
                    reject(error);
                });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeOrderForm();
});
