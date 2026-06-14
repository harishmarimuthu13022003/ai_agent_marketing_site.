require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const Agent = require('./models/Agent');

// Connect to Database
connectDB().then(() => {
  // Seed default credentials and demo agents for testing
  seedDatabase();
});

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Database empty. Seeding default demo accounts...');
      const createdUsers = await User.create([
        {
          name: 'System Administrator',
          email: 'admin@aether.ai',
          password: 'admin123', // Will be hashed automatically by UserSchema pre-save hook
          role: 'admin',
        },
        {
          name: 'Super Administrator',
          email: 'superadmin@aether.ai',
          password: 'admin123',
          role: 'admin',
        },
        {
          name: 'Standard Developer',
          email: 'user@aether.ai',
          password: 'user123',
          role: 'user',
        },
        {
          name: 'App Developer',
          email: 'developer@aether.ai',
          password: 'developer123',
          role: 'user',
        },
        {
          name: 'Data Analyst',
          email: 'analyst@aether.ai',
          password: 'analyst123',
          role: 'user',
        },
      ]);
      console.log('Demo accounts seeded.');

      // Find user records to link owners
      const adminUser = createdUsers.find(u => u.email === 'admin@aether.ai');
      const standardUser = createdUsers.find(u => u.email === 'user@aether.ai');
      const developerUser = createdUsers.find(u => u.email === 'developer@aether.ai');

      // Seed Agents
      const agentCount = await Agent.countDocuments();
      if (agentCount === 0 && adminUser && standardUser && developerUser) {
        console.log('Seeding default demo AI agents...');
        await Agent.create([
          {
            name: 'Invoice Research Agent',
            type: 'research',
            status: 'active',
            owner: adminUser._id,
            config: {
              description: 'Scans enterprise ERP datasets to audit billing variances automatically.',
              temperature: 0.2,
              systemPrompt: 'You are an auditing bot designed to detect anomalies in invoice reports.',
            }
          },
          {
            name: 'Customer Billing Support',
            type: 'support',
            status: 'idle',
            owner: adminUser._id,
            config: {
              description: 'Interfaces securely with user banking tables to handle general account requests.',
              temperature: 0.5,
              systemPrompt: 'You are a billing support representative. Be concise and professional.',
            }
          },
          {
            name: 'Email Dispatch Workflow',
            type: 'workflow',
            status: 'failed',
            owner: adminUser._id,
            config: {
              description: 'Dispatches email updates and alert digests based on log triggers.',
              temperature: 0.1,
              systemPrompt: 'You are an email formatting agent. Validate all email fields.',
            }
          },
          {
            name: 'Support Assist Bot',
            type: 'support',
            status: 'active',
            owner: standardUser._id,
            config: {
              description: 'General purpose support bot designed to answer service questions.',
              temperature: 0.7,
              systemPrompt: 'You are a friendly customer service helper.',
            }
          },
          {
            name: 'Market Sentiment Analyzer',
            type: 'research',
            status: 'active',
            owner: standardUser._id,
            config: {
              description: 'Aggregates financial tweets and news headlines to calculate sentiment score.',
              temperature: 0.4,
              systemPrompt: 'Analyze the given market news sentiment index between -1 and +1.',
            }
          },
          {
            name: 'Code Quality Auditor',
            type: 'custom',
            status: 'idle',
            owner: developerUser._id,
            config: {
              description: 'Runs static analysis tools and checks for syntax errors in code updates.',
              temperature: 0.0,
              systemPrompt: 'You are an automated code quality checker. Do static syntax analysis.',
            }
          }
        ]);
        console.log('Demo AI agents seeded successfully.');
      }
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
