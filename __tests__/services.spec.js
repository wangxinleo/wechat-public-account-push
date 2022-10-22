import axios from 'axios'
import dayjs from 'dayjs'
import MockDate from 'mockdate'
import config from '../config/exp-config.js'
import TEMPLATE_CONFIG from '../config/template-config.cjs'
import { RUN_TIME_STORAGE } from '../src/store/index.js'

import {
  getWeather,
  getAccessToken,
  getCIBA,
  getOneTalk,
  getEarthyLoveWords,
  getPoisonChickenSoup,
  getWordsFromApiShadiao,
  getMomentCopyrighting,
  getDateDiffList,
  getSlotList,
  getBirthdayMessage,
  sendMessage,
  sendMessageReply,
  getPoetry,
  getConstellationFortune,
  getHolidaytts,
  getCourseSchedule,
  getWeatherIcon,
  getBing,
  buildTianApi,
  getTianApiWeather,
  getTianApiNetworkHot,
  getTianApiMorningGreeting,
  getTianApiEveningGreeting,
  model2Data,
} from '../src/services'
import { selfDayjs } from '../src/utils/set-def-dayjs.js'

describe('services', () => {
  test('getWeather', async () => {
    config.SWITCH = {}
    expect(await getWeather('', '')).toEqual({})
    config.SWITCH = null
    expect(await getWeather('', '')).toEqual({})
    axios.get = async () => ({
      status: 200,
      data: {
        message: 'success感谢又拍云(upyun.com)提供CDN赞助',
        status: 200,
        date: '20220924',
        time: '2022-09-24 14:02:57',
        cityInfo: {
          city: '天津市',
          citykey: '101030100',
          parent: '天津',
          updateTime: '12:01',
        },
        data: {
          shidu: '29%',
          pm25: 27.0,
          pm10: 61.0,
          quality: '良',
          wendu: '21',
          ganmao: '极少数敏感人群应减少户外活动',
          forecast: [
            {
              date: '24',
              high: '高温 26℃',
              low: '低温 15℃',
              ymd: '2022-09-24',
              week: '星期六',
              sunrise: '06:01',
              sunset: '18:05',
              aqi: 47,
              fx: '西南风',
              fl: '3级',
              type: '多云',
              notice: '阴晴之间，谨防紫外线侵扰',
            },
            {
              date: '25',
              high: '高温 27℃',
              low: '低温 17℃',
              ymd: '2022-09-25',
              week: '星期日',
              sunrise: '06:02',
              sunset: '18:04',
              aqi: 63,
              fx: '西南风',
              fl: '3级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '26',
              high: '高温 28℃',
              low: '低温 18℃',
              ymd: '2022-09-26',
              week: '星期一',
              sunrise: '06:03',
              sunset: '18:02',
              aqi: 76,
              fx: '南风',
              fl: '2级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '27',
              high: '高温 28℃',
              low: '低温 19℃',
              ymd: '2022-09-27',
              week: '星期二',
              sunrise: '06:03',
              sunset: '18:01',
              aqi: 79,
              fx: '西南风',
              fl: '2级',
              type: '阴',
              notice: '不要被阴云遮挡住好心情',
            },
            {
              date: '28',
              high: '高温 28℃',
              low: '低温 18℃',
              ymd: '2022-09-28',
              week: '星期三',
              sunrise: '06:04',
              sunset: '17:59',
              aqi: 79,
              fx: '西南风',
              fl: '2级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '29',
              high: '高温 28℃',
              low: '低温 18℃',
              ymd: '2022-09-29',
              week: '星期四',
              sunrise: '06:05',
              sunset: '17:57',
              aqi: 77,
              fx: '西南风',
              fl: '3级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '30',
              high: '高温 29℃',
              low: '低温 18℃',
              ymd: '2022-09-30',
              week: '星期五',
              sunrise: '06:06',
              sunset: '17:56',
              aqi: 74,
              fx: '南风',
              fl: '3级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '01',
              high: '高温 29℃',
              low: '低温 21℃',
              ymd: '2022-10-01',
              week: '星期六',
              sunrise: '06:07',
              sunset: '17:54',
              aqi: 73,
              fx: '东南风',
              fl: '2级',
              type: '多云',
              notice: '阴晴之间，谨防紫外线侵扰',
            },
            {
              date: '02',
              high: '高温 29℃',
              low: '低温 21℃',
              ymd: '2022-10-02',
              week: '星期日',
              sunrise: '06:08',
              sunset: '17:53',
              aqi: 62,
              fx: '东北风',
              fl: '2级',
              type: '小雨',
              notice: '雨虽小，注意保暖别感冒',
            },
            {
              date: '03',
              high: '高温 27℃',
              low: '低温 20℃',
              ymd: '2022-10-03',
              week: '星期一',
              sunrise: '06:09',
              sunset: '17:51',
              aqi: 42,
              fx: '西北风',
              fl: '2级',
              type: '小雨',
              notice: '雨虽小，注意保暖别感冒',
            },
            {
              date: '04',
              high: '高温 23℃',
              low: '低温 15℃',
              ymd: '2022-10-04',
              week: '星期二',
              sunrise: '06:10',
              sunset: '17:50',
              aqi: 16,
              fx: '北风',
              fl: '3级',
              type: '阴',
              notice: '不要被阴云遮挡住好心情',
            },
            {
              date: '05',
              high: '高温 17℃',
              low: '低温 12℃',
              ymd: '2022-10-05',
              week: '星期三',
              sunrise: '06:11',
              sunset: '17:48',
              aqi: 27,
              fx: '西北风',
              fl: '2级',
              type: '多云',
              notice: '阴晴之间，谨防紫外线侵扰',
            },
            {
              date: '06',
              high: '高温 20℃',
              low: '低温 11℃',
              ymd: '2022-10-06',
              week: '星期四',
              sunrise: '06:12',
              sunset: '17:46',
              aqi: 45,
              fx: '西风',
              fl: '3级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '07',
              high: '高温 16℃',
              low: '低温 9℃',
              ymd: '2022-10-07',
              week: '星期五',
              sunrise: '06:13',
              sunset: '17:45',
              aqi: 33,
              fx: '西南风',
              fl: '2级',
              type: '晴',
              notice: '愿你拥有比阳光明媚的心情',
            },
            {
              date: '08',
              high: '高温 17℃',
              low: '低温 11℃',
              ymd: '2022-10-08',
              week: '星期六',
              sunrise: '06:14',
              sunset: '17:43',
              aqi: 10,
              fx: '南风',
              fl: '3级',
              type: '多云',
              notice: '阴晴之间，谨防紫外线侵扰',
            },
          ],
          yesterday: {
            date: '23',
            high: '高温 24℃',
            low: '低温 12℃',
            ymd: '2022-09-23',
            week: '星期五',
            sunrise: '06:00',
            sunset: '18:07',
            aqi: 16,
            fx: '西北风',
            fl: '4级',
            type: '晴',
            notice: '愿你拥有比阳光明媚的心情',
          },
        },
      },
    })
    expect(await getWeather('天津', '天津')).toEqual({
      // 湿度
      shidu: '29%',
      // PM2.5
      pm25: 27.0,
      // PM1.0
      pm10: 61.0,
      // 空气质量
      quality: '良',
      // 预防感冒提醒
      ganmao: '极少数敏感人群应减少户外活动',
      // 日出时间
      sunrise: '06:01',
      // 日落时间
      sunset: '18:05',
      // 空气质量指数
      aqi: 47,
      // 天气情况
      weather: '多云',
      // 最高温度
      maxTemperature: '26℃',
      // 最低温度
      minTemperature: '15℃',
      // 风向
      windDirection: '西南风',
      // 风力等级
      windScale: '3级',
      // 温馨提示
      notice: '阴晴之间，谨防紫外线侵扰',
    })
    axios.get = async () => ({
      status: 200,
      data: {
        message: 'success感谢又拍云(upyun.com)提供CDN赞助',
        status: 200,
        date: '20220924',
        time: '2022-09-24 14:02:57',
        cityInfo: {
          city: '天津市',
          citykey: '101030100',
          parent: '天津',
          updateTime: '12:01',
        },
        data: {
          shidu: '29%',
          pm25: 27.0,
          pm10: 61.0,
          quality: '良',
          wendu: '21',
          ganmao: '极少数敏感人群应减少户外活动',
          forecast: [],
          yesterday: {
            date: '23',
            high: '高温 24℃',
            low: '低温 12℃',
            ymd: '2022-09-23',
            week: '星期五',
            sunrise: '06:00',
            sunset: '18:07',
            aqi: 16,
            fx: '西北风',
            fl: '4级',
            type: '晴',
            notice: '愿你拥有比阳光明媚的心情',
          },
        },
      },
    })
    Object.keys(RUN_TIME_STORAGE).forEach((o) => {
      RUN_TIME_STORAGE[o] = null
    })
    expect(await getWeather('天津', '天津')).toEqual({})
    axios.get = async () => ({
      status: 199,
    })
    expect(await getWeather('北京', '北京')).toEqual({})
    axios.get = async () => {
      throw new Error()
    }
    expect(await getWeather('北京', '北京')).toEqual({})
    config.SWITCH = {
      weather: false,
    }
    expect(await getWeather('北京', '北京')).toEqual({})
  })
  test('getAccessToken', async () => {
    axios.get = async () => {
      throw new Error()
    }
    expect(await getAccessToken()).toBeNull()
    axios.get = async () => ({
      status: 199,
    })
    expect(await getAccessToken()).toBeNull()
    axios.get = async () => ({
      status: 200,
    })
    expect(await getAccessToken()).toBeNull()
    axios.get = async () => ({
      status: 200,
      data: {},
    })
    expect(await getAccessToken()).toBeNull()
    axios.get = async () => ({
      status: 200,
      data: {
        access_token: '123456',
      },
    })
    config.APP_ID = '123'
    config.APP_SECRET = ''
    expect(await getAccessToken()).toBeNull()
    config.APP_ID = ''
    config.APP_SECRET = '123'
    expect(await getAccessToken()).toBeNull()
    config.APP_ID = '123'
    config.APP_SECRET = '123'
    expect(await getAccessToken()).toEqual('123456')
    axios.get = async () => ({
      status: 200,
      data: {
        errmsg: 'xxx',
      },
    })
    expect(await getAccessToken()).toBeNull()
    axios.get = async () => {
      throw new Error()
    }
    expect(await getAccessToken()).toBeNull()
  })
  test('getCIBA', async () => {
    axios.get = async () => {
      throw new Error()
    }
    expect(await getCIBA()).toEqual({})
    axios.get = async () => ({
      status: 199,
    })
    expect(await getCIBA()).toEqual({})
    axios.get = async () => ({
      status: 200,
    })
    expect(await getCIBA()).toBeUndefined()
    axios.get = async () => ({
      status: 200,
      data: 'test',
    })
    expect(await getCIBA()).toEqual('test')
  })
  test('getOneTalk', async () => {
    config.SWITCH = {}
    expect(await getOneTalk('动画')).toEqual('test')
    config.SWITCH.oneTalk = false
    expect(await getOneTalk('动画')).toEqual({})
    config.SWITCH.oneTalk = true
    axios.get = async () => {
      throw new Error()
    }
    expect(await getOneTalk('动画')).toEqual({})
    expect(await getOneTalk('xxx')).toEqual({})
    axios.get = async () => ({
      status: 200,
      data: 'test',
    })
    expect(await getOneTalk('动画')).toEqual('test')
  })
  test('getWordsFromApiShadiao', async () => {
    config.SWITCH.earthyLoveWords = true
    config.SWITCH.momentCopyrighting = true
    config.SWITCH.poisonChickenSoup = true
    expect(await getWordsFromApiShadiao('other')).toEqual('')
    axios.get = async () => {
      throw new Error()
    }
    expect(await getWordsFromApiShadiao('chp')).toEqual('')
    axios.get = async () => ({
      data: null,
    })
    expect(await getWordsFromApiShadiao('pyq')).toEqual('')
    axios.get = async () => null
    expect(await getWordsFromApiShadiao('pyq')).toEqual('')

    axios.get = async () => ({
      data: {
        data: {
          text: 'test',
        },
      },
    })
    expect(await getWordsFromApiShadiao('du')).toEqual('test')
    axios.get = async () => ({
      data: {
        data: {
          text: '彩虹屁',
        },
      },
    })
    config.SWITCH = {}
    expect(await getEarthyLoveWords()).toEqual('彩虹屁')
    config.SWITCH.earthyLoveWords = false
    expect(await getEarthyLoveWords()).toEqual('')
    config.SWITCH.earthyLoveWords = true
    expect(await getEarthyLoveWords()).toEqual('彩虹屁')
    axios.get = async () => ({
      data: {
        data: {
          text: '朋友圈文案',
        },
      },
    })
    config.SWITCH.momentCopyrighting = false
    expect(await getMomentCopyrighting()).toEqual('')
    config.SWITCH = {}
    expect(await getMomentCopyrighting()).toEqual('朋友圈文案')
    config.SWITCH.momentCopyrighting = true
    expect(await getMomentCopyrighting()).toEqual('朋友圈文案')
    axios.get = async () => ({
      data: {
        data: {
          text: '毒鸡汤',
        },
      },
    })
    config.SWITCH = {}
    expect(await getPoisonChickenSoup()).toEqual('毒鸡汤')
    config.SWITCH.poisonChickenSoup = false
    expect(await getPoisonChickenSoup()).toEqual('')
    config.SWITCH.poisonChickenSoup = true
    expect(await getPoisonChickenSoup()).toEqual('毒鸡汤')
  })
  test('getBirthdayMessage', () => {
    config.SWITCH = {}
    expect(getBirthdayMessage()).toEqual('')
    config.SWITCH.birthdayMessage = true
    config.FESTIVALS = null
    MockDate.set('2022-09-03')
    expect(getBirthdayMessage([])).toEqual('')
    expect(getBirthdayMessage([{
      type: '节日',
      name: '结婚纪念日',
      year: '2020',
      date: '09-03',
    }])).toEqual('今天是 结婚纪念日 哦，要开心！ \n')
    config.FESTIVALS = [
      {
        type: '*生日', name: '老婆', year: '1999', date: '09-19', isShowAge: true,
      },
      {
        type: '节日', name: '结婚纪念日', year: '2020', date: '09-03',
      },
      {
        type: '生日', name: '李四', year: '1996', date: '09-31', isShowAge: true,
      },
      {
        type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01',
      },
    ]
    config.FESTIVALS_LIMIT = 4
    expect(getBirthdayMessage()).toEqual('今天是 结婚纪念日 哦，要开心！ \n距离 李四 的26岁生日还有28天 \n距离 老婆 的23岁生日还有41天 \n距离 被搭讪纪念日 还有363天 \n'.trimStart())
    MockDate.reset()
    MockDate.set('2022-09-31')
    config.FESTIVALS = [
      {
        type: '*生日', name: '老婆', year: '1999', date: '09-19', isShowAge: true,
      },
      {
        type: '节日', name: '结婚纪念日', year: '2020', date: '09-03',
      },
      {
        type: '生日', name: '李四', year: '1996', date: '09-31', isShowAge: true,
      },
      {
        type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01',
      },
    ]
    expect(getBirthdayMessage()).toEqual('今天是 李四 的26岁生日哦，祝李四生日快乐！ \n距离 老婆 的23岁生日还有13天 \n距离 被搭讪纪念日 还有335天 \n距离 结婚纪念日 还有337天 \n'.trimStart())
    MockDate.reset()
    MockDate.set('1999-10-27')
    config.FESTIVALS = [
      {
        type: '*生日', name: '老婆', year: '1999', date: '09-19', isShowAge: true,
      },
      {
        type: '节日', name: '结婚纪念日', year: '2020', date: '09-03',
      },
      {
        type: '生日', name: '李四', year: '1996', date: '09-31', isShowAge: true,
      },
      {
        type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01',
      },
    ]
    expect(getBirthdayMessage()).toEqual('今天是 老婆 的0岁生日哦，祝老婆生日快乐！ \n距离 被搭讪纪念日 还有310天 \n距离 结婚纪念日 还有312天 \n距离 李四 的4岁生日还有340天 \n'.trimStart())
    MockDate.reset()
    config.FESTIVALS_LIMIT = -1
    MockDate.set('2022-09-03')
    expect(getBirthdayMessage()).toEqual('')
    MockDate.reset()
    config.FESTIVALS_LIMIT = 4
    config.FESTIVALS = [
      {
        type: '测试日', name: '老婆', year: '1996', date: '09-02', isShowAge: true,
      },
      {
        type: '测试日', name: '结婚纪念日', year: '2020', date: '09-03',
      },
      {
        type: '测试日', name: '李四', year: '1996', date: '09-31', isShowAge: true,
      },
      {
        type: '测试日', name: '被搭讪纪念日', year: '2021', date: '09-01',
      },
    ]
    expect(getBirthdayMessage()).toEqual('')
    config.FESTIVALS = null
    expect(getBirthdayMessage()).toEqual('')
    MockDate.set('1999-10-28')
    config.FESTIVALS = [
      {
        type: '*生日', name: '老婆', year: '1999', date: '09-19',
      },
      {
        type: '节日', name: '结婚纪念日', year: '2020', date: '09-03',
      },
      {
        type: '生日', name: '李四', year: '1996', date: '09-31', isShowAge: true,
      },
      {
        type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01',
      },
    ]
    expect(getBirthdayMessage()).toEqual('距离 被搭讪纪念日 还有309天 \n距离 结婚纪念日 还有311天 \n距离 李四 的4岁生日还有339天 \n距离 老婆 的生日还有354天 \n'.trimStart())
    MockDate.set('1999-10-27')
    config.FESTIVALS = [
      {
        type: '*生日', name: '老婆', year: '1999', date: '09-19',
      },
      {
        type: '节日', name: '结婚纪念日', year: '2020', date: '09-03',
      },
      {
        type: '*生日', name: '李四', year: '1999', date: '12-29', isShowAge: true,
      },
      {
        type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01',
      },
    ]
    expect(getBirthdayMessage()).toEqual('今天是 老婆 的生日哦，祝老婆生日快乐！ \n距离 李四 的0岁生日还有100天 \n距离 被搭讪纪念日 还有310天 \n距离 结婚纪念日 还有312天 \n'.trimStart())
    config.SWITCH = {
      birthdayMessage: false,
    }
    expect(getBirthdayMessage()).toEqual('')
  })
  test('getDateDiffList', () => {
    config.CUSTOMIZED_DATE_LIST = [
      // 在一起的日子
      { keyword: 'love_day', date: '2015-05-01' },
      // 结婚纪念日
      { keyword: 'marry_day', date: '2020-01-04' },
      // 退伍日, 不用可以删掉
      { keyword: 'ex_day', date: '2022-09-09' },
      // sakana日
      // {"keyword": "sakana_day", date: "2022-01-06"},
      // ...
    ]
    MockDate.set('2022-09-03 08:00:00')
    expect(getDateDiffList()).toEqual([{
      date: '2015-05-01',
      diffDay: 2683,
      keyword: 'love_day',
    }, {
      date: '2020-01-04',
      diffDay: 974,
      keyword: 'marry_day',
    }, {
      date: '2022-09-09',
      diffDay: 6,
      keyword: 'ex_day',
    }])
    MockDate.reset()
    config.CUSTOMIZED_DATE_LIST = null
    expect(getDateDiffList(null)).toEqual([])
  })
  test('getSlotList', () => {
    config.SLOT_LIST = null
    expect(getSlotList()).toEqual([])
    config.SLOT_LIST = [
      // 这样配置的话，就会每次发送这句话
      { keyword: 'encourage_oneself', contents: '你主要的问题在于读书太少而想得太多' },
      // 这样配置的话，就会每次随机选一句话发送
      {
        keyword: 'lover_prattle',
        contents: [
          '因为太喜欢你，所以看谁都像是情敌。',
          '申请成为你爱里的永久居民。',
          '你很傻，你很笨，可我还是很羡慕你，因为你有我',
          '遇见你，就好像捡到了100斤的运气',
        ],
      },
      {
        keyword: 'test',
        contents: [],
      },
    ]
    Math.random = () => 0
    expect(getSlotList()).toEqual([
      {
        keyword: 'encourage_oneself',
        contents: '你主要的问题在于读书太少而想得太多',
        checkout: '你主要的问题在于读书太少而想得太多',
      },
      {
        keyword: 'lover_prattle',
        contents: [
          '因为太喜欢你，所以看谁都像是情敌。',
          '申请成为你爱里的永久居民。',
          '你很傻，你很笨，可我还是很羡慕你，因为你有我',
          '遇见你，就好像捡到了100斤的运气',
        ],
        checkout: '因为太喜欢你，所以看谁都像是情敌。',
      },
      {
        keyword: 'test',
        contents: [],
        checkout: '',
      },
    ])
  })
  test('sendMessage', async () => {
    axios.post = async () => {
      throw new Error()
    }
    expect(await sendMessage('templateId', { id: '123', name: 'me' }, [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      name: 'me',
      success: false,
    })
    axios.post = async () => ({
      data: {
        errcode: 0,
      },
    })
    expect(await sendMessage('templateId', { id: '123', name: 'me' }, [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      name: 'me',
      success: false,
    })
    axios.post = async () => ({
      data: {
        errcode: 40003,
      },
    })
    expect(await sendMessage('templateId', { id: '123', name: 'me' }, [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      name: 'me',
      success: false,
    })
    axios.post = async () => ({
      data: {
        errcode: 40036,
      },
    })
    expect(await sendMessage('templateId', { id: '123', name: 'me' }, [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      name: 'me',
      success: false,
    })
    expect(await sendMessage('templateId', { id: '123', name: 'me' }, [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], 'push-deer')).toEqual({
      name: 'me',
      success: false,
    })
  })
  test('sendMessageReply', async () => {
    axios.post = async () => {
      throw new Error()
    }
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ])).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], 'templateId', [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    axios.post = async () => {
      throw new Error()
    }
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], null, null, null)).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    axios.post = async () => ({
      data: {
        errcode: 0,
      },
    })
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], 'templateId', [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    RUN_TIME_STORAGE.accessToken = 'secret'
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], 'templateId', [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      failPostIds: '无',
      failPostNum: 0,
      needPostNum: 2,
      successPostIds: 'me,you',
      successPostNum: 2,
    })
    axios.post = async () => {
      throw new Error()
    }
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], 'templateId', [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    axios.post = async () => ({
      data: {
        errcode: 40036,
      },
    })
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], 'templateId', [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    axios.post = async () => ({
      data: {
        errcode: 40003,
      },
    })
    RUN_TIME_STORAGE.pushNum = 0
    expect(await sendMessageReply([
      { id: '123', name: 'me' },
      { id: '456', name: 'you' },
    ], 'templateId', [{
      name: 'name1',
      value: 'value1',
      color: 'color1',
    }, {
      name: 'name2',
      value: 'value2',
      color: 'color2',
    }], null)).toEqual({
      failPostIds: 'me,you',
      failPostNum: 2,
      needPostNum: 2,
      successPostIds: '无',
      successPostNum: 0,
    })
    TEMPLATE_CONFIG.splice(0, TEMPLATE_CONFIG.length, {
      id: '0001',
      title: '亲爱的, 早上好',
      desc: `
      **{{date.DATA}}**
      下个休息日：{{holidaytts.DATA}}
      ---
      城市：{{city.DATA}}
      天气：{{weather.DATA}}
      气温(最高/最低):{{max_temperature.DATA}} / {{min_temperature.DATA}}
      风向: {{wind_direction.DATA}}
      风级: {{wind_scale.DATA}}
      {{comprehensive_horoscope.DATA}}
      ---
      今天是我们相识的第{{love_day.DATA}}天
      {{birthday_message.DATA}}
      ---
      {{moment_copyrighting.DATA}}
      
      
      {{poetry_title.DATA}} {{poetry_content.DATA}}
    `,
    })
    expect(await sendMessage('0001', { id: '123', name: 'me' }, [{
      name: 'date',
      value: 'value1',
      color: 'color1',
    }], 'push-deer')).toEqual({
      name: 'me',
      success: false,
    })
    axios.get = async () => {
      throw new Error()
    }
    expect(await sendMessage('0001', { id: '123', name: 'me' }, [{
      name: 'date',
      value: 'value1',
      color: 'color1',
    }], 'push-deer')).toEqual({
      name: 'me',
      success: false,
    })
    axios.post = async () => ({
      data: {
        code: 0,
      },
    })
    expect(await sendMessage('0001', { id: '123', name: 'me' }, [{
      name: 'date',
      value: 'value1',
      color: 'color1',
    }], 'push-deer')).toEqual({
      name: 'me',
      success: true,
    })
  })
  test('getPoetry', async () => {
    config.SWITCH = {}
    expect(await getPoetry()).toEqual({})
    config.SWITCH.poetry = true
    axios.get = async () => {
      throw new Error()
    }
    expect(await getPoetry()).toEqual({})
    axios.get = async () => ({
      data: {
        status: 'failed',
      },
    })
    expect(await getPoetry()).toEqual({})
    axios.get = async () => ({})
    expect(await getPoetry()).toEqual({})
    axios.get = async () => null
    expect(await getPoetry()).toEqual({})
    axios.get = async () => ({
      data: {
        status: 'success',
      },
    })
    expect(await getPoetry()).toEqual({
      author: '',
      content: '',
      dynasty: '',
      title: '',
    })
    axios.get = async () => ({
      data: {
        status: 'success',
        data: {
          content: '床前明月光',
          origin: {
            author: '李白',
            dynasty: '唐',
            title: '静夜思',
          },
        },
      },
    })
    expect(await getPoetry()).toEqual({
      content: '床前明月光',
      author: '李白',
      dynasty: '唐',
      title: '静夜思',
    })
    config.SWITCH = {
      poetry: false,
    }
    expect(await getPoetry()).toEqual({})
  })
  test('selfDayjs', () => {
    dayjs.tz.guess = () => 'UTC'
    expect(selfDayjs('2022-09-09 12:00:00').hour()).toEqual(4)
  })
  test('getConstellationFortune', async () => {
    config.SWITCH = {}
    expect(getConstellationFortune()).resolves.toEqual([])
    config.SWITCH.horoscope = true
    expect(getConstellationFortune()).resolves.toEqual([])
    expect(getConstellationFortune('09-02')).resolves.toEqual([])
    expect(getConstellationFortune('09-02', '昨日')).resolves.toEqual([])
    axios.get = async () => {
      throw new Error()
    }
    config.IS_SHOW_COLOR = true
    expect(getConstellationFortune('09-02', '今日')).resolves.toEqual([{
      color: '#000000',
      value: '今日综合运势: 福星高照! 去争取自己想要的一切吧!',
      name: 'comprehensive_horoscope',
    }, {
      color: '#000000',
      value: '今日爱情运势: 福星高照! 去争取自己想要的一切吧!',
      name: 'love_horoscope',
    }, {
      color: '#000000',
      value: '今日事业学业: 福星高照! 去争取自己想要的一切吧!',
      name: 'career_horoscope',
    }, {
      color: '#000000',
      value: '今日财富运势: 福星高照! 去争取自己想要的一切吧!',
      name: 'wealth_horoscope',
    }, {
      color: '#000000',
      value: '今日健康运势: 福星高照! 去争取自己想要的一切吧!',
      name: 'healthy_horoscope',
    }])
    axios.get = async () => ({
      data: `
                <html lang="en">
                <body>
                <div class="c_cont">
                <p>
                <strong class="p1">综合运势</strong>
                <span><small></small></span>
                </p>
                <p>
                <strong class="p2">爱情运势</strong>
                <span>单身的遇到一些契机，打开彼此的心扉。恋爱中的得到恋人行动上的重视，也会收到承诺的兑现。</span>
                </p>
                <p>
                <strong class="p4">财富运势</strong>
                <span>求财方面陆续进账，简直就是四方来财的节奏，容易得到贵人的帮助，收入可观。</span>
                </p>
                <p>
                <strong class="p5">健康运势</strong>
                <span>玩手机要适度，不能过度沉迷，会容易带来烦躁的情绪，而且还会影响视力。</span>
                </p>
                </div>
                </body>
                </html>
                    `,
    })
    expect(getConstellationFortune('09-02', '今日')).resolves.toEqual([{
      color: '#000000',
      value: '今日综合运势: 福星高照! 去争取自己想要的一切吧!',
      name: 'comprehensive_horoscope',
    }, {
      color: '#000000',
      value: '今日爱情运势: 单身的遇到一些契机，打开彼此的心扉。恋爱中的得到恋人行动上的重视，也会收到承诺的兑现。',
      name: 'love_horoscope',
    }])
    config.SWITCH = {
      horoscope: false,
    }
    expect(getConstellationFortune('09-02', '今日')).resolves.toEqual([])
  })
  test('getHolidaytts', async () => {
    config.SWITCH = {}
    expect(await getHolidaytts()).toEqual(null)
    config.SWITCH.holidaytts = true
    axios.get = async () => {
      throw new Error()
    }
    expect(await getHolidaytts()).toEqual(null)
    axios.get = async () => ({
      status: 200,
      data: {
        code: 0,
        tts: 'xxx',
      },
    })
    expect(await getHolidaytts()).toEqual('xxx')
    axios.get = async () => ({
      status: 200,
      data: {
        code: 1,
        tts: 'xxx',
      },
    })
    expect(await getHolidaytts()).toEqual(null)
    config.SWITCH = {
      holidaytts: false,
    }
    expect(await getHolidaytts()).toEqual(null)
  })
  test('getCourseSchedule', () => {
    MockDate.set('2022-09-24 08:00:00')
    config.SWITCH.courseSchedule = false
    expect(getCourseSchedule([])).toEqual('')
    config.SWITCH.courseSchedule = true
    expect(getCourseSchedule(null)).toEqual('')
    expect(getCourseSchedule([
      [],
      [],
      [],
      [],
      [],
      [
        '08-00:09:35 高等数学',
        '09:50-11:35 高等物理',
      ],
      [],
    ])).toEqual('08-00:09:35 高等数学\n09:50-11:35 高等物理')
    expect(getCourseSchedule([
      [],
      [],
      [],
      [],
    ])).toEqual('')
    expect(getCourseSchedule({
      benchmark: {
        date: '2022-09-23',
        isOdd: true,
      },
      courses: {
        odd: [
          [],
          [],
          [],
          [],
          [],
          [
            '08-00:09:35 高等数学',
            '09:50-11:35 高等物理',
          ],
          [],
        ],
        even: [],
      },
    })).toEqual('08-00:09:35 高等数学\n09:50-11:35 高等物理')
    expect(getCourseSchedule({
      benchmark: {
        date: '2022-09-23',
        isOdd: false,
      },
      courses: {
        even: [
          [],
          [],
          [],
          [],
          [],
          [
            '08-00:09:35 高等数学',
            '09:50-11:35 高等物理',
          ],
          [],
        ],
        odd: [],
      },
    })).toEqual('08-00:09:35 高等数学\n09:50-11:35 高等物理')
    expect(getCourseSchedule({
      benchmark: {
        date: '2022-09-26',
        isOdd: true,
      },
      courses: {
        even: [
          [],
          [],
          [],
          [],
          [],
          [
            '08-00:09:35 高等数学',
            '09:50-11:35 高等物理',
          ],
          [],
        ],
        odd: [],
      },
    })).toEqual('08-00:09:35 高等数学\n09:50-11:35 高等物理')
    expect(getCourseSchedule({
      benchmark: {
        date: '2022-09-18',
        isOdd: true,
      },
      courses: {
        even: [
          [],
          [],
          [],
          [],
          [],
          [
            '08-00:09:35 高等数学',
            '09:50-11:35 高等物理',
          ],
          [],
        ],
        odd: [],
      },
    })).toEqual('08-00:09:35 高等数学\n09:50-11:35 高等物理')
    expect(getCourseSchedule({
      benchmark: {
        date: '2022-09-18',
        isOdd: true,
      },
      courses: {
        even: [
          [],
          [],
          [],
          [],
        ],
        odd: [],
      },
    })).toEqual('')
    MockDate.reset()
  })
  test('getWeatherIcon', () => {
    expect(getWeatherIcon('晴')).toEqual('☀️')
    expect(getWeatherIcon('未知')).toEqual('🌈')
  })
  test('getBing', async () => {
    axios.get = async () => {
      throw new Error()
    }
    expect(await getBing()).toEqual({})
    axios.get = async () => ({
      status: 200,
      data: {
        images: [{
          url: 'url',
          title: 'title',
          copyright: 'abc(def)ghi(jkl)',
        }],
      },
    })
    expect(await getBing()).toEqual({
      imgUrl: 'https://cn.bing.com/url',
      imgTitle: 'title',
      imgContent: 'abcghi(jkl)',
    })
  })
  test('buildTianApi', async () => {
    config.TIAN_API = {}
    await expect(buildTianApi(null)).resolves.toEqual([])
    config.TIAN_API.weather = true
    await expect(buildTianApi('tianqi')).resolves.toEqual([])
    config.TIAN_API.weather = 3
    await expect(buildTianApi('tianqi')).resolves.toEqual([])
    config.TIAN_API.key = 'secret'
    axios.get = async () => ({
    })
    await expect(buildTianApi('tianqi')).resolves.toEqual([])
    axios.get = async () => ({
      data: {
        code: 199,
        msg: 'error msg',
      },
    })
    await expect(buildTianApi('tianqi')).resolves.toEqual([])
    axios.get = async () => ({
      data: {
        code: 200,
      },
    })
    await expect(buildTianApi('tianqi')).resolves.toEqual([])
    Object.keys(RUN_TIME_STORAGE).forEach((o) => {
      RUN_TIME_STORAGE[o] = null
    })
    axios.get = async () => ({
      data: {
        code: 200,
        newslist: [1, 2, 3, 4, 5],
      },
    })
    await expect(buildTianApi('tianqi')).resolves.toEqual([1, 2, 3])
    axios.get = async () => ({
      data: {
        code: 200,
        newslist: [{
          content: 'xxx',
        }],
      },
    })
    const user = {}
    config.TIAN_API.morningGreeting = true
    config.TIAN_API.eveningGreeting = true
    config.TIAN_API.weather = true
    config.TIAN_API.networkHot = true
    await expect(getTianApiMorningGreeting()).resolves.toEqual('xxx')
    await expect(getTianApiEveningGreeting()).resolves.toEqual('xxx')
    await expect(getTianApiWeather(user)).resolves.toEqual([{ content: 'xxx' }])
    await expect(getTianApiNetworkHot(user)).resolves.toEqual('')
  })
  test('model2Data', () => {
    expect(model2Data()).toEqual(null)
    expect(model2Data('0001')).toEqual(null)
    expect(model2Data('0003', 'abc')).toEqual(null)
    TEMPLATE_CONFIG.splice(0, TEMPLATE_CONFIG.length, {
      id: '0001',
      title: '亲爱的, 早上好',
      desc: `
      **{{date.DATA}}**
      下个休息日：{{holidaytts.DATA}}
      ---
      城市：{{city.DATA}}
      天气：{{weather.DATA}}
      气温(最高/最低):{{max_temperature.DATA}} / {{min_temperature.DATA}}
      风向: {{wind_direction.DATA}}
      风级: {{wind_scale.DATA}}
      {{comprehensive_horoscope.DATA}}
      ---
      今天是我们相识的第{{love_day.DATA}}天
      {{birthday_message.DATA}}
      ---
      {{moment_copyrighting.DATA}}
      
      
      {{poetry_title.DATA}} {{poetry_content.DATA}}
    `,
    })
    expect(model2Data('0001', {
      date: {
        value: 0,
      },
    }, true)).toEqual({ desc: '%5Cn**0**%5Cn%E4%B8%8B%E4%B8%AA%E4%BC%91%E6%81%AF%E6%97%A5%EF%BC%9A%5Cn---%5Cn%E5%9F%8E%E5%B8%82%EF%BC%9A%5Cn%E5%A4%A9%E6%B0%94%EF%BC%9A%5Cn%E6%B0%94%E6%B8%A9(%E6%9C%80%E9%AB%98/%E6%9C%80%E4%BD%8E):%20/%20%5Cn%E9%A3%8E%E5%90%91:%20%5Cn%E9%A3%8E%E7%BA%A7:%20%5Cn%5Cn---%5Cn%E4%BB%8A%E5%A4%A9%E6%98%AF%E6%88%91%E4%BB%AC%E7%9B%B8%E8%AF%86%E7%9A%84%E7%AC%AC%E5%A4%A9%5Cn%5Cn---%5Cn%5Cn%5Cn%5Cn%5Cn', title: '%E4%BA%B2%E7%88%B1%E7%9A%84,%20%E6%97%A9%E4%B8%8A%E5%A5%BD' })
    expect(model2Data('0001', {
      date: {
        value: 0,
      },
    }, true, true)).toEqual({ desc: '%0A%0A**0**%0A%0A%E4%B8%8B%E4%B8%AA%E4%BC%91%E6%81%AF%E6%97%A5%EF%BC%9A%0A%0A---%0A%0A%E5%9F%8E%E5%B8%82%EF%BC%9A%0A%0A%E5%A4%A9%E6%B0%94%EF%BC%9A%0A%0A%E6%B0%94%E6%B8%A9(%E6%9C%80%E9%AB%98/%E6%9C%80%E4%BD%8E):%20/%20%0A%0A%E9%A3%8E%E5%90%91:%20%0A%0A%E9%A3%8E%E7%BA%A7:%20%0A%0A%0A%0A---%0A%0A%E4%BB%8A%E5%A4%A9%E6%98%AF%E6%88%91%E4%BB%AC%E7%9B%B8%E8%AF%86%E7%9A%84%E7%AC%AC%E5%A4%A9%0A%0A%0A%0A---%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A', title: '%25E4%25BA%25B2%25E7%2588%25B1%25E7%259A%2584,%2520%25E6%2597%25A9%25E4%25B8%258A%25E5%25A5%25BD' })
  })
})
