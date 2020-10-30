import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {Toast} from 'primereact/toast';
import Api from "../shared/apiService";

class SummaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mealData : []
    };
  }
  componentDidMount() {
      this.getMealSummary();
  }
  render() {
    const columns = [
      { field: "fullName", header: "Name" },
      { field: "pending", header: "Total Bill" },
      { field: "paid", header: "Total Paid" },
      { field: "net", header: "Net Amount" },
    ];
    const dynamicColumns = columns.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });
    return (
      <div>
        <div className='card'>
          <DataTable value={this.state.mealData}>{dynamicColumns}</DataTable>
        </div>
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }
  getMealSummary = async()=>{
    Api.get('meal/summary').then(resp => {
        console.log(resp.data.data)
        this.setState({mealData: resp.data.data})
    }).catch(err => {
        this.toast.show({severity: 'error', summary: 'Error', detail: 'Request Failed'});
    })
  }
}

export default SummaryComponent;
