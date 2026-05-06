import { useEffect, useState } from "react";
import { getAllBookings } from "../services/bookingService";

const Bookings = () => {

  const [bookings, setBookings] = useState([]);

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

  return (
    <div>

      <h1>Bookings</h1>

      {
        bookings.map((booking) => (
          <div key={booking.id}>
            <p>Seat: {booking.seatNumber}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))
      }

    </div>
  );
};

export default Bookings;