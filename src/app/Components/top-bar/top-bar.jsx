import React, { Component } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { withRouter } from "react-router-dom";
import {Link } from "react-router-dom";

class TopBar extends Component {
  render() {
    const leftContents = (
      <React.Fragment>
        <Link style={{textDecoration:'none'}} to=''>
          <Button label='Home' icon='pi pi-home' className='p-mr-2' />
        </Link>
      </React.Fragment>
    );

    const rightContents = (
      <React.Fragment>
        <Link style={{textDecoration:'none'}}  to='summary'>
          <Button label='Summary' icon='pi pi-pencil' className='p-mr-2' />
        </Link>
      </React.Fragment>
    );

    return (
      <div>
        <Toolbar left={leftContents} right={rightContents} />
      </div>
    );
  }
}

export default withRouter(TopBar);
