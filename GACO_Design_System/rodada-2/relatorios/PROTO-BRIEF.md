# Brief comum dos agentes de protótipo (rodada 2)

Leia antes, nesta ordem:
1. BRIEFING.md (o que o dono pediu, palavras dele) — mesma pasta.
2. ~/.claude/skills/frontend-design/SKILL.md — siga o processo (plano de tokens → revisão contra o brief → código → autocrítica com captura de tela).
3. Os relatórios da primeira leva, nesta pasta: A1-pesquisa-fluxos.md, A2-pesquisa-identidade.md (seção 6: direções), A3-fluxos-e-salvar.md, A4-jornadas.md, A5-signos-e-navegacao.md. Leia pelo menos os resumos, as recomendações e as tabelas; use os dados deles.

## O que entregar
UM arquivo HTML autocontido (CSS e JS inline; fontes pelo Google Fonts; nada de outro CDN além de cdnjs se precisar), com:
0. Uma folha curta de identidade no topo: nome da direção, conceito em 3 frases, paleta (amostras com hex), par tipográfico, forma/raio/borda, ícones, o "detalhe assinatura", e como o white label entra (um seletor que troca a marca do cliente entre 2 ou 3 marcas de exemplo e mostra que a identidade do sistema continua). Inclua um alternador claro/escuro se a direção tiver os dois temas.
1. HOME (1440×~900): enxuta e humana, quase rede social: quem está logado e os dados dele, a equipe e as pessoas da equipe com presença, feed (reconhecimentos, comunicados com ciência, aniversários, entradas na empresa, reações com ícone e nome — sem emoji na interface), "Para você" (3 a 7 itens com prazo e um botão cada, vindos do trabalho real). PROIBIDO fileira de KPIs.
2. SUPORTE (1440×~900): o chat no estilo WhatsApp como MOTOR: lista de conversas, bolhas, tiques de entregue/lida (desenho do WhatsApp, cor do GACO), áudio, foto, respostas rápidas com "/", nota interna, a conversa já é o chamado (número, estado, SLA, responsável). Mostre o fluxo de salvar/fechar: "Enviar ▾" com ação seguinte (enviar e resolver, enviar e próximo da fila).
3. CS (1440×~900): ficha do cliente no molde dos CRMs consagrados, com edição no próprio detalhe (lápis por seção e um campo em edição mostrado), barra de etapas/saúde, atividade, "14 de 63" anterior/próximo, histórico sempre visível, e a barra de salvar que só aparece com alteração (mostre o estado com alteração não salva e o "Salvar ▾").
4. ACADEMY (1440×~900): baseado em FACULDADE (período letivo, disciplinas/turmas, grade, notas, frequência, avisos do professor, calendário acadêmico, certificado). Sem gamificação de ranking/badges como protagonista.
5. PORTAL NO CELULAR (390×800): o síndico abre um chamado com foto em poucos toques OU vê o boleto com Pix copiável — escolha um e faça bem, na marca do cliente.

Cada tela: acima dela, 2 a 4 linhas "O que esta versão propõe" + "Referências: sistemas A, B, C" no formato do dono ("Resolvemos fazer assim porque os sistemas A, B e C utilizam dessa forma."). Abaixo, 3 linhas de acessibilidade (ordem de foco, o que é anunciado, nome do que é só ícone).

## Regras de qualidade
- Dados realistas do mundo condomínio/serviço em português (Administradora Alpha, Condomínio Parque das Águas, síndica Marina Costa, boleto de setembro, vazamento na garagem, reserva do salão, assembleia de 14/10…). Nada de lorem ipsum.
- Signos consagrados (A5): o usuário tem de reconhecer na hora. Casca do GACO, gesto do mercado.
- Nenhum dos sinais de IA listados no BRIEFING e na skill. Em especial: sem gradiente decorativo, sem brilho radial, sem caixa alta espaçada, sem "A · B · C" em todo metadado, sem mono em rótulo pequeno (mono só para identificador real, se a direção pedir), sem → em botão, sem fileira de KPIs, sem cartões idênticos arredondados com a mesma sombra.
- Ícones: SVG inline de traço, ponta e junção quadradas (stroke-linecap square, linejoin miter). Pode desenhar à mão os que precisar, com base nos nomes do Lucide.
- Cantos quase retos (2–4px em controle, 0–6px em superfície), avatar de pessoa redondo.
- Acessível: contraste AA, foco visível.
- As telas ficam em molduras de largura fixa dentro de contêiner com overflow-x:auto; a página em si não rola de lado.

## Verificação obrigatória antes de terminar
Tire capturas com Playwright (node, com NODE_PATH=$(npm root -g); Chromium já instalado; não rode "playwright install") de cada tela, olhe as imagens, corrija o que estiver quebrado ou genérico, e repita uma vez. As fontes do Google podem não carregar no ambiente local: isso não é defeito.

## Resposta final
Até 20 linhas: o conceito, o que cada tela propõe de diferente, e o caminho do arquivo. Não publique nada; o coordenador junta.
