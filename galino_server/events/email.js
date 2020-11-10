const email = async (manager, data) => {
  const {socket, transporter} = manager
  const {name, email, phone, msg} = data

  try {
    const mailOptions = {
      from: email,
      to: 'dyingsquirrel97@gmail.com',
      subject: 'Galino kontakt',
      text: `
        Ime i prezime: ${name}
        Email: ${email}
        Telefon: ${phone}
        ------------------------------
        ${msg}
      `
    }

    await transporter.sendMail(mailOptions)

    socket.emit('emailRes')
  } catch (err) {
    console.error(err)
  }
}

module.exports = email