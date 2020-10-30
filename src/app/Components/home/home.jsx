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
    if(resp.status === 200){
        for (const user of resp.data.data){
            user.fullName = user.firstName + ' ' + user.lastName;
        }
        const regularUsers = resp.data.data.filter(user=> user.type === 'Regular')
        this.setState({userList: resp.data.data, selectedUsers: regularUsers})
    }
}
  render() {
    return (
      <div>
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
    );
  }
}

export default HomeComponent;
