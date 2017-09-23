import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Store from './stores'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div className="App">
         <div className="container-fluid">
            <Home />
         </div>
        </div>
      </Provider>
    );
  }
}

export default App;
