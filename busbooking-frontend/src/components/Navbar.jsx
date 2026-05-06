import { Link } from "react-router-dom";

const Navbar = () => {

  return (

    <nav className="navbar">

      <h2 className="logo">
        BMS
      </h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/users">Users</Link>

        <Link to="/buses">Buses</Link>

        <Link to="/seats">Seats</Link>

        <Link to="/bookings">Bookings</Link>

      </div>

    </nav>
  );
};

export default Navbar;