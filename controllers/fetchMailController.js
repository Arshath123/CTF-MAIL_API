const db = require("../models/db");

exports.fetchMails = (req, res) => {
  db.query("select * from users", (error, results) => {
    if (results.length > 0) {
      res.status(200).json({
        method: "GET",
        result: "Success",
        emails: results
      });
    } else {
      res.status(404).json({
        result: "Resource Not Found"
      });
    }
  });
};
