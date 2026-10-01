# GACO V2 "Casa de Máquinas": manual do sistema

Fonte da verdade para quem monta telas da V2. Tudo o que está aqui existe em `sistema/` e está demonstrado em `00-fundamentos.html`, `01-iconografia.html` e `02-navegacao.html`.

Regra de ouro: **a tela usa só classes `.cm-` e tokens `--cm-`**. CSS local só para disposição (grid, larguras de coluna). Se faltar um componente, ele entra em `sistema/componentes.css`, com estados, e é documentado aqui.

---

## 1. Arquivos

| Arquivo | O que tem |
|---|---|
| `sistema/tokens.css` | Primitivos (grafite, cimento, latão, verde, laranja-atenção, vermelho, azul-informação, papel), papéis nos temas escuro e claro, tipo, espaço, grade, contêineres, raio, borda, sombra, camadas, movimento, breakpoints, densidades, contexto (portal) e white label (`--cm-marca-*`). `@font-face` local. |
| `sistema/base.css` | Reset, foco, receita do ícone, classes de tipo (`.cm-t-*`), utilitários de layout (`.cm-linha`, `.cm-pilha`, `.cm-grade`, `.cm-container`). |
| `sistema/componentes.css` | Todos os componentes (índice no topo do arquivo, seções 01 a 33). |
| `sistema/icones.js` | 393 desenhos únicos (55 próprios) + apelidos. `window.CM_ICONES`, `cmIcone(nome, classe, rotulo)`, troca automática de `<i data-i="nome">`. Gerado; não editar à mão. |
| `sistema/moldura.js` | Navegação Modelo D refinado, gerada por `data-moldura`. Mapa de grupos, blocos e telas, papéis, portal, superadmin, Ctrl K, sino, conta, gaveta, barra inferior, rodapé de atalhos, `cmToast()`. |
| `sistema/marca.js` | Tema, densidade e marca do cliente, com derivação de contraste e avaliação de conflito com as cores de estado. |
| `sistema/fontes/` | Hanken Grotesk (variável, normal e itálico) e Fragment Mono, OFL. |
| `exemplos/moldura.html` | Página auxiliar: monta a moldura por `?cfg=` e abre um menu por `?abrir=`. |

---

## 2. Esqueleto de página

```html
<!doctype html>
<html lang="pt-BR" data-theme="dark" data-contexto="interno">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Conversas</title>
<script src="../sistema/marca.js"></script>              <!-- no head, sem defer: evita piscar o tema -->
<link rel="stylesheet" href="../sistema/tokens.css">
<link rel="stylesheet" href="../sistema/base.css">
<link rel="stylesheet" href="../sistema/componentes.css">
<script src="../sistema/icones.js"></script>
<script src="../sistema/moldura.js" defer></script>
<style>/* só disposição desta tela */</style>
</head>
<body>
<a class="cm-pular" href="#conteudo">Pular para o conteúdo</a>
<div data-moldura='{"grupo":"Suporte","tela":"Conversas","papel":"Atendimento","atalhos":true}'></div>
<main id="conteudo" class="cm-pagina">
  <header class="cm-cabecalho-pagina">
    <div class="cm-cabecalho-pagina__linha">
      <h1 class="cm-cabecalho-pagina__titulo">Conversas</h1>
      <div class="cm-cabecalho-pagina__acoes">
        <button class="cm-botao cm-botao--principal" type="button"><i data-i="adicionar"></i>Nova conversa</button>
        <button class="cm-botao cm-botao--icone" type="button" aria-label="Mais ações"><i data-i="mais-opcoes"></i></button>
      </div>
    </div>
  </header>
  …
</main>
</body>
</html>
```

- Caminhos: páginas na raiz da versão usam `sistema/…`; páginas em subpasta usam `../sistema/…`.
- Tela de trabalho com a altura toda (Suporte, Kanban): troque `.cm-pagina` por `<main class="cm-app">` com colunas `.cm-coluna`. A altura desconta a moldura, a trilha e o rodapé de atalhos (variáveis `--cm-moldura-altura`, `--cm-trilha-altura`, `--cm-rodape-altura`, calculadas pelo moldura.js).
- Portal: `<html data-contexto="portal" data-theme="light">` e moldura `{"contexto":"portal","tela":"Boletos"}`.
- Superadmin: `{"contexto":"superadmin","tela":"Clientes da plataforma"}`; dentro de um cliente, acrescente `"emNomeDe":{"cliente":"…","motivo":"…","expira":"42 min"}`.
- URL: `?theme=light|dark`, `?brand=alpha|lar|vertice`, `?densidade=compacta|padrao|confortavel`, `?cor=%237A2E3A` (cor livre).

### 2.1 `data-moldura`, todas as chaves

| Chave | Valor | Efeito |
|---|---|---|
| `contexto` | `interno` (padrão), `portal`, `superadmin` | Troca a casca inteira |
| `grupo`, `bloco`, `tela` | nomes do mapa (`CM_MAPA`) | Marca o item atual no menu, na gaveta e na trilha; `bloco` é achado sozinho |
| `papel` | Atendimento, CS, Comercial, Financeiro, RH, Produto, Operações, Diretoria | Grupos visíveis, favoritos, destino da barra inferior |
| `registro` | texto | Último item da trilha ("Cond. Parque das Águas") |
| `navegar` | "14 de 63" | Anterior/próximo na trilha (J e K) |
| `trilha` | `false` | Esconde a trilha |
| `atalhos` | `true` ou `[["J","próxima"],…]` | Rodapé de atalhos fixo |
| `sino` | número | Contador do sino |
| `usuario` | `{"nome","iniciais","cargo","presenca","tom"}` | Avatar e menu da conta |
| `clientes` | `true` | Mostra a troca de cliente |
| `homologacao` | `true` | Faixa de ambiente de homologação |
| `unidade` | "Bl B Ap 1204" | Portal: unidade no topo |
| `links` | `{"Conversas":"suporte.html"}` | Liga telas entre páginas (também `window.CM_LINKS`, definido antes do moldura.js) |

Funções globais: `cmAbrirPaleta()`, `cmAbrirAtalhos()`, `cmToast(texto, 'sucesso'|'aviso'|'perigo'|'info', 'Desfazer')`, `cmAplicarTema()`, `cmAplicarMarca()`, `cmAplicarDensidade()`, `cmAvaliarMarca('#hex')`, `cmIcone()`, `cmPresenca('disponivel')`.

---

## 3. Regras que não se negociam

1. **Latão é ação.** Botão principal, foco, item ativo, aba ativa, contador "não lido, para você". Nunca estado, etiqueta, gráfico de estado ou decoração.
2. **Estado tem ícone e palavra.** `.cm-estado--sucesso|aviso|perigo|info|neutro`. Atenção usa o triângulo e uma palavra ("Atenção: esfriando"); nunca só um ponto laranja. Em lista longa, `.cm-estado--ponto` muda a forma (círculo, losango, quadrado, vazado) e mantém a palavra.
3. **Plaqueta** (`.cm-plaqueta`): só identificador físico ou de protocolo: chamado, OS, contrato, unidade, vaga, chave. Só como valor isolado: cabeçalho do registro (`--g`, uma vez), campo da ficha cujo valor é o identificador, etiqueta do quadro de chaves, cartão de vínculo na conversa. **Máximo uma por bloco.** Nunca dentro de frase, mensagem, linha do tempo, toda linha de lista ou tabela (lá vai texto tabular na coluna "Nº"), título, botão, etiqueta, estado, nem no portal (lá ela vira texto sozinha).
4. **Marca do cliente** (`--cm-marca*`): testeira e fio no interno; topo, botão principal, aba ativa e link no portal; mural da empresa, login, e-mail, PDF. **Nunca** estado, contador, etiqueta, bolha, Path, gráfico, foco.
5. **Sombra só no que flutua.** Superfície se separa por camada e filete.
6. **Sem caixa alta, sem mono em rótulo, sem "A · B · C", sem "→" no botão, sem emoji na interface.**
7. **Densidade é da pessoa:** compacta no interno, confortável no portal. Componentes leem `--cm-controle`, `--cm-linha-tabela`, nunca alturas fixas.

---

## 4. Componentes: classes e exemplos

Estados em todos os componentes: hover e foco pelo navegador; desabilitado `disabled` ou `aria-disabled="true"`; carregando `aria-busy="true"` (botão) ou `.is-carregando` (entrada); erro `aria-invalid="true"` ou `.is-erro`; só leitura `readonly` ou `.is-leitura`; selecionado `aria-selected`, `aria-pressed`, `aria-current`.

### 4.1 Botão
Classes: `.cm-botao` + `--principal` (latão; marca no portal), `--discreto`, `--perigo`, `--perigo-cheio` (só na confirmação de exclusão), `--link`, `--icone`; tamanhos `--p` (24/28/32 conforme densidade), padrão, `--g`, `--toque` (44px), `--portal` (52px, largura toda), `--bloco`.
```html
<button class="cm-botao cm-botao--principal" type="button"><i data-i="salvar"></i>Salvar</button>
<button class="cm-botao" type="button">Cancelar</button>
<button class="cm-botao cm-botao--perigo" type="button"><i data-i="excluir"></i>Excluir…</button>
<button class="cm-botao cm-botao--icone cm-botao--discreto" type="button" aria-label="Mais ações" data-dica="Mais ações"><i data-i="mais-opcoes"></i></button>
<button class="cm-botao cm-botao--principal" type="button" aria-busy="true">Salvando</button>
```
**Dividido** ("Salvar ▾", "Enviar ▾"), o rótulo lembra a última escolha:
```html
<div class="cm-dividido">
  <button class="cm-botao cm-botao--principal" type="button">Salvar <span class="cm-dividido__lembra">e próximo</span></button>
  <button class="cm-botao cm-botao--principal" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Outras formas de salvar"><i data-i="chevron-baixo"></i></button>
</div>
```
Menu do "Salvar ▾": Salvar e continuar (Ctrl S), Salvar e próximo (Ctrl Enter), Salvar e voltar à lista, Salvar e novo. Menu do "Enviar ▾": Enviar e manter aberto, Enviar e aguardar cliente, Enviar e resolver, Enviar e abrir a próxima da fila, com a caixa "Depois de resolver, abrir a próxima" no pé.

### 4.2 Grupo segmentado
```html
<div class="cm-segmentado" role="group" aria-label="Visão">
  <button type="button" aria-pressed="true"><i data-i="lista"></i>Lista</button>
  <button type="button" aria-pressed="false"><i data-i="quadro"></i>Quadro</button>
</div>
```
Variantes: `--p`, `--icones`.

### 4.3 Campo, rótulo, ajuda, erro
```html
<div class="cm-campo">
  <label class="cm-campo__rotulo" for="cnpj">CNPJ <span class="cm-campo__obrigatorio" aria-hidden="true">*</span></label>
  <div class="cm-entrada"><input id="cnpj" inputmode="numeric" aria-invalid="true" aria-describedby="cnpj-erro" value="12.345.678/0001-0"></div>
  <p class="cm-campo__erro" id="cnpj-erro"><i data-i="perigo"></i>Falta 1 dígito. O CNPJ tem 14.</p>
</div>
```
Partes: `.cm-campo__opcional`, `__ajuda`, `__antes` ("Antes: R$ 4.380,00"), `__contagem`; `.cm-campo--horizontal` (rótulo à esquerda). Entrada: `.cm-entrada` (+ `--p`, `--g`, `--toque`, `.is-erro`, `.is-desabilitado`, `.is-leitura`, `.is-carregando`, `.is-editado`), com `.cm-entrada__prefixo`, `__sufixo`, `__acao`, `__limpar`, `__passo`. Área: `textarea.cm-area`.

| Tipo | Marcação |
|---|---|
| Texto, e-mail | `<div class="cm-entrada"><input type="email" autocomplete="email"></div>` |
| Número | `.cm-entrada--numero` + `<span class="cm-entrada__passo"><button aria-label="Aumentar">…</button><button aria-label="Diminuir">…</button></span>` |
| Moeda | `.cm-entrada--moeda` + `<span class="cm-entrada__prefixo">R$</span><input inputmode="decimal">` |
| Porcentagem | `.cm-entrada--porcentagem` + `<input inputmode="decimal"><span class="cm-entrada__sufixo">%</span>` |
| Data, data-hora, hora | `<i data-i="calendario"></i><input placeholder="dd/mm/aaaa">`; hora com `<i data-i="pendente"></i>` e `hh:mm` |
| Período | `<div class="cm-periodo"><div class="cm-entrada">…</div><span class="cm-periodo__ate">até</span><div class="cm-entrada">…</div></div>` |
| CPF/CNPJ | `inputmode="numeric"`, máscara 000.000.000-00 / 00.000.000/0000-00; erro diz quantos dígitos faltam |
| CEP com consulta | `<div class="cm-entrada is-carregando"><input inputmode="numeric"><button class="cm-entrada__acao" type="button">Consultar</button></div><p class="cm-cep-resultado"><i data-i="sucesso"></i>Av. Sete de Setembro, Batel, Curitiba</p>` |
| Telefone | `<span class="cm-entrada__prefixo">+55</span><input type="tel" placeholder="(11) 98765-4321">` |
| Senha | `.cm-entrada--senha` + `<button class="cm-entrada__acao" aria-label="Mostrar senha"><i data-i="ver"></i></button>` + `<div class="cm-forca" data-nivel="3"><i></i><i></i><i></i><i></i></div>` |
| Busca | `.cm-entrada--busca` + `<i data-i="pesquisar"></i><input type="search"><button class="cm-entrada__limpar" aria-label="Limpar"><i data-i="fechar"></i></button><kbd class="cm-tecla">/</kbd>` |

### 4.4 Seleção, combo com busca, multisseleção
```html
<div class="cm-selecao"><select aria-label="Prioridade"><option>Alta</option></select><i data-i="chevron-baixo"></i></div>

<button class="cm-gatilho" type="button" aria-haspopup="listbox" aria-expanded="true"><span class="cm-gatilho__valor">Beatriz Nogueira</span><i data-i="chevron-baixo"></i></button>
<div class="cm-lista-opcoes cm-flutuante" role="listbox">
  <div class="cm-lista-opcoes__busca"><div class="cm-entrada cm-entrada--p cm-entrada--busca"><i data-i="pesquisar"></i><input placeholder="Buscar pessoa"></div></div>
  <div class="cm-lista-opcoes__grupo">Equipe do Suporte</div>
  <div class="cm-opcao is-ativa" role="option" aria-selected="true">Beatriz Nogueira<span class="cm-opcao__desc">disponível</span></div>
  <div class="cm-lista-opcoes__criar"><div class="cm-opcao" role="option"><i data-i="adicionar"></i>Convidar pessoa</div></div>
</div>

<div class="cm-multi"><span class="cm-etiqueta cm-etiqueta--1">Manutenção<button class="cm-etiqueta__remover" aria-label="Remover Manutenção"><i data-i="fechar"></i></button></span><input aria-label="Adicionar etiqueta"></div>
```

### 4.5 Caixa de marcar, rádio, interruptor
```html
<label class="cm-marcar"><input type="checkbox"><span class="cm-marcar__caixa"></span><span>Avisar a síndica<span class="cm-marcar__desc">por WhatsApp</span></span></label>
<label class="cm-marcar cm-marcar--tarefa"><input type="checkbox" checked><span class="cm-marcar__caixa"></span><span class="cm-marcar__texto">Acionar manutenção</span></label>
<label class="cm-radio"><input type="radio" name="tipo"><span class="cm-radio__bola"></span><span>Corretiva</span></label>
<label class="cm-interruptor"><input type="checkbox" role="switch"><span class="cm-interruptor__trilho"></span><span>Há risco</span></label>
<fieldset class="cm-grupo-opcoes cm-grupo-opcoes--linha"><legend>Tipo</legend>…</fieldset>
<div class="cm-opcoes-botao"><button type="button" aria-pressed="true"><i data-i="vazamento"></i>Vazamento</button>…</div>
```
Tarefa concluída usa verde, não latão. `--toque` no interruptor do celular.

### 4.6 Upload e anexos
```html
<label class="cm-upload"><i data-i="enviar-arquivo"></i><span><b>Arraste arquivos</b> ou clique para escolher</span><span class="cm-t-legenda">PDF, JPG ou PNG até 20 MB</span><input type="file" hidden multiple></label>
<div class="cm-anexos">
  <div class="cm-anexo"><span class="cm-anexo__tipo"><i data-i="pdf"></i></span><span><span class="cm-anexo__nome">laudo-hidrotec.pdf</span><span class="cm-anexo__meta">1,2 MB, enviando 64%</span><span class="cm-anexo__barra"><i style="width:64%"></i></span></span><button class="cm-botao cm-botao--icone cm-botao--discreto cm-botao--p" aria-label="Cancelar envio"><i data-i="fechar"></i></button></div>
</div>
<div class="cm-miniaturas"><div class="cm-miniatura"><img alt="Foto do teto da garagem" src="…"><button class="cm-miniatura__remover" aria-label="Remover foto"><i data-i="fechar"></i></button></div><button class="cm-miniatura cm-miniatura--adicionar"><i data-i="adicionar"></i>Foto</button></div>
```
Estados: `.is-arrastando`, `.is-erro`, `.is-desabilitado`; anexo `.is-erro`.

### 4.7 Editor de texto com menção
```html
<div class="cm-editor">
  <div class="cm-editor__barra" role="toolbar" aria-label="Formatação">
    <button aria-pressed="false" aria-label="Negrito"><i data-i="negrito"></i></button> … <span class="cm-separador-v"></span> …
  </div>
  <div class="cm-editor__area" contenteditable="true" role="textbox" aria-multiline="true" data-vazio="Escreva o comunicado">Pessoal, <span class="cm-mencao">@Diego Martins</span> confirma o horário.</div>
  <div class="cm-editor__pe">@ menciona, / insere bloco</div>
</div>
```
A lista de menção é a `.cm-lista-opcoes` com avatares. `.is-leitura` esconde a barra.

### 4.8 Seção de formulário
```html
<section class="cm-form-secao">
  <div><h2 class="cm-form-secao__titulo">Contato da síndica</h2><p class="cm-form-secao__desc">Usado no portal e nas notificações.</p></div>
  <div class="cm-form-secao__campos"><div class="cm-campo cm-col-4">…</div><div class="cm-campo cm-col-2">…</div></div>
</section>
```

### 4.9 Estado, etiqueta, contador
```html
<span class="cm-estado cm-estado--perigo"><i data-i="perigo"></i>Vencido há 4 dias</span>
<span class="cm-estado cm-estado--ponto cm-estado--aviso">Aguardando cliente</span>
<button class="cm-estado cm-estado--caixa cm-estado--info" type="button" aria-haspopup="menu"><i data-i="pendente"></i>Aberto<i data-i="chevron-baixo"></i></button>
<span class="cm-etiqueta cm-etiqueta--4">Aguardando boleto</span>      <!-- 8 tons próprios, nunca cor de estado -->
<span class="cm-contador cm-contador--novo">7</span>  <span class="cm-contador">38</span>
```
Ícone por estado: `sucesso`, `atencao`, `perigo`/`erro`, `pendente`/`informacao`, `rascunho`/`arquivar`.

### 4.10 Avatar e presença (padrão Teams)
```html
<span class="cm-avatar cm-avatar--m cm-avatar--2">BN<span class="cm-presenca cm-presenca--disponivel" aria-hidden="true"></span></span>
<span class="cm-presenca-texto"><span class="cm-presenca cm-presenca--ausente"></span>Volto logo, consulta médica até 11h</span>
<div class="cm-pessoa"><span class="cm-avatar">MC</span><span class="cm-pessoa__texto"><span class="cm-pessoa__nome">Marina Costa</span><span class="cm-pessoa__sub">Síndica, Parque das Águas</span></span></div>
```
Presenças: `disponivel`, `ocupado`, `em-atendimento`, `nao-incomodar`, `ausente`, `offline`. Use `cmPresenca('ausente')` para gerar o selo com o glifo (tique, traço, relógio, X). Tamanhos: `--p` 22, padrão 28, `--m` 32, `--g` 48, `--gg` 72; `--empresa` (quadrado, na cor do cliente, só para a conta da empresa no mural). Pilha: `.cm-avatares`.

### 4.11 Ladrilho de objeto e plaqueta
```html
<span class="cm-ladrilho"><i data-i="condominio"></i></span>   <!-- --pp 22, --p 28, padrão 40, --g 48, --vazado -->
<span class="cm-plaqueta cm-plaqueta--g">#48213</span>         <!-- regra §3.3 -->
```

### 4.12 Cartão, seção, ficha com edição no lugar
```html
<section class="cm-cartao">
  <header class="cm-cartao__cabeca"><h2 class="cm-cartao__titulo">Contrato e cobrança</h2><button class="cm-botao cm-botao--p cm-botao--discreto"><i data-i="editar"></i>Editar seção</button></header>
  <div class="cm-cartao__corpo">
    <dl class="cm-ficha">
      <div class="cm-ficha__linha"><dt>Telefone</dt><dd>(11) 3456-7788</dd><button class="cm-ficha__lapis" aria-label="Editar telefone"><i data-i="editar"></i></button></div>
      <div class="cm-ficha__linha is-editando"><dt>Responsável</dt><dd><div class="cm-campo cm-cresce"><div class="cm-entrada is-editado"><input value="Rodrigo Mello"></div><p class="cm-campo__antes">Era Juliana Reis. Enter confirma, Esc desfaz.</p></div></dd><span></span></div>
      <div class="cm-ficha__linha is-leitura"><dt>Criado em</dt><dd>12/03/2024 <span class="cm-ficha__cadeado" title="Campo do sistema"><i data-i="bloquear"></i></span></dd><span></span></div>
    </dl>
  </div>
</section>
```
`.cm-ficha--larga` (rótulo 160px), `.cm-ficha__alterado` ("alterado"), `.cm-secao` + `__cabeca`, `__titulo`, `__acao` para painéis laterais.

### 4.13 Cabeçalho de página e de registro
```html
<header class="cm-cabecalho-registro">
  <div class="cm-cabecalho-registro__topo">
    <span class="cm-ladrilho"><i data-i="condominio"></i></span>
    <div class="cm-cresce"><span class="cm-cabecalho-registro__tipo">Cliente</span><h1 class="cm-cabecalho-registro__titulo">Cond. Parque das Águas <span class="cm-plaqueta cm-plaqueta--g">CT-2024-0187</span></h1></div>
    <div class="cm-grupo-botoes"><button class="cm-botao">Registrar contato</button><div class="cm-dividido">…</div></div>
  </div>
  <dl class="cm-destaques"><div><dt>Saúde</dt><dd><span class="cm-estado cm-estado--sucesso"><i data-i="sucesso"></i>82, boa</span></dd></div><div><dt>Renovação</dt><dd>em 106 dias</dd></div></dl>
</header>
```
Campos-chave (`.cm-destaques`) são dados do registro, não KPIs.

### 4.14 Tabela densa
```html
<div class="cm-tabela-caixa cm-tabela-caixa--alta" style="--tabela-altura:560px">
<table class="cm-tabela">
  <thead><tr>
    <th class="cm-tabela__marcar cm-tabela__fixa"><label class="cm-marcar"><input type="checkbox" aria-label="Selecionar todos"><span class="cm-marcar__caixa"></span></label></th>
    <th aria-sort="descending"><button class="cm-ordenar">Vencimento<i data-i="seta-baixo"></i></button></th>
    <th>Unidade</th><th class="cm-num">Valor</th><th class="cm-tabela__acoes"><span class="cm-sr">Ações</span></th>
  </tr></thead>
  <tbody>
    <tr class="cm-tabela__grupo"><td colspan="5"><button aria-expanded="true"><i data-i="chevron-baixo"></i>Bloco B</button><span class="cm-tabela__grupo-soma">12 boletos, R$ 15.418,80</span></td></tr>
    <tr aria-selected="true"><td class="cm-tabela__fixa">…</td><td>10/10</td><td class="cm-tabela__principal"><a href="#">Bl B Ap 1204</a><span class="cm-tabela__sub">Marina Costa</span></td>
      <td class="cm-num cm-celula-editavel is-editado" tabindex="0">R$ 1.284,90</td>
      <td class="cm-tabela__acoes"><button class="cm-botao cm-botao--icone cm-botao--discreto cm-botao--p" aria-label="Ações da linha"><i data-i="mais-opcoes"></i></button></td></tr>
  </tbody>
  <tfoot><tr><td></td><td colspan="2">Total</td><td class="cm-num">R$ 15.418,80</td><td></td></tr></tfoot>
</table></div>
```
Cabeçalho fixo (sticky), coluna fixa `.cm-tabela__fixa` (e `__fixa2` para a segunda), linha atual `.is-atual`, célula editável `.cm-celula-editavel` com `.is-editando` (input dentro), `.is-editado`, `.is-erro`, `.is-leitura`. Variantes: `--zebra`, `--simples` (boletim, composição de valor). Número de protocolo na lista vai em texto, sem plaqueta.

### 4.15 Paginação e "14 de 63"
```html
<nav class="cm-paginacao" aria-label="Paginação"><span class="cm-paginacao__total"><b>1–50</b> de 312</span>
  <div class="cm-paginacao__paginas"><button disabled aria-label="Anterior"><i data-i="chevron-esquerda"></i></button><button aria-current="page">1</button><button>2</button><button aria-label="Próxima"><i data-i="chevron-direita"></i></button></div>
  <div class="cm-selecao"><select aria-label="Linhas por página"><option>50 por página</option></select><i data-i="chevron-baixo"></i></div></nav>
<div class="cm-navegar-registro"><b>14 de 63</b> …</div>   <!-- a moldura já põe na trilha com "navegar" -->
```

### 4.16 Filtros, chips, visões salvas, barra de massa
```html
<div class="cm-visoes" role="tablist"><button role="tab" aria-selected="true">Precisam de mim hoje <span class="cm-contador">7</span></button><button role="tab">Renovam em 90 dias</button></div>
<div class="cm-filtros">
  <div class="cm-entrada cm-entrada--busca">…</div>
  <button class="cm-filtro is-ativo" aria-haspopup="dialog">Estado: <b>Aberto</b><i data-i="chevron-baixo"></i></button>
  <button class="cm-filtro"><i data-i="filtrar"></i>Mais filtros</button>
</div>
<div class="cm-chips"><span class="cm-chip"><span>Canal</span> WhatsApp<button aria-label="Tirar filtro Canal"><i data-i="fechar"></i></button></span><button class="cm-botao cm-botao--link cm-botao--p">Limpar filtros</button></div>
<div class="cm-barra-massa" role="region" aria-label="Ações em massa"><b>3 selecionados</b><button class="cm-botao cm-botao--p">Atribuir</button><button class="cm-botao cm-botao--p">Mover para…</button><span class="cm-empurra"><button class="cm-botao cm-botao--p cm-botao--discreto">Cancelar</button></span></div>
```
`.cm-barra-massa--flutuante` para listas longas. A lista lembra filtro e posição (query string).

### 4.17 Abas, trilha, Path
```html
<div class="cm-abas" role="tablist"><button role="tab" aria-selected="true">Chamado</button><button role="tab">Boletos <span class="cm-contador">1</span></button></div>
<nav aria-label="Trilha"><ol class="cm-trilha"><li><a href="#">CS</a></li><li><a href="#">Clientes</a></li><li aria-current="page">Parque das Águas</li></ol></nav>
<div class="cm-path">
  <ol><li class="is-feito"><button><i data-i="marcar"></i>Implantação</button></li><li class="is-atual"><button aria-current="step">Expansão</button></li><li><button>Renovação</button></li></ol>
  <button class="cm-botao">Marcar etapa como concluída</button>
</div>
<div class="cm-path__orientacao"><span><b>O que a etapa pede:</b> reunião de resultados até 30/10</span></div>
```
Abas: `--p`, `--sem-linha`. Path: `.is-feito` (verde com tique), `.is-atual` (chapa clara com filete latão), `.is-perdido`.

### 4.18 Menus, popover, dica, paleta
```html
<div class="cm-menu cm-menu--240 cm-flutuante" role="menu">
  <div class="cm-menu__titulo">Chamado 48213</div>
  <button class="cm-menu__item" role="menuitem"><i data-i="atribuir"></i><span>Atribuir</span><span class="cm-menu__atalho">A</span></button>
  <div class="cm-menu__sep"></div>
  <button class="cm-menu__item cm-menu__item--perigo" role="menuitem"><i data-i="excluir"></i><span>Excluir…</span><span></span></button>
</div>
```
O "⋯" é `.cm-botao--icone` com `mais-opcoes`; até duas ações secundárias no cabeçalho, o resto no "⋯", destrutiva por último. Menu de contexto: `.cm-menu--contexto` na posição do clique. Popover: `.cm-popover` + `__cabeca`, `__corpo`, `__pe`. Dica: atributo `data-dica="Texto"` (ou `.cm-dica`). Paleta: `cmAbrirPaleta()` (classes `.cm-paleta*`).

### 4.19 Modal, painel lateral, folha inferior
```html
<div class="cm-sobreposicao">
  <div class="cm-modal cm-modal--p cm-modal--perigo" role="dialog" aria-modal="true" aria-labelledby="m1">
    <div class="cm-modal__cabeca"><h2 class="cm-modal__titulo" id="m1">Excluir o chamado 48213?<span class="cm-modal__sub">Ele vai para a lixeira por 30 dias.</span></h2><button class="cm-botao cm-botao--icone cm-botao--discreto" aria-label="Fechar"><i data-i="fechar"></i></button></div>
    <div class="cm-modal__corpo">…</div>
    <div class="cm-modal__pe"><button class="cm-botao">Cancelar</button><button class="cm-botao cm-botao--perigo-cheio">Excluir</button></div>
  </div>
</div>
<aside class="cm-painel" role="dialog" aria-label="Prévia"><header class="cm-painel__cabeca"><h2 class="cm-painel__titulo">Parque das Águas</h2>…</header><div class="cm-painel__corpo">…</div><footer class="cm-painel__pe">…</footer></aside>
<div class="cm-folha" role="dialog" aria-modal="true"><div class="cm-folha__alca"></div><div class="cm-folha__cabeca"><h2 class="cm-folha__titulo">Enviar</h2></div><div class="cm-folha__corpo"><button class="cm-folha__item"><i data-i="enviar"></i>Enviar e resolver</button></div></div>
```
Modal `--p` 400, padrão 560, `--g` 720, `--gg` 960. Painel 400 / `--g` 560 / `--no-lugar` (coluna fixa). Exclusão em 3 níveis: item comum vai para a lixeira com toast "Desfazer"; item com vínculos pede confirmação `--perigo`; exclusão definitiva pede digitar o nome.

### 4.20 Toast, alerta inline, faixas, barra de salvar
```html
<div class="cm-toasts" role="status" aria-live="polite"><div class="cm-toast cm-toast--sucesso"><i data-i="sucesso"></i><span class="cm-toast__texto">Chamado movido para a lixeira.</span><button class="cm-toast__acao">Desfazer</button><button class="cm-toast__fechar" aria-label="Fechar"><i data-i="fechar"></i></button></div></div>
<div class="cm-alerta cm-alerta--aviso"><i data-i="atencao"></i><span class="cm-alerta__texto"><span class="cm-alerta__titulo">Atenção: o SLA vence em 6 min</span><span class="cm-alerta__desc">Responda até 09:44 ou passe a conversa.</span></span><span class="cm-alerta__acoes"><button class="cm-botao cm-botao--p">Passar</button></span></div>
<div class="cm-faixa cm-faixa--info"><i data-i="informacao"></i><span class="cm-faixa__texto">Manutenção programada hoje às 23h, por 20 minutos.</span><button class="cm-botao cm-botao--p cm-botao--discreto">Entendi</button></div>
<div class="cm-barra-salvar" role="region" aria-label="Alterações não salvas">
  <div class="cm-barra-salvar__msg"><b>2 alterações não salvas</b><span>Telefone e responsável</span></div>
  <button class="cm-botao cm-botao--discreto">Descartar</button>
  <div class="cm-dividido">…Salvar ▾…</div>
</div>
```
Faixa de contexto: a moldura gera (`emNomeDe`, `homologacao`); classes `.cm-faixa-contexto--superadmin|--homologacao`. A barra de salvar só existe com alteração; `.is-salvando`, `.is-erro`.

### 4.21 Esqueleto, vazio, carregando
```html
<span class="cm-esqueleto cm-esqueleto--titulo"></span><span class="cm-esqueleto cm-esqueleto--linha"></span>
<div class="cm-vazio"><i data-i="caixa-de-entrada"></i><p class="cm-vazio__titulo">Fila zerada</p><p class="cm-vazio__texto">As novas conversas chegam aqui.</p><div class="cm-vazio__acoes"><button class="cm-botao">Ver aguardando cliente</button></div></div>
<span class="cm-carregando">Carregando boletos</span>
```

### 4.22 Linha do tempo: auditoria e atividade
```html
<ol class="cm-auditoria">
  <li class="cm-auditoria__dia">Hoje</li>
  <li><time>09:31</time><b>Beatriz</b> mudou a prioridade: <del>Normal</del> → <ins>Alta</ins></li>
  <li class="is-criacao"><time>09:12</time>Aberto pelo WhatsApp</li>
</ol>
<ul class="cm-atividade">
  <li><span class="cm-ladrilho cm-ladrilho--p"><i data-i="telefone"></i></span><div><div class="cm-atividade__titulo"><a href="#">Ligação com Marina Costa</a></div><div class="cm-atividade__desc">Combinaram a vistoria para quinta.</div></div><span class="cm-atividade__quando">ontem</span></li>
</ul>
```

### 4.23 Conversa e compositor
```html
<div class="cm-conversa" role="log" aria-label="Conversa com Marina Costa">
  <span class="cm-dia">Hoje</span>
  <div class="cm-bolha cm-bolha--entrada">Tem água vazando do teto da garagem. <span class="cm-bolha__meta">09:12</span></div>
  <div class="cm-evento"><i data-i="fone-atendimento"></i>Beatriz assumiu a conversa, 09:16</div>
  <div class="cm-bolha cm-bolha--saida">Já estou acionando a manutenção. <span class="cm-bolha__meta">09:17<i data-i="lida" class="cm-tique--lida" data-rotulo="Lida"></i></span></div>
  <div class="cm-bolha cm-bolha--foto cm-bolha--entrada"><img alt="Teto da garagem molhado sobre a vaga 37" src="…"><div class="cm-bolha__legenda">Vaga 37, subsolo 1 <span class="cm-bolha__meta">09:13</span></div></div>
  <div class="cm-bolha cm-bolha--entrada"><div class="cm-audio"><button class="cm-audio__play" aria-label="Ouvir áudio de 38 segundos"><i data-i="play"></i></button><span class="cm-audio__onda"><i class="is-tocado" style="height:10px"></i>…</span><span class="cm-audio__tempo">0:38</span></div><div class="cm-transcricao"><b>Transcrição:</b> “É da junta mesmo, perto do pilar.”</div></div>
  <span class="cm-novas">3 novas</span>
  <div class="cm-nota"><div class="cm-nota__cabeca"><i data-i="nota-interna"></i>Nota interna de Juliana Prado <span>só a equipe vê, 09:24</span></div>…</div>
  <div class="cm-cartao-vinculo"><i data-i="ordem-de-servico"></i>Vinculado à <span class="cm-plaqueta">OS 482</span></div>
</div>
<div class="cm-compositor"> <!-- .is-nota troca a caixa para o amarelo-papel; .is-gravando para o áudio -->
  <div class="cm-abas" role="tablist"><button role="tab" aria-selected="true"><i data-i="responder"></i>Resposta</button><button role="tab"><i data-i="nota-interna"></i>Nota interna</button><span class="cm-compositor__dica"><kbd class="cm-tecla">/</kbd>respostas rápidas</span></div>
  <div class="cm-compositor__caixa"><textarea aria-label="Mensagem"></textarea></div>
  <div class="cm-compositor__barra"><button class="cm-botao cm-botao--icone cm-botao--discreto" aria-label="Anexar"><i data-i="anexar"></i></button><button class="cm-botao cm-botao--icone cm-botao--discreto" aria-label="Gravar áudio"><i data-i="microfone"></i></button><span class="cm-cresce">Depois de enviar: resolver e abrir a próxima</span><div class="cm-dividido">…Enviar ▾…</div></div>
  <div class="cm-comandos cm-lista-opcoes"><div class="cm-opcao"><b>/2via</b><span>Segue a 2ª via do boleto de {mês}…</span><kbd class="cm-tecla">Enter</kbd></div></div>
</div>
```
Tiques: `marcar` enviado/entregue, `lida` + `.cm-tique--lida` (azul de informação, nunca verde de WhatsApp), `erro` + `.cm-tique--falhou` com `.cm-bolha.is-falhou` e `.cm-bolha__reenviar`. Citação: `.cm-bolha__citacao`. Emoji escrito pelo morador aparece como ele escreveu.

### 4.24 Rodapé de atalhos
Pela moldura (`"atalhos":true`) ou à mão: `<div class="cm-rodape-atalhos"><span><kbd class="cm-tecla">J</kbd>próxima</span>…</div>`. Sem número de desempenho no rodapé.

### 4.25 Para você, mural, reações, ciência
```html
<section class="cm-pv">
  <div class="cm-pv-item is-urgente"><span class="cm-ladrilho cm-ladrilho--p"><i data-i="whatsapp"></i></span>
    <div><div class="cm-pv-item__titulo"><a href="#">Responder Marina Costa</a></div><div class="cm-pv-item__contexto">Vazamento no teto da garagem</div><div class="cm-pv-item__prazo"><span class="cm-estado cm-estado--aviso"><i data-i="atencao"></i>Responde em 6 min</span></div></div>
    <div class="cm-pv-item__acoes"><button class="cm-botao cm-botao--p">Passar</button><button class="cm-botao cm-botao--p cm-botao--principal">Abrir</button></div></div>
  <div class="cm-pv__pe"><i data-i="sucesso"></i>4 itens concluídos hoje</div>
</section>
<article class="cm-post cm-post--reconhecimento">
  <header class="cm-post__cabeca"><span class="cm-avatar cm-avatar--m">JR</span><div><div class="cm-post__autor">Juliana Reis</div><div class="cm-post__sub">Gestora do Suporte</div></div><span class="cm-post__quando">há 2 h</span></header>
  <div class="cm-post__tipo"><i data-i="reconhecimento"></i>Reconhecimento para Beatriz Nogueira</div>
  <h3 class="cm-post__titulo">Resolveu com calma o que era urgente</h3>
  <p class="cm-post__corpo">…</p>
  <div class="cm-post__pe"><div class="cm-reacoes"><button class="cm-reacao" aria-pressed="true"><i data-i="curtir"></i>Curtir <span class="cm-reacao__n">12</span></button><button class="cm-reacao"><i data-i="parabens"></i>Parabéns <span class="cm-reacao__n">5</span></button><button class="cm-reacao"><i data-i="amei"></i>Amei</button><button class="cm-reacao"><i data-i="genial"></i>Genial</button><button class="cm-reacao"><i data-i="apoio"></i>Apoio</button></div></div>
  <div class="cm-reacoes__quem">Ana, Bruno e mais 10 curtiram</div>
  <div class="cm-ciencia"><span class="cm-ciencia__texto">24 de 28 confirmaram a leitura</span><button class="cm-botao cm-botao--p cm-botao--principal">Li e estou ciente</button></div>
</article>
```
`.cm-pv-item.is-vencido`, `.is-feito`; `.cm-ciencia.is-confirmada`; publicador `.cm-publicar` + `.cm-publicar__campo`; `.cm-reconhecido` para o bloco da pessoa reconhecida; `.cm-post__fixado`.

### 4.26 Agenda e calendário
```html
<ul class="cm-agenda"><li class="cm-agenda__dia">Hoje, 01/10</li><li class="is-agora"><span class="cm-agenda__hora">10:00<small>30 min</small></span><span class="cm-agenda__barra"></span><span><span class="cm-agenda__titulo">1:1 com Juliana</span><span class="cm-agenda__sub">Sala 2 ou Teams</span></span><button class="cm-botao cm-botao--p">Entrar</button></li></ul>
<table class="cm-calendario"><thead><tr><th>D</th>…</tr></thead><tbody><tr><td class="is-fora"><button>28</button></td><td class="is-hoje is-evento"><button>1</button></td><td><button aria-pressed="true">2</button></td></tr></tbody></table>
<div class="cm-grade-semana">…<div class="cm-grade-semana__cab is-hoje">Qua 01</div>…<span class="cm-grade-semana__evento">Gestão condominial, sala 3</span></div>
```

### 4.27 Kanban
```html
<div class="cm-kanban"><section class="cm-kanban__coluna"><header class="cm-kanban__cabeca"><h3 class="cm-kanban__titulo">Proposta</h3><span class="cm-contador">4</span></header><div class="cm-kanban__soma">R$ 18.400,00 por mês</div>
  <div class="cm-kanban__cartoes"><a class="cm-kanban-cartao is-esfriando" href="#"><span class="cm-kanban-cartao__titulo">Cond. Vila Serena</span><span class="cm-kanban-cartao__sub">R$ 4.380,00 por mês</span><span class="cm-kanban-cartao__pe"><span class="cm-estado cm-estado--aviso"><i data-i="atencao"></i>Esfriando há 12 dias</span><span class="cm-avatar cm-avatar--p">RM</span></span></a></div>
  <button class="cm-kanban__adicionar"><i data-i="adicionar"></i>Adicionar</button></section></div>
```
`.is-arrastando`, `.is-atrasado`, alvo `.cm-kanban__cartoes.is-alvo`. Sempre oferecer "Mover para…" no menu do cartão (teclado).

### 4.28 Progresso, frequência, KPI
```html
<div class="cm-progresso cm-progresso--sucesso"><span class="cm-progresso__barra"><i style="--p:62%"></i></span><span class="cm-progresso__valor">5 de 8 aulas</span></div>
<div class="cm-frequencia is-risco"><span>Frequência</span><span class="cm-frequencia__barra"><i style="--f:71%"></i><span class="cm-frequencia__minimo" style="--min:75%" data-rotulo="mínimo 75%"></span></span><b>71%</b></div>
<div class="cm-kpis"><div class="cm-kpi"><span class="cm-kpi__rotulo">Tempo da 1ª resposta</span><span class="cm-kpi__valor">4 min</span><span class="cm-kpi__variacao is-melhor"><i data-i="baixa"></i>1 min <span>contra setembro</span></span></div></div>
```
**KPI só em relatório e no cabeçalho de painel.** Nunca na Home, nunca em rodapé de tela de trabalho.

### 4.29 Layout de aplicação
`.cm-app` (altura da janela menos a moldura), `.cm-coluna` + `--fila` (356), `--cresce`, `--ficha` (348), com `__cabeca`, `__titulo`, `__corpo`. `.cm-pagina` para páginas que rolam.

### 4.30 Moldura (gerada; não montar à mão)
`.cm-moldura`, `.cm-barra-cima`, `.cm-testeira` (`--gaco`), `.cm-busca-global`, `.cm-ferramentas`, `.cm-ferramenta`, `.cm-barra-menu`, `.cm-favoritos`, `.cm-grupos`, `.cm-grupo`, `.cm-papel`, `.cm-cascata` (+ `__blocos`, `__bloco`, `__telas`, `__tela`), `.cm-painel-topo`, `.cm-aviso-item`, `.cm-conta__*`, `.cm-gaveta*`, `.cm-barra-inferior`, `.cm-portal-topo*`, `.cm-trilha-pagina`, `.cm-faixa-contexto*`, `.cm-rodape-atalhos`.

---

## 5. Ícones

- `<i data-i="boleto"></i>` vira SVG (inclusive em conteúdo inserido depois). Classe extra: `<i data-i="boleto" class="cm-icone--20"></i>`. Ícone com significado próprio (sem texto ao lado): `data-rotulo="Lida"`.
- Tamanhos: `cm-icone--12|14|16|18|20|24|32|48`. Padrão 16.
- Nomes por objeto, em português; lista completa e busca em `01-iconografia.html`. Apelidos: `quadro`→`quadro-kanban`, `contrato`→`documento-editavel`, `entregue`→`marcar`, `os`→`ordem-de-servico`, entre outros (`CM_ICONES_APELIDOS`).
- Módulos: `CM_ICONE_DO_MODULO` (Marketing `megafone`, Comercial `aperto-de-mao`, CS `maos-coracao`, Projetos `quadro-kanban`, Operações `chave-inglesa`, Suporte `fone-atendimento`, Produto `pacote`, Desenvolvimento `codigo`, Financeiro `carteira`, Academy `capelo`, Cultura `pessoas`, Relatórios `grafico-colunas`, Configuração `engrenagem`).
- Faltou um ícone: desenhe na grade 24 com a receita (traço, ponta quadrada, quina, sem preenchimento), inclua no gerador da fundação e avise. Nunca importe outra biblioteca nem use emoji.

---

## 6. Tokens mais usados

| Papel | Token |
|---|---|
| Fundo, camadas | `--cm-fundo`, `--cm-camada-1`, `--cm-camada-2`, `--cm-camada-3` |
| Filetes e bordas | `--cm-filete`, `--cm-filete-forte`, `--cm-borda-controle` |
| Texto | `--cm-texto-1`, `--cm-texto-2`, `--cm-texto-3`, `--cm-texto-desabilitado` |
| Ação (latão) | `--cm-acao`, `--cm-acao-hover`, `--cm-sobre-acao`, `--cm-acao-suave`, `--cm-acao-filete`, `--cm-link`, `--cm-foco` |
| Seleção | `--cm-selecao`, `--cm-selecao-filete`, `--cm-editado` |
| Estado | `--cm-{sucesso,aviso,perigo,info,neutro}-{fundo,borda,texto,ponto}` |
| Conversa | `--cm-conversa-fundo`, `--cm-bolha-entrada(-borda)`, `--cm-bolha-saida(-borda)`, `--cm-nota-fundo/-borda/-texto` |
| Marca | `--cm-marca`, `--cm-marca-sobre`, `--cm-marca-tinta`, `--cm-marca-suave`, `--cm-marca-acao` |
| Densidade | `--cm-controle-p`, `--cm-controle`, `--cm-controle-g`, `--cm-linha-tabela`, `--cm-campo-pad`, `--cm-celula-pad`, `--cm-tipo-base` |
| Tipo | `--cm-tipo-{pagina,registro,secao,subsecao,corpo,corpo-p,rotulo,legenda,dado,plaqueta}` (+ `-lh`) |
| Espaço | `--cm-esp-1` (2px) a `--cm-esp-12` (64px) |
| Forma | `--cm-raio-0/1/2/3/redondo`, `--cm-sombra-flutuante` |
| Camadas | `--cm-z-grudado` 10 … `--cm-z-dica` 110 |
| Movimento | `--cm-mov-rapido` 90ms, `--cm-mov-medio` 180ms, `--cm-mov-lento` 260ms, `--cm-curva-entrada` |

---

## 7. Decisões e justificativas (para o dono)

- **Densidade compacta no interno.** Resolvemos fazer assim porque o Zendesk, o Jira e o Linear abrem compactos para quem trabalha a fila, e o Gmail e o Salesforce deixam a pessoa escolher; os números 36/44/52 são os que o GACO já usa. Enviamos para aprovação.
- **Botão principal interno em latão; marca na testeira.** Resolvemos fazer assim porque o Zendesk, o Freshdesk e o Intercom mantêm a cor do produto no espaço do agente e põem a marca do cliente onde o cliente final vê; a testeira dá ao cliente o lugar do logo que o Slack e o Teams dão ao workspace. Trocar para a marca é uma linha (`--cm-acao: var(--cm-marca-acao)`). Enviamos para aprovação.
- **Laranja de atenção afastado do latão.** Resolvemos fazer assim porque o Carbon e o Atlassian separam "atenção" de "marca" por matiz e exigem ícone; aqui o laranja foi para 22° (latão em 40°), e atenção sempre leva triângulo e palavra. Enviamos para aprovação.
- **Plaqueta rara.** Resolvemos fazer assim porque o crítico mostrou que, em toda linha, ela vira ornamento; Jira e Zendesk destacam a chave do protocolo no cabeçalho do registro e a deixam como texto nas listas. Enviamos para aprovação.
- **Nota interna amarela.** Resolvemos fazer assim porque Zendesk, Intercom e Front ensinaram que nota interna é amarela; com isso a seleção de linha deixou de usar o mesmo tom. Enviamos para aprovação.
- **Ícones Lucide redesenhados.** Resolvemos fazer assim porque Linear e shadcn/ui usam o Lucide e o usuário reconhece a metáfora; o acabamento quadrado é do GACO (aprovado em 25/09). Enviamos para aprovação.
- **Modelo D refinado.** Resolvemos fazer assim porque Odoo e Salesforce usam duas barras no topo, e Linear, Slack e GitHub põem a pesquisa no centro; os grupos do papel seguem os "Spaces" do Zoho One. Enviamos para aprovação.

---

## 8. Verificação antes de entregar uma tela

1. Capturas em 1440 e 390, escuro e claro, sem rolagem horizontal da página.
2. Foco visível em tudo que se clica; alvo de 44px no celular; `aria-label` em botão só de ícone.
3. Nenhum estado só por cor; nenhuma plaqueta fora da regra; nenhum latão em estado; nenhuma cor de cliente fora dos lugares dela.
4. Sem caixa alta, sem "A · B · C", sem "→" em botão, sem emoji na interface, sem fileira de KPIs.
5. Dados realistas do condomínio, em português.
