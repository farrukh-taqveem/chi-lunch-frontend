import React, { Component } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { withRouter } from "react-router-dom";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }
  render() {
    const leftContents = (
      <React.Fragment>
        <Button label='Home' icon='pi pi-home' className='p-mr-2' />
        <Button
          label='Explore Markets'
          icon='pi pi-search'
          className='p-button-success'
        />
      </React.Fragment>
    );

    const rightContents = (
      <React.Fragment>
        <Button
          onClick={() => this.setState({ showDialog: true })}
          label='Login'
          icon='pi pi-unlock'
          className='p-mr-2'
        />
      </React.Fragment>
    );

    return (
      <div>
        <Toolbar left={leftContents} right={rightContents} />
      </div>
    );
  }
  hideDialog = ()=>{
    this.setState({ showDialog: false })
  }
}

export default withRouter(TopBar);
