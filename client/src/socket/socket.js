import {io} from 'socket.io-client';

// const ENDPOINT = 'http://localhost:3004';
const ENDPOINT = 'http://192.168.99.100:3004/'

let socket;

export const initiateSocket = (room) => {
    if(socket) {
        return;
    }
    socket = io(ENDPOINT);
    var onevent = socket.onevent;
    socket.onevent = function (packet) {
        var args = packet.data || [];
        onevent.call (this, packet);    // original call
        packet.data = ["*"].concat(args);
        onevent.call(this, packet);      // additional call to catch-all
    };

    socket.on('*', (event, data) => {
        console.log('SOCKET CATCH event=', event, ', data = ', data);
    })
};

export const disconnectSocket = () => {
    if(socket) socket.disconnect();
}


export const subscriptions = {
    gameCreated: (cb) => {
        socket.on('game:create-success', data=>{
            return cb(null, data);
        })
    },
    gameJoined: (cb) => {
        socket.on('game:join-success', data=> {
            return cb(null, data);
        })
    },
    showUsers: (cb) => {
        socket.on('game:show-users', data=>{
            return cb(null, data);
        })
    },
    gameStateChanged:(cb)=> {
        socket.on('game:state-change', data=> {
            return cb(null, data);
        });
    },
    playerRoll:(cb)=> {
        socket.on('player:roll', data=>{
            return cb(null, data);
        });
    }
};


export const actions = {
    
    createGame: ({ user }) => {
        socket.emit('game:create', { user });
    },
    joinGame: ({ gameId, user}) => {
        socket.emit('game:join', { gameId, user });
    },
    getUsers: ({ gameId }) => {
        socket.emit('game:show-users', { gameId });
    },
    activateUserDice: ({ gameId, diceIdx }) => {
        socket.emit('game:user-dice-selected', { gameId, diceIdx});
    },
    changeTurn: ({ gameId })=> {
        socket.emit('game:turn-changed', { gameId});
    },
    activateCardDice: ({ gameId, cardIdx, rowIdx, cellIdx}) => {
        socket.emit('game:card-dice-selected', { gameId, cardIdx, rowIdx, cellIdx})
    },
    startGame: ({ gameId }) => {
        socket.emit('game:start', { gameId } );
    },
    loadGame: ({ gameId, user}) => {
        socket.emit('game:load', { gameId, user });
    },
    rollDice: ({ gameId }) => {

        socket.emit('game:roll-dice', { gameId });
    },
    alertDiceRoll:({gameId}) => {
        socket.emit('game:alert-roll', { gameId });
    }
}