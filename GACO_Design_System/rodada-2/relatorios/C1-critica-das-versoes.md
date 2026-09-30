# C1: crítica independente das três versões (rodada 2)

Data: 30/09/2026. Papel: diretor de UX e design contratado de fora, sem autoria em nenhuma das versões.
Base: BRIEFING.md, PROTO-BRIEF.md, A3 (tabela-resumo e §7), A4 (§8 a §12), A5 (§2, §3, §6), a skill frontend-design, as capturas em `shots-v1/`, `shots-v2/` e `shots-v3/` e a leitura do código dos três HTML (tokens, contraste, white label, acessibilidade).
Limite: as fontes do Google não carregaram nas capturas da V3 (aparece DejaVu) e parte da V1. Julguei a tipografia pelo que está declarado no CSS e não contei a fonte substituta como defeito.

Severidade: **Bloqueia** (a pessoa erra, desiste, ou o pedido do dono não é cumprido), **Atrapalha** (custa tempo ou gera dúvida), **Cosmético**.

---

## Veredito em cinco linhas

1. Nenhuma das três versões serve inteira. Cada uma acertou uma coisa que as outras erraram.
2. **A V1 (Livro-Caixa)** é a que mais cumpre o que o dono pediu, tela por tela: Home de rede social, Academy de faculdade, CS de CRM, signos que a pessoa reconhece. O ponto fraco é a identidade: é quieta demais e, pelo papel claro com títulos em serifa, fica perigosamente perto do padrão "feito por IA" número 1.
3. **A V2 (Casa de Máquinas)** é a melhor ferramenta de operação (Suporte e CS) e a única que respeita a decisão de 24/09 sobre o Modelo D. Mas a Home virou fila de trabalho, não rede social. A plaqueta em mono aparece em toda linha e vira excesso de etiqueta, e no sistema interno o cliente quase não vê a própria marca.
4. **A V3 (Azulejo)** tem a identidade mais memorável e o white label mais convincente. Por outro lado, é a que mais decora (capa de azulejos, cartões com estampa, caixas coloridas), troca ícones consagrados por glifos abstratos, volta ao menu lateral largo que o dono já recusou (FD3) e não entregou a ficha de CS pedida.
5. Recomendo juntar as partes (seção 6): a estrutura e a Home da V1, o motor de Suporte da V2, a carteira da V3 com a ficha da V1 e da V2, e uma única assinatura visual.

---

## 1. Tela por tela

### V1, Livro-Caixa (clara, trilho de módulos de 72px com a barra do módulo no topo)

| Tela | O que funciona | O que não funciona (severidade) | Atende o pedido? |
|---|---|---|---|
| **Home** | Arranjo do LinkedIn que qualquer pessoa reconhece: perfil à esquerda, feed no centro, equipe e agenda à direita. Publicador "Reconhecer alguém ou publicar". Comunicado com "Li e estou ciente" que vira carimbo "Ciente, Letícia Araújo, 30/09/26 09:12" (ótimo: a ciência vira um registro, e isso transmite segurança). Reconhecimento com o valor da empresa. Reações com ícone e nome. "Para você" com 5 itens, cada um com prazo e um verbo ("Abrir conversas", "Revisar"). Presença escrita ("Em atendimento, 3 conversas", "De férias até 10/10"). Nenhum KPI. | A coluna esquerda é estreita: "Coordenadora de / Relacionamento" quebra em 2 linhas e os itens de "Para você" em 3 ou 4, então o bloco mais útil fica o mais apertado (**Atrapalha**). Nome da pessoa e título do comunicado em serifa num contexto social deixam a tela com cara de jornal (**Cosmético**). Os três painéis brancos com o mesmo filete produzem o efeito de "cartões iguais" (**Cosmético**). | **Sim.** É a mais próxima de "enxuta e humana, quase rede social". |
| **Suporte** | Tem o que se espera do WhatsApp Web: lista com avatar, prévia, hora e contador, bolhas, foto, áudio com onda, tiques. Faixa do chamado ("Chamado 4.812, Aberto, Responder até 10:42, Responsável") logo acima da conversa, o que resolve "a conversa já é o chamado". "/vi" filtra as respostas rápidas. O "Enviar ▾" mostra o efeito de cada opção ("Estado vai para Pendente; o SLA pausa"). Estados Novo/Aberto/Pendente/Resolvido em controle segmentado, no desenho do Zendesk. "Ligados a este chamado" (OS 482). Ficha que se fecha e devolve largura à conversa. | O painel direito gasta cerca de 230px com avatar gigante e carimbo "Protocolado", e isso é selo decorativo (**Atrapalha**: tira espaço do SLA e dos vínculos, que são o que a atendente consulta). Na captura, as respostas rápidas e o "Enviar ▾" aparecem abertos ao mesmo tempo e cobrem o alternador Responder/Nota interna (**Cosmético**, é o estado de demonstração, mas esconde uma peça-chave). Não há atalhos de teclado visíveis nem ordenação por SLA na lista (**Atrapalha** para quem atende 40 conversas por dia). A bolha enviada leva 11% da cor do cliente: na Órbita fica rosada, parecida com erro (**Cosmético**). | **Sim**, com o WhatsApp como motor. Falta densidade de operador. |
| **CS** | É a ficha mais fiel ao HubSpot: três colunas (dados à esquerda, atividade no centro, associações à direita). Barra de etapas no desenho do Salesforce Path, com "há 12 dias nesta etapa" e "Avançar para Renovado". "14 de 63" com setas. Lápis por seção e um campo em edição com "Antes: R$ 4.380,00. Reajuste de 5,48% pelo IGP-M" (excelente, mostra o que muda). A barra de salvar só aparece com alteração e diz "1 alteração não salva em Contrato de administração: valor mensal". "Salvar ▾" com "Salvar e ir para o próximo: 15 de 63, Residencial Jardim Botânico". A dupla sublinha no total mensal fica discreta e diz algo de verdade. | Não há cabeçalho de campos-chave (plano, renovação, NPS) no alto, e a pessoa precisa descer até "Saúde do cliente" (**Atrapalha**, pouco). "Saúde 62 Atenção" com ponto âmbar ficou pequena para ser o dado principal da conta (**Cosmético**). O histórico de alterações está atrás de um ícone de relógio, e o pedido era "histórico sempre visível" (**Atrapalha**). | **Sim**, no molde dos CRMs. |
| **Academy** | É um portal do aluno de faculdade de verdade: curso, matrícula, "3º período de 4", coeficiente, período letivo 2026.2, disciplinas com professor, turma, carga horária, frequência com mínimo marcado, N1, N2, parcial e situação ("Risco por falta" em vermelho com palavra). Grade da semana com "hoje". Calendário acadêmico com Entrega, Prova e Feriado. Histórico escolar em PDF e certificado com código de verificação. Avisos da professora e da coordenação. Sem ranking e sem medalha. | Não há entrada visível para a sala da disciplina (materiais, fórum, atividades). É o boletim, não o lugar onde se estuda (**Atrapalha**: o colaborador precisa descobrir onde clicar para fazer o trabalho que vence 03/10). O certificado em carimbo repete a assinatura pela terceira vez na tela (**Cosmético**). | **Sim, é a mais "faculdade" das três.** |
| **Portal (boleto)** | Boleto com Pix em cima e "Copiar código Pix" grande, linha digitável, PDF, compartilhar, composição do valor e aviso "Código Pix copiado. Cole no app do seu banco". Abas no rodapé como num app de banco. O ajuste automático de contraste da cor do cliente (escurece até 4,5:1 e mostra o valor) é a melhor solução técnica de white label das três. | Título "Boleto de outubro" e valor em serifa: bonito, mas lembra fatura de papel, não app de banco (**Cosmético**). Com a Sol Nascente, a cor escurecida fica marrom-alaranjada e passa a competir com o âmbar de "atenção" (ver §3) (**Atrapalha**). Não mostra o caminho do chamado com foto, e o síndico faz as duas coisas (a opção era permitida pelo brief, então conta só como **Cosmético**). | **Sim.** |

### V2, Casa de Máquinas (grafite e latão, tema claro e escuro, Modelo D refinado no topo)

| Tela | O que funciona | O que não funciona (severidade) | Atende o pedido? |
|---|---|---|---|
| **Home** | "Para você" como caixa única com abas (Tudo 6, Menções, Aprovações, Prazos) e ação no item (Recusar/Aceitar a troca de plantão, "Li e estou ciente"), no molde do monday My Work e do Linear Inbox. É o melhor "Para você" das três. "4 itens concluídos hoje" recolhidos. Equipe com presença escrita e o motivo ("Consulta médica, volto às 11h"). Status pessoal "Na fila do WhatsApp até 18h". Mural com ciência, reconhecimento, aniversário e boas-vindas. | O centro da Home é uma lista de tarefas, e o feed social fica numa coluna de 380px à direita. **Não é "quase rede social"**, é uma caixa de entrada com mural ao lado (**Bloqueia** o pedido do dono). "Bom dia, Beatriz" como título é saudação de template (**Cosmético**). As plaquetas em mono dentro de frases ("pediu `• Bl A Ap 804 •` 18/10") quebram a leitura (**Atrapalha**). | **Parcialmente.** Enxuta e sem KPI, mas a parte humana ficou em segundo plano. |
| **Suporte** | É o melhor motor de atendimento das três. Filas Minhas/Sem dono/Aguardando/Todas com contagem, ordenação "SLA mais curto", filtro por canal, "Responder em 6 min" na linha, transcrição do áudio, abas Resposta/Nota interna, "Enviar e depois" que lembra a última escolha e tem a opção "Depois de resolver, abrir a próxima da fila", tarefas do chamado, histórico, abas Chamado/Pessoa/Boletos/Anteriores (o boleto do morador ao lado da conversa resolve a atendente, A4) e barra de atalhos J/K/R/N/E/A. | São plaquetas demais: cada linha da lista, o cabeçalho, o local ("Subsolo 1", "Vaga 37", "Vaga 38") e o histórico. Nos nomes longos o mono trunca ("Parque das Águas, Bl B…") (**Atrapalha**). O rodapé "Hoje: 23 atendidas, tempo médio de 1ª resposta 4 min" é um KPI que entrou pela porta dos fundos (**Cosmético**, mas o dono vai ver). A linha selecionada e a nota interna usam o mesmo tom de latão claro (**Cosmético**). | **Sim**, é a mais operacional. |
| **CS** | Cabeçalho de campos-chave no desenho do Salesforce (Saúde, Plano, Mensalidade, Renovação "em 106 dias", Condomínios, Último NPS, Responsável). É um painel de destaque de registro, não uma fileira de KPIs. Path com "O que a etapa pede" (a orientação de etapa do Salesforce), edição por campo com "Era (11) 3456-7788. Enter confirma, Esc desfaz" e linhas alteradas marcadas. Barra de salvar com "2 alterações não salvas", "Salvar ▾" com atalhos, histórico do cliente sempre visível na coluna direita. "14 de 63" com J e K. | O inquilino do cabeçalho é "Administradora Alpha" e o cliente da ficha também é "Administradora Alpha" (tema claro). O protótipo mistura quem é a administradora com quem é o cliente dela, e o dono vai perguntar (**Atrapalha**, e expõe uma dúvida de escopo, ver §7). O Path inteiro em latão confunde a etapa atual com "atenção" (**Cosmético**). | **Sim**, e é a ficha de CRM mais completa. |
| **Academy** | Página da disciplina no desenho do Canvas: menu do curso (Página inicial, Avisos, Módulos, Atividades, Notas, Pessoas, Fórum, Biblioteca, Plano de ensino), semanas no desenho do Moodle com caixa de conclusão, "Próxima entrega" com "Continuar entrega" e rubrica, notas por avaliação com peso, frequência com a marca de 75%, professora e tutora com presença, calendário acadêmico. | Mostra só o interior de uma disciplina e não o "portal do aluno" (período, todas as disciplinas, grade, histórico, certificado). A dimensão de faculdade fica escondida (**Atrapalha**). O botão "Continuar entrega" em latão é a única cor forte e compete com o aviso da professora (**Cosmético**). | **Sim**, no nível da disciplina. Fraco no nível do curso. |
| **Portal (chamado com foto)** | O fluxo inteiro em 3 telas: Início com "Abrir chamado" grande e cartões de boleto, reservas, assembleia e comunicados; "Novo chamado" com tipo em botões, fotos com X, local com vaga, uma frase, "há risco" como chave; confirmação com número, prazo ("responde em até 30 minutos, aqui e no seu WhatsApp") e linha do tempo no desenho do iFood. "Acompanhar pelo WhatsApp". É o portal mais bem pensado. | A plaqueta mono aparece até para o síndico ("• #48213 •"). Para o morador é ruído (**Cosmético**). Os 4 cartões da Início são idênticos (**Cosmético**). No tema escuro da Vértice, o vinho do cliente fica colado ao vermelho de "atrasado" (§3). | **Sim.** |

### V3, Azulejo (clara, cobalto, menu lateral de 240px)

| Tela | O que funciona | O que não funciona (severidade) | Atende o pedido? |
|---|---|---|---|
| **Home** | A Home é a página do grupo, como no Workplace: nome da equipe, "Equipe de 14 pessoas… Gestora: Juliana Reis", fileira de rostos com "9 disponíveis agora". Publicador com "Reconhecer alguém / Publicar comunicado / Foto", reconhecimento com título ("Resolveu com calma o que era urgente") e comentários como numa rede social. "Para você" à direita com verbo e prazo ("Esfriando há 12 dias"). É a mais "rede social" em tom e texto. | A faixa de 130px de azulejos no topo é um hero decorativo: não informa nada e ocupa a área mais nobre da tela (**Atrapalha**, e é sinal de IA). O reconhecimento também leva estampa de azulejo (decoração repetida). Aniversários e chegadas ficam abaixo da dobra (**Atrapalha**). O perfil de quem está logado fica à direita e pequeno, e o pedido era "quem está logado e os dados dele" em evidência (**Cosmético**). | **Sim no conteúdo, não na forma.** O humano está lá, mas a capa decorativa fala mais alto. |
| **Suporte** | Etiquetas coloridas e filtro por etiqueta no desenho do WhatsApp Business ("Manutenção", "Aguardando boleto", "Novo cliente", "Reserva"), que é o signo que o atendente de administradora usa hoje. Faixa do chamado com SLA, "Outros chamados de Marina", saúde do condomínio ao lado. O alternador Lista/Quadro com o quadro por estado (Kommo e RD Conversas), "Em espera" com o SLA pausado e um estado vazio que diz o que fazer. | Com 240px de menu, a conversa fica com cerca de 520px: bolhas estreitas, e a foto e o áudio competem por espaço (**Atrapalha** para 40 conversas por dia). Filtros em chips com losangos coloridos, "+2", são o excesso de etiquetas que o dono listou (**Atrapalha**). A etiqueta "Assembleia" em losango vermelho usa a cor de erro (**Atrapalha**). Não há ordenação por SLA nem atalhos. O quadro arrastável é mais uma forma de trabalhar a fila, e isso é bom para o gerente, mas custa para a atendente (**Cosmético**). | **Sim**, e é o WhatsApp mais reconhecível. Custa largura. |
| **CS** | Carteira como tabela editável com visões salvas ("Precisam de mim hoje 7", "Renovam em 90 dias 11", "Sem contato há 30 dias 4"), próximo passo obrigatório com "Definir próximo passo", "esfriando" no desenho do RD Station, edição na célula e barra de salvar só com alteração. Prévia à direita com "14 de 63". É a melhor forma de trabalhar a carteira (A4, gerente de CS). | **Não entregou a ficha do cliente** com lápis por seção, que o brief pedia. A prévia é só leitura e remete a uma "ficha completa" que não existe no protótipo (**Bloqueia** o item do brief). Duas caixas coloridas seguidas na prévia ("Esfriando há 12 dias" amarela e "Sem próximo passo" com borda vermelha) são o sinal "caixa de nota colorida" (**Atrapalha**). Nomes e próximos passos truncados em quase todas as linhas ("Cond. Bosque Imp…", "Apresentar laudo do ele…") (**Atrapalha**). | **Parcialmente.** Carteira excelente, ficha ausente. |
| **Academy** | Três telas: Minhas turmas em cartões no desenho do Google Classroom, com o que vence em vermelho; Mural da turma com aviso fixado e ciência "24 de 28 alunos"; Atividades por unidade com Entregue/Atrasada/Pendente e nota. Boletim e calendário acadêmico ao lado. | O Classroom é a sala de aula do ensino básico, não a faculdade: faltam carga horária, período do curso, grade horária, histórico e certificado na primeira tela (**Atrapalha** o pedido "baseado em faculdade"). Seis cartões idênticos com estampa são o "kit de cartões iguais" (**Cosmético**, ainda que seja o signo do Classroom). | **Parcialmente.** Mais escola que faculdade. |
| **Portal (boleto)** | Boleto com o valor grande, "Vence em 10 dias" com palavra, composição, Pix e linha digitável, aviso de cópia e abas no rodapé. A faixa de azulejos na cor do cliente faz o portal parecer da administradora sem perder o GACO. | Os botões são duplos e grandes, a linha digitável tem o mesmo peso do Pix e a hierarquia fica achatada (**Cosmético**). A faixa de azulejos repete o hero (**Cosmético**). | **Sim.** |

**Transversal à V3:** os ícones de módulo viraram glifos abstratos (quartos de círculo e meias-luas). Com o menu aberto, o rótulo salva a leitura. **Com o menu recolhido (3b-cs-menu-recolhido.png) ninguém sabe o que é cada quadrado**, e isso contraria o pedido de signos consagrados (**Bloqueia** no modo recolhido). O menu lateral de 240px é o arranjo que o dono já recusou uma vez (FD3, citado em A5 §3.1). O único tema é o claro, e os operadores usam hoje o escuro por padrão.

---

## 2. Teste "parece IA ou template?"

O código das três está limpo das marcas mais fáceis: nenhuma usa caixa alta, "→" em botão, "A · B · C", gradiente ou emoji na interface. O que sobra é de composição.

| Versão | Sinal restante | Onde |
|---|---|---|
| **V1** | Fundo papel `#F5F5F0` com títulos em serifa (Source Serif 4): é o padrão 1 da skill (fundo creme com serifa de contraste), só sem o terracota | Títulos de página, nome na Home, "Boleto de outubro", valor no portal |
| V1 | Carimbo de filete duplo como selo, repetido | Suporte ("Protocolado" sob o avatar), Academy (certificado), Home (ciência). Na Home ele se justifica; no painel do Suporte é selo decorativo |
| V1 | Painéis brancos iguais, com o mesmo filete, lado a lado | Três colunas da Home; blocos da Academy |
| V1 | Avatar gigante sem função | "Dados do chamado", Suporte |
| **V2** | Fundo quase preto `#121517` com um único acento quente (latão): é o padrão 2 da skill, atenuado porque o latão não é neon | Tema escuro inteiro, que é o padrão da operação nesta versão |
| V2 | Mono em rótulo pequeno, com "parafusos" decorativos (• •) | Plaquetas em toda linha de lista, dentro de frases, no portal do síndico. Onde é identificador de protocolo (#48213, OS 482, CT-2024-0187) se justifica. Em "Vaga 37", "Subsolo 1" e "Bl B Ap 1204" no meio do texto, vira ornamento |
| V2 | Excesso de etiquetas | Local do chamado com 3 plaquetas empilhadas; histórico com plaqueta; lista de conversas com plaqueta em todas as linhas |
| V2 | Saudação de template | "Bom dia, Beatriz" como título da Home e "Bom dia, Marina" no portal |
| V2 | Número de desempenho escondido | Rodapé do Suporte ("Hoje: 23 atendidas, tempo médio…") |
| **V3** | Hero decorativo | Faixa de azulejos da Home (130px), capa do Mural da turma, faixa do portal, faixa sob o logo do menu |
| V3 | Cartões idênticos com estampa | "Minhas turmas" (6 cartões iguais) |
| V3 | Caixa de nota colorida | Prévia do CS ("Esfriando…" amarela, "Sem próximo passo" vermelha); estado vazio do quadro com azulejo grande |
| V3 | Chips em excesso | Filtros do Suporte (losangos coloridos, "+2"), etiquetas em toda linha |
| V3 | Tipografia exagerada | Bricolage Grotesque, a fonte de destaque mais usada por geradores em 2024–2026; negrito em abas, botões, filtros e rótulos ao mesmo tempo, sem hierarquia |
| V3 | Ícone inventado no lugar de signo | Glifos de módulo |

Qual parece menos template: **V2** na operação (quem vê a plaqueta lembra dela, e ela nasce do assunto, o condomínio físico) e **V1** na Home e na Academy. A **V3** é a mais autoral e, ao mesmo tempo, a que mais parece peça de apresentação de estúdio, porque a assinatura aparece em lugares onde não informa nada.

---

## 3. Teste de white label

Pergunta: trocando a marca, a pessoa ainda reconhece o GACO? E onde a cor do cliente colide com as cores de sistema?

| Versão | A identidade continua reconhecível? | Onde a cor do cliente entra | Conflitos encontrados |
|---|---|---|---|
| **V1** | **Sim, mas por pouco.** O que fica do GACO (papel, tinta, filetes, carimbo, dupla sublinha, serifa nos títulos) é discreto. Com três marcas diferentes, a tela muda pouco e o GACO só aparece para quem já o conhece. | Logo do trilho, botão principal, bolha enviada (11%), topo e botão do portal. Ajuste automático de contraste com o valor exibido, a melhor solução técnica. | **Órbita `#7A2E3A`** × tinta de estorno `#B42318`: botão "Enviar" vinho ao lado de "SLA vencido" vermelho, e a bolha enviada fica rosada. **Sol Nascente `#E08A1E`**, escurecida para 4,5:1, vira marrom-alaranjado e encosta no âmbar de atenção `#8A5A00`: o topo do portal inteiro fica com cara de aviso. **Alpha `#0E5E6F`** (petróleo) × verde-livro `#1E6B45`: botão principal e "pago" próximos em tom. No tema escuro o ajuste só mede o contraste contra o texto branco, não contra o fundo, e o botão escurecido perde borda no grafite. |
| **V2** | **Sim, com folga.** Latão, plaqueta e grafite não mudam com o cliente. | Faixa de 3px no topo e logo, no sistema interno. No portal, o topo, o botão grande e a etapa concluída. O latão continua como cor de ação no sistema interno. | O problema é o oposto: **o cliente quase não se vê no sistema interno.** Para uma administradora que paga pelo white label, 3px e um quadradinho são pouco. O dono disse que "o white label representa marca e cores", então isto contraria o espírito. **Vértice `#7A2E3A`** × atrasado `#B0352A` no portal (topo e "Enviar chamado" vinho). **Lar `#2F6B3F`** × concluído `#1D774C`. O latão `#C99D48` fica perto do "atenção" `#EB8A3C` do tema escuro e confunde o ativo com o alerta. |
| **V3** | **Sim, pela forma.** A grade de azulejos continua reconhecível em qualquer cor, e é o melhor teste de casca das três. | Estampa de azulejos (capa, faixa, portal), botão principal, contadores, bolha enviada, marcador ativo. | **Alpha padrão = cobalto `#1A3DB8`**, que também é o azul de estado "em andamento" e a cor da família Gestão: um só hex com três sentidos. **Prisma `#8E2344`** colore os contadores do menu, que passam a parecer alertas ao lado do vermelho `#C02A1D`. **Horizonte `#0E6B5C`** × garrafa `#12804F` (verde de estado e família Relação). Os glifos de módulo em ocre, garrafa e cobalto são fixos, e com a cor do cliente a moldura chega a quatro ou cinco matizes. É a versão mais cara de manter: cada marca nova precisa ser conferida contra três famílias e quatro estados. |

**Regra que vale para qualquer combinação:** a cor do cliente nunca pinta contador, estado, etiqueta ou bolha, e o sistema precisa recusar ou deslocar uma cor de cliente que fique a menos de uma distância mínima (ΔE) das cores de estado. Nenhuma das três faz esse segundo teste; a V1 faz só o de contraste.

---

## 4. Usabilidade por perfil

| Perfil | Melhor versão | Por quê | Onde as outras falham |
|---|---|---|---|
| **Atendente (40 conversas por dia)** | **V2** | Ordenação por SLA, "Responder em 6 min" na linha, J/K e atalhos visíveis, "enviar e abrir a próxima" lembrado, transcrição do áudio, boleto do morador numa aba ao lado, tarefas do chamado. Largura útil máxima (menu no topo). | V1 é boa, mas sem atalhos nem ordenação por SLA, e o painel direito desperdiça espaço. V3 perde uns 170px para o menu e enche a lista de chips. |
| **Gerente de CS (carteira de 60)** | **V3 na carteira + V1 ou V2 na ficha** | A carteira da V3 (visões salvas, célula editável, próximo passo obrigatório, "esfriando", prévia com "14 de 63") é o jeito certo de trabalhar 63 contas. A ficha da V2 (campos-chave no topo, Path com orientação, histórico sempre visível) e a da V1 (HubSpot, "Antes: R$ 4.380,00") são as melhores para mexer em uma conta. | V3 não tem a ficha. V1 e V2 não mostram a carteira. |
| **Colaborador comum** | **V1** | Feed no centro, "Reconhecer" e "Pedir férias" à mão, comunicado com ciência que vira registro, agenda do dia, Academy de portal do aluno que mostra onde ele está no curso. | V2 abre numa lista de tarefas, o que é bom para operador e frio para quem só quer saber da empresa. V3 é humana, mas a capa decorativa empurra o que interessa para baixo. |
| **Síndico no celular** | **V2 para o chamado; V1 para o boleto** | V2: a Início tem o botão grande e os cartões de boleto e assembleia, o chamado sai em 3 telas com foto e o acompanhamento vai para o WhatsApp. V1: Pix em primeiro lugar, composição do valor e aviso de cópia, com o ajuste de contraste da marca. | V3 faz o boleto quase tão bem quanto a V1, com hierarquia mais achatada. |

---

## 5. Quadro comparativo

| Critério | V1 Livro-Caixa | V2 Casa de Máquinas | V3 Azulejo |
|---|---|---|---|
| **Identidade** | Correta e sóbria, mas quieta: some sem o carimbo e fica perto do padrão "papel com serifa". | A mais ancorada no assunto (a plaqueta do condomínio físico), só que aplicada em excesso. | A mais memorável, com a assinatura espalhada por lugares onde vira decoração. |
| **Reconhecibilidade dos signos** | A mais alta: LinkedIn, WhatsApp Web, HubSpot e portal do aluno, reconhecidos na hora. | Alta: Zendesk, Salesforce Path, Canvas e iFood, com a plaqueta como camada nova para aprender. | Alta nas telas (WhatsApp Business, Classroom, Pipedrive) e baixa na navegação, por causa dos glifos. |
| **Densidade para operação** | Média: confortável, ainda sem atalhos nem ordenação por SLA. | A mais alta, feita para quem passa oito horas na fila. | Média a baixa: o menu de 240px e os chips comem espaço. |
| **Humanidade da Home** | A mais completa: rede social de verdade com trabalho ao lado. | Fraca: a Home virou fila de trabalho, com o mural encostado na lateral. | A mais calorosa no texto, atrapalhada pela capa decorativa. |
| **Fluxo de salvar e voltar** | Completo: barra só com alteração, "Antes:", "Salvar e ir para o próximo 15 de 63". | O mais completo: edição por campo com Enter e Esc, duas alterações contadas, atalhos no "Salvar ▾". | Bom na tabela, mas a prévia só leitura manda para uma ficha que não existe. |
| **Navegação** | Trilho de 72px com a barra do módulo: é a recomendação da A5, e contraria a decisão de 24/09. | Modelo D refinado (grupos por papel, favoritos, ⌘K central): respeita o dono e segue apertado com 11 módulos. | Lateral de 240px em árvore: a que mais descobre e a que mais come largura, e o dono já recusou esse arranjo uma vez. |
| **Acessibilidade aparente** | Boa: estado com palavra, contraste medido na marca, foco visível, 91 rótulos em ícones. | Boa: dois temas, anel de foco em latão, atalhos; o mono pequeno em linha e os 11px pesam contra. | Razoável: só tema claro, glifos sem sentido no modo recolhido, muito texto a 11,5px. |
| **Risco de execução** | Baixo: componentes comuns e poucas peças especiais. | Médio: dois temas, a plaqueta como componente e um conjunto de atalhos para manter. | Alto: gerador de padrão por cliente, glifos por módulo, dois modos de lista, só um tema. |
| **Custo de manter o white label** | Baixo: uma cor com ajuste automático, faltando só o teste contra as cores de estado. | O mais baixo (a marca quase não entra), com o custo transferido para a satisfação do cliente. | O mais alto: a marca pinta estampa, contadores e bolhas e precisa conviver com três famílias fixas. |

---

## 6. Combinação recomendada

### Combinação A (recomendada): "a estrutura e a Home da V1, o motor da V2, a carteira da V3"

| Peça | Vem de | O que levar e o que deixar |
|---|---|---|
| **Identidade base** | V1 | Paleta papel e tinta, filete sem sombra, estado com ponto e palavra, dupla sublinha só em total, ajuste automático de contraste da marca. **Tirar a serifa da interface** (fica só em documento gerado: ata, recibo, certificado), o que resolve o padrão 1. **Clarear o fundo** para um cinza neutro (sai o creme). |
| **Assinatura única** | V2 (plaqueta), só como identificador de protocolo | Plaqueta **só** em número de chamado, OS, contrato e boleto. Nunca em vaga, bloco ou nome de lugar no meio de uma frase, e nunca no portal do morador. O carimbo da V1 fica restrito a um uso, a ciência registrada. O azulejo da V3 fica fora do sistema interno (no máximo em certificado e em estado vazio, se o dono gostar). Uma assinatura e um lugar, como pede a skill. |
| **Tema escuro** | V2 | O grafite da V2 como tema escuro opcional (os operadores estão acostumados), com o latão trocado pelo acento do sistema e não por uma segunda cor de marca. |
| **Navegação** | V1 (trilho de 72px + barra do módulo), **condicionada ao teste** | É a recomendação da A5 e da A3 (N2). Como contraria a decisão de 24/09, levar lado a lado com o Modelo D refinado da V2 e decidir pelo teste de 30 minutos com 5 operadores (A3 §7). A lateral de 240px da V3 sai da mesa. |
| **Home** | V1 no arranjo, V2 no "Para você", V3 no cabeçalho da equipe | Feed no centro (V1). "Para você" com as abas Menções/Aprovações/Prazos e ação no item (V2), numa coluna esquerda **mais larga**. Linha da equipe com rostos e "9 disponíveis agora" (V3), sem a capa de azulejos. |
| **Suporte** | V2 | Filas, ordenação por SLA, atalhos, "Enviar e depois" lembrado, transcrição, abas Boletos/Anteriores. Juntar as **etiquetas do WhatsApp Business** da V3 (com paleta própria, nunca as cores de estado), o controle segmentado de estado da V1 e a visão Quadro da V3 como alternativa para o gerente. Plaqueta só no número do chamado. Tirar o KPI do rodapé. |
| **CS** | V3 na carteira, V2 e V1 na ficha | Lista: tabela editável com visões salvas e prévia (V3), sem as caixas coloridas. Ficha: cabeçalho de campos-chave e Path com "O que a etapa pede" (V2), três colunas e "Antes: R$…" na edição (V1), histórico sempre visível (V2). |
| **Academy** | V1 na entrada, V2 no interior | Portal do aluno (período, disciplinas com CH, N1/N2, frequência, grade, histórico, certificado) como primeira tela (V1). Clicar na disciplina abre a sala no desenho do Canvas (V2), com o Mural da turma da V3 como aba "Avisos". |
| **Portal** | V2 no início e no chamado, V1 no boleto | Início com o botão grande, chamado com foto em 3 telas e acompanhamento pelo WhatsApp (V2). Tela do boleto com Pix primeiro (V1), sem serifa, sem plaqueta. |

**Por que esta combinação:** cada tela fica com a versão que melhor atende o perfil que mais a usa (§4). A estrutura mais reconhecível (V1) protege contra a estranheza, o motor da V2 atende quem vive no sistema, e a identidade sobrevive porque fica **uma** assinatura, usada onde informa.

**Riscos:**
1. **Colcha de retalhos.** Três famílias de tipo, três raios e três densidades. É preciso fixar **um** conjunto de tokens (da V1) antes de montar, e redesenhar as peças da V2 e da V3 com ele (A5 §2.2: "casca do GACO, gesto do mercado").
2. **Identidade fraca de novo.** Tirando a serifa da V1 e restringindo a plaqueta, o dono pode achar que voltou ao genérico. Mitigação: mostrar a plaqueta no Suporte e no CS em tamanho real, lado a lado com a versão atual.
3. **Navegação.** O trilho contraria uma decisão aprovada. Sem o teste com usuários, é opinião contra opinião.
4. **Três modos de lista** (lista simples, modo fila e tabela editável) para ensinar e manter. Precisa entrar no padrão de telas como exceção declarada (A3 §2 e A4 §9).

### Combinação B (alternativa): "V2 como base, humanizada"

| Peça | Vem de | O que muda |
|---|---|---|
| Identidade e navegação | V2 inteira: grafite e claro, **Modelo D refinado** | Plaqueta só em protocolo. A cor do cliente passa a ser o **botão principal** também no sistema interno, com o ajuste de contraste da V1. O latão vira só foco e item ativo. |
| Home | V1 | Feed no centro; o "Para você" da V2 vai para a coluna esquerda. |
| Suporte, CS (ficha), Portal | V2 | Como estão, sem o KPI do rodapé e com etiquetas do WhatsApp Business (V3). |
| CS (carteira) | V3 | Tabela editável com prévia. |
| Academy | V1 na entrada, V2 no interior | Igual à combinação A. |

**Vantagem:** o risco político é o menor (respeita o Modelo D de 24/09 e o tema escuro que a equipe usa), a assinatura é a mais forte e a operação é a mais densa. **Riscos:** o topo continua sem espaço para crescer (11 módulos já exigem três degraus de degradação), a identidade grafite e latão fica a um passo do padrão 2 da skill se o latão escapar do controle, e a Home humanizada dentro de uma casca "casa de máquinas" pode parecer enxerto.

---

## 7. As cinco perguntas que o dono precisa responder

1. **Menu:** mantemos os módulos no topo (Modelo D refinado: grupos por papel, favoritos, ⌘K central) ou aceitamos testar com 5 operadores o trilho lateral de 72px com a barra do módulo, e decidimos pelo resultado? (O menu lateral largo de 240px da V3 fica descartado?)
2. **White label:** no sistema interno, a cor do cliente vira o botão principal e os destaques (V1 e V3) ou fica só no logo e numa faixa, com a cor de ação do GACO (V2)? E o GACO pode escurecer ou recusar uma cor de cliente que dê pouco contraste ou que se confunda com vermelho, verde ou âmbar de estado?
3. **Tema padrão do sistema interno:** claro, escuro (como hoje) ou escolha da pessoa, com qual deles no primeiro acesso?
4. **Assinatura visual (escolha uma):** o carimbo de documento (V1), a plaqueta de identificação (V2) ou o azulejo (V3)? As três juntas descaracterizam o GACO.
5. **A primeira coisa da Home:** o mural da empresa, com o trabalho ao lado (V1 e V3), ou o "Para você", com o mural ao lado (V2)? Vale para todos os papéis ou muda por papel (atendente abre na fila, colaborador abre no mural)?

**Pendência de dado, a esclarecer junto com essas perguntas:** no módulo CS, o cliente é o **condomínio** (V1 e V3: a administradora cuida da carteira de condomínios) ou a **administradora** (V2 e A4: o GACO cuida da carteira de administradoras)? A V2 mostra "Administradora Alpha" como inquilina e como cliente na mesma tela. A resposta muda os campos da ficha e o público do módulo.
