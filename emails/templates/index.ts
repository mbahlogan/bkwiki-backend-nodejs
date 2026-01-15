const register = (otp) => {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <style>
          * {
            box-sizing: border-box;
          }
    
          body {
            margin: 0;
            padding: 10px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            background-color: white;
          }
    
          .body,
          .otp,
          .copy {
            width: 100%;
            max-width: 500px;
            margin: 20px auto;
            text-align: center;
          }
          .otp {
            color: #25648f;
          }
          .logo {
            display: flex;
            justify-content: center;
          }
    
          .logo h1 {
            color: #25648f;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="logo">
        <h1>BKWIKI</h1>
        </div>
    
        <p class="body">
          Welcome to BKWIKI, your account has been created successfully. Use the OTP
          below to verify your account.
        </p>
        <h1 class="otp"> ${otp} </h1>
    
        <p class="copy">(&copy;) ${year} BKWIKI</p>
      </body>
    </html>
    `
}

import generic from "./emails";

const emailTemplate: any = generic;
emailTemplate.register = register;

export default emailTemplate;