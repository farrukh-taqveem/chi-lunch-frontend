import React, { Component } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ListBox } from "primereact/listbox";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import Api from "../shared/apiService";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      userList: [],
      cost: 0,
      verificationKey: "c",
      payments: [{ amount: 0, paidBy: null }],
    };
  }
  componentDidMount() {
    this.getUsers();
  }

  render() {
    const paymentsLength = this.state.payments.length || 0;
    return (
      <div className='p-grid'>
        <div className='p-col-12 p-md-4'>
          <h4>Select Participants</h4>
          <ListBox
            value={this.state.selectedUsers}
            options={this.state.userList}
            onChange={(e) => this.setState({ selectedUsers: e.value })}
            multiple
            filter
            optionLabel='fullName'
            listStyle={{ maxHeight: "40vh" }}
          />
        </div>
        <div className='p-col-12 p-md-8'>
          <h4>Payment Details</h4>
          <div className='p-field'>
            <label htmlFor='cost'>Cost:&nbsp;</label>
            <InputNumber
              id='cost'
              size={12}
              value={this.state.cost}
              onValueChange={(e) => this.setState({ cost: e.value })}
            />
          </div>
          <div className='p-grid'>
            <div className='p-col-6'>Participant</div>
            <div className='p-col-4'>Paid</div>
          </div>
          {this.state.payments.map((p, idx) => {
            return (
              <div key={`payment-${idx}`} className='p-grid'>
                <div className='p-col-6'>
                  {" "}
                  <Dropdown
                    value={p.paidBy}
                    options={this.state.userList}
                    onChange={(e) => this.payerUpdate(e, idx)}
                    optionLabel='fullName'
                    placeholder='Select Participant'
                  />
                </div>
                <div className='p-col-4'>
                  {" "}
                  <div className='p-field'>
                    <InputNumber
                      id='paid'
                      value={p.amount}
                      size={5}
                      onValueChange={(e) => this.changeAmount(e, idx)}
                    />
                  </div>
                </div>
                <div className='p-col-2'>
                  <Button
                    className={
                      idx === paymentsLength - 1 ? "" : "p-button-danger"
                    }
                    onClick={() => {
                      idx === paymentsLength - 1
                        ? this.addPayment()
                        : this.removePayment(idx);
                    }}
                    icon={`pi pi-${
                      idx === paymentsLength - 1 ? "plus" : "minus"
                    }`}
                  />
                </div>
              </div>
            );
          })}
          <div className='p-d-flex p-jc-between p-ai-center'>
            <div>
              <label htmlFor='verificationKey'>Key:&nbsp;</label>
              <InputText
                id='verificationKey'
                type='password'
                size={12}
                value={this.state.verificationKey}
                onChange={(e) => {
                  this.setState({ verificationKey: e.target.value });
                }}
              />
            </div>
            <Button
              className=''
              onClick={this.onSave}
              icon='pi pi-check'
              label='Save'
            />
          </div>
          <Toast ref={(el) => (this.toast = el)} />
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
      payments: [...state.payments, newPayment],
    }));
  };
  removePayment = (idx) => {
    const payments = this.state.payments.filter((item, index) => index !== idx);
    this.setState((state) => ({
      payments: payments,
    }));
  };
  changeAmount = (event, idx) => {
    const payments = this.state.payments;
    payments[idx].amount = event.target.value;
    this.setState((state) => ({ payments: payments }));
  };
  payerUpdate = (event, idx) => {
    const payments = this.state.payments;
    payments[idx].paidBy = event.target.value;
    this.setState((state) => ({ payments: payments }));
  };

  onSave = () => {
    const members = this.state.selectedUsers.map((user) => user._id);
    const cost = this.state.cost;
    const verificationKey = this.state.verificationKey;
    const payments = this.state.payments
      .filter((p) => p.paidBy != null)
      .map((p) => {
        return { amount: p.amount, paidBy: p.paidBy._id };
      });
    Api.post("meal", { members, cost, payments, verificationKey })
      .then((resp) => {
        this.toast.show({
          severity: "success",
          summary: "Success",
          detail: "Record Added",
        });
        this.setState({
          selectedUsers: [],
          userList: [],
          cost: 0,
          verificationKey: "c",
          payments: [{ amount: 0, paidBy: null }],
        });
      })
      .catch((err) => {
        this.toast.show({
          severity: "error",
          summary: "Error",
          detail: "Request Failed",
        });
      });
  };
}

export default HomeComponent;
