[📌返回首页 >>>](../../README.md)

# 常用的推送模板样例

## 亲爱的, 早上好

**样例1：** from `基础模板`

```
{{date.DATA}} 
城市：{{city.DATA}} 
天气：{{weather.DATA}} 
最低气温: {{min_temperature.DATA}} 
最高气温: {{max_temperature.DATA}} 
今天是我们恋爱的第{{love_day.DATA}}天
今天是我们结婚的第{{marry_day.DATA}}天

{{birthday_message.DATA}}

{{one_talk.DATA}} -- {{talk_from.DATA}}

{{note_en.DATA}} 
{{note_ch.DATA}}
```

![](../img/run-img.jpg)

**样例2：** from `群里的小伙伴`

```
{{date.DATA}} 
下个休息日：{{holidaytts.DATA}} 
城市：{{city.DATA}} 
天气：{{weather.DATA}} 
气温(最高/最低):{{max_temperature.DATA}} / {{min_temperature.DATA}} 
风向: {{wind_direction.DATA}} 
风级: {{wind_scale.DATA}} 
今日星座： {{comprehensive_horoscope.DATA}} 

今天是我们相识的第{{love_day.DATA}}天 
{{birthday_message.DATA}} 

{{moment_copyrighting.DATA}} 
{{poetry_title.DATA}} {{poetry_content.DATA}}
```
![](../img/exp-model/modal01.png)


## 推送完成提醒

**样例1：** from `基础模板`

```
服务器信息：{{post_time_zone.DATA}} {{post_time.DATA}}

共推送 {{need_post_num.DATA}} 人
成功: {{success_post_num.DATA}} | 失败: {{fail_post_num.DATA}}
成功用户: {{success_post_ids.DATA}}
失败用户: {{fail_post_ids.DATA}}
```

![](../img/run-img-2.jpg)

[📌返回首页 >>>](../../README.md)