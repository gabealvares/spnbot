# A4 — Jornadas: o dia real de 7 perfis no GACO, os atritos e como deveria ser

Data: 30/09/2026 · Método: walkthrough cognitivo (a pessoa tem um objetivo, olha a tela, decide onde clicar, confere se deu certo) sobre o GACO **como está desenhado hoje**, lido nas fontes: `padrao-de-telas.md` (regras em vigor), `modelos-de-pagina.md` (7 modelos), `menu-modelo-d.md` + taxonomia do `livro-consolidado.txt` (menu real, 11 grupos + engrenagem), `home-aprovada.md`, catálogo F5 e auditoria de 28/09. Complementa a pesquisa A1 (fluxos em sistemas B2B), que eu reuso nas citações.

Como ler as contagens:
- **Cliques** conta clique ou toque que muda algo na tela (abrir menu, escolher item, abrir registro, salvar). Digitação não conta.
- **Telas** conta carregamento de página (o GACO é multipágina, R1/FD8: cada tela é uma página isolada, então toda troca é recarga completa).
- **Troca de contexto** é quando a pessoa sai do lugar onde estava trabalhando e precisa lembrar de voltar (outro módulo, outra aba do navegador, outro aparelho).
- **Severidade:** **Bloqueia** (a pessoa não consegue, erra de forma grave ou desiste) · **Atrapalha** (consegue, mas perde tempo ou se perde) · **Cosmético** (incomoda, não custa tempo).

Limite honesto: é simulação sobre a especificação e a taxonomia, não teste com usuário. Onde a tela ainda não existe, digo. Os números de cliques são o caminho mais curto que a pessoa acharia sem ajuda; o ⌘K ("Pesquisar página") encurta, mas quem usa o sistema há duas semanas não usa ⌘K.

---

## 0. O que o desenho atual impõe a todas as jornadas (as regras que geram os atritos)

Antes dos perfis, as seis regras que aparecem em quase todo atrito. Elas **podem** ser confrontadas (o dono autorizou nesta rodada).

| Regra atual | Efeito no dia a dia | Onde dói mais |
|---|---|---|
| **Menu Modelo D:** 11 grupos visíveis + cascata de 2 níveis; Suporte tem **16 telas num bloco só** e mais 3 em "Canais" | A pessoa escolhe entre portas parecidas (Atendimento, Tickets, Chamados internos, Chamados sem cliente, WhatsApp, E-mails recebidos) | Atendente, CS |
| **Lista só lista** (clique leva à página de detalhe, nada abre ao lado) | Todo item de fila custa ida e volta: lista → detalhe → lista, cada uma com recarga | Financeiro (conciliação), Vendedor (atividades), CS (alertas) |
| **Edição em página própria com barra fixa** (P11) e modal só até ~8 campos | Para mudar **um** campo (data de renovação, próximo passo, status) a pessoa sai do detalhe, abre a página de edição, salva e volta | CS, Vendedor |
| **Painel lateral só para auditoria** | Não existe "espiar" um registro sem sair da lista | Superadmin, Financeiro |
| **Paginação de 20** | Fila de 40 conversas ou extrato de 180 linhas vira 2 a 9 páginas | Atendente, Financeiro |
| **Home aprovada** com "Minha Central" (4 cartões com número e barra: Reuniões, Demandas, Tickets, Implantações), Meu Espaço, frase do dia, ações rápidas, comunicados | O "o que precisa de você" cobre **4 tipos** de coisa e deixa de fora boleto, cadência, férias a aprovar, curso obrigatório, renovação; os 4 cartões são KPIs com outro nome; ações rápidas "levam à tela onde está o + Novo" (dois passos, não um) | Todos |

E três lacunas que atravessam os perfis:
1. **Não existe caixa única de "o que precisa de mim".** Há Notificações (sino), Minha Central (Home), Minhas ações (CS), Minhas atividades (Comercial), Minha central (Academy), Meus projetos, Solicitações (RH). Sete "meus", sete lugares.
2. **Anexar arquivo não tem padrão.** Cada tela resolve (ticket, lançamento com anexos só leitura, solicitação de reembolso, chamado do portal). O ícone `i-arquivo` e `i-imagem` só entraram no kit em 28/09.
3. **Voltar para a lista filtrada** depende da query string (bom), mas não guarda rolagem nem linha em foco, e não há "próximo item" no detalhe.

---

## 1. Atendente de suporte (WhatsApp, e-mail e portal; ~40 conversas por dia)

**Quem é:** Juliana, 26 anos, atende síndicos e moradores de 38 condomínios da administradora. Trabalha com fone, dois monitores, 8 horas. Metade das conversas é "segunda via de boleto", "quando vem o técnico do portão" e "reserva do salão".

### Tarefas do dia
1. Abrir o turno e ver quem está esperando resposta (e há quanto tempo).
2. Responder conversa de WhatsApp com resposta pronta (segunda via de boleto) e anexar o PDF.
3. Transformar uma conversa em chamado de manutenção (portão da garagem do Cond. Parque das Águas) e passar para Operações.
4. Consultar quem é o morador e o histórico dele sem largar a conversa.
5. Responder e-mail do síndico que chegou pela caixa compartilhada.
6. Pedir ajuda a um colega (nota interna) sem o cliente ver.
7. Encerrar conversas resolvidas e pegar a próxima.
8. Fim do dia: conferir que não deixou ninguém sem resposta.

### Passos com o desenho atual

| Tarefa | Caminho hoje | Cliques · telas · trocas | Onde se perde |
|---|---|---|---|
| 1. Ver a fila | Home (não mostra conversas; "Tickets" da Minha Central conta só atribuídos e dá uma barra) → barra de menu **Suporte** → bloco Atendimento → escolher entre **Atendimento, Tickets, Chamados internos, Chamados sem cliente, Filas de atendimento, Painel do suporte** → Atendimento | 3 · 2 · 0 | Seis nomes que parecem a mesma coisa. "Canais › WhatsApp" também parece o lugar certo (e mostra "histórico paginado e envio manual", que **não** é a fila). |
| 2. Responder com resposta pronta + PDF | No `ModeloAtendimento` (fila, conversa, ficha): escolher conversa → digitar. "Macros" é uma tela separada no menu; não há regra de "/" no campo. O PDF do boleto está em Financeiro › A receber | 6+ · 3 · **2** (Financeiro e volta) | Vai ao Financeiro buscar o boleto, baixa, volta, anexa. A resposta pronta ela copia de um bloco de notas. |
| 3. Conversa vira chamado de manutenção | A decisão do dono diz que toda conversa já é chamado. Mas manutenção é **Operações › Manutenção › Manutenções**, outro objeto. Não há "Encaminhar para Operações" na conversa | 5 · 2 · 1 | Cria a manutenção em outra tela (modal ou página), copia o texto, volta e cola o número na conversa. Dois registros sem vínculo. |
| 4. Quem é o morador | A ficha à direita (320) mostra o contato. Histórico completo é "o detalhe clássico fica na ficha"; ver a unidade ou os boletos em aberto é outra tela (CS › Pessoas ou Financeiro) | 2–4 · 1–2 · 1 | Abre a pessoa numa aba nova do navegador e fica com 5 abas abertas no fim da manhã. |
| 5. E-mail do síndico | **Canais › E-mails recebidos** é outra tela; se a caixa não estiver ligada ao atendimento, o e-mail não aparece na fila | 3 · 1 · 1 | Duas filas: a de conversas e a de e-mails. |
| 6. Nota interna | Não está descrito no modelo de atendimento; o ticket tem "observadores" | — | Pede ajuda pelo WhatsApp pessoal do colega. A decisão fica fora do sistema. |
| 7. Encerrar e pegar a próxima | Mudar status (menu da conversa) → voltar à fila → escolher a próxima | 3 · 0 · 0 | Não há "Enviar e resolver"; não há "próxima". 40 × 3 cliques = 120 cliques só de encerramento. |
| 8. Conferir pendências | Filtro "sem resposta" na fila, paginação de 20 | 2 · 0 · 0 | Página 2 esquecida. |

**Total estimado do dia só em navegação:** ~350 cliques e ~25 trocas de contexto.

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| S1 | Seis portas para "o que tenho de responder" (Atendimento, Tickets, Chamados internos, Chamados sem cliente, WhatsApp, E-mails recebidos) | **Bloqueia** (conversa perdida porque ficou na porta errada) |
| S2 | Anexar o boleto exige ir ao Financeiro e voltar | **Atrapalha** |
| S3 | Resposta pronta ("Macros") é tela de cadastro, não atalho dentro da conversa | **Atrapalha** |
| S4 | Encaminhar para manutenção cria dois registros sem vínculo | **Bloqueia** (o morador pergunta "e aí?" e ninguém sabe onde está) |
| S5 | Sem "Enviar e resolver" e sem "próxima conversa" | **Atrapalha** |
| S6 | Sem nota interna na conversa | **Atrapalha** |
| S7 | Paginação de 20 numa fila viva | **Atrapalha** |
| S8 | Minha Central mostra "Tickets 12 · barra de críticos"; é número, não fila | **Cosmético** (mas ocupa a Home) |

### Fluxo ideal proposto
- **Uma porta só: "Conversas"**, primeiro item do grupo Suporte (e atalho na Home). Dentro, as filas salvas à esquerda: *Minhas*, *Sem dono*, *Esperando o cliente*, *Por canal (WhatsApp, E-mail, Portal, Chat do site)*. Tickets, chamados internos e e-mails **são filtros**, não telas. Intercom e Zendesk fazem assim: uma caixa, várias visões salvas (A1 §8.1).
- **Lista de conversas igual à do WhatsApp:** foto, nome, prévia da última mensagem, hora, contador de não lidas em badge sólido, e o tempo de SLA em texto ("responder em 12 min"). Rolagem contínua na fila (não 20 por página), porque fila é trabalho, não busca.
- **Campo de resposta:** digitar **/** abre as respostas prontas (como no WhatsApp Business); **clipe** abre um menu com *Arquivo do computador*, *Foto*, *Boleto deste morador* (lista os títulos em aberto da unidade, anexa o PDF e a linha digitável) e *Artigo da central de ajuda*. Alternar **Resposta | Nota interna** acima do campo; a nota fica amarela na conversa e aceita @menção (Front, Zendesk).
- **Botão de enviar com escolha de estado:** "Enviar" e, ao lado, seta com *Enviar e marcar resolvida* / *Enviar e aguardar cliente*. Depois de resolver, a próxima conversa da fila abre sozinha (preferência do usuário: ficar, voltar à fila ou próxima). Freshdesk "Send and set as", Help Scout "redirect options".
- **"Encaminhar para…"** no menu da conversa: *Manutenção (Operações)*, *Financeiro*, *CS do cliente*. Abre modal curto já preenchido (condomínio, unidade, descrição = mensagens selecionadas, fotos já anexadas). O registro criado fica **ligado** à conversa, e a conversa mostra "Manutenção #482 · Agendada para 02/10" atualizando sozinha. Zendesk "side conversations" e ServiceNow "create incident from interaction".
- **Ficha à direita com abas curtas:** *Pessoa* (unidade, papel: morador/síndico), *Boletos* (em aberto, 2ª via com um clique), *Chamados anteriores*, *Reservas*. Espiar sem sair.
- **Salvar:** não há "Salvar" no atendimento; tudo que se faz é uma ação que já grava (enviar, mudar estado, atribuir). Rascunho de resposta é guardado por conversa.
- **Voltar:** não se volta; a fila está sempre à esquerda. `Esc` fecha a conversa e deixa a fila em foco; `J/K` sobe e desce.

**Passos no fluxo ideal (tarefa 2):** abrir conversa (1) → "/" + escolher "2ª via" (1) → clipe › Boleto deste morador › escolher (2) → Enviar e resolver (1). **5 cliques, 0 telas novas, 0 trocas** (hoje: 6+ cliques, 3 telas, 2 trocas).

### O que ela precisa ver na Home de manhã
- No cartão dela: "**7 conversas esperando você**, a mais antiga há 38 min" com botão *Abrir conversas*. Uma frase, não um gráfico.
- Quem da equipe de suporte está online agora (avatares com ponto verde), para saber a quem pedir ajuda.
- No feed: aviso do gestor ("hoje o sistema de boletos do banco X está lento"), elogio que um síndico deixou na avaliação dela.

---

## 2. Gerente de CS com carteira de 60 administradoras

**Quem é:** Rafael, CS Sênior. Carteira de 60 administradoras (clientes do GACO), 11 renovam no trimestre. Faz 4 a 6 reuniões por semana, responde NPS detrator, acompanha implantações.

### Tarefas do dia
1. Ver quem da carteira piorou (health caiu, NPS detrator, chamado crítico, uso caiu).
2. Preparar a reunião das 10h com a Administradora Horizonte (histórico, contrato, chamados abertos, último NPS).
3. Registrar a reunião: ata curta, próximos passos, tarefa para ele e para o suporte.
4. Tratar um detrator de NPS (ligar, registrar o contato, fechar o ciclo).
5. Avançar uma renovação (mudar etapa, data prevista, valor proposto).
6. Mandar e-mail de acompanhamento para o cliente.
7. Fim do dia: conferir tarefas de amanhã.

### Passos com o desenho atual

| Tarefa | Caminho hoje | Cliques · telas · trocas | Onde se perde |
|---|---|---|---|
| 1. Quem piorou | CS tem **6 blocos e ~35 telas**. Candidatos: *Minhas ações*, *Alertas*, *Carteiras*, *Health score* (que é a tela de **pesos**, não a lista de saúde), *Jornada do cliente*, *Painel do gestor*, *Respostas NPS*. Ele abre Alertas, depois Respostas NPS, depois Carteiras | 9 · 3 · 0 | Três telas para montar uma lista na cabeça. "Health score" leva à configuração, não aos clientes. |
| 2. Preparar reunião | CS › Reuniões (agenda) → reunião → cliente (detalhe) → aba Contratos → aba Chamados (se existir) → NPS em outra tela | 7 · 4 · 1 | Cada aba é `?aba=`, mas NPS e chamados de suporte moram em outros módulos. |
| 3. Registrar reunião | Voltar à reunião → editar (página própria, P11) → salvar → criar tarefa (CS › Minhas ações › + Nova, modal) → criar pedido ao suporte (Suporte, outro módulo) | 10 · 5 · 2 | A ata e as tarefas ficam em três lugares. |
| 4. Detrator de NPS | CS › Voz do cliente › Respostas NPS → linha → detalhe → registrar contato (onde? no cliente, como interação?) → marcar tratado | 6 · 3 · 1 | Não está claro onde se "fecha o ciclo". |
| 5. Renovação | CS › Contratos › Renovações → linha → contrato (detalhe) → editar renovação (página própria) → salvar → volta ao detalhe | 6 · 4 · 0 | Três carregamentos para mudar uma data e um valor. |
| 6. E-mail | Fora do GACO (Gmail/Outlook). Não fica no histórico do cliente | 0 · 0 · **1** | O histórico do cliente fica incompleto. |
| 7. Tarefas de amanhã | Minhas ações + Minha agenda + Reuniões (três telas) | 4 · 3 · 0 | "Minha agenda" e "Reuniões" coexistem. |

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| C1 | Não existe uma **lista de trabalho** do CS: sinais (alerta, NPS, health, renovação) espalhados em 5 telas | **Bloqueia** (cliente em risco passa despercebido) |
| C2 | "Health score" no menu é a tela de pesos | **Atrapalha** (engano recorrente) |
| C3 | Ficha do cliente não junta o que é de outros módulos (chamados, NPS, uso, financeiro) | **Atrapalha** |
| C4 | Registrar reunião, tarefa e pedido ao suporte são três formulários em três lugares | **Atrapalha** |
| C5 | Editar 2 campos da renovação exige página de edição | **Atrapalha** |
| C6 | E-mail fora do sistema | **Atrapalha** |
| C7 | "Minha agenda" × "Reuniões" × "Minhas ações" | **Cosmético** a **Atrapalha** |

### Fluxo ideal proposto (CRM: HubSpot, Salesforce, Gainsight)
- **"Minha carteira"** como tela de entrada do CS: tabela das 60 administradoras com colunas fixas *Saúde* (ponto + palavra: Boa / Atenção / Risco, e a seta de variação), *Renova em*, *Último contato*, *Próximo passo*, *Dono*. Visões salvas no topo: *Precisam de mim hoje*, *Renovam em 90 dias*, *Detratores sem retorno*, *Sem contato há 30 dias*. É a "view" do Salesforce e a "Cockpit" do Gainsight: o CSM abre de manhã e trabalha a lista.
- **"Precisam de mim hoje"** é uma fila (como a task queue do HubSpot): cada item diz o motivo em uma frase ("NPS 3 de Carla, síndica do Cond. Solar, ontem") e a ação ("Ligar", "Registrar retorno"). "Concluir e ir para o próximo" carrega o próximo cliente sem voltar à lista.
- **Ficha do cliente em 3 colunas** (HubSpot): esquerda, dados-chave editáveis **no lugar** (lápis por campo, Enter salva, Esc cancela; Salesforce/Jira); centro, **linha do tempo única** (reuniões, e-mails, chamados do suporte, respostas de NPS, mudanças de contrato, notas), com o compositor no topo em abas *Nota · E-mail · Reunião · Tarefa*; direita, *Contratos*, *Contatos*, *Chamados abertos*, *Implantação*, *Pessoas envolvidas*.
- **Registrar reunião** a partir da própria reunião na linha do tempo: ata + "próximos passos" em lista; cada linha pode virar tarefa (para mim ou para alguém) e, se o responsável é do suporte, vira chamado interno ligado ao cliente. Um formulário, três resultados.
- **Renovação:** card "Renovação 2027" na coluna direita com etapa, data e valor editáveis ali mesmo (edição por seção, Fiori "partial edit in place"). Página própria só para a negociação completa (itens, descontos, aprovação).
- **E-mail** enviado de dentro (ou copiado por BCC para um endereço do cliente) cai na linha do tempo. HubSpot e Pipedrive fazem assim.
- **Salvar:** campo a campo (inline) para ajuste; nota e e-mail têm "Publicar"/"Enviar". **Voltar:** a trilha "Minha carteira › Adm. Horizonte" e o "3 de 11" com setas para o próximo cliente da visão.

**Passos no ideal (tarefa 5):** Minha carteira › Renovam em 90 dias (2) → cliente (1) → lápis em "Etapa" › escolher (2) → lápis em "Valor" › Enter (1). **6 cliques, 2 telas, 0 trocas**, e ele já está na ficha para anotar a conversa.

### O que ele precisa ver na Home
- No cartão dele: "**3 clientes precisam de você hoje**: Horizonte (reunião 10h), Cond. Solar (NPS 3), Adm. Prisma (renova em 12 dias)". Três linhas clicáveis, não quatro medidores.
- Agenda de hoje (as 2 reuniões) com botão *Preparar*.
- Feed: "Beatriz (Suporte) resolveu o chamado crítico da Horizonte" e o elogio que o cliente deixou. A equipe de CS com presença.

---

## 3. Vendedor (Comercial) com pipeline e cadências

**Quem é:** Marcos, vendedor. 45 oportunidades abertas, 3 cadências ativas (administradoras de médio porte, síndicos profissionais, indicação). Vive entre ligação, WhatsApp e proposta.

### Tarefas do dia
1. Executar as atividades de cadência de hoje (ligar, mandar e-mail, WhatsApp) em sequência.
2. Registrar o resultado da ligação e mover a oportunidade de etapa.
3. Montar e enviar proposta para a Administradora Vale Verde.
4. Receber lead novo vindo do Marketing (handoff) e fazer o primeiro contato em até 1 hora.
5. Agendar demonstração com o cliente.
6. Ver o que está parado há muitos dias no funil.
7. Passar o cliente fechado para o CS (handoff).

### Passos com o desenho atual

| Tarefa | Caminho hoje | Cliques · telas · trocas | Onde se perde |
|---|---|---|---|
| 1. Cadência do dia | Comercial › Ritmo de vendas › **Minhas atividades** (linha com "Feito" e "Pausar"). Bom. Mas para ligar ou escrever ele abre o lead/oportunidade (detalhe), lê, volta | por atividade: 4 · 2 · 1 (telefone/WhatsApp fora) | 25 atividades × ida e volta = 50 carregamentos. "Feito" não pede o resultado. |
| 2. Registrar e mover etapa | Oportunidade (detalhe) → + Atividade (modal) → salvar → mudar etapa: pelo Pipeline (kanban, arrastar) ou editar a oportunidade (página) | 6 · 3 · 0 | Duas ações separadas que na cabeça dele são uma: "liguei, ele quer proposta". |
| 3. Proposta | Comercial › Propostas → + Nova → escolher oportunidade (combo) → itens → gerar → enviar (e-mail fora?) | 8 · 3 · 1 | Proposta não nasce da oportunidade onde ele estava. |
| 4. Lead novo | Sino (se chegar notificação) ou Comercial › Leads → filtro "novos" | 3 · 1 · 0 | Não há alerta "chegou lead seu, 1 h para contato". |
| 5. Demonstração | Não há agenda do vendedor no Comercial (Reuniões é do CS; Agenda editorial é do Marketing) | — | Agenda no Google, fora do histórico. |
| 6. Parados | Pipeline (kanban) mostra cartões; "dias na etapa" não está no cartão | 2 · 1 · 0 | Olho a olho, coluna por coluna. |
| 7. Handoff | Comercial › Handoffs para o CS → + Novo | 4 · 2 · 1 | Não está no fluxo de "ganhar" a oportunidade. |

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| V1 | Atividade da cadência não carrega o contexto: ida e volta por item | **Atrapalha** (alto volume) |
| V2 | "Feito" sem resultado; registrar e mover etapa são passos separados | **Atrapalha** |
| V3 | Proposta não nasce da oportunidade | **Atrapalha** |
| V4 | Lead novo sem aviso com prazo | **Bloqueia** (lead esfria) |
| V5 | Sem agenda comercial | **Atrapalha** |
| V6 | Cartão do kanban sem "parado há X dias" | **Atrapalha** |
| V7 | Handoff fora do "Ganhar" | **Atrapalha** (cliente chega ao CS sem dados) |

### Fluxo ideal proposto (HubSpot, Pipedrive, Salesforce, RD Station CRM)
- **"Minhas atividades" vira fila de execução** (HubSpot task queue: "Iniciar fila", conclui e carrega a próxima). A tela mostra à esquerda a lista do dia e, à direita, o lead/oportunidade da atividade atual com histórico e botões *Ligar* (abre discador/WhatsApp Web com o número), *E-mail* (modelo da cadência já preenchido), *WhatsApp*. Aqui **"lista só lista" não serve**: é fila de trabalho, precisa de lista + detalhe lado a lado (Salesforce Split View).
- **Concluir pede o resultado em uma linha:** *Atendeu · Não atendeu · Pediu proposta · Sem interesse*. "Pediu proposta" já pergunta "Mover para Proposta?" (um clique). Pipedrive faz isso ao marcar atividade como feita (propõe a próxima atividade).
- **Oportunidade com botões de fase no topo** (a barra de etapas do Pipedrive/Salesforce "Path"): clicar na próxima etapa move; *Ganhar* e *Perder* à direita. **Ganhar** abre o handoff (modal curto: quem é o síndico/decisor, data de início, observações) e cria o cliente no CS.
- **Proposta nasce da oportunidade:** botão *Criar proposta* no cabeçalho da oportunidade → página de proposta com itens → *Enviar* (e-mail com link público de aceite, que já existe: proposta pública #329).
- **Lead novo:** entra no topo da fila com a etiqueta de prazo ("contatar em 42 min") e notificação push/sino. RD Station e HubSpot usam "lead rotation" com SLA.
- **Pipeline:** cartão mostra *dias na etapa* em texto quando passa do limite ("parado há 14 dias", em cor de atenção). Filtro rápido "Parados".
- **Salvar:** etapas e resultado gravam no clique; proposta tem rascunho automático e "Enviar". **Voltar:** a fila não se abandona; do Pipeline, a oportunidade tem "anterior/próxima" da coluna.

**Passos no ideal (tarefas 1+2, por atividade):** ver contexto já aberto (0) → Ligar (1) → resultado "Pediu proposta" (1) → "Mover para Proposta" (1) → próxima carrega sozinha. **3 cliques, 0 telas, 0 trocas** (hoje ~10 cliques e 5 carregamentos).

### O que ele precisa ver na Home
- No cartão dele: "**18 atividades hoje** · 1 lead novo esperando há 12 min" e o botão *Começar pela fila*.
- As reuniões/demos do dia.
- Feed: "Bruna fechou a Adm. Litoral" com reações (a vitória do colega é o que o time comercial comenta), aniversário de alguém do time. Sem ranking de vendas na Home (isso é tela de metas, para quem quiser).

---

## 4. Analista financeiro (boletos, a receber, conciliação)

**Quem é:** Patrícia, analista financeira da administradora. Cuida do contas a receber de 38 condomínios (taxa de administração) e do caixa da empresa. Faz conciliação diária de 3 contas bancárias.

### Tarefas do dia
1. Importar o extrato do dia (ou ver o que o banco mandou) e conciliar ~60 lançamentos.
2. Dar baixa em boletos pagos que não conciliaram sozinhos.
3. Emitir segunda via / renegociar um boleto vencido a pedido do suporte.
4. Cobrar os vencidos há mais de 5 dias (lista, e-mail/WhatsApp).
5. Lançar uma despesa com nota fiscal anexada.
6. Conferir o fluxo de caixa da semana.
7. Responder à pergunta do CS: "a Horizonte está em dia?"

### Passos com o desenho atual

| Tarefa | Caminho hoje | Cliques · telas · trocas | Onde se perde |
|---|---|---|---|
| 1. Conciliar | Financeiro › Operacional › Conciliação → escolher conta (obrigatório: `conta_id`) → Importar CSV (baixado do internet banking: **troca de contexto**) → cada linha: "conciliar no drawer" (painel lateral, que a regra reserva à auditoria e deveria sair) → escolher lançamento → confirmar | por linha: 3 · 0 · 0; por dia: 180 cliques, 3 contas × 2 trocas | Paginação de 20 num extrato de 60 linhas; ao converter o drawer para página (pela regra), cada linha viraria ida e volta: **inviável**. |
| 2. Baixa manual | Financeiro › A receber → filtrar → linha → baixa (modal) | 5 · 1 · 0 | Aceitável; mas não mostra a linha do extrato correspondente. |
| 3. Segunda via | A receber → buscar pelo condomínio → título → ação? (não descrita; boleto e remessa não aparecem no catálogo) | 4+ · 2 · 0 | Não há "Gerar 2ª via com juros até hoje" visível. |
| 4. Cobrança | A receber → filtro vencidos → exportar → e-mail/WhatsApp fora | 5 · 1 · **2** | Cobrança fora do sistema; o suporte não vê que já cobraram. |
| 5. Despesa com NF | Lançamentos → + Novo (drawer, vai virar página) → campos → anexo: "anexos são leitura" no detalhe | 8 · 2 · 0 | Não fica claro onde anexa a nota. |
| 6. Fluxo de caixa | Financeiro › Inteligência › Fluxo de caixa (painel, período na URL) | 2 · 1 · 0 | Bom. |
| 7. "A Horizonte está em dia?" | O CS pergunta no WhatsApp; ela abre A receber, filtra, responde | 4 · 1 · 1 | A ficha do cliente no CS não mostra a situação financeira. |

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| F1 | Conciliação é uma fila de pareamento; a regra "lista só lista" + "painel só auditoria" a quebra | **Bloqueia** (se a regra for aplicada literalmente) |
| F2 | Extrato por CSV manual, conta a conta | **Atrapalha** |
| F3 | Sem "sugestão de par" (mesmo valor, data próxima) em destaque | **Atrapalha** |
| F4 | 2ª via/renegociação sem ação clara | **Bloqueia** (o suporte depende dela) |
| F5 | Cobrança fora do sistema | **Atrapalha** |
| F6 | Anexo de NF sem lugar claro | **Atrapalha** |
| F7 | Situação financeira do cliente invisível para CS e Suporte | **Atrapalha** |

### Fluxo ideal proposto (QuickBooks, Conta Azul, Xero, Omie)
- **Conciliação em duas colunas lado a lado:** à esquerda o extrato (linhas "Para revisar", abas por conta bancária com a contagem), à direita o que o sistema acha que é o par: **"Sugestão: Boleto 0412 · Cond. Parque das Águas · R$ 1.850,00 · venc. 28/09"** com botão *Confirmar* (Enter). Sem sugestão: *Buscar lançamento* ou *Criar lançamento* (com categoria pré-preenchida pela regra). QuickBooks faz exatamente isso na aba "For review" (Match / Categorize, com "Suggested matches" de mesmo valor e data próxima); Xero e Conta Azul também. **Selecionar várias sugestões certas e confirmar em lote.**
- **Extrato automático** (Open Finance/API do banco ou arquivo OFX/CNAB de retorno arrastado para a tela). Arrastar arquivo é o gesto; o "Importar CSV" vira plano B.
- **Título a receber com ações no cabeçalho:** *2ª via* (recalcula juros e multa até a data escolhida, gera PDF, linha digitável e Pix copia-e-cola, e oferece *Enviar por WhatsApp/e-mail* ao contato do condomínio), *Renegociar* (página própria: parcelas), *Dar baixa*. Tudo registrado na linha do tempo do título, que o suporte e o CS também veem.
- **Régua de cobrança** (automática, D+1, D+5, D+15) com o envio registrado; a lista "Vencidos" mostra "último aviso: ontem por WhatsApp". Conta Azul e Asaas trabalham com régua.
- **Anexo:** zona "Arraste a nota fiscal aqui" no topo do formulário de lançamento; a NF (XML/PDF) preenche fornecedor, valor, data. Mesmo gesto em todo o sistema.
- **Situação financeira no CS:** o card "Financeiro" na coluna direita da ficha do cliente ("Em dia" / "2 títulos vencidos · R$ 3.700"). Ela deixa de responder no WhatsApp.
- **Salvar:** confirmar par grava na hora, com *Desfazer* no aviso de 5 s (confirmação modal em cada linha mataria o ritmo; NN/g prefere desfazer). **Voltar:** não sai da conciliação; o contador "42 de 60 conciliados" mostra o avanço.

**Passos no ideal (tarefa 1, por linha com sugestão):** conferir (0) → Enter (1). **Em lote: selecionar 40 sugestões (2) → Confirmar (1).** Hoje: 3 cliques por linha e 3 páginas.

### O que ela precisa ver na Home
- No cartão dela: "**58 lançamentos para conciliar** (Itaú 31, Bradesco 20, Caixa 7)" e "**4 pedidos de 2ª via** do suporte". Não "Recebido no mês: R$ 482.310" (isso é tela de fluxo de caixa).
- Feed: comunicado da diretoria sobre fechamento do mês; aniversário; a equipe financeira com presença.

---

## 5. Colaborador comum (Cultura/RH)

**Quem é:** Diego, assistente de operações. Usa o GACO pouco para trabalho de sistema, mas é "cliente" do RH e do Academy: férias, comunicados, reconhecimento, curso obrigatório. É o perfil que mais vai **odiar** o sistema se ele for difícil, porque entra raramente e esquece onde fica cada coisa.

### Tarefas (espalhadas no mês, mas simuladas num dia)
1. Ver e dar ciência no comunicado novo ("Nova política de home office").
2. Pedir férias de 15 dias em janeiro, vendo o saldo.
3. Reconhecer a colega que o ajudou na vistoria.
4. Fazer o curso obrigatório "LGPD no condomínio" até sexta.
5. Ver se o reembolso do Uber foi aprovado.
6. Atualizar o telefone no perfil.

### Passos com o desenho atual

| Tarefa | Caminho hoje | Cliques · telas · trocas | Onde se perde |
|---|---|---|---|
| 1. Comunicado | Home › Comunicados (coluna) → clicar → modal com texto → "Confirmar leitura" | 3 · 0 · 0 | **Bom.** Mas também existe Academy › Informativos ("quem leu"): dois lugares de "comunicado". |
| 2. Férias | Onde? **Cultura › RH › Férias** (saldo e calendário da equipe) **ou** **Cultura › RH › Solicitações** (férias, reembolso, viagem). Ele tenta Férias, vê saldo, não acha "Pedir"; vai a Solicitações → + Nova → tipo Férias → datas | 8 · 3 · 0 | **Duas portas**; o saldo está numa, o pedido na outra. Menu Cultura tem 5 blocos e ~30 telas para um usuário que usa 4. |
| 3. Reconhecer | Home › ação rápida "Reconhecer" → **leva à tela Reconhecimentos** (Cultura › Desenvolvimento) → + Novo (modal) → pessoa, categoria, texto → salvar | 5 · 1 · 0 | Dois passos onde se espera um. O reconhecimento não aparece no feed da Home. |
| 4. Curso obrigatório | Academy › Aprender › **Trilhas obrigatórias** (ou Minha central, ou Trilhas) → trilha → módulo → aula (player especial) → quiz | 6 · 4 · 0 | Três portas; não sabe o prazo nem quanto falta. |
| 5. Reembolso | Solicitações → filtrar "minhas" → linha → detalhe (thread de aprovação) | 4 · 2 · 0 | Sem notificação clara de "aprovado". |
| 6. Telefone | Avatar › Meu perfil (ou Cultura › Pessoas › Meu perfil) → editar | 3 · 1 · 0 | Ok. |

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| P1 | Férias: saldo numa tela, pedido noutra | **Atrapalha** (liga para o RH) |
| P2 | Menu completo de gestor de RH mostrado a quem só pede coisas | **Atrapalha** |
| P3 | "Reconhecer" da Home leva a uma lista, não ao formulário; reconhecimento não aparece no feed | **Atrapalha** (e mata o lado "rede social" que o dono quer) |
| P4 | Curso obrigatório sem prazo visível e com três portas | **Bloqueia** (perde o prazo, sem saber que havia) |
| P5 | Comunicados em dois lugares (Home e Academy › Informativos) | **Cosmético** |
| P6 | Status de pedido sem aviso ativo | **Atrapalha** |

### Fluxo ideal proposto (BambooHR, Gusto, Workvivo, Bonusly, Canvas)
- **"Eu" como destino único do autoatendimento**: avatar › *Meu espaço* com abas *Pedidos* (férias, reembolso, viagem, com estado de cada um), *Aprendizado* (cursos com prazo), *Perfil*, *Reconhecimentos*. BambooHR põe o widget de Time Off na Home, com botão "Request Time Off" e o saldo ao lado de cada tipo.
- **Pedir férias:** botão *Pedir férias* no cartão da Home e em Meu espaço. Abre **modal curto** (cabe na regra de 8 campos): calendário para escolher início e fim, saldo mostrado ao lado ("Você terá 15 dias disponíveis nessa data"), aviso se ficar negativo, quem está de férias da equipe no mesmo período (conflito), campo de observação. *Enviar pedido*. O gestor recebe e aprova no próprio aviso (BambooHR aprova pelo e-mail).
- **Reconhecer:** caixa "Reconhecer alguém" **no topo do feed** da Home, como "No que você está pensando?". Escreve @Aline, escolhe o valor da empresa ("Colaboração"), texto, *Publicar*. Vai para o feed com reações e comentários. Workvivo e Bonusly: o reconhecimento é um post do feed, ligado a um valor.
- **Curso obrigatório:** item no "o que precisa de você" com prazo ("LGPD no condomínio · até sexta · faltam 2 aulas") e botão *Continuar* que abre direto a aula onde parou. Canvas faz isso com a lista "To Do" do painel (itens com data de entrega).
- **Comunicado:** um lugar só (o feed), com *Li e estou ciente* quando o autor pede ciência; o Academy › Informativos vira a tela de **autor** (publicar e ver quem leu), não de leitor.
- **Menu por papel:** quem é só colaborador vê em Cultura só *Pessoas*, *Meu espaço* e *Reconhecimentos*; o resto (Cargos, Calibração, Nine-box) aparece para RH/gestor. Não é esconder funcionalidade; é não mostrar o que não se pode usar.
- **Salvar/voltar:** modal fecha e mostra o pedido no cartão ("Férias 06/01–20/01 · aguardando Carla"). Nada de página nova.

**Passos no ideal (tarefa 2):** Home › *Pedir férias* (1) → escolher datas (2) → *Enviar pedido* (1). **4 cliques, 0 telas, 0 trocas** (hoje 8, 3 telas e uma dúvida).

### O que ele precisa ver na Home
É a Home "rede social" em estado puro:
- Cartão dele: foto, nome, cargo, equipe; **"Para você"**: *Curso LGPD até sexta (2 aulas)*, *Comunicado novo pede sua ciência*, *Reembolso aprovado*. Botões *Pedir férias* e *Reconhecer*.
- Feed: comunicados, reconhecimentos com reações, aniversários de hoje, quem entrou na empresa, quem concluiu curso.
- Coluna da equipe: rostos com presença (online, em reunião, de férias até 10/10).

---

## 6. Síndico no portal do cliente, pelo celular

**Quem é:** Sr. Antônio, 64 anos, síndico do Cond. Parque das Águas (120 unidades). Usa o celular para tudo, letra grande, pouca paciência. Entra no portal da administradora (white label: marca dela, não do GACO).

### Tarefas
1. Abrir chamado: "infiltração na garagem, bloco B", com 3 fotos tiradas agora.
2. Ver e pagar o boleto da taxa (ou mandar ao morador que pediu).
3. Acompanhar a obra da fachada (projeto): em que fase está, próximas datas, fotos.
4. Ver a resposta do chamado aberto semana passada.
5. Assistir ao curso "Assembleia sem briga" que a administradora oferece.
6. Ler o comunicado da administradora sobre o reajuste.

### Passos com o desenho atual

| Tarefa | Caminho hoje | Toques · telas · trocas | Onde se perde |
|---|---|---|---|
| Entrada | Login → home do portal ("Comunicados da {marca}" e "Próximos passos") → menu na **gaveta do hambúrguer** (8 telas) | 2 · 2 · 0 | Hambúrguer escondido para quem não é nativo digital. |
| 1. Chamado com foto | ☰ → Chamados → "+ Novo" (o botão flutuante da v4 **não foi feito**; o botão está no cabeçalho empilhado) → formulário (modal ou página) → anexar: seletor de arquivo do navegador (dependendo do campo, sem "tirar foto") → enviar | 7 · 3 · 1 (galeria) | Formulário de desktop encolhido; campos que ele não entende (tipo, prioridade). |
| 2. Boleto | ☰ → Financeiro/Boletos → tabela vira cartões → abrir → PDF | 5 · 3 · 1 (leitor de PDF) | Para pagar no app do banco precisa da linha digitável ou do Pix; se só há PDF, ele digita 47 números. |
| 3. Obra | ☰ → Projetos → projeto → abas (detalhe com lateral indo para baixo) | 4 · 3 · 0 | Página longa; o que importa ("a próxima etapa é dia 15") está no fim. |
| 4. Resposta do chamado | Ninguém avisou (sem push/WhatsApp) → ☰ → Chamados → chamado | 4 · 2 · 0 | Ele liga para a administradora. |
| 5. Curso | Não está claro se o Academy abre no portal ("Treinamento por cliente" é tela interna) | — | **Não existe caminho.** |
| 6. Comunicado | Home do portal | 1 · 0 · 0 | Bom. |

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| E1 | Abrir chamado com foto no celular sem botão fixo e sem câmera direta | **Bloqueia** (desiste e manda WhatsApp) |
| E2 | Boleto sem linha digitável e Pix copia-e-cola com um toque | **Bloqueia** (o pagamento é a tarefa mais importante do portal) |
| E3 | Sem aviso de resposta (push, e-mail, WhatsApp) | **Atrapalha** |
| E4 | Obra em página longa de detalhe interno | **Atrapalha** |
| E5 | Curso sem porta no portal | **Bloqueia** (a funcionalidade não chega a ele) |
| E6 | Menu no hambúrguer | **Atrapalha** |
| E7 | Tipografia e alvos de toque de sistema interno (40px) para um público de 60+ | **Atrapalha** |

### Fluxo ideal proposto (TownSq, apps de banco, Nubank, iFood, Canvas Student)
- **Barra de abas no pé** (5 itens, ícone + palavra): *Início · Chamados · Boletos · Obras · Cursos*. É o que qualquer app de banco e o TownSq fazem; o síndico já sabe usar. Hambúrguer só para *Perfil* e *Sair*.
- **Botão "Abrir chamado"** grande e fixo na aba Chamados (e atalho na Início). Fluxo em **3 passos de uma pergunta cada**, como no app de banco: (1) *O que aconteceu?* com botões grandes de categoria (Infiltração, Portão, Elevador, Limpeza, Outro); (2) *Mostre para a gente*: botão *Tirar foto* (abre a câmera direto, `capture`) e *Escolher da galeria*, miniaturas com X; (3) *Onde?* (bloco/área, pré-preenchido com o condomínio dele) e descrição opcional, até com **áudio** (ele prefere falar). *Enviar*. Tela final: "Chamado nº 1.204 aberto. Você vai receber a resposta aqui e no WhatsApp." TownSq: categoria, descrição, anexos, "Adicionar".
- **Chamado como conversa** (o mesmo motor do atendimento, visto do lado do cliente): bolhas, fotos, "visto" e o estado no topo ("Técnico agendado para 02/10, 9h").
- **Boleto:** cartão por boleto com valor grande, vencimento, e **dois botões: *Copiar Pix* e *Copiar código de barras*** (aviso "Copiado"), mais *Baixar PDF* e *Compartilhar* (abre o compartilhamento do celular: WhatsApp do morador). Vencido: *Atualizar boleto* (gera 2ª via com juros até hoje). Apps de banco e o TownSq ("copiar o código de barras ou reenviar ao e-mail").
- **Obra:** tela de acompanhamento com linha de etapas no topo (Contratação ✔ · Andaimes ✔ · **Pintura em andamento** · Entrega 15/11), "o que acontece esta semana", galeria de fotos por data, e "Falar sobre esta obra" (abre conversa ligada ao projeto). É a lógica do rastreio de pedido (iFood, Correios): onde está e quando chega.
- **Cursos:** aba com os cursos que a administradora liberou; cada um com capa, duração, "continuar de onde parou" e certificado. Player com vídeo em tela cheia e legenda.
- **Avisos:** push (se instalado como PWA) e WhatsApp com link direto para o chamado.
- **Tamanho:** corpo 17–18px, alvos de 48px, contraste AA; densidade "confortável" já é regra do portal, falta aumentar.
- **Salvar/voltar:** nada de "Salvar": é *Enviar* no fim de cada fluxo. Voltar é a seta do celular/navegador; o rascunho do chamado fica guardado se ele sair no meio.

**Passos no ideal (tarefa 1):** *Abrir chamado* (1) → Infiltração (1) → Tirar foto ×3 (3) → Enviar (1). **6 toques, 1 fluxo, 0 trocas de app** (a câmera abre dentro).

### O que ele precisa ver na Início
- "Olá, Antônio · Cond. Parque das Águas" e a foto da administradora/gerente responsável ("Sua gerente: Carla, online").
- **O que é com você:** "Boleto de outubro vence em 5 dias · R$ 1.850 · *Copiar Pix*"; "Chamado 1.198 respondido"; "Assembleia em 20/10".
- Obra em andamento em uma linha ("Fachada: pintura, 60%"). Comunicado novo. Nada de indicador.

---

## 7. Superadmin da plataforma atendendo um cliente com problema

**Quem é:** Lucas, suporte da plataforma (equipe GACO). A Administradora Horizonte liga: "o boleto do Cond. Solar saiu com valor errado e o relatório de inadimplência não abre".

### Tarefas
1. Achar o cliente (tenant) e ver sua situação (plano, módulos, usuários, erros recentes).
2. Entrar no ambiente do cliente para ver o que ele vê.
3. Reproduzir o problema e olhar a auditoria do boleto.
4. Corrigir um parâmetro (com permissão) ou abrir demanda para o Produto.
5. Sair do cliente com segurança e registrar o atendimento.
6. Avisar o cliente.

### Passos com o desenho atual

| Tarefa | Caminho hoje | Cliques · telas · trocas | Onde se perde |
|---|---|---|---|
| 1. Achar o cliente | Home de plataforma "**inalcançável pelo clique**" (auditoria 28/09, A7) → engrenagem › Plataforma › Clientes da plataforma → buscar | 4 · 2 · 0 | Ele não sabe que a home de plataforma existe. |
| 2. Entrar no cliente | Ícone de **prédio** na barra → menu de troca → escolher a Horizonte | 3 · 1 · 0 | **O nome do cliente não aparece na barra** (regra revogada em 24/09). Depois de trocar, a tela é idêntica à de qualquer cliente. A Home diz "Boa noite, Suporte" e mostra e-mail interno (A7). |
| 3. Auditoria do boleto | Financeiro › A receber → buscar → título → botão de histórico (30×30) → painel | 6 · 2 · 0 | Bom, se ele lembrar em que cliente está. |
| 4. Corrigir / demanda | Corrige no cliente (sem motivo exigido) ou vai a Produto › Demandas (no tenant **dele**, o que exige trocar de volta) | 5 · 2 · **1** | Troca de tenant no meio; risco de criar a demanda dentro do cliente. |
| 5. Sair e registrar | Prédio → voltar à plataforma. Registro do atendimento: não há lugar | 2 · 1 · 1 | Nada liga a sessão ao chamado. |
| 6. Avisar | Fora (WhatsApp, e-mail) | 0 · 0 · 1 | — |

### Atritos
| # | Atrito | Severidade |
|---|---|---|
| A1 | Dentro do cliente não há sinal persistente de "você está no ambiente da Horizonte como suporte" | **Bloqueia** (risco real de alterar dado do cliente errado; LGPD) |
| A2 | Entrada sem motivo, sem prazo, sem aviso ao cliente | **Bloqueia** (confiança e segurança, que o dono pediu) |
| A3 | Home de plataforma inalcançável | **Atrapalha** |
| A4 | Saudação "Suporte" e e-mail interno vazando na Home do cliente | **Atrapalha** (não apresentável) |
| A5 | Sem ficha do cliente na plataforma (plano, uso, erros, sessões de suporte) | **Atrapalha** |
| A6 | Correção sem trilha ligada ao atendimento | **Atrapalha** |

### Fluxo ideal proposto (GitHub Enterprise, Salesforce "Log in as", Zendesk "Assume identity", Stripe Dashboard)
- **A plataforma é um lugar, não um item da engrenagem.** Quem é superadmin sem cliente ativo cai na Home de plataforma; com cliente ativo, o logo tem um menu "Voltar para a plataforma".
- **Ficha do cliente (tenant):** cabeçalho com nome, plano, módulos ligados, usuários ativos, saúde técnica (erros das últimas 24 h, jobs falhando, integrações com erro), e **linha do tempo** de sessões de suporte, chamados à plataforma e mudanças de configuração. Stripe e Vercel mostram eventos e logs por conta.
- **Entrar no cliente:** botão *Entrar como suporte* na ficha → modal: **motivo** (obrigatório, ou número do chamado), **modo** (*Só leitura* padrão / *Pode alterar*, que pede 2º fator), **duração** (30 min, renovável). GitHub Enterprise pede motivo, limita a 1 h e avisa o usuário por e-mail.
- **Faixa fixa no topo, sempre visível, na cor de alerta (não a do cliente):** "Você está na **Administradora Horizonte** como suporte · só leitura · 24 min restantes · *Sair*". A faixa não some, não fecha e aparece em toda tela. É o "Logged in as" do Salesforce e o banner do GitHub. Aqui a regra "sem nome do cliente na barra" **deve ter exceção**: para o superadmin, o nome é segurança, não decoração.
- **Home do cliente, vista pelo suporte:** não finge ser uma pessoa. Mostra "Suporte da plataforma" (marca configurável, já previsto no #285) e nenhum dado pessoal da equipe interna.
- **Auditoria:** toda escrita na sessão fica marcada "por Suporte da plataforma (Lucas) · sessão #88 · motivo: chamado 1.422", visível no histórico do registro pelo cliente.
- **Abrir demanda sem trocar de ambiente:** na faixa, *Registrar problema* abre modal que cria a demanda no Produto **da plataforma**, já com cliente, tela e URL, e liga ao chamado.
- **Sair:** *Sair* na faixa → volta à ficha do cliente, com a sessão resumida ("3 telas vistas, 1 alteração") e botão *Avisar o cliente* (e-mail/mensagem pronta).

**Passos no ideal (tarefas 1–2):** ⌘K "Horizonte" (1) → *Entrar como suporte* (1) → motivo + Entrar (2). **4 cliques, 1 tela, com o contexto sempre na faixa.**

### O que ele precisa ver na Home de plataforma
- "Chamados de clientes para a plataforma: **5 abertos**, 1 crítico (Horizonte)". Sessões de suporte ativas agora (quem está dentro de qual cliente).
- Clientes com erro técnico nas últimas 24 h (lista curta, com nome).
- Feed da equipe da plataforma (deploys, avisos, quem está de plantão). A equipe dele com presença.

---

## 8. Padrões que se repetem entre perfis

| Padrão | Quem sente | O que o desenho atual faz | O que deveria fazer | Quem já faz |
|---|---|---|---|---|
| **"O que precisa de mim"** | Todos os 7 | Sete "meus" em sete telas; a Minha Central da Home cobre só reuniões, demandas, tickets e implantações | **Uma caixa única** ("Para você") alimentada por todos os módulos: cada item é frase + prazo + ação. Aparece no cartão da Home, no sino e numa tela própria | Linear *My issues* e Inbox, GitHub Notifications, Gainsight Cockpit, Canvas *To Do* |
| **Trabalhar uma fila, item a item** | Atendente, CS, Vendedor, Financeiro | Lista → detalhe → lista, com recarga | **Modo fila:** lista à esquerda, item à direita, "concluir e ir ao próximo" | HubSpot task queue, Zendesk "Next ticket", QuickBooks *For review*, Help Scout |
| **Voltar para a lista** | Todos os internos | Query string guarda filtro; perde rolagem e posição; sem "próximo" no detalhe | Volta exatamente onde estava (filtro, página, rolagem, linha destacada); no detalhe, "3 de 11" com setas | Jira navigator, Dynamics record set, Gmail |
| **Anexar arquivo** | Atendente, Financeiro, Síndico, Colaborador (reembolso), CS (ata) | Cada tela do seu jeito | **Um componente:** arrastar e soltar em qualquer formulário/conversa, clipe com *Arquivo · Foto · Do sistema* (boleto, artigo, contrato), câmera direta no celular, miniatura com X | WhatsApp, Gmail, Slack, Google Drive |
| **Mudar um campo sem sair** | CS, Vendedor, Superadmin | Página de edição inteira | **Edição no lugar** (campo) ou **por seção** (card); página só para cadastro longo | Salesforce, HubSpot, Jira, Fiori "partial edit" |
| **Ver o contexto de outro módulo** | Atendente (boleto), CS (chamados, financeiro), Financeiro (quem é o cliente) | Abrir outra tela, outra aba | Card do outro módulo **dentro** da ficha (só leitura + 1 ação) | HubSpot associations, Salesforce related lists |
| **Uma coisa leva a outra** (conversa → manutenção; ligação → etapa; ganhar → handoff) | Atendente, Vendedor, CS | Criar em outra tela, copiar e colar, sem vínculo | Ação "Encaminhar/Converter" que cria o registro **ligado** e mostra o estado dele na origem | Zendesk side conversation, Pipedrive "próxima atividade", Salesforce convert lead |
| **Avisar a pessoa quando algo muda** | Síndico, Colaborador, Vendedor | Sino por intervalo; sem push/WhatsApp | Aviso no canal da pessoa (push, WhatsApp, e-mail) com link direto | BambooHR (aprovar pelo e-mail), iFood, bancos |
| **Pedir ajuda a um colega sem sair** | Atendente, CS, Financeiro | WhatsApp pessoal | Nota interna com @menção no registro | Front, Zendesk, Dynamics + Teams |
| **Ver quem está por perto** | Todos | Home mostra equipe (avatares), sem presença real | Presença (online, em reunião, de férias) nos avatares da equipe e nas menções | Slack, Teams |

---

## 9. Confronto com as regras atuais (propostas para o dono decidir)

| Regra hoje | Proposta | Prós | Contras | Quem faz assim |
|---|---|---|---|---|
| Lista só lista | **Manter para busca e consulta; abrir exceção "modo fila"** (lista + item lado a lado) para Conversas, Conciliação, Minhas atividades, Precisam de mim, Aprovações | Corta ida e volta nas telas de volume; o resto do sistema segue simples | Duas formas de lista para ensinar; notebook de 13" aperta | Salesforce Split View, QuickBooks, Zendesk, HubSpot |
| Edição em página própria com barra fixa | **Três níveis:** campo no lugar (1 campo), card/seção (2 a 8 campos), página (cadastro longo) | Ajuste rápido não sai do detalhe | Validação entre campos exige cuidado; precisa de "desfazer" | Salesforce, HubSpot, Fiori, Cloudscape |
| Painel lateral só auditoria | **Permitir "espiar"** (prévia só leitura, 480) a partir de qualquer menção a registro; edição continua fora dele | Consulta sem perder o lugar | Risco de o painel virar depósito de novo (por isso: só leitura) | Linear, GitHub (hovercard), Notion peek |
| Paginação de 20 | **20 para busca, rolagem contínua para filas e feed**, com contagem do servidor | Fila viva não se perde na página 2 | Rolagem contínua é ruim para "voltar ao item 137" (por isso não nas buscas) | Gmail (fila), Slack, Intercom |
| Modal 560, até ~8 campos | **Manter**, e usar mais: pedir férias, 2ª via, encaminhar, entrar como suporte, reconhecer | Tarefas curtas sem trocar de tela | — | Cloudscape, Dynamics quick create |
| Sem nome do cliente na barra | **Manter para o cliente; exceção obrigatória para o superadmin** (faixa fixa) | Segurança e LGPD | — | GitHub Enterprise, Salesforce |

---

## 10. A Home por perfil, em resumo (enxuta, humana, sem fileira de KPI)

Estrutura comum, três colunas no computador, uma no celular:

1. **Eu** (esquerda): foto, nome, cargo, equipe, status (disponível/em reunião/ausente, editável). Logo abaixo, **"Para você"**: 3 a 7 itens, cada um uma frase com prazo e botão de verbo. Número só dentro da frase ("7 conversas esperando você"), nunca em cartão com barra.
2. **Feed** (centro): caixa "Reconhecer alguém / Publicar" no topo; comunicados (com "Li e estou ciente" quando pedido), reconhecimentos, aniversários, entradas na empresa, conclusões de curso, vitórias do time. Reações e comentários.
3. **Minha equipe e meu dia** (direita): rostos com presença; agenda de hoje (reuniões com "Preparar"/"Entrar").

| Perfil | "Para você" (exemplos) | Botões do cartão |
|---|---|---|
| Atendente | 7 conversas esperando (a mais antiga há 38 min) · 2 notas internas mencionando você | Abrir conversas |
| CS | Horizonte: reunião 10h · Cond. Solar: NPS 3 sem retorno · Adm. Prisma renova em 12 dias | Minha carteira |
| Vendedor | 18 atividades hoje · 1 lead novo há 12 min · Proposta Vale Verde vista pelo cliente | Começar pela fila |
| Financeiro | 58 lançamentos para conciliar · 4 pedidos de 2ª via · 3 títulos vencem hoje | Conciliar |
| Colaborador | Curso LGPD até sexta · Comunicado pede ciência · Reembolso aprovado | Pedir férias · Reconhecer |
| Síndico (portal) | Boleto vence em 5 dias (Copiar Pix) · Chamado 1.198 respondido · Assembleia 20/10 | Abrir chamado |
| Superadmin | 5 chamados de clientes (1 crítico) · 2 sessões de suporte ativas | Buscar cliente |

Quem já faz uma Home assim: **Workvivo** (feed com notícias e reconhecimentos na abertura), **BambooHR** (Home com widgets pessoais: férias, pedidos, quem está fora, aniversários), **LinkedIn** (perfil à esquerda, feed no centro, sugestões à direita), **Canvas** (painel + To Do).

---

## 11. Dez princípios de usabilidade para o GACO

1. **Mostre primeiro o que precisa da pessoa, não o que o sistema sabe.** Ao entrar, a pessoa vê uma lista curta de coisas a fazer, em frases, com um botão cada. Número solto em cartão não diz o que fazer. *Quem faz: Linear (My issues, ordenado por urgência) e Gainsight Cockpit.*
2. **Uma porta para cada trabalho.** Se duas telas parecem servir para a mesma coisa, uma delas vira filtro da outra. "Conversas" é uma tela; WhatsApp, e-mail e portal são filtros. *Quem faz: Intercom e Zendesk (uma caixa, várias visões).*
3. **Quem trabalha em fila não volta para a lista.** Terminou um item, o próximo aparece. *Quem faz: HubSpot ("Complete and move to next"), Zendesk ("Next ticket"), QuickBooks (For review).*
4. **Mudar pouco é mudar no lugar.** Um campo se edita ali mesmo; um grupo de campos, no próprio card; só o cadastro longo vai para outra página. *Quem faz: Salesforce e HubSpot (lápis por campo), SAP Fiori (edição por seção).*
5. **Voltar é voltar exatamente para onde estava.** Mesmo filtro, mesma página, mesma rolagem, a linha que abriu destacada, e setas para o anterior e o próximo. *Quem faz: Gmail, Jira (navegador de issues).*
6. **Uma coisa leva à outra sem copiar e colar.** Conversa vira manutenção, ligação move a etapa, venda ganha vira cliente do CS, e o registro novo fica ligado ao de origem. *Quem faz: Salesforce (converter lead), Pipedrive (próxima atividade ao concluir), Zendesk (side conversation).*
7. **Anexar é sempre o mesmo gesto.** Arrastar, clipe ou câmera, em qualquer lugar, com miniatura e X para tirar. *Quem faz: WhatsApp, Gmail, Slack.*
8. **O cliente final usa como usa o banco no celular.** Abas no pé, botão grande para a ação principal, passos de uma pergunta, "Copiar Pix" com um toque, aviso no WhatsApp quando algo muda. *Quem faz: Nubank e apps de banco, TownSq, iFood (acompanhar pedido).*
9. **Gente antes de número.** A Home mostra quem sou, quem está comigo e o que o time fez; reconhecer um colega é tão fácil quanto postar. Indicador fica nas telas de gestão, para quem vai decidir com ele. *Quem faz: Workvivo, Bonusly, LinkedIn, Slack (presença).*
10. **Quem entra na casa dos outros usa crachá.** Suporte dentro do cliente tem faixa fixa com o nome do cliente, motivo, prazo e registro de tudo que fez; o cliente vê quem mexeu. *Quem faz: GitHub Enterprise (motivo, 1 h, aviso por e-mail), Salesforce ("Logged in as"), Zendesk ("Assume identity").*

---

## 12. Prioridade sugerida (pelo peso dos "Bloqueia")

| Ordem | O que | Resolve |
|---|---|---|
| 1 | Faixa do superadmin + entrada com motivo e prazo | A1, A2 |
| 2 | Boleto no portal com Pix/linha digitável copiáveis + 2ª via no Financeiro | E2, F4, S2 |
| 3 | Caixa única "Para você" (alimenta a Home e o sino) | C1, P4, V4 e a Home de todos |
| 4 | "Conversas" como porta única + encaminhar com vínculo | S1, S4 |
| 5 | Chamado com foto em 3 passos no celular + abas no pé do portal | E1, E6 |
| 6 | Modo fila (conciliação, atividades, carteira) | F1, V1, C1 |
| 7 | Edição no lugar/por seção | C5, V2 |
| 8 | Cursos no portal e prazo do obrigatório | E5, P4 |

---

## Fontes consultadas nesta pesquisa (além das citadas na A1)

- HubSpot, *Use task queues*: https://knowledge.hubspot.com/tasks/use-task-queues · INSIDEA, *How to run task queues in sequence*: https://insidea.com/blog/hubspot/kb/how-to-run-task-queues-in-sequence-in-hubspot/
- QuickBooks, *Match your bank and credit card transactions*: https://quickbooks.intuit.com/learn-support/en-us/help-article/bank-feeds/match-online-bank-transactions-quickbooks-online/L6qyw0PvP_US_en_US · *Categorize online bank transactions*: https://quickbooks.intuit.com/learn-support/en-us/help-article/banking/categorize-match-online-bank-transactions-online/L1bTafTz3_US_en_US
- BambooHR, *Request Time Off*: https://help.bamboohr.com/hc/en-us/articles/360052355912-Request-Time-Off · *Approving Time Off in the Mobile App*: https://help.bamboohr.com/hc/en-us/articles/227183827-Approving-Time-Off-in-the-Mobile-App · *View Time Off Balances in the Mobile App*: https://help.bamboohr.com/hc/en-us/articles/227183767-View-Time-Off-Balances-in-the-Mobile-App
- TownSq, *2ª via do boleto*: https://ajuda.townsq.com.br/kb/article/170047/gestao-assistida-townsq-2-via-do-boleto-do-meu-condominio · *Registros de serviço*: https://blog.townsq.com.br/townsq/townsq-registros-de-servico/
- Gainsight, *Use Cockpit to Manage Daily Routine*: https://support.gainsight.com/gainsight_nxt/04Cockpit_and_Playbooks/00Cockpit_Horizon_Experience/User_Guides/Use_Cockpit_to_Manage_Daily_Routine_(Horizon_Experience)
- Canvas (To Do do painel): https://support.franklin.edu/hc/en-us/articles/360041679973-How-to-Use-Canvas-Dashboard-for-Students · https://sas-lps.freshdesk.com/support/solutions/articles/42000092946-canvas-to-do-list-calendar-canvas-notification-preferences-for-students
- WhatsApp, *How to use quick replies*: https://faq.whatsapp.com/1791149784551042/
- Workvivo, *Recognition*: https://support.workvivo.com/hc/en-gb/articles/4918068265757-Recognition · Bonusly, *Recognition*: https://bonusly.com/product/recognition
- Linear, *My issues*: https://linear.app/docs/my-issues · *Notifications*: https://linear.app/docs/notifications · GitHub, *Viewing and triaging notifications*: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/viewing-and-triaging-notifications
- Da A1 (reusadas): Zendesk Agent Workspace, Intercom Inbox, Front, Help Scout, Freshdesk, Salesforce Split View e "Log in as", GitHub Enterprise impersonation, Zendesk "Assume identity", SAP Fiori (edição por seção), Cloudscape (criar/editar), Dynamics (record set, quick create), NN/g (confirmação × desfazer).

Nota de método: as páginas acima vieram do buscador (trecho devolvido por ele); não abri todas na íntegra. Confirmar no navegador antes de citar literalmente em documento de aprovação.
