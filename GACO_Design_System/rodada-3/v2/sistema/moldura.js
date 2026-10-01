/* =====================================================================
   GACO V2 "Casa de Máquinas" · moldura.js
   Navegação Modelo D refinado, igual em toda tela.
   Depende de icones.js (cmIcone) e, opcionalmente, de marca.js.
   Uso:
     <div data-moldura='{"grupo":"Suporte","tela":"Conversas","papel":"Atendimento"}'></div>
   Chaves aceitas:
     contexto   "interno" (padrão) | "portal" | "superadmin"
     grupo      nome do grupo (Suporte, CS…); no portal e na superadmin, ignorado
     bloco      opcional; achado sozinho pela tela
     tela       nome da tela atual (marca no menu, na gaveta e na trilha)
     papel      Atendimento | CS | Comercial | Financeiro | RH | Produto | Operações | Diretoria
     registro   texto que entra no fim da trilha ("Cond. Parque das Águas")
     navegar    "14 de 63" (mostra anterior/próximo com J e K na trilha)
     trilha     false para esconder a trilha
     atalhos    true (atalhos padrão da tela de trabalho) | [["J","próxima"],["K","anterior"]] | false
     sino       número de notificações novas (padrão 3)
     usuario    {"nome":"Beatriz Nogueira","iniciais":"BN","cargo":"Atendente","presenca":"disponivel","tom":2}
     clientes   true para mostrar a troca de cliente (pessoa com mais de um cliente)
     emNomeDe   superadmin dentro de um cliente: {"cliente":"Administradora Alpha","motivo":"…","expira":"42 min"}
     homologacao true para a faixa de ambiente de homologação
     unidade    portal: "Bl B Ap 1204"
     links      {"Conversas":"suporte.html"} para ligar telas entre páginas (também window.CM_LINKS)
   Expõe: window.CM_MAPA, CM_PAPEIS, CM_CONFIGURACAO, CM_PLATAFORMA, CM_PORTAL, cmAbrirPaleta(), cmToast(texto, tipo, acao)
   ===================================================================== */
(function(){
'use strict';
var I=function(n,c,r){return window.cmIcone?window.cmIcone(n,c,r):''};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

/* ---------------- Mapa: grupos → blocos → telas ----------------
   Taxonomia real de frontend/src/lib/menu.ts (livro consolidado), com os nomes consagrados do A5:
   sem "&", sem inglês onde o português do mercado existe, um termo por conceito. */
var MAPA=[
 {grupo:'Marketing',icone:'megafone',blocos:[
  {bloco:'Campanhas e leads',telas:['Campanhas','Campanhas de anúncio','Leads','Lead scoring','Segmentação','Fluxos de automação']},
  {bloco:'Site',telas:['Site','Landing pages','Editor de página','Formulários','Modelos de página','Biblioteca de mídia','Visitas do site']},
  {bloco:'E-mail',telas:['Disparos de e-mail','Modelos de e-mail','Saúde do envio','Calendário editorial']},
  {bloco:'Medição',telas:['Painel de marketing','Funil de marketing','ROI das campanhas','Atribuição']}]},
 {grupo:'Comercial',icone:'aperto-de-mao',blocos:[
  {bloco:'Funil de vendas',telas:['Leads do comercial','Negócios','Propostas','Previsão de vendas','Metas de vendas','Comissões','Aprovar comissões']},
  {bloco:'Ritmo de vendas',telas:['Cadências','Distribuição de leads','Regras do Comercial','Minhas tarefas','Passagens para o CS']},
  {bloco:'Jurídico',telas:['Modelos de contrato','Assinaturas de contrato']}]},
 {grupo:'CS',icone:'maos-coracao',blocos:[
  {bloco:'Clientes e cadastros',telas:['Clientes','Administradoras','Grupos econômicos','Entidades','Favorecidos']},
  {bloco:'Contratos',telas:['Contratos','Assinaturas','Renovações','Negociações','Modelos de documento']},
  {bloco:'Trabalho do CS',telas:['Minhas ações','Carteiras','Alertas','Regras dos alertas','Passagens recebidas','Playbooks do CS','Escalações','Reuniões','Minha agenda']},
  {bloco:'Saúde e jornada',telas:['Saúde do cliente','Jornada do cliente','Planos de sucesso','Implantações']},
  {bloco:'Voz do cliente',telas:['NPS','Respostas NPS','NPS registrado à mão','CSAT, CES e pós-projeto','Configuração do NPS']},
  {bloco:'Resultado e gestão',telas:['Painel do gestor de CS','Churn e retenção','NRR e GRR']}]},
 {grupo:'Projetos',icone:'quadro-kanban',blocos:[
  {bloco:'Projetos',telas:['Todos os projetos','Meus projetos','Quadro de projetos','Por cliente','Painel de projetos','Alocação da equipe','Modelos de projeto','Regras de Projetos']}]},
 {grupo:'Operações',icone:'chave-inglesa',blocos:[
  {bloco:'Ativos',telas:['Áreas comuns','Equipamentos','Reservas']},
  {bloco:'Manutenção',telas:['Ordens de serviço','Preventivas','Painel de manutenção']},
  {bloco:'Suprimentos',telas:['Estoque','Compras de operação']},
  {bloco:'Contratos e licenças',telas:['Contratos de serviço','Licenças','Contratos de fornecedor']}]},
 {grupo:'Suporte',icone:'fone-atendimento',blocos:[
  {bloco:'Atendimento',telas:['Conversas','Chamados','Incidentes','Problemas recorrentes','Respostas rápidas','Filas']},
  {bloco:'Gestão do suporte',telas:['Painel do suporte','Métricas da equipe','CSAT do atendimento','Equipes de atendimento','Tipos de chamado','Configuração de SLA']},
  {bloco:'Canais',telas:['WhatsApp','E-mails recebidos','Caixas de e-mail','Chat do site','Central de ajuda','Chatbot']}]},
 {grupo:'Produto',icone:'pacote',blocos:[
  {bloco:'Backlog',telas:['Demandas','Roteiro','Pacotes do roteiro','Playbooks de produto','Mudanças']},
  {bloco:'Desenvolvimento',telas:['Sprints','QA formal','Bugs']}]},
 {grupo:'Financeiro',icone:'carteira',blocos:[
  {bloco:'Operacional',telas:['Extrato','Contas a receber','Contas a pagar','Compras','Notas fiscais','Conciliação']},
  {bloco:'Inteligência',telas:['DRE','Fluxo de caixa','Comissões a pagar','Aprovação de comissões']},
  {bloco:'Cadastros',telas:['Empresas','Contas bancárias','Categorias financeiras','Centros de custo']}]},
 {grupo:'Academy',icone:'capelo',blocos:[
  {bloco:'Meu curso',telas:['Portal do aluno','Disciplinas','Grade horária','Calendário acadêmico','Boletim','Histórico','Certificados']},
  {bloco:'Estudar',telas:['Pendentes','Biblioteca','Fórum','Eventos e webinars','Comunidade','Informativos']},
  {bloco:'Gestão acadêmica',telas:['Cursos','Turmas','Períodos letivos','Disciplinas obrigatórias','Painel da coordenação','Treinamento por cliente','Parâmetros do Academy']}]},
 {grupo:'Cultura',icone:'pessoas',blocos:[
  {bloco:'Pessoas',telas:['Pessoas','Meu perfil','Equipes','Organograma','Cadastro de pessoas']},
  {bloco:'Comunicação interna',telas:['Mural','Comunicados','Reconhecimentos','Aniversariantes']},
  {bloco:'RH',telas:['Cargos','Solicitações','Fluxos de aprovação','Férias','Viagens','Políticas','Regras do RH','Pesquisas de clima','Desligamento']},
  {bloco:'Carreira e desenvolvimento',telas:['PDI','Planos de desenvolvimento','Plano de carreira','Reuniões 1:1','Categorias de reconhecimento']},
  {bloco:'Recrutamento',telas:['Vagas','Pessoas candidatas','Entrevistas']},
  {bloco:'Performance',telas:['Metas','Avaliação 360°','Calibração','Nine-box','Sucessão','Competências']}]},
 {grupo:'Relatórios',icone:'grafico-colunas',blocos:[
  {bloco:'Relatórios',telas:['Painel executivo','Todos os relatórios','Tarefas atrasadas','Exportações','DRE consolidado','Fluxo de caixa consolidado']}]}
];
var CONFIGURACAO={grupo:'Configuração',icone:'engrenagem',blocos:[
  {bloco:'Empresa',telas:['Dados da empresa','Usuários e permissões','Permissões por ação','Marca e personalização','Tipos de pessoa','Banners da Home','Listas e opções','Produtos e planos','Códigos','Etiquetas','Sinais do suporte','Pessoas duplicadas','Áreas']},
  {bloco:'Integrações',telas:['Catálogo de integrações','E-mail (SMTP)','Inteligência artificial','Anúncios','Chaves de API','Códigos externos','Webhooks','Importações']},
  {bloco:'Sistema',telas:['Automações','Processos','Mecânica dos objetos','Log de auditoria','Calendários de atendimento','Tarefas automáticas','Lixeira']}]};
var PLATAFORMA=[
 {grupo:'Clientes',icone:'condominio',blocos:[{bloco:'Clientes',telas:['Clientes da plataforma','Planos e cobrança','Uso por cliente','Acessos em nome do cliente']}]},
 {grupo:'Operação',icone:'plataforma',blocos:[{bloco:'Operação',telas:['Saúde da plataforma','Versões e publicações','Homologação','Filas e tarefas']}]},
 {grupo:'Segurança',icone:'escudo-pessoa',blocos:[{bloco:'Segurança',telas:['Superadmins e histórico','Auditoria global','Senha e dois fatores']}]},
 {grupo:'Suporte à plataforma',icone:'fone-atendimento',blocos:[{bloco:'Suporte',telas:['Chamados dos clientes','Base de conhecimento','Comunicados da plataforma']}]}
];
var PORTAL={
  principal:[['Início','inicio'],['Boletos','boleto'],['Chamados','chamado'],['Reservas','reserva'],['Assembleias','assembleia'],['Comunicados','comunicado'],['Documentos','pasta']],
  barra:[['Início','inicio'],['Boletos','boleto'],['Chamados','chamado'],['Reservas','reserva']],
  mais:[['Minha unidade','unidade'],['Moradores e veículos','morador'],['Encomendas','encomenda'],['Visitantes','visitante'],['Assembleias','assembleia'],['Comunicados','comunicado'],['Documentos','pasta'],['Meu perfil','perfil']]
};
var ICONE_TELA={'Conversas':'conversas','Chamados':'chamado','Clientes':'condominio','Minhas ações':'checklist','Saúde do cliente':'saude','Negócios':'funil','Propostas':'arquivo-texto',
 'Contas a receber':'a-receber','Conciliação':'conciliacao','Extrato':'extrato','Pessoas':'pessoas','Férias':'ferias','Vagas':'vaga-de-emprego','Ordens de serviço':'ordem-de-servico',
 'Portal do aluno':'capelo','Disciplinas':'disciplina','Painel executivo':'painel','DRE':'grafico-barras','Demandas':'backlog','Sprints':'roteiro','Bugs':'bug','Mural':'mural','Reservas':'reserva',
 'Respostas rápidas':'resposta-rapida','WhatsApp':'whatsapp','Boletim':'rubrica','Campanhas':'megafone','Todos os projetos':'quadro-kanban','Equipamentos':'casa-de-maquinas','Áreas comuns':'area-comum'};
var PAPEIS={
  'Atendimento':{grupos:['Suporte','CS','Operações','Academy','Cultura','Relatórios'],favoritos:['Conversas','Chamados','Ordens de serviço'],inferior:'Conversas'},
  'CS':{grupos:['CS','Suporte','Projetos','Comercial','Academy','Cultura','Relatórios'],favoritos:['Clientes','Minhas ações','Saúde do cliente'],inferior:'Minhas ações'},
  'Comercial':{grupos:['Marketing','Comercial','CS','Academy','Cultura','Relatórios'],favoritos:['Negócios','Propostas','Leads do comercial'],inferior:'Negócios'},
  'Financeiro':{grupos:['Financeiro','CS','Operações','Academy','Cultura','Relatórios'],favoritos:['Contas a receber','Conciliação','Extrato'],inferior:'Contas a receber'},
  'RH':{grupos:['Cultura','Academy','Financeiro','Relatórios'],favoritos:['Pessoas','Férias','Vagas'],inferior:'Pessoas'},
  'Produto':{grupos:['Produto','Projetos','Suporte','Academy','Cultura','Relatórios'],favoritos:['Demandas','Sprints','Bugs'],inferior:'Demandas'},
  'Operações':{grupos:['Operações','Suporte','Financeiro','Academy','Cultura','Relatórios'],favoritos:['Ordens de serviço','Equipamentos','Reservas'],inferior:'Ordens de serviço'},
  'Diretoria':{grupos:MAPA.map(function(g){return g.grupo}),favoritos:['Painel executivo','Clientes','DRE'],inferior:'Painel executivo'}
};
var PRESENCAS=[['disponivel','Disponível'],['ocupado','Ocupado'],['em-atendimento','Em atendimento'],['nao-incomodar','Não incomodar'],['ausente','Volto logo'],['offline','Aparecer offline']];
var PRESENCA_ICONE={disponivel:'<svg viewBox="0 0 12 12"><path d="M3.2 6.2l1.8 1.8 3.8-3.9"/></svg>','nao-incomodar':'<svg viewBox="0 0 12 12"><path d="M3.5 6h5"/></svg>',ausente:'<svg viewBox="0 0 12 12"><path d="M6 3.2V6l2 1.3"/></svg>',offline:'<svg viewBox="0 0 12 12"><path d="M4.2 4.2l3.6 3.6M7.8 4.2L4.2 7.8"/></svg>','em-atendimento':'<svg viewBox="0 0 12 12"><path d="M3.6 7V6a2.4 2.4 0 0 1 4.8 0v1"/></svg>',ocupado:''};
function presenca(p){return '<span class="cm-presenca cm-presenca--'+p+'" aria-hidden="true">'+(PRESENCA_ICONE[p]||'')+'</span>'}
function nomePresenca(p){for(var i=0;i<PRESENCAS.length;i++) if(PRESENCAS[i][0]===p) return PRESENCAS[i][1];return ''}

var REGISTROS=[
 ['chamado','Chamado 48213: vazamento no teto da garagem','Cond. Parque das Águas, Bl B, de Marina Costa','Chamado'],
 ['condominio','Condomínio Parque das Águas','Cliente com 312 unidades, saúde 82','Cliente'],
 ['pessoa','Marina Costa','Síndica, Parque das Águas','Pessoa'],
 ['ordem-de-servico','OS 482: interditar vagas 37 e 38','Hidrotec Instalações, vence hoje às 10:00','Ordem de serviço'],
 ['boleto','Boleto de outubro, Bl B Ap 1204','R$ 1.284,90, vence em 10/10','Boleto'],
 ['arquivo-texto','Contrato CT-2024-0187','Administradora Alpha, renova em 106 dias','Contrato'],
 ['assembleia','Assembleia ordinária, Vila Serena','23/10 às 19h30, edital publicado','Assembleia']
];
var ACOES=[['adicionar','Abrir chamado','C'],['enviar','Ir para a próxima conversa da fila','J'],['tema-escuro','Alternar tema claro e escuro',''],['densidade','Trocar a densidade',''],['inicio','Ir para o Início','G I'],['teclado','Ver atalhos de teclado','?']];

window.CM_MAPA=MAPA;window.CM_CONFIGURACAO=CONFIGURACAO;window.CM_PLATAFORMA=PLATAFORMA;window.CM_PORTAL=PORTAL;window.CM_PAPEIS=PAPEIS;window.CM_PRESENCAS=PRESENCAS;window.CM_ICONE_TELA=ICONE_TELA;
window.cmPresenca=presenca;

/* ---------------- utilidades ---------------- */
var LINKS={};
function href(t){return (LINKS[t]||(window.CM_LINKS&&window.CM_LINKS[t]))||'#'}
function todasTelas(mapa){var r=[];mapa.forEach(function(g){g.blocos.forEach(function(b){b.telas.forEach(function(t){r.push({grupo:g.grupo,bloco:b.bloco,tela:t,icone:ICONE_TELA[t]||g.icone})})})});return r}
function acharTela(t,mapa){var a=todasTelas(mapa);for(var i=0;i<a.length;i++) if(a[i].tela===t) return a[i];return null}
function contar(g){var n=0;g.blocos.forEach(function(b){n+=b.telas.length});return n}
function lerRecentes(){try{return JSON.parse(localStorage.getItem('cm-v2-recentes')||'null')}catch(e){return null}}
function gravarRecente(t){try{var r=lerRecentes()||[];r=[t].concat(r.filter(function(x){return x!==t})).slice(0,6);localStorage.setItem('cm-v2-recentes',JSON.stringify(r))}catch(e){}}

/* ---------------- montagem ---------------- */
function montar(el){
  var cfg={};try{cfg=JSON.parse(el.getAttribute('data-moldura')||'{}')}catch(e){console.warn('data-moldura inválido',e)}
  LINKS=cfg.links||{};
  var ctx=cfg.contexto||document.documentElement.getAttribute('data-contexto')||'interno';
  if(!document.documentElement.getAttribute('data-contexto')) document.documentElement.setAttribute('data-contexto',ctx);
  var u=cfg.usuario||(ctx==='portal'?{nome:'Marina Costa',iniciais:'MC',cargo:'Síndica, Parque das Águas',presenca:'disponivel',tom:1}:ctx==='superadmin'?{nome:'Rafael Antunes',iniciais:'RA',cargo:'Superadmin, equipe GACO',presenca:'disponivel',tom:5}:{nome:'Beatriz Nogueira',iniciais:'BN',cargo:'Atendente, Suporte',presenca:'disponivel',tom:2});
  var papel=PAPEIS[cfg.papel]||PAPEIS['Atendimento'];
  var mapa=ctx==='superadmin'?PLATAFORMA:MAPA;
  var visiveis=ctx==='superadmin'?PLATAFORMA:MAPA.filter(function(g){return papel.grupos.indexOf(g.grupo)>=0});
  var atual=cfg.tela?(acharTela(cfg.tela,mapa.concat([CONFIGURACAO]))):null;
  var grupoAtual=cfg.grupo||(atual&&atual.grupo)||'';
  var blocoAtual=cfg.bloco||(atual&&atual.bloco)||'';
  if(cfg.tela) gravarRecente(cfg.tela);
  var sino=cfg.sino==null?3:cfg.sino;
  var m=document.createElement('div');m.className='cm-moldura';m.setAttribute('data-cm-moldura','');
  var h='';
  if(cfg.emNomeDe){var e=cfg.emNomeDe;h+='<div class="cm-faixa-contexto cm-faixa-contexto--superadmin" role="status">'+I('escudo-pessoa')+'<span><b>Superadmin dentro de '+esc(e.cliente)+'.</b> <span class="cm-faixa-contexto__meta">Motivo: '+esc(e.motivo)+'. Acesso expira em '+esc(e.expira)+'. Tudo o que você fizer fica no log do cliente.</span></span><span class="cm-empurra"><button class="cm-botao cm-botao--p" type="button">Estender 30 min</button><button class="cm-botao cm-botao--p cm-botao--principal" type="button">Sair do cliente</button></span></div>'}
  if(cfg.homologacao){h+='<div class="cm-faixa-contexto cm-faixa-contexto--homologacao" role="status">'+I('homologacao')+'<span><b>Ambiente de homologação.</b> <span class="cm-faixa-contexto__meta">Dados de teste, e-mails e WhatsApp não saem para clientes reais.</span></span><span class="cm-empurra"><a class="cm-link" href="#">Ir para produção</a></span></div>'}

  if(ctx==='portal'){
    h+='<header class="cm-portal-topo">'+
      '<button class="cm-ferramenta cm-barra-cima__menu" type="button" data-acao="gaveta" aria-label="Abrir menu" style="display:none"></button>'+
      '<a class="cm-testeira" href="'+href('Início')+'" aria-label="Início"><span class="cm-testeira__logo" data-marca-inicial>A</span><span class="cm-testeira__nome"><span data-marca-nome>Administradora Alpha</span></span></a>'+
      '<nav class="cm-portal-topo__nav" aria-label="Portal">'+PORTAL.principal.map(function(p){return '<a href="'+href(p[0])+'"'+(cfg.tela===p[0]?' aria-current="page"':'')+'>'+esc(p[0])+'</a>'}).join('')+'</nav>'+
      '<button class="cm-portal-topo__unidade" type="button" aria-label="Trocar de unidade">'+I('unidade')+esc(cfg.unidade||'Bl B Ap 1204')+I('chevron-baixo','cm-icone--14')+'</button>'+
      '<button class="cm-ferramenta" type="button" data-acao="sino" aria-expanded="false" aria-label="Avisos, '+sino+' novos">'+I('notificacoes')+(sino?'<span class="cm-contador">'+sino+'</span>':'')+'</button>'+
      '<button class="cm-ferramenta cm-ferramenta--avatar" type="button" data-acao="conta" aria-expanded="false" aria-label="Sua conta"><span class="cm-avatar cm-avatar--'+(u.tom||1)+'">'+esc(u.iniciais)+'</span></button>'+
    '</header>';
  } else {
    var gaco=ctx==='superadmin';
    h+='<header class="cm-barra-cima">'+
      '<button class="cm-barra-cima__menu" type="button" data-acao="gaveta" aria-label="Abrir menu">'+I('menu')+'</button>'+
      (gaco?'<a class="cm-testeira cm-testeira--gaco" href="#" aria-label="Início da plataforma"><span class="cm-testeira__logo">G</span><span class="cm-testeira__nome">GACO<span class="cm-testeira__sub">Plataforma</span></span></a>'
           :'<a class="cm-testeira" href="'+href('Início')+'" aria-label="Voltar ao início"><span class="cm-testeira__logo" data-marca-inicial>A</span><span class="cm-testeira__nome"><span data-marca-nome>Administradora Alpha</span></span></a>')+
      '<button class="cm-busca-global" type="button" data-acao="paleta" aria-label="Pesquisar telas, registros e ações (Ctrl K)">'+I('pesquisar')+'<span>'+(gaco?'Pesquisar clientes, superadmins, versões ou digite uma ação':'Pesquisar telas, clientes, chamados ou digite uma ação')+'</span><span class="cm-tecla">Ctrl K</span></button>'+
      '<div class="cm-ferramentas">'+
        (cfg.clientes||gaco?'<button class="cm-ferramenta cm-ferramenta--cliente" type="button" data-acao="cliente" aria-expanded="false" aria-label="Trocar de cliente" data-dica="Trocar de cliente">'+I('troca-de-cliente')+'</button>':'')+
        '<button class="cm-ferramenta" type="button" data-acao="sino" aria-expanded="false" aria-label="Notificações, '+sino+' novas">'+I('notificacoes')+(sino?'<span class="cm-contador cm-contador--novo">'+sino+'</span>':'')+'</button>'+
        (gaco?'':'<button class="cm-ferramenta cm-ferramenta--config" type="button" data-acao="config" aria-expanded="false" aria-label="Configuração">'+I('engrenagem')+'</button>')+
        '<button class="cm-ferramenta cm-ferramenta--avatar" type="button" data-acao="conta" aria-expanded="false" aria-label="Sua conta e presença: '+esc(nomePresenca(u.presenca||'disponivel'))+'"><span class="cm-avatar cm-avatar--'+(u.tom||1)+'">'+esc(u.iniciais)+presenca(u.presenca||'disponivel')+'</span></button>'+
      '</div></header>';
    var favs=(gaco?['Clientes da plataforma','Saúde da plataforma']:papel.favoritos);
    h+='<nav class="cm-barra-menu" aria-label="Menu principal">'+
      '<div class="cm-favoritos" aria-label="Favoritos"><span class="cm-favoritos__rotulo">'+I('favorito')+'Favoritos</span>'+
        favs.map(function(f){var t=acharTela(f,mapa);return '<a href="'+href(f)+'"'+(f===cfg.tela?' aria-current="page"':'')+' title="'+esc(f)+'">'+I((t&&t.icone)||'favorito')+'<span class="cm-fav-texto">'+esc(f)+'</span></a>'}).join('')+'</div>'+
      '<button class="cm-barra-menu__abrir" type="button" data-acao="gaveta">'+I('menu')+'Menu</button>'+
      '<div class="cm-grupos" role="menubar" aria-label="Grupos">'+
        visiveis.map(function(g,i){return '<button class="cm-grupo'+(g.grupo===grupoAtual?' is-atual':'')+'" type="button" role="menuitem" aria-haspopup="true" aria-expanded="false" data-grupo="'+esc(g.grupo)+'" tabindex="'+(i===0?0:-1)+'">'+esc(g.grupo)+I('chevron-baixo')+'</button>'}).join('')+
      '</div>'+
      '<div class="cm-papel">'+(gaco?'<span>Equipe da plataforma</span>':'<span title="Grupos do papel '+esc(cfg.papel||'Atendimento')+'">'+visiveis.length+' de '+MAPA.length+' módulos</span><button type="button" data-acao="ajustar" aria-expanded="false">'+I('ajustar')+'Ajustar</button>')+'</div>'+
    '</nav>';
  }
  m.innerHTML=h;
  el.parentNode.insertBefore(m,el);
  /* trilha */
  if(cfg.trilha!==false&&ctx!=='portal'&&cfg.tela){
    var tr=document.createElement('div');tr.className='cm-trilha-pagina';
    var partes=[];
    if(grupoAtual) partes.push('<li><a href="#" data-acao-trilha="'+esc(grupoAtual)+'">'+esc(grupoAtual)+'</a></li>');
    if(blocoAtual&&blocoAtual!==grupoAtual) partes.push('<li>'+esc(blocoAtual)+'</li>');
    partes.push(cfg.registro?'<li><a href="'+href(cfg.tela)+'">'+esc(cfg.tela)+'</a></li><li aria-current="page">'+esc(cfg.registro)+'</li>':'<li aria-current="page">'+esc(cfg.tela)+'</li>');
    tr.innerHTML='<nav aria-label="Trilha"><ol class="cm-trilha">'+partes.join('')+'</ol></nav>'+
      (cfg.navegar?'<div class="cm-navegar-registro"><b>'+esc(cfg.navegar)+'</b><button class="cm-botao cm-botao--discreto cm-botao--p cm-botao--icone" type="button" aria-label="Anterior (K)" data-dica="Anterior  K">'+I('chevron-cima')+'</button><button class="cm-botao cm-botao--discreto cm-botao--p cm-botao--icone" type="button" aria-label="Próximo (J)" data-dica="Próximo  J">'+I('chevron-baixo')+'</button></div>':'');
    el.parentNode.insertBefore(tr,el);
  }
  el.parentNode.removeChild(el);
  /* barra inferior (celular) */
  var bi=document.createElement('nav');bi.className='cm-barra-inferior';bi.setAttribute('aria-label','Navegação principal');
  if(ctx==='portal'){
    bi.innerHTML=PORTAL.barra.map(function(p){return '<a href="'+href(p[0])+'"'+(cfg.tela===p[0]?' aria-current="page"':'')+'>'+I(p[1])+'<span>'+p[0]+'</span></a>'}).join('')+'<button type="button" data-acao="gaveta">'+I('menu')+'<span>Mais</span></button>';
  } else {
    var f=ctx==='superadmin'?'Clientes da plataforma':papel.inferior,ft=acharTela(f,mapa);
    bi.innerHTML='<a href="'+href('Início')+'"'+(cfg.tela==='Início'?' aria-current="page"':'')+'>'+I('inicio')+'<span>Início</span></a>'+
      '<a href="'+href(f)+'"'+(cfg.tela===f?' aria-current="page"':'')+'>'+I((ft&&ft.icone)||'favorito')+'<span>'+esc(f.length>12?f.split(' ')[0]:f)+'</span></a>'+
      '<button type="button" data-acao="paleta">'+I('pesquisar')+'<span>Pesquisar</span></button>'+
      '<button type="button" data-acao="sino">'+I('notificacoes')+'<span>Avisos</span>'+(sino?'<span class="cm-contador cm-contador--novo cm-contador--p">'+sino+'</span>':'')+'</button>'+
      '<button type="button" data-acao="gaveta">'+I('menu')+'<span>Menu</span></button>';
  }
  document.body.appendChild(bi);document.body.classList.add('cm-tem-barra-inferior');
  /* rodapé de atalhos */
  if(cfg.atalhos){
    var at=cfg.atalhos===true?[['J','próxima'],['K','anterior'],['R','responder'],['N','nota interna'],['/','respostas rápidas'],['E','resolver'],['A','atribuir'],['Ctrl Enter','enviar'],['Esc','voltar à fila']]:cfg.atalhos;
    var ra=document.createElement('div');ra.className='cm-rodape-atalhos cm-rodape-atalhos--fixo';ra.setAttribute('aria-label','Atalhos de teclado');
    ra.innerHTML=I('teclado')+at.map(function(a){return '<span>'+a[0].split(' ').map(function(k){return '<kbd class="cm-tecla">'+esc(k)+'</kbd>'}).join('')+esc(a[1])+'</span>'}).join('')+'<button class="cm-botao cm-botao--link cm-empurra" type="button" data-acao="atalhos">Todos os atalhos</button>';
    document.body.appendChild(ra);
    document.documentElement.style.setProperty('--cm-rodape-altura','30px');
  }
  medir(m);
  ligar(m,{cfg:cfg,ctx:ctx,u:u,papel:papel,mapa:mapa,visiveis:visiveis,grupoAtual:grupoAtual,blocoAtual:blocoAtual});
  if(window.cmTrocarIcones) window.cmTrocarIcones(m);
  if(window.CM_MARCA){var ns=m.querySelectorAll('[data-marca-nome]');for(var i=0;i<ns.length;i++) ns[i].textContent=window.CM_MARCA.nome;var is=m.querySelectorAll('[data-marca-inicial]');for(var j=0;j<is.length;j++) is[j].textContent=window.CM_MARCA.inicial}
}
function medir(m){
  function f(){var t=m.getBoundingClientRect().height;var tr=m.nextElementSibling&&m.nextElementSibling.classList.contains('cm-trilha-pagina')?m.nextElementSibling.getBoundingClientRect().height:0;
    document.documentElement.style.setProperty('--cm-moldura-altura',t+'px');document.documentElement.style.setProperty('--cm-trilha-altura',tr+'px')}
  f();window.addEventListener('resize',f);
}

/* ---------------- comportamento ---------------- */
var aberto=null; // {tipo, el, gatilho}
function fechar(devolverFoco){
  if(!aberto) return;
  if(aberto.el&&aberto.el.parentNode) aberto.el.parentNode.removeChild(aberto.el);
  if(aberto.fundo&&aberto.fundo.parentNode) aberto.fundo.parentNode.removeChild(aberto.fundo);
  if(aberto.gatilho){aberto.gatilho.setAttribute('aria-expanded','false');if(devolverFoco) aberto.gatilho.focus()}
  aberto=null;
}
function ligar(m,S){
  var grupos=[].slice.call(m.querySelectorAll('.cm-grupo'));
  /* cascata */
  function abrirGrupo(btn,focar){
    var g=null;S.visiveis.forEach(function(x){if(x.grupo===btn.getAttribute('data-grupo')) g=x});
    if(!g) return;
    fechar();
    var c=document.createElement('div');
    var direta=contar(g)<=8||g.blocos.length===1;
    c.className='cm-cascata'+(direta?' cm-cascata--lista':'');c.setAttribute('role','menu');c.setAttribute('aria-label',g.grupo);
    var blocoIni=g.grupo===S.grupoAtual&&S.blocoAtual?S.blocoAtual:g.blocos[0].bloco;
    function telasDe(b){return '<div class="cm-cascata__titulo">'+esc(b.bloco)+'</div>'+b.telas.map(function(t){return '<a class="cm-cascata__tela" role="menuitem" href="'+href(t)+'"'+(t===S.cfg.tela?' aria-current="page"':'')+' tabindex="-1">'+esc(t)+'</a>'}).join('')}
    if(direta){
      c.innerHTML='<div class="cm-cascata__telas">'+g.blocos.map(telasDe).join('')+'</div>';
    } else {
      c.innerHTML='<div class="cm-cascata__blocos">'+g.blocos.map(function(b){return '<button class="cm-cascata__bloco'+(b.bloco===S.blocoAtual&&g.grupo===S.grupoAtual?' is-atual':'')+'" type="button" role="menuitem" aria-haspopup="true" aria-expanded="'+(b.bloco===blocoIni)+'" data-bloco="'+esc(b.bloco)+'" tabindex="-1">'+esc(b.bloco)+'<span>'+b.telas.length+'</span>'+I('chevron-direita')+'</button>'}).join('')+'</div>'+
        '<div class="cm-cascata__telas'+(contarBloco(g,blocoIni)<=7?' is-uma-coluna':'')+'"></div>';
      var alvo=c.querySelector('.cm-cascata__telas');
      var mostrar=function(nome){g.blocos.forEach(function(b){if(b.bloco===nome){alvo.innerHTML=telasDe(b);alvo.classList.toggle('is-uma-coluna',b.telas.length<=7)}});
        [].forEach.call(c.querySelectorAll('.cm-cascata__bloco'),function(x){x.setAttribute('aria-expanded',x.getAttribute('data-bloco')===nome)})};
      mostrar(blocoIni);
      var temp=null;
      c.addEventListener('mouseover',function(e){var b=e.target.closest('.cm-cascata__bloco');if(!b) return;clearTimeout(temp);temp=setTimeout(function(){mostrar(b.getAttribute('data-bloco'))},200)});
      c.addEventListener('click',function(e){var b=e.target.closest('.cm-cascata__bloco');if(b){clearTimeout(temp);mostrar(b.getAttribute('data-bloco'));var p=alvo.querySelector('.cm-cascata__tela');if(p&&e.detail===0)p.focus()}});
    }
    var r=btn.getBoundingClientRect(),mr=m.getBoundingClientRect();
    m.appendChild(c);
    var left=r.left-mr.left;var w=c.offsetWidth;if(left+w>window.innerWidth-12) left=Math.max(12,window.innerWidth-12-w);
    c.style.left=left+'px';
    btn.setAttribute('aria-expanded','true');
    aberto={tipo:'grupo',el:c,gatilho:btn};
    if(focar){var f=c.querySelector('.cm-cascata__bloco[aria-expanded="true"],.cm-cascata__tela');if(f) f.focus()}
    if(window.cmTrocarIcones) window.cmTrocarIcones(c);
  }
  function contarBloco(g,n){var k=0;g.blocos.forEach(function(b){if(b.bloco===n)k=b.telas.length});return k}
  grupos.forEach(function(b,i){
    b.addEventListener('click',function(e){e.stopPropagation();if(aberto&&aberto.gatilho===b){fechar();return}abrirGrupo(b,e.detail===0)});
    b.addEventListener('mouseenter',function(){if(aberto&&aberto.tipo==='grupo'&&aberto.gatilho!==b) abrirGrupo(b,false)});
    b.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var n=grupos[(i+(e.key==='ArrowRight'?1:-1)+grupos.length)%grupos.length];grupos.forEach(function(x){x.tabIndex=-1});n.tabIndex=0;n.focus();if(aberto&&aberto.tipo==='grupo') abrirGrupo(n,false)}
      if(e.key==='ArrowDown'){e.preventDefault();abrirGrupo(b,true)}
    });
  });
  m.addEventListener('keydown',function(e){
    if(!aberto||aberto.tipo!=='grupo') return;
    var c=aberto.el,a=document.activeElement;if(!c.contains(a)) return;
    var col=a.classList.contains('cm-cascata__bloco')?[].slice.call(c.querySelectorAll('.cm-cascata__bloco')):[].slice.call(c.querySelectorAll('.cm-cascata__tela'));
    var i=col.indexOf(a);
    if(e.key==='ArrowDown'){e.preventDefault();col[(i+1)%col.length].focus()}
    else if(e.key==='ArrowUp'){e.preventDefault();col[(i-1+col.length)%col.length].focus()}
    else if(e.key==='ArrowRight'&&a.classList.contains('cm-cascata__bloco')){e.preventDefault();a.click();var t=c.querySelector('.cm-cascata__tela');if(t)t.focus()}
    else if(e.key==='ArrowLeft'&&a.classList.contains('cm-cascata__tela')){e.preventDefault();var bl=c.querySelector('.cm-cascata__bloco[aria-expanded="true"]');if(bl)bl.focus()}
  });
  /* ações da barra */
  m.addEventListener('click',function(e){
    var b=e.target.closest('[data-acao]');if(!b||!m.contains(b)) return;
    e.stopPropagation();
    var a=b.getAttribute('data-acao');
    if(aberto&&aberto.gatilho===b){fechar();return}
    if(a==='paleta') return abrirPaleta(S);
    if(a==='gaveta') return abrirGaveta(S);
    if(a==='sino') return abrirPainel(b,m,'sino',S);
    if(a==='conta') return abrirPainel(b,m,'conta',S);
    if(a==='cliente') return abrirPainel(b,m,'cliente',S);
    if(a==='ajustar') return abrirPainel(b,m,'ajustar',S);
    if(a==='config') return abrirConfig(b,m,S);
  });
  document.body.addEventListener('click',function(e){
    var b=e.target.closest('.cm-barra-inferior [data-acao], .cm-rodape-atalhos [data-acao]');if(!b) return;
    e.stopPropagation();var a=b.getAttribute('data-acao');
    if(a==='paleta') abrirPaleta(S);else if(a==='gaveta') abrirGaveta(S);else if(a==='sino') abrirPainel(m.querySelector('[data-acao="sino"]'),m,'sino',S);else if(a==='atalhos') abrirAtalhos();
  });
  document.addEventListener('click',function(e){if(aberto&&!aberto.modal&&!aberto.el.contains(e.target)) fechar()});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&aberto){e.preventDefault();fechar(true);return}
    if((e.ctrlKey||e.metaKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();abrirPaleta(S)}
  });
}
function abrirConfig(b,m,S){
  fechar();
  var c=document.createElement('div');c.className='cm-cascata';c.setAttribute('role','menu');c.setAttribute('aria-label','Configuração');
  c.innerHTML='<div class="cm-cascata__blocos">'+CONFIGURACAO.blocos.map(function(x,i){return '<button class="cm-cascata__bloco" type="button" aria-expanded="'+(i===0)+'" data-bloco="'+esc(x.bloco)+'">'+esc(x.bloco)+'<span>'+x.telas.length+'</span>'+I('chevron-direita')+'</button>'}).join('')+'</div><div class="cm-cascata__telas"></div>';
  var alvo=c.querySelector('.cm-cascata__telas');
  function mostrar(n){CONFIGURACAO.blocos.forEach(function(x){if(x.bloco===n) alvo.innerHTML='<div class="cm-cascata__titulo">'+esc(x.bloco)+'</div>'+x.telas.map(function(t){return '<a class="cm-cascata__tela" href="'+href(t)+'"'+(t===S.cfg.tela?' aria-current="page"':'')+'>'+esc(t)+'</a>'}).join('')});
    [].forEach.call(c.querySelectorAll('.cm-cascata__bloco'),function(x){x.setAttribute('aria-expanded',x.getAttribute('data-bloco')===n)})}
  mostrar('Empresa');
  c.addEventListener('click',function(e){var x=e.target.closest('.cm-cascata__bloco');if(x){e.stopPropagation();mostrar(x.getAttribute('data-bloco'))}});
  c.style.top=m.querySelector('.cm-barra-cima').getBoundingClientRect().bottom-m.getBoundingClientRect().top+'px';
  m.appendChild(c);c.style.left='auto';c.style.right='8px';
  b.setAttribute('aria-expanded','true');aberto={tipo:'config',el:c,gatilho:b};
}

/* painéis da barra de cima */
var AVISOS=[
 {aba:'mencoes',novo:true,av:['JP',3],txt:'<b>Juliana Prado</b> mencionou você numa nota interna do chamado <b>48213</b>: “corretiva urgente, sim. Já avisei o Diego.”',q:'há 4 min'},
 {aba:'aprovacoes',novo:true,av:['DM',4],txt:'<b>Diego Martins</b> pediu para trocar o plantão de sábado, 18/10, com você.',q:'há 22 min',acoes:true},
 {aba:'sistema',novo:true,ic:'cronometro',txt:'O SLA de <b>Patrícia Nunes</b> (reserva do salão) venceu há 4 min.',q:'há 4 min'},
 {aba:'mencoes',av:['MC',1],txt:'<b>Marina Costa</b> respondeu no chamado 48213 com uma foto.',q:'09:38'},
 {aba:'sistema',ic:'comunicado',txt:'Comunicado da diretoria: <b>novo horário da portaria remota</b>. Confirme a ciência até sexta.',q:'ontem'}
];
function abrirPainel(b,m,tipo,S){
  fechar();
  var p=document.createElement('div');p.className='cm-painel-topo';p.setAttribute('role','dialog');
  var h='';
  if(tipo==='sino'){
    p.setAttribute('aria-label','Notificações');
    h='<div class="cm-painel-topo__cabeca"><h2>Notificações</h2><button class="cm-botao cm-botao--link cm-botao--p" type="button" data-marcar-lidas>Marcar todas como lidas</button></div>'+
      '<div class="cm-abas cm-abas--p" role="tablist" style="padding:0 6px">'+[['tudo','Tudo',5],['mencoes','Menções',2],['aprovacoes','Aprovações',1],['sistema','Sistema',2]].map(function(a,i){return '<button role="tab" type="button" aria-selected="'+(i===0)+'" data-aba="'+a[0]+'">'+a[1]+' <span class="cm-contador'+(i===0?' cm-contador--novo':'')+'">'+a[2]+'</span></button>'}).join('')+'</div>'+
      '<div class="cm-painel-topo__corpo" data-lista></div>'+
      '<div class="cm-painel-topo__pe"><a class="cm-link" href="#">Ver todas</a><a class="cm-link cm-link--discreto cm-empurra" href="#">Preferências de notificação</a></div>';
    p.innerHTML=h;
    var desenhar=function(aba){p.querySelector('[data-lista]').innerHTML=AVISOS.filter(function(a){return aba==='tudo'||a.aba===aba}).map(function(a){
      return '<a href="#" class="cm-aviso-item'+(a.novo?' is-novo':'')+'">'+(a.av?'<span class="cm-avatar cm-avatar--m cm-avatar--'+a.av[1]+'">'+a.av[0]+'</span>':'<span class="cm-ladrilho cm-ladrilho--p">'+I(a.ic)+'</span>')+
      '<span><span class="cm-aviso-item__texto">'+a.txt+'</span><span class="cm-aviso-item__quando">'+a.q+'</span>'+(a.acoes?'<span class="cm-aviso-item__acoes"><button class="cm-botao cm-botao--p" type="button">Recusar</button><button class="cm-botao cm-botao--p cm-botao--principal" type="button">Aceitar a troca</button></span>':'')+'</span><span></span></a>'}).join('')||'<div class="cm-vazio"><p class="cm-vazio__texto">Nada aqui. As novidades desta aba aparecem neste lugar.</p></div>'};
    desenhar('tudo');
    p.addEventListener('click',function(e){var t=e.target.closest('[data-aba]');if(t){[].forEach.call(p.querySelectorAll('[data-aba]'),function(x){x.setAttribute('aria-selected',x===t)});desenhar(t.getAttribute('data-aba'))}
      if(e.target.closest('[data-marcar-lidas]')){[].forEach.call(p.querySelectorAll('.is-novo'),function(x){x.classList.remove('is-novo')});var c=b.querySelector('.cm-contador');if(c)c.remove()}});
  } else if(tipo==='conta'){
    p.setAttribute('aria-label','Sua conta');p.style.width='320px';
    var u=S.u,pr=u.presenca||'disponivel';
    var tema=document.documentElement.getAttribute('data-theme'),dens=document.documentElement.getAttribute('data-densidade')||'compacta';
    h='<div class="cm-conta__cabeca"><span class="cm-avatar cm-avatar--g cm-avatar--'+(u.tom||1)+'">'+esc(u.iniciais)+presenca(pr)+'</span><div><div class="cm-conta__nome">'+esc(u.nome)+'</div><div class="cm-conta__sub">'+esc(u.cargo)+'</div><div class="cm-presenca-texto" data-presenca-texto>'+presenca(pr)+esc(nomePresenca(pr))+'</div></div></div>'+
      (S.ctx==='portal'?'':'<button class="cm-conta__status" type="button">'+I('conversa')+'Na fila do WhatsApp até 18h</button>'+
      '<div class="cm-menu__titulo">Presença</div>'+PRESENCAS.map(function(x){return '<button class="cm-menu__item" type="button" role="menuitemradio" aria-checked="'+(x[0]===pr)+'" data-presenca="'+x[0]+'">'+presenca(x[0])+'<span>'+x[1]+'</span><span class="cm-menu__atalho">'+(x[0]==='ausente'?'some em 30 min':'')+'</span></button>'}).join('')+'<div class="cm-menu__sep"></div>')+
      '<div class="cm-conta__linha"><span>Tema</span><div class="cm-segmentado cm-segmentado--p"><button type="button" data-cm-tema="dark" aria-pressed="'+(tema==='dark')+'">Escuro</button><button type="button" data-cm-tema="light" aria-pressed="'+(tema==='light')+'">Claro</button><button type="button" data-cm-tema="sistema" aria-pressed="false">Sistema</button></div></div>'+
      (S.ctx==='portal'?'':'<div class="cm-conta__linha"><span>Densidade</span><div class="cm-segmentado cm-segmentado--p"><button type="button" data-cm-densidade="compacta" aria-pressed="'+(dens==='compacta')+'">Compacta</button><button type="button" data-cm-densidade="padrao" aria-pressed="'+(dens==='padrao')+'">Padrão</button><button type="button" data-cm-densidade="confortavel" aria-pressed="'+(dens==='confortavel')+'">Confortável</button></div></div>')+
      '<div class="cm-menu__sep"></div>'+
      '<a class="cm-menu__item" href="#">'+I('perfil')+'<span>Meu perfil</span><span></span></a>'+
      (S.ctx==='portal'?'<a class="cm-menu__item" href="#">'+I('unidade')+'<span>Minhas unidades</span><span></span></a>':'<button class="cm-menu__item" type="button" data-atalhos>'+I('teclado')+'<span>Atalhos de teclado</span><span class="cm-menu__atalho">?</span></button>')+
      '<button class="cm-menu__item" type="button">'+I('sair')+'<span>Sair</span><span></span></button><div style="height:4px"></div>';
    p.innerHTML=h;
    p.addEventListener('click',function(e){var x=e.target.closest('[data-presenca]');if(x){var v=x.getAttribute('data-presenca');[].forEach.call(p.querySelectorAll('[data-presenca]'),function(y){y.setAttribute('aria-checked',y===x)});
      var av=b.querySelector('.cm-presenca');if(av) av.outerHTML=presenca(v);var gp=p.querySelector('.cm-conta__cabeca .cm-presenca');if(gp) gp.outerHTML=presenca(v);
      p.querySelector('[data-presenca-texto]').innerHTML=presenca(v)+esc(nomePresenca(v));S.u.presenca=v;b.setAttribute('aria-label','Sua conta e presença: '+nomePresenca(v))}
      if(e.target.closest('[data-atalhos]')){fechar();abrirAtalhos()}
      if(e.target.closest('[data-cm-tema="sistema"]')&&window.cmAplicarTema){window.cmAplicarTema('sistema')}
    });
  } else if(tipo==='cliente'){
    p.setAttribute('aria-label','Trocar de cliente');p.style.width='340px';
    var cl=window.CM_CLIENTES||{alpha:{nome:'Administradora Alpha',inicial:'A',cor:'#1E5F74'}};
    h='<div class="cm-painel-topo__cabeca"><h2>Trocar de cliente</h2></div><div style="padding:8px 12px"><div class="cm-entrada cm-entrada--busca">'+I('pesquisar')+'<input type="search" placeholder="Buscar cliente" aria-label="Buscar cliente"></div></div><div class="cm-painel-topo__corpo">'+
      Object.keys(cl).map(function(k){var c=cl[k];return '<button class="cm-menu__item" type="button" data-cliente="'+k+'" role="menuitemradio" aria-checked="'+((window.CM_MARCA&&window.CM_MARCA.nome)===c.nome)+'" style="grid-template-columns:28px 1fr auto;min-height:44px"><span class="cm-avatar cm-avatar--empresa" style="background:'+c.cor+';color:#fff">'+c.inicial+'</span><span>'+esc(c.nome)+'<span class="cm-menu__desc">'+esc(c.cidade||'')+'</span></span><span></span></button>'}).join('')+
      '</div><div class="cm-painel-topo__pe cm-t-legenda">'+(S.ctx==='superadmin'?'Entrar num cliente pede motivo e cria a faixa de contexto.':'A troca vale só para esta aba.')+'</div>';
    p.innerHTML=h;
    p.addEventListener('click',function(e){var x=e.target.closest('[data-cliente]');if(x&&window.cmAplicarMarca){window.cmAplicarMarca(x.getAttribute('data-cliente'));fechar(true)}});
  } else if(tipo==='ajustar'){
    p.setAttribute('aria-label','Ajustar menu');p.style.width='340px';
    h='<div class="cm-painel-topo__cabeca"><h2>Ajustar menu</h2></div><p class="cm-t-legenda" style="padding:4px 12px 8px">O papel '+esc(S.cfg.papel||'Atendimento')+' começa com estes grupos. Você pode esconder ou mostrar; o acesso não muda.</p><div class="cm-painel-topo__corpo" style="padding:0 12px 8px;display:flex;flex-direction:column;gap:8px">'+
      MAPA.map(function(g){var on=S.visiveis.some(function(v){return v.grupo===g.grupo});var pode=S.papel.grupos.indexOf(g.grupo)>=0||S.cfg.papel==='Diretoria';
        return '<label class="cm-marcar"'+(pode?'':' title="Sem acesso pelo seu papel"')+'><input type="checkbox" '+(on?'checked ':'')+(pode?'':'disabled ')+'data-ajustar="'+esc(g.grupo)+'"><span class="cm-marcar__caixa"></span><span>'+esc(g.grupo)+(pode?'':' <span class="cm-texto-3">sem acesso</span>')+'</span></label>'}).join('')+
      '</div><div class="cm-painel-topo__pe"><span class="cm-t-legenda">Arraste os favoritos na barra para reordenar.</span><button class="cm-botao cm-botao--p cm-empurra" type="button" data-restaurar>Restaurar do papel</button></div>';
    p.innerHTML=h;
    p.addEventListener('change',function(e){var x=e.target.closest('[data-ajustar]');if(!x) return;var g=x.getAttribute('data-ajustar');var bt=m.querySelector('.cm-grupo[data-grupo="'+g+'"]');if(bt) bt.hidden=!x.checked;
      var n=[].filter.call(m.querySelectorAll('.cm-grupo'),function(y){return !y.hidden}).length;var sp=m.querySelector('.cm-papel>span');if(sp) sp.textContent=n+' de '+MAPA.length+' módulos'});
  }
  m.appendChild(p);
  if(tipo==='ajustar'){var r=b.getBoundingClientRect();p.style.top=(r.bottom-m.getBoundingClientRect().top+4)+'px'}
  else {var bc=m.querySelector('.cm-barra-cima,.cm-portal-topo');p.style.top=(bc.getBoundingClientRect().bottom-m.getBoundingClientRect().top+4)+'px'}
  if(b) b.setAttribute('aria-expanded','true');
  aberto={tipo:tipo,el:p,gatilho:b};
  if(window.cmTrocarIcones) window.cmTrocarIcones(p);
  var f=p.querySelector('[aria-selected="true"],[aria-checked="true"],button,a,input');if(f&&tipo!=='sino') f.focus();
}

/* gaveta */
function abrirGaveta(S){
  fechar();
  var fundo=document.createElement('div');fundo.className='cm-gaveta-fundo';
  var g=document.createElement('nav');g.className='cm-gaveta';g.setAttribute('aria-label','Menu');
  var rec=lerRecentes()||[S.cfg.tela||'Conversas'];
  var h='<div class="cm-gaveta__topo">'+(S.ctx==='superadmin'?'<a class="cm-testeira cm-testeira--gaco" href="#"><span class="cm-testeira__logo">G</span><span class="cm-testeira__nome">GACO Plataforma</span></a>':'<a class="cm-testeira" href="#"><span class="cm-testeira__logo" data-marca-inicial>'+esc((window.CM_MARCA||{}).inicial||'A')+'</span><span class="cm-testeira__nome" data-marca-nome>'+esc((window.CM_MARCA||{}).nome||'Administradora Alpha')+'</span></a>')+
    '<button class="cm-botao cm-botao--discreto cm-botao--icone cm-botao--toque" type="button" data-fechar aria-label="Fechar menu">'+I('fechar')+'</button></div>';
  h+='<div class="cm-gaveta__busca"><button class="cm-busca-global" type="button" data-paleta style="width:100%;margin:0;height:40px;flex:none">'+I('pesquisar')+'<span>Pesquisar</span></button></div><div class="cm-gaveta__corpo">';
  if(S.ctx==='portal'){
    h+=PORTAL.principal.concat(PORTAL.mais.filter(function(x){return !PORTAL.principal.some(function(y){return y[0]===x[0]})})).map(function(x){return '<a class="cm-gaveta__link" href="'+href(x[0])+'"'+(x[0]===S.cfg.tela?' aria-current="page"':'')+'>'+I(x[1])+esc(x[0])+'</a>'}).join('');
  } else {
    h+='<a class="cm-gaveta__link" href="'+href('Início')+'"'+(S.cfg.tela==='Início'?' aria-current="page"':'')+'>'+I('inicio')+'Início</a>';
    h+='<div class="cm-gaveta__titulo">Recentes</div>'+rec.slice(0,4).map(function(t){var x=acharTela(t,S.mapa.concat([CONFIGURACAO]));return '<a class="cm-gaveta__link" href="'+href(t)+'"'+(t===S.cfg.tela?' aria-current="page"':'')+'>'+I((x&&x.icone)||'recentes')+esc(t)+'</a>'}).join('');
    h+='<div class="cm-gaveta__titulo">Favoritos</div>'+(S.ctx==='superadmin'?[]:S.papel.favoritos).map(function(t){var x=acharTela(t,S.mapa);return '<a class="cm-gaveta__link" href="'+href(t)+'">'+I((x&&x.icone)||'favorito')+esc(t)+'</a>'}).join('');
    h+='<div class="cm-gaveta__titulo">Módulos</div>';
    var lista=S.visiveis.concat(S.ctx==='superadmin'?[]:[CONFIGURACAO]);
    h+=lista.map(function(gr){var atual=gr.grupo===S.grupoAtual;
      return '<details'+(atual?' open class="cm-gaveta__grupo-atual"':'')+'><summary>'+I(gr.icone)+esc(gr.grupo)+I('chevron-baixo')+'</summary>'+
        (gr.blocos.length===1?gr.blocos[0].telas.map(function(t){return '<a class="cm-gaveta__link" style="padding-left:46px;min-height:40px;font-size:13.5px" href="'+href(t)+'"'+(t===S.cfg.tela?' aria-current="page"':'')+'>'+esc(t)+'</a>'}).join(''):
        gr.blocos.map(function(b){return '<details'+(atual&&b.bloco===S.blocoAtual?' open':'')+'><summary>'+esc(b.bloco)+'</summary>'+b.telas.map(function(t){return '<a class="cm-gaveta__link" href="'+href(t)+'"'+(t===S.cfg.tela?' aria-current="page"':'')+'>'+esc(t)+'</a>'}).join('')+'</details>'}).join(''))+'</details>'}).join('');
  }
  h+='</div><div class="cm-gaveta__pe">'+I('teclado')+'Ctrl K pesquisa qualquer tela</div>';
  g.innerHTML=h;
  document.body.appendChild(fundo);document.body.appendChild(g);
  aberto={tipo:'gaveta',el:g,fundo:fundo,modal:true};
  fundo.addEventListener('click',function(){fechar()});
  g.addEventListener('click',function(e){if(e.target.closest('[data-fechar]')) fechar();if(e.target.closest('[data-paleta]')){fechar();abrirPaleta(S)}});
  var f=g.querySelector('[aria-current="page"]')||g.querySelector('[data-fechar]');if(f) f.focus();
}

/* paleta ⌘K */
function abrirPaleta(S){
  fechar();
  var fundo=document.createElement('div');fundo.className='cm-sobreposicao cm-sobreposicao--paleta';
  fundo.innerHTML='<div class="cm-paleta" role="dialog" aria-modal="true" aria-label="Pesquisar">'+
    '<div class="cm-paleta__busca">'+I('pesquisar')+'<input type="text" role="combobox" aria-expanded="true" aria-controls="cm-paleta-lista" aria-autocomplete="list" placeholder="Pesquisar telas, registros e ações" aria-label="Pesquisar"><kbd class="cm-tecla">Esc</kbd></div>'+
    '<div class="cm-paleta__lista" id="cm-paleta-lista" role="listbox"></div>'+
    '<div class="cm-paleta__pe"><span><kbd class="cm-tecla">↑</kbd><kbd class="cm-tecla">↓</kbd>andar</span><span><kbd class="cm-tecla">Enter</kbd>abrir</span><span><kbd class="cm-tecla">Ctrl</kbd><kbd class="cm-tecla">Enter</kbd>abrir em nova aba</span><span class="cm-empurra">Digite ">" para só ações</span></div></div>';
  document.body.appendChild(fundo);
  aberto={tipo:'paleta',el:fundo,modal:true,gatilho:null};
  var inp=fundo.querySelector('input'),lista=fundo.querySelector('.cm-paleta__lista'),sel=0,itens=[];
  var telas=todasTelas((S.ctx==='superadmin'?PLATAFORMA:S.visiveis).concat(S.ctx==='superadmin'?[]:[CONFIGURACAO]));
  function marcarTexto(t,qq){if(!qq) return esc(t);var i=t.toLowerCase().indexOf(qq.toLowerCase());return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+qq.length))+'</mark>'+esc(t.slice(i+qq.length))}
  function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
  function desenhar(){
    var qq=inp.value.trim(),soAcao=qq.charAt(0)==='>';if(soAcao) qq=qq.slice(1).trim();
    var n=norm(qq);var grupos=[];
    if(!qq&&!soAcao){
      var rec=(lerRecentes()||['Conversas','Chamados','Clientes']).slice(0,4);
      grupos.push(['Recentes',rec.map(function(t){var x=acharTela(t,telas.length?S.mapa.concat([CONFIGURACAO]):[]);return {ic:(x&&x.icone)||'recentes',t:t,s:x?x.grupo+' › '+x.bloco:'',tipo:'Tela'}})]);
      grupos.push(['Ações',ACOES.slice(0,4).map(function(a){return {ic:a[0],t:a[1],s:'',tipo:a[2]?'<kbd class="cm-tecla">'+a[2]+'</kbd>':'Ação'}})]);
    } else {
      if(!soAcao){
        var tt=telas.filter(function(x){return norm(x.tela).indexOf(n)>=0||norm(x.bloco).indexOf(n)>=0}).slice(0,6);
        if(tt.length) grupos.push(['Telas',tt.map(function(x){return {ic:x.icone,t:x.tela,s:x.grupo+' › '+x.bloco,tipo:'Tela'}})]);
        var rr=REGISTROS.filter(function(r){return norm(r[1]+' '+r[2]).indexOf(n)>=0}).slice(0,5);
        if(rr.length) grupos.push(['Registros',rr.map(function(r){return {ic:r[0],t:r[1],s:r[2],tipo:r[3]}})]);
      }
      var aa=ACOES.filter(function(a){return norm(a[1]).indexOf(n)>=0});
      if(aa.length) grupos.push(['Ações',aa.map(function(a){return {ic:a[0],t:a[1],s:'',tipo:a[2]?'<kbd class="cm-tecla">'+a[2]+'</kbd>':'Ação'}})]);
    }
    itens=[];var h='';
    grupos.forEach(function(g){h+='<div class="cm-paleta__grupo" role="presentation">'+g[0]+'</div>';g[1].forEach(function(x){var k=itens.length;itens.push(x);
      h+='<div class="cm-paleta__item" role="option" id="cm-pi-'+k+'" data-k="'+k+'" aria-selected="'+(k===sel)+'"><span class="cm-ladrilho cm-ladrilho--p">'+I(x.ic)+'</span><span style="min-width:0"><span class="cm-paleta__item-titulo">'+marcarTexto(x.t,qq)+'</span>'+(x.s?'<span class="cm-paleta__item-sub">'+esc(x.s)+'</span>':'')+'</span><span class="cm-paleta__item-tipo">'+x.tipo+'</span></div>'})});
    if(!itens.length) h='<div class="cm-vazio"><p class="cm-vazio__titulo">Nada com “'+esc(qq)+'”.</p><p class="cm-vazio__texto">Confira a grafia ou pesquise pelo número do chamado, da OS ou do contrato.</p></div>';
    lista.innerHTML=h;
    inp.setAttribute('aria-activedescendant',itens.length?'cm-pi-'+sel:'');
  }
  function mover(d){if(!itens.length) return;sel=(sel+d+itens.length)%itens.length;[].forEach.call(lista.querySelectorAll('.cm-paleta__item'),function(x){x.setAttribute('aria-selected',+x.getAttribute('data-k')===sel)});var a=lista.querySelector('[data-k="'+sel+'"]');if(a)a.scrollIntoView({block:'nearest'})}
  function abrir(k){var x=itens[k];if(!x) return;if(x.t.indexOf('Alternar tema')===0&&window.cmAplicarTema){window.cmAplicarTema(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')}
    else if(x.tipo==='Tela'){gravarRecente(x.t);var u=href(x.t);if(u!=='#'){location.href=u;return}}
    fechar();cmToast('Abrindo '+x.t,'info')}
  inp.addEventListener('input',function(){sel=0;desenhar()});
  inp.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();mover(1)}else if(e.key==='ArrowUp'){e.preventDefault();mover(-1)}else if(e.key==='Enter'){e.preventDefault();abrir(sel)}});
  lista.addEventListener('click',function(e){var x=e.target.closest('[data-k]');if(x) abrir(+x.getAttribute('data-k'))});
  fundo.addEventListener('mousedown',function(e){if(e.target===fundo) fechar()});
  desenhar();inp.focus();
  if(S.q){inp.value=S.q;desenhar()}
}
function abrirAtalhos(){
  fechar();
  var fundo=document.createElement('div');fundo.className='cm-sobreposicao';
  var L=[['Em qualquer tela',[['Ctrl K','Pesquisar telas, registros e ações'],['G I','Ir para o Início'],['?','Esta lista'],['Esc','Fechar menu, painel ou modal']]],
         ['Listas e registros',[['J','Próximo registro'],['K','Registro anterior'],['Enter','Abrir'],['X','Selecionar a linha'],['E','Editar o campo em foco'],['Ctrl S','Salvar']]],
         ['Conversas',[['R','Responder'],['N','Nota interna'],['/','Respostas rápidas'],['A','Atribuir'],['E','Resolver'],['Ctrl Enter','Enviar']]]];
  fundo.innerHTML='<div class="cm-modal cm-modal--g" role="dialog" aria-modal="true" aria-labelledby="cm-at-t"><div class="cm-modal__cabeca"><h2 class="cm-modal__titulo" id="cm-at-t">Atalhos de teclado</h2><button class="cm-botao cm-botao--discreto cm-botao--icone" type="button" data-fechar aria-label="Fechar">'+I('fechar')+'</button></div><div class="cm-modal__corpo" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px">'+
    L.map(function(s){return '<div><h3 class="cm-t-subsecao" style="margin-bottom:8px">'+s[0]+'</h3>'+s[1].map(function(a){return '<div class="cm-linha" style="justify-content:space-between;padding:4px 0;border-bottom:1px dotted var(--cm-filete)"><span>'+a[1]+'</span><span>'+a[0].split(' ').map(function(k){return '<kbd class="cm-tecla">'+k+'</kbd>'}).join(' ')+'</span></div>'}).join('')+'</div>'}).join('')+'</div></div>';
  document.body.appendChild(fundo);aberto={tipo:'atalhos',el:fundo,modal:true};
  fundo.addEventListener('click',function(e){if(e.target===fundo||e.target.closest('[data-fechar]')) fechar()});
  fundo.querySelector('[data-fechar]').focus();
}

/* toast simples (usado pela paleta e pelas telas) */
function cmToast(texto,tipo,acao){
  var c=document.querySelector('.cm-toasts');if(!c){c=document.createElement('div');c.className='cm-toasts';c.setAttribute('role','status');c.setAttribute('aria-live','polite');document.body.appendChild(c)}
  var t=document.createElement('div');t.className='cm-toast cm-toast--'+(tipo||'info');
  var ic={sucesso:'sucesso',perigo:'perigo',aviso:'atencao',info:'informacao'}[tipo||'info'];
  t.innerHTML=I(ic)+'<span class="cm-toast__texto">'+esc(texto)+'</span>'+(acao?'<button class="cm-toast__acao" type="button">'+esc(acao)+'</button>':'')+'<button class="cm-toast__fechar" type="button" aria-label="Fechar">'+I('fechar','cm-icone--14')+'</button>';
  c.appendChild(t);t.querySelector('.cm-toast__fechar').onclick=function(){t.remove()};
  setTimeout(function(){t.remove()},acao?8000:4000);
}
window.cmToast=cmToast;window.cmAbrirPaleta=function(q){var el=document.querySelector('[data-cm-moldura]');abrirPaleta({ctx:'interno',cfg:{},mapa:MAPA,visiveis:MAPA,papel:PAPEIS.Diretoria,q:q})};
window.cmAbrirAtalhos=abrirAtalhos;

function iniciar(){var els=document.querySelectorAll('[data-moldura]');for(var i=0;i<els.length;i++) montar(els[i])}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar); else iniciar();
})();
