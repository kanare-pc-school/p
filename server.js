const express = require('express')
const http = require('http')
const sokectio = require('socket.io')

const app = express()
const server = http.Server(app)
const io = sokectio(server)

app.use(express.static(__dirname))

io.on('connection', (socket) => {
    socket.on('sendMsg', (msg) => {
        io.emit('receiveMsg', msg)
    })
})

server.listen(8080, () => {
    console.log('run...')
})