import { jest } from '@jest/globals'

jest.mock('axios')
jest.mock('../config/index.js')
import axios from 'axios'
import { config } from '../config/index.js'

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
    getPoetry
} from '../src/services'
import MockDate from 'mockdate'

describe('services', () => {
    test('getWeather', async () => {
        expect(await getWeather('', '')).toBeNull()
        axios.get = async () => {
            return {
                status: 200,
                data: 'var cityDZ101010100 = {"weatherinfo":{"city":"101010100","cityname":"北京","fctime":"202209030800","temp":"27℃","tempn":"19℃","weather":"小雨","weathercode":"d7","weathercoden":"n7","wd":"南风","ws":"<3级"}};var alarmDZ101010100 = {"w":[]}'
            }
        }
        expect(await getWeather('北京', '北京')).not.toBeNull()
        axios.get = async () => {
            return {
                status: 199
            }
        }
        expect(await getWeather('北京', '北京')).toBeNull()
        axios.get = async () => {
            return {
                status: 200,
                data: 'a=;'
            }
        }
        expect(await getWeather('北京', '北京')).toBeNull()
        axios.get = async () => {
            return {
                status: 200,
                data: 'a=123;'
            }
        }
        expect(await getWeather('北京', '北京')).toBeNull()
        axios.get = async () => {
            throw new Error
        }
        expect(await getWeather('北京', '北京')).toBeNull()
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
        expect(await getAccessToken()).toEqual('123456')
    })
    test('getCIBA', async function () {
        axios.get = async () => {
            throw new Error
        }
        expect(await getCIBA()).toBeNull()
        axios.get = async () => {
            return {
                status: 199
            }
        }
        expect(await getCIBA()).toBeNull()
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
        axios.get = async () => {
            throw new Error
        }
        expect(await getOneTalk('动画')).toBeNull()
        expect(await getOneTalk('xxx')).toBeNull()
        axios.get = async () => {
            return {
                status: 200,
                data: 'test'
            }
        }
        expect(await getOneTalk('动画')).toEqual('test')
    })
    test('getWordsFromApiShadiao', async () => {
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
            return {
                data: {
                    data: null
                }
            }
        }
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
        expect(await getPoisonChickenSoup()).toEqual('毒鸡汤')
    })
    test('getBirthdayMessage', () => {
        config.FESTIVALS = [
            { type: '*生日', name: '老婆', year: '1999', date: '09-19' },
            { type: '节日', name: '结婚纪念日', year: '2020', date: '09-03' },
            { type: '生日', name: '李四', year: '1996', date: '09-31' },
            { type: '节日', name: '被搭讪纪念日', year: '2021', date: '09-01' }
        ]
        config.FESTIVALS_LIMIT = 4
        MockDate.set('2022-09-03')
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
            { type: '测试日', name: '老婆', year: '1996', date: '09-02' },
            { type: '测试日', name: '结婚纪念日', year: '2020', date: '09-03' },
            { type: '测试日', name: '李四', year: '1996', date: '09-31' },
            { type: '测试日', name: '被搭讪纪念日', year: '2021', date: '09-01' }
        ]
        expect(getBirthdayMessage()).toEqual('')
        config.FESTIVALS = null
        expect(getBirthdayMessage()).toEqual('')
        MockDate.set('1999-10-28')
        config.FESTIVALS = [
            { type: '*生日', name: '老婆', year: '1999', date: '09-19' },
            { type: '节日', name: '结婚纪念日', year: '2020', date: '09-03' },
            { type: '生日', name: '李四', year: '1996', date: '09-31' },
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
            { keyword: 'ex_day', date: '2022-08-31' }
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
            date: '2022-08-31',
            diffDay: 4,
            keyword: 'ex_day'
        }])
        MockDate.reset()
    })
    test('getSlotList', () => {
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
    })
    test('sendMessageReply', async () => {
        axios.post = async () => {
            throw new Error
        }
        expect(await sendMessageReply([
            { id: '123', name: 'me' },
            { id: '456', name: 'you' }
        ],'accessToken','templateId', [{
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
        ],'accessToken')).toEqual({
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
        ],'accessToken','templateId', [{
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
        axios.get = async () => {
            throw new Error
        }
        expect(await getPoetry()).toEqual(null)
        axios.get = async () => {
            return {
                data: {
                    status: 'failed'
                }
            }
        }
        expect(await getPoetry()).toEqual(null)
        axios.get = async () => {
            return {}
        }
        expect(await getPoetry()).toEqual(null)
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
})
