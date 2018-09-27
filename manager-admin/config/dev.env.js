const { api_dev } = require('../ui-domain')
const { distribution } = require('./index')

module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
  DISTRIBUTION: distribution
}
