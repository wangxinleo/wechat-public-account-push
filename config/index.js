export const config = {
    /**
     * 公众号配置
     */

    // 公众号APP_ID
    APP_ID: "wx1a1ad6c8238ced4d",
    // 公众号APP_SECRET
    APP_SECRET: "c4a758f7458ba2a0905cdff7d228ebac",

    // 模板消息id
    TEMPLATE_ID: "c4a758f7458ba2a0905cdff7d228ebac",

    // 回调消息模板id, 用来看自己有没有发送成功的那个模板
    CALLBACK_TEMPLATE_ID: "c4a758f7458ba2a0905cdff7d228ebac",


    /**
     * 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如
     * [
     *   {name: '老婆0', id: "ohxOO6VskYv0Kuf-ywIZVRMpuXhk"}, 
     *   {name: '老婆1', id: "2hxOO6VskYv0Kuf-y你懂的,填错狗头打烂RMpuXhk"},
     * ]
     */
    USERS: [
      {name: '雪婷', id: "oi-Mf5hv4XAkssvXHqJu9oFz0RZE"}, 
    ],
    // 接收成功回调消息的微信号，（一般来说只填自己的微信号, name填不填无所谓）
    CALLBACK_USERS: [
      {name: '自己',id: "oi-Mf5gQn-Hqg76ydp3RV39-1FB4"}, 
    ],
     
    /**
     * 信息配置
     */

    /** 天气相关 */

    // 所在省份
    PROVINCE: "北京",
    // 所在城市
    CITY: "北京",

    /** 重要节日相关 */

    /**
     * 重要节日，修改名字为对应需要显示的名字, data 仅填月日即可, 请严格按照示例填写
     * tpye必须填！ 只能 “生日” 和 “节日” 二选一!
     * 生日时，name填写想要展示的名字，你可以填“美丽可爱亲亲老婆”
     * 节日时，name填写相应展示的节日，你可以填“被搭讪纪念日”
     */
    FESTIVALS: [
      {"type": "生日", "name": "老婆", "year": "1995", "date": "10-13"},
      {"type": "节日", "name": "结婚纪念日", "year": "2022", "date": "09-09"},
      {"type": "生日", "name": "自己", "year": "1997", "date": "02-02"},
      {"type": "节日", "name": "在一起", "year": "2019", "date": "11-30"},
    ],

    /**
     * 限制重要节日的展示条目, 需要填写数字; 
     * 如果为3, 则仅展示“将要到达” 的3个重要节日提醒，剩下的将被忽略
     * 如果为0, 则默认展示全部
     */
    FESTIVALS_LIMIT: 4,

    /** 日期相关 */

    /** 你现在可以随心增加你认为的所有的需要纪念的日子啦！
      * keyword是指暴露给测试号的模板字段，填什么就暴露什么, 请注意不要和README的出参表中的字段重复。
      * 比如：keyword: "love_date" ，在测试号中就是 {{ love_date.DATA }} 
      * */
    CUSTOMIZED_DATE_LIST: [
      // 在一起的日子
      {"keyword": "love_day", date: "2019-11-30"},
      // 结婚纪念日
      {"keyword": "marry_day", date: "2022-09-09"},
      // 结婚纪念日
      {"keyword": "graduate_day", date: "2022-06-25"},
      // 退伍日, 不用可以删掉
      // {"keyword": "ex_day", date: "2022-08-31"},
      // sakana日
      // {"keyword": "sakana_day", date: "2022-01-06"},
      // ... 
    ],

    /** 插槽 */

    /** 你可以在这里写超多的你想显示的内容了！
      * keyword是指暴露给测试号的模板字段，填什么就暴露什么, 请注意不要和README的出参表中的字段重复。
      * 比如：keyword: "lover_prattle" ，在测试号中就是 {{ lover_prattle.DATA }} 
      * */
    SLOT_LIST: [
      // 这样配置的话，就会每次发送这句话
      {"keyword": "encourage_oneself", contents: "你主要的问题在于读书太少而想得太多"},
      // 这样配置的话，就会每次随机选一句话发送
      {"keyword": "lover_prattle", contents: [
        "因为太喜欢你，所以看谁都像是情敌。",
        "申请成为你爱里的永久居民。",
        "你很傻，你很笨，可我还是很羡慕你，因为你有我",
        "遇见你,就好像捡到了100斤的运气",
      ]},
    ],

    /** 每日一言 */

    // 好文节选的内容类型
    // 可以填写【动画，漫画，游戏，小说，原创，网络，其他】； 随机则填写 ""
    LITERARY_PREFERENCE: ""


    }

/*
{{date.DATA}} 
当前城市：{{city.DATA}} 
今天天气：{{weather.DATA}} 
今天最低气温: {{min_temperature.DATA}} 
今天最高气温: {{max_temperature.DATA}} 
今天是我们恋爱的第 {{love_day.DATA}} 天 
我们还有 {{marry_day.DATA}} 天就结婚啦 
恭喜冬冬步入社会 {{graduate_day.DATA}} 天 
{{birthday_message.DATA}}
{{note_en.DATA}} 
{{note_ch.DATA}} 
{{one_talk.DATA}} 
{{talk_from.DATA}}

        { name: toLowerLine('minTemperature'), value: minTemperature, color: getColor() },
        { name: toLowerLine('maxTemperature'), value: maxTemperature, color: getColor() },
        { name: toLowerLine('windDirection'), value: windDirection, color: getColor() },
        { name: toLowerLine('windScale'), value: windScale, color: getColor() },
        { name: toLowerLine('loveDay'), value: loveDay, color: getColor() },
        { name: toLowerLine('marryDay'), value: marryDay, color: getColor() },
        { name: toLowerLine('graduateDay'), value: graduateDay, color: getColor() },
        { name: toLowerLine('birthdayMessage'), value: birthdayMessage, color: getColor() },
        { name: toLowerLine('noteEn'), value: noteEn, color: getColor() },
        { name: toLowerLine('noteCh'), value: noteCh, color: getColor() },
*/



// 共推送 {{need_post_num.DATA}}  人
// 成功: {{success_post_num.DATA}} | 失败: {{fail_post_num.DATA}}
// 成功用户: {{success_post_ids.DATA}}
// 失败用户: {{fail_post_ids.DATA}}