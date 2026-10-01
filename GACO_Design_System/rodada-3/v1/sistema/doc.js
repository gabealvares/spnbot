/* GACO V1 — doc.js: índice com seção atual e controles de tema das páginas de documentação. */
(function(){
"use strict";
function iniciar(){
  var ind = document.querySelector(".lc-doc-indice ol");
  var secs = document.querySelectorAll(".lc-doc-sec[id]");
  if(ind && !ind.children.length){
    secs.forEach(function(s){ var h=s.querySelector("h2"); if(!h) return;
      var li=document.createElement("li"); li.innerHTML='<a href="#'+s.id+'">'+h.textContent+'</a>'; ind.appendChild(li); });
  }
  if("IntersectionObserver" in window && ind){
    var links = ind.querySelectorAll("a");
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){
      links.forEach(function(a){ a.setAttribute("aria-current", a.getAttribute("href")==="#"+e.target.id ? "true":"false"); }); } }); },{rootMargin:"-30% 0px -60% 0px"});
    secs.forEach(function(s){io.observe(s);});
  }
  document.querySelectorAll("[data-doc-tema]").forEach(function(g){
    var marcar=function(){ var t=document.documentElement.getAttribute("data-tema")||"claro"; g.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-v")===t);}); };
    g.addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b) return; if(window.LCMarca) LCMarca.tema(b.getAttribute("data-v")); else document.documentElement.setAttribute("data-tema",b.getAttribute("data-v")); marcar(); });
    document.addEventListener("lc:tema",marcar); marcar();
  });
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar); else iniciar();
})();
