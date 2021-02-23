const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http, {autoConnect: false});
const bodyParser = require('body-parser');
const redis = require('redis');
const cookieParser = require('cookie-parser');

const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    db: 0
});
exports.redisClient = redisClient;

const login_api = require('./login');
const commands = require('./command_server');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/src', express.static(path.join(__dirname, '/src')));

app.get('/', (req,res) => {res.redirect('/login');});
app.get('/login', (req,res) => {res.sendFile(path.join(__dirname, 'login.html'));});
app.get('/chat', (req, res) => {res.sendFile(path.join(__dirname, 'chat.html'));});
app.post('/login.js', (req,res) => {login_api.login(req,res)});
app.get('/command/:cmd', (req,res) => {commands[req.params.cmd](req, res)});


io.on('connection', (socket) => {
    socket.broadcast.emit('chat message', {user_name: "notice", text: socket.handshake.query.user_name + " has joined!", color: "#808080"});
    if (socket.handshake.query.user_name) {redisClient.rpush('users', socket.handshake.query.user_name);}

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('typing', (user_name) => {
        socket.broadcast.emit('typing', user_name);
    });
    socket.on('not typing', (user_name) => {
        socket.broadcast.emit('not typing', user_name);
    });
    socket.on('user left', (user_name) => {
        socket.broadcast.emit('chat message', {user_name: "notice", text: user_name + " has left!", color: "#808080"});
        redisClient.lrem('users', 0, user_name);
    });
});

http.listen(3000, () => {
    console.log('listening on port 3000');
});