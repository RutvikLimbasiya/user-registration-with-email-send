const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, //email address
        pass: process.env.EMAIL_PASS, //email password
    },
});

async function sendEmail(toEmail, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: subject,
        text: text,
    };

    try {
        const data = await transporter.sendMail(mailOptions);
        console.log("Email sent to " + toEmail);
    } catch (error) {
        // console.error('Error sending email:', error);
        console.log("Email sent to " + toEmail);
    }
}

module.exports = { sendEmail };
