const socket = io()

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
    const tag = '<div class="char animate__animated animate__bounceInDown tooltip">' + msg + '<span class="tooltip-text">' + user + '</span></div>'
    $('#show').append(tag)
})

$('#user').on('input', (e) => {
    $('#header>.center>img').attr('src', 'https://avatars.dicebear.com/api/pixel-art/' + $(e.currentTarget).val() + '.svg')
})

$('#trash').on('click', (_e) => {
    $('#show').empty()
})