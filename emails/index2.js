const nodemailer = require("nodemailer");

const sendEmail = async ({ to, from = "support@celatransinternational.com", subject, html }) => {
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    console.log(`Sending email to ${to}`);

    let email = await transporter.sendMail({
      to,
      from,
      subject,
      html,
    });
    console.log(`Email successfully sent to ${to}`, email);
    return Promise.resolve("Ok");
  } catch (error) {
    console.log(`An error occured senidng email to ${to}`, error);
    return Promise.resolve("An error occured");
  }
};

module.exports = sendEmail;
