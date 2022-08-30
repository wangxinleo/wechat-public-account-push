import { config } from '../../config/index.js'
import { CITY_INFO, TYPE_LIST } from '../store/index.js'
import axios from 'axios'
import dayjs from 'dayjs'
import { randomNum, parseBirthdayMessage, sortBirthdayTime } from '../utils/index.js'

/**
 * 获取 accessToken
 * @returns accessToken
 */
export const getAccessToken = async () => {
  // APP_ID
  const appId = config.APP_ID
  // APP_SECRET
  const appSecret = config.APP_SECRET
  // accessToken
  let accessToken = null

  const postUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

  try {
    const res = await axios.get(postUrl).catch(err => err)
    if (res.status === 200 && res.data && res.data.access_token) {
      accessToken = res.data.access_token
    } else {
      console.error('获取 accessToken: 请求失败', res.data.errmsg)
    }
  } catch (e) {
    console.error('获取 accessToken: ', e)
  }

  return accessToken
}

/**
 * 获取天气情况
 * @param {*} province 省份
 * @param {*} city 城市
 */
export const getWeather = async (province, city) => {
  if (!CITY_INFO[province] || !CITY_INFO[province][city] || !CITY_INFO[province][city]["AREAID"]) {
    console.error('配置文件中找不到相应的省份或城市', province, city)
    return null
  }
  const address = CITY_INFO[province][city]["AREAID"]

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
        throw new Error('天气情况: 找不到weatherinfo属性, 获取失败')
      }
    } else {
      throw new Error(res)
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error('天气情况: 序列化错误', e)
    } else {
      console.error('天气情况: ', e)
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
  console.error('金山词霸每日一句: 发生错误', res)
  return null
}

/**
 * 每日一言
 * @param {*} type 
 * @returns 
 */
export const getOneTalk = async (type) => {

  const filterQuery = TYPE_LIST.filter(item => item.name === type);
  const query = filterQuery.length ? filterQuery[0].type : TYPE_LIST[randomNum(0, 7)].type
  const url = `https://v1.hitokoto.cn/?c=${query}`

  const res = await axios.get(url).catch(err => err)

  if (res.status === 200 && res) {
    return res.data
  }

  console.error('每日一言: 发生错误', res)
  return null

}

/**
 * 获取重要节日信息
 * @returns 
 */
export const getBirthdayMessage = () => {
  // 计算重要节日倒数
  const birthdayList = sortBirthdayTime(parseBirthdayMessage(config.FESTIVALS))
  console.log(birthdayList);
  let resMessage = ''

  birthdayList.forEach((item, index) => {
    if (
      !config.FESTIVALS_LIMIT ||
      (config.FESTIVALS_LIMIT && index < config.FESTIVALS_LIMIT)
    ) {
      let message = null

      // 生日相关
      if (item.type === '生日') {
        // 获取周岁
        const age = dayjs().diff(item.year + '-' + item.date, 'year');

        if (item.diffDay === 0) {
          message = `今天是 ${item.name} 的${age ? age + '岁' : ''}生日哦，祝${item.name}生日快乐！`
        } else {
          message = `距离 ${item.name} 的${age ? age + 1 + '岁' : ''}生日还有${item.diffDay}天`
        }
      }

      // 节日相关
      if (item.type === '节日') {
        if (item.diffDay === 0) {
          message = `今天是 ${item.name} 哦，要开心！`
        } else {
          message = `距离 ${item.name} 还有${item.diffDay}天`
        }
      }

      // 存储数据
      if (message) {
        resMessage += `${message} \n`
      }

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
    "template_id": config.TEMPLATE_ID,
    "url": "http://weixin.qq.com/download",
    "topcolor": "#FF0000",
    "data": wxTemplateData
  }

  console.log('将要发送以下内容: ', data)

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