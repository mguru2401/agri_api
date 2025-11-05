const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string with URL encoded password
    const mongoURI = 'mongodb+srv://mguru2401_db_user:mguru%402401@agriapi.udc5n9x.mongodb.net/agriapi?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

