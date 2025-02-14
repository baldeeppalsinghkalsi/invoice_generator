import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Import Navbar
import AddUserPurchase from "./components/AddUserPurchase";
import UserPurchases from "./components/UserPurchases";
import "./css/Navbar.css";  // Import Navbar CSS

function App() {
  return (
    <Router>
      <title>Invoice Management System</title>
      <Navbar />  {/* ✅ Navbar appears on all pages */}
      <div className="container">
        <Routes>
          <Route path="/" element={<AddUserPurchase />} />
          <Route path="/history" element={<UserPurchases />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
