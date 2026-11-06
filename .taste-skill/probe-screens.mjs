import { Browser } from '/home/cdenn/personal/taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
const b = await Browser.launch({ extraArgs: ['--no-sandbox'] });
const p = await b.newPage({ width: 1440, height: 900 });
await p.goto('http://localhost:3000', { settleMs: 1500 });
await p.eval(`(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,40));} window.scrollTo(0,0); await new Promise(r=>setTimeout(r,300)); })()`);
const info = await p.eval(`(()=>{
  const H=900, pageH=document.body.scrollHeight;
  const screens=Math.ceil(pageH/H);
  // sample content coverage per screen band
  const bands=[];
  for(let s=0;s<screens;s++){
    const top=s*H, bot=Math.min((s+1)*H,pageH);
    bands.push({screen:s+1, top, bot, items:[]});
  }
  const sig=(c)=>{const r=c.getBoundingClientRect(); const t=r.top+scrollY,bt=r.bottom+scrollY;
    const txt=(c.innerText||'').trim(); const isImg=c.tagName==='IMG'||c.tagName==='CANVAS';
    return {t,bt,h:r.height,txt:txt.slice(0,30),tag:c.tagName,img:isImg};};
  document.querySelectorAll('section,footer,article,form,figure,h1,h2,h3,h4,p,ul,img,a').forEach(c=>{
    const x=sig(c); if(x.h<10)return;
    bands.forEach(bd=>{ if(x.t<bd.bot&&x.bt>bd.top && (x.txt||x.img)) bd.items.push(x.tag+(x.img?'(img)':'')+':'+x.txt);});
  });
  return JSON.stringify(bands.map(b=>({screen:b.screen, top:b.top, n:b.items.length, sample:b.items.slice(0,3)})),null,0);
})()`);
console.log(info);
await b.close();
