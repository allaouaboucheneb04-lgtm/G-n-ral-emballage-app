const C='general-emballage-v30';
const CORE=['./','./index.html','./style.css?v=30','./app.js?v=30','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(a=>Promise.all(a.filter(x=>x!==C).map(x=>caches.delete(x)))),self.clients.claim()])));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const isNav=e.request.mode==='navigate';
 if(isNav){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{caches.open(C).then(c=>c.put('./index.html',r.clone())).catch(()=>{});return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok)caches.open(C).then(c=>c.put(e.request,r.clone())).catch(()=>{});return r}).catch(()=>caches.match(e.request)));
});