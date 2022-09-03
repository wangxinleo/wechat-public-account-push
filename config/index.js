export const config = {
  /**
   * 公众号配置
   */

  // 公众号APP_ID
  APP_ID: "wx0209cb14a91f49fe",

  // 公众号APP_SECRET
  APP_SECRET: "6503e8dede4a47bebc9d66c321b09c38",

  /**
   * 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如
   * [
   *  {
   *    // 想要发送的人的名字
   *    name: "宝宝",
   *    // 扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
   *    id: "oYyrL6WQGsmFDnM0jkWAWfxOfmDc",
   *    // 你想对他发送的模板消息的模板ID
   *    useTemplateId: "K5uuBYCRK6yPG4PJeng1eN77RPUn_Rlw5N_Ia3T2OCs",
   *   }, 
   * ]
   */
  USERS: [
    {
      // 想要发送的人的名字
      name: "小魏",
      // 扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: "oYyrL6YRA4aM9YKFPIe8twmiakM4",
      // 你想对他发送的模板消息的模板ID
      useTemplateId: "K5uuBYCRK6yPG4PJeng1eN77RPUn_Rlw5N_Ia3T2OCs",
    }, 
  ],

  /**
   * 回调消息 相关，主要用来展示发送是否成功/失败的数据
   */

  // 回调消息模板id, 用来看自己有没有发送成功的那个模板
  CALLBACK_TEMPLATE_ID: "K5uuBYCRK6yPG4PJeng1eN77RPUn_Rlw5N_Ia3T2OCs",

  // 接收成功回调消息的微信号，（一般来说只填自己的微信号, name填不填无所谓）
  CALLBACK_USERS: [
    {
      // 一般都填自己
      name: "自己",
      // 自己的微信id，扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: "oYyrL6YRA4aM9YKFPIe8twmiakM4",
    }, 
  ],
    
  /**
   * 信息配置
  /** 天气相关 */
  #和风天气apikey
  "weather key":"1636a0bc21824f90927ed0e4eb98974b",
  #天行数apike 
  "tian aci":"12cbca4b4b639e0006d3dc90aef41509",
  #所在地区，可为省，城市，区，县，同时支持国外城市，例如伦敦(国外城市可能获取不到pm2.5，空气质量，今日建议等数提 
  "region”:"淮滨"

  // 所在省份
  PROVINCE: "河南",
  // 所在城市
  CITY: "信阳",

  /** 重要节日相关 */

  /**
   * 重要节日，修改名字为对应需要显示的名字, data 仅填月日即可, 请严格按照示例填写
   * tpye必须填！ 只能 “生日” 和 “节日” 二选一!
   * 生日时，name填写想要展示的名字，你可以填“美丽可爱亲亲老婆”
   * 节日时，name填写相应展示的节日，你可以填“被搭讪纪念日”
   */
  FESTIVALS: [
    {"type": "生日", "name": "璐璐", "year": "2003", "date": "01-12"},
    {"type": "节日", "name": "在一起", "year": "2022", "date": "03-21"},
    {"type": "生日", "name": "小魏", "year": "2003", "date": "12-23"},
    {"type": "节日", "name": "认识", "year": "2021", "date": "11-24"},
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
    LOVE_DATE: "2022-03-21",
    // 认识纪念日
    meet_DATE: "2021-11-24"
  ],

  /** 插槽 */

  /** 你可以在这里写超多的你想显示的内容了！
    * keyword是指暴露给测试号的模板字段，填什么就暴露什么, 请注意不要和README的出参表中的字段重复。
    * 比如：keyword: "lover_prattle" ，在测试号中就是 {{ lover_prattle.DATA }} 
    * */
  SLOT_LIST: [
    // 这样配置的话，就会每次发送这句话
    {"keyword": "encourage_oneself", contents: "那就在一起，晨昏与四季"},
    // 这样配置的话，就会每次随机选一句话发送
    {"keyword": "lover_prattle", contents: [
      "当我凝望你眼眸，爱意撒满整个宇宙",
      "你的眼睛真好看，里面有晴雨，日月，山川，江河，云雾，花鸟",
      "我在人间贩卖黄昏，只为收集世间美好奔向你。",
      "山野千里，你是我藏在星星里的浪漫。",
      "云中有个小卖铺，贩卖着黄昏和温柔",
      "我爱你，你要记得我. ",
      "那就在一起，晨昏与四季",      
      "和你、今年、明年、年年 --",
      "你和夏天一起来了。",
      "小手一牵 岁岁年年",
      "好好生活 好好爱你",
      "喜欢海，喜欢花，喜欢日出和日落，浪漫的年纪别活的太无趣。",
      "冰箱里送上鲜花，那是生活慷慨的幻想学家。",
      "把温柔碾碎，放入生活的缝隙中。",
      "如果尚有余力，就去保护美好的东西",
      "万物皆有裂痕，那是光照进来的地方",
      "总有人山高路远 为你而来 -- ",
      "蓄谋已久，得偿所愿 --",
      "一屋两人三餐四季。",
      "申请成为你爱里的永久居民。",
    ]},
  ],

  /** 每日一言 */
  // 金句中文，如果为空，默认会读取金山的每日金句
    "note ch"："",
  // 金句英文 
    "note_en":""
  // 好文节选的内容类型
  // 可以填写【动画，漫画，游戏，小说，原创，网络，其他】； 随机则填写 ""
  LITERARY_PREFERENCE: "当我凝望你眼眸，爱意撒满整个宇宙"

}
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
// {{note_en.DATA}}

// 共推送 {{need_post_num.DATA}}  人
// 成功: {{success_post_num.DATA}} | 失败: {{fail_post_num.DATA}}
// 成功用户: {{success_post_ids.DATA}}
// 失败用户: {{fail_post_ids.DATA}}
