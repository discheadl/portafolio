const ICONS={
 orange:["....gg...","...g.....","..ooooo..",".ooooooo.",".oooo#oo.",".ooooooo.","..ooooo..",".........","........."],
 qr:["###.#.###","#.#...#.#","###.#.###","....#....","#.###.#.#","....#....","###..##.#","#.#.#..#.","###.##.##"],
 phone:[".#######.",".#.....#.",".#.....#.",".#.....#.",".#.....#.",".#.....#.",".#######.",".#..#..#.",".#######."],
 chart:["......##.","......##.","...##.##.","...##.##.","##.##.##.","##.##.##.","##.##.##.",".........","#########"],
 mail:[".........","#########","##.....##","#.#...#.#","#..#.#..#","#...#...#","#.......#","#########","........."],
 git:[".#.......","###...#..",".#...###.",".#....#..",".#...#...",".#..#....",".###.....","###......",".#......."],
 user:["...###...","..#####..","..#####..","...###...",".........",".#######.","#########","#########","#########"],
 pin:["..#####..",".#######.","###...###","###...###",".#######.","..#####..","...###...","....#....","........."],
 box:["..#####..",".#.....#.","#########","#.......#","#..###..#","#.......#","#.......#","#.......#","#########"],
 tool:["......##.",".....#..#","......#.#",".....###.","....###..","...###...","..###....",".###.....","###......"],
 img:["#########","#.......#","#.##....#","#.##....#","#.....#.#","#....###.","#.#.#####","#########","........."]
};
const PCOL={'#':'currentColor','o':'#e8892b','g':'#4f8a3a'};
document.querySelectorAll('.pxi[data-i]').forEach(el=>{
  const g=ICONS[el.dataset.i]; if(!g) return;
  let r='';g.forEach((row,y)=>[...row].forEach((ch,x)=>{if(PCOL[ch]) r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${PCOL[ch]}"/>`}));
  el.innerHTML=`<svg viewBox="0 0 9 9" aria-hidden="true">${r}</svg>`;
});
const B4=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
const thr=(x,y)=>(B4[((y|0)&3)*4+((x|0)&3)]+.5)/16;
const hx=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
class P{
  constructor(cv,w,h){cv.width=w;cv.height=h;this.c=cv.getContext('2d');this.w=w;this.h=h;this.img=this.c.createImageData(w,h);this.d=this.img.data}
  set(x,y,col){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=this.w||y>=this.h)return;const i=(y*this.w+x)*4;this.d[i]=col[0];this.d[i+1]=col[1];this.d[i+2]=col[2];this.d[i+3]=255}
  grad(y0,y1,pal){for(let y=Math.max(0,y0);y<Math.min(this.h,y1);y++){const t=(y-y0)/Math.max(1,(y1-y0))*(pal.length-1),i=Math.min(pal.length-2,Math.floor(t)),f=t-i;for(let x=0;x<this.w;x++)this.set(x,y,f>thr(x,y)?pal[i+1]:pal[i])}}
  rect(x,y,w,h,c){for(let j=0;j<h;j++)for(let i=0;i<w;i++)this.set(x+i,y+j,c)}
  disc(cx,cy,r,c){for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++)if(x*x+y*y<=r*r+r*.6)this.set(cx+x,cy+y,c)}
  glow(cx,cy,R,c,k){for(let y=-R;y<=R;y++)for(let x=-R;x<=R;x++){const d=Math.hypot(x,y);if(d<R&&(1-d/R)**1.6*k>thr(cx+x+512,cy+y+512))this.set(cx+x,cy+y,c)}}
  canopy(cx,cy,r,pal,R,side){for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++){const d=Math.hypot(x,y*1.1)/r;if(d>1)continue;if(d>.78&&R()<.55)continue;
      let s=.55-(y/r)*.45-(x/r)*.18*side+(R()-.5)*.5;s=Math.max(0,Math.min(.999,s));this.set(cx+x,cy+y,pal[Math.floor(s*pal.length)])}}
  done(){this.c.putImageData(this.img,0,0)}
}
const C=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,Array.isArray(v)?v.map(hx):hx(v)]));
function widthFor(cv,H){const r=cv.getBoundingClientRect();return Math.max(40,Math.round(H*r.width/Math.max(1,r.height)))}
const NC=C({sky:['#070b1d','#0c1430','#132047','#1d2f5e','#2b4475','#3d5b8c'],g1:'#2a4170',g2:'#4c6997',moon:'#f6eed4',crat:'#ddd2ae',star:'#ffffff',star2:'#9fb2e0',cloud:'#2b3e6b',hill:'#152240',hill2:'#101a2c',bld:'#0f1830',win:'#f7c96b',win2:'#e59a3f',smoke:'#2c3d66',ground:['#0e1812','#0a120d'],path:'#1b261f',post:'#05080a',lamp:'#ffe49c',lglow:'#3a3a2a',trunk:'#1a0f0a',leaves:['#5c1d14','#8e2f1a','#c4501f','#e07a2c','#f2b04a'],grass:'#17251a'});
function night(cv,{H=200,seed=3,city=true,hz=.64,moonX=.7,trees=1}={}){
  const W=widthFor(cv,H),p=new P(cv,W,H),R=rng(seed),hzY=Math.round(H*hz);
  p.grad(0,hzY+10,NC.sky);
  const tall=W<H*1.1,mx=Math.round(W*(tall?.8:moonX)),my=Math.round(H*(tall?.3:.18));
  p.glow(mx,my,Math.round(H*.26),NC.g1,.85);p.glow(mx,my,Math.round(H*.13),NC.g2,.7);
  for(let i=0;i<W*hzY/170;i++){const x=R()*W,y=R()*hzY*.85;if(Math.hypot(x-mx,y-my)<H*.15)continue;p.set(x,y,R()<.7?NC.star2:NC.star);if(R()<.06){p.set(x+1,y,NC.star2);p.set(x-1,y,NC.star2);p.set(x,y+1,NC.star2);p.set(x,y-1,NC.star2)}}
  const mr=Math.max(4,Math.round(H*.045));p.disc(mx,my,mr,NC.moon);p.set(mx+2,my-1,NC.crat);p.set(mx-2,my+2,NC.crat);p.set(mx-1,my+2,NC.crat);p.set(mx+1,my+3,NC.crat);
  for(let k=0;k<Math.max(2,W/90);k++){const cx=R()*W,cy=H*(.22+R()*.22),L=12+R()*36;for(let i=-L;i<L;i++){const th=Math.round(1.5+1.5*Math.cos(i/L*Math.PI/2)+R());for(let j=0;j<th;j++)if(thr(cx+i,cy+j)<.7)p.set(cx+i,cy+j-th/2,NC.cloud)}}
  const ph=R()*9;for(let x=0;x<W;x++){const y=Math.round(hzY-4+3*Math.sin(x*.045+ph)+2*Math.sin(x*.13+ph*2));for(let j=y;j<H;j++)p.set(x,j,NC.hill)}
  if(city){let x=Math.round(W*(W>360?.5:.42));const end=Math.round(W*(W>360?.86:.98)),base=hzY+1;
    while(x<end){const bw=5+Math.floor(R()*10),bh=Math.min(H*.2,7+Math.floor(R()*24)),top=base-bh;
      if(R()<.25){const fh=Math.round(bh*.55);p.rect(x,base-fh,bw+6,fh,NC.bld);for(let t=0;t<bw+6;t+=4)for(let k=0;k<3;k++)p.rect(x+t,base-fh-3+k,4-k,1,NC.bld);
        if(R()<.8){const cxh=x+2,ch=Math.round(bh*1.1);p.rect(cxh,base-ch,2,ch,NC.bld);for(let s=0;s<14;s++)if(R()<.6)p.set(cxh+1+s*.5+Math.sin(s*.7)*1.5,base-ch-2-s,NC.smoke)}
        for(let wx=x+1;wx<x+bw+5;wx+=3)if(R()<.4)p.set(wx,base-fh+3,NC.win2);x+=bw+7}
      else{p.rect(x,top,bw,bh,NC.bld);if(R()<.3)p.rect(x+Math.floor(bw/2),top-4,1,4,NC.bld);
        for(let wy=top+2;wy<base-1;wy+=3)for(let wx=x+1;wx<x+bw-1;wx+=2)if(R()<.28)p.set(wx,wy,R()<.8?NC.win:NC.win2);x+=bw+(R()<.4?1:0)}}}
  for(let x=0;x<W;x++){const y=Math.round(hzY+7+2*Math.sin(x*.07+ph)+1.5*Math.sin(x*.21));for(let j=y;j<H;j++)p.set(x,j,NC.hill2)}
  const gy=hzY+14;p.grad(gy,H,NC.ground);
  for(let i=0;i<W*(H-gy)/22;i++)p.set(R()*W,gy+R()*(H-gy),NC.grass);
  const pc=W*.5;for(let y=gy;y<H;y++){const hw=(y-gy)*.55+1,cx=pc+Math.sin(y*.09)*4;for(let x=-hw;x<=hw;x++)p.set(cx+x,y,NC.path)}
  if(H-gy>16)[[-1,.45],[1,.72]].forEach(([s,f])=>{const y=Math.round(gy+(H-gy)*f),hw=(y-gy)*.55+1,x=Math.round(pc+s*(hw+4)),ph2=Math.round(H*.09);
    p.glow(x,y-ph2,Math.round(H*.07),NC.lglow,.9);p.rect(x,y-ph2,1,ph2,NC.post);p.rect(x-1,y-ph2-2,3,2,NC.lamp)});
  if(trees){const side=(s)=>{const n=W>360?4:(tall?1:2);for(let i=0;i<n;i++){const tx=s<0?Math.round(R()*W*.16+i*4):Math.round(W-R()*W*.16-i*4),r=Math.round(Math.min(H*(.12+R()*.09),W*(tall?.14:.2))),ty=Math.round(H*(.52+R()*.18));
      for(let y=ty;y<H;y++){const w=y>H-6?3:2;p.rect(tx-1,y,w,1,NC.trunk)}for(let b=0;b<4;b++){const by=ty+Math.round(R()*r*.8);for(let k=0;k<r*.7;k++)p.set(tx+(b%2?k:-k)*.8,by-k*.5,NC.trunk)}
      p.canopy(tx,ty-Math.round(r*.2),r,NC.leaves,R,s);if(R()<.7)p.canopy(tx+Math.round((R()-.5)*r),ty-r+Math.round(R()*r*.4),Math.round(r*.65),NC.leaves,R,s)}};side(-1);side(1)}
  p.done();
}
function tree(cv){
  const W=64,H=80,p=new P(cv,W,H),R=rng(21),T=C({tr:'#6b4423',tr2:'#4a2e17',l:['#1f4d24','#2f6b2f','#3f8a3a','#5aa64a','#8cc95e'],o:'#f28c28',oh:'#ffc46b',os:'#c4600f',bl:'#fffaf0',gr:['#5aa64a','#3f8a3a']});
  for(let y=44;y<74;y++){const w=y>66?5:3,x=31-Math.floor(w/2)+Math.round(Math.sin(y*.3)*.6);p.rect(x,y,w,1,T.tr);p.set(x,y,T.tr2)}
  for(let k=0;k<10;k++){p.set(32+k*.9,52-k*.7,T.tr);p.set(30-k*.9,56-k*.8,T.tr)}
  [[32,30,22],[18,36,12],[46,35,12],[32,16,12]].forEach(([x,y,r])=>p.canopy(x,y,r,T.l,R,1));
  [[22,24],[38,20],[44,34],[28,38],[17,40],[35,30],[48,26],[24,32],[40,42],[31,12],[12,32]].forEach(([x,y])=>{p.disc(x,y,2,T.o);p.set(x-1,y-1,T.oh);p.set(x+1,y+2,T.os);p.set(x+2,y+1,T.os)});
  for(let i=0;i<8;i++)p.set(12+R()*40,12+R()*30,T.bl);
  for(let x=10;x<54;x++){const h=1+((x*7)%3===0?2:0)+(R()<.3?1:0);for(let j=0;j<h;j++)p.set(x,74-j,T.gr[(x+j)%2])}
  p.done();
}
const DC=C({w:'#ffffff',w2:'#e9f2fb',sh:'#c8dcef',leaf:['#1d4a22','#2c6a2c','#3e8a36','#5aa648','#86c65c'],hill:'#4f9a3e',hill2:'#3b7d31',grass:['#3d8231','#2f6a26','#4f9a3e'],stem:'#2f5e22',fl:['#f4f1e8','#f2b33d','#9b6bd1','#e8892b'],ctr:'#6b3d14'});
const SKIES={1:{sky:C({s:['#2f7fd0','#4b98e0','#72b4ec','#a4d2f6']}).s,trees:true,seed:5},2:{sky:C({s:['#1f6db8','#3a8ad0','#63aae6','#9fd0f3']}).s,hills:true,seed:11},3:{sky:C({s:['#2a78c4','#4c95da','#7ab8ea','#b3dbf8']}).s,trees:true,flowers:true,seed:17}};
function cloud(p,cx,cy,s,R){const parts=[],n=4+Math.floor(R()*3);
  for(let i=0;i<n;i++)parts.push([cx+(i/(n-1)-.5)*s*3,cy,s*(.42+R()*.2)]);
  const m=2+Math.floor(R()*2);for(let i=0;i<m;i++)parts.push([cx+(R()-.5)*s*1.6,cy-s*(.35+R()*.25),s*(.5+R()*.3)]);
  const bot=cy+s*.32;
  for(let y=Math.floor(cy-s*1.3);y<=bot;y++)for(let x=Math.floor(cx-s*2.2);x<cx+s*2.2;x++){let inside=false;for(const [px,py,r] of parts)if((x-px)**2+(y-py)**2<r*r){inside=true;break}
    if(!inside)continue;const t=(bot-y)/(s*1.5);p.set(x,y,t<.12?DC.sh:(t<.3&&thr(x,y)>t*2.6?DC.w2:DC.w))}}
function day(cv,cfg,H=110){
  const W=widthFor(cv,H),p=new P(cv,W,H),R=rng(cfg.seed);p.grad(0,H,cfg.sky);
  for(let k=0;k<Math.max(2,W/55);k++)cloud(p,R()*W,H*(.12+R()*.45),H*(.06+R()*.07),R);
  if(cfg.hills){for(let x=0;x<W;x++){const y=Math.round(H*.8+3*Math.sin(x*.06)+2*Math.sin(x*.17));for(let j=y;j<H;j++)p.set(x,j,j<y+2?DC.hill:DC.hill2)}}
  if(cfg.flowers){const gy=Math.round(H*.84);p.grad(gy,H,DC.grass);for(let i=0;i<W/3;i++){const x=R()*W,y=gy+2+R()*(H-gy),c=DC.fl[Math.floor(R()*DC.fl.length)];p.set(x,y-1,DC.stem);p.set(x,y-2,c)}}
  if(cfg.trees){const r=Math.round(H*.28);p.canopy(Math.round(-r*.2),Math.round(H*.2),r,DC.leaf,R,-1);p.canopy(Math.round(r*.4),Math.round(-r*.2),Math.round(r*.8),DC.leaf,R,-1);
    p.canopy(W+Math.round(r*.1),Math.round(H*.72),r,DC.leaf,R,1);p.canopy(W-Math.round(r*.5),H+Math.round(r*.2),Math.round(r*.9),DC.leaf,R,1)}
  p.done();
}
function contact(cv){
  const H=170,W=widthFor(cv,H),p=new P(cv,W,H),R=rng(9);p.grad(0,H,C({s:['#1a64ad','#2f7cc6','#4d98dc','#78b6ec','#a9d4f6']}).s);
  if(W>H*1.4){for(let k=0;k<Math.max(3,W/90);k++)cloud(p,W*(.7+R()*.34),H*(.12+R()*.4),H*(.05+R()*.05),R);cloud(p,W*.88,H*.3,H*.1,R)}
  else{cloud(p,W*.78,H*.08,H*.04,R);cloud(p,W*.2,H*.62,H*.035,R)}
  const base=Math.round(H*.72);
  for(let x=0;x<W;x++){const y=Math.round(base+3*Math.sin(x*.035)+2*Math.sin(x*.11));for(let j=y;j<H;j++)p.set(x,j,DC.grass[(j-y)<2?2:((x+j)%5===0?0:1)])}
  for(let i=0;i<W*1.4;i++){const x=R()*W,yb=base+4+R()*(H-base-4),h=2+Math.floor(R()*5),c=DC.fl[Math.floor(R()*DC.fl.length)];for(let j=0;j<h;j++)p.set(x,yb-j,DC.stem);p.set(x,yb-h,c);if(R()<.35){p.set(x-1,yb-h,c);p.set(x+1,yb-h,c);p.set(x,yb-h-1,c)}}
  for(let i=0;i<Math.max(4,W/40);i++){const x=Math.round(R()*W),yb=H-1,h=Math.round(H*(.14+R()*.1)),c=DC.fl[1+Math.floor(R()*3)];for(let j=0;j<h;j++)p.set(x,yb-j,DC.stem);p.set(x+1,yb-Math.round(h*.5),DC.stem);p.set(x+2,yb-Math.round(h*.5)-1,DC.leaf[3]);
    const cy=yb-h-2;for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)if(a*a+b*b<=9&&a*a+b*b>1)p.set(x+a,cy+b,c);p.disc(x,cy,1,DC.ctr)}
  p.done();
}
function ring(p,cx,cy,rx,ry,c){for(let a=0;a<64;a++){const t=a/64*Math.PI*2;p.set(cx+Math.cos(t)*rx,cy+Math.sin(t)*ry,c)}}
function factory(cv){
  const H=160,W=widthFor(cv,H),p=new P(cv,W,H),R=rng(7),wide=W>H*1.9;
  const F=C({wall:['#141b28','#1b2434','#242f45'],panel:'#121824',win:['#3d5677','#5f7c9e'],winf:'#0e131c',floor:['#3a3f48','#2e323a','#24272d'],stripe:'#e6b422',cord:'#0b0e14',shade:'#2a2f38',bulb:'#ffe1a0',glow:'#2f3341',glow2:'#454451',rack:'#d9692b',rack2:'#9c4719',die:['#4f5863','#727c88','#9aa4af'],tag:'#f4f4f0',tagd:'#1b1b1b',m:'#3e6a8a',m2:'#2c4d66',m3:'#6a98b8',blk:'#15181d',yel:'#f2c230',red:'#e5483b',grn:'#57c26a',box:'#2b2f36',pal:'#8a6a3c',pal2:'#6b5130'});
  const fy=Math.round(H*.72);
  p.grad(0,fy,F.wall);
  for(let x=0;x<W;x+=22)p.rect(x,24,1,fy-24,F.panel);
  for(let x=6;x<W-14;x+=30){p.rect(x,6,20,14,F.winf);for(let j=0;j<12;j++)for(let i=0;i<18;i++)p.set(x+1+i,7+j,(j/12)>thr(x+i,j)?F.win[0]:F.win[1]);p.rect(x+10,6,1,14,F.winf)}
  for(let x=24;x<W;x+=52){p.glow(x,58,30,F.glow,.95);p.glow(x,48,15,F.glow2,.85)}
  p.grad(fy,H,F.floor);
  for(let x=0;x<W;x+=7)p.rect(x,fy+8,4,1,F.stripe);
  for(let x=24;x<W;x+=52)p.glow(x,fy+20,10,F.glow2,.5);
  const rEnd=Math.round(W*(wide?.6:.98));
  for(let x=Math.round(W*.03);x+56<=rEnd;x+=60){
    const top=fy-66;
    [0,54].forEach(o=>{p.rect(x+o,top,2,fy-top+2,F.rack);p.rect(x+o+1,top,1,fy-top+2,F.rack2)});
    [top,top+22,top+44].forEach(ly=>{
      p.rect(x,ly+18,56,2,F.rack);p.rect(x,ly+20,56,1,F.rack2);
      let bx=x+3;while(bx<x+50){const w=7+Math.floor(R()*8),h=6+Math.floor(R()*9);if(bx+w>x+52)break;const b=ly+18,t=b-h;
        p.rect(bx,t,w,h,F.die[1]);p.rect(bx,t,w,1,F.die[2]);p.rect(bx+w-1,t,1,h,F.die[0]);p.rect(bx,b-1,w,1,F.die[0]);
        if(w>=7&&h>=7&&R()<.85){p.rect(bx+1,t+2,4,4,F.tag);p.set(bx+1,t+2,F.tagd);p.set(bx+4,t+2,F.tagd);p.set(bx+1,t+5,F.tagd);p.set(bx+3,t+4,F.tagd)}
        bx+=w+2}});
  }
  if(wide){
    const x0=Math.round(W*.68),pw=Math.round(Math.min(W*.2,84)),top=fy-104;
    p.rect(x0,top,pw,16,F.m);p.rect(x0,top,pw,1,F.m3);
    p.rect(x0+2,top+16,9,fy-top-16,F.m);p.rect(x0+pw-11,top+16,9,fy-top-16,F.m);p.rect(x0+2,top+16,1,fy-top-16,F.m3);p.rect(x0+pw-3,top+16,1,fy-top-16,F.m2);
    p.rect(x0+11,top+26,pw-22,18,F.m2);p.rect(x0+11,top+26,pw-22,1,F.m3);
    p.rect(x0+13,top+44,pw-26,4,F.die[2]);p.rect(x0+13,top+56,pw-26,10,F.die[1]);p.rect(x0+13,top+56,pw-26,1,F.die[2]);
    p.rect(x0+6,top+66,pw-12,8,F.m);
    for(let y=fy-14;y<fy;y++)for(let x=x0;x<x0+pw;x++)p.set(x,y,((x+y)>>2)&1?F.yel:F.blk);
    p.rect(x0+pw+5,fy-56,11,18,F.box);p.set(x0+pw+8,fy-52,F.red);p.set(x0+pw+12,fy-52,F.grn);p.rect(x0+pw+8,fy-46,5,1,F.yel);p.rect(x0+pw+10,fy-38,1,38,F.box);
    const px0=Math.round(W*.86);if(px0+30<W){p.rect(px0,fy+4,30,3,F.pal);p.rect(px0,fy+7,30,1,F.pal2);p.rect(px0+3,fy-6,11,10,F.die[1]);p.rect(px0+3,fy-6,11,1,F.die[2]);p.rect(px0+16,fy-3,10,7,F.die[1]);p.rect(px0+16,fy-3,10,1,F.die[2])}
  }
  for(let x=24;x<W;x+=52){p.rect(x,0,1,36,F.cord);p.rect(x-4,36,9,3,F.shade);p.rect(x-3,39,7,1,F.bulb)}
  p.done();
}
function gallery(cv){
  const H=160,W=widthFor(cv,H),p=new P(cv,W,H),R=rng(13),wide=W>H*1.9;
  const G=C({ceil:['#bfb59f','#cfc6b2'],wall:['#efe9dc','#e4dccb'],spot:'#f8f4ea',base:'#b5a78b',floor:['#a8784f','#9a6c46','#8d603c'],seam:'#6e4a2d',mat:'#f7f4ec',bench:'#5b3d28',bench2:'#3e2a1b',teal:'#2a9d8f',org:'#f4a261',door:'#8e8370',door2:'#a59a84',track:'#3a3a3a',lamp:'#2c2c2c'});
  const FR=['#3b2a1e','#b08a3e','#2c2c2c'].map(hx);
  const ART=[['#2f6fb0','#f2c14e','#4f8a3a'],['#c2492b','#e8892b','#2c2c2c'],['#1f4d6b','#7fb3c8','#e9e2d0'],['#6b3d6e','#d98aa0','#f4f1e8'],['#2a9d8f','#e9c46a','#264653']].map(a=>a.map(hx));
  const fy=Math.round(H*.7);
  p.grad(0,10,G.ceil);p.grad(10,fy,G.wall);p.rect(0,10,W,1,G.track);
  p.rect(0,fy-3,W,3,G.base);
  for(let y=fy;y<H;y++){const k=Math.floor((y-fy)/4);for(let x=0;x<W;x++){p.set(x,y,G.floor[k%3]);if((x+k*23)%46===0||(y-fy)%4===3&&x%2===0&&false)p.set(x,y,G.seam)}}
  let doorX=wide?W-48:-100;
  if(wide){p.rect(doorX,fy-62,30,62,G.door);for(let a=-15;a<=15;a++){const h=Math.round(Math.sqrt(225-a*a));p.rect(doorX+15+a,fy-62-h,1,h,G.door)}p.rect(doorX+3,fy-58,24,58,G.door2);ring(p,doorX+15,fy-28,4,4,G.teal);p.set(doorX+15,fy-28,G.teal)}
  let x=10;const end=wide?doorX-12:W-8;
  while(x<end){const fw=24+Math.floor(R()*30),fh=18+Math.floor(R()*24);if(x+fw>end)break;const cx=x+fw/2,top=Math.round(fy*.46-fh/2);
    p.glow(Math.round(cx),top-4,Math.round(fw*.75),G.spot,.95);
    p.rect(Math.round(cx),11,1,4,G.track);p.rect(Math.round(cx)-1,15,3,2,G.lamp);
    const fc=FR[Math.floor(R()*3)];p.rect(x,top,fw,fh,fc);p.rect(x+2,top+2,fw-4,fh-4,G.mat);
    const ax=x+4,ay=top+4,aw=fw-8,ah=fh-8,pal=ART[Math.floor(R()*ART.length)],t=Math.floor(R()*3);
    if(t===0){for(let j=0;j<ah;j++)for(let i=0;i<aw;i++){const hz=ah*.6+Math.sin(i*.4)*2;p.set(ax+i,ay+j,j<hz?pal[2-(j<ah*.3?1:0)]:pal[0])}p.disc(ax+Math.round(aw*.7),ay+Math.round(ah*.3),2,pal[1])}
    else if(t===1){const cut=[0,Math.round(ah*.45),Math.round(ah*.8),ah];for(let k=0;k<3;k++)p.rect(ax,ay+cut[k],aw,cut[k+1]-cut[k],pal[k])}
    else{p.rect(ax,ay,aw,ah,pal[2]);p.disc(ax+Math.round(aw/2),ay+Math.round(ah/2),Math.max(2,Math.round(Math.min(aw,ah)/3)),pal[0]);p.rect(ax+1,ay+ah-3,aw-2,2,pal[1])}
    if(R()<.4){const hx2=x+fw+3,hy=top+fh-4;p.disc(hx2,hy,2,G.org);p.set(hx2,hy,hx('#ffffff'))}
    x+=fw+12+Math.floor(R()*14)}
  const bx=Math.round(W*.42);p.rect(bx,fy+16,Math.min(48,Math.round(W*.25)),4,G.bench);p.rect(bx,fy+20,Math.min(48,Math.round(W*.25)),1,G.bench2);p.rect(bx+3,fy+21,2,7,G.bench2);p.rect(bx+Math.min(48,Math.round(W*.25))-5,fy+21,2,7,G.bench2);
  ring(p,Math.round(W*.2),fy+30,8,3,G.teal);ring(p,Math.round(W*.2),fy+30,4,1.5,G.teal);
  ring(p,Math.round(W*.72),fy+36,8,3,G.teal);ring(p,Math.round(W*.72),fy+36,4,1.5,G.teal);
  p.done();
}
function market(cv){
  const H=160,W=widthFor(cv,H),p=new P(cv,W,H),R=rng(29),wide=W>H*1.9;
  const M=C({wall:['#f3eee3','#e7e0d0'],tile:['#d9d3c5','#cac3b3'],shelf:'#8d939b',shelf2:'#62676e',back:'#d7cfbd',tag:'#f7e27a',lamp:'#ffffff',lglow:'#faf7f0',bsk:'#c8372d',bsk2:'#8f231b',bread:'#d49a52',bread2:'#a8723a',bottle:'#3f8a3a',orange:'#f28c28',sign:'#2c6e9b'});
  const ITEMS=['#e8892b','#41a1cf','#d64545','#4f8a3a','#f2c14e','#9b6bd1','#f4f1e8','#2c6e9b','#c2492b','#2a9d8f'].map(hx),WHITE=hx('#ffffff');
  const fy=Math.round(H*.76);
  p.grad(0,fy,M.wall);
  for(let x=10;x<W;x+=44){p.glow(x+12,8,18,M.lglow,.8);p.rect(x,4,24,2,M.lamp)}
  for(let y=fy;y<H;y++)for(let x=0;x<W;x++)p.set(x,y,((x>>3)+((y-fy)>>2))&1?M.tile[0]:M.tile[1]);
  const end=wide?Math.round(W*.76):W-4;
  for(let x=4;x+46<=end;x+=50){
    const top=fy-96;p.rect(x,top,46,fy-top,M.back);p.rect(x,top,46,4,M.sign);p.rect(x,top,2,fy-top,M.shelf);p.rect(x+44,top,2,fy-top,M.shelf);
    for(let ly=top+22;ly<fy;ly+=18){
      let ix=x+3;while(ix<x+42){const t=R(),c=ITEMS[Math.floor(R()*ITEMS.length)];let w,h;
        if(t<.5){w=3+Math.floor(R()*4);h=7+Math.floor(R()*7)}else if(t<.8){w=3;h=5}else{w=2;h=9}
        if(ix+w>x+43)break;const b=ly-1;
        if(t>=.8){p.rect(ix,b-h+3,w,h-3,c);p.rect(ix,b-h,1,3,c)}else{p.rect(ix,b-h+1,w,h,c);p.rect(ix,b-Math.round(h/2),w,1,WHITE)}
        ix+=w+1}
      p.rect(x+2,ly,42,2,M.shelf);p.rect(x+2,ly+2,42,1,M.shelf2);
      for(let tx=x+5;tx<x+42;tx+=11)p.rect(tx,ly+1,3,1,M.tag)}
  }
  const bx=Math.round(wide?W*.84:W*.62),by=H-4,bw=40,bh=18;
  p.disc(bx-6,by-bh-2,4,M.bread);p.rect(bx-12,by-bh-2,12,4,M.bread);p.rect(bx-11,by-bh-3,10,1,M.bread2);
  p.rect(bx+6,by-bh-12,3,12,M.bottle);p.rect(bx+7,by-bh-15,1,3,M.bottle);
  p.disc(bx+16,by-bh,3,M.orange);p.set(bx+15,by-bh-1,hx('#ffc46b'));
  for(let j=0;j<bh;j++){const inset=Math.round(j*.25);for(let i=-bw/2+inset;i<bw/2-inset;i++){const xx=bx+i,yy=by-bh+j;p.set(xx,yy,(j%4===0||(i+40)%5===0)?M.bsk2:M.bsk)}}
  p.rect(bx-bw/2,by-bh,bw,2,M.bsk2);
  for(let a=0;a<=20;a++){const t=a/20*Math.PI;p.set(bx-12+Math.cos(t)*7,by-bh-Math.sin(t)*9,M.bsk2);p.set(bx+12+Math.cos(t)*7,by-bh-Math.sin(t)*9,M.bsk2)}
  p.done();
}
const SCENES={factory,gallery,market};
function renderAll(){
  document.querySelectorAll('canvas[data-scene]').forEach(cv=>SCENES[cv.dataset.scene](cv));
  night(document.getElementById('cv-hero'),{H:200,seed:3,hz:.66});
  tree(document.getElementById('cv-tree'));
  document.querySelectorAll('canvas[data-sky]').forEach(cv=>day(cv,SKIES[cv.dataset.sky]));
  contact(document.getElementById('cv-sky'));
  night(document.getElementById('cv-foot'),{H:90,seed:41,hz:.42,moonX:.18});
}
renderAll();
let rt,lastW=innerWidth;addEventListener('resize',()=>{if(Math.abs(innerWidth-lastW)<40)return;lastW=innerWidth;clearTimeout(rt);rt=setTimeout(renderAll,150)});
const dg=document.getElementById('dg'),steps=[...document.querySelectorAll('.steps .step')];
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){steps.forEach(s=>s.classList.toggle('on',s===e.target));dg.dataset.step=e.target.dataset.step}})},{rootMargin:'-45% 0px -45% 0px'});
steps.forEach(s=>io.observe(s));
function renum(){let n=0;document.querySelectorAll('figcaption b').forEach(b=>{if(b.closest('figure').offsetParent!==null)b.textContent='Fig. '+(++n)})}
document.querySelectorAll('.shot img').forEach(img=>{
  const box=img.parentElement,miss=()=>box.classList.add('missing');
  if(img.complete&&img.naturalWidth===0)miss();img.addEventListener('error',miss);
  box.addEventListener('click',()=>{if(box.classList.contains('missing'))return;const lb=document.getElementById('lb');lb.querySelector('img').src=img.src;lb.classList.add('on')});
});
const lb=document.getElementById('lb');lb.addEventListener('click',()=>lb.classList.remove('on'));
addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});
renum();
