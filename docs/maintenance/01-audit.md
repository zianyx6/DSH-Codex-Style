# 增强版审计报告（2026-11-15）

> 对象：`zianyx6/DSH-Codex-Style`（Fork 自 `xinxing1708/DSH-Codex-Style`）。
> 目标：改为可独立维护的社区增强版，同时保留全部功能、设置数据、历史与署名。

## 1. 身份相关引用清单

| 位置 | 现状 | 处理 |
|---|---|---|
| `package.json` `name` | `@xinxing1708/dsh-codex-style` | 改为 `@zianyx6/dsh-codex-style-enhanced` |
| `package.json` `version` | `0.2.9` | 改为 `1.0.0`（增强版独立版本线起点） |
| `package.json` `repository/homepage/bugs` | 指向上游 | 指向 `zianyx6/DSH-Codex-Style`（改名后 GitHub 自动重定向，暂不重命名仓库） |
| `cordis.patch.yml` 4 个 `name` | 旧包名及子路径 | 全部改为新包名及子路径 |
| `skin.json` `package` | 旧包名 | 改为新包名；`bodyAttr` 不变 |
| `src/skills.js` `SKILLS_PACKAGE` | 旧包名 | 改为新包名 |
| `src/style.css` `[data-plugin-detail="@xinxing1708/…"]` | 旧包名 | 改为新包名（与 skills 常量保持一致） |
| `src/client.js` 帮助链接 | 上游仓库 | 改为 `zianyx6/DSH-Codex-Style`（README 保留上游致谢） |
| `scripts/install.mjs` 受管目录/备份目录 | `dsh-codex-style` / `codex-style-backups` | 改为 `dsh-codex-style-enhanced` / `codex-style-enhanced-backups`，避免与原版互相覆盖 |
| `scripts/install.mjs` `legacyName` | `dsh-codex-style`（会认领旧包） | 取消认领；检测到原版安装时明确报错，要求先卸载原版 |
| `scripts/test-client.mjs` / `test-image-annotations-integration.mjs` | 旧包名 | 改为新包名 |
| `package-lock.json` 根 `name/version` | 旧包名 / 0.2.9 | 同步新包名 / 1.0.0 |
| `README.md` | 以上游口吻描述 | 重写为增强版文档（含来源、差异、迁移） |
| `CHANGELOG.md` | 0.2.x 历史 | 追加 1.0.0 段落；历史链接保留 |

## 2. 必须保持不变的内部标识（设置兼容）

| 标识 | 原因 |
|---|---|
| `body[data-dsh-codex-style]`、`data-dsh-codex-chrome` | 所有样式与主题选择器的前缀，改名会丢失样式 |
| `localStorage` 键 `dsh-codex-style:theme` / `:appearance` / `:sidebar-width` | 主题、外观、侧栏宽度等用户设置 |
| 槽位/图层 id（`codex-style:*`、`PLUGIN_ID='dsh-codex-style'`） | 运行期注册身份，与包名解耦 |
| `engines.dsh` 兼容范围 | 保持 `>=0.2.1-rc.2 <0.3.0-0`，不扩大承诺 |
| 许可证、第三方署名、上游仓库链接（CHANGELOG 历史） | 合规与来源追溯 |

## 3. 安装 / 更新 / 卸载 / 回滚

- 安装器（`scripts/install.mjs` + `install.cmd`）：写入受管目录、profile 依赖（`link:`）、`cordis.patch.yml`，并在卸载时回滚。
- 增强版把受管目录与备份目录改名，并在检测到原版包时中止，保证：
  - 增强版不会覆盖原版安装；
  - 原版的回滚记录不会被增强版清理；
  - 两者不要同时启用（会重复挂载 UI），迁移步骤见 README。
- 插件管理器（profile）安装路径：`node_modules/@zianyx6/dsh-codex-style-enhanced`，与原版路径不同。

## 4. 第三方与许可

- 主题包数据来自 `dsh-theme`（Apache-2.0），`licenses/dsh-theme-LICENSE` + `THIRD_PARTY_NOTICES.md` 保留。
- DSH 品牌图与 `licenses/DeepSeek-Harness-LICENSE` 保留。
- 上游项目（MIT）来源与作者在 README「来源与致谢」中保留。

## 5. 分支 / Tag / Release 现状

- 分支：`main`、`release/0.2.7`、`release/0.2.8`、`release/0.2.9`、`feat/theme-pack`、`feat/ui-redesign`、`fix/hero-project-picker`、`local/both`。
- Tag：`v0.2.6`–`v0.2.9`。
- Release：`v0.2.7`、`v0.2.8`、`v0.2.9`（zip 已修正，含 `package.json`）。
- 处理：全部保留；增强版新增 `v1.0.0`，不删除或改名既有 Tag/Release。

## 6. 风险与对策

| 风险 | 对策 |
|---|---|
| 包名变更导致 profile 找不到插件 | 同步更新 profile 依赖与 bundles 列表，并用本地 `file:` 包验证 |
| 原版与增强版同时安装 | 安装器检测并中止；README 写明互斥 |
| 设置丢失 | 不改任何 `data-*` 前缀与 `localStorage` 键 |
| 上游同步冲突 | 采用「上游安全修复选择性 cherry-pick」策略（见 `03-upstream-sync.md`） |
| 仓库更名影响链接 | 暂不执行；GitHub 更名会自动重定向，作为需要用户确认的手动操作 |

## 7. 实施顺序

1. 元数据与注册名（包名、版本、patch、skin、skills、安装器）。
2. README / CHANGELOG / 维护文档。
3. 新增身份测试与安装迁移检查，运行全量测试与构建。
4. 本地 profile 迁移到增强版并验证。
5. 打包 `dsh-codex-style-enhanced-1.0.0-windows.zip`；GitHub 更名 / npm 发布留待确认。
