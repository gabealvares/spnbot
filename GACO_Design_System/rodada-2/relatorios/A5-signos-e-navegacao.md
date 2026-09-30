# A5: Signos consagrados, identidade única e navegação global (GACO, rodada 2)

Data: 30/09/2026. Autor: agente A5 (arquitetura de informação e interação).
Base: BRIEFING.md, `fonte/livro-consolidado.txt` (taxonomia do menu, 282 telas, kit de ícones), `fonte/Docs__frontend__menu-modelo-d.md`. Complementa o A1 (fluxos, salvar, atendimento), sem repetir o que está lá.

## 0. Método e limites

- Pesquisei na web em 30/09/2026. Várias páginas oficiais estão bloqueadas pelo proxy desta sessão (nngroup.com, knowledge.hubspot.com, product.hubspot.com, support.pipedrive.com, m3.material.io). Nesses casos usei o resumo da busca, que cita a página oficial, e digo isso.
- Três marcadores:
  - **[confirmado]**: está numa fonte citada nesta seção ou na lista do fim.
  - **[não confirmado]**: é conhecimento de uso comum ou memória minha e não conferi nesta pesquisa. Precisa de uma olhada antes de ir para o dono.
  - **[medido]**: conferi no pacote oficial. Os nomes de ícone Lucide foram checados um a um no `lucide-static` 1.49.0 do npm (2.121 arquivos SVG, licença ISC).
- Emoji não aparece neste documento. Quando cito um, uso o nome ("polegar para cima").

---

## 1. Módulo por módulo: que software o usuário já conhece, que signos esse software ensinou e o que o GACO faz com cada um

Legenda da decisão: **ADOTAR** (igual, só com o acabamento do GACO), **ADAPTAR** (a ideia fica, a forma muda), **EVITAR**.

### 1.1 Suporte (Atendimento, Chamados, Canais): WhatsApp Web / WhatsApp Business, Zendesk

O público brasileiro de síndico, morador e atendente vive no WhatsApp. O dono pediu o chat "tal qual WhatsApp" como motor. O layout de três colunas (fila, conversa, ficha) já existe como `ModeloAtendimento` (29/09).

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Lista de conversas à esquerda, com avatar, nome, prévia da última mensagem, hora à direita e contador de não lidas em círculo | WhatsApp [não confirmado em fonte, uso comum] | **ADOTAR** | O contador usa a cor de ação do GACO, não o verde do WhatsApp. |
| Um tique cinza = enviada; dois tiques cinza = entregue; dois tiques azuis = lida | WhatsApp [confirmado] | **ADOTAR o desenho, ADAPTAR a cor** | Ícones Lucide `check` e `check-check` [medido]. O estado "lida" usa o azul de informação do GACO. Não copiar o azul exato do WhatsApp: é marca de outra empresa (trade dress). Acrescentar um relógio (`clock-3`) para "enviando" e um triângulo vermelho para "falhou", com "Tentar de novo" (WhatsApp mostra relógio e alerta [não confirmado]). Quando o canal não informa leitura (e-mail, por exemplo), mostrar só "entregue". O WhatsApp faz o mesmo quando a confirmação de leitura está desligada [confirmado]. |
| Filtros no topo da lista: Tudo, Não lidas, Favoritas, Grupos; listas personalizadas | WhatsApp, 2024 [confirmado; os nomes em português não foram confirmados] | **ADAPTAR** | Filtros do GACO: "Minhas", "Não atribuídas", "Aguardando cliente", "Todas", além das filas. É a mesma forma (abas curtas no topo da lista) com o vocabulário de atendimento. O filtro ativo fica marcado como o do WhatsApp (preenchido), na cor de ação. |
| Fixar conversa no topo e arquivar | WhatsApp [confirmado: conversas fixadas] | **ADOTAR** | `pin` e `archive` [medido]. |
| Respostas rápidas com atalho "/" | WhatsApp Business [confirmado: atalho começando com "/", até 50 respostas] | **ADOTAR** | Renomear "Macros" (termo do Zendesk) para "Respostas rápidas". Digitar "/" na caixa abre a lista. |
| Etiquetas na conversa | WhatsApp Business [confirmado: labels] | **ADOTAR** | Usam os 8 tons de rótulo que já existem. |
| Balão verde à direita para quem envia, branco à esquerda para quem recebe, fundo com papel de parede | WhatsApp [não confirmado] | **ADAPTAR** | Balões à direita e à esquerda, sim. Balão enviado na superfície tingida pela cor de ação, recebido na superfície neutra. **Evitar** o papel de parede com desenhos e o verde característico: é signo de marca, não de função. |
| Nota interna amarela dentro da conversa (o cliente não vê) | Zendesk, Front (ver A1 §8.1) | **ADOTAR** | Fundo amarelo claro, cadeado e "Só a equipe vê" em texto. É o único amarelo "de fundo" permitido no chat. |
| Gravar áudio com o microfone no lugar do botão enviar quando a caixa está vazia | WhatsApp [não confirmado] | **ADOTAR** | `mic` vira `send` quando há texto. O áudio recebido é tocado em linha, com duração. |
| Anexo pelo clipe | WhatsApp, e-mail [não confirmado] | **ADOTAR** | `paperclip` [medido]. |
| Responder citando uma mensagem (arrastar para o lado no celular, menu na mensagem no computador) | WhatsApp [não confirmado] | **ADOTAR** | `reply` [medido]. |
| Estados do chamado: Novo, Aberto, Pendente (aguardando o cliente), Em espera (aguardando terceiro), Resolvido, Fechado | Zendesk [confirmado] | **ADOTAR os nomes, ADAPTAR as cores** | O Zendesk usa cinza escuro para "em espera" e cinza claro para resolvido e fechado [confirmado]. No GACO, a cor segue a semântica única da §2.4 e o nome aparece sempre em texto. |
| Três colunas: propriedades, conversa, contexto | Zendesk Agent Workspace [confirmado] | **ADOTAR** | Já é o `ModeloAtendimento`. |

**Regra do motor:** toda conversa já nasce como chamado, com número visível no topo. O chamado é a conversa com estado, e o atendente nunca "cria um chamado a partir da conversa".

### 1.2 Comercial (Leads e Pipeline, Ritmo de vendas): Pipedrive, RD Station CRM, HubSpot

O mercado brasileiro de PMEs aprendeu o funil de colunas com o Pipedrive e o RD Station CRM.

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Funil em colunas, uma por etapa, com cartões arrastáveis | Pipedrive [confirmado], RD Station CRM [confirmado: até 12 etapas por funil] | **ADOTAR** | `ModeloKanban` com colunas de 280. |
| Cabeçalho da coluna com **soma do valor** e número de negócios; valor ponderado pela probabilidade | Pipedrive [confirmado: total e total ponderado] | **ADOTAR** | "R$ 184.300 · 12 negócios" no cabeçalho, e o ponderado na dica. É o KPI legítimo, o que o dono aceita: número no lugar em que se trabalha, e não uma fileira de cartões. |
| Negócio parado ganha **destaque vermelho** ("rotting") depois de N dias sem atualização, com limite configurável por etapa | Pipedrive [confirmado] | **ADOTAR com o nome do RD** | O RD Station CRM faz o mesmo em **amarelo**, com etiqueta "X dias sem interação", e chama de negociação "esfriando" [confirmado]. Recomendo o termo "Esfriando" e o amarelo de atenção, porque "parado há 9 dias" é alerta e não erro. Vermelho fica para o prazo vencido. |
| Área de soltar no rodapé ao arrastar: Ganho / Perdido / Excluir | Pipedrive [não confirmado nesta pesquisa: a página de ajuda foi bloqueada pelo proxy] | **ADOTAR** | Soltar em "Perdido" abre o **motivo da perda**, obrigatório. RD e Pipedrive pedem motivo [confirmado]. |
| Negócio ganho sai do funil | Pipedrive [confirmado] | **ADOTAR** | Ganhos e perdidos se acham pelo filtro. |
| Alternar entre funil e lista | RD Station CRM [confirmado] | **ADOTAR** | O seletor de visão fica sempre no mesmo lugar em todos os módulos (§2). |
| Ícone de próxima atividade no cartão: vermelho se atrasada, verde se é hoje, alerta se não há atividade | Pipedrive [não confirmado] | **ADOTAR** | Encaixa na semântica única. |
| "Path": barra de etapas em setas no topo do registro, dias na etapa, campos-chave e orientação por etapa | Salesforce Path [confirmado: até 5 campos-chave e texto de orientação por etapa] | **ADOTAR no detalhe do negócio** | As etapas em segmentos retos, não em chevrons decorativos. "Há 6 dias nesta etapa". |

### 1.3 CS (Clientes, Contratos, Trabalho do CS, Saúde, Voz do cliente): HubSpot, Salesforce, Gainsight, RD Station CRM

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Registro em três colunas: propriedades à esquerda, abas Visão geral / Atividades com linha do tempo no meio, associações à direita | HubSpot [confirmado] | **ADOTAR no detalhe do Cliente** | É o `ModeloDetalhe` com a lateral de 320 passada para a esquerda (propriedades) e as associações à direita (contratos, chamados, projetos, pessoas). A linha do tempo junta chamados, reuniões, NPS e e-mails. |
| Saúde vermelha, amarela ou verde (0–50, 51–75, 76–100) | Gainsight [confirmado] | **ADOTAR** | Ponto colorido + número + palavra ("62 · Atenção"). Nunca só a cor. |
| Tendência: melhorando, estável, piorando | Gainsight [confirmado] | **ADOTAR** | Seta pequena ao lado da saúde. |
| "Cockpit" de CTAs: fila de ações disparadas por regra | Gainsight [confirmado] | **ADAPTAR o nome** | Já existe como "Minhas ações". Manter "Minhas ações"; "CTA" e "Cockpit" não significam nada em português. |
| Negociação esfriando | RD Station CRM [confirmado] | **ADOTAR** também na carteira do CS | "Sem contato há 45 dias". |
| Estrela de favorito / seguir registro | Jira "starred" [confirmado], HubSpot "bookmarks" [confirmado] | **ADOTAR** a estrela | `star` [medido] no cabeçalho de todo registro. O que tem estrela aparece em "Favoritos" no topo do trilho (§3). |

### 1.4 Projetos: Trello, Asana, Monday, Jira

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Quadro de listas com cartões (capa, etiquetas coloridas, avatares, prazo, checklist) | Trello [confirmado] | **ADOTAR** | O prazo vira vermelho quando vence e verde quando o cartão está concluído (Trello [não confirmado]). As etiquetas usam os 8 tons de rótulo. |
| "Minhas tarefas", "Caixa de entrada" (notificações de trabalho), "Início" | Asana [confirmado] | **ADOTAR** | O "Meus projetos" atual vira "Minhas tarefas", que atravessa projetos. |
| Visões Lista / Quadro / Cronograma / Calendário como abas do projeto | Asana, Monday [não confirmado nesta pesquisa] | **ADOTAR** | As mesmas quatro palavras em todo módulo que tiver visões. |
| Grade colorida estilo planilha com coluna de status preenchida | Monday [não confirmado] | **EVITAR** | Pinta a tela inteira e briga com a regra "cor diz estado com parcimônia". |

### 1.5 Produto e Desenvolvimento: Jira, Linear, GitHub

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Ícone do tipo antes da chave (GACO-123): épico = raio roxo, tarefa = check azul, história = marcador verde | Jira [confirmado] | **ADAPTAR** | Mesma ideia (tipo por forma, antes do código). Cores pela semântica do GACO e não pela do Jira: roxo não significa nada no resto do sistema. |
| Estado por **forma progressiva de círculo**: tracejado = backlog, vazio = a fazer, meio cheio = em andamento, check = feito, X = cancelado | Linear [confirmado] | **ADOTAR** em Demandas, Bugs e Sprints | Lê sem cor e sem legenda; é o melhor signo de estado desta pesquisa. `circle-dashed`, `circle`, `circle-dot`, `circle-check-big` [medido]. |
| Prioridade por barras (1, 2 ou 3), três pontos para "sem prioridade", quadrado com exclamação para urgente | Linear [confirmado] | **ADOTAR** | Em todo lugar que tiver prioridade (chamados também). |
| Aberto = verde, fechado/concluído = roxo, PR rejeitado = vermelho | GitHub Primer [confirmado; o fechado passou de vermelho para roxo em out/2021] | **EVITAR as cores** | O roxo de "concluído" contradiz o verde de "concluído" do resto do GACO. Guardar só a lição: o GitHub mudou porque vermelho para "fechado com sucesso" confundia. |
| Barra lateral com "Para você", recentes, com estrela; navegação no topo removida em 2025 | Jira, nova navegação, maio de 2025 [confirmado] | Ver §3 | Serve de argumento para o trilho lateral. |

### 1.6 Academy: portal do aluno de faculdade, Canvas, Moodle, Google Classroom

O pedido do dono é o ambiente acadêmico. O menu atual (Trilhas, Formações, Badges, Ranking, Academy Score) é vocabulário de gamificação, e não de faculdade.

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Portal do aluno com Notas e frequências, Boletim, Histórico, Grade horária, Rematrícula, Financeiro/boletos | Portais brasileiros (Unimestre, USP Júpiter, UniAcademia, Gennera) [confirmado] | **ADOTAR** o vocabulário e a tabela do boletim | Boletim = tabela por **disciplina** × avaliações (N1, N2, Final), média, **frequência %** e situação (Aprovado, Em curso, Reprovado por falta). Troca "Academy Score" e "Ranking". |
| Período letivo / semestre no topo do portal, trocando o conjunto de disciplinas | Portais [não confirmado como convenção visual] | **ADOTAR** | Seletor "Período: 2026.2" no cabeçalho do Academy. Na empresa, o período é o ciclo de formação (trimestre, semestre). |
| Menu global à esquerda: Conta, Painel, Cursos, Grupos, Calendário, Caixa de entrada, Histórico, Ajuda. Dentro do curso, outro menu lateral: Módulos, Notas... | Canvas [confirmado] | **ADAPTAR** | No GACO o menu global é o trilho (§3). Dentro de uma disciplina, abas no topo (ver abaixo), e não um segundo menu lateral. |
| Abas da turma: Mural, Atividades, Pessoas, Notas; lista "Pendentes" | Google Classroom [confirmado em inglês: Stream, Classwork, People, Grades, To-do; os nomes em português não foram confirmados] | **ADOTAR** | Página da disciplina/turma com abas **Mural · Aulas e atividades · Pessoas · Notas**. "Mural" é signo forte: é o feed da turma. "Pendentes" junta o que falta entregar em todas as disciplinas. |
| Seções da disciplina (por semana ou tema) com **caixa de conclusão** ao lado de cada atividade | Moodle [confirmado] | **ADOTAR** | Caixa quadrada com check ao lado de cada aula; barra de progresso da disciplina. |
| Grade de notas: alunos nas linhas, avaliações nas colunas | Moodle, grader report [confirmado] | **ADOTAR** na visão do tutor | "Painel do gestor" do Academy vira "Diário de classe" (tutor) + "Notas" (turma). O termo "diário de classe" é da escola brasileira [não confirmado como termo de software]. |
| Certificado com código de verificação público | Portais e plataformas de curso [não confirmado nesta pesquisa] | **ADOTAR** | Já existe página pública de verificação (`TelaPublica`). |
| Ranking e badges | Duolingo e Feedz (Feedzcoins, ranking de engajamento) [Feedz confirmado] | **EVITAR na versão faculdade** | Deixar só na versão "gamificada", se o dono quiser comparar. |

### 1.7 Cultura (Pessoas, RH, Desenvolvimento, Recrutamento, Performance): LinkedIn, Feedz, Gupy, Sólides

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| "Mural de Celebrações", comunicados, feedbacks, PDI, termômetro de humor | Feedz [confirmado] | **ADOTAR** "Mural" e "Comunicados" | O "Reconhecimentos" atual aparece no Mural da Home. |
| Seis reações nomeadas: Gostei, Parabéns, Amei, Genial, Engraçado, Apoio | LinkedIn [confirmado em inglês: Like, Celebrate, Love, Insightful, Funny, Support; os nomes em português não foram confirmados] | **ADAPTAR** (ver §1.13, reações) | |
| Vaga com etapas em colunas; alternar lista e quadro; arrastar a pessoa candidata entre etapas; ações Mover de etapa, Reprovar, Enviar mensagem (e-mail ou WhatsApp) | Gupy [confirmado] | **ADOTAR** | É o mesmo `ModeloKanban` do Comercial. "Pessoa candidata" é o termo da Gupy [confirmado], a decidir com o dono. |
| Organograma em árvore com foto | Uso comum [não confirmado] | **ADOTAR** | Já existe como tela especial. |
| Presença: ponto verde (disponível), amarelo (ausente), vermelho (ocupado) no avatar | Teams, Slack [não confirmado nesta pesquisa] | **ADOTAR** na Home e no Mural | Sempre com dica em texto. |
| Aniversariantes com bolo | LinkedIn, Feedz [não confirmado] | **ADOTAR** | `cake` [medido], em traço. |
| Sólides: perfil comportamental (DISC) | [não confirmado nesta pesquisa] | Fora do escopo visual | |

### 1.8 Financeiro: Conta Azul, Omie, internet banking

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Menu Financeiro com Extrato, Contas a receber, Contas a pagar, Conciliações pendentes, Fluxo de caixa diário, Categorias financeiras, Centros de custo, DDA | Conta Azul [confirmado] | **ADOTAR os nomes** | "A receber" → "Contas a receber"; "Lançamentos" pode ficar como "Extrato" se for movimento bancário. Omie [não confirmado nesta pesquisa]. |
| Lista de contas por **data de vencimento**, com valor bruto e saldo a pagar/receber da parcela | Conta Azul [confirmado] | **ADOTAR** | Agrupar por "Vencidas · Vencem hoje · Próximos 7 dias · Depois". |
| Vencido em vermelho, pago em verde, a vencer neutro | Conta Azul, bancos [não confirmado: a busca não trouxe as cores] | **ADOTAR** (é a semântica única) | |
| Extrato com saldo do dia, entradas e saídas com sinal, olho para esconder valores | Internet banking brasileiro [não confirmado] | **ADOTAR** o sinal e o saldo; o olho de ocultar só no portal do morador | Valor com sinal e cor sempre acompanhados do sinal "−": cor sozinha não basta. |
| Conciliação: banco à esquerda, lançamento do sistema à direita, botão "Conciliar" no meio | Conta Azul (coluna "banco" por extrato OFX) [parcialmente confirmado] | **ADOTAR** | |
| Boleto, "dar baixa", 2ª via | Vocabulário bancário brasileiro [não confirmado como UI] | **ADOTAR** | O portal do morador mostra "2ª via do boleto" como ação principal. |

### 1.9 Marketing: RD Station Marketing, Mailchimp

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Menu por etapa do funil: Atrair, Converter (Landing pages, Formulários, Pop-ups), Relacionar (Segmentação, Automação, E-mail), Analisar | RD Station Marketing [confirmado: Converter e Relacionar] | **ADAPTAR** | É uma boa ideia de agrupamento, mas os blocos atuais ("Campanhas e leads", "Site", "E-mail", "Medição") já funcionam por objeto. Manter por objeto, com os nomes do RD: "Landing pages", "Segmentação", "Fluxos de automação", "Lead scoring". |
| Estado da campanha: Rascunho, Agendada, Enviando (com % de progresso), Enviada | Mailchimp [confirmado] | **ADOTAR** | Os mesmos quatro, com "Enviando 64%" na linha. |
| Fluxo de automação desenhado como árvore vertical de caixas | RD, Mailchimp, HubSpot [não confirmado nesta pesquisa] | **ADOTAR** | |
| Taxa de abertura e de cliques em cada linha de disparo | Mailchimp [não confirmado] | **ADOTAR** | Duas colunas na lista, e não uma fileira de KPIs. |

### 1.10 Operações (Ativos, Manutenção, Suprimentos, Contratos): Superlógica e CMMS

| Signo | Origem | Decisão | Como |
|---|---|---|---|
| Menu lateral com Receitas, Despesas, Financeiro, Área do Condômino (assembleias, documentos, comunicados, reservas online), Condomínio | Superlógica Condomínios, o sistema mais usado pelas administradoras [confirmado: menu lateral e módulos] | **Referência de vocabulário** | É o software que o público-alvo mais provavelmente já usa. O livro diz que o Modelo D foi "inspirado no ERP que o público de administradoras já usa" sem dizer qual [não confirmado se é a Superlógica]. |
| Ordem de serviço (OS) com número, checklist, fotos antes e depois, QR code no equipamento, calendário de preventivas | CMMS de mercado (UpKeep, Fiix, Manusis) [não confirmado nesta pesquisa] | **ADOTAR** "Ordem de serviço" e "Preventiva / Corretiva" | Prioridade com as barras do Linear. |
| Reserva de salão em calendário | Área do Condômino [confirmado: reservas online] | **ADOTAR** no portal | `ModeloAgenda`. |

### 1.11 Relatórios: Excel, Google Sheets, Power BI, Looker Studio

[não confirmado nesta pesquisa; convenções de uso comum]

| Signo | Decisão | Como |
|---|---|---|
| Filtros e período no topo, "Exportar" para Excel/PDF à direita | **ADOTAR** | Já é regra do `ModeloPainel`. |
| Estrela para favoritar relatório; "Agendar envio por e-mail" | **ADOTAR** | A mesma estrela da §1.3. |
| Tabela dinâmica arrastando campos | **EVITAR** na primeira versão | Complexidade alta, público pequeno. |

### 1.12 Home: LinkedIn, Teams, Feedz (a rede social que o dono pediu)

| Signo | Origem | Decisão |
|---|---|---|
| Feed com publicação, reações, comentários, "Ver mais" | LinkedIn [confirmado: reações] | **ADOTAR** |
| Contador de não lidas no ícone; @menção soma na contagem | Teams [confirmado: badge por conversa não lida e por @menção] | **ADOTAR** no trilho (§3) |
| @menção com lista de pessoas ao digitar "@" | Slack, Teams, LinkedIn [não confirmado] | **ADOTAR** em todo campo de comentário, conversa e publicação |
| Comunicado com "Li e estou ciente" | Feedz: comunicados [confirmado]; a ciência já existe no GACO | **ADOTAR** |
| Workplace (Meta) | [não confirmado: a Meta anunciou o fim do Workplace em 2024] | **EVITAR como referência** citada ao dono |

### 1.13 Reações: exceção legítima à regra "zero emoji"?

**Fatos.** O LinkedIn tem seis reações nomeadas [confirmado]. O Teams trazia Curtir, Coração, Risada, Surpresa, Triste e Bravo; desde 2024 aceita qualquer emoji e até 5.000 emojis próprios por organização [confirmado]. O Slack deixa o admin escolher as três reações de um clique [confirmado]. Reação é signo consagrado de rede social e de chat de trabalho, e o dono pediu explicitamente "reações" na Home.

**A regra atual** (V4.6) proíbe emoji **como ícone da interface**. O livro já distingue as coisas: `iconeDoEmoji` traduz em ícone do kit o emoji que é **dado do cliente**. A regra mira a interface, não o que as pessoas escrevem.

**Três opções para o dono:**

| Opção | Como fica | Prós | Contras |
|---|---|---|---|
| A. Reação com ícone de traço + nome (recomendada) | Cinco reações fixas desenhadas no traço do sistema: Curtir (`thumbs-up`), Parabéns (`party-popper`), Amei (`heart`), Genial (`lightbulb`), Apoio (`hand-heart`) [medido]. No hover, o nome; na contagem, "12 · Ana, Bruno e mais 10". | Mantém a regra; fica com cara de GACO; os nomes seguem o LinkedIn, que o público conhece; imprime e se lê no escuro e no claro. | Não é "o emoji", e alguém vai pedir mais. |
| B. Emoji Unicode só na reação, conjunto fechado de 6 | Como o LinkedIn e o Teams antigo | Reconhecimento imediato | Emoji muda de desenho por sistema operacional (Apple, Google, Windows): a interface deixa de ser do GACO nesse ponto. Abre precedente. |
| C. Emoji livre (Slack, Teams 2024) | Qualquer emoji | Máxima expressão | Contradiz a regra e o "sólido, seguro". Vira ruído. |

**Recomendação:** A, na interface. Mais a regra explícita: **emoji digitado por uma pessoa dentro de uma mensagem ou publicação é conteúdo e aparece como a pessoa escreveu** (no chat do Suporte isso é inevitável: morador escreve com emoji). A interface nunca usa emoji; o conteúdo pode ter.

---

## 2. Uma identidade só, com módulos que imitam softwares diferentes

### 2.1 Como os grandes resolvem

| Suíte | O que é comum (casca) | O que é do domínio (miolo) | Fonte |
|---|---|---|---|
| **Odoo** | Três níveis fixos de menu (app switcher → barra do app no topo → ações); painel de controle igual em todo app (trilha, busca com filtros, seletor de visão Lista/Kanban/Calendário/Gráfico/Formulário no canto direito); formulário com **chatter** (mensagens + log) ao lado ou abaixo. | Os campos, as etapas e os relatórios de cada app. Vendas, Estoque e RH usam as **mesmas visões**. | [confirmado: 3 níveis de menu, chatter, seletor de visões] |
| **Microsoft 365** | Barra de apps à esquerda (Teams e Outlook, 2023–2024), cabeçalho, pesquisa, perfil. | Outlook = lista + leitura; Excel = grade; Teams = chat. | [confirmado: app bar à esquerda no Outlook e no Teams, fixar apps no rail]. **Contraexemplo:** o lançador (waffle) mudou de lugar em jan. e nov. de 2025 e voltou para o topo em 2026; apps novos (Loop, Places) nem têm lançador. A imprensa especializada chama o resultado de "experiência fragmentada" [confirmado]. Lição: casca que cada equipe muda por conta própria vira colcha. |
| **Zoho One** | Barra lateral unificada, apps fixados, recentes; desde 2025, "Spaces" (pessoal, organização, departamento) agrupam apps por papel e não pelo nome do produto. | Cada app com sua tela. | [confirmado] |
| **Google Workspace** | Lançador de apps em grade 3×3 no canto superior direito, avatar, busca no topo. | Gmail, Drive e Agenda com layouts próprios. | [confirmado: waffle 3×3 no topo direito; o resto da casca não foi confirmado nesta pesquisa] |
| **Salesforce** | App Launcher (waffle) + barra de navegação **do app atual** com abas; as abas dependem do app. | Registro com Path, listas, relatórios. | [confirmado] |

Padrão comum: **a casca é propriedade da plataforma e ninguém a toca; o miolo segue a convenção do domínio, mas é montado com as peças da plataforma.** O Odoo é o exemplo mais puro e o mais parecido com o GACO (ERP multi-módulo, muitas telas): tudo o que muda entre Vendas e RH são os dados, porque as visões são as mesmas.

### 2.2 A regra proposta: "Casca do GACO, gesto do mercado, traço do GACO"

1. **A casca é uma só e não muda por módulo:** trilho, cabeçalho global (busca, sino, ajuda, avatar), barra do módulo, trilha, título, lugar da ação principal (sempre no mesmo canto), seletor de visão (sempre no mesmo lugar), menu "⋯", comportamento de salvar, modais, toasts, estados vazios, tipografia e tokens. O white label troca **logo, nome e cor de ação**, e nada disso.
2. **O miolo pega emprestado o gesto e o arranjo do domínio:** conversa em balões (WhatsApp), funil com soma na coluna (Pipedrive), boletim por disciplina (portal do aluno), círculo de progresso (Linear), extrato por vencimento (Conta Azul), registro em três colunas (HubSpot).
3. **Todo signo emprestado é redesenhado com as peças do GACO:** o mesmo traço de ícone, as mesmas cores semânticas, o mesmo raio, a mesma fonte. Nunca a cor de marca do original (verde do WhatsApp, azul do Pipedrive, roxo do GitHub). Copia-se o **significado**, não a **aparência de marca**.
4. **Uma semântica de cor para o sistema inteiro** (§2.4). Um software de referência que usa outra cor para o mesmo sentido perde: o check de "lida" usa o azul de informação do GACO; o "concluído" é verde, mesmo no módulo que imita o GitHub.
5. **Um objeto, um signo, em todo o sistema.** Estrela = favorito. Alfinete = fixar no topo. Sino = notificações. Balão = conversa. Não pode haver estrela no Academy que significa "nota máxima".
6. **Um vocabulário de ação:** Criar, Salvar, Cancelar, Excluir, Arquivar, Atribuir, Mover para… Os verbos do domínio (Dar baixa, Conciliar, Reprovar, Marcar como ganho) entram só onde o domínio pede.
7. **As visões são do sistema e os módulos escolhem entre elas:** Lista, Quadro, Calendário, Cronograma, Conversa, Painel. Nenhum módulo inventa uma visão nova sem aprovação: é a regra de "modelo de página" que já existe, estendida.

**Dois testes para a revisão de cada tela:**
- **Teste da casca:** cubra o conteúdo. Dá para saber que é o GACO? Tem de dar.
- **Teste do miolo:** cubra a casca. Dá para saber o domínio (atendimento, funil, faculdade)? Tem de dar.

Se o primeiro falha, a tela fugiu da identidade. Se o segundo falha, a tela é genérica: é o "feito por IA" que o dono rejeita.

### 2.3 O que mais pode "descosturar" e como evitar

| Risco | Exemplo provável | Trava |
|---|---|---|
| Cada módulo com sua cor de destaque | Suporte verde WhatsApp, Comercial azul Pipedrive | A cor do módulo aparece só no ícone do trilho e no sublinhado da aba. Ação principal = cor de ação do cliente (white label). |
| Densidade diferente por módulo | Chat arejado, funil apertado | Densidade é preferência da pessoa (já existe 36/44/52), igual em todos. |
| Ícones de três bibliotecas | Lucide no menu, Material no chat, emoji na Home | Uma biblioteca (§4). |
| Termos repetidos com sentido diferente | "Negociações" no CS (contratos) e no Comercial (RD) | Glossário único (§5). |
| Modais de tamanhos diferentes | | Continua a regra de modal. |

### 2.4 Semântica única de cor de estado (proposta)

| Sentido | Cor | Exemplos em todos os módulos |
|---|---|---|
| Concluído, ganho, pago, aprovado, presente | Verde | Chamado resolvido, negócio ganho, boleto pago, disciplina aprovada |
| Atrasado, vencido, perdido, falhou, reprovado | Vermelho | Prazo vencido, boleto vencido, mensagem não enviada |
| Atenção, esfriando, pendente de alguém | Amarelo/âmbar | Negócio esfriando, saúde 51–75, aguardando cliente |
| Em andamento, informação, lida | Azul | Em atendimento, check duplo de "lida", sprint ativo |
| Rascunho, encerrado, arquivado, sem prioridade | Cinza | Campanha rascunho, chamado fechado |

Estado sempre com **palavra ou forma além da cor** (círculo do Linear, check, número). Sem roxo de "feito" (GitHub) nem vermelho de "rotting" (Pipedrive): o GACO escolhe e mantém. O livro já tem `COR_DO_STATUS` e a regra "cor de módulo nunca é estado" [confirmado no livro], e esta tabela a completa.

---

## 3. Navegação global: Modelo D contra as alternativas

### 3.1 O que o Modelo D é hoje (livro e menu-modelo-d.md)

Duas barras no topo: 48px (marca, prédio, sino, engrenagem, avatar) + 42px (11 grupos em texto e "Pesquisar página ⌘K"). Cascata grupo › bloco › telas por clique. Sem "Mais", sem rolagem horizontal. A ~1180px os rótulos perdem folga, a ~1100px a busca vira lupa, a ~900px o menu vai para a gaveta. O `Layout` guarda o histórico: "a primeira versão tinha menu lateral e outro cabeçalho; foi recusada (FD3)" [confirmado no livro]. **O dono já recusou um menu lateral uma vez**, e esta seção precisa enfrentar isso.

Tamanho real: CS tem 31 telas em 6 blocos, Cultura 29 em 5, Suporte 19, Marketing 21, Comercial 14 (contagem minha a partir da taxonomia do livro).

### 3.2 As quatro alternativas

| Critério | **D atual** (duas barras no topo + cascata) | **Lateral recolhível** (HubSpot 2024, Jira 2025, Zoho CRM 2025, Canvas) | **Launcher waffle** (Google, Salesforce, M365 no topo) | **Híbrido: trilho de módulos à esquerda + barra do módulo no topo** (Teams/Outlook app bar + Odoo/Salesforce nav bar) |
|---|---|---|---|---|
| Cabe 11+ módulos | No limite: a degradação existe porque não cabe. Cada módulo novo (ou nome maior dado pelo cliente) empurra para a gaveta. A NN/g diz que a navegação horizontal força "fontes menores, espaçamento apertado e rótulos artificialmente curtos, até que as categorias novas simplesmente não cabem" [confirmado via resumo da busca; página bloqueada] | Sim, sem limite prático. A NN/g: a vertical "acomoda quantos itens de primeiro nível forem necessários" [idem] | Sim (grade) | Sim: o trilho rola na vertical; 13 itens de 56px = 728px |
| Telas do módulo (até 31) | Cascata de 2 níveis, tudo escondido até clicar | Painel com blocos em acordeão, sempre visível | Launcher só troca de módulo; ainda precisa de menu do módulo | A barra do módulo mostra **só os blocos daquele módulo** (4 a 6 menus), cada um abrindo sua lista; é a cascata atual com um nível a menos |
| Largura útil (1366px) | Máxima: o menu não come coluna | Perde 240px aberto; 56–64px recolhido. O HubSpot tirou o menu fixo porque "ocupava espaço demais" e passou a vir recolhido, abrindo no hover [confirmado via busca] | Máxima | Perde 64–72px fixos. O Atendimento de 3 colunas continua cabendo |
| Celular | Gaveta | Gaveta | Grade em tela cheia | Gaveta com o trilho + blocos em acordeão (igual à gaveta de hoje) |
| White label | Logo pequeno no canto | Logo no topo da lateral | Logo no topo | Logo **quadrado** no topo do trilho, como o ícone do workspace no Slack [não confirmado] e do cliente no Zoho |
| Reconhecibilidade | Alta para quem usa ERP antigo e sites; baixa para quem usa CRM moderno | Alta em 2024–2026: HubSpot, Jira, Zoho CRM, Canvas e Superlógica passaram para a lateral [todos confirmados] | Alta como signo, mas é um passo a mais em todo trabalho | Muito alta para quem usa Teams e Outlook [confirmado] e Odoo |
| Indicadores (não lidas, atrasados) | Não há lugar natural | Contador ao lado do item | Não | **Contador no ícone do trilho**, como o Teams [confirmado]: "Suporte 4" |
| Descoberta do sistema inteiro | Boa: todos os grupos à vista | Boa | Ruim | Boa (ícone + rótulo curto embaixo) |
| Troca frequente entre módulos | 1 clique no grupo + 1 no bloco + 1 na tela | 1–2 cliques | 2 cliques, 3 com a tela | 1 clique no trilho (abre a última tela usada naquele módulo ou o início dele) |

### 3.3 Recomendação: híbrido "trilho + barra do módulo"

Resolvemos propor assim porque **Microsoft Teams e Outlook** (barra de apps à esquerda), **Odoo** (menu do app atual no topo, trocador de apps separado) e **Salesforce** (lançador + barra de navegação do app atual) já usam essa divisão, e **HubSpot (2024), Jira (2025) e Zoho CRM (2025)** migraram do topo para a esquerda pelo mesmo motivo que o GACO enfrenta: o topo não cresce. Enviamos para aprovação.

Desenho:

```
┌────┬───────────────────────────────────────────────────────────────┐
│LOGO│  [ Pesquisar em tudo…                ⌘K ]      ?  sino  avatar │  ← 48px, igual em todo o sistema
│cli.├───────────────────────────────────────────────────────────────┤
│    │ Suporte   Atendimento ▾   Canais ▾   Configuração ▾           │  ← barra do módulo: nome + blocos
│ ★  ├───────────────────────────────────────────────────────────────┤
│Iní.│  trilha › título                              [ação principal] │
│Sup4│                                                               │
│Com.│                         conteúdo                              │
│CS  │                                                               │
│... │                                                               │
│    │                                                               │
│ ⚙  │                                                               │
└────┴───────────────────────────────────────────────────────────────┘
 64–72px: ícone + rótulo curto embaixo (Teams); a ordem pode ser personalizada; contador de pendências
```

Regras:
1. **Trilho fixo de 64–72px**, ícone de 20px + rótulo de uma palavra embaixo (Teams, Material 3 navigation rail). Não recolhe para zero no computador. Não abre no hover (a mesma lição de 19/09 com a cascata).
2. **No trilho, só módulos a que a pessoa tem acesso.** Um atendente vê Início, Suporte, Academy, Cultura; o diretor vê tudo. A quantidade real por papel precisa ser medida no manifesto de acesso [não confirmado]. O Material 3 recomenda de 3 a 7 destinos no rail recolhido e o rail expandido acima disso [confirmado via busca]; quem passa de 9 ganha rolagem vertical no trilho, **nunca um "Mais"** (a regra do dono continua valendo).
3. **A pessoa fixa e reordena** (Teams: fixar no rail [confirmado]; Zoho: fixar apps [confirmado]; Odoo: arrastar apps [confirmado]). Favoritos (estrela) e Recentes ficam no topo do trilho, num ícone só.
4. **Barra do módulo** (42px) com os blocos do módulo atual como menus. É a cascata do Modelo D, mas só de um módulo: sai o nível "grupo" e o que fica cabe folgado em 1024px. Com mais de 8 telas, o bloco abre em lista com subtítulos.
5. **Configuração (engrenagem)** fica no pé do trilho, onde Teams, Slack e Zoho põem ajustes [não confirmado para Slack].
6. **Launcher "Todos os módulos"** não é necessário no trilho. O ⌘K já cumpre o papel de "achar qualquer tela", e o livro registra que achar tela pelo nome era a queixa nº 1 (issue #119).
7. **Celular (<900px):** o trilho some, e o hambúrguer abre a gaveta de hoje (módulos → blocos em acordeão, busca e Recentes no topo). No **portal do morador** (Sistema Externo), barra inferior com 4–5 destinos (Início, Boletos, Reservas, Chamados, Mais) [convenção de app móvel; não confirmado nesta pesquisa].
8. **O que o trilho ganha do Modelo D:** a marca volta a ter lugar grande e estável para o white label; contadores por módulo; um clique para trocar de módulo; o menu não depende do comprimento dos nomes que o cliente dá (o cliente pode renomear termos, e isso quebra a barra horizontal).
9. **O que ele perde:** 64–72px de largura; ver todos os grupos em texto numa linha, que era o motivo do Modelo D. Mitigação: rótulo embaixo de cada ícone, e não ícone sozinho.

**Duas variantes para o protótipo** (o dono pediu versões):
- **V1, híbrido** (recomendada, acima).
- **V2, lateral HubSpot/Jira**: trilho + painel de 240px com os blocos do módulo em acordeão, recolhível. Melhor descoberta, mas come largura: ruim para o Atendimento de três colunas e para o funil. Usar se o dono achar a barra do módulo "mais uma barra no topo".
- Manter o **Modelo D** como controle na comparação, para o dono ver lado a lado.

---

## 4. Iconografia

### 4.1 Hoje

O kit próprio (`componentes/icones/kit.tsx`, 95 ícones, aprovado em 25/09) substituiu o Lucide: traço 1,75, ponta quadrada, junção em quina, "nunca round", nome em português [confirmado no livro]. O `lucide-react` ainda está no `package.json`.

### 4.2 O problema do kit próprio diante do pedido desta rodada

"Usar signos que já existem para não gerar estranheza" vale para ícone mais do que para qualquer coisa. Um kit de 95 desenhos novos:
- ensina metáforas novas (o usuário tem de aprender o "prédio" do GACO, o "crachá" do GACO);
- não cobre o que vem (chat: responder, encaminhar, microfone, fixar, reação, check duplo; faculdade: capelo, boletim, presença); cada falta vira "desenhar e levar ao dono";
- um kit pequeno tende a reusar o mesmo desenho para coisas diferentes.

### 4.3 Comparação

| Biblioteca | Tamanho | Estilo | Onde o usuário já viu | Licença | Observação para o GACO |
|---|---|---|---|---|---|
| **Lucide** | 2.121 SVG no `lucide-static` 1.49.0 [medido; 1.780 segundo contagem de ago/2026 de terceiro, provavelmente sem aliases] | Traço 2px, grade 24, ponta **redonda** [medido] | Padrão do shadcn/ui, Linear-like, muita SaaS nova [não confirmado] | ISC [medido] | Já está no projeto. Tem tudo da §1 (conferido um a um). |
| **Tabler** | ~5.130 de traço + 1.054 preenchidos [confirmado] | Traço 2px, grade 24 | Painéis administrativos | MIT [não confirmado] | Maior cobertura; bom para lacunas. |
| **Phosphor** | 1.512 × 6 pesos (thin, light, regular, bold, fill, duotone) [confirmado] | Mais "amigável" | Apps de consumo | MIT [não confirmado] | O peso "fill" permite o signo "ícone cheio = ativo". |
| **Material Symbols** | 2.500 a 3.400+ [confirmado], fonte variável com eixos de preenchimento, peso, grau e tamanho óptico [confirmado] | Google | Android, Google Workspace | Apache 2.0 [não confirmado] | O mais reconhecido pelo público geral; cara de Google. |
| **Fluent System Icons** | 2.200+ distintos, regular e preenchido, tamanhos 12 a 48 [confirmado] | Microsoft | Teams, Outlook | MIT [não confirmado] | Cara de Microsoft. |

### 4.4 Recomendação

**Lucide como vocabulário base, com o acabamento do GACO por CSS, e kit próprio só para o que o mercado não tem.**

- Resolvemos fazer assim porque o **Linear, o shadcn/ui e boa parte das SaaS recentes** usam Lucide, e o **Teams e o Google** mostram que o usuário reconhece a metáfora ("check duplo", "clipe", "sino", "estrela"), não o traço. Enviamos para aprovação.
- **Identidade pelo acabamento:** o Lucide aceita `stroke-width` e `stroke-linecap`/`stroke-linejoin` por CSS. Com `stroke-width: 1.75; stroke-linecap: square; stroke-linejoin: miter` o GACO mantém o "traço quadrado" aprovado em 25/09 **e** usa desenhos que o mercado já ensinou. É preciso testar a 16 e 20px: os pontos do Lucide (caminhos de comprimento zero, como `M12 17h.01`) viram quadradinhos com ponta quadrada, e isso deve funcionar, mas não foi testado.
- **Estado ativo:** o Lucide não tem versão preenchida. No trilho, o ativo se marca com fundo tingido e o rótulo em negrito, e não com ícone cheio. Se o dono quiser o signo "cheio = ativo" do Teams [não confirmado nesta pesquisa], Phosphor é a alternativa (mesmo desenho, peso regular e fill).
- **Kit próprio só para o domínio de condomínio** que nenhuma biblioteca tem bem (rateio, portaria, assembleia com urna, unidade/apartamento), desenhados na grade do Lucide. O Lucide já tem `vote`, `gavel`, `concierge-bell`, `door-open`, `key-round`, `square-parking`, `building-2`, `hand-coins` [medido], então o kit próprio fica pequeno.
- **Evitar misturar bibliotecas.** Se faltar algo, Tabler é a mais próxima em grade e traço [não confirmado visualmente], mas só depois de tentar o Lucide.

### 4.5 Ícone por módulo (todos existem no Lucide 1.49.0 [medido])

| Módulo | Ícone | Signo universal | Por quê |
|---|---|---|---|
| Início | `house` | casa | Universal (Teams, Asana "Home", Canvas "Dashboard") |
| Marketing | `megaphone` | megafone | Campanha, anúncio |
| Comercial | `handshake` | aperto de mão | Negócio fechado. Alternativa: `funnel` (funil), mas o funil também é o ícone de "filtrar" em muitos sistemas, e isso daria conflito de signo |
| CS | `heart-handshake` | mão + coração | Relação com o cliente. Alternativa: `contact` |
| Projetos | `square-kanban` | quadro kanban | O signo do Trello/Asana |
| Produto | `package` | caixa | Produto/pacote. Alternativa: `rocket` (lançamento), mais "startup" |
| Desenvolvimento (bloco de Produto) | `code-xml` | `</>` | Universal para código |
| Suporte | `headset` | fone com microfone | Universal para atendimento. **Não** usar balão de conversa, que é o ícone de "Conversas" dentro do Suporte e dos comentários |
| Academy | `graduation-cap` | capelo | O signo de faculdade que o dono pediu |
| Financeiro | `wallet` | carteira | Alternativa: `landmark` (banco), mas `landmark` lembra prédio público |
| Operações | `wrench` | chave inglesa | Manutenção. Alternativa: `hard-hat` |
| Cultura | `users` | pessoas | Pessoas/RH |
| Relatórios | `chart-column` | gráfico de colunas | Universal |
| Configuração | `settings` | engrenagem | Universal |
| Notificações | `bell` | sino | Universal |
| Favoritos | `star` | estrela | Jira, Asana, navegadores |
| Busca | `search` | lupa | Universal |

---

## 5. Vocabulário consagrado

Critério: o termo que o software de referência **em português** usa, com a palavra do mercado brasileiro ganhando da tradução literal. Onde não confirmei o termo em português, marquei.

### 5.1 Termos a adotar

| Módulo | Use | Em vez de (hoje no menu) | Referência |
|---|---|---|---|
| Global | **Início** | (logo) | Asana "Home", Canvas "Dashboard" |
| Global | **Pesquisar** (⌘K) | "Pesquisar página" | "página" é jargão de quem fez o sistema |
| Global | **Notificações**, **Favoritos**, **Recentes** | | Jira "Starred/Recent" [confirmado] |
| Global | **Minhas tarefas** | "Minhas ações", "Minhas atividades" e "Minha central" (três nomes para a mesma ideia) | Asana [confirmado] |
| Suporte | **Conversas** (a fila de chat) | "Atendimento" como nome de tela | WhatsApp |
| Suporte | **Chamados** (o registro) | "Tickets" + "Chamados internos" + "Chamados sem cliente" | Um termo só; "interno" e "sem cliente" viram filtros. "Chamado" é o termo corrente no Brasil [não confirmado em fonte] |
| Suporte | **Respostas rápidas** | "Macros" | WhatsApp Business [confirmado em inglês: quick replies] |
| Suporte | **Etiquetas** | | WhatsApp Business "labels" [termo em português não confirmado] |
| Suporte | **Filas** | "Filas de atendimento" | Zendesk "views" |
| Suporte | Estados **Novo, Aberto, Pendente, Em espera, Resolvido, Fechado** | | Zendesk [confirmado em inglês] |
| Comercial | **Funil** (a visão) e **Negócios** (o objeto) | "Leads & Pipeline", "Pipeline" | Pipedrive/HubSpot em português "Negócios" [não confirmado]; RD Station usa **"Negociações"** e **"Funil de vendas"** [confirmado]. Decisão do dono: "Negócios" (curto; livra "Negociações" para o CS) ou "Negociações" (RD, mercado brasileiro) |
| Comercial | **Esfriando**, **Motivo da perda**, **Ganho / Perdido** | | RD Station CRM [confirmado] |
| Comercial | **Leads** | "Leads & Scoring" | O "&" sai de todo rótulo |
| CS | **Clientes**, **Saúde do cliente**, **Linha do tempo** | "Health score" | "Health score" só como nome técnico da métrica |
| CS | **Minhas ações** (fila de ações por regra) | "Cockpit/CTA" (Gainsight) | |
| Projetos | **Quadro, Lista, Cronograma, Calendário** | "Quadro de projetos", "Dashboard" | Trello/Asana |
| Projetos | **Tarefas, Responsável, Prazo, Marcos** | | |
| Produto/Dev | **Backlog, Sprint, Roteiro**, **Bug** | "Roadmap" | "Roteiro" ou manter "Roadmap": o público de dev fala roadmap [não confirmado] |
| Academy | **Cursos, Disciplinas, Turmas, Período letivo, Aulas e atividades, Mural, Pessoas, Notas, Boletim, Frequência, Histórico, Calendário acadêmico, Certificados, Biblioteca, Fórum, Pendentes** | "Trilhas", "Formações", "Academy Score", "Badges", "Ranking", "Minha central" | Portais brasileiros [confirmado: boletim, notas e frequências, grade horária, histórico, rematrícula]; Classroom [confirmado em inglês] |
| Cultura | **Mural, Comunicados, Reconhecimentos, Aniversariantes, Organograma, PDI, 1:1, Avaliação de desempenho, Vagas, Pessoas candidatas, Etapas** | "Time & perfis" | Feedz [confirmado: mural, comunicados, PDI]; Gupy [confirmado: pessoas candidatas, etapas] |
| Financeiro | **Extrato, Contas a receber, Contas a pagar, Conciliação, Fluxo de caixa, DRE, Categorias financeiras, Centros de custo, Boleto, Dar baixa, 2ª via** | "A receber", "A pagar", "Lançamentos", "Plano de contas" (o contador entende; o gestor, menos) | Conta Azul [confirmado] |
| Marketing | **Campanhas, Landing pages, Formulários, Segmentação, Fluxos de automação, Disparos de e-mail, Lead scoring**; estados **Rascunho, Agendada, Enviando, Enviada** | "Nutrição", "Segmentos" | RD Station Marketing [confirmado]; Mailchimp [confirmado em inglês] |
| Operações | **Ordens de serviço, Preventiva, Corretiva, Equipamentos, Áreas comuns, Reservas, Estoque, Compras** | "Manutenções" | CMMS [não confirmado]; Superlógica "reservas online" [confirmado] |
| Portal externo | **Boletos, 2ª via, Reservas, Assembleias, Comunicados, Documentos, Chamados** | | Superlógica, Área do Condômino [confirmado] |

### 5.2 Regras de vocabulário

1. **Um conceito, um termo, no sistema inteiro.** Hoje há colisões: "Assinaturas" em Comercial › Jurídico e em CS › Contratos; "Playbooks" em CS e em Produto; "Metas" em Comercial e em Cultura; "Aprovar comissões" em Comercial e em Financeiro; "Painel do gestor" em CS e em Academy; "Dashboard" em Projetos e em Operações; "Desenvolvimento" como bloco de Produto e como bloco de Cultura (PDI) [todos lidos na taxonomia do livro]. Atalho repetido em dois menus é permitido pelo livro, mas **nomes iguais para coisas diferentes não**: "Desenvolvimento" na Cultura vira "Carreira e desenvolvimento".
2. **Sem "&" e sem inglês onde o português do mercado existe.** Ficam em inglês só os termos que o mercado brasileiro usa assim: lead, landing page, backlog, sprint, bug, NPS, SLA, churn, PDI (sigla portuguesa).
3. **O cliente renomeia termos** (o sistema de termos com gênero já existe). O menu e a barra do módulo precisam aguentar o nome maior; é mais um argumento para o trilho vertical, que não quebra quando o rótulo cresce.

---

## 6. Resumo das propostas para o dono (formato pedido)

1. **Trilho de módulos à esquerda + barra do módulo no topo.** Resolvemos fazer assim porque Microsoft Teams/Outlook, Odoo e Salesforce usam essa divisão, e HubSpot (2024), Jira (2025) e Zoho CRM (2025) trocaram o menu do topo pelo lateral quando os módulos passaram a não caber. Enviamos para aprovação, com o Modelo D ao lado como controle.
2. **"Casca do GACO, gesto do mercado, traço do GACO."** Resolvemos fazer assim porque Odoo, Microsoft 365 e Zoho One mantêm a casca comum e deixam o conteúdo seguir o domínio; e o Microsoft 365 mostra o custo de deixar a casca variar (o lançador mudou de lugar duas vezes em 2025 e voltou em 2026). Enviamos para aprovação.
3. **Signos por módulo:** check duplo do WhatsApp, respostas rápidas com "/", soma na coluna do funil (Pipedrive), "esfriando" em amarelo (RD Station), registro em três colunas (HubSpot), saúde vermelho/amarelo/verde (Gainsight), círculo de progresso e barras de prioridade (Linear), boletim com frequência (portal do aluno), Mural/Atividades/Pessoas/Notas (Classroom), etapas de vaga em quadro (Gupy), extrato por vencimento (Conta Azul). Sempre com as cores e o traço do GACO.
4. **Reações com ícone de traço e nome** (Curtir, Parabéns, Amei, Genial, Apoio), no lugar de emoji; emoji digitado pelas pessoas é conteúdo e aparece como escrito. Resolvemos fazer assim porque LinkedIn, Teams e Slack consagraram a reação, e a regra do GACO proíbe emoji na interface, não no conteúdo.
5. **Lucide como base de ícones, com o traço quadrado do GACO por CSS**, e kit próprio só para condomínio. Resolvemos fazer assim porque o usuário reconhece a metáfora (sino, estrela, clipe, check duplo) que Linear, shadcn e as SaaS atuais ensinaram. Isso reverte em parte a decisão de 25/09 e precisa do sim do dono.
6. **Glossário único** (§5), acabando com as colisões de nome listadas em 5.2.

## 7. Pendências para confirmar antes de levar ao dono

- Nomes em português das reações do LinkedIn, dos filtros do WhatsApp e das abas do Google Classroom.
- Cores de atividade atrasada, de hoje e sem atividade no cartão do Pipedrive, e a área de soltar Ganho/Perdido (página de ajuda bloqueada pelo proxy).
- Quantos módulos cada papel realmente vê (manifesto de acesso), para dimensionar o trilho.
- Qual ERP inspirou o Modelo D (o livro não diz).
- Teste visual do Lucide com ponta quadrada a 16 e 20px, nos dois temas.
- Licenças de Tabler, Phosphor, Material Symbols e Fluent (só a do Lucide foi conferida).

## Fontes

- WhatsApp, tiques: https://techwhack.com/apps/whatsapp-ticks-meaning/ · https://getkanal.com/blog/whatsapp-read-receipts-blue-ticks-guide
- WhatsApp, filtros: https://about.fb.com/news/2024/04/whatsapp-chat-filters/ · https://9to5mac.com/2024/04/17/whatsapp-chat-filters/
- WhatsApp Business, respostas rápidas e etiquetas: https://gurusup.com/blog/whatsapp-quick-replies · https://whatsappbusiness.com/resources/resource-library/staying-organized-smb-using-lists-quick-replies/
- Zendesk, estados e layout: https://support.zendesk.com/hc/en-us/articles/8263915942938-About-the-ticket-lifecycle-and-ticket-statuses · https://support.zendesk.com/hc/en-us/articles/4408821259930-About-the-Zendesk-Agent-Workspace
- Pipedrive: https://support.pipedrive.com/en/article/pipeline-view · https://support.pipedrive.com/en/article/how-can-i-see-the-total-value-of-my-deals-by-stage-or-pipeline · https://solvaa.co.uk/how-to-use-the-pipedrive-rotting-feature-to-track-deal-inactivity-and-boost-conversions/ · https://support.pipedrive.com/en/article/lost-reasons
- RD Station CRM: https://ajuda.rdstation.com/s/article/Destacar-oportunidades-que-est%C3%A3o-esfriando-no-funil-de-vendas?language=pt_BR · https://www.rdstation.com/produtos/crm/ · https://developers.rdstation.com/reference/crm-v1-deals
- RD Station Marketing: https://ajuda.rdstation.com/s/article/Criar-Landing-Page-conversao-de-leads?language=pt_BR · https://www.rdstation.com/produtos/marketing/gestao-de-leads/segmentacao-de-leads/
- Mailchimp: https://mailchimp.com/help/about-campaign-manager/ · https://mailchimp.com/developer/marketing/api/campaigns/send-campaign/
- HubSpot, registro: https://knowledge.hubspot.com/records/work-with-records · navegação: https://product.hubspot.com/blog/new-hubspot-nav · https://www.airtrafficcontrol.io/en/blog/hubspot-new-navigation
- Salesforce Path e App Launcher: https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/aura-path.html · https://trailhead.salesforce.com/content/learn/modules/lightning-experience-for-salesforce-classic-users/navigate-around
- Gainsight: https://communities.gainsight.com/customer-success-cs-15/how-do-you-run-your-red-account-risk-customer-calls-4903 · https://www.oliv.ai/blog/gainsight-features
- Jira, tipos e navegação 2025: https://planyway.com/blog/jira-issue-types · https://community.atlassian.com/forums/Jira-articles/Jira-s-fresh-look-and-navigation/ba-p/2958737 · https://www.atlassian.com/software/jira/guides/navigation/overview
- Linear: https://linear.app/docs/configuring-workflows · https://linear.app/docs/display-options
- GitHub Primer: https://primer.style/octicons/usage-guidelines/ · https://github.blog/changelog/2021-10-26-updates-to-our-issue-status-icons-and-colors/
- Trello e Asana: https://support.atlassian.com/trello/docs/add-and-customize-cards-and-lists/ · https://help.asana.com/s/article/navigating-asana?language=en_US
- Canvas: https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-use-the-Global-Navigation-Menu/ta-p/618767 · https://infocanvas.upenn.edu/students/navigating-canvas/
- Moodle: https://docs.moodle.org/502/en/Activity_completion_settings · https://ucldata.atlassian.net/wiki/spaces/MoodleResourceCentre/pages/31863782/M11+-+Moodle+gradebook
- Google Classroom: https://support.google.com/edu/classroom/answer/9582544?hl=en · https://www.iorad.com/player/1702274/Google-Classroom---Stream--Classwork--People--and-Grade-tabs
- Portais do aluno: http://manual.unimestre.com/online.notasefrequencias · https://prg.usp.br/alunos-2/jupiter-web-em-videos/como-consultar-sua-grade-horaria/ · https://gwiki.gennera.com.br/index.php/Portal_do_aluno,_Aplica%C3%A7%C3%B5es_dispon%C3%ADveis
- Feedz: https://www.feedz.com.br/blog/plataforma-de-engajamento/ · https://www.feedz.com.br/blog/quem-e-a-feedz/
- Gupy: https://suporte.gupy.io/s/suporte/article/Pessoa-Gestora-Gestao-de-pessoas-candidatas-na-Gupy?language=pt_BR
- LinkedIn, reações: https://taplio.com/glossary/reactions · https://www.socialpilot.co/blog/linkedin-reactions
- Teams, reações e badge: https://techcommunity.microsoft.com/blog/microsoft365insiderblog/custom-emojis-and-reactions-in-microsoft-teams/4227332 · https://support.microsoft.com/en-us/teams/notifications-settings/catch-up-with-and-manage-badge-count-activity-in-microsoft-teams
- Slack, reações: https://slack.com/help/articles/360056881694-Manage-one-click-emoji-reactions-for-your-workspace-or-organization
- Conta Azul: https://ajuda.contaazul.com/hc/pt-br/articles/7961429901325-Conta-Azul-de-Bolso-Financeiro · https://ajuda.contaazul.com/hc/pt-br/articles/10216665657997-Lan%C3%A7amentos-financeiros-perguntas-frequentes
- Superlógica: https://superlogica.com/recursos/funcionalidades-condominios/ · https://condominios.superlogica.com/hc/pt-br/articles/360047451013-Como-utilizar-a-ferramenta-de-Atendimentos
- Microsoft 365, app bar e lançador: https://www.slipstick.com/outlook/outlooks-left-navigation-bar/ · https://office365.delaware.gov/2021/04/21/ntk-3650011-teams-pin-an-app · https://blog-en.topedia.com/2026/05/microsoft-365-and-the-app-launcher-inconsistency/
- Zoho One e Zoho CRM: https://www.zoho.com/blog/one/a-refreshed-zoho-one-experience.html · https://www.zoho.com/one/videos/save-time-with-the-zoho-one-universal-sidebar.html · https://help.zoho.com/portal/en/kb/crm/using-crm-for-everyone/zoho-crm-next-gen-ui/articles/why-switch-to-zoho-crm-s-new-ui
- Odoo: https://www.odoo.com/documentation/19.0/developer/tutorials/server_framework_101/05_firstui.html · https://www.odoo.com/forum/help-1/change-position-of-apps-in-switcher-121389
- Google, lançador: https://googleworkspaceguides.com/organize-your-workspace-how-to-customize-the-google-app-launcher/
- NN/g, navegação vertical: https://www.nngroup.com/articles/vertical-nav/
- Material 3, navigation rail: https://m3.material.io/components/navigation-rail/guidelines · https://github.com/material-components/material-components-android/blob/master/docs/components/NavigationRail.md
- Bibliotecas de ícones: https://dev.to/svgicons/lucide-vs-tabler-vs-phosphor-which-free-icon-set-fits-your-ui-4ocl · https://github.com/google/material-design-icons · https://icon-sets.iconify.design/fluent/ · lucide-static 1.49.0 (registry.npmjs.org)
