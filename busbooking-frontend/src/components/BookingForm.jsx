import { useState } from "react";
import { createBooking } from "../services/bookingService";

const BookingForm = () => {

  const [formData, setFormData] = useState({
    userId: "",
    busId: "",
    seatNumber: "",
    bookingDate: "",
    status: "CONFIRMED"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const bookingPayload = {
        userId: Number(formData.userId),
        busId: Number(formData.busId),
        seatNumber: Number(formData.seatNumber),
        bookingDate: formData.bookingDate,
        status: formData.status
      };

      const response = await createBooking(bookingPayload);

      console.log(response.data);

      setMessage("Booking Created Successfully");

      setFormData({
        userId: "",
        busId: "",
        seatNumber: "",
        bookingDate: "",
        status: "CONFIRMED"
      });

    } catch (error) {

      console.log(error);

      setMessage("Booking Failed");
    }
  };

  return (

    <div>

      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="busId"
          placeholder="Bus ID"
          value={formData.busId}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="seatNumber"
          placeholder="Seat Number"
          value={formData.seatNumber}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="CONFIRMED">CONFIRMED</option>

          <option value="CANCELLED">CANCELLED</option>

          <option value="PENDING">PENDING</option>
        </select>

        <br /><br />

        <button type="submit">
          Book Seat
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
};

export default BookingForm;