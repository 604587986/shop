const { api_dev } = require('../ui-domain')
const { distribution } = require('./index')

module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
  BASE_API: `"${api_dev.base}"`,
  ADMIN_API: `"${api_dev.admin}"`,
  DISTRIBUTION: distribution
}
