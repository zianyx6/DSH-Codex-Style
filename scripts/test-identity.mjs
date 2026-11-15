import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// 增强版身份与设置兼容：包名/注册名切换，但所有运行期标记与本地存储键保持不变。
const NEW = '@zianyx6/dsh-codex-style-enhanced';
const OLD = '@xinxing1708/dsh-codex-style';

const [manifest, patch, skin, skills, style, client, install, bundle, themePack, appearance, chrome, readme] = await Promise.all([
  readFile(new URL('../package.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8'),
  readFile(new URL('../skin.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(new URL('../src/skills.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/client.js', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/install.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../lib/client.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/theme-pack.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/appearance.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/chrome.js', import.meta.url), 'utf8'),
  readFile(new URL('../README.md', import.meta.url), 'utf8')
]);

test('包名、版本与注册身份切换到增强版', () => {
  assert.equal(manifest.name, NEW);
  assert.equal(manifest.version, '1.0.0');
  assert.match(patch, new RegExp(`name: '${NEW.replace('/', '\\/')}'`), '主插件注册');
  assert.match(patch, /dsh-codex-style-enhanced\/behavior/, '子组件注册');
  assert.equal(skin.package, NEW);
  assert.match(skills, /const SKILLS_PACKAGE = '@zianyx6\/dsh-codex-style-enhanced'/, '技能页包名');
  assert.match(style, new RegExp(`\\[data-plugin-detail="${NEW}"\\]`), '样式选择器与包名一致');
  assert.match(bundle, new RegExp(`id: "${NEW}"`), '构建产物 id');
});

test('运行期标记与设置键保持原样，升级不丢设置', () => {
  for (const key of ['data-dsh-codex-style', 'data-dsh-codex-chrome']) {
    assert.ok(style.includes(key), `${key} 保留`);
    assert.ok(client.includes(key) || chrome.includes(key), `${key} 仍被写入`);
  }
  for (const storage of ['dsh-codex-style:theme', 'dsh-codex-style:appearance', 'dsh-codex-style:sidebar-width']) {
    assert.ok(themePack.includes(storage) || appearance.includes(storage) || chrome.includes(storage), `${storage} 保留`);
  }
});

test('安装器与原版隔离：独立受管目录、拒绝同时安装', () => {
  assert.match(install, /'dsh-codex-style-enhanced', 'install-environment\.json'/, '独立安装环境记录');
  assert.match(install, /'dsh-codex-style-enhanced', manifest\.version/, '独立受管目录');
  assert.match(install, /codex-style-enhanced-backups/, '独立备份目录');
  assert.match(install, /originalPackage = '@xinxing1708\/dsh-codex-style'/, '检测原版');
  assert.match(install, /增强版与原版不能同时启用/, '互斥提示');
  assert.doesNotMatch(install, /legacyName/, '不再认领原版包名');
});

test('运行期元数据不再残留上游包名（致谢与历史文档除外）', () => {
  for (const [name, text] of [['package.json', JSON.stringify(manifest)], ['cordis.patch.yml', patch], ['skin.json', JSON.stringify(skin)], ['src/client.js', client], ['src/style.css', style], ['src/skills.js', skills]]) {
    assert.ok(!text.includes(OLD), `${name} 不含旧包名`);
  }
  assert.match(readme, /xinxing1708\/DSH-Codex-Style/, 'README 保留上游来源与致谢');
});

test('README 声明为独立维护的社区增强版', () => {
  assert.match(readme, /DSH Codex Style Enhanced/, '增强版名称');
  assert.match(readme, /社区增强版|独立维护/, '独立维护声明');
  assert.match(readme, /不代表|与上游项目无关|非官方/, '不代表上游立场');
});
