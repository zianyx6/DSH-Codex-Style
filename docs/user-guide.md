# 安装与使用指南

[返回项目主页](../README.md) · [English overview](../README.en.md)

## 安装

### 方式一：DSH 插件页

在 DSH「自定义 → 插件 → 添加插件」中输入增强版包名 `@zianyx6/dsh-codex-style-enhanced`（发布后可用），或从 [Releases](https://github.com/zianyx6/DSH-Codex-Style/releases) 下载 ZIP。

### 方式二：Windows ZIP（推荐）

1. 从 [Releases](https://github.com/zianyx6/DSH-Codex-Style/releases) 下载 `dsh-codex-style-enhanced-*.zip`；
2. **完全退出 DSH**；
3. 解压后运行 `install.cmd`（需要 Node.js 20+）；
4. 重新启动 DSH。

两个插件不可同时启用。安装器会写入独立受管目录 `dsh-codex-style-enhanced/`（原版使用 `dsh-codex-style/`），检测到原版已安装时会停止并提示先卸载原版。

## 从旧版 Codex Style 迁移

1. 记下你需要的设置（通常无需操作，增强版沿用 `dsh-codex-style:*` 本地存储键）；
2. 在 DSH 插件页卸载原版 `@xinxing1708/dsh-codex-style`，退出 DSH；
3. 按上面的方式安装增强版并重启；
4. 主题、外观、侧栏宽度等设置会自动沿用；如未生效，在设置 → 外观里重新选择一次即可。

## 更新与回滚

- **更新**：插件页更新，或下载新 ZIP 覆盖安装（安装器保留旧版本与回滚记录）。
- **回滚**：`install.cmd` 安装的版本可用 `scripts/rollback.mjs`（安装器会打印用法）回退到上一版；插件页安装的版本可用 DSH 插件页卸载后重装旧版。
- **卸载**：插件页卸载即可；`install.cmd` 安装的版本会清理自己写入的 profile 条目，不影响原版或用户配置。

## 兼容性

- DSH：`>=0.2.1-rc.2 <0.3.0-0`（0.3.0 及更高版本拒绝加载）。
- Node.js：>= 20（仅安装器需要）。
- 平台：Windows 优先（安装器面向 Windows），Web/桌面客户端均可加载。
- 已知问题：主题包与个人页依赖 DSH 的公开槽位与 `data-*` 标记；宿主大版本升级后可能需要适配，见 [维护文档](maintenance/)。

