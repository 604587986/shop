import { api_pro } from '~/ui-domain'

module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  BASE_API: `"${api_pro.base}"`,
  ADMIN_API: `"${api_pro.manager}"`,
}
