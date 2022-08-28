export const config = {
    /**
     * 公众号配置
     */

    // 公众号APP_ID
    APP_ID: "wx1a1ad6c8238ced4d",
    // 公众号APP_SECRET
    APP_SECRET: "c4a758f7458ba2a0905cdff7d228ebac",
    // 模板消息id
    TEMPLATE_ID: "UzGvye9sn4zmEK_irwvgQUgPM0GySPSzC70KhKcXoew",
    // 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如["wx1", "wx2"]
    USERS: ["oi-Mf5gQn-Hqg76ydp3RV39-1FB4",// lordon
            "oi-Mf5hv4XAkssvXHqJu9oFz0RZE" // sharry liu
            ],
     
    /**
     * 信息配置
     */

    /** 天气相关 */

    // 所在省份
    PROVINCE: "北京",
    // 所在城市
    CITY: "北京",

    /** 生日相关 */

    // 生日，修改名字为对应需要显示的名字, data 仅填月日即可, 请严格按照示例填写
    BIRTHDAYS: [
      {"name": "小兔子", "year": "1995", "date": "10-13", "type": 'new'},
      // {"name": "小兔子农历生日", "year": "1995", "date": "12-04", "type": 'r'},
      {"name": "猪蹄子", "year": "1997", "date": "02-02", "type": 'new'},
      // {"name": "猪蹄子农历生日", "year": "1996", "date": "12-25", "type": 'r'}
    ],

    /** 日期相关 */

    // 在一起的日子，格式同上
    LOVE_DATE: "2019-11-30",
    // TODO:毕业时间
    GRADUATE_Date: "2022-06-25",
    // 结婚纪念日
    MARRY_DATE: "2022-09-09",

    /** 好文节选 */

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