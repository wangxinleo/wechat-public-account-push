/* eslint-disable */
const TEMPLATE_CONFIG = [
  {
    id: '0001',
    title: '最亲最爱的老婆, 早上好:',
    desc: `
      **今天是{{date.DATA}}**

      **今天是我们在一起的第{{love_day.DATA}}天**

      ![img.png](https://img95.699pic.com/photo/40140/6094.gif_wh860.gif)
      
      {{holidaytts.DATA}}

      今日情话：**{{earthy_love_words.DATA}}**
      
      ---
      
      城市：{{city.DATA}}
      
      今日{{city.DATA}}天气：{{weatherIcon.DATA}}{{weather.DATA}}
      
      气温(最高/最低):{{max_temperature.DATA}} / {{min_temperature.DATA}}

      温度提醒：{{ganmao.DATA}}

      温馨提示：{{notice.DATA}} 
      
      风向: {{wind_direction.DATA}}
      
      风级: {{wind_scale.DATA}}
      
      {{comprehensive_horoscope.DATA}}
      
      ---
      
      {{birthday_message.DATA}}
      
      ---

      {{note_en.DATA}}

      {{note_ch.DATA}}

      ---

      {{career_horoscope.DATA}}

      {{wealth_horoscope.DATA}}
      
    `
  },
  {
    id: '0002',
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