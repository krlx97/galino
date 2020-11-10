const getImages = async (manager) => {
  const {socket, db} = manager

  try {
    const images = await db.collection('images').find().toArray()
    socket.emit('getImagesRes', images)
  } catch (err) {
    console.error(err)
  }
}

module.exports = getImages