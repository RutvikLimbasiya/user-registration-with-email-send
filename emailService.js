const { parentPort, workerData } = require('worker_threads');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, //email address
        pass: process.env.EMAIL_PASS, //email password
    },
});

async function sendEmail({toEmail, subject, text}) {
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

(async () => {
    try {
        const result = await sendEmail(workerData.task);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage(`Error: ${error.message}`);
    }
})();
