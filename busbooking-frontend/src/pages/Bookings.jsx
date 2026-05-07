import { useEffect, useState } from "react";

import {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking
} from "../services/bookingService";

const Bookings = () => {

  const [bookings, setBookings] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    userId: "",
    busId: "",
    seatNumber: "",
    bookingDate: "",
    status: "CONFIRMED"
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const response = await getAllBookings();

      setBookings(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...formData,
        userId: Number(formData.userId),
        busId: Number(formData.busId),
        seatNumber: Number(formData.seatNumber)
      };

      if (editingId) {

        await updateBooking(editingId, payload);

        setEditingId(null);

      } else {

        await createBooking(payload);
      }

      fetchBookings();

      setFormData({
        userId: "",
        busId: "",
        seatNumber: "",
        bookingDate: "",
        status: "CONFIRMED"
      });

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (booking) => {

    setEditingId(booking.id);

    setFormData({
      userId: booking.userId,
      busId: booking.busId,
      seatNumber: booking.seatNumber,
      bookingDate: booking.bookingDate,
      status: booking.status
    });
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

      <form onSubmit={handleSubmit} className="form">

        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="busId"
          placeholder="Bus ID"
          value={formData.busId}
          onChange={handleChange}
          required
        />

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
          <option value="CONFIRMED">CONFIRMED</option>

          <option value="PENDING">PENDING</option>

          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button type="submit">

          {editingId
            ? "Update Booking"
            : "Add Booking"}

        </button>

      </form>

      <div className="card-container">

        {
          bookings.map((booking) => (

            <div key={booking.id} className="card">

              <h3>Booking #{booking.id}</h3>

              <p>User ID: {booking.userId}</p>

              <p>Bus ID: {booking.busId}</p>

              <p>Seat: {booking.seatNumber}</p>

              <p>{booking.bookingDate}</p>

              <p>{booking.status}</p>

              <div className="btn-group">

                <button
                  onClick={() => handleEdit(booking)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default Bookings;