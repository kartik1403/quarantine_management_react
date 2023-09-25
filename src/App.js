import "./styles.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Admit from "./Components/Admit";
import Home from "./Components/Home";
import Individual from "./Components/Individual";
import Search from "./Components/Search";
import Emptyrooms from "./Components/Emptyrooms";
import Delete from "./Components/Delete";

//import Individual from "./Components/Individual";

class App extends Component {
  constructor(props) {
    super(props);
    const x = 0;
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Admit" element={<Admit />} />
          <Route path="/Individual" element={<Individual />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Emptyrooms" element={<Emptyrooms />} />
          <Route path="/Delete" element={<Delete />} />
          <Route path="/" element={<Navigate replace to="/Home" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
