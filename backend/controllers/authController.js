const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to sign JWT and return response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || 'aether_secret_key_123_abc_xyz',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Determine role - default to 'user' unless explicitly set and this is the first user (or just allow role setting for testing/demo dashboard convenience)
    // For demo purposes, we will allow setting the role to admin or user directly.
    const userRole = role && ['user', 'admin'].includes(role) ? role : 'user';

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Seed demo database
// @route   POST /api/auth/seed
// @access  Public
exports.seedDB = async (req, res) => {
  const Agent = require('../models/Agent');
  try {
    // Clear existing data
    await User.deleteMany({});
    await Agent.deleteMany({});

    // Create default demo accounts
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

    // Find user records to link owners
    const adminUser = users.find(u => u.email === 'admin@aether.ai');
    const standardUser = users.find(u => u.email === 'user@aether.ai');
    const developerUser = users.find(u => u.email === 'developer@aether.ai');

    // Seed demo AI agents
    if (adminUser && standardUser && developerUser) {
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
    }

    res.status(200).json({
      success: true,
      message: 'Demo database seeded successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to seed database.',
    });
  }
};
