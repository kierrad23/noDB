import React, { Component } from "react";

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      newname: ""
    };
  }

  handleEdit(val) {
    this.setState({ newname: val });
  }

  render() {
    return (
      <div>
        {this.props.age === undefined ? (
          <div>
            <p>Name: {this.props.name}</p>
            <h2> Request Pending</h2>
            <button onClick={() => this.props.deleteit(this.props.index)}>
              Delete Request
            </button>
          </div>
        ) : (
          <div>
            <h3>Owner:{this.props.name}</h3>
            <p>Dog name:{this.props.pet}</p>
            <p>Age:{this.props.age}</p>
            <p>Breed:{this.props.breed}</p>
            <p>Gender:{this.props.gender}</p>
            <p>Status:{this.props.status}</p>
            <button onClick={() => this.props.deleteMember(this.props.index)}>
              delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Editor;
