import react, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Presentation from "./Presentation";
import { Link, useNavigate, useLocation } from "react-router-dom";
function Search() {
  // const patientInfo = [];
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  console.log(location);
  console.log(data);
  /*var [currentState, setState] = useState({
    room_no: "",
    patientInfo: [],
    found: false
  });*/

  var [currentState, setState] = useState({
    val: "",
    validity: 1,
    room_no: ""
  });

  function backToHome() {
    navigate("/Home", { replace: true });
  }

  function handleSubmit(event) {
    event.preventDefault();
    /*const temp = [];
    const db = getDatabase();
    const starCountRef = ref(db, currentState.room_no);
    onValue(starCountRef, function (snapshot) {
      const data = snapshot.val();
      console.log(data);
      for (let id in data) {
        temp.push(data[id]);
      }
      console.log(temp);
      if (currentState.found === false)
        setState((prevValue) => {
          return {
            ...prevValue,
            patientInfo: [...temp],
            found: true
          };
        });
    });*/
    var targetRoom = currentState.room_no;
    if (targetRoom < 1 || targetRoom > 500)
      navigate("/Home", { replace: true });
    else if (data[targetRoom]) {
      setState((prevValue) => {
        return {
          val: data[targetRoom],
          room_no: "",
          validity: 2
        };
      });
    } else {
      setState((prevValue) => {
        return {
          val: "",
          room_no: "",
          validity: 0
        };
      });
    }
    console.log(currentState.val);
  }

  function handleChange(event) {
    var { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  /*if (currentState.found === true) {
    console.log(currentState.patientInfo);
    return <Presentation data={currentState.patientInfo} />;
  } else {
    return (
      <div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            placeholder="room_no"
            type="text"
            name="room_no"
            value={currentState.room_no}
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <button type="submit"> search </button>
        </form>
        <button
          onClick={() => {
            backToHome();
          }}
        >
          Home
        </button>
      </div>
    );
  }*/

  if (currentState.validity === 2) {
    return (
      <div>
        <h1>NAME : {currentState.val.name}</h1>
        <h1>AGE : {currentState.val.age}</h1>
        <h1>ROOM NO : {currentState.val.room_no}</h1>
        <button
          onClick={() => {
            backToHome();
          }}
        >
          Home
        </button>
      </div>
    );
  } else if (currentState.validity === 0) {
    return (
      <div>
        <h1>"ROOM EMPTY"</h1>
        <button
          onClick={() => {
            backToHome();
          }}
        >
          Home
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            placeholder="room_no"
            type="number"
            name="room_no"
            value={currentState.room_no}
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <button type="submit"> search </button>
        </form>
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
}

export default Search;
