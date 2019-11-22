const express = require("express");
const fetchMailController = require("../controllers/fetchMailController");

const router = express.Router();

router.use(fetchMailController.fetchMails);

module.exports = router;
