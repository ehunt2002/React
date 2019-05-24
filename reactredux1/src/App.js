import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { addNumber, subtractNumber } from "./actions/mathActions";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        Current State of the App:{" "}
        <p className="badge badge-primary">{this.props.result.result}</p>
        <br />
        <button
          className="btn btn-warning"
          onClick={() => this.props.addNumber(1)}
        >
          Add Number
        </button>
        <hr />
        <button
          className="btn btn-warning"
          onClick={() => this.props.subtractNumber(1)}
        >
          Subtract Number
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.math
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNumber: num => {
      dispatch(addNumber(num));
    },
    subtractNumber: num => {
      dispatch(subtractNumber(num));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
