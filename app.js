// Initialize jsPDF
const { jsPDF } = window.jspdf;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const invoiceForm = document.getElementById('invoice-form');
const paymentWall = document.getElementById('payment-wall');
const invoiceFormElement = document.getElementById('invoice-form-element');
const addLineItemBtn = document.getElementById('add-line-item');
const continueBtn = document.getElementById('continue-btn');
const freeVersionBtn = document.getElementById('free-version-btn');
const qrcodeContainer = document.getElementById('qrcode');
const darkModeToggle = document.getElementById('darkModeToggle');
const backToLandingBtn = document.getElementById('back-to-landing');
const logoUpload = document.getElementById('logo-upload');
const logoPreview = document.getElementById('logo-preview');
const removeLogoBtn = document.getElementById('remove-logo');

// State
let currentFreelancerType = '';
let invoiceData = null;
let isPaid = false;
let logoData = null;
let selectedAccent = { type: 'color', value: '#0ea5e9' };
let selectedLanguage = 'en';
let lastPageLanguage = 'en';

// Language translations (basic demo)
const translations = {
    en: {
        INVOICE: 'INVOICE',
        'Create Your Invoice': 'Create Your Invoice',
        Back: 'Back',
        'Choose your accent color or gradient': 'Choose your accent color or gradient',
        Writer: 'Writer',
        Designer: 'Designer',
        Developer: 'Developer',
        Consultant: 'Consultant',
        Other: 'Other',
        'Smart Invoices for Freelancers': 'Smart Invoices for Freelancers',
        'What type of freelancer are you?': 'What type of freelancer are you?',
        'Your Name/Brand': 'Your Name/Brand',
        'Your Email (optional)': 'Your Email (optional)',
        'Client Name': 'Client Name',
        'Client Email (optional)': 'Client Email (optional)',
        'Project/Service Description': 'Project/Service Description',
        'Line Items': 'Line Items',
        'Description': 'Description',
        'Amount': 'Amount',
        'Tax (%)': 'Tax (%)',
        'Currency': 'Currency',
        'Due Date': 'Due Date',
        Subtotal: 'Subtotal',
        Tax: 'Tax',
        Total: 'Total',
        'Generate Invoice': 'Generate Invoice',
        'Download Free Version (with watermark)': 'Download Free Version (with watermark)',
        'Almost there!': 'Almost there!',
        'Pay ₹10 to download your invoice PDF. Supports future improvements.': 'Pay ₹10 to download your invoice PDF. Supports future improvements.',
        'I\'ve Paid – Continue': 'I\'ve Paid – Continue',
        'Add Line Item': '+ Add Line Item',
    },
    hi: {
        INVOICE: 'चालान',
        'Create Your Invoice': 'अपना चालान बनाएं',
        Back: 'वापस',
        'Choose your accent color or gradient': 'अपना रंग या ग्रेडिएंट चुनें',
        Writer: 'लेखक',
        Designer: 'डिज़ाइनर',
        Developer: 'डेवलपर',
        Consultant: 'सलाहकार',
        Other: 'अन्य',
        'Smart Invoices for Freelancers': 'फ्रीलांसरों के लिए स्मार्ट चालान',
        'What type of freelancer are you?': 'आप किस प्रकार के फ्रीलांसर हैं?',
        'Your Name/Brand': 'आपका नाम/ब्रांड',
        'Your Email (optional)': 'आपका ईमेल (वैकल्पिक)',
        'Client Name': 'ग्राहक का नाम',
        'Client Email (optional)': 'ग्राहक ईमेल (वैकल्पिक)',
        'Project/Service Description': 'परियोजना/सेवा विवरण',
        'Line Items': 'आइटम्स',
        'Description': 'विवरण',
        'Amount': 'राशि',
        'Tax (%)': 'कर (%)',
        'Currency': 'मुद्रा',
        'Due Date': 'नियत तारीख',
        Subtotal: 'उप-योग',
        Tax: 'कर',
        Total: 'कुल',
        'Generate Invoice': 'चालान बनाएं',
        'Download Free Version (with watermark)': 'नि:शुल्क संस्करण डाउनलोड करें (वॉटरमार्क के साथ)',
        'Almost there!': 'लगभग हो गया!',
        'Pay ₹10 to download your invoice PDF. Supports future improvements.': 'अपना चालान पीडीएफ डाउनलोड करने के लिए ₹10 का भुगतान करें।',
        'I\'ve Paid – Continue': 'मैंने भुगतान किया – जारी रखें',
        'Add Line Item': '+ आइटम जोड़ें',
    },
    // Add more languages as needed
};

function translateUI(lang) {
    const t = translations[lang] || translations['en'];
    document.getElementById('ingen-title').textContent = 'Ingen';
    document.getElementById('ingen-subtitle').textContent = t['Smart Invoices for Freelancers'];
    document.getElementById('freelancer-type-label').textContent = t['What type of freelancer are you?'];
    document.getElementById('writer-label').textContent = t['Writer'];
    document.getElementById('designer-label').textContent = t['Designer'];
    document.getElementById('developer-label').textContent = t['Developer'];
    document.getElementById('consultant-label').textContent = t['Consultant'];
    document.getElementById('other-label').textContent = t['Other'];
    document.getElementById('create-invoice-label').textContent = t['Create Your Invoice'];
    document.getElementById('back-label').textContent = t['Back'];
    document.getElementById('color-picker-label').textContent = t['Choose your accent color or gradient'];
    // Add more as needed
}

// Handle language selector
const languageSelector = document.getElementById('language-selector');
languageSelector.addEventListener('change', (e) => {
    selectedLanguage = e.target.value;
    translateUI(selectedLanguage);
});

// --- Color/Gradient Picker Logic (Radio) ---
const accentRadios = document.querySelectorAll('input[type="radio"][name="accent"]');
accentRadios.forEach((radio, idx) => {
    radio.addEventListener('change', () => {
        if (radio.id === 'color-picker') {
            selectedAccent = { type: 'color', value: '#0ea5e9' };
        } else if (radio.classList.contains('gradient-btn')) {
            selectedAccent = { type: 'gradient', value: radio.getAttribute('data-gradient') };
        }
        // Highlight selected
        document.querySelectorAll('.picker-circle').forEach((el, i) => {
            if (accentRadios[i].checked) {
                el.classList.add('ring-4', 'ring-primary-400');
            } else {
                el.classList.remove('ring-4', 'ring-primary-400');
            }
        });
        updateInvoicePreview();
    });
});
// On load, highlight the default
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.picker-circle')[0].classList.add('ring-4', 'ring-primary-400');
});

// Prompt for invoice language if page is translated
function promptInvoiceLanguage(callback) {
    if (selectedLanguage !== 'en') {
        if (confirm('You have translated the page. Do you want the invoice in the same language?')) {
            callback(selectedLanguage);
        } else {
            callback('en');
        }
    } else {
        callback('en');
    }
}

// Load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('ingen_last_invoice');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const input = invoiceFormElement.querySelector(`[name="${key}"]`);
            if (input) input.value = data[key];
        });
    }

    // Load saved logo
    const savedLogo = localStorage.getItem('ingen_logo');
    if (savedLogo) {
        logoPreview.innerHTML = `<img src="${savedLogo}" alt="Logo" class="w-full h-full object-contain">`;
        logoData = savedLogo;
    }
}

// Save form data to localStorage
function saveFormData() {
    const formData = new FormData(invoiceFormElement);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    localStorage.setItem('ingen_last_invoice', JSON.stringify(data));
}

// Calculate totals
function calculateTotals() {
    const lineItems = document.querySelectorAll('.line-item');
    let subtotal = 0;

    lineItems.forEach(item => {
        const amount = parseFloat(item.querySelector('input[type="number"]').value) || 0;
        subtotal += amount;
    });

    const taxRate = parseFloat(document.querySelector('[name="tax"]').value) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('tax-amount').textContent = formatCurrency(taxAmount);
    document.getElementById('total').textContent = formatCurrency(total);

    return { subtotal, taxAmount, total };
}

// Format currency
function formatCurrency(amount) {
    const currency = document.querySelector('[name="currency"]').value;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    });
    return formatter.format(amount);
}

// Add line item
function addLineItem() {
    const lineItemsContainer = document.querySelector('.line-items-container');
    const newLineItem = document.createElement('div');
    newLineItem.className = 'line-item space-y-4';
    newLineItem.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Description" required class="rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-600/50 dark:text-white backdrop-blur-sm">
            <div class="relative">
                <input type="number" placeholder="Amount" required min="0" step="0.01" class="rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-600/50 dark:text-white backdrop-blur-sm pr-8">
                <button type="button" class="delete-line-item absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    lineItemsContainer.appendChild(newLineItem);
    calculateTotals();
}

// Delete line item
function deleteLineItem(button) {
    const lineItem = button.closest('.line-item');
    if (document.querySelectorAll('.line-item').length > 1) {
        lineItem.remove();
        calculateTotals();
    }
}

// Handle logo upload
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoData = e.target.result;
            logoPreview.innerHTML = `<img src="${logoData}" alt="Logo" class="w-full h-full object-contain">`;
            localStorage.setItem('ingen_logo', logoData);
        };
        reader.readAsDataURL(file);
    }
}

// Remove logo
function removeLogo() {
    logoData = null;
    logoPreview.innerHTML = '<span class="text-gray-400 dark:text-gray-500">Upload Logo</span>';
    localStorage.removeItem('ingen_logo');
}

// Generate QR Code
function generateQRCode() {
    qrcodeContainer.innerHTML = '';
    const qr = new QRCode(qrcodeContainer, {
        text: 'upi://pay?pa=yourupi@okaxis&am=10',
        width: 200,
        height: 200
    });
}

// --- Accent Color Picker ---
const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', (e) => {
    selectedAccent = { type: 'color', value: e.target.value };
    updateInvoicePreview();
});
selectedAccent = { type: 'color', value: colorPicker.value };

// --- Signature/Stamp Upload ---
let signatureData = null;
const signatureUpload = document.getElementById('signature-upload');
const signaturePreview = document.getElementById('signature-preview');
const removeSignatureBtn = document.getElementById('remove-signature');
signatureUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            signatureData = ev.target.result;
            signaturePreview.innerHTML = `<img src="${signatureData}" alt="Signature" class="w-full h-full object-contain">`;
        };
        reader.readAsDataURL(file);
    }
});
signaturePreview.addEventListener('click', () => signatureUpload.click());
removeSignatureBtn.addEventListener('click', () => {
    signatureData = null;
    signaturePreview.innerHTML = '<span class="text-gray-400 dark:text-gray-500">Upload Signature/Stamp</span>';
});

// --- Currency Symbol Helper ---
const currencySymbols = {
    USD: '$', INR: '₹', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥', SGD: 'S$', ZAR: 'R'
};
function getCurrencySymbol(code) {
    return currencySymbols[code] || code;
}

// --- Live Invoice Preview Sync ---
function updateInvoicePreview() {
    // Header
    const header = document.getElementById('preview-header');
    if (selectedAccent.type === 'color') {
        header.style.background = selectedAccent.value;
        header.style.backgroundImage = '';
        header.style.color = '#fff';
    }
    // Logo
    const previewLogo = document.getElementById('preview-logo');
    if (logoData) {
        previewLogo.src = logoData;
        previewLogo.classList.remove('hidden');
    } else {
        previewLogo.classList.add('hidden');
    }
    // Business Name & Email
    document.getElementById('preview-business').textContent = document.querySelector('[name="yourName"]').value || 'Your Business Name';
    document.getElementById('preview-email').textContent = document.querySelector('[name="yourEmail"]').value || 'your@email.com';
    // INVOICE Title
    const t = translations[selectedLanguage] || translations['en'];
    document.getElementById('preview-invoice-title').textContent = t['INVOICE'];
    // Bill To
    document.getElementById('preview-client').textContent = document.querySelector('[name="clientName"]').value || 'Client Name';
    document.getElementById('preview-client-email').textContent = document.querySelector('[name="clientEmail"]').value || 'client@email.com';
    document.getElementById('preview-billto-label').textContent = 'Bill To';
    // Due Date & Currency
    const currency = document.querySelector('[name="currency"]').value;
    document.getElementById('preview-due').textContent = document.querySelector('[name="dueDate"]').value || '';
    document.getElementById('preview-currency').textContent = currency;
    // Project/Service Description
    const projectDesc = document.querySelector('[name="description"]').value || '';
    document.getElementById('preview-description').textContent = projectDesc;
    // Line Items
    const itemsTbody = document.getElementById('preview-items');
    itemsTbody.innerHTML = '';
    const lineItems = document.querySelectorAll('.line-item');
    let subtotal = 0;
    lineItems.forEach((item, idx) => {
        const desc = item.querySelector('input[type="text"]').value || 'Item Description';
        const amt = parseFloat(item.querySelector('input[type="number"]').value) || 0;
        subtotal += amt;
        let descCell = `<div>${desc}</div>`;
        if (projectDesc) {
            descCell += `<div class='text-xs text-gray-400'>${projectDesc}</div>`;
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${idx + 1}</td><td>${descCell}</td><td class="text-right">${getCurrencySymbol(currency)}${amt.toFixed(2)}</td>`;
        if (lineItems.length > 2 && idx % 2 === 1) tr.style.background = '#f9fafb';
        itemsTbody.appendChild(tr);
    });
    // Subtotal, Tax, Total
    const taxRate = parseFloat(document.querySelector('[name="tax"]').value) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;
    document.getElementById('preview-subtotal').textContent = getCurrencySymbol(currency) + subtotal.toFixed(2);
    document.getElementById('preview-tax').textContent = getCurrencySymbol(currency) + taxAmount.toFixed(2);
    const totalEl = document.getElementById('preview-total');
    totalEl.textContent = getCurrencySymbol(currency) + total.toFixed(2);
    if (selectedAccent.type === 'color') {
        totalEl.style.color = selectedAccent.value;
    }
    // Signature/Stamp
    let previewSignature = document.getElementById('preview-signature-img');
    if (!previewSignature) {
        previewSignature = document.createElement('img');
        previewSignature.id = 'preview-signature-img';
        previewSignature.className = 'mt-6 w-32 h-20 object-contain mx-auto';
        document.getElementById('invoice-preview').appendChild(previewSignature);
    }
    if (signatureData) {
        previewSignature.src = signatureData;
        previewSignature.style.display = '';
    } else {
        previewSignature.style.display = 'none';
    }
}

// --- Delete Line Item Logic ---
document.addEventListener('click', (e) => {
    if (e.target.closest('.delete-line-item')) {
        const lineItem = e.target.closest('.line-item');
        if (document.querySelectorAll('.line-item').length > 1) {
            lineItem.remove();
            updateInvoicePreview();
        }
    }
});

// --- PDF Download (Professional, not screenshot) ---
function generatePDF(withWatermark = false) {
    promptInvoiceLanguage((lang) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        const t = translations[lang] || translations['en'];
        const currency = document.querySelector('[name="currency"]').value;
        let y = 40;
        // Header
        if (selectedAccent.type === 'color') {
            doc.setFillColor(selectedAccent.value);
            doc.rect(0, 0, 595, 120, 'F');
        }
        // Logo
        if (logoData) {
            doc.addImage(logoData, 'PNG', 40, 30, 50, 50);
        }
        // Business Name & Email
        doc.setFontSize(18);
        doc.setTextColor(255,255,255);
        doc.text(document.querySelector('[name="yourName"]').value, 110, 55);
        doc.setFontSize(12);
        doc.text(document.querySelector('[name="yourEmail"]').value || '', 110, 75);
        // INVOICE Title
        doc.setFontSize(28);
        doc.text(t['INVOICE'], 300, 110, { align: 'center' });
        doc.setTextColor(0,0,0);
        y = 140;
        // Bill To & Details
        doc.setFontSize(12);
        doc.text('Bill To:', 40, y);
        doc.setFont(undefined, 'bold');
        doc.text(document.querySelector('[name="clientName"]').value, 90, y);
        doc.setFont(undefined, 'normal');
        doc.text(document.querySelector('[name="clientEmail"]').value || '', 90, y+15);
        doc.text('Due Date:', 400, y);
        doc.text(document.querySelector('[name="dueDate"]').value, 470, y);
        doc.text('Currency:', 400, y+15);
        doc.text(currency, 470, y+15);
        y += 40;
        // Project/Service Description
        doc.setFontSize(11);
        doc.setTextColor(60,60,60);
        doc.setFont(undefined, 'italic');
        doc.text(document.querySelector('[name="description"]').value || '', 40, y, { maxWidth: 515 });
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0,0,0);
        y += 30;
        // Table Headers
        doc.setFontSize(12);
        doc.setTextColor(selectedAccent.type === 'color' ? hexToRgb(selectedAccent.value) : [14, 165, 233]);
        doc.text('#', 40, y);
        doc.text('Description', 80, y);
        doc.text('Amount', 500, y, { align: 'right' });
        doc.setTextColor(0,0,0);
        y += 10;
        // Line Items
        const lineItems = document.querySelectorAll('.line-item');
        let subtotal = 0;
        const projectDesc = document.querySelector('[name="description"]').value || '';
        lineItems.forEach((item, idx) => {
            const description = item.querySelector('input[type="text"]').value;
            const amount = parseFloat(item.querySelector('input[type="number"]').value) || 0;
            subtotal += amount;
            if (lineItems.length > 2 && idx % 2 === 1) {
                doc.setFillColor(245,245,245);
                doc.rect(38, y-8, 520, 18, 'F');
            }
            doc.text((idx+1).toString(), 40, y+5);
            doc.text(description, 80, y+5);
            if (projectDesc) {
                doc.setFontSize(9);
                doc.setTextColor(120,120,120);
                doc.text(projectDesc, 80, y+17);
                doc.setFontSize(12);
                doc.setTextColor(0,0,0);
                y += 8;
            }
            doc.text(getCurrencySymbol(currency) + amount.toFixed(2), 500, y+5, { align: 'right' });
            y += 18;
        });
        // Totals
        y += 10;
        const taxRate = parseFloat(document.querySelector('[name="tax"]').value) || 0;
        const taxAmount = (subtotal * taxRate) / 100;
        const total = subtotal + taxAmount;
        doc.setFontSize(12);
        doc.text('Subtotal:', 400, y);
        doc.text(getCurrencySymbol(currency) + subtotal.toFixed(2), 500, y, { align: 'right' });
        y += 16;
        doc.text('Tax:', 400, y);
        doc.text(getCurrencySymbol(currency) + taxAmount.toFixed(2), 500, y, { align: 'right' });
        y += 16;
        doc.setFontSize(14);
        doc.setTextColor(selectedAccent.type === 'color' ? hexToRgb(selectedAccent.value) : [14, 165, 233]);
        doc.text('Total:', 400, y);
        doc.text(getCurrencySymbol(currency) + total.toFixed(2), 500, y, { align: 'right' });
        doc.setTextColor(0,0,0);
        // Signature/Stamp
        if (signatureData) {
            y += 40;
            doc.setFontSize(10);
            doc.text('Signature/Stamp:', 40, y);
            doc.addImage(signatureData, 'PNG', 120, y-15, 80, 40);
        }
        // Watermark
        if (withWatermark) {
            doc.setTextColor(200, 200, 200);
            doc.setFontSize(60);
            doc.text('UNPAID', 300, 500, { align: 'center', angle: 45 });
            doc.setTextColor(0, 0, 0);
        }
        doc.save('Ingen_Invoice.pdf');
    });
}

function hexToRgb(hex) {
    // Remove #
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
}

// Initialize dark mode
function initDarkMode() {
    // Check for saved theme preference
    if (localStorage.getItem('ingen_theme') === 'dark' || 
        (!localStorage.getItem('ingen_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Dark mode toggle click handler
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('ingen_theme', isDark ? 'dark' : 'light');
    });
}

// Event Listeners
document.querySelectorAll('.freelancer-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFreelancerType = btn.dataset.type;
        landingPage.classList.add('hidden');
        invoiceForm.classList.remove('hidden');
        loadSavedData();
    });
});

backToLandingBtn.addEventListener('click', () => {
    invoiceForm.classList.add('hidden');
    landingPage.classList.remove('hidden');
});

addLineItemBtn.addEventListener('click', addLineItem);

// Handle line item deletion
document.addEventListener('click', (e) => {
    if (e.target.closest('.delete-line-item')) {
        deleteLineItem(e.target.closest('.delete-line-item'));
    }
});

// Handle logo upload
logoUpload.addEventListener('change', handleLogoUpload);
logoPreview.addEventListener('click', () => logoUpload.click());
removeLogoBtn.addEventListener('click', removeLogo);

invoiceFormElement.addEventListener('input', () => {
    calculateTotals();
    saveFormData();
});

invoiceFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    invoiceData = new FormData(invoiceFormElement);
    generateQRCode();
    paymentWall.classList.remove('hidden');
});

continueBtn.addEventListener('click', () => {
    isPaid = true;
    paymentWall.classList.add('hidden');
    generatePDF(false);
});

freeVersionBtn.addEventListener('click', () => {
    paymentWall.classList.add('hidden');
    generatePDF(true);
});

// Initialize app
initDarkMode();

// --- Sync preview on input ---
invoiceFormElement.addEventListener('input', updateInvoicePreview);
colorPicker.addEventListener('input', updateInvoicePreview);
accentRadios.forEach(radio => radio.addEventListener('change', updateInvoicePreview));
document.querySelector('[name="currency"]').addEventListener('change', updateInvoicePreview);
languageSelector.addEventListener('change', updateInvoicePreview);

// On page load, initialize preview
window.addEventListener('DOMContentLoaded', updateInvoicePreview); 