export const config = {
    // 公众号配置
    // 公众号appId
    appId: "wx40945564254b7fd1",
    // 公众号appSecret
    appSecret: "78cc1987b9de710c6cc16bdc44e195fe",
    // 模板消息id
    templateId: "QnDgAXjBbmwWMrmtOq7g5afWdnodOMVrhS-Mi3kW5J0",
    // 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如["wx1", "wx2"]
    user: ["潘多拉魔盒",],
     
    // 信息配置
    // 所在省份
    province: "安徽",
    // 所在城市
    city: "安庆",
    // 生日，修改名字为对应需要显示的名字，如果生日为农历， type为 r
    birthdays: [
      {"name": "兰兰", "year": "2003", "date": "12-05", "type": 'r'},
      {"name": "涛涛", "year": "2001", "date": "08-28", "type": 'r'},
    ],
    // 在一起的日子，格式同上
    loveDate: "2022-08-21",
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
