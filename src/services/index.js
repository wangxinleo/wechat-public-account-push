import { config } from '../../config/index.js'
import { CITY_INFO, TYPE_LIST } from '../store/index.js'
import axios from 'axios'
import { getConstellation, randomNum, sortBirthdayTime } from '../utils/index.js'
import { Lunar } from 'lunar-javascript'
import { selfDayjs } from '../utils/set-def-dayjs.js'
import { JSDOM } from 'jsdom'

/**
 * 获取 accessToken
 * @returns accessToken
 */
export const getAccessToken = async () => {
  // APP_ID
  const appId = config.APP_ID || process.env.APP_ID
  // APP_SECRET
  const appSecret = config.APP_SECRET || process.env.APP_SECRET
  // accessToken
  let accessToken = null

  console.log('已获取appId', appId)
  console.log('已获取appSecret', appSecret)

  const postUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${ appId }&secret=${ appSecret }`

  try {
    const res = await axios.get(postUrl)
    if (res.status === 200 && res.data && res.data.access_token) {
      accessToken = res.data.access_token
      console.log('---')
      console.error('获取 accessToken: 成功', res.data)
      console.log('---')
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
  if (!CITY_INFO[province] || !CITY_INFO[province][city] || !CITY_INFO[province][city]['AREAID']) {
    console.error('配置文件中找不到相应的省份或城市')
    return null
  }
  const address = CITY_INFO[province][city]['AREAID']

  const url = `http://d1.weather.com.cn/dingzhi/${ address }.html?_=${ selfDayjs().valueOf() }`

  const res = await axios.get(url, {
    headers: {
      'Referer': `http://www.weather.com.cn/weather1d/${ address }.shtml`,
      'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`
    }
  }).catch(err => err)

  try {
    if (res.status === 200 && res.data) {
      const temp = res.data.split(';')[0].split('=')
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

  const filterQuery = TYPE_LIST.filter(item => item.name === type)
  const query = filterQuery.length ? filterQuery[0].type : TYPE_LIST[randomNum(0, 7)].type
  const url = `https://v1.hitokoto.cn/?c=${ query }`

  const res = await axios.get(url).catch(err => err)

  if (res && res.status === 200) {
    return res.data
  }

  console.error('每日一言: 发生错误', res)
  return null

}
/**
 * 从沙雕APP开放接口中获取数据
 * @param {'chp' | 'pyq' | 'du'} type
 * @returns {Promise<String>}
 */
export const getWordsFromApiShadiao = async (type) => {
  const typeNameMap = {
    chp: '土味情话(彩虹屁)',
    pyq: '朋友圈文案',
    du: '毒鸡汤'
  }
  if (!['chp', 'pyq', 'du'].includes(type)) {
    console.error('type参数有误，应为chp, pyq, du的其中一个')
    return ''
  }
  const url = `https://api.shadiao.pro/${ type }`
  try {
    const res = await axios.get(url, {
      responseType: 'json'
    })
    return res.data && res.data.data && res.data.data.text || ''
  } catch (e) {
    console.error(`${ typeNameMap[type] }：发生错误`, e)
    return ''
  }
}

/**
 * 土味情话（彩虹屁）
 * @returns {Promise<String>} 土味情话(彩虹屁）内容
 */
export const getEarthyLoveWords = async () => {
  return await getWordsFromApiShadiao('chp')
}

/**
 * 朋友圈文案
 * @returns {Promise<String>} 朋友圈文案内容
 */
export const getMomentCopyrighting = async () => {
  return await getWordsFromApiShadiao('pyq')
}

/**
 * 毒鸡汤
 * @returns {Promise<String>} 毒鸡汤内容
 */
export const getPoisonChickenSoup = async () => {
  return await getWordsFromApiShadiao('du')
}
/**
 * 古诗古文
 * @returns {Promise<null|{dynasty: string, author: string, title: string, content: string}>} 古诗内容 标题 作者 朝代
 */
export const getPoetry = async () => {
  const url = 'https://v2.jinrishici.com/sentence'
  try {
    const res = await axios.get(url, {
      headers: {
        'X-User-Token': 'FW8KNlfULPtZ9Ci6aNy8aTfPJPwI+/Ln'
      },
      responseType: 'json'
    })
    const { status, data, warning } = res.data || {}
    if (status !== 'success') {
      console.error('古诗古文：发生错误', warning || '')
      return null
    }
    const { content = '', origin } = data || {}
    const { title = '', author = '', dynasty = '' } = origin || {}
    return {
      content,
      title,
      author,
      dynasty
    }
  } catch (e) {
    console.error('古诗古文：发生错误', e)
    return null
  }
}

/**
 * 获取重要节日信息
 * @returns
 */
export const getBirthdayMessage = () => {
  // 计算重要节日倒数
  const birthdayList = sortBirthdayTime((config.FESTIVALS || []).map((it) => {
    let { type, year, date } = it
    const useLunar = /^\*/.test(type)
    if (!useLunar) {
      return it
    }
    type = type.replace(/^\*/, '')
    const [month, day] = date.split('-').map(Number)
    // 获取今年的生日信息
    const lunarInThisYear = Lunar.fromYmd((new Date).getFullYear(), month, day)
    const solarInThisYear = lunarInThisYear.getSolar()
    const lunar = Lunar.fromYmd(Number(year), month, day)
    const solar = lunar.getSolar()
    return {
      ...it,
      useLunar,
      type,
      year,
      date,
      solarDate: `${ solar.getMonth() }-${ solar.getDay() }`,
      solarDateInThisYear: `${ solarInThisYear.getMonth() }-${ solarInThisYear.getDay() }`
    }
  }))
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
        const age = selfDayjs().diff(item.year + '-' + (item.useLunar ? item.solarDateInThisYear : item.date), 'year')

        if (item.diffDay === 0) {
          message = `今天是 ${ item.name } 的${ age ? age + '岁' : '' }生日哦，祝${ item.name }生日快乐！`
        } else {
          message = `距离 ${ item.name } 的${ age ? age + 1 + '岁' : '' }生日还有${ item.diffDay }天`
        }
      }

      // 节日相关
      if (item.type === '节日') {
        if (item.diffDay === 0) {
          message = `今天是 ${ item.name } 哦，要开心！`
        } else {
          message = `距离 ${ item.name } 还有${ item.diffDay }天`
        }
      }

      // 存储数据
      if (message) {
        resMessage += `${ message } \n`
      }

    }

  })

  return resMessage
}

/**
 * 计算每个重要日子的日期差
 * @returns
 */
export const getDateDiffList = () => {
  const dateList = config.CUSTOMIZED_DATE_LIST

  dateList.forEach(item => {
    item['diffDay'] = Math.ceil(selfDayjs().diff(selfDayjs(item.date), 'day', true))
  })

  return dateList
}

export const getSlotList = () => {
  const slotList = config.SLOT_LIST

  slotList.forEach(item => {
    if (Object.prototype.toString.call(item.contents) === '[object Array]' && item.contents.length > 0) {
      item['checkout'] = item.contents[Math.floor(Math.random() * item.contents.length + 1) - 1]
    } else if (Object.prototype.toString.call(item.contents) === '[object String]') {
      item['checkout'] = item.contents
    } else {
      item['checkout'] = ''
    }
  })

  return slotList
}

/**
 * 发送消息模板
 * @param {*} templateId
 * @param {*} user
 * @param {*} accessToken
 * @param {*} params
 * @returns
 */
export const sendMessage = async (templateId, user, accessToken, params) => {
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${ accessToken }`

  const wxTemplateData = {}
  if (Object.prototype.toString.call(params) === '[object Array]') {
    params.map(item => {
      wxTemplateData[item.name] = {
        value: item.value,
        color: item.color
      }
    })
  }


  // 组装数据
  const data = {
    'touser': user.id,
    'template_id': templateId,
    'url': user.openUrl || 'https://wangxinleo.cn',
    'topcolor': '#FF0000',
    'data': wxTemplateData
  }

  // 发送消息
  const res = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    }
  }).catch(err => err)


  if (res.data && res.data.errcode === 0) {
    console.log(`${ user.name }: 推送消息成功`)
    return {
      name: user.name,
      success: true
    }
  }
  console.error(`${ user.name }: 推送消息失败`, res.data)
  return {
    name: user.name,
    success: false
  }
}

/**
 * 推送消息, 进行成功失败统计
 * @param {*} users
 * @param {*} accessToken
 * @param {*} templateId
 * @param {*} params
 * @returns
 */
export const sendMessageReply = async (users, accessToken, templateId = null, params = null) => {
  const allPromise = []
  const needPostNum = users.length
  let successPostNum = 0
  let failPostNum = 0
  const successPostIds = []
  const failPostIds = []
  users.forEach(async user => {
    allPromise.push(sendMessage(
      templateId || user.useTemplateId,
      user,
      accessToken,
      params || user.wxTemplateParams
    ))
  })
  const resList = await Promise.all(allPromise)
  resList.forEach(item => {
    if (item.success) {
      successPostNum++
      successPostIds.push(item.name)
    } else {
      failPostNum++
      failPostIds.push(item.name)
    }
  })

  return {
    needPostNum,
    successPostNum,
    failPostNum,
    successPostIds: successPostIds.length ? successPostIds.join(',') : '无',
    failPostIds: failPostIds.length ? failPostIds.join(',') : '无'
  }
}

export async function getFlattenConstellationFortune () {
  const constellationFortune = await getConstellationFortune()
  const result = [];
  const helper = (key, value) => {
    if (Array.isArray(value)) {
      for (const item of value) {
        helper(key + '_' + item.key, item.value)
      }
    } else {
      result.push({
        key,
        value
      })
    }
  }
  helper('', constellationFortune);
  return result.map((it) => {
    return {
      key: it.key.substring(1),
      value: it.value
    }
  });
}

export async function getConstellationFortune() {
  const result = []
  for (const item of config.CONSTELLATION_FORTUNE) {
    const value = {
      key: item.name,
      value: []
    };
    result.push(value)
    const { en: constellation } = getConstellation(item.date)
    const periods = ['今日', '明日', '本周', '本月', '今年']
    for (let i = 0; i < periods.length; i++) {
      const url = `https://www.xzw.com/fortune/${ constellation }/${i}.html`
      try {
        const { data } = await axios.get(url)
        const jsdom = new JSDOM(data);
        const res = ['综合运势', '爱情运势', '事业学业', '财富运势', '健康运势'].map((it, index) => {
          const value = jsdom.window.document.querySelector(`.c_cont p strong.p${ index + 1 }`).nextElementSibling.innerHTML.replace(/<small.*/, '');
          return {
            key: it,
            value
          }
        })
        value.value.push({
          key: periods[i],
          value: res
        })
      } catch (e) {
        console.error('星座运势：发生错误', e)
        throw e
      }
    }
  }
  return result
}
