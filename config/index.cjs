/* eslint-disable */

/**
 * 此项目配置为方便新人使用，已缩减至最简配置。
 * 如若想使用更多功能，请查考文档中的 【3. config参数说明】 
 * 自行添加属性，以支持更多个性化功能
 */
const USER_CONFIG = {

  // 使用微信测试号：公众号APP_ID
  APP_ID: 'wxb86e9721d9011625',

  // 使用微信测试号：公众号APP_SECRET
  APP_SECRET: '3c4726ef06c9b1ff7083ef6f3d351fcc',

  PROVINCE: '河北',
  CITY: '承德',

  USERS: [
    {
      // 想要发送的人的名字
      name: '马列',
      // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'ohpT36NffDB0vDdG8cJ2AgNmVvu4',
      // 使用微信测试号：你想对他发送的模板消息的模板ID
      useTemplateId: 'cHmW3LCVdzcYCwCftdxdBIZhx3Wb3Ow9zgK-w-hXZDs',
      // 我们在一起已经有xxxx天了的配置
      customizedDateList: [
        // 在一起的日子
        { keyword: 'love_day', date: '2019-04-04' },
      ],
    },
  ],


  // 【推送完成提醒】模板id, 用来看自己有没有发送成功的那个模板
  CALLBACK_TEMPLATE_ID: 'cHmW3LCVdzcYCwCftdxdBIZhx3Wb3Ow9zgK-w-hXZDs',

  CALLBACK_USERS: [
    {
      name: '00',
      // 使用微信测试号：自己的微信id，扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'ohpT36NMyT3ueAsfUuHkAjptPxlg',
    }
  ],

}

module.exports = USER_CONFIG

