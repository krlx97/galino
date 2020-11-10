const saveMenu = async (manager, data) => {
  const {socket, db} = manager
  const {token, menus} = data

  try {
    if (await manager.verifyToken(token)) {
      await db.collection('menus').remove({})
      await db.collection('menus').insertMany(menus)
      socket.emit('saveMenuRes')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = saveMenu