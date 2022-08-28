import { getOneTalk } from "./src/services/index.js"
import { config } from "./config/index.js"

const res = await getOneTalk(config.LITERARY_PREFERENCE)