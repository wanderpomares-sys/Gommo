/* Gemmo Combo — idiomas (pt, en, es, de). Traduz as strings na entrada do DOM e do canvas,
   por isso o código do jogo continua escrito em português. Trocar de idioma recarrega a página. */
(function(){
'use strict';
var LANGS=['pt','en','es','de'], NAMES={pt:'Português',en:'English',es:'Español',de:'Deutsch'}, LOC={pt:'pt-BR',en:'en-US',es:'es-ES',de:'de-DE'};
var L='';
try{L=localStorage.getItem('gemmo_lang')||'';}catch(e){}
if(LANGS.indexOf(L)<0){
  var n=((navigator.languages&&navigator.languages[0])||navigator.language||'en').toLowerCase().slice(0,2);
  L=LANGS.indexOf(n)>=0?n:'en';
}
window.GEMMO_LANG=L;
document.documentElement.lang={pt:'pt-BR',en:'en',es:'es',de:'de'}[L];
window.gmSetLang=function(l){ try{localStorage.setItem('gemmo_lang',l);}catch(e){} location.reload(); };
var D=/*DICT*/;
var RXS=/*RX*/;
var idx=LANGS.indexOf(L);
var EX=new Map(), FR=new Map(), keys=[];
D.forEach(function(r){ var k=r[0], v=r[idx]; if(!v)return; var t=k.trim(); if(t===k||true){EX.set(t,v.trim());} FR.set(k,v); keys.push(k); });
keys.sort(function(a,b){return b.length-a.length;});
var esc=function(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');};
var LET='A-Za-zÀ-ÿ0-9';
var re=new RegExp(keys.map(function(k){
  var a=/^[A-Za-zÀ-ÿ0-9]/.test(k)?'(?<![A-Za-zÀ-ÿ0-9])':'', b=/[A-Za-zÀ-ÿ]$/.test(k)?'(?![A-Za-zÀ-ÿ])':'';
  return a+esc(k)+b;
}).join('|'),'g');
var RX=RXS.map(function(r){return [new RegExp(r[0],'g'),r[idx]];});
var cache=new Map();
function tr(s){
  if(L==='pt'||typeof s!=='string'||s.length<2)return s;
  if(!/[A-Za-zÀ-ÿ]/.test(s))return s;
  var c=cache.get(s); if(c!==undefined)return c;
  var store=null, w=s;
  if(w.length>200&&w.indexOf('data:')>=0){
    store=[]; w=w.replace(/data:[a-z\/+\-;=.]*;base64,[A-Za-z0-9+\/=]{40,}/g,function(m){store.push(m);return '\u0001'+(store.length-1)+'\u0002';});
  }
  var t=w.trim(), out;
  if(t&&EX.has(t)&&t.indexOf('<')<0){ out=w.replace(t,function(){return EX.get(t);}); }
  else { out=w; for(var i=0;i<RX.length;i++)out=out.replace(RX[i][0],RX[i][1]); out=out.replace(re,function(m){ var v=FR.get(m); return v===undefined?m:v; }); }
  if(store)out=out.replace(/\u0001(\d+)\u0002/g,function(_,i){return store[+i];});
  if(cache.size>3000)cache.clear();
  cache.set(s,out); return out;
}
window.gmT=tr;
if(L!=='pt'){
  /* sinks */
  var P=function(proto,name,wrap){ var d=Object.getOwnPropertyDescriptor(proto,name); if(!d||!d.set)return; Object.defineProperty(proto,name,{get:d.get,set:function(v){ d.set.call(this,typeof v==='string'?tr(v):v); },configurable:true,enumerable:d.enumerable}); };
  P(Element.prototype,'innerHTML'); P(Node.prototype,'textContent'); P(HTMLElement.prototype,'innerText');
  var iah=Element.prototype.insertAdjacentHTML; Element.prototype.insertAdjacentHTML=function(p,h){ return iah.call(this,p,tr(h)); };
  var ATTR={title:1,'aria-label':1,alt:1,placeholder:1};
  var sa=Element.prototype.setAttribute; Element.prototype.setAttribute=function(n,v){ return sa.call(this,n,ATTR[n]&&typeof v==='string'?tr(v):v); };
  var C=CanvasRenderingContext2D.prototype;
  ['fillText','strokeText','measureText'].forEach(function(f){ var o=C[f]; C[f]=function(t){ arguments[0]=tr(String(t)); return o.apply(this,arguments); }; });
  var tl=Number.prototype.toLocaleString; Number.prototype.toLocaleString=function(loc,o){ return tl.call(this,loc==='pt-BR'?LOC[L]:loc,o); };
  /* HTML estático */
  var walk=function(){
    var tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null), nodes=[], x;
    while((x=tw.nextNode())){ var p=x.parentNode&&x.parentNode.nodeName; if(p==='SCRIPT'||p==='STYLE')continue; if(/[A-Za-zÀ-ÿ]/.test(x.data))nodes.push(x); }
    nodes.forEach(function(n){ var v=tr(n.data); if(v!==n.data)n.data=v; });
    document.querySelectorAll('[title],[aria-label],[alt],[placeholder]').forEach(function(el){ ['title','aria-label','alt','placeholder'].forEach(function(a){ var v=el.getAttribute(a); if(v){ var t=tr(v); if(t!==v)sa.call(el,a,t); } }); });
    document.title=tr(document.title);
    var md=document.querySelector('meta[name=description]'); if(md)md.content=tr(md.content);
  };
  walk();
}
/* seletor de idioma */
function ui(){
  var css=document.createElement('style');
  css.textContent='#langBox{position:fixed;inset:0;z-index:400;display:none;align-items:center;justify-content:center;background:rgba(3,20,28,.72)}#langBox.on{display:flex}#langBox .card{width:min(86vw,320px);background:linear-gradient(180deg,#145a6c,#0a3848);border:2px solid #E8B64A;border-radius:22px;padding:18px;box-shadow:0 8px 0 rgba(4,28,38,.55);color:#fff;text-align:center;font:800 22px "Lilita One","Baloo 2",system-ui,sans-serif}#langBox button{display:block;width:100%;margin-top:10px;padding:13px;border-radius:16px;border:2px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff;font:800 20px "Baloo 2",Nunito,system-ui,sans-serif}#langBox button.cur{background:linear-gradient(180deg,#FFE08A,#FFB627);color:#5a3a00;border-color:#fff}.langbtn{min-width:44px;height:44px;border-radius:22px;border:1.5px solid rgba(255,255,255,.45);background:rgba(255,255,255,.14);color:#fff;font:800 14px "Baloo 2",Nunito,system-ui,sans-serif;display:inline-flex;align-items:center;justify-content:center;gap:3px;padding:0 10px;cursor:pointer}.splash .langbtn{position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:6}.map>.langbtn{position:absolute;right:10px;top:84px;z-index:12;height:38px;background:rgba(11,37,48,.72);box-shadow:0 2px 6px rgba(0,0,0,.35)}';
  document.head.appendChild(css);
  var box=document.createElement('div'); box.id='langBox'; box.setAttribute('role','dialog'); box.setAttribute('aria-label','Language');
  var card=document.createElement('div'); card.className='card'; card.appendChild(document.createTextNode('🌐 Language'));
  LANGS.forEach(function(l){ var b=document.createElement('button'); b.type='button'; b.textContent=NAMES[l]; if(l===L)b.className='cur'; b.addEventListener('click',function(e){ e.stopPropagation(); if(l===L){box.classList.remove('on');return;} window.gmSetLang(l); }); card.appendChild(b); });
  box.appendChild(card); box.addEventListener('click',function(){box.classList.remove('on');});
  document.body.appendChild(box);
  var mk=function(){ var b=document.createElement('button'); b.type='button'; b.className='langbtn'; b.setAttribute('aria-label','Language'); b.textContent='🌐 '+L.toUpperCase(); b.addEventListener('click',function(e){ e.stopPropagation(); e.preventDefault(); box.classList.add('on'); }); b.addEventListener('keydown',function(e){e.stopPropagation();}); return b; };
  var sp=document.getElementById('scrSplash'); if(sp)sp.appendChild(mk());
  var mp=document.getElementById('scrMap'); if(mp)mp.appendChild(mk());
}
ui();
})();
