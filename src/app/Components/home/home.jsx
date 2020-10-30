import React, { Component } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { InputNumber } from "primereact/inputnumber";
import Api from "../shared/apiService";
import './home.scss'

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: null,
      userList: [],
      cost: 0,
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    const resp = await Api.get("user");
    if (resp.status === 200) {
      for (const user of resp.data.data) {
        user.fullName = user.firstName + " " + user.lastName;
      }
      const regularUsers = resp.data.data.filter(
        (user) => user.type === "Regular"
      );
      this.setState({ userList: resp.data.data, selectedUsers: regularUsers });
    }
  };
  render() {
    return (
      <div className='p-grid home-page'>
        <div className="p-col user-selector">
          <h4>Select Participants</h4>
          <ListBox
            value={this.state.selectedUsers}
            options={this.state.userList}
            onChange={(e) => this.setState({ selectedUsers: e.value })}
            multiple
            filter
            optionLabel='fullName'
            listStyle={{ maxHeight: "15vw" }}
          />
        </div>
        <div className='p-col'>
          <div className='p-field'>
            <label htmlFor='integeronly'>Cost: </label>
            <InputNumber
              id='integeronly'
              value={this.state.cost}
              onValueChange={(e) => this.setState({ cost: e.value })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
