import { useEffect, useState } from "react";

import {
  getAllBuses,
  createBus,
  updateBus,
  deleteBus
} from "../services/busService";

const Buses = () => {

  const [buses, setBuses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    busName: "",
    busNumber: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: ""
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {

    try {

      const response = await getAllBuses();

      setBuses(response.data);

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
        totalSeats: Number(formData.totalSeats)
      };

      if (editingId) {

        await updateBus(editingId, payload);

        setEditingId(null);

      } else {

        await createBus(payload);
      }

      fetchBuses();

      setFormData({
        busName: "",
        busNumber: "",
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        totalSeats: ""
      });

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (bus) => {

    setEditingId(bus.id);

    setFormData({
      busName: bus.busName,
      busNumber: bus.busNumber,
      source: bus.source,
      destination: bus.destination,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      totalSeats: bus.totalSeats
    });
  };

  const handleDelete = async (id) => {

    try {

      await deleteBus(id);

      fetchBuses();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="page">

      <h1>Bus Management</h1>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          name="busName"
          placeholder="Bus Name"
          value={formData.busName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="busNumber"
          placeholder="Bus Number"
          value={formData.busNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          required
        />

        <button type="submit">

          {editingId ? "Update Bus" : "Add Bus"}

        </button>

      </form>

      <div className="card-container">

        {
          buses.map((bus) => (

            <div key={bus.id} className="card">

              <h3>{bus.busName}</h3>

              <p>{bus.busNumber}</p>

              <p>
                {bus.source} → {bus.destination}
              </p>

              <p>
                Departure: {bus.departureTime}
              </p>

              <p>
                Arrival: {bus.arrivalTime}
              </p>

              <p>
                Seats: {bus.totalSeats}
              </p>

              <div className="btn-group">

                <button
                  onClick={() => handleEdit(bus)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(bus.id)}
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

export default Buses;