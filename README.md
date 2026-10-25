# Lee悦时间安排（手机 PWA）

在线地址：https://leech772.github.io/lee-time-planner/

离线可用的个人时间与学习安排 PWA：**外壳 + 模块**结构。`index.html` 是外壳（计划/提醒/健身/饮食/娱乐/导入导出），`modules/` 里是内置的学习小程序（中职英语 1B Day1–Day4 课程与单词练习、汉译英语法 5 天），注册表 `modules/registry.js`。无依赖、无账号、无云，数据只存本机浏览器。

## 安装
iPhone 用 Safari 打开在线地址 → 分享 →「添加到主屏幕」；Android 用 Chrome →「安装应用」。之后可离线使用。请定期在「更多 → 数据与设置」里「导出 JSON」备份。

## 功能
- 首页总览、今日计划（优先级、延期、逾期移到今天）、健身、饮食、游戏娱乐、自媒体/开发/咨询简表、回收站、深浅色与三种外观。
- **任务结束提醒**：开始时间 + 结束时间（或预计分钟）到点弹卡片响铃，可完成 / 知道了 / 延后 5、15 分钟；后台错过的提醒回到 App 时补弹。iOS 需 16.4+ 且从主屏幕打开才能授权系统通知；纯本地 PWA 无服务器推送，后台被挂起时无法保证准点。
- **学习计划包**（更多 → 学习计划包），一键写入「计划」，不用传文件：
  - 中职英语 1B · 4 天冲刺（来源：中职英语1B老师 的知识点总表 + day1/day2 进度）：Day1 Unit1+2（已学，标记完成 + 复习）；Day2 Unit3+4（已过关 17 词只复习，剩余 24 词拼写、现在进行时、比较级、对话、测验）；Day3 Unit5+6；Day4 Unit7+8 + 总复习。每单元：单词 → 语法 → 对话 → 测验与订正。
  - 汉译英语法 5 天（来源：grammar_course/daily_plan.md）：小课 → 新题 → 错题换个讲法，Day5 小测验。
  - 选起始日期（今天/明天/自选），Day1 = 起始日，逐日顺延。只排 8:00–12:00、14:00–17:30、19:00–22:00（17:30–18:20 健身不排），间隔 10 分钟，避开当天已有计划；今天导入从当前时间之后排，排不下的不设时间。默认开启结束提醒。
  - 防重复：每条带 `source_pack` / `source_plan_id`，再次导入可选「覆盖」（按新起始日重排，已完成保持完成）或「跳过已导入」。

## 学习模块（底部「📖 学习」）
- 列出每个模块的各天课程/单词练习/测验，点一下全屏打开，离线可用；顶部「‹ 学习」返回、「✓ 学完了」标记完成。
- 打通计划：计划包导入的学习任务在计划列表有「学习」按钮，点开任务详情有「▶ 开始学习」，直接跳到对应那天；学完会自动把对应计划任务勾为完成。
- 首页「学习进度」卡片：今日学习任务、每个模块进度和「继续」下一节。
- 进度随「导出/导入 JSON」一起保存（`learn` + `moduleStore`）。

## 如何加新模块
见 [MODULES.md](MODULES.md)：放 `modules/<id>/xxx.html` → 在 `modules/registry.js` 登记 → 把路径加进 `sw.js` 并改版本号。

## 数据与桌面版对齐
- localStorage 单键 `lee-time-data-v1`（同源旧 key `muzi-mobile-data-v1` 首次打开自动迁移）。
- 导出 `lee-time-export-日期.json`，结构 = 桌面版 all-data.json（各集合 snake_case 字段 + settings + trash + `_meta`）。旧版手机导出和桌面版导出仍可导入。
- 手机专有字段（桌面导入会忽略）：planItems 的 `remind_at_end`、`remind_before_minutes`、`reminder_snooze_until`、`reminder_ack_at`、`source_pack`、`source_plan_id`，列在导出 `_meta.mobileOnlyFields`。

## 从旧网址迁移
旧网址是另一个站点，数据不会自动带过来：在旧网址的 App 里「导出 JSON」→ 新网址「导入 JSON」，然后删除旧主屏幕图标、从新网址重新添加。

## 部署
图标以 base64 文本（`icons/*.png.b64`）提交，GitHub Actions（`.github/workflows/pages.yml`）构建时解码为 PNG 并发布到 GitHub Pages（Settings → Pages → Source 选 GitHub Actions）。
