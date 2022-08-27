import { config } from '../../config/index.js'
import { cityInfo } from '../../config/city-info.js'
import axios from 'axios'
import dayjs from 'dayjs'

/**
 * 获取 accessToken
 * @returns accessToken
 */
 export const getAccessToken = async () => {
    // accessToken
    const accessToken = config.accessToken

    
    const postUrl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`

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
 export const getWeather = async (province, city) => {
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
}

/**
 * 金山词霸每日一句
 * @returns 
 */
 export const getCIBA = async () => {
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
 export const getColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
}

/**
 * 获取生日信息
 * @returns 
 */
 export const getBirthdayMessage = () => {
    // 计算生日倒数
    const birthdayList = config.birthdays
    let resMessage = ''
    birthdayList.forEach(birthday => {
        let birthdayMessage = null
        // 获取距离下次生日的时间
        const nextBir = dayjs(dayjs().format('YYYY') + '-' + birthday.date).diff(dayjs(), 'day')
        
        if (nextBir === 0) {
            birthdayMessage = `今天是 ${birthday.name} 生日哦，祝${birthday.name}生日快乐！`
        } else if (nextBir > 0 ) {
            birthdayMessage = `距离 ${birthday.name} 的生日还有${nextBir}天`
        }
        // 存储数据
        if (birthdayMessage) {
            resMessage += `${birthdayMessage} \n`
        }
    })

    return resMessage
}

/**
 * 发送消息模板
 * @param {*} accessToken 
 * @param {*} user 
 * @param {*} params 
 */
 export const sendMessage = async (accessToken, user, params) => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`

    const wxTemplateData = {}
    params.map(item => {
        wxTemplateData[item.name] = {
            value: item.value,
            color: item.color
        }
    })
    
    // 组装数据
    const data = {
        "touser": user,
        "template_id": config.templateId,
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": wxTemplateData
    }

    console.log('将要发送以下内容：', data)

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
