// teardown.js
const { disconnect } = require("./config/db");

module.exports = async () => {
  await disconnect();
  console.log("Global teardown complete.");
};
