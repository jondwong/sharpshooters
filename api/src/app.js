import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import http from 'http';
import cors from 'cors';
import consola from 'consola';
import {API_PORT} from './env';
import SocketServer from './socket_server';

const app = express();
const server = new http.Server(app);
const SERVER_PORT = Number(API_PORT) + 1;

app.use(cors())
app.use(express.json())

SocketServer(server);

app.get('/', (req, res)=>{
    res.json({
        'hello' : 'world'
    });
});

app.listen(Number(API_PORT), () => {
    consola.success(`Shooter server listening on port ${API_PORT}`)
});

consola.log(SERVER_PORT);

server.listen(SERVER_PORT, () => {
    consola.success(`Socket listening on port ${SERVER_PORT}`)
});