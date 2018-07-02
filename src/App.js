import React, { Component } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "./components/editor";
import Create from "./components/create";
import Filter from "./components/filter";
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
      ownerNameInput: ""
    };
    this.updateStatus = this.updateStatus.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.handleOwnerInput = this.handleOwnerInput.bind(this);
    this.newMember = this.newMember.bind(this);
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

  newMember(owner) {
    axios
      .post("/api/members/create", { owner })
      .then(results => this.setState({ owner: results.data }));
    let agecopy = this.state.age;
    let petcopy = this.state.pet;
    agecopy.push(undefined);
    petcopy.push(undefined);
    this.setState({ age: agecopy });
    this.setState({ pet: petcopy });
  }

  updateStatus(changedstatus, i) {
    axios.put(`/api/members/update/${i}`, { changedstatus }).then(results => {
      this.setState({ status: results.data });
    });
  }

  handleOwnerInput(val) {
    this.setState({ ownerNameInput: val });
  }

  deleteMember(i) {
    console.log({ i });
    let promises = [
      axios.delete(`/api/breeds/${i}`),
      axios.delete(`/api/owners/${i}`),
      axios.delete(`/api/genders?i=${i}`),
      axios.delete(`/api/status/delete?i=${i}`)
    ];

    axios.all(promises).then(
      axios.spread((breed, owner, gender, status) => {
        console.log(owner.data);
        this.setState(
          {
            breed: breed.data,
            owner: owner.data,
            gender: gender.data,
            status: status.data
          },
          () => {
            let petcopy = this.state.pet;
            petcopy.splice(i, 1);
            this.setState({ pet: petcopy });
            let agecopy = this.state.age;
            agecopy.splice(i, 1);
            this.setState({ age: agecopy });
          }
        );
      })
    );

    // .then(results => this.setState({ breed: results.data }));

    // .then(results => this.setState({ owner: results.data }));

    // .then(results => this.setState({ gender: results.data }));

    // .then(results => this.setState({ status: results.data }));
  }

  // makeAdminTrue() {
  //   this.setState({ admin: true });
  // }
  render() {
    let copyowner = this.state.owner
      .filter((e, i) => e.includes(this.state.ownerNameInput))
      .map((e, i) => {
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
            updateStatus={this.updateStatus}
            deleteMember={this.deleteMember}
            adminstatus={this.state.adminstatus}
            newbie={this.state.newbie}
          />
        );
      });

    return (
      <div className="App">
        <div className="header">
          <h1>West Fran Dog Club</h1>
          <div className="create">
            <ul>
              <li>
                <Create
                  addfield={this.handleNewMemberInput}
                  newMemberbutton={this.newMember}
                />
              </li>

              <li>
                <Filter filterfield={this.handleOwnerInput} />
              </li>
            </ul>
          </div>
        </div>

        {copyowner}
      </div>
    );
  }
}

export default App;
