/* =====================================================================
   GACO V2 · extra-q4.js — comportamento simples e compartilhado das telas da parte B.
   Sem biblioteca. Tudo por atributo, para a tela continuar legível no HTML:
     [role=tab] em [role=tablist] ........ troca aba (aria-controls mostra o painel); setas esquerda/direita
     .cm-segmentado>button ............... um pressionado por vez; data-mostra="#id" mostra o painel e esconde os irmãos
     .cm-doc-palco [data-estado] ......... troca o estado da tela (com dados, vazio, carregando, erro, sem permissão)
     [data-menu="id"] .................... abre/fecha menu ou popover; fecha com Esc e clique fora
     [data-lembra="e próximo"] ........... item do "Salvar ▾" troca o rótulo lembrado do botão dividido
     [data-abrir="id"] / [data-fechar] ... modal, painel lateral, folha; Esc fecha; o foco volta ao gatilho
     [data-toast="texto"] ................ cmToast(texto, data-toast-tipo, data-toast-acao)
     [data-form][data-barra="id"] ........ marca campo editado e mostra a barra de salvar com a contagem
     .cm-celula-editavel[tabindex] ....... Enter ou F2 edita, Enter confirma e desce, Esc desfaz, setas andam
     .cm-presenca-cel .................... P, F, J ou espaço; setas andam
     [data-recolher] ..................... aria-expanded abre e fecha o alvo (aria-controls)
     [data-alternar] ..................... alterna aria-pressed (conclusão, reação, seguir)
     .cm-kanban-cartao[draggable] ........ arrastar entre colunas, com contagem e aviso
   ===================================================================== */
(function(){
'use strict';
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function toast(t,tipo,acao){if(window.cmToast) window.cmToast(t,tipo||'sucesso',acao)}
window.qToast=toast;

/* ---------- abas ---------- */
document.addEventListener('click',function(e){
  var t=e.target.closest('[role="tab"]');if(!t) return;
  var lista=t.closest('[role="tablist"]');if(!lista||t.getAttribute('aria-disabled')==='true') return;
  $$('[role="tab"]',lista).forEach(function(x){
    if(x.closest('[role="tablist"]')!==lista) return;
    var sel=x===t;x.setAttribute('aria-selected',sel?'true':'false');x.tabIndex=sel?0:-1;
    var id=x.getAttribute('aria-controls');if(id){var p=document.getElementById(id);if(p) p.hidden=!sel}
  });
});
document.addEventListener('keydown',function(e){
  var t=e.target.closest&&e.target.closest('[role="tab"]');if(!t) return;
  if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;
  var lista=t.closest('[role="tablist"]'),abas=$$('[role="tab"]',lista).filter(function(x){return x.closest('[role="tablist"]')===lista});
  var i=abas.indexOf(t),n=abas[(i+(e.key==='ArrowRight'?1:-1)+abas.length)%abas.length];
  e.preventDefault();n.focus();n.click();
});

/* ---------- segmentado e estados do palco ---------- */
document.addEventListener('click',function(e){
  var b=e.target.closest('.cm-segmentado>button');if(!b||b.disabled) return;
  var g=b.parentNode;
  $$(':scope>button',g).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');
    var m=x.getAttribute('data-mostra');if(m){var p=document.querySelector(m);if(p) p.hidden=x!==b}});
  var est=b.getAttribute('data-estado');
  if(est){var palco=b.closest('.cm-doc-palco');if(palco) $$('[data-estado-painel]',palco).forEach(function(p){if(p.closest('.cm-doc-palco')===palco) p.hidden=p.getAttribute('data-estado-painel')!==est})}
});

/* ---------- menus e popovers ---------- */
var menuAberto=null;
function fecharMenu(foco){if(!menuAberto) return;menuAberto.m.hidden=true;menuAberto.b.setAttribute('aria-expanded','false');if(foco) menuAberto.b.focus();menuAberto=null}
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-menu]');
  if(b){var m=document.getElementById(b.getAttribute('data-menu'));if(!m) return;e.preventDefault();
    if(menuAberto&&menuAberto.m===m){fecharMenu();return}
    fecharMenu();m.hidden=false;b.setAttribute('aria-expanded','true');menuAberto={m:m,b:b};
    var f=m.querySelector('[role="menuitem"],[role="menuitemradio"],button,input,a');if(f) setTimeout(function(){f.focus()},0);return}
  if(menuAberto){
    var item=e.target.closest('[data-lembra]');
    if(item&&menuAberto.m.contains(item)){var div=menuAberto.b.closest('.cm-dividido');var l=div&&div.querySelector('.cm-dividido__lembra');if(l) l.textContent=item.getAttribute('data-lembra');
      $$('[aria-checked]',menuAberto.m).forEach(function(x){x.setAttribute('aria-checked',x===item?'true':'false')})}
    if(!menuAberto.m.contains(e.target)||e.target.closest('[role="menuitem"],[role="menuitemradio"],.cm-menu__item')) fecharMenu();
  }
});
document.addEventListener('keydown',function(e){
  if(menuAberto&&e.key==='Escape'){e.preventDefault();fecharMenu(true);return}
  if(menuAberto&&(e.key==='ArrowDown'||e.key==='ArrowUp')){var its=$$('.cm-menu__item:not([aria-disabled="true"]),[role="menuitem"]',menuAberto.m);if(!its.length) return;
    var i=its.indexOf(document.activeElement);e.preventDefault();its[(i+(e.key==='ArrowDown'?1:-1)+its.length)%its.length].focus()}
});

/* ---------- modal, painel, folha ---------- */
var pilha=[];
function abrirJanela(el,gatilho){el.hidden=false;pilha.push({el:el,g:gatilho});var f=el.querySelector('[autofocus],input:not([type=hidden]),textarea,select,button:not([data-fechar])');if(f) setTimeout(function(){f.focus()},20)}
function fecharJanela(el){el.hidden=true;for(var i=pilha.length-1;i>=0;i--){if(pilha[i].el===el){var g=pilha[i].g;pilha.splice(i,1);if(g&&g.focus) g.focus();break}}}
window.qAbrir=function(id,g){var el=document.getElementById(id);if(el) abrirJanela(el,g)};
window.qFechar=function(id){var el=document.getElementById(id);if(el) fecharJanela(el)};
document.addEventListener('click',function(e){
  var a=e.target.closest('[data-abrir]');if(a){var el=document.getElementById(a.getAttribute('data-abrir'));if(el){e.preventDefault();abrirJanela(el,a)}return}
  var f=e.target.closest('[data-fechar]');if(f){var j=f.closest('[data-janela]');if(j){e.preventDefault();fecharJanela(j)}return}
  if(e.target.matches&&e.target.matches('[data-janela].cm-sobreposicao')) fecharJanela(e.target);
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&pilha.length&&!menuAberto){e.preventDefault();fecharJanela(pilha[pilha.length-1].el)}});

/* ---------- toast ---------- */
document.addEventListener('click',function(e){var b=e.target.closest('[data-toast]');if(!b) return;toast(b.getAttribute('data-toast'),b.getAttribute('data-toast-tipo'),b.getAttribute('data-toast-acao'))});

/* ---------- formulário: campo editado e barra de salvar ---------- */
function nomeCampo(c){var l=c.getAttribute('data-nome')||c.getAttribute('aria-label');if(l) return l;if(c.id){var r=document.querySelector('label[for="'+c.id+'"]');if(r) return r.textContent.replace('*','').trim()}var lb=c.closest('label');return lb?lb.textContent.trim().slice(0,40):'campo'}
function alterado(c){if(c.type==='checkbox'||c.type==='radio') return c.checked!==c.defaultChecked;if(c.tagName==='SELECT'){for(var i=0;i<c.options.length;i++) if(c.options[i].selected!==c.options[i].defaultSelected) return true;return false}return c.value!==c.defaultValue}
function avaliarForm(f){
  var campos=$$('input,select,textarea',f).filter(function(c){return !c.hasAttribute('data-ignorar')&&c.type!=='search'&&c.type!=='hidden'});
  var mud=[];campos.forEach(function(c){var a=alterado(c);var w=c.closest('.cm-entrada,.cm-selecao,.cm-ficha__linha');if(w&&w.classList.contains('cm-entrada')) w.classList.toggle('is-editado',a);if(a){var n=nomeCampo(c);if(mud.indexOf(n)<0) mud.push(n)}});
  var cel=$$('.cm-celula-editavel.is-editado,.cm-presenca-cel.is-editado',f).length;
  var total=mud.length+cel;
  var barra=document.getElementById(f.getAttribute('data-barra'));if(!barra) return;
  barra.hidden=total===0;
  var c=barra.querySelector('[data-contagem]');if(c) c.textContent=total===1?'1 alteração não salva':total+' alterações não salvas';
  var d=barra.querySelector('[data-campos]');if(d) d.textContent=mud.concat(cel?[cel+(cel===1?' célula':' células')]:[]).slice(0,4).join(', ');
}
window.qAvaliarForm=avaliarForm;
document.addEventListener('input',function(e){var f=e.target.closest&&e.target.closest('[data-form]');if(f) avaliarForm(f)});
document.addEventListener('change',function(e){var f=e.target.closest&&e.target.closest('[data-form]');if(f) avaliarForm(f)});
function formDaBarra(b){var barra=b.closest('.cm-barra-salvar');return barra&&document.querySelector('[data-barra="'+barra.id+'"]')}
document.addEventListener('click',function(e){
  var d=e.target.closest('[data-descartar]');
  if(d){var f=formDaBarra(d);if(!f) return;
    $$('input,select,textarea',f).forEach(function(c){if(c.type==='checkbox'||c.type==='radio') c.checked=c.defaultChecked;else if(c.tagName==='SELECT'){for(var i=0;i<c.options.length;i++) c.options[i].selected=c.options[i].defaultSelected}else c.value=c.defaultValue});
    $$('.cm-celula-editavel.is-editado',f).forEach(function(x){if(x.hasAttribute('data-original')) x.textContent=x.getAttribute('data-original');x.classList.remove('is-editado')});
    $$('.cm-presenca-cel.is-editado',f).forEach(function(x){x.setAttribute('data-v',x.getAttribute('data-original'));x.textContent=x.getAttribute('data-original')||'·';x.classList.remove('is-editado')});
    avaliarForm(f);toast('Alterações descartadas.','info');return}
  var s=e.target.closest('[data-salvar]');
  if(s){var f2=formDaBarra(s);if(!f2) return;var barra=s.closest('.cm-barra-salvar');barra.classList.add('is-salvando');s.setAttribute('aria-busy','true');
    setTimeout(function(){
      $$('input,select,textarea',f2).forEach(function(c){if(c.type==='checkbox'||c.type==='radio') c.defaultChecked=c.checked;else if(c.tagName==='SELECT'){for(var i=0;i<c.options.length;i++) c.options[i].defaultSelected=c.options[i].selected}else c.defaultValue=c.value});
      $$('.cm-celula-editavel.is-editado,.cm-presenca-cel.is-editado',f2).forEach(function(x){x.classList.remove('is-editado');x.setAttribute('data-original',x.getAttribute('data-v')!=null&&x.classList.contains('cm-presenca-cel')?x.getAttribute('data-v'):x.textContent)});
      barra.classList.remove('is-salvando');s.removeAttribute('aria-busy');avaliarForm(f2);
      toast(s.getAttribute('data-salvar')||'Alterações salvas.','sucesso')},600);
  }
});

/* ---------- célula editável (planilha) ---------- */
function celulas(t){return $$('.cm-celula-editavel[tabindex],.cm-presenca-cel[tabindex]',t)}
function moverCelula(c,dl,dc){
  var tr=c.parentNode,tb=tr.parentNode,ri=[].indexOf.call(tb.rows,tr),ci=[].indexOf.call(tr.cells,c);
  var r=tb.rows[ri+dl];if(!r) return;var alvo=r.cells[ci+dc];
  while(alvo&&!alvo.hasAttribute('tabindex')){ci+=dc||0;if(!dc) break;alvo=r.cells[ci+dc]}
  if(alvo&&alvo.hasAttribute('tabindex')) alvo.focus();
}
function editar(c){
  if(c.classList.contains('is-editando')||c.classList.contains('is-leitura')) return;
  if(!c.hasAttribute('data-original')) c.setAttribute('data-original',c.textContent.trim());
  var v=c.textContent.trim();c.classList.add('is-editando');c.innerHTML='<input aria-label="'+(c.getAttribute('aria-label')||'Valor')+'">';
  var i=c.firstChild;i.value=v;i.focus();i.select();
  function fim(ok,desce){if(!c.classList.contains('is-editando')) return;var nv=ok?i.value.trim():v;c.classList.remove('is-editando');c.textContent=nv;
    c.classList.toggle('is-editado',nv!==c.getAttribute('data-original'));
    var lim=c.getAttribute('data-minimo');if(lim){var n=parseFloat(nv.replace(',','.'));c.classList.toggle('is-abaixo',!isNaN(n)&&n<parseFloat(lim))}
    c.dispatchEvent(new CustomEvent('q:celula',{bubbles:true,detail:{valor:nv}}));
    var f=c.closest('[data-form]');if(f) avaliarForm(f);c.focus();if(desce) moverCelula(c,1,0)}
  i.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();fim(true,true)}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fim(false)}else if(e.key==='Tab'){fim(true)}});
  i.addEventListener('blur',function(){fim(true)});
}
document.addEventListener('dblclick',function(e){var c=e.target.closest('.cm-celula-editavel[tabindex]');if(c) editar(c)});
document.addEventListener('keydown',function(e){
  var c=e.target.closest&&e.target.closest('.cm-celula-editavel[tabindex],.cm-presenca-cel[tabindex]');if(!c||e.target!==c) return;
  if(e.key==='ArrowDown'){e.preventDefault();moverCelula(c,1,0)}else if(e.key==='ArrowUp'){e.preventDefault();moverCelula(c,-1,0)}
  else if(e.key==='ArrowRight'){e.preventDefault();moverCelula(c,0,1)}else if(e.key==='ArrowLeft'){e.preventDefault();moverCelula(c,0,-1)}
  else if(c.classList.contains('cm-celula-editavel')&&(e.key==='Enter'||e.key==='F2')){e.preventDefault();editar(c)}
  else if(c.classList.contains('cm-presenca-cel')){var k=e.key.toUpperCase();
    if(k==='P'||k==='F'||k==='J'){e.preventDefault();marcarPresenca(c,k);moverCelula(c,1,0)}
    else if(e.key===' '||e.key==='Enter'){e.preventDefault();ciclar(c)}}
});
function marcarPresenca(c,v){if(!c.hasAttribute('data-original')) c.setAttribute('data-original',c.getAttribute('data-v')||'');c.setAttribute('data-v',v);c.textContent=v||'·';
  c.setAttribute('aria-label',(c.getAttribute('data-aluno')||'')+': '+({P:'presente',F:'falta',J:'falta justificada'}[v]||'sem registro'));
  c.classList.toggle('is-editado',v!==c.getAttribute('data-original'));c.dispatchEvent(new CustomEvent('q:presenca',{bubbles:true}));var f=c.closest('[data-form]');if(f) avaliarForm(f)}
function ciclar(c){var o=['P','F','J'];var v=c.getAttribute('data-v');marcarPresenca(c,o[(o.indexOf(v)+1)%3])}
document.addEventListener('click',function(e){var c=e.target.closest('.cm-presenca-cel[tabindex]');if(c) ciclar(c)});
window.qMarcarPresenca=marcarPresenca;

/* ---------- recolher e alternar ---------- */
document.addEventListener('click',function(e){
  var r=e.target.closest('[data-recolher]');
  if(r){var ab=r.getAttribute('aria-expanded')!=='true';r.setAttribute('aria-expanded',ab?'true':'false');var id=r.getAttribute('aria-controls');var alvo=id?document.getElementById(id):r.nextElementSibling;if(alvo) alvo.hidden=!ab;return}
  var a=e.target.closest('[data-alternar]');
  if(a){var on=a.getAttribute('aria-pressed')!=='true';a.setAttribute('aria-pressed',on?'true':'false');
    var tx=a.getAttribute(on?'data-texto-sim':'data-texto-nao');if(tx){var s=a.querySelector('[data-texto]')||a;s.textContent=tx}
    var n=a.querySelector('.cm-reacao__n');if(n){var v=parseInt(n.textContent||'0',10)+(on?1:-1);n.textContent=v>0?v:''}
    a.dispatchEvent(new CustomEvent('q:alternou',{bubbles:true,detail:{ligado:on}}))}
});

/* ---------- kanban: arrastar ---------- */
var arrastando=null;
document.addEventListener('dragstart',function(e){var c=e.target.closest&&e.target.closest('.cm-kanban-cartao[draggable]');if(!c) return;arrastando=c;c.classList.add('is-arrastando');try{e.dataTransfer.setData('text/plain','')}catch(x){}});
document.addEventListener('dragend',function(){if(arrastando) arrastando.classList.remove('is-arrastando');arrastando=null;$$('.cm-kanban__cartoes.is-alvo').forEach(function(x){x.classList.remove('is-alvo')})});
document.addEventListener('dragover',function(e){var z=e.target.closest&&e.target.closest('.cm-kanban__cartoes');if(!z||!arrastando) return;e.preventDefault();$$('.cm-kanban__cartoes.is-alvo').forEach(function(x){if(x!==z) x.classList.remove('is-alvo')});z.classList.add('is-alvo')});
document.addEventListener('drop',function(e){var z=e.target.closest&&e.target.closest('.cm-kanban__cartoes');if(!z||!arrastando) return;e.preventDefault();var de=arrastando.closest('.cm-kanban__coluna');z.appendChild(arrastando);z.classList.remove('is-alvo');
  var para=z.closest('.cm-kanban__coluna');[de,para].forEach(function(col){var n=col.querySelector('.cm-kanban__cabeca .cm-contador');if(n) n.textContent=col.querySelectorAll('.cm-kanban-cartao').length});
  var t=para.querySelector('.cm-kanban__titulo');toast('Movido para '+(t?t.textContent:'a coluna')+'.','sucesso','Desfazer')});

})();
