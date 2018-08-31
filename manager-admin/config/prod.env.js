const { api_pro } = require('../ui-domain')
const { distribution } = require('./index')

module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  BASE_API: `"${api_pro.base}"`,
  ADMIN_API: `"${api_pro.admin}"`,
  DISTRIBUTION: distribution
}
