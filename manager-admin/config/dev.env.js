const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
  BASE_API: `"${domain.dev.base}"`,
  ADMIN_API: `"${domain.dev.admin}"`
}
