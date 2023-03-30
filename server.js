const express = require('express');
const app = express();

const nodemailer = require("nodemailer");
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'sign up first',
        domain: 'sign up first'
    }
};

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
    // res.send('hello!!');
    res.sendFile(__dirname + '/public/contactform.html');
});

// POST ROUTE
app.post('/', (req, res) => {
    console.log(req.body);

    // TRANSPORTER
    const transporter = nodemailer.createTransport(mailGun(auth));
    // const transporter = nodemailer.createTransport({
    //     service: 'outlook',
    //     auth: {
    //         user: 'courdevelops@outlook.com',
    //         pass: 'SEtuP49@0$'
    //     }
    // });

    // const transporter = nodemailer.createTransport({
    //     service: 'yahoo',
    //     auth: {
    //         user: 'courdevelops@yahoo.com',
    //         pass: 'SetUP34@#5'
    //     }
    // });

    // MAILOPTIONS
    const mailOptions = {
        from: req.body.email,
        to: 'courdevelops@outlook.com',
        subject: `Message from ${req.body.email}:  ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        } else {
            console.log('Email');
            res.send('success');
        }
    })
});

app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`)
});