import { useEffect, useState } from "react";
import { getAllSeats, createSeat, deleteSeat } from "../services/seatService";
import { getAllBuses } from "../services/busService";

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    busId: "",
    seatNumber: "",
    isBooked: false
  });

  useEffect(() => {
    fetchSeats();
    fetchBuses();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await getAllSeats();
      setSeats(response.data);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        busId: Number(formData.busId),
        seatNumber: Number(formData.seatNumber),
        // KEY FIX: SeatDto field is "private boolean isBooked"
        // Jackson reads the field name directly → key must be "isBooked" not "booked"
        // Sending "booked" → Jackson finds no matching field → null → crash on primitive boolean
        isBooked: formData.isBooked === true
      };

      await createSeat(payload);
      fetchSeats();
      setFormData({ busId: "", seatNumber: "", isBooked: false });

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to add seat.";
      setError(String(msg));
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSeat(id);
      fetchSeats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <h1>Seat Management</h1>

      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} className="form">

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

        <label>
          Booked
          <input
            type="checkbox"
            name="isBooked"
            checked={formData.isBooked}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Seat</button>
      </form>

      <div className="card-container">
        {seats.map((seat) => (
          <div key={seat.id} className="card">
            <h3>Seat {seat.seatNumber}</h3>
            <p>Bus ID: {seat.busId}</p>
            {/* Response JSON has "booked" key (from Lombok getter isBooked()) */}
            <p>{seat.booked ? "Booked" : "Available"}</p>
            <button onClick={() => handleDelete(seat.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seats;