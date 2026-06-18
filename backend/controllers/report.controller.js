const report = require("../data/report");

exports.getReport = (req, res) => {
  res.json(report);
};
