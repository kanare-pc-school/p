$('#footer .msg').on('keypress', (e) => {
    if (e.code !== 'Enter') return
    if (!$('#footer .msg').val() || !$('#header .user').val()) return
    socket.emit('SEND_MESSAGE', $('#header .user').val(), $('#footer .msg').val())
    $('#footer .msg').val('')
})

$('#footer .send').on('click', (_e) => {
    if (!$('#footer .msg').val() || !$('#header .user').val()) return
    socket.emit('SEND_MESSAGE', $('#header .user').val(), $('#footer .msg').val())
    $('#footer .msg').val('')
})

socket.on('RECIEVE_MESSAGE', (user, msg) => {
    const users = $('#show .line[data-user="' + user + '"]').get()
    if (users.length === 0) {
        let tag = '<div class="line" data-user="' + user + '">'
        tag += '<img src="https://avatars.dicebear.com/api/adventurer/' + user + '.svg">'
        tag += '<div class="u">' + user + '</div>'
        tag += '<div class="msg"></div>'
        tag += '</div>'
        $('#show').append(tag)
    } else {
        let tag = '<div class="animate__animated animate__slideInDown">' + msg + '</div>'
        $(users[0]).find('.msg').append(tag)
    }
})