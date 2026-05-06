import { useEffect, useState } from "react";
import { getAllBuses } from "../services/busService";
import BusCard from "../components/BusCard";

const Buses = () => {

  const [buses, setBuses] = useState([]);

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

  return (
    <div>

      <h1>All Buses</h1>

      {
        buses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))
      }

    </div>
  );
};

export default Buses;