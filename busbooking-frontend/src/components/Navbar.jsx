import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/users">Users</Link>

      <Link to="/buses">Buses</Link>

      <Link to="/seats">Seats</Link>

      <Link to="/bookings">Bookings</Link>
    </nav>
  );
};

export default Navbar;