import React from 'react';
import './game.scss';
import { subscriptions, actions } from '../../socket/socket';
import { withRouter } from 'react-router-dom';
import { DiceManager } from '../../components/die';
import Card , {CardDice} from '../../components/card'
import _ from 'lodash';
import MiniMenu from '../../components/minimenu';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        let baseState = {
            showJoinModal: false, 
            diceRolling: false
        }

        this._joinGameInputRef = React.createRef();

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

    _joinGame() {
        actions.joinGame({
            gameId: this.state.id, 
            user: {
                username: this._joinGameInputRef.current.value,
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

    render() {
        console.log('game render state:', this.state);
        console.log('game render props:', this.props);
        
        return (
            <div className='game-page'>
                <div className='header'>
                    <div className='logo' onClick={function(){this.props.history.push('/')}.bind(this)}><span>sharpshooters.</span></div>
                    <div className='game-id'>{this.state && this.state.id ? this.state.id : ''}</div>
                </div>
                { this.state.gameLoaded && 
                    <div className='game-page-wrapper'>
                        <div className='game-card-container'>
                            <Card 
                                card={this.state.cards[this.state.currentCardIdx]} 
                                onDiceClick={this._handleCardDiceClicked.bind(this)}
                            />
            
                            
                            <PlayerList users={this.state.userOrder.map(id=>({ id , ...this.state.users[id]}))} 
                                        userPoints={this.state.userPoints} 
                                        currentTurnUserId={this.state.currentTurn.userId}
                                        userDiceCounts={this.state.userDiceCounts}
                            />
                        </div>
                        <div className= {`game-main-card-counter`}>
                            {this.state.cards.length - this.state.currentCardIdx - 1 } cards remaining!
                        </div>

                        {
                            this.state.currentTurn && this.state.currentTurn.userId &&
                            <div className='turn-indicator'>
                                {
                                    this.state.currentTurn.userId == this.props.userId ? 'YOUR' : `${this.state.users[this.state.currentTurn.userId].username.toUpperCase()}'S`
                                } TURN!
                            </div>
                        }

                        {  this.state.currentTurn && this.state.currentTurn.userId &&
                            <MiniMenu 
                                currentCardIdx={this.state.currentCardIdx}
                                numCards={this.state.cards.length}
                                userTurnOrder={this.state.userTurnOrder}
                                currentTurnUserId={this.state.currentTurn.userId}
                                users={this.state.users}
                                userId={this.props.userId}
                            />
                        }

                        <div className='game-container'>
                            
                            {

                                this.state.currentTurn && this.state.currentTurn.userId && 
                                <DiceManager
                                    roll={this.state.diceRolling} 
                                    currentUser={this.state.users[this.state.currentTurn.userId]} 
                                    dice={this.state.currentTurn.dice} 
                                    activeDiceIdx={this.state.currentTurn.activeDiceIdx} 
                                    onDiceActivated={this._handleDiceActivated.bind(this)} 
                                    numAvailableDice={this.state.currentTurn.numDice}
                                    />
                            }
                        </div>

                        {
                            this.state.gameState === 'COMPLETE' &&
                            <div className='win-screen'>
                                <div className='final-scores-container'>
                                    <div className='winner'>
                                        WINNER
                                        <div className='winner-title'>{this.state.winner.user.username}</div>
                                        <div className='winner-score'>${this.state.winner.score}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                }
                

                { this.state.currentTurn && this.state.currentTurn.userId == this.props.userId &&
                    <div className='game-controls' style={{marginTop:'20px'}}>
                        {
                            this.state.userDiceCounts[this.state.currentTurn.userId] > 0 &&
                            <button className='button' onClick={this._rollDice.bind(this)} 
                                disabled={!this.state.currentTurn.canRoll}
                            >
                                Roll Dice
                            </button>
                        }

                        <button className='button' onClick={this._changeTurn.bind(this)}
                            disabled={!this.state.currentTurn.canPass}
                        >
                            Next Player
                        </button>
                    </div>
                }
                
                {  this.state.gameState === 'NOT_STARTED' && this.state.users[this.props.userId] &&
                    <div style={{marginTop:'20px'}}>
                        <button className='button' onClick={this._startGame.bind(this)}>
                            Start Game
                        </button>
                    </div>
                }
                
                { this.state.gameLoaded  &&
                    <div className='bottom-player-list'>
                        <div className='header'>Players</div>
                        <PlayerList users={this.state.userOrder.map(id=>({ id , ...this.state.users[id]}))} 
                                            userPoints={this.state.userPoints} 
                                            currentTurnUserId={this.state.currentTurn.userId}
                                            userDiceCounts={this.state.userDiceCounts}
                                />
                    </div>
                }

                
               {
                   ( !this.state.gameReady && this.state.userOrder.indexOf(this.props.userId) == -1 ) &&
                    <div className='join-modal-container'>
                        <div className='join-modal-view'>
                            <input className='input' placeholder='Enter your name...' ref={this._joinGameInputRef} />
                            <button className='button' onClick={this._joinGame.bind(this)}>Join</button>
                            
                        </div>
                    </div>
               }
            </div>
        )
    }
}

export default withRouter(GamePage);


const Player = ({
    isActive,
    user,
    points,
    numDiceRemaining,
    diceDisplayVal
}) => {
    return(
        <div className={`player-list-player ${ isActive ?'active-player' : '' }`}>
            <div className='player-top'>
                <div className={`player-list-name ${ !isActive ?'inactive' : '' }`}>
                    {user.username}
                </div>
                <div className={`player-list-score ${ !isActive ?'inactive' : '' } `}>
                    ${points}
                </div>
                <div className="middot">
                
                </div>
                <div className={`player-dice-count `}>
                    <div className={`player-dice-count-label ${ !isActive ?'inactive' : '' }`}>
                        {numDiceRemaining}
                    </div>
                    <CardDice 
                        value={diceDisplayVal} 
                        size={22}
                        selectedByUser={isActive ? user : null}
                        sensitive={false}      
                    />
                </div>
            </div>

        </div>
    )
}
const PlayerList = (props) => {
    return (
        <div className='player-list'>
            {
                props.users.map((u,idx)=>{
                    return (
                        <Player
                            isActive={(props.currentTurnUserId == u.id)}
                            user={u}
                            points={props.userPoints[u.id]}
                            numDiceRemaining={props.userDiceCounts[u.id]}
                            diceDisplayVal={(idx+1) % 6}
                        />
                    )
                })
            }
        </div>
    )
}