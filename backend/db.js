const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI=mongodb+srv://harshithsaichiliveri:harshithsai571@cluster0.glnp0el.mongodb.net/citywander?retryWrites=true&w=majority&appName=Cluster0,
 {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
