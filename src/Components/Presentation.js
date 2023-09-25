import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import Individual from "./Individual";
class Presentation extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    //console.log("presentation");
    //console.log(this.props.data);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const data = [...this.props.data];
    //console.log("hi");
    return (
      <div>
        {data.map(function (val, key) {
          //    console.log(val);
          return (
            <li key={key}>
              <nav>
                <Link to="/Individual" state={{ ...val }}>
                  {val.name}
                </Link>
              </nav>
            </li>
          );
        })}
      </div>
    );
  }
}

export default Presentation;
