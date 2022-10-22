import schedule from 'node-schedule'
import dayjs from 'dayjs'
import {
  sendMessageReply,
  getAggregatedData,
  getCallbackTemplateParams,
} from './src/services/index.js'
import config from './config/exp-config.js'
import cornTime from './config/server-config.js'
import mainForTest from './main-for-test.js'
import { RUN_TIME_STORAGE } from './src/store/index.js'

export default async function mainForProd() {
  // 获取accessToken
  console.log('\n\n')
  console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

  // 处理好的用户数据
  console.log('---')
  console.log('【数据获取】开始')
  const aggregatedData = await getAggregatedData()
  console.log('【数据获取】结束')
  console.log('---')

  // 公众号推送消息
  console.log('---')
  console.log('【常规模板】推送开始')
  const {
    needPostNum,
    successPostNum,
    failPostNum,
    successPostIds,
    failPostIds,
  } = await sendMessageReply(aggregatedData, null, null, config.USE_PASSAGE)
  console.log('【常规模板】推送结束')
  console.log('---')

  // 获取回执信息
  const callbackTemplateParams = getCallbackTemplateParams({
    needPostNum,
    successPostNum,
    failPostNum,
    successPostIds,
    failPostIds,
  })

  // 发送回执
  if (config.CALLBACK_TEMPLATE_ID) {
    console.log('---')
    console.log('【推送完成提醒】推送开始')
    await sendMessageReply(config.CALLBACK_USERS, config.CALLBACK_TEMPLATE_ID, callbackTemplateParams, config.USE_PASSAGE)
    console.log('【推送完成提醒】推送结束')
    console.log('---')
  }

  // 释放运行时临时存储的数据
  Object.keys(RUN_TIME_STORAGE).forEach((o) => {
    RUN_TIME_STORAGE[o] = null
  })
}

const main = () => {
  if (process.env.APP_MODE === 'params-log') {
    mainForTest()
  } else if (process.env.APP_MODE === 'server') {
    console.log('======【定时推送服务已启动, enjoying it】======')
    console.log(`目前定时推送的配置为：【${cornTime}】`)
    schedule.scheduleJob(cornTime, () => {
      mainForProd()
    })
  } else if (process.env.APP_MODE === 'prod') {
    mainForProd()
  }
}

main()
