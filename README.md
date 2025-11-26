<div align="center">
<h1 align="center">
公告｜项目过时说明
</h1>
</div>

[![GitHub Stars](https://img.shields.io/github/stars/wangxinleo/wechat-public-account-push?style=flat-square)](https://github.com/wangxinleo/wechat-public-account-push/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/wangxinleo/wechat-public-account-push?style=flat-square)](https://github.com/wangxinleo/wechat-public-account-push/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/wangxinleo/wechat-public-account-push?style=flat-square)](https://github.com/wangxinleo/wechat-public-account-push/issues)
[![GitHub Contributors](https://img.shields.io/github/contributors/wangxinleo/wechat-public-account-push?style=flat-square)](https://github.com/wangxinleo/wechat-public-account-push/graphs/contributors)

wechat-public-account-push 自 2022年 建库，到2025年 完整陪伴大家 3 年时间，这段旅程属于我们全体用户。

---

# ⚠️ 项目已过时，并重构为青龙脚本

**亲爱的用户们：**

感谢大家一直以来对 `wechat-public-account-push` 项目的关注与支持！

2024年开始，AI coding 已经势不可挡了，传统的微信公众号推送方式已逐渐被更先进、更智能的技术所取代。本项目作为一个旧时代的产物，其原有的多种部署和使用方式已无法满足当前用户的需求和发展趋势。

为了让核心功能得以延续并方便大家部署，**我们已将项目核心代码精简为一个独立的青龙脚本**，不再维护其他复杂的部署方式。

## 🚀 新的使用方式 (推荐)

如果您有需要，我们更建议您转向使用轻量的青龙脚本，而不是使用旧版的部署方式。

- **[👉 前往青龙脚本目录，查看使用说明](./qinglong/)**
- **[🔧 一键配置工具](https://wangxinleo.github.io/wechat-public-account-push/)** - 可视化配置界面，自动生成 `ALL_CONFIG`，无需手动编写 JSON

## 📚 旧版功能归档

**强烈建议使用上方推荐的青龙脚本方式，这是目前最佳的部署方案。**

项目原有的多种部署方式（如 Github Actions、云函数、服务器部署等）已不再维护，云函数甚至已失效，多个接口供应商已停止服务。如您确有特殊需求，可参考旧版文档，但请注意相关内容可能已过时或无法正常使用。

- [查看旧版项目完整文档 (Legacy，不推荐)](./README_LEGACY.md)

---

# ⚠️ 部分第三方接口已停止服务

**接口停服说明：**

以下第三方免费接口已停止服务：

- **`api.wangxinleo.cn`** - 获取假期/休息日提示文案
- **`v2.jinrishici.com`** - 获取今日诗词
- **`api.vvhan.com`** - 获取星座运势、彩虹屁、朋友圈文案、毒鸡汤

**影响范围：**
- 青龙脚本中相关功能将无法获取内容
- 推送消息中将不再包含这些接口提供的信息
- 脚本运行日志中可能出现网络错误提示

**解决方案：**
- ✅ **已修复**：青龙脚本已移除这些废弃接口的调用，确保脚本稳定运行
- 🔧 **可替代**：相关功能可通过天行API等替代方案实现


---

# 📣 部分推送渠道已停止服务

为了确保所有用户都能免费测试，我们对推送渠道进行了调整：

- **停止支持**：移除了部分可能需要付费推送渠道。
- **聚焦免费**：目前项目仅集成和维护免费推送渠道。

此举是为了简化维护，并保证项目的核心功能对所有人开放。

## 🙏 致谢

wechat-public-account-push 的成长离不开每一位贡献者和用户的支持。

- 感谢所有陪伴 `wechat-public-account-push` 的用户。
- 感谢那些默默支持我, 鼓励我继续更新这个小玩具的朋友。
- 感谢所有参与到开发/测试中的朋友们，是大家的帮助让 TA 越来越好！ (*´▽｀)ノノ

**贡献/参与者:**

- @LordonCN Lordon
- @ZzqiZQute zz
- @shuangxunian ShuangxuNian
- @只会前端的小废物


