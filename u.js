const socket = io()

$(window).on('load', () => {
    socket.emit('init')
    $('#user').val('')
})

socket.on('settings', (ip) => {
    document.title = ip
})

$('#footer .a').on('click', (_e) => {
    if ($('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), 'ア')
    }
})

$('#footer .i').on('click', (_e) => {
    if ($('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), 'イ')
    }
})

$('#footer .u').on('click', (_e) => {
    if ($('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), 'ウ')
    }
})

$('#footer .e').on('click', (_e) => {
    if ($('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), 'エ')
    }
})

socket.on('receiveMsg', (user, msg) => {
    if (user === '') return
    const users = $('#show .box[data-user="' + user + '"]').get()

    if (users.length === 0) {
        let tag = '<div class="box" data-user="' + user + '">'
        tag += '<div class="h">'
        tag += '<img src="https://avatars.dicebear.com/api/adventurer/' + user + '.svg">'
        tag += '<span>' + user + '</span>'
        tag += '</div>'
        tag += '<div class="body">'
        tag += '<div class="msg"></div>'
        tag += '<img class="circle hide" src="./circle.svg" />'
        tag += '</div>'
        $('#show').append(tag)
    } else {
        if (msg === null) return
        $(users[0]).find('.msg').html('<div class="animate__animated animate__bounceIn">' + msg + '</div>')
    }
})

$('#user').on('input', (e) => {
    $('#header>.center>img').attr('src', 'https://avatars.dicebear.com/api/adventurer/' + $(e.currentTarget).val() + '.svg')
})

$('#user').on('keypress', (e) => {
    if (e.code === 'Enter' && $('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), $('#msg').val())
        $('#msg').val('')
        $('#footer').removeClass('hide')
        $('#header .center span').text($('#user').val())
        $('#header .center input').addClass('hide')
        $('#msg').focus()
    }
})

$('#trash').on('click', (_e) => {
    if ($('#user').val() === '') return
    socket.emit('sendTrash')
    $('#show .box .msg').empty()
    socket.emit('sendMsg', $('#user').val(), '')

    const users = $('#show .box').get()
    users.forEach(user => {
        $(user).find('.circle').addClass('hide')
    })
})

socket.on('receiveTrash', () => {
    $('#show .box .msg').empty()
    socket.emit('sendMsg', $('#user').val(), '')
})

$('#admin').on('click', (e) => {
    const checked = $(e.currentTarget).prop('checked')
    if (checked) {
        $('#header>.left label').text('管理者')
        $('.box').css('cursor', 'pointer')
        $('#header>.center').addClass('hide')
    } else {
        $('#header>.left label').text('ユーザ')
        $('.box').css('cursor', 'default')
        $('#header>.center').removeClass('hide')
    }
})

$(document).on('click', '.box', (e) => {
    if (!$('#admin').prop('checked')) return
    if ($(e.currentTarget).find('.circle').hasClass('hide')) {
        $(e.currentTarget).find('.circle').removeClass('hide')
    } else {
        $(e.currentTarget).find('.circle').addClass('hide')
    }
    const user = $(e.currentTarget).attr('data-user')
    socket.emit('sendCircle', user)
})

socket.on('receiveCircle', (user) => {
    if (user === '' || $('#admin').prop('checked')) return
    const users = $('#show .box[data-user="' + user + '"]').get()
    if (users.length === 1) {
        if ($(users[0]).find('.circle').hasClass('hide')) {
            $(users[0]).find('.circle').removeClass('hide')
        } else {
            $(users[0]).find('.circle').addClass('hide')
        }
    }
})