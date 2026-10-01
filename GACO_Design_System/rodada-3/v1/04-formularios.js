/* 04-formularios: geradores de estados, os três formulários completos e comportamentos só desta página */
(function(){
"use strict";
var D=document,DOC=window.LCDoc,G=DOC.geradores,esc=DOC.esc;
function $(s,r){return (r||D).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s));}
function at(v){return String(v).replace(/"/g,"&quot;");}

/* ---------- 1. Estados de campo ---------- */
var EST=[["normal","Normal"],["hover","Hover"],["foco","Foco"],["preenchido","Preenchido"],["desabilitado","Desabilitado","disabled"],["leitura","Só leitura","readonly"],["erro","Erro",'aria-invalid="true"'],["carregando","Carregando",'aria-busy="true"']];
var PASSO='<span class="lc-passo"><button type="button" tabindex="-1" aria-label="Aumentar"><i data-i="chevron-cima"></i></button><button type="button" tabindex="-1" aria-label="Diminuir"><i data-i="chevron-baixo"></i></button></span>';
var T={
 texto:{r:"Nome do condomínio",o:1,v:"Cond. Parque das Águas",fo:"Cond. Parque das Á",ph:"Ex.: Cond. Parque das Águas",aj:"Como aparece no boleto e no portal.",ev:"",er:"Nome do condomínio está vazio. Ele aparece no boleto e no portal. Preencha para continuar."},
 area:{tag:"textarea",r:"Observação da OS",v:"Levar registro de 3/4 e pegar a chave do subsolo com o zelador, Sr. Antônio.",fo:"Levar registro de 3/4 e",ph:"O que o fornecedor precisa saber",aj:"Vai impressa na OS.",ev:"Levar registro de 3/4 e pegar a chave do subsolo com o zelador, Sr. Antônio. Avisar a síndica Marina Costa ao chegar e ao sair, pelo interfone do bloco B ou pelo WhatsApp da portaria. Fotografar antes e depois, inclusive o reboco, porque o seguro pede as duas fotos. Conferir também a coluna de água fria do bloco C, que teve vazamento em agosto e foi consertada sem nota fiscal pelo fornecedor anterior, e anotar a leitura do hidrômetro geral antes de fechar o registro, para comparar com a conta de outubro, que veio 38% acima da média dos últimos 6 meses, sem justificativa da concessionária até agora. Levar escada.",er:"Observação passou do limite. A OS impressa tem até 500 caracteres. Corte 38.",cont:500},
 numero:{r:"Número de unidades",o:1,v:"184",fo:"18",num:1,post:PASSO,aj:"De 1 a 9.999.",ev:"18400",er:"Número acima do limite. O máximo é 9.999 unidades. Confira se não digitou um zero a mais."},
 moeda:{r:"Valor mensal",o:1,v:"4.620,00",fo:"4.62",num:1,pre:"R$",ph:"0,00",aj:"Entra no boleto de cada mês.",ev:"0,00",er:"Valor mensal está zerado. Sem valor o contrato não gera cobrança. Informe o valor acordado."},
 pct:{r:"Fundo de reserva",v:"10,00",fo:"1",num:1,post:'<span class="lc-entrada-grupo__fixo">%</span>',ph:"0,00",aj:"A convenção fixa 10%.",ev:"12,00",er:"Fundo de reserva acima da convenção. A convenção do Parque das Águas fixa 10%. Ajuste ou anexe a ata que mudou."},
 data:{r:"Vencimento",o:1,type:"date",v:"2026-11-10",fo:"2026-11-10",aj:"terça-feira, daqui a 40 dias.",ev:"2026-11-08",er:"Vencimento num domingo. O banco só compensa em dia útil. Escolha 09/11 ou 10/11."},
 datahora:{r:"Início da assembleia",o:1,type:"datetime-local",v:"2026-10-15T19:30",fo:"2026-10-15T19:30",aj:"O edital sai hoje para os 184 moradores.",ev:"2026-10-03T19:30",er:"Assembleia com menos de 8 dias de aviso. A convenção pede 8 dias entre o edital e a AGE. Escolha 09/10 ou depois."},
 hora:{r:"Início da reserva",type:"time",v:"19:30",fo:"19:30",aj:"Salão: das 10:00 às 22:00.",ev:"23:30",er:"Horário fora do regimento. O salão funciona das 10:00 às 22:00. Escolha outro horário."},
 doc:{r:"CPF ou CNPJ",o:1,v:"11.222.333/0001-81",fo:"529.982.24",ph:"Só os números",aj:"CPF para pessoa, CNPJ para empresa.",ev:"529.982.247-24",er:"CPF não confere. Os dois últimos números não batem com os nove primeiros. Confira se não houve troca de dígitos.",car:"Consultando o CNPJ na Receita.",carCampo:1},
 cep:{r:"CEP",o:1,v:"04538-132",fo:"04538-1",post:'<button type="button" class="lc-entrada-grupo__btn"><i data-i="pesquisar"></i>Consultar</button>',aj:"Preenche o endereço sozinho.",ev:"04538-999",er:"CEP não encontrado nos Correios. Ele pode ser novo ou de caixa postal. Preencha o endereço à mão.",car:"Consultando os Correios.",carGrp:1},
 tel:{r:"Celular",o:1,type:"tel",v:"(11) 98765-4321",fo:"(11) 9876",pre:"+55",aj:"Recebe o boleto pelo WhatsApp.",ev:"(11) 9876-54",er:"Telefone incompleto. Use DDD e número, 10 ou 11 dígitos; há 8. Exemplo: (11) 98765-4321."},
 email:{r:"E-mail",type:"email",v:"marina.costa@gmail.com",fo:"marina.costa@gm",ic:"email",ph:"nome@provedor.com",aj:"Recebe a segunda via e as circulares.",ev:"marina.costa@",er:"E-mail incompleto. Falta o domínio depois do @. Exemplo: marina.costa@gmail.com."},
 senha:{r:"Nova senha",o:1,type:"password",v:"Parque2026!seguro",fo:"Parque20",post:'<button type="button" class="lc-entrada-grupo__btn" aria-pressed="false"><i data-i="ver"></i>Mostrar</button>',aj:"12 caracteres ou mais; misture letras, números e um símbolo.",ev:"parque",er:"Senha curta. A senha precisa de 12 caracteres ou mais; esta tem 6. Acrescente letras e números.",forca:1}
};
function controle(t,id,s){
  var c=T[t],v=(s==="normal"||s==="hover")?"":s==="foco"?c.fo:s==="erro"?c.ev:c.v;
  var cl=s==="hover"?" lc-f-hover":s==="foco"?" lc-f-foco":"",grp=c.pre||c.post||c.ic;
  var a=' aria-describedby="'+id+'-m"'+(s==="desabilitado"?" disabled":"")+(s==="leitura"?" readonly":"")+(s==="erro"?' aria-invalid="true"':"")+(c.o?" required":"");
  var ph=c.ph?' placeholder="'+at(c.ph)+'"':"";
  var inp=c.tag==="textarea"?'<textarea id="'+id+'" class="lc-area-texto'+(grp?"":cl)+'" rows="3"'+ph+a+(c.cont?' maxlength="'+(s==="erro"?9999:c.cont)+'"':"")+'>'+esc(v)+'</textarea>'
    :'<input id="'+id+'" class="lc-entrada'+(c.num?" lc-entrada--num":"")+(grp?"":cl)+'"'+(c.type?' type="'+c.type+'"':"")+(c.num?' inputmode="numeric"':"")+' value="'+at(v)+'"'+ph+a+'>';
  if(!grp)return inp;
  var ga=(s==="desabilitado"?' aria-disabled="true"':"")+(s==="leitura"?' data-leitura="true"':"")+(s==="erro"?' aria-invalid="true"':"")+(s==="carregando"&&c.carGrp?' aria-busy="true"':"");
  var post=c.post||"";if(s==="desabilitado"||s==="leitura")post=post.replace("<button ","<button disabled ");if(s==="leitura"&&c.post&&c.post.indexOf("<button")>-1)post="";
  return '<div class="lc-entrada-grupo'+cl+'"'+ga+'>'+(c.pre?'<span class="lc-entrada-grupo__fixo">'+c.pre+'</span>':"")+(c.ic?'<span class="lc-entrada-grupo__ic" aria-hidden="true"><i data-i="'+c.ic+'"></i></span>':"")+inp+post+'</div>';
}
function mensagem(t,id,s){var c=T[t];
  if(s==="erro")return '<p class="lc-erro" id="'+id+'-m"><i data-i="erro"></i>'+c.er+'</p>';
  if(s==="leitura")return "";
  var txt=s==="carregando"&&c.car?c.car:c.aj;var aj='<p class="lc-ajuda" id="'+id+'-m">'+txt+'</p>';
  if(c.cont){var n=(s==="normal"||s==="hover")?0:s==="foco"?c.fo.length:s==="erro"?c.ev.length:c.v.length;return '<div class="lc-campo__pe">'+(s==="erro"?"":aj)+'<span class="lc-contagem-car"'+(n>c.cont?' data-estouro="true"':"")+'>'+n+' de '+c.cont+'</span></div>'+(s==="erro"?'<p class="lc-erro" id="'+id+'-m"><i data-i="erro"></i>'+c.er+'</p>':"");}
  return aj;}
G.estados=function(t){
  if(t==="selecao")return estadosSelecao();if(t==="combo")return estadosCombo();if(t==="multi")return estadosMulti();if(t==="escolha")return estadosEscolha();
  var c=T[t],h='<div class="lc-doc-estados" style="--_m:210px">\n';
  EST.forEach(function(e){var s=e[0];
    if(s==="carregando"&&!c.car){return;}
    var id="e-"+t+"-"+s;
    var forca=c.forca&&s!=="leitura"&&s!=="normal"&&s!=="hover"?'<div class="lc-forca" data-n="'+(s==="erro"?1:s==="foco"?2:4)+'" aria-hidden="true"><i></i><i></i><i></i><i></i></div>':"";
    h+='  <figure><figcaption>'+e[1]+(e[2]?' <code>'+esc(e[2])+'</code>':"")+'</figcaption><div class="lc-campo"'+(s==="carregando"&&c.carCampo?' aria-busy="true"':"")+'><label class="lc-rotulo" for="'+id+'">'+c.r+(c.o?' <span class="lc-obrig" aria-hidden="true">*</span>':"")+'</label>'+controle(t,id,s)+forca+mensagem(t,id,s)+'</div></figure>\n';});
  if(!c.car)h+='  <figure><figcaption>Carregando</figcaption><p class="lc-ajuda">Não se aplica: o valor é digitado, não buscado.</p></figure>\n';
  return h+'</div>';
};
function fig(nome,cod,corpo){return '  <figure><figcaption>'+nome+(cod?' <code>'+esc(cod)+'</code>':"")+'</figcaption>'+corpo+'</figure>\n';}
function estadosSelecao(){
  var ops=function(sel){return ["Escolha o índice","IGP-M","IPCA","INPC"].map(function(o,i){return '<option'+(i===sel?" selected":"")+(i===0?' value=""':"")+'>'+o+'</option>';}).join("");};
  var rot=function(id){return '<label class="lc-rotulo" for="'+id+'">Índice de reajuste <span class="lc-obrig" aria-hidden="true">*</span></label>';};
  var h='<div class="lc-doc-estados" style="--_m:210px">\n';
  h+=fig("Normal","",'<div class="lc-campo">'+rot("es-1")+'<select id="es-1" class="lc-selecao" required>'+ops(0)+'</select><p class="lc-ajuda">Vale para o reajuste de março.</p></div>');
  h+=fig("Hover","",'<div class="lc-campo">'+rot("es-2")+'<select id="es-2" class="lc-selecao lc-f-hover">'+ops(0)+'</select><p class="lc-ajuda">Vale para o reajuste de março.</p></div>');
  h+=fig("Foco","",'<div class="lc-campo">'+rot("es-3")+'<select id="es-3" class="lc-selecao lc-f-foco">'+ops(1)+'</select><p class="lc-ajuda">Vale para o reajuste de março.</p></div>');
  h+=fig("Preenchido","",'<div class="lc-campo">'+rot("es-4")+'<select id="es-4" class="lc-selecao">'+ops(1)+'</select><p class="lc-ajuda">Acumulado em 12 meses: 5,48%.</p></div>');
  h+=fig("Desabilitado","disabled",'<div class="lc-campo">'+rot("es-5")+'<select id="es-5" class="lc-selecao" disabled>'+ops(1)+'</select><p class="lc-ajuda">Definido no contrato assinado.</p></div>');
  h+=fig("Só leitura","readonly",'<div class="lc-campo">'+rot("es-6")+'<input id="es-6" class="lc-entrada" readonly value="IGP-M"></div>');
  h+=fig("Erro",'aria-invalid="true"','<div class="lc-campo">'+rot("es-7")+'<select id="es-7" class="lc-selecao" aria-invalid="true" aria-describedby="es-7-e">'+ops(0)+'</select><p class="lc-erro" id="es-7-e"><i data-i="erro"></i>Índice não escolhido. O reajuste anual depende dele. Escolha IGP-M, IPCA ou INPC.</p></div>');
  h+=fig("Carregando",'aria-busy="true"','<div class="lc-campo" aria-busy="true">'+rot("es-8")+'<select id="es-8" class="lc-selecao" disabled><option>Carregando índices</option></select><p class="lc-ajuda">Buscando o acumulado no IBGE e na FGV.</p></div>');
  return h+'</div>';}
function estadosCombo(){
  var rot=function(id){return '<span class="lc-rotulo" id="'+id+'">Condomínio <span class="lc-obrig" aria-hidden="true">*</span></span>';};
  var cb=function(id,val,extra,cls){return '<button type="button" class="lc-combo'+(cls||"")+'" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="'+id+'"'+(extra||"")+'><span class="lc-combo__valor'+(val?"":" lc-combo__valor--vazio")+'">'+(val||"Escolha o condomínio")+'</span><i data-i="chevron-baixo"></i></button>';};
  var h='<div class="lc-doc-estados" style="--_m:210px">\n';
  h+=fig("Normal","",'<div class="lc-campo">'+rot("ec-1")+cb("ec-1")+'</div>');
  h+=fig("Hover","",'<div class="lc-campo">'+rot("ec-2")+cb("ec-2","",""," lc-f-hover")+'</div>');
  h+=fig("Aberto / foco",'aria-expanded="true"','<div class="lc-campo">'+rot("ec-3")+cb("ec-3","",' data-x=""'," lc-f-foco").replace('aria-expanded="false"','aria-expanded="true"')+'</div>');
  h+=fig("Preenchido","",'<div class="lc-campo">'+rot("ec-4")+cb("ec-4","Cond. Parque das Águas")+'</div>');
  h+=fig("Desabilitado","disabled",'<div class="lc-campo">'+rot("ec-5")+cb("ec-5","Cond. Parque das Águas"," disabled")+'<p class="lc-ajuda">Vem da lista de onde você abriu.</p></div>');
  h+=fig("Só leitura",'data-leitura="true"','<div class="lc-campo">'+rot("ec-6")+cb("ec-6","Cond. Parque das Águas",' data-leitura="true" tabindex="-1"').replace('<i data-i="chevron-baixo"></i>',"")+'</div>');
  h+=fig("Erro",'aria-invalid="true"','<div class="lc-campo">'+rot("ec-7")+cb("ec-7","",' aria-invalid="true" aria-describedby="ec-7-e"')+'<p class="lc-erro" id="ec-7-e"><i data-i="erro"></i>Condomínio não escolhido. O contato precisa estar num condomínio. Escolha na lista.</p></div>');
  h+=fig("Carregando",'aria-busy="true"','<div class="lc-campo">'+rot("ec-8")+cb("ec-8","",' aria-busy="true"').replace("Escolha o condomínio","Carregando 48 condomínios")+'</div>');
  return h+'</div>';}
function estadosMulti(){
  var rot=function(id){return '<label class="lc-rotulo" for="'+id+'">Etiquetas</label>';};
  var et='<span class="lc-etiqueta lc-etiqueta--1">Manutenção<button type="button" aria-label="Remover Manutenção"><i data-i="fechar"></i></button></span><span class="lc-etiqueta lc-etiqueta--2">Vazamento<button type="button" aria-label="Remover Vazamento"><i data-i="fechar"></i></button></span>';
  var h='<div class="lc-doc-estados" style="--_m:230px">\n';
  h+=fig("Normal","",'<div class="lc-campo">'+rot("em-1")+'<div class="lc-multi"><input id="em-1" placeholder="Adicionar etiqueta"></div></div>');
  h+=fig("Hover","",'<div class="lc-campo">'+rot("em-2")+'<div class="lc-multi lc-f-hover"><input id="em-2" placeholder="Adicionar etiqueta"></div></div>');
  h+=fig("Foco","",'<div class="lc-campo">'+rot("em-3")+'<div class="lc-multi lc-f-foco">'+et+'<input id="em-3" value="obr"></div></div>');
  h+=fig("Preenchido","",'<div class="lc-campo">'+rot("em-4")+'<div class="lc-multi">'+et+'<span class="lc-etiqueta lc-etiqueta--5">Assembleia<button type="button" aria-label="Remover Assembleia"><i data-i="fechar"></i></button></span><span class="lc-multi__mais">+3</span><input id="em-4"></div></div>');
  h+=fig("Desabilitado",'aria-disabled="true"','<div class="lc-campo">'+rot("em-5")+'<div class="lc-multi" aria-disabled="true"><span class="lc-etiqueta lc-etiqueta--sistema">Manutenção</span><input id="em-5" disabled></div></div>');
  h+=fig("Só leitura",'data-leitura="true"','<div class="lc-campo">'+rot("em-6")+'<div class="lc-multi" data-leitura="true"><span class="lc-etiqueta lc-etiqueta--1">Manutenção</span><span class="lc-etiqueta lc-etiqueta--2">Vazamento</span><input id="em-6" readonly hidden></div></div>');
  h+=fig("Erro",'aria-invalid="true"','<div class="lc-campo">'+rot("em-7")+'<div class="lc-multi" aria-invalid="true"><input id="em-7" aria-invalid="true" aria-describedby="em-7-e" placeholder="Adicionar etiqueta"></div><p class="lc-erro" id="em-7-e"><i data-i="erro"></i>Nenhuma etiqueta. A fila da manutenção filtra por etiqueta. Escolha ao menos uma.</p></div>');
  h+=fig("Carregando",'aria-busy="true"','<div class="lc-campo" aria-busy="true">'+rot("em-8")+'<div class="lc-multi">'+et+'<input id="em-8" value="jur"></div><p class="lc-ajuda">Buscando etiquetas.</p></div>');
  return h+'</div>';}
function estadosEscolha(){
  var m=function(txt,cls,inp,peq){return '<label class="lc-marcar'+(cls||"")+'"><input type="checkbox"'+(inp||"")+'><span class="lc-marcar__caixa"></span><span>'+txt+(peq?'<small>'+peq+'</small>':"")+'</span></label>';};
  var r=function(txt,cls,inp){return '<label class="lc-radio'+(cls||"")+'"><input type="radio" name="er-'+Math.random().toString(36).slice(2,6)+'"'+(inp||"")+'><span class="lc-radio__bola"></span>'+txt+'</label>';};
  var s=function(txt,cls,inp){return '<label class="lc-interruptor'+(cls||"")+'"><input type="checkbox" role="switch"'+(inp||"")+'><span class="lc-interruptor__trilho"></span>'+txt+'</label>';};
  var h='<h4 class="lc-t-subsecao" style="margin:0 0 10px">Marcar</h4><div class="lc-doc-estados" style="--_m:170px">\n';
  h+=fig("Normal","",m("Enviar cópia ao síndico"))+fig("Hover","",m("Enviar cópia ao síndico"," lc-f-hover"))+fig("Foco","",m("Enviar cópia ao síndico"," lc-f-foco"))+fig("Marcado","checked",m("Enviar cópia ao síndico","",' checked'));
  h+=fig("Misto","indeterminate",m("Todos os blocos","",' data-misto'))+fig("Desabilitado","disabled",m("Enviar por carta","",' disabled',"Sem endereço de correspondência"))+fig("Desabilitado marcado","disabled checked",m("Registrar no histórico","",' disabled checked',"Sempre ligado"));
  h+=fig("Erro",'aria-invalid="true"',m("Li e aceito o regimento do salão","",' aria-invalid="true" aria-describedby="eme"')+'<p class="lc-erro" id="eme"><i data-i="erro"></i>Aceite pendente. A reserva só vale com o regimento aceito. Marque para continuar.</p>');
  h+=fig("Só leitura","",'<span class="lc-linha lc-pequeno"><i data-i="confirmar" class="lc-ic--16"></i>Enviar cópia ao síndico: sim</span>');
  h+='</div><h4 class="lc-t-subsecao" style="margin:20px 0 10px">Rádio</h4><div class="lc-doc-estados" style="--_m:170px">\n';
  h+=fig("Normal","",r("Por fração ideal"))+fig("Hover","",r("Por fração ideal"," lc-f-hover"))+fig("Foco","",r("Por fração ideal"," lc-f-foco"))+fig("Marcado","checked",r("Por fração ideal","",' checked'))+fig("Desabilitado","disabled",r("Por consumo","",' disabled'))+fig("Desabilitado marcado","disabled checked",r("Igual para todas","",' disabled checked'));
  h+='</div><h4 class="lc-t-subsecao" style="margin:20px 0 10px">Interruptor</h4><div class="lc-doc-estados" style="--_m:170px">\n';
  h+=fig("Desligado","",s("Reserva online"))+fig("Foco","",s("Reserva online"," lc-f-foco"))+fig("Ligado","checked",s("Reserva online","",' checked'))+fig("Desabilitado","disabled",s("Reserva online","",' disabled'))+fig("Desabilitado ligado","disabled checked",s("Portaria 24 h","",' disabled checked'));
  return h+'</div>';}

/* ---------- 2. Novo contato em modal ---------- */
function campo(id,rot,ctrl,o){o=o||{};return '<div class="lc-campo'+(o.inteiro?" lc-inteiro":"")+'"><label class="lc-rotulo" for="'+id+'">'+rot+(o.obrig?' <span class="lc-obrig" aria-hidden="true">*</span>':o.opc?' <span class="lc-opcional">opcional</span>':"")+'</label>'+ctrl+(o.aj?'<p class="lc-ajuda" id="'+id+'-a">'+o.aj+'</p>':"")+(o.er?'<p class="lc-erro" id="'+id+'-e"><i data-i="erro"></i>'+o.er+'</p>':"")+'</div>';}
function inp(id,o){o=o||{};return '<input id="'+id+'" class="lc-entrada'+(o.num?" lc-entrada--num":"")+'"'+(o.type?' type="'+o.type+'"':"")+(o.v!=null?' value="'+at(o.v)+'"':"")+(o.ph?' placeholder="'+at(o.ph)+'"':"")+(o.masc?' data-mascara="'+o.masc+'"':"")+(o.val?' data-valida="'+o.val+'"':"")+(o.ac?' autocomplete="'+o.ac+'"':"")+(o.inv?' aria-invalid="true" aria-describedby="'+id+'-e"':o.aj?' aria-describedby="'+id+'-a"':"")+(o.ex?' data-exemplo="'+at(o.ex)+'"':"")+(o.nome?' data-nome="'+at(o.nome)+'"':"")+(o.extra||"")+(o.obrig?" required":"")+'>';}
function formContato(demo){
  var p=demo?"fd":"fr";
  var vinc='<fieldset class="lc-grupo-opcoes lc-inteiro"><legend class="lc-rotulo" style="margin-bottom:6px">Vínculo com a unidade</legend><div class="lc-grupo-opcoes lc-grupo-opcoes--linha">'+["Proprietário","Inquilino","Síndico","Conselheiro","Fornecedor"].map(function(v,i){return '<label class="lc-radio"><input type="radio" name="'+p+'-vinc"'+(i===0?" checked":"")+'><span class="lc-radio__bola"></span>'+v+'</label>';}).join("")+'</div></fieldset>';
  var corpo='<div class="lc-pilha lc-pilha--p">'+
    (demo?'<div class="lc-alerta lc-alerta--perigo" role="alert"><i data-i="erro"></i><div class="lc-alerta__corpo"><span class="lc-alerta__titulo">2 campos precisam de ajuste antes de salvar</span><ul><li><a href="#'+p+'-cpf">CPF ou CNPJ</a>: incompleto, faltam 2 números.</li><li><a href="#'+p+'-cel">Celular</a>: está vazio.</li></ul></div></div>':'<div class="lc-alerta lc-alerta--perigo" role="alert" data-resumo hidden></div>')+
    '<div class="lc-form-grade">'+
    campo(p+"-nome","Nome completo",inp(p+"-nome",{v:demo?"Marina Costa":"",val:"obrig",ac:"name",ex:"Marina Costa",obrig:1,extra:demo?"":" data-foco-inicial"}),{obrig:1,inteiro:1})+
    vinc+
    campo(p+"-cond","Condomínio",'<select id="'+p+'-cond" class="lc-selecao" aria-describedby="'+p+'-cond-a"><option selected>Cond. Parque das Águas</option><option>Residencial Jardim Botânico</option><option>Edifício Mirante do Vale</option></select>',{obrig:1,aj:"Você abriu pela lista deste condomínio."})+
    campo(p+"-uni","Unidade",inp(p+"-uni",{v:demo?"Bl B, 1204":"",val:"obrig",ex:"Bl B, 1204",ph:"Bloco e número",obrig:1}),{obrig:1})+
    campo(p+"-cpf","CPF ou CNPJ",inp(p+"-cpf",{v:demo?"529.982.247":"",masc:"doc",val:"obrig doc",ex:"529.982.247-25",inv:demo,extra:' inputmode="numeric"',obrig:1}),{obrig:1,er:demo?"CPF incompleto. O CPF tem 11 números e há 9. Confira os 2 que faltam.":""})+
    campo(p+"-cel","Celular",'<div class="lc-entrada-grupo"'+(demo?' aria-invalid="true"':"")+'><span class="lc-entrada-grupo__fixo">+55</span>'+inp(p+"-cel",{type:"tel",masc:"tel",val:"obrig tel",ac:"tel-national",ex:"(11) 98765-4321",nome:"Celular",inv:demo,obrig:1})+'</div>',{obrig:1,er:demo?"Celular está vazio. O boleto e os avisos vão pelo WhatsApp. Exemplo: (11) 98765-4321.":""})+
    campo(p+"-mail","E-mail",inp(p+"-mail",{type:"email",v:demo?"marina.costa@gmail.com":"",val:"email",ac:"email",extra:' spellcheck="false"'}),{opc:1})+
    '<label class="lc-interruptor lc-inteiro"><input type="checkbox" role="switch" checked><span class="lc-interruptor__trilho"></span><span>Convidar para o portal do morador<small>Envia o link de acesso por WhatsApp e e-mail ao salvar</small></span></label>'+
    '</div></div>';
  return '<div class="lc-modal" role="dialog" aria-modal="true" aria-labelledby="'+p+'-t" aria-describedby="'+p+'-d"'+(demo?"":' data-form-valida')+'>'+
    '<div class="lc-modal__cab"><div class="lc-cresce"><h2 id="'+p+'-t">Novo contato</h2><p id="'+p+'-d">Cond. Parque das Águas</p></div><button type="button" class="lc-btn lc-btn--icone lc-btn--discreto" aria-label="Fechar"'+(demo?"":" data-fecha")+'><i data-i="fechar"></i></button></div>'+
    '<div class="lc-modal__corpo">'+corpo+'</div>'+
    '<div class="lc-modal__pe lc-ancora"><span class="lc-modal__aux"><span class="lc-obrig" aria-hidden="true">*</span> obrigatório</span><button type="button" class="lc-btn"'+(demo?"":" data-fecha")+'>Cancelar</button>'+
    '<span class="lc-dividido"><button type="button" class="lc-btn lc-btn--principal"'+(demo?"":' data-enviar-form data-sucesso="Contato cadastrado. Ele aparece no topo da lista."')+'>Salvar contato</button><button type="button" class="lc-btn lc-btn--principal" aria-label="Outras formas de salvar" aria-haspopup="menu" aria-expanded="false"'+(demo?"":' data-abre="'+p+'-menu"')+'><i data-i="chevron-baixo"></i></button></span>'+
    (demo?"":'<div class="lc-menu" id="'+p+'-menu" role="menu" hidden style="bottom:calc(100% - 4px);right:16px"><button type="button" class="lc-menu__item" role="menuitem" data-enviar-form data-e-novo data-sucesso="Contato cadastrado. Formulário limpo para o próximo."><span>Salvar e criar outro<small>Mantém o condomínio e o vínculo</small></span></button></div>')+
    '</div></div>';
}
G["form-contato"]=function(m){return m==="demo"?'<div class="lc-sobreposicao lc-sobreposicao--demo">'+formContato(true)+'</div>':formContato(false);};

/* ---------- 3. Contrato em edição no registro ---------- */
G["form-contrato"]=function(){
  var nomes="Cond. Parque das Águas|Residencial Jardim Botânico|Edifício Mirante do Vale|Cond. Bosque Imperial";
  return '<div class="p1-registro" data-salvar-form="Contrato de administração" data-contrato>\n'+
  '<header class="lc-cab-registro">'+
   '<div class="lc-cab-registro__topo"><nav aria-label="Você está em"><ol class="lc-trilha"><li><a href="#">Clientes</a></li><li><a href="#">Renovam em 90 dias</a></li><li><span aria-current="page">Cond. Parque das Águas</span></li></ol></nav>'+
   '<div class="lc-paginador" data-paginador data-total="63" data-nome-alvo="ct-nome" data-nomes="'+nomes+'"><button type="button" class="lc-btn lc-btn--icone lc-btn--discreto" data-ant aria-label="Registro anterior" data-dica="Anterior (K)"><i data-i="chevron-esquerda"></i></button><span><b>14</b> de 63</span><button type="button" class="lc-btn lc-btn--icone lc-btn--discreto" data-prox aria-label="Próximo registro" data-dica="Próximo (J)"><i data-i="chevron-direita"></i></button></div></div>'+
   '<div class="lc-cab-registro__titulo"><span class="lc-ladrilho lc-ladrilho--48"><i data-i="condominio"></i></span><h1 id="ct-nome">Cond. Parque das Águas</h1><button type="button" class="lc-btn lc-btn--icone lc-btn--discreto lc-estrela" aria-pressed="true" aria-label="Favorito" data-alterna><i data-i="estrela"></i></button>'+
   '<div class="lc-cab-registro__acoes"><button type="button" class="lc-btn" data-toast="Ligação registrada na atividade."><i data-i="ligacao-feita"></i>Registrar ligação</button><button type="button" class="lc-btn lc-btn--icone" aria-label="Mais opções do cliente"><i data-i="mais-opcoes"></i></button></div></div>'+
   '<div class="lc-cab-registro__meta"><span>Cliente desde 03/2022</span><span>184 unidades, 3 blocos</span><span>Responsável: Bruno Tavares</span></div>'+
   '<dl class="lc-campos-chave"><div><dt>Saúde</dt><dd><span class="lc-saude"><b>62</b><span class="lc-estado lc-estado--aviso">Atenção</span></span></dd></div><div><dt>Plano</dt><dd>Completo</dd></div><div><dt>Mensalidade</dt><dd>R$ 4.380,00</dd></div><div><dt>Renovação</dt><dd>14/01/2027, em 105 dias</dd></div><div><dt>Último NPS</dt><dd>8</dd></div></dl>'+
   '<div class="lc-etapas-cont" style="padding-bottom:12px"><ol class="lc-etapas" aria-label="Ciclo do cliente"><li class="lc-etapa lc-etapa--feita"><button type="button"><i data-i="confirmar"></i>Implantação</button></li><li class="lc-etapa lc-etapa--feita"><button type="button"><i data-i="confirmar"></i>Ativo</button></li><li class="lc-etapa lc-etapa--atual"><button type="button" aria-current="step">Em renovação<small>há 12 dias</small></button></li><li class="lc-etapa"><button type="button">Renovado</button></li></ol><button type="button" class="lc-btn" data-avancar><i data-i="seta-direita"></i>Avançar para Renovado</button></div>'+
  '</header>\n<div class="p1-registro__corpo"><div>'+
   secao("ct-s1","Contrato de administração",
     '<dl class="lc-props"><dt>Valor mensal</dt><dd data-campo="valor" data-pre="R$ ">R$ 4.380,00</dd><dt>Dia de vencimento</dt><dd data-campo="dia">Dia 10</dd><dt>Índice de reajuste</dt><dd data-campo="indice">IGP-M, todo março</dd><dt>Multa por atraso</dt><dd data-campo="multa" data-pre="">2,00%</dd><dt>Início</dt><dd>14/01/2022</dd></dl>',
     '<div class="lc-form-grade">'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-v">Valor mensal</label><div class="lc-entrada-grupo"><span class="lc-entrada-grupo__fixo">R$</span><input id="ct-v" name="valor" class="lc-entrada lc-entrada--num" inputmode="numeric" data-mascara="moeda" value="4.380,00" data-nome="Valor mensal" aria-describedby="ct-v-a"></div><p class="lc-antes" id="ct-v-a" data-mudou hidden>Antes: <s>R$ 4.380,00</s>. IGP-M de 12 meses: 5,48%, daria R$ 4.620,04.</p></div>'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-d">Dia de vencimento</label><select id="ct-d" name="dia" class="lc-selecao" data-nome="Dia de vencimento"><option>Dia 5</option><option selected>Dia 10</option><option>Dia 15</option><option>Dia 20</option></select></div>'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-i">Índice de reajuste</label><select id="ct-i" name="indice" class="lc-selecao" data-nome="Índice de reajuste"><option selected>IGP-M, todo março</option><option>IPCA, todo março</option><option>INPC, todo março</option></select></div>'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-m">Multa por atraso</label><div class="lc-entrada-grupo"><input id="ct-m" name="multa" class="lc-entrada lc-entrada--num" inputmode="numeric" data-mascara="pct" data-valida="max:2" value="2,00" data-nome="Multa por atraso"><span class="lc-entrada-grupo__fixo">%</span></div></div>'+
     '</div>')+
   secao("ct-s2","Contato do síndico",
     '<dl class="lc-props"><dt>Síndica</dt><dd data-campo="sindica">Marina Costa</dd><dt>E-mail</dt><dd data-campo="email">marina.costa@gmail.com</dd><dt>Celular</dt><dd data-campo="cel">(11) 98765-4321</dd><dt>Mandato</dt><dd>até 31/03/2027</dd></dl>',
     '<div class="lc-form-grade">'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-n">Síndica</label><input id="ct-n" name="sindica" class="lc-entrada" value="Marina Costa" data-nome="Nome da síndica" data-valida="obrig"></div>'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-e">E-mail</label><input id="ct-e" name="email" class="lc-entrada" type="email" value="marina.costa@gmail.com" data-nome="E-mail da síndica" data-valida="email" spellcheck="false"></div>'+
       '<div class="lc-campo"><label class="lc-rotulo" for="ct-c">Celular</label><div class="lc-entrada-grupo"><span class="lc-entrada-grupo__fixo">+55</span><input id="ct-c" name="cel" class="lc-entrada" type="tel" data-mascara="tel" data-valida="tel" value="(11) 98765-4321" data-nome="Celular da síndica"></div></div>'+
     '</div>')+
   secao("ct-s3","Observações",
     '<p class="lc-pequeno" data-campo="obs">Síndica prefere ligação depois das 18h. Assembleia de renovação em 15/10.</p>',
     '<div class="lc-campo"><label class="lc-rotulo" for="ct-o">Observações</label><textarea id="ct-o" name="obs" class="lc-area-texto" maxlength="500" data-nome="Observações">Síndica prefere ligação depois das 18h. Assembleia de renovação em 15/10.</textarea><div class="lc-campo__pe"><p class="lc-ajuda">Só a equipe vê.</p><span class="lc-contagem-car">73 de 500</span></div></div>')+
  '</div><aside aria-labelledby="ct-h"><h2 class="lc-t-subsecao" id="ct-h" style="margin-bottom:8px">Histórico</h2><ul class="lc-auditoria"><li><span class="lc-av lc-av--24 lc-av--c2" aria-hidden="true">BT</span><span class="lc-auditoria__quem"><b>Bruno Tavares</b> mudou a etapa</span><time class="lc-auditoria__quando">19/09</time><dl class="lc-auditoria__mudanca"><dt>Etapa</dt><dd><del>Ativo</del> <ins>Em renovação</ins></dd></dl></li><li><span class="lc-av lc-av--24 lc-av--c3" aria-hidden="true">MC</span><span class="lc-auditoria__quem"><b>Marina Costa</b> pelo portal</span><time class="lc-auditoria__quando">28/09</time><dl class="lc-auditoria__mudanca"><dt>E-mail</dt><dd><del>marina@parquedasaguas.com</del> <ins>marina.costa@gmail.com</ins></dd></dl></li></ul></aside></div>\n'+
  '<div class="lc-barra-salvar" role="region" aria-label="Alterações não salvas" hidden><p class="lc-barra-salvar__msg" data-salvar-msg aria-live="polite"></p><div class="lc-barra-salvar__acoes lc-ancora"><button type="button" class="lc-btn lc-btn--discreto" data-descartar>Descartar</button><span class="lc-dividido"><button type="button" class="lc-btn lc-btn--principal" data-salvar="">Salvar</button><button type="button" class="lc-btn lc-btn--principal" aria-label="Outras formas de salvar" aria-haspopup="menu" aria-expanded="false" data-abre="ct-menu"><i data-i="chevron-baixo"></i></button></span>'+
  '<div class="lc-menu" id="ct-menu" role="menu" hidden style="bottom:calc(100% + 4px);right:0;min-width:300px"><button type="button" class="lc-menu__item" role="menuitem" data-salvar="proximo"><i data-i="seta-direita"></i><span>Salvar e ir para o próximo<small>15 de 63, Residencial Jardim Botânico</small></span><span class="lc-tecla">⌘⏎</span></button><button type="button" class="lc-menu__item" role="menuitem" data-salvar="voltar"><i data-i="voltar-a-plataforma"></i><span>Salvar e voltar para a lista<small>Renovam em 90 dias, na mesma posição</small></span></button><button type="button" class="lc-menu__item" role="menuitem" data-salvar="novo"><i data-i="mais"></i>Salvar e criar outro</button></div></div></div>\n</div>';
};
function secao(id,titulo,leitura,edicao){
  return '<section class="lc-secao-reg" aria-labelledby="'+id+'-t"><div class="lc-secao-reg__cab"><h3 id="'+id+'-t">'+titulo+'</h3><span class="lc-secao-reg__flag" hidden><i data-i="aviso" class="lc-ic--14"></i>Alterado, não salvo</span><button type="button" class="lc-btn lc-btn--icone lc-btn--discreto lc-btn--p" data-editar-secao aria-label="Editar '+titulo+'" data-dica="Editar (E)"><i data-i="editar"></i></button></div>'+
    '<div class="lc-secao-reg__leitura">'+leitura+'</div><div class="lc-secao-reg__edicao" hidden>'+edicao+'<div class="lc-linha" style="margin-top:12px"><button type="button" class="lc-btn lc-btn--p" data-concluir-secao>Concluir edição</button><span class="lc-legenda">Fica guardado até você salvar na barra de baixo.</span></div></div></section>';}

/* ---------- 4. Cadastro de condomínio com passos ---------- */
var PASSOS=["Dados do condomínio","Endereço","Unidades e frações","Síndico e conselho","Financeiro","Revisão"];
G["form-condominio"]=function(){
  var f=function(id,rot,ctrl,o){return campo(id,rot,ctrl,o);};
  var p=[];
  p[1]='<div class="lc-form-grade">'+
    f("cc-nome","Nome do condomínio",inp("cc-nome",{v:"Residencial Jardim Botânico",val:"obrig",ex:"Residencial Jardim Botânico",obrig:1,extra:' data-rev="Nome"'}),{obrig:1,inteiro:1,aj:"Como aparece no boleto e no portal."})+
    f("cc-cnpj","CNPJ",inp("cc-cnpj",{masc:"doc",val:"obrig doc",ex:"11.222.333/0001-81",obrig:1,extra:' inputmode="numeric" data-rev="CNPJ"',ph:"00.000.000/0000-00"}),{obrig:1,aj:"Está no cartão do CNPJ ou na convenção."})+
    f("cc-conv","Data da convenção",inp("cc-conv",{type:"date",v:"1998-06-22",extra:' data-rev="Convenção"'}),{opc:1})+
    '<fieldset class="lc-grupo-opcoes lc-inteiro"><legend class="lc-rotulo" style="margin-bottom:6px">Tipo</legend><div class="lc-grupo-opcoes lc-grupo-opcoes--linha"><label class="lc-radio"><input type="radio" name="cc-tipo" checked data-rev="Tipo" value="Residencial"><span class="lc-radio__bola"></span>Residencial</label><label class="lc-radio"><input type="radio" name="cc-tipo" data-rev="Tipo" value="Comercial"><span class="lc-radio__bola"></span>Comercial</label><label class="lc-radio"><input type="radio" name="cc-tipo" data-rev="Tipo" value="Misto"><span class="lc-radio__bola"></span>Misto</label></div></fieldset></div>';
  p[2]='<div class="lc-form-grade" data-endereco>'+
    '<div class="lc-campo"><label class="lc-rotulo" for="cc-cep">CEP <span class="lc-obrig" aria-hidden="true">*</span></label><div class="lc-entrada-grupo"><input id="cc-cep" class="lc-entrada" inputmode="numeric" data-mascara="cep" data-valida="obrig cep" value="13024-001" data-rev="CEP" required><button type="button" class="lc-entrada-grupo__btn" data-consulta-cep><i data-i="pesquisar"></i>Consultar</button></div><p class="lc-consulta-ok" hidden></p></div>'+
    f("cc-rua","Rua",inp("cc-rua",{val:"obrig",obrig:1,extra:' data-end="rua" data-rev="Rua"',ex:"Rua Coronel Quirino"}),{obrig:1})+
    f("cc-num","Número",inp("cc-num",{val:"obrig",obrig:1,extra:' data-end="numero" inputmode="numeric" data-rev="Número"',ex:"1.240"}),{obrig:1})+
    f("cc-bai","Bairro",inp("cc-bai",{extra:' data-end="bairro" data-rev="Bairro"'}))+
    f("cc-cid","Cidade",inp("cc-cid",{val:"obrig",obrig:1,extra:' data-end="cidade" data-rev="Cidade"',ex:"Campinas"}),{obrig:1})+
    f("cc-uf","UF",inp("cc-uf",{val:"obrig",obrig:1,extra:' data-end="uf" maxlength="2" data-rev="UF"',ex:"SP"}),{obrig:1})+'</div>';
  p[3]='<div class="lc-form-grade">'+
    f("cc-blo","Blocos",'<div class="lc-entrada-grupo"><input id="cc-blo" class="lc-entrada lc-entrada--num" inputmode="numeric" value="2" data-passo data-min="1" data-max="40" data-rev="Blocos"><span class="lc-passo"><button type="button" tabindex="-1" aria-label="Aumentar" data-passo-mais><i data-i="chevron-cima"></i></button><button type="button" tabindex="-1" aria-label="Diminuir" data-passo-menos><i data-i="chevron-baixo"></i></button></span></div>')+
    f("cc-uni","Unidades",'<div class="lc-entrada-grupo"><input id="cc-uni" class="lc-entrada lc-entrada--num" inputmode="numeric" value="96" data-passo data-min="1" data-max="9999" data-valida="obrig" data-nome="Unidades" data-rev="Unidades" required><span class="lc-passo"><button type="button" tabindex="-1" aria-label="Aumentar" data-passo-mais><i data-i="chevron-cima"></i></button><button type="button" tabindex="-1" aria-label="Diminuir" data-passo-menos><i data-i="chevron-baixo"></i></button></span></div>',{obrig:1})+
    '<fieldset class="lc-grupo-opcoes lc-inteiro"><legend class="lc-rotulo" style="margin-bottom:6px">Forma de rateio</legend><label class="lc-radio"><input type="radio" name="cc-rat" checked data-rev="Rateio" value="Por fração ideal"><span class="lc-radio__bola"></span><span>Por fração ideal<small>Importe as frações na planilha abaixo</small></span></label><label class="lc-radio"><input type="radio" name="cc-rat" data-rev="Rateio" value="Igual para todas"><span class="lc-radio__bola"></span><span>Igual para todas</span></label></fieldset>'+
    '<div class="lc-campo lc-inteiro" data-upload data-limite="25" data-aceita="xlsx xls csv"><span class="lc-rotulo">Planilha de unidades <span class="lc-opcional">opcional</span></span><label class="lc-upload"><i data-i="planilha"></i><span><b>Escolha a planilha</b> ou arraste</span><span class="lc-legenda">XLSX ou CSV com bloco, unidade, fração e proprietário. <a href="#">Baixar modelo</a></span><input type="file" accept=".xlsx,.xls,.csv"></label><div class="lc-anexos__resumo">Nenhum arquivo anexado.</div><ul class="lc-anexos" aria-label="Planilha anexada"></ul></div></div>';
  p[4]='<div class="lc-form-grade">'+
    f("cc-sin","Síndica ou síndico",inp("cc-sin",{v:"Helena Moraes",val:"obrig",obrig:1,ex:"Helena Moraes",extra:' data-rev="Síndico"',ac:"name"}),{obrig:1})+
    f("cc-scpf","CPF",inp("cc-scpf",{masc:"cpf",val:"obrig cpf",obrig:1,extra:' inputmode="numeric" data-rev="CPF do síndico"',ex:"529.982.247-25"}),{obrig:1})+
    f("cc-scel","Celular",'<div class="lc-entrada-grupo"><span class="lc-entrada-grupo__fixo">+55</span>'+inp("cc-scel",{type:"tel",masc:"tel",val:"obrig tel",obrig:1,v:"(19) 99812-4410",nome:"Celular",extra:' data-rev="Celular do síndico"'})+'</div>',{obrig:1})+
    f("cc-smail","E-mail",inp("cc-smail",{type:"email",val:"email",v:"helena.moraes@outlook.com",extra:' spellcheck="false" data-rev="E-mail do síndico"'}),{opc:1})+
    f("cc-mand","Mandato até",inp("cc-mand",{type:"date",v:"2027-03-31",extra:' data-rev="Mandato até"'}))+
    '<div class="lc-campo lc-multi-cont lc-ancora lc-inteiro"><label class="lc-rotulo" for="cc-cons">Conselho fiscal <span class="lc-opcional">opcional</span></label><div class="lc-multi" data-rev-multi="Conselho"><span class="lc-etiqueta lc-etiqueta--3">Paulo Henrique Lima<button type="button" aria-label="Remover Paulo Henrique Lima"><i data-i="fechar"></i></button></span><input id="cc-cons" placeholder="Nome do conselheiro e Enter"></div></div></div>';
  p[5]='<div class="lc-form-grade">'+
    f("cc-banco","Banco da conta do condomínio",'<select id="cc-banco" class="lc-selecao" data-rev="Banco"><option>Itaú</option><option selected>Banco do Brasil</option><option>Bradesco</option><option>Caixa</option><option>Santander</option><option>Inter</option></select>')+
    f("cc-venc","Dia de vencimento",'<select id="cc-venc" class="lc-selecao" data-rev="Vencimento"><option>Dia 5</option><option selected>Dia 10</option><option>Dia 15</option></select>')+
    f("cc-fr","Fundo de reserva",'<div class="lc-entrada-grupo"><input id="cc-fr" class="lc-entrada lc-entrada--num" inputmode="numeric" data-mascara="pct" value="5,00" data-rev="Fundo de reserva"><span class="lc-entrada-grupo__fixo">%</span></div>',{aj:"Como está na convenção."})+
    f("cc-mul","Multa por atraso",'<div class="lc-entrada-grupo"><input id="cc-mul" class="lc-entrada lc-entrada--num" inputmode="numeric" data-mascara="pct" data-valida="max:2" data-nome="Multa" value="2,00" data-rev="Multa"><span class="lc-entrada-grupo__fixo">%</span></div>',{aj:"Máximo de 2% por lei."})+'</div>';
  p[6]='<div data-revisao></div>';
  var h='<div class="p1-longo" data-etapas-form data-passo="1">\n<div class="p1-longo__cab"><h2 class="lc-t-secao" style="margin-bottom:12px">Novo condomínio</h2><ol class="lc-passos" aria-label="Passos do cadastro">'+PASSOS.map(function(n,i){return '<li data-i="'+(i+1)+'"'+(i===0?' aria-current="step"':"")+'><span>'+n+'</span></li>';}).join("")+'</ol></div>\n<div class="p1-longo__corpo"><div class="lc-alerta lc-alerta--perigo" role="alert" data-resumo hidden style="margin-bottom:16px"></div>';
  for(var i=1;i<=6;i++)h+='<fieldset class="lc-secao-form" data-p="'+i+'"'+(i>1?" hidden":"")+' style="border-top:0;padding-top:0"><legend>'+i+'. '+PASSOS[i-1]+'</legend><p class="lc-secao-form__desc">'+["Dados que vão no boleto e no portal.","Onde o condomínio fica. O CEP preenche o resto.","Quantas unidades e como se divide a conta.","Quem responde pelo condomínio.","Para gerar os boletos.","Confira tudo antes de cadastrar. Editar volta ao passo e depois volta para cá."][i-1]+'</p>'+p[i]+'</fieldset>\n';
  return h+'</div>\n<div class="p1-longo__pe"><button type="button" class="lc-btn" data-cc-ant disabled><i data-i="chevron-esquerda"></i>Anterior</button><button type="button" class="lc-btn lc-btn--discreto" data-toast="Rascunho salvo. Ele fica em Condomínios, Rascunhos, por 30 dias.">Salvar rascunho e sair</button><span class="lc-rascunho lc-cresce" aria-live="polite">Rascunho salvo às 10:42</span><button type="button" class="lc-btn lc-btn--principal" data-cc-prox>Próximo: Endereço<i data-i="chevron-direita"></i></button></div>\n</div>';
};

/* ---------- 5. Preparar templates (conteúdo gerado dentro de template) ---------- */
$$("template").forEach(function(t){var g=t.content.querySelector("[data-gerar-dentro]");if(!g)return;var a=g.getAttribute("data-gerar-dentro").split(":");g.removeAttribute("data-gerar-dentro");g.innerHTML=G[a[0]](a[1]);});

/* ---------- 6. Comportamentos só desta página ---------- */
D.addEventListener("click",function(e){var b=e.target.closest("[data-passo-mais],[data-passo-menos]");if(!b)return;var i=$("input",b.closest(".lc-entrada-grupo"));passo(i,b.hasAttribute("data-passo-mais")?1:-1);});
function passo(i,d){var n=(parseInt(i.value.replace(/\D/g,""),10)||0)+d,mi=+(i.getAttribute("data-min")||0),ma=+(i.getAttribute("data-max")||1e9);n=Math.min(ma,Math.max(mi,n));i.value=n.toLocaleString("pt-BR");i.dispatchEvent(new Event("input",{bubbles:true}));}
D.addEventListener("keydown",function(e){if(e.target.hasAttribute&&e.target.hasAttribute("data-passo")&&(e.key==="ArrowUp"||e.key==="ArrowDown")){e.preventDefault();passo(e.target,e.key==="ArrowUp"?1:-1);}});
/* período: atalhos */
D.addEventListener("click",function(e){var b=e.target.closest("[data-periodo] [data-p]");if(!b)return;var fs=b.closest("[data-periodo]"),de=$("[data-de]",fs),ate=$("[data-ate]",fs);
  var m={mes:["2026-10-01","2026-10-31"],passado:["2026-09-01","2026-09-30"],"30":["2026-09-01","2026-09-30"],ano:["2026-01-01","2026-12-31"]}[b.getAttribute("data-p")];de.value=m[0];ate.value=m[1];DOC.anunciar("Período de "+m[0].split("-").reverse().join("/")+" a "+m[1].split("-").reverse().join("/")+".");});
/* data: dia da semana */
var DS=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
D.addEventListener("change",function(e){var t=e.target;if(t.hasAttribute&&t.hasAttribute("data-dia-semana")&&t.value){var d=new Date(t.value+"T12:00:00"),a=$("#"+t.getAttribute("aria-describedby"));if(a)a.textContent=DS[d.getDay()]+(d.getDay()===0||d.getDay()===6?". Fim de semana: o banco compensa no próximo dia útil.":"");}});
/* senha: força */
D.addEventListener("input",function(e){var t=e.target;if(!t.hasAttribute||!t.hasAttribute("data-forca"))return;var v=t.value,n=0;if(v.length>=8)n++;if(v.length>=12)n++;if(/\d/.test(v)&&/[a-zA-Z]/.test(v))n++;if(/[^\w]/.test(v))n++;if(!v)n=0;n=Math.max(v?1:0,n);
  var c=t.closest(".lc-campo"),f=$(".lc-forca",c);f.setAttribute("data-n",n);var p=$("#"+t.id.replace(/-q.*$/,"")+"-f",c)||$('[id$="-f"]',c);clearTimeout(t._t);t._t=setTimeout(function(){if(p)p.textContent="Força: "+["vazia","fraca","razoável","boa","forte"][n]+".";},400);});
/* e-mail: sugestão de domínio */
var DOM={"gmial.com":"gmail.com","gmal.com":"gmail.com","gmail.con":"gmail.com","hotmal.com":"hotmail.com","hotmail.con":"hotmail.com","outlok.com":"outlook.com","yahoo.com.br.":"yahoo.com.br"};
D.addEventListener("focusout",function(e){var t=e.target;if(!t.hasAttribute||!t.hasAttribute("data-sugere"))return;var c=t.closest(".lc-campo"),s=$("[data-sugestao]",c),dm=(t.value.split("@")[1]||"").toLowerCase();
  if(DOM[dm]){var novo=t.value.split("@")[0]+"@"+DOM[dm];s.hidden=false;s.innerHTML='Você quis dizer <b>'+esc(novo)+'</b>? <button type="button" class="lc-btn lc-btn--link">Usar este</button>';$("button",s).onclick=function(){t.value=novo;s.hidden=true;t.focus();DOC.anunciar("E-mail corrigido para "+novo);};}else s.hidden=true;});
/* marcar todos com estado misto */
function mestre(fs){var m=$("[data-mestre]",fs),fs2=$$('input[type="checkbox"]:not([data-mestre])',fs),n=fs2.filter(function(c){return c.checked;}).length;m.checked=n===fs2.length;m.indeterminate=n>0&&n<fs2.length;}
D.addEventListener("change",function(e){var t=e.target,fs=t.closest&&t.closest("[data-todos]");if(fs){if(t.hasAttribute("data-mestre"))$$('input[type="checkbox"]:not([data-mestre])',fs).forEach(function(c){c.checked=t.checked;});mestre(fs);}
  if(t.hasAttribute&&t.hasAttribute("data-toast-liga"))DOC.toast(t.checked?t.getAttribute("data-toast-liga"):t.getAttribute("data-toast-desliga"),{desfazer:true});
  if(t.id==="fk-falha")$$("[data-contrato]").forEach(function(f){if(t.checked)f.setAttribute("data-falhar","");else f.removeAttribute("data-falhar");f._falhou=false;});});
/* cadastro longo */
function passoAtual(f){return +f.getAttribute("data-passo");}
function irPara(f,n,voltarRevisao){var ps=$$("[data-p]",f);ps.forEach(function(p){p.hidden=+p.getAttribute("data-p")!==n;});f.setAttribute("data-passo",n);f._volta=voltarRevisao||false;
  $$(".lc-passos li",f).forEach(function(li){var i=+li.getAttribute("data-i");li.removeAttribute("aria-current");li.classList.toggle("lc-feito",i<n||(f._max||1)>i&&i!==n);if(i===n)li.setAttribute("aria-current","step");
    var nome=PASSOS[i-1];li.innerHTML=(i!==n&&i<=(f._max||1))?'<button type="button" data-ir="'+i+'">'+nome+'</button>':'<span>'+nome+'</span>';});
  $("[data-cc-ant]",f).disabled=n===1;var px=$("[data-cc-prox]",f);
  px.innerHTML=f._volta?"Voltar para a revisão"+DOC.ic("chevron-direita"):n===6?DOC.ic("confirmar")+"Cadastrar condomínio":"Próximo: "+PASSOS[n]+DOC.ic("chevron-direita");
  $("[data-resumo]",f).hidden=true;if(n===6)revisao(f);var lg=$("[data-p='"+n+"'] legend",f);if(lg){lg.tabIndex=-1;lg.focus();}DOC.anunciar("Passo "+n+" de 6: "+PASSOS[n-1]+".");}
function validarPasso(f){var p=$("[data-p='"+passoAtual(f)+"']",f),cs=$$("[data-valida]",p),ruins=cs.filter(function(i){return !DOC.validar(i);}),res=$("[data-resumo]",f);
  if(!ruins.length){res.hidden=true;return true;}
  res.hidden=false;res.innerHTML=DOC.ic("erro")+'<div class="lc-alerta__corpo"><span class="lc-alerta__titulo">'+(ruins.length===1?"1 campo precisa de ajuste para avançar":ruins.length+" campos precisam de ajuste para avançar")+'</span><ul>'+ruins.map(function(i){var er=$(".lc-erro[data-auto] span",i.closest(".lc-campo"));return '<li><a href="#'+i.id+'">'+esc(i.getAttribute("data-nome")||$(".lc-rotulo",i.closest(".lc-campo")).childNodes[0].textContent.trim())+'</a>: '+esc(er?er.textContent.split(".")[0]:"")+'.</li>';}).join("")+'</ul></div>';
  res.tabIndex=-1;res.focus();$$("a",res).forEach(function(a){a.onclick=function(ev){ev.preventDefault();var x=D.getElementById(a.getAttribute("href").slice(1));if(x)x.focus();};});return false;}
function revisao(f){var r=$("[data-revisao]",f),h="";for(var i=1;i<=5;i++){var p=$("[data-p='"+i+"']",f),linhas=[],vistos={};
    $$("[data-rev]",p).forEach(function(x){var k=x.getAttribute("data-rev");if(x.type==="radio"){if(!x.checked)return;}if(vistos[k])return;vistos[k]=1;var v=x.tagName==="SELECT"?x.options[x.selectedIndex].text:x.type==="date"&&x.value?x.value.split("-").reverse().join("/"):x.value;linhas.push('<dt>'+esc(k)+'</dt><dd'+(v?"":' class="lc-vazio-campo"')+'>'+esc(v||"Não informado")+'</dd>');});
    $$("[data-rev-multi]",p).forEach(function(m){var es=$$(".lc-etiqueta",m).map(function(e){return e.firstChild.textContent;});linhas.push('<dt>'+m.getAttribute("data-rev-multi")+'</dt><dd>'+(es.length?esc(es.join(", ")):"Ninguém")+'</dd>');});
    var an=$$(".lc-anexo__nome",p).map(function(a){return a.textContent;});if(i===3)linhas.push('<dt>Planilha</dt><dd>'+(an.length?esc(an.join(", ")):"Sem planilha; as unidades entram à mão depois")+'</dd>');
    h+='<section class="lc-caixa" style="margin-bottom:12px"><div class="lc-caixa__cab"><h3>'+i+'. '+PASSOS[i-1]+'</h3><button type="button" class="lc-btn lc-btn--p lc-btn--discreto" data-ir="'+i+'" data-revisando aria-label="Editar '+PASSOS[i-1]+'"><i data-i="editar"></i>Editar</button></div><div class="lc-caixa__corpo"><dl class="lc-props">'+linhas.join("")+'</dl></div></section>';}
  r.innerHTML=h;}
D.addEventListener("click",function(e){var f=e.target.closest("[data-etapas-form]");if(!f)return;
  if(e.target.closest("[data-cc-prox]")){var n=passoAtual(f);if(n===6){var b=e.target.closest("[data-cc-prox]");b.setAttribute("aria-busy","true");setTimeout(function(){b.removeAttribute("aria-busy");DOC.toast("Residencial Jardim Botânico cadastrado. Abrindo a ficha.",{desfazer:true});
      $("[data-revisao]",f).insertAdjacentHTML("afterbegin",'<div class="lc-alerta lc-alerta--sucesso" role="status" style="margin-bottom:12px">'+DOC.ic("sucesso")+'<div class="lc-alerta__corpo"><span class="lc-alerta__titulo">Condomínio cadastrado</span>Próximo passo: gerar os boletos de novembro. <a href="#">Abrir a ficha</a></div></div>');},800);return;}
    if(!validarPasso(f))return;f._max=Math.max(f._max||1,n+1);irPara(f,f._volta?6:n+1);var rs=$(".lc-rascunho",f);if(rs)rs.textContent="Rascunho salvo às "+new Date().toTimeString().slice(0,5);return;}
  if(e.target.closest("[data-cc-ant]")){irPara(f,passoAtual(f)-1);return;}
  var ir=e.target.closest("[data-ir]");if(ir){irPara(f,+ir.getAttribute("data-ir"),ir.hasAttribute("data-revisando"));}
});
DOC.aoIniciar=function(){
  $$("[data-todos]").forEach(mestre);$$("[data-misto]").forEach(function(c){c.indeterminate=true;});
  $$("textarea[maxlength]").forEach(function(t){var c=t.closest(".lc-campo"),k=c&&$(".lc-contagem-car",c);if(k&&+t.getAttribute("maxlength")<9999)k.textContent=t.value.length+" de "+t.getAttribute("maxlength");});
};
})();
