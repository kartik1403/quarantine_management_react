import React, { Component, useState, useEffect } from "react";
import Admit from "./Admit";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "./Firebase";
import Presentation from "./Presentation";
import Searchbox from "./Searchbox";
/*class Home extends Component {
  constructor(props) {
    super(props);
    this.addPatient = this.addPatient.bind(this);
    const { navigation } = this.props;
  }

  addPatient() {
    this.navigation.navigate("/Admit");
  }

  render() {
    return (
      <div className="App">
        <h1>COVID DATABASE</h1>
        <button onClick={this.addPatient}> Add Person </button>
      </div>
    );
  }
}

export default Home;
/*export default function f1(props) {
  const navigation = useNavigation();
  return <Home {...props} navigation={navigation} />;
}*/

function Home() {
  //const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setState({}); // This worked for me
    };
  }, []);
  const navigate = useNavigate();
  const [currentState, setState] = useState({
    dataLoad: false,
    data: [],
    searchField: "",
    filteredData: []
  });
  function addPatient() {
    navigate("/Admit", {
      state: {
        data: roomInfo
      },
      replace: true
    });
  }

  function searchPatient() {
    navigate("/Search", {
      state: {
        data: roomInfo
      },
      replace: true
    });
  }

  function emptyRooms() {
    navigate("/Emptyrooms", {
      state: {
        data: roomInfo
      },
      replace: true
    });
  }

  function deletePatient() {
    navigate("/Delete", {
      state: {
        data: roomInfo
      },
      replace: true
    });
  }

  function handleSearchBoxChange(event) {
    var { name, value } = event.target;
    //console.log(value);
    setState((prevState) => {
      return { ...prevState, searchField: value };
    });
    const { data, searchField } = currentState;
    //console.log(searchField);
    if (value === "") {
      setState((prevState) => {
        return {
          ...prevState,
          filteredData: [...data]
        };
      });
    } else {
      const filteredData = data.filter((person) =>
        person.name.toLowerCase().includes(value.toLowerCase())
      );
      //console.log(filteredData);
      setState((prevState) => {
        return {
          ...prevState,
          filteredData: [...filteredData]
        };
      });
    }
  }

  function formatDatabase() {
    const db = getDatabase();
    const Ref = ref(db, "xyz");
    remove(Ref)
      .then(() => {
        console.log("Data deleted successfully!");
        //navigate("/Home", { replace: true });
      })
      .catch((error) => {
        // The write failed...
        console.log("failed to delete data");
      });
    setState((prevValue) => {
      return {
        ...prevValue,
        data: [],
        filteredData: [],
        searchField: ""
      };
    });
    navigate("/Home", { replace: true });
  }

  const patientInfo = [];
  const roomInfo = [];
  const db = getDatabase();
  const starCountRef = ref(db, "xyz");
  onValue(starCountRef, function (snapshot) {
    const data = snapshot.val();
    //console.log(data);
    for (let id in data) {
      //  console.log(data[id]);
      patientInfo.push(data[id]);
      roomInfo[data[id].room_no] = { id, ...data[id] };
    }
    // console.log(roomInfo);
    //if (!roomInfo[500]) console.log("yo");
    //roomInfo[30] = undefined;
    //console.log(roomInfo);
    //console.log(patientInfo);
    //updateStarCount(postElement, data);
    if (currentState.dataLoad === false)
      setState((prevValue) => {
        return {
          ...prevValue,
          dataLoad: true,
          data: [...patientInfo],
          filteredData: [...patientInfo]
        };
      });
  });

  if (currentState.dataLoad === false) {
    return <h1>....LOADING </h1>;
  } else {
    return (
      <div className="App">
        <h1>COVID DATABASE FOR 500 ROOMS</h1>
        <button
          onClick={() => {
            addPatient();
          }}
        >
          {" "}
          Add Person{" "}
        </button>
        <button
          onClick={() => {
            searchPatient();
          }}
        >
          {" "}
          Search By Room{" "}
        </button>
        <button
          onClick={() => {
            emptyRooms();
          }}
        >
          {" "}
          Empty Rooms{" "}
        </button>
        <button
          onClick={() => {
            deletePatient();
          }}
        >
          {" "}
          Delete By Room{" "}
        </button>
        <button
          onClick={() => {
            formatDatabase();
          }}
        >
          {" "}
          Format Database{" "}
        </button>
        <input
          type="search"
          className="search"
          placeholder="search by name"
          onChange={(event) => {
            handleSearchBoxChange(event);
          }}
        />
        <Presentation data={currentState.filteredData} />
      </div>
    );
  }
}

export default Home;
