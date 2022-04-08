const socket = io()

$('#msg').on('keypress', (e) => {
    if (e.code === 'Enter' && $('#msg').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), $('#msg').val())
        $('#msg').val('')
    }
})

$('#send').on('click', (_e) => {
    if ($('#msg').val() !== '') {
        socket.emit('sendMsg', $('#user').val(), $('#msg').val())
        $('#msg').val('')
    }
})

socket.on('receiveMsg', (user, msg) => {
    const tag = '<div class="char animate__animated animate__bounceInDown">' + msg + user + '</div>'
    $('#show').append(tag)
})

$('#user').on('input', (e) => {
    $('#header>img').attr('src', 'https://avatars.dicebear.com/api/pixel-art/' + $(e.currentTarget).val() + '.svg')
})
