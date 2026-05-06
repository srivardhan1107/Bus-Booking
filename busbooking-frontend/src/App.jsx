import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Buses from "./pages/Buses";
import Seats from "./pages/Seats";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/users" element={<Users />} />

        <Route path="/buses" element={<Buses />} />

        <Route path="/seats" element={<Seats />} />

        <Route path="/bookings" element={<Bookings />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;