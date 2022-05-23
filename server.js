const express = require('express')
const http = require('http')
const sokectio = require('socket.io')
const ip = require('ip')
const path = require('path')

const app = express()
const server = http.Server(app)
const io = sokectio(server)

app.use(express.static(path.resolve(__dirname, 'pages'), { extensions: ['html'] }))

io.on('connection', (socket) => {
    socket.on('GET_IP_ADDR', () => {
        io.emit('RECIEVE_IP_ADDR', ip.address())
    })
    socket.on('SEND_MESSAGE', (user, msg) => {
        msg = msg === null ? '' : msg
        io.emit('RECIEVE_MESSAGE', user, msg)
    })
    socket.on('SEND_FLG', (flg) => {
        io.emit('RECIEVE_FLG', flg)
    })
    socket.on('SEND_TRASH', () => {
        io.emit('RECIEVE_TRASH')
    })
    socket.on('SEND_CIRCLE', (user) => {
        io.emit('RECIEVE_CIRCLE', user)
    })
    socket.on('SEND_QUESTION', (user) => {
        io.emit('RECIEVE_QUESTION', user)
    })
})

server.listen(8080, () => {
    console.log(ip.address() + ' run...')
})