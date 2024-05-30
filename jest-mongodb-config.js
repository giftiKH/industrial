// jest-mongodb-config.js
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest",
    },
    binary: {
      version: "4.0.3", // Ensure this matches your MongoDB version
      skipMD5: true,
    },
    autoStart: false,
  },
};
