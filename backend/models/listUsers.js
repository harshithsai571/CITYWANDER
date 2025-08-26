const mongoose = require("mongoose");
const User = require("/home/harshith-sai/citywander-auth/backend/models/User");

const mongoURI = "mongodb+srv://harshithsaichiliveri:harshithsai571@cluster0.1vnbwju.mongodb.net/citywander_db?retryWrites=true&w=majority&appName=Cluster0";

async function listUsers() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find({});
    console.log("📋 Users in your database:");
    users.forEach(u => {
      console.log(`- ${u.username} | ${u.email} | Admin: ${u.isAdmin}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

listUsers();

