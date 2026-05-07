import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Buses from "./pages/Buses";
import Seats from "./pages/Seats";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

          <Route path="/buses" element={<ProtectedRoute><Buses /></ProtectedRoute>} />

          <Route path="/seats" element={<ProtectedRoute><Seats /></ProtectedRoute>} />

          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;