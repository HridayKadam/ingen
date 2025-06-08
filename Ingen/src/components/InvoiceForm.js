function InvoiceForm() {
    const form = document.createElement('form');
    form.classList.add('invoice-form', 'p-4', 'bg-white', 'shadow-md', 'rounded');

    const title = document.createElement('h2');
    title.textContent = 'Invoice Generator';
    title.classList.add('text-xl', 'font-bold', 'mb-4');
    form.appendChild(title);

    const lineItemsContainer = document.createElement('div');
    lineItemsContainer.classList.add('line-items', 'mb-4');
    form.appendChild(lineItemsContainer);

    const addLineItemButton = document.createElement('button');
    addLineItemButton.textContent = 'Add Line Item';
    addLineItemButton.type = 'button';
    addLineItemButton.classList.add('add-line-item', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
    form.appendChild(addLineItemButton);

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total', 'mt-4');
    const totalLabel = document.createElement('span');
    totalLabel.textContent = 'Total: ';
    totalContainer.appendChild(totalLabel);
    const totalAmount = document.createElement('span');
    totalAmount.classList.add('font-bold');
    totalContainer.appendChild(totalAmount);
    form.appendChild(totalContainer);

    const generateInvoiceButton = document.createElement('button');
    generateInvoiceButton.textContent = 'Generate Invoice';
    generateInvoiceButton.type = 'button';
    generateInvoiceButton.classList.add('generate-invoice', 'bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded', 'mt-4');
    form.appendChild(generateInvoiceButton);

    addLineItemButton.addEventListener('click', () => {
        const lineItem = document.createElement('div');
        lineItem.classList.add('line-item', 'flex', 'mb-2');

        const descriptionInput = document.createElement('input');
        descriptionInput.placeholder = 'Description';
        descriptionInput.classList.add('description-input', 'border', 'p-2', 'mr-2', 'flex-1');
        lineItem.appendChild(descriptionInput);

        const amountInput = document.createElement('input');
        amountInput.placeholder = 'Amount';
        amountInput.type = 'number';
        amountInput.classList.add('amount-input', 'border', 'p-2', 'mr-2', 'w-32');
        lineItem.appendChild(amountInput);

        lineItemsContainer.appendChild(lineItem);

        amountInput.addEventListener('input', calculateTotal);
    });

    function calculateTotal() {
        const amounts = document.querySelectorAll('.amount-input');
        let total = 0;
        amounts.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        totalAmount.textContent = total.toFixed(2);
    }

    generateInvoiceButton.addEventListener('click', () => {
        // Logic to generate PDF using jsPDF will go here
    });

    return form;
}

export default InvoiceForm;