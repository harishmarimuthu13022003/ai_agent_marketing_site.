const mongoose = require('mongoose');
const User = require('./models/User');
const Agent = require('./models/Agent');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/aether-ai';

const run = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing existing collections...');
    await User.deleteMany({});
    await Agent.deleteMany({});
    console.log('Collections cleared.');

    console.log('Inserting default users...');
    const users = await User.create([
      {
        name: 'System Administrator',
        email: 'admin@aether.ai',
        password: 'admin123',
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
    const adminUser = users.find(u => u.email === 'admin@aether.ai');
    const standardUser = users.find(u => u.email === 'user@aether.ai');
    const developerUser = users.find(u => u.email === 'developer@aether.ai');

    console.log('Inserting demo AI agents...');
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
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

run();
