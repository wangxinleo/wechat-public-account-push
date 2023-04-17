/* eslint-disable */

/**
 * 此项目配置为方便新人使用，已缩减至最简配置。
 * 如若想使用更多功能，请查考文档中的 【3. config参数说明】 
 * 自行添加属性，以支持更多个性化功能
 */
const USER_CONFIG = {

  // 使用微信测试号：公众号APP_ID
  APP_ID: 'wx0e1fb9e9c7186c9b',

  // 使用微信测试号：公众号APP_SECRET
  APP_SECRET: '3906ce13743b5285d1f38284ef4ac5bb',

  PROVINCE: '四川',
  CITY: '成都',

  USERS: [
    {
      // 想要发送的人的名字
      name: '宝贝',
      // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: '3906ce13743b5285d1f38284ef4ac5bb',
      // 使用微信测试号：你想对他发送的模板消息的模板ID
      useTemplateId: 'oHpO5NJSPUwQ21sx-0JXzSJpGVtoGXz-Y8k2S2q3zd8',
      // 新历生日, 仅用作获取星座运势, 格式必须为MM-DD
      horoscopeDate: '07-17',
      festivals: [
        // 注意：此条配置日期为阴历日期，因为`type`中 “生日” 之前有 * 符号
        {
          type: '*生日', name: '宝贝', year: '2005', date: '06-12',
        },
        // 注意：此条配置日期为阳历日期，因为`type`中 “生日” 之前没有 * 符号
        {
          type: '生日', name: '宝贝', year: '2005', date: '07-17',
        },
        {
          type: '节日', name: '相识纪念日', year: '2022', date: '04-20',
        },
      ],
      // 我们在一起已经有xxxx天了的配置
      customizedDateList: [
        // 在一起的日子
        { keyword: 'love_day', date: '2022-05-01' },
        // 相见日
        { keyword: 'meet_day', date: '2023-07-17' },
      ],
    },
  ],


  // 【推送完成提醒】模板id, 用来看自己有没有发送成功的那个模板
  CALLBACK_TEMPLATE_ID: 'oHpO5NJSPUwQ21sx-0JXzSJpGVtoGXz-Y8k2S2q3zd8',

  CALLBACK_USERS: [
    {
      name: '自己',
      // 使用微信测试号：自己的微信id，扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'oU6315oODIcBTf2BtLcIS-QdevN4',
    }
  ],

}

module.exports = USER_CONFIG

