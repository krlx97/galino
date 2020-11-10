const http = require('http')
const path = require('path')
const fs = require('fs').promises
const express = require('express')
const mongodb = require('mongodb')
const nodemailer = require('nodemailer')
const socketio = require('socket.io')
const socketioFileUpload = require('socketio-file-upload')
const Manager = require('./manager')

const app = express().use(socketioFileUpload.router)
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'admin')))
app.get('/', (req, res) => res.sendFile(`${__dirname}/client/index.html`))
app.get('/admin', (req, res) => res.sendFile(`${__dirname}/admin/index.html`))
app.get('*', (req, res) => res.sendFile(`${__dirname}/client/index.html`))

process.on('uncaughtException', (err, origin) => {
  console.error(`Error: ${err}\nOrigin: ${origin}`)
  process.exit(1)
})

server.listen(8080)

const init = async () => {
  try {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/galinoDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = client.db('galinoDB')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    })

    io.on('connection', (socket) => {
      const uploader = new socketioFileUpload()
      uploader.dir = './admin/assets/gallery'
      uploader.listen(socket)

      uploader.on('saved', async (event) => {
        const src = event.file.name

        try {
          await fs.copyFile(`./admin/assets/gallery/${src}`, `./client/assets/gallery/${src}`)
          await db.collection('images').insertOne({src})
          const image = await db.collection('images').findOne({src})

          socket.emit('saveImageRes', image)
        } catch (err) {
          console.error(err)
        }
      })

      return new Manager(io, socket, db, transporter).init()
    })
  } catch (err) {
    console.error(err)
  }
}

init()