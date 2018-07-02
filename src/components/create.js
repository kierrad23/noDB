import React, { Component } from "react";

class Create extends Component {
  constructor() {
    super();
    this.state = { nmInput: "" };
  }

  handleNewMemberInput(val) {
    this.setState({ nmInput: val });
  }

  render() {
    return (
      <div>
        <input
          placeholder="Enter Name"
          onChange={e => this.handleNewMemberInput(e.target.value)}
        />

        <button onClick={() => this.props.newMemberbutton(this.state.nmInput)}>
          Join
        </button>
      </div>
    );
  }
}

export default Create;
