import consolaGlobalInstance from 'consola';
import { Server } from 'socket.io';
import { GamesManager, STATE_UPDATE_STATUS_CODES } from "./game/manager";
import { actions } from './game/state';
import consola from 'consola';

export default app => {
    const io = new Server(app, {
        cors: {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    }); 

    consola.info('Socketio initialized');
    
    const gamesManager = new GamesManager(io);
    let users = {};

    io.on('connection', async socket => {
        users[socket.id] = { socketId: socket.id };

        socket.on('game:create', ({ user })=>{
            console.log(user);
            let game = gamesManager.createGame();
            users[socket.id].username = user.username;
            let status = game.update(actions.addUser, { user });
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                socket.join(game.id);
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to create game w/ error: ${status.message}`);
            }
        });

        socket.on('game:join', ({gameId, user})=> {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:join-fail');
                return;
            }
            users[socket.id].username = user.username;
            let status = game.update(actions.addUser, { user });
  
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                socket.join(game.id);
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to join game w/ error: ${status.message}`);
            }
        });

        socket.on('game:load', ({gameId, user}) => {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:load-fail', 
                { message: `Game w/ id ${gameId} does not exist.`});
                return;
            }
            socket.join(game.id);
            io.to(game.id).emit('game:state-change', game.getState());
        });

        socket.on('game:start', function({gameId}){
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:join-fail');
                return;
            }
            let status = game.update(actions.startGame, {});
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to start game w/ error: ${status.message}`);
            }
        });

        socket.on('game:turn-changed', function({ gameId }) {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:join-fail');
                return;
            }
    
            let status = game.update(actions.changeTurn, {});
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to change turn w/ error: ${status.message}`);
            }
        });

        socket.on('game:user-dice-selected', function({ gameId, diceIdx }) {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:join-fail');
                return;
            }
    
            let status = game.update(actions.userDiceSelected, { diceIdx });
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to execute userDiceSelected w/ error: ${status.message}`);
            }
        });

        socket.on('game:card-dice-selected', function({ gameId, cardIdx, rowIdx, cellIdx}) {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:not-found');
                return;
            }
            consola.log(rowIdx,cellIdx);
            let status = game.update(actions.cardDiceSelected, { rowIdx, cellIdx });
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to execute cardDiceSelected w/ error: ${status.message}`);
            }
        });

        socket.on('game:roll-dice', function({ gameId }) {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:not-found');
                return;
            }

            let status = game.update(actions.rollDice, {});
            if(status.code === STATE_UPDATE_STATUS_CODES.SUCCESS) {
                io.to(game.id).emit('game:state-change', game.getState());
            } else {
                consola.error(`Failed to execute rollDice w/ error: ${status.message}`);
            }
        });

        socket.on('game:alert-roll', function({gameId}) {
            let game = gamesManager.getGame(gameId);
            if(!game) {
                io.to(socket.id).emit('game:not-found');
                return;
            }

            socket.to(game.id).emit('player:roll', {});
        });
    });
}