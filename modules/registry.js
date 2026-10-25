/* Lee悦时间安排 · 模块注册表
 * 新增一个同类小程序：把页面放进 modules/<id>/，在下面数组里加一项，再把文件路径加进 sw.js 的预缓存列表。
 * 字段：id 唯一标识；name 名称；icon 图标；desc 简介；
 *   entries 入口列表 [{id, title, type:'lesson'|'words'|'quiz', src:相对路径}]
 *   taskTypes 本模块能提供的任务类型；
 *   storagePrefixes 本模块页面自己写入 localStorage 的键前缀（导出/导入 JSON 时一起备份）；
 *   pack 对应"学习计划包"的 id（可选）；mapTask(source_plan_id) → 对应 entry id（计划任务"开始学习"跳转与完成回写都靠它）
 */
window.LEE_MODULES=[
 {id:'en1b',name:'中职英语 1B',icon:'📘',desc:'中职英语1B老师做的互动课程与单词练习（Day1–Day4，Unit1–8）',
  taskTypes:['lesson','words','quiz'],storagePrefixes:['english1b_','lee-kit-en1b_'],pack:'en1b-v1',
  entries:[
   {id:'d1',title:'Day1 课程 · Unit1 Greetings + Unit2 Jobs',type:'lesson',src:'modules/en1b/day1.html'},
   {id:'d1w',title:'Day1 单词练习',type:'words',src:'modules/en1b/day1-words.html'},
   {id:'d1q',title:'Day1 小测与错题',type:'quiz',src:'modules/en1b/day1-quiz.html'},
   {id:'d2',title:'Day2 课程 · Unit3 House + Unit4 Shopping',type:'lesson',src:'modules/en1b/day2.html'},
   {id:'d2w',title:'Day2 单词拼写（41 词）',type:'words',src:'modules/en1b/day2-words.html'},
   {id:'d3',title:'Day3 · Unit5 Getting Around + Unit6 Weather（知识点·单词·拼写·练习）',type:'lesson',src:'modules/en1b/day3.html'},
   {id:'d4',title:'Day4 · Unit7 Festivals + Unit8 Health + 总复习',type:'lesson',src:'modules/en1b/day4.html'}],
  mapTask:k=>{const m=/^d(\d)-(.*)$/.exec(k||'');if(!m)return null;const n=m[1],r=m[2];
   if(n==='1')return r==='review'?'d1q':'d1';
   if(n==='2')return /words|passed/.test(r)?'d2w':'d2';
   return 'd'+n}},
 {id:'grammar5',name:'汉译英语法 5 天',icon:'✍️',desc:'语法老师的 5 天计划：每日小课 + 汉译英题（看答案自评）',
  taskTypes:['lesson','quiz'],storagePrefixes:['lee-kit-grammar5_'],pack:'grammar5-v1',
  entries:['句子骨架 + 主格/宾格','单三加 s + 单复数 + this/that','泛指用复数 + 我的/你的','物主代词 + 单三综合','这是/那是 + 陷阱题 + 总复习'].map((t,i)=>({id:'g'+(i+1),title:'语法 Day'+(i+1)+' · '+t,type:'lesson',src:'modules/grammar5/day'+(i+1)+'.html'})),
  mapTask:k=>{const m=/^g(\d)-/.exec(k||'');return m?'g'+m[1]:null}}
];
