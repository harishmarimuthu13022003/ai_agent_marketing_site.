const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an agent name'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Please specify the agent type'],
    enum: ['support', 'research', 'workflow', 'custom'],
    default: 'support',
  },
  status: {
    type: String,
    enum: ['active', 'idle', 'failed'],
    default: 'idle',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  config: {
    description: { type: String, default: '' },
    temperature: { type: Number, default: 0.7 },
    systemPrompt: { type: String, default: '' },
    apiKeyRequired: { type: Boolean, default: false }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Agent', AgentSchema);
