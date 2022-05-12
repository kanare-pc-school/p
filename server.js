const express = require('express')
const http = require('http')
const sokectio = require('socket.io')

const ip = require('ip')

const app = express()
const server = http.Server(app)
const io = sokectio(server)

app.use(express.static(__dirname, { extensions: ['html'] }))

io.on('connection', (socket) => {
    socket.on('init', () => {
        io.emit('settings', ip.address())
    })
    socket.on('sendMsg', (user, msg) => {
        msg = msg === null ? '' : msg
        io.emit('receiveMsg', user, msg)
    })
    socket.on('sendFlg', (flg) => {
        io.emit('receiveFlg', flg)
    })
    socket.on('sendTrash', () => {
        io.emit('receiveTrash')
    })
    socket.on('sendCircle', (user) => {
        io.emit('receiveCircle', user)
    })
})

server.listen(8080, () => {
    console.log(ip.address() + ' run...')
})