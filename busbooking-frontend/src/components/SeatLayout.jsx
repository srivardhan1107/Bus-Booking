const SeatLayout = ({ seats, onSeatSelect }) => {

    return (
  
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: "10px",
          marginTop: "20px"
        }}
      >
  
        {
          seats.map((seat) => (
  
            <button
              key={seat.id}
  
              onClick={() => onSeatSelect(seat)}
  
              disabled={seat.booked}
  
              style={{
                padding: "15px",
                backgroundColor: seat.booked
                  ? "red"
                  : "green",
  
                color: "white",
  
                border: "none",
  
                borderRadius: "5px",
  
                cursor: seat.booked
                  ? "not-allowed"
                  : "pointer"
              }}
            >
  
              {seat.seatNumber}
  
            </button>
          ))
        }
  
      </div>
    );
  };
  
  export default SeatLayout;