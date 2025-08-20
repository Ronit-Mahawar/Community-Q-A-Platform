const mongoose = require("mongoose");

const mongooDbConnect = (url) => {
  mongoose.connect(url);
  console.log("mongoose connected");
};

module.exports = { mongooDbConnect };
