import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>BMS</Link>
      </h2>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/buses">Buses</Link>
            <Link to="/seats">Seats</Link>
            <Link to="/bookings">Bookings</Link>
            <span style={{ color: '#9ca3af', margin: '0 10px', display: 'flex', alignItems: 'center', fontSize: '16px' }}>
               Hi, {user.name}
            </span>
            <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px', fontWeight: '500', padding: 0 }}
            >
                Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;