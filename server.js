const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const nodemailer = require('nodemailer');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//serve static files
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.send('index')
})


app.post('/send-email', (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'tamia.walsh60@ethereal.email',
            pass: 'amyB1uu3DzsTNCy255'
        }
    });

    const info = await transporter.sendMail({
        from: '"Tamia Walsh 👻" <tamia.walsh60@ethereal.email>',
        to: req.body.email,
        subject: "Email message with NodeJS ✔",
        text: req.body.message
    });

    console.log("Message sent: %s", info.messageId);

    res.redirect('/')
})

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`Email sender listening on ${port}`)
})