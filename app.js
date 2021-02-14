const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const login_api = require('./login');

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
});

http.listen(3000, () => {
    console.log('listening on port 3000');
});