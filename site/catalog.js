/* Catalogo XOX — componente compartilhado por 3 prototipos originais */
(()=>{
  'use strict';
  const catalog=Array.isArray(window.XOX_MENU)?window.XOX_MENU:[];
  const filters=['Tudo','Signatures','Classics','Brunch','Doces','Drinks','Bebidas'];
  const money=n=>'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
  const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
  const safe=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dialog=document.querySelector('#product-dialog');
  const detail=document.querySelector('#dialog-content');
  const ifood='https://www.ifood.com.br/delivery/porto-alegre-rs/xox-coffeeclub-floresta/fa80816a-323a-4dc0-9d6d-e260d02aa68b?utm_medium=share';
  const controls=[];
  let previousFocus=null;

  function openProduct(id,context){
    const p=catalog.find(item=>item.id===Number(id));
    if(!p||!dialog)return;
    previousFocus=document.activeElement;
    dialog.dataset.concept=context.closest('.design').id;
    const image=p.image?'<div class="dialog-media"><img class="dialog-photo" src="'+safe(p.image)+'" alt="'+safe(p.name)+'" width="620" height="750"></div>':'';
    const description=p.description?safe(p.description):'Produto do cardápio XOX. Consulte a casa para informações sobre ingredientes e disponibilidade.';
    detail.innerHTML='<div class="dialog-shell">'+image+'<div class="dialog-copy"><span class="eyebrow">'+safe(p.category)+' · XOX COFFEECLUB</span><h2>'+safe(p.name)+'</h2><div class="dialog-price">'+money(p.price)+'</div><div class="dialog-meta"><span class="dialog-badge">'+(p.image?'Foto do cardápio':'Sem foto no PDF')+'</span></div><p>'+description+'</p><div class="dialog-actions"><a class="pill primary" href="'+ifood+'" target="_blank" rel="noopener noreferrer">Ver iFood ↗</a><a class="pill outline" href="https://wa.me/555131912425" target="_blank" rel="noopener noreferrer">Falar com a XOX ↗</a></div></div></div>';
    dialog.showModal();
  }

  document.querySelectorAll('.xox-catalog').forEach(section=>{
    const get=name=>section.querySelector('[data-role="'+name+'"]');
    const grid=get('menu-grid'),search=get('menu-search'),chipList=get('category-list'),counter=get('menu-count'),empty=get('menu-empty'),clear=get('search-clear');
    if(!grid||!search||!chipList||!counter||!empty)return;
    const state={section,search,active:'Tudo'};
    controls.push(state);

    function renderFilters(){
      chipList.innerHTML=filters.map(name=>{
        const total=name==='Tudo'?catalog.length:catalog.filter(p=>p.category===name).length;
        return '<button class="category-chip '+(name===state.active?'selected':'')+'" data-filter="'+safe(name)+'" type="button" aria-pressed="'+String(name===state.active)+'">'+safe(name)+' <span class="chip-count">'+total+'</span></button>';
      }).join('');
    }
    function render(){
      const query=clean(search.value.trim());
      const items=catalog.filter(p=>(state.active==='Tudo'||p.category===state.active)&&clean([p.name,p.category,p.description].join(' ')).includes(query));
      grid.innerHTML=items.map(p=>{
        const image=p.image?'<img src="'+safe(p.image)+'" alt="'+safe(p.name)+' — foto do cardápio" loading="lazy" decoding="async" width="620" height="750">':'<span class="type-art">'+safe(p.category)+'<strong>'+safe(p.name)+'</strong><span class="type-note">XOX COFFEECLUB</span><span class="art-star">✳</span></span>';
        const description=p.description?safe(p.description):'Consulte a casa para ingredientes e disponibilidade.';
        return '<button class="product-card '+(p.image?'has-photo':'no-photo')+'" data-product="'+p.id+'" type="button" aria-label="Ver detalhes de '+safe(p.name)+', '+money(p.price)+'"><span class="product-art"><span class="card-badges"><span class="card-tag">✳ '+safe(p.category)+'</span><span class="price-tag">'+money(p.price)+'</span></span>'+image+'</span><span class="product-meta"><span class="product-category">'+safe(p.category)+'</span><span class="product-row"><strong>'+safe(p.name)+'</strong><b>'+money(p.price)+'</b></span><span class="product-description">'+description+'</span><span class="product-footer"><span class="product-hint">'+(p.image?'Foto original':'Sem foto no PDF')+'</span><span class="product-more">Ver detalhes</span></span></span></button>';
      }).join('');
      counter.textContent=items.length+' '+(items.length===1?'item encontrado':'itens encontrados')+' · valores em R$';
      empty.hidden=items.length>0;
      if(clear)clear.hidden=!search.value.trim();
    }
    chipList.addEventListener('click',event=>{
      const btn=event.target.closest('[data-filter]');if(!btn)return;
      state.active=btn.dataset.filter;renderFilters();render();
    });
    search.addEventListener('input',render);
    if(clear)clear.addEventListener('click',()=>{search.value='';render();search.focus();});
    const clearAll=get('clear-filters');
    if(clearAll)clearAll.addEventListener('click',()=>{search.value='';state.active='Tudo';renderFilters();render();search.focus();});
    section.addEventListener('click',event=>{
      const btn=event.target.closest('[data-product]');if(btn)openProduct(btn.dataset.product,section);
    });
    renderFilters();render();
  });

  if(dialog){
    document.querySelector('#dialog-close')?.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
    dialog.addEventListener('close',()=>previousFocus?.focus());
  }
  document.addEventListener('keydown',event=>{
    if(event.key!=='/'||dialog?.open||['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
    const visible=controls.find(({section})=>!section.closest('.design').hidden);
    if(!visible)return;
    event.preventDefault();
    visible.search.focus();
    visible.section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
})();
