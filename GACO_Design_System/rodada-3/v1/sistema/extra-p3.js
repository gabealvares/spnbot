/* =====================================================================
   GACO V1 "Livro-Caixa" — extra-p3.js  (agente p3)
   Interatividade mínima e declarativa das telas da parte A. Sem bibliotecas.
   Atributos:
     [data-abre="id"]            abre/fecha menu ou popover #id (aria-expanded); fecha no clique fora e no Esc
     [data-modal="id"]           abre .lc-sobreposicao#id;  [data-painel="id"] abre painel lateral #id
     [data-fechar]               fecha a camada em que está (modal, painel, menu, popover)
     [data-toast="texto"]        mostra toast; com [data-toast-desfazer] traz "Desfazer"
     .lc-abas[role=tablist]      abas com aria-controls; setas trocam
     .lc-seg / [data-unico]      grupo de aria-pressed exclusivo;  [data-alterna] liga/desliga
     [data-estados-para="id"]    botões [data-estado] trocam o estado da tela #id; filhos [data-so-estado="a b"]
     [data-salvar="barraId"]     formulário com barra de salvar; [data-descartar], [data-salvar-ok] na barra
     [data-editar="secId"]       seção com lápis: [data-leitura] ↔ [data-edicao];  [data-cancelar="secId"]
     [data-ciencia]              "Li e estou ciente" vira carimbo
     [data-reagir-abre]          abre o seletor de reação vizinho; .lc-reagir button escolhe
     .lc-celula-edit             clique edita no lugar; Enter salva; Esc cancela
     .lc-kanban                  arrastar cartões entre colunas atualiza contagem e soma
     [data-sel-tabela]           marcar linhas mostra a barra de massa [data-massa]
     [data-compositor]           "/" abre respostas rápidas; Enviar acrescenta a bolha
   API: window.lcToast(texto, {desfazer:true|fn, sucesso:true}); window.lcAnunciar(texto)
   ===================================================================== */
(function(){
"use strict";
var $ = function(s,r){return (r||document).querySelector(s);};
var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var ic = function(n,c){ return window.lcIcone ? window.lcIcone(n,c||"") : '<i data-i="'+n+'"></i>'; };

/* ---------- região viva e toast ---------- */
var viva;
function anunciar(t){ if(!viva){ viva=document.createElement("div"); viva.className="lc-sr"; viva.setAttribute("aria-live","polite"); document.body.appendChild(viva);} viva.textContent=""; setTimeout(function(){viva.textContent=t;},40); }
var pilha;
function toast(txt,op){
  op=op||{};
  if(!pilha){ pilha=document.createElement("div"); pilha.className="lc-toasts"; pilha.setAttribute("role","status"); pilha.setAttribute("aria-live","polite"); document.body.appendChild(pilha); }
  var t=document.createElement("div"); t.className="lc-toast"+(op.sucesso!==false?" lc-toast--sucesso":"");
  t.innerHTML=ic(op.icone||"sucesso")+'<span class="lc-toast__txt"></span>'+(op.desfazer?'<button type="button" class="lc-toast__acao">Desfazer</button>':'')+
    '<button type="button" class="lc-toast__fechar" aria-label="Fechar aviso">'+ic("fechar")+'</button>';
  t.querySelector(".lc-toast__txt").textContent=txt;
  pilha.appendChild(t);
  var fim=function(){ if(t.parentNode) t.remove(); };
  t.querySelector(".lc-toast__fechar").onclick=fim;
  var d=t.querySelector(".lc-toast__acao"); if(d) d.onclick=function(){ if(typeof op.desfazer==="function") op.desfazer(); fim(); toast("Desfeito",{sucesso:false,icone:"desfazer"}); };
  setTimeout(fim, op.ms||5000);
}
window.lcToast=toast; window.lcAnunciar=anunciar;

/* ---------- camadas: menus, popovers, modais, painéis ---------- */
var aberto=null, origem=null;
function fecharCamada(){
  if(!aberto) return;
  if(aberto.classList.contains("lc-sobreposicao")||aberto.classList.contains("lc-painel")||aberto.hasAttribute("data-camada-fixa")) aberto.hidden=true;
  else aberto.hidden=true;
  if(origem){ origem.setAttribute("aria-expanded","false"); try{origem.focus({preventScroll:true});}catch(e){} }
  aberto=null; origem=null;
}
function abrirCamada(el,btn,foco){
  if(aberto===el){ fecharCamada(); return; }
  fecharCamada();
  el.hidden=false; aberto=el; origem=btn||null;
  if(btn && btn.hasAttribute("aria-expanded")) btn.setAttribute("aria-expanded","true");
  if(foco!==false){ var f=el.querySelector("[autofocus],input:not([type=hidden]),textarea,[role=menuitem],[role=option],button:not([data-fechar]),a"); if(f) setTimeout(function(){f.focus({preventScroll:true});},0); }
}
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-abre],[data-modal],[data-painel]");
  if(b){ var id=b.getAttribute("data-abre")||b.getAttribute("data-modal")||b.getAttribute("data-painel"); var el=document.getElementById(id); if(el){ e.preventDefault(); abrirCamada(el,b,!b.hasAttribute("data-abre")||el.getAttribute("role")==="menu"); } return; }
  if(e.target.closest("[data-fechar]")){ fecharCamada(); return; }
  if(aberto && !aberto.contains(e.target)){
    if(aberto.classList.contains("lc-sobreposicao")){ if(e.target===aberto) fecharCamada(); }
    else if(!aberto.classList.contains("lc-painel")) fecharCamada();
  }
  if(aberto && e.target.closest('[role="menuitem"],[role="menuitemradio"]') && aberto.contains(e.target) && !e.target.closest("[data-manter]")){ setTimeout(fecharCamada,0); }
});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape" && aberto){ e.preventDefault(); fecharCamada(); }
  if(aberto && aberto.getAttribute("role")==="menu" && (e.key==="ArrowDown"||e.key==="ArrowUp")){
    var it=$$('[role^="menuitem"]',aberto).filter(function(x){return !x.hidden;}), i=it.indexOf(document.activeElement);
    e.preventDefault(); i = e.key==="ArrowDown" ? (i+1)%it.length : (i-1+it.length)%it.length; it[i].focus();
  }
});

/* ---------- toasts declarativos ---------- */
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-toast]"); if(!b) return;
  toast(b.getAttribute("data-toast"),{desfazer:b.hasAttribute("data-toast-desfazer"),sucesso:!b.hasAttribute("data-toast-neutro")});
});

/* ---------- abas ---------- */
function ligarAbas(raiz){
  $$('.lc-abas[role="tablist"]',raiz).forEach(function(l){
    if(l.__ok) return; l.__ok=1;
    var abas=$$('[role="tab"]',l);
    function sel(a,foco){ abas.forEach(function(x){ var s=x===a; x.setAttribute("aria-selected",s); x.tabIndex=s?0:-1; var p=x.getAttribute("aria-controls"); if(p){ var el=document.getElementById(p); if(el) el.hidden=!s; } }); if(foco) a.focus(); }
    abas.forEach(function(a){ a.addEventListener("click",function(){sel(a);}); a.addEventListener("keydown",function(e){ var i=abas.indexOf(a); if(e.key==="ArrowRight"){e.preventDefault();sel(abas[(i+1)%abas.length],1);} if(e.key==="ArrowLeft"){e.preventDefault();sel(abas[(i-1+abas.length)%abas.length],1);} }); });
    var at=abas.filter(function(a){return a.getAttribute("aria-selected")==="true";})[0]||abas[0]; if(at) sel(at);
  });
}

/* ---------- grupos pressionáveis ---------- */
document.addEventListener("click",function(e){
  var b=e.target.closest(".lc-seg>button,[data-unico]>button,.lc-atend__filas>button");
  if(b && !b.disabled){ $$(":scope>button",b.parentNode).forEach(function(x){x.setAttribute("aria-pressed",x===b);}); }
  var t=e.target.closest("[data-alterna]");
  if(t){ var on=t.getAttribute("aria-pressed")!=="true"; t.setAttribute("aria-pressed",on); var txt=t.getAttribute(on?"data-alterna-on":"data-alterna-off"); if(txt){ var s=t.querySelector("[data-rotulo]")||t; s.textContent=txt; } }
});

/* ---------- estados da tela (documentação) ---------- */
function aplicarEstado(tela,est){
  tela.setAttribute("data-estado",est);
  $$("[data-so-estado]",tela).forEach(function(el){ el.hidden = (" "+el.getAttribute("data-so-estado")+" ").indexOf(" "+est+" ")<0; });
}
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-estados-para] [data-estado]"); if(!b) return;
  var g=b.closest("[data-estados-para]"), tela=document.getElementById(g.getAttribute("data-estados-para"));
  if(tela){ aplicarEstado(tela,b.getAttribute("data-estado")); anunciar("Mostrando o estado: "+b.textContent.trim()); }
});

/* ---------- barra de salvar ---------- */
function ligarSalvar(raiz){
  $$("[data-salvar]",raiz).forEach(function(f){
    if(f.__ok) return; f.__ok=1;
    var barra=document.getElementById(f.getAttribute("data-salvar")); if(!barra) return;
    var campos=$$("input,select,textarea",f);
    campos.forEach(function(c){ c.__ini = c.type==="checkbox"||c.type==="radio" ? c.checked : c.value; });
    function conta(){
      var n=campos.filter(function(c){ return (c.type==="checkbox"||c.type==="radio" ? c.checked : c.value)!==c.__ini; });
      barra.hidden = n.length===0;
      var m=barra.querySelector("[data-salvar-msg]");
      if(m && n.length){ var nomes=n.map(function(c){ var l=c.id && document.querySelector('label[for="'+c.id+'"]'); return l? l.textContent.replace("*","").trim().toLowerCase() : (c.getAttribute("aria-label")||"campo").toLowerCase(); });
        m.innerHTML='<b>'+n.length+(n.length>1?' alterações não salvas':' alteração não salva')+'</b> '+(f.getAttribute("data-salvar-onde")||"")+': '+nomes.slice(0,3).join(", ")+(nomes.length>3?" e mais "+(nomes.length-3):""); }
      if(n.length===1 && !barra.__avisou){ barra.__avisou=1; anunciar("Há alterações não salvas"); }
      if(!n.length) barra.__avisou=0;
    }
    f.addEventListener("input",conta); f.addEventListener("change",conta);
    barra.addEventListener("click",function(e){
      if(e.target.closest("[data-descartar]")){ campos.forEach(function(c){ if(c.type==="checkbox"||c.type==="radio") c.checked=c.__ini; else c.value=c.__ini; }); conta(); toast("Alterações descartadas",{sucesso:false,icone:"desfazer"}); }
      var ok=e.target.closest("[data-salvar-ok]");
      if(ok){ campos.forEach(function(c){ c.__ini = c.type==="checkbox"||c.type==="radio" ? c.checked : c.value; }); conta(); toast(ok.getAttribute("data-salvar-ok")||"Alterações salvas",{desfazer:true}); }
    });
    conta();
  });
}

/* ---------- seção com lápis ---------- */
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-editar],[data-cancelar],[data-concluir]"); if(!b) return;
  var id=b.getAttribute("data-editar")||b.getAttribute("data-cancelar")||b.getAttribute("data-concluir"), s=document.getElementById(id); if(!s) return;
  var ed=b.hasAttribute("data-editar");
  s.classList.toggle("lc-secao-reg--editando",ed);
  $$("[data-leitura]",s).forEach(function(x){x.hidden=ed;}); $$("[data-edicao]",s).forEach(function(x){x.hidden=!ed;});
  if(ed){ var c=s.querySelector("[data-edicao] input,[data-edicao] select,[data-edicao] textarea"); if(c) c.focus(); anunciar("Seção em edição"); }
  if(b.hasAttribute("data-concluir")) toast("Seção salva",{desfazer:true});
});

/* ---------- ciência ---------- */
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-ciencia]"); if(!b) return;
  var d=new Date(), hh=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
  var c=document.createElement("span"); c.className="lc-carimbo lc-carimbo--ciente"; c.innerHTML='Ciente<small>Letícia Araújo, 01/10 às '+hh+'</small>';
  b.replaceWith(c);
  var k=c.closest(".lc-ciencia"); var n=k && k.querySelector("[data-ciencia-conta]"); if(n){ var a=+n.getAttribute("data-ciencia-conta")+1, t=n.getAttribute("data-total"); n.textContent=a+" de "+t+" pessoas já deram ciência"; }
  anunciar("Ciência registrada em 01/10 às "+hh);
});

/* ---------- reações ---------- */
document.addEventListener("click",function(e){
  var a=e.target.closest("[data-reagir-abre]");
  if(a){ var r=a.parentNode.querySelector(".lc-reagir"); if(r){ e.stopPropagation(); abrirCamada(r,a,true);} return; }
  var x=e.target.closest(".lc-reagir button"); if(!x) return;
  var post=x.closest(".lc-post"), alvo=post && post.querySelector("[data-reagir-abre]");
  if(alvo){ var nome=x.textContent.trim(); alvo.setAttribute("aria-pressed","true"); alvo.innerHTML=ic(x.getAttribute("data-i-nome")||nome.toLowerCase())+nome; }
  var res=post && post.querySelector("[data-reacoes-txt]"); if(res && !res.__eu){ res.__eu=1; res.textContent="Você, "+res.textContent; }
  fecharCamada(); anunciar("Reação registrada: "+x.textContent.trim());
});

/* ---------- célula editável ---------- */
document.addEventListener("click",function(e){
  var c=e.target.closest(".lc-celula-edit"); if(!c || c.classList.contains("lc-celula-edit--editando")) return;
  var v=c.textContent.trim(), inp=document.createElement("input"); inp.className="lc-entrada"+(c.closest(".lc-num")?" lc-entrada--num":""); inp.value=v; inp.setAttribute("aria-label",c.getAttribute("aria-label")||"Editar valor");
  c.__v=v; c.classList.add("lc-celula-edit--editando"); c.innerHTML=""; c.appendChild(inp); inp.focus(); inp.select();
  function fim(salva){ if(!c.classList.contains("lc-celula-edit--editando")) return; c.classList.remove("lc-celula-edit--editando"); var nv=salva?inp.value:c.__v; c.textContent=nv; if(salva && nv!==c.__v){ c.classList.add("lc-celula-edit--salvo"); setTimeout(function(){c.classList.remove("lc-celula-edit--salvo");},1800); toast("Salvo: "+nv,{desfazer:function(){c.textContent=c.__v;}}); } c.focus(); }
  inp.addEventListener("keydown",function(k){ if(k.key==="Enter"){k.preventDefault();fim(true);} if(k.key==="Escape"){k.preventDefault();k.stopPropagation();fim(false);} });
  inp.addEventListener("blur",function(){fim(true);});
});

/* ---------- quadro: arrastar e soltar ---------- */
function moeda(n){ return "R$ "+n.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}); }
function somar(col){
  var cs=$$(".lc-cartao-k",col), s=0; cs.forEach(function(c){ s+= +(c.getAttribute("data-valor")||0); });
  var n=col.querySelector(".lc-kanban__cab .lc-contagem"); if(n) n.textContent=cs.length;
  var so=col.querySelector("[data-soma]"); if(so) so.textContent=moeda(s)+(so.getAttribute("data-soma")?" "+so.getAttribute("data-soma"):"");
}
function ligarQuadro(raiz){
  $$(".lc-kanban",raiz).forEach(function(k){
    if(k.__ok) return; k.__ok=1; var arr=null;
    k.addEventListener("dragstart",function(e){ arr=e.target.closest(".lc-cartao-k"); if(arr){ arr.setAttribute("aria-grabbed","true"); e.dataTransfer.effectAllowed="move"; try{e.dataTransfer.setData("text/plain","x");}catch(_){} } });
    k.addEventListener("dragend",function(){ if(arr) arr.removeAttribute("aria-grabbed"); $$(".lc-kanban__col",k).forEach(function(c){c.removeAttribute("data-solta");}); });
    k.addEventListener("dragover",function(e){ var c=e.target.closest(".lc-kanban__col"); if(c&&arr){ e.preventDefault(); $$(".lc-kanban__col",k).forEach(function(x){x.setAttribute("data-solta",x===c);}); } });
    k.addEventListener("drop",function(e){ var c=e.target.closest(".lc-kanban__col"); if(!c||!arr) return; e.preventDefault(); var de=arr.closest(".lc-kanban__col"); c.querySelector(".lc-kanban__lista").prepend(arr); somar(c); somar(de);
      var nome=(c.querySelector(".lc-kanban__cab h3")||{}).firstChild; toast((arr.querySelector(".lc-cartao-k__titulo")||arr).textContent.trim()+" foi para "+(nome?nome.textContent.trim():"a coluna"),{desfazer:function(){de.querySelector(".lc-kanban__lista").prepend(arr);somar(c);somar(de);}}); });
    /* teclado: espaço pega e solta; setas esquerda e direita levam para a coluna vizinha */
    k.addEventListener("keydown",function(e){
      var cartao=e.target.closest(".lc-cartao-k"); if(!cartao) return;
      var preso=cartao.getAttribute("aria-grabbed")==="true", cols=$$(".lc-kanban__col",k), col=cartao.closest(".lc-kanban__col"), i=cols.indexOf(col);
      if(e.key===" "){ e.preventDefault(); cartao.setAttribute("aria-grabbed",preso?"false":"true"); anunciar(preso?"Solto em "+col.querySelector("h3").firstChild.textContent.trim():"Pegou "+(cartao.querySelector(".lc-cartao-k__titulo")||cartao).textContent.trim()+". Use as setas para mudar de coluna"); return; }
      if(preso && (e.key==="ArrowRight"||e.key==="ArrowLeft")){ e.preventDefault(); var j=i+(e.key==="ArrowRight"?1:-1); if(j<0||j>=cols.length) return; cols[j].querySelector(".lc-kanban__lista").prepend(cartao); somar(cols[j]); somar(col); cartao.focus(); anunciar("Coluna "+cols[j].querySelector("h3").firstChild.textContent.trim()); }
    });
  });
}

/* ---------- seleção em tabela → barra de massa ---------- */
function ligarSelecao(raiz){
  $$("[data-sel-tabela]",raiz).forEach(function(t){
    if(t.__ok) return; t.__ok=1;
    var massa=document.getElementById(t.getAttribute("data-sel-tabela")), filtros=massa && document.getElementById(massa.getAttribute("data-troca"));
    function at(){ var m=$$("tbody input[type=checkbox]",t), s=m.filter(function(x){return x.checked;});
      m.forEach(function(x){ var tr=x.closest("tr"); tr.setAttribute("aria-selected",x.checked); });
      if(massa){ massa.hidden=!s.length; if(filtros) filtros.hidden=!!s.length; var n=massa.querySelector("[data-massa-n]"); if(n) n.textContent=s.length+(s.length>1?" selecionados":" selecionado"); }
      var tudo=t.querySelector("thead input[type=checkbox]"); if(tudo){ tudo.checked=s.length===m.length; tudo.indeterminate=s.length>0&&s.length<m.length; } }
    t.addEventListener("change",function(e){ if(e.target.closest("thead")){ $$("tbody input[type=checkbox]",t).forEach(function(x){x.checked=e.target.checked;}); } at(); });
    if(massa) massa.addEventListener("click",function(e){ if(e.target.closest("[data-limpar-sel]")){ $$("input[type=checkbox]",t).forEach(function(x){x.checked=false;}); at(); } });
    at();
  });
}

/* ---------- atendimento: lista, ficha, compositor ---------- */
document.addEventListener("click",function(e){
  var it=e.target.closest(".lc-conv-item");
  if(it){ $$(".lc-conv-item",it.closest("ul")||document).forEach(function(x){x.setAttribute("aria-current",x===it);}); var at=it.closest(".lc-atend"); if(at) at.setAttribute("data-movel","conversa"); var nl=it.querySelector(".lc-contador"); if(nl) nl.remove(); }
  var v=e.target.closest("[data-voltar-lista]"); if(v){ var a=v.closest(".lc-atend"); if(a) a.removeAttribute("data-movel"); }
  var f=e.target.closest("[data-ficha-alterna]");
  if(f){ var at2=f.closest(".lc-atend")||$(".lc-atend"); var ab=at2.getAttribute("data-ficha")==="aberta"; at2.setAttribute("data-ficha",ab?"fechada":"aberta"); $$("[data-ficha-alterna]",at2).forEach(function(x){ if(x.hasAttribute("aria-expanded")) x.setAttribute("aria-expanded",!ab); }); anunciar(ab?"Dados do chamado fechados":"Dados do chamado abertos"); if(!ab){ var h=at2.querySelector(".lc-atend__ficha h2"); if(h){h.tabIndex=-1;h.focus();} } }
});
function ligarCompositor(raiz){
  $$("[data-compositor]",raiz).forEach(function(cp){
    if(cp.__ok) return; cp.__ok=1;
    var ta=cp.querySelector("textarea"), rr=cp.querySelector(".lc-rr"), conv=document.getElementById(cp.getAttribute("data-compositor"));
    var modos=$$(".lc-compositor__modo button",cp);
    modos.forEach(function(m){ m.addEventListener("click",function(){ modos.forEach(function(x){x.setAttribute("aria-pressed",x===m);}); var n=m.getAttribute("data-modo")==="nota"; cp.classList.toggle("lc-compositor--nota",n); ta.placeholder = n ? "Nota interna: só a equipe vê. Use @ para chamar alguém." : "Escreva uma mensagem. Digite / para respostas rápidas."; ta.focus(); }); });
    var sel=0;
    function opcoes(){ return rr? $$(".lc-opcao",rr).filter(function(o){return !o.hidden;}) : []; }
    function filtra(){ if(!rr) return; var m=ta.value.match(/(^|\s)\/(\S*)$/); if(!m){ rr.hidden=true; ta.setAttribute("aria-expanded","false"); return; }
      var q=m[2].toLowerCase(); $$(".lc-opcao",rr).forEach(function(o){ o.hidden = o.getAttribute("data-atalho").indexOf(q)!==0; });
      var os=opcoes(); rr.hidden=!os.length; ta.setAttribute("aria-expanded",!!os.length); sel=0; marca(); var c=rr.querySelector("[data-rr-conta]"); if(c) c.textContent=os.length+(os.length===1?" resposta":" respostas")+' começam com "/'+q+'"'; }
    function marca(){ opcoes().forEach(function(o,i){ o.setAttribute("data-realce",i===sel); if(i===sel) ta.setAttribute("aria-activedescendant",o.id); }); }
    function insere(o){ ta.value=ta.value.replace(/(^|\s)\/\S*$/,"$1")+o.getAttribute("data-texto"); rr.hidden=true; ta.setAttribute("aria-expanded","false"); ta.focus(); anunciar("Resposta rápida inserida"); }
    if(ta){
      ta.addEventListener("input",filtra);
      ta.addEventListener("keydown",function(e){
        if(rr && !rr.hidden){ var os=opcoes(); if(e.key==="ArrowDown"){e.preventDefault();sel=(sel+1)%os.length;marca();} if(e.key==="ArrowUp"){e.preventDefault();sel=(sel-1+os.length)%os.length;marca();} if(e.key==="Enter"){e.preventDefault();insere(os[sel]);return;} if(e.key==="Escape"){e.preventDefault();e.stopPropagation();rr.hidden=true;return;} }
        if(e.key==="Enter" && !e.shiftKey && !(rr&&!rr.hidden)){ e.preventDefault(); enviar(); }
      });
    }
    if(rr) rr.addEventListener("click",function(e){ var o=e.target.closest(".lc-opcao"); if(o) insere(o); });
    function enviar(acao){
      if(!ta || !ta.value.trim() || !conv) return;
      var nota=cp.classList.contains("lc-compositor--nota"), b=document.createElement("div"), d=new Date(), h=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
      b.className="lc-bolha lc-bolha--primeira "+(nota?"lc-bolha--nota":"lc-bolha--enviada");
      b.innerHTML=(nota?'<span class="lc-bolha__nota-rotulo">'+ic("nota-interna")+'Nota interna. Só a equipe vê.</span>':'')+'<span class="lc-txt"></span><span class="lc-bolha__meta">'+h+(nota?'':'<span class="lc-tique" aria-label="Enviando">'+ic("enviando")+'</span>')+'</span>';
      b.querySelector(".lc-txt").textContent=ta.value.trim(); conv.appendChild(b); conv.scrollTop=conv.scrollHeight; ta.value="";
      if(!nota) setTimeout(function(){ var t=b.querySelector(".lc-tique"); if(t){ t.className="lc-tique lc-tique--lida"; t.setAttribute("aria-label","Lida"); t.innerHTML=ic("lida"); } },1400);
      anunciar(nota?"Nota interna adicionada":"Mensagem enviada");
      if(acao) toast(acao,{desfazer:true});
    }
    $$("[data-enviar]",cp).forEach(function(b){ b.addEventListener("click",function(){ enviar(b.getAttribute("data-enviar")||""); }); });
  });
}

/* ---------- paginador "14 de 63" ---------- */
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-pag]"); if(!b) return;
  var p=b.closest(".lc-paginador"), n=p && p.querySelector("b"); if(!n) return;
  var tot=+p.getAttribute("data-total"), v=+n.textContent+(b.getAttribute("data-pag")==="prox"?1:-1); if(v<1||v>tot) return; n.textContent=v;
  var nomes=(p.getAttribute("data-nomes")||"").split("|"); toast("Abrindo "+v+" de "+tot+(nomes[v-1]?": "+nomes[v-1]:""),{sucesso:false,icone:"seta-direita"});
});

function iniciar(raiz){ ligarAbas(raiz); ligarSalvar(raiz); ligarQuadro(raiz); ligarSelecao(raiz); ligarCompositor(raiz);
  $$("[data-estado]",raiz).forEach(function(t){ if(t.id && !t.closest("[data-estados-para]")) aplicarEstado(t,t.getAttribute("data-estado")); }); }
window.lcP3Iniciar=iniciar;
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){iniciar(document);}); else iniciar(document);
})();
