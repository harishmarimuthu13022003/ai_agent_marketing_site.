const express = require('express');
const yup = require('yup');
const {
  getAgents,
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
} = require('../controllers/agentController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const agentSchema = yup.object().shape({
  name: yup.string().trim().required('Agent name is required').min(2, 'Name must be at least 2 characters'),
  type: yup.string().oneOf(['support', 'research', 'workflow', 'custom'], 'Invalid agent type').required('Agent type is required'),
  status: yup.string().oneOf(['active', 'idle', 'failed'], 'Invalid status').default('idle'),
  config: yup.object().shape({
    description: yup.string().default(''),
    temperature: yup.number().min(0.0).max(1.0).default(0.7),
    systemPrompt: yup.string().default(''),
    agentApi: yup.string().default('')
  })
});

// All agent routes require authentication
router.use(protect);

router.route('/')
  .get(getAgents)
  .post(validate(agentSchema), createAgent);

router.route('/:id')
  .get(getAgent)
  .put(validate(agentSchema.partial ? agentSchema.partial() : agentSchema), updateAgent)
  .delete(deleteAgent);

module.exports = router;
