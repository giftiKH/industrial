const mongoose = require("mongoose");

const connect = async () => {
  try {
    const mongoURI =
      "mongodb+srv://giftikebede21:giftikebede21@cluster0.pp7fi4a.mongodb.net/new?retryWrites=true&w=majority&appName=Cluster0";
       
      await mongoose.connect(mongoURI, {
     //useNewUrlParser: true,
     //useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("MongoDB disconnection error:", err);
  }
};

module.exports = {
  connect,
  disconnect,
};
