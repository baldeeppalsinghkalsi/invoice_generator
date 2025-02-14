const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generateInvoice(user, purchases) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const totalAmount = purchases.reduce((sum, p) => sum + parseFloat(p.total_price), 0);

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Invoice for ${user.name}</h2>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Address:</strong> ${user.address}</p>

        <h3>Purchase Details</h3>
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price (₹)</th>
            <th>Total Price (₹)</th>
          </tr>
          ${purchases.map(p => `
            <tr>
              <td>${p.product_name}</td>
              <td>${p.quantity}</td>
              <td>₹${p.unit_price}</td>
              <td>₹${p.total_price}</td>
            </tr>
          `).join("")}
        </table>

        <h3>Total Amount: ₹${totalAmount.toFixed(2)}</h3>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  const filePath = path.join(__dirname, `../invoices/invoice_${user.id}.pdf`);
  await page.pdf({ path: filePath, format: "A4" });

  await browser.close();
  return filePath;
}

module.exports = generateInvoice;
