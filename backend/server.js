require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');

// Connect to Database
connectDB().then(() => {
  // Seed default credentials for testing
  seedUsers();
});

const seedUsers = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding default demo accounts...');
      await User.create([
        {
          name: 'System Administrator',
          email: 'admin@aether.ai',
          password: 'admin123', // Will be hashed automatically by UserSchema preorder hook
          role: 'admin',
        },
        {
          name: 'Standard Developer',
          email: 'user@aether.ai',
          password: 'user123', // Will be hashed automatically by UserSchema preorder hook
          role: 'user',
        },
      ]);
      console.log('Demo accounts seeded:');
      console.log(' - Admin: admin@aether.ai / admin123');
      console.log(' - User:  user@aether.ai / user123');
    }
  } catch (error) {
    console.error('Failed to seed default database:', error.message);
  }
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/agents', require('./routes/agents'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Fallback Route
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
