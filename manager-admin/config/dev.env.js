import { api_dev } from '~/ui-domain'

module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
  BASE_API: `"${api_dev.base}"`,
  ADMIN_API: `"${api_dev.manager}"`
}
