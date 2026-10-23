(()=>{'use strict';
const menu=window.XOX_MENU,
  grid=document.querySelector('#menu-grid'),
  count=document.querySelector('#menu-count'),
  search=document.querySelector('#menu-search'),
  chips=document.querySelector('#category-list'),
  empty=document.querySelector('#menu-empty'),
  dialog=document.querySelector('#product-dialog'),
  dialogContent=document.querySelector('#dialog-content');

const price=n=>'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryIcons={Tudo:'✦',Signatures:'✳',Classics:'•',Brunch:'☕',Doces:'🍰',Drinks:'🍸',Bebidas:'🥤'};
const categories=['Tudo','Signatures','Classics','Brunch','Doces','Drinks','Bebidas'];
const totals=categories.reduce((acc,c)=>{acc[c]=c==='Tudo'?menu.length:menu.filter(item=>item.category===c).length;return acc;},{});
let active='Tudo';

function renderChips(){
  chips.innerHTML=categories.map(c=>`<button type="button" class="category-chip ${c===active?'selected':''}" data-filter="${c}" aria-pressed="${c===active}"><span>${escape(c)}</span><span class="chip-count">${totals[c]}</span></button>`).join('');
}

function productHint(p){
  if(p.image) return 'Foto oficial no cardápio';
  return 'Sem foto no PDF';
}

function render(){
  const q=normalize(search.value.trim());
  const rows=menu.filter(p=>(active==='Tudo'||p.category===active)&&normalize([p.name,p.description,p.category].join(' ')).includes(q));
  grid.innerHTML=rows.map(p=>`<button class="product-card ${p.image?'has-photo':'no-photo'}" type="button" data-product="${p.id}" aria-label="Ver detalhes de ${escape(p.name)}, ${price(p.price)}">
      <span class="product-art">
        <span class="card-badges">
          <span class="card-tag"><i>${categoryIcons[p.category]||'✦'}</i>${escape(p.category)}</span>
          <span class="price-tag"><small>R$</small>${p.price.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
        </span>
        ${p.image
          ?`<img src="${p.image}" loading="lazy" decoding="async" width="620" height="750" alt="${escape(p.name)} — foto do cardápio oficial">`
          :`<span class="type-art">${escape(p.category)}<strong>${escape(p.name)}</strong><span class="type-note">Produto listado no cardápio oficial da XOX.</span><span class="art-star">✳</span></span>`}
      </span>
      <span class="product-meta">
        <span class="product-category">${escape(p.category)}</span>
        <span class="product-row"><strong>${escape(p.name)}</strong><b>${price(p.price)}</b></span>
        ${p.description?`<span class="product-description">${escape(p.description)}</span>`:`<span class="product-description">Item presente no cardápio oficial da casa. Consulte a equipe para ingredientes e disponibilidade.</span>`}
        <span class="product-footer"><span class="product-hint">${productHint(p)}</span><span class="product-more">Ver detalhes</span></span>
      </span>
    </button>`).join('');
  count.textContent=`${rows.length} ${rows.length===1?'item encontrado':'itens encontrados'} · valores em R$`;
  empty.hidden=!!rows.length;
  const clearBtn=document.querySelector('#search-clear');
  if(clearBtn) clearBtn.hidden=!search.value.trim();
}

function setFilter(c){active=c;renderChips();render()}
chips.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b)setFilter(b.dataset.filter)});
search.addEventListener('input',render);
document.querySelector('#clear-filters').addEventListener('click',()=>{search.value='';setFilter('Tudo');search.focus()});
const searchClear=document.querySelector('#search-clear');
if(searchClear) searchClear.addEventListener('click',()=>{search.value='';render();search.focus()});

let lastFocus=null;
grid.addEventListener('click',e=>{
  const btn=e.target.closest('[data-product]');
  if(!btn)return;
  const p=menu.find(i=>i.id===Number(btn.dataset.product));
  if(!p)return;
  lastFocus=document.activeElement;
  dialogContent.innerHTML=`<div class="dialog-shell">
      ${p.image?`<div class="dialog-media"><img class="dialog-photo" src="${p.image}" width="620" height="750" alt="${escape(p.name)}"></div>`:''}
      <div class="dialog-copy">
        <span class="eyebrow">${escape(p.category)} · XOX COFFEECLUB</span>
        <h2>${escape(p.name)}</h2>
        <div class="dialog-price">${price(p.price)}</div>
        <div class="dialog-meta">
          <span class="dialog-badge">${p.image?'Foto oficial do cardápio':'Produto sem foto no PDF'}</span>
          <span class="dialog-badge">Valores em R$</span>
        </div>
        ${p.description?`<p>${escape(p.description)}</p>`:'<p>Produto do cardápio XOX. Consulte a casa para informações sobre ingredientes e disponibilidade.</p>'}
        <div class="dialog-actions">
          <a class="pill primary" href="https://www.ifood.com.br/delivery/porto-alegre-rs/xox-coffeeclub-floresta/fa80816a-323a-4dc0-9d6d-e260d02aa68b?utm_medium=share" target="_blank" rel="noopener noreferrer">Ver iFood ↗</a>
          <a class="pill outline" href="https://wa.me/555131912425" target="_blank" rel="noopener noreferrer">Perguntar no WhatsApp ↗</a>
        </div>
      </div>
    </div>`;
  dialog.showModal();
});

document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>lastFocus?.focus());
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!dialog.open&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
    e.preventDefault();search.focus();document.getElementById('cardapio').scrollIntoView({behavior:'smooth'});
  }
});

const concepts={
  v1:{eyebrow:'all day brunch · Porto Alegre',title:'Come for<br>the coffee.<br><em>Stay for<br>the vibe.</em>',intro:'Um café que vira ponto de encontro. Brunch no fim de semana, gente querida e, em algumas datas, música tomando conta do dia.',label:'coffee<br>meets<br>good music <small>fim de semana XOX</small>',exp:'Fim de semana<br><em>tem outro sabor.</em>',menu:'Encontre seu<br><em>próximo favorito.</em>',party:'O dia ganha<br><em>trilha sonora.</em>'},
  v2:{eyebrow:'um convite para desacelerar',title:'O fim de semana<br>tem <em>endereço.</em>',intro:'Brunch, café e encontros sem pressa — com música em algumas datas. Bem-vindo à XOX.',label:'the<br>weekend<br>table <small>feito pra compartilhar</small>',exp:'Um encontro que<br><em>vira tradição.</em>',menu:'Escolha com calma.<br><em>Aproveite sem pressa.</em>',party:'Café passado.<br><em>Som ligado.</em>'},
  v3:{eyebrow:'porto alegre · fim de semana',title:'COFFEE<br>FIRST.<br><em>VIBE ALWAYS.</em>',intro:'Brunch de dia. Café na mesa. Música no ar. A XOX acontece aos sábados e domingos — e algumas datas viram Coffeeparty.',label:'DAY<br>MODE<br>ON <small>XOX social club</small>',exp:'UMA CASA.<br><em>VÁRIOS RITMOS.</em>',menu:'THE MENU<br><em>IS SERVED.</em>',party:'THE PARTY<br><em>IS BREWING.</em>'}
};
function setConcept(key,changeHash=true){
  if(!concepts[key])return;const c=concepts[key];document.body.dataset.concept=key;
  for(const [id,v] of [['hero-eyebrow',c.eyebrow],['hero-title',c.title],['hero-intro',c.intro],['photo-label',c.label],['experience-title',c.exp],['menu-title',c.menu],['party-title',c.party]])document.getElementById(id).innerHTML=v;
  document.querySelectorAll('[data-go]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.go===key)));
  if(changeHash)history.replaceState(null,'',location.pathname+location.search+'#'+key);
}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{setConcept(b.dataset.go);window.scrollTo({top:0,behavior:'smooth'})}));
const initial=(location.hash.match(/^#(v[123])$/)||[])[1]||'v1';
setConcept(initial,false);renderChips();render();
})();
