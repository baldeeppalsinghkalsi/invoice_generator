import { Link } from "react-router-dom";
import "../css/Navbar.css";  // Import styles

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Invoice System</h2>
      <div className="nav-links">
        <Link to="/">Add User & Purchase</Link>
        <Link to="/history">User Purchases</Link>
      </div>
    </nav>
  );
}

export default Navbar;
