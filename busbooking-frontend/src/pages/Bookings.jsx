import { useEffect, useState } from "react";
import { getAllBookings, createBooking, updateBooking, deleteBooking } from "../services/bookingService";
import { getAllBuses } from "../services/busService";
import { getAllUsers } from "../services/userService";

// FIX: Spring Boot serializes LocalDate as array [2026, 5, 7] by default (no write-dates-as-timestamps=false set).
// Convert to "2026-05-07" string for the date input and card display.
const toDateString = (date) => {
  if (!date) return "";
  if (Array.isArray(date)) {
    const [y, m, d] = date;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  return date; // already a string if backend config changes later
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userId: "",
    busId: "",
    seatNumber: "",
    bookingDate: "",
    status: "CONFIRMED"
  });

  useEffect(() => {
    fetchBookings();
    fetchBuses();
    fetchUsers();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await getAllBuses();
      setBuses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        userId: Number(formData.userId),
        busId: Number(formData.busId),
        seatNumber: Number(formData.seatNumber)
        // bookingDate stays as "yyyy-MM-dd" string — Spring accepts ISO date strings fine
      };

      if (editingId) {
        await updateBooking(editingId, payload);
        setEditingId(null);
      } else {
        await createBooking(payload);
      }

      fetchBookings();
      setFormData({ userId: "", busId: "", seatNumber: "", bookingDate: "", status: "CONFIRMED" });

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to save booking.";
      setError(String(msg));
      console.log(error);
    }
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setError("");
    setFormData({
      userId: booking.userId,
      busId: booking.busId,
      seatNumber: booking.seatNumber,
      // FIX: bookingDate from backend is [2026, 5, 7] — must convert to "2026-05-07"
      // otherwise the date input shows blank and the edit form breaks
      bookingDate: toDateString(booking.bookingDate),
      status: booking.status
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setError("");
    setFormData({ userId: "", busId: "", seatNumber: "", bookingDate: "", status: "CONFIRMED" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <h1>Booking Management</h1>

      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} className="form">

        {/* FIX: dropdown of real users — avoids "User not found" errors */}
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.username || user.email} — ID: {user.id}
            </option>
          ))}
        </select>

        {/* FIX: dropdown of real buses — avoids "Bus not found" errors */}
        <select
          name="busId"
          value={formData.busId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Bus --</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              {bus.busName} ({bus.busNumber}) — ID: {bus.id}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="seatNumber"
          placeholder="Seat Number"
          value={formData.seatNumber}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {/* FIX: removed PENDING — BookingStatus enum only has CONFIRMED and CANCELLED.
              Sending PENDING causes a 500 error on the backend. */}
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button type="submit">
          {editingId ? "Update Booking" : "Add Booking"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="card-container">
        {bookings.map((booking) => (
          <div key={booking.id} className="card">
            <h3>Booking #{booking.id}</h3>
            <p>User ID: {booking.userId}</p>
            <p>Bus ID: {booking.busId}</p>
            <p>Seat: {booking.seatNumber}</p>
            {/* FIX: convert [2026,5,7] array to readable "2026-05-07" string */}
            <p>{toDateString(booking.bookingDate)}</p>
            <p>{booking.status}</p>
            <div className="btn-group">
              <button onClick={() => handleEdit(booking)}>Edit</button>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;