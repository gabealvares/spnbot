# GACO V1 "Livro-Caixa": guia do sistema para quem monta telas

Fonte da verdade: `sistema/`. Documentação visual: `00-fundamentos.html`, `01-iconografia.html`, `02-navegacao.html`. Exemplo vivo de tela com moldura: `exemplo-moldura.html`.

## 1. Regras que não se negociam

- Use **só** classes `.lc-*` de `sistema/componentes.css` e tokens de `sistema/tokens.css`. CSS local só para o layout específico da tela (grade de colunas, larguras). Nada de cor em hexadecimal na tela: use papel (`var(--texto-2)`, `var(--perigo-texto)`…).
- Faltou componente? Acrescente em `sistema/componentes.css` (na seção certa, com estados) e avise no relatório.
- **Serifa** (`--fonte-doc`, Source Serif 4) só em: título de página (`h1` de `.lc-cab-pagina`), título de registro (`.lc-cab-registro__titulo h1`) e documento gerado (`.lc-documento`). Nunca em controle, nome no feed, valor no portal.
- **Carimbo** (`.lc-carimbo`) só em estado documental: pago, protocolado, ciente, emitido, aprovado em assembleia, cancelado. **Dupla sublinha** (`.lc-total`) só em valor consolidado.
- **Marca do cliente** (`--marca`) só no botão principal (`.lc-btn--principal`, um por tela), no ladrilho do logo e no topo/aba do portal. Nunca em estado, contador, etiqueta, bolha, foco, seleção, gráfico.
- Estado sempre com palavra: `.lc-estado--aviso` + "Esfriando". Nunca só cor.
- Início nunca tem fileira de KPI. `.lc-kpi` só em relatório/painel.
- Sem caixa alta espaçada, sem emoji na interface, sem "→" em botão, sem "A · B · C", sem cartões iguais em grade como decoração.
- Português do Brasil com acento; dados do mundo condomínio (Administradora Alpha, Cond. Parque das Águas, síndica Marina Costa).

## 2. Esqueleto mínimo de uma página

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Clientes do CS</title>
<link rel="stylesheet" href="../sistema/tokens.css">   <!-- ajuste o caminho: sistema/ na raiz da v1 -->
<link rel="stylesheet" href="../sistema/base.css">
<link rel="stylesheet" href="../sistema/componentes.css">
<script src="../sistema/marca.js"></script>            <!-- no head, sem defer: tema/marca antes da pintura -->
</head>
<body data-moldura='{"modulo":"cs","secao":"Clientes","item":"Clientes","papel":"gerente-cs","trilha":["Clientes"]}'>
<main id="conteudo" class="lc-pagina">
  …conteúdo da tela…
</main>
<script src="../sistema/icones.js"></script>
<script src="../sistema/moldura.js"></script>
</body>
</html>
```

Parâmetros de URL úteis para captura: `?tema=escuro`, `?marca=orbita|sol|alpha`, `?densidade=compacta|confortavel`.

## 3. Moldura (`data-moldura`)

| Chave | Valores |
|---|---|
| `contexto` | `"interno"` (padrão), `"portal"`, `"superadmin"` |
| `modulo` | `inicio, suporte, comercial, cs, projetos, operacoes, financeiro, marketing, produto, desenvolvimento, academy, cultura, relatorios, configuracao`. Superadmin: `painel, clientes, sessoes, superadmins, saude, versoes, auditoria` |
| `secao` / `item` | nome exato da seção da barra e da tela do submenu (ver `LCMoldura.MODULOS` ou a página 02). Portal: `Início, Boletos, Reservas, Chamados` |
| `papel` | interno: `atendente, gerente-cs, vendedor, financeiro, operacoes, dev, rh, marketing, diretor, admin`. Portal: `morador, sindico, conselheiro` |
| `trilha` | `["Clientes","Cond. Parque das Águas"]` (sem o módulo; o último é a tela atual) |
| `faixa` | `{"tipo":"superadmin","cliente":"Órbita Condomínios","motivo":"…","prazo":"48 min restantes","leitura":true}` ou `{"tipo":"homologacao","versao":"2026.10.2"}` |
| `usuario`, `cliente` | `{"nome","cargo","iniciais","cor":"lc-av--c3"}`, `{"nome","sigla"}` |
| `contadores` | `{"suporte":7,"cs":3}` |
| `fixa` | `true` = moldura parada e só a área rola (telas de 3 colunas: Suporte, registro). Use `.lc-area` com altura total |
| `acaoTrilha` | HTML à direita da trilha (ex.: paginador "14 de 63") |
| `aberto` | só documentação: `"cmdk"`, `"sino"`, `"conta"`, `"gaveta"`, `"favoritos"`, `"trocar-cliente"` ou o nome de uma seção |

A moldura cria: pular para o conteúdo, faixa, trilho, barra do módulo, trilha, barra inferior (celular), ⌘K (Ctrl/⌘+K), sino, conta (tema e densidade), gaveta. Tablet: trilho só ícone; se as seções não couberem, a busca vira lupa e depois as seções vão para a gaveta.

## 4. Ícones

`<i data-i="boleto"></i>` vira SVG sozinho (também em conteúdo injetado depois). Em JS: `lcIcone("rateio","lc-ic--16")`; com nome acessível: `lcIcone("aviso","","Atenção")`. Tamanhos: `.lc-ic--12/14/16/20/24/32/48`. Lista completa (437) e famílias: `01-iconografia.html` ou `window.LC_ICONE_FAMILIAS`. Ícone por módulo: `LC_ICONE_MODULO.cs` → `relacionamento`. Botão só ícone sempre com `aria-label`.

## 5. Convenções de nome

- Bloco `.lc-nome`, parte `.lc-nome__parte`, variação `.lc-nome--variacao`, tamanho `--p` / `--g`.
- Estados por atributo, nunca por classe: `:disabled`/`aria-disabled="true"`, `aria-busy="true"` (carregando), `aria-invalid="true"` (erro), `readonly` (só leitura), `aria-pressed`, `aria-selected`, `aria-expanded`, `aria-current`.
- Tokens: primitivo `--cor-<família>-<passo>` (não use em tela); papel `--fundo, --sup-1/2/3, --filete, --filete-forte, --borda-controle, --texto-1/2/3, --texto-desab, --link, --foco, --selecao, --atual`; estado `--{sucesso|aviso|perigo|info|andamento|neutro}-{fundo|borda|texto|ponto}`; tipografia `font: var(--t-secao)` etc.; espaço `--esp-1…12`; raio `--raio-0…4`, `--raio-pessoa`.
- Densidade: `data-densidade="compacta|confortavel"` em qualquer contêiner. Tema para amostra: `.lc-tema-claro` / `.lc-tema-escuro`.

## 6. Componentes e classes, com exemplo

**Botões** `.lc-btn` + `--principal | --secundario | --discreto | --perigo | --perigo-contorno | --link | --icone`, `--p | --g | --bloco`. Dividido: `.lc-dividido`. Grupo: `.lc-grupo-btn`.
```html
<button class="lc-btn lc-btn--principal" type="button"><i data-i="salvar"></i>Salvar alterações</button>
<button class="lc-btn" type="button" aria-busy="true">Gerando</button>
<button class="lc-btn lc-btn--icone lc-btn--discreto" aria-label="Mais opções" data-dica="Mais opções"><i data-i="mais-opcoes"></i></button>
<span class="lc-dividido"><button class="lc-btn lc-btn--principal">Salvar</button><button class="lc-btn lc-btn--principal" aria-label="Outras formas de salvar" aria-haspopup="menu"><i data-i="chevron-baixo"></i></button></span>
```
**Segmentado** `.lc-seg` (`--p`, `--bloco`) com `button[aria-pressed]`.
```html
<div class="lc-seg" role="group" aria-label="Estado"><button aria-pressed="true">Aberto</button><button aria-pressed="false">Pendente</button><button aria-pressed="false">Resolvido</button></div>
```
**Campo** `.lc-campo` > `.lc-rotulo` (+ `.lc-obrig`, `.lc-opcional`) + controle + `.lc-ajuda` / `.lc-erro` / `.lc-antes`. Controles: `.lc-entrada` (`--num`, `--cod`), `.lc-area-texto`, `.lc-selecao`, `.lc-busca`, `.lc-entrada-grupo` com `__fixo` (R$, %, +55), `__ic`, `__btn` (consultar CEP, mostrar senha), `.lc-passo` (número), `.lc-periodo`, `.lc-forca` (senha), `.lc-consulta-ok`.
```html
<div class="lc-campo"><label class="lc-rotulo" for="v">Valor mensal <span class="lc-obrig" aria-hidden="true">*</span></label>
  <div class="lc-entrada-grupo"><span class="lc-entrada-grupo__fixo">R$</span><input id="v" class="lc-entrada lc-entrada--num" inputmode="decimal" value="4.620,00" aria-describedby="v-antes"></div>
  <p class="lc-antes" id="v-antes">Antes: <s>R$ 4.380,00</s>. Reajuste de 5,48% pelo IGP-M.</p></div>
<div class="lc-campo"><label class="lc-rotulo" for="cep">CEP</label>
  <div class="lc-entrada-grupo" aria-busy="true"><input id="cep" class="lc-entrada" inputmode="numeric" value="04538-132"><button class="lc-entrada-grupo__btn" type="button"><i data-i="pesquisar"></i>Consultar</button></div></div>
<div class="lc-campo"><label class="lc-rotulo" for="cpf">CPF</label><input id="cpf" class="lc-entrada" aria-invalid="true" aria-describedby="cpf-e" value="123.456.789">
  <p class="lc-erro" id="cpf-e"><i data-i="erro"></i>Informe o CPF com 11 números. Faltam 2.</p></div>
```
Tipos: data `type="date"`, data-hora `datetime-local`, hora `time`, telefone `type="tel"` com `__fixo` "+55", e-mail `type="email"`, senha `type="password"` + `__btn` com `ver`/`ocultar`, % com `__fixo` à direita.

**Combo com busca** `.lc-combo` (gatilho, `__valor`, `__valor--vazio`) + `.lc-opcoes` (`__busca`, `__lista`, `__grupo`, `.lc-opcao[aria-selected]`, `__rodape`, `__criar`). **Multisseleção** `.lc-multi` com `.lc-etiqueta` removível + `input`.
**Marcar/rádio/interruptor**
```html
<label class="lc-marcar"><input type="checkbox" checked><span class="lc-marcar__caixa"></span><span>Enviar cópia ao síndico<small>Por e-mail e WhatsApp</small></span></label>
<label class="lc-radio"><input type="radio" name="r" checked><span class="lc-radio__bola"></span>Rateio por fração ideal</label>
<label class="lc-interruptor"><input type="checkbox" role="switch"><span class="lc-interruptor__trilho"></span>Permitir reserva online</label>
```
Agrupar em `fieldset.lc-grupo-opcoes` (`--linha`).

**Upload e anexos** `.lc-upload` (`[data-arrastando]`) e `ul.lc-anexos > li.lc-anexo` (`__ic`, `__nome`, `__info`, `__acoes`, `.lc-progresso`, `aria-invalid`).
**Editor com menção** `.lc-editor` > `__barra` (botões `.lc-btn--icone` + `.lc-sep`), `__area[contenteditable][data-placeholder]`, `__pe` (`.lc-rascunho`). Menção: `.lc-mencao`; lista de pessoas em `.lc-opcoes`.
**Seção de formulário** `fieldset.lc-secao-form` > `legend` + `.lc-secao-form__desc` + `.lc-form-grade` (`--1/--3/--4`, `.lc-inteiro`). **Seção de registro com lápis**: `.lc-secao-reg` (`--editando`), `__cab`, `__flag`; leitura com `dl.lc-props` (`--empilhado`).
**Estado** `.lc-estado--{sucesso|aviso|perigo|info|andamento|neutro}` (+ `--caixa`, `--vazado`, `--forte`); forma Linear `.lc-estado-forma` com ícones `backlog, a-fazer, em-andamento, feito, cancelado`. **Etiqueta** `.lc-etiqueta--1…8`, `--sistema`. **Contador** `.lc-contador` (`--alerta`, `--neutro`, `--p`); contagem em texto `.lc-contagem`. **Prioridade** `.lc-prioridade[data-n="1|2|3"]` com 3 `<i>`, `.lc-prioridade--urgente`. **Saúde** `.lc-saude`.
**Avatar** `.lc-av` `--20…96`, cor `--c2…c8`, presença `.lc-presenca--on|reuniao|ocupado|ausente|off`, grupo `.lc-av-grupo`, pessoa `.lc-pessoa` (`__nome`, `__sub`). **Ladrilho** (empresa/objeto) `.lc-ladrilho` `--24…64`, `--marca`. **Protocolo** `.lc-protocolo` ("<span>Chamado</span> 4.812").
**Carimbo** `.lc-carimbo--pago|aprovado|protocolado|ciente|emitido|cancelado|estornado|arquivado` (`--g`), com `<small>` de quem e quando. **Dupla sublinha** `.lc-total`, `.lc-subtotal`; `.lc-valor-neg` sempre com "−".
**Caixa** `.lc-caixa` (`--contorno`, `--plana`, `--poço`, `--clicavel`) > `__cab`, `__corpo` (`--cheio`), `__pe`. Lista: `ul.lc-lista` (`__sub`).
**Tabela**
```html
<div class="lc-tabela-cont lc-tabela-cont--alta"><table class="lc-tabela lc-tabela--pautada lc-tabela--coluna-fixa lc-com-sel">
<caption class="lc-sr">Boletos de outubro</caption>
<thead><tr><th class="lc-tabela__sel"><label class="lc-marcar"><input type="checkbox" aria-label="Selecionar todos"><span class="lc-marcar__caixa"></span></label></th>
<th scope="col" aria-sort="ascending"><button class="lc-ordenar">Unidade</button></th><th scope="col" class="lc-num"><button class="lc-ordenar">Valor</button></th><th><span class="lc-sr">Ações</span></th></tr></thead>
<tbody><tr class="lc-tabela__grupo"><td colspan="4"><button aria-expanded="true"><i data-i="chevron-baixo"></i>Vencidos</button><span class="lc-contagem">3</span><span class="lc-grupo-soma">R$ 3.852,11</span></td></tr>
<tr aria-selected="true"><td class="lc-tabela__sel">…</td><td><a href="#" class="lc-tabela__primaria">Bloco B, 1204</a><span class="lc-tabela__sub">Marina Costa</span></td>
<td class="lc-num"><button class="lc-celula-edit">R$ 1.284,37</button></td><td class="lc-tabela__acoes"><button class="lc-btn lc-btn--icone lc-btn--discreto lc-btn--p" aria-label="Mais opções de Bloco B, 1204"><i data-i="mais-opcoes"></i></button></td></tr></tbody>
<tfoot><tr><td></td><td>Total</td><td class="lc-num"><span class="lc-total">R$ 12.906,00</span></td><td></td></tr></tfoot></table></div>
```
Célula em edição: `.lc-celula-edit--editando` com `.lc-entrada`; salva: `--salvo`.
**Paginação** `.lc-paginacao` > `__info`, `__por` (`.lc-selecao`), `__pags` (`[aria-current="page"]`). **Filtros** `.lc-filtros` > `.lc-busca`, `.lc-filtro` (`--ativo`), `__fim`; chips `.lc-chips > .lc-chip-filtro`; visões salvas `.lc-visoes` (abas). **Barra de massa** `.lc-massa` (`__acoes`, `__fim`).
**Abas** `.lc-abas` (`--p`) com `[role=tab][aria-selected]` e `.lc-contagem`. **Trilha** `ol.lc-trilha`. **Paginador** `.lc-paginador` ("<b>14</b> de 63"). **Barra de etapas** `ol.lc-etapas > li.lc-etapa--feita|atual|perdida > button` (+ `small` "há 12 dias"), dentro de `.lc-etapas-cont` com a ação. **Passos** (formulário longo) `ol.lc-passos` (`aria-current="step"`, `.lc-feito`).
**Menu e "⋯"** `.lc-menu` (`--estatico`, `--contexto`) > `.lc-menu__item` (`--perigo`, `--sub`, `aria-checked`, `.lc-tecla`), `__titulo`, `__sep`. **Popover** `.lc-popover` (`__cab`, `__corpo`, `__pe`). **Dica** `[data-dica="…"]` (`data-dica-lado="direita"`) ou `.lc-dica`.
**Modal** `.lc-sobreposicao > .lc-modal` (560; `--largo` 760; `--perigo` com `role="alertdialog"`) > `__cab` (h2 + p + fechar), `__corpo`, `__pe` (`.lc-modal__aux` à esquerda; secundário, depois principal). Confirmação digitando: `.lc-confirma-digitando`. **Painel lateral** `.lc-painel` (480) `__cab/__corpo/__pe`. **Folha inferior** `.lc-folha` (`__alca`, `__cab`, `__corpo`).
**Toast** `.lc-toasts > .lc-toast` (`__txt`, `__acao` "Desfazer", `__fechar`, `--sucesso`). Erro nunca em toast. **Alerta inline** `.lc-alerta--info|sucesso|aviso|perigo` (`__corpo`, `__titulo`, `__acoes`). **Faixa de sistema** `.lc-faixa-sistema` (`--perigo`, `--info`). **Faixa de contexto** vem da moldura (`faixa`), classe `.lc-faixa-contexto` (`--homologacao`).
**Barra de salvar** (só com alteração)
```html
<div class="lc-barra-salvar" role="region" aria-label="Alterações não salvas">
  <p class="lc-barra-salvar__msg"><i data-i="aviso"></i><span><b>1 alteração não salva</b> em Contrato de administração: valor mensal</span></p>
  <div class="lc-barra-salvar__acoes"><button class="lc-btn lc-btn--discreto">Descartar</button>
    <span class="lc-dividido"><button class="lc-btn lc-btn--principal">Salvar</button><button class="lc-btn lc-btn--principal" aria-label="Salvar e…" aria-haspopup="menu"><i data-i="chevron-baixo"></i></button></span></div></div>
```
Opções do "Salvar ▾": Salvar e ir para o próximo (15 de 63, nome), Salvar e voltar para a lista, Salvar e criar outro. `--erro` quando falhou.
**Esqueleto** `.lc-esqueleto` (`--titulo`, `--linha`, `--curta`, `--media`, `--av`, `--bloco`). **Vazio** `.lc-vazio` (`--centro`; `__titulo`, `__texto`, `.lc-grupo-btn`) com `.lc-ladrilho--48` + ícone.
**Auditoria** `ul.lc-auditoria` > li: `.lc-av--24`, `__quem`, `__quando`, `dl.lc-auditoria__mudanca` com `<del>` / `<ins>`. **Atividade** `.lc-atividade` > `__mes`, `__ev` (`--fixado`) > `__no` (`--sucesso|--perigo`) + `__cartao` (`__cab`, `__hora`, `__corpo`, `__pe`).
**Conversa** `.lc-conversa` > `.lc-dia`, `.lc-msg-sistema`, `.lc-bolha` (`--enviada`, `--primeira`, `--nota`) com `__autor`, `__citacao`, `__meta` + `.lc-tique--lida|falhou` (ícones `enviando`, `confirmar`, `lida`, `erro`), `__falha`, `__nota-rotulo`; `.lc-foto` (+ `.lc-foto-legenda`), `.lc-audio` (`__tocar`, `__onda > i.lc-tocado`, `__tempo`, `__transcricao`), `.lc-ligado` (OS/boleto vinculado). **Compositor** `.lc-compositor` (`--nota`) > `__modo` (`button[aria-pressed][data-modo]`), `__linha` (`textarea.lc-compositor__caixa` + anexar/microfone/Enviar ▾), `__dica`.
**Para você** `ul.lc-pv > li.lc-pv__item` (`--feito`) > `__o-que`, `__prazo--atrasado|hoje`, `__acao` (botão com verbo).
**Feed** `.lc-publicar` (`__falso`, `__acoes`); `article.lc-post` > `__cab` (avatar, `__quem`, `__meta`, ⋯), `__corpo` (`__titulo`, `.lc-reconhece` com `__valor`), `.lc-reacoes-resumo` ("12, Ana, Bruno e mais 10"), `.lc-post__acoes` (`aria-pressed`), `.lc-reagir` (Curtir, Parabéns, Amei, Genial, Apoio com ícones `curtir, parabens, amei, genial, apoio`), `.lc-ciencia` (botão "Li e estou ciente" → `.lc-carimbo--ciente`, `__conta`), `.lc-comentario` (`__bolha`).
**Calendário** `.lc-cal` (`--mini`) > `__cab`, `__grade` > `__dsem`, `__dia` (`--fora`, `--hoje`, `--fds`, `--marcado`) > `__num` + `.lc-evento--andamento|sucesso|aviso|perigo|info` + `__mais`. **Agenda** `ul.lc-agenda` (`li.lc-agora`, `__hora`, `__sub`); data em bloco `.lc-data`.
**Kanban** `.lc-kanban > .lc-kanban__col` (`[data-solta]`) > `__cab` (h3 + `.lc-contagem`, `__soma`), `__lista` > `.lc-cartao-k` (`--esfriando`, `--atrasado`, `__titulo`, `__sub`, `__pe`), `__add`; `.lc-zona-soltar` (`.lc-ganho`, `.lc-perdido`).
**Progresso** `.lc-progresso` com `style="--_v:64%"` (`--sucesso|aviso|perigo|neutro`, `--g`, `--indeterminado`), rótulo `.lc-progresso-rot`. **Frequência** `.lc-frequencia` (`--baixa`, `--atencao`) > `.lc-frequencia__barra style="--_v:68%;--_min:75%"`. **KPI** (só relatório) `.lc-kpis > .lc-kpi` (`__rotulo`, `__valor`, `__var--pos|neg`).
**Cabeçalhos** `.lc-cab-pagina` (`__txt` com h1, `__desc`, `__acoes`); `.lc-cab-registro` > `__topo` (trilha + `.lc-paginador`), `__titulo` (ladrilho, h1, `.lc-estrela[aria-pressed]`, `__acoes`), `__meta`, `dl.lc-campos-chave`, depois `.lc-etapas-cont`.
**Utilitários** (base.css): `.lc-pagina` (`--larga|--form|--leitura`), `.lc-grade` + `.lc-col-1…12`, `.lc-pilha` (`--p|--g`), `.lc-linha` (`--entre`), `.lc-cresce`, `.lc-sr`, `.lc-num`, `.lc-reticencias`, `.lc-tecla`, tipografia `.lc-t-pagina/.lc-t-registro/.lc-t-secao/.lc-t-subsecao/.lc-pequeno/.lc-legenda/.lc-dado/.lc-codigo/.lc-documento`, cores `.lc-cor-2/.lc-cor-3`.

## 7. White label e tema em JS

`LCMarca.aplicar("orbita")`, `LCMarca.tema("escuro"|"claro"|"sistema")`, `LCMarca.densidade("compacta")`, `LCMarca.derivar("#E08A1E","claro")` → `{marca, txt, forte, suave, contraste, estadoProximo, deltaE, ajustes}`. Seletor pronto: `<div data-lc-seletor-marca></div>`. Eventos: `lc:marca`, `lc:tema`.

## 8. Verificação antes de entregar

Capturas com Playwright (`NODE_PATH=$(npm root -g)`) em 1440 e 390, claro e escuro; sem rolagem horizontal da página; foco visível; console sem erro. Use `?tema=escuro` na URL.

## 9. Estado da V1 em 01/10 e extensões por frente

O sumário navegável é `index.html` (158 páginas: fundação, padrões e fluxos, 17 telas de exemplo, sistema interno por módulo, portal, públicas, superadmin, celular e documentos).

As frentes de produção não editaram a fundação; o que faltava ficou em arquivos `sistema/extra-*` que as próprias páginas carregam. Antes de escolher entre V1 e V2 não é preciso fundir; ao adotar a V1, fundir nesta ordem:

| Arquivo | Vai para | Conteúdo |
|---|---|---|
| `extra-p1.css` parte A | componentes.css | rodapé de campo e contagem, variantes só-leitura e carregando, opções vazias, tabela que rola, célula com erro, carregar mais, cartões no celular, chips limpar, post fixado, etapas empilhadas no celular |
| `extra-p1.css` parte B, `extra-p1-doc.js` | doc.css, doc.js | estados forçados (hover/foco/ativo) e amostras claro/escuro/densidade com HTML copiável |
| `extra-p2.css`, `extra-p2.js`, `extra-p2-icones.js` | componentes.css, novo `fluxos.js`, icones.js | barra de salvar, Salvar ▾ com escolha lembrada, edição por campo/seção, sair com alteração, linha visitada, lista que lembra o lugar, layouts dos 14 modelos; ícones wifi-desligado, teclado, link-copiar, sessao-expirando |
| `extra-p3.css`, `extra-p3.js`, `extra-p3-icones.js` | componentes.css, fluxos.js, icones.js | nota de projeto, Início, grade do atendimento e tipos de mensagem, registro em 3 colunas, NPS, metas, editor de e-mail, mestre-detalhe; quadro movido pelo teclado; ícone whatsapp |
| `extra-p4.css`, `extra-p4.js` | componentes.css, fluxos.js | Gantt, organograma, gráfico SVG, fila de conciliação, folha de documento, certificado, player, mapa de questões, matriz de permissão, prévia de marca; total da tabela grudado só em `--alta` |
| `extra-p5.css`, `extra-p5.js`, `extra-p5-icones.js` | componentes.css, fluxos.js, icones.js | portal (boleto, Pix, pauta, resultado, passe), páginas públicas, superadmin (uso, serviços, 90 dias), aparelho e teclado do celular, folha A4, ficha de compensação, e-mail; faixa do superadmin que quebra linha no celular |

Já fundido na fundação: bordas compostas que respeitam o tema da amostra (tokens.css), seção Portaria em Operações, Conversas internas no Início, cabeçalho do portal sem "unidade · papel" e avatar conforme o papel (moldura.js).

Pendências conhecidas: o ⌘K real não executa ação no Enter nem tem o grupo "Criar" (a demonstração completa está em 12-fluxos-de-navegacao); trilha e sino da moldura apontam para "#"; arrastar nos quadros é visual (o teclado funciona onde extra-p3.js está carregado); visões alternativas (quadro das OS, lista do funil e das renovações) têm o botão mas não a tela; superadmin remove a marca do cliente por script em cada página (melhor mover para a moldura); campos de data nativos aparecem em mm/dd nas capturas sem idioma pt-BR (num navegador em português saem dd/mm).
