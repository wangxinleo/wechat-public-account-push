import dayjs from 'dayjs'
import { selfDayjs, timeZone } from './src/utils/set-def-dayjs.js'
import {
  getAccessToken,
  getWeather,
  getCIBA,
  getOneTalk,
  getEarthyLoveWords,
  getPoisonChickenSoup,
  getMomentCopyrighting,
  getBirthdayMessage,
  sendMessageReply,
  getDateDiffList,
  getSlotList,
  getPoetry,
  getFlattenConstellationFortune
} from './src/services/index.js'
import { config } from './config/index.js'
import { toLowerLine, getColor, getConstellation } from './src/utils/index.js'

const getAggregatedData = async () => {

  const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  // 获取金山词霸每日一句
  const { content: noteEn, note: noteCh } = await getCIBA()
  // 获取每日一言
  const { hitokoto: oneTalk, from: talkFrom } = await getOneTalk(config.LITERARY_PREFERENCE)
  // 获取土味情话
  const earthyLoveWords = await getEarthyLoveWords()
  // 获取朋友圈文案
  const momentCopyrighting = await getMomentCopyrighting()
  // 获取毒鸡汤
  const poisonChickenSoup = await getPoisonChickenSoup()
  // 获取古诗古文
  const poetry = await getPoetry()
  // 获取星座运势
  const constellationFortune = await getFlattenConstellationFortune()
  // 统计日列表计算日期差
  const dateDiffParams = getDateDiffList().map(item => {
    return { name: item.keyword, value: item.diffDay, color: getColor() }
  })
  // 获取插槽中的数据
  const slotParams = getSlotList().map(item => {
    return { name: item.keyword, value: item.checkout, color: getColor() }
  })
  // 获取生日信息
  const birthdayMessage = getBirthdayMessage()


  const users = config.USERS
  for (const user of users) {

    // 获取每日天气
    const {
      // 天气
      weather,
      // 最高温度
      temp: maxTemperature,
      // 最低温度
      tempn: minTemperature,
      // 风向
      wd: windDirection,
      // 风力等级
      ws: windScale
    } = await getWeather(user.province || config.PROVINCE, user.city || config.CITY)

    // 集成所需信息
    const wxTemplateParams = [
      { name: toLowerLine('toName'), value: user.name, color: getColor() },
      { name: toLowerLine('date'), value: `${selfDayjs().format('YYYY-MM-DD')} ${weekList[selfDayjs().format('d')]}`, color: getColor() },
      { name: toLowerLine('province'), value: user.province || config.PROVINCE, color: getColor() },
      { name: toLowerLine('city'), value: user.city || config.CITY, color: getColor() },
      { name: toLowerLine('weather'), value: weather, color: getColor() },
      { name: toLowerLine('minTemperature'), value: minTemperature, color: getColor() },
      { name: toLowerLine('maxTemperature'), value: maxTemperature, color: getColor() },
      { name: toLowerLine('windDirection'), value: windDirection, color: getColor() },
      { name: toLowerLine('windScale'), value: windScale, color: getColor() },
      { name: toLowerLine('birthdayMessage'), value: birthdayMessage, color: getColor() },
      { name: toLowerLine('noteEn'), value: noteEn, color: getColor() },
      { name: toLowerLine('noteCh'), value: noteCh, color: getColor() },
      { name: toLowerLine('oneTalk'), value: oneTalk, color: getColor() },
      { name: toLowerLine('talkFrom'), value: talkFrom, color: getColor() },
      { name: toLowerLine('earthyLoveWords'), value: earthyLoveWords, color: getColor() },
      { name: toLowerLine('momentCopyrighting'), value: momentCopyrighting, color: getColor() },
      { name: toLowerLine('poisonChickenSoup'), value: poisonChickenSoup, color: getColor() },
      { name: toLowerLine('poetryContent'), value: poetry.content, color: getColor() },
      { name: toLowerLine('poetryAuthor'), value: poetry.author, color: getColor() },
      { name: toLowerLine('poetryDynasty'), value: poetry.dynasty, color: getColor() },
      { name: toLowerLine('poetryTitle'), value: poetry.title, color: getColor() },
    ].concat((config.CONSTELLATION_FORTUNE || []).map((it) => {
      const { cn: value } = getConstellation(it.date);
      return {
        name: `${it.name}_星座`,
        value,
        color: getColor()
      }
    })).concat(constellationFortune.map((it) => ({
      name: it.key,
      value: it.value,
      color: getColor()
    }))).concat(dateDiffParams.concat(slotParams))

    user['wxTemplateParams'] = wxTemplateParams
  }

  return users
}

const getCallbackTemplateParams = (messageReply) => {
  const postTimeZone = timeZone()
  const postTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  return [
    { name: toLowerLine('postTimeZone'), value: postTimeZone, color: getColor() },
    { name: toLowerLine('postTime'), value: postTime, color: getColor() },
    { name: toLowerLine('needPostNum'), value: messageReply.needPostNum, color: getColor() },
    { name: toLowerLine('successPostNum'), value: messageReply.successPostNum, color: getColor() },
    { name: toLowerLine('failPostNum'), value: messageReply.failPostNum, color: getColor() },
    { name: toLowerLine('successPostIds'), value: messageReply.successPostIds, color: getColor() },
    { name: toLowerLine('failPostIds'), value: messageReply.failPostIds, color: getColor() },
  ]
}

const mainForTest = async () => {
    // 测试UTC时间在actions里的区别
    console.log('dayjs', dayjs())
    console.log('selfDayjs', selfDayjs('2022-09-08'))
    console.log('selfDayjs 离节日', selfDayjs(selfDayjs().format('YYYY') + '-09-08').diff(selfDayjs(), 'day', true))
    console.log('selfDayjs 周岁', selfDayjs().diff('2021-01-01', 'year'))
    console.log('selfDayjs 恋爱N天', Math.ceil(selfDayjs().diff(selfDayjs('2022-09-06'), 'day', true)))
    console.log('dayjs 离节日', Math.ceil(dayjs(dayjs().format('YYYY') + '-09-08').diff(dayjs(), 'day', true)))
    console.log('dayjs 周岁', dayjs().diff('2021-01-01', 'year'))
    console.log('dayjs 恋爱N天', Math.ceil(dayjs().diff(dayjs('2022-09-06'), 'day', true)))


    // 处理好的用户数据
    const aggregatedData = await getAggregatedData()
    aggregatedData.forEach(item => {
      console.log(item.wxTemplateParams)
    })

}

const mainForProd = async () => {
  // 获取accessToken
  const accessToken = await getAccessToken()

  // 处理好的用户数据
  const aggregatedData = await getAggregatedData()

  // 公众号推送消息
  const {
    needPostNum,
    successPostNum,
    failPostNum,
    successPostIds,
    failPostIds
  } = await sendMessageReply(aggregatedData, accessToken)

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
    await sendMessageReply(config.CALLBACK_USERS, accessToken, config.CALLBACK_TEMPLATE_ID, callbackTemplateParams)
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
