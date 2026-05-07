import { useEffect, useState } from "react";

import {
  getAllSeats,
  createSeat,
  updateSeat,
  deleteSeat
} from "../services/seatService";

const Seats = () => {

  const [seats, setSeats] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    busId: "",
    seatNumber: "",
    booked: false
  });

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

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox"
        ? checked
        : value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...formData,
        busId: Number(formData.busId),
        seatNumber: Number(formData.seatNumber)
      };

      if (editingId) {

        await updateSeat(editingId, payload);

        setEditingId(null);

      } else {

        await createSeat(payload);
      }

      fetchSeats();

      setFormData({
        busId: "",
        seatNumber: "",
        booked: false
      });

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (seat) => {

    setEditingId(seat.id);

    setFormData({
      busId: seat.busId,
      seatNumber: seat.seatNumber,
      booked: seat.booked
    });
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

      <form onSubmit={handleSubmit} className="form">

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

        <label>

          Booked

          <input
            type="checkbox"
            name="booked"
            checked={formData.booked}
            onChange={handleChange}
          />

        </label>

        <button type="submit">

          {editingId ? "Update Seat" : "Add Seat"}

        </button>

      </form>

      <div className="card-container">

        {
          seats.map((seat) => (

            <div key={seat.id} className="card">

              <h3>Seat {seat.seatNumber}</h3>

              <p>Bus ID: {seat.busId}</p>

              <p>
                {seat.booked
                  ? "Booked"
                  : "Available"}
              </p>

              <div className="btn-group">

                <button
                  onClick={() => handleEdit(seat)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(seat.id)}
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

export default Seats;