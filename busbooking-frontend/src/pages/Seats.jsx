import { useEffect, useState } from "react";
import { getAllSeats } from "../services/seatService";

const Seats = () => {

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {

    try {

      const response = await getAllSeats();

      setSeats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Seats</h1>

      {
        seats.map((seat) => (
          <div key={seat.id}>
            <p>Seat No: {seat.seatNumber}</p>
            <p>
              {seat.booked ? "Booked" : "Available"}
            </p>
          </div>
        ))
      }

    </div>
  );
};

export default Seats;