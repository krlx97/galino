const fs = require('fs').promises

const rmImage = async (manager, data) => {
  const {socket, db} = manager
  const {image} = data

  try {
    await fs.unlink(`${process.cwd()}/admin/assets/gallery/${image.src}`)
    await fs.unlink(`${process.cwd()}/client/assets/gallery/${image.src}`)
    await db.collection('images').deleteOne({src: image.src})
    socket.emit('rmImageRes', image)
  } catch (err) {
    console.error(err)
  }
}

module.exports = rmImage