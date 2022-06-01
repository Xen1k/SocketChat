const express = require("express");
const app = express();
const http = require('http').createServer();
const io = require('socket.io')(http, { cors: { origin: '*' } });

const PORT = 80;

io.on('connection', socket => {
    socket.on('message', ({ name, message, msgUserId }) => {
        io.emit('message', { name, message, msgUserId });
    });
})

http.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})