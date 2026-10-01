/* =====================================================================
   GACO V2 "Casa de Máquinas" · extra-q1-doc.js  (agente q1)
   Motor das páginas de catálogo (03, 04, 05). Sem bibliotecas.
   1. <template class="doc-ex-t"> vira um palco com o exemplo no tema escuro
      e no claro, lado a lado, opcionalmente nas três densidades, mais o
      HTML copiável (o código mostrado é o do template, com <i data-i>).
        data-titulo="…"            legenda acima do palco
        data-layout="empilhado"    temas um sobre o outro (matrizes largas)
        data-densidades="escuro"   acrescenta compacta, padrão e confortável
        data-palco="420"           palco de altura fixa para o que flutua
        data-codigo="nao"          sem bloco de código
        data-camada                fundo da camada 1 (dentro de um cartão)
        data-matriz="nome"         conteúdo vem de DOC_MATRIZES.nome()
   2. Interações mínimas por atributo, válidas em qualquer cópia do exemplo:
        data-doc-alterna  abre/fecha o [data-doc-alvo] do mesmo [data-doc-ancora]
        data-lembra       no item do menu do botão dividido, troca o "lembra"
        data-toast="texto|tipo|ação"
        data-doc-modal="id-do-template"  abre de verdade (modal, painel, folha)
        data-doc-fechar   fecha o que foi aberto
        data-doc-ocupar   põe aria-busy por 1,2 s
        data-doc-paleta   abre o Ctrl K da moldura
      Abas (role=tab), segmentado, opções em botão, reações, Path, calendário,
      paginação, ciência e "mostrar senha" respondem ao clique e ao teclado.
   ===================================================================== */
(function(){
  'use strict';
  var d=document;
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function dedent(s){
    var l=s.replace(/\t/g,'  ').split('\n');
    while(l.length&&!l[0].trim()) l.shift();
    while(l.length&&!l[l.length-1].trim()) l.pop();
    var m=Infinity; l.forEach(function(x){if(x.trim()){var k=x.match(/^ */)[0].length;if(k<m)m=k}});
    return l.map(function(x){return x.slice(m===Infinity?0:m)}).join('\n');
  }
  var REFS=['for','aria-labelledby','aria-describedby','aria-controls','aria-owns','aria-activedescendant','list','aria-errormessage'];
  function sufixar(root,suf){
    root.querySelectorAll('[id]').forEach(function(e){e.id=e.id+suf});
    REFS.forEach(function(a){root.querySelectorAll('['+a+']').forEach(function(e){e.setAttribute(a,e.getAttribute(a).split(/\s+/).map(function(x){return x?x+suf:x}).join(' '))})});
    root.querySelectorAll('input[type=radio][name]').forEach(function(e){e.name=e.name+suf});
  }
  function tela(tpl,tema,dens,rotulo,suf,palco,camada){
    var t=d.createElement('div');
    t.className='doc-tela'+(palco?' doc-tela--palco':'')+(camada?' doc-tela--camada':'');
    t.setAttribute('data-theme',tema);
    if(dens) t.setAttribute('data-densidade',dens);
    if(palco) t.style.height=palco+'px';
    var r=d.createElement('span');r.className='doc-tela__rotulo';r.innerHTML=rotulo;t.appendChild(r);
    var c=d.createElement('div');c.className='doc-tela__conteudo';
    c.appendChild(tpl.content.cloneNode(true));
    sufixar(c,suf);
    glifos(c);
    t.appendChild(c);
    return t;
  }
  /* selo de presença com o glifo (tique, traço, relógio, X), como a moldura faz */
  function glifos(r){
    if(!window.cmPresenca) return;
    r.querySelectorAll('.cm-presenca[data-presenca]').forEach(function(p){
      if(p.innerHTML.trim()) return;var t=d.createElement('div');t.innerHTML=cmPresenca(p.getAttribute('data-presenca'));
      if(t.firstChild) p.innerHTML=t.firstChild.innerHTML;
    });
  }
  window.docGlifos=glifos;
  var nTpl=0;
  function montar(tpl){
    nTpl++;
    var mat=tpl.getAttribute('data-matriz');
    if(mat&&window.DOC_MATRIZES&&window.DOC_MATRIZES[mat]) tpl.innerHTML=window.DOC_MATRIZES[mat]();
    var fig=d.createElement('figure');fig.className='doc-ex';
    if(tpl.id) fig.id='ex-'+tpl.id;
    var tit=tpl.getAttribute('data-titulo');
    if(tit){var fc=d.createElement('figcaption');fc.innerHTML=tit;fig.appendChild(fc)}
    var lay=tpl.getAttribute('data-layout')||'lado';
    var palco=tpl.getAttribute('data-palco');
    var camada=tpl.hasAttribute('data-camada');
    var g=d.createElement('div');g.className='doc-telas'+(lay==='empilhado'?' doc-telas--empilhado':'');
    var so=tpl.getAttribute('data-tema');
    if(so){g.className+=' doc-telas--1';g.appendChild(tela(tpl,so,null,so==='dark'?'Escuro':'Claro','-'+nTpl+so[0],palco,camada))}
    else{
      g.appendChild(tela(tpl,'dark',null,'Escuro','-'+nTpl+'e',palco,camada));
      g.appendChild(tela(tpl,'light',null,'Claro','-'+nTpl+'c',palco,camada));
    }
    fig.appendChild(g);
    var dn=tpl.getAttribute('data-densidades');
    if(dn){
      var g3=d.createElement('div');g3.className='doc-telas doc-telas--3';
      [['compacta','Compacta, 32px (interno)'],['padrao','Padrão, 36px'],['confortavel','Confortável, 44px (portal)']].forEach(function(x,i){
        g3.appendChild(tela(tpl,dn==='claro'?'light':'dark',x[0],(dn==='claro'?'Claro, ':'Escuro, ')+x[1],'-'+nTpl+'d'+i,palco,camada));
      });
      fig.appendChild(g3);
    }
    if(tpl.getAttribute('data-codigo')!=='nao'){
      var det=d.createElement('details');det.className='doc-codigo';
      var codigo=dedent(tpl.innerHTML);
      det.innerHTML='<summary>HTML de exemplo<button class="cm-botao cm-botao--p cm-botao--discreto" type="button" data-doc-copiar><i data-i="copiar"></i>Copiar HTML</button></summary><pre tabindex="0"><code>'+esc(codigo)+'</code></pre>';
      det._codigo=codigo;
      fig.appendChild(det);
    }
    tpl.parentNode.insertBefore(fig,tpl);
  }
  function iniciar(){
    d.querySelectorAll('template.doc-ex-t').forEach(montar);
    glifos(d);
    if(window.cmTrocarIcones) window.cmTrocarIcones(d.body);
    indice();
    d.dispatchEvent(new CustomEvent('doc:pronto'));
  }

  /* ---------- índice lateral: filtro e posição ---------- */
  function indice(){
    var ind=d.querySelector('.doc-indice'); if(!ind) return;
    var links=[].slice.call(ind.querySelectorAll('a[href^="#"]'));
    var busca=ind.querySelector('input');
    if(busca) busca.addEventListener('input',function(){
      var q=busca.value.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
      links.forEach(function(a){var t=a.textContent.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();a.hidden=q&&t.indexOf(q)<0});
      ind.querySelectorAll('.doc-indice__familia').forEach(function(f){var n=f.nextElementSibling,vis=false;while(n&&!n.classList.contains('doc-indice__familia')){if(!n.hidden)vis=true;n=n.nextElementSibling}f.hidden=!vis});
    });
    if(!('IntersectionObserver' in window)) return;
    var mapa={};links.forEach(function(a){mapa[a.getAttribute('href').slice(1)]=a});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var a=mapa[e.target.id];if(a){links.forEach(function(x){x.removeAttribute('aria-current')});a.setAttribute('aria-current','true')}}})},{rootMargin:'-20% 0px -70% 0px'});
    Object.keys(mapa).forEach(function(id){var s=d.getElementById(id);if(s) io.observe(s)});
  }

  /* ---------- flutuantes do exemplo (menus, listas, popover) ---------- */
  function fecharTudo(exceto){
    d.querySelectorAll('[data-doc-alterna][aria-expanded="true"]').forEach(function(b){
      if(b===exceto) return;
      var a=b.closest('[data-doc-ancora]');var alvo=a&&a.querySelector('[data-doc-alvo]');
      if(alvo&&!alvo.hasAttribute('data-doc-fixo')) alvo.hidden=true;
      b.setAttribute('aria-expanded','false');
    });
  }
  /* ---------- diálogos reais ---------- */
  var aberto=null,volta=null;
  function abrirDialogo(id,origem){
    var t=d.getElementById(id); if(!t) return;
    fecharDialogo();
    var w=d.createElement('div');w.className='doc-aberto';w.appendChild(t.content.cloneNode(true));
    d.body.appendChild(w);
    if(window.cmTrocarIcones) window.cmTrocarIcones(w);
    aberto=w;volta=origem;
    var f=w.querySelector('[autofocus],input:not([type=hidden]),textarea,select,button:not([data-doc-fechar]),[tabindex="0"]')||w.querySelector('button');
    if(f) setTimeout(function(){f.focus()},30);
  }
  function fecharDialogo(){if(aberto){aberto.remove();aberto=null;if(volta&&volta.focus)volta.focus();volta=null}}
  window.docAbrir=abrirDialogo;window.docFechar=fecharDialogo;

  d.addEventListener('click',function(e){
    var x;
    if((x=e.target.closest('[data-doc-copiar]'))){
      e.preventDefault();e.stopPropagation();
      var det=x.closest('details');var txt=det&&det._codigo||'';
      var ok=function(){x.innerHTML=(window.cmIcone?cmIcone('marcar'):'')+'Copiado';setTimeout(function(){x.innerHTML=(window.cmIcone?cmIcone('copiar'):'')+'Copiar HTML'},1600)};
      try{navigator.clipboard.writeText(txt).then(ok,function(){selecionar(det)})}catch(_){selecionar(det)}
      return;
    }
    if((x=e.target.closest('[data-doc-alterna]'))){
      var a=x.closest('[data-doc-ancora]');var alvo=a&&a.querySelector('[data-doc-alvo]');
      if(alvo){var abrir=x.getAttribute('aria-expanded')!=='true';fecharTudo(x);alvo.hidden=!abrir;x.setAttribute('aria-expanded',String(abrir));
        if(abrir){var p=alvo.querySelector('input,[role=menuitem],[role=option],button');if(p&&p.tagName==='INPUT')p.focus()}}
      return;
    }
    if((x=e.target.closest('[data-lembra]'))){
      var an=x.closest('[data-doc-ancora]');
      if(an){var l=an.querySelector('.cm-dividido__lembra');if(l) l.textContent=x.getAttribute('data-lembra');}
      fecharTudo();
      cmToastSeguro(x.getAttribute('data-toast')||('Salvo. Próxima vez o botão já vem com "'+x.getAttribute('data-lembra')+'".'),'sucesso');
      return;
    }
    if((x=e.target.closest('[data-toast]'))){
      var p2=x.getAttribute('data-toast').split('|');cmToastSeguro(p2[0],p2[1]||'sucesso',p2[2]);
      if(x.closest('[data-doc-alvo]')) fecharTudo();
    }
    if((x=e.target.closest('[data-doc-modal]'))){e.preventDefault();abrirDialogo(x.getAttribute('data-doc-modal'),x);return}
    if((x=e.target.closest('[data-doc-fechar]'))){fecharDialogo();return}
    if(aberto&&e.target.classList&&e.target.classList.contains('cm-sobreposicao')&&aberto.contains(e.target)){fecharDialogo();return}
    if((x=e.target.closest('[data-doc-paleta]'))){if(window.cmAbrirPaleta) cmAbrirPaleta();return}
    if((x=e.target.closest('[data-doc-ocupar]'))){x.setAttribute('aria-busy','true');setTimeout(function(){x.removeAttribute('aria-busy');var m=x.getAttribute('data-doc-ocupar');if(m) cmToastSeguro(m,'sucesso')},1200);return}
    if((x=e.target.closest('[role="tab"]'))){selecionarAba(x);return}
    if((x=e.target.closest('.cm-segmentado>button,.cm-opcoes-botao>button'))){
      if(x.disabled) return;
      x.parentNode.querySelectorAll(':scope>button').forEach(function(b){b.setAttribute('aria-pressed',String(b===x))});return}
    if((x=e.target.closest('.cm-reacao'))){
      var on=x.getAttribute('aria-pressed')==='true';x.setAttribute('aria-pressed',String(!on));
      var n=x.querySelector('.cm-reacao__n');var v=n?parseInt(n.textContent,10)||0:0;v+=on?-1:1;
      if(n){n.textContent=v;if(!v)n.remove()}else if(v){var s=d.createElement('span');s.className='cm-reacao__n';s.textContent=v;x.appendChild(s)}
      return}
    if((x=e.target.closest('.cm-path li>button'))){
      var ol=x.closest('ol');var lis=[].slice.call(ol.children);var i=lis.indexOf(x.parentNode);
      lis.forEach(function(li,k){li.classList.toggle('is-feito',k<i);li.classList.toggle('is-atual',k===i);var b=li.firstElementChild;if(k===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
      return}
    if((x=e.target.closest('.cm-calendario td button'))){x.closest('table').querySelectorAll('button[aria-pressed]').forEach(function(b){b.removeAttribute('aria-pressed')});x.setAttribute('aria-pressed','true');return}
    if((x=e.target.closest('.cm-paginacao__paginas button'))){if(x.hasAttribute('aria-label')||x.disabled) return;x.parentNode.querySelectorAll('button').forEach(function(b){b.removeAttribute('aria-current')});x.setAttribute('aria-current','page');return}
    if((x=e.target.closest('.cm-ciencia .cm-botao'))){var c=x.closest('.cm-ciencia');c.classList.add('is-confirmada');var tx=c.querySelector('.cm-ciencia__texto');if(tx)tx.textContent='Você confirmou a leitura hoje, 09:42';x.disabled=true;x.textContent='Ciente';return}
    if((x=e.target.closest('.cm-entrada--senha .cm-entrada__acao'))){var inp=x.parentNode.querySelector('input');var ver=inp.type==='password';inp.type=ver?'text':'password';x.setAttribute('aria-label',ver?'Ocultar senha':'Mostrar senha');x.innerHTML=window.cmIcone?cmIcone(ver?'ocultar':'ver'):'';return}
    if((x=e.target.closest('.cm-audio__play'))){var tocando=x.getAttribute('aria-pressed')==='true';x.setAttribute('aria-pressed',String(!tocando));x.innerHTML=window.cmIcone?cmIcone(tocando?'play':'pausa'):'';return}
    if((x=e.target.closest('.cm-etiqueta__remover,.cm-chip button'))){var et=x.closest('.cm-etiqueta,.cm-chip');if(et){cmToastSeguro((et.textContent.trim()||'Item')+' removido','sucesso','Desfazer');et.remove()}return}
    if(!e.target.closest('[data-doc-alvo]')) fecharTudo();
  });
  function selecionar(det){var r=d.createRange();r.selectNodeContents(det.querySelector('code'));var s=getSelection();s.removeAllRanges();s.addRange(r)}
  function cmToastSeguro(t,tipo,acao){if(window.cmToast) cmToast(t,tipo,acao)}
  window.docToast=cmToastSeguro;
  function selecionarAba(x){
    var lista=x.closest('[role="tablist"]'); if(!lista||x.getAttribute('aria-disabled')==='true') return;
    lista.querySelectorAll('[role="tab"]').forEach(function(t){
      var sel=t===x;t.setAttribute('aria-selected',String(sel));t.tabIndex=sel?0:-1;
      var pid=t.getAttribute('aria-controls');if(pid){var p=d.getElementById(pid);if(p)p.hidden=!sel}
    });
    var comp=x.closest('.cm-compositor');
    if(comp) comp.classList.toggle('is-nota',/nota/i.test(x.textContent));
  }
  d.addEventListener('keydown',function(e){
    if(e.key==='Escape'){if(aberto){fecharDialogo();return}fecharTudo()}
    var t=e.target.closest&&e.target.closest('[role="tab"]');
    if(t&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){
      var tabs=[].slice.call(t.closest('[role="tablist"]').querySelectorAll('[role="tab"]:not([aria-disabled="true"])'));
      var i=tabs.indexOf(t)+(e.key==='ArrowRight'?1:-1);i=(i+tabs.length)%tabs.length;tabs[i].focus();selecionarAba(tabs[i]);e.preventDefault();
    }
    var m=e.target.closest&&e.target.closest('[role="menu"]');
    if(m&&(e.key==='ArrowDown'||e.key==='ArrowUp')){
      var its=[].slice.call(m.querySelectorAll('[role^="menuitem"]:not([aria-disabled="true"])'));var j=its.indexOf(e.target)+(e.key==='ArrowDown'?1:-1);
      j=(j+its.length)%its.length;its[j].focus();e.preventDefault();
    }
    if(aberto&&e.key==='Tab'){
      var f=[].slice.call(aberto.querySelectorAll('button:not([disabled]),[href],input:not([disabled]),select,textarea,[tabindex="0"]')).filter(function(x){return x.offsetParent!==null});
      if(f.length){var pr=f[0],ul=f[f.length-1];if(e.shiftKey&&d.activeElement===pr){ul.focus();e.preventDefault()}else if(!e.shiftKey&&d.activeElement===ul){pr.focus();e.preventDefault()}}
    }
  });

  /* ---------- matriz de estados ---------- */
  window.docMatriz=function(colunas,linhas){
    var h='<div class="doc-rolar"><table class="doc-matriz"><thead><tr><th><span class="cm-sr">Estado</span></th>'+colunas.map(function(c){return '<th scope="col">'+c+'</th>'}).join('')+'</tr></thead><tbody>';
    linhas.forEach(function(l){
      h+='<tr><th scope="row">'+l[0]+'</th>'+l[1].map(function(c){
        if(c&&typeof c==='object') return '<td><span class="doc-na">'+c.na+'</span></td>';
        return '<td>'+c+'</td>'}).join('')+'</tr>';
    });
    return h+'</tbody></table></div>';
  };
  window.DOC_MATRIZES=window.DOC_MATRIZES||{};

  if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',iniciar); else iniciar();
})();
