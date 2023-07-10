/* eslint-disable */

/**
 * 此项目配置为方便新人使用，已缩减至最简配置。
 * 如若想使用更多功能，请查考文档中的 【3. config参数说明】 
 * 自行添加属性，以支持更多个性化功能
 */
const USER_CONFIG = {

  // 使用微信测试号：公众号APP_ID
  APP_ID: 'wxab0daa0504e97884',

  // 使用微信测试号：公众号APP_SECRET
  APP_SECRET: '954a2205f88c57fc62f4bd6f271e0d2c',

  PROVINCE: '浙江',
  CITY: '杭州',

  USERS: [
    {
      // 想要发送的人的名字
      名字: '宝贝',
      // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'oLuj456eonccNfojOdqm42Ekmk-8',
      // 使用微信测试号：你想对他发送的模板消息的模板ID
      useTemplateId: '6YuMqeo9iCiylRV-vWG44ZMLF9UmxQs-jeFI0x289tc',
      // 新历生日, 仅用作获取星座运势, 格式必须为MM-DD
      horoscopeDate: '05-26',
      festivals: [
        // 注意：此条配置日期为阴历日期，因为`type`中 “生日” 之前有 * 符号
        {
          类型: '节日', 名字: '小兔崽汁来我家', year: '2023', 日期: '11-07',
        },
        // 注意：此条配置日期为阳历日期，因为`type`中 “生日” 之前没有 * 符号
        {
          类型: '节日', 名字: '大宝生日', year: '2023', 日期: '05-26',
        },
      ],
      // 我们在一起已经有xxxx天了的配置
      customizedDateList: [
        // 在一起的日子
        { keyword: 'love_day', 日期: '2016-06-26' },
        // 结婚纪念日
        { keyword: 'marry_day', 日期: '2023-03-23' },
      ],
    },
    {
      // 想要发送的人的名字
      名字: '自己',
      // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'oLuj453LrJaUgHnmUJrHw_maFp3U',
      // 使用微信测试号：你想对他发送的模板消息的模板ID
      useTemplateId: '6YuMqeo9iCiylRV-vWG44ZMLF9UmxQs-jeFI0x289tc',
      // 新历生日, 仅用作获取星座运势, 格式必须为MM-DD
      horoscopeDate: '08-04',
      festivals: [
        // 注意：此条配置日期为阴历日期，因为`type`中 “生日” 之前有 * 符号
        {
          类型: '节日', 名字: '小兔崽汁来我家', year: '2023', 日期: '10-31',
        },
        // 注意：此条配置日期为阳历日期，因为`type`中 “生日” 之前没有 * 符号
        {
          类型: '节日', 名字: '大宝生日', year: '2023', 日期: '05-26',
        },
      ],
      // 我们在一起已经有xxxx天了的配置
      customizedDateList: [
        // 在一起的日子
        { keyword: 'love_day', 日期: '2016-06-26' },
        // 结婚纪念日
        { keyword: 'marry_day', 日期: '2023-03-23' },
      ],
    },
  ],


  // 【推送完成提醒】模板id, 用来看自己有没有发送成功的那个模板
  CALLBACK_TEMPLATE_ID: 'INlayB8d2Uu7gHIU-f0aTuG4t_J65AQ-I5LUjtWYzrg',

  CALLBACK_USERS: [
    {
      名字: '自己',
      // 使用微信测试号：自己的微信id，扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'oLuj453LrJaUgHnmUJrHw_maFp3U',
    }
  ],

}

module.exports = USER_CONFIG

