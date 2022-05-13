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
    if (!msg) return
    if ($('#show').children('.msg').length === 0) $('#show').append('<div class="msg"></div>')
    let tag = '<div class="char animate__animated animate__bounceInDown tooltip">'
    tag += '<span class="text">'
    tag += msg
    tag += '</span>'
    tag += '<span class="tooltip-text" style="background-color: ' + getColor(user) + '">'
    tag += user
    tag += '</span>'
    tag += '</div>'
    $('#show .msg').append(tag)

    if ($('#header>.left input[type="checkbox"]').prop('checked')) {
        $('#show .msg .text').addClass('hide')
    }
})

$('#header>.left input[type="checkbox"]').on('click', (e) => {
    const checked = $(e.currentTarget).prop('checked')
    if (checked) {
        $('#header>.left label').text('非表示')
        $('#show .msg .text').addClass('hide')
    } else {
        $('#header>.left label').text('表示中')
        $('#show .msg .text').removeClass('hide')
    }
    socket.emit('SEND_FLG', $(e.currentTarget).prop('checked'))
})

socket.on('RECIEVE_FLG', (checked) => {
    if (checked) {
        $('#show .msg .text').addClass('hide')
        $('#header>.left label').text('非表示')
    } else {
        $('#show .msg .text').removeClass('hide')
        $('#header>.left label').text('表示中')
    }
    $('#header>.left input[type="checkbox"]').prop('checked', checked)
})

$(document).on('keydown', (e) => {
    if (e.code !== 'Escape') return
    const checked = $('#header>.left input[type="checkbox"]').prop('checked')
    if (checked) {
        $('#show .msg .text').removeClass('hide')
    }
})

$(document).on('keyup', (e) => {
    if (e.code !== 'Escape') return
    const checked = $('#header>.left input[type="checkbox"]').prop('checked')
    if (checked) {
        $('#show .msg .text').addClass('hide')
    }
})

function getColor(user) {
    const n = Array.from(user).map(ch => ch.charCodeAt(0)).reduce((a, b) => a + b)
    const colorAngle = (n * n) % 360
    return `hsl(${colorAngle}, 80%, 64%)`
}