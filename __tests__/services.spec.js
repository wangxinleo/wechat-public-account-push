import { jest } from '@jest/globals'

import axios from 'axios'
import { config } from '../config'
import dayjs from 'dayjs'

jest.mock('axios')
jest.mock('dayjs')
jest.mock('../config')

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
    getHolidaytts
} from '../src/services'
import { selfDayjs } from '../src/utils/set-def-dayjs.js'
import MockDate from 'mockdate'

describe('services', () => {
    test('getWeather', async () => {
        config.SWITCH = {}
        expect(await getWeather('', '')).toEqual({})
        config.SWITCH = null
        expect(await getWeather('', '')).toEqual({})
        axios.get = async () => {
            return {
                status: 200,
                data: 'var cityDZ101010100 = {"weatherinfo":{"city":"101010100","cityname":"北京","fctime":"202209030800","temp":"27℃","tempn":"19℃","weather":"小雨","weathercode":"d7","weathercoden":"n7","wd":"南风","ws":"<3级"}};var alarmDZ101010100 = {"w":[]}'
            }
        }
        expect(await getWeather('北京', '北京')).not.toEqual({})
        axios.get = async () => {
            return {
                status: 199
            }
        }
        expect(await getWeather('北京', '北京')).toEqual({})
        axios.get = async () => {
            return {
                status: 200,
                data: 'a=;'
            }
        }
        expect(await getWeather('北京', '北京')).toEqual({})
        axios.get = async () => {
            return {
                status: 200,
                data: 'a=123;'
            }
        }
        expect(await getWeather('北京', '北京')).toEqual({})
        axios.get = async () => {
            throw new Error
        }
        expect(await getWeather('北京', '北京')).toEqual({})
        axios.get = async () => {
            return {
                status: 200,
                data: 'null'
            }
        }
        expect(await getWeather('北京', '北京')).toEqual({})
    })
    test('getAccessToken', async () => {
        axios.get = async () => {
            throw new Error
        }
        expect(await getAccessToken()).toBeNull()
        axios.get = async () => {
            return {
                status: 199
            }
        }
        expect(await getAccessToken()).toBeNull()
        axios.get = async () => {
            return {
                status: 200
            }
        }
        expect(await getAccessToken()).toBeNull()
        axios.get = async () => {
            return {
                status: 200,
                data: {}
            }
        }
        expect(await getAccessToken()).toBeNull()
        axios.get = async () => {
            return {
                status: 200,
                data: {
                    access_token: '123456'
                }
            }
        }
        config.APP_ID = '123'
        config.APP_SECRET = ''
        expect(await getAccessToken()).toBeNull()
        config.APP_ID = ''
        config.APP_SECRET = '123'
        expect(await getAccessToken()).toBeNull()
        config.APP_ID = '123'
        config.APP_SECRET = '123'
        expect(await getAccessToken()).toEqual('123456')
        axios.get = async () => {
            return {
                status: 200,
                data: {
                    errmsg: 'xxx'
                }
            }
        }
        expect(await getAccessToken()).toBeNull()
        axios.get = async () => {
            throw new Error
        }
        expect(await getAccessToken()).toBeNull()
    })
    test('getCIBA', async function () {
        axios.get = async () => {
            throw new Error
        }
        expect(await getCIBA()).toEqual({})
        axios.get = async () => {
            return {
                status: 199
            }
        }
        expect(await getCIBA()).toEqual({})
        axios.get = async () => {
            return {
                status: 200
            }
        }
        expect(await getCIBA()).toBeUndefined()
        axios.get = async () => {
            return {
                status: 200,
                data: 'test'
            }
        }
        expect(await getCIBA()).toEqual('test')
    })
    test('getOneTalk', async () => {
        config.SWITCH = {}
        expect(await getOneTalk('动画')).toEqual({})
        config.SWITCH.oneTalk = true
        axios.get = async () => {
            throw new Error
        }
        expect(await getOneTalk('动画')).toEqual({})
        expect(await getOneTalk('xxx')).toEqual({})
        axios.get = async () => {
            return {
                status: 200,
                data: 'test'
            }
        }
        expect(await getOneTalk('动画')).toEqual('test')
    })
    test('getWordsFromApiShadiao', async () => {
        config.SWITCH.earthyLoveWords = true
        config.SWITCH.momentCopyrighting = true
        config.SWITCH.poisonChickenSoup = true
        expect(await getWordsFromApiShadiao('other')).toEqual('')
        axios.get = async () => {
            throw new Error
        }
        expect(await getWordsFromApiShadiao('chp')).toEqual('')
        axios.get = async () => {
            return {
                data: null
            }
        }
        expect(await getWordsFromApiShadiao('pyq')).toEqual('')
        axios.get = async () => {
            return null
        }
        expect(await getWordsFromApiShadiao('pyq')).toEqual('')

        axios.get = async () => {
            return {
                data: {
                    data: {
                        text: 'test'
                    }
                }
            }
        }
        expect(await getWordsFromApiShadiao('du')).toEqual('test')
        axios.get = async () => {
            return {
                data: {
                    data: {
                        text: '彩虹屁'
                    }
                }
            }
        }
        config.SWITCH = {}
        expect(await getEarthyLoveWords()).toEqual('')
        config.SWITCH.earthyLoveWords = true
        expect(await getEarthyLoveWords()).toEqual('彩虹屁')
        axios.get = async () => {
            return {
                data: {
                    data: {
                        text: '朋友圈文案'
                    }
                }
            }
        }
        config.SWITCH = {}
        expect(await getMomentCopyrighting()).toEqual('')
        config.SWITCH.momentCopyrighting = true
        expect(await getMomentCopyrighting()).toEqual('朋友圈文案')
        axios.get = async () => {
            return {
                data: {
                    data: {
                        text: '毒鸡汤'
                    }
                }
            }
        }
        config.SWITCH = {}
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
            date: '09-03'
        }])).toEqual('今天是 结婚纪念日 哦，要开心！ \n')
        config.FESTIVALS = [
            { type: '*生日', name: '老婆', year: '1999', date: '09-19', isShowAge: true },
            { type: '节日', name: '结婚纪念日', year: '2020', date: '09-03' },
            { type: '生日', name: '李四', year: '1996', date: '09-31', isShowAge: true },
            { type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01' }
        ]
        config.FESTIVALS_LIMIT = 4
        expect(getBirthdayMessage()).toEqual(`
今天是 结婚纪念日 哦，要开心！ 
距离 李四 的26岁生日还有28天 
距离 老婆 的23岁生日还有41天 
距离 被搭讪纪念日 还有363天 
`.trimStart())
        MockDate.reset()
        MockDate.set('2022-09-31')
        expect(getBirthdayMessage()).toEqual(`
今天是 李四 的26岁生日哦，祝李四生日快乐！ 
距离 老婆 的23岁生日还有13天 
距离 被搭讪纪念日 还有335天 
距离 结婚纪念日 还有337天 
`.trimStart())
        MockDate.reset()
        MockDate.set('1999-10-27')
        expect(getBirthdayMessage()).toEqual(`
今天是 老婆 的生日哦，祝老婆生日快乐！ 
距离 被搭讪纪念日 还有310天 
距离 结婚纪念日 还有312天 
距离 李四 的4岁生日还有340天 
`.trimStart())
        MockDate.reset()
        config.FESTIVALS_LIMIT = -1
        MockDate.set('2022-09-03')
        expect(getBirthdayMessage()).toEqual('')
        MockDate.reset()
        config.FESTIVALS_LIMIT = 4
        config.FESTIVALS = [
            { type: '测试日', name: '老婆', year: '1996', date: '09-02', isShowAge: true },
            { type: '测试日', name: '结婚纪念日', year: '2020', date: '09-03' },
            { type: '测试日', name: '李四', year: '1996', date: '09-31', isShowAge: true },
            { type: '测试日', name: '被搭讪纪念日', year: '2021', date: '09-01' }
        ]
        expect(getBirthdayMessage()).toEqual('')
        config.FESTIVALS = null
        expect(getBirthdayMessage()).toEqual('')
        MockDate.set('1999-10-28')
        config.FESTIVALS = [
            { type: '*生日', name: '老婆', year: '1999', date: '09-19', isShowAge: true },
            { type: '节日', name: '结婚纪念日', year: '2020', date: '09-03' },
            { type: '生日', name: '李四', year: '1996', date: '09-31', isShowAge: true },
            { type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01' }
        ]
        expect(getBirthdayMessage()).toEqual(`
距离 被搭讪纪念日 还有309天 
距离 结婚纪念日 还有311天 
距离 李四 的4岁生日还有339天 
距离 老婆 的生日还有365天 
`.trimStart())
    })
    test('getDateDiffList', () => {
        config.CUSTOMIZED_DATE_LIST = [
            // 在一起的日子
            { keyword: 'love_day', date: '2015-05-01' },
            // 结婚纪念日
            { keyword: 'marry_day', date: '2020-01-04' },
            // 退伍日, 不用可以删掉
            { keyword: 'ex_day', date: '2022-09-09' }
            // sakana日
            // {"keyword": "sakana_day", date: "2022-01-06"},
            // ...
        ]
        MockDate.set('2022-09-03 08:00:00')
        expect(getDateDiffList()).toEqual([{
            date: '2015-05-01',
            diffDay: 2683,
            keyword: 'love_day'
        }, {
            date: '2020-01-04',
            diffDay: 974,
            keyword: 'marry_day'
        }, {
            date: '2022-09-09',
            diffDay: 6,
            keyword: 'ex_day'
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
                keyword: 'lover_prattle', contents: [
                    '因为太喜欢你，所以看谁都像是情敌。',
                    '申请成为你爱里的永久居民。',
                    '你很傻，你很笨，可我还是很羡慕你，因为你有我',
                    '遇见你，就好像捡到了100斤的运气'
                ]
            },
            {
                keyword: 'test',
                contents: []
            }
        ]
        Math.random = () => 0
        expect(getSlotList()).toEqual([
            {
                keyword: 'encourage_oneself',
                contents: '你主要的问题在于读书太少而想得太多',
                checkout: '你主要的问题在于读书太少而想得太多'
            },
            {
                keyword: 'lover_prattle',
                contents: [
                    '因为太喜欢你，所以看谁都像是情敌。',
                    '申请成为你爱里的永久居民。',
                    '你很傻，你很笨，可我还是很羡慕你，因为你有我',
                    '遇见你，就好像捡到了100斤的运气'
                ],
                checkout: '因为太喜欢你，所以看谁都像是情敌。'
            },
            {
                keyword: 'test',
                contents: [],
                checkout: ''
            }
        ])
    })
    test('sendMessage', async () => {
        axios.post = async () => {
            throw new Error
        }
        expect(await sendMessage('templateId', { id: '123', name: 'me' }, 'accessToken', [{
            name: 'name1',
            value: 'value1',
            color: 'color1'
        }, {
            name: 'name2',
            value: 'value2',
            color: 'color2'
        }])).toEqual({
            name: 'me',
            success: false
        })
        axios.post = async () => {
            return {
                data: {
                    errcode: 0
                }
            }
        }
        expect(await sendMessage('templateId', { id: '123', name: 'me' }, 'accessToken', [{
            name: 'name1',
            value: 'value1',
            color: 'color1'
        }, {
            name: 'name2',
            value: 'value2',
            color: 'color2'
        }])).toEqual({
            name: 'me',
            success: true
        })
        axios.post = async () => {
            return {
                data: {
                    errcode: 40003
                }
            }
        }
        expect(await sendMessage('templateId', { id: '123', name: 'me' }, 'accessToken', [{
            name: 'name1',
            value: 'value1',
            color: 'color1'
        }, {
            name: 'name2',
            value: 'value2',
            color: 'color2'
        }])).toEqual({
            name: 'me',
            success: false
        })
        axios.post = async () => {
            return {
                data: {
                    errcode: 40036
                }
            }
        }
        expect(await sendMessage('templateId', { id: '123', name: 'me' }, 'accessToken', [{
            name: 'name1',
            value: 'value1',
            color: 'color1'
        }, {
            name: 'name2',
            value: 'value2',
            color: 'color2'
        }])).toEqual({
            name: 'me',
            success: false
        })
    })
    test('sendMessageReply', async () => {
        axios.post = async () => {
            throw new Error
        }
        expect(await sendMessageReply([
            { id: '123', name: 'me' },
            { id: '456', name: 'you' }
        ], 'accessToken', 'templateId', [{
            name: 'name1',
            value: 'value1',
            color: 'color1'
        }, {
            name: 'name2',
            value: 'value2',
            color: 'color2'
        }])).toEqual({
            failPostIds: 'me,you',
            failPostNum: 2,
            needPostNum: 2,
            successPostIds: '无',
            successPostNum: 0
        })
        axios.post = async () => {
            throw new Error
        }
        expect(await sendMessageReply([
            { id: '123', name: 'me' },
            { id: '456', name: 'you' }
        ], 'accessToken')).toEqual({
            failPostIds: 'me,you',
            failPostNum: 2,
            needPostNum: 2,
            successPostIds: '无',
            successPostNum: 0
        })
        axios.post = async () => {
            return {
                data: {
                    errcode: 0
                }
            }
        }
        expect(await sendMessageReply([
            { id: '123', name: 'me' },
            { id: '456', name: 'you' }
        ], 'accessToken', 'templateId', [{
            name: 'name1',
            value: 'value1',
            color: 'color1'
        }, {
            name: 'name2',
            value: 'value2',
            color: 'color2'
        }])).toEqual({
            failPostIds: '无',
            failPostNum: 0,
            needPostNum: 2,
            successPostIds: 'me,you',
            successPostNum: 2
        })
    })
    test('getPoetry', async () => {
        config.SWITCH = {}
        expect(await getPoetry()).toEqual({})
        config.SWITCH.poetry = true
        axios.get = async () => {
            throw new Error
        }
        expect(await getPoetry()).toEqual({})
        axios.get = async () => {
            return {
                data: {
                    status: 'failed'
                }
            }
        }
        expect(await getPoetry()).toEqual({})
        axios.get = async () => {
            return {}
        }
        expect(await getPoetry()).toEqual({})
        axios.get = async () => {
            return null
        }
        expect(await getPoetry()).toEqual({})
        axios.get = async () => {
            return {
                data: {
                    status: 'success'
                }
            }
        }
        expect(await getPoetry()).toEqual({
            author: '',
            content: '',
            dynasty: '',
            title: ''
        })
        axios.get = async () => {
            return {
                data: {
                    status: 'success',
                    data: {
                        content: '床前明月光',
                        origin: {
                            author: '李白',
                            dynasty: '唐',
                            title: '静夜思'
                        }
                    }
                }
            }
        }
        expect(await getPoetry()).toEqual({
            content: '床前明月光',
            author: '李白',
            dynasty: '唐',
            title: '静夜思'
        })
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
            throw new Error
        }
        config.IS_SHOW_COLOR = true
        expect(getConstellationFortune('09-02', '今日')).resolves.toEqual([{
            color: '#000000',
            value: '今日综合运势: 福星高照! 去争取自己想要的一切吧!',
            name: 'comprehensive_horoscope'
        }, {
            color: '#000000',
            value: '今日爱情运势: 福星高照! 去争取自己想要的一切吧!',
            name: 'love_horoscope'
        }, {
            color: '#000000',
            value: '今日事业学业: 福星高照! 去争取自己想要的一切吧!',
            name: 'career_horoscope'
        }, {
            color: '#000000',
            value: '今日财富运势: 福星高照! 去争取自己想要的一切吧!',
            name: 'wealth_horoscope'
        }, {
            color: '#000000',
            value: '今日健康运势: 福星高照! 去争取自己想要的一切吧!',
            name: 'healthy_horoscope'
        }])
        axios.get = async () => {
            return {
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
                    `
            }
        }
        expect(getConstellationFortune('09-02', '今日')).resolves.toEqual([{
            color: '#000000',
            value: '今日综合运势: 福星高照! 去争取自己想要的一切吧!',
            name: 'comprehensive_horoscope'
        }, {
            color: '#000000',
            value: '今日爱情运势: 单身的遇到一些契机，打开彼此的心扉。恋爱中的得到恋人行动上的重视，也会收到承诺的兑现。',
            name: 'love_horoscope'
        }])
    })
    test('getHolidaytts', async () => {
        config.SWITCH = {}
        expect(await getHolidaytts()).toEqual(null)
        config.SWITCH.holidaytts = true
        axios.get = async () => {
            throw new Error
        }
        expect(await getHolidaytts()).toEqual(null)
        axios.get = async () => {
            return {
                status: 200,
                data: {
                    code: 0,
                    tts: 'xxx'
                }
            }
        }
        expect(await getHolidaytts()).toEqual('xxx')
        axios.get = async () => {
            return {
                status: 200,
                data: {
                    code: 1,
                    tts: 'xxx'
                }
            }
        }
        expect(await getHolidaytts()).toEqual(null)
    })
})
