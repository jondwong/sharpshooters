import React from 'react';

import {actions, subscriptions} from '../../socket/socket';
import { Redirect } from 'react-router-dom';

import {
    SplashPageLayout,
    SplashPageContent,
    SplashPageLogo,
    SplashPageControlRegion,
    SplashPageCreateGameSection,
    SplashPageJoinGameSection
} from './splash-page-styles'

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userId': this.props.userId,
      'username': null,
      'gameId': null,
      'isGameIdInvalid': false,
      'routeToGame': false, 
      'game': null
    };

    subscriptions.gameStateChanged(
     function (err, data) {
        //this.props.setGameId(data.id);
        this.setState({ 'routeToGame': true, 'game': data, 'gameId': data.id });
      }.bind(this)
    )
  }


  createGame() {
    actions.createGame({ 
      user: { 
        id: this.state.userId, 
        username: this.state.username 
      }
    });
  }

  joinGame() {
      let gameId = this.state.gameId;
      if(!gameId || gameId.length == 0 ){
        this.setState({
          isGameIdInvalid: true
        });
        return;
      }

      this.setState({
        isGameIdInvalid:false
      })
      actions.joinGame({ 
        gameId, 
        user: { 
          id: this.state.userId,
          username: this.state.username 
        }
      });
  }


  render() {
    if( this.state.routeToGame ) {
      return <Redirect to={{ 
              pathname: `/${this.state.gameId}`, 
              state: { 
                game: this.state.game,
                userId: this.state.userId
              }}} />
    }
    return (
      <SplashPageLayout>
        <SplashPageContent>
        <SplashPageLogo>sharpshooters.</SplashPageLogo>
        <input className='input' 
               placeholder='Enter your name' 
               value={this.state.username}
               onChange = {function(e) { this.setState({username: e.target.value})}.bind(this)}
        />
        <SplashPageControlRegion>
            <SplashPageCreateGameSection>
                <div className='button' onClick={this.createGame.bind(this)}>Create Game</div>
            </SplashPageCreateGameSection>
            <div>
                or
            </div>
            <SplashPageJoinGameSection>
                <input className={`input ${this.state.isGameIdInvalid ? 'is-danger' : ''}`}
                    type="text" 
                    placeholder="Enter Game Id"
                    value={this.state.gameId}
                    onChange={function(e) {this.setState({gameId: e.target.value}); }.bind(this)}
                    />
                <div className='button' onClick={this.joinGame.bind(this)}>Join Game</div>
            </SplashPageJoinGameSection>
          </SplashPageControlRegion>
        </SplashPageContent>
      </SplashPageLayout>
    )
  }
}

export default SplashPage;