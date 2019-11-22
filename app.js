const express = require("express");
const bodyParser = require("body-parser");

const sendMail = require("./routes/sendMail");
const fetchMail = require("./routes/fetchMail");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/getMail", fetchMail);
app.post("/sendMail", sendMail);

app.listen(8080, () => {
  console.log("Server Started");
});
