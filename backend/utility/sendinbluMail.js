
// this code can be used to integrate mailing service from sendinblue in any project
const Sib = require('sib-api-v3-sdk') // return a constructor
require('dotenv').config()

const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SB_API_KEY

const otp = 12345678;

function sendVerificationOTP(receiverMail) {


    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: process.env.email,
        name: 'Sanjeev',
    }

    const receivers = [
        {
            email: receiverMail,
        },

    ]

    tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: 'OTP verification',
            textContent: `
                    Namaste dost, you receiving this mail because i am testing nodejs app.
                    `,
            htmlContent: `
            <h1>Please verify your email</h1>
            <p>your OTP is</p> ${otp}
            <a href="http://localhost:5000/api/v1/verifyemail?email=${receiverMail}" target="_blank">click here to verify</a>
                    `,
            params: {
                role: 'Backend and Full stack',
            },
        })
        .then(() => res.json({ message: 'check your mail' }))
        .catch(err => console.log(err))
}

module.exports = sendVerificationOTP