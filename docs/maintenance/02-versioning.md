# 02 · 版本与分支策略

## 分支

| 分支 | 用途 |
|---|---|
| `main` | 增强版稳定线，只接受通过构建与全量测试的提交 |
| `release/<version>` | 每个发行版的快照分支（如 `release/1.0.0`），只做版本与打包修正 |
| `feat/*` / `fix/*` | 功能与修复，合入 main 前需测试通过 |
| `upstream-sync/*` | 选择性同步上游修复的临时分支，合入后删除 |

## 版本号

- 增强版独立版本线，从 `1.0.0` 起；遵循语义化版本：
  - 主版本：身份、DSH 兼容范围或设置结构变化；
  - 次版本：新功能（主题、个人页、兼容层等）；
  - 修订版本：修复与文案。
- `package.json` 的 `version` 是唯一来源；构建会写入 bundle，README/Release 链接需同步。

## 提交与发布

1. 分支开发 → 构建 + 全量测试 → 合入 `main`。
2. 从 `main` 切 `release/<version>`，改版本与 CHANGELOG，重建 `lib/client.js`。
3. 打包 `dsh-codex-style-enhanced-<version>-windows.zip`（**必须包含 `package.json`**）。
4. Tag `v<version>`，写 Release 说明，上传 zip。
5. 更新 README 与 CHANGELOG 中的版本与链接。

## 兼容性承诺

- `engines.dsh` 是唯一兼容声明；扩大范围前必须实机验证，不以“能加载”代替验证。
- 宿主大版本升级后，先跑 `test-host-signatures`、`test-client`，再检查 Remote 与设置页。

## 版本对应关系

| 插件版本 | 分支 / Tag | 安装包 |
|---|---|---|
| 1.0.0 | `release/1.0.0` / `v1.0.0` | `dsh-codex-style-enhanced-1.0.0-windows.zip` |
| 0.2.x（历史） | `release/0.2.x` / `v0.2.x` | `dsh-codex-style-0.2.x-windows.zip`（原身份，保留不删） |
