import React, { Component } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import Api from '../shared/apiService';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedUsers: null,
            userList: []
        }
    }
componentDidMount(){
    this.getUsers();
}
getUsers = async()=>{
    const resp = await Api.get('user');
    console.log('response from users',resp)
}
  render() {
    return (
      <div>
        <h5>Advanced with Templating, Filtering and Multiple Selection</h5>
        <ListBox
          value={this.state.selectedUsers}
          options={this.state.userList}
          onChange={(e) => this.setState({ selectedUsers: e.value })}
          multiple
          filter
          optionLabel='name'
          style={{ width: "15rem" }}
          listStyle={{ maxHeight: "250px" }}
        />
      </div>
    );
  }
}

export default HomeComponent;
