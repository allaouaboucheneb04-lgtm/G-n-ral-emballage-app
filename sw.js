const C='general-emballage-v25';
const CORE=['./','index.html','style.css','app.js','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(a=>Promise.all(a.filter(x=>x!==C).map(x=>caches.delete(x)))),self.clients.claim()])));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{let copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(e.request)))});
