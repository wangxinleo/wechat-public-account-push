export const config = {
    // 公众号配置
    // 公众号appId
    // appId: "wxe01fac26b8d34c0b",
    appId: "wx1a1ad6c8238ced4d", // for test
    // 公众号appSecret
    // appSecret: "65d7f90aff8cd8a79c2812432cf5a723",
    appSecret: "c4a758f7458ba2a0905cdff7d228ebac", // for test
    // 模板消息id
    templateId: "5fM0r0zZG5jR292Ek1oTXdVgxtkdE0gsZ4aCrAtw4Is	",
    // 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如["wx1", "wx2"]
    user: ["oi-Mf5gQn-Hqg76ydp3RV39-1FB4"], // lordon
     
    // 信息配置
    // 所在省份
    province: "北京",
    // 所在城市
    city: "北京",
    // 生日，修改名字为对应需要显示的名字，如果生日为农历， type为 r
    birthdays: [
      {"name": "小兔子", "year": "1995", "date": "10-04", "type": 'new'},
      {"name": "大猪蹄子", "year": "1997", "date": "02-02", "type": 'new'},
    ],
    // 在一起的日子，格式同上
    loveDate: "2019-11-30",
    // 毕业时间
    graduateDate: "2022-06-25",
    // 结婚纪念日
    marryDate: "2022-08-09"
    }

/*
{{date.DATA}}  
城市：{{city.DATA}}  
天气：{{weather.DATA}}  
最低气温: {{min_temperature.DATA}}  
最高气温: {{max_temperature.DATA}}  
今天是我们恋爱的第{{love_day.DATA}}天
今天是我们结婚的第{{marry_day.DATA}}天
恭喜你已经步入社会{{graduate.DATA}}天
{{birthday_message.DATA}}

{{note_en.DATA}}  
{{note_ch.DATA}}
*/