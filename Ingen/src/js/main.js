// This file contains the main JavaScript logic for the application. 
// It handles user interactions, form submissions, invoice calculations, QR code generation, and PDF generation using jsPDF.

document.addEventListener('DOMContentLoaded', () => {
    const invoiceForm = document.getElementById('invoice-form');
    const lineItemsContainer = document.getElementById('line-items');
    const addLineItemButton = document.getElementById('add-line-item');
    const generateInvoiceButton = document.getElementById('generate-invoice');

    let lineItems = [];

    addLineItemButton.addEventListener('click', () => {
        const lineItem = createLineItem();
        lineItems.push(lineItem);
        renderLineItems();
    });

    generateInvoiceButton.addEventListener('click', () => {
        generateInvoicePDF();
    });

    function createLineItem() {
        return {
            description: '',
            quantity: 1,
            price: 0
        };
    }

    function renderLineItems() {
        lineItemsContainer.innerHTML = '';
        lineItems.forEach((item, index) => {
            const lineItemElement = document.createElement('div');
            lineItemElement.classList.add('line-item');
            lineItemElement.innerHTML = `
                <input type="text" placeholder="Description" value="${item.description}" onchange="updateLineItem(${index}, 'description', this.value)" />
                <input type="number" placeholder="Quantity" value="${item.quantity}" onchange="updateLineItem(${index}, 'quantity', this.value)" />
                <input type="number" placeholder="Price" value="${item.price}" onchange="updateLineItem(${index}, 'price', this.value)" />
            `;
            lineItemsContainer.appendChild(lineItemElement);
        });
    }

    window.updateLineItem = (index, field, value) => {
        lineItems[index][field] = value;
    };

    function generateInvoicePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Invoice", 10, 10);
        lineItems.forEach((item, index) => {
            doc.text(`${item.description} - ${item.quantity} x $${item.price}`, 10, 20 + (10 * index));
        });
        doc.save('invoice.pdf');
    }
});