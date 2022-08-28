export const config = {
    // 公众号配置
    // 公众号appId
    appId: "wxe01fac26b8d34c0b",
    // 公众号appSecret
    appSecret: "65d7f90aff8cd8a79c2812432cf5a723",
    // 模板消息id
    templateId: "MJ7nYyy4Bhtm4EldImvn8PCexk1pwulyffP_TMM0lXs",
    // 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如["wx1", "wx2"]
    user: ["oi-Mf5gQn-Hqg76ydp3RV39-1FB4"],
     
    // 信息配置
    // 所在省份
    province: "北京",
    // 所在城市
    city: "石景山",
    // 生日，修改名字为对应需要显示的名字，如果生日为农历， type为 r
    birthdays: [
      {"name": "老婆", "year": "1995", "date": "10-04", "type": 'new'},
      {"name": "家公", "year": "1997", "date": "08-09", "type": 'new'},
    ],
    // 在一起的日子，格式同上
    loveDate: "2019-11-31",
    // 结婚纪念日
    marryDate: "2022-06-09"
    }

// {{date.DATA}}  
// 城市：{{city.DATA}}  
// 天气：{{weather.DATA}}  
// 最低气温: {{min_temperature.DATA}}  
// 最高气温: {{max_temperature.DATA}}  
// 今天是我们恋爱的第{{love_day.DATA}}天
// 今天是我们结婚的第{{marry_day.DATA}}天
// {{birthday_message.DATA}}

// {{note_en.DATA}}  
// {{note_ch.DATA}}