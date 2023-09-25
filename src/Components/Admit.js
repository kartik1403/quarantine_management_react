import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, set, push } from "firebase/database";
import xtype from "xtypejs";
function Admit() {
  //this effect avoids memeory leak by cleaning the state

  const location = useLocation();
  const data = location.state.data;
  //console.log(location);
  // console.log(data);

  useEffect(() => {
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const navigate = useNavigate();

  var [currentState, setState] = useState({
    name: "",
    age: "",
    room_no: "",
    error_code: 0
  });

  function infoValidity(name, age, room_no) {
    var e = 0;
    console.log(age.fieldType);
    if (age < 10 || age > 100) {
      //if (age.fieldType === Number) console.log("age is valid");
      e = 1;
    } else if (room_no < 1 || room_no > 500) {
      e = 2;
    } else if (data[room_no]) {
      e = 3;
    }
    if (e === 0) {
      return true;
    } else {
      setState((prevValue) => {
        return {
          ...prevValue,
          error_code: e
        };
      });
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const db = getDatabase();
    //const ref = database().ref("xyz");
    var name = currentState.name;
    var age = currentState.age;
    var room_no = currentState.room_no;
    if (infoValidity(name, age, room_no)) {
      const obj = {
        name,
        age,
        room_no
      };

      /*push(ref(db, "xyz"), obj).then(function (result) {
      console.log("success");
    });*/

      push(ref(db, "xyz"), obj)
        .then(function (result) {
          setState(function (prevValue) {
            return {
              ...prevValue,
              name: "",
              age: "",
              room_no: ""
            };
          });
        })
        .then(function () {
          navigate("/Home", { replace: true });
        });

      /*ref
      .push(obj)
      .then(function (result) {
        console.log(result);
        setState(function (prevValue) {
          return {
            ...prevValue,
            name: " "
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });*/
    } else {
    }
  }

  function backToHome() {
    navigate("/Home", { replace: true });
  }

  function handleChange(event) {
    var { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input
          placeholder="name"
          type="text"
          name="name"
          value={currentState.name}
          onChange={(event) => {
            handleChange(event);
          }}
        />

        <input
          placeholder="age"
          type="number"
          name="age"
          value={currentState.age}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <input
          placeholder="room_no"
          type="number"
          name="room_no"
          value={currentState.room_no}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <button type="submit"> submit </button>
      </form>
      <button
        onClick={() => {
          backToHome();
        }}
      >
        Home
      </button>
      <h1> error_code is {currentState.error_code} </h1>
      <div>
        <h1> error_codes </h1>
        <h1> 0 = all details valid </h1>
        <h1> 1 = age is invalid </h1>
        <h1> 2 = room no is invalid </h1>
        <h1> 3 = room is already occupied </h1>
      </div>
    </div>
  );
}

export default Admit;
