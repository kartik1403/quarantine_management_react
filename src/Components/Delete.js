import react, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, push, remove, child } from "firebase/database";

function Delete() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  console.log(location);
  console.log(data);

  var [currentState, setState] = useState({
    key: "",
    room_no: ""
  });

  function backToHome() {
    navigate("/Home", { replace: true });
  }

  function handleChange(event) {
    var { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    var targetRoom = currentState.room_no;
    if (targetRoom < 1 || targetRoom > 500)
      navigate("/Home", { replace: true });
    else if (!data[targetRoom]) navigate("/Home", { replace: true });
    else {
      console.log("delete" + data[targetRoom].id);
      setState((prevValue) => {
        return {
          ...prevValue,
          key: data[targetRoom].id
        };
      });
      var key = currentState.key;
      //remove(Ref);

      const db = getDatabase();
      const Ref = ref(db, "xyz/" + data[targetRoom].id);
      remove(Ref)
        .then(() => {
          console.log(currentState.key);
          console.log("Data deleted successfully!");
          //navigate("/Home", { replace: true });
        })
        .catch((error) => {
          // The write failed...
          console.log("failed to delete data");
        });
      navigate("/Home", { replace: true });
    }
  }

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
        <button type="submit"> Delete </button>
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

export default Delete;
