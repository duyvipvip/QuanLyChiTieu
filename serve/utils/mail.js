
var nodemailer = require('nodemailer');
var config = require('../config/config');

module.exports = {
    sendMail: sendMail
}

function sendMail(from, to, subject, content) {
    var transporter = nodemailer.createTransport(config.mailConfig);

    var mailOptions = {
        headers: {
            'Content-Type': 'text/html'
        },
        to: to,
        subject: subject,
        html: content
    };

    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve('Email sent: ' + info.response);
            }
        });
    })
}

