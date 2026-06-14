const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
    const dbName = process.env.DB_NAME || process.env.DB_NAme || 'aether-ai';
    
    if (dbName) {
      const separator = connectionString.endsWith('/') || dbName.startsWith('/') ? '' : '/';
      connectionString = `${connectionString}${separator}${dbName}`;
    }

    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
