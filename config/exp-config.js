import USER_CONFIG from './index.cjs'

const config = process.env.USER_INFO ? /* istanbul ignore next */ JSON.parse(process.env.USER_INFO) : USER_CONFIG
export default config
