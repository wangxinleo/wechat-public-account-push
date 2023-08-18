[📌返回首页 >>>](../../README.md)

# 常用的推送模板样例
# 注：2023.5.4之后腾讯更新服务号，公众号，测试号规则
     + 测试号彻底失去颜色
     + 模板字段显示字数超过20字会变成...（解决方法等更新代码或者自己分割字段，太忙了要搬砖）
     + {{***.DATA}}前面记得加文字或者占位符，部分emoji表情也可以（只有部分记得去尝试），不能会不显示，有可能会影响下一个字段的显示
     + 换行符号好像就\r有用(我没有尝试过，你们可以试试，应该大部分人用不上)
     ![emoji表情网站](https://emojipedia.org/)
## 亲爱的, 早上好

**样例1：** from `基础模板`

```
🗓️{{date.DATA}}
城市：{{city.DATA}}
天气☁️：{{weather.DATA}}
温度🌡️: {{min_temperature.DATA}}--{{max_temperature.DATA}}
风向：{{wind_direction.DATA}}
风级：{{wind_scale.DATA}}
温馨提示：{{notice.DATA}}
值得纪念：{{birthday_message.DATA}}
💗：{{earthy_love_words.DATA}}
每日一句😋
中文：{{note_ch.DATA}}
English：{{note_en.DATA}}
和{{poetry_author.DATA}}约个会：{{poetry_content.DATA}}
```

![](../../img/novice/temp-xg.png)

**样例2：** from `群里的小伙伴`

```
🗓️{{date.DATA}}

今天是我们在一起的第{{love_day.DATA}}天，爱你❤️

今日{{city.DATA}}天气☁️：{{weather.DATA}}
温度🌡️: {{min_temperature.DATA}}-{{max_temperature.DATA}}
风向：{{wind_direction.DATA}}
风级：{{wind_scale.DATA}}
湿度：{{shidu.DATA}}
空气质量：{{aqi.DATA}}
预防感冒提醒：{{ganmao.DATA}}
下一休息日：{{holidaytts.DATA}}
下一个心动日：{{birthday_message.DATA}}
```

**样例3：** from `群里的小伙伴`

```
城市：{{city.DATA}} 
天气：{{weather.DATA}} 
最低气温：{{min_temperature.DATA}}度
最高气温：{{max_temperature.DATA}}度 

今天是我们恋爱的第{{love_day.DATA}}天 
今天是我们结婚的第{{marry_day.DATA}}天 

生日提醒：
1.{{wx_birthday_0.DATA}} 
2.{{wx_birthday_1.DATA}} 
3.{{wx_birthday_2.DATA}} 
4.{{wx_birthday_3.DATA}} 

课表：
1.{{wx_course_schedule_0.DATA}} 
2.{{wx_course_schedule_1.DATA}} 
3.{{wx_course_schedule_2.DATA}} 
4.{{wx_course_schedule_3.DATA}} 
5.{{wx_course_schedule_4.DATA}}
```


## 推送完成提醒

**样例1：** from `基础模板`

```js
服务器信息：{{post_time_zone.DATA}} {{post_time.DATA}}
       
共推送 {{need_post_num.DATA}} 人
成功: {{success_post_num.DATA}} | 失败: {{fail_post_num.DATA}}
成功用户: {{success_post_ids.DATA}}
失败用户: {{fail_post_ids.DATA}}
```

![](../../img/how-to-use/run-img-2.jpg)

[📌返回首页 >>>](../../README.md)