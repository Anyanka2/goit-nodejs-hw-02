require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL_LOGIN, EMAIL_PASSWORD, EMAIL_SERVER_HOST, EMAIL_SERVER_PORT } = process.env;

const nodemailerConfig = {
  host: EMAIL_SERVER_HOST,
  port: EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_LOGIN };
  return transport.sendMail(email);
};
module.exports = {
  sendEmail,
};
