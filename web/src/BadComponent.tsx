import React from "react";

export class BadComponent extends React.Component {
  state = {
    text: "bad",
  };

  changeText() {
    this.setState({ text: "classful" });
  }

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    return (
      <h1
        className="text-red-600 text-bold text-xl"
        onClick={() => this.changeText()}
      >
        I am {this.state.text}
      </h1>
    );
  }
}
