const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Add User & Purchase in a Single Request
app.post("/add-user-purchase", async (req, res) => {
  try {
    const { name, phone, address, product_name, quantity, unit_price } = req.body;

    let user = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

    if (user.rows.length === 0) {
      // New User - Insert into Users Table
      const newUser = await pool.query(
        "INSERT INTO users (name, phone, address) VALUES ($1, $2, $3) RETURNING *",
        [name, phone, address]
      );
      user = newUser.rows[0]; // Store the new user details
    } else {
      user = user.rows[0]; // Existing user
    }

    // Insert Purchase Record
    const newPurchase = await pool.query(
      "INSERT INTO purchases (user_id, product_name, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.id, product_name, quantity, unit_price]
    );

    res.json({ message: "User and purchase added successfully", user, purchase: newPurchase.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// Get User Purchase History
app.get("/user/:phone/purchases", async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

    if (user.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const purchases = await pool.query(
      "SELECT * FROM purchases WHERE user_id = $1",
      [user.rows[0].id]
    );

    res.json({ user: user.rows[0], purchases: purchases.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW();"); // Simple query to check DB connection
    res.json({ message: "Database connected!", timestamp: result.rows[0] });
  } catch (err) {
    console.error("Database Connection Error:", err.message);
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});

const generateInvoice = require("./utils/generateInvoice");
const fs = require("fs");

app.get("/user/:phone/invoice", async (req, res) => {
  try {
    const { phone } = req.params;

    // Fetch user details
    const userResult = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
    if (userResult.rows.length === 0) return res.status(404).json({ error: "User not found" });
    
    const user = userResult.rows[0];

    // Fetch purchase history
    const purchasesResult = await pool.query("SELECT * FROM purchases WHERE user_id = $1", [user.id]);
    const purchases = purchasesResult.rows;

    if (purchases.length === 0) return res.status(404).json({ error: "No purchases found for this user" });

    // Generate Invoice PDF
    const invoicePath = await generateInvoice(user, purchases);

    // Send the PDF as a response
    res.download(invoicePath, `invoice_${user.id}.pdf`, () => {
      // Delete the file after download
      fs.unlinkSync(invoicePath);
    });

  } catch (err) {
    console.error("Invoice Generation Error:", err.message);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
});
