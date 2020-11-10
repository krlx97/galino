const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongodb = require('mongodb')

const eventImports = {
  email: require('./events/email'),
  reserve: require('./events/reserve'),
  // Admin
  auth: require('./events/admin/auth'),
  login: require('./events/admin/login'),
  rmImage: require('./events/admin/rm-image'),
  saveMenu: require('./events/admin/save-menu'),
  // Shared
  getMenus: require('./events/shared/get-menus'),
  getImages: require('./events/shared/get-images')
}

class Manager {
  constructor(io, socket, db, transporter) {
    this.io = io
    this.socket = socket
    this.db = db
    this.transporter = transporter
  }

  async init() {
    const {socket, db} = this
    const events = Object.keys(eventImports).reduce((acc, event) => {
      acc[event] = (data) => eventImports[event](this, data ? data : {})
      return acc
    }, {})

    Object.keys(events).forEach((event) => socket.on(event, events[event]))
  }

  getMongoId(string) {
    return mongodb.ObjectId(string)
  }

  get bcrypt() {return bcrypt}
  get jwt() {return jwt}
  get mongodb() {return mongodb}

  async hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12)

      if (hashedPassword) {
        return hashedPassword
      }
    } catch (err) {
      console.error(err)
    }
  }

  async verifyPassword(first, second) {
    try {
      const verified = await bcrypt.compare(first, second)

      if (verified) {
        return verified
      }
    } catch (err) {
      console.error(err)
    }
  }

  signToken(id, options) {
    const secret = process.env.JWT_SECRET

    try {
      const token = jwt.sign({id}, secret, options)

      if (token) {
        return token
      }
    } catch (err) {
      console.error(err)
    }
  }

  async verifyToken(token) {
    const secret = process.env.JWT_SECRET
    const {socket, db} = this

    try {
      const {id} = jwt.verify(token, secret)

      if (id) {
        const _id = mongodb.ObjectId(id)
        const account = await db.collection('accounts').findOne({_id})

        if (account) {
          return account
        }
      }
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        socket.emit('matDialogClose')
        socket.emit('expiredToken')
      } else if (err.name === 'JsonWebTokenError') {
        socket.emit('matDialogClose')
        socket.emit('invalidToken')
      } else {
        console.error(err)
      }
    }
  }
}

module.exports = Manager