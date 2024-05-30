// setup.js
const { connect } = require("./config/db");

module.exports = async () => {
  await connect(global.__MONGO_URI__);
  process.env.TEST_ENV = "test";
  console.log("Global setup complete.");
};

