import { useState } from "react";
import axios from "axios";
import "../css/UserPurchases.css";  // ✅ Import CSS file

function UserPurchases() {
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${phone}/purchases`);
      setData(response.data);

      // ✅ Calculate total amount by summing up all `total_price`
      const total = response.data.purchases.reduce((sum, p) => sum + parseFloat(p.total_price), 0);
      setTotalAmount(total);
    } catch (error) {
      alert("User not found or error fetching data.");
    }
  };

  const downloadInvoice = () => {
    window.open(`http://localhost:5000/user/${phone}/invoice`);
  };

  return (
    <div className="user-purchases-container">
      <h2>View Purchase History</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={fetchData}>Get Purchase History</button>
      </div>

      {data && (
        <div className="purchase-list">
          <h3>Purchase History for {data.user.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price (₹)</th>
                <th>Total Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.purchases.map((p, index) => (
                <tr key={index}>
                  <td>{p.product_name}</td>
                  <td>{p.quantity}</td>
                  <td>₹{p.unit_price}</td>
                  <td>₹{p.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Amount Spent: ₹{totalAmount.toFixed(2)}</h3>
          <button className="download-btn" onClick={downloadInvoice}>Download Invoice</button>
        </div>
      )}
    </div>
  );
}

export default UserPurchases;
