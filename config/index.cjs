/* eslint-disable */

/**
 * 此项目配置为方便新人使用，已缩减至最简配置。
 * 如若想使用更多功能，请查考文档中的 【3. config参数说明】 
 * 自行添加属性，以支持更多个性化功能
 */
const USER_CONFIG = {

  // 使用微信测试号：公众号APP_ID
  APP_ID: 'wx775648c194be5508',

  // 使用微信测试号：公众号APP_SECRET
  APP_SECRET: '1ccfda75c9e3e36c0a932cbedfd74761',

  PROVINCE: ' ',
  CITY: '福清市',

  USERS: [
    {
      // 想要发送的人的名字
      name: '世界上最漂亮的林七七小仙女',
      // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'oZIu45htGZ5HPECg66amBXj3LJfQ',
      // 使用微信测试号：你想对他发送的模板消息的模板ID
      useTemplateId: 'GquUw7_ioPRWMszy7pQkjq9dH7MF93M3hDdYoSJE7Zo',
      // 新历生日, 仅用作获取星座运势, 格式必须为MM-DD
      horoscopeDate: '12-17',
      festivals: [
        // 注意：此条配置日期为阴历日期，因为`type`中 “生日” 之前有 * 符号
        {
          type: '*生日', name: '海星', year: '1997', date: '11-18',
        },
        // 注意：此条配置日期为阳历日期，因为`type`中 “生日” 之前没有 * 符号
        {
          type: '*生日', name: '林七七小仙女', year: '1998', date: '06-18',
        },
        {
          type: '节日', name: '【06.24】', year: '2010', date: '06-24',
        },
      ],
    },
  ],

 {
    id: 'RBZEg7RMIavVw8zmXwYWpCYZI9N1UPKaoZjAhKbjEDI',
    title: '推送完成提醒',
    desc: `
      服务器信息：{{post_time_zone.DATA}} {{post_time.DATA}}
      
      ---
      
      共推送 {{need_post_num.DATA}} 人
      
      成功: {{success_post_num.DATA}} | 失败: {{fail_post_num.DATA}}
      
      成功用户: {{success_post_ids.DATA}}
      
      失败用户: {{fail_post_ids.DATA}}
    `
  },
]

module.exports = TEMPLATE_CONFIG
