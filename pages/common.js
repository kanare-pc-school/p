const socket = io()

$(window).on('load', () => {
    socket.emit('GET_IP_ADDR')
    $('#header .user').val('')
})

socket.on('RECIEVE_IP_ADDR', (ip) => {
    document.title = document.title + ': ' + ip
})

$('#header .user').on('input', (e) => {
    $('#header>.center>img').attr('src', 'https://avatars.dicebear.com/api/adventurer/' + $(e.currentTarget).val() + '.svg')
})

$('#header .user').on('keypress', (e) => {
    if (e.code !== 'Enter') return
    if (!$('#header .user').val()) return
    $('#header .center span').text($('#header .user').val())
    $('#header .center input').addClass('hide')
    $('#header .center button').addClass('hide')
    $('#footer').removeClass('hide')
    $('#footer .msg').val('')
    $('#footer .msg').focus()
    socket.emit('SEND_MESSAGE', $('#header .user').val(), $('#msg').val())
})

$('#header .send').on('click', (_e) => {
    if (!$('#header .user').val()) return
    $('#header .center span').text($('#header .user').val())
    $('#header .center input').addClass('hide')
    $('#header .center button').addClass('hide')
    $('#footer').removeClass('hide')
    $('#footer .msg').val('')
    $('#footer .msg').focus()
    socket.emit('SEND_MESSAGE', $('#header .user').val(), $('#msg').val())
})

$('#header .trash').on('click', (_e) => {
    if (!$('#header .user').val()) return
    socket.emit('SEND_TRASH')
})

socket.on('RECIEVE_TRASH', () => {
    $('#show .msg').empty()
    socket.emit('SEND_MESSAGE', $('#header .user').val(), '')
})