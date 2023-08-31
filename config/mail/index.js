const nodemailer = require('nodemailer')
const env = require('../env')


const transporter = nodemailer.createTransport({
    service: 'gmail'
})



module.exports = {
    transporter
}