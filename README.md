# DSH Codex Style Enhanced

> 为 **DeepSeek Harness（DSH）** 提供 Codex 桌面端风格界面的**社区增强版**：在原版基础上内置 30 套主题包、可调外观与个人主页。
>
> 本项目是 [xinxing1708/DSH-Codex-Style](https://github.com/xinxing1708/DSH-Codex-Style) 的独立社区 Fork，**由社区独立维护，不代表上游原作者立场，也未获得上游或 DeepSeek 的背书**。

![首页](assets/screenshots/01-home.png)

## 与原版的关系

| | 原版 `@xinxing1708/dsh-codex-style` | 增强版 `@zianyx6/dsh-codex-style-enhanced` |
|---|---|---|
| 定位 | 简洁的 Codex 风格界面 | 在 Codex 风格上扩展主题、外观与个人主页 |
| 主题 | 深浅色两套 | 深浅色 + 内置 dsh-theme 30 套配色 + 11 个 Codex 风格预设 |
| 外观设置 | 无独立页面 | 设置 → 外观：模式 / 预设 / 强调色 / 背景 / 前景 / 字体 / 密度 / 侧栏宽度 |
| 个人主页 | 无 | 齿轮菜单「个人」：账号余额、会话统计、活动热力图、用量入口 |
| 安装包名 | 原包名 | 独立包名与安装目录，**不会覆盖原版** |
| 设置数据 | `dsh-codex-style:*` | 沿用同一套键，迁移不丢设置 |
| 来源 | 上游维护 | 保留上游全部 MIT 代码与署名，追加内容同样开源 |

两版**互斥**：请只启用其中一个。从原版迁移的步骤见下文。

## 功能

- **主题界面**：Codex 风格的导航、可收起侧栏和输入区；项目/会话搜索与管理、模型和权限选择、思考强度滑条与 MAX 动效、运行/完成提示。
- **浅色 / 深色**：随 DSH 外观设置切换；选择跟随系统时同步系统变化。
- **内置主题包**：来自 [dsh-theme](https://github.com/mux9056-bot/dsh-theme) 的 30 套配色（Apache-2.0），无需再装第三个插件。
- **设置 → 外观**：模式（浅色/深色/跟随系统）、Codex 风格预设（Rose Pine / Nord / Solarized / Tokyo Night / Gruvbox / Catppuccin / Dracula / One Dark / GitHub 等）、强调色/背景/前景、字体、界面密度、侧栏宽度；「DeepSeek 默认」作为默认预设项。
- **个人主页**：账号昵称、充值/赠送余额、会话总数、活跃与连续天数、近 12 个月会话活动热力图，以及 Token 消耗 / 使用峰值 / 任务用时 / 消费金额（后四项由平台统计，页面提供平台用量页入口，不推算金额）。
- **Remote 兼容层**：`dsh-remote` 的 IDE 工作台从一级导航右侧开始，顶栏/文件树/编辑器表面与主题一致，弹窗层级高于本插件浮层。
- **正文效果**：回合耗时、过程收起、流式平滑、工具调用状态与完整 Markdown/代码块。
- **可选组件**：Codex 工作规范提示词（默认关闭）、页面前进后退（默认开启）、图片批注（默认开启）。

## 截图

| | |
|---|---|
| ![正文](assets/screenshots/03-body-style.png) | ![悬停](assets/screenshots/04-sidebar-hover.png) |
| ![图片批注](assets/screenshots/06-image-annotation.png) | ![推理强度](assets/screenshots/05-reasoning.png) |

## 安装

### 方式一：DSH 插件页

在 DSH「自定义 → 插件 → 添加插件」中输入增强版包名 `@zianyx6/dsh-codex-style-enhanced`（发布后可用），或从 [Releases](https://github.com/zianyx6/DSH-Codex-Style/releases) 下载 ZIP。

### 方式二：Windows ZIP（推荐）

1. 从 [Releases](https://github.com/zianyx6/DSH-Codex-Style/releases) 下载 `dsh-codex-style-enhanced-*.zip`；
2. **完全退出 DSH**；
3. 解压后运行 `install.cmd`（需要 Node.js 20+）；
4. 重新启动 DSH。

安装器会写入独立受管目录 `dsh-codex-style-enhanced/`（原版使用 `dsh-codex-style/`），检测到原版已安装时会停止并提示先卸载原版。

## 从原版迁移

1. 记下你需要的设置（通常无需操作，增强版沿用 `dsh-codex-style:*` 本地存储键）；
2. 在 DSH 插件页卸载原版 `@xinxing1708/dsh-codex-style`，退出 DSH；
3. 按上面的方式安装增强版并重启；
4. 主题、外观、侧栏宽度等设置会自动沿用；如未生效，在设置 → 外观里重新选择一次即可。

## 更新与回滚

- **更新**：插件页更新，或下载新 ZIP 覆盖安装（安装器保留旧版本与回滚记录）。
- **回滚**：`install.cmd` 安装的版本可用 `scripts/rollback.mjs`（安装器会打印用法）回退到上一版；插件页安装的版本可用 DSH 插件页卸载后重装旧版。
- **卸载**：插件页卸载即可；`install.cmd` 安装的版本会清理自己写入的 profile 条目，不影响原版或用户配置。

## 兼容性

- DSH：`>=0.2.1-rc.2 <0.3.0-0`（与原版一致；0.3.0 及更高版本拒绝加载）。
- Node.js：>= 20（仅安装器需要）。
- 平台：Windows 优先（安装器面向 Windows），Web/桌面客户端均可加载。
- 已知问题：主题包与个人页依赖 DSH 的公开槽位与 `data-*` 标记；宿主大版本升级后可能需要适配，见 [维护文档](docs/maintenance/)。

## 第三方与许可

- 本项目代码：MIT，见 `LICENSE`。
- 上游 [DSH-Codex-Style](https://github.com/xinxing1708/DSH-Codex-Style)：MIT，保留其代码、CHANGELOG 历史与署名。
- 主题包数据：[dsh-theme](https://github.com/mux9056-bot/dsh-theme) 1.0.1，Apache-2.0，见 `licenses/dsh-theme-LICENSE`。
- DSH 品牌图：DeepSeek Harness 项目，MIT，见 `licenses/DeepSeek-Harness-LICENSE`。
- 完整说明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 开发与贡献

```bash
node scripts/build.mjs                     # 构建 lib/client.js
node --test --test-isolation=none scripts/test-client.mjs   # 示例：单文件测试
```

- 设计令牌在 `assets/tokens.css`，页面样式在 `src/*.css`，组件逻辑在 `src/*.js`。
- 维护策略（分支、版本、上游修复选择性同步）见 [docs/maintenance/02-versioning.md](docs/maintenance/02-versioning.md) 与 [03-upstream-sync.md](docs/maintenance/03-upstream-sync.md)。
- 提交前请运行构建与测试；涉及界面改动请附截图。

## 致谢

- 上游作者 [@xinxing1708](https://github.com/xinxing1708) 与 [DSH-Codex-Style](https://github.com/xinxing1708/DSH-Codex-Style) 的全部基础工作；
- [dsh-theme](https://github.com/mux9056-bot/dsh-theme) 主题数据；
- DeepSeek Harness 项目与其 UI 契约。
