const login = async (manager, data) => {
  const {socket, db} = manager
  const {username, password} = data

  try {
    const account = await db.collection('accounts').findOne({username})

    if (account) {
      const verified = await manager.verifyPassword(password, account.password)

      if (verified) {
        const {_id} = account
        const id = _id.toHexString()
        const token = manager.signToken(id, {expiresIn: '1h'})
        const msg = 'Dobrodošli'

        socket.emit('loginRes', {token, msg})
      } else {
        socket.emit('loginRes', {msg: 'Pogrešna lozinka'})
      }
    } else {
      socket.emit('loginRes', {msg: 'Korisničko ime ne postoji'})
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = login