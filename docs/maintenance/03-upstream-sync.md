# 03 · 选择性同步上游

上游只同步**安全修复**与**DSH 兼容性修复**，不同步与本增强版定位冲突的 UI 决策。

## 流程

```bash
git remote add upstream https://github.com/xinxing1708/DSH-Codex-Style.git   # 首次
git fetch upstream
git switch -c upstream-sync/<topic> main
git cherry-pick <upstream-commit>        # 只挑安全/兼容修复
node scripts/build.mjs
node --test --test-isolation=none scripts/test-client.mjs scripts/test-identity.mjs ...
```

- 冲突时优先保留增强版结构与设置键，只在语义上采纳上游修复。
- 合并后在 CHANGELOG 增加「上游修复」小节并注明来源 commit。
- 不整包合并上游 `main`，避免覆盖主题包、外观页、个人页等增强实现。

## 判断标准

| 类型 | 是否同步 |
|---|---|
| 安全漏洞、崩溃、内存泄漏 | 是 |
| 新 DSH 版本兼容修复 | 是 |
| 原版界面细节调整 | 视情况，与增强版冲突则跳过 |
| 上游产品方向/功能删减 | 否 |

## 上游身份隔离

- 增强版包名 `@zianyx6/dsh-codex-style-enhanced`，与原版 `@xinxing1708/dsh-codex-style` 不同；
- 安装器受管目录与备份目录均已改名，且检测到原版时中止；
- 运行时标记（`data-dsh-codex-style`）与存储键共用，**升级不丢设置**，但两版不要同时启用。
