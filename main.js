import { config } from './config/index.js'
import { cityInfo } from './config/city-info.js'
import axios from 'axios'
import dayjs from 'dayjs'

/**
 * 获取 accessToken
 * @returns accessToken
 */
const getAccessToken = async () => {
    // appId
    const appId = config.appId
    // appSecret
    const appSecret = config.appSecret
    // accessToken
    let accessToken = null
    
    const postUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

    try {
        const res = await axios.get(postUrl).catch(err => err)
        if (res.status === 200 && res.data && res.data.access_token) {
            accessToken = res.data.access_token
        } else {
            console.error('请求失败', res.data.errmsg)
        }
    } catch(e) {
        console.error('try抛出错误', e)
    }

    return accessToken
}

/**
 * 获取天气情况
 * @param {*} province 省份
 * @param {*} city 城市
 */
const getWeather = async (province, city) => {
    if (!cityInfo[province] || !cityInfo[province][city] || !cityInfo[province][city]["AREAID"]) {
        console.error('配置文件中找不到相应的省份或城市')
        return null
    }
    const address = cityInfo[province][city]["AREAID"]

    const url = `http://d1.weather.com.cn/dingzhi/${address}.html?_=${new Date()}` 

    const res = await axios.get(url, {
        headers: {
            "Referer": `http://www.weather.com.cn/weather1d/${address}.shtml`,
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`
        }
    }).catch(err => err)

    try {
        if (res.status === 200 && res.data) {
            const temp = res.data.split(";")[0].split("=")
            const weatherStr = temp[temp.length - 1]
            const weather = JSON.parse(weatherStr)
            if (weather.weatherinfo) {
                return weather.weatherinfo
            } else {
                throw new Error ('找不到weatherinfo属性, 获取失败')
            }
        } else {
            throw new Error(res)
        }
    } catch(e) {
        if (e instanceof SyntaxError ) {
            console.error('序列化错误', e)
        } else {
            console.error(e)
        }
        return null
    }



    console.log(res.data.split(";")[0].split("="))
}

/**
 * 金山词霸每日一句
 * @returns 
 */
const getCIBA = async () => {
    const url = 'http://open.iciba.com/dsapi/'
    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        }
    }).catch(err => err)

    if (res.status === 200 && res) {
        return res.data
    }
    console.error('发生错误', res)
    return null
}

/**
 * 获取随机颜色
 * @returns 
 */
const getColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
}

/**
 * 获取生日信息
 * @returns 
 */
const getBirthdayMessage = () => {
    // 计算生日倒数
    const birthdayList = config.birthdays
    birthdayList.forEach(birthday => {
        let birthdayMessage = null
        // 获取距离下次生日的时间
        const nextBir = dayjs(dayjs().format('YYYY') + '-' + birthday.date).diff(dayjs(), 'day')
        
        if (nextBir === 0) {
            birthdayMessage = `今天是 ${birthday.name} 生日哦，祝 ${birthday.name} 生日快乐！`
        } else if (nextBir > 0 ) {
            birthdayMessage = `距离 ${birthday.name} 的生日还有 ${nextBir} 天`
        }
        // 存储数据
        birthday['message'] = birthdayMessage
    })

    return birthdayList
}

/**
 * 发送消息模板
 * @param {*} params 
 */
const sendMessage = async (params) => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${params.accessToken}`
    const week_list = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    // 组装数据
    const data = {
        "touser": params.user,
        "template_id": config.templateId,
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": { 
            "date": {
                "value": `${dayjs().format('YYYY-MM-DD')} ${week_list[dayjs().format('d')]}`,
                "color": getColor()
            },
            "city": {
                "value": params.city,
                "color": getColor()
            },
            "weather": {
                "value": params.weather,
                "color": getColor()
            },
            "min_temperature": {
                "value": params.minTemperature,
                "color": getColor()
            },
            "max_temperature": {
                "value": params.maxTemperature,
                "color": getColor()
            },
            "love_day": {
                "value": params.loveDateDiff,
                "color": getColor()
            },
            "marry_day": {
                "value": params.marryDateDiff,
                "color": getColor()
            },
            "note_en": {
                "value": params.en,
                "color": getColor()
            },
            "note_ch": {
                "value": params.ch,
                "color": getColor()
            }
        }
    }

    // 提取生日消息
    const { birthdayList } = params
    let birthdayMessage = ''
    birthdayList.forEach((birthday, index) => {
        if (birthday.message) {
            birthdayMessage += `${birthday.message} \n`
        }
    })
    data.data['birthday_message'] = {
        value: birthdayMessage,
        color: getColor()
    }
    console.log(data)

    // 发送消息
    const res = await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        }
    }).catch(err => err)


    if (res.data && res.data.errcode === 0) {
        console.log('推送消息成功')
        return true
    }
    console.error('推送失败！', res.data)
    return false
}

const main = async () => {
    // 获取accessToken
    const accessToken =  await getAccessToken()
    // 接收的用户
    const users = config.user
    // 传入省份和市获取天气信息
    const province = config.province
    const city = config.city
    // 获取天气
    const {weather, temp: maxTemperature, tempn: minTemperature} = await getWeather(province, city)
    // 获取金山词霸每日一句
    const { content: ch, note: en } = await getCIBA()
    // 获取在一起的日期差
    const loveDateDiff = dayjs().diff(dayjs(config.loveDate), 'day')
    // 获取结婚的日期差
    const marryDateDiff = dayjs().diff(dayjs(config.marryDate), 'day')
    // 获取生日信息
    const birthdayList = getBirthdayMessage()
    // 公众号推送消息
    users.forEach(async user => {
        await sendMessage({
            accessToken,
            user,
            province,
            city,
            weather,
            maxTemperature,
            minTemperature,
            ch,
            en,
            loveDateDiff,
            marryDateDiff,
            birthdayList
        })
    })

}

main()
