import React, { Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import HomeComponent from './Components/home/home';
import SummaryComponent from './Components/summary/summary';
import TopBar from './Components/top-bar/top-bar'

class App extends Component { 

    render() {
      return (
        <BrowserRouter>
            <TopBar />
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/summary" component={SummaryComponent} />
        </BrowserRouter>
      );
    }
}

export default App;