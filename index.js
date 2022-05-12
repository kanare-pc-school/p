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
    if (!msg) return
    if ($('#hide').prop('checked')) {
        const tag = '<div class="char hide animate__animated animate__bounceInDown tooltip">' + msg + '<span class="tooltip-text" style="background-color: ' + getColor(user) + '">' + user + '</span></div>'
        $('#show').append(tag)
    } else {
        const tag = '<div class="char animate__animated animate__bounceInDown tooltip">' + msg + '<span class="tooltip-text" style="background-color: ' + getColor(user) + '">' + user + '</span></div>'
        $('#show').append(tag)
    }
})

$('#user').on('input', (e) => {
    $('#header>.center>img').attr('src', 'https://avatars.dicebear.com/api/adventurer/' + $(e.currentTarget).val() + '.svg')
})

$('#user').on('keypress', (e) => {
    if (e.code === 'Enter' && $('#user').val() !== '') {
        // socket.emit('sendMsg', $('#user').val(), $('#msg').val())
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
    $('#show').empty()
    socket.emit('sendMsg', $('#user').val(), '')
})

socket.on('receiveTrash', () => {
    $('#show').empty()
    socket.emit('sendMsg', $('#user').val(), '')
})

$('#hide').on('click', (e) => {
    const checked = $(e.currentTarget).prop('checked')
    if (checked) {
        $('.char').addClass('hide')
        $('#header>.left label').text('非表示')
    } else {
        $('.char').removeClass('hide')
        $('#header>.left label').text('表示中')
    }
    socket.emit('sendFlg', $(e.currentTarget).prop('checked'))
})

socket.on('receiveFlg', (flg) => {
    if (flg) {
        $('.char').addClass('hide')
    } else {
        $('.char').removeClass('hide')
    }
    $('#hide').prop('checked', flg)
})

function getColor(user) {
    const n = Array.from(user).map(ch => ch.charCodeAt(0)).reduce((a, b) => a + b)
    const colorAngle = (n * n) % 360
    return `hsl(${colorAngle}, 80%, 64%)`
}