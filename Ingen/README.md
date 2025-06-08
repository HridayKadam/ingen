# Ingen - Instant Invoice Generator

Ingen is a client-side web application designed for freelancers to generate invoices instantly without the need for a login. This application utilizes HTML, Tailwind CSS, and Vanilla JavaScript to provide a seamless user experience.

## Project Structure

```
Ingen
├── public
│   ├── index.html        # Main HTML document for the application
│   └── favicon.ico       # Favicon for the application
├── src
│   ├── assets            # Directory for static assets (images/icons)
│   ├── js
│   │   └── main.js       # Main JavaScript logic for user interactions and invoice generation
│   ├── css
│   │   └── tailwind.css  # Tailwind CSS styles for the application
│   └── components
│       └── InvoiceForm.js # Component for creating the invoice form dynamically
├── tailwind.config.js    # Configuration file for Tailwind CSS
├── postcss.config.js     # Configuration for PostCSS
├── package.json          # npm configuration file with dependencies and scripts
└── README.md             # Project documentation
```

## Features

- **Instant Invoice Generation**: Create invoices on the fly without any login requirements.
- **Dynamic Invoice Form**: Add line items, calculate totals, and generate a PDF of the invoice.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive user interface.

## Getting Started

To get started with the Ingen project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Ingen
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Build the project (if necessary):
   ```
   npm run build
   ```

4. Open the `public/index.html` file in your browser to view the application.

## Deployment

### Deploying on Netlify or Vercel

1. Ensure all files are committed to a Git repository.
2. Create a new site on Netlify or Vercel and link it to the repository.
3. Configure the build settings if necessary (for example, specify the output directory).
4. Deploy the site, and it will be live with the provided URL.

## Usage

- Fill out the invoice form with the necessary details.
- Add line items as needed.
- Click on the "Generate Invoice" button to create a PDF of your invoice.
- Download or print the invoice as required.

## License

This project is open-source and available under the MIT License.