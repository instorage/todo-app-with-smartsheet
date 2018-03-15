import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ToDo from '../todo';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={ToDo} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
