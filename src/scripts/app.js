// This file contains the JavaScript code that handles form submissions, calculations for subtotal, tax, and total, auto-generates the invoice number, and manages the live preview of the invoice. It also includes functionality to convert the preview to a downloadable PDF using html2pdf.js.

document.addEventListener('DOMContentLoaded', function () {
    const invoiceForm = document.getElementById('invoice-form');
    const previewSection = document.getElementById('invoice-preview');
    const invoiceNumber = document.getElementById('invoice-number');
    const subtotalInput = document.getElementById('subtotal');
    const taxInput = document.getElementById('tax');
    const totalOutput = document.getElementById('total');
    const generatePdfButton = document.getElementById('generate-pdf');

    // Auto-generate invoice number
    invoiceNumber.textContent = 'INV-' + Math.floor(Math.random() * 10000);

    // Calculate total on input change
    function calculateTotal() {
        const subtotal = parseFloat(subtotalInput.value) || 0;
        const tax = parseFloat(taxInput.value) || 0;
        const total = subtotal + (subtotal * (tax / 100));
        totalOutput.textContent = total.toFixed(2);
    }

    subtotalInput.addEventListener('input', calculateTotal);
    taxInput.addEventListener('input', calculateTotal);

    // Handle form submission
    invoiceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        updatePreview();
    });

    // Update live preview
    function updatePreview() {
        const clientName = document.getElementById('client-name').value;
        const freelancerName = document.getElementById('freelancer-name').value;
        const description = document.getElementById('description').value;
        const subtotal = subtotalInput.value;
        const tax = taxInput.value;
        const total = totalOutput.textContent;

        previewSection.innerHTML = `
            <h2 class="text-xl font-bold">Invoice Preview</h2>
            <p><strong>Client:</strong> ${clientName}</p>
            <p><strong>Freelancer:</strong> ${freelancerName}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Subtotal:</strong> $${subtotal}</p>
            <p><strong>Tax:</strong> ${tax}%</p>
            <p><strong>Total:</strong> $${total}</p>
        `;
    }

    // Generate PDF
    generatePdfButton.addEventListener('click', function () {
        html2pdf().from(previewSection).save('invoice.pdf');
    });
});