/* =====================================================================
   GACO V1 "Livro-Caixa" — marca.js
   White label + tema + densidade, persistidos em localStorage (com try/catch).
   Carregue no <head> SEM defer: aplica tema, densidade e marca antes da pintura.

   Derivação da cor do cliente (nesta ordem, parando no primeiro passo que resolve):
     1. Distância das cores de estado: ΔE2000 ≥ 14 do verde, âmbar, vermelho e ardósia
        (ponto e texto). Se ficar perto, gira o matiz para longe, em passos de 6°, até 60°.
     2. Texto sobre a marca: branco se der 4,5:1; senão tinta (#1B2023) se der 4,5:1;
        senão escurece (claro) ou clareia (escuro) a luminosidade até branco dar 4,5:1.
     3. Tema escuro: a marca precisa de 3:1 contra a superfície (#1B201E) para o botão
        não sumir; se não tiver, clareia e recalcula o texto.
     4. --marca-forte = luminosidade −8 (claro) ou +8 (escuro); --marca-suave = 10% sobre a folha.
   API: window.LCMarca = { CLIENTES, aplicar(idOuObjeto), derivar(hex, tema), tema(t), densidade(d),
                           atual(), montarSeletor(el), contraste(a,b), deltaE(a,b) }
   Auto-monta todo elemento com [data-lc-seletor-marca].
   ===================================================================== */
(function(){
"use strict";
var CLIENTES = [
  {id:"alpha", nome:"Administradora Alpha", sigla:"A", cor:"#0E5E6F", cidade:"São Paulo"},
  {id:"orbita",nome:"Órbita Condomínios",   sigla:"Ó", cor:"#7A2E3A", cidade:"Campinas"},
  {id:"sol",   nome:"Sol Nascente Gestão",  sigla:"S", cor:"#E08A1E", cidade:"Ribeirão Preto"}
];
var ESTADOS = {
  claro:{ "verde de sucesso":["#1E6B45","#2C7C55"], "âmbar de aviso":["#8A5A00","#C48D1F"], "vermelho de perigo":["#B42318","#C33A2D"], "ardósia de informação":["#3B5873","#4C6C87"] },
  escuro:{ "verde de sucesso":["#7CC79E","#5FB386"], "âmbar de aviso":["#E6B35E","#D9A040"], "vermelho de perigo":["#F28B80","#E8685B"], "ardósia de informação":["#A1BBD2","#86A3BE"] }
};
var TINTA = "#1B2023", BRANCO = "#FFFFFF", SUP_ESCURO = "#1B201E", LIMIAR_DE = 14;

/* ---------------- cor ---------------- */
function hex2rgb(h){ h=h.replace("#",""); if(h.length===3) h=h.split("").map(function(c){return c+c;}).join(""); return [0,2,4].map(function(i){return parseInt(h.substr(i,2),16);}); }
function rgb2hex(r){ return "#"+r.map(function(v){ v=Math.max(0,Math.min(255,Math.round(v))); return v.toString(16).padStart(2,"0"); }).join("").toUpperCase(); }
function lin(c){ c/=255; return c<=0.04045? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
function delin(c){ c = c<=0.0031308? 12.92*c : 1.055*Math.pow(c,1/2.4)-0.055; return c*255; }
function lum(hex){ var r=hex2rgb(hex).map(lin); return 0.2126*r[0]+0.7152*r[1]+0.0722*r[2]; }
function contraste(a,b){ var x=lum(a), y=lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
function rgb2lab(hex){
  var r=hex2rgb(hex).map(lin);
  var X=(r[0]*0.4124+r[1]*0.3576+r[2]*0.1805)/0.95047, Y=(r[0]*0.2126+r[1]*0.7152+r[2]*0.0722), Z=(r[0]*0.0193+r[1]*0.1192+r[2]*0.9505)/1.08883;
  var f=function(t){return t>0.008856? Math.cbrt(t) : 7.787*t+16/116;};
  var fx=f(X), fy=f(Y), fz=f(Z); return [116*fy-16, 500*(fx-fy), 200*(fy-fz)];
}
function lab2hex(L,a,b){
  var fy=(L+16)/116, fx=fy+a/500, fz=fy-b/200;
  var inv=function(t){ var t3=t*t*t; return t3>0.008856? t3 : (t-16/116)/7.787; };
  var X=inv(fx)*0.95047, Y=inv(fy), Z=inv(fz)*1.08883;
  var r= 3.2406*X-1.5372*Y-0.4986*Z, g=-0.9689*X+1.8758*Y+0.0415*Z, bb=0.0557*X-0.2040*Y+1.0570*Z;
  return rgb2hex([r,g,bb].map(function(c){return delin(Math.max(0,Math.min(1,c)));}));
}
function lch(hex){ var l=rgb2lab(hex); return [l[0], Math.sqrt(l[1]*l[1]+l[2]*l[2]), (Math.atan2(l[2],l[1])*180/Math.PI+360)%360]; }
function deLch(L,C,H){ var h=H*Math.PI/180; return lab2hex(L, C*Math.cos(h), C*Math.sin(h)); }
function deltaE(h1,h2){ /* CIEDE2000 */
  var a=rgb2lab(h1), b=rgb2lab(h2), L1=a[0],a1=a[1],b1=a[2],L2=b[0],a2=b[1],b2=b[2];
  var rad=Math.PI/180, C1=Math.hypot(a1,b1), C2=Math.hypot(a2,b2), Cm=(C1+C2)/2;
  var G=0.5*(1-Math.sqrt(Math.pow(Cm,7)/(Math.pow(Cm,7)+Math.pow(25,7))));
  var a1p=a1*(1+G), a2p=a2*(1+G), C1p=Math.hypot(a1p,b1), C2p=Math.hypot(a2p,b2);
  var h1p=(Math.atan2(b1,a1p)/rad+360)%360, h2p=(Math.atan2(b2,a2p)/rad+360)%360;
  var dL=L2-L1, dC=C2p-C1p, dh=h2p-h1p; if(C1p*C2p===0) dh=0; else if(dh>180) dh-=360; else if(dh<-180) dh+=360;
  var dH=2*Math.sqrt(C1p*C2p)*Math.sin(dh*rad/2);
  var Lm=(L1+L2)/2, Cmp=(C1p+C2p)/2, hm=h1p+h2p;
  if(C1p*C2p!==0){ hm = Math.abs(h1p-h2p)>180 ? (h1p+h2p+(h1p+h2p<360?360:-360))/2 : (h1p+h2p)/2; }
  var T=1-0.17*Math.cos((hm-30)*rad)+0.24*Math.cos(2*hm*rad)+0.32*Math.cos((3*hm+6)*rad)-0.20*Math.cos((4*hm-63)*rad);
  var dTh=30*Math.exp(-Math.pow((hm-275)/25,2)), Rc=2*Math.sqrt(Math.pow(Cmp,7)/(Math.pow(Cmp,7)+Math.pow(25,7)));
  var Sl=1+0.015*Math.pow(Lm-50,2)/Math.sqrt(20+Math.pow(Lm-50,2)), Sc=1+0.045*Cmp, Sh=1+0.015*Cmp*T, Rt=-Math.sin(2*dTh*rad)*Rc;
  return Math.sqrt(Math.pow(dL/Sl,2)+Math.pow(dC/Sc,2)+Math.pow(dH/Sh,2)+Rt*(dC/Sc)*(dH/Sh));
}
function maisProximo(hex,tema){
  var m={nome:"",de:1e9,ref:""}, E=ESTADOS[tema];
  Object.keys(E).forEach(function(k){ E[k].forEach(function(c){ var d=deltaE(hex,c); if(d<m.de) m={nome:k,de:d,ref:c}; }); });
  return m;
}
function fmt(n,d){ return n.toFixed(d==null?1:d).replace(".",","); }

function derivar(hex, tema){
  tema = tema==="escuro" ? "escuro" : "claro";
  hex = rgb2hex(hex2rgb(hex));
  var ajustes=[], cor=hex, p=lch(cor);
  // 1. distância das cores de estado
  var prox = maisProximo(cor,tema);
  if(prox.de < LIMIAR_DE){
    var hEst=lch(prox.ref)[2], sentido = (((p[2]-hEst)+540)%360-180)>=0 ? 1 : -1, giro=0, cand=cor;
    while(giro<60){ giro+=6; cand=deLch(p[0],p[1],(p[2]+sentido*giro+360)%360); if(maisProximo(cand,tema).de>=LIMIAR_DE) break; }
    ajustes.push("Ficava a ΔE "+fmt(prox.de)+" do "+prox.nome+"; o matiz girou "+giro+"° para se afastar.");
    cor=cand; p=lch(cor);
  }
  // 3. tema escuro: 3:1 contra a superfície
  if(tema==="escuro"){
    var k=0; while(contraste(cor,SUP_ESCURO)<3 && k<40){ p[0]+=2; cor=deLch(p[0],p[1],p[2]); k++; }
    if(k) ajustes.push("No tema escuro, clareada até 3:1 contra a superfície ("+fmt(contraste(cor,SUP_ESCURO))+":1).");
  }
  // 2. texto sobre a marca
  var txt=BRANCO;
  if(contraste(cor,BRANCO)>=4.5) txt=BRANCO;
  else if(contraste(cor,TINTA)>=4.5){ txt=TINTA; ajustes.push("Texto branco daria "+fmt(contraste(cor,BRANCO))+":1; o texto sobre a marca passa a ser tinta ("+fmt(contraste(cor,TINTA))+":1), sem escurecer a cor."); }
  else { var j=0; while(contraste(cor,BRANCO)<4.5 && j<60){ p[0]-=1.5; cor=deLch(p[0],p[1],p[2]); j++; } ajustes.push("Escurecida até o texto branco dar "+fmt(contraste(cor,BRANCO))+":1."); }
  var pl=lch(cor);
  var forte = deLch(pl[0]+(tema==="escuro"?8:-8)*(txt===TINTA&&tema!=="escuro"?-0.6:1), pl[1], pl[2]);
  var folha = tema==="escuro" ? SUP_ESCURO : BRANCO;
  var mix = function(a,b,t){ var x=hex2rgb(a), y=hex2rgb(b); return rgb2hex(x.map(function(v,i){return v*t+y[i]*(1-t);})); };
  var fim = maisProximo(cor,tema);
  return { enviada:hex, marca:cor, txt:txt, forte:forte, suave:mix(cor,folha,0.10), contraste:contraste(cor,txt),
           contrasteSup:contraste(cor,folha), estadoProximo:fim.nome, deltaE:fim.de, ajustes:ajustes, semAjuste:!ajustes.length };
}

/* ---------------- persistência ---------------- */
function ler(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function gravar(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
var raiz = document.documentElement, ATUAL = null;
function temaEfetivo(){ var t=raiz.getAttribute("data-tema")||"claro"; if(t==="sistema") return (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches)?"escuro":"claro"; return t; }
function aplicar(c){
  if(typeof c==="string") c = CLIENTES.filter(function(x){return x.id===c;})[0] || CLIENTES[0];
  ATUAL = c; var d = derivar(c.cor, temaEfetivo());
  raiz.style.setProperty("--marca",d.marca); raiz.style.setProperty("--marca-txt",d.txt);
  raiz.style.setProperty("--marca-forte",d.forte); raiz.style.setProperty("--marca-suave",d.suave);
  if(c.id) gravar("lc-marca",c.id); else gravar("lc-marca-livre",JSON.stringify(c));
  var pinta=function(){
    document.querySelectorAll("[data-marca-sigla]").forEach(function(e){e.textContent=c.sigla;});
    document.querySelectorAll("[data-marca-nome]").forEach(function(e){e.textContent=c.nome;});
    document.querySelectorAll(".lc-trilho__marca").forEach(function(e){e.setAttribute("aria-label",c.nome+", início");});
    document.dispatchEvent(new CustomEvent("lc:marca",{detail:{cliente:c,derivada:d}}));
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",pinta); else pinta();
  return d;
}
function tema(t){ raiz.setAttribute("data-tema",t); gravar("lc-tema",t); if(ATUAL) aplicar(ATUAL); document.dispatchEvent(new CustomEvent("lc:tema",{detail:t})); }
function densidade(d){ if(d==="padrao") raiz.removeAttribute("data-densidade"); else raiz.setAttribute("data-densidade",d); gravar("lc-densidade",d); }

/* aplica já, antes da pintura (parâmetros de URL ganham da preferência: ?tema=escuro&marca=orbita) */
var q = {}; try{ location.search.replace(/^\?/,"").split("&").forEach(function(p){ var kv=p.split("="); if(kv[0]) q[kv[0]]=decodeURIComponent(kv[1]||""); }); }catch(e){}
raiz.setAttribute("data-tema", q.tema || ler("lc-tema") || raiz.getAttribute("data-tema") || "claro");
var dz = q.densidade || ler("lc-densidade"); if(dz && dz!=="padrao") raiz.setAttribute("data-densidade",dz);
var mid = q.marca || ler("lc-marca") || "alpha";
aplicar(CLIENTES.filter(function(x){return x.id===mid;})[0] || CLIENTES[0]);
if(window.matchMedia) try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){ if(raiz.getAttribute("data-tema")==="sistema" && ATUAL) aplicar(ATUAL); }); }catch(e){}

/* ---------------- seletor com prévia ---------------- */
function montarSeletor(el){
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});};
  el.innerHTML =
    '<div class="lc-pilha lc-pilha--p">'+
    '<div class="lc-rotulo" id="lcs-m">Marca do cliente</div>'+
    '<div class="lc-seg" role="group" aria-labelledby="lcs-m" data-s="marca">'+CLIENTES.map(function(c){return '<button type="button" data-id="'+c.id+'"><span style="width:12px;height:12px;background:'+c.cor+';display:inline-block;border-radius:2px"></span>'+esc(c.nome)+'</button>';}).join("")+'</div>'+
    '<div class="lc-linha"><label class="lc-rotulo" for="lcs-livre">Testar outra cor</label><input id="lcs-livre" type="color" value="#0E5E6F" style="width:44px;height:32px;padding:0;border:1px solid var(--borda-controle);border-radius:3px;background:var(--sup-1)"><span class="lc-legenda">Escolha qualquer cor para ver a derivação.</span></div>'+
    '<div class="lc-rotulo" id="lcs-t">Tema</div><div class="lc-seg" role="group" aria-labelledby="lcs-t" data-s="tema">'+
      [["claro","Claro"],["escuro","Escuro"],["sistema","Sistema"]].map(function(t){return '<button type="button" data-v="'+t[0]+'">'+t[1]+'</button>';}).join("")+'</div>'+
    '<div class="lc-rotulo" id="lcs-d">Densidade</div><div class="lc-seg" role="group" aria-labelledby="lcs-d" data-s="dens">'+
      [["compacta","Compacta"],["padrao","Padrão"],["confortavel","Confortável"]].map(function(t){return '<button type="button" data-v="'+t[0]+'">'+t[1]+'</button>';}).join("")+'</div>'+
    '<div class="lc-caixa" style="margin-top:6px"><div class="lc-caixa__corpo" style="padding-top:14px">'+
      '<div class="lc-linha" style="gap:12px;margin-bottom:12px"><span class="lc-ladrilho lc-ladrilho--marca lc-ladrilho--40" data-marca-sigla>A</span>'+
      '<button type="button" class="lc-btn lc-btn--principal">Salvar alterações</button><span class="lc-dividido"><button type="button" class="lc-btn lc-btn--principal">Salvar</button><button type="button" class="lc-btn lc-btn--principal" aria-label="Mais opções de salvar"><svg class="lc-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></span>'+
      '<span class="lc-estado lc-estado--sucesso">Pago</span><span class="lc-estado lc-estado--aviso">Esfriando</span><span class="lc-estado lc-estado--perigo">Vencido</span><span class="lc-contador">7</span></div>'+
      '<div class="lc-topo-portal" style="border-radius:3px"><div class="lc-topo-portal__linha"><span class="lc-topo-portal__logo" data-marca-sigla>A</span><span class="lc-topo-portal__nome" data-marca-nome>Administradora Alpha</span></div><div class="lc-topo-portal__unidade">Cond. Parque das Águas, bloco B, apto 1204</div></div>'+
      '<div class="lc-legenda" style="margin-top:12px" aria-live="polite" data-s="leitura"></div></div></div></div>';
  var leitura = el.querySelector('[data-s="leitura"]');
  function marcar(){
    var c=ATUAL, d=derivar(c.cor,temaEfetivo());
    el.querySelectorAll('[data-s="marca"] button').forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-id")===c.id);});
    el.querySelectorAll('[data-s="tema"] button').forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-v")===(raiz.getAttribute("data-tema")||"claro"));});
    el.querySelectorAll('[data-s="dens"] button').forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-v")===(raiz.getAttribute("data-densidade")||"padrao"));});
    el.querySelectorAll("[data-marca-sigla]").forEach(function(e){e.textContent=c.sigla;});
    el.querySelectorAll("[data-marca-nome]").forEach(function(e){e.textContent=c.nome;});
    leitura.innerHTML = '<b style="color:var(--texto-1)">'+esc(c.nome)+'</b>: cor enviada <b style="color:var(--texto-1)">'+d.enviada+'</b>, aplicada <b style="color:var(--texto-1)">'+d.marca+'</b> no tema '+temaEfetivo()+'. '+
      'Texto sobre a marca '+(d.txt===BRANCO?"branco":"tinta")+', '+fmt(d.contraste)+':1. Estado mais próximo: '+d.estadoProximo+', ΔE '+fmt(d.deltaE)+'. '+
      (d.semAjuste? 'Usada sem ajuste.' : d.ajustes.join(" "));
  }
  el.querySelector('[data-s="marca"]').addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b) return; aplicar(b.getAttribute("data-id")); marcar(); });
  el.querySelector('[data-s="tema"]').addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b) return; tema(b.getAttribute("data-v")); marcar(); });
  el.querySelector('[data-s="dens"]').addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b) return; densidade(b.getAttribute("data-v")); marcar(); });
  el.querySelector("#lcs-livre").addEventListener("input",function(e){ aplicar({id:"",nome:"Cor de teste",sigla:"T",cor:e.target.value}); marcar(); });
  marcar();
}
window.LCMarca = {CLIENTES:CLIENTES, aplicar:aplicar, derivar:derivar, tema:tema, densidade:densidade, atual:function(){return ATUAL;},
                  montarSeletor:montarSeletor, contraste:contraste, deltaE:deltaE, temaEfetivo:temaEfetivo};
function iniciar(){ document.querySelectorAll("[data-lc-seletor-marca]").forEach(montarSeletor); }
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar); else iniciar();
})();
