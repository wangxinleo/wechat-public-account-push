import { USER_CONFIG } from "./index.js";

let userConfig = {}
if (process.env.USER_INFO) {
  userConfig = JSON.parse(process.env.USER_INFO)
} else {
  userConfig = USER_CONFIG
}

export const config = userConfig