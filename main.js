import { getAccessToken, getWeather, getCIBA, getBirthdayMessage, sendMessage, getColor } from './src/services/index.js'
import { config } from './config/index.js'
import dayjs from 'dayjs'
import { toLowerLine } from './src/utils/index.js'

const main = async () => {
    // 获取accessToken
    const accessToken =  await getAccessToken()
    // 接收的用户
    const users = config.user
    // 省份和市
    const province = config.province
    const city = config.city
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
    const { content: noteCh, note: noteEn } = await getCIBA()
    // 获取在一起的日期差
    const loveDay = dayjs().diff(dayjs(config.loveDate), 'day')
    // 获取结婚的日期差
    const marryDay = dayjs().diff(dayjs(config.marryDate), 'day')
    // 获取生日信息
    const birthdayMessage = getBirthdayMessage()


    // 集成所需信息
    const week_list = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    const wxTemplateParams = [
        { name: toLowerLine('date'), value: `${dayjs().format('YYYY-MM-DD')} ${week_list[dayjs().format('d')]}`, color: getColor() },
        { name: toLowerLine('province'), value: province, color: getColor() },
        { name: toLowerLine('city'), value: city, color: getColor() },
        { name: toLowerLine('weather'), value: weather, color: getColor() },
        { name: toLowerLine('minTemperature'), value: minTemperature, color: getColor() },
        { name: toLowerLine('maxTemperature'), value: maxTemperature, color: getColor() },
        { name: toLowerLine('windDirection'), value: windDirection, color: getColor() },
        { name: toLowerLine('windScale'), value: windScale, color: getColor() },
        { name: toLowerLine('loveDay'), value: loveDay, color: getColor() },
        { name: toLowerLine('birthdayMessage'), value: birthdayMessage, color: getColor() },
        { name: toLowerLine('noteEn'), value: noteEn, color: getColor() },
        { name: toLowerLine('noteCh'), value: noteCh, color: getColor() },
    ]
    // 公众号推送消息
    users.forEach(async user => {
        await sendMessage(
            accessToken,
            user,
            wxTemplateParams
        )
    })

}

main()
