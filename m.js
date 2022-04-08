const socket = io()

$(window).on('load', () => {
    socket.emit('init')
})

socket.on('settings', (ip) => {
    document.title = ip
})

$('#msg').on('keypress', (e) => {
    if (e.code === 'Enter' && $('#msg').val() !== '' && $('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), $('#msg').val())
        $('#msg').val('')
    }
})

$('#send').on('click', (_e) => {
    if ($('#msg').val() !== '' && $('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), $('#msg').val())
        $('#msg').val('')
    }
})

socket.on('receiveMsg', (user, msg) => {
    const users = $('#show .line[data-user="' + user + '"]').get()

    if (users.length === 0) {
        const tag = '<div class="line" data-user="' + user + '"><img src="https://avatars.dicebear.com/api/pixel-art/' + user + '.svg"><div class="u">' + user + '</div><div class="msg"></div>'
        $('#show').append(tag)
    } else {
        $(users[0]).find('.msg').append('<div class="animate__animated animate__slideInDown">' + msg + '</div>')
    }
})

$('#user').on('input', (e) => {
    $('#header>.center>img').attr('src', 'https://avatars.dicebear.com/api/pixel-art/' + $(e.currentTarget).val() + '.svg')
})

$('#user').on('keypress', (e) => {
    if (e.code === 'Enter' && $('#user').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), $('#msg').val())
        $('#msg').val('')
    }
})

$('#trash').on('click', (_e) => {
    $('#show .line .msg').empty()
})