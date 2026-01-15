const nodemailer = require("nodemailer");
const sendgridtransporter = require("nodemailer-sendgrid-transport");

const sendEmail = async ({
  to,
  from = "mbidaniel01@gmail.com",
  subject,
  html,
  text,
}) => {
  try {
    const transporter = nodemailer.createTransport(
      sendgridtransporter({
        auth: {
          api_key: process.env.SEND_GRID_APIKEY,
        },
      })
    );
    console.log(`Sending email to ${to}`);

    let email = await transporter.sendMail({
      to,
      from,
      subject,
      html,
      text,
    });
    console.log(`Email successfully sent to ${to}`, email);
    return Promise.resolve("Ok");
  } catch (error) {
    console.log(`An error occured senidng email to ${to}`, error);
    return Promise.resolve("An error occured");
  }
};

module.exports = sendEmail;
export {};
