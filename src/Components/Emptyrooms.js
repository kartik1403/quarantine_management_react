import react, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Presentation from "./Presentation";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Emptyrooms() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  console.log(location);
  console.log(data);

  function backToHome() {
    navigate("/Home", { replace: true });
  }

  const availableRooms = [];
  for (var i = 1; i <= 500; i++) {
    if (!data[i]) availableRooms.push(i);
  }
  return (
    <div>
      {availableRooms.map(function (val, key) {
        console.log(val);
        return <li key={key}>{val}</li>;
      })}
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

export default Emptyrooms;
