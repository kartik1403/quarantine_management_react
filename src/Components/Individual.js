import react from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
function Individual() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(location);
  console.log(data);

  function backToHome() {
    navigate("/Home", { replace: true });
  }

  return (
    <div>
      <h1>NAME : {data.name}</h1>
      <h1>AGE : {data.age}</h1>
      <h1>ROOM NO : {data.room_no}</h1>
      <button
        onClick={() => {
          backToHome();
        }}
      >
        Home
      </button>
    </div>
  );
}

export default Individual;
