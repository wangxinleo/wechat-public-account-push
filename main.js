import dayjs from 'dayjs'
import { selfDayjs, timeZone } from './src/utils/set-def-dayjs.js'
import { getAccessToken, getWeather,getCIBA,
    getOneTalk, getBirthdayMessage, sendMessageReply,
    callbackReply, 
    getDateDiffList,
    getSlotList} from './src/services/index.js'
import { config } from './config/index.js'
import dayjs from 'dayjs'
import { toLowerLine, getColor } from './src/utils/index.js'

const main = async () => {
    // 获取accessToken
    const accessToken =  await getAccessToken()
    // 接收的用户
    const users = config.USERS
    // 省份和市
    const province = config.PROVINCE
    const city = config.CITY
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
    } = await getWeather(province, city)
    // 获取金山词霸每日一句
    const { content: noteEn, note: noteCh} = await getCIBA()
    // 获取每日一言
    const { hitokoto: oneTalk, from: talkFrom} = await getOneTalk(config.LITERARY_PREFERENCE)
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


    // 集成所需信息
    const week_list = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    const wxTemplateParams = [
        { name: toLowerLine('date'), value: `${selfDayjs().format('YYYY-MM-DD')} ${week_list[selfDayjs().format('d')]}`, color: getColor() },
        { name: toLowerLine('province'), value: province, color: getColor() },
        { name: toLowerLine('city'), value: city, color: getColor() },
        { name: toLowerLine('weather'), value: weather, color: getColor() },
        { name: toLowerLine('minTemperature'), value: minTemperature, color: getColor() },
        { name: toLowerLine('maxTemperature'), value: maxTemperature, color: getColor() },
        { name: toLowerLine('windDirection'), value: windDirection, color: getColor() },
        { name: toLowerLine('windScale'), value: windScale, color: getColor() },
        { name: toLowerLine('loveDay'), value: loveDay, color: getColor() },
        { name: toLowerLine('graduateDay'), value: graduateDay, color: getColor() },
        { name: toLowerLine('marryDay'), value: marryDay, color: getColor() },
        { name: toLowerLine('birthdayMessage'), value: birthdayMessage, color: getColor() },
        { name: toLowerLine('noteEn'), value: noteEn, color: getColor() },
        { name: toLowerLine('noteCh'), value: noteCh, color: getColor() },
        { name: toLowerLine('oneTalk'), value: oneTalk, color: getColor() },
        { name: toLowerLine('talkFrom'), value: talkFrom, color: getColor() },
    ].concat(dateDiffParams.concat(slotParams))

    // 公众号推送消息
    const sendMessageTemplateId = config.TEMPLATE_ID
    const {
        needPostNum,
        successPostNum,
        failPostNum,
        successPostIds,
        failPostIds
    } = await sendMessageReply(sendMessageTemplateId, users, accessToken, wxTemplateParams)

    // 推送结果回执
    const postTimeZone = timeZone()
    const postTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const callbackTemplateParams = [
        { name: toLowerLine('postTimeZone'), value: postTimeZone, color: getColor() },
        { name: toLowerLine('postTime'), value: postTime, color: getColor() },
        { name: toLowerLine('needPostNum'), value: needPostNum, color: getColor() },
        { name: toLowerLine('successPostNum'), value: successPostNum, color: getColor() },
        { name: toLowerLine('failPostNum'), value: failPostNum, color: getColor() },
        { name: toLowerLine('successPostIds'), value: successPostIds, color: getColor() },
        { name: toLowerLine('failPostIds'), value: failPostIds, color: getColor() },
    ].concat(wxTemplateParams)

    const callbackTemplateId = config.CALLBACK_TEMPLATE_ID
    await callbackReply(callbackTemplateId, config.CALLBACK_USERS, accessToken, callbackTemplateParams)

}

main()
