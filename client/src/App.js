import './App.scss';
import React from 'react';
import { initiateSocket } from './socket/socket';
import { BrowserRouter, Route } from 'react-router-dom';
import { v4  } from 'uuid';

import SplashPage from './pages/splash';
import GamePage from './pages/game';


const UUID_FIELD = 'sharpshooter-game-uuid';

class App extends React.Component {
  constructor(props) {
    super(props);
    initiateSocket();
    //set id 
    let userId = sessionStorage.getItem(UUID_FIELD);
    if(!userId) {
      userId =  v4();
      sessionStorage.setItem(UUID_FIELD, userId);
    }
    this.state = {
      userId: userId
    }
  }

  render () {
    return (
          <BrowserRouter>
            <div className="App">
              <Route exact path="/" render={props => <SplashPage userId={this.state.userId} {...props}/>} />
              <Route exact path="/:gameId" render={props => <GamePage userId={this.state.userId} {...props}/>} />
            </div>
          </BrowserRouter>

    );
  }
} 
export default App;


