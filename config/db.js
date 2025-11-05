const mongoose = require('mongoose');

let isConnected = false; // Cache the connection in serverless

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not set');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    throw error;
  }
};

module.exports = connectDB;

