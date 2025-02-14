# 🧾 Invoice Management System

A **web application** that allows an admin to **add users and their purchase details**, store them in a **PostgreSQL database**, and generate **invoices as PDFs**. The system ensures that:
- **New users are created** when adding their first purchase.
- **Existing users have their new purchases appended** to their history.
- Users can **view their purchase history** and **download an invoice** as a PDF.
- A **navigation bar** allows switching between adding purchases and viewing history.

## 📸 Project Screenshots
### **1️ Add User & Purchase Page**
![Add User & Purchase](images/add_user.png)

### **2️ User Purchases Page**
![User Purchases](images/user_purchases.png)

### **3 Invoice pdf**
![Invoice](images/invoice.png)


## ⚡ Features
✅ Add users along with their purchase details  
✅ Store user & purchase data in PostgreSQL  
✅ Append new purchases for existing users  
✅ Generate invoices as **PDFs** using Puppeteer  
✅ Responsive UI with **React.js** and **Node.js**  
✅ **Navigation bar** to switch between pages  

---

## 🛠️ Tech Stack
### **Frontend**  
- ⚛️ React.js (with React Router for navigation)  
- 🎨 Styled using CSS  
- 📡 Axios for API requests  

### **Backend**  
- 🟢 Node.js (Express.js for APIs)  
- 🐘 PostgreSQL (for user & purchase storage)  
- 📄 Puppeteer (for PDF invoice generation)  

---

