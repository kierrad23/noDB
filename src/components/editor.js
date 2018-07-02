import React, { Component } from "react";
import "./editor.css";

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      newstatus: ""
    };
  }

  handleEdit(val) {
    this.setState({ newstatus: val });
    console.log(this.state.newstatus);
  }

  render() {
    return (
      <div className="owner">
        <h3>Owner: {this.props.name}</h3>
        <p>Dog name: {this.props.pet}</p>
        <p>Age: {this.props.age}</p>
        <p>Breed: {this.props.breed}</p>
        <p>Gender: {this.props.gender}</p>
        <p>Status: {this.props.status}</p>
        <input
          placeholder="Enter New Status"
          onChange={e => this.handleEdit(e.target.value)}
        />
        <button
          onClick={() =>
            this.props.updateStatus(this.state.newstatus, this.props.index)
          }
        >
          submit{" "}
        </button>

        <button onClick={() => this.props.deleteMember(this.props.index)}>
          delete member
        </button>
        <hr />
      </div>
    );
  }
}

export default Editor;
