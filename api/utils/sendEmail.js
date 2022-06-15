const nodeMailer = require("nodemailer");

const sendEmail = (options) => {
  return new Promise((resolve, reject) => {
    const transporter = nodeMailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };
  
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        reject(err)
      } else {
        console.log(info);
        resolve(info)
      }
    });
  })
  
};

module.exports = sendEmail;
