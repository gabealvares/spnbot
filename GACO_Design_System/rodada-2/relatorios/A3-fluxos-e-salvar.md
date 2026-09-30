# A3 — Confronto das regras de fluxo do GACO: salvar, vai e volta, criar, botões, navegação

Data: 30/09/2026 · Autor: Lead UX B2B (papel de advogado do diabo) · Para: dono do GACO, via coordenação.

## 0. Como ler este documento

- **Base**: `padrao-de-telas.md` (§3 fluxo, §4 auditoria, §7 paginação de 20, §11 Modelo D), `modelos-de-pagina.md` (ModeloBusca, ModeloCadastro `forma="pagina"`, ModeloDetalhe, ModeloAtendimento), `ds-v4-auditoria-e-proposta.md` (§4.5 botões, §4.8 camadas), `menu-modelo-d.md`, o livro consolidado (regra "Mudar estado é ação com confirmação") e a pesquisa do agente A1 (`agentes/A1-pesquisa-fluxos.md`), que tem as URLs oficiais de Fiori, Dynamics, Cloudscape, Primer, Zendesk, Help Scout, HubSpot e Salesforce. Não repito as URLs do A1 onde basta citar "(A1 §x)".
- **Pesquisa própria desta rodada** (buscador, 30/09): HubSpot mudou para menu lateral em 14/05/2024; NN/g sobre navegação vertical; Salesforce Lightning (barra de navegação **no topo** por app); SAP Fiori launchpad (espaços como abas **no topo**); Zendesk Agent Workspace (navegação **à esquerda**); Salesforce Path; Pipedrive (barra de progresso do negócio); HubSpot (criação em painel à direita); monday.com My Work; Linear Inbox; TownSq e Superlógica (apps de condomínio). URLs no fim de cada seção.
- **Marcação de certeza**: **[confirmado]** = li na documentação oficial ou no trecho do buscador vindo da página oficial; **[não confirmado]** = lembro ou é prática comum, mas não conferi nesta sessão. Não afirmo nada sobre sistema sem uma das duas marcas.
- **Como conto cliques**: 1 clique = 1 clique ou toque que decide algo (digitar texto não conta; escolher item em lista conta 1). **Troca de contexto** = a tela inteira muda (nova página/rota) ou um modal cobre o que a pessoa estava vendo. Conto o caminho feliz de quem já sabe usar.
- **Tipo da proposta**: **mantém**, **ajusta** (mesma regra, com exceção ou complemento) ou **substitui**.

### Tese em uma linha

As regras de 23–24/09 foram escritas para **acabar com a bagunça de gavetas** (25 telas usando painel lateral para tudo, 22 listas abrindo detalhe dentro). Elas acertaram o diagnóstico, mas o remédio ficou forte demais: **toda edição virou uma viagem de ida e volta entre três páginas** (lista → detalhe → página de edição → detalhe → lista). Para quem usa o sistema oito horas por dia isso é o maior custo do produto hoje. A proposta é manter a disciplina e **trazer a edição para dentro do detalhe** (edição por seção e por campo), **fazer a lista lembrar onde a pessoa estava**, e **abrir o painel lateral para duas coisas além da auditoria**: prévia e criação rápida.

---

## 1. Opções de salvar

### Regra atual
- Criar/editar com conteúdo = **página própria** (P11, `forma="pagina"`), cabeçalho v4 + formulário + **barra fixa no pé** com Cancelar (ghost) e Salvar (cta) à direita. Depois de salvar, o `aoSalvar` leva normalmente ao detalhe. Sair com alteração pergunta "Descartar alterações?".
- Modal de até ~8 campos para criação rápida.
- Estado nunca é campo de formulário: é ação "Mudar estado" com confirmação em modal.
- Não há autosave, rascunho, "Salvar e novo/próximo", edição inline nem edição por seção.

### Onde machuca (cenários)
1. **Corrigir o telefone do síndico no cadastro do condomínio "Residencial Jardim das Acácias".** Hoje: detalhe do cliente → ✏ (troca de contexto 1: página de edição com 25 campos) → acha o campo → Salvar (troca 2: volta ao detalhe). **3 cliques e 2 trocas de contexto para mudar 1 campo.** Salesforce, HubSpot e Pipedrive fazem isso em 2 cliques sem sair do registro.
2. **A barra fixa no pé está sempre lá**, mesmo quando nada mudou. Um "Salvar" sempre aceso não informa nada: a pessoa não sabe se já salvou. O sinal útil é "**há 3 alterações não salvas**", e ele não existe.
3. **Cadastrar 12 unidades novas de um condomínio**, ou 8 fornecedores de uma planilha. Sem "Salvar e novo", cada um é: + Novo → preencher → Salvar → cai no detalhe → voltar → + Novo. **2 cliques e 2 trocas de contexto extras por registro, 24 cliques jogados fora em 12 unidades.**
4. **Redigir a ata da assembleia ou o comunicado de reajuste da taxa condominial** leva 40 minutos. A sessão expira, a aba fecha, o notebook dorme: perde-se tudo. Sem rascunho, o formulário longo é exatamente o lugar onde "a pessoa desiste no meio" (a própria regra 3 cita esse risco, mas só o resolve tirando o formulário do modal).
5. **Mudar a prioridade de 1 chamado** passa pela página de edição inteira do chamado.

### Alternativas

| # | Alternativa | Tipo | Quem faz | Prós | Contras |
|---|---|---|---|---|---|
| S1 (conservadora) | Mantém a página de edição, mas: a barra do pé **só aparece quando há alteração** e mostra "3 alterações não salvas · Descartar · Salvar"; o botão Salvar vira **botão dividido** "Salvar ▾" com Salvar e voltar para a lista / Salvar e novo / Salvar e próximo, e **lembra a última escolha por usuário** | ajusta | Shopify Polaris Contextual Save Bar (aparece só com alteração) e Elastic EUI Bottom bar (A1 §2.2) [confirmado]; Save & New no modal do Salesforce [confirmado, trecho do buscador]; Save and Next / Save and Back no SAP Fiori elements [confirmado]; Help Scout e Zendesk lembram a próxima ação por usuário (A1 §2.3) [confirmado] | muda um componente só (`ModeloCadastro`) e vale para as 131 telas; zero conceito novo | a viagem lista → detalhe → edição continua existindo |
| S2 (recomendada) | **Edição por seção no próprio detalhe** (lápis no cabeçalho de cada bloco: "Dados do contrato", "Vigência e valores", "Contatos"). O bloco vira formulário ali mesmo, com Cancelar/Salvar do bloco; o resto da página continua em leitura. **Campo isolado e de efeito simples** (responsável, prioridade, etiqueta, data de retorno) edita **por campo** (clique → muda → salva ao confirmar). A página de edição inteira fica **só para criar** e para objetos cujo formulário é um documento (template, ata, editor de conteúdo) | substitui a P11 na edição; mantém na criação | SAP Fiori "partial edit in place", o preferido do Fiori para partes do objeto [confirmado, busca, A1 §2.4]; AWS Cloudscape "Edit" por contêiner [confirmado]; HubSpot edita propriedade na coluna da esquerda do registro [confirmado]; Salesforce lápis por campo no registro [confirmado]; Jira edição inline por campo [confirmado, Atlassian Design System] | fim da troca de contexto para 80% das edições; o que se lê é o que se edita (sem "dois desenhos" do mesmo registro); a auditoria fica ao lado do dado | mais trabalho no `ModeloDetalhe` (cada seção declara seus campos); validação entre campos de seções diferentes pede cuidado; dois jeitos de editar (seção e campo) precisam de regra clara |
| S3 (ousada) | **Autosave com rascunho** em tudo que é documento (ata, comunicado, template, conteúdo, proposta comercial, contrato em minuta): salva o rascunho a cada ~20 s com "Rascunho salvo às 14:32"; o registro oficial só muda no "Publicar/Salvar". "Meus rascunhos" aparece na lista e na Minha fila (§8) | acrescenta | SAP Fiori draft handling: rascunho a cada 20 s, objeto ativo só muda no Salvar [confirmado, A1]; Dynamics 365 autosave de 30 s em registro existente, com "Unsaved changes" no canto [confirmado, A1]; Google Docs e Notion salvam sozinhos [não confirmado aqui, conhecimento comum] | nada se perde; conversa bem com o dono ("sólido, seguro") | exige backend (tabela de rascunho, dono do rascunho, expiração, bloqueio de edição concorrente); **não** serve para dado com efeito imediato (valor de boleto, baixa, estado) |

**O que não recomendo:** autosave puro em registro transacional (financeiro, contrato vigente, estado). Grava estado intermediário, dispara integração e notificação antes da hora e embaralha a auditoria (cada 30 s vira uma linha "Ana alterou"). O Dynamics faz isso e é justamente o ponto mais criticado por administradores de CRM [não confirmado: impressão de mercado, sem fonte nesta sessão].

### Indicador de alteração não salva e saída "suja"
Recomendação única, para todo formulário (página, seção ou modal):
1. **Sinal no lugar do trabalho**: a seção em edição ganha borda na cor de foco e o texto "Alterações não salvas" ao lado do Salvar; na página, a barra do pé aparece com a contagem. Título da aba do navegador ganha "• " na frente (sinal que VS Code e editores usam para arquivo sujo [não confirmado para web B2B específico]).
2. **Sair sujo por navegação interna** (menu, trilha, anterior/próximo, ⌘K): modal com **três** saídas nomeadas, nesta ordem: "Continuar editando" · "Descartar e sair" · **"Salvar e sair"** (primário). GitLab Pajamas faz Save changes / Discard changes and leave page (A1 §2.1) [confirmado].
3. **Fechar a aba ou recarregar**: o aviso nativo do navegador (`beforeunload`); não há como personalizar o texto, e isso é aceitável.
4. **Nunca perguntar se nada mudou** (Cloudscape "unsaved changes" [confirmado, A1 §2.4]). Comparar com o valor original, não "tocou no campo".
5. **Rede de segurança local** para formulário longo: guardar o que foi digitado no navegador do próprio usuário e oferecer "Recuperar o que você digitou às 14:32?" ao voltar. É conveniência pessoal; não substitui o rascunho do S3.

### Recomendação
**S2 + S1 agora; S3 só para objetos-documento.** Texto para o dono: *"Resolvemos editar no próprio detalhe, bloco por bloco, porque SAP Fiori (partial edit in place), HubSpot (propriedades na coluna do registro) e Salesforce (lápis por campo) fazem assim; a barra de salvar aparece só quando há alteração, como no Shopify Polaris e no Elastic; e o Salvar lembra a próxima ação, como no Zendesk e no Help Scout. Enviamos para aprovação."*

Regra objetiva proposta para acabar com o caso a caso:

| Situação | Onde edita |
|---|---|
| 1 campo simples, sem regra entre campos (responsável, prioridade, data de retorno, etiqueta) | **por campo**, no detalhe e na célula da tabela quando fizer sentido |
| Um grupo coerente de campos (endereço, vigência e valores, dados bancários) | **por seção**, no detalhe |
| Estado/etapa | **ação** ("Mudar estado"/barra de etapas, §4), nunca campo — **mantém** a regra de 26/09 |
| Criação com mais de ~8 campos, ou documento (ata, template, conteúdo) | **página própria** com barra que aparece suja — **mantém** P11 aqui |

---

## 2. O vai e volta

### Regra atual
- "**Lista só lista**": clique na linha → página de detalhe. Nada de detalhe ao lado, expandido ou dentro.
- Filtro e página vivem na query string (bom). Trilha leva ao **módulo** (`menu-modelo-d.md` §4). ⌘K "Pesquisar página" com Recentes por navegador (bom).
- Depois de salvar na página de edição, `window.location.assign` para o detalhe (recarga completa).
- Não há anterior/próximo no detalhe, nem abas de registros, nem visão dividida — **com uma exceção que o próprio GACO já abriu**: o `ModeloAtendimento` (fila à esquerda, conversa, ficha à direita) é exatamente um "lista + detalhe ao lado". Ou seja, a regra já foi quebrada, com razão, no lugar em que o trabalho é mais intenso.

### Onde machuca
**Cenário: Carla, analista de contratos, revisa reajustes de IGP-M.** Filtro "Contratos › vence em outubro › Reajuste pendente": 63 contratos, 4 páginas de 20. Ela está na página 3, linha 14.
- Clica no contrato (troca 1) → ✏ (troca 2) → altera o índice → Salvar (troca 3, recarga completa para o detalhe).
- Para voltar: a trilha leva ao **módulo**, não à lista filtrada. O "voltar" do navegador precisa de **3 cliques** (detalhe ← edição ← detalhe ← lista) e, pela recarga do `location.assign`, o scroll volta ao topo. Se ela usa a trilha: refaz 2 filtros + vai à página 3 + rola.
- **Por contrato: 6 a 9 cliques e 4 trocas de contexto. Nos 63: ~400–550 cliques.** E ela perde a noção de "quantos faltam".

### Alternativas

| # | Alternativa | Tipo | Quem faz | Prós | Contras |
|---|---|---|---|---|---|
| V1 (conservadora, obrigatória) | **A lista é restaurada exatamente**: filtros, ordenação, página **e scroll**, com a linha visitada destacada. O detalhe mostra "‹ Contratos · 14 de 63 ›" no topo, com anterior/próximo (e J/K no teclado). O conjunto é a lista filtrada de onde a pessoa veio (vai na URL ou na sessão). A trilha, quando a pessoa veio de uma lista filtrada, volta **para a lista filtrada**, não para o módulo | ajusta | Jira Issue Navigator com posição e setas [confirmado, A1 §3]; Dynamics 365 record set navigation, "voltar sem perder o lugar" [confirmado, A1]; Zendesk "Next ticket in view" [confirmado]; Help Scout J/K [confirmado]; NN/g "User control and freedom" e breadcrumbs = hierarquia, não histórico [confirmado, A1] | resolve 70% da dor sem mexer na regra "lista só lista"; barato | não ajuda quem quer **comparar** duas coisas ao mesmo tempo |
| V2 (recomendada para filas) | **Visão dividida opcional** nas listas de trabalho (filas): um alternador "Tabela / Dividida" (a mesma lista estreita à esquerda e o detalhe completo à direita, **com URL própria do registro**, abre em nova aba com Ctrl+clique). Só para listas declaradas como fila: chamados, solicitações de aprovação, leituras, lançamentos a conferir, leads a qualificar, candidatos | ajusta a regra 5 ("lista só lista, **exceto filas de trabalho, com URL por registro**") | Salesforce Split View [confirmado, A1]; PatternFly Primary-detail [confirmado]; SAP Fiori Flexible Column Layout [confirmado]; Intercom alterna Chat/Tabela com a tecla L [confirmado, A1]; Gmail e Outlook com painel de leitura [não confirmado aqui, conhecimento comum]; **o próprio GACO no ModeloAtendimento** | triagem e conferência sem trocar de tela; mantém tudo que a regra queria proteger (endereço, link, voltar) porque cada registro continua com URL | aperta em notebook 13" (1280px): a regra precisa de largura mínima (abaixo de ~1200px vira tabela + página); dois layouts para manter |
| V3 (ousada) | **Abas de registros abertos** no topo da área de trabalho (estilo console): até ~8 registros abertos, fixar, fechar todas | acrescenta | Salesforce Console (abas e subabas, fixar, Shift+W) [confirmado, A1]; ServiceNow Workspace [confirmado]; Dynamics Customer Service workspace, até 9 sessões [confirmado] | multitarefa real para o atendente que fala com 5 síndicos ao mesmo tempo | é um segundo sistema de janelas dentro do navegador, que já tem abas; carga cognitiva alta; custo alto. **Para o GACO: não.** O navegador já dá isso de graça se todo registro for link real (`<a href>`) |

**Outros itens do vai e volta:**
- **Abrir em nova aba**: obrigatório. Toda linha e todo nome de registro é `<a href>` real, para Ctrl+clique e botão do meio funcionarem. (Linha clicável feita com `onClick` quebra isso.) [prática comum; Salesforce, HubSpot e Fiori têm URL por registro, A1 §3]
- **Trilha**: mantém, mas com dois papéis claros: hierarquia (`CS › Clientes › Residencial Jardim das Acácias`) e, quando se veio de lista filtrada, o primeiro elo leva à lista filtrada.
- **Recentes e ⌘K**: mantém e amplia. ⌘K passa a executar **ações** ("Novo chamado", "Aprovar férias", "Ir para contrato 2026-0412") — Linear mostra o atalho de cada ação no ⌘K e assim ensina o teclado [confirmado, A1].
- **Depois de salvar**: parar de usar `location.assign` (recarga) para voltar; navegação de aplicação preserva cache e scroll.

### Recomendação
**V1 em todo o sistema já; V2 nas filas de trabalho; V3 não.** Para o dono: *"A lista lembra onde você estava e o registro tem anterior/próximo, como no Jira, no Dynamics 365 e no Zendesk. Nas filas de trabalho, a lista pode ficar ao lado do registro, como no Salesforce Split View, no Fiori e no nosso próprio Atendimento. Cada registro continua com endereço próprio. Enviamos para aprovação."*

---

## 3. Onde criar

### Regra atual
Modal (560) até ~8 campos; página própria acima disso ou com link; **painel lateral (480) só para auditoria**; "na dúvida, página própria" (dono, 24/09). Criar a partir de um campo de busca (lookup) não existe como padrão.

### Onde machuca
- **Cenário: abrindo uma ordem de manutenção**, a pessoa descobre que o fornecedor "Elevadores Atlas — filial Campinas" não está cadastrado. Hoje: abandona o formulário (ou abre outra aba), vai a Operações › Fornecedores (3 cliques de menu), + Novo, preenche, salva, volta à ordem, recarrega o combo, seleciona. **~8 cliques, 3 trocas de contexto, e o risco de perder a ordem já preenchida.**
- **Cenário: morador novo** na unidade 304 durante um atendimento: mesmo problema.
- O modal de 560 **cobre a lista**: quem cria "Reunião com síndico" a partir da lista de clientes não consegue consultar a linha de trás enquanto digita.

### Confronto honesto com "painel lateral só para auditoria"
**O que a regra ganhou:** acabou o depósito (formulário, detalhe e histórico no mesmo lugar, com 8 larguras à mão). A auditoria ganhou um lugar fixo e reconhecível. Isso é real e não deve ser perdido.
**O que a regra perdeu:** o único componente que **não tira a pessoa do contexto**. O modal bloqueia a tela; a página troca a tela. O painel é o meio-termo que CRMs maduros escolheram justamente para criar e consultar sem sair: HubSpot abre "Create contact" num **painel à direita** e é ali também que se cria e associa registros relacionados [confirmado, knowledge.hubspot.com]; Dynamics 365 tem o **quick create** que abre de qualquer lugar, inclusive do lookup, só com os campos essenciais [confirmado, A1 §4]. A própria v4 §4.8 previa "gaveta de formulário de 480 para 8 a ~20 campos, ou quando a lista precisa ficar visível", e isso foi suspenso, não refutado.
**Onde a regra estava certa:** formulário longo em painel é ruim (rolagem num corredor de 480px); detalhe completo em painel também. Isso continua proibido.

### Alternativas

| # | Alternativa | Tipo | Quem faz | Prós | Contras |
|---|---|---|---|---|---|
| C1 (conservadora) | Mantém modal ≤8 / página >8, e acrescenta **"+ Criar novo" dentro de todo lookup**, que abre o modal de criação curta daquele objeto **sem fechar o formulário de origem** (é modal sobre página, não modal sobre modal) e devolve o registro já selecionado | ajusta | Dynamics quick create a partir do lookup [confirmado]; HubSpot "Associate new" no painel de associações [confirmado] | resolve o caso do fornecedor sem mudar nenhuma regra de caixa | se a origem já for um modal, vira modal dentro de modal (proibido pela regra 7): nesses casos a origem precisa ser página |
| C2 (recomendada) | **Painel lateral com três usos nomeados, e só três**: (a) **Histórico** (auditoria, como hoje); (b) **Criação rápida** (≤ ~10 campos essenciais, com "Abrir formulário completo" que leva à página levando o que já foi digitado); (c) **Prévia** (ler um registro relacionado sem sair: o contrato citado no chamado, o morador da unidade). Formulário longo e detalhe completo continuam **proibidos** no painel. Um componente, uma largura (480), um cabeçalho que diz qual dos três é | substitui a regra 4 ("painel só auditoria") por "painel só para **contexto**: histórico, criação rápida, prévia" | HubSpot (criar e prévia de associados no painel direito) [confirmado]; Dynamics quick create [confirmado]; PatternFly primary-detail em drawer [confirmado]; Carbon side panel [confirmado, A1] | a pessoa nunca perde a tela em que estava; a regra continua curta e verificável por teste (3 tipos declarados) | o risco de voltar a virar depósito existe: a guarda precisa ser em código (o painel só aceita `tipo: 'historico' | 'criacao-rapida' | 'previa'`) |
| C3 (ousada) | **Criação inline** na própria tabela para objetos-linha: itens de rateio, leituras de hidrômetro, itens de contrato, parcelas, tarefas de projeto. Linha vazia no fim ("+ Adicionar linha"), Tab entre células, Enter salva a linha | acrescenta | Salesforce datatable com edição inline [confirmado]; Airtable e planilhas [não confirmado aqui]; Linear cria item na lista com C [confirmado, A1] | a forma mais rápida para lançar 40 leituras | só para objetos simples, sem validação cruzada; precisa de teclado impecável |

Regra de tamanho, para trocar o "~8 campos" por algo que se mede: Cloudscape usa **modal para 1 campo, página para 2 a 15 campos, etapas acima de 15** [confirmado, A1 §4]. Proponho a versão GACO: **criação rápida (modal ou painel) = só campos obrigatórios e até ~10; página = o formulário completo; etapas = acima de ~20 campos ou quando há passos com dependência** (a v4 §4.7 já previa "formulário longo com etapas"). O formulário de criação rápida é **configurável pelo cliente** (HubSpot deixa o admin escolher os campos do painel de criação [confirmado]), o que casa com o "tudo parametrizável" do GACO.

### Recomendação
**C2 + C1; C3 só para objetos-linha declarados.** Para o dono: *"Criamos sem tirar a pessoa da tela, num painel à direita, como HubSpot e Dynamics 365 fazem; o painel tem só três usos (histórico, criação rápida, prévia) e formulário longo continua indo para página. Enviamos para aprovação."*

---

## 4. Localização e ordem dos botões

### Regra atual
1 ação principal por tela, **à direita do título**; até 2 secundárias; resto no "⋯". No cabeçalho do detalhe: no máximo 3 visíveis, **histórico 30×30 primeiro** e "Mudar estado" fora do "⋯" como primeira ação visível nos objetos com máquina de estados; destrutivo por último no "⋯", em vermelho. Mudar estado = modal com destinos válidos + motivo. Ações da linha no hover (configurável). Barra fixa no pé com Cancelar e Salvar à direita.

### Onde machuca
- **O estado é a informação mais importante do registro e hoje é um chip + um botão que abre modal.** Para ver "em que etapa está a implantação do Condomínio Vila Serena e quanto falta", a pessoa lê um chip; para avançar, 3 cliques (Mudar estado → escolher → confirmar) e um modal que cobre a tela. Nenhuma visão do caminho inteiro (o que já passou, o que falta, quanto tempo em cada etapa).
- **Histórico 30×30 como primeira ação** coloca a ação mais rara (consultar auditoria) no lugar mais nobre, à frente da ação mais frequente. Concordo que auditoria escondida no "⋯" não é consultada (§4); discordo que ela precise vir **antes**.
- **Ações só no hover** não existem no toque (tablet do zelador, notebook com tela touch) e são invisíveis para quem ainda não sabe que existem; também somem para quem navega por teclado se o foco não as revelar.

### Localização proposta, por tipo de ação

| Ação | Onde fica | Por quê / quem faz |
|---|---|---|
| **Criar** (na lista) | Principal, à direita do título da lista. **Mantém** | Convenção de Salesforce, HubSpot ("Create contact" no canto superior direito [confirmado]), Polaris |
| **Criar relacionado** (contato no cliente, tarefa no projeto) | No cabeçalho da **seção** relacionada ("Contatos · + Adicionar"), abrindo criação rápida (§3) | HubSpot, cartões de associação na coluna direita [confirmado] |
| **Salvar** (criação em página) | Barra do pé, **à direita**, aparecendo só quando sujo; Cancelar à esquerda dela; destrutivo na ponta esquerda | Fiori footer toolbar à direita; Polaris page actions (primário à direita, destrutivo à esquerda) [confirmado, A1 §5]. **Mantém a posição, ajusta o comportamento** |
| **Salvar** (edição por seção) | No rodapé da **própria seção**, à direita | Fiori partial edit; Cloudscape edit por contêiner [confirmado] |
| **Mudar estado / etapa** | **Barra de etapas** no topo do detalhe, logo abaixo do título (ver abaixo), com o botão "Avançar para ‹próxima›" à direita dela. Motivo pedido só quando a transição exige (recusar, cancelar, perder) | Salesforce Path [confirmado]; Pipedrive barra de progresso com dias por etapa [confirmado]; HubSpot pipeline no registro [não confirmado nesta sessão] |
| **Atribuir** (responsável) | Campo editável por clique no cabeçalho do detalhe (avatar + nome), e na linha da tabela; atalho A | Linear (A atribui) [confirmado, A1 §10]; Zendesk propriedades à esquerda do ticket [confirmado] |
| **Comentar / nota interna / @menção** | Aba ou coluna "Atividade" do detalhe, com a caixa de comentário **sempre aberta no topo** da linha do tempo; nota interna visualmente distinta de mensagem ao cliente | HubSpot timeline na coluna central [confirmado]; Front comentários internos na conversa [confirmado]; Zendesk nota interna [confirmado] |
| **Histórico (auditoria)** | Ícone fixo no **canto direito** do cabeçalho, **último** do grupo de ações (não primeiro), sempre visível. **Ajusta** a ordem, mantém a presença | Mantém a decisão do dono de não esconder; muda só a precedência |
| **Excluir / arquivar** | "⋯", por último, em vermelho. **Mantém** | v4 §4.8; Polaris; Fiori |
| **Exportar** | Barra da tabela (junto de filtros e visão), não no cabeçalho da página; exporta **o filtro atual**, dizendo quantos ("Exportar 63 contratos") | Carbon toolbar de tabela [confirmado, A1]; ServiceNow list [não confirmado] |
| **Imprimir / gerar PDF** | "⋯" do detalhe, exceto em objetos cuja impressão é o produto (boleto, recibo, ata, contrato): aí vira secundária visível ("Baixar PDF") | prática comum [não confirmado] |
| **Ações da linha** | As 1–2 mais frequentes **sempre visíveis em ícone discreto** na última coluna; o resto no "⋯" da linha; hover só **realça**. No toque, sempre visíveis | Polaris revela no hover [confirmado]; Fiori coluna de ação inline [confirmado]. Escolho o lado Fiori por causa de toque e teclado |
| **Ações em massa** | Barra que **substitui** a barra de filtros quando há seleção: "3 selecionados · Aprovar · Atribuir · ⋯ · Limpar" | Carbon batch actions [confirmado, A1 §5] |

**Ordem no cabeçalho do detalhe (da esquerda para a direita, alinhado à direita):** secundária(s) → principal → "⋯" → Histórico. Proposta: `[Enviar ao síndico] [Avançar para Assinatura ▸] [⋯] [🕘]` (o ícone de relógio aqui é só ilustração; no GACO é o ícone do kit).

### Barra de etapas (Path) — deveria existir?
**Sim, para todo objeto com máquina de estados linear ou quase linear**: oportunidade, implantação, contrato (minuta → revisão → assinatura → vigente → encerrado), processo seletivo, demanda de produto, chamado. Não para objetos com estado binário (ativo/inativo).

Como funciona, proposta:
1. Faixa horizontal abaixo do título com as etapas; passadas marcadas, atual destacada, futuras neutras; **dias na etapa atual** ("há 6 dias em Revisão jurídica").
2. **Clique numa etapa** mostra, em popover ancorado, o que ela pede ("campos obrigatórios para entrar em Assinatura: data de início, valor mensal") e o botão "Mover para Assinatura". O Salesforce Path faz exatamente isso: clicar numa etapa e "Mark Current Status"; ou "Mark Status as Complete" para avançar [confirmado]; e o admin pode esconder o botão quando a etapa só avança por fluxo [confirmado].
3. Transição que exige motivo (Perdido, Cancelado, Recusado) abre o **modal** atual com motivo (mantém a regra de 26/09 para esses casos).
4. Estados finais de saída ("Perdido", "Cancelado") ficam **fora** da faixa, num botão à direita dela, para a faixa mostrar só o caminho feliz.
5. Consistência com o GACO: a regra "estado é ação, nunca select" **se mantém**; a barra de etapas é a ação, só que visível. O princípio "um objeto, uma máquina" (27/09) deixa isso possível: uma faixa por objeto.

### Recomendação
Para o dono: *"O estado do registro vira uma barra de etapas clicável no topo, como Salesforce Path e Pipedrive; o histórico continua sempre visível no canto direito, mas depois da ação principal; ações da linha mais usadas ficam visíveis, como no Fiori, porque no toque não existe hover. Enviamos para aprovação."*

---

## 5. Confirmação vs desfazer vs lixeira

### Regra atual
Ação destrutiva → confirmação em modal (560; a v4 dizia 420) dizendo o que se perde, com botão verbo + objeto. A v4 §4.5 já dizia "Toast: 'Desfazer' em ação reversível" e §4.8 "Reversível não confirma: Desfazer" — **mas não encontrei na documentação lixeira nem exclusão lógica com restauração** (busquei "lixeira", "soft delete", "excluíd" no livro consolidado: nada).

### Onde machuca
- **Confirmação em tudo gera cegueira**: depois da vigésima vez, "Excluir comunicado?" é clicado sem ler. NN/g: confirmação só funciona se for rara [confirmado, A1 §6].
- **O erro real não é clicar sem querer, é perceber depois**: a assistente exclui o "Contrato de portaria 2025" achando que era o rascunho duplicado; dois dias depois o síndico pergunta pelo aditivo. Sem lixeira, a única saída é pedir restauração de dump ao suporte da plataforma. Confirmação não protege contra isso; restauração protege.

### Alternativas

| # | Alternativa | Tipo | Quem faz |
|---|---|---|---|
| D1 (conservadora) | Mantém a confirmação só para irreversível; para o reversível (arquivar, remover etiqueta, tirar da fila, desvincular) executa na hora com toast "Desfazer" por 5–8 s | ajusta (formaliza o que a v4 já dizia) | Gmail desfazer envio; Material snackbar [confirmado, A1]; Cloudscape one-click delete + undo [confirmado] |
| D2 (recomendada) | **Três níveis + lixeira de 30 dias**: (1) leve e reversível → executa + Desfazer; (2) registro de negócio (cliente, contrato, chamado, lançamento não conciliado) → **vai para a Lixeira**, sem modal, com toast "Contrato movido para a Lixeira · Desfazer"; restaurável por 30 dias com "quem excluiu e quando"; (3) irreversível ou em cascata (cancelar remessa bancária, fechar mês, apagar condomínio com unidades, exclusão LGPD) → modal com consequência **e digitação do nome** | substitui a regra 6 | Cloudscape 3 níveis [confirmado]; Salesforce Recycle Bin 15 dias [confirmado, A1]; HubSpot 90 dias com quem excluiu, e exclusão LGPD fora da lixeira [confirmado, A1] |
| D3 (ousada) | Nada se exclui, só se **arquiva**; exclusão real só pelo admin, na Lixeira | substitui | comum em ERPs contábeis [não confirmado] |

### Recomendação
**D2.** Lixeira por cliente (tenant), acessível em Configuração e pelo ⌘K, com filtro por tipo e por quem excluiu; exclusão LGPD com rito próprio e fora da lixeira; auditoria registra excluir e restaurar. Para o dono: *"Excluir manda para uma lixeira de 30 dias com desfazer imediato, como Salesforce (15 dias) e HubSpot (90 dias); confirmação digitada só para o irreversível, como na AWS. Enviamos para aprovação."*

---

## 6. Paginação e seleção em massa

### Regra atual
Lista paginada de **20**, total do servidor, seletor 10/20/50/100. Ordenação e filtro sem rota ordenam/filtram **só a página carregada** (limite conhecido, `modelos-de-pagina.md` §5).

### Onde machuca
- 20 é pouco para trabalho de mesa: uma administradora média com 80 condomínios vê a carteira em 4 páginas; o inadimplente de um condomínio com 240 unidades, em 12.
- **O defeito mais grave não é o tamanho, é a ordenação e a busca por página**: "ordenar por vencimento" mostra a ordem **dentro** da página 1. A pessoa acha que viu os mais urgentes e não viu. Isso é um erro de confiança, não de conforto.

### Alternativas

| # | Alternativa | Quem faz | Para quê |
|---|---|---|---|
| P1 (conservadora, recomendada para tabelas de trabalho) | **Paginação**, padrão **50**, escolha do usuário lembrada por tela (25/50/100), "1–50 de 1.240"; ordenação e filtro **sempre no servidor** (se a rota não aceita, a coluna não ordena) | NN/g e A1 §7 (paginação boa para achar e voltar; anterior/próximo precisa de conjunto definido) [confirmado]; ServiceNow, PatternFly, Carbon [confirmado, A1] | listas de trabalho, relatórios, cobranças |
| P2 | **"Carregar mais"** | Baymard: melhor desempenho em e-commerce, mais itens vistos [confirmado via Smashing, A1] | linha do tempo, histórico, conversa, feed da Home, notificações |
| P3 | **Rolagem infinita** | NN/g: ruim para achar um item específico e voltar a ele [confirmado] | só feed social da Home |
| P4 (ousada) | **Virtualização** (renderiza só o que está visível, com barra de rolagem da lista inteira até alguns milhares de linhas) | planilhas, Airtable [não confirmado] | conferência de leituras e itens de rateio (objetos-linha, §3 C3) |

**Seleção em massa**: selecionar tudo pega **a página**; logo acima aparece "Os 50 desta página estão selecionados. **Selecionar todos os 1.240 que atendem ao filtro**" — convenção do Gmail [não confirmado nesta sessão, conhecimento comum]; PatternFly documenta que "selecionar tudo" pega só a página atual [confirmado, A1]. A barra de massa diz a contagem e, para ações de efeito (enviar cobrança a 1.240), pede confirmação com o número.

### Recomendação
**P1 (50, no servidor) + P2 em linhas do tempo; P3 só no feed; P4 só em objetos-linha.** Para o dono: *"Paginação de 50 com total e ordenação no servidor, porque NN/g mostra que paginação é o melhor para achar e voltar a um item, e ServiceNow, Carbon e PatternFly fazem assim; 'carregar mais' em históricos, como recomenda a Baymard. Enviamos para aprovação."*

---

## 7. Navegação global

### Regra atual (Modelo D, aprovada em 24/09)
Duas barras no topo (48 + 42px): marca · prédio · sino · engrenagem · avatar; abaixo, **os 11 grupos sempre visíveis**, cascata de até 2 níveis (grupo › bloco › tela), abre por clique ou 200 ms; sem "Mais"; na largura apertada degrada até virar hambúrguer (~900px). Referência trazida pelo dono: Ahreas, sistema que o público de administradoras já usa. A v4 (D1) também já tinha descartado o menu lateral.

### Os dados, sem torcida
**Correção de premissa:** a pergunta lista Salesforce e SAP entre os que usam menu lateral. **Não é o que encontrei.**
| Sistema | Navegação principal | Certeza |
|---|---|---|
| Salesforce Lightning | **Barra horizontal no topo por app**, personalizável pelo usuário (reordenar, renomear, adicionar), com App Launcher para trocar de app | [confirmado, help.salesforce.com] |
| SAP Fiori launchpad (espaços e páginas) | Espaços como **abas na barra do topo**, uma por papel | [confirmado, sap.com / help.sap.com] |
| Odoo | Seletor de apps + menu do app. A busca devolveu que a v17 teria trocado o menu horizontal por vertical, mas isso contradiz o que conheço do Odoo (menu do app no topo) | **[não confirmado — não usar como argumento]** |
| HubSpot | **Mudou do topo para barra lateral esquerda recolhível em 14/05/2024**, sem opção de voltar; houve pedidos públicos na comunidade para voltar ao topo | [confirmado, knowledge.hubspot.com e community.hubspot.com] |
| Zendesk Agent Workspace | **Barra lateral esquerda** de ícones, com segundo nível que se mostra/esconde | [confirmado, support.zendesk.com] |
| Linear, Notion, Slack | Barra lateral esquerda | [não confirmado nesta sessão; é o que se vê ao usar] |
| Ahreas | Não conferi | [não confirmado] |

**NN/g** ("Left-Side Vertical Navigation on Desktop", [confirmado, trecho do buscador]): navegação vertical **escala melhor** quando a arquitetura é larga ou cresce; a horizontal força fonte menor, espaçamento apertado e rótulos artificialmente curtos até não caber; na vertical o olho percorre ~6 itens em 3 fixações contra ~3 na horizontal; a horizontal economiza espaço vertical para o conteúdo.

**Leitura de advogado do diabo:**
1. **O mercado está dividido, e não entre "antigo e moderno"**: os dois maiores ERPs/CRMs de dados densos (Salesforce, SAP) usam topo; os de atendimento e colaboração (Zendesk, HubSpot desde 2024, Linear) usam lateral. O Modelo D **não é estranho**; ele é o signo de ERP. Isso favorece o dono.
2. **O que pesa contra o D é a conta, não o gosto**: 11 grupos (e crescendo: Academy saiu de Cultura, Dev entrou em Produto) numa barra horizontal é exatamente o cenário que a NN/g descreve: rótulos encurtados e degradação. O próprio spec já precisa de três degraus de degradação e cai no hambúrguer a ~900px. Nenhum dos sistemas que usam topo mostra **todos os módulos** na barra: o Salesforce mostra **os itens de um app** e troca de app pelo App Launcher; o Fiori mostra **os espaços do papel** do usuário.
3. **Chegar a uma tela no D custa 3 cliques** (grupo → bloco → tela) para quem não usa ⌘K. Numa lateral com favoritos, 1.
4. **White label**: a marca do cliente disputa a barra de 48px com os ícones; numa lateral, o logo do cliente tem lugar próprio no topo da coluna.
5. **Largura para tabela** é o argumento honesto a favor do topo: uma lateral aberta come ~240px; recolhida, ~56px.

### Alternativas

| # | Alternativa | Tipo | Quem faz |
|---|---|---|---|
| N1 (conservadora) | **Mantém o Modelo D** e corrige três coisas: (a) o usuário **fixa favoritos** (até ~8 telas) numa faixa no início da barra de baixo; (b) a barra de baixo mostra só os grupos **que o papel do usuário usa** (a analista de CS não vê Desenvolvimento; ela acha pelo ⌘K se precisar); (c) ⌘K vira ação e não só página | ajusta | Salesforce: barra personalizável pelo usuário [confirmado]; Fiori: espaços por papel [confirmado] |
| N2 (recomendada para testar) | **Híbrido "Modelo D invertido"**: **trilho lateral estreito (56px, recolhível, ícone + rótulo curto) com os módulos**; no topo, **uma barra só com as telas do módulo atual** (o mesmo desenho da barra de baixo do D, mas com o conteúdo de um grupo). Marca do cliente no alto do trilho. É o arranjo do Salesforce (app launcher + barra do app) e do Zendesk (ícones à esquerda + segundo nível) | substitui o D | Salesforce (barra do app no topo) [confirmado]; Zendesk (ícones à esquerda) [confirmado]; HubSpot 2024 (lateral recolhível) [confirmado] |
| N3 (ousada) | Lateral completa recolhível com grupos e telas em árvore | substitui | HubSpot, Linear, Notion |

### Recomendação
**Não trocar sem medir.** O dono escolheu o D entre quatro variantes em 24/09, e o argumento "é o que o público de administradoras conhece" é legítimo. Proposta: **N1 já** (é barato e só melhora) e **um teste de 30 minutos com 5 operadores** comparando D (com N1) e N2 em 6 tarefas de achar tela (ex.: "abra as férias pendentes da sua equipe", "abra a conciliação de setembro"), medindo tempo e erros. Se N2 ganhar com folga, troca-se; se empatar, fica o D. Para o dono: *"Mantemos os módulos no topo, como Salesforce e SAP, mas cada pessoa vê só os módulos do seu papel e fixa favoritos, como o Salesforce permite; e testamos com 5 usuários um trilho lateral como o do Zendesk e do HubSpot (que mudou para a lateral em 2024) antes de decidir. Enviamos para aprovação."*

---

## 8. Notificações, menções e "o que precisa de mim"

### Regra atual
Sino único (notificações e alertas em abas, desde 19/09). Tela Notificações (ModeloBusca com `linha`). Na Home, "O que precisa de você" vive dentro do card da pessoa (aprovado 24/09). Não há uma fila pessoal navegável com ação.

### Onde machuca
- O sino mistura **aviso** ("Ana comentou") com **trabalho** ("aprovar 3 férias", "responder chamado vencendo SLA"). A v4 já registrava o sino com "833 / 99+": contador que ninguém zera vira ruído.
- "O que precisa de você" na Home é bom como resumo, mas **cada item leva a uma página diferente**: aprovar férias está em Cultura, responder menção está no contrato, SLA estourando está no Suporte. A pessoa atravessa 3 módulos para fazer 3 coisas.

### Alternativas

| # | Alternativa | Quem faz |
|---|---|---|
| I1 (conservadora) | Separar: **sino = notificações** (informativo, com "marcar todas como lidas") e **"Para mim" = trabalho** (contagem vermelha só do que exige ação, regra da v4 para contador) | Linear separa Inbox (notificações por atribuição e menção) de My Issues [confirmado, linear.app/docs] |
| I2 (recomendada) | **"Minha fila"**: uma página (e a entrada da Home) com abas **Aprovações · Menções · Atribuídos a mim · Prazos (atrasado, hoje, esta semana) · Rascunhos**. Cada item traz o contexto mínimo e **a ação ali mesmo**: Aprovar/Recusar férias com saldo de dias e quem mais da equipe estará fora; responder menção na própria linha; "Abrir" em visão dividida para o resto. J/K anda, E abre. Mesmo conteúdo que alimenta "O que precisa de você" na Home | monday.com My Work: itens de todos os quadros atribuídos à pessoa, agrupados em Datas passadas, Hoje, Esta semana, Próxima semana, Depois, com "esconder concluídos" [confirmado, support.monday.com]; Linear Inbox com G então I e J/K [confirmado]; Asana My Tasks/Inbox [não confirmado nesta sessão] |
| I3 (ousada) | Resumo diário por e-mail/WhatsApp interno às 8h com a fila do dia e botões de ação | [não confirmado como padrão de mercado] |

### Recomendação
**I2, com I1 como regra de contador.** Menção: `@nome` em comentário de qualquer registro gera item em Menções e notificação; nota interna nunca vai ao portal. Para o dono: *"Tudo que precisa da pessoa fica numa fila única com a ação no próprio item, como o My Work do monday.com e o Inbox do Linear; o sino fica só para avisos. Enviamos para aprovação."*

---

## 9. Portal do cliente (síndico, conselheiro, morador)

### Regra atual
`TelaPortal`: barra própria com o nome do cliente, só as telas do portal (7 telas na contagem de 22/09), tema claro, densidade confortável, nada do GACO; Home do portal com "Comunicados da {marca}" e "Próximos passos". Menu do portal ainda com emoji até o V5.2.

### O que esse público faz, e em quantos toques deveria fazer
Pelo que TownSq e Superlógica anunciam [confirmado, sites e ajuda oficiais]: 2ª via e linha digitável do boleto, prestação de contas, comunicados (com quem leu), reserva de áreas comuns sem conflito, chamados/ocorrências online, encomendas, autorização de visitante e prestador. O síndico ainda **aprova** (orçamento, despesa, contratação) e **acompanha** chamados do condomínio.

| Tarefa | Quem | Meta de toques (celular, já logado) | Como |
|---|---|---|---|
| Copiar a linha digitável / PIX do boleto do mês | morador | **2** | Home do portal abre com o boleto em aberto no topo: "Copiar código PIX" / "Copiar linha digitável" |
| Abrir chamado com foto | síndico/morador | **5–6** | botão grande "Abrir chamado" → câmera primeiro → categoria por ícones → texto ou áudio → Enviar; unidade e condomínio pré-preenchidos |
| Acompanhar chamado | síndico/morador | **1–2** | notificação leva direto à conversa do chamado, que é a mesma conversa do WhatsApp (motor do Suporte) |
| Reservar o salão | morador | **4** | Reservas → dia livre no calendário → horário → Confirmar; regras e taxa mostradas antes do confirmar |
| Aprovar orçamento de manutenção | síndico | **2–3** | item em "Precisa de você" → ver orçamentos lado a lado → Aprovar (motivo só se recusar) |
| Ler comunicado e dar ciência | morador/conselheiro | **2** | notificação → "Li e estou ciente" |

### Alternativas
- **Conservadora:** o portal atual, com uma **barra de navegação inferior** de 4–5 destinos no celular (Início, Boletos, Chamados, Reservas, Mais), alvos de toque de 44px (a v4 §4.9 já fixa 44px), e "Precisa de você" no topo da Home do portal. Barra inferior é o padrão de apps de celular [não confirmado para TownSq/Superlógica especificamente].
- **Ousada (e coerente com o briefing):** **o WhatsApp é o portal** para as tarefas de 1 passo: mandar foto + texto para o número da administradora já abre chamado (o ModeloAtendimento já transforma conversa em chamado); o bot devolve 2ª via e PIX; comunicados chegam com botão "Ciente". O portal web fica para o que precisa de tela: prestação de contas, reserva com calendário, aprovações com anexos.

### Recomendação
**As duas.** O portal web vira celular primeiro com barra inferior; o WhatsApp faz as 3 tarefas mais frequentes (boleto, chamado, ciência). Para o dono: *"O morador tira o boleto em 2 toques e abre chamado com foto em 5, como nos apps de condomínio TownSq e Superlógica; e pelo WhatsApp, que já é o motor do nosso Suporte, sem abrir o portal. Enviamos para aprovação."*

---

## 10. Superadmin entrando no cliente

### Regra atual (o que achei)
Superadmin com acesso próprio entra no cliente; sem nenhum, cai no painel da plataforma (25/09). O "trocar de cliente" criava usuário real no banco do cliente; desde o #285 existe `usuarios.de_plataforma` e a auditoria o mostra como "Suporte da plataforma" (marca configurável). 2º fator obrigatório para superadmin (27/09). A auditoria de 28/09 (A7) registrou: home da plataforma inalcançável pelo clique e "Boa noite, Suporte" com e-mail interno aparecendo no cliente. **Não encontrei**: faixa persistente de "você está no cliente X como suporte", motivo obrigatório, prazo, modo só leitura, aviso ao cliente.

### Onde machuca
- **Para o cliente**: não há como saber quando a plataforma entrou nem por quê. Em LGPD e em confiança ("sólido, seguro"), isso é o ponto fraco.
- **Para o superadmin**: sem faixa, é fácil esquecer em qual cliente se está e alterar o dado errado (o prédio sem nome em texto, por decisão de 24/09, piora isso **para esse perfil**).

### Alternativas

| # | Alternativa | Quem faz |
|---|---|---|
| A1 (conservadora) | Faixa fixa no topo, em cor que o white label **não** controla: "Suporte da plataforma em **Administradora Órbita** · desde 14:05 · Sair do cliente"; nome do cliente em texto **para o superadmin** (exceção à regra de 24/09, que foi pensada para o usuário do cliente) | Salesforce "Logged in as" com link de saída [confirmado, A1 §9]; Zendesk "assume identity" com banner para reverter [confirmado, A1] |
| A2 (recomendada) | A1 + **motivo obrigatório** (texto ou nº do chamado) + **sessão de até 1 h** + **só leitura por padrão**, com "Habilitar edição" pedindo novo motivo; toda escrita marcada na auditoria como feita pelo suporte; **aviso ao cliente** (e-mail ao admin do cliente e linha em Configuração › Acessos da plataforma) | GitHub Enterprise impersonation: motivo obrigatório, no máximo 1 h, e-mail ao usuário que não se desliga, registro no audit log [confirmado, docs.github.com, A1 §9] |
| A3 (ousada) | O cliente **concede** acesso temporário ("Permitir que o suporte acesse por 24 h") antes de a plataforma entrar, salvo emergência auditada | Zendesk "Granting Zendesk temporary access to assume your account" [confirmado, A1] |

### Recomendação
**A2, com A3 como configuração do cliente** (clientes maiores vão exigir). Para o dono: *"Quando a plataforma entra num cliente, aparece uma faixa que não some, com motivo obrigatório, prazo de 1 hora, só leitura até pedir edição e aviso ao cliente, como o GitHub Enterprise, o Salesforce e o Zendesk fazem. Enviamos para aprovação."*

---

## (a) Tabela-resumo

| Regra atual | Proposta | Tipo | Referências | Impacto no usuário |
|---|---|---|---|---|
| Editar com conteúdo = página própria (P11) | Editar **por seção** no detalhe; campo simples **por campo**; página só para criar e para documentos | substitui (na edição) | SAP Fiori partial edit; HubSpot; Salesforce; Jira; Cloudscape | 1 campo: de 3 cliques/2 trocas para 3 cliques/0 trocas; some a "segunda tela" do mesmo registro |
| Barra fixa no pé sempre visível | Barra aparece **só com alteração**, com contagem | ajusta | Shopify Polaris; Elastic EUI | a pessoa sabe se há algo por salvar |
| Só "Salvar" | **Salvar ▾** (e voltar / e novo / e próximo), lembra a escolha | ajusta | SAP Fiori; Salesforce; Zendesk; Help Scout | cadastro em série e conferência em lote: −2 cliques e −2 trocas por registro |
| Sem autosave/rascunho | **Rascunho automático** só em objetos-documento; "Meus rascunhos" | acrescenta | SAP Fiori draft; Dynamics 365 | ata e comunicado não se perdem |
| Sair sujo: "Descartar alterações?" | 3 saídas: Continuar editando · Descartar e sair · **Salvar e sair**; nunca perguntar se nada mudou | ajusta | GitLab Pajamas; Cloudscape | menos perda e menos pergunta inútil |
| "Lista só lista" | Mantém como padrão; **exceção declarada para filas de trabalho**: visão dividida com URL por registro | ajusta | Salesforce Split View; Fiori FCL; PatternFly; Intercom; o próprio ModeloAtendimento | triagem sem trocar de tela |
| Voltar = trilha ao módulo / voltar do navegador | Lista **restaurada** (filtro, página, scroll, linha destacada); "14 de 63" com anterior/próximo e J/K | ajusta | Jira; Dynamics 365; Zendesk; Help Scout; NN/g | revisão de 63 contratos: de ~400–550 para ~250 cliques (§ fluxo 2 e 6) |
| Abas de registros | Não fazer; garantir link real para Ctrl+clique | mantém (não criar) | Salesforce Console (como contraexemplo de custo) | nenhum conceito novo |
| Painel lateral só auditoria | Painel só para **contexto**: histórico, **criação rápida**, **prévia** (três tipos, guarda em código) | substitui | HubSpot; Dynamics 365 quick create; PatternFly | criar fornecedor no meio da ordem sem perder a ordem |
| Modal ≤ ~8 campos | Criação rápida = obrigatórios até ~10 (configurável pelo cliente); página = completo; etapas > ~20 | ajusta | Cloudscape; HubSpot (campos do painel configuráveis) | regra que se mede |
| Lookup sem criação | **"+ Criar novo" em todo lookup**, volta selecionado | acrescenta | Dynamics 365; HubSpot | −5 cliques, −3 trocas |
| Criar item por item | **Criação inline** para objetos-linha (leituras, rateio, itens) | acrescenta | Salesforce datatable; Linear | 40 leituras sem abrir formulário |
| Principal à direita do título | Mantém | mantém | Salesforce; HubSpot; Polaris | — |
| Histórico 30×30 primeiro | Histórico sempre visível, mas **último** do grupo | ajusta | Fiori (frequência define a ordem) | ação mais frequente no lugar nobre |
| "Mudar estado" em modal | **Barra de etapas** clicável no topo (dias por etapa, o que a etapa pede); modal só para transição com motivo | substitui (visual) / mantém (estado é ação) | Salesforce Path; Pipedrive | avançar etapa: de 3 cliques + modal para 2 cliques; caminho inteiro visível |
| Ações da linha no hover | 1–2 mais usadas sempre visíveis; hover só realça; resto no "⋯" | ajusta | SAP Fiori; Polaris (contraponto) | funciona no toque e no teclado |
| Confirmação em todo destrutivo | **3 níveis + Lixeira de 30 dias** com desfazer | substitui | Cloudscape; Salesforce Recycle Bin; HubSpot; NN/g | menos modal; o erro percebido depois tem volta |
| Paginação de 20 | **50** padrão, escolha lembrada; ordenação e filtro **sempre no servidor**; "carregar mais" em históricos | ajusta | NN/g; Baymard; ServiceNow; Carbon | fim da ordenação que mente |
| Selecionar tudo = página | + "Selecionar todos os 1.240 do filtro" | acrescenta | PatternFly; Gmail | ação em massa real |
| Modelo D, 11 grupos visíveis | Mantém D **com grupos por papel e favoritos**; **testar** trilho lateral + barra do módulo com 5 usuários | ajusta + teste | Salesforce; SAP Fiori; Zendesk; HubSpot 2024; NN/g | de 3 para 1 clique até a tela frequente |
| ⌘K encontra páginas | ⌘K também **executa ações** e mostra atalhos | ajusta | Linear; GitHub | aprende-se o teclado usando |
| Sino único + "O que precisa de você" | **Minha fila** com ação no item (Aprovações, Menções, Atribuídos, Prazos, Rascunhos); sino só aviso | substitui | monday.com My Work; Linear Inbox | aprovar 3 férias: de ~20 para ~5 cliques |
| Portal com 7 telas | Celular primeiro, barra inferior, boleto em 2 toques, chamado com foto em 5–6; **WhatsApp como portal** para boleto/chamado/ciência | ajusta | TownSq; Superlógica; motor WhatsApp do GACO | o morador não precisa aprender o portal |
| Superadmin entra no cliente | Faixa fixa, motivo, 1 h, só leitura por padrão, aviso ao cliente; opção de o cliente conceder acesso | acrescenta | GitHub Enterprise; Salesforce; Zendesk | confiança e LGPD; menos erro de cliente errado |

---

## (b) Dez fluxos-chave redesenhados

Contagem de cliques pela convenção do §0. "Antes" segue as regras atuais escritas; onde não sei como a tela está hoje, digo que é estimativa.

### Fluxo 1 — Atender um chamado que chegou pelo WhatsApp até resolver
**Antes (regras atuais, com ModeloAtendimento):**
1. Menu Suporte (1) → bloco (1) → Atendimento (1).
2. Clicar a conversa na fila (1).
3. Responder: digitar + Enviar (1).
4. Classificar tipo e prioridade: abrir o detalhe clássico pela ficha (1, troca) → ✏ (1, troca) → ajustar 2 campos (2) → Salvar (1, troca) → voltar ao atendimento (1, troca).
5. Resolver: Mudar estado (1) → Resolvido (1) → confirmar (1, modal).
6. Voltar à fila e abrir a próxima (1).
**≈ 17 cliques, 5 trocas de contexto.**

**Depois:**
1. "Minha fila › Atribuídos" ou a notificação (1) — abre direto no atendimento.
2. Na ficha à direita, tipo e prioridade editáveis por campo (2).
3. Resposta rápida com "/" e Enviar (2).
4. **"Enviar ▾ › e marcar como Resolvido"** (1, a escolha fica lembrada); o sistema abre a próxima conversa da fila.
**≈ 6 cliques, 0 trocas.** (Zendesk "Submit as" + "Next ticket in view"; Freshdesk "Send and set as".)

### Fluxo 2 — Editar um contrato e voltar para a lista na mesma posição
**Antes:** clicar a linha na página 3 (1, troca) → ✏ (1, troca) → alterar índice de reajuste (1) → Salvar (1, troca/recarga) → trilha "Contratos" (1, troca) → refazer 2 filtros (2) → ir à página 3 (1) → rolar até a linha. **≈ 8 cliques, 4 trocas, posição perdida.** (Pelo voltar do navegador: 3 cliques de voltar, scroll perdido.)
**Depois:** clicar a linha (1, troca) → lápis da seção "Vigência e valores" (1) → alterar (1) → Salvar da seção (1) → "‹ Contratos · 14 de 63" (1, troca) → lista com filtros, página e scroll restaurados e a linha destacada. **5 cliques, 2 trocas.** Na visão dividida: **4 cliques, 0 trocas.**

### Fluxo 3 — Criar cliente (condomínio) com dois contatos
**Antes:** "+ Novo cliente" (1) → página de criação (troca) → preencher → Salvar (1, troca para o detalhe) → aba Contatos (1) → "+ Contato" (1, modal) → preencher → Salvar (1) → "+ Contato" (1) → preencher → Salvar (1). **8 cliques, 4 trocas.** Se o síndico ainda não existe como Pessoa, some-se a criação da pessoa em outra tela (estimativa: +5 cliques, +2 trocas).
**Depois:** "+ Novo cliente" (1, troca) → CNPJ preenche razão social e endereço (sugestão; depende de integração que **não** conferi existir) → seção "Contatos" na própria página: "+ Adicionar contato" (1) → linha com nome, papel (Síndico), telefone, e-mail; se a pessoa já existe, o lookup sugere; se não, cria ali → "+ Adicionar contato" (1) → **"Criar cliente"** (1, troca para o detalhe). **4 cliques, 2 trocas.**

### Fluxo 4 — Gestora aprova 3 pedidos de férias da equipe
**Antes:** menu Cultura (1) → bloco (1) → Férias/Solicitações (1) → filtro "pendentes" (1) → para cada pedido: linha (1, troca) → Mudar estado (1) → Aprovado (1) → confirmar (1, modal) → voltar (1, troca). **4 + 3 × 5 = 19 cliques, 9 trocas.** Sem ver, na mesma tela, quem mais da equipe estará fora no período.
**Depois:** "Minha fila › Aprovações" (1) → cada item mostra período, saldo de dias e "também fora: Bruno (12–16/10)" → selecionar os 3 (3) → "Aprovar 3" (1) → toast com Desfazer. **5 cliques, 0 trocas.** Recusar pede motivo (modal curto).

### Fluxo 5 — Síndico abre chamado com foto pelo celular
**Antes (estimativa: não medi o portal atual):** abrir o portal → gaveta do menu (1) → Chamados (1) → "+ Novo" (1) → tipo (2: abrir seleção e escolher) → título e descrição → anexar (1) → escolher origem (1) → escolher foto (1) → Enviar (1). **≈ 10 toques.**
**Depois (portal):** "Abrir chamado" na Home (1) → câmera abre direto → tirar (1) → usar (1) → categoria por ícone grande (1) → descrever em texto ou áudio → Enviar (1). **5 toques**; unidade e condomínio já preenchidos; acompanhamento chega por notificação e pelo WhatsApp.
**Depois (WhatsApp):** mandar a foto e uma frase ao número da administradora (2–3 toques no próprio WhatsApp); o bot confirma a categoria com 1 botão; vira chamado no Atendimento. **3–4 toques, sem abrir portal.**

### Fluxo 6 — Conferir 20 lançamentos de rateio (trabalho em lote)
**Antes:** por lançamento: linha (1, troca) → ✏ (1, troca) → corrigir (1) → Salvar (1, troca) → voltar (1–3). **5–7 × 20 = 100–140 cliques, 60–80 trocas.**
**Depois (A):** abrir o primeiro (1) → por lançamento: lápis da seção (1) → corrigir (1) → **"Salvar e próximo"** (1). **1 + 3 × 20 = 61 cliques, 20 trocas leves (mesma página, próximo registro).**
**Depois (B, objeto-linha com edição inline na tabela):** clicar a célula (1) → corrigir → Enter (1). **2 × 20 = 40 cliques, 0 trocas.**

### Fluxo 7 — Avançar a implantação do Condomínio Vila Serena para "Treinamento"
**Antes:** no detalhe, "Mudar estado" (1) → escolher destino (1) → confirmar no modal (1). **3 cliques, 1 modal**; o caminho inteiro e o tempo por etapa não aparecem.
**Depois:** clicar "Treinamento" na barra de etapas (1) → popover diz o que a etapa pede ("data do treinamento") e já traz o campo → preencher → "Mover para Treinamento" (1). **2 cliques, 0 modais**; a barra mostra "há 9 dias em Configuração". Se o destino for "Cancelada": botão à direita da barra → modal com motivo (mantém a regra).

### Fluxo 8 — Excluir por engano e recuperar
**Antes:** ⋯ (1) → Excluir (1) → confirmar (1, modal). Recuperar: **não há caminho no produto** (não achei lixeira) — pedido ao suporte e restauração manual.
**Depois:** ⋯ (1) → Excluir (1) → toast "Movido para a Lixeira · Desfazer" (1 para desfazer). Percebeu dois dias depois: ⌘K "Lixeira" (1) → filtrar tipo "Contrato" (1) → Restaurar (1). **3 cliques, recuperação em qualquer dia até o 30º.**

### Fluxo 9 — Superadmin entra no cliente para investigar um problema de boleto
**Antes:** prédio (1) → escolher o cliente (1) → navega como "Suporte da plataforma", sem faixa e sem motivo registrado (pelo que achei na documentação). **2 cliques, 0 rastro de porquê.**
**Depois:** painel da plataforma → cliente (1) → "Entrar como suporte" (1) → motivo/nº do chamado (1) → entra em **só leitura**, faixa fixa com nome do cliente e cronômetro → se precisar corrigir: "Habilitar edição" (1) + novo motivo (1). **3 cliques para ver, 5 para editar**; o cliente recebe aviso; tudo auditado. Custo de 1–3 cliques a mais, de propósito.

### Fluxo 10 — Responder a uma menção do jurídico no contrato de portaria
**Antes (estimativa: não confirmei onde ficam comentários hoje):** sino (1) → notificação (1, troca) → abrir a aba onde está o comentário (1) → responder (1) → enviar (1) → voltar ao que fazia (1, troca). **6 cliques, 2 trocas.**
**Depois:** "Minha fila › Menções" (1) → o item mostra o trecho do comentário e o contrato; responder na própria linha (1) → Enviar (1) → J para a próxima menção. **3 cliques, 0 trocas.**

### Resumo dos ganhos

| Fluxo | Antes | Depois | Trocas antes → depois |
|---|---|---|---|
| 1 Chamado do WhatsApp até resolver | ~17 | ~6 | 5 → 0 |
| 2 Editar contrato e voltar | ~8 | 5 (4 na dividida) | 4 → 2 (0) |
| 3 Cliente com 2 contatos | 8 (+5 se criar pessoa) | 4 | 4 → 2 |
| 4 Aprovar 3 férias | ~19 | 5 | 9 → 0 |
| 5 Chamado com foto (celular) | ~10 (estimado) | 5 portal / 3–4 WhatsApp | — |
| 6 Conferir 20 lançamentos | 100–140 | 61 / 40 | 60–80 → 20 / 0 |
| 7 Avançar etapa | 3 + modal | 2 | 1 → 0 |
| 8 Excluir por engano e recuperar | 3 + sem recuperação | 3 + recuperação em 3 | — |
| 9 Superadmin no cliente | 2 (sem rastro) | 3–5 (com rastro) | mais cliques de propósito |
| 10 Responder menção | ~6 (estimado) | 3 | 2 → 0 |

---

## 11. O que eu levaria ao dono primeiro (ordem de impacto por esforço)

1. **Lista restaurada + anterior/próximo** (§2 V1): barato, vale para as 131 telas, remove a maior irritação diária.
2. **Barra de salvar que aparece só suja + Salvar ▾ com próxima ação** (§1 S1): um componente.
3. **Ordenação/filtro sempre no servidor e 50 por página** (§6): é defeito de confiança, não de gosto.
4. **Edição por seção no detalhe** (§1 S2) e **barra de etapas** (§4): mudam o `ModeloDetalhe`, maior esforço, maior ganho.
5. **Minha fila** (§8) e **Lixeira** (§5): precisam de backend.
6. **Painel lateral com três usos** (§3 C2) e **visão dividida nas filas** (§2 V2): mexem em regra aprovada; levar com o protótipo lado a lado.
7. **Navegação**: N1 já; N2 só depois do teste com 5 usuários.
8. **Superadmin** (§10) e **portal celular primeiro + WhatsApp** (§9).

## 12. Limites deste documento

- Não abri o sistema no navegador nesta rodada; o "antes" vem das regras escritas e do catálogo. Onde a tela real divergir da regra (há sessões mexendo todo dia, §10 do padrão), a contagem muda.
- Várias fontes do A1 são trechos do buscador; antes de citar literalmente para o dono, conferir no navegador.
- Não confirmei: Odoo (navegação atual), Ahreas, HubSpot barra de etapas no registro, Asana, convenção "selecionar todos" do Gmail, integração de CNPJ, portal atual do GACO no celular.

### Fontes novas desta rodada (além das do A1)
- HubSpot, nova navegação lateral (14/05/2024): https://knowledge.hubspot.com/help-and-resources/a-guide-to-hubspots-navigation · https://community.hubspot.com/t5/HubSpot-Ideas/OPT-out-of-NEW-navigation-bar/idi-p/976234 · https://inflectiv.co/2024/05/07/guide-to-hubspots-new-navigation/
- NN/g, navegação vertical: https://www.nngroup.com/articles/vertical-nav/
- Salesforce, barra de navegação no topo, personalizável: https://help.salesforce.com/s/articleView?language=en_US&id=user_userdisplay_tabs_lex.htm&type=0 · https://trailhead.salesforce.com/content/learn/modules/lightning-experience-for-salesforce-classic-users/navigate-around
- SAP Fiori launchpad, espaços e páginas: https://www.sap.com/design-system/fiori-design-web/v1-84/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces · https://help.sap.com/docs/btp/sap-fiori-launchpad-for-sap-btp-abap-environment/spaces-and-pages
- Zendesk, navegação lateral: https://support.zendesk.com/hc/en-us/articles/9562988564634 · https://developer.zendesk.com/api-reference/apps/apps-support-api/nav_bar/
- Salesforce Path: https://trailhead.salesforce.com/content/learn/modules/leads_opportunities_lightning_experience/visualize-success-with-path-and-kanban · https://ianjamieson.com/how-to-hide-mark-status-as-complete-on-a-salesforce-path/
- Pipedrive, barra de progresso no detalhe: https://support.pipedrive.com/en/article/detail-view · https://support.pipedrive.com/en/article/pipeline-view
- HubSpot, criar no painel à direita e campos configuráveis: https://knowledge.hubspot.com/records/create-contacts · https://knowledge.hubspot.com/object-settings/set-up-fields-seen-when-manually-creating-records · https://knowledge.hubspot.com/records/work-with-records
- monday.com My Work: https://support.monday.com/hc/en-us/articles/360019300579-My-Work
- Linear Inbox: https://linear.app/docs/inbox
- TownSq e Superlógica: https://townsq.com.br/gestao-de-condominios/ · https://condominios.superlogica.com/hc/pt-br/articles/360044901114 · https://superlogica.com/condominios/
