/* =====================================================================
   GACO V1 "Livro-Caixa" — extra-p5.js
   Interações mínimas das telas do p5 (portal, públicas, superadmin, celular, documentos).
   Tudo por atributo, sem biblioteca:
     [data-abas]                 grupo de abas: [role=tab][aria-controls] mostra o painel
     [data-seg]                  .lc-seg exclusivo (aria-pressed); data-alvo="#id" + data-v mostra [data-painel-v]
     [data-abrir="#id"]          mostra o elemento (modal, painel, folha, menu); [data-fechar-alvo] fecha
     [data-alternar="#id"]       alterna hidden e aria-expanded (menu "Salvar ▾", "⋯")
     [data-copiar="texto"]       copia e mostra toast (data-toast="mensagem")
     [data-toast="mensagem"]     mostra toast ao clicar (data-toast-acao="Desfazer")
     [data-editavel]             qualquer input/select/textarea alterado mostra [data-barra-salvar] do mesmo bloco
     [data-ciente]               botão "Li e estou ciente" vira carimbo de ciência com data e hora
     [data-passo-ir="n"]         em [data-passos], vai para o passo n ([data-passo="n"])
     [data-fotos]                botão "remover" tira a miniatura; "adicionar" põe uma nova
     .lc-codigo6                 avança o foco a cada dígito
   API: window.LCP5.toast(msg, acao)
   ===================================================================== */
(function(){
"use strict";
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
var ic = function(n,c){ return window.lcIcone ? window.lcIcone(n,c||"") : ""; };

function toast(msg, acao){
  var box = $(".lc-toasts:not(.lc-toasts--demo)");
  if(!box){ box=document.createElement("div"); box.className="lc-toasts"; box.setAttribute("role","status"); box.setAttribute("aria-live","polite"); document.body.appendChild(box); }
  var t=document.createElement("div"); t.className="lc-toast lc-toast--sucesso";
  t.innerHTML = ic("sucesso")+'<span class="lc-toast__txt"></span>'+(acao?'<button type="button" class="lc-toast__acao">'+acao+'</button>':'')+
    '<button type="button" class="lc-toast__fechar" aria-label="Fechar aviso">'+ic("fechar","lc-ic--16")+'</button>';
  t.querySelector(".lc-toast__txt").textContent = msg;
  box.appendChild(t);
  var fim=function(){ t.remove(); };
  t.querySelector(".lc-toast__fechar").addEventListener("click",fim);
  if(acao) t.querySelector(".lc-toast__acao").addEventListener("click",fim);
  setTimeout(fim, 5000);
}

function agora(){ var d=new Date(); var p=function(n){return String(n).padStart(2,"0");};
  return p(d.getDate())+"/"+p(d.getMonth()+1)+"/"+String(d.getFullYear()).slice(2)+" "+p(d.getHours())+":"+p(d.getMinutes()); }

document.addEventListener("click",function(e){
  var t;
  // abas
  if((t=e.target.closest("[data-abas] [role=tab]"))){
    var g=t.closest("[data-abas]");
    $$("[role=tab]",g).forEach(function(a){ var on=a===t; a.setAttribute("aria-selected",on); a.tabIndex=on?0:-1; var p=document.getElementById(a.getAttribute("aria-controls")); if(p) p.hidden=!on; });
    return;
  }
  // segmentado exclusivo
  if((t=e.target.closest("[data-seg] > button"))){
    var s=t.parentNode; $$(":scope > button",s).forEach(function(b){b.setAttribute("aria-pressed",b===t);});
    var alvo=s.getAttribute("data-alvo"); if(alvo){ var v=t.getAttribute("data-v"); $$(alvo+" [data-painel-v]").forEach(function(p){p.hidden=p.getAttribute("data-painel-v")!==v;}); }
  }
  // abrir / fechar
  if((t=e.target.closest("[data-abrir]"))){ e.preventDefault(); var el=$(t.getAttribute("data-abrir")); if(el){ el.hidden=false; el.__origem=t; var f=el.querySelector("input:not([type=hidden]),textarea,button,[href]"); if(f) setTimeout(function(){f.focus();},0);} return; }
  if((t=e.target.closest("[data-fechar-alvo]"))){ var c=t.closest("[data-fechavel]")||$(t.getAttribute("data-fechar-alvo")); if(c){ c.hidden=true; if(c.__origem) c.__origem.focus(); } if(t.hasAttribute("data-toast")) toast(t.getAttribute("data-toast"),t.getAttribute("data-toast-acao")); return; }
  if((t=e.target.closest("[data-alternar]"))){ var m=$(t.getAttribute("data-alternar")); if(m){ m.hidden=!m.hidden; t.setAttribute("aria-expanded",!m.hidden); } return; }
  // copiar
  if((t=e.target.closest("[data-copiar]"))){
    var txt=t.getAttribute("data-copiar"); try{ navigator.clipboard && navigator.clipboard.writeText(txt); }catch(_){}
    var box=t.closest(".lc-pix"); if(box) box.setAttribute("data-copiado","true");
    var rot=t.querySelector("[data-rot]"); if(rot){ var antes=rot.textContent; rot.textContent="Copiado"; setTimeout(function(){rot.textContent=antes;},2400); }
    toast(t.getAttribute("data-toast")||"Copiado."); return;
  }
  // ciência
  if((t=e.target.closest("[data-ciente]"))){
    var quem=t.getAttribute("data-ciente")||"Você";
    var span=document.createElement("span"); span.className="lc-carimbo lc-carimbo--ciente"; span.setAttribute("role","status");
    span.innerHTML='Ciente<small>'+quem+', '+agora()+'</small>'; t.replaceWith(span); return;
  }
  // passos
  if((t=e.target.closest("[data-passo-ir]"))){
    var ps=t.closest("[data-passos]"), n=t.getAttribute("data-passo-ir");
    $$("[data-passo]",ps).forEach(function(p){p.hidden=p.getAttribute("data-passo")!==n;});
    $$(".lc-passos li",ps).forEach(function(li,i){ var k=String(i+1); li.classList.toggle("lc-feito",+k<+n); if(k===n) li.setAttribute("aria-current","step"); else li.removeAttribute("aria-current"); });
    var foco=$('[data-passo="'+n+'"] h2, [data-passo="'+n+'"] h3',ps); if(foco){ foco.tabIndex=-1; foco.focus(); }
    return;
  }
  // fotos
  if((t=e.target.closest("[data-fotos] .lc-fotos__tirar"))){ var li=t.closest("li"); var nome=li.getAttribute("data-nome")||"Foto"; li.remove(); toast(nome+" removida.","Desfazer"); return; }
  if((t=e.target.closest("[data-fotos] .lc-fotos__add"))){ var ul=t.closest("[data-fotos]"); var n2=$$("li[data-nome]",ul).length+1; var li2=document.createElement("li"); li2.setAttribute("data-nome","Foto "+n2);
    li2.innerHTML='<span class="lc-foto-ph">'+ic("camera")+'Foto '+n2+'</span><button type="button" class="lc-fotos__tirar" aria-label="Remover foto '+n2+'">'+ic("fechar")+'</button>'; ul.insertBefore(li2,t.closest("li")); return; }
  // toast simples
  if((t=e.target.closest("[data-toast]"))){ toast(t.getAttribute("data-toast"),t.getAttribute("data-toast-acao")); }
});

// barra de salvar: aparece só com alteração
document.addEventListener("input",function(e){
  var b=e.target.closest("[data-editavel]"); if(!b) return;
  var barra=$("[data-barra-salvar]",b) || $(b.getAttribute("data-editavel")); if(barra) barra.hidden=false;
  var n=$("[data-conta-alt]",barra||b); if(n){ var k=(+n.getAttribute("data-n")||0); if(!e.target.__alterado){ e.target.__alterado=1; k++; n.setAttribute("data-n",k); n.textContent=k===1?"1 alteração não salva":k+" alterações não salvas"; } }
});
// código de 6 dígitos
document.addEventListener("input",function(e){
  if(!e.target.closest(".lc-codigo6")) return;
  var ins=$$("input",e.target.closest(".lc-codigo6")), i=ins.indexOf(e.target);
  e.target.value=e.target.value.replace(/\D/g,"").slice(-1);
  if(e.target.value && ins[i+1]) ins[i+1].focus();
});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"){ var abertos=$$("[data-fechavel]:not([hidden])"); var u=abertos[abertos.length-1]; if(u){ u.hidden=true; if(u.__origem) u.__origem.focus(); } }
  if(e.target.closest && e.target.closest(".lc-codigo6") && e.key==="Backspace" && !e.target.value){ var ins=$$("input",e.target.closest(".lc-codigo6")), i=ins.indexOf(e.target); if(ins[i-1]) ins[i-1].focus(); }
  // setas nas abas
  var tab=e.target.closest && e.target.closest("[data-abas] [role=tab]");
  if(tab && (e.key==="ArrowRight"||e.key==="ArrowLeft")){ var ts=$$("[role=tab]",tab.closest("[data-abas]")), j=ts.indexOf(tab); var nx=e.key==="ArrowRight"?(ts[j+1]||ts[0]):(ts[j-1]||ts[ts.length-1]); nx.focus(); nx.click(); }
});
window.LCP5 = {toast:toast};
/* ?limpo=1 esconde a documentação (fichas e variações) para mostrar só a tela, usado nos aparelhos da página 60.
   ?abrir=gaveta|sino|cmdk|conta abre a camada da moldura depois de montar. */
(function(){
  var q=location.search;
  if(/[?&]limpo=1/.test(q)) document.documentElement.classList.add("lc-limpo");
  var m=q.match(/[?&]abrir=([a-z-]+)/);
  if(m) window.addEventListener("load",function(){ setTimeout(function(){ var b=document.querySelector('[data-acao="'+m[1]+'"]'); if(b){ b.click(); if(document.activeElement) document.activeElement.blur(); } },120); });
  if(/[?&]limpo=1/.test(q) && location.hash) window.addEventListener("load",function(){ var a=document.querySelector(location.hash); if(a) setTimeout(function(){ var n=a; while(n && n.classList && n.classList.contains("lc-ficha-tela")) n=n.nextElementSibling; (n||a).scrollIntoView(); },60); });
})();

})();
