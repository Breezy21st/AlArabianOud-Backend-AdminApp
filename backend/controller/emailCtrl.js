const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data, req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, //true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ID, //generated ethereal user
            pass: process.env.MP, //generated ethereal password
        },
    });

    //send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Al Arabian oud" <alarabianoud.admin@gmail.com', //sender address
        to: data.to, //list of recievers
        subject: data.subject, //Subjectline
        text: data.text, //plain text
        html: data.html,
    });
    console.log("Message sent: %s ", info.messageId);
    //message sent: <b658f8ca-ccf4-8306-87d57a0b4321@example.com>

    //preview only available when sending through an Ethreal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = sendEmail;