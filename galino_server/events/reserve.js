const reserve = async (manager, data) => {
  const {socket, transporter} = manager
  const {name, email, phone, guests, date, note} = data

  try {
    const mailOptions = {
      from: email,
      to: 'dyingsquirrel97@gmail.com',
      subject: 'Galino rezervacija',
      text: `
        Ime i prezime: ${name}
        Email: ${email}
        Telefon: ${phone}
        Broj gostiju: ${guests}
        Datum: ${date}
        ------------------------------
        ${note}
      `
    }

    await transporter.sendMail(mailOptions)

    socket.emit('reserveRes')
  } catch (err) {
    console.error(err)
  }
}

module.exports = reserve