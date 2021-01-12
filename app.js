import path from 'path'
import http from 'http'
import express from 'express'
import ws from 'ws'
import redisObj from './redis.js'


const app = express();
let staticFilePath = path.join(process.cwd(),"public");
app.use(express.static('public'));


const WebSocketServer = ws.Server;
const server = http.createServer(app);
const wss = new WebSocketServer({server: server});


wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (msg) => {
    console.log('Message: ' + msg);
    redisObj.redisPublish('chat_messages', msg);
  });
});


redisObj.redisSubscribe('chat_messages');
redisObj.redisListen('message', (channel, msg) => {
  wss.clients.forEach((client) => {
    client.send(msg);
  });
});

server.listen(process.argv[2] || 8080, () => console.log('Server is on'));
