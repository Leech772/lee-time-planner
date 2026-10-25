const C='lee-time-v5-modules';
const A=['./','./index.html','./manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/lee-mark.svg',
 './modules/registry.js','./modules/en1b/day1.html','./modules/en1b/day1-words.html','./modules/en1b/day1-quiz.html','./modules/en1b/day2.html','./modules/en1b/day2-words.html','./modules/en1b/day3.html','./modules/en1b/day4.html','./modules/grammar5/day1.html','./modules/grammar5/day2.html','./modules/grammar5/day3.html','./modules/grammar5/day4.html','./modules/grammar5/day5.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
// 页面导航网络优先（在线时拿到最新版，离线回退缓存）；静态资源缓存优先。
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
  if(q.mode==='navigate'){e.respondWith(fetch(q).then(res=>{const cp=res.clone();const u=new URL(q.url);caches.open(C).then(c=>c.put(u.pathname.endsWith('/')?'./index.html':q,cp));return res;}).catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));return;}
  e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));return res;})));});
// 点击任务结束通知：聚焦已打开的 App 或打开计划页
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||'./#plan';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){c.postMessage({type:'open-plan',id:e.notification.data&&e.notification.data.id});if('focus' in c)return c.focus();}return self.clients.openWindow(url);}));});
