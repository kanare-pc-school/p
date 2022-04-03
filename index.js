const socket = io()

$('#msg').on('keypress', (e) => {
  if (e.code === 'Enter' && $('#msg').val() !== '') {
    socket.emit('sendMsg', $('#msg').val())
    $('#msg').val('')
  }
})

$('#send').on('click', (e) => {
  if ($('#msg').val() !== '') {
    socket.emit('sendMsg', $('#msg').val())
    $('#msg').val('')
  }
})

socket.on('receiveMsg', (msg) => {
  const tag = '<div class="char animate__animated animate__bounceInDown">' + msg + '</div>'
  $('#show').append(tag)
})