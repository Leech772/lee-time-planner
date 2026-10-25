# 如何给「Lee悦时间安排」加一个新模块（同类小程序）

App = **外壳**（index.html：首页/计划/提醒/健身/饮食/娱乐/导入导出）+ **模块**（modules/ 下的独立小程序页面）。
模块页面在 App 里用全屏 iframe 打开，和 App 同源，离线由 sw.js 预缓存。

## 三步加模块
1. **放文件**：新建 `modules/<模块id>/`，把单文件 HTML 小程序放进去（不要引用外部网址/CDN，否则离线打不开）。
   没有现成页面时，可复制 `modules/en1b/day3.html` 当模板，改里面的 `DATA`（知识点 cards、单词 words、练习题 qs）。
2. **登记**：在 `modules/registry.js` 的 `window.LEE_MODULES` 数组加一项：
   ```js
   {id:'ielts', name:'雅思词汇', icon:'🎧', desc:'一句话简介',
    taskTypes:['lesson','words','quiz'],          // 能提供的任务类型
    storagePrefixes:['ielts_'],                   // 页面自己写 localStorage 的键前缀 → 随导出/导入 JSON 一起备份
    pack:'ielts-v1',                              // 可选：对应 index.html 里 PACKS 的学习计划包 id
    mapTask:k=>/^w(\d)-/.test(k)?'w'+k[1]:null,   // 可选：计划任务 key → 入口 id（用于「开始学习」跳转和学完自动勾选）
    entries:[{id:'w1', title:'Day1 单词', type:'words', src:'modules/ielts/day1.html'}]}
   ```
3. **缓存**：把新文件路径加进 `sw.js` 的 `A` 数组，并把 `C` 版本号改大（如 `lee-time-v6-xxx`），否则手机上不会更新/离线打不开。

## 可选
- 页面里学完时调用 `parent.postMessage({type:'lee-module-done'}, location.origin)`，App 会自动标记本节学完并勾选对应计划任务（顶部「✓ 学完了」按钮效果相同）。
- 想要一键把任务排进计划：在 index.html 的 `PACKS` 里加一个计划包，任务 key 与 `mapTask` 对应。
- 学习进度存在主数据 `learn.done`（键 `模块id:入口id`），导出 JSON 里另有 `moduleStore`（各模块页面自己的 localStorage）。
