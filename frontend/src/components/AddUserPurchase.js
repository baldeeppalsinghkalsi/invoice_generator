import { useState } from "react";
import axios from "axios";
import "../css/AddUserPurchase.css";  // ✅ Import CSS file

function AddUserPurchase() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    product_name: "",
    quantity: "",
    unit_price: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-user-purchase", formData);
      alert("✅ User & Purchase added successfully!");
    } catch (error) {
      alert("❌ Error adding user or purchase. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add User & Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="product_name" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Unit Price (₹)</label>
          <input type="number" name="unit_price" onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Add User & Purchase</button>
      </form>
    </div>
  );
}

export default AddUserPurchase;
