import React, { Component } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "./components/editor";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      breed: [],
      gender: [],
      owner: [],
      status: [],
      age: ["1", "6 months", "5", "3", "2", "4"],
      pet: ["Sam", "Remy", "Snickers", "Coconut", "Fiji", "Oreo"],
      userInput: ""
    };
    this.updateListing = this.updateListing.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/breeds/")
      .then(results => this.setState({ breed: results.data }));
    axios
      .get("/api/owners/")
      .then(results => this.setState({ owner: results.data }));
    axios
      .get("/api/genders/")
      .then(results => this.setState({ gender: results.data }));
    axios
      .get("/api/status/")
      .then(results => this.setState({ status: results.data }));
  }

  newListing(owner) {
    axios
      .post("/api/members/create", { owner })
      .then(results => this.setState({ owner: results.data }));
  }

  updateListing(changedstatus, i) {
    axios.put("/api/members/update", { changedstatus, i }).then(results => {
      let temp = this.state.members;
      temp[i] = results.data;
      this.setState({ owner: temp });
    });
  }

  handleInput(val) {
    this.setState({ userInput: val });
  }

  deleteMember(i) {
    axios
      .delete(`/api/breeds/${i}`)
      .then(results => this.setState({ breed: results.data }));
    axios
      .delete(`/api/owners/${i}`)
      .then(results => this.setState({ owner: results.data }));
    axios
      .delete(`/api/genders/${i}`)
      .then(results => this.setState({ gender: results.data }));
    axios
      .delete(`/api/status/${i}`)
      .then(results => this.setState({ status: results.data }));
    let petcopy = this.state.pet;
    petcopy.splice(i, 1);
    this.setState({ pet: petcopy });
    let agecopy = this.state.age;
    agecopy.splice(i, 1);
    this.setState({ age: agecopy });
  }
  render() {
    let copyowner = this.state.owner.map((e, i) => {
      return (
        <Editor
          index={i}
          name={e}
          key={i}
          pet={this.state.pet[i]}
          gender={this.state.gender[i]}
          breed={this.state.breed[i]}
          age={this.state.age[i]}
          status={this.state.status[i]}
          updateListing={this.updateListing}
          deleteMember={this.deleteMember}
        />
      );
    });
    return (
      <div>
        <div>
          <input onChange={e => this.handleInput(e.target.value)} />
          <button onClick={() => this.newListing(this.state.userInput)}>
            Add
          </button>
        </div>
        {copyowner}
      </div>
    );
  }
}

export default App;
