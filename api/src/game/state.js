import _ from 'lodash';
import { values } from 'regenerator-runtime';
import generateCard from './card';

const MAX_DICE = 5;
const CARDS_PER_GAME = 1;
const GAME_STATES = {
    NOT_STARTED: 'NOT_STARTED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETE: 'COMPLETE'
};

const PLAYER_ACTIONS = {
    ROLLED_DICE: 'ROLLED_DICE',
    PLAYED_DIE: 'PLAYED_DIE'
};

export function getDefaultState({gameId}) {
    return {
        id: gameId,
        users: {},
        userOrder: [],
        currentDice: [],
        userPoints: {},
        userDiceCounts: {},
        currentActiveDiceIdx: null,
        currentTurnUserId: null,
        cards: new Array(CARDS_PER_GAME).fill(null).map(()=>generateCard()),
        currentCardIdx: 0,
        activeDice: null,
        gameState: GAME_STATES.NOT_STARTED,
        currentTurn: {},
        colors: [
            '#4CBAB6',
            '#BBD680',
            '#EDD155',
            '#8D8BA0',
            '#FC7F74',
            '#4CBAB6',
            '#8E97F9',
            '#e7aef6'
        ],
        winner: null,
        finalOtherScores: null
    };
}

function getStartingDice(numUsers) {
     switch(numUsers) {
        case 2:
            return 16;
        case 3:
            return 10;
        case 4:
            return 8;
        case 5:
            return 6;
        case 6:
            return 5;
    }
    return 16;
}

function generateDefaultTurn(userId, numDiceAvailable) {
    return {
        userId: userId,
        numDice: numDiceAvailable,
        dice: [],
        activeDiceIdx: null,
        canRoll: numDiceAvailable > 0 ? true : false,
        canPass: null,
        actions: []
    };
}

function getRandomColor(colors) 
{
    let outColors = Object.assign([], colors);
    let idx = Math.floor(Math.random()*outColors.length)
    let color = outColors[idx];
    outColors.splice(idx,1);
    return { color, remainingColors: outColors };
}



const startGame = (previousState, args) => {
    let nextState = Object.assign({},previousState);
    nextState = resetDice(nextState);
    nextState = setTurn(nextState, { userId: nextState.userOrder[0] });
    nextState.gameState = GAME_STATES.IN_PROGRESS;
    return nextState;
}

const resetDice = (previousState, args) => {
    let nextState = Object.assign({}, previousState);
    let numDice = getStartingDice(Object.keys(nextState.users).length);
    nextState.userOrder.forEach(userId => {
        nextState.userDiceCounts[userId] = numDice;
    });
    return nextState;
}

const setTurn = (previousState, { userId }) => {
    let nextState = Object.assign({}, previousState);
    let nextDiceRemaining = _.min([nextState.userDiceCounts[userId], MAX_DICE]);
    let turn = generateDefaultTurn(userId, nextDiceRemaining)
    turn.canRoll = true;
    turn.canPass = false;
    nextState.currentTurn = turn;
    return nextState;
}

const changeTurn = (previousState, args) => {
    let nextState = Object.assign({}, previousState);
    let currUserIdx = nextState.userOrder.indexOf(nextState.currentTurn.userId);
    let nextUserIdx = currUserIdx == nextState.userOrder.length - 1 ? 0 : (currUserIdx+1);
    let nextUserId = nextState.userOrder[nextUserIdx];
    nextState = setTurn(nextState, { userId: nextUserId });
    return nextState;
}

const addUser = (previousState, { user }) => {
    consola.log(user);
    let nextState = Object.assign({}, previousState);
    
    if(nextState.gameState === GAME_STATES.IN_PROGRESS) {
        throw 'Game has already begun!';
    }

    if(!nextState.users[user.id]) {
        let { color, remainingColors } = getRandomColor(nextState.colors);
        nextState.colors = remainingColors;
        nextState.users[user.id] = {
            username: user.username,
            color: color
        };
        nextState.userPoints[user.id] = 0;
        nextState.userDiceCounts[user.id] = 0;
        nextState.userOrder.push(user.id);
    }
    return nextState;
}


const cardDiceSelected = (previousState, { rowIdx, cellIdx }) => {
    let nextState = Object.assign({}, previousState);
    let card = nextState.cards[nextState.currentCardIdx];
    let clicked = card.rows[rowIdx].values[cellIdx];
    let currentTurn = nextState.currentTurn;
    if(currentTurn.activeDiceIdx !== null && card.rows[rowIdx].activeIdx === cellIdx) {
        let activeDice = currentTurn.dice[currentTurn.activeDiceIdx];

        if(clicked.isWild) {
            // Valid click
            let newValue = activeDice.diceVal;
            card.rows[rowIdx].values.filter(die=>{
                return die.isWild == clicked.isWild && die.diceVal == clicked.diceVal; 
            }).forEach(die=> {
                die.isWild = false;
                die.diceVal = newValue;
            });
            clicked = card.rows[rowIdx].values[cellIdx];
        }

        if( clicked.diceVal === activeDice.diceVal) {
            card.rows[rowIdx].activeIdx++;
            card.rows[rowIdx].values[cellIdx].owner = nextState.users[currentTurn.userId];
            currentTurn.dice.splice(currentTurn.activeDiceIdx, 1)
            currentTurn.numDice--;
            nextState.userDiceCounts[currentTurn.userId]--;
            currentTurn.activeDiceIdx = null;

            currentTurn.canRoll = (currentTurn.dice.length > 0);
            currentTurn.canPass = true;
            currentTurn.actions.push(PLAYER_ACTIONS.PLAYED_DIE);

            /*
                *  The row has been completed, so it is time to assign points!
                */
            if(card.rows[rowIdx].activeIdx >= card.rows[rowIdx].values.length) {
                nextState.userPoints[currentTurn.userId] += card.rows[rowIdx].points;
                card.rows[rowIdx].winner = currentTurn.userId;
            }

            /*
                *  Check to see if the card has been completed
                */
            let cardIsComplete = card.rows.every(row=>row.hasOwnProperty('winner'));
            if(cardIsComplete) {

                if(nextState.currentCardIdx === (nextState.cards.length - 1)) {
                    nextState.gameState = GAME_STATES.COMPLETE;
                    nextState.winner = null;
                    let scores = Object.keys(nextState.userPoints)
                        .reduce(function(scores,userId) {
                                scores.push({ 
                                    user: nextState.users[userId],
                                    score: nextState.userPoints[userId]
                                });
                                return scores;
                            }.bind(this), []);
                    scores.sort((a,b)=>{return a.score-b.score; }).reverse();
                    nextState.winner = scores.splice(0,1)[0];
                    nextState.finalOtherScores = scores;

                } else {
                    nextState.currentCardIdx++;
                    nextState = resetDice(nextState);
                    nextState = setTurn(nextState, { userId: currentTurn.userId });
                }
            }
        }
    }

    return nextState;
}

const userDiceSelected = (previousState, { diceIdx }) => {
    let nextState = Object.assign({}, previousState);
    let currentTurn = nextState.currentTurn;
    currentTurn.activeDiceIdx = diceIdx;
    return nextState;
};

const rollDice = (previousState, args) => {
    let nextState = Object.assign({}, previousState);
    let currentTurn = nextState.currentTurn;
    let card = nextState.cards[nextState.currentCardIdx];

    currentTurn.dice = new Array(currentTurn.numDice).fill(null).map(v=>({ 
        diceVal: Math.floor(Math.random()*6) + 1
    }));

    currentTurn.activeDiceIdx = null;
    /*
     *  Identify actions player can take based on current roll
     */ 
    let currDiceValues = new Array(7).fill(null);

    currentTurn.dice.forEach(die=>{
        currDiceValues[die.diceVal] = true;
    });

    let hasMove = card.rows.filter( row => {
        return !row.winner;
    }).some(row=>{
        return currDiceValues[row.values[row.activeIdx].diceVal] !== null || ['*', '**'].indexOf(row.values[row.activeIdx].diceVal) !== -1;
    });

    currentTurn.canPass = (!hasMove) ? true : false;
    currentTurn.canRoll = false;
    currentTurn.actions.push(PLAYER_ACTIONS.ROLLED_DICE);
    return nextState;
}

export const actions = {
    startGame,
    resetDice,
    setTurn,
    changeTurn,
    addUser,
    cardDiceSelected,
    userDiceSelected,
    rollDice
}