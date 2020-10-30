import React, { Component } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ListBox } from "primereact/listbox";
import { InputNumber } from "primereact/inputnumber";
import Api from "../shared/apiService";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: null,
      userList: [],
      cost: 0,
      payments: [{ amount: 0, paidBy: null }],
    };
  }
  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className='p-grid'>
        <div className='p-col-4'>
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
            <label htmlFor='cost'>Cost:&nbsp;</label>
            <InputNumber
              id='cost'
              value={this.state.cost}
              onValueChange={(e) => this.setState({ cost: e.value })}
            />
          </div>
          {this.state.payments.map((p, idx) => {
            return (
              <div key={`payment-${idx}`} className='p-grid'>
                <div className='p-col'>
                  {" "}
                  <Dropdown
                    value={p.paidBy}
                    options={this.state.userList}
                    onChange={(e) => {console.log("select", p)}}
                    optionLabel='fullName'
                    placeholder='Select Participant'
                  />
                </div>
                <div className='p-col'>
                  {" "}
                  <div className='p-field'>
                    <label htmlFor='paid'>Paid:&nbsp;</label>
                    <InputNumber
                      id='paid'
                      value={p.amount}
                      onValueChange={(e) => this.setState({ paid: e.value })}
                    />
                  </div>
                </div>
                <div className='p-col-3'>
                  <Button onClick={this.addPayment} icon='pi pi-plus' />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
  addPayment = () => {
    const newPayment = { amount: 0, paidBy: null };
    this.setState((state) => ({
        payments: [...state.payments, newPayment]
    }));
  };
}

export default HomeComponent;
