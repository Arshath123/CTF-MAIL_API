const nodemailer = require("nodemailer");

exports.transport = nodemailer.createTransport({
  pool: true,
  service: "gmail",
  host: "smtp.gmail.com",
  from: "**YOUR EMAIL ADDRESS**",
  port: 465,
  secure: true,
  auth: {
    user: "**YOUR EMAIL ADDRESS**",
    pass: "**YOUR EMAIL PASSWORD**"
  }
});
