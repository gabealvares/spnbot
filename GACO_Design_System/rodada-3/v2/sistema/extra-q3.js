/* =====================================================================
   GACO V2 "Casa de Máquinas" · extra-q3.js
   Comportamentos de demonstração das telas do Sistema Interno, parte A.
   Sem bibliotecas. Tudo por atributo, para a tela não ter JS espalhado.
     data-q3-menu="id"        abre/fecha menu, popover ou lista flutuante (Esc e clique fora fecham)
     data-q3-lembra="texto"   item de menu do botão dividido: troca o "lembra" do botão principal
     data-q3-modal="id"       abre modal (.cm-sobreposicao) ou painel lateral (.cm-painel); data-q3-fechar fecha
     data-q3-toast="texto"    mostra toast (data-q3-toast-tipo, data-q3-toast-acao)
     data-q3-estado="nome"    troca o estado da tela; elementos com data-se="a b" aparecem só nesses estados
     [role=tablist]           abas com aria-controls trocam o painel; sem aria-controls só marcam
     .cm-segmentado           marca aria-pressed no grupo
     .cm-ficha__lapis         edição no lugar; alimenta a barra de salvar [data-q3-barra]
     .cm-celula-editavel      edição de célula em tabela; alimenta a mesma barra
     data-q3-massa="id"       tabela com seleção; mostra a barra de massa id com a contagem
     data-q3-slash="id"       área de texto com "/" que abre a lista de respostas rápidas id
     .cm-kanban               arrastar cartões entre colunas, recalcula contagem e soma
     .cm-reacao, data-q3-ciencia, data-q3-concluir (item do Para você)
   ===================================================================== */
(function(){
'use strict';
window.CM_LINKS=Object.assign({
  'Início':'20-home.html','Pessoas':'20c-pessoas.html','Meu perfil':'20b-perfil.html','Mural':'20-home.html',
  'Conversas':'21-suporte.html','Chamados':'21b-chamados.html','Respostas rápidas':'21d-respostas-rapidas.html','Filas':'21e-filas-sla.html','Configuração de SLA':'21e-filas-sla.html','Painel do suporte':'21f-supervisor.html',
  'Clientes':'22-cs.html','Carteiras':'22-cs.html','Renovações':'22c-renovacoes.html','NPS':'22d-nps.html','Respostas NPS':'22d-nps.html','Playbooks do CS':'22e-playbooks.html','Reuniões':'22f-reuniao.html',
  'Leads do comercial':'23-comercial.html','Negócios':'23b-pipeline.html','Propostas':'23d-proposta.html','Metas de vendas':'23e-metas.html',
  'Campanhas':'24-marketing.html','Segmentação':'24c-segmento.html','Modelos de e-mail':'24d-email.html','Disparos de e-mail':'24b-campanha.html','Calendário editorial':'24e-calendario.html',
  'Ordens de serviço':'25-operacoes.html','Preventivas':'25c-preventivas.html','Equipamentos':'25d-equipamentos.html','Estoque':'25e-estoque.html','Contratos de fornecedor':'25f-fornecedores.html','Áreas comuns':'25g-portaria.html'
},window.CM_LINKS||{});

var PAGINAS=[
 ['Início e pessoas',[['20-home.html','Início A e B'],['20d-home-gestor.html','Início do gestor'],['20e-primeiro-acesso.html','Primeiro acesso'],['20b-perfil.html','Perfil da pessoa'],['20c-pessoas.html','Diretório']]],
 ['Suporte',[['21-suporte.html','Conversas'],['21b-chamados.html','Chamados'],['21c-chamado.html','Chamado'],['21d-respostas-rapidas.html','Respostas rápidas'],['21e-filas-sla.html','Filas e SLA'],['21f-supervisor.html','Supervisor'],['21g-mesclar.html','Mesclar e transferir']]],
 ['CS',[['22-cs.html','Carteira'],['22b-cliente.html','Cliente'],['22c-renovacoes.html','Renovações'],['22d-nps.html','NPS'],['22e-playbooks.html','Playbooks'],['22f-reuniao.html','Reunião e ata'],['22g-saude.html','Saúde e alertas']]],
 ['Comercial',[['23-comercial.html','Leads'],['23b-pipeline.html','Negócios'],['23c-negocio.html','Negócio'],['23d-proposta.html','Proposta'],['23e-metas.html','Metas']]],
 ['Marketing',[['24-marketing.html','Campanhas'],['24b-campanha.html','Campanha'],['24c-segmento.html','Segmento'],['24d-email.html','Editor de e-mail'],['24e-calendario.html','Calendário editorial']]],
 ['Operações',[['25-operacoes.html','Ordens de serviço'],['25b-os.html','OS'],['25c-preventivas.html','Preventivas'],['25d-equipamentos.html','Equipamentos'],['25e-estoque.html','Estoque'],['25f-fornecedores.html','Fornecedores'],['25g-portaria.html','Portaria'],['25h-reservas.html','Reservas']]]
];

function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function brl(n){return 'R$ '+n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
window.q3Brl=brl;

/* ---------- toast com ação que funciona ---------- */
function toast(texto,tipo,acao,aoAgir){
  if(!window.cmToast) return;
  window.cmToast(texto,tipo||'sucesso',acao);
  var ts=$$('.cm-toasts .cm-toast');var t=ts[ts.length-1];
  if(t&&acao){var b=t.querySelector('.cm-toast__acao');if(b) b.onclick=function(){t.remove();if(aoAgir) aoAgir();else window.cmToast('Desfeito','info')}}
}
window.q3Toast=toast;

/* ---------- navegação entre as telas desta parte ---------- */
function paginas(){
  var aqui=location.pathname.split('/').pop()||'';
  $$('[data-q3-paginas]').forEach(function(n){
    n.innerHTML=PAGINAS.map(function(g){return '<span><b>'+esc(g[0])+':</b> '+g[1].map(function(p){return '<a href="'+p[0]+'"'+(p[0]===aqui?' aria-current="page"':'')+'>'+esc(p[1])+'</a>'}).join(', ')+'</span>'}).join('');
  });
  $$('[data-q3-recolher]').forEach(function(b){b.addEventListener('click',function(){var d=b.closest('.cm-doc');var r=d.classList.toggle('is-recolhida');b.setAttribute('aria-expanded',String(!r));b.lastChild.textContent=r?' Mostrar explicação':' Esconder explicação'})});
}

/* ---------- estados da tela ---------- */
var ESTADO=null;
function estado(nome,semUrl){
  ESTADO=nome;
  $$('[data-se]').forEach(function(el){var l=el.getAttribute('data-se').split(/\s+/);el.hidden=l.indexOf(nome)<0});
  $$('[data-q3-estado]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-q3-estado')===nome))});
  document.documentElement.setAttribute('data-q3-estado',nome);
  if(!semUrl){try{var u=new URL(location.href);u.searchParams.set('estado',nome);history.replaceState(null,'',u)}catch(e){}}
  document.dispatchEvent(new CustomEvent('q3:estado',{detail:nome}));
}
window.q3Estado=estado;
function iniciarEstado(){
  var bs=$$('[data-q3-estado]');if(!bs.length&&!$('[data-se]')) return;
  var p=null;try{p=new URLSearchParams(location.search).get('estado')}catch(e){}
  var ini=p||(bs[0]&&bs[0].getAttribute('data-q3-estado'))||'padrao';
  bs.forEach(function(b){b.addEventListener('click',function(){estado(b.getAttribute('data-q3-estado'))})});
  estado(ini,!p);
}

/* ---------- menus flutuantes ---------- */
var aberto=null;
function fecharMenu(devolver){if(!aberto) return;aberto.m.hidden=true;aberto.b.setAttribute('aria-expanded','false');if(devolver) aberto.b.focus();aberto=null}
function abrirMenu(b){
  var m=document.getElementById(b.getAttribute('data-q3-menu'));if(!m) return;
  if(aberto&&aberto.m===m){fecharMenu();return}
  fecharMenu();m.hidden=false;b.setAttribute('aria-expanded','true');aberto={m:m,b:b};
  var f=m.querySelector('[role=menuitem],[role=option],input,button');if(f&&b.matches(':focus-visible')) f.focus();
}

/* ---------- modal e painel ---------- */
var modalAberto=[];
function abrirModal(id,gatilho){
  var m=document.getElementById(id);if(!m) return;m.hidden=false;modalAberto.push({m:m,g:gatilho});
  var f=m.querySelector('[autofocus]')||m.querySelector('input:not([type=hidden]),textarea,select,button:not([data-q3-fechar])')||m.querySelector('button');if(f) setTimeout(function(){f.focus()},20);
}
function fecharModal(){var x=modalAberto.pop();if(!x) return;x.m.hidden=true;if(x.g&&x.g.focus) x.g.focus()}
window.q3AbrirModal=abrirModal;window.q3FecharModal=fecharModal;

/* ---------- barra de salvar ---------- */
var alteracoes=[];
function barra(){return $('[data-q3-barra]')}
function atualizarBarra(){
  var b=barra();if(!b) return;
  b.hidden=!alteracoes.length;
  var n=alteracoes.length;
  var t=b.querySelector('[data-q3-barra-n]');if(t) t.textContent=n+(n===1?' alteração não salva':' alterações não salvas');
  var d=b.querySelector('[data-q3-barra-quais]');if(d) d.textContent=alteracoes.map(function(a){return a.nome}).join(', ');
}
function registrar(nome,desfazer,el){alteracoes=alteracoes.filter(function(a){return a.el!==el});alteracoes.push({nome:nome,desfazer:desfazer,el:el});atualizarBarra()}
window.q3Registrar=registrar;
function salvar(){
  var b=barra();if(!b||!alteracoes.length) return;
  b.classList.add('is-salvando');var principal=b.querySelector('[data-q3-salvar]');if(principal) principal.setAttribute('aria-busy','true');
  setTimeout(function(){
    b.classList.remove('is-salvando');if(principal) principal.removeAttribute('aria-busy');
    alteracoes.forEach(function(a){if(a.el){a.el.classList.remove('is-editado');var x=a.el.querySelector('.cm-ficha__alterado');if(x) x.remove()}});
    var n=alteracoes.length;alteracoes=[];atualizarBarra();
    var lembra=b.querySelector('.cm-dividido__lembra');var depois=lembra?lembra.textContent.trim():'';
    var msg=n+(n===1?' alteração salva':' alterações salvas');
    if(depois==='e próximo') msg+='. Abrindo o próximo da lista.';else if(depois==='e voltar') msg+='. Voltando à lista, na mesma posição.';else if(depois==='e novo') msg+='. Formulário novo aberto.';
    toast(msg,'sucesso');
  },700);
}
function descartar(){alteracoes.slice().reverse().forEach(function(a){a.desfazer()});alteracoes=[];atualizarBarra();toast('Alterações descartadas','info')}

/* ficha: edição no lugar */
function editarLinha(l){
  if(l.classList.contains('is-editando')||l.classList.contains('is-leitura')) return;
  var dd=l.querySelector('dd'),dt=l.querySelector('dt');var nome=dt.textContent.trim();
  var original=l.getAttribute('data-original');if(original==null){original=dd.innerHTML;l.setAttribute('data-original',original)}
  var valor=(dd.getAttribute('data-valor')||dd.textContent.replace(/alterado$/,'')).trim();
  var antes=l.getAttribute('data-antes')||valor;l.setAttribute('data-antes',antes);
  var id='q3c'+Math.random().toString(36).slice(2,7);
  l.classList.add('is-editando');
  dd.innerHTML='<div class="cm-campo cm-cresce"><div class="cm-entrada is-editado"><input id="'+id+'" aria-label="'+esc(nome)+'" aria-describedby="'+id+'a" value="'+esc(valor)+'"></div><p class="cm-campo__antes" id="'+id+'a">Era '+esc(antes)+'. Enter confirma, Esc desfaz.</p></div>';
  var inp=dd.querySelector('input');inp.focus();inp.select();
  function fim(confirmar){
    if(!l.classList.contains('is-editando')) return;
    l.classList.remove('is-editando');var novo=inp.value.trim();
    if(confirmar&&novo!==antes){
      dd.innerHTML=esc(novo)+' <span class="cm-ficha__alterado">alterado</span>';dd.setAttribute('data-valor',novo);l.classList.add('is-editado');
      registrar(nome,function(){dd.innerHTML=original;dd.removeAttribute('data-valor');l.classList.remove('is-editado');l.removeAttribute('data-antes')},l);
    } else if(confirmar&&novo===antes){dd.innerHTML=original;l.classList.remove('is-editado');alteracoes=alteracoes.filter(function(a){return a.el!==l});atualizarBarra()}
    else {dd.innerHTML=l.classList.contains('is-editado')?esc(dd.getAttribute('data-valor'))+' <span class="cm-ficha__alterado">alterado</span>':original}
    var lp=l.querySelector('.cm-ficha__lapis');if(lp) lp.focus();
  }
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();fim(true)}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fim(false)}});
  inp.addEventListener('blur',function(){setTimeout(function(){fim(true)},120)});
}
/* célula editável */
function editarCelula(td){
  if(td.classList.contains('is-editando')||td.classList.contains('is-leitura')) return;
  var original=td.getAttribute('data-original');if(original==null){original=td.innerHTML;td.setAttribute('data-original',original)}
  var valor=td.textContent.trim();var nome=td.getAttribute('data-nome')||'Célula';
  td.classList.add('is-editando');td.innerHTML='<input aria-label="'+esc(nome)+'" value="'+esc(valor)+'">';
  var inp=td.querySelector('input');inp.focus();inp.select();
  function fim(ok){
    if(!td.classList.contains('is-editando')) return;td.classList.remove('is-editando');var novo=inp.value.trim();
    if(ok&&novo!==valor){td.textContent=novo;td.classList.add('is-editado');registrar(nome,function(){td.innerHTML=original;td.classList.remove('is-editado')},td)}
    else td.innerHTML=ok?esc(novo):(td.classList.contains('is-editado')?esc(valor):original);
    td.focus();
  }
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();fim(true)}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fim(false)}else if(e.key==='Tab'){fim(true)}});
  inp.addEventListener('blur',function(){setTimeout(function(){fim(true)},100)});
}

/* ---------- seleção em massa ---------- */
function massa(t){
  var bar=document.getElementById(t.getAttribute('data-q3-massa'));
  function contar(){var cs=$$('tbody input[type=checkbox]',t);var n=cs.filter(function(c){return c.checked}).length;
    cs.forEach(function(c){var tr=c.closest('tr');if(tr) tr.setAttribute('aria-selected',String(c.checked))});
    var todos=$('thead input[type=checkbox]',t);if(todos){todos.checked=n===cs.length&&n>0;todos.indeterminate=n>0&&n<cs.length}
    if(bar){bar.hidden=!n;var b=bar.querySelector('[data-q3-massa-n]');if(b) b.textContent=n+(n===1?' selecionado':' selecionados')}}
  t.addEventListener('change',function(e){var c=e.target;if(c.type!=='checkbox') return;if(c.closest('thead')) $$('tbody input[type=checkbox]',t).forEach(function(x){x.checked=c.checked});contar()});
  if(bar){var cancelar=bar.querySelector('[data-q3-massa-cancelar]');if(cancelar) cancelar.addEventListener('click',function(){$$('input[type=checkbox]',t).forEach(function(x){x.checked=false});contar()})}
  contar();
}

/* ---------- "/" respostas rápidas ---------- */
function slash(ta){
  var lista=document.getElementById(ta.getAttribute('data-q3-slash'));if(!lista) return;
  var ops=$$('[data-texto]',lista),sel=0;
  function visiveis(){return ops.filter(function(o){return !o.hidden})}
  function marcar(){var v=visiveis();v.forEach(function(o,i){o.classList.toggle('is-ativa',i===sel);o.setAttribute('aria-selected',String(i===sel))})}
  function termo(){var m=ta.value.slice(0,ta.selectionStart).match(/(^|\s)\/([\wÀ-ú-]*)$/);return m?m[2].toLowerCase():null}
  function ver(){var t=termo();if(t===null){lista.hidden=true;ta.setAttribute('aria-expanded','false');return}
    ops.forEach(function(o){o.hidden=(o.getAttribute('data-atalho')||'').indexOf(t)<0&&o.textContent.toLowerCase().indexOf(t)<0});
    sel=0;lista.hidden=!visiveis().length;ta.setAttribute('aria-expanded',String(!lista.hidden));marcar()}
  function inserir(o){var pos=ta.selectionStart;var antes=ta.value.slice(0,pos).replace(/\/[\wÀ-ú-]*$/,'');ta.value=antes+o.getAttribute('data-texto')+ta.value.slice(pos);lista.hidden=true;ta.setAttribute('aria-expanded','false');ta.focus();ta.dispatchEvent(new Event('input'))}
  ta.addEventListener('input',ver);
  ta.addEventListener('keydown',function(e){if(lista.hidden) return;var v=visiveis();
    if(e.key==='ArrowDown'){e.preventDefault();sel=(sel+1)%v.length;marcar()}else if(e.key==='ArrowUp'){e.preventDefault();sel=(sel-1+v.length)%v.length;marcar()}
    else if(e.key==='Enter'||e.key==='Tab'){e.preventDefault();inserir(v[sel])}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();lista.hidden=true}});
  lista.addEventListener('mousedown',function(e){var o=e.target.closest('[data-texto]');if(o){e.preventDefault();inserir(o)}});
  if(!lista.hidden) marcar();
}

/* ---------- kanban ---------- */
function kanban(k){
  var arrastado=null,origem=null;
  function recalcular(){$$('.cm-kanban__coluna',k).forEach(function(c){var cs=$$('.cm-kanban-cartao',c);var n=c.querySelector('.cm-kanban__cabeca .cm-contador');if(n) n.textContent=cs.length;
    var s=c.querySelector('[data-q3-soma]');if(s){var tot=cs.reduce(function(a,x){return a+(+x.getAttribute('data-valor')||0)},0);s.textContent=brl(tot)+' por mês'}})}
  k.addEventListener('dragstart',function(e){var c=e.target.closest('.cm-kanban-cartao');if(!c) return;arrastado=c;origem=c.parentNode;c.classList.add('is-arrastando');e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain','x')}catch(x){}});
  k.addEventListener('dragend',function(){if(arrastado) arrastado.classList.remove('is-arrastando');$$('.is-alvo',k).forEach(function(x){x.classList.remove('is-alvo')});arrastado=null});
  k.addEventListener('dragover',function(e){var z=e.target.closest('.cm-kanban__cartoes');if(!z||!arrastado) return;e.preventDefault();$$('.is-alvo',k).forEach(function(x){if(x!==z)x.classList.remove('is-alvo')});z.classList.add('is-alvo')});
  k.addEventListener('drop',function(e){var z=e.target.closest('.cm-kanban__cartoes');if(!z||!arrastado) return;e.preventDefault();z.classList.remove('is-alvo');
    var c=arrastado,o=origem,prox=c.nextSibling;z.insertBefore(c,z.firstChild);recalcular();
    var col=z.closest('.cm-kanban__coluna').querySelector('.cm-kanban__titulo').textContent;
    toast(c.querySelector('.cm-kanban-cartao__titulo').textContent+' movido para '+col,'sucesso','Desfazer',function(){o.insertBefore(c,prox);recalcular();toast('Movimento desfeito','info')})});
  recalcular();
}

/* ---------- cliques globais ---------- */
document.addEventListener('click',function(e){
  var t=e.target;
  var bm=t.closest('[data-q3-menu]');if(bm){e.preventDefault();e.stopPropagation();abrirMenu(bm);return}
  var lem=t.closest('[data-q3-lembra]');
  if(lem){var menu=lem.closest('[id]');var div=menu&&$('[data-q3-menu="'+menu.id+'"]');var principal=div&&div.closest('.cm-dividido')&&div.closest('.cm-dividido').querySelector('.cm-dividido__lembra');
    if(principal) principal.textContent=lem.getAttribute('data-q3-lembra');
    $$('[data-q3-lembra]',menu).forEach(function(x){x.setAttribute('aria-checked',String(x===lem))});
    fecharMenu(true);if(!lem.hasAttribute('data-q3-toast')) toast('Escolha lembrada: '+lem.textContent.trim().replace(/\s+\S+$/,''),'info');}
  if(aberto&&!aberto.m.contains(t)) fecharMenu();
  else if(aberto&&t.closest('[role=menuitem],[role=menuitemradio]')&&!t.closest('[data-q3-manter]')) fecharMenu(true);
  var mo=t.closest('[data-q3-modal]');if(mo){e.preventDefault();abrirModal(mo.getAttribute('data-q3-modal'),mo)}
  if(t.closest('[data-q3-fechar]')){fecharModal()}
  else if(t.classList&&t.classList.contains('cm-sobreposicao')&&!t.hidden){fecharModal()}
  var to=t.closest('[data-q3-toast]');if(to) toast(to.getAttribute('data-q3-toast'),to.getAttribute('data-q3-toast-tipo')||'sucesso',to.getAttribute('data-q3-toast-acao'));
  /* abas */
  var tab=t.closest('[role=tab]');
  if(tab&&tab.parentNode.getAttribute('role')==='tablist'){
    $$('[role=tab]',tab.parentNode).forEach(function(x){var on=x===tab;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;var p=x.getAttribute('aria-controls');if(p){var pn=document.getElementById(p);if(pn) pn.hidden=!on}});
  }
  /* segmentado */
  var sg=t.closest('.cm-segmentado>button');if(sg&&!sg.hasAttribute('data-q3-estado')&&!sg.closest('[data-q3-livre]')){$$('button',sg.parentNode).forEach(function(x){x.setAttribute('aria-pressed',String(x===sg))})}
  /* ficha */
  var lp=t.closest('.cm-ficha__lapis');if(lp){editarLinha(lp.closest('.cm-ficha__linha'))}
  var ce=t.closest('.cm-celula-editavel');if(ce&&!t.closest('input')){editarCelula(ce)}
  if(t.closest('[data-q3-salvar]')) salvar();
  if(t.closest('[data-q3-descartar]')) descartar();
  /* reação */
  var rx=t.closest('.cm-reacao');if(rx&&!rx.hasAttribute('data-q3-nao')){var on=rx.getAttribute('aria-pressed')!=='true';rx.setAttribute('aria-pressed',String(on));var n=rx.querySelector('.cm-reacao__n');var v=(n?+n.textContent:0)+(on?1:-1);if(!n&&on){n=document.createElement('span');n.className='cm-reacao__n';rx.appendChild(n)}if(n){if(v>0)n.textContent=v;else n.remove()}}
  /* ciência */
  var ci=t.closest('[data-q3-ciencia]');if(ci){var box=ci.closest('.cm-ciencia');box.classList.add('is-confirmada');var tx=box.querySelector('.cm-ciencia__texto');if(tx) tx.textContent='Você confirmou a leitura hoje às 09:52. Fica registrado no comunicado.';ci.remove();toast('Ciência registrada','sucesso')}
  /* concluir item do Para você */
  var cc=t.closest('[data-q3-concluir]');if(cc){var it=cc.closest('.cm-pv-item');if(it){it.classList.add('is-saindo');var pai=it.parentNode,prox=it.nextSibling;setTimeout(function(){it.remove();contarPv()},260);
    toast(cc.getAttribute('data-q3-concluir')||'Feito','sucesso','Desfazer',function(){it.classList.remove('is-saindo');pai.insertBefore(it,prox);contarPv()})}}
});
function contarPv(){$$('[data-q3-pv-conta]').forEach(function(n){var alvo=document.getElementById(n.getAttribute('data-q3-pv-conta'));if(alvo) n.textContent=$$('.cm-pv-item',alvo).length})}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){if(aberto){e.preventDefault();fecharMenu(true);return}if(modalAberto.length){e.preventDefault();fecharModal();return}}
  if((e.ctrlKey||e.metaKey)&&(e.key==='s'||e.key==='S')&&barra()&&alteracoes.length){e.preventDefault();salvar()}
  var ce=e.target.closest&&e.target.closest('.cm-celula-editavel');if(ce&&e.key==='Enter'&&!ce.classList.contains('is-editando')){e.preventDefault();editarCelula(ce)}
  /* setas no menu aberto */
  if(aberto&&(e.key==='ArrowDown'||e.key==='ArrowUp')){var its=$$('[role=menuitem],[role=menuitemradio],[role=option]',aberto.m).filter(function(x){return !x.hidden});if(!its.length) return;e.preventDefault();var i=its.indexOf(document.activeElement);its[(i+(e.key==='ArrowDown'?1:-1)+its.length)%its.length].focus()}
});

function iniciar(){
  paginas();iniciarEstado();
  $$('[data-q3-massa]').forEach(massa);
  $$('[data-q3-slash]').forEach(slash);
  $$('.cm-kanban').forEach(kanban);
  $$('.cm-flutuante[data-q3-inicia-fechado]').forEach(function(x){x.hidden=true});
  contarPv();atualizarBarra();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar); else iniciar();
})();
