const auth = async (manager, data) => {
  const {socket} = manager
  const {token} = data

  try {
    if (await manager.verifyToken(token)) {
      socket.emit('authRes')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = auth