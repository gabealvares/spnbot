/* =====================================================================
   GACO V1 "Livro-Caixa" — extra-p1-doc.js (agente p1)
   1) Catálogo vivo: cada <template data-ex="Título"> vira um quadro com o exemplo
      renderizado por tema (claro e escuro lado a lado) ou por densidade, e o HTML copiável.
   2) Comportamentos mínimos reais, por delegação (funcionam em todas as cópias):
      menus, popovers, modal, painel, folha, abas, segmentado, toast, barra de salvar,
      seção com lápis, máscara, validação, CEP, senha, combo, multisseleção, upload,
      editor com @ e #, tabela (ordenar, selecionar, célula editável, grupo, filtros,
      paginação, carregar mais), etapas, paginador, kanban, áudio, compositor, feed.
   Carregar ANTES de icones.js (o código copiável sai com <i data-i>, não com SVG).
   ===================================================================== */
(function(){
"use strict";
var D=document, raiz=D.documentElement;
function $(s,r){return (r||D).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s));}
function ic(n,c,r){return window.lcIcone?lcIcone(n,c,r):'<i data-i="'+n+'"'+(c?' class="'+c+'"':'')+'></i>';}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function semAcento(s){return String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();}
function hora(){var d=new Date();return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);}
function moeda(n){return n.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});}
function lerMoeda(s){var t=String(s).replace(/[^\d,-]/g,"").replace(",",".");var n=parseFloat(t);return isNaN(n)?null:n;}
var DOC = window.LCDoc = window.LCDoc || {};
DOC.geradores = DOC.geradores || {};
DOC.moeda=moeda; DOC.ic=ic; DOC.esc=esc;

/* ---------------- 1. Catálogo ---------------- */
var TEMAS={claro:{rot:"Claro",ic:"tema-claro",cl:"lc-tema-claro"},escuro:{rot:"Escuro",ic:"tema-escuro",cl:"lc-tema-escuro"}};
var DENS=[["compacta","Compacta"],["padrao","Padrão"],["confortavel","Confortável"]];
var seq=0;
function sufixar(r,suf){
  var ids={};
  $$("[id]",r).forEach(function(el){ids[el.id]=el.id+suf;el.id=el.id+suf;});
  ["for","aria-describedby","aria-controls","aria-labelledby","data-abre","data-alvo","aria-activedescendant","aria-owns","aria-errormessage","data-conversa","data-busca-tabela","data-massa","data-filtros-de","data-filtros-barra","data-limpa-sel","data-limpa-filtros","data-tabela","data-carregar-mais","data-contagem-de","data-nome-alvo","data-barra","data-enviar-form","list"].forEach(function(a){
    $$("["+a+"]",r).forEach(function(el){el.setAttribute(a,el.getAttribute(a).split(/\s+/).map(function(x){return ids[x]||x;}).join(" "));});});
  $$('a[href^="#"]',r).forEach(function(a){var h=a.getAttribute("href").slice(1);if(ids[h])a.setAttribute("href","#"+ids[h]);});
  $$('input[type="radio"][name]',r).forEach(function(el){el.name=el.name+suf;});
}
function dedent(s){
  var l=s.replace(/^\s*\n/,"").replace(/\s+$/,"").split("\n");
  var m=Infinity;l.forEach(function(x){if(x.trim()){var k=x.match(/^\s*/)[0].length;if(k<m)m=k;}});
  return l.map(function(x){return x.slice(m===Infinity?0:m);}).join("\n");
}
function realce(code){
  return esc(code).replace(/(&lt;\/?)([a-z0-9-]+)/g,'$1<span class="t">$2</span>').replace(/ ([a-z-]+)=&quot;|([a-z:-]+)="([^"]*)"/g,function(m,a1,a,v){
    if(a) return ' <span class="a">'+a+'</span>="<span class="v">'+v+'</span>"';return m;});
}
function painel(tpl,cl,rot,icone,dens,suf){
  var p=D.createElement("div");p.className="lc-doc-painel"+(cl?" "+cl:"")+(tpl.hasAttribute("data-cheio")?" lc-doc-painel--cheio":"")+(tpl.hasAttribute("data-rola")?" lc-doc-painel--rola":"");
  if(dens&&dens!=="padrao")p.setAttribute("data-densidade",dens);
  if(rot){var r=D.createElement("p");r.className="lc-doc-painel__rot";r.innerHTML=(icone?'<i data-i="'+icone+'"></i>':"")+rot;p.appendChild(r);}
  var c=tpl.content.cloneNode(true);var w=D.createElement("div");w.className="lc-doc-palco";w.appendChild(c);
  if(tpl.getAttribute("data-alt"))w.style.setProperty("--_alt",tpl.getAttribute("data-alt"));
  sufixar(w,suf);p.appendChild(w);return p;
}
function renderizar(tpl){
  var ger=tpl.getAttribute("data-gerar");
  if(ger){var g=ger.split(":");var f=DOC.geradores[g[0]];if(f)tpl.innerHTML=f.apply(null,g.slice(1));}
  seq++;var modo=tpl.getAttribute("data-temas")||"lado",dens=tpl.getAttribute("data-dens");
  var q=D.createElement("div");q.className="lc-doc-quadro";
  var cab=D.createElement("div");cab.className="lc-doc-quadro__cab";
  cab.innerHTML='<b>'+esc(tpl.getAttribute("data-ex"))+'</b>'+(tpl.getAttribute("data-leg")?'<span>'+esc(tpl.getAttribute("data-leg"))+'</span>':"");
  var ps=D.createElement("div");ps.className="lc-doc-paineis";
  if(dens==="tres"){ps.style.setProperty("--_n",3);DENS.forEach(function(d,i){ps.appendChild(painel(tpl,"",d[1],"densidade",d[0],"-q"+seq+"d"+i));});}
  else if(modo==="um"||modo==="alternar"){ps.style.setProperty("--_n",1);ps.appendChild(painel(tpl,"","",null,null,"-q"+seq+"u"));}
  else{ if(modo==="empilhado")ps.className+=" lc-doc-paineis--empilhado";
    ["claro","escuro"].forEach(function(t){var T=TEMAS[t];ps.appendChild(painel(tpl,T.cl,T.rot,T.ic,null,"-q"+seq+t[0]));});}
  if(modo==="alternar"||dens==="alternar"){
    var fim=D.createElement("span");fim.className="lc-linha";fim.style.marginLeft="auto";
    if(modo==="alternar")fim.innerHTML+='<span class="lc-seg lc-seg--p" role="group" aria-label="Tema deste quadro" data-quadro-tema><button type="button" aria-pressed="true" data-v="">Da página</button><button type="button" aria-pressed="false" data-v="lc-tema-claro">Claro</button><button type="button" aria-pressed="false" data-v="lc-tema-escuro">Escuro</button></span>';
    if(dens==="alternar")fim.innerHTML+='<span class="lc-seg lc-seg--p" role="group" aria-label="Densidade deste quadro" data-quadro-dens><button type="button" aria-pressed="false" data-v="compacta">Compacta</button><button type="button" aria-pressed="true" data-v="padrao">Padrão</button><button type="button" aria-pressed="false" data-v="confortavel">Confortável</button></span>';
    cab.appendChild(fim);
  }
  q.appendChild(cab);q.appendChild(ps);
  if(tpl.getAttribute("data-nota")){var n=D.createElement("p");n.className="lc-doc-nota";n.style.padding="0 14px 12px";n.textContent=tpl.getAttribute("data-nota");q.appendChild(n);}
  if(!tpl.hasAttribute("data-sem-codigo")){
    var codigo=dedent(tpl.innerHTML);
    var det=D.createElement("details");det.className="lc-doc-codigo";
    det.innerHTML='<summary>HTML de exemplo<span class="lc-cresce"></span><button type="button" class="lc-btn lc-btn--p lc-btn--discreto" data-copiar><i data-i="copiar"></i>Copiar HTML</button></summary><pre tabindex="0" aria-label="HTML de exemplo: '+esc(tpl.getAttribute("data-ex"))+'"><code>'+realce(codigo)+'</code></pre>';
    det._codigo=codigo;q.appendChild(det);
  }
  tpl.parentNode.insertBefore(q,tpl.nextSibling);
}
function indiceFamilias(){
  var nav=$(".lc-doc-indice--familias ol");if(!nav)return;
  var fams={},ordem=[];
  $$(".lc-doc-secao[id]").forEach(function(s){var f=s.getAttribute("data-familia")||"Página";if(!fams[f]){fams[f]=[];ordem.push(f);}var h=$("h2",s);fams[f].push('<li><a href="#'+s.id+'">'+esc(h?h.textContent:s.id)+'</a></li>');});
  nav.innerHTML=ordem.map(function(f){return '<li><span class="lc-doc-indice__familia">'+esc(f)+'</span><ol>'+fams[f].join("")+'</ol></li>';}).join("");
  if("IntersectionObserver" in window){var links=$$("a",nav);
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.setAttribute("aria-current",a.getAttribute("href")==="#"+e.target.id?"true":"false");});});},{rootMargin:"-30% 0px -60% 0px"});
    $$(".lc-doc-secao[id]").forEach(function(s){io.observe(s);});}
}
function iniciarCatalogo(){ $$("template[data-ex]").forEach(renderizar); indiceFamilias(); }

/* ---------------- 2. Toast ---------------- */
function toasts(){var t=$("#lc-doc-toasts");if(!t){t=D.createElement("div");t.id="lc-doc-toasts";t.className="lc-toasts";t.setAttribute("role","status");t.setAttribute("aria-live","polite");D.body.appendChild(t);}return t;}
function toast(msg,opc){opc=opc||{};
  var el=D.createElement("div");el.className="lc-toast"+(opc.sucesso!==false?" lc-toast--sucesso":"");
  el.innerHTML=(opc.sucesso!==false?ic("sucesso"):ic("info"))+'<span class="lc-toast__txt">'+msg+'</span>'+(opc.desfazer?'<button type="button" class="lc-toast__acao">Desfazer</button>':"")+'<button type="button" class="lc-toast__fechar" aria-label="Fechar aviso">'+ic("fechar","lc-ic--16")+'</button>';
  toasts().appendChild(el);
  var fora=function(){if(el.parentNode)el.parentNode.removeChild(el);};
  el.querySelector(".lc-toast__fechar").onclick=fora;
  var a=el.querySelector(".lc-toast__acao");if(a)a.onclick=function(){fora();if(typeof opc.desfazer==="function")opc.desfazer();toast("Ação desfeita.",{sucesso:false});};
  setTimeout(fora,opc.tempo||6000);
}
DOC.toast=toast;

/* ---------------- 3. Abrir e fechar (menu, popover, modal, painel, folha) ---------------- */
var abertos=[];
function focaveis(r){return $$('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]',r).filter(function(e){return e.offsetParent!==null||e===D.activeElement;});}
function ehDialogo(el){return el.classList.contains("lc-sobreposicao")||el.classList.contains("lc-painel")||el.classList.contains("lc-folha");}
function abrir(alvo,gatilho){
  if(!alvo)return;
  if(!ehDialogo(alvo))fecharFlutuantes(alvo);
  alvo.hidden=false;if(gatilho)gatilho.setAttribute("aria-expanded","true");
  abertos.push({el:alvo,g:gatilho});
  if(ehDialogo(alvo)){var f=focaveis(alvo);var pri=$("[data-foco-inicial]",alvo)||f[0];if(pri)setTimeout(function(){pri.focus();},20);}
  else if(alvo.classList.contains("lc-menu")){var it=$(".lc-menu__item:not([aria-disabled='true'])",alvo);if(it&&gatilho&&gatilho._teclado)it.focus();}
  else{var b=$("input",alvo);if(b)setTimeout(function(){b.focus();},20);}
}
function fechar(alvo,devolver){
  if(!alvo||alvo.hidden)return;alvo.hidden=true;
  for(var i=abertos.length-1;i>=0;i--){if(abertos[i].el===alvo){var g=abertos[i].g;abertos.splice(i,1);if(g){g.setAttribute("aria-expanded","false");if(devolver!==false)g.focus();}}}
}
function fecharFlutuantes(exceto){abertos.slice().forEach(function(a){if(a.el!==exceto&&!ehDialogo(a.el)&&!a.el.contains(exceto))fechar(a.el,false);});}
DOC.abrir=abrir;DOC.fechar=fechar;

D.addEventListener("keydown",function(e){
  var g=e.target.closest&&e.target.closest("[data-abre]");if(g&&(e.key==="Enter"||e.key===" "||e.key==="ArrowDown"))g._teclado=true;
  if(e.key==="Escape"&&abertos.length){var u=abertos[abertos.length-1];fechar(u.el);e.preventDefault();return;}
  var menu=e.target.closest&&e.target.closest(".lc-menu");
  if(menu&&(e.key==="ArrowDown"||e.key==="ArrowUp"||e.key==="Home"||e.key==="End")){
    var its=$$(".lc-menu__item:not([aria-disabled='true'])",menu);var i=its.indexOf(e.target);
    i=e.key==="Home"?0:e.key==="End"?its.length-1:(i+(e.key==="ArrowDown"?1:-1)+its.length)%its.length;its[i].focus();e.preventDefault();
  }
  if(e.key==="Tab"&&abertos.length){var top=abertos[abertos.length-1].el;if(ehDialogo(top)){var f=focaveis(top);if(!f.length)return;
    if(e.shiftKey&&D.activeElement===f[0]){f[f.length-1].focus();e.preventDefault();}else if(!e.shiftKey&&D.activeElement===f[f.length-1]){f[0].focus();e.preventDefault();}}}
  /* abas com setas */
  var tab=e.target.closest&&e.target.closest('[role="tab"]');
  if(tab&&(e.key==="ArrowRight"||e.key==="ArrowLeft")){var ts=$$('[role="tab"]',tab.parentNode);var k=(ts.indexOf(tab)+(e.key==="ArrowRight"?1:-1)+ts.length)%ts.length;ts[k].focus();ts[k].click();e.preventDefault();}
});

D.addEventListener("click",function(e){
  var t=e.target;
  /* copiar código */
  var cp=t.closest("[data-copiar]");if(cp){e.preventDefault();var det=cp.closest("details");var txt=det._codigo||"";
    var ok=function(){toast("HTML copiado para a área de transferência.");};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,function(){fallback();});else fallback();
    function fallback(){var ta=D.createElement("textarea");ta.value=txt;D.body.appendChild(ta);ta.select();try{D.execCommand("copy");ok();}catch(_){}D.body.removeChild(ta);}
    return;}
  /* abrir */
  var ab=t.closest("[data-abre]");
  if(ab&&!ab.disabled){var alvo=D.getElementById(ab.getAttribute("data-abre"));
    if(alvo){ if(alvo.hidden)abrir(alvo,ab);else fechar(alvo);ab._teclado=false;e.preventDefault();return;}}
  /* fechar */
  var fc=t.closest("[data-fecha]");
  if(fc){var c=fc.closest(".lc-sobreposicao,.lc-painel,.lc-folha,.lc-menu,.lc-popover,[data-fechavel]");if(c){fechar(c);if(!c.hidden)c.hidden=true;}}
  if(t.classList&&t.classList.contains("lc-sobreposicao")&&!t.classList.contains("lc-sobreposicao--demo"))fechar(t);
  /* fora de flutuante */
  if(!t.closest(".lc-menu,.lc-popover,.lc-opcoes,[data-abre]"))fecharFlutuantes(null);
  /* item de menu que só avisa */
  var mi=t.closest(".lc-menu__item");if(mi&&mi.getAttribute("aria-disabled")!=="true"){
    if(mi.hasAttribute("aria-checked")&&mi.getAttribute("role")==="menuitemradio"){$$('[role="menuitemradio"]',mi.closest(".lc-menu")).forEach(function(x){x.setAttribute("aria-checked","false");});mi.setAttribute("aria-checked","true");}
    else if(mi.hasAttribute("aria-checked")){mi.setAttribute("aria-checked",mi.getAttribute("aria-checked")==="true"?"false":"true");return;}
    var m=mi.closest(".lc-menu");if(m&&!m.classList.contains("lc-menu--estatico"))fechar(m);}
  /* toast genérico */
  var tt=t.closest("[data-toast]");if(tt&&!tt.disabled){toast(tt.getAttribute("data-toast"),{desfazer:tt.hasAttribute("data-desfazer"),sucesso:!tt.hasAttribute("data-info")});}
  /* segmentado de escolha única */
  var sb=t.closest(".lc-seg>button");if(sb&&!sb.disabled&&sb.hasAttribute("aria-pressed")){var seg=sb.parentNode;
    if(seg.hasAttribute("data-quadro-tema")){var pn=seg.closest(".lc-doc-quadro").querySelector(".lc-doc-painel");pn.classList.remove("lc-tema-claro","lc-tema-escuro");if(sb.getAttribute("data-v"))pn.classList.add(sb.getAttribute("data-v"));}
    if(seg.hasAttribute("data-quadro-dens")){var pd=seg.closest(".lc-doc-quadro").querySelector(".lc-doc-painel");var v=sb.getAttribute("data-v");if(v==="padrao")pd.removeAttribute("data-densidade");else pd.setAttribute("data-densidade",v);}
    if(seg.hasAttribute("data-doc-dens")&&window.LCMarca){LCMarca.densidade(sb.getAttribute("data-v"));}
    if(!seg.hasAttribute("data-multi")&&!seg.hasAttribute("data-doc-tema")){$$(":scope>button",seg).forEach(function(b){b.setAttribute("aria-pressed",b===sb?"true":"false");});}
    else if(seg.hasAttribute("data-multi"))sb.setAttribute("aria-pressed",sb.getAttribute("aria-pressed")==="true"?"false":"true");
  }
  /* alternar (estrela, curtir, seguir) */
  var al=t.closest("[data-alterna]");if(al){var on=al.getAttribute("aria-pressed")!=="true";al.setAttribute("aria-pressed",on);
    var rot=al.getAttribute("data-alterna");if(rot.indexOf("|")>-1){var r=rot.split("|");al.setAttribute("aria-label",on?r[0]:r[1]);}
    var cid=al.getAttribute("data-conta");if(cid){var ce=al.closest("article,section,div").querySelector("[data-conta-alvo]");if(ce){var n=parseInt(ce.getAttribute("data-conta-alvo"),10)+(on?1:-1);ce.setAttribute("data-conta-alvo",n);ce.textContent=(on?"Você, ":"")+cid.replace("{n}",on?n-1:n);}}}
  /* abas */
  var tab=t.closest('.lc-abas>[role="tab"]');if(tab&&tab.getAttribute("aria-disabled")!=="true"){
    $$('[role="tab"]',tab.parentNode).forEach(function(x){var s=x===tab;x.setAttribute("aria-selected",s);x.tabIndex=s?0:-1;var p=x.getAttribute("aria-controls");if(p&&D.getElementById(p))D.getElementById(p).hidden=!s;});}
  /* ciência */
  var ci=t.closest("[data-ciencia]");if(ci){var box=ci.closest(".lc-ciencia");var cont=$(".lc-ciencia__conta",box);
    var st=D.createElement("span");st.className="lc-carimbo lc-carimbo--ciente";st.innerHTML='Ciente<small>Você, hoje às '+hora()+'</small>';ci.replaceWith(st);
    if(cont){var mm=cont.textContent.match(/(\d+) de (\d+)/);if(mm)cont.textContent=cont.textContent.replace(mm[0],(+mm[1]+1)+" de "+mm[2]);}
    toast("Ciência registrada às "+hora()+". O RH vê seu nome na lista de quem leu.");}
  /* para você */
  var pv=t.closest("[data-feito]");if(pv){var li=pv.closest(".lc-pv__item");li.classList.add("lc-pv__item--feito");var o=pv.outerHTML;
    var dz=D.createElement("button");dz.type="button";dz.className="lc-btn lc-btn--discreto lc-btn--p lc-pv__acao";dz.textContent="Desfazer";pv.replaceWith(dz);
    dz.onclick=function(){li.classList.remove("lc-pv__item--feito");var tmp=D.createElement("div");tmp.innerHTML=o;dz.replaceWith(tmp.firstChild);};
    toast(pv.getAttribute("data-feito"));}
  /* paginador 14 de 63 */
  var pg=t.closest("[data-paginador] button");if(pg){var P=pg.closest("[data-paginador]");var b=$("b",P);var tot=+P.getAttribute("data-total");var n2=+b.textContent+(pg.hasAttribute("data-prox")?1:-1);
    if(n2<1||n2>tot)return;b.textContent=n2;var nomes=(P.getAttribute("data-nomes")||"").split("|");var nm=nomes[(n2-1)%nomes.length];
    var alvoNome=P.getAttribute("data-nome-alvo")&&D.getElementById(P.getAttribute("data-nome-alvo"));if(alvoNome&&nm)alvoNome.textContent=nm;
    $("[data-prox]",P).disabled=n2>=tot;$("[data-ant]",P).disabled=n2<=1;anunciar("Registro "+n2+" de "+tot+(nm?": "+nm:""));}
  /* etapas */
  var et=t.closest(".lc-etapa>button");if(et){var lis=$$(".lc-etapa",et.closest(".lc-etapas"));var li2=et.parentNode;var k=lis.indexOf(li2);
    lis.forEach(function(l,i){l.classList.remove("lc-etapa--feita","lc-etapa--atual","lc-etapa--perdida");var bt=$("button",l);bt.removeAttribute("aria-current");var sm=$("small",bt);if(sm)sm.remove();
      if(i<k){l.classList.add("lc-etapa--feita");if(!$(".lc-ic",bt))bt.insertAdjacentHTML("afterbegin",ic("confirmar"));}
      if(i>=k){var ii=$(".lc-ic",bt);if(ii)ii.remove();}
      if(i===k){l.classList.add("lc-etapa--atual");bt.setAttribute("aria-current","step");bt.insertAdjacentHTML("beforeend","<small>agora</small>");}});
    var av=et.closest(".lc-etapas-cont");var nx=lis[k+1];if(av){var ba=$("[data-avancar]",av);if(ba){ba.disabled=!nx;ba.lastChild.textContent=nx?"Avançar para "+$("button",nx).childNodes[$("button",nx).childNodes.length-1].textContent.trim():"Última etapa";}}
    anunciar("Etapa atual: "+et.textContent.replace("agora","").trim());toast("Etapa alterada para "+et.textContent.replace("agora","").trim()+". Registrado no histórico.",{desfazer:true});}
  var avc=t.closest("[data-avancar]");if(avc){var at=$(".lc-etapa--atual",avc.closest(".lc-etapas-cont"));var prox=at&&at.nextElementSibling;if(prox)$("button",prox).click();}
  /* senha */
  var ms=t.closest("[data-mostra-senha]");if(ms){var inp=$("input",ms.closest(".lc-entrada-grupo"));var vis=inp.type==="password";inp.type=vis?"text":"password";
    ms.setAttribute("aria-pressed",vis);ms.innerHTML=ic(vis?"ocultar":"ver")+(vis?"Ocultar":"Mostrar");}
  /* CEP */
  var cep=t.closest("[data-consulta-cep]");if(cep)consultarCep(cep);
  /* áudio */
  var au=t.closest(".lc-audio__tocar");if(au)tocarAudio(au);
  /* compositor: modo */
  var md=t.closest(".lc-compositor__modo button");if(md){var cpz=md.closest(".lc-compositor");$$(".lc-compositor__modo button",cpz).forEach(function(b){b.setAttribute("aria-pressed",b===md);});
    var nota=md.getAttribute("data-modo")==="nota";cpz.classList.toggle("lc-compositor--nota",nota);var cx=$(".lc-compositor__caixa",cpz);cx.placeholder=nota?"Nota interna: só a equipe vê. Use @ para chamar alguém.":"Responder para Marina Costa pelo WhatsApp";
    var env=$("[data-enviar-msg]",cpz);if(env)env.firstChild.nodeValue=nota?"Salvar nota":"Enviar";}
  var en=t.closest("[data-enviar-msg]");if(en)enviarMsg(en.closest(".lc-compositor"));
  /* seção com lápis */
  var ed=t.closest("[data-editar-secao]");if(ed)editarSecao(ed.closest(".lc-secao-reg"),true);
  var cl=t.closest("[data-concluir-secao]");if(cl)editarSecao(cl.closest(".lc-secao-reg"),false);
});

var vivo;function anunciar(m){if(!vivo){vivo=D.createElement("div");vivo.className="lc-sr";vivo.setAttribute("aria-live","polite");D.body.appendChild(vivo);}vivo.textContent="";setTimeout(function(){vivo.textContent=m;},30);}
DOC.anunciar=anunciar;

/* ---------------- 4. Máscaras e validação ---------------- */
function so(d){return String(d).replace(/\D/g,"");}
function aplicaMascara(v,m){var d=so(v);
  if(m==="cpf"){d=d.slice(0,11);return d.replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})\.(\d{3})(\d)/,"$1.$2.$3").replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/,"$1.$2.$3-$4");}
  if(m==="cnpj"){d=d.slice(0,14);return d.replace(/^(\d{2})(\d)/,"$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3").replace(/\.(\d{3})(\d)/,".$1/$2").replace(/(\d{4})(\d)/,"$1-$2");}
  if(m==="doc")return d.length>11?aplicaMascara(d,"cnpj"):aplicaMascara(d,"cpf");
  if(m==="cep"){d=d.slice(0,8);return d.replace(/^(\d{5})(\d)/,"$1-$2");}
  if(m==="tel"){d=d.slice(0,11);if(d.length<=10)return d.replace(/^(\d{2})(\d)/,"($1) $2").replace(/(\d{4})(\d)/,"$1-$2");return d.replace(/^(\d{2})(\d{5})(\d)/,"($1) $2-$3");}
  if(m==="moeda"){if(!d)return "";return moeda(parseInt(d,10)/100);}
  if(m==="pct"){d=d.slice(0,5);if(!d)return "";return (parseInt(d,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2});}
  return v;}
DOC.mascara=aplicaMascara;
function cpfOk(c){c=so(c);if(c.length!==11||/^(\d)\1+$/.test(c))return false;for(var t=9;t<11;t++){for(var s=0,i=0;i<t;i++)s+=c[i]*((t+1)-i);var r=((10*s)%11)%10;if(+c[t]!==r)return false;}return true;}
function cnpjOk(c){c=so(c);if(c.length!==14||/^(\d)\1+$/.test(c))return false;var p=[5,4,3,2,9,8,7,6,5,4,3,2];for(var t=12;t<14;t++){var s=0,pp=t===12?p:[6].concat(p);for(var i=0;i<t;i++)s+=c[i]*pp[i];var r=s%11<2?0:11-s%11;if(+c[t]!==r)return false;}return true;}
function rotuloDe(inp){var c=inp.closest(".lc-campo");var l=c&&$(".lc-rotulo",c);return inp.getAttribute("data-nome")||(l?l.childNodes[0].textContent.trim():"Campo");}
/* mensagem em 3 partes: o que aconteceu. por quê (a regra). como corrigir. */
function validar(inp){
  var regras=(inp.getAttribute("data-valida")||"").split(" "),v=inp.value.trim(),nome=rotuloDe(inp),msg="";
  regras.some(function(r){
    if(r==="obrig"&&!v){msg=nome+" está vazio. Este campo é obrigatório para salvar. "+(inp.getAttribute("data-exemplo")?"Exemplo: "+inp.getAttribute("data-exemplo")+".":"Preencha para continuar.");return true;}
    if(!v)return false;
    if(r==="cpf"){var d=so(v);if(d.length<11){msg="CPF incompleto. O CPF tem 11 números e há "+d.length+". Confira os "+(11-d.length)+" que faltam.";return true;}
      if(!cpfOk(d)){msg="CPF não confere. Os dois últimos números não batem com os nove primeiros. Confira se não houve troca de dígitos.";return true;}}
    if(r==="doc"){var d2=so(v);if(d2.length!==11&&d2.length!==14){msg="Documento incompleto. CPF tem 11 números e CNPJ tem 14; há "+d2.length+". Complete o número.";return true;}
      if(d2.length===11&&!cpfOk(d2)){msg="CPF não confere. Os dígitos verificadores não batem. Confira o número no documento.";return true;}
      if(d2.length===14&&!cnpjOk(d2)){msg="CNPJ não confere. Os dois últimos números não batem com os doze primeiros. Copie o CNPJ do cartão da Receita.";return true;}}
    if(r==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){msg="E-mail incompleto. Falta "+(v.indexOf("@")<0?"o @ e o domínio":"o domínio depois do @")+". Exemplo: marina.costa@gmail.com.";return true;}
    if(r==="tel"&&so(v).length<10){msg="Telefone incompleto. Use DDD e número, 10 ou 11 dígitos; há "+so(v).length+". Exemplo: (11) 98765-4321.";return true;}
    if(r==="cep"&&so(v).length!==8){msg="CEP incompleto. O CEP tem 8 números. Confira no boleto de energia ou nos Correios.";return true;}
    if(r.indexOf("min:")===0&&+so(v)<+r.slice(4)){msg=nome+" abaixo do mínimo. O mínimo é "+r.slice(4)+". Ajuste o número.";return true;}
    if(r.indexOf("max:")===0&&lerMoeda(v)>+r.slice(4)){msg=nome+" acima do limite. O máximo é "+r.slice(4).replace(".",",")+". Ajuste o valor.";return true;}
    return false;});
  var alvoInv=inp.closest(".lc-entrada-grupo")||inp;
  var campo=inp.closest(".lc-campo");var err=campo&&$(".lc-erro[data-auto]",campo);
  if(msg){alvoInv.setAttribute("aria-invalid","true");inp.setAttribute("aria-invalid","true");
    if(!err&&campo){err=D.createElement("p");err.className="lc-erro";err.setAttribute("data-auto","");err.id=(inp.id||"c"+Math.random().toString(36).slice(2))+"-erro";campo.appendChild(err);}
    if(err){err.innerHTML=ic("erro")+"<span>"+msg+"</span>";var db=(inp.getAttribute("aria-describedby")||"").split(" ").filter(function(x){return x&&x!==err.id;});db.unshift(err.id);inp.setAttribute("aria-describedby",db.join(" "));}
  }else{alvoInv.removeAttribute("aria-invalid");inp.removeAttribute("aria-invalid");if(err){err.remove();}}
  return !msg;
}
DOC.validar=validar;
D.addEventListener("input",function(e){var t=e.target;
  if(t.hasAttribute&&t.hasAttribute("data-mascara")){var p=t.value.length-t.selectionStart;t.value=aplicaMascara(t.value,t.getAttribute("data-mascara"));try{t.setSelectionRange(t.value.length-p,t.value.length-p);}catch(_){}}
  if(t.getAttribute&&t.getAttribute("aria-invalid")==="true"&&t.hasAttribute("data-valida"))validar(t);   /* em erro: revalida enquanto digita, para o erro sumir assim que corrigir */
  if(t.hasAttribute&&t.hasAttribute("maxlength")&&t.closest(".lc-campo")){var cc=$(".lc-contagem-car",t.closest(".lc-campo"));if(cc){cc.textContent=t.value.length+" de "+t.getAttribute("maxlength");cc.setAttribute("data-estouro",t.value.length>=+t.getAttribute("maxlength"));}}
  t._mexeu=true;
  var f=t.closest&&t.closest("[data-salvar-form]");if(f)contarAlteracoes(f);
  var fb=t.closest&&t.closest(".lc-opcoes__busca");if(fb)filtrarOpcoes(fb.closest(".lc-opcoes"),t.value);
  var bm=t.closest&&t.closest(".lc-multi");if(bm)sugerirMulti(bm,t.value);
  var bt=t.closest&&t.closest("[data-busca-tabela]");if(bt)filtrarTabela(D.getElementById(bt.getAttribute("data-busca-tabela")));
});
D.addEventListener("change",function(e){var f=e.target.closest&&e.target.closest("[data-salvar-form]");if(f)contarAlteracoes(f);
  if(e.target.closest&&e.target.closest(".lc-com-sel"))selecao(e.target);
  if(e.target.matches&&e.target.matches(".lc-upload input[type=file]"))adicionarArquivos(e.target.closest("[data-upload]"),Array.prototype.map.call(e.target.files,function(f){return {nome:f.name,tam:f.size};}));
  if(e.target.matches&&e.target.matches(".lc-paginacao__por select"))paginar(e.target.closest(".lc-paginacao"),1);
});
D.addEventListener("focusout",function(e){var t=e.target;if(t.hasAttribute&&t.hasAttribute("data-valida")&&t._mexeu&&t.value!==t.defaultValue)validar(t);});   /* valida ao sair do campo, só depois que a pessoa mexeu */

/* formulário com validação no envio: resumo de erros no topo */
D.addEventListener("click",function(e){var b=e.target.closest("[data-enviar-form]");if(!b)return;e.preventDefault();
  var f=b.closest("[data-form-valida]")||D.getElementById(b.getAttribute("data-enviar-form"));enviarForm(f,b);});
function enviarForm(f,b){
  var cs=$$("[data-valida]",f).filter(function(i){return i.offsetParent!==null;});var ruins=cs.filter(function(i){return !validar(i);});
  var res=$("[data-resumo]",f);
  if(ruins.length){
    if(res){res.hidden=false;res.innerHTML=ic("erro")+'<div class="lc-alerta__corpo"><span class="lc-alerta__titulo">'+(ruins.length===1?"1 campo precisa de ajuste antes de salvar":ruins.length+" campos precisam de ajuste antes de salvar")+'</span><ul>'+ruins.map(function(i){return '<li><a href="#'+i.id+'">'+esc(rotuloDe(i))+'</a>: '+esc($(".lc-erro[data-auto] span",i.closest(".lc-campo")).textContent.split(".")[0])+'.</li>';}).join("")+'</ul></div>';
      res.tabIndex=-1;res.focus();
      $$("a",res).forEach(function(a){a.onclick=function(ev){ev.preventDefault();var x=D.getElementById(a.getAttribute("href").slice(1));if(x){x.focus();x.scrollIntoView({block:"center"});}};});}
    else ruins[0].focus();
    return false;}
  if(res)res.hidden=true;
  b.setAttribute("aria-busy","true");
  setTimeout(function(){b.removeAttribute("aria-busy");var msg=b.getAttribute("data-sucesso")||f.getAttribute("data-sucesso")||"Salvo.";toast(msg,{desfazer:true});
    var ov=f.closest(".lc-sobreposicao");if(ov&&!ov.classList.contains("lc-sobreposicao--demo"))fechar(ov);
    if(b.hasAttribute("data-e-novo")){$$("input,textarea",f).forEach(function(i){if(i.type==="checkbox"||i.type==="radio")i.checked=i.defaultChecked;else i.value="";i._mexeu=false;});var p=$("input",f);if(p)p.focus();}
    if(typeof f._aposSalvar==="function")f._aposSalvar();},700);
  return true;
}
DOC.enviarForm=enviarForm;

/* ---------------- 5. Barra de salvar ---------------- */
function valorDe(i){return (i.type==="checkbox"||i.type==="radio")?i.checked:i.value;}
function inicialDe(i){return (i.type==="checkbox"||i.type==="radio")?i.defaultChecked:i.defaultValue;}
function contarAlteracoes(f){
  var mud=$$("input,textarea,select",f).filter(function(i){if(i.closest(".lc-barra-salvar"))return false;if(i.tagName==="SELECT"){var o=$$("option",i).filter(function(o){return o.defaultSelected;})[0]||i.options[0];return i.value!==o.value;}return valorDe(i)!==inicialDe(i);});
  var nomes=[];mud.forEach(function(i){var n=rotuloDe(i).toLowerCase();if(nomes.indexOf(n)<0)nomes.push(n);});
  var bar=$(".lc-barra-salvar",f)||D.getElementById(f.getAttribute("data-barra"));if(!bar)return;
  bar.hidden=!nomes.length;bar.classList.remove("lc-barra-salvar--erro");
  var m=$("[data-salvar-msg]",bar);if(m)m.innerHTML=ic("aviso")+'<span><b>'+(nomes.length===1?"1 alteração não salva":nomes.length+" alterações não salvas")+'</b> em '+esc(f.getAttribute("data-salvar-form"))+': '+esc(nomes.join(", "))+'</span>';
  $$("[data-mudou]",f).forEach(function(x){x.hidden=true;});
  mud.forEach(function(i){var a=i.closest(".lc-campo");var an=a&&$(".lc-antes",a);if(an)an.hidden=false;});
}
DOC.contarAlteracoes=contarAlteracoes;
D.addEventListener("click",function(e){
  var t=e.target,f=t.closest("[data-salvar-form]");if(!f)return;
  if(t.closest("[data-descartar]")){$$("input,textarea,select",f).forEach(function(i){if(i.type==="checkbox"||i.type==="radio")i.checked=i.defaultChecked;else if(i.tagName==="SELECT"){var o=$$("option",i).filter(function(o){return o.defaultSelected;})[0];if(o)i.value=o.value;}else i.value=i.defaultValue;i.removeAttribute("aria-invalid");});
    contarAlteracoes(f);toast("Alterações descartadas. Os valores voltaram ao que estava salvo.",{sucesso:false});$$(".lc-secao-reg--editando",f).forEach(function(s){editarSecao(s,false);});return;}
  var sv=t.closest("[data-salvar]");if(sv){var bar=sv.closest(".lc-barra-salvar");var principal=$(".lc-dividido>.lc-btn:first-child",bar)||sv;
    if(f.hasAttribute("data-falhar")&&!f._falhou){f._falhou=true;principal.setAttribute("aria-busy","true");setTimeout(function(){principal.removeAttribute("aria-busy");bar.classList.add("lc-barra-salvar--erro");
      $("[data-salvar-msg]",bar).innerHTML=ic("erro")+'<span><b>Não foi possível salvar.</b> A conexão caiu às '+hora()+'. As alterações continuam aqui; tente de novo.</span>';principal.firstChild.nodeValue="Tentar de novo";},800);return;}
    principal.setAttribute("aria-busy","true");
    setTimeout(function(){principal.removeAttribute("aria-busy");if(principal.firstChild&&principal.firstChild.nodeType===3)principal.firstChild.nodeValue="Salvar";f._falhou=false;
      $$("input,textarea",f).forEach(function(i){if(i.type==="checkbox"||i.type==="radio")i.defaultChecked=i.checked;else i.defaultValue=i.value;});
      $$("select option",f).forEach(function(o){o.defaultSelected=o.selected;});
      $$(".lc-secao-reg--editando",f).forEach(function(s){editarSecao(s,false);});
      contarAlteracoes(f);var tipo=sv.getAttribute("data-salvar");
      var msg={"":"Contrato salvo.","proximo":"Contrato salvo. Abrindo 15 de 63, Residencial Jardim Botânico.","voltar":"Contrato salvo. Voltando para a lista na posição em que você estava.","novo":"Contrato salvo. Formulário limpo para o próximo."}[tipo||""];
      toast(f.getAttribute("data-msg-salvo")&&!tipo?f.getAttribute("data-msg-salvo"):msg,{desfazer:true});
      if(tipo==="proximo"){var pp=$("[data-paginador] [data-prox]");if(pp)pp.click();}
    },700);}
});

/* seção com lápis: leitura <-> edição no lugar */
function editarSecao(s,on){if(!s)return;s.classList.toggle("lc-secao-reg--editando",on);
  var l=$(".lc-secao-reg__leitura",s),ed=$(".lc-secao-reg__edicao",s);if(l)l.hidden=on;if(ed)ed.hidden=!on;
  var b=$("[data-editar-secao]",s);if(b){b.hidden=on;}
  if(on){var p=$("input,select,textarea",ed);if(p)p.focus();}
  else{$$("[data-campo]",s).forEach(function(dd){var i=$('[name="'+dd.getAttribute("data-campo")+'"]',s);if(i){var v=i.tagName==="SELECT"?i.options[i.selectedIndex].text:i.value;dd.textContent=(dd.getAttribute("data-pre")||"")+(v||"Não informado");}});
    var fl=$(".lc-secao-reg__flag",s);if(fl)fl.hidden=!$$("input,select,textarea",s).some(function(i){return i.tagName==="SELECT"?false:valorDe(i)!==inicialDe(i);});if(b)b.focus();}
}

/* ---------------- 6. CEP ---------------- */
var CEPS={"04538132":["Avenida Brigadeiro Faria Lima","Itaim Bibi","São Paulo","SP"],"22250040":["Praia de Botafogo","Botafogo","Rio de Janeiro","RJ"],"30130010":["Avenida Afonso Pena","Centro","Belo Horizonte","MG"],"13024001":["Rua Coronel Quirino","Cambuí","Campinas","SP"]};
function consultarCep(b){var g=b.closest(".lc-entrada-grupo"),inp=$("input",g),f=b.closest("[data-endereco]")||b.closest(".lc-campo").parentNode,campo=b.closest(".lc-campo");
  var ok=$(".lc-consulta-ok",campo);if(ok)ok.hidden=true;g.setAttribute("aria-busy","true");b.disabled=true;
  setTimeout(function(){g.removeAttribute("aria-busy");b.disabled=false;var r=CEPS[so(inp.value)];
    var err=$(".lc-erro[data-auto]",campo);if(err)err.remove();
    if(r){["rua","bairro","cidade","uf"].forEach(function(k,i){var x=$('[data-end="'+k+'"]',f);if(x){x.value=r[i];x.dispatchEvent(new Event("input",{bubbles:true}));}});
      g.removeAttribute("aria-invalid");inp.removeAttribute("aria-invalid");
      if(ok){ok.hidden=false;ok.innerHTML=ic("sucesso")+"Endereço preenchido: "+r[0]+", "+r[1]+", "+r[2]+" ("+r[3]+"). Confira o número.";}
      var n=$('[data-end="numero"]',f);if(n)n.focus();anunciar("Endereço preenchido pelo CEP.");}
    else{g.setAttribute("aria-invalid","true");inp.setAttribute("aria-invalid","true");var e2=D.createElement("p");e2.className="lc-erro";e2.setAttribute("data-auto","");e2.id=inp.id+"-erro";
      e2.innerHTML=ic("erro")+"<span>"+(so(inp.value).length!==8?"CEP incompleto. O CEP tem 8 números. Confira e consulte de novo.":"CEP não encontrado nos Correios. Ele pode ser novo ou de caixa postal. Preencha o endereço à mão.")+"</span>";campo.appendChild(e2);inp.setAttribute("aria-describedby",e2.id);inp.focus();}
  },900);}

/* ---------------- 7. Combo e multisseleção ---------------- */
function filtrarOpcoes(lb,q){var n=semAcento(q.trim()),vis=0;
  $$(".lc-opcao",lb).forEach(function(o){var txt=o.getAttribute("data-txt")||o.childNodes[0].textContent;if(!o.getAttribute("data-txt"))o.setAttribute("data-txt",txt);
    var p=semAcento(txt).indexOf(n);var show=!n||p>-1;o.hidden=!show;if(show)vis++;o.removeAttribute("data-realce");
    var first=o.childNodes[0];if(first&&first.nodeType===3||first&&first.tagName==="MARK"||o.querySelector(":scope>mark")){}
    var resto=$$(":scope>small",o).map(function(s){return s.outerHTML;}).join("");
    o.innerHTML=(n&&p>-1?esc(txt.slice(0,p))+"<mark>"+esc(txt.slice(p,p+n.length))+"</mark>"+esc(txt.slice(p+n.length)):esc(txt))+resto;});
  $$(".lc-opcoes__grupo",lb).forEach(function(g){var nx=g.nextElementSibling,alg=false;while(nx&&!nx.classList.contains("lc-opcoes__grupo")){if(!nx.hidden)alg=true;nx=nx.nextElementSibling;}g.hidden=!alg;});
  var vz=$(".lc-opcoes__vazio",lb);if(vz){vz.hidden=vis>0;vz.innerHTML='Nenhum resultado para “'+esc(q)+'”. Confira a grafia ou crie um novo.';}
  var cr=$(".lc-opcoes__criar",lb);if(cr){cr.hidden=!q.trim();cr.innerHTML=ic("mais")+'Criar “'+esc(q.trim())+'”';}
  var r=$(".lc-opcoes__rodape",lb);if(r)r.textContent=vis+(vis===1?" opção":" opções");
}
D.addEventListener("click",function(e){var o=e.target.closest(".lc-opcao");if(!o||o.getAttribute("aria-disabled")==="true")return;
  var lb=o.closest(".lc-opcoes");if(lb.hasAttribute("data-mencao")||lb.closest(".lc-multi-cont"))return;
  $$(".lc-opcao",lb).forEach(function(x){x.setAttribute("aria-selected",x===o);});
  var cb=D.querySelector('[data-abre="'+lb.id+'"]');if(cb){var v=$(".lc-combo__valor",cb);if(v){v.classList.remove("lc-combo__valor--vazio");v.textContent=o.getAttribute("data-txt")||o.childNodes[0].textContent;}cb.removeAttribute("aria-invalid");}
  fechar(lb);});
D.addEventListener("keydown",function(e){var b=e.target.closest&&e.target.closest(".lc-opcoes__busca");if(!b)return;var lb=b.closest(".lc-opcoes");
  var os=$$(".lc-opcao:not([hidden]):not([aria-disabled='true'])",lb);var i=os.findIndex(function(o){return o.getAttribute("data-realce")==="true";});
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(i>-1)os[i].removeAttribute("data-realce");i=(i+(e.key==="ArrowDown"?1:-1)+os.length)%os.length;if(os[i]){os[i].setAttribute("data-realce","true");os[i].scrollIntoView({block:"nearest"});e.target.setAttribute("aria-activedescendant",os[i].id||"");}}
  if(e.key==="Enter"&&i>-1){e.preventDefault();os[i].click();}});
/* multisseleção */
function addEtiqueta(m,txt){txt=txt.trim();if(!txt)return;var ex=$$(".lc-etiqueta",m).some(function(x){return x.firstChild.textContent===txt;});if(ex)return;
  var n=($$(".lc-etiqueta",m).length%8)+1;var s=D.createElement("span");s.className="lc-etiqueta lc-etiqueta--"+n;
  s.innerHTML=esc(txt)+'<button type="button" aria-label="Remover '+esc(txt)+'">'+ic("fechar")+'</button>';m.insertBefore(s,$("input",m));anunciar(txt+" adicionado.");}
function sugerirMulti(m,q){var cont=m.closest(".lc-multi-cont");if(!cont)return;var lb=$(".lc-opcoes",cont);if(!lb)return;lb.hidden=!q.trim();if(!q.trim())return;filtrarOpcoes(lb,q);}
D.addEventListener("keydown",function(e){var m=e.target.closest&&e.target.closest(".lc-multi");if(!m||e.target.tagName!=="INPUT")return;
  if(e.key==="Enter"||e.key===","){e.preventDefault();var cont=m.closest(".lc-multi-cont"),lb=cont&&$(".lc-opcoes",cont);var pri=lb&&!lb.hidden&&$(".lc-opcao:not([hidden])",lb);
    addEtiqueta(m,pri?pri.getAttribute("data-txt"):e.target.value);e.target.value="";if(lb)lb.hidden=true;}
  if(e.key==="Backspace"&&!e.target.value){var l=$$(".lc-etiqueta",m).pop();if(l){anunciar(l.firstChild.textContent+" removido.");l.remove();}}});
D.addEventListener("click",function(e){var x=e.target.closest(".lc-multi .lc-etiqueta button");if(x){var m=x.closest(".lc-multi");anunciar(x.parentNode.firstChild.textContent+" removido.");x.parentNode.remove();$("input",m).focus();return;}
  var o=e.target.closest(".lc-multi-cont .lc-opcao");if(o){var m2=$(".lc-multi",o.closest(".lc-multi-cont"));addEtiqueta(m2,o.getAttribute("data-txt"));var i=$("input",m2);i.value="";o.closest(".lc-opcoes").hidden=true;i.focus();}
  var mm=e.target.closest(".lc-multi");if(mm&&e.target===mm)$("input",mm).focus();});

/* ---------------- 8. Upload ---------------- */
function tamanho(b){return b>=1048576?(b/1048576).toLocaleString("pt-BR",{maximumFractionDigits:1})+" MB":Math.max(1,Math.round(b/1024))+" KB";}
var TIPOS={pdf:"documento",jpg:"arquivo-imagem",jpeg:"arquivo-imagem",png:"arquivo-imagem",heic:"arquivo-imagem",xlsx:"planilha",xls:"planilha",csv:"planilha",docx:"documento",zip:"arquivo-compactado",mp4:"filme",exe:"arquivo"};
function adicionarArquivos(up,lista){if(!up)return;var ul=$(".lc-anexos",up);var lim=+(up.getAttribute("data-limite")||25)*1048576;var aceita=(up.getAttribute("data-aceita")||"pdf jpg jpeg png heic xlsx docx csv").split(" ");
  lista.forEach(function(f){var ext=(f.nome.split(".").pop()||"").toLowerCase();var li=D.createElement("li");li.className="lc-anexo";var erro="";
    if(aceita.indexOf(ext)<0)erro="Tipo ."+ext+" não é aceito aqui. Envie PDF, imagem ou planilha. Converta o arquivo e envie de novo.";
    else if(f.tam>lim)erro="Arquivo de "+tamanho(f.tam)+". O limite é "+(lim/1048576)+" MB por arquivo. Compacte ou divida em duas partes.";
    li.innerHTML='<span class="lc-anexo__ic">'+ic(TIPOS[ext]||"arquivo","lc-ic--16")+'</span><span class="lc-anexo__nome" title="'+esc(f.nome)+'">'+esc(f.nome)+'</span>'+
      (erro?'<span class="lc-anexo__info">'+erro+'</span>':'<span class="lc-progresso" style="--_v:0%" role="progressbar" aria-label="Enviando '+esc(f.nome)+'" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></span>')+
      '<span class="lc-anexo__acoes">'+(erro?'<button type="button" class="lc-btn lc-btn--icone lc-btn--discreto lc-btn--p" aria-label="Tentar enviar '+esc(f.nome)+' de novo" data-dica="Tentar de novo">'+ic("atualizar")+'</button>':"")+'<button type="button" class="lc-btn lc-btn--icone lc-btn--discreto lc-btn--p" data-remove-anexo aria-label="Remover '+esc(f.nome)+'" data-dica="Remover">'+ic("fechar")+'</button></span>';
    if(erro)li.setAttribute("aria-invalid","true");ul.appendChild(li);
    if(!erro){var p=$(".lc-progresso",li),v=0;var iv=setInterval(function(){v=Math.min(100,v+18+Math.random()*20);p.style.setProperty("--_v",v+"%");p.setAttribute("aria-valuenow",Math.round(v));
      if(v>=100){clearInterval(iv);p.outerHTML='<span class="lc-anexo__info">'+tamanho(f.tam)+', enviado às '+hora()+'</span>';anunciar(f.nome+" enviado.");}},260);}
    else anunciar(f.nome+": "+erro);});
  resumoAnexos(up);}
function resumoAnexos(up){var r=$(".lc-anexos__resumo",up);if(!r)return;var n=$$(".lc-anexo",up).length,e=$$('.lc-anexo[aria-invalid="true"]',up).length;
  r.textContent=n===0?"Nenhum arquivo anexado.":(n===1?"1 arquivo":n+" arquivos")+(e?", "+(e===1?"1 com erro":e+" com erro"):"");}
D.addEventListener("click",function(e){var r=e.target.closest("[data-remove-anexo]");if(r){var up=r.closest("[data-upload]");var nm=$(".lc-anexo__nome",r.closest(".lc-anexo")).textContent;r.closest(".lc-anexo").remove();resumoAnexos(up);toast(nm+" removido.",{desfazer:true,sucesso:false});return;}
  var s=e.target.closest("[data-simula-upload]");if(s){adicionarArquivos(s.closest("[data-upload]"),[{nome:"Ata da AGO de setembro de 2026.pdf",tam:1843200},{nome:"Foto do vazamento na garagem, subsolo 1.jpg",tam:3355443},{nome:"Planilha de rateio extra, cobertura da piscina.xlsx",tam:33554432},{nome:"instalador.exe",tam:52000}]);}});
["dragenter","dragover"].forEach(function(ev){D.addEventListener(ev,function(e){var u=e.target.closest&&e.target.closest(".lc-upload");if(u){e.preventDefault();u.setAttribute("data-arrastando","true");}});});
["dragleave","drop"].forEach(function(ev){D.addEventListener(ev,function(e){var u=e.target.closest&&e.target.closest(".lc-upload");if(u){u.removeAttribute("data-arrastando");
  if(ev==="drop"){e.preventDefault();var fs=e.dataTransfer&&e.dataTransfer.files;if(fs&&fs.length)adicionarArquivos(u.closest("[data-upload]"),Array.prototype.map.call(fs,function(f){return {nome:f.name,tam:f.size};}));}}});});

/* ---------------- 9. Editor com @ menção e # citação ---------------- */
var PESSOAS=[["Marina Costa","Síndica, Cond. Parque das Águas","lc-av--c3","MC"],["Bruno Tavares","Gerente de CS","lc-av--c2","BT"],["Letícia Araújo","Atendimento","lc-av--c5","LA"],["Rafael Nunes","Operações, zeladoria","lc-av--c4","RN"],["Ana Paula Ribeiro","Financeiro","lc-av--c6","AR"],["Juliana Reis","Gestora de Suporte","lc-av--c7","JR"]];
var REGISTROS=[["Chamado 4.812","Vazamento na garagem, Bl B","chamado"],["OS 482","Troca de registro, subsolo 1","ordem-de-servico"],["Boleto 10/2026","Bl B, 1204, R$ 1.284,37","boleto"],["Contrato CT-2024-0187","Administração, Parque das Águas","contrato"],["Assembleia AGE 15/10","Cobertura da piscina","assembleia"]];
var edEstado=null;
function caretInfo(){var s=window.getSelection();if(!s.rangeCount)return null;var r=s.getRangeAt(0);if(!r.collapsed)return null;var n=r.startContainer;if(n.nodeType!==3)return null;
  var antes=n.textContent.slice(0,r.startOffset);var m=antes.match(/(^|\s)([@#])([^\s@#]{0,24})$/);if(!m)return null;return {no:n,fim:r.startOffset,ini:r.startOffset-m[3].length-1,tipo:m[2],q:m[3]};}
function listaMencao(ed){var l=$(".lc-opcoes[data-mencao]",ed);if(!l){l=D.createElement("div");l.className="lc-opcoes lc-opcoes--flutua";l.setAttribute("data-mencao","");l.id="men-"+Math.random().toString(36).slice(2,8);l.innerHTML='<ul class="lc-opcoes__lista" role="listbox"></ul>';l.hidden=true;l.style.top="auto";l.style.width="320px";ed.appendChild(l);}return l;}
function mostrarMencao(ed,info){var l=listaMencao(ed);var q=semAcento(info.q);var base=info.tipo==="@"?PESSOAS:REGISTROS;
  var its=base.filter(function(p){return semAcento(p[0]+" "+p[1]).indexOf(q)>-1;}).slice(0,6);
  $(".lc-opcoes__lista",l).innerHTML=(info.tipo==="@"?'<li class="lc-opcoes__grupo" role="presentation">Pessoas</li>':'<li class="lc-opcoes__grupo" role="presentation">Registros</li>')+
    (its.length?its.map(function(p,i){return '<li class="lc-opcao" role="option" data-i="'+base.indexOf(p)+'"'+(i===0?' data-realce="true"':"")+'>'+(info.tipo==="@"?'<span class="lc-av lc-av--24 '+p[2]+'" aria-hidden="true">'+p[3]+'</span>':'<span class="lc-ladrilho lc-ladrilho--24">'+ic(p[2])+'</span>')+'<span>'+esc(p[0])+'<small>'+esc(p[1])+'</small></span></li>';}).join(""):'<li class="lc-opcoes__vazio">Ninguém com “'+esc(info.q)+'”. Confira a grafia.</li>');
  l.hidden=false;var area=$(".lc-editor__area",ed);l.style.top=(area.offsetTop+area.offsetHeight-6)+"px";edEstado={ed:ed,info:info,tipo:info.tipo};}
function inserirMencao(i){if(!edEstado)return;var p=(edEstado.tipo==="@"?PESSOAS:REGISTROS)[i],inf=edEstado.info;var r=D.createRange();r.setStart(inf.no,inf.ini);r.setEnd(inf.no,inf.fim);r.deleteContents();
  var sp=D.createElement("span");sp.className="lc-mencao"+(edEstado.tipo==="#"?" lc-mencao--ref":"");sp.contentEditable="false";sp.textContent=(edEstado.tipo==="@"?"@":"#")+p[0];
  var esp=D.createTextNode(" ");r.insertNode(esp);r.insertNode(sp);var s=window.getSelection();var r2=D.createRange();r2.setStartAfter(esp);r2.collapse(true);s.removeAllRanges();s.addRange(r2);
  listaMencao(edEstado.ed).hidden=true;anunciar((edEstado.tipo==="@"?"Mencionou ":"Citou ")+p[0]+(edEstado.tipo==="@"?". "+p[0].split(" ")[0]+" será avisada.":"."));edEstado=null;}
D.addEventListener("keyup",function(e){var a=e.target.closest&&e.target.closest(".lc-editor__area");if(!a||["ArrowDown","ArrowUp","Enter","Escape"].indexOf(e.key)>-1)return;var ed=a.closest(".lc-editor");var inf=caretInfo();
  if(inf)mostrarMencao(ed,inf);else{listaMencao(ed).hidden=true;edEstado=null;}
  var pe=$(".lc-rascunho",ed);if(pe){pe.textContent="Salvando rascunho…";clearTimeout(ed._t);ed._t=setTimeout(function(){pe.textContent="Rascunho salvo às "+hora();},700);}});
D.addEventListener("keydown",function(e){var a=e.target.closest&&e.target.closest(".lc-editor__area");if(!a||!edEstado)return;var l=listaMencao(a.closest(".lc-editor"));if(l.hidden)return;
  var os=$$(".lc-opcao",l);var i=os.findIndex(function(o){return o.getAttribute("data-realce")==="true";});
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(i>-1)os[i].removeAttribute("data-realce");i=(i+(e.key==="ArrowDown"?1:-1)+os.length)%os.length;os[i].setAttribute("data-realce","true");}
  if(e.key==="Enter"&&i>-1){e.preventDefault();inserirMencao(+os[i].getAttribute("data-i"));}
  if(e.key==="Escape"){l.hidden=true;edEstado=null;e.stopPropagation();}},true);
D.addEventListener("mousedown",function(e){var o=e.target.closest(".lc-opcoes[data-mencao] .lc-opcao");if(o){e.preventDefault();inserirMencao(+o.getAttribute("data-i"));}
  var fb=e.target.closest("[data-formata]");if(fb){e.preventDefault();var c=fb.getAttribute("data-formata");
    if(c==="mencionar"||c==="citar"){var ar=$(".lc-editor__area",fb.closest(".lc-editor"));ar.focus();D.execCommand("insertText",false,c==="mencionar"?"@":"#");ar.dispatchEvent(new KeyboardEvent("keyup",{bubbles:true,key:"@"}));}
    else{D.execCommand(c,false,c==="formatBlock"?"blockquote":null);}}});

/* ---------------- 10. Tabela ---------------- */
function valCel(td){if(!td)return "";var v=td.getAttribute("data-v");if(v!==null)return isNaN(+v)?v:+v;var t=td.textContent.trim();var n=lerMoeda(t);return /^[\s\-−R$\d.,%]+$/.test(t)&&n!==null?n:semAcento(t);}
D.addEventListener("click",function(e){
  var o=e.target.closest(".lc-ordenar");if(o){var th=o.closest("th"),tb=th.closest("table"),idx=Array.prototype.indexOf.call(th.parentNode.children,th);
    var dir=th.getAttribute("aria-sort")==="ascending"?"descending":"ascending";$$("th[aria-sort]",tb).forEach(function(x){if(x!==th)x.removeAttribute("aria-sort");});th.setAttribute("aria-sort",dir);
    var body=tb.tBodies[0];var rows=$$(":scope>tr:not(.lc-tabela__estado)",body);rows.sort(function(a,b){var x=valCel(a.children[idx]),y=valCel(b.children[idx]);return (x>y?1:x<y?-1:0)*(dir==="ascending"?1:-1);});
    rows.forEach(function(r){body.appendChild(r);});anunciar("Ordenado por "+o.textContent.trim()+", "+(dir==="ascending"?"crescente":"decrescente")+".");return;}
  var g=e.target.closest(".lc-tabela__grupo button[aria-expanded]");if(g){var ab=g.getAttribute("aria-expanded")!=="true";g.setAttribute("aria-expanded",ab);var id=g.closest("tr").getAttribute("data-grupo");
    $$('tr[data-de="'+id+'"]',g.closest("tbody")).forEach(function(r){r.hidden=!ab;});return;}
  var ce=e.target.closest(".lc-celula-edit:not(.lc-celula-edit--editando)");if(ce&&ce.tagName==="BUTTON"){editarCelula(ce);return;}
  var lp=e.target.closest("[data-limpa-sel]");if(lp){var tb2=D.getElementById(lp.getAttribute("data-limpa-sel"));$$("tbody input[type=checkbox]",tb2).forEach(function(c){c.checked=false;});selecao($("tbody input[type=checkbox]",tb2));return;}
  var ch=e.target.closest(".lc-chip-filtro button");if(ch){var cont=ch.closest("[data-filtros-de]");anunciar("Filtro "+ch.parentNode.textContent.trim()+" removido.");ch.parentNode.remove();filtrarTabela(D.getElementById(cont.getAttribute("data-filtros-de")));return;}
  var lf=e.target.closest("[data-limpa-filtros]");if(lf){var c2=D.querySelector('[data-filtros-de="'+lf.getAttribute("data-limpa-filtros")+'"]');$$(".lc-chip-filtro",c2).forEach(function(x){x.remove();});var bs=D.querySelector('[data-busca-tabela="'+lf.getAttribute("data-limpa-filtros")+'"] input');if(bs)bs.value="";filtrarTabela(D.getElementById(lf.getAttribute("data-limpa-filtros")));anunciar("Filtros limpos.");return;}
  var af=e.target.closest("[data-add-filtro]");if(af){var tid=af.getAttribute("data-tabela"),c3=D.querySelector('[data-filtros-de="'+tid+'"]'),f=af.getAttribute("data-add-filtro");
    if(!$('[data-f="'+f+'"]',c3)){var p=f.split("=");var sp=D.createElement("span");sp.className="lc-chip-filtro";sp.setAttribute("data-f",f);sp.innerHTML='<span>'+esc(af.getAttribute("data-rot"))+':</span>'+esc(p[1])+'<button type="button" aria-label="Remover filtro '+esc(af.getAttribute("data-rot"))+' '+esc(p[1])+'">'+ic("fechar")+'</button>';c3.insertBefore(sp,$(".lc-chips__limpar",c3));}
    filtrarTabela(D.getElementById(tid));return;}
  var pb=e.target.closest(".lc-paginacao__pags button");if(pb&&!pb.disabled){var pg=pb.closest(".lc-paginacao");var at=+(pg.getAttribute("data-pag")||1);var n=pb.hasAttribute("data-ant")?at-1:pb.hasAttribute("data-prox")?at+1:pb.hasAttribute("data-prim")?1:pb.hasAttribute("data-ult")?99999:+pb.textContent;paginar(pg,n);return;}
  var cm=e.target.closest("[data-carregar-mais]");if(cm){carregarMais(cm);return;}
});
function selecao(inp){if(!inp)return;var tb=inp.closest("table"),body=tb.tBodies[0],cbs=$$("tr:not([hidden]) .lc-tabela__sel input",body),todos=$("thead .lc-tabela__sel input",tb);
  if(inp===todos)cbs.forEach(function(c){c.checked=todos.checked;});
  cbs.forEach(function(c){c.closest("tr").setAttribute("aria-selected",c.checked);});var n=cbs.filter(function(c){return c.checked;}).length;
  if(todos){todos.checked=n>0&&n===cbs.length;todos.indeterminate=n>0&&n<cbs.length;}
  var m=D.querySelector('[data-massa="'+tb.id+'"]'),fl=D.querySelector('[data-filtros-barra="'+tb.id+'"]');
  if(m){m.hidden=!n;var bb=$("[data-massa-n]",m);if(bb)bb.innerHTML='<b>'+(n===1?"1 boleto selecionado":n+" boletos selecionados")+'</b> de '+cbs.length+(n?' · soma R$ '+moeda(cbs.filter(function(c){return c.checked;}).reduce(function(s,c){return s+(+c.closest("tr").getAttribute("data-valor")||0);},0)):"");}
  if(fl)fl.hidden=!!n;}
function editarCelula(b){var td=b.closest("td"),antigo=b.textContent.trim(),num=td.classList.contains("lc-num"),linha=b.closest("tr").querySelector(".lc-tabela__primaria");
  var w=D.createElement("div");w.className="lc-celula-edit lc-celula-edit--editando";w.innerHTML='<input class="lc-entrada'+(num?' lc-entrada--num':'')+'" aria-label="'+esc((td.closest("table").tHead.rows[0].cells[td.cellIndex].textContent.trim())+" de "+(linha?linha.textContent:""))+'" value="'+esc(antigo.replace("R$ ",""))+'">';
  b.replaceWith(w);var i=$("input",w);i.focus();i.select();var feito=false;
  function fim(salvar){if(feito)return;var nv=i.value.trim();
    if(salvar&&num&&(lerMoeda(nv)===null||lerMoeda(nv)<0)){w.classList.add("lc-celula-edit--erro");i.setAttribute("aria-invalid","true");var er=$(".lc-celula-edit__erro",w);if(!er){er=D.createElement("span");er.className="lc-celula-edit__erro";er.id="ce"+Date.now();w.appendChild(er);i.setAttribute("aria-describedby",er.id);}er.textContent="Valor inválido. Use só números e vírgula. Exemplo: 1.284,37.";i.focus();return;}
    feito=true;var nb=D.createElement("button");nb.type="button";nb.className="lc-celula-edit";var txt=salvar?(num?"R$ "+moeda(lerMoeda(nv)):nv):antigo;nb.textContent=txt;w.replaceWith(nb);
    if(salvar&&txt!==antigo){nb.classList.add("lc-celula-edit--salvo");toast((linha?linha.textContent+": ":"")+"valor alterado de "+antigo+" para "+txt+".",{desfazer:function(){nb.textContent=antigo;}});}nb.focus();}
  i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();fim(true);}if(e.key==="Escape"){e.preventDefault();e.stopPropagation();fim(false);}});
  i.addEventListener("blur",function(){setTimeout(function(){if(!feito&&!w.classList.contains("lc-celula-edit--erro"))fim(true);},120);});}
function filtrarTabela(tb){if(!tb)return;var c=D.querySelector('[data-filtros-de="'+tb.id+'"]');var fs=c?$$(".lc-chip-filtro",c).map(function(x){return x.getAttribute("data-f").split("=");}):[];
  var bi=D.querySelector('[data-busca-tabela="'+tb.id+'"] input');var q=bi?semAcento(bi.value.trim()):"";var vis=0;
  $$("tbody tr:not(.lc-tabela__estado)",tb).forEach(function(r){var ok=fs.every(function(f){return r.getAttribute("data-"+f[0])===f[1];})&&(!q||semAcento(r.textContent).indexOf(q)>-1);r.hidden=!ok;if(ok)vis++;});
  var vz=$(".lc-tabela__estado",tb);if(vz)vz.hidden=vis>0;var ct=D.querySelector('[data-contagem-de="'+tb.id+'"]');if(ct)ct.textContent=vis===1?"1 boleto":vis+" boletos";
  var lim=c&&$(".lc-chips__limpar",c);if(lim)lim.hidden=!fs.length;anunciar(vis===0?"Nenhum boleto com estes filtros.":(vis===1?"1 boleto":vis+" boletos")+" com estes filtros.");}
DOC.filtrarTabela=filtrarTabela;
function paginar(pg,n){var tot=+pg.getAttribute("data-total"),por=+($(".lc-paginacao__por select",pg)||{value:20}).value,np=Math.max(1,Math.ceil(tot/por));n=Math.min(Math.max(1,n),np);pg.setAttribute("data-pag",n);
  var de=(n-1)*por+1,ate=Math.min(tot,n*por);$(".lc-paginacao__info",pg).innerHTML='<b>'+de.toLocaleString("pt-BR")+'–'+ate.toLocaleString("pt-BR")+'</b> de '+tot.toLocaleString("pt-BR")+' '+(pg.getAttribute("data-coisa")||"boletos");
  var pags=[];if(np<=7){for(var i=1;i<=np;i++)pags.push(i);}else{pags=[1];if(n>3)pags.push("…");for(var j=Math.max(2,n-1);j<=Math.min(np-1,n+1);j++)pags.push(j);if(n<np-2)pags.push("…");pags.push(np);}
  $(".lc-paginacao__pags",pg).innerHTML='<button type="button" data-prim aria-label="Primeira página"'+(n===1?" disabled":"")+'>'+ic("primeira","lc-ic--16")+'</button><button type="button" data-ant aria-label="Página anterior"'+(n===1?" disabled":"")+'>'+ic("chevron-esquerda","lc-ic--16")+'</button>'+
    pags.map(function(p){return p==="…"?'<span aria-hidden="true">…</span>':'<button type="button" aria-label="Página '+p+'"'+(p===n?' aria-current="page"':"")+'>'+p+'</button>';}).join("")+
    '<button type="button" data-prox aria-label="Próxima página"'+(n===np?" disabled":"")+'>'+ic("chevron-direita","lc-ic--16")+'</button><button type="button" data-ult aria-label="Última página"'+(n===np?" disabled":"")+'>'+ic("ultima","lc-ic--16")+'</button>';
  var tb=D.getElementById(pg.getAttribute("data-tabela"));if(tb&&DOC.preencher)DOC.preencher(tb,de-1,ate);anunciar("Página "+n+" de "+np+".");}
DOC.paginar=paginar;
function carregarMais(b){var alvo=D.getElementById(b.getAttribute("data-carregar-mais")),tot=+b.getAttribute("data-total"),pass=+(b.getAttribute("data-passo")||10),cont=b.closest(".lc-carregar-mais");
  var tem=alvo.children.length;b.setAttribute("aria-busy","true");
  setTimeout(function(){b.removeAttribute("aria-busy");var f=DOC.geradores[b.getAttribute("data-gerador")];var novos=Math.min(pass,tot-tem);
    if(f)alvo.insertAdjacentHTML("beforeend",f(tem,tem+novos));var agora=alvo.children.length;$$(":scope>*",alvo).slice(tem).forEach(function(x){x.classList.add("lc-nova");});
    var info=$("[data-info]",cont);if(info)info.innerHTML='Mostrando <b>'+agora+'</b> de <b>'+tot+'</b>';
    if(agora>=tot){b.disabled=true;b.textContent="Todos os "+tot+" carregados";}
    var pri=alvo.children[tem];var lk=pri&&$("a,button",pri);if(lk)lk.focus();anunciar(novos+" itens carregados. Mostrando "+agora+" de "+tot+".");},600);}

/* ---------------- 11. Kanban (arrastar e teclado) ---------------- */
var arr=null;
D.addEventListener("dragstart",function(e){var c=e.target.closest&&e.target.closest(".lc-cartao-k");if(!c)return;arr=c;c.setAttribute("aria-grabbed","true");try{e.dataTransfer.setData("text/plain","k");}catch(_){}});
D.addEventListener("dragend",function(){if(arr)arr.setAttribute("aria-grabbed","false");arr=null;$$(".lc-kanban__col[data-solta]").forEach(function(c){c.removeAttribute("data-solta");});});
D.addEventListener("dragover",function(e){var col=e.target.closest&&e.target.closest(".lc-kanban__col");if(col&&arr){e.preventDefault();$$(".lc-kanban__col[data-solta]").forEach(function(c){if(c!==col)c.removeAttribute("data-solta");});col.setAttribute("data-solta","true");}});
D.addEventListener("drop",function(e){var col=e.target.closest&&e.target.closest(".lc-kanban__col");if(col&&arr){e.preventDefault();moverCartao(arr,col);}});
function moverCartao(c,col){var de=c.closest(".lc-kanban__col");$(".lc-kanban__lista",col).appendChild(c);c.setAttribute("aria-grabbed","false");col.removeAttribute("data-solta");[de,col].forEach(somaColuna);
  var nome=$("h3",col).childNodes[0].textContent.trim();toast($(".lc-cartao-k__titulo",c).textContent+" movido para "+nome+".",{desfazer:function(){$(".lc-kanban__lista",de).appendChild(c);[de,col].forEach(somaColuna);}});c.focus();}
function somaColuna(col){var cs=$$(".lc-cartao-k",col);var ct=$("h3 .lc-contagem",col);if(ct)ct.textContent=cs.length;var s=$(".lc-kanban__soma",col);if(s){var v=cs.reduce(function(a,c){return a+(+c.getAttribute("data-valor")||0);},0);s.textContent="R$ "+moeda(v)+" por mês";}}
D.addEventListener("keydown",function(e){var c=e.target.closest&&e.target.closest(".lc-cartao-k");if(!c)return;
  if(e.key===" "){e.preventDefault();var g=c.getAttribute("aria-grabbed")==="true";c.setAttribute("aria-grabbed",!g);anunciar(g?"Cartão solto.":"Cartão levantado. Use as setas esquerda e direita para trocar de coluna e espaço para soltar.");}
  if((e.key==="ArrowRight"||e.key==="ArrowLeft")&&c.getAttribute("aria-grabbed")==="true"){e.preventDefault();var cols=$$(".lc-kanban__col",c.closest(".lc-kanban"));var i=cols.indexOf(c.closest(".lc-kanban__col"))+(e.key==="ArrowRight"?1:-1);if(cols[i]){$(".lc-kanban__lista",cols[i]).appendChild(c);c.focus();cols.forEach(somaColuna);anunciar("Em "+$("h3",cols[i]).childNodes[0].textContent.trim()+".");}}});

/* ---------------- 12. Áudio e compositor ---------------- */
function tocarAudio(b){var a=b.closest(".lc-audio"),ondas=$$(".lc-audio__onda i",a),tp=$(".lc-audio__tempo",a);if(a._iv){clearInterval(a._iv);a._iv=null;b.innerHTML=ic("tocar");b.setAttribute("aria-label","Tocar áudio");return;}
  b.innerHTML=ic("pausar");b.setAttribute("aria-label","Pausar áudio");var tot=+(a.getAttribute("data-seg")||42),k=$$(".lc-tocado",a).length;if(k>=ondas.length){ondas.forEach(function(o){o.classList.remove("lc-tocado");});k=0;}
  a._iv=setInterval(function(){if(k>=ondas.length){clearInterval(a._iv);a._iv=null;b.innerHTML=ic("tocar");b.setAttribute("aria-label","Tocar áudio de novo");return;}ondas[k++].classList.add("lc-tocado");var s=Math.round(tot*k/ondas.length);tp.textContent="0:"+("0"+s).slice(-2)+" de 0:"+("0"+tot).slice(-2);},120);}
function enviarMsg(cpz){var cx=$(".lc-compositor__caixa",cpz),txt=cx.value.trim();if(!txt){cx.focus();return;}var conv=D.getElementById(cpz.getAttribute("data-conversa"));if(!conv)return;
  var nota=cpz.classList.contains("lc-compositor--nota");var b=D.createElement("div");b.className="lc-bolha "+(nota?"lc-bolha--nota":"lc-bolha--enviada")+" lc-bolha--primeira";
  b.innerHTML=(nota?'<span class="lc-bolha__nota-rotulo">'+ic("nota-interna")+'Nota interna, só a equipe vê</span>':"")+esc(txt)+'<span class="lc-bolha__meta">'+hora()+(nota?"":'<span class="lc-tique" aria-label="Enviando">'+ic("enviando")+'</span>')+'</span>';
  conv.appendChild(b);conv.scrollTop=conv.scrollHeight;cx.value="";cx.focus();
  if(!nota){var tq=$(".lc-tique",b);setTimeout(function(){tq.innerHTML=ic("confirmar");tq.setAttribute("aria-label","Enviada");},700);setTimeout(function(){tq.innerHTML=ic("lida");tq.setAttribute("aria-label","Entregue");},1400);setTimeout(function(){tq.classList.add("lc-tique--lida");tq.setAttribute("aria-label","Lida");},2600);}
  anunciar(nota?"Nota interna salva.":"Mensagem enviada.");}
D.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey&&e.target.classList&&e.target.classList.contains("lc-compositor__caixa")){e.preventDefault();enviarMsg(e.target.closest(".lc-compositor"));}});

/* ---------------- início ---------------- */
function iniciar(){
  iniciarCatalogo();
  $$("[data-doc-dens]").forEach(function(g){var d=raiz.getAttribute("data-densidade")||"padrao";$$("button",g).forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-v")===d);});});
  $$(".lc-paginacao[data-total]").forEach(function(p){paginar(p,+(p.getAttribute("data-pag")||1));});
  if(typeof DOC.aoIniciar==="function")DOC.aoIniciar();
}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",iniciar);else iniciar();
})();
