/* =====================================================================
   GACO V1 "Livro-Caixa" — extra-p4.js
   Comportamento mínimo das telas da parte B (p4). Sem bibliotecas.
     · [data-p4-estados]   segmentado que troca o estado da tela: mostra [data-estado~="v"]
     · [data-p4-tema]      segmentado claro/escuro (usa LCMarca)
     · [data-p4-telas="m"] lista de telas irmãs do módulo (navegação da ficha)
     · [role=tablist]      abas com aria-controls (setas esquerda/direita)
     · .lc-seg[data-p4-seg] segmentado de escolha única (aria-pressed)
     · [data-abrir="id"]   abre modal/painel/menu por id; [data-fechar] fecha; Esc fecha
     · [data-toast="txt"]  mostra toast (data-toast-desfazer="1" põe "Desfazer")
     · [data-p4-form]      ao editar, mostra a .lc-barra-salvar do formulário; Descartar volta
     · [data-p4-massa]     tabela com seleção: mostra a barra de massa com a contagem
     · [data-dado]         dica no gráfico (hover e foco)
   API: window.P4 = { toast(txt, desfazer), abrir(id), fechar() }
   ===================================================================== */
(function(){
"use strict";
var TELAS = {
  financeiro:[["26-financeiro.html","Contas a receber"],["26b-financeiro-cobranca.html","Cobrança em detalhe"],["26c-financeiro-contas-a-pagar.html","Contas a pagar"],
    ["26d-financeiro-conciliacao.html","Conciliação em fila"],["26e-financeiro-rateio.html","Rateio de despesa extra"],["26f-financeiro-prestacao-de-contas.html","Prestação de contas"],
    ["26g-financeiro-dre.html","DRE"],["26h-financeiro-inadimplencia-acordo.html","Inadimplência e acordo"],["26i-financeiro-fluxo-de-caixa.html","Fluxo de caixa"]],
  projetos:[["27-projetos.html","Lista e quadro"],["27b-projetos-detalhe.html","Projeto, fases e tarefas"],["27c-projetos-cronograma.html","Cronograma"],["27d-projetos-implantacao.html","Implantação de cliente"],["27e-projetos-alocacao.html","Alocação da equipe"]],
  produto:[["28-produto-dev.html","Demandas e roteiro"],["28b-produto-demanda.html","Demanda em detalhe"],["28c-dev-sprint.html","Sprint em quadro"],["28d-dev-bug.html","Bug com reprodução"],["28e-produto-mudancas.html","Mudanças e versões"]],
  cultura:[["29-cultura.html","Pessoas"],["29b-cultura-perfil.html","Perfil"],["29c-cultura-organograma.html","Organograma"],["29d-cultura-ferias.html","Pedir férias"],
    ["29e-cultura-solicitacoes.html","Solicitações e aprovação"],["29f-cultura-avaliacao.html","Avaliação e 1:1"],["29g-cultura-recrutamento.html","Recrutamento"],
    ["29h-cultura-comunicados.html","Comunicados com ciência"],["29i-cultura-clima.html","Pesquisa de clima"]],
  academy:[["30-academy.html","Portal do aluno"],["30b-academy-disciplina.html","Disciplina"],["30c-academy-aula.html","Aula"],["30d-academy-entrega.html","Entrega de atividade"],
    ["30e-academy-prova.html","Prova"],["30f-academy-diario.html","Diário de classe"],["30g-academy-turma.html","Criar disciplina e turma"],["30h-academy-matricula.html","Matrícula e rematrícula"],
    ["30i-academy-certificados.html","Certificados"],["30j-academy-historico-calendario.html","Histórico e calendário"]],
  relatorios:[["31-relatorios.html","Catálogo"],["31b-relatorio-inadimplencia.html","Relatório com filtros"],["31c-relatorios-agendados.html","Agendados e exportações"]],
  configuracao:[["32-configuracao.html","Seções"],["32b-config-marca.html","Marca e white label"],["32c-config-usuarios.html","Usuários"],["32d-config-permissoes.html","Papéis e permissões"],
    ["32e-config-termos.html","Nomes e glossário"],["32f-config-mecanica.html","Mecânica dos objetos"],["32g-config-listas.html","Listas e opções"],["32h-config-integracoes.html","Integrações"],
    ["32i-config-seguranca.html","Segurança e auditoria"],["32j-config-lixeira.html","Lixeira"]],
  conversas:[["33-conversas-internas.html","Chat interno"],["33b-conversas-fio.html","Fio de resposta"],["33c-comentarios-registro.html","Comentários no registro"]]
};
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function ic(n,c){ return window.lcIcone ? window.lcIcone(n,c||"") : '<i data-i="'+n+'"></i>'; }

/* ---------- toast ---------- */
var caixaToasts=null;
function toast(txt,desfazer){
  if(!caixaToasts){ caixaToasts=document.createElement("div"); caixaToasts.className="lc-toasts"; caixaToasts.setAttribute("role","status"); caixaToasts.setAttribute("aria-live","polite"); document.body.appendChild(caixaToasts); }
  var t=document.createElement("div"); t.className="lc-toast lc-toast--sucesso";
  t.innerHTML=ic("sucesso")+'<span class="lc-toast__txt"></span>'+(desfazer?'<button type="button" class="lc-toast__acao">Desfazer</button>':'')+'<button type="button" class="lc-toast__fechar" aria-label="Fechar aviso">'+ic("fechar","lc-ic--16")+'</button>';
  t.querySelector(".lc-toast__txt").textContent=txt;
  caixaToasts.appendChild(t);
  var tira=function(){ if(t.parentNode) t.parentNode.removeChild(t); };
  t.querySelector(".lc-toast__fechar").addEventListener("click",tira);
  var d=t.querySelector(".lc-toast__acao"); if(d) d.addEventListener("click",function(){ tira(); toast("Desfeito. Tudo voltou como estava."); });
  setTimeout(tira,6000);
}

/* ---------- camadas (modal, painel, menu) ---------- */
var aberta=null, origem=null;
function abrir(id,de){
  var el=document.getElementById(id); if(!el) return;
  if(aberta && aberta!==el) fechar();
  el.hidden=false; aberta=el; origem=de||null;
  if(de && de.hasAttribute("aria-expanded")) de.setAttribute("aria-expanded","true");
  var f=el.querySelector("[autofocus]")||el.querySelector("input:not([type=hidden]),textarea,select,[role=menuitem],button:not([data-fechar]),a[href]");
  if(f) setTimeout(function(){ f.focus({preventScroll:el.classList.contains("lc-menu")}); },20);
}
function fechar(){
  if(!aberta) return;
  aberta.hidden=true;
  if(origem){ if(origem.hasAttribute("aria-expanded")) origem.setAttribute("aria-expanded","false"); try{origem.focus({preventScroll:true});}catch(e){} }
  aberta=null; origem=null;
}

function iniciar(){
  /* telas irmãs */
  $$("[data-p4-telas]").forEach(function(el){
    var m=el.getAttribute("data-p4-telas"), atual=location.pathname.split("/").pop();
    var l=TELAS[m]||[]; el.innerHTML='<span class="lc-cor-2">Telas deste módulo:</span> '+l.map(function(t){return '<a href="'+t[0]+'"'+(t[0]===atual?' aria-current="page"':'')+'>'+t[1]+'</a>';}).join("");
  });
  /* estados da tela */
  $$("[data-p4-estados]").forEach(function(g){
    var aplica=function(v){
      $$("[data-estado]").forEach(function(x){ x.hidden = (" "+x.getAttribute("data-estado")+" ").indexOf(" "+v+" ")<0; });
      $$("button",g).forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-v")===v); });
    };
    g.addEventListener("click",function(e){ var b=e.target.closest("button[data-v]"); if(b) aplica(b.getAttribute("data-v")); });
    var q=(location.search.match(/[?&]estado=([a-z-]+)/)||[])[1];
    aplica(q || (g.querySelector('[aria-pressed="true"]')||g.querySelector("button")).getAttribute("data-v"));
  });
  /* tema na ficha */
  $$("[data-p4-tema]").forEach(function(g){
    var marca=function(){ var t=document.documentElement.getAttribute("data-tema")||"claro"; $$("button",g).forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-v")===t);}); };
    g.addEventListener("click",function(e){ var b=e.target.closest("button[data-v]"); if(!b) return; if(window.LCMarca) LCMarca.tema(b.getAttribute("data-v")); else document.documentElement.setAttribute("data-tema",b.getAttribute("data-v")); marca(); });
    document.addEventListener("lc:tema",marca); marca();
  });
  /* abas */
  $$("[role=tablist]").forEach(function(tl){
    var tabs=$$("[role=tab]",tl);
    var sel=function(t,foco){ tabs.forEach(function(x){ var s=x===t; x.setAttribute("aria-selected",s); x.tabIndex=s?0:-1; var p=x.getAttribute("aria-controls"); if(p&&document.getElementById(p)) document.getElementById(p).hidden=!s; }); if(foco) t.focus(); };
    tabs.forEach(function(t){ t.addEventListener("click",function(){ sel(t); }); });
    tl.addEventListener("keydown",function(e){ var i=tabs.indexOf(document.activeElement); if(i<0) return;
      if(e.key==="ArrowRight"){e.preventDefault(); sel(tabs[(i+1)%tabs.length],true);} if(e.key==="ArrowLeft"){e.preventDefault(); sel(tabs[(i-1+tabs.length)%tabs.length],true);} });
    var s=tl.querySelector('[aria-selected="true"]')||tabs[0]; if(s) sel(s);
  });
  /* segmentado de escolha única */
  $$("[data-p4-seg]").forEach(function(g){ g.addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b||!g.contains(b)) return; $$("button",g).forEach(function(x){x.setAttribute("aria-pressed",x===b);}); }); });
  /* alternar (aria-pressed) */
  document.addEventListener("click",function(e){
    var t=e.target.closest("[data-alterna]"); if(t){ t.setAttribute("aria-pressed", t.getAttribute("aria-pressed")!=="true"); }
  });
  /* abrir / fechar / toast */
  document.addEventListener("click",function(e){
    var a=e.target.closest("[data-abrir]");
    if(a){ e.preventDefault(); var id=a.getAttribute("data-abrir"); var el=document.getElementById(id); if(el && !el.hidden){ fechar(); } else abrir(id,a); return; }
    if(e.target.closest("[data-fechar]") || (e.target.classList && e.target.classList.contains("lc-sobreposicao"))){ fechar(); }
    var t=e.target.closest("[data-toast]");
    if(t){ toast(t.getAttribute("data-toast"), t.hasAttribute("data-toast-desfazer")); }
    if(aberta && aberta.classList.contains("lc-menu") && !aberta.contains(e.target) && !e.target.closest("[data-abrir]")) fechar();
  });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape" && aberta){ fechar(); } });
  /* formulário com barra de salvar */
  $$("[data-p4-form]").forEach(function(f){
    var barra=$(".lc-barra-salvar",f) || document.getElementById(f.getAttribute("data-p4-form")); if(!barra) return;
    var alterados={}, msg=$(".lc-barra-salvar__msg span",barra), nome=f.getAttribute("data-p4-nome")||"este registro";
    barra.hidden=true;
    var conta=function(){ var n=Object.keys(alterados).length; barra.hidden=!n;
      if(msg) msg.innerHTML='<b>'+n+(n===1?' alteração não salva':' alterações não salvas')+'</b> em '+nome+': '+Object.keys(alterados).map(function(k){return alterados[k];}).join(", "); };
    var marca=function(e){ var c=e.target; if(!c.matches("input,select,textarea,[contenteditable]")||barra.contains(c)) return;
      var r=c.getAttribute("data-rotulo")||(c.id&&$('label[for="'+c.id+'"]',f)?$('label[for="'+c.id+'"]',f).textContent.replace("*","").trim():c.getAttribute("aria-label")||"campo");
      alterados[c.id||r]=r.toLowerCase(); conta(); };
    f.addEventListener("input",marca); f.addEventListener("change",marca);
    $$("[data-descartar]",barra).forEach(function(b){ b.addEventListener("click",function(){ alterados={}; if(f.tagName==="FORM") f.reset(); conta(); toast("Alterações descartadas."); }); });
    $$("[data-salvar]",barra).forEach(function(b){ b.addEventListener("click",function(){ b.setAttribute("aria-busy","true"); setTimeout(function(){ b.removeAttribute("aria-busy"); alterados={}; conta(); toast(b.getAttribute("data-salvar")||"Alterações salvas.",true); },700); }); });
  });
  /* seleção em massa */
  $$("[data-p4-massa]").forEach(function(tab){
    var barra=document.getElementById(tab.getAttribute("data-p4-massa")), filtros=document.getElementById(tab.getAttribute("data-p4-filtros")||"");
    var todos=$("thead input[type=checkbox]",tab);
    var atualiza=function(){ var cs=$$("tbody input[type=checkbox]",tab), n=cs.filter(function(c){return c.checked;}).length;
      cs.forEach(function(c){ var tr=c.closest("tr"); if(tr) tr.setAttribute("aria-selected",c.checked); });
      if(barra){ barra.hidden=!n; var b=$("[data-conta]",barra); if(b) b.textContent=n+(n===1?" selecionado":" selecionados"); }
      if(filtros) filtros.hidden=!!n;
      if(todos){ todos.checked=n&&n===cs.length; todos.indeterminate=n>0&&n<cs.length; } };
    tab.addEventListener("change",function(e){ if(e.target===todos){ $$("tbody input[type=checkbox]",tab).forEach(function(c){c.checked=todos.checked;}); } atualiza(); });
    if(barra) $$("[data-limpar]",barra).forEach(function(b){ b.addEventListener("click",function(){ $$("input[type=checkbox]",tab).forEach(function(c){c.checked=false;}); atualiza(); }); });
    atualiza();
  });
  /* dica de gráfico */
  var dica=null;
  var mostra=function(el,x,y){ if(!dica){ dica=document.createElement("div"); dica.className="lc-graf-dica"; dica.setAttribute("aria-hidden","true"); document.body.appendChild(dica);} dica.innerHTML=el.getAttribute("data-dado"); dica.hidden=false;
    var w=dica.offsetWidth; dica.style.left=Math.max(8,Math.min(window.innerWidth-w-8,x-w/2))+"px"; dica.style.top=(y-40)+"px"; };
  document.addEventListener("mousemove",function(e){ var el=e.target.closest&&e.target.closest("[data-dado]"); if(el) mostra(el,e.clientX,e.clientY); else if(dica) dica.hidden=true; });
  document.addEventListener("focusin",function(e){ var el=e.target.closest&&e.target.closest("[data-dado]"); if(el){ var r=el.getBoundingClientRect(); mostra(el,r.left+r.width/2,r.top); } else if(dica) dica.hidden=true; });
}
window.P4={toast:toast,abrir:abrir,fechar:fechar,TELAS:TELAS};
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar); else iniciar();
})();
