# Briefing comum dos agentes — GACO, rodada 2 (30/09/2026)

## Quem é o cliente e o produto
GACO: SaaS brasileiro multi-módulo para administradoras de condomínio e empresas de serviço.
Módulos: Marketing, Comercial, CS, Cultura (pessoas/RH), Projetos, Produto, Suporte, Desenvolvimento, Academy, Financeiro, Operações, Relatórios.
Três contextos: Sistema Interno (equipe, uso diário, horas seguidas), Sistema Externo (portal do cliente final: síndico, morador, conselheiro), Superadmin (equipe da plataforma).
White label: o cliente põe logo, cores e nome. A IDENTIDADE DO SISTEMA (estrutura, forma, tipografia de interface, comportamento) é do GACO e não muda com o cliente; o white label representa marca e cores.

## O que o dono disse nesta rodada (palavras dele, resumidas com fidelidade)
- A primeira proposta "só compilou tudo e não trouxe nenhuma mudança". Quer algo NOVO, com comprometimento.
- "O design inteiro ainda parece feito por uma IA de forma genérica, não tem identidade, não transparece nada."
- Quer revisão, confronto, discussão e brainstorm pensando na USABILIDADE DO CLIENTE: fluxos de tela, botões, localizações, o vai e volta, as opções de salvar.
- As regras estruturais atuais PODEM ser confrontadas (modal 560, painel lateral só para auditoria, edição em página própria com barra fixa, lista só lista, paginação de 20). Proponha alternativas com prós e contras; o dono decide.
- Identidade: liberdade total, com padrão firme e white label por cliente.
- Sensação: solidez e confiança, operação e controle, proximidade humana, tecnologia moderna — todas.
- "Usar signos que já existem e funcionam muito bem em softwares já consagrados do mercado para não gerar estranheza." Convenção reconhecível > invenção.
- Protótipos com VERSÕES DIFERENTES (não uma proposta só):
  - Academy baseado em FACULDADES (ambiente acadêmico: disciplinas/cursos, turmas, semestre/período, grade, notas, frequência, calendário acadêmico, certificados/diploma, biblioteca, fórum, professor/tutor — pense Canvas LMS, Moodle, Blackboard, Google Classroom, portais do aluno de universidades).
  - Suporte com CHAT tal qual WHATSAPP como MOTOR do sistema (lista de conversas, bolhas, status de entrega/leitura, anexos, áudio, respostas rápidas; toda conversa vira chamado).
  - CS baseado em CRMs existentes (Salesforce, HubSpot, Pipedrive, Zoho, RD Station CRM).
  - HOME: enxuta, mas com informações do usuário: quem está logado, dados dele, a equipe dele, pessoas da equipe, interface QUASE DE REDE SOCIAL (feed, reconhecimentos, aniversários, presença, comunicados, reações).
- "Não quero milhares de KPI, isso não é usual, isso é invenção de gente que não sabe o que quer. Quero interatividade. Humanidade. Sistema completo. Sólido. Seguro."

## O que existe hoje (para confrontar, não para copiar)
Leia em /tmp/claude-0/-home-user-spnbot/e8ae1c6b-7784-55b0-9f30-d444841ee939/scratchpad/fonte/ :
- Docs__frontend__padrao-de-telas.md (regras de tela em vigor)
- Docs__frontend__ds-v4-auditoria-e-proposta.md (tokens e componentes)
- Docs__frontend__modelos-de-pagina.md, Docs__frontend__menu-modelo-d.md, Docs__frontend__home-aprovada.md
- Docs__escopo__parametrizavel-e-whitelabel.md, Docs__escopo__proposta-design-system.md
- livro-consolidado.txt (tudo junto)
Visual atual: escuro por padrão (#0B0E14), IBM Plex Sans + Syne 800 nos títulos, botão principal em gradiente laranja, cantos 2/4/6/8, 15 cores de módulo, brilho radial de fundo, navegação no topo em duas barras (Modelo D), KPIs com faixa colorida em quase toda tela.
A primeira proposta (a que o dono rejeitou) está em /home/user/spnbot/GACO_Design_System/design-system-enterprise.html.

## Sinais de "feito por IA" que o dono rejeita (lista dele + calibração)
Excesso de tags/chips, layouts genéricos muito "clean", cards em excesso, tipografia exagerada, espaçamentos artificiais, hero decorativo, pílulas, emoji, seções numeradas sem sequência, selo decorativo, caixa de nota colorida, fileira de KPIs em toda tela, gradiente como decoração, fundo quase-preto com acento neon, rótulo em caixa alta espaçada acima de tudo, metadados sempre em "A · B · C", fonte mono para rótulo pequeno, "→" no fim de botão, cartões idênticos arredondados com a mesma sombra.

## Formato de justificativa pedido pelo dono
Toda proposta relevante: "Resolvemos fazer assim porque os sistemas A, B e C utilizam dessa forma. Enviamos para aprovação." Cite sistemas reais.

## Idioma
Português do Brasil, com acento. Dados de exemplo realistas do mundo de condomínios (síndico, administradora, boleto, assembleia, rateio, portaria, manutenção, reserva de salão).
