/* =====================================================================
   GACO V1 "Livro-Caixa" — extra-p2.js
   Agente p2 (padrões de tela e fluxos). Comportamento comum das telas de exemplo:
   toast com Desfazer, modal sem empilhamento, menu, painel lateral, barra de salvar que
   aparece com alteração, "Salvar ▾" com escolha lembrada, edição por campo e por seção,
   sair com alteração (3 saídas), Ctrl+S, J/K, lista que lembra filtro/página/rolagem/linha,
   e os dados de exemplo (63 contratos em reajuste). Sem biblioteca externa.
   API: window.LCP2 = { CONTRATOS, PESSOAS, moeda, data, toast, modal, painel, menu, anunciar,
        Edicao, campos, secoes, guardarSaida, estadoLista, atalho, conjunto }
   Para o coordenador: vira sistema/fluxos.js na fusão.
   ===================================================================== */
(function(){
"use strict";
var P = window.LCP2 = {};
var ic = function(n,c,r){ return window.lcIcone ? window.lcIcone(n,c||"",r) : '<i data-i="'+n+'"></i>'; };
var esc = P.esc = function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});};
var $ = P.$ = function(s,r){return (r||document).querySelector(s);};
var $$ = P.$$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var guarda = P.guarda = {get:function(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(_){return d;}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(_){}},
  sget:function(k,d){try{var v=sessionStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(_){return d;}},sset:function(k,v){try{sessionStorage.setItem(k,JSON.stringify(v));}catch(_){}}};

/* ------------------------------ formatos ------------------------------ */
P.moeda = function(v){ var s=Math.abs(v).toFixed(2).split("."), i=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,"."); return (v<0?"−":"")+"R$ "+i+","+s[1]; };
P.num = function(v,d){ var s=Number(v).toFixed(d||0).split("."); return s[0].replace(/\B(?=(\d{3})+(?!\d))/g,".")+(s[1]?","+s[1]:""); };
P.hora = function(d){ d=d||new Date(); return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2); };
P.horaSeg = function(d){ d=d||new Date(); return P.hora(d)+":"+("0"+d.getSeconds()).slice(-2); };
P.lerMoeda = function(s){ s=String(s).replace(/[^\d,.-]/g,"").replace(/\./g,"").replace(",","."); return parseFloat(s); };

/* ------------------------------ dados de exemplo ------------------------------ */
var PESSOAS = P.PESSOAS = {
  LA:{nome:"Letícia Araújo",ini:"LA",cor:"lc-av--c3",cargo:"Coordenadora de Relacionamento"},
  RL:{nome:"Rafael Lima",ini:"RL",cor:"lc-av--c7",cargo:"Analista de CS"},
  CM:{nome:"Carla Mendes",ini:"CM",cor:"lc-av--c4",cargo:"Analista de contratos"},
  BT:{nome:"Bruno Tavares",ini:"BT",cor:"lc-av--c5",cargo:"Analista de CS"},
  JS:{nome:"Juliana Souza",ini:"JS",cor:"lc-av--c2",cargo:"Jurídico"},
  MC:{nome:"Marina Costa",ini:"MC",cor:"lc-av--c4",cargo:"Síndica, Cond. Parque das Águas"},
  SP:{nome:"Suporte da plataforma",ini:"G",cor:"lc-av--c8",cargo:"Equipe GACO"}
};
var NOMES = ["Edifício Atlântico","Cond. Bosque dos Ipês","Residencial Morada do Sol","Edifício Torre de Pedra","Cond. Recanto das Garças","Residencial Portal da Serra",
  "Edifício Mirante do Vale","Cond. Chácara Flora","Residencial Villaggio Toscana","Edifício Maison Lumière","Cond. Alto da Boa Vista","Residencial Ilhas do Sul",
  "Edifício Saint Germain","Cond. Parque das Águas","Residencial Jardim Botânico","Cond. Quinta das Laranjeiras","Residencial Brisa do Mar","Edifício Monte Carlo",
  "Cond. Terras de São José","Residencial Pátio das Flores","Edifício Palazzo Verdi","Cond. Lago Azul","Residencial Ventura","Edifício Praia Grande",
  "Cond. Jardim Europa","Residencial Nova Higienópolis","Edifício Tom Jobim","Cond. Sítio das Hortênsias","Residencial Parque Ecológico","Edifício Barão de Mauá",
  "Cond. Reserva da Mata","Residencial Aldeia da Serra","Edifício Cidade Jardim","Cond. Vale Verde","Residencial Spazio Felicità","Edifício Ana Rosa",
  "Cond. Fazenda Santa Cândida","Residencial Mar Azul","Edifício Conselheiro Brotero","Cond. Águas Claras","Residencial Granja Julieta","Edifício Itapuã",
  "Cond. Horto Florestal","Residencial Paineiras","Edifício Piazza di Roma","Cond. Vila Serena","Residencial Belvedere","Edifício Vista Alegre",
  "Cond. Santa Teresa","Residencial Pinheiros Park","Edifício Liberdade","Cond. Riviera","Residencial Ipiranga","Edifício Bela Cintra",
  "Cond. Arvoredo","Residencial Terraço Paulista","Edifício Dona Veridiana","Cond. Morumbi Sul","Residencial Campo Belo","Edifício Rebouças",
  "Edifício Solar das Palmeiras","Residencial Jardim das Acácias","Cond. Primavera"];
var SIND = ["Antônio Ribeiro","Cláudia Nunes","Jorge Almeida","Sandra Okada","Paulo Henrique Dias","Regina Lopes","Marcos Vieira","Helena Prado","Fábio Siqueira","Teresa Gomes","Ricardo Barros","Luciana Freitas","Wagner Campos"];
var CID = ["São Paulo","São Paulo","Campinas","Santos","São Paulo","Guarulhos","Santo André","São Paulo","Osasco","Jundiaí"];
var RESP = ["LA","RL","CM","BT"];
var EST = [["Aguardando cálculo","neutro"],["Aguardando síndico","aviso"],["Aditivo enviado","andamento"],["Aguardando cálculo","neutro"],["Atrasado","perigo"],["Aditivo enviado","andamento"]];
P.CONTRATOS = NOMES.map(function(n,i){
  var r = function(k){ return Math.abs(Math.sin((i+1)*k))%1; };
  var unid = 24+Math.round(r(7.13)*216), base = Math.round((900+unid*24+r(3.7)*900)/10)*10;
  var igpm = i%3!==2, pct = igpm?5.48:4.42, dia = 1+Math.floor(i*30/63);
  var c = {i:i, id:"2026-0"+(399+i), nome:n, sindico:SIND[i%SIND.length], unidades:unid, cidade:CID[i%CID.length],
    valor:base, indice:igpm?"IGP-M":"IPCA", pct:pct, novo:Math.round(base*(1+pct/100)*100)/100,
    reajuste:("0"+dia).slice(-2)+"/10/2026", resp:RESP[i%4], estado:EST[i%EST.length]};
  if(n==="Cond. Parque das Águas"){ c.sindico="Marina Costa"; c.unidades=120; c.cidade="São Paulo"; c.valor=4380; c.novo=4620; c.indice="IGP-M"; c.pct=5.48; c.resp="LA"; c.estado=["Aguardando síndico","aviso"]; c.reajuste="14/10/2026"; }
  if(n==="Residencial Jardim Botânico"){ c.sindico="Antônio Ribeiro"; c.unidades=86; c.cidade="Campinas"; c.valor=3020; c.novo=3185.50; c.resp="RL"; c.reajuste="14/10/2026"; }
  return c;
});
P.contrato = function(id){ return P.CONTRATOS.filter(function(c){return c.id===id;})[0] || P.CONTRATOS[13]; };

/* ------------------------------ anúncio para leitor de tela ------------------------------ */
var vivo;
P.anunciar = function(txt){ if(!vivo){ vivo=document.createElement("div"); vivo.className="lc-sr"; vivo.setAttribute("aria-live","polite"); vivo.setAttribute("role","status"); document.body.appendChild(vivo); }
  vivo.textContent=""; setTimeout(function(){ vivo.textContent=txt; },40); };

/* ------------------------------ toast ------------------------------
   Regra: um por vez (o novo substitui o anterior); 6 s; com Desfazer quando a ação volta;
   pausa no hover e no foco; erro nunca vai em toast (vai em alerta no lugar). */
var pilha;
P.toast = function(txt,o){
  o=o||{};
  if(!pilha){ pilha=document.createElement("div"); pilha.className="lc-toasts"; pilha.setAttribute("role","status"); pilha.setAttribute("aria-live","polite"); document.body.appendChild(pilha); }
  pilha.innerHTML="";
  var ms=o.ms||6000, t=document.createElement("div"); t.className="lc-toast"+(o.tipo==="sucesso"?" lc-toast--sucesso":"");
  t.style.setProperty("--_ms",ms+"ms");
  t.innerHTML=(o.ic!==false?ic(o.ic||(o.tipo==="sucesso"?"sucesso":"info")):"")+'<span class="lc-toast__txt">'+txt+'</span>'+
    (o.acao?'<button type="button" class="lc-toast__acao">'+esc(o.acao)+'</button>':'')+
    '<button type="button" class="lc-toast__fechar" aria-label="Fechar aviso">'+ic("fechar","lc-ic--16")+'</button><span class="lc-toast__tempo" aria-hidden="true"></span>';
  pilha.appendChild(t);
  var vivoT, rest=ms, ini=Date.now(), parado=false;
  function some(){ if(t.parentNode) t.remove(); }
  function arma(){ clearTimeout(vivoT); ini=Date.now(); vivoT=setTimeout(some,rest); }
  t.addEventListener("mouseenter",function(){ parado=true; clearTimeout(vivoT); rest-=Date.now()-ini; });
  t.addEventListener("mouseleave",function(){ if(parado){ parado=false; arma(); } });
  t.addEventListener("focusin",function(){ clearTimeout(vivoT); });
  t.querySelector(".lc-toast__fechar").addEventListener("click",some);
  if(o.acao) t.querySelector(".lc-toast__acao").addEventListener("click",function(){ some(); if(o.aoAcao) o.aoAcao(); });
  arma();
  return {el:t,fechar:some};
};

/* ------------------------------ camadas: modal e painel ------------------------------
   Regra: nunca há modal sobre modal. Se já houver um aberto, o novo troca o conteúdo do atual
   (com "Voltar" quando a origem pedir). O foco fica preso dentro e volta para quem abriu. */
var aberto = null;
function focaveis(el){ return $$('a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',el).filter(function(x){return x.offsetParent!==null || x===document.activeElement;}); }
function prender(e,el){ if(e.key!=="Tab") return; var f=focaveis(el); if(!f.length) return; var a=f[0], z=f[f.length-1];
  if(e.shiftKey && document.activeElement===a){ e.preventDefault(); z.focus(); } else if(!e.shiftKey && document.activeElement===z){ e.preventDefault(); a.focus(); } }
P.modal = function(o){
  o=o||{};
  var origem = document.activeElement;
  if(aberto && aberto.tipo==="modal"){ origem = aberto.origem; aberto.remover(true); }
  var id="lc-m-"+Math.random().toString(36).slice(2,7);
  var fundo=document.createElement("div"); fundo.className="lc-sobreposicao";
  fundo.innerHTML='<div class="lc-modal'+(o.largo?' lc-modal--largo':'')+(o.perigo?' lc-modal--perigo':'')+'" role="'+(o.perigo?'alertdialog':'dialog')+'" aria-modal="true" aria-labelledby="'+id+'-t"'+(o.desc?' aria-describedby="'+id+'-d"':'')+'>'+
    '<div class="lc-modal__cab"><div style="flex:1;min-width:0"><h2 id="'+id+'-t">'+o.titulo+'</h2>'+(o.desc?'<p id="'+id+'-d">'+o.desc+'</p>':'')+'</div>'+
    (o.semFechar?'':'<button type="button" class="lc-btn lc-btn--icone lc-btn--discreto" data-m-fechar aria-label="Fechar">'+ic("fechar")+'</button>')+'</div>'+
    (o.corpo!=null?'<div class="lc-modal__corpo">'+o.corpo+'</div>':'')+(o.pe?'<div class="lc-modal__pe">'+o.pe+'</div>':'')+'</div>';
  document.body.appendChild(fundo);
  var m=fundo.firstChild;
  var api={tipo:"modal",el:m,fundo:fundo,origem:origem,
    remover:function(semFoco){ document.removeEventListener("keydown",tecla,true); fundo.remove(); if(aberto===api) aberto=null; if(!semFoco && origem && origem.focus && document.contains(origem)) origem.focus(); },
    fechar:function(){ if(o.aoFechar && o.aoFechar()===false) return; api.remover(); }};
  function tecla(e){ if(e.key==="Escape" && !o.semEsc){ e.preventDefault(); e.stopPropagation(); api.fechar(); } prender(e,m); }
  document.addEventListener("keydown",tecla,true);
  fundo.addEventListener("click",function(e){ if(e.target===fundo && o.fecharFora) api.fechar(); if(e.target.closest("[data-m-fechar]")) api.fechar(); });
  aberto=api;
  if(window.lcIcones) window.lcIcones(m);
  if(o.aoAbrir) o.aoAbrir(m,api);
  setTimeout(function(){ var f=m.querySelector("[data-foco]")||m.querySelector(".lc-modal__corpo input,.lc-modal__corpo select,.lc-modal__corpo textarea")||m.querySelector(".lc-modal__pe .lc-btn--principal,.lc-modal__pe button")||m; if(f===m) m.setAttribute("tabindex","-1"); f.focus(); },20);
  return api;
};
P.painel = function(o){
  o=o||{};
  var origem=document.activeElement;
  if(aberto) aberto.remover(true);
  var id="lc-p-"+Math.random().toString(36).slice(2,7);
  var fundo=document.createElement("div"); fundo.className="lc-gaveta-fundo";
  var p=document.createElement("aside"); p.className="lc-painel"; p.setAttribute("role","dialog"); p.setAttribute("aria-modal","true"); p.setAttribute("aria-labelledby",id);
  p.innerHTML='<div class="lc-painel__cab">'+(o.ic?ic(o.ic):'')+'<h2 id="'+id+'">'+o.titulo+'</h2>'+(o.acoesCab||'')+'<button type="button" class="lc-btn lc-btn--icone lc-btn--discreto" data-m-fechar aria-label="Fechar '+esc(o.rotulo||"painel")+'">'+ic("fechar")+'</button></div>'+
    (o.antes||'')+'<div class="lc-painel__corpo">'+(o.corpo||'')+'</div>'+(o.pe?'<div class="lc-painel__pe">'+o.pe+'</div>':'');
  document.body.appendChild(fundo); document.body.appendChild(p);
  var api={tipo:"painel",el:p,origem:origem,remover:function(semFoco){ document.removeEventListener("keydown",tecla,true); fundo.remove(); p.remove(); if(aberto===api) aberto=null; if(!semFoco && origem && origem.focus) origem.focus(); },fechar:function(){api.remover();}};
  function tecla(e){ if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); api.fechar(); } prender(e,p); }
  document.addEventListener("keydown",tecla,true);
  fundo.addEventListener("click",function(){api.fechar();});
  p.addEventListener("click",function(e){ if(e.target.closest("[data-m-fechar]")) api.fechar(); });
  aberto=api; if(window.lcIcones) window.lcIcones(p); if(o.aoAbrir) o.aoAbrir(p,api);
  setTimeout(function(){ (p.querySelector("[data-foco]")||p.querySelector(".lc-painel__cab h2")).setAttribute("tabindex","-1"); (p.querySelector("[data-foco]")||p.querySelector(".lc-painel__cab h2")).focus(); },20);
  return api;
};
P.camadaAberta = function(){ return aberto; };

/* ------------------------------ menu suspenso ------------------------------
   itens: {t, sub, ic, tecla, perigo, sep, titulo, marcado(bool), desab, acao(fn)}  */
var menuAberto=null;
P.fecharMenu = function(focar){ if(!menuAberto) return; var m=menuAberto; menuAberto=null; m.el.remove(); m.btn.setAttribute("aria-expanded","false"); if(focar!==false) m.btn.focus(); };
P.menu = function(btn,itens,o){
  o=o||{};
  if(menuAberto && menuAberto.btn===btn){ P.fecharMenu(); return; }
  P.fecharMenu(false);
  var wrap=btn.closest("[data-menu-ancora]")||btn.parentNode; if(getComputedStyle(wrap).position==="static") wrap.style.position="relative";
  var el=document.createElement("div"); el.className="lc-menu"+(o.classe?" "+o.classe:""); el.setAttribute("role","menu");
  if(o.rotulo) el.setAttribute("aria-label",o.rotulo);
  var h="";
  itens.forEach(function(it,i){
    if(it.sep){ h+='<div class="lc-menu__sep" role="separator"></div>'; return; }
    if(it.titulo){ h+='<div class="lc-menu__titulo">'+esc(it.titulo)+'</div>'; return; }
    if(it.pe){ h+='<div class="lc-menu__pe">'+it.pe+'</div>'; return; }
    h+='<button type="button" role="'+(it.marcado!=null?"menuitemradio":"menuitem")+'" tabindex="-1" class="lc-menu__item'+(it.perigo?' lc-menu__item--perigo':'')+'" data-i-menu="'+i+'"'+(it.marcado!=null?' aria-checked="'+(!!it.marcado)+'"':'')+(it.desab?' aria-disabled="true"':'')+'>'+
      (it.ic?ic(it.ic):'')+'<span style="min-width:0">'+esc(it.t)+(it.sub?'<small>'+esc(it.sub)+'</small>':'')+'</span>'+(it.tecla?'<span class="lc-tecla">'+esc(it.tecla)+'</span>':'')+'</button>';
  });
  el.innerHTML=h;
  var r=o.lado||"direita"; el.style[r==="direita"?"right":"left"]="0";
  if(o.acima){ el.style.bottom="calc(100% + 6px)"; } else { el.style.top="calc(100% + 6px)"; }
  wrap.appendChild(el); if(window.lcIcones) window.lcIcones(el);
  btn.setAttribute("aria-expanded","true");
  menuAberto={el:el,btn:btn};
  var bts=$$("[role^=menuitem]",el).filter(function(b){return b.getAttribute("aria-disabled")!=="true";});
  setTimeout(function(){ (bts.filter(function(b){return b.getAttribute("aria-checked")==="true";})[0]||bts[0]).focus(); },10);
  el.addEventListener("keydown",function(e){ var i=bts.indexOf(document.activeElement);
    if(e.key==="ArrowDown"){e.preventDefault();(bts[i+1]||bts[0]).focus();}
    if(e.key==="ArrowUp"){e.preventDefault();(bts[i-1]||bts[bts.length-1]).focus();}
    if(e.key==="Home"){e.preventDefault();bts[0].focus();} if(e.key==="End"){e.preventDefault();bts[bts.length-1].focus();}
    if(e.key==="Escape"){e.preventDefault();e.stopPropagation();P.fecharMenu();}
    if(e.key==="Tab"){P.fecharMenu(false);}
  });
  el.addEventListener("click",function(e){ var b=e.target.closest("[data-i-menu]"); if(!b||b.getAttribute("aria-disabled")==="true") return; var it=itens[+b.getAttribute("data-i-menu")];
    if(it.manter){ it.acao && it.acao(b); return; } P.fecharMenu(); if(it.acao) it.acao(b); });
  return el;
};
document.addEventListener("click",function(e){ if(menuAberto && !menuAberto.el.contains(e.target) && !menuAberto.btn.contains(e.target)) P.fecharMenu(false); },true);

/* ------------------------------ atalhos de teclado ------------------------------
   Nunca disparam enquanto a pessoa digita num campo (exceto os que levam Ctrl/⌘). */
var atalhos=[];
P.atalho = function(tecla,fn,o){ atalhos.push({t:tecla.toLowerCase(),fn:fn,mod:!!(o&&o.mod)}); };
document.addEventListener("keydown",function(e){
  var t=e.target, digitando = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
  var mod = e.ctrlKey||e.metaKey;
  atalhos.forEach(function(a){ if(e.key.toLowerCase()!==a.t) return; if(a.mod!==mod) return; if(!a.mod && (digitando||e.altKey)) return; if(!a.mod && aberto) return; a.fn(e); });
});

/* ------------------------------ edição: barra de salvar ------------------------------
   new P.Edicao({raiz, onde (contêiner onde a barra entra), objeto:"Contrato de administração",
     opcoes:[{id,t,sub}], chave:"lc-salvar:contratos", aoSalvar(mudancas, modo) → Promise, aoDescartar})
   Campos acompanhados: [data-campo="Valor mensal"] (input/select/textarea). Compara com o valor original,
   não com "tocou no campo": voltar ao valor original some a barra. */
P.Edicao = function(o){
  var self=this; this.o=o; this.raiz=o.raiz; this.barra=null; this.titulo=document.title; this.salvando=false;
  this.originais=new Map();
  this.registrar = function(escopo){ $$("[data-campo]",escopo||self.raiz).forEach(function(c){ if(!self.originais.has(c)) self.originais.set(c,val(c)); }); };
  function val(c){ return c.type==="checkbox"||c.type==="radio" ? c.checked : c.value; }
  this.mudancas = function(){ var m=[]; self.originais.forEach(function(v,c){ if(document.contains(c) && val(c)!==v) m.push({el:c,campo:c.getAttribute("data-campo"),antes:v,depois:val(c)}); }); return m; };
  this.sujo = function(){ return self.mudancas().length>0; };
  this.confirmar = function(){ self.originais.forEach(function(v,c){ self.originais.set(c,val(c)); }); self.atualizar(); };
  this.descartar = function(){ self.originais.forEach(function(v,c){ if(c.type==="checkbox"||c.type==="radio") c.checked=v; else c.value=v; c.removeAttribute("aria-invalid"); }); if(o.aoDescartar) o.aoDescartar(); self.atualizar(); };
  this.escolha = function(){ return guarda.get(o.chave||"lc-salvar","salvar"); };
  this.rotuloPrincipal = function(){ var e=self.escolha(), op=(o.opcoes||[]).filter(function(x){return x.id===e;})[0]; return op && e!=="salvar" ? op.curto||op.t : (o.rotulo||"Salvar"); };
  this.atualizar = function(){
    var m=self.mudancas();
    document.title = (m.length?"• ":"")+self.titulo;
    if(!m.length){ if(self.barra){ self.barra.remove(); self.barra=null; P.anunciar("Nenhuma alteração por salvar."); } if(o.aoMudar) o.aoMudar(m); return; }
    var nomes=m.map(function(x){return x.campo.toLowerCase();}), onde=o.objeto?(" em "+esc(o.objeto)):"";
    var txt='<b>'+m.length+(m.length===1?' alteração não salva':' alterações não salvas')+'</b>'+onde+': '+esc(nomes.length>3?nomes.slice(0,3).join(", ")+" e mais "+(nomes.length-3):nomes.join(nomes.length===2?" e ":", "));
    if(!self.barra){
      self.barra=document.createElement("div"); self.barra.className="lc-barra-salvar"; self.barra.setAttribute("role","region"); self.barra.setAttribute("aria-label","Alterações não salvas");
      self.barra.innerHTML='<p class="lc-barra-salvar__msg">'+ic("aviso")+'<span data-msg></span></p><div class="lc-barra-salvar__acoes" data-menu-ancora>'+
        '<span class="lc-legenda" style="margin-right:4px">'+'<span class="lc-tecla">Ctrl</span>+<span class="lc-tecla">S</span></span>'+
        '<button type="button" class="lc-btn lc-btn--discreto" data-descartar>Descartar</button>'+
        '<span class="lc-dividido"><button type="button" class="lc-btn lc-btn--principal" data-salvar></button>'+
        (o.opcoes&&o.opcoes.length?'<button type="button" class="lc-btn lc-btn--principal" data-salvar-mais aria-label="Outras formas de salvar" aria-haspopup="menu" aria-expanded="false">'+ic("chevron-baixo")+'</button>':'')+'</span></div>';
      (o.onde||self.raiz).appendChild(self.barra); if(window.lcIcones) window.lcIcones(self.barra);
      self.barra.querySelector("[data-descartar]").addEventListener("click",function(){ self.descartar(); P.toast("Alterações descartadas.",{ic:"desfazer"}); });
      self.barra.querySelector("[data-salvar]").addEventListener("click",function(){ self.salvar(self.escolha()); });
      var mais=self.barra.querySelector("[data-salvar-mais]"); if(mais) mais.addEventListener("click",function(){ self.abrirOpcoes(mais); });
      P.anunciar("Há alterações não salvas. Ctrl+S salva.");
    }
    self.barra.classList.remove("lc-barra-salvar--erro");
    self.barra.querySelector("[data-msg]").innerHTML=txt;
    self.barra.querySelector("[data-salvar]").innerHTML=ic("salvar")+esc(self.rotuloPrincipal());
    if(window.lcIcones) window.lcIcones(self.barra);
    if(o.aoMudar) o.aoMudar(m);
  };
  this.abrirOpcoes = function(btn){
    var e=self.escolha(), lembrar=guarda.get((o.chave||"lc-salvar")+":lembrar",e!=="salvar");
    var it=(o.opcoes||[]).map(function(op){ return {t:op.t,sub:op.sub,ic:op.ic,marcado:lembrar&&op.id===e,acao:function(){ if(lembrar) guarda.set(o.chave||"lc-salvar",op.id); else guarda.set(o.chave||"lc-salvar","salvar"); self.salvar(op.id); }}; });
    it.push({pe:'<label class="lc-marcar"><input type="checkbox" data-lembrar'+(lembrar?' checked':'')+'><span class="lc-marcar__caixa"></span><span>Lembrar minha escolha<small>O botão passa a fazer o que você escolheu por último, nesta tela.</small></span></label>'});
    var el=P.menu(btn,it,{classe:"lc-menu--salvar",acima:true,rotulo:"Formas de salvar"});
    var cx=el.querySelector("[data-lembrar]"); cx.addEventListener("change",function(){ lembrar=cx.checked; guarda.set((o.chave||"lc-salvar")+":lembrar",lembrar); if(!lembrar){ guarda.set(o.chave||"lc-salvar","salvar"); } self.atualizar(); });
  };
  this.salvar = function(modo){
    if(self.salvando) return; var m=self.mudancas(); if(!m.length && modo!=="forcar") return;
    self.salvando=true; var b=self.barra&&self.barra.querySelector("[data-salvar]"); if(b) b.setAttribute("aria-busy","true");
    var pr = o.aoSalvar ? o.aoSalvar(m,modo) : Promise.resolve();
    Promise.resolve(pr).then(function(){ self.salvando=false; self.confirmar(); },function(err){ self.salvando=false; if(b) b.removeAttribute("aria-busy"); self.erro(err||{}); });
  };
  this.erro = function(err){
    if(!self.barra) return; self.barra.classList.add("lc-barra-salvar--erro");
    var msg = err.tipo==="rede" ? '<b>Não conseguimos salvar.</b> A conexão caiu às '+P.hora()+'. Suas alterações continuam aqui; tente de novo.'
            : err.tipo==="validacao" ? '<b>'+err.erros.length+(err.erros.length===1?' campo precisa':' campos precisam')+' de correção.</b> '+err.erros.map(function(x){return '<a href="#" data-ir="'+esc(x.id)+'">'+esc(x.campo)+'</a>';}).join(", ")
            : '<b>Não salvamos.</b> '+esc(err.msg||"");
    self.barra.querySelector("[data-msg]").innerHTML=msg; self.barra.querySelector(".lc-barra-salvar__msg .lc-ic").outerHTML=ic("erro");
    self.barra.querySelector("[data-salvar]").innerHTML=ic("atualizar")+"Tentar de novo";
    $$("[data-ir]",self.barra).forEach(function(a){ a.addEventListener("click",function(e){ e.preventDefault(); var c=document.getElementById(a.getAttribute("data-ir")); if(c){ c.focus(); c.scrollIntoView({block:"center"}); } }); });
    P.anunciar(self.barra.querySelector("[data-msg]").textContent);
  };
  self.registrar();
  self.raiz.addEventListener("input",function(e){ if(e.target.closest("[data-campo]")) self.atualizar(); });
  self.raiz.addEventListener("change",function(e){ if(e.target.closest("[data-campo]")) self.atualizar(); });
  P.atalho("s",function(e){ e.preventDefault(); if(self.sujo()) self.salvar(self.escolha()); else P.toast("Nada para salvar. Tudo já está salvo.",{ic:"sucesso",ms:3000}); },{mod:true});
  window.addEventListener("beforeunload",function(e){ if(self.sujo()){ e.preventDefault(); e.returnValue=""; } });
};

/* ------------------------------ sair com alteração: 3 saídas ------------------------------
   Intercepta links internos e ações com [data-navega]. Ordem fixa: Continuar editando · Descartar e sair · Salvar e sair. */
P.guardarSaida = function(ed,o){
  o=o||{};
  document.addEventListener("click",function(e){
    var a=e.target.closest("a[href],[data-navega]"); if(!a || !ed.sujo()) return;
    if(a.closest(".lc-barra-salvar,.lc-modal,.lc-menu,.lc-toast,.lc-painel")) return;
    var href=a.getAttribute("href")||a.getAttribute("data-navega");
    if(!href || href==="#" || href.charAt(0)==="#" || a.target==="_blank" || e.ctrlKey||e.metaKey||e.shiftKey||e.button===1) return;
    e.preventDefault(); e.stopPropagation();
    P.perguntarSaida(ed,function(){ location.href=href; },a.textContent.trim());
  },true);
};
P.perguntarSaida = function(ed,ir,destino){
  var m=ed.mudancas(), lista=m.map(function(x){return '<li><b>'+esc(x.campo)+'</b>: '+esc(String(x.antes))+' para '+esc(String(x.depois))+'</li>';}).join("");
  var md=P.modal({titulo:"Sair sem salvar?",desc:(m.length===1?"Há 1 alteração":"Há "+m.length+" alterações")+" que ainda não foram salvas"+(destino?" e você pediu para ir a "+esc(destino):"")+".",
    corpo:'<ul style="margin:0;padding-left:18px;font-size:13.5px;line-height:21px">'+lista+'</ul>',
    pe:'<button type="button" class="lc-btn" data-m-fechar data-foco>Continuar editando</button><button type="button" class="lc-btn lc-btn--perigo-contorno" data-sair-descartar>Descartar e sair</button><button type="button" class="lc-btn lc-btn--principal" data-sair-salvar>'+ic("salvar")+'Salvar e sair</button>',
    aoAbrir:function(el,api){
      el.querySelector("[data-sair-descartar]").addEventListener("click",function(){ ed.descartar(); api.remover(true); ir(); });
      el.querySelector("[data-sair-salvar]").addEventListener("click",function(){ api.remover(true); var antes=ed.o.aoSalvar; ed.salvar("salvar"); var t=setInterval(function(){ if(!ed.salvando){ clearInterval(t); if(!ed.sujo()) ir(); } },80); });
    }});
  return md;
};

/* ------------------------------ edição por campo ------------------------------
   <button class="lc-celula-edit" data-edita="texto|moeda|data|lista|pessoa" data-rotulo="Responsável" data-opcoes='["A","B"]'>valor</button>
   Clique (ou Enter/F2) abre o controle; Enter confirma; Esc desfaz; sair do campo confirma se o valor é válido.
   Depois de gravar: pisca, mostra "Salvo. Desfazer" por 6 s e anuncia. Ctrl+Z desfaz a última. */
var ultimo=null;
P.campos = function(raiz,o){
  o=o||{};
  $$(".lc-celula-edit[data-edita]",raiz).forEach(function(b){ if(b.__p2) return; b.__p2=1;
    b.setAttribute("aria-label",(b.getAttribute("data-rotulo")||"Campo")+": "+b.textContent.trim()+". Editar");
    b.addEventListener("click",function(){ abrir(b); });
    b.addEventListener("keydown",function(e){ if(e.key==="F2"){ e.preventDefault(); abrir(b); } });
  });
  function abrir(b){
    var tipo=b.getAttribute("data-edita"), rot=b.getAttribute("data-rotulo")||"Campo", atual=b.getAttribute("data-valor")||b.textContent.trim();
    var w=document.createElement("span"); w.className="lc-celula-edit lc-celula-edit--editando"; var ctl;
    if(tipo==="lista"||tipo==="pessoa"){ var ops=JSON.parse(b.getAttribute("data-opcoes")||"[]");
      w.innerHTML='<select class="lc-selecao" aria-label="'+esc(rot)+'">'+ops.map(function(x){return '<option'+(x===atual?' selected':'')+'>'+esc(x)+'</option>';}).join("")+'</select>'; }
    else if(tipo==="data"){ var p=atual.split("/"); w.innerHTML='<input class="lc-entrada" type="date" aria-label="'+esc(rot)+'" value="'+(p.length===3?p[2]+"-"+p[1]+"-"+p[0]:"")+'">'; }
    else if(tipo==="moeda"){ w.innerHTML='<span class="lc-entrada-grupo" style="height:30px;width:100%"><span class="lc-entrada-grupo__fixo">R$</span><input class="lc-entrada lc-entrada--num" inputmode="decimal" aria-label="'+esc(rot)+'" value="'+esc(atual.replace("R$ ",""))+'"></span>'; }
    else w.innerHTML='<input class="lc-entrada" aria-label="'+esc(rot)+'" value="'+esc(atual)+'">';
    b.replaceWith(w); ctl=w.querySelector("input,select"); ctl.focus(); if(ctl.select) try{ctl.select();}catch(_){}
    var fim=false;
    function fechar(confirma){
      if(fim) return; var v=ctl.value;
      if(tipo==="data"&&v){ var q=v.split("-"); v=q[2]+"/"+q[1]+"/"+q[0]; }
      if(tipo==="moeda"){ var n=P.lerMoeda(v); if(isNaN(n)){ if(confirma){ ctl.setAttribute("aria-invalid","true"); P.anunciar("Informe um valor em reais, por exemplo 4.620,00."); return; } } else v=P.moeda(n); }
      if(confirma && tipo==="texto" && b.hasAttribute("data-obrig") && !v.trim()){ ctl.setAttribute("aria-invalid","true"); P.anunciar(rot+" não pode ficar vazio. Esc desfaz."); return; }
      fim=true; w.replaceWith(b); b.focus();
      if(!confirma || v===atual){ if(!confirma) P.anunciar(rot+": alteração desfeita."); return; }
      gravar(b,rot,atual,v);
    }
    ctl.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); fechar(true); } if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); fechar(false); } });
    ctl.addEventListener("blur",function(){ setTimeout(function(){ if(!fim && !w.contains(document.activeElement)) fechar(true); },60); });
    if(ctl.tagName==="SELECT") ctl.addEventListener("change",function(){ fechar(true); });
  }
  function gravar(b,rot,antes,depois){
    b.setAttribute("aria-busy","true");
    setTimeout(function(){
      b.removeAttribute("aria-busy"); b.textContent=depois; b.setAttribute("data-valor",depois); b.setAttribute("aria-label",rot+": "+depois+". Editar");
      b.classList.remove("lc-celula-edit--salvo"); void b.offsetWidth; b.classList.add("lc-celula-edit--salvo");
      var host=b.closest("dd")||b.parentNode, old=host.querySelector(".lc-confirmado"); if(old) old.remove();
      var c=document.createElement("span"); c.className="lc-confirmado"; c.innerHTML=ic("sucesso")+'Salvo às '+P.hora()+'. <button type="button" class="lc-btn lc-btn--link">Desfazer</button>';
      host.appendChild(c); if(window.lcIcones) window.lcIcones(c);
      var t=setTimeout(function(){ c.remove(); },6000);
      ultimo={b:b,rot:rot,antes:antes,depois:depois};
      c.querySelector("button").addEventListener("click",function(){ clearTimeout(t); c.remove(); desfazer(b,rot,antes); });
      P.anunciar(rot+" alterado para "+depois+". Salvo. Ctrl+Z desfaz.");
      if(o.aoGravar) o.aoGravar(rot,antes,depois,b);
    },350);
  }
  function desfazer(b,rot,antes){ b.textContent=antes; b.setAttribute("data-valor",antes); ultimo=null; P.anunciar(rot+" voltou para "+antes+"."); P.toast(esc(rot)+" voltou para "+esc(antes)+".",{ic:"desfazer",ms:4000}); if(o.aoGravar) o.aoGravar(rot,null,antes,b,true); }
  if(!P.__ctrlz){ P.__ctrlz=1; P.atalho("z",function(e){ if(!ultimo) return; e.preventDefault(); var u=ultimo; var c=(u.b.closest("dd")||u.b.parentNode).querySelector(".lc-confirmado"); if(c) c.remove(); desfazer(u.b,u.rot,u.antes); },{mod:true}); }
};

/* ------------------------------ edição por seção ------------------------------
   <section class="lc-secao-reg" data-secao="Vigência e valores"> cab com [data-editar-secao]
     <div data-leitura>…dl…</div> <div data-edicao hidden>…campos [data-campo]…</div>
   O lápis vira "Cancelar edição". Uma seção aberta por vez não é exigido; todas salvam pela barra. */
P.secoes = function(raiz,ed){
  $$(".lc-secao-reg[data-secao]",raiz).forEach(function(s){
    var b=s.querySelector("[data-editar-secao]"); if(!b) return; var nome=s.getAttribute("data-secao");
    b.addEventListener("click",function(){ var ed2=s.classList.contains("lc-secao-reg--editando"); if(ed2) fecharSec(s,true); else abrirSec(s); });
    s.addEventListener("keydown",function(e){ if(e.key==="Escape" && s.classList.contains("lc-secao-reg--editando") && !e.defaultPrevented && !document.querySelector(".lc-menu")){ e.preventDefault(); fecharSec(s,true); } });
  });
  function abrirSec(s){ var b=s.querySelector("[data-editar-secao]"), nome=s.getAttribute("data-secao");
    s.classList.add("lc-secao-reg--editando"); s.querySelector("[data-leitura]").hidden=true; s.querySelector("[data-edicao]").hidden=false;
    b.innerHTML=ic("fechar","lc-ic--16")+"Cancelar edição"; b.classList.remove("lc-btn--icone"); b.setAttribute("aria-label","Cancelar edição de "+nome); b.setAttribute("aria-expanded","true");
    if(ed) ed.registrar(s); var f=s.querySelector("[data-edicao] input,[data-edicao] select,[data-edicao] textarea"); if(f) f.focus();
    P.anunciar("Editando "+nome+". A barra de salvar aparece quando algo mudar. Esc cancela.");
  }
  function fecharSec(s,descartar){ var b=s.querySelector("[data-editar-secao]"), nome=s.getAttribute("data-secao");
    if(descartar && ed){ $$("[data-campo]",s).forEach(function(c){ if(ed.originais.has(c)){ var v=ed.originais.get(c); if(c.type==="checkbox")c.checked=v; else c.value=v; } }); ed.atualizar(); }
    s.classList.remove("lc-secao-reg--editando","lc-secao-reg--sujo"); s.querySelector("[data-leitura]").hidden=false; s.querySelector("[data-edicao]").hidden=true;
    b.innerHTML=ic("editar","lc-ic--16"); b.classList.add("lc-btn--icone"); b.setAttribute("aria-label","Editar "+nome); b.setAttribute("aria-expanded","false"); if(window.lcIcones) window.lcIcones(b); b.focus();
  }
  P.fecharSecao = fecharSec;
};

/* ------------------------------ lista que lembra onde a pessoa estava ------------------------------
   Guarda na sessão do navegador (e no endereço, para colar e abrir em nova aba): filtros, ordem, página,
   itens por página, rolagem da tabela e a última linha aberta. */
P.estadoLista = {
  ler:function(chave,padrao){ var u=new URLSearchParams(location.search), s=guarda.sget("lista:"+chave,{}), r=Object.assign({},padrao,s);
    ["visao","busca","pag","por","ordem","resp","estado"].forEach(function(k){ if(u.has(k)) r[k]=u.get(k); }); if(r.pag) r.pag=+r.pag; if(r.por) r.por=+r.por; return r; },
  gravar:function(chave,st){ guarda.sset("lista:"+chave,st); var u=new URLSearchParams(location.search);
    ["visao","busca","pag","por","ordem","resp"].forEach(function(k){ if(st[k]!=null && st[k]!=="") u.set(k,st[k]); else u.delete(k); });
    var q=u.toString(); try{ history.replaceState(st,"",location.pathname+(q?"?"+q:"")); }catch(_){} }
};
/* conjunto do "14 de 63": a lista filtrada de onde a pessoa veio */
P.conjunto = {
  gravar:function(ids,rotulo,volta){ guarda.sset("conjunto",{ids:ids,rotulo:rotulo,volta:volta}); },
  ler:function(){ return guarda.sget("conjunto",null); }
};
})();
