/* =====================================================================
   GACO V2 "Casa de Máquinas" · extra-q5.js
   Comportamento mínimo comum às telas do q5 (portal, públicas, superadmin,
   celular, documentos). Sem bibliotecas. Carregar com defer, depois do moldura.js.
   Atributos:
     data-abas                 role=tablist; cada tab com aria-controls troca o painel
     data-abrir="id"           mostra #id (modal, painel, folha, menu); foco no 1º campo
     data-fechar               fecha a janela ([data-janela]) onde está; Esc também
     data-alternar="id"        alterna #id e aria-expanded do botão (menus)
     data-lembra="texto"       item do menu do botão dividido: troca o rótulo lembrado
     data-vigiar="idBarra"     formulário: qualquer alteração mostra a barra de salvar
     data-toast="texto"        mostra um toast (data-toast-tipo, data-toast-acao)
     data-copiar="texto"       copia e avisa
     data-passos / data-passo / data-ir="n"   passo a passo
     data-semente              em .cm-qr e .cm-barras: desenha o QR e o código de barras
     ?cena=nome                abre/rola até [data-cena~="nome"] (usado nas capturas)
     ?abrir=sino|paleta|gaveta|conta   abre o menu da moldura
   ===================================================================== */
(function(){
'use strict';
function $(s,c){return (c||document).querySelector(s)}
function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
var ultimoGatilho=null;

/* toast: usa o da moldura; nas páginas públicas (sem moldura), um igual */
function toast(texto,tipo,acao){
  if(window.cmToast) return window.cmToast(texto,tipo||'sucesso',acao);
  var z=$('.cm-toasts');if(!z){z=document.createElement('div');z.className='cm-toasts';z.setAttribute('role','status');z.setAttribute('aria-live','polite');document.body.appendChild(z)}
  var t=document.createElement('div');t.className='cm-toast cm-toast--'+(tipo||'sucesso');
  var ic={sucesso:'sucesso',aviso:'atencao',perigo:'perigo',info:'informacao'}[tipo||'sucesso'];
  t.innerHTML=(window.cmIcone?window.cmIcone(ic):'')+'<span class="cm-toast__texto"></span>'+(acao?'<button class="cm-toast__acao" type="button">'+acao+'</button>':'')+'<button class="cm-toast__fechar" type="button" aria-label="Fechar aviso">'+(window.cmIcone?window.cmIcone('fechar'):'x')+'</button>';
  t.querySelector('.cm-toast__texto').textContent=texto;z.appendChild(t);
  t.querySelector('.cm-toast__fechar').onclick=function(){t.remove()};
  setTimeout(function(){t.remove()},6000);
}
window.q5Toast=toast;

function focar(el){var f=el.querySelector('[autofocus],input:not([type=hidden]),textarea,select,button:not([data-fechar]),a[href]');if(f) setTimeout(function(){f.focus()},30)}
function abrir(id,gatilho){var el=document.getElementById(id);if(!el) return;el.hidden=false;ultimoGatilho=gatilho||null;if(gatilho) gatilho.setAttribute('aria-expanded','true');focar(el)}
function fechar(el){if(!el) return;el.hidden=true;$$('[data-abrir="'+el.id+'"],[data-alternar="'+el.id+'"]').forEach(function(b){b.setAttribute('aria-expanded','false')});if(ultimoGatilho&&document.contains(ultimoGatilho)) ultimoGatilho.focus();ultimoGatilho=null}

document.addEventListener('click',function(e){
  var t=e.target.closest?e.target:null;if(!t) return;
  var b;
  if((b=t.closest('[data-abrir]'))){e.preventDefault();abrir(b.getAttribute('data-abrir'),b);return}
  if((b=t.closest('[data-fechar]'))){e.preventDefault();var j=b.closest('[data-janela]');var alvo=b.getAttribute('data-fechar');fechar(alvo?document.getElementById(alvo):j);return}
  if((b=t.closest('[data-alternar]'))){e.preventDefault();var m=document.getElementById(b.getAttribute('data-alternar'));if(!m) return;var aberto=!m.hidden;$$('[data-menu-q5]').forEach(function(x){if(x!==m){x.hidden=true}});m.hidden=aberto;b.setAttribute('aria-expanded',String(!aberto));if(!aberto){ultimoGatilho=b;var p=m.querySelector('[role=menuitem],button,a');if(p) p.focus()}return}
  if((b=t.closest('[data-lembra]'))){var d=b.closest('.cm-dividido-q5');if(d){var l=d.querySelector('.cm-dividido__lembra');if(l) l.textContent=b.getAttribute('data-lembra');var mm=b.closest('[data-menu-q5]');if(mm){mm.hidden=true}}
    if(b.getAttribute('data-toast')) {toast(b.getAttribute('data-toast'),b.getAttribute('data-toast-tipo')||'sucesso',b.getAttribute('data-toast-acao'))} return}
  if((b=t.closest('[data-toast]'))){toast(b.getAttribute('data-toast'),b.getAttribute('data-toast-tipo')||'sucesso',b.getAttribute('data-toast-acao'));return}
  if((b=t.closest('[data-copiar]'))){var tx=b.getAttribute('data-copiar');try{navigator.clipboard&&navigator.clipboard.writeText(tx)}catch(x){}toast(b.getAttribute('data-copiar-aviso')||'Copiado.','sucesso');return}
  if((b=t.closest('[data-ir]'))){var w=b.closest('[data-passos]');if(w){e.preventDefault();irPasso(w,+b.getAttribute('data-ir'))}return}
  /* clique fora fecha menus do q5 */
  if(!t.closest('[data-menu-q5]')) $$('[data-menu-q5]').forEach(function(x){if(!x.hidden){x.hidden=true}});
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape') return;
  var menus=$$('[data-menu-q5]').filter(function(x){return !x.hidden});
  if(menus.length){menus.forEach(function(x){x.hidden=true});if(ultimoGatilho) ultimoGatilho.focus();return}
  var js=$$('[data-janela]').filter(function(x){return !x.hidden&&!x.hasAttribute('data-fixa')});
  if(js.length) fechar(js[js.length-1]);
});

/* abas */
document.addEventListener('click',function(e){
  var tab=e.target.closest&&e.target.closest('[data-abas] [role="tab"]');if(!tab) return;
  var lista=tab.closest('[data-abas]');
  $$('[role="tab"]',lista).forEach(function(x){var on=x===tab;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;var p=x.getAttribute('aria-controls');if(p&&document.getElementById(p)) document.getElementById(p).hidden=!on});
});
document.addEventListener('keydown',function(e){
  var tab=e.target.closest&&e.target.closest('[data-abas] [role="tab"]');if(!tab||(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')) return;
  var ts=$$('[role="tab"]',tab.closest('[data-abas]'));var i=ts.indexOf(tab)+(e.key==='ArrowRight'?1:-1);i=(i+ts.length)%ts.length;ts[i].focus();ts[i].click();e.preventDefault();
});

/* passo a passo */
function irPasso(w,n){
  var ps=$$('[data-passo]',w);ps.forEach(function(p){p.hidden=(+p.getAttribute('data-passo')!==n)});
  w.setAttribute('data-atual',n);
  var ind=$$('[data-indicador]',w);ind.forEach(function(x){x.textContent='Passo '+n+' de '+ps.length});
  var pr=$$('[data-progresso] i',w);pr.forEach(function(x){x.style.setProperty('--p',Math.round(n/ps.length*100)+'%')});
  var vis=ps.filter(function(p){return !p.hidden})[0];if(vis){var h=vis.querySelector('h2,h3,[data-foco]');if(h){h.tabIndex=-1;h.focus()}}
}
window.q5IrPasso=irPasso;

/* barra de salvar: aparece só com alteração */
$$('[data-vigiar]').forEach(function(f){
  var barra=document.getElementById(f.getAttribute('data-vigiar'));if(!barra) return;
  var orig={};$$('input,select,textarea',f).forEach(function(c,i){c.dataset.q5i=i;orig[i]=c.type==='checkbox'||c.type==='radio'?c.checked:c.value});
  function contar(){var n=0,nomes=[];$$('input,select,textarea',f).forEach(function(c){var v=c.type==='checkbox'||c.type==='radio'?c.checked:c.value;var mud=v!==orig[c.dataset.q5i];var ent=c.closest('.cm-entrada');if(ent) ent.classList.toggle('is-editado',mud);if(mud){n++;var r=f.querySelector('label[for="'+c.id+'"]');nomes.push(r?r.textContent.replace('*','').trim():(c.getAttribute('aria-label')||'campo'))}});
    barra.hidden=!n;var b=barra.querySelector('b');if(b) b.textContent=n+(n===1?' alteração não salva':' alterações não salvas');var s=barra.querySelector('.cm-barra-salvar__msg span');if(s) s.textContent=nomes.slice(0,3).join(', ')}
  f.addEventListener('input',contar);f.addEventListener('change',contar);
  barra.addEventListener('click',function(e){
    var d=e.target.closest('[data-descartar]');var s=e.target.closest('[data-salvar]');
    if(d){$$('input,select,textarea',f).forEach(function(c){if(c.type==='checkbox'||c.type==='radio') c.checked=orig[c.dataset.q5i]; else c.value=orig[c.dataset.q5i]});contar();toast('Alterações descartadas.','info')}
    if(s){$$('input,select,textarea',f).forEach(function(c){orig[c.dataset.q5i]=c.type==='checkbox'||c.type==='radio'?c.checked:c.value});contar();toast(s.getAttribute('data-salvar')||'Alterações salvas.','sucesso')}
  });
});

/* QR e código de barras (desenho determinístico a partir da semente; ilustrativo) */
function rnd(seed){var x=0;for(var i=0;i<seed.length;i++){x=(x*31+seed.charCodeAt(i))|0}return function(){x^=x<<13;x^=x>>17;x^=x<<5;return ((x>>>0)%1000)/1000}}
function qr(el){var n=25,r=rnd(el.getAttribute('data-semente')||'gaco'),s='';
  function olho(x,y){s+='<rect x="'+x+'" y="'+y+'" width="7" height="1"/><rect x="'+x+'" y="'+(y+6)+'" width="7" height="1"/><rect x="'+x+'" y="'+y+'" width="1" height="7"/><rect x="'+(x+6)+'" y="'+y+'" width="1" height="7"/><rect x="'+(x+2)+'" y="'+(y+2)+'" width="3" height="3"/>'}
  olho(0,0);olho(n-7,0);olho(0,n-7);
  for(var y=0;y<n;y++)for(var x=0;x<n;x++){if((x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9)) continue;if(r()>.52) s+='<rect x="'+x+'" y="'+y+'" width="1" height="1"/>'}
  el.innerHTML='<svg viewBox="0 0 '+n+' '+n+'" shape-rendering="crispEdges" role="img" aria-label="'+(el.getAttribute('data-rotulo')||'Código QR')+'">'+s+'</svg>'}
function barras(el){var r=rnd(el.getAttribute('data-semente')||'gaco'),x=4,s='';while(x<396){var w=r()>.6?3:(r()>.5?2:1);if(r()>.42) s+='<rect x="'+x+'" y="0" width="'+w+'" height="52"/>';x+=w+1}
  el.innerHTML='<svg viewBox="0 0 400 52" preserveAspectRatio="none" shape-rendering="crispEdges" role="img" aria-label="Código de barras do boleto" style="width:100%;height:100%">'+s+'</svg>'}
$$('.cm-qr[data-semente]').forEach(qr);$$('.cm-barras[data-semente]').forEach(barras);
window.q5Qr=qr;

/* conversa e webchat começam na última mensagem */
$$('.cm-webchat .cm-conversa,[data-rolar-fim]').forEach(function(c){c.scrollTop=c.scrollHeight});

/* no celular, a anotação de projeto começa fechada para a tela aparecer primeiro */
if(window.matchMedia&&window.matchMedia('(max-width:599px)').matches) $$('.cm-anotacao[open]').forEach(function(d){d.open=false});

/* parâmetros de cena (para capturas e para o 60-celular) */
window.addEventListener('load',function(){
  var p;try{p=new URLSearchParams(location.search)}catch(e){return}
  var cena=p.get('cena'),ab=p.get('abrir');
  if(cena){var el=$('[data-cena~="'+cena+'"]');if(el){
    if(el.hasAttribute('data-passo')){var w=el.closest('[data-passos]');irPasso(w,+el.getAttribute('data-passo'))}
    else if(el.tagName==='BUTTON'||el.tagName==='A'){el.click()}
    else {el.hidden=false}
    setTimeout(function(){var alvo=el.closest('.cm-tela')||el;if(!alvo.closest('[data-janela]')) alvo.scrollIntoView({block:'start'}); if(document.activeElement&&document.activeElement.blur) document.activeElement.blur()},60)}}
  if(ab){setTimeout(function(){var m=$('[data-cm-moldura]');
    var x=ab==='gaveta'?($('.cm-barra-inferior [data-acao="gaveta"]')||m&&m.querySelector('[data-acao="gaveta"]')):ab==='paleta'?(m&&m.querySelector('[data-acao="paleta"]')||$('.cm-barra-inferior [data-acao="paleta"]')):m&&m.querySelector('[data-acao="'+ab+'"]');
    if(!x||getComputedStyle(x).display==='none') x=$('.cm-barra-inferior [data-acao="'+ab+'"]')||x;
    if(x) x.click();if(ab!=='paleta'&&document.activeElement&&document.activeElement.blur) document.activeElement.blur()},150)}
});
})();
