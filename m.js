const socket = io()

$(window).on('load', () => {
    socket.emit('init')
    $('#user').val('')
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
        const tag = '<div class="line" data-user="' + user + '"><img src="https://avatars.dicebear.com/api/adventurer/' + user + '.svg"><div class="u">' + user + '</div><div class="msg"></div>'
        $('#show').append(tag)
    } else {
        $(users[0]).find('.msg').append('<div class="animate__animated animate__slideInDown">' + msg + '</div>')
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
    $('#show .line .msg').empty()
    socket.emit('sendMsg', $('#user').val(), '')
})

socket.on('receiveTrash', () => {
    $('#show .line .msg').empty()
    socket.emit('sendMsg', $('#user').val(), '')
})