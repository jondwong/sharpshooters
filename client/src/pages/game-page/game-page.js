import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { subscriptions, actions } from '../../socket/socket';

import DiceManager from '../../components/dice-manager';
import Header from '../../components/header'
import GameCard from '../../components/game-card'
import PlayerList from '../../components/player-list'
import BorderBox from '../../components/border-box'
import EndgameModal from './components/endgame-modal/endgame-modal';
import JoinModal from './components/join-modal';
import TurnIndicator from '../../components/turn-indicator';
import CardCounter from '../../components/card-counter';
import { CenteredVStack, Divider, Spacer } from '../../components/layout'

import {
    StyledGamePage,
    GameContainerHStack,
    GameCardSection,
    GameControlsSection,
    GameLobby,
    Loading,
    Heading,
    MobilePlayerListContainer,
    FullScreenPlayerSection,
    InformationSection 
 } from './game-page-styles'



class GamePage extends React.Component {
    constructor(props) {
        super(props);
        let baseState = {
            showJoinModal: false, 
            diceRolling: false
        }

        if(this.props.location.state && this.props.location.state.game) {
            this.state = Object.assign({}, baseState, { ...this.props.location.state.game, gameLoaded: true});
        } else {
            let unloadedState = {
                id: null,
                users: {},
                userOrder: [],
                userDiceCounts: {},
                currentDice: [],
                userPoints: {},
                currentActiveDiceIdx: null,
                currentTurnUserId: null,
                cards: [],
                currentCardIdx: 0,
                activeDice: null,
                diceRolling: false,
                gameReady: false,
                gameEnded: false,
                gameLoaded: false,
                showJoinModal: false
            }

             this.state = Object.assign({}, baseState, unloadedState);
        } 
    }

    componentDidMount() {
        subscriptions.gameStateChanged(
            function (err, data) {
                console.log('game-state changed:', data);
                
                this.setState(Object.assign({}, this.state, {...data, gameLoaded: true, diceRolling: false}));
            }.bind(this)
        );

        subscriptions.playerRoll(
            function(err, dsata) {
                this.setState({ diceRolling: true });
            }.bind(this)
        )

        if(this.props.match.params.gameId) {
             // load game
            actions.loadGame({
                gameId: this.props.match.params.gameId,
                user: {
                    id: this.props.userId
                }
            });
        }
    }

    _handleDiceActivated(dice, idx) {
        console.log('dice activated', dice, idx)
        if(this.state.currentTurn.userId === this.props.userId) {
            console.log('executing activate user dice')
            actions.activateUserDice({ gameId: this.state.id, diceIdx: idx });
        }
    }
    _handleCardDiceClicked(row, idx) {
        console.log('card dice clicked', row, idx)
        if(this.state.currentTurn.userId === this.props.userId
            && this.state.currentTurn.activeDiceIdx !== null 
            && this.state.currentTurn.activeDiceIdx != undefined) {
            console.log('executing activateCardDice');
            actions.activateCardDice({
                gameId: this.state.id,
                rowIdx: row,
                cellIdx: idx
            });
        }
    }

    _changeTurn() {
        if(this.state.currentTurn.userId === this.props.userId) {
            actions.changeTurn({ gameId: this.state.id })
        }

    }

    _startGame() {
        actions.startGame({ gameId: this.state.id});
    }

    _joinGame(name) {
        actions.joinGame({
            gameId: this.state.id, 
            user: {
                username: name,
                id: this.props.userId
            }
        });
    }
    
    _rollDice() {
        actions.alertDiceRoll({ gameId: this.state.id });
        this.setState({ diceRolling: true });
        setTimeout(function() {
            this.setState({diceRolling:false});
            actions.rollDice({
                gameId: this.state.id
            });
        }.bind(this), 1000)
    }

    _renderGame() {
        let isUserTurn = (this.state.currentTurn.userId == this.props.userId);
        return (
            <StyledGamePage>
                <Header gameId={this.state  ? this.state.id : null}/>
                <GameContainerHStack>
                    <GameCardSection>
                        <GameCard
                                cardData={this.state.cards[this.state.currentCardIdx]} 
                                onDiceClick={this._handleCardDiceClicked.bind(this)}
                            
                        />
                        <InformationSection>
                            <TurnIndicator 
                                currentTurnUserId={this.state.currentTurn.userId}
                                userId={this.props.userId}
                                users={this.state.users}
                            />
                            <CardCounter 
                                currentCardIdx={this.state.currentCardIdx}
                                numCards={this.state.cards.length}
                            />
                        </InformationSection>
                    </GameCardSection>
                    <Divider vertical={true} />
                    <FullScreenPlayerSection>
                        <Heading>Players</Heading>
                        <PlayerList 
                            users={this.state.userOrder.map(id=>({ id , ...this.state.users[id]}))} 
                            userPoints={this.state.userPoints} 
                            currentTurnUserId={this.state.currentTurn.userId}
                            userDiceCounts={this.state.userDiceCounts}
                        />
                    </FullScreenPlayerSection>
                </GameContainerHStack>
                <DiceManager
                    roll={this.state.diceRolling} 
                    currentUser={this.state.users[this.state.currentTurn.userId]} 
                    dice={this.state.currentTurn.dice} 
                    activeDiceIdx={this.state.currentTurn.activeDiceIdx} 
                    onDiceActivated={this._handleDiceActivated.bind(this)} 
                    numAvailableDice={this.state.currentTurn.numDice}
                />
                <GameControlsSection isUserTurn={isUserTurn}>
                    <button className='button' onClick={this._rollDice.bind(this)} 
                            disabled={!this.state.currentTurn.canRoll}
                    >Roll Dice</button>
                     <button className='button' onClick={this._changeTurn.bind(this)}
                        disabled={!this.state.currentTurn.canPass}
                    >Next Player</button>
                </GameControlsSection>
                <MobilePlayerListContainer>
                    <Heading>Players</Heading>
                    <PlayerList 
                        users={this.state.userOrder.map(id=>({ id , ...this.state.users[id]}))} 
                        userPoints={this.state.userPoints} 
                        currentTurnUserId={this.state.currentTurn.userId}
                        userDiceCounts={this.state.userDiceCounts}
                    />
                </MobilePlayerListContainer>
            </StyledGamePage>
        )
    }

    _renderWaiting() {
        return (<Loading>Loading...</Loading>)
    }

    _renderLobby() {
        let userInGame = (this.props.userId in this.state.users);
        return (
            <GameLobby>
                <Header gameId={this.state  ? this.state.id : null}/>
                <CenteredVStack>
                    <Spacer size={50}/>
                    <Heading>Lobby</Heading>
                    <Spacer size={20}/>
                    <BorderBox>
                        <PlayerList 
                            users={this.state.userOrder.map(id=>({ id , ...this.state.users[id]}))} 
                            userPoints={this.state.userPoints} 
                            currentTurnUserId={null}
                            userDiceCounts={this.state.userDiceCounts}
                        />
                    </BorderBox>
                    <Spacer size={40}/>
                    <div style={{marginTop:'20px', display:(this.state.users[this.props.userId] ? 'block': 'none')}}>
                        <button className='button' onClick={this._startGame.bind(this)}>
                            Start Game
                        </button>
                    </div>
                </CenteredVStack>
                { 
                    !userInGame &&
                    <JoinModal onJoinGameClicked={this._joinGame.bind(this)} />
                }
            </GameLobby>
        )
    }

    _renderEndgame() {
        return (
            <EndgameModal winner={this.state.winner}/>
        )
    }

    render() {
        console.log('game render state:', this.state);
        console.log('game render props:', this.props);
        
        if(!this.state.gameLoaded) {
            return this._renderWaiting();
        }

        if(this.state.gameState === 'NOT_STARTED') {
            return this._renderLobby();
        } else if(this.state.gameState == 'COMPLETE' && this.state.winner) {
            return this._renderEndgame();
        }

        return this._renderGame();
    }
}

export default withRouter(GamePage);
