const mongoose = require("mongoose");
const User = require("/home/harshith-sai/citywander-auth/backend/models/User");

const mongoURI = "mongodb+srv://harshithsaichiliveri:harshithsai571@cluster0.glnp0el.mongodb.net/citywander?retryWrites=true&w=majority&appName=Cluster0";

async function makeAdmin() {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB Atlas");

    // 🟡 Fetch and show all users
    const users = await User.find();
    console.log("📋 All users:");
    users.forEach(u => console.log(`- ${u.email} | isAdmin: ${u.isAdmin} | username: ${u.username}`));

    // 🟢 Try to find by exact email
    const emailToFind = "harshithsaichiliveri@gmail.com";
    const user = await User.findOne({ email: emailToFind });

    if (!user) {
      console.log("❌ User not found using exact match.");
      return;
    }

    user.isAdmin = true;
    user.username = "harshith";
    await user.save();

    console.log("✅ User updated to admin.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

makeAdmin();

