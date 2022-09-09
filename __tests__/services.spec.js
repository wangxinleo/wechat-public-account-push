import { jest } from '@jest/globals'

import axios from 'axios'
import { config } from '../config/index.js'

jest.mock('axios')
jest.mock('../config/index.js')

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
    getFlattenConstellationFortune
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
    test('get(Flatten)ConstellationFortune', async () => {
        config.CONSTELLATION_FORTUNE = [{"date": "09-02", "name": "老婆0"}]
        axios.get = async () => {
            throw new Error
        }
        expect(getConstellationFortune()).rejects.toEqual(new Error)
        axios.get = async () => {
            return {
                data: `
<html lang="en"><body><div class="c_cont"><p><strong class="p1">综合运势</strong><span>在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。<small>星T座T屋</small></span></p><p><strong class="p2">爱情运势</strong><span>大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。</span></p><p><strong class="p3">事业学业</strong><span>天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐心。</span></p><p><strong class="p4">财富运势</strong><span>你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的能量，寓意天蝎们在2022年活力十足，财气顺遂。</span></p><p><strong class="p5">健康运势</strong><span>部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。</span></p></div></body></html>
                    `
            }
        }
        expect(getConstellationFortune()).resolves.toEqual([{
            key: '老婆0', value: [{
                key: '今日',
                value: [{
                    key: '综合运势',
                    value: '在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些' +
                        '疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案' +
                        '组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。'
                }, {
                    key: '爱情运势',
                    value: '大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。'
                }, {
                    key: '事业学业',
                    value: '天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐' +
                        '心。'
                }, {
                    key: '财富运势',
                    value: '你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可' +
                        '佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的' +
                        '能量，寓意天蝎们在2022年活力十足，财气顺遂。'
                }, {
                    key: '健康运势',
                    value: '部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。'
                }]
            }, {
                key: '明日',
                value: [{
                    key: '综合运势',
                    value: '在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些' +
                        '疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案' +
                        '组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。'
                }, {
                    key: '爱情运势',
                    value: '大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。'
                }, {
                    key: '事业学业',
                    value: '天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐' +
                        '心。'
                }, {
                    key: '财富运势',
                    value: '你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可' +
                        '佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的' +
                        '能量，寓意天蝎们在2022年活力十足，财气顺遂。'
                }, {
                    key: '健康运势',
                    value: '部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。'
                }]
            }, {
                key: '本周',
                value: [{
                    key: '综合运势',
                    value: '在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些' +
                        '疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案' +
                        '组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。'
                }, {
                    key: '爱情运势',
                    value: '大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。'
                }, {
                    key: '事业学业',
                    value: '天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐' +
                        '心。'
                }, {
                    key: '财富运势',
                    value: '你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可' +
                        '佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的' +
                        '能量，寓意天蝎们在2022年活力十足，财气顺遂。'
                }, {
                    key: '健康运势',
                    value: '部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。'
                }]
            }, {
                key: '本月',
                value: [{
                    key: '综合运势',
                    value: '在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些' +
                        '疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案' +
                        '组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。'
                }, {
                    key: '爱情运势',
                    value: '大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。'
                }, {
                    key: '事业学业',
                    value: '天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐' +
                        '心。'
                }, {
                    key: '财富运势',
                    value: '你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可' +
                        '佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的' +
                        '能量，寓意天蝎们在2022年活力十足，财气顺遂。'
                }, {
                    key: '健康运势',
                    value: '部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。'
                }]
            }, {
                key: '今年',
                value: [{
                    key: '综合运势',
                    value: '在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些' +
                        '疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案' +
                        '组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。'
                }, {
                    key: '爱情运势',
                    value: '大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。'
                }, {
                    key: '事业学业',
                    value: '天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐' +
                        '心。'
                }, {
                    key: '财富运势',
                    value: '你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可' +
                        '佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的' +
                        '能量，寓意天蝎们在2022年活力十足，财气顺遂。'
                }, {
                    key: '健康运势',
                    value: '部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。'
                }]
            }]
        }])
        expect(getFlattenConstellationFortune()).resolves.toEqual([{"key": "老婆0_今日_综合运势", "value": "在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。"}, {"key": "老婆0_今日_爱情运势", "value": "大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。"}, {"key": "老婆0_今日_事业学业", "value": "天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐心。"}, {"key": "老婆0_今日_财富运势", "value": "你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的能量，寓意天蝎们在2022年活力十足，财气顺遂。"}, {"key": "老婆0_今日_健康运势", "value": "部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。"},{"key": "老婆0_明日_综合运势", "value": "在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。"}, {"key": "老婆0_明日_爱情运势", "value": "大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。"}, {"key": "老婆0_明日_事业学业", "value": "天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐心。"}, {"key": "老婆0_明日_财富运势", "value": "你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的能量，寓意天蝎们在2022年活力十足，财气顺遂。"}, {"key": "老婆0_明日_健康运势", "value": "部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。"},{"key": "老婆0_本周_综合运势", "value": "在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。"}, {"key": "老婆0_本周_爱情运势", "value": "大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。"}, {"key": "老婆0_本周_事业学业", "value": "天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐心。"}, {"key": "老婆0_本周_财富运势", "value": "你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的能量，寓意天蝎们在2022年活力十足，财气顺遂。"}, {"key": "老婆0_本周_健康运势", "value": "部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。"},{"key": "老婆0_本月_综合运势", "value": "在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。"}, {"key": "老婆0_本月_爱情运势", "value": "大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。"}, {"key": "老婆0_本月_事业学业", "value": "天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐心。"}, {"key": "老婆0_本月_财富运势", "value": "你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的能量，寓意天蝎们在2022年活力十足，财气顺遂。"}, {"key": "老婆0_本月_健康运势", "value": "部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。"},{"key": "老婆0_今年_综合运势", "value": "在2022年，你会持续地感受到家庭对你带来的影响，你的生活环境会变得更加舒适，内心也会随之放松许多。但是，一些天蝎比较容易在家庭中投入较大的金额，从而出现入不敷出的情况，这可能会让你变得有些疲惫。天蝎座2022年可佩戴一个哈迪斯冥王星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣而成，项链上有“Hades”字母，代表天蝎座的守护神冥王哈迪斯，环扣上由天蝎座符号和守护星“冥王星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着天蝎们在2022年里勇往直前、顺风顺水。"}, {"key": "老婆0_今年_爱情运势", "value": "大部分已经有伴的天蝎都能在情感方面也能得到不错的好运，获得较多的安全感，或者是跟恋人之间的情感能够有更多浪漫温馨的表达。还在单身的小伙伴们也有机会邂逅自己所爱的人，开始一段新的感情。"}, {"key": "老婆0_今年_事业学业", "value": "天蝎们的事业学业整体而言处于四平八稳的状态。一些比较有挑战性的项目亟待处理，但你的人脉资源和智慧足以完美解决它们，还在读书的小伙伴们会处理一些比较繁琐的作业和课题，需要大家对它们多一些耐心。"}, {"key": "老婆0_今年_财富运势", "value": "你今年在财富方面还是有不少收获的，但是这样的收获并没有那么稳固，需要防止大进大出的情况出现。在投资理财方面的投资更需要多加谨慎，虽然能够赚钱，但起起伏伏的行情也非常考验心态。天蝎座今年可佩戴一串虎眼石银曜安卡宝懿手链来提升金钱指数，此手链由天蝎座今年的财富主石银曜石与虎眼石构成；其中男款宝石为银曜石与黄虎眼组合而成，女款宝石则为银曜石与红虎眼组成；而安卡乃古埃及的生命之符，象征无限与永恒的能量，寓意天蝎们在2022年活力十足，财气顺遂。"}, {"key": "老婆0_今年_健康运势", "value": "部分天蝎会在今年出现心情低落、沮丧的情况，建议大家平时多多放松自己，不要过于紧张，必要时记得要去看医生哦。"}])
    })
})
