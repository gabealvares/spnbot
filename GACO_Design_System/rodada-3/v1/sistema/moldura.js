/* =====================================================================
   GACO V1 "Livro-Caixa" — moldura.js
   Gera a navegação da V1 a partir de data-moldura, para todas as telas ficarem idênticas.
   Interno: trilho de módulos (72 px, ícone + rótulo curto, contador, só os módulos do papel,
   favoritos, ajustes, recolher) + barra do módulo (seções com submenu de até 2 níveis, busca ⌘K,
   ajuda, sino, conta) + trilha. Tablet (<1024): trilho só ícone. Celular (<640): gaveta + barra inferior.
   Portal: topo na marca do cliente + abas no pé (celular) / barra superior (computador).
   Superadmin: trilho da plataforma + faixa de contexto quando está dentro de um cliente.

   Uso:
     <body data-moldura='{"modulo":"cs","secao":"Clientes","item":"Clientes","papel":"gerente-cs",
           "trilha":["Clientes","Cond. Parque das Águas"]}'>
       <main id="conteudo"> … </main>
     </body>
   Chaves: contexto ("interno"|"portal"|"superadmin"), modulo, secao, item, papel, trilha[],
   faixa {tipo:"superadmin"|"homologacao", cliente, motivo, prazo, leitura}, usuario {nome,cargo,iniciais,cor},
   cliente {nome, sigla}, contadores {modulo:n}, recolhido (bool), fixa (bool: área rola, moldura parada),
   acaoTrilha (html à direita da trilha), aberto ("cmdk"|"sino"|"conta"|"gaveta"|"<seção>") para documentação.
   API: window.LCMoldura = { MODULOS, PAPEIS, PORTAL, SUPERADMIN, montar(el), abrirBusca(), fechar() }
   ===================================================================== */
(function(){
"use strict";
var ic = function(n,c,r){ return window.lcIcone ? window.lcIcone(n,c,r) : '<i data-i="'+n+'"></i>'; };
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function slug(s){return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}

/* ------------------------------------------------------------------
   MAPA DE MÓDULOS → SEÇÕES (barra do módulo) → grupos/itens (submenu)
   Seção com "itens" ou "grupos" abre submenu; sem eles é link direto.
   Fonte: taxonomia do livro (menu.ts) reorganizada para a V1, com os termos do A5.
   ------------------------------------------------------------------ */
var MODULOS = {
  inicio:{nome:"Início",curto:"Início",icone:"casa",secoes:[
    {nome:"Mural"},{nome:"Para você"},{nome:"Minhas tarefas"},{nome:"Pessoas"},{nome:"Comunicados"},{nome:"Agenda"}]},
  suporte:{nome:"Suporte",curto:"Suporte",icone:"fone-atendimento",secoes:[
    {nome:"Conversas",grupos:[
      {titulo:"Filas",itens:[{t:"Minhas",n:7},{t:"Sem dono",n:3},"Esperando o cliente","Em espera","Todas"]},
      {titulo:"Por canal",itens:["WhatsApp","E-mail","Portal","Chat do site","Telefone"]}]},
    {nome:"Chamados",itens:["Todos os chamados","Incidentes","Problemas recorrentes","Lixeira"]},
    {nome:"Respostas rápidas"},
    {nome:"Central de ajuda",itens:["Artigos","Categorias","Assistente automático"]},
    {nome:"Acompanhamento",itens:["Painel do suporte","Métricas da equipe","Satisfação (CSAT)"]},
    {nome:"Configuração",grupos:[
      {titulo:"Atendimento",itens:["Filas","Equipes","Tipos de chamado","Prazos (SLA)","Horário de atendimento"]},
      {titulo:"Canais",itens:["WhatsApp","Caixas de e-mail","Chat do site"]}]}]},
  comercial:{nome:"Comercial",curto:"Comercial",icone:"aperto-de-maos",secoes:[
    {nome:"Funil"},
    {nome:"Negócios",itens:["Todos os negócios","Esfriando","Ganhos","Perdidos"]},
    {nome:"Leads",itens:["Leads","Distribuição de leads"]},
    {nome:"Propostas"},
    {nome:"Ritmo de vendas",itens:["Minhas atividades","Cadências","Passagem para o CS"]},
    {nome:"Metas e comissões",itens:["Previsão de vendas","Metas","Comissões","Aprovar comissões"]},
    {nome:"Configuração",grupos:[
      {titulo:"Contratos",itens:["Modelos de contrato","Assinaturas"]},
      {titulo:"Regras",itens:["Etapas do funil","Motivos de perda","Regras do Comercial"]}]}]},
  cs:{nome:"CS",curto:"CS",icone:"relacionamento",secoes:[
    {nome:"Minha carteira"},
    {nome:"Clientes",itens:["Clientes","Administradoras","Grupos econômicos","Entidades","Favorecidos"]},
    {nome:"Contratos",itens:["Contratos","Renovações","Negociações","Assinaturas","Modelos de documento"]},
    {nome:"Trabalho do CS",itens:[{t:"Minhas ações",n:3},"Alertas","Passagens recebidas","Escalações","Reuniões","Playbooks"]},
    {nome:"Saúde e jornada",itens:["Saúde do cliente","Jornada do cliente","Planos de sucesso","Implantações"]},
    {nome:"Voz do cliente",itens:["NPS","Respostas","CSAT e CES"]},
    {nome:"Gestão",grupos:[
      {titulo:"Resultado",itens:["Painel do gestor","Churn e retenção","NRR e GRR"]},
      {titulo:"Regras",itens:["Regras dos alertas","Configurar NPS"]}]}]},
  projetos:{nome:"Projetos",curto:"Projetos",icone:"quadro-kanban",secoes:[
    {nome:"Minhas tarefas"},
    {nome:"Projetos",itens:["Todos os projetos","Por cliente","Modelos de projeto"]},
    {nome:"Quadro"},{nome:"Cronograma"},{nome:"Calendário"},
    {nome:"Alocação da equipe"},
    {nome:"Configuração",itens:["Regras de Projetos","Etapas"]}]},
  operacoes:{nome:"Operações",curto:"Operações",icone:"chave-inglesa",secoes:[
    {nome:"Ordens de serviço",itens:["Todas as OS","Preventivas","Corretivas","Calendário de preventivas"]},
    {nome:"Reservas",itens:["Agenda de reservas","Áreas comuns reserváveis","Regras de uso"]},
    {nome:"Ativos",itens:["Áreas comuns","Equipamentos"]},
    {nome:"Suprimentos",itens:["Estoque","Compras"]},
    {nome:"Contratos",itens:["Contratos de fornecedor","Licenças e alvarás","Fornecedores"]}]},
  produto:{nome:"Produto",curto:"Produto",icone:"pacote",secoes:[
    {nome:"Demandas"},
    {nome:"Roteiro",itens:["Roteiro","Pacotes do roteiro"]},
    {nome:"Mudanças"},
    {nome:"Guias de produto"},
    {nome:"Base de conhecimento"}]},
  desenvolvimento:{nome:"Desenvolvimento",curto:"Dev",icone:"codigo",secoes:[
    {nome:"Sprints"},
    {nome:"Backlog"},
    {nome:"Bugs",itens:["Abertos","Por versão","Corrigidos"]},
    {nome:"QA formal"},
    {nome:"Versões"}]},
  financeiro:{nome:"Financeiro",curto:"Financeiro",icone:"carteira",secoes:[
    {nome:"Extrato"},
    {nome:"Contas a receber",itens:["Contas a receber","Boletos","Inadimplência","Rateios","Acordos"]},
    {nome:"Contas a pagar",itens:["Contas a pagar","Compras","Notas fiscais"]},
    {nome:"Conciliação"},
    {nome:"Análise",itens:["Fluxo de caixa","DRE","Comissões","Aprovar comissões","Prestação de contas"]},
    {nome:"Cadastros",itens:["Empresas","Contas bancárias","Categorias financeiras","Centros de custo","Fundos (reserva, obras)"]}]},
  academy:{nome:"Academy",curto:"Academy",icone:"capelo",secoes:[
    {nome:"Painel do aluno"},
    {nome:"Cursos",itens:["Meus cursos","Catálogo","Obrigatórios","Pendentes"]},
    {nome:"Calendário acadêmico"},
    {nome:"Boletim",itens:["Notas e frequência","Histórico escolar","Certificados"]},
    {nome:"Biblioteca",itens:["Biblioteca","Fórum","Eventos e webinars"]},
    {nome:"Docência",itens:["Diário de classe","Turmas que leciono","Treinamento por cliente"]},
    {nome:"Secretaria",itens:["Matrículas","Períodos letivos","Parâmetros"]}]},
  cultura:{nome:"Cultura",curto:"Cultura",icone:"pessoas",secoes:[
    {nome:"Pessoas",itens:["Pessoas","Equipes","Organograma","Meu perfil"]},
    {nome:"Mural",itens:["Mural","Comunicados","Reconhecimentos","Aniversariantes"]},
    {nome:"RH",grupos:[
      {titulo:"Solicitações",itens:["Minhas solicitações","Férias","Viagens","Fluxos de aprovação"]},
      {titulo:"Políticas e clima",itens:["Políticas","Pesquisas de clima","Desligamento"]}]},
    {nome:"Carreira e desenvolvimento",grupos:[
      {titulo:"Desenvolvimento",itens:["PDI","Plano de carreira","Reuniões 1:1"]},
      {titulo:"Desempenho",itens:["Avaliação de desempenho","Avaliação 360°","Calibração","Nine-box","Sucessão"]}]},
    {nome:"Recrutamento",itens:["Vagas","Pessoas candidatas","Entrevistas"]},
    {nome:"Cadastros",itens:["Cargos","Competências","Categorias de reconhecimento","Regras do RH"]}]},
  marketing:{nome:"Marketing",curto:"Marketing",icone:"megafone",secoes:[
    {nome:"Campanhas",itens:["Campanhas","Anúncios","Calendário editorial"]},
    {nome:"Leads",itens:["Leads","Segmentação","Lead scoring"]},
    {nome:"Site",grupos:[
      {titulo:"Páginas",itens:["Páginas","Landing pages","Formulários","Editor de página"]},
      {titulo:"Conteúdo",itens:["Modelos de página","Biblioteca de mídia","Visitas do site"]}]},
    {nome:"E-mail",itens:["Disparos de e-mail","Fluxos de automação","Modelos de e-mail","Saúde do envio"]},
    {nome:"Análise",itens:["Funil de marketing","Retorno das campanhas","Atribuição"]}]},
  relatorios:{nome:"Relatórios",curto:"Relatórios",icone:"grafico-colunas",secoes:[
    {nome:"Todos os relatórios"},{nome:"Favoritos"},{nome:"Painel executivo"},
    {nome:"Por módulo",grupos:[
      {titulo:"Financeiro",itens:["DRE","Fluxo de caixa","Inadimplência"]},
      {titulo:"Operação",itens:["Tarefas atrasadas","Chamados por condomínio","OS por fornecedor"]}]},
    {nome:"Agendados"},{nome:"Exportações"}]},
  configuracao:{nome:"Configuração",curto:"Ajustes",icone:"configuracoes",secoes:[
    {nome:"Empresa",itens:["Dados da empresa","Marca e aparência","Áreas","Produtos e planos"]},
    {nome:"Pessoas e acesso",itens:["Usuários","Papéis e permissões","Permissões por ação","Tipos de pessoa","Pessoas duplicadas"]},
    {nome:"Listas",itens:["Listas e opções","Etiquetas","Códigos","Termos do sistema"]},
    {nome:"Comunicação",itens:["Banners do Início","E-mail de envio (SMTP)","Sinais do suporte"]},
    {nome:"Integrações",itens:["Catálogo de integrações","Chaves de API","Webhooks","Importações","Inteligência artificial","Anúncios","Códigos externos"]},
    {nome:"Automação",itens:["Automações","Processos","Tarefas automáticas","Calendários de atendimento","Mecânica dos objetos"]},
    {nome:"Segurança",itens:["Log de auditoria","Sessões ativas","Dois fatores","Lixeira (30 dias)"]}]}
};
var ORDEM = ["inicio","suporte","comercial","cs","projetos","operacoes","financeiro","marketing","produto","desenvolvimento","academy","cultura","relatorios"];

/* Papéis → módulos no trilho (o trilho mostra só o que a pessoa pode abrir). Configuração fica no pé. */
var PAPEIS = {
  "atendente":      {nome:"Atendente de suporte",modulos:["inicio","suporte","academy","cultura"]},
  "gerente-cs":     {nome:"Gerente de CS",modulos:["inicio","cs","suporte","projetos","academy","cultura","relatorios"]},
  "vendedor":       {nome:"Vendedor",modulos:["inicio","comercial","marketing","academy","cultura"]},
  "financeiro":     {nome:"Analista financeiro",modulos:["inicio","financeiro","relatorios","academy","cultura"]},
  "operacoes":      {nome:"Coordenador de operações",modulos:["inicio","operacoes","suporte","financeiro","academy","cultura"]},
  "dev":            {nome:"Desenvolvedor",modulos:["inicio","produto","desenvolvimento","suporte","academy","cultura"]},
  "rh":             {nome:"Analista de RH",modulos:["inicio","cultura","academy","relatorios"]},
  "marketing":      {nome:"Analista de marketing",modulos:["inicio","marketing","comercial","academy","cultura","relatorios"]},
  "diretor":        {nome:"Diretoria",modulos:ORDEM.slice(),ajustes:true},
  "admin":          {nome:"Administrador",modulos:ORDEM.slice(),ajustes:true}
};

/* Portal do cliente final: abas no pé (até 5) + "Mais". Varia por papel. */
var PORTAL = {
  abas:[{t:"Início",ic:"casa"},{t:"Boletos",ic:"boleto"},{t:"Reservas",ic:"reserva"},{t:"Chamados",ic:"chamado-pelo-portal"},{t:"Mais",ic:"menu"}],
  mais:{
    morador:["Comunicados","Assembleias","Documentos","Encomendas","Visitantes","Cursos","Minha unidade","Perfil"],
    sindico:["Comunicados","Assembleias","Prestação de contas","Aprovações","Ordens de serviço","Moradores","Documentos","Cursos","Perfil"],
    conselheiro:["Prestação de contas","Pareceres","Assembleias","Comunicados","Documentos","Perfil"]
  }
};
/* Superadmin (plataforma) */
var SUPERADMIN = {nome:"Plataforma",modulos:[
  {id:"painel",nome:"Painel",icone:"painel",secoes:[{nome:"Visão geral"},{nome:"Chamados de clientes"},{nome:"Avisos da plataforma"}]},
  {id:"clientes",nome:"Clientes",icone:"conjunto-de-predios",secoes:[{nome:"Clientes da plataforma"},{nome:"Planos e cobrança",itens:["Planos","Faturas","Cupons"]},{nome:"Implantações"}]},
  {id:"sessoes",nome:"Sessões",icone:"sessao",secoes:[{nome:"Sessões de suporte"},{nome:"Pedidos de acesso"},{nome:"Histórico de acessos"}]},
  {id:"superadmins",nome:"Equipe",icone:"administrador",secoes:[{nome:"Superadmins"},{nome:"Papéis da plataforma"}]},
  {id:"saude",nome:"Saúde",icone:"atividade-grafico",secoes:[{nome:"Saúde do sistema"},{nome:"Filas e tarefas"},{nome:"Integrações"}]},
  {id:"versoes",nome:"Versões",icone:"homologacao",secoes:[{nome:"Versões"},{nome:"Homologação"},{nome:"Recursos por cliente"}]},
  {id:"auditoria",nome:"Auditoria",icone:"auditoria",secoes:[{nome:"Auditoria da plataforma"},{nome:"Exportações LGPD"}]}
]};
var CONTADORES_PADRAO = {suporte:7,cs:3,academy:1,inicio:0,projetos:0,financeiro:2,comercial:0};
var FAVORITOS = [{t:"Cond. Parque das Águas",s:"CS, cliente",ic:"condominio"},{t:"Chamado 4.812",s:"Suporte",ic:"chamado"},{t:"Boletos vencidos",s:"Financeiro, visão salva",ic:"boleto-vencido"}];
var RECENTES  = [{t:"Residencial Jardim Botânico",s:"CS, há 20 min",ic:"condominio"},{t:"Conversas: Minhas",s:"Suporte, há 1 h",ic:"conversas"},{t:"Rateio de outubro",s:"Financeiro, ontem",ic:"rateio"}];
var NOTIF = [
  {quem:"Marina Costa",av:"MC",c:"lc-av--c4",txt:"respondeu no <b>Chamado 4.812</b>: “A água voltou no bloco B?”",q:"há 3 min",nl:true,aba:"mencoes"},
  {quem:"Rafael Lima",av:"RL",c:"lc-av--c7",txt:"mencionou você em <b>Renovação do Parque das Águas</b>",q:"há 25 min",nl:true,aba:"mencoes"},
  {quem:"Sistema",ic:"prazo-estourado",txt:"<b>3 chamados</b> vencem o prazo de resposta até 11h",q:"há 40 min",nl:true,aba:"para-mim"},
  {quem:"Coordenação Academy",ic:"capelo",txt:"Nota de <b>Gestão de condomínios II</b> publicada",q:"ontem, 18:02",nl:false,aba:"para-mim"},
  {quem:"Paula Mendes",av:"PM",c:"lc-av--c3",txt:"reconheceu você no Mural: <b>Cliente no centro</b>",q:"ontem, 16:40",nl:false,aba:"todas"}
];

function papel(cfg){ return PAPEIS[cfg.papel] || PAPEIS["diretor"]; }
function itemTxt(it){ return typeof it==="string" ? it : it.t; }
function href(cfg,mod,sec,it){ return cfg.base ? cfg.base+"?m="+mod+"&s="+slug(sec)+(it?"&i="+slug(it):"") : "#"; }

/* ------------------------------ peças ------------------------------ */
function htmlFaixa(f){
  if(!f) return "";
  if(f.tipo==="homologacao") return '<div class="lc-faixa-contexto lc-faixa-contexto--homologacao" role="region" aria-label="Ambiente de homologação">'+
    '<span class="lc-faixa-contexto__item">'+ic("homologacao")+'<b>Homologação</b></span><span class="lc-faixa-contexto__item">Dados de teste. Nada aqui chega aos clientes.</span>'+
    (f.versao?'<span class="lc-faixa-contexto__item">Versão '+esc(f.versao)+'</span>':'')+
    '<span class="lc-faixa-contexto__fim"><a class="lc-btn lc-btn--p" href="#">Ir para produção</a></span></div>';
  return '<div class="lc-faixa-contexto" role="region" aria-label="Sessão de suporte da plataforma">'+
    '<span class="lc-faixa-contexto__item">'+ic("sessao")+'Você está em <b>'+esc(f.cliente||"Administradora Órbita")+'</b> como suporte da plataforma</span>'+
    '<span class="lc-faixa-contexto__item">'+ic(f.leitura===false?"editar":"ver")+(f.leitura===false?'Pode alterar dados':'Só leitura')+'</span>'+
    '<span class="lc-faixa-contexto__item">'+ic("relogio")+esc(f.prazo||"48 min restantes")+'</span>'+
    (f.motivo?'<span class="lc-faixa-contexto__item">Motivo: '+esc(f.motivo)+'</span>':'')+
    '<span class="lc-faixa-contexto__fim">'+(f.leitura!==false?'<button class="lc-btn lc-btn--p" type="button">Pedir permissão de alteração</button>':'')+
    '<button class="lc-btn lc-btn--p" type="button">Sair do cliente</button></span></div>';
}

function htmlTrilho(cfg){
  var p = papel(cfg), cont = Object.assign({},CONTADORES_PADRAO,cfg.contadores||{});
  var cli = cfg.cliente||{nome:"Administradora Alpha",sigla:"A"};
  var mods = cfg.contexto==="superadmin" ? SUPERADMIN.modulos.map(function(m){return m.id;}) : p.modulos;
  var h = '<nav class="lc-trilho" aria-label="Módulos">'+
    '<a class="lc-trilho__marca" href="'+(cfg.base?cfg.base:"#")+'" aria-label="'+esc(cfg.contexto==="superadmin"?"GACO Plataforma, início":cli.nome+", início")+'" data-marca-sigla>'+esc(cfg.contexto==="superadmin"?"G":cli.sigla)+'</a>'+
    '<ul class="lc-trilho__lista" role="list">'+
    '<li style="width:100%;position:relative"><button type="button" class="lc-trilho__item" data-acao="favoritos" aria-haspopup="dialog" aria-expanded="false" data-dica-lado="direita">'+ic("estrela")+'<span class="lc-trilho__rot">Favoritos</span></button></li>'+
    '</ul><div class="lc-trilho__sep" role="presentation"></div><ul class="lc-trilho__lista" role="list">';
  mods.forEach(function(id){
    var m = cfg.contexto==="superadmin" ? SUPERADMIN.modulos.filter(function(x){return x.id===id;})[0] : MODULOS[id];
    var atual = id===cfg.modulo, n = cont[id];
    h += '<li style="width:100%"><a class="lc-trilho__item" href="'+href(cfg,id,"")+'"'+(atual?' aria-current="true"':'')+' data-modulo="'+id+'" title="'+esc(m.nome)+'">'+ic(m.icone)+
      '<span class="lc-trilho__rot">'+esc(m.curto||m.nome)+'</span>'+(n?'<span class="lc-contador" aria-label="'+n+' pendentes">'+n+'</span>':'')+'</a></li>';
  });
  h += '</ul><div class="lc-trilho__cresce"></div><ul class="lc-trilho__lista" role="list">';
  if(cfg.contexto!=="superadmin" && (p.ajustes||cfg.modulo==="configuracao"))
    h += '<li style="width:100%"><a class="lc-trilho__item" href="'+href(cfg,"configuracao","")+'"'+(cfg.modulo==="configuracao"?' aria-current="true"':'')+' title="Configuração">'+ic("configuracoes")+'<span class="lc-trilho__rot">Ajustes</span></a></li>';
  h += '<li style="width:100%"><button type="button" class="lc-trilho__item lc-trilho__recolher" data-acao="recolher" aria-pressed="'+(cfg.recolhido?"true":"false")+'" title="Recolher o trilho">'+ic("recolher-trilho")+'<span class="lc-trilho__rot">Recolher</span></button></li></ul></nav>';
  return h;
}

function modAtual(cfg){
  if(cfg.contexto==="superadmin"){ return SUPERADMIN.modulos.filter(function(x){return x.id===cfg.modulo;})[0]||SUPERADMIN.modulos[0]; }
  return MODULOS[cfg.modulo]||MODULOS.inicio;
}
function htmlSubmenu(cfg,s,id){
  var grupos = s.grupos || [{itens:s.itens}];
  var col = s.grupos && s.grupos.length>1 && s.grupos.reduce(function(a,g){return a+g.itens.length;},0)>8;
  var h = '<div class="lc-submenu'+(col?' lc-submenu--colunas':'')+'" id="'+id+'" role="menu" hidden>';
  grupos.forEach(function(g){
    h += '<div class="lc-submenu__grupo" role="group"'+(g.titulo?' aria-label="'+esc(g.titulo)+'"':'')+'>'+(g.titulo?'<div class="lc-submenu__titulo" aria-hidden="true">'+esc(g.titulo)+'</div>':'');
    g.itens.forEach(function(it){
      var t=itemTxt(it), n=typeof it==="object"&&it.n;
      h += '<a role="menuitem" tabindex="-1" href="'+href(cfg,cfg.modulo,s.nome,t)+'"'+(cfg.item===t&&cfg.secao===s.nome?' aria-current="page"':'')+'>'+esc(t)+(n?'<span class="lc-contador lc-contador--neutro">'+n+'</span>':'')+'</a>';
    });
    h += '</div>';
  });
  return h+'</div>';
}
function htmlBarra(cfg){
  var m = modAtual(cfg), u = cfg.usuario||{nome:"Letícia Araújo",iniciais:"LA",cor:"lc-av--c3"};
  var h = '<header class="lc-barra-modulo">'+
    '<button type="button" class="lc-ib lc-barra-modulo__menu-btn" data-acao="gaveta" aria-label="Abrir menu" aria-expanded="false">'+ic("menu")+'</button>'+
    '<div class="lc-barra-modulo__nome">'+esc(m.nome)+(cfg.secao?'<span class="lc-barra-modulo__secao">'+esc(cfg.secao)+'</span>':'')+'</div>'+
    '<nav aria-label="Seções de '+esc(m.nome)+'" style="display:flex;min-width:0"><ul class="lc-secoes" role="list">';
  m.secoes.forEach(function(s,i){
    var sub = s.itens||s.grupos, atual = cfg.secao===s.nome, id="lc-sub-"+i;
    if(sub) h += '<li><button type="button" class="lc-secao" aria-haspopup="menu" aria-expanded="false" aria-controls="'+id+'"'+(atual?' aria-current="true"':'')+'>'+esc(s.nome)+ic("chevron-baixo")+'</button>'+htmlSubmenu(cfg,s,id)+'</li>';
    else h += '<li><a class="lc-secao" href="'+href(cfg,cfg.modulo,s.nome)+'"'+(atual?' aria-current="page"':'')+'>'+esc(s.nome)+'</a></li>';
  });
  h += '</ul></nav><div class="lc-barra-modulo__fim">'+
    '<button type="button" class="lc-busca-global" data-acao="cmdk" aria-label="Pesquisar em tudo (Ctrl ou ⌘ + K)">'+ic("pesquisar")+'<span>Pesquisar em tudo</span><span class="lc-tecla">⌘K</span></button>'+
    '<button type="button" class="lc-ib lc-barra-modulo__ajuda" aria-label="Ajuda" data-dica="Ajuda">'+ic("ajuda")+'</button>'+
    '<span style="position:relative;display:flex"><button type="button" class="lc-ib" data-acao="sino" aria-haspopup="dialog" aria-expanded="false" aria-label="Notificações, 3 novas">'+ic("sino")+'<span class="lc-contador lc-contador--p">3</span></button></span>'+
    '<span style="position:relative;display:flex"><button type="button" class="lc-ib" data-acao="conta" aria-haspopup="menu" aria-expanded="false" aria-label="Sua conta, '+esc(u.nome)+'"><span class="lc-av lc-av--24 '+esc(u.cor||"")+'">'+esc(u.iniciais)+'</span></button></span>'+
    '</div></header>';
  return h;
}
function htmlTrilha(cfg){
  if(!cfg.trilha || !cfg.trilha.length) return '<div class="lc-barra-trilha" hidden></div>';
  var m = modAtual(cfg), t = cfg.trilha, h = '<div class="lc-barra-trilha"><nav aria-label="Trilha"><ol class="lc-trilha"><li><a href="'+href(cfg,cfg.modulo,"")+'">'+esc(m.nome)+'</a></li>';
  t.forEach(function(x,i){ var last=i===t.length-1; h += '<li>'+(last?'<span aria-current="page">'+esc(x)+'</span>':'<a href="#">'+esc(x)+'</a>')+'</li>'; });
  return h+'</ol></nav>'+(cfg.acaoTrilha?'<div style="margin-left:auto">'+cfg.acaoTrilha+'</div>':'')+'</div>';
}
function htmlBarraInferior(cfg){
  if(cfg.contexto==="portal"){
    return '<nav class="lc-barra-inferior" aria-label="Portal">'+PORTAL.abas.map(function(a,i){
      var cur = (cfg.secao||"Início")===a.t;
      return a.t==="Mais" ? '<button type="button" data-acao="gaveta">'+ic(a.ic)+'<span>'+a.t+'</span></button>'
        : '<a href="#"'+(cur?' aria-current="page"':'')+'>'+ic(a.ic)+'<span>'+a.t+'</span></a>';
    }).join("")+'</nav>';
  }
  var m = modAtual(cfg), mi = cfg.modulo && cfg.modulo!=="inicio";
  return '<nav class="lc-barra-inferior" aria-label="Atalhos">'+
    '<a href="#"'+(!mi?' aria-current="page"':'')+'>'+ic("casa")+'<span>Início</span></a>'+
    (mi?'<a href="#" aria-current="page">'+ic(m.icone)+'<span>'+esc(m.curto||m.nome)+'</span></a>':'<a href="#">'+ic("checklist")+'<span>Para você</span><span class="lc-contador lc-contador--p">5</span></a>')+
    '<button type="button" data-acao="cmdk">'+ic("pesquisar")+'<span>Pesquisar</span></button>'+
    '<button type="button" data-acao="sino">'+ic("sino")+'<span>Avisos</span><span class="lc-contador lc-contador--p">3</span></button>'+
    '<button type="button" data-acao="gaveta">'+ic("menu")+'<span>Menu</span></button></nav>';
}

/* --------------------------- camadas --------------------------- */
function htmlGaveta(cfg){
  var p = papel(cfg), cont = Object.assign({},CONTADORES_PADRAO,cfg.contadores||{});
  var h = '<div class="lc-gaveta-fundo" data-fechar></div><aside class="lc-gaveta" role="dialog" aria-modal="true" aria-label="Menu">'+
    '<div class="lc-gaveta__cab"><span class="lc-ladrilho lc-ladrilho--marca" data-marca-sigla>'+esc((cfg.cliente||{}).sigla||"A")+'</span><b>'+esc((cfg.cliente||{}).nome||"Administradora Alpha")+'</b>'+
    '<button type="button" class="lc-ib" data-fechar aria-label="Fechar menu">'+ic("fechar")+'</button></div>'+
    '<div class="lc-gaveta__busca"><button type="button" class="lc-busca" data-acao="cmdk" style="width:100%">'+ic("pesquisar")+'<span style="flex:1;text-align:left">Pesquisar em tudo</span></button></div><div class="lc-gaveta__corpo">';
  if(cfg.contexto==="portal"){
    var lista = PORTAL.mais[cfg.papel]||PORTAL.mais.morador;
    h += '<div class="lc-gaveta__titulo">Mais opções</div><div class="lc-gaveta__secoes" style="padding-left:14px">'+lista.map(function(t){return '<a href="#">'+esc(t)+'</a>';}).join("")+'</div>';
  } else {
    h += '<div class="lc-gaveta__titulo">Recentes</div><div class="lc-gaveta__secoes" style="padding-left:14px">'+RECENTES.map(function(r){return '<a href="#">'+ic(r.ic,"lc-ic--16")+'&nbsp;&nbsp;'+esc(r.t)+'</a>';}).join("")+'</div><div class="lc-gaveta__titulo">Módulos</div>';
    var mods = cfg.contexto==="superadmin" ? SUPERADMIN.modulos : p.modulos.map(function(id){var m=MODULOS[id];m.id=id;return m;});
    if(cfg.contexto!=="superadmin" && p.ajustes){ var c=MODULOS.configuracao; c.id="configuracao"; mods=mods.concat([c]); }
    mods.forEach(function(m){
      var atual = m.id===cfg.modulo, n=cont[m.id];
      h += '<div class="lc-gaveta__mod"><button type="button" aria-expanded="'+(atual?"true":"false")+'"'+(atual?' aria-current="true"':'')+'>'+ic(m.icone)+esc(m.nome)+(n?'<span class="lc-contador">'+n+'</span>':'')+ic("chevron-baixo")+'</button>'+
        '<div class="lc-gaveta__secoes"'+(atual?'':' hidden')+'>';
      m.secoes.forEach(function(s){
        if(s.grupos){ s.grupos.forEach(function(g){ h += '<div class="lc-submenu__titulo">'+esc(s.nome)+', '+esc(g.titulo)+'</div>'+g.itens.map(function(it){return '<a href="#">'+esc(itemTxt(it))+'</a>';}).join(""); }); }
        else if(s.itens){ h += '<div class="lc-submenu__titulo">'+esc(s.nome)+'</div>'+s.itens.map(function(it){return '<a href="#">'+esc(itemTxt(it))+'</a>';}).join(""); }
        else h += '<a href="#"'+(atual&&cfg.secao===s.nome?' aria-current="page"':'')+'>'+esc(s.nome)+'</a>';
      });
      h += '</div></div>';
    });
  }
  return h+'</div></aside>';
}
function htmlCmdk(){
  return '<div class="lc-sobreposicao" data-fechar-fora><div class="lc-cmdk" role="dialog" aria-modal="true" aria-label="Pesquisar em tudo">'+
    '<div class="lc-cmdk__entrada">'+ic("pesquisar")+'<input type="text" role="combobox" aria-expanded="true" aria-controls="lc-cmdk-lista" aria-autocomplete="list" placeholder="Pesquise telas, clientes, pessoas, chamados ou ações" autocomplete="off"><span class="lc-tecla">Esc</span></div>'+
    '<div class="lc-cmdk__escopo lc-seg lc-seg--p" role="group" aria-label="Onde pesquisar" style="border:0;border-bottom:var(--borda-1);border-radius:0;display:flex">'+
    ["Tudo","Telas","Clientes","Pessoas","Chamados","Ações"].map(function(s,i){return '<button type="button" aria-pressed="'+(i===0)+'">'+s+'</button>';}).join("")+'</div>'+
    '<ul class="lc-cmdk__lista" id="lc-cmdk-lista" role="listbox"></ul>'+
    '<div class="lc-cmdk__pe"><span><span class="lc-tecla">↑</span><span class="lc-tecla">↓</span> navegar</span><span><span class="lc-tecla">Enter</span> abrir</span><span><span class="lc-tecla">Ctrl</span>+<span class="lc-tecla">Enter</span> abrir em nova aba</span><span><span class="lc-tecla">Esc</span> fechar</span></div>'+
    '</div></div>';
}
var REGISTROS = [
  {g:"Clientes",t:"Cond. Parque das Águas",s:"Cliente, carteira de Letícia Araújo",ic:"condominio"},
  {g:"Clientes",t:"Residencial Jardim Botânico",s:"Cliente, renovação em 15/11",ic:"condominio"},
  {g:"Clientes",t:"Edifício Solar das Palmeiras",s:"Cliente, saúde 41, em risco",ic:"condominio"},
  {g:"Pessoas",t:"Marina Costa",s:"Síndica, Cond. Parque das Águas",ic:"sindico"},
  {g:"Pessoas",t:"Rafael Lima",s:"Analista de CS",ic:"pessoa"},
  {g:"Chamados",t:"Chamado 4.812, vazamento no bloco B",s:"Aberto, responder até 10:42",ic:"chamado"},
  {g:"Chamados",t:"Chamado 4.790, reserva do salão de festas",s:"Pendente, aguardando o cliente",ic:"chamado"},
  {g:"Ações",t:"Criar chamado",s:"Suporte",ic:"mais",k:"C"},
  {g:"Ações",t:"Emitir 2ª via de boleto",s:"Financeiro",ic:"boleto",k:""},
  {g:"Ações",t:"Mudar para o tema escuro",s:"Aparência",ic:"tema-escuro"}
];
function resultadosCmdk(q,escopo){
  q = (q||"").trim().toLowerCase();
  var norm = function(s){return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");};
  var nq = norm(q), out = [];
  if(escopo==="Tudo"||escopo==="Telas"){
    Object.keys(MODULOS).forEach(function(id){ var m=MODULOS[id];
      m.secoes.forEach(function(s){
        var itens = s.grupos ? [].concat.apply([],s.grupos.map(function(g){return g.itens;})) : (s.itens||[s.nome]);
        itens.forEach(function(it){ var t=itemTxt(it); if(!nq || norm(t).indexOf(nq)>-1 || norm(s.nome).indexOf(nq)>-1) out.push({g:"Telas",t:t,s:m.nome+(t!==s.nome?", "+s.nome:""),ic:m.icone}); });
      });
    });
  }
  REGISTROS.forEach(function(r){ if((escopo==="Tudo"||escopo===r.g) && (!nq || norm(r.t+" "+r.s).indexOf(nq)>-1)) out.push(r); });
  if(!nq) out = out.filter(function(r){return r.g!=="Telas";}).concat(out.filter(function(r){return r.g==="Telas";}).slice(0,4));
  return out.slice(0,14).map(function(r){ var t=esc(r.t); if(q){ var i=norm(r.t).indexOf(nq); if(i>-1) t=esc(r.t.slice(0,i))+"<mark>"+esc(r.t.slice(i,i+q.length))+"</mark>"+esc(r.t.slice(i+q.length)); } return {g:r.g,html:ic(r.ic)+'<span style="min-width:0"><span>'+t+'</span><small>'+esc(r.s)+'</small></span>'+(r.g==="Telas"?'<span class="lc-cmdk__onde">Ir para a tela</span>':'')}; });
}
function htmlSino(){
  var h = '<div class="lc-popover lc-sino" role="dialog" aria-label="Notificações" style="right:0;top:calc(100% + 6px)">'+
    '<div class="lc-popover__cab"><h3>Notificações</h3><button type="button" class="lc-btn lc-btn--link lc-btn--p">Marcar todas como lidas</button><button type="button" class="lc-btn lc-btn--icone lc-btn--discreto lc-btn--p" aria-label="Preferências de notificação">'+ic("ajustes","lc-ic--16")+'</button></div>'+
    '<div class="lc-abas lc-abas--p" role="tablist"><button role="tab" aria-selected="true" data-aba="para-mim">Para mim <span class="lc-contagem">3</span></button><button role="tab" aria-selected="false" data-aba="mencoes">Menções <span class="lc-contagem">2</span></button><button role="tab" aria-selected="false" data-aba="todas">Todas</button></div><div role="tabpanel" style="max-height:360px;overflow:auto">';
  NOTIF.forEach(function(n){
    h += '<a href="#" class="lc-notif'+(n.nl?'':' lc-notif--lida')+'" data-aba-item="'+n.aba+'">'+(n.av?'<span class="lc-av lc-av--32 '+n.c+'">'+n.av+'</span>':'<span class="lc-ladrilho">'+ic(n.ic)+'</span>')+
      '<span><b>'+esc(n.quem)+'</b> '+n.txt+'<span class="lc-notif__quando">'+esc(n.q)+'</span></span><span class="lc-notif__nl" aria-label="'+(n.nl?"não lida":"lida")+'"></span></a>';
  });
  return h+'</div><div class="lc-popover__pe" style="justify-content:space-between"><span class="lc-legenda">Guardamos 90 dias de notificações</span><a class="lc-btn lc-btn--p" href="#">Ver todas</a></div></div>';
}
function htmlConta(cfg){
  var u = cfg.usuario||{nome:"Letícia Araújo",cargo:"Coordenadora de Relacionamento",iniciais:"LA",cor:"lc-av--c3"};
  var tema = document.documentElement.getAttribute("data-tema")||"claro", dens = document.documentElement.getAttribute("data-densidade")||"padrao";
  var cli = cfg.cliente||{nome:"Administradora Alpha",sigla:"A"};
  return '<div class="lc-menu lc-conta" role="menu" aria-label="Sua conta" style="right:0;top:calc(100% + 6px)">'+
    '<div class="lc-conta__quem"><span class="lc-av lc-av--40 '+esc(u.cor||"")+'">'+esc(u.iniciais)+'<span class="lc-presenca lc-presenca--on"></span></span><span><b>'+esc(u.nome)+'</b><span>'+esc(u.cargo||"")+'</span></span></div>'+
    '<div class="lc-conta__cliente"><span class="lc-ladrilho lc-ladrilho--marca lc-ladrilho--24" data-marca-sigla>'+esc(cli.sigla)+'</span><b>'+esc(cli.nome)+'</b><button type="button" class="lc-btn lc-btn--link lc-btn--p" data-acao="trocar-cliente">Trocar</button></div>'+
    '<div class="lc-menu__sep"></div>'+
    '<a role="menuitem" class="lc-menu__item" href="#">'+ic("pessoa")+'Meu perfil</a>'+
    '<a role="menuitem" class="lc-menu__item" href="#">'+ic("sino")+'Preferências de notificação</a>'+
    '<div class="lc-menu__titulo">Tema</div><div class="lc-seg lc-seg--p lc-seg--bloco" role="group" aria-label="Tema">'+
      [["claro","Claro","tema-claro"],["escuro","Escuro","tema-escuro"],["sistema","Sistema","tema-sistema"]].map(function(t){return '<button type="button" data-tema-btn="'+t[0]+'" aria-pressed="'+(tema===t[0])+'">'+ic(t[2])+t[1]+'</button>';}).join("")+'</div>'+
    '<div class="lc-menu__titulo">Densidade</div><div class="lc-seg lc-seg--p lc-seg--bloco" role="group" aria-label="Densidade">'+
      [["compacta","Compacta"],["padrao","Padrão"],["confortavel","Confortável"]].map(function(t){return '<button type="button" data-dens-btn="'+t[0]+'" aria-pressed="'+(dens===t[0])+'">'+t[1]+'</button>';}).join("")+'</div>'+
    '<div class="lc-menu__sep"></div><a role="menuitem" class="lc-menu__item" href="#">'+ic("ajuda")+'Central de ajuda<span class="lc-tecla lc-menu__fim">?</span></a>'+
    '<a role="menuitem" class="lc-menu__item" href="#">'+ic("comando")+'Atalhos de teclado</a><div class="lc-menu__sep"></div>'+
    '<button role="menuitem" type="button" class="lc-menu__item">'+ic("sair")+'Sair</button></div>';
}
function htmlFavoritos(){
  var li = function(r){return '<a class="lc-menu__item" role="menuitem" href="#">'+ic(r.ic)+'<span>'+esc(r.t)+'<small>'+esc(r.s)+'</small></span></a>';};
  return '<div class="lc-menu" role="menu" aria-label="Favoritos e recentes" style="left:calc(100% + 8px);top:0;width:300px">'+
    '<div class="lc-menu__titulo">Favoritos</div>'+FAVORITOS.map(li).join("")+'<div class="lc-menu__sep"></div><div class="lc-menu__titulo">Recentes</div>'+RECENTES.map(li).join("")+
    '<div class="lc-menu__sep"></div><a class="lc-menu__item" href="#" role="menuitem">'+ic("ajustes")+'Organizar o trilho e os favoritos</a></div>';
}
function htmlTrocaCliente(){
  var cs=[["Administradora Alpha","A","São Paulo, 214 condomínios"],["Órbita Condomínios","Ó","Campinas, 88 condomínios"],["Sol Nascente Gestão","S","Ribeirão Preto, 41 condomínios"]];
  return '<div class="lc-sobreposicao" data-fechar-fora><div class="lc-modal" role="dialog" aria-modal="true" aria-labelledby="lc-tc-t"><div class="lc-modal__cab"><div style="flex:1"><h2 id="lc-tc-t">Trocar de empresa</h2><p>Você tem acesso a 3 empresas. A troca recarrega a tela no início da empresa escolhida.</p></div><button class="lc-btn lc-btn--icone lc-btn--discreto" data-fechar aria-label="Fechar">'+ic("fechar")+'</button></div>'+
    '<div class="lc-modal__corpo"><div class="lc-busca" style="margin-bottom:10px">'+ic("pesquisar")+'<input placeholder="Pesquisar empresa" aria-label="Pesquisar empresa"></div><ul class="lc-lista lc-caixa" role="listbox" aria-label="Empresas">'+
    cs.map(function(c,i){return '<li role="option" aria-selected="'+(i===0)+'" tabindex="0" style="cursor:pointer"><span class="lc-ladrilho lc-ladrilho--marca">'+c[1]+'</span><span class="lc-cresce"><b>'+c[0]+'</b><span class="lc-lista__sub">'+c[2]+'</span></span>'+(i===0?'<span class="lc-estado lc-estado--andamento">Atual</span>':'')+'</li>';}).join("")+
    '</ul></div></div></div>';
}

/* --------------------------- comportamento --------------------------- */
var CAMADA = null, ORIGEM = null;
function fechar(){
  if(!CAMADA) return;
  CAMADA.remove(); CAMADA=null;
  document.querySelectorAll('[aria-expanded="true"][data-acao],.lc-secao[aria-expanded="true"]').forEach(function(b){b.setAttribute("aria-expanded","false");});
  document.querySelectorAll(".lc-submenu:not([hidden])").forEach(function(s){s.hidden=true;});
  if(ORIGEM && ORIGEM.focus) ORIGEM.focus(); ORIGEM=null;
}
function abrirSubmenu(btn,focarPrimeiro){
  var aberto = btn.getAttribute("aria-expanded")==="true";
  fechar(); document.querySelectorAll(".lc-secao[aria-expanded=true]").forEach(function(b){b.setAttribute("aria-expanded","false");document.getElementById(b.getAttribute("aria-controls")).hidden=true;});
  if(aberto) return;
  var sub = document.getElementById(btn.getAttribute("aria-controls"));
  btn.setAttribute("aria-expanded","true"); sub.hidden=false;
  // impede que o submenu saia da tela pela direita
  var r = sub.getBoundingClientRect(); if(r.right>window.innerWidth-8){ sub.style.left="auto"; sub.style.right="0"; }
  var itens = sub.querySelectorAll('[role="menuitem"]');
  if(focarPrimeiro && itens[0]) itens[0].focus();
  CAMADA = {remove:function(){ sub.hidden=true; btn.setAttribute("aria-expanded","false"); }};
  ORIGEM = null;
}
function montarCamada(html,ancora,origem){
  fechar();
  var t=document.createElement("template"); t.innerHTML=html.trim(); var el=t.content.firstElementChild;
  (ancora||document.body).appendChild(el);
  CAMADA = el; ORIGEM = origem||null;
  if(origem && origem.setAttribute && origem.hasAttribute("aria-expanded")) origem.setAttribute("aria-expanded","true");
  if(window.lcIcones) window.lcIcones(el);
  var f = el.querySelector("input,[role=menuitem],[role=tab],button,a"); if(f) setTimeout(function(){f.focus({preventScroll:true});},0);
  return el;
}
function abrirCmdk(origem){
  var el = montarCamada(htmlCmdk(),null,origem);
  var inp = el.querySelector("input"), lista = el.querySelector(".lc-cmdk__lista"), escopo="Tudo", sel=0;
  function desenhar(){
    var rs = resultadosCmdk(inp.value,escopo), g=null, h="";
    if(!rs.length){ lista.innerHTML='<li class="lc-vazio" style="padding:24px 16px"><p class="lc-vazio__titulo">Nada encontrado para “'+esc(inp.value)+'”</p><p class="lc-vazio__texto">Confira a grafia ou pesquise só o começo do nome. Telas, clientes, pessoas e chamados entram na busca.</p></li>'; return; }
    rs.forEach(function(r,i){ if(r.g!==g){ g=r.g; h+='<li class="lc-cmdk__grupo" role="presentation">'+esc(g)+'</li>'; } h+='<li class="lc-cmdk__item" role="option" id="lc-op-'+i+'" aria-selected="'+(i===sel)+'">'+r.html+'</li>'; });
    lista.innerHTML=h; inp.setAttribute("aria-activedescendant","lc-op-"+sel);
  }
  inp.addEventListener("input",function(){sel=0;desenhar();});
  inp.addEventListener("keydown",function(e){
    var n = lista.querySelectorAll('[role=option]').length;
    if(e.key==="ArrowDown"){e.preventDefault();sel=(sel+1)%n;desenhar();lista.querySelector('[aria-selected=true]').scrollIntoView({block:"nearest"});}
    if(e.key==="ArrowUp"){e.preventDefault();sel=(sel-1+n)%n;desenhar();lista.querySelector('[aria-selected=true]').scrollIntoView({block:"nearest"});}
    if(e.key==="Enter"){e.preventDefault();fechar();}
  });
  el.querySelectorAll(".lc-cmdk__escopo button").forEach(function(b){ b.addEventListener("click",function(){ escopo=b.textContent; el.querySelectorAll(".lc-cmdk__escopo button").forEach(function(x){x.setAttribute("aria-pressed",x===b);}); sel=0; desenhar(); inp.focus(); }); });
  lista.addEventListener("click",function(e){ if(e.target.closest("[role=option]")) fechar(); });
  desenhar();
  return el;
}
function ligarConta(el){
  el.querySelectorAll("[data-tema-btn]").forEach(function(b){ b.addEventListener("click",function(){
    var t=b.getAttribute("data-tema-btn"); if(window.LCMarca) window.LCMarca.tema(t); else document.documentElement.setAttribute("data-tema",t);
    el.querySelectorAll("[data-tema-btn]").forEach(function(x){x.setAttribute("aria-pressed",x===b);}); }); });
  el.querySelectorAll("[data-dens-btn]").forEach(function(b){ b.addEventListener("click",function(){
    var t=b.getAttribute("data-dens-btn"); if(window.LCMarca) window.LCMarca.densidade(t); else document.documentElement.setAttribute("data-densidade",t);
    el.querySelectorAll("[data-dens-btn]").forEach(function(x){x.setAttribute("aria-pressed",x===b);}); }); });
}
function ligarSino(el){
  var abas = el.querySelectorAll("[role=tab]");
  abas.forEach(function(a){ a.addEventListener("click",function(){
    abas.forEach(function(x){x.setAttribute("aria-selected",x===a);});
    var k=a.getAttribute("data-aba"); el.querySelectorAll("[data-aba-item]").forEach(function(it){ it.hidden = !(k==="todas" || it.getAttribute("data-aba-item")===k || (k==="para-mim" && it.getAttribute("data-aba-item")!=="todas")); });
  }); });
  abas[0].click();
}
function ligarGaveta(el){
  el.querySelectorAll(".lc-gaveta__mod>button").forEach(function(b){ b.addEventListener("click",function(){
    var s=b.nextElementSibling, ab=b.getAttribute("aria-expanded")==="true"; b.setAttribute("aria-expanded",!ab); s.hidden=ab; }); });
}

function acao(nome,origem,app,cfg){
  if(nome==="cmdk") return abrirCmdk(origem);
  if(nome==="sino"){ var e=montarCamada(htmlSino(),origem.closest("span")||origem.parentNode,origem); ligarSino(e); return e; }
  if(nome==="conta"){ var c=montarCamada(htmlConta(cfg),origem.closest("span")||origem.parentNode,origem); ligarConta(c); return c; }
  if(nome==="favoritos") return montarCamada(htmlFavoritos(),origem.parentNode,origem);
  if(nome==="trocar-cliente") return montarCamada(htmlTrocaCliente(),null,origem);
  if(nome==="gaveta"){ var t=document.createElement("template"); t.innerHTML=htmlGaveta(cfg); var f=t.content.children[0], g=t.content.children[1];
    fechar(); document.body.appendChild(f); document.body.appendChild(g); if(window.lcIcones) window.lcIcones(g); ligarGaveta(g);
    CAMADA={remove:function(){f.remove();g.remove();}}; ORIGEM=origem; var x=g.querySelector("button,a"); if(x) x.focus({preventScroll:true}); return g; }
  if(nome==="recolher"){ var r = app.getAttribute("data-trilho")==="recolhido"; app.setAttribute("data-trilho", r?"":"recolhido"); origem.setAttribute("aria-pressed",!r);
    try{ localStorage.setItem("lc-trilho", r?"":"recolhido"); }catch(_){} }
}

function montar(el){
  var cfg; try{ cfg = JSON.parse(el.getAttribute("data-moldura")||"{}"); }catch(e){ console.error("[moldura] JSON inválido em data-moldura", e); cfg={}; }
  cfg.contexto = cfg.contexto||"interno";
  if(cfg.contexto==="superadmin" && !cfg.modulo) cfg.modulo="painel";
  if(!cfg.modulo) cfg.modulo="inicio";
  var app;
  if(el.tagName==="BODY"){ app=document.createElement("div"); while(el.firstChild) app.appendChild(el.firstChild); el.appendChild(app); }
  else app=el;
  app.classList.add("lc-app"); if(cfg.fixa) app.classList.add("lc-app--fixa");
  if(cfg.contexto==="portal") app.classList.add("lc-portal");
  var rec = cfg.recolhido; try{ if(rec==null) rec = localStorage.getItem("lc-trilho")==="recolhido"; }catch(_){}
  if(rec) app.setAttribute("data-trilho","recolhido");
  // área de conteúdo
  var area = document.createElement("div"); area.className="lc-area";
  Array.prototype.slice.call(app.childNodes).forEach(function(n){ area.appendChild(n); });
  var main = area.querySelector("main"); if(main && !main.id) main.id="conteudo";
  var pre = '<a class="lc-pular" href="#'+(main?main.id:"conteudo")+'">Pular para o conteúdo</a>'+htmlFaixa(cfg.faixa);
  var t = document.createElement("template");
  if(cfg.contexto==="portal"){
    cfg.secao = cfg.secao||"Início";
    t.innerHTML = pre + htmlBarraPortal(cfg) + '<div class="lc-barra-trilha" hidden></div>' + htmlBarraInferior(cfg);
  } else {
    cfg.recolhido = rec;
    t.innerHTML = pre + htmlTrilho(cfg) + htmlBarra(cfg) + htmlTrilha(cfg) + htmlBarraInferior(cfg);
  }
  app.appendChild(t.content); app.appendChild(area);
  if(window.lcIcones) window.lcIcones(app);
  // barra justa: se as seções não couberem, a busca vira lupa (nunca "Mais")
  var barra = app.querySelector(".lc-barra-modulo"), ul = app.querySelector(".lc-secoes");
  function ajustar(){ if(!barra||!ul) return; barra.classList.remove("lc-barra-modulo--justa","lc-barra-modulo--apertada");
    var fim = barra.querySelector(".lc-barra-modulo__fim"), cabe=function(){ return ul.getBoundingClientRect().right <= fim.getBoundingClientRect().left - 8; };
    if(!ul.offsetParent) return;
    if(!cabe()){ barra.classList.add("lc-barra-modulo--justa"); if(!cabe()) barra.classList.add("lc-barra-modulo--apertada"); } }
  ajustar(); window.addEventListener("resize",ajustar); if(document.fonts) document.fonts.ready.then(ajustar);
  // eventos
  app.addEventListener("click",function(e){
    var b = e.target.closest("[data-acao]"); if(b && app.contains(b)){ e.preventDefault(); e.stopPropagation();
      if(b.getAttribute("aria-expanded")==="true"){ fechar(); return; } acao(b.getAttribute("data-acao"),b,app,cfg); return; }
    var s = e.target.closest(".lc-secao[aria-haspopup]"); if(s){ e.preventDefault(); e.stopPropagation(); abrirSubmenu(s,false); }
  });
  // teclado na barra do módulo
  var secs = app.querySelectorAll(".lc-secao");
  secs.forEach(function(s,i){ s.addEventListener("keydown",function(e){
    if(e.key==="ArrowRight"){e.preventDefault();(secs[i+1]||secs[0]).focus();}
    if(e.key==="ArrowLeft"){e.preventDefault();(secs[i-1]||secs[secs.length-1]).focus();}
    if(e.key==="Home"){e.preventDefault();secs[0].focus();}
    if(e.key==="End"){e.preventDefault();secs[secs.length-1].focus();}
    if(e.key==="ArrowDown" && s.hasAttribute("aria-haspopup")){e.preventDefault();abrirSubmenu(s,true);}
    if((e.key==="Enter"||e.key===" ") && s.hasAttribute("aria-haspopup")){e.preventDefault();abrirSubmenu(s,true);}
  }); });
  app.querySelectorAll(".lc-submenu").forEach(function(sub){ sub.addEventListener("keydown",function(e){
    var it = Array.prototype.slice.call(sub.querySelectorAll("[role=menuitem]")), i = it.indexOf(document.activeElement);
    var btn = app.querySelector('[aria-controls="'+sub.id+'"]');
    if(e.key==="ArrowDown"){e.preventDefault();(it[i+1]||it[0]).focus();}
    if(e.key==="ArrowUp"){e.preventDefault();(it[i-1]||it[it.length-1]).focus();}
    if(e.key==="Home"){e.preventDefault();it[0].focus();}
    if(e.key==="End"){e.preventDefault();it[it.length-1].focus();}
    if(e.key==="Escape"||e.key==="Tab"){ if(e.key==="Escape") e.preventDefault(); sub.hidden=true; btn.setAttribute("aria-expanded","false"); CAMADA=null; if(e.key==="Escape") btn.focus(); }
    if(e.key==="ArrowRight"||e.key==="ArrowLeft"){ e.preventDefault(); sub.hidden=true; btn.setAttribute("aria-expanded","false"); CAMADA=null;
      var j=Array.prototype.indexOf.call(secs,btn); var nx = e.key==="ArrowRight"?(secs[j+1]||secs[0]):(secs[j-1]||secs[secs.length-1]); nx.focus(); if(nx.hasAttribute("aria-haspopup")) abrirSubmenu(nx,true); }
  }); });
  // trilho: setas
  var ri = app.querySelectorAll(".lc-trilho__item");
  ri.forEach(function(r,i){ r.addEventListener("keydown",function(e){
    if(e.key==="ArrowDown"){e.preventDefault();(ri[i+1]||ri[0]).focus();}
    if(e.key==="ArrowUp"){e.preventDefault();(ri[i-1]||ri[ri.length-1]).focus();}
  }); });
  // estado inicial para documentação
  if(cfg.aberto){ setTimeout(function(){
    if(cfg.aberto==="cmdk"){ var c=acao("cmdk",null,app,cfg); if(cfg.consulta){ var inp=c.querySelector("input"); inp.value=cfg.consulta; inp.dispatchEvent(new Event("input")); } }
    else if(["sino","conta","favoritos","gaveta","trocar-cliente"].indexOf(cfg.aberto)>-1){ var o=app.querySelector('[data-acao="'+cfg.aberto+'"]'); acao(cfg.aberto,o||app,app,cfg); }
    else { var sb=[].filter.call(secs,function(x){return x.textContent.trim()===cfg.aberto;})[0]; if(sb) abrirSubmenu(sb,false); }
    if(document.activeElement && cfg.semFoco) document.activeElement.blur();
  },30); }
  return app;
}
function htmlBarraPortal(cfg){
  var cli = cfg.cliente||{nome:"Administradora Alpha",sigla:"A"};
  var pap = {morador:"Morador",sindico:"Síndico",conselheiro:"Conselheiro"}[cfg.papel]||"Morador";
  var uP = cfg.usuario||({sindico:{iniciais:"MC",cor:"lc-av--c4"},conselheiro:{iniciais:"RF",cor:"lc-av--c5"}}[cfg.papel])||{iniciais:"AS",cor:"lc-av--c2"};
  return '<header class="lc-barra-modulo lc-barra-portal" style="grid-column:1/-1;background:var(--marca);color:var(--marca-txt);border-bottom:0">'+
    '<div class="lc-barra-modulo__nome" style="color:var(--marca-txt)"><span class="lc-topo-portal__logo" data-marca-sigla>'+esc(cli.sigla)+'</span><span data-marca-nome>'+esc(cli.nome)+'</span></div>'+
    '<nav aria-label="Portal" style="display:flex;min-width:0"><ul class="lc-secoes lc-secoes--portal" role="list">'+
    PORTAL.abas.filter(function(a){return a.t!=="Mais";}).concat((PORTAL.mais[cfg.papel]||PORTAL.mais.morador).slice(0,2).map(function(t){return {t:t};})).map(function(a){
      return '<li><a class="lc-secao" href="#"'+(cfg.secao===a.t?' aria-current="page"':'')+' style="color:var(--marca-txt)">'+esc(a.t)+'</a></li>'; }).join("")+'</ul></nav>'+
    '<div class="lc-barra-modulo__fim"><span class="lc-unidade-portal" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;font-size:13px;white-space:nowrap"><b style="font-weight:600">'+esc(cfg.unidade||"Bloco B, apto 1204")+'</b><span style="font-size:12px;opacity:.9">'+pap+'</span></span>'+
    '<span style="position:relative;display:flex"><button type="button" class="lc-ib" data-acao="sino" aria-label="Notificações" style="color:var(--marca-txt)">'+ic("sino")+'</button></span>'+
    '<span style="position:relative;display:flex"><button type="button" class="lc-ib" data-acao="conta" aria-label="Sua conta" style="color:var(--marca-txt)"><span class="lc-av lc-av--24 '+esc(uP.cor||"lc-av--c2")+'">'+esc(uP.iniciais||"AS")+'</span></button></span></div></header>';
}

window.LCMoldura = {MODULOS:MODULOS,ORDEM:ORDEM,PAPEIS:PAPEIS,PORTAL:PORTAL,SUPERADMIN:SUPERADMIN,montar:montar,abrirBusca:function(){abrirCmdk(document.activeElement);},fechar:fechar,resultadosCmdk:resultadosCmdk};

document.addEventListener("keydown",function(e){
  if((e.metaKey||e.ctrlKey) && (e.key==="k"||e.key==="K")){ e.preventDefault(); if(document.querySelector(".lc-cmdk")) fechar(); else abrirCmdk(document.activeElement); }
  if(e.key==="Escape" && CAMADA){ e.preventDefault(); fechar(); }
});
document.addEventListener("click",function(e){
  if(!CAMADA) return;
  if(e.target.closest("[data-fechar]") || (e.target.hasAttribute && e.target.hasAttribute("data-fechar-fora"))){ fechar(); return; }
  if(!e.target.closest(".lc-menu,.lc-popover,.lc-submenu,.lc-cmdk,.lc-gaveta,.lc-modal,[data-acao],.lc-secao")) fechar();
});
function iniciar(){ document.querySelectorAll("[data-moldura]").forEach(function(el){ if(!el.__lc){ el.__lc=1; montar(el); } }); }
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar); else iniciar();
})();
