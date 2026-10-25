(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const brl=(n,d=2)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:d,maximumFractionDigits:d});

/* entrada das seções e contagem */
const reveal=$$('.head,.flex5 .card,.bento .card,.cmx>*,.cmp .card,.calc,.sheet,.strat li,.steps li,.stat,.tm,.faq details,.who,.fm,.close').filter((e,i,a)=>a.indexOf(e)===i);
reveal.forEach(e=>{e.classList.add('rv');const i=[...e.parentNode.children].indexOf(e);e.style.setProperty('--d',Math.min(i,5)*.07+'s');});
function count(el){
  const to=+el.dataset.to,dec=+el.dataset.dec||0,pre=el.dataset.pre||'',suf=el.dataset.suf||'';
  const fmt=v=>pre+v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
  if(rm){el.textContent=fmt(to);return}
  const t0=performance.now(),dur=1300;
  (function step(t){const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=fmt(to*e);if(p<1)requestAnimationFrame(step)})(t0);
}
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;en.target.classList.add('in');$$('.cnt',en.target).forEach(count);io.unobserve(en.target)}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  reveal.forEach(e=>io.observe(e));
  const fab=$('.fab'),on={topo:true,diagnostico:false};
  const fio=new IntersectionObserver(es=>{es.forEach(e=>on[e.target.id]=e.isIntersecting);fab.classList.toggle('show',!on.topo&&!on.diagnostico)});
  fio.observe($('#topo'));fio.observe($('#diagnostico'));
}else{reveal.forEach(e=>e.classList.add('in'));$('.fab').classList.add('show')}

/* mini cardápio */
const ITEMS=[
{c:'Pizzas',n:'Margherita',d:'Tomate, mozzarela e manjericão',p:42},
{c:'Pizzas',n:'Calabresa',d:'Calabresa fatiada e cebola roxa',p:46},
{c:'Pizzas',n:'Quatro Queijos',d:'Mozzarela, provolone, parmesão e gorgonzola',p:52},
{c:'Bebidas',n:'Guaraná 2L',d:'Garrafa gelada para a mesa toda',p:12},
{c:'Bebidas',n:'Suco de laranja',d:'Natural, 500 ml',p:9},
{c:'Bebidas',n:'Água com gás',d:'Garrafa de 500 ml',p:5},
{c:'Sobremesas',n:'Brownie com sorvete',d:'Brownie quente e bola de creme',p:18},
{c:'Sobremesas',n:'Pudim de leite',d:'Fatia generosa com calda',p:12},
{c:'Sobremesas',n:'Mousse de maracujá',d:'Copinho cremoso',p:11}
].map((x,i)=>({...x,id:'i'+i}));
const cats=[...new Set(ITEMS.map(i=>i.c))];
let cur=cats[0];const cart={};
const tabs=$('#tabs'),list=$('#list'),ph=$('#ph');
function draw(){
  tabs.innerHTML=cats.map(c=>`<button type="button" role="tab" aria-selected="${c===cur}" data-c="${c}">${c}</button>`).join('');
  list.innerHTML=ITEMS.filter(i=>i.c===cur).map(i=>{const q=cart[i.id]||0;
    return `<li><div><b>${i.n}</b><span class="d">${i.d}</span><em>${brl(i.p)}</em></div><div class="qty">${q?`<button type="button" data-a="-" data-id="${i.id}" aria-label="Tirar um ${i.n}">−</button><span aria-label="${q} no carrinho">${q}</span>`:''}<button type="button" data-a="+" data-id="${i.id}" aria-label="Adicionar ${i.n}">+</button></div></li>`}).join('');
  const sel=ITEMS.filter(i=>cart[i.id]);
  const cnt=sel.reduce((s,i)=>s+cart[i.id],0),tot=sel.reduce((s,i)=>s+cart[i.id]*i.p,0);
  $('#cc').textContent=cnt?cnt+(cnt>1?' itens':' item'):'Carrinho vazio';
  $('#ct').textContent=brl(tot);
  $('#cn').textContent=cnt?sel.map(i=>i.n+' ×'+cart[i.id]).join(' · '):'Adicione itens para montar o pedido';
  $('#send').disabled=!cnt;
}
tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.c;draw();$(`[data-c="${cur}"]`,tabs).focus()});
list.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  const id=b.dataset.id,a=b.dataset.a;cart[id]=Math.max(0,(cart[id]||0)+(a==='+'?1:-1));if(!cart[id])delete cart[id];
  draw();(list.querySelector(`[data-a="${a}"][data-id="${id}"]`)||list.querySelector(`[data-a="+"][data-id="${id}"]`)).focus()});
$('#send').addEventListener('click',()=>{ph.classList.add('sent');$('#done').focus()});
$('#again').addEventListener('click',()=>{ph.classList.remove('sent');for(const k in cart)delete cart[k];draw();$(`[data-c="${cur}"]`,tabs).focus()});
draw();

/* calculadora */
const rg=$$('#calc input[type=range]');
function calc(){
  const [o,t,x,m]=rg.map(r=>+r.value);
  rg.forEach(r=>r.style.setProperty('--p',(r.value-r.min)/(r.max-r.min)*100+'%'));
  $('#v-o').textContent=o.toLocaleString('pt-BR');$('#v-t').textContent=brl(t,0);$('#v-x').textContent=x+'%';$('#v-m').textContent=m+'%';
  const com=o*t*x/100,eco=o*(m/100)*t*(x/100);
  $('#o-c').textContent=brl(com,0);$('#o-e').textContent=brl(eco,0);$('#o-a').textContent=brl(eco*12,0);
}
rg.forEach(r=>r.addEventListener('input',calc));calc();

/* formulário (envio simulado, nada sai da página) */
const form=$('#form'),w=$('#f-w'),sal=$('#c-s'),outros=$$('input[name=canal]').filter(c=>c!==sal);
w.addEventListener('input',()=>{
  const d=w.value.replace(/\D/g,'').slice(0,11);let s=d;
  if(d.length>10)s=`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  else if(d.length>6)s=`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  else if(d.length>2)s=`(${d.slice(0,2)}) ${d.slice(2)}`;
  else if(d.length)s=`(${d}`;
  w.value=s;
});
sal.addEventListener('change',()=>{if(sal.checked)outros.forEach(c=>c.checked=false)});
outros.forEach(c=>c.addEventListener('change',()=>{if(c.checked)sal.checked=false}));
const rules=[
 ['f-n','e-n',v=>v.trim().length>=2,'Informe seu nome.'],
 ['f-r','e-r',v=>v.trim().length>=2,'Informe o nome do restaurante.'],
 ['f-c','e-c',v=>v.trim().length>=2,'Informe a cidade.'],
 ['f-w','e-w',v=>/^[1-9]\d{9,10}$/.test(v.replace(/\D/g,'')),'Informe o WhatsApp com DDD, como (11) 91234-5678.']
];
function setErr(inp,err,msg){const el=$('#'+err);el.textContent=msg||'';el.classList.toggle('on',!!msg);inp&&inp.setAttribute('aria-invalid',msg?'true':'false')}
rules.forEach(([i,e,f,m])=>$('#'+i).addEventListener('input',()=>{if($('#'+e).classList.contains('on'))setErr($('#'+i),e,f($('#'+i).value)?'':m)}));
$$('input[name=canal]').forEach(c=>c.addEventListener('change',()=>{if($$('input[name=canal]:checked').length)setErr(null,'e-v','')}));
form.addEventListener('submit',ev=>{
  ev.preventDefault();let first=null;
  rules.forEach(([i,e,f,m])=>{const inp=$('#'+i),bad=!f(inp.value);setErr(inp,e,bad?m:'');if(bad&&!first)first=inp});
  if(!$$('input[name=canal]:checked').length){setErr(null,'e-v','Marque ao menos uma opção.');first=first||$('input[name=canal]')}else setErr(null,'e-v','');
  if(first){first.focus();return}
  form.hidden=true;const ok=$('#ok');ok.hidden=false;ok.focus();
});
})();
