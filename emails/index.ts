import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SEND_GRID_APIKEY || "");

const sendEmail = async ({ to, subject, html, text }: { to: string, subject: string, html: string, text?: string }) => {
  try {
    const msg = {
      to: [to],
      from: {
        name: process.env.APP_NAME || "App",
        email: "mbidaniel01@gmail.com",
      },
      subject,
      text,
      html,
    };

    console.log(`Sending email to ${to}`);
    await sgMail.send(msg);
    console.log(`Email successfully sent to ${to}`);
    return Promise.resolve("Ok");
  } catch (error) {
    console.log(`An error occured senidng email to ${to}`, error);
    return Promise.resolve("An error occured");
  }
};

export default sendEmail;

