# 04 · 发行检查清单

每次发行前逐项确认，全部通过才打 tag。

## 构建与测试

- [ ] `node scripts/build.mjs` 通过，产物大小与 `lib/client.js` 已提交
- [ ] `node --test --test-isolation=none` 全量测试通过（记录通过/跳过/失败数）
- [ ] `scripts/test-identity.mjs` 通过：包名、注册名、设置键、安装隔离
- [ ] 沙箱无法运行的用例（`test-install` 的 engines、`test-retirement` 的 npm pack）在记录中注明

## 身份与安装

- [ ] `package.json`：`name` 为 `@zianyx6/dsh-codex-style-enhanced`，`version` 与 tag 一致
- [ ] `cordis.patch.yml` 4 个 `name` 指向新包名及子路径
- [ ] `skin.json` 的 `package` 为新包名
- [ ] `src/skills.js` `SKILLS_PACKAGE` 与 `src/style.css` 的 `[data-plugin-detail]` 一致
- [ ] 安装器受管目录 `dsh-codex-style-enhanced/`、备份目录 `codex-style-enhanced-backups/`
- [ ] 检测到原版安装时能中止并给出提示

## 安装包

- [ ] ZIP 名称 `dsh-codex-style-enhanced-<version>-windows.zip`
- [ ] ZIP 内**包含 `package.json`**、`lib/`、`locale/`、`prompts/`、`licenses/`、`install.cmd`、`scripts/install.mjs`、`scripts/rollback.mjs`
- [ ] ZIP 不含测试脚本、截图、`node_modules`、本地路径
- [ ] 解压后 `install.cmd` 能识别自身版本

## 文档

- [ ] README 版本、Release 链接、安装包名正确
- [ ] CHANGELOG 有对应版本段落
- [ ] 上游来源与第三方许可证保留

## 发布后

- [ ] Tag 与 Release 指向同一提交
- [ ] 旧版本 Tag/Release/分支未被删除
- [ ] 如需同步 fork 的 `main`，先确认不会覆盖已有提交
