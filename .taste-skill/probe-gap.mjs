import { Browser } from '/home/cdenn/personal/taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
const b = await Browser.launch({ extraArgs: ['--no-sandbox'] });
const p = await b.newPage({ width: 390, height: 844, mobile: true });
await p.goto('http://localhost:3000', { settleMs: 2000 });
// scroll to bottom to trigger reveals
await p.eval(`(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,40));} window.scrollTo(0,0); })()`);
const info = await p.eval(`(()=>{
  const out=[];
  const walk=(el)=>{
    for(const c of el.children){
      const r=c.getBoundingClientRect();
      const top=r.top+scrollY, bottom=r.bottom+scrollY;
      if(top<9000||top>11500) { walk(c); continue; }
      const txt=(c.innerText||'').trim().slice(0,40);
      out.push({tag:c.tagName, cls:(c.className||'').toString().slice(0,50), top:Math.round(top), h:Math.round(r.height), txt});
      walk(c);
    }
  };
  walk(document.body);
  return JSON.stringify(out.filter(o=>o.h>200), null, 0);
})()`);
console.log(info);
console.log('pageH', await p.eval(`document.body.scrollHeight`));
await b.close();
