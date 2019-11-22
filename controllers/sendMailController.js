const nodemailer = require("nodemailer");
const smtp = require("../nodemailer/createTransport");

exports.sendMail = (req, res, next) => {
  var smtpTransport = smtp.transport; //creating smtp connection

  const mailsToSend = [];
  const rejectedMails = [];
  const allMails = req.body.to; //All the emails

  //Discarding emails containing upper cases..
  for (let i = 0; i < allMails.length; i++) {
    if (allMails[i].toLowerCase() != allMails[i]) {
      rejectedMails.push(allMails[i]);
    } else {
      mailsToSend.push(allMails[i]);
    }
  }

  var mailOptions = {
    to: mailsToSend,
    subject: req.body.sub,
    html: "<h4>" + req.body.msg + "</h4>"
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      res.status(503).json({
        status: "Process Failed"
      });
    } else {
      //mails that are sent successfully
      const acceptedMails = response["accepted"];

      //mails that are not sent successfully
      rejectedMails.push(...response["rejected"]);

      //lower case emails that are not sent
      let hash = new Set();

      for (let i = 0; i < acceptedMails.length; i++) {
        hash.add(acceptedMails[i]);
      }

      for (let i = 0; i < mailsToSend.length; i++) {
        if (hash.has(mailsToSend[i])) {
        } else {
          rejectedMails.push(mailsToSend[i]);
        }
      }

      res.status(200).json({
        method: "POST",
        accepted: acceptedMails,
        rejected: rejectedMails,
        status: "Success"
      });
    }
  });
};
