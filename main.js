import {
  getAccessToken,
  sendMessageReply,
  getAggregatedData,
  getCallbackTemplateParams
} from './src/services/index.js'
import { config } from './config/index.js'
import { mainForTest } from './main-for-test.js'

const mainForProd = async () => {
  // 获取accessToken
  console.log('---')
  console.log('【连接微信公众平台】开始')
  const accessToken = await getAccessToken()
  if (!accessToken) {
    console.log('遇到错误，执行终止！')
    return
  }
  console.log('【连接微信公众平台】结束')
  console.log('---')

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
    failPostIds
  } = await sendMessageReply(aggregatedData, accessToken)
  console.log('【常规模板】推送结束')
  console.log('---')


  // 获取回执信息
  const callbackTemplateParams = getCallbackTemplateParams({
    needPostNum,
    successPostNum,
    failPostNum,
    successPostIds,
    failPostIds
  })

  // 发送回执
  if (config.CALLBACK_TEMPLATE_ID) {
    console.log('---')
    console.log('【推送完成提醒】推送开始')
    await sendMessageReply(config.CALLBACK_USERS, accessToken, config.CALLBACK_TEMPLATE_ID, callbackTemplateParams)
    console.log('【推送完成提醒】推送结束')
    console.log('---')
  }
}

const main = () => {
  if (process.env.APP_MODE === 'test'){
    mainForTest()
  } else {
    mainForProd()
  }
}

main()
