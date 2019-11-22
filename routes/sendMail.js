const express = require("express");
const router = express.Router();

const sendMailController = require("../controllers/sendMailController");
router.use(sendMailController.sendMail);
module.exports = router;
