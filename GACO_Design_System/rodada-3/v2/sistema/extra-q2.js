/* =====================================================================
   GACO V2 "Casa de Máquinas" · extra-q2.js
   Comportamentos de padrões de tela e fluxos (agente q2), por atributo.
   Para o coordenador fundir. Sem biblioteca. Depende de icones.js e moldura.js (cmToast).
   Atributos:
     data-q2-abre="id"          abre/fecha menu ou popover (aria-expanded, Esc, clique fora, setas)
     data-q2-modal="id"         abre modal, painel ou folha (.cm-sobreposicao[hidden] ou aside[hidden]); data-q2-fechar fecha
     data-q2-toast="texto|tipo|ação"
     data-q2-abas               grupo de abas (role=tab + aria-controls)
     data-q2-alterna            grupo segmentado; botão com data-mostra="id1 id2" mostra e esconde irmãos
     data-q2-form="nome"        formulário com barra de salvar [data-q2-barra="nome"] que só aparece com alteração
     data-q2-campo              linha de ficha editável por campo (Enter confirma, Esc desfaz)
     data-q2-campo-acao         campo de ação (responsável, prioridade): grava na hora com Desfazer
     data-q2-secao              cartão editável por seção ([data-q2-editar-secao], [data-q2-secao-form])
     data-q2-lista              lista navegável por J e K (itens data-q2-item; contagem em [data-q2-posicao])
     data-q2-celula             célula de tabela editável (objeto-linha): Enter grava a linha, Esc desfaz
     iframe[data-q2-src]        palco que recebe o tema da página
   Eventos: q2:salvo {opcao}, q2:abrir {item}, q2:descartado
   ===================================================================== */
(function(){
'use strict';
var D=document, H=D.documentElement;
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
function I(n,c,r){return window.cmIcone?window.cmIcone(n,c,r):''}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function ler(k){try{return localStorage.getItem(k)}catch(e){return null}}
function gravar(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function toast(t,tipo,acao,fn){
  if(!window.cmToast) return;
  window.cmToast(t,tipo,acao);
  if(fn&&acao){var ts=$$('.cm-toast'),ul=ts[ts.length-1];var b=ul&&ul.querySelector('.cm-toast__acao');if(b) b.addEventListener('click',function(){fn();ul.remove()})}
}
function digitando(e){var t=e.target;if(!t||!t.closest) return false;return !!t.closest('input,textarea,select,[contenteditable="true"],[role="textbox"]')}
var Q={};window.cmQ2=Q;
Q.toast=toast;Q.digitando=digitando;
Q.atalhosLigados=function(){return ler('cm-v2-atalhos')!=='desligados'};
Q.ligarAtalhos=function(on){gravar('cm-v2-atalhos',on?'ligados':'desligados');H.setAttribute('data-atalhos',on?'ligados':'desligados')};
H.setAttribute('data-atalhos',Q.atalhosLigados()?'ligados':'desligados');

/* ---------- tema para os palcos (iframes) ---------- */
function temaAtual(){return H.getAttribute('data-theme')||'dark'}
function prepararPalcos(){
  $$('iframe[data-q2-src]').forEach(function(f){
    var u=f.getAttribute('data-q2-src');u+=(u.indexOf('?')<0?'?':'&')+'theme='+temaAtual();
    if(f.getAttribute('loading')==='lazy'||true) f.src=u;
  });
}
D.addEventListener('cm:tema',function(e){
  $$('iframe[data-q2-src]').forEach(function(f){try{f.contentWindow.postMessage({cmTema:e.detail.tema},'*')}catch(x){}});
});
window.addEventListener('message',function(e){var d=e.data||{};if(d.cmTema&&window.cmAplicarTema) window.cmAplicarTema(d.cmTema,false)});

/* ---------- menus e popovers ---------- */
var menuAberto=null;
function fecharMenu(devolver){if(!menuAberto) return;menuAberto.el.hidden=true;menuAberto.g.setAttribute('aria-expanded','false');if(devolver) menuAberto.g.focus();menuAberto=null}
function abrirMenu(g){
  var el=D.getElementById(g.getAttribute('data-q2-abre'));if(!el) return;
  if(menuAberto&&menuAberto.el===el){fecharMenu(true);return}
  fecharMenu();el.hidden=false;g.setAttribute('aria-expanded','true');menuAberto={el:el,g:g};
  var p=el.querySelector('[role="menuitem"],[role="menuitemradio"],[role="option"],input,button');if(p&&el.getAttribute('role')==='menu') p.focus();
}
Q.fecharMenu=fecharMenu;
D.addEventListener('click',function(e){
  var g=e.target.closest('[data-q2-abre]');
  if(g){e.preventDefault();abrirMenu(g);return}
  if(menuAberto&&!menuAberto.el.contains(e.target)) fecharMenu();
  else if(menuAberto&&e.target.closest('[role="menuitem"],[role="menuitemradio"]')&&!e.target.closest('[data-q2-fica]')) fecharMenu(true);
});
D.addEventListener('keydown',function(e){
  if(!menuAberto) return;
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fecharMenu(true);return}
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    var it=$$('[role="menuitem"],[role="menuitemradio"]',menuAberto.el);if(!it.length) return;
    e.preventDefault();var i=it.indexOf(D.activeElement);i=e.key==='ArrowDown'?(i+1)%it.length:(i-1+it.length)%it.length;it[i].focus();
  }
},true);

/* ---------- modais, painéis, folhas ---------- */
var pilha=[];
function focaveis(el){return $$('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])',el).filter(function(x){return x.offsetParent!==null||x===D.activeElement})}
Q.abrirModal=function(id,gatilho){
  var el=typeof id==='string'?D.getElementById(id):id;if(!el) return;
  fecharMenu();el.hidden=false;pilha.push({el:el,g:gatilho||D.activeElement});
  var f=el.querySelector('[autofocus]')||focaveis(el)[0];if(f) setTimeout(function(){f.focus()},10);
  el.dispatchEvent(new CustomEvent('q2:aberto',{bubbles:true}));
};
Q.fecharModal=function(el){
  if(!pilha.length) return;var i=pilha.length-1;
  if(el){for(var k=0;k<pilha.length;k++) if(pilha[k].el===el||pilha[k].el.contains(el)) i=k}
  var x=pilha.splice(i,1)[0];x.el.hidden=true;if(x.g&&x.g.focus) x.g.focus();
  x.el.dispatchEvent(new CustomEvent('q2:fechado',{bubbles:true}));
};
D.addEventListener('click',function(e){
  var m=e.target.closest('[data-q2-modal]');if(m){e.preventDefault();Q.abrirModal(m.getAttribute('data-q2-modal'),m);return}
  var f=e.target.closest('[data-q2-fechar]');if(f){e.preventDefault();Q.fecharModal(f);return}
  if(pilha.length){var t=pilha[pilha.length-1].el;if(e.target===t&&t.classList.contains('cm-sobreposicao')&&!t.hasAttribute('data-q2-fixo')) Q.fecharModal(t)}
  var t2=e.target.closest('[data-q2-toast]');if(t2){var p=t2.getAttribute('data-q2-toast').split('|');toast(p[0],p[1]||'sucesso',p[2])}
});
D.addEventListener('keydown',function(e){
  if(!pilha.length) return;var top=pilha[pilha.length-1].el;
  if(e.key==='Escape'&&!menuAberto&&!e.target.closest('[data-q2-editando]')){e.preventDefault();if(!top.hasAttribute('data-q2-fixo')) Q.fecharModal(top);return}
  if(e.key==='Tab'){var fs=focaveis(top);if(!fs.length) return;var a=fs[0],z=fs[fs.length-1];
    if(e.shiftKey&&D.activeElement===a){e.preventDefault();z.focus()} else if(!e.shiftKey&&D.activeElement===z){e.preventDefault();a.focus()}}
});

/* ---------- abas e alternadores ---------- */
D.addEventListener('click',function(e){
  var t=e.target.closest('[data-q2-abas] [role="tab"]');
  if(t){var g=t.closest('[data-q2-abas]');$$('[role="tab"]',g).forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;var p=x.getAttribute('aria-controls');if(p&&D.getElementById(p)) D.getElementById(p).hidden=!on})}
  var s=e.target.closest('[data-q2-alterna] button');
  if(s){var gg=s.closest('[data-q2-alterna]');$$('button',gg).forEach(function(x){var on=x===s;x.setAttribute('aria-pressed',on);(x.getAttribute('data-mostra')||'').split(' ').forEach(function(id){var el=id&&D.getElementById(id);if(el) el.hidden=!on})})}
});
D.addEventListener('keydown',function(e){
  var t=e.target.closest&&e.target.closest('[data-q2-abas] [role="tab"]');if(!t) return;
  if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;var ts=$$('[role="tab"]',t.closest('[data-q2-abas]'));var i=ts.indexOf(t);
  var n=ts[(i+(e.key==='ArrowRight'?1:-1)+ts.length)%ts.length];n.focus();n.click();e.preventDefault();
});

/* ---------- formulário com barra de salvar ---------- */
var OPCOES={continuar:['e continuar','Salvar e continuar aqui'],proximo:['e próximo','Salvar e ir para o próximo'],voltar:['e voltar à lista','Salvar e voltar à lista'],novo:['e novo','Salvar e criar outro']};
var forms={};
function rotuloDe(el){
  if(el.getAttribute('data-rotulo')) return el.getAttribute('data-rotulo');
  var row=el.closest('[data-q2-campo]');if(row){var dt=row.querySelector('dt');if(dt) return dt.textContent.trim()}
  if(el.id){var l=D.querySelector('label[for="'+el.id+'"]');if(l) return l.textContent.replace('*','').trim()}
  return el.name||'campo';
}
function valor(el){if(el.type==='checkbox'||el.type==='radio') return el.checked?'1':'0';return el.value}
function Form(raiz){
  var nome=raiz.getAttribute('data-q2-form');
  var barra=D.querySelector('[data-q2-barra="'+nome+'"]');
  var F={nome:nome,raiz:raiz,barra:barra,opcao:ler('cm-v2-salvar-'+nome)||raiz.getAttribute('data-q2-opcao')||'continuar'};
  function campos(){return $$('input:not([type="hidden"]),select,textarea',raiz).filter(function(x){return !x.hasAttribute('data-q2-ignora')&&!x.closest('[data-q2-secao-form]')&&!x.closest('[data-q2-campo]')&&!x.closest('[data-q2-celula]')})}
  F.original=function(){campos().forEach(function(c){c.setAttribute('data-q2-orig',valor(c))})};
  F.sujos=function(){
    var s=[];campos().forEach(function(c){if(valor(c)!==c.getAttribute('data-q2-orig')) s.push(rotuloDe(c))});
    $$('[data-q2-campo].is-editado',raiz).forEach(function(r){s.push(rotuloDe(r))});
    return s;
  };
  F.atualizar=function(){
    campos().forEach(function(c){var w=c.closest('.cm-entrada,.cm-selecao');if(w) w.classList.toggle('is-editado',valor(c)!==c.getAttribute('data-q2-orig'))});
    var s=F.sujos();F.sujo=s.length>0;
    if(barra){barra.hidden=!F.sujo;barra.classList.remove('is-erro');
      var b=barra.querySelector('[data-q2-msg] b'),sp=barra.querySelector('[data-q2-msg] span');
      if(b) b.textContent=s.length===1?'1 alteração não salva':s.length+' alterações não salvas';
      if(sp) sp.textContent=s.slice(0,4).join(', ')+(s.length>4?' e mais '+(s.length-4):'');}
    D.title=(F.sujo&&D.title.indexOf('• ')!==0?'• ':'')+D.title.replace(/^• /,'');
    if(!F.sujo) D.title=D.title.replace(/^• /,'');
    raiz.dispatchEvent(new CustomEvent('q2:mudou',{bubbles:true,detail:{sujos:s}}));
  };
  F.rotuloBotao=function(){if(!barra) return;var l=barra.querySelector('[data-q2-salvar] .cm-dividido__lembra');if(l) l.textContent=F.opcao==='continuar'?'':OPCOES[F.opcao][0];
    $$('[data-q2-opcao]',D).forEach(function(o){if(o.closest('[data-q2-menu-de]')&&o.closest('[data-q2-menu-de]').getAttribute('data-q2-menu-de')!==nome) return;o.setAttribute('aria-checked',o.getAttribute('data-q2-opcao')===F.opcao)})};
  F.validar=function(){
    var erros=[];
    $$('[required],[data-q2-valida]',raiz).forEach(function(c){
      var ok=true,msg=c.getAttribute('data-q2-msg')||'Preencha este campo.';
      if(c.hasAttribute('required')&&!c.value.trim()) ok=false;
      var re=c.getAttribute('data-q2-valida');if(ok&&re&&c.value&&!(new RegExp(re)).test(c.value)) ok=false;
      var campo=c.closest('.cm-campo'),w=c.closest('.cm-entrada,.cm-selecao');
      c.setAttribute('aria-invalid',!ok);if(w) w.classList.toggle('is-erro',!ok);
      var p=campo&&campo.querySelector('.cm-campo__erro[data-q2-gerado]');
      if(!ok){if(campo&&!p){p=D.createElement('p');p.className='cm-campo__erro';p.setAttribute('data-q2-gerado','');p.id=(c.id||'c'+Math.random().toString(36).slice(2))+'-erro';campo.appendChild(p);c.setAttribute('aria-describedby',p.id)}
        if(p) p.innerHTML=I('perigo')+esc(msg);erros.push({c:c,rot:rotuloDe(c),msg:msg})}
      else if(p){p.remove();c.removeAttribute('aria-describedby')}
    });
    var r=D.querySelector('[data-q2-resumo="'+nome+'"]');
    if(r){if(erros.length){r.hidden=false;r.innerHTML='<h3 tabindex="-1">'+I('perigo')+(erros.length===1?'1 campo precisa de correção':erros.length+' campos precisam de correção')+'</h3><ul>'+erros.map(function(x){return '<li><a href="#'+x.c.id+'">'+esc(x.rot)+'</a>: '+esc(x.msg)+'</li>'}).join('')+'</ul>';r.querySelector('h3').focus()} else r.hidden=true}
    return erros;
  };
  F.salvar=function(op){
    op=op||F.opcao;
    if(!F.sujo){toast('Nada para salvar. Tudo já está gravado.','info');return}
    var er=F.validar();
    if(er.length){if(barra){barra.classList.add('is-erro');var b=barra.querySelector('[data-q2-msg] b'),sp=barra.querySelector('[data-q2-msg] span');if(b) b.textContent=er.length===1?'1 campo precisa de correção':er.length+' campos precisam de correção';if(sp) sp.textContent='Nada foi gravado ainda.'}
      if(!D.querySelector('[data-q2-resumo="'+nome+'"]')) er[0].c.focus();return}
    if(barra) barra.classList.add('is-salvando');
    var bt=barra&&barra.querySelector('[data-q2-salvar]');if(bt) bt.setAttribute('aria-busy','true');
    setTimeout(function(){
      if(barra){barra.classList.remove('is-salvando')}if(bt) bt.removeAttribute('aria-busy');
      F.original();$$('[data-q2-campo].is-editado',raiz).forEach(function(r){r.classList.remove('is-editado');r.removeAttribute('data-q2-antes');var a=r.querySelector('.cm-ficha__alterado');if(a) a.remove()});
      F.atualizar();
      var ev=new CustomEvent('q2:salvo',{bubbles:true,cancelable:true,detail:{opcao:op}});raiz.dispatchEvent(ev);
      if(!ev.defaultPrevented) toast(raiz.getAttribute('data-q2-salvo')||'Alterações salvas.','sucesso');
    },650);
  };
  F.descartar=function(){
    campos().forEach(function(c){var o=c.getAttribute('data-q2-orig');if(c.type==='checkbox'||c.type==='radio') c.checked=o==='1';else c.value=o});
    $$('[data-q2-campo].is-editado',raiz).forEach(function(r){desfazerLinha(r)});
    $$('[aria-invalid="true"]',raiz).forEach(function(c){c.removeAttribute('aria-invalid');var w=c.closest('.cm-entrada');if(w) w.classList.remove('is-erro')});
    $$('.cm-campo__erro[data-q2-gerado]',raiz).forEach(function(p){p.remove()});
    var r=D.querySelector('[data-q2-resumo="'+nome+'"]');if(r) r.hidden=true;
    F.atualizar();raiz.dispatchEvent(new CustomEvent('q2:descartado',{bubbles:true}));
  };
  raiz.addEventListener('input',function(e){if(!e.target.closest('[data-q2-secao-form]')) F.atualizar()});
  raiz.addEventListener('change',function(e){if(!e.target.closest('[data-q2-secao-form]')) F.atualizar()});
  if(barra){
    barra.hidden=true;
    barra.addEventListener('click',function(e){
      if(e.target.closest('[data-q2-descartar]')){F.descartar();toast('Alterações descartadas.','info');return}
      if(e.target.closest('[data-q2-salvar]')){F.salvar();return}
    });
  }
  D.addEventListener('click',function(e){
    var o=e.target.closest('[data-q2-opcao]');if(!o) return;var md=o.closest('[data-q2-menu-de]');if(md&&md.getAttribute('data-q2-menu-de')!==nome) return;
    var op=o.getAttribute('data-q2-opcao');var lem=D.querySelector('[data-q2-lembrar="'+nome+'"]');
    if(!lem||lem.checked){F.opcao=op;gravar('cm-v2-salvar-'+nome,op);F.rotuloBotao()}
    F.salvar(op);
  });
  F.original();F.rotuloBotao();F.atualizar();
  forms[nome]=F;return F;
}
Q.form=function(n){return forms[n]};
Q.algumSujo=function(){for(var k in forms) if(forms[k].sujo) return forms[k];return null};
Q.opcoes=OPCOES;

/* linha de ficha editável por campo */
function abrirLinha(r){
  if(r.classList.contains('is-editando')||r.classList.contains('is-leitura')) return;
  if(r.closest('.is-bloqueado')){toast('Termine a edição da seção antes de mudar outro campo.','aviso');return}
  var dd=r.querySelector('dd');var atual=r.getAttribute('data-valor')!=null?r.getAttribute('data-valor'):dd.textContent.trim();
  if(r.getAttribute('data-q2-orig')==null) r.setAttribute('data-q2-orig',atual);
  r.setAttribute('data-q2-html',dd.innerHTML);
  var opc=r.getAttribute('data-opcoes');
  var ctl=opc?'<div class="cm-selecao"><select aria-label="'+esc(rotuloDe(r))+'">'+opc.split('|').map(function(o){return '<option'+(o===atual?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>'+I('chevron-baixo')+'</div>'
    :'<div class="cm-entrada is-editado"><input value="'+esc(atual)+'" aria-label="'+esc(rotuloDe(r))+'"'+(r.getAttribute('data-tipo')?' inputmode="'+r.getAttribute('data-tipo')+'"':'')+'></div>';
  dd.innerHTML='<div class="cm-campo cm-cresce" data-q2-editando>'+ctl+'<p class="cm-campo__antes">'+(r.getAttribute('data-q2-orig')!==''?'Era '+esc(r.getAttribute('data-q2-orig'))+'. ':'')+'Enter confirma, Esc desfaz.</p></div>';
  r.classList.add('is-editando');var c=dd.querySelector('input,select');c.focus();if(c.select) c.select();
  c.addEventListener('keydown',function(e){
    if(e.key==='Enter'){e.preventDefault();confirmarLinha(r,c.value)}
    else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();cancelarLinha(r)}
  });
  if(opc) c.addEventListener('change',function(){confirmarLinha(r,c.value)});
}
function mostrarValor(r,v){var dd=r.querySelector('dd');var fmt=r.getAttribute('data-q2-html-'+v);dd.textContent=v||'Não informado'}
function confirmarLinha(r,v){
  var orig=r.getAttribute('data-q2-orig');r.classList.remove('is-editando');
  var acao=r.hasAttribute('data-q2-campo-acao');
  if(v===orig&&!acao){var dd=r.querySelector('dd');dd.innerHTML=r.getAttribute('data-q2-html');r.classList.remove('is-editado');focoLinha(r);var f0=r.closest('[data-q2-form]');if(f0&&forms[f0.getAttribute('data-q2-form')]) forms[f0.getAttribute('data-q2-form')].atualizar();return}
  r.setAttribute('data-valor',v);mostrarValor(r,v);
  if(acao){
    var ant=r.getAttribute('data-q2-orig');r.removeAttribute('data-q2-orig');
    toast(rotuloDe(r)+': '+v+'. Gravado.','sucesso','Desfazer',function(){r.setAttribute('data-valor',ant);mostrarValor(r,ant);toast(rotuloDe(r)+' voltou para '+ant+'.','info')});
    focoLinha(r);return;
  }
  r.classList.add('is-editado');
  var dt=r.querySelector('dt');if(dt&&!dt.querySelector('.cm-ficha__alterado')){var a=D.createElement('span');a.className='cm-ficha__alterado';a.textContent='alterado';dt.appendChild(a)}
  var f=r.closest('[data-q2-form]');if(f&&forms[f.getAttribute('data-q2-form')]) forms[f.getAttribute('data-q2-form')].atualizar();
  focoLinha(r);
}
function cancelarLinha(r){var dd=r.querySelector('dd');dd.innerHTML=r.getAttribute('data-q2-html');r.classList.remove('is-editando');focoLinha(r)}
function desfazerLinha(r){var o=r.getAttribute('data-q2-orig');r.setAttribute('data-valor',o);mostrarValor(r,o);r.classList.remove('is-editado','is-editando');var a=r.querySelector('.cm-ficha__alterado');if(a) a.remove()}
function focoLinha(r){var l=r.querySelector('.cm-ficha__lapis');if(l) l.focus()}
D.addEventListener('click',function(e){
  var r=e.target.closest('[data-q2-campo]');if(!r) return;
  if(e.target.closest('.cm-ficha__lapis')||(e.target.closest('dd')&&!e.target.closest('[data-q2-editando]')&&!e.target.closest('a'))) abrirLinha(r);
});

/* edição por seção */
D.addEventListener('click',function(e){
  var b=e.target.closest('[data-q2-editar-secao]');
  if(b){var s=b.closest('[data-q2-secao]');abrirSecao(s);return}
  var c=e.target.closest('[data-q2-secao-cancelar]');if(c){fecharSecao(c.closest('[data-q2-secao]'),false);return}
  var v=e.target.closest('[data-q2-secao-salvar]');if(v){fecharSecao(v.closest('[data-q2-secao]'),true);return}
});
function abrirSecao(s){
  var leitura=s.querySelector('[data-q2-secao-leitura]'),form=s.querySelector('[data-q2-secao-form]');
  $$('input,select,textarea',form).forEach(function(c){c.setAttribute('data-q2-orig',valor(c))});
  leitura.hidden=true;form.hidden=false;s.classList.add('cm-secao-editando','is-limpo');
  var bt=s.querySelector('[data-q2-editar-secao]');if(bt) bt.hidden=true;
  var p=s.closest('[data-q2-form]')||D.body;$$('[data-q2-secao]',p).forEach(function(o){if(o!==s) o.classList.add('is-bloqueado')});
  var f=form.querySelector('input,select,textarea');if(f) f.focus();
  form.oninput=function(){var suj=$$('input,select,textarea',form).some(function(c){return valor(c)!==c.getAttribute('data-q2-orig')});s.classList.toggle('is-limpo',!suj);
    $$('input,select,textarea',form).forEach(function(c){var w=c.closest('.cm-entrada,.cm-selecao');if(w) w.classList.toggle('is-editado',valor(c)!==c.getAttribute('data-q2-orig'))})};
  form.onkeydown=function(e){if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fecharSecao(s,false)} if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();e.stopPropagation();fecharSecao(s,true)}};
}
function fecharSecao(s,salvar){
  var leitura=s.querySelector('[data-q2-secao-leitura]'),form=s.querySelector('[data-q2-secao-form]');
  if(salvar){
    var er=[];$$('[required]',form).forEach(function(c){var w=c.closest('.cm-entrada');var ok=!!c.value.trim();c.setAttribute('aria-invalid',!ok);if(w) w.classList.toggle('is-erro',!ok);if(!ok) er.push(c)});
    if(er.length){er[0].focus();toast('Falta preencher '+rotuloDe(er[0])+'.','perigo');return}
    var mud=0;$$('input,select,textarea',form).forEach(function(c){if(valor(c)!==c.getAttribute('data-q2-orig')) mud++;var alvo=c.getAttribute('data-q2-para');if(alvo){var el=s.querySelector('[data-q2-mostra="'+alvo+'"]');if(el) el.textContent=c.value}});
    toast(mud?(s.getAttribute('data-q2-nome')||'Seção')+' salva. '+(mud===1?'1 campo alterado.':mud+' campos alterados.'):'Nada mudou nesta seção.','sucesso');
  } else {
    $$('input,select,textarea',form).forEach(function(c){var o=c.getAttribute('data-q2-orig');if(c.type==='checkbox') c.checked=o==='1';else c.value=o;var w=c.closest('.cm-entrada,.cm-selecao');if(w) w.classList.remove('is-editado','is-erro')});
  }
  leitura.hidden=false;form.hidden=true;s.classList.remove('cm-secao-editando','is-limpo');
  var bt=s.querySelector('[data-q2-editar-secao]');if(bt){bt.hidden=false;bt.focus()}
  $$('.is-bloqueado').forEach(function(o){o.classList.remove('is-bloqueado')});
}

/* célula editável (objeto-linha) */
D.addEventListener('click',function(e){var c=e.target.closest('[data-q2-celula]');if(c&&!c.classList.contains('is-editando')) abrirCelula(c)});
function abrirCelula(c){
  var v=c.getAttribute('data-valor')||c.textContent.trim();c.setAttribute('data-q2-orig-cel',v);
  c.classList.add('is-editando');c.innerHTML='<input value="'+esc(v)+'" aria-label="'+esc(c.getAttribute('data-rotulo')||'Valor')+'" data-q2-editando>';
  var i=c.querySelector('input');i.focus();i.select();
  function fim(ok){var nv=ok?i.value:c.getAttribute('data-q2-orig-cel');c.classList.remove('is-editando');c.textContent=nv;c.setAttribute('data-valor',nv);
    if(ok&&nv!==c.getAttribute('data-q2-orig-cel')){c.classList.add('is-editado');var orig=c.getAttribute('data-q2-orig-cel');
      toast((c.getAttribute('data-rotulo')||'Linha')+' gravada: '+nv+'.','sucesso','Desfazer',function(){c.textContent=orig;c.setAttribute('data-valor',orig);c.classList.remove('is-editado')});
      setTimeout(function(){c.classList.remove('is-editado')},2400)}
    c.focus()}
  i.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();fim(true);var tr=c.closest('tr');var prox=tr&&tr.nextElementSibling&&tr.nextElementSibling.children[c.cellIndex];if(prox&&prox.hasAttribute('data-q2-celula')) abrirCelula(prox)} else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fim(false)} else if(e.key==='Tab'){fim(true)}});
  i.addEventListener('blur',function(){if(c.classList.contains('is-editando')) fim(true)});
}
D.addEventListener('keydown',function(e){var c=e.target.closest&&e.target.closest('[data-q2-celula]');if(c&&!c.classList.contains('is-editando')&&(e.key==='Enter'||e.key==='F2')){e.preventDefault();abrirCelula(c)}});

/* ---------- listas J/K ---------- */
Q.lista=null;
function prepLista(l){
  var itens=function(){return $$('[data-q2-item]',l).filter(function(x){return !x.hidden&&x.offsetParent!==null})};
  var L={el:l,itens:itens,i:Math.max(0,itens().findIndex(function(x){return x.classList.contains('is-atual')||x.getAttribute('aria-selected')==='true'}))};
  L.ir=function(n,focar){var it=itens();if(!it.length) return;n=Math.max(0,Math.min(it.length-1,n));
    it.forEach(function(x,k){x.classList.toggle('is-atual',k===n);if(x.hasAttribute('aria-selected')||l.getAttribute('data-q2-lista')==='selecao') x.setAttribute('aria-selected',k===n)});
    L.i=n;var a=it[n];if(focar!==false){a.focus({preventScroll:true});a.scrollIntoView({block:'nearest'})}
    var pos=$$('[data-q2-posicao]');pos.forEach(function(p){var base=+(p.getAttribute('data-q2-base')||0),tot=p.getAttribute('data-q2-total')||it.length;p.textContent=(base+n+1)+' de '+tot});
    l.dispatchEvent(new CustomEvent('q2:atual',{bubbles:true,detail:{item:a,indice:n}}));};
  itens().forEach(function(x){if(!x.hasAttribute('tabindex')) x.tabIndex=-1;x.classList.add('cm-linha-teclado')});
  l.addEventListener('click',function(e){var it=e.target.closest('[data-q2-item]');if(!it||e.target.closest('input,button,a,label')) return;L.ir(itens().indexOf(it),true);if(l.hasAttribute('data-q2-clique-abre')) abrir(it)});
  function abrir(it){l.dispatchEvent(new CustomEvent('q2:abrir',{bubbles:true,detail:{item:it}}))}
  L.abrir=function(){var it=itens()[L.i];if(!it) return;var a=it.querySelector('a[href]:not([href="#"])');if(a&&!l.hasAttribute('data-q2-sem-link')){a.click();return}abrir(it)};
  Q.lista=L;return L;
}
Q.prepLista=prepLista;

/* ---------- atalhos globais da página ---------- */
var gPendente=0;
D.addEventListener('keydown',function(e){
  if((e.ctrlKey||e.metaKey)&&!e.altKey&&e.key.toLowerCase()==='s'){
    var f=Q.algumSujo()||null;var foco=D.activeElement&&D.activeElement.closest&&D.activeElement.closest('[data-q2-form]');
    if(!f&&foco) f=forms[foco.getAttribute('data-q2-form')];
    if(f||Object.keys(forms).length){e.preventDefault();if(f) f.salvar('continuar');else toast('Nada para salvar. Tudo já está gravado.','info')}
    return;
  }
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){var f2=Q.algumSujo();if(f2&&!digitando(e)||f2&&e.target.closest('[data-q2-form]')){e.preventDefault();f2.salvar('proximo')}return}
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  if(digitando(e)||pilha.length||menuAberto) return;
  if(!Q.atalhosLigados()) return;
  var k=e.key;
  if(k==='?'){e.preventDefault();if(window.cmAbrirAtalhos) window.cmAbrirAtalhos();return}
  if(gPendente&&Date.now()-gPendente<900){gPendente=0;var dest={i:'Início',l:'a lista de onde você veio',f:'Para você',c:'Configuração',n:'Notificações'}[k.toLowerCase()];if(dest){e.preventDefault();toast('Indo para '+dest+'.','info')}return}
  if(k==='g'||k==='G'){gPendente=Date.now();return}
  var L=Q.lista;
  if(L&&(k==='j'||k==='J'||k==='ArrowDown'&&e.target.closest('[data-q2-lista]'))){e.preventDefault();L.ir(L.i+1);return}
  if(L&&(k==='k'||k==='K'||k==='ArrowUp'&&e.target.closest('[data-q2-lista]'))){e.preventDefault();L.ir(L.i-1);return}
  if(L&&(k==='Enter'||k==='o'||k==='O')&&e.target.closest('[data-q2-item]')){e.preventDefault();L.abrir();return}
  if(L&&(k==='x'||k==='X')){var it=L.itens()[L.i];var cb=it&&it.querySelector('input[type="checkbox"]');if(cb){e.preventDefault();cb.click()}return}
  if(k==='/'){var b=D.querySelector('[data-q2-busca]');if(b){e.preventDefault();b.focus()}return}
  var at=D.querySelector('[data-q2-tecla="'+k.toLowerCase()+'"]');if(at&&at.offsetParent!==null){e.preventDefault();at.click();return}
  if(k==='e'||k==='E'){var r=e.target.closest&&e.target.closest('[data-q2-campo]');if(r){e.preventDefault();abrirLinha(r)}}
});

/* ---------- sair com alteração não salva ---------- */
var sairHtml='<div class="cm-sobreposicao" id="q2-sair" hidden data-q2-fixo><div class="cm-modal cm-modal--p" role="alertdialog" aria-modal="true" aria-labelledby="q2-sair-t" aria-describedby="q2-sair-d">'+
 '<div class="cm-modal__cabeca"><h2 class="cm-modal__titulo" id="q2-sair-t">Sair sem salvar?<span class="cm-modal__sub" id="q2-sair-d"></span></h2></div>'+
 '<div class="cm-modal__pe"><button class="cm-botao" type="button" data-q2-sair="ficar" autofocus>Continuar editando</button><button class="cm-botao cm-botao--perigo" type="button" data-q2-sair="descartar">Descartar e sair</button><button class="cm-botao cm-botao--principal" type="button" data-q2-sair="salvar">Salvar e sair</button></div></div></div>';
var destinoSair=null;
Q.pedirSaida=function(destino,rotulo){
  var f=Q.algumSujo();if(!f){if(destino) destino();return}
  if(!D.getElementById('q2-sair')){var w=D.createElement('div');w.innerHTML=sairHtml;D.body.appendChild(w.firstChild)}
  var s=f.sujos();D.getElementById('q2-sair-d').textContent=(s.length===1?'1 alteração':s.length+' alterações')+' em '+s.slice(0,3).join(', ')+(rotulo?'. Você ia para '+rotulo+'.':'.');
  destinoSair={f:f,ir:destino};Q.abrirModal('q2-sair');
};
D.addEventListener('click',function(e){
  var b=e.target.closest('[data-q2-sair]');
  if(b){var a=b.getAttribute('data-q2-sair');Q.fecharModal(b);var d=destinoSair;destinoSair=null;if(!d) return;
    if(a==='descartar'){d.f.descartar();toast('Alterações descartadas.','info');if(d.ir) d.ir()}
    else if(a==='salvar'){d.f.raiz.addEventListener('q2:salvo',function h(ev){ev.preventDefault();d.f.raiz.removeEventListener('q2:salvo',h);toast('Salvo. Saindo.','sucesso');if(d.ir) d.ir()});d.f.salvar('continuar')}
    return}
  var a2=e.target.closest('a[href]');
  if(a2&&Q.algumSujo()&&!e.target.closest('[data-q2-form]')&&!e.target.closest('.cm-sobreposicao')&&!a2.hasAttribute('data-q2-livre')&&!(e.ctrlKey||e.metaKey||e.button===1)){
    e.preventDefault();e.stopPropagation();var txt=a2.textContent.trim();Q.pedirSaida(function(){toast('Abrindo '+txt+'.','info')},txt);
  }
},true);
window.addEventListener('beforeunload',function(e){if(Q.algumSujo()){e.preventDefault();e.returnValue=''}});

/* ---------- índice da prancha ---------- */
function indice(){
  var ind=D.querySelector('.cm-doc__indice');if(!ind) return;var links=$$('a[href^="#"]',ind);
  var alvos=links.map(function(a){return D.getElementById(a.getAttribute('href').slice(1))}).filter(Boolean);
  function marcar(){var y=window.scrollY+160,at=alvos[0];alvos.forEach(function(s){if(s.offsetTop<=y) at=s});links.forEach(function(a){a.setAttribute('aria-current',at&&a.getAttribute('href')==='#'+at.id?'true':'false')})}
  window.addEventListener('scroll',marcar,{passive:true});marcar();
}

function iniciar(){
  prepararPalcos();
  $$('[data-q2-form]').forEach(Form);
  $$('[data-q2-lista]').forEach(prepLista);
  indice();
}
if(D.readyState==='loading') D.addEventListener('DOMContentLoaded',iniciar); else iniciar();
})();
