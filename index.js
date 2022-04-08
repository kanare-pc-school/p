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
    if ($('#hide').prop('checked')) {
        const tag = '<div class="char hide animate__animated animate__bounceInDown tooltip">' + msg + '<span class="tooltip-text" style="background-color: ' + getColor(user) + '">' + user + '</span></div>'
        $('#show').append(tag)
    } else {
        const tag = '<div class="char animate__animated animate__bounceInDown tooltip">' + msg + '<span class="tooltip-text" style="background-color: ' + getColor(user) + '">' + user + '</span></div>'
        $('#show').append(tag)
    }

})

$('#user').on('input', (e) => {
    $('#header>.center>img').attr('src', 'https://avatars.dicebear.com/api/pixel-art/' + $(e.currentTarget).val() + '.svg')
})

$('#trash').on('click', (_e) => {
    $('#show').empty()
})

$('#hide').on('click', (e) => {
    if ($(e.currentTarget).prop('checked')) {
        $('.char').addClass('hide')
    } else {
        $('.char').removeClass('hide')
    }
})

function getColor(user) {
    const n = Array.from(user).map(ch => ch.charCodeAt(0)).reduce((a, b) => a + b)
    const colorAngle = (n * n) % 360
    return `hsl(${colorAngle}, 80%, 64%)`
}