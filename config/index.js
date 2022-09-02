export const config = {
    /**
     * 公众号配置
     */

    // 公众号APP_ID
    APP_ID: "wx0209cb14a91f49fe",

    // 公众号APP_SECRET
    APP_SECRET: "6503e8dede4a47bebc9d66c321b09c385",

    // 模板消息id
    TEMPLATE_ID: "KWpwOR-Y6Ss954Yyw12u7bARaQZoXa21pWvE8k3IeVc",

    // 回调消息模板id, 用来看自己有没有发送成功的那个模板
    CALLBACK_TEMPLATE_ID: "KWpwOR-Y6Ss954Yyw12u7bARaQZoXa21pWvE8k3IeVc",

    // 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如
    // [{
    //   name: "00",
    //   id: "wyy13598180021"
    // }]
    USERS: [
      {name: 'zowoo-', id: "ZLL19932003"},    
    ],
    // 接收成功回调消息的微信号，（一般来说只填自己的微信号, name填不填无所谓）
    CALLBACK_USERS: [
      {name: '自己',id: "wyy13598180021"}, 
    ],
     
    /**
     * 信息配置
     */

    /** 天气相关 */
    
    // 所在省份
    PROVINCE: "河南",
    // 所在城市
    CITY: "淮滨",

    /** 重要节日相关 */

    // 重要节日，修改名字为对应需要显示的名字, data 仅填月日即可, 请严格按照示例填写
    // tpye必须填！ 只能 “生日” 和 “节日” 二选一!
    // 生日时，name填写想要展示的名字，你可以填“美丽可爱亲亲老婆”
    // 节日时，name填写相应展示的节日，你可以填“被搭讪纪念日”
    FESTIVALS: [
      {"type": "生日", "name": "璐璐", "year": "2003", "date": "01-12"},
      {"type": "节日", "name": "在一起", "year": "2022", "date": "03-21"},
      {"type": "生日", "name": "小魏", "year": "2003", "date": "12-23"},
      {"type": "节日", "name": "认识", "year": "2021", "date": "11-24"},
    ],
    // 限制重要节日的展示条目, 需要填写数字; 
    // 如果为3, 则仅展示“将要到达” 的3个重要节日提醒，剩下的将被忽略
    // 如果为0, 则默认展示全部
    FESTIVALS_LIMIT: 3,

    /** 日期相关 */

    // 在一起的日子，格式同上
    LOVE_DATE: "2022-03-21",
    // 认识纪念日
    meet_DATE: "2021-11-24",


    /** 每日一言 */

    // 好文节选的内容类型
    // 可以填写【动画，漫画，游戏，小说，原创，网络，其他】； 随机则填写 "note"
LITERARY_PREFERENCE:"{{当我凝望你眼眸，爱意撒满整个宇宙。},{你的眼睛真好看，里面有晴雨，日月，山川，江河，云雾，花鸟。},{我在人间贩卖黄昏，只为收集世间美好奔向你。},{山野千里，你是我藏在星星里的浪漫。},{云中有个小卖铺，贩卖着黄昏和温柔},{我爱你，你要记得我. },{那就在一起，晨昏与四季}，{和你、今年、明年、年年 --  }，{你和夏天一起‎来‎了。}，{“小手一牵 岁岁年年”}，{好好生活 好好爱你 }，{喜欢海，喜欢花，喜欢日出和日落，浪漫的年纪别活的太无趣。}，{冰箱里送上鲜花，那是生活慷慨的幻想学家。}，{把温柔碾碎，放入生活的缝隙中。}，{如果尚有余力，就去保护美好的东西},{万物皆有裂痕，那是光照进来的地方},{总有人山高路远 为你而来 --  },{蓄谋已久，得偿所愿 --  },{一屋两‎人三‎餐‎四季。}}"
    

    }
// {{note_en.DATA}} 
// {{LITERARY_PREFERENCE.DATA}} 

// 日期：{{date.DATA}}  
// 城市：{{city.DATA}}  
// 天气：{{weather.DATA}}  
// 最低气温: {{min_temperature.DATA}}  
// 最高气温: {{max_temperature.DATA}}  
// 风向:{{winddir.DATA}} 
// 风力:{{windclass.DATA}} 
// 今天是我们恋爱的第{{love_day.DATA}}天
// 今天是我们认识的第{{meet_day.DATA}}天
// 距离璐璐生日还有{{birthday_day.DATA}}天
// 距离小魏生日还有{{birthday_day.DATA}}天
// {{早安.DATA}}  

// {{note_ch.DATA}}

// 共推送 {{need_post_num.DATA}}  人
// 成功: {{success_post_num.DATA}} | 失败: {{fail_post_num.DATA}}
// 成功用户: {{success_post_ids.DATA}}
// 失败用户: {{fail_post_ids.DATA}}
