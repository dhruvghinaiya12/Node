const nodemailer=require("nodemailer");
require("dotenv").config();
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

const sendEmail = async (to, subject, content) => {
    try {
        await transport.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            html: content,
        });
        console.log("Email sent successfully to " + to);
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};


module.exports=sendEmail;