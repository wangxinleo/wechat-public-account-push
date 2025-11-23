# 微信公众号推送 - 青龙脚本 v2.0.0

一份为青龙面板设计的单文件微信公众号推送脚本，经过重构和优化，支持微信测试号和 PushDeer 推送。

## 功能特性

- **多渠道推送**:
  - ✅ **微信测试号**: 支持发送模板消息。
  - ✅ **PushDeer**: 支持向手机、电脑等设备发送 Markdown 消息，支持多 Key 推送。
- **灵活的模板系统**:
  - ✅ 通过 `TEMPLATE_CONFIG` 环境变量自定义多个推送模板。
  - ✅ 用户可选择使用不同的模板 ID。
- **丰富的数据接口**:
  - ✅ **天气预报**: 基于 `t.weather.itboy.net`，需用户提供城市编码。
  - ✅ **每日一句**: 金山词霸每日一句（中英双语）。
  - ✅ **每日一言**: Hitokoto 一言。
  - ✅ **天行数据API集成** (需要 `TIAN_API_KEY`):
    - ☀️ **早安心语**
    - 🌙 **晚安心语**
    - 🌦️ **天行天气预报**
    - 🔥 **全网热搜榜**
- **个性化日期计算**:
  - ✅ **生日/纪念日提醒**: 计算并显示最近的纪念日倒数。
  - ✅ **特殊日期累计**: 计算如“在一起的第 X 天”。
- **实用工具**:
  - ✅ **课程表**: 支持简单模式和区分单双周的复杂模式。
- **健壮性与性能**:
  - ✅ 内置请求重试机制，提升稳定性。
  - ✅ 详细的日志输出，便于排错。
  - ✅ 模块化代码，易于维护。

> **注意**: 多个旧版API（如诗词、星座、节假日、彩虹屁等）因接口失效已被移除。

## 🚀 快速配置（推荐）

**一键配置工具**：访问 [https://wangxinleo.github.io/daily-push-auto-env-page](https://wangxinleo.github.io/daily-push-auto-env-page)

- ✅ 可视化表单界面，无需手动编写 JSON
- ✅ 自动生成 `ALL_CONFIG` 配置
- ✅ 支持配置导入导出
- ✅ 实时预览配置效果

使用网站生成配置后，直接复制粘贴到青龙面板或 GitHub Secrets 即可。

## 使用方法

### 方案一：青龙面板部署（推荐）

1.  将 `wechat-push.js` 和 `package.json` 文件放置在青龙面板的脚本目录下（例如 `ql/scripts/`）。
2.  在青龙面板的"依赖管理"中，添加 `axios` 和 `dayjs` 依赖。
3.  在青龙面板的"环境变量"中，添加下文所述的配置。
4.  创建一个新的青龙定时任务，命令为 `node qinglong-push.js`，并设置定时规则（例如 `0 8 * * *` 表示每天早上8点执行）。

### 方案二：GitHub Actions 自动化部署

#### 🚀 快速开始

GitHub Actions 提供了一种无需服务器即可自动运行青龙脚本的方式，特别适合没有青龙面板环境的用户。

#### 📋 配置步骤

**步骤 1：Fork 本仓库**
- Fork 此仓库到你的 GitHub 账户
- 确保仓库设置为公开或私有（私有仓库需要 GitHub Pro）

**步骤 2：配置 GitHub Secrets**

在 GitHub 仓库页面：
1. 点击 `Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret`
3. 添加以下必需的 secret：

| Secret 名称 | 是否必须 | 说明 | 示例 |
|-------------|----------|------|------|
| `ALL_CONFIG` | ✅ 必需 | 完整的 JSON 配置字符串 | 建议使用一键配置工具 |

**步骤 3：配置 ALL_CONFIG**


**步骤 4：验证配置**

配置完成后，可以通过以下方式验证：

1. **手动触发测试**：
   - 进入 GitHub 仓库的 `Actions` 标签页
   - 选择 `qinglong-wechat-push` 工作流
   - 点击 `Run workflow` → `Run workflow` 手动执行

2. **查看运行日志**：
   - 每次运行后，点击具体的工作流运行记录
   - 查看 `验证必需的环境变量` 步骤的输出
   - 确认所有配置项都通过验证

**步骤 5：定时任务**

工作流已配置为每天北京时间 **7:30** 自动运行，无需额外设置。

#### 🔧 高级配置

**自定义运行时间**

如需修改定时运行时间，编辑 `.github/workflows/qinglong-push.yml` 文件中的 cron 表达式：

```yaml
schedule:
  - cron: '30 23 * * *'  # 北京时间 7:30
```

**时区参考**：
- `30 23 * * *` = 北京时间 7:30
- `0 22 * * *` = 北京时间 6:00
- `0 1 * * *` = 北京时间 9:00

**环境变量验证**

工作流会自动验证以下配置：
- ✅ `ALL_CONFIG` 环境变量存在
- ✅ JSON 格式正确
- ✅ `TEMPLATE_CONFIG` 非空
- ✅ `USER_INFO` 非空
- ✅ 用户配置包含推送渠道（微信或 PushDeer）
- ✅ 模板 ID 引用正确

---

## 环境变量配置 (v2.0.0+)

从 v2.0.0 版本开始，所有配置项被统一聚合到一个名为 `ALL_CONFIG` 的环境变量中。你需要将一个完整的 JSON 对象作为该环境变量的值。

### 主配置

| 环境变量     | 是否必须 | 说明                                                                 |
| -------------- | -------- | -------------------------------------------------------------------- |
| `ALL_CONFIG` | 是       | 包含所有配置的 JSON 字符串。详见下方的 `.env` 示例和配置详解。 |

---

### `ALL_CONFIG` 配置详解

`ALL_CONFIG` 是一个 JSON 对象，包含了过去所有分散的配置项。

**JSON 结构**:```json
{
  "APP_ID": "wx...",
  "APP_SECRET": "your_secret",
  "TIAN_API_KEY": "your_tian_api_key",
  "FESTIVALS_LIMIT": 4,
  "MAX_PUSH_ONE_MINUTE": 5,
  "SLEEP_TIME": 65000,
  "API_TIMEOUT": 10000,
  "MAX_RETRIES": 3,
  "RETRY_DELAY": 2000,
  "TEMPLATE_CONFIG": [
    {
      "id": "0001",
      "title": "模板标题",
      "desc": "模板内容..."
    }
  ],
  "USER_INFO": [
    {
      "name": "用户名",
      "id": "wechat_openid",
      "wechatTemplateId": "wechat_template_id",
      "useTemplateId": "0001",
      "city": "北京",
      "...": "..."
    }
  ]
}```

#### `USER_INFO` 用户配置详解

`USER_INFO` 是 `ALL_CONFIG` 内的一个 JSON 数组，每个对象代表一个接收消息的用户。

**示例**: `[{...user1...}, {...user2...}]`

| 字段名               | 类型                  | 是否必须 | 说明                                                                                                                                              |
| -------------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | `string`              | 否       | 用户昵称，用于日志区分。若不填，默认为“用户X”。                                                                                                    |
| `id`                 | `string`              | 功能必需 | **微信用户 OpenID**。如需使用微信推送，此项为必需。                                                                                                 |
| `wechatTemplateId`   | `string`              | 功能必需 | **微信模板消息ID**。微信用户必须配置此项，用于指定发送哪个微信模板。                                                                                  |
| `pushDeerKey`        | `string`              | 功能必需 | **PushDeer 的 Key**。如需使用 PushDeer 推送，此项为必需。支持多个 Key，用英文逗号 `,` 分隔。                                                        |
| `useTemplateId`      | `string`              | 是       | **本地模板内容ID**。关联 `TEMPLATE_CONFIG` 中的模板，**PushDeer用户**必须配置此项来决定使用哪套自定义的**消息内容**。                                           |
| `city`               | `string`              | 否       | 用户所在城市，用于天行天气预报等。默认 `北京`。                                                                                                   |
| `weatherCityCode`    | `string`              | 条件必需 | 基础天气接口(t.weather.itboy.net)的城市编码。如仅使用天行API天气功能，则此字段为可选。                                                              |
| `horoscopeDate`      | `string`              | 否       | 星座日期，格式 `MM-DD`。用于获取星座名称 (注意：星座运势API已失效)。                                                                                 |
| `festivals`          | `Array<object>`       | 否       | 生日/纪念日列表，用于倒计时提醒。格式：`[{"name": "生日", "date": "10-24"}]`。                                                                       |
| `customizedDateList` | `Array<object>`       | 否       | 自定义累计日期列表。格式：`[{"keyword": "love_day", "date": "2020-01-01"}]`，模板中可用 `{{love_day.DATA}}` 显示天数。                      |
| `courseSchedule`     | `Array` 或 `object`   | 否       | 课程表配置，支持简单模式和按单双周区分的复杂模式。详见下文。                                                                                      |
| `tianApi`            | `object`              | 否       | 用户级的天行数据功能开关，可覆盖全局设置。详见下文 `tianApi` 对象详解。                                                                           |
| `showColor`          | `boolean`             | 否       | 是否为微信测试号消息启用多彩颜色。默认为 `true`。设为 `false` 可关闭。                                                                          |

#### `tianApi` 对象详解

此对象用于在**用户级别**精细控制天行数据API提供的各项功能。只有在 `USER_INFO` 中为用户配置了 `tianApi` 对象，并且 `TIAN_API_KEY` 已全局设置，相关功能才会生效。

| 字段名        | 类型      | 是否必须 | 说明                                                                      |
| ------------- | --------- | -------- | ------------------------------------------------------------------------- |
| `morning`     | `boolean` | 否       | `true` 启用早安心语。                                                     |
| `evening`     | `boolean` | 否       | `true` 启用晚安心语。                                                     |
| `weatherDays` | `boolean` | 否       | `true` 启用天行天气预报（获取当天天气）。                                 |
| `hotCount`    | `number`  | 否       | 获取全网热搜榜的条数（最多30条）。`0` 或不填则不启用。                     |
| `hotType`     | `string`  | 否       | 热搜榜显示格式，可选 `'title'` (仅标题) 或 `'default'` (标题+摘要)。默认为 `default`。 |

#### `courseSchedule` 示例

**简单模式** (不分单双周，周一到周六的课程数组)
```json
[
  ["高数", "线代"],
  ["大物"],
  ["体育", "英语"],
  [],
  ["毛概"],
  []
]
```

**复杂模式** (区分单双周)
```json
{
  "benchmark": {
    "date": "2024-09-02",
    "isOdd": true
  },
  "courses": {
    "odd": [
      ["单周-周一课程1"], [], [], [], [], []
    ],
    "even": [
      ["双周-周一课程1"], [], [], [], [], []
    ]
  }
}
```
- `benchmark.date`: 基准日期，用于计算当前是第几周。
- `benchmark.isOdd`: 基准日期所在周是否为单周。

---

### `TEMPLATE_CONFIG` 模板配置详解

`TEMPLATE_CONFIG` 是 `ALL_CONFIG` 内的一个 JSON 数组，定义了所有可用的推送消息模板。每个用户通过 `useTemplateId` 字段来指定使用哪个模板。

| 字段名  | 类型     | 是否必须 | 说明                                                                      |
| ------- | -------- | -------- | ------------------------------------------------------------------------- |
| `id`    | `string` | 是       | **模板唯一ID**。与 `USER_INFO` 中的 `useTemplateId` 对应，必须唯一。        |
| `title` | `string` | 是       | **消息标题**。支持模板变量，但主要用于 PushDeer 等平台的通知标题。       |
| `desc`  | `string` | 是       | **消息主体内容**。这是模板的核心，支持下文详述的所有模板变量。              |

**示例**:
```json
[
  {
    "id": "0001",
    "title": "今日提醒",
    "desc": "今天是：{{date.DATA}}\\n城市：{{city.DATA}}\\n天气：{{weather.DATA}}\\n气温：{{min_temperature.DATA}}~{{max_temperature.DATA}}℃\\n{{birthday_message.DATA}}\\n\\n每日一句：\\n{{english_note.DATA}}\\n{{chinese_note.DATA}}"
  },
  {
    "id": "evening_report",
    "title": "晚安简报",
    "desc": "晚安，宝贝！\\n{{evening_greeting.DATA}}\\n\\n今日热搜：\\n{{network_hot.DATA}}"
  }
]
```
| `title`  | `string` | **模板标题**。对于微信推送，此内容不会显示。 |
| `desc`   | `string` | **模板描述/内容**，支持使用模板变量。 |

---

### 可用模板变量

在 `TEMPLATE_CONFIG` 的 `desc` 字段中，你可以使用以下变量。

| 变量                     | 说明                                                                  | 数据来源              |
| ------------------------ | --------------------------------------------------------------------- | --------------------- |
| `{{date.DATA}}`          | 当前日期，格式：`YYYY年MM月DD日`。                                        | 系统                  |
| `{{city.DATA}}`          | 当前城市（优先来自基础天气API，如未配置则使用用户配置的city字段）。     | 基础天气API/用户配置  |
| `{{weather.DATA}}`       | 当前天气（需配置weatherCityCode）。                                    | `t.weather.itboy.net` |
| `{{max_temperature.DATA}}` | 最高温度（需配置weatherCityCode）。                                    | `t.weather.itboy.net` |
| `{{min_temperature.DATA}}` | 最低温度（需配置weatherCityCode）。                                    | `t.weather.itboy.net` |
| `{{wind_direction.DATA}}`| 风向（需配置weatherCityCode）。                                        | `t.weather.itboy.net` |
| `{{wind_scale.DATA}}`    | 风力等级（需配置weatherCityCode）。                                    | `t.weather.itboy.net` |
| `{{birthday_message.DATA}}` | 最近的生日/纪念日倒数提醒。                                           | 用户配置              |
| `{{moment_copyrighting.DATA}}` | 每日一言。                                                          | Hitokoto              |
| `{{morning_greeting.DATA}}` | 早安心语（需配置天行API）。                                            | 天行数据              |
| `{{evening_greeting.DATA}}` | 晚安心语（需配置天行API）。                                            | 天行数据              |
| `{{tian_weather.DATA}}`  | 天行天气预报（需配置天行API）。                                         | 天行数据              |
| `{{network_hot.DATA}}`   | 全网热搜榜（需配置天行API）。                                           | 天行数据              |
| `{{today_courses.DATA}}` | 今日课程安排。                                                        | 用户配置              |
| `{{chinese_note.DATA}}`  | 每日一句（中文部分）。                                                  | 金山词霸              |
| `{{english_note.DATA}}`  | 每日一句（英文部分）。                                                  | 金山词霸              |
| `{{love_day.DATA}}`      | 由 `customizedDateList` 中 `keyword` 为 `love_day` 的项计算得出的天数。 | 用户配置              |
| `{{any_keyword.DATA}}`   | 由 `customizedDateList` 中自定义的 `keyword` 计算得出的天数。           | 用户配置              |

---


### 模板变量详解 (`{{variable.DATA}}`)

在 `TEMPLATE_CONFIG` 的 `desc` 字段中，你可以使用以下变量来动态展示信息。脚本会自动获取并替换它们。

| 变量名              | 数据来源          | 依赖配置                                             | 说明                                                         |
| ------------------- | ----------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `date`              | 内置              | 无                                                   | 当前日期，格式如 "2023年01月01日"。                           |
| `city`              | 基础天气API/用户配置 | `USER_INFO` -> `city`（优先），`weatherCityCode`（基础天气） | 用户所在城市（优先使用基础天气API数据，如未配置weatherCityCode则使用city字段）。 |
| `weather`           | 基础天气API       | `USER_INFO` -> `weatherCityCode`                     | 当日天气状况（需配置weatherCityCode）。                      |
| `max_temperature`   | 基础天气API       | `USER_INFO` -> `weatherCityCode`                     | 最高温度（需配置weatherCityCode）。                          |
| `min_temperature`   | 基础天气API       | `USER_INFO` -> `weatherCityCode`                     | 最低温度（需配置weatherCityCode）。                          |
| `wind_direction`    | 基础天气API       | `USER_INFO` -> `weatherCityCode`                     | 风向（需配置weatherCityCode）。                              |
| `wind_scale`        | 基础天气API       | `USER_INFO` -> `weatherCityCode`                     | 风力等级（需配置weatherCityCode）。                          |
| `birthday_message`  | 内置              | `USER_INFO` -> `festivals`                           | 最近一个生日或纪念日的倒数提醒（30天内）。                  |
| `[keyword]`         | 内置              | `USER_INFO` -> `customizedDateList`                  | 计算从指定日期到今天的天数，`[keyword]`为自定义的关键词。 |
| `english_note`      | 每日一句(iCIBA)   | 无                                                   | 每日一句的英文部分。                                         |
| `chinese_note`      | 每日一句(iCIBA)   | 无                                                   | 每日一句的中文翻译。                                         |
| `moment_copyrighting` | 一言(Hitokoto)      | 无                                                   | 随机一条“一言”文案。                                         |
| `today_courses`     | 内置              | `USER_INFO` -> `courseSchedule`                      | 当日的课程表安排。                                           |
| `morning_greeting`  | 天行数据API       | `TIAN_API_KEY` & `USER_INFO` -> `tianApi.morning`    | 早安心语。                                                   |
| `evening_greeting`  | 天行数据API       | `TIAN_API_KEY` & `USER_INFO` -> `tianApi.evening`    | 晚安心语。                                                   |
| `tian_weather`      | 天行数据API       | `TIAN_API_KEY` & `USER_INFO` -> `tianApi.weatherDays` | 天行数据提供的天气预报。                                     |
| `network_hot`       | 天行数据API       | `TIAN_API_KEY` & `USER_INFO` -> `tianApi.hotCount`   | 全网热搜榜。                                                 |


### 其他环境变量

这些变量用于调整脚本的性能和行为，通常使用默认值即可。

| 变量名                | 类型    | 是否必须 | 默认值 | 说明                                                         |
| --------------------- | ------- | -------- | ------ | ------------------------------------------------------------ |
| `FESTIVALS_LIMIT`     | `number`| 否       | `0`    | 生日/纪念日提醒的最大显示数量。`0` 表示全部显示。           |
| `MAX_PUSH_ONE_MINUTE` | `number`| 否       | `5`    | 一分钟内允许的最大推送用户数，用于防止频率过高被微信限制。 |
| `SLEEP_TIME`          | `number`| 否       | `65000`| 推送达到 `MAX_PUSH_ONE_MINUTE` 限制后，脚本暂停的毫秒数。   |
| `API_TIMEOUT`         | `number`| 否       | `10000`| 调用外部API的超时时间（毫秒）。                             |
| `MAX_RETRIES`         | `number`| 否       | `3`    | API请求失败后的最大重试次数。                                |
| `RETRY_DELAY`         | `number`| 否       | `2000` | 每次重试之间的基础延迟时间（毫秒），后续重试延迟会增加。   |

