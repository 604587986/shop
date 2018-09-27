const { api_pro } = require('../ui-domain')
const { distribution } = require('./index')

module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  DISTRIBUTION: distribution
}
