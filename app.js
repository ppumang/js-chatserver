const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const login_api = require('./login');
const redis = require('redis');

const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    db: 0
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {res.redirect('/login');});
app.get('/login', (req,res) => {res.sendFile(path.join(__dirname, 'login.html'));});
app.get('/chat', (req, res) => {res.sendFile(path.join(__dirname, 'chat.html'));});
app.post('/login.js', (req,res) => {login_api.login(req,res)});


io.on('connection', (socket) => {
    socket.broadcast.emit('chat message', {user_name: "notice", text: "a new user has joined!", color: "#808080"});

    socket.on('disconnect', () => {
        socket.broadcast.emit('chat message', {user_name: "notice", text: "user left!", color: "#808080"});
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('typing', (user_name) => {
        console.log('typing =>', user_name);
        socket.broadcast.emit('typing', user_name);
    })
    socket.on('not typing', (user_name) => {
        socket.broadcast.emit('not typing', user_name);
    })
});

http.listen(3000, () => {
    console.log('listening on port 3000');
});