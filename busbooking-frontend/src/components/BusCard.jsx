const BusCard = ({ bus }) => {
    return (
      <div>
        <h3>{bus.busName}</h3>
  
        <p>{bus.busNumber}</p>
  
        <p>
          {bus.source} → {bus.destination}
        </p>
      </div>
    );
  };
  
  export default BusCard;