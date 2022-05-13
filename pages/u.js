$('#footer .btn').on('click', (e) => {
    if (!$('#header .user').val()) return
    socket.emit('SEND_MESSAGE', $('#header .user').val(), $(e.currentTarget).attr('data-value'))
})

socket.on('RECIEVE_MESSAGE', (user, msg) => {
    if (user === '' || user === 'admin') return
    const users = $('#show .box[data-user="' + user + '"]').get()

    if (users.length === 0) {
        let tag = '<div class="box" data-user="' + user + '">'
        tag += '<div class="h">'
        tag += '<img src="https://avatars.dicebear.com/api/adventurer/' + user + '.svg">'
        tag += '<span>' + user + '</span>'
        tag += '</div>'
        tag += '<div class="body">'
        tag += '<div class="msg"></div>'
        tag += '<img class="circle hide" src="/images/circle.svg" />'
        tag += '</div>'
        $('#show').append(tag)
    } else {
        let tag = '<div class="animate__animated animate__bounceIn">' + msg + '</div>'
        $(users[0]).find('.msg').html(tag)
    }
    $('#show .box .circle').addClass('hide')
})

$(document).on('keydown', (e) => {
    if (e.code !== 'Escape') return
    const chk = $('#header>.left input[type="checkbox"]')
    chk.prop('checked', !chk.prop('checked'))
    $('#header>.center').toggleClass('hide')
    $('#show .box .circle').addClass('hide')
    if ($('#header>.center').hasClass('hide')) {
        $('#header .user').val('admin')
    } else {
        $('#header .user').val('')
    }
})

$(document).on('click', '.box', (e) => {
    if (!$('#header>.left input[type="checkbox"]').prop('checked')) return
    if ($(e.currentTarget).find('.circle').hasClass('hide')) {
        $(e.currentTarget).find('.circle').removeClass('hide')
    } else {
        $(e.currentTarget).find('.circle').addClass('hide')
    }
    const user = $(e.currentTarget).attr('data-user')
    socket.emit('SEND_CIRCLE', user)
})

socket.on('RECIEVE_CIRCLE', (user) => {
    if (user === '' || $('#header>.left input[type="checkbox"]').prop('checked')) return
    const users = $('#show .box[data-user="' + user + '"]').get()
    if (users.length === 1) {
        $(users[0]).find('.circle').toggleClass('hide')
    }
})