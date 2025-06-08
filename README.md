# Ingen – Smart Invoices for Freelancers

A no-login, instant invoice generator for freelancers built with HTML, Tailwind CSS, and Vanilla JavaScript.

## Features

- 🚀 No login required
- 💼 Multiple freelancer types (Writer, Designer, Developer, Consultant, Other)
- 📝 Professional invoice generation
- 💰 Multiple currency support (INR, USD, EUR)
- 📱 Responsive design
- 🌓 Dark mode support
- 💾 Auto-save form data
- 📄 PDF generation with watermark options
- 💳 QR code payment integration

## Quick Start

1. Clone this repository
2. Open `index.html` in your browser
3. Start creating invoices!

## Deployment

### Deploy to Netlify

1. Create a new site on Netlify
2. Connect your repository
3. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.`

### Deploy to Vercel

1. Create a new project on Vercel
2. Import your repository
3. Deploy settings:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: `.`

## Customization

### Changing Payment Details

To change the payment QR code details, modify the `generateQRCode` function in `app.js`:

```javascript
function generateQRCode() {
    qrcodeContainer.innerHTML = '';
    const qr = new QRCode(qrcodeContainer, {
        text: 'upi://pay?pa=yourupi@okaxis&am=10', // Change this line
        width: 200,
        height: 200
    });
}
```

### Modifying Styles

The app uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind classes in `index.html`
2. Adding custom styles in `styles.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.