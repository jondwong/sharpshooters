import consola from 'consola';
import randomWords from 'random-words';
import {getDefaultState} from './state';

export const STATE_UPDATE_STATUS_CODES = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
};

export class GamesManager {
    constructor(io) {
        this._games = {};
        this._io = io;
    }

    createGame() {
        let gameId = randomWords(2).join('-');
        this._games[gameId] = new Game(gameId);
        return this._games[gameId];
    }

    getGame(gameId) {
        return this._games[gameId];
    }
}

class Game {
    constructor(id) {
        this.id = id;
        this._state = getDefaultState({ gameId: id });
    }

    getState() {
        return this._state;
    }

    update(action, args) {
        // consola.info(
        //     `previousState = ${JSON.stringify(this._state, null, 2)}`
        // )
        try {
            this._state = action(this._state, args);
        } catch (e) {
            return {
                code: STATE_UPDATE_STATUS_CODES.FAILURE,
                message: e
            };
        }
        // consola.info(
        //     `newStaste = ${JSON.stringify(this._state, null, 2)}`,
        // )
        return {
            code: STATE_UPDATE_STATUS_CODES.SUCCESS
        };
    }
}