/* =====================================================================
   GACO V2 "Casa de Máquinas" · marca.js
   Tema, densidade e marca do cliente (white label), com derivação de contraste.
   Carregue no <head> (sem defer) para não piscar o tema:
     <script src="sistema/marca.js"></script>
   Aceita na URL: ?theme=dark|light  ?brand=alpha|lar|vertice  ?densidade=compacta|padrao|confortavel  ?cor=%23RRGGBB
   Guarda a escolha da pessoa em localStorage (com try/catch; sem armazenamento, só não lembra).
   API:
     cmAplicarTema('dark'|'light'|'sistema')
     cmAplicarDensidade('compacta'|'padrao'|'confortavel')
     cmAplicarMarca('alpha'|'lar'|'vertice'|{nome:'…', cor:'#RRGGBB', inicial:'X', logo:'url'})
     cmAvaliarMarca('#RRGGBB') -> { cor, sobre, contrasteSobre, tintaEscuro, tintaClaro, suaveEscuro, suaveClaro, conflitos:[…], parecer }
     cmContraste('#a','#b') -> número
   Widget: <div data-cm-seletor></div> desenha Marca · Tema · Densidade (usado nas páginas do sistema).
   Eventos: document 'cm:tema', 'cm:marca', 'cm:densidade'.
   ===================================================================== */
(function(){
  var html=document.documentElement;
  var CLIENTES={
    alpha:{nome:'Administradora Alpha',inicial:'A',cor:'#1E5F74',cidade:'São Paulo'},
    lar:{nome:'Lar Gestão Condominial',inicial:'L',cor:'#2F6B3F',cidade:'Belo Horizonte'},
    vertice:{nome:'Vértice Condomínios',inicial:'V',cor:'#7A2E3A',cidade:'Curitiba'}
  };
  /* cores de estado do GACO, para medir conflito de matiz com a cor do cliente */
  var ESTADOS={perigo:'#B32B37',sucesso:'#1D774C',aviso:'#A84A0F',info:'#2A5A92',latao:'#C99D48'};
  var NOME_ESTADO={perigo:'vermelho de atraso',sucesso:'verde de concluído',aviso:'laranja de atenção',info:'azul de informação',latao:'latão de ação do GACO'};

  function ler(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function gravar(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function q(){try{return new URLSearchParams(location.search)}catch(e){return {get:function(){return null}}}}

  /* ---------- cor ---------- */
  function hexRgb(h){h=String(h).replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return [(n>>16)&255,(n>>8)&255,n&255]}
  function rgbHex(c){return '#'+c.map(function(v){v=Math.max(0,Math.min(255,Math.round(v)));return (v<16?'0':'')+v.toString(16)}).join('').toUpperCase()}
  function lum(h){var c=hexRgb(h).map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]}
  function contraste(a,b){var x=lum(a),y=lum(b);if(x<y){var t=x;x=y;y=t}return (x+0.05)/(y+0.05)}
  function misturar(a,b,t){var x=hexRgb(a),y=hexRgb(b);return rgbHex([0,1,2].map(function(i){return x[i]*(1-t)+y[i]*t}))}
  function hsl(h){var c=hexRgb(h).map(function(v){return v/255}),mx=Math.max.apply(0,c),mn=Math.min.apply(0,c),l=(mx+mn)/2,s=0,hh=0,d=mx-mn;
    if(d){s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===c[0]?((c[1]-c[2])/d+(c[1]<c[2]?6:0)):mx===c[1]?((c[2]-c[0])/d+2):((c[0]-c[1])/d+4);hh*=60}
    return [hh,s,l]}
  function ajustar(cor,alvo,fundo,min){var t=0,c=cor;while(contraste(c,fundo)<min&&t<1){t+=0.02;c=misturar(cor,alvo,t)}return c}

  function avaliar(cor){
    cor=rgbHex(hexRgb(cor));
    var branco='#FFFFFF',grafite='#15191B';
    var sobre=contraste(branco,cor)>=contraste(grafite,cor)?branco:grafite;
    var r={cor:cor,sobre:sobre,contrasteSobre:+contraste(sobre,cor).toFixed(2),
      tintaEscuro:ajustar(cor,'#FFFFFF','#181C1F',4.5),tintaClaro:ajustar(cor,'#000000','#FFFFFF',4.5),
      suaveEscuro:misturar(cor,'#181C1F',0.78),suaveClaro:misturar(cor,'#FFFFFF',0.88),conflitos:[]};
    var hc=hsl(cor);
    Object.keys(ESTADOS).forEach(function(k){
      var he=hsl(ESTADOS[k]),d=Math.abs(hc[0]-he[0]);d=Math.min(d,360-d);
      if(hc[1]>0.22&&d<20) r.conflitos.push({com:k,nome:NOME_ESTADO[k],distancia:Math.round(d)});
    });
    var p=[];
    if(r.contrasteSobre<4.5) p.push('O texto sobre a marca fica com '+r.contrasteSobre.toFixed(1)+':1; o GACO escurece a cor do botão do portal até 4,5:1.');
    r.conflitos.forEach(function(c){p.push('A cor está a '+c.distancia+'° do '+c.nome+'. A marca nunca pinta estado, e o estado sempre leva ícone e palavra; mantemos a cor e avisamos o cliente.')});
    if(!p.length) p.push('Cor aceita sem ajuste: contraste '+r.contrasteSobre.toFixed(1)+':1 e longe das cores de estado.');
    r.parecer=p;
    return r;
  }

  /* ---------- aplicar ---------- */
  function emitir(nome,det){try{document.dispatchEvent(new CustomEvent(nome,{detail:det}))}catch(e){}}
  var temaAtual='dark',marcaAtual='alpha',densAtual='compacta';
  var mq=window.matchMedia?window.matchMedia('(prefers-color-scheme: light)'):null;
  function aplicarTema(t,salvar){
    if(t!=='dark'&&t!=='light'&&t!=='sistema') t='dark';
    var efetivo=t==='sistema'?(mq&&mq.matches?'light':'dark'):t;
    html.setAttribute('data-theme',efetivo);html.setAttribute('data-tema-escolha',t);temaAtual=t;
    if(salvar!==false) gravar('cm-v2-tema',t);
    marcar();emitir('cm:tema',{tema:efetivo,escolha:t});
  }
  function aplicarDensidade(d,salvar){
    if(['compacta','padrao','confortavel'].indexOf(d)<0) d='compacta';
    html.setAttribute('data-densidade',d);densAtual=d;
    if(salvar!==false) gravar('cm-v2-densidade',d);
    marcar();emitir('cm:densidade',{densidade:d});
  }
  var PROPS=['--cm-marca','--cm-marca-sobre','--cm-marca-tinta-escuro','--cm-marca-tinta-claro','--cm-marca-suave-escuro','--cm-marca-suave-claro'];
  function aplicarMarca(m,salvar){
    var dados;
    if(typeof m==='string'&&CLIENTES[m]){
      dados=CLIENTES[m];html.setAttribute('data-brand',m);marcaAtual=m;
      PROPS.forEach(function(p){html.style.removeProperty(p)});
    } else if(m&&m.cor){
      dados={nome:m.nome||'Cliente',inicial:(m.inicial||(m.nome||'C').charAt(0)).toUpperCase(),cor:m.cor,logo:m.logo};
      var a=avaliar(m.cor);html.setAttribute('data-brand','livre');marcaAtual='livre';
      html.style.setProperty('--cm-marca',a.cor);html.style.setProperty('--cm-marca-sobre',a.sobre);
      html.style.setProperty('--cm-marca-tinta-escuro',a.tintaEscuro);html.style.setProperty('--cm-marca-tinta-claro',a.tintaClaro);
      html.style.setProperty('--cm-marca-suave-escuro',a.suaveEscuro);html.style.setProperty('--cm-marca-suave-claro',a.suaveClaro);
    } else { return aplicarMarca('alpha',salvar); }
    window.CM_MARCA=dados;
    if(salvar!==false&&typeof m==='string') gravar('cm-v2-marca',m);
    preencher();marcar();emitir('cm:marca',{chave:marcaAtual,dados:dados});
  }
  function preencher(){
    var d=window.CM_MARCA||CLIENTES.alpha;
    var ns=document.querySelectorAll('[data-marca-nome]');for(var i=0;i<ns.length;i++) ns[i].textContent=d.nome;
    var is=document.querySelectorAll('[data-marca-inicial]');for(var j=0;j<is.length;j++){ if(d.logo){is[j].innerHTML='<img alt="" src="'+d.logo+'">'} else is[j].textContent=d.inicial }
  }

  /* ---------- seletor (páginas do sistema) ---------- */
  function seg(rotulo,attr,opcoes,atual){
    return '<div class="cm-linha" style="gap:6px"><span class="cm-t-legenda">'+rotulo+'</span><div class="cm-segmentado cm-segmentado--p" role="group" aria-label="'+rotulo+'">'+
      opcoes.map(function(o){return '<button type="button" '+attr+'="'+o[0]+'" aria-pressed="'+(o[0]===atual)+'">'+o[1]+'</button>'}).join('')+'</div></div>';
  }
  function desenharSeletores(){
    var els=document.querySelectorAll('[data-cm-seletor]');
    for(var i=0;i<els.length;i++){
      var el=els[i];
      el.classList.add('cm-linha','cm-linha--quebra');el.style.gap='16px';
      el.innerHTML=seg('Cliente','data-cm-marca',[['alpha','Alpha'],['lar','Lar'],['vertice','Vértice']],marcaAtual)+
        seg('Tema','data-cm-tema',[['dark','Escuro'],['light','Claro']],html.getAttribute('data-theme'))+
        (el.hasAttribute('data-sem-densidade')?'':seg('Densidade','data-cm-densidade',[['compacta','Compacta'],['padrao','Padrão'],['confortavel','Confortável']],densAtual));
    }
  }
  function marcar(){
    var b=document.querySelectorAll('[data-cm-marca]');for(var i=0;i<b.length;i++) b[i].setAttribute('aria-pressed',b[i].getAttribute('data-cm-marca')===marcaAtual);
    var t=document.querySelectorAll('[data-cm-tema]');for(var j=0;j<t.length;j++) t[j].setAttribute('aria-pressed',t[j].getAttribute('data-cm-tema')===(temaAtual==='sistema'?temaAtual:html.getAttribute('data-theme')));
    var d=document.querySelectorAll('[data-cm-densidade]');for(var k=0;k<d.length;k++) d[k].setAttribute('aria-pressed',d[k].getAttribute('data-cm-densidade')===densAtual);
  }
  document.addEventListener('click',function(e){
    var x=e.target.closest&&e.target.closest('[data-cm-marca],[data-cm-tema],[data-cm-densidade]');
    if(!x) return;
    if(x.hasAttribute('data-cm-marca')) aplicarMarca(x.getAttribute('data-cm-marca'));
    else if(x.hasAttribute('data-cm-tema')) aplicarTema(x.getAttribute('data-cm-tema'));
    else aplicarDensidade(x.getAttribute('data-cm-densidade'));
  });
  if(mq&&mq.addEventListener) mq.addEventListener('change',function(){if(temaAtual==='sistema') aplicarTema('sistema',false)});

  /* ---------- início: URL > preferência guardada > padrão do contexto ---------- */
  var p=q();
  var ctx=html.getAttribute('data-contexto')||'interno';
  var temaPadrao=html.getAttribute('data-theme')||(ctx==='portal'?'light':'dark');
  var t=p.get('theme')||p.get('tema')||ler('cm-v2-tema')||temaPadrao;
  aplicarTema(t,false);
  var dens=p.get('densidade')||ler('cm-v2-densidade')||(html.getAttribute('data-densidade')||'compacta');
  aplicarDensidade(dens,false);
  var cor=p.get('cor');
  if(cor) aplicarMarca({nome:p.get('nome')||'Cliente',cor:cor.charAt(0)==='#'?cor:'#'+cor},false);
  else aplicarMarca(p.get('brand')||p.get('marca')||ler('cm-v2-marca')||html.getAttribute('data-brand')||'alpha',false);

  window.CM_CLIENTES=CLIENTES;
  window.cmAplicarTema=aplicarTema;window.cmAplicarDensidade=aplicarDensidade;window.cmAplicarMarca=aplicarMarca;
  window.cmAvaliarMarca=avaliar;window.cmContraste=contraste;window.cmMisturar=misturar;
  function pronto(){preencher();desenharSeletores();marcar()}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',pronto); else pronto();
})();
