import USER_CONFIG from './index.js'

const userConfig = process.env.USER_INFO ? JSON.parse(process.env.USER_INFO) : USER_CONFIG
export default userConfig
