# A2: Pesquisa de identidade visual para o GACO

*Data da pesquisa: 30/09/2026. Autor: agente de pesquisa (diretor de arte / pesquisa de identidade B2B).*

## Como ler este relatório (e o que foi verificado)

- As fontes são citadas com URL. Muitos domínios estavam **bloqueados para leitura direta** neste ambiente (linear.app, vercel.com, underconsideration.com, news.ycombinator.com, superlogica.design, contaazul.design e outros). Nesses casos usei o trecho indexado pelo buscador. Quando a informação vem só de um site agregador ("DESIGN.md", shadcn.io/design, oh-my-design, refero, designmd etc.), que extrai tokens automaticamente dos sites e pode errar, marquei como **(fonte secundária)**.
- **Tipografia: verificação feita de verdade.** Clonei os diretórios das fontes do repositório oficial do Google Fonts (`github.com/google/fonts`, pasta `ofl/`) e inspecionei cada arquivo com `fontTools`: licença (METADATA.pb), presença do recurso OpenType `tnum`, se os algarismos já saem com largura fixa por padrão, cobertura dos 25 caracteres acentuados do português (ÁÀÂÃÉÊÍÓÔÕÚÇ + minúsculas + ü), eixos variáveis e designers. Os dados das fontes pagas ou do Fontshare **não** foram inspecionados assim e estão marcados.
- Contrastes WCAG das paletas propostas foram **calculados** (fórmula WCAG 2.x), não estimados.
- "Não confirmado" = não verifiquei em fonte primária.

---

## 0. Diagnóstico rápido do GACO atual (à luz da pesquisa)

| Elemento atual | Leitura em 2025–2026 |
|---|---|
| Tema escuro por padrão (#0B0E14) + brilho radial azul/laranja no fundo | É a "profundidade atmosférica" que os geradores de UI com IA passaram a produzir para fugir do roxo. O catálogo *avoid-ai-design* já lista "near-black + um acento ácido/vermelhão" como **default de segunda geração** da IA. |
| Botão principal com gradiente laranja (#F97316→#FB923C) | Esses hex são exatamente `orange-500` → `orange-400` do Tailwind. Gradiente em botão com cores de paleta pronta é sinal claro de template. |
| Syne 800 nos títulos | É uma display de portfólio de agência. Muito "estilosa" para ERP de condomínio e sem relação com o mundo do cliente. |
| IBM Plex Sans | É boa (algarismos já tabulares por padrão, verificado), mas é a identidade da IBM (Carbon). Sozinha, não diz "GACO". |
| Azul #2563EB para foco | É `blue-600` do Tailwind, outra cor de paleta pronta. |
| Cantos quase retos (2/4/6/8px) | **Manter.** É a contracorrente do `rounded-2xl shadow-lg`, o maior sinal de template. |
| 15 cores de módulo | Arco-íris. Sistemas maduros agrupam por família (ver Atlassian, seção 5). |
| Ícones próprios de traço com ponta quadrada | **Manter e radicalizar.** É o único ativo realmente proprietário. |

Conclusão: o problema não é "falta de estilo" e sim **estilo sem lastro**. Cada escolha vem de um repertório genérico (Tailwind, fontes de portfólio, glow de landing page), e nenhuma vem do mundo do cliente: prédio, condomínio, documento, livro-caixa, portaria, zeladoria.

---

## 1. O que faz uma interface B2B "parecer feita por IA / template" (2025–2026)

### 1.1 O mecanismo
- **Convergência para a média.** O modelo prevê o mais provável: um dashboard pedido à IA sai como a média dos dashboards do treino, e essa média é shadcn + gradiente. ([vibecodekit, "AI Slop Design"](https://vibecodekit.dev/ai-slop-design); [designpixil](https://designpixil.com/blog/ai-slop-design); [uxskill, "What is AI slop"](https://uxskill.laithjunaidy.com/what-is-ai-slop.html))
- **"Regressão ao centróide" do shadcn/ui.** Projetos saem com a rampa de neutros *zinc* intocada, primário violeta, Inter nos pesos padrão, raio de canto de fábrica e sombra suave nos cards. "Quando essa camada fica no default, a única coisa que diferencia dois apps é o logo." ([uxskill, "Everything built with shadcn/ui looks the same"](https://uxskill.laithjunaidy.com/blog/shadcn-ui-looks-generic.html))
- O termo "AI slop" foi a palavra do ano de 2025 do Macquarie Dictionary, segundo [vibecodekit](https://vibecodekit.dev/ai-slop-design) (não confirmei no site do dicionário).

### 1.2 Os sinais de primeira geração ("era do gradiente roxo")
Catálogo do repositório *avoid-ai-design*, lido diretamente ([github.com/funboy322/avoid-ai-design](https://github.com/funboy322/avoid-ai-design)):
- Inter em tudo. Também o conjunto de "fontes grátis de bom gosto": **Space Grotesk, Geist, Instrument Serif, Fraunces**.
- Gradiente roxo/índigo que vira azul, e títulos com texto em gradiente (`bg-clip-text`).
- Paletas do shadcn sem alteração.
- Hero centralizado com três cards de ícone e a ordem padrão de seções (hero, logos, features, stats, pricing, CTA).
- `rounded-2xl shadow-lg` em tudo, vidro (glass) por reflexo, ícone dentro de quadrado arredondado.
- Outros artigos apontam a faixa colorida de 3–4px na borda esquerda do card como "o sinal mais confiável" ([925studios, via busca](https://www.925studios.co/blog/ai-slop-design-tells); [mania.design / Kosta C.](https://www.mania.design/blog/spot-the-slop-a-ui-designers-guide-to-fixing-ai-defaults/)).

### 1.3 Os sinais de segunda geração (o que a IA faz quando mandam "fugir do roxo")
Este ponto é o mais importante para o GACO, que já fugiu do roxo e caiu aqui:
- **"cream + terracota (o look Claude)"** e **"quase-preto + um único acento verde-ácido ou vermelhão"** ([avoid-ai-design](https://github.com/funboy322/avoid-ai-design)).
- Rótulos em monoespaçada caixa-alta, "eyebrows" com tracking largo, filetes de jornal, "uma palavra do título destacada", numeração decorativa 01/02/03, bolinhas falsas de janela, strings "A · B · C".
- Movimento: o mesmo fade-up em toda seção, easing com bounce, números que contam até o valor. Ícones: Lucide gasto e a "faísca" (sparkle) para indicar IA.
- A própria skill oficial de front-end da Anthropic, lida no GitHub ([anthropics/skills, frontend-design/SKILL.md](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md)), manda evitar sem justificativa do briefing o "fundo creme (~#F4F1EA) com serifa de alto contraste e acento terracota (~#D97757)" e o "fundo quase-preto com um único acento verde-ácido ou vermelhão". Também manda evitar destacar uma única palavra no título, rótulos em caixa-alta e rótulos tipográficos desnecessários acima do conteúdo.

### 1.4 A "síndrome Linear"
- "Ask HN: Why does every B2B SaaS have to look like Linear/Stripe?" ([news.ycombinator.com/item?id=46179202](https://news.ycombinator.com/item?id=46179202); só o trecho do buscador, a página estava bloqueada).
- O formato padrão descrito: sidebar à esquerda, cards de métrica no topo, gráficos no meio, avatar no canto superior direito, gradiente roxo em algum lugar e cantos "grandes o bastante para pousar avião" ([Medium, "Why Modern SaaS Apps All Look the Same"](https://medium.com/@ryan.almeida86/why-modern-saas-apps-all-look-the-same-f99de1192fac)). Ver também [overpass.studio](https://www.overpass.studio/blog/why-saas-websites-look-the-same), [demandmyths](https://demandmyths.substack.com/p/why-do-saas-websites-look-so-similar) e ["The Linear effect"](https://rectangle.substack.com/p/the-linear-effect).
- Tendência "dark mode + neon + glass" como moda de 2025: [Medium/frameboxx81](https://medium.com/@frameboxx81/dark-mode-and-glass-morphism-the-hottest-ui-trends-in-2025-864211446b54). Quando a moda é celebrada em listas de tendência, ela já virou template.
- Detalhe revelador: o próprio Linear, em 2026, fez um refresh "mais calmo". Reduziu e diminuiu ícones, **tirou os fundos coloridos dos ícones de time** e escureceu a sidebar para o conteúdo ganhar destaque ([changelog 2026-03-12](https://linear.app/changelog/2026-03-12-ui-refresh); ["A calmer interface…"](https://linear.app/now/behind-the-latest-design-refresh)). Quem criou o look está saindo dele.

### 1.5 Lista prática: o que faz parecer IA
1. Cores de paleta pronta sem ajuste (Tailwind `*-500/600`, zinc/slate do shadcn).
2. Gradiente em botão, em texto ou em fundo como "atmosfera".
3. Fonte da moda sem relação com o assunto (Inter, Geist, Space Grotesk, Syne, Fraunces, Instrument Serif).
4. Raio grande e uniforme com sombra difusa em todo card.
5. Dark mode com acento neon ou quente e brilho radial.
6. Ícones Lucide/Heroicons sem tratamento, dentro de quadradinho colorido.
7. Emoji na interface como substituto de ícone ou de tom de voz.
8. Muitas cores de categoria (arco-íris) sem hierarquia.
9. Microcópia genérica e caixa-alta decorativa.
10. **O maior de todos: nada vem do domínio do cliente.** Não há um objeto, documento ou gesto do mundo real que a interface reconheça.

---

## 2. Como produtos B2B maduros constroem identidade reconhecível

Legenda: **Prop.** = fonte proprietária/customizada. "(sec.)" = fonte secundária.

| Produto | Tipografia | Paleta base | Superfícies / ícones / densidade | "Assinatura" |
|---|---|---|---|---|
| **Linear** | Inter / "Inter Display" (sec., [shadcn.io/design/linear](https://www.shadcn.io/design/linear)); não é proprietária | Temas gerados em **LCH** a partir de poucas variáveis (base, acento, contraste) ([Linear, redesign pt. II](https://linear.app/now/how-we-redesigned-the-linear-ui); [changelog 2024](https://linear.app/changelog/2024-03-20-new-linear-ui)). Acento lavanda ~#5E6AD2 (sec.) | Muito denso. Ícones redesenhados e **reduzidos** no refresh de 2026 ([changelog](https://linear.app/changelog/2026-03-12-ui-refresh)) | Gerador de tema perceptual, teclado primeiro, velocidade. A identidade está no **comportamento**, não na cor. |
| **Stripe** | **Söhne** (Klim, 2019), licenciada. Usada no Dashboard, docs e marketing ([Klim](https://klim.co.nz/fonts/soehne/); [Fonts In Use](https://fontsinuse.com/uses/35338/stripe-website-2020)) | Blurple #635BFF, navy #0A2540, superfície #F6F9FC (sec., [designsystems.one](https://www.designsystems.one/design-systems/stripe-design)) | Sistema interno "Sail", privado. Espaçamento denso nos passos pequenos, dados financeiros compactos e moldura generosa (sec., [designmd.run](https://www.designmd.run/blog/stripe-design-system-breakdown)) | Grotesca "suíça" + um roxo disciplinado + dados financeiros com precisão tipográfica. |
| **Vercel / Geist** | **Geist Sans / Mono / Pixel**, própria **e livre (OFL)**, feita com Basement Studio e inspirada no design suíço ([vercel.com/font](https://vercel.com/font); verificado no google/fonts: OFL, `tnum` presente) | Preto/branco quase puros e cinzas neutros | Filetes de 1px, grid visível, raio pequeno | Monocromia radical. A marca é a ausência de cor. **Risco para terceiros:** Geist já entrou na lista de "fonte de bom gosto que a IA usa" ([avoid-ai-design](https://github.com/funboy322/avoid-ai-design)). |
| **Notion** | Inter (UI); o usuário escolhe Default/Serif/Mono por página ([Notion Help](https://www.notion.com/help/customize-and-style-your-content)) | Quase monocromático, fundo branco/off-white | Blocos, pouca borda, emoji como ícone de página (parte do produto) | **Ilustração** P&B de traço manual de Roman Muradov ([Notion blog](https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign); [It's Nice That](https://www.itsnicethat.com/articles/roman-muradov-200616)). Depois, campanha em cores primárias com BUCK ([It's Nice That](https://www.itsnicethat.com/articles/buck-notion-graphic-design-illustration-project-170724)). A identidade mora na ilustração e na página em branco, não na UI. |
| **Attio** | Inter + Inter Tight; **Tiempos Text** (serifa, Klim) nos momentos editoriais (sec., [designmd.co/attio](https://www.designmd.co/d/attio-com)) | Preto #1C1D1F, cinzas frios, acento azul em ações (sec.) | CRM de alta densidade com tabelas estilo planilha. Marca e produto alinhados em tipo, ícone e tom ([Design at Attio, Tom Scott](https://verifiedinsider.substack.com/p/design-at-attio)) | Tabela-como-produto + serifa editorial só no marketing. |
| **Pipedrive** | Sans customizada (detalhe não confirmado) | **Verde** retomado como cor principal, com roxos e amarelos de apoio. Rebrand de 2022 com Studio Dumbar ([Pipedrive newsroom](https://www.pipedrive.com/en/newsroom/pipedrive-unveils-its-new-evolved-brand-reflecting-the-companys-commitment-to-driving-the-growth-of-smbs); [BusinessWire](https://www.businesswire.com/news/home/20220908005626/en/Pipedrive-Unveils-Its-New-Evolved-Brand-Reflecting-the-Companys-Commitment-to-Driving-the-Growth-of-SMBs)) | Não confirmado | O funil/pipeline visual como imagem-mãe. |
| **Front** | Não confirmado. Identidade feita pela Design Business Company ([Brand New](https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_front_by_design_business_company.php); página não lida) | Não confirmado | Não confirmado | Não confirmado |
| **Intercom → Fin** | **Saans** (Displaay) como voz tipográfica (sec., [oh-my-design](https://oh-my-design.kr/design-systems/intercom)) | Off-white quente #FAF9F6, off-black #111111, **Fin Orange #FF5600** como único acento (sec.) | Tom de revista, muito espaço | Refresh de marca ([Intercom blog](https://www.intercom.com/blog/how-and-why-we-refreshed-our-brand/)) e empresa renomeada para **Fin** ([Intercom blog](https://www.intercom.com/blog/today-intercom-becomes-fin/); [CX Today](https://www.cxtoday.com/contact-center/intercom-rebrands-to-fin/)). Atenção: off-white + laranja único é quase o "default de segunda geração". Funciona para eles porque o laranja virou o **nome do produto**. |
| **Zendesk** | Na UI, fonte do sistema (SF etc.), 14/20px ([Zendesk dev](https://developer.zendesk.com/documentation/apps/app-design-guidelines/ui-design-fundamentals/)) | Design system **Garden**. Neutros cinza, azul só para ação/seleção, verde "Kale" da marca ([Garden palette](https://garden.zendesk.com/design/palette/); [Garden color](https://garden.zendesk.com/design/color/)) | Sóbrio e utilitário | Cores de produto (support, guide, chat, talk, sell…) ficam **só na marca/logos**, fora da UI de trabalho (sec., [oh-my-design](https://oh-my-design.kr/design-systems/zendesk)). |
| **Salesforce (SLDS 2 / Cosmos)** | **Salesforce Sans** (prop., Monotype) (sec., [designyourway](https://www.designyourway.net/blog/salesforce-font/)) | Azul #0176D3 (sec.); tema Cosmos com "cores renovadas" | SLDS 2 separa **estrutura de estilo** via *styling hooks* (CSS vars `--slds-g-*`) ([SF dev](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html); [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-lightning-design-system-2-for-developers/explore-salesforce-lightning-design-system-2)). GA no Winter '26 ([SF Help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.customize_ui_enhancedlex.htm&type=5)) | **Motivos circulares** no Cosmos ([Salesforce blog](https://www.salesforce.com/blog/what-is-slds-2/)). |
| **SAP Fiori Horizon** | **"72"** (prop. SAP), em negrito para ênfase ([SAP theming](https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/visual/theming)) | Morning Horizon: #0070F2 marca/link, #F5F6F7 fundo do app, #1D2D3E texto ([SAP Morning Horizon](https://www.sap.com/design-system/fiori-design-web/v1-108/foundations/visual/colors/morning-horizon)) | Temas claro, escuro e dois de alto contraste; UI Theme Designer para o cliente | Enterprise "calmo". Tema claro como padrão e dark como alternativa. |
| **IBM Carbon** | **IBM Plex** (prop., mas OFL), com conjuntos "productive" e "expressive" ([Carbon](https://carbondesignsystem.com/designing/kits/sketch/)) | 4 temas: White, Gray 10, Gray 90, Gray 100 (#161616 → camadas #262626/#393939) ([Carbon v10 themes](https://v10.carbondesignsystem.com/guidelines/themes/overview/)) | **Grid 2x**, cantos retos, camadas por tom de cinza em vez de sombra | Canto reto e grid 2x como lei. É o "parente" mais próximo do GACO atual, e por isso Plex + canto reto soa como "Carbon genérico". |
| **Atlassian (rebrand 2024)** | Marca: **Charlie Sans** (prop., Pentagram). Produto: **Atlassian Sans/Mono**, derivadas do Inter ([ADS typography](https://atlassian.design/foundations/typography); [GA](https://atlassian.design/whats-new/new-typography-in-general-availability/)) | Azul #0052CC. Tokens de cor ([ADS color](https://atlassian.design/foundations/color)) | Ícones novos com **traço de 1,5px em canvas de 16px**, alinhados ao pixel ([Atlassian blog, ícones](https://www.atlassian.com/blog/design/behind-the-screens-building-atlassians-new-icon-system)) | Logos de app em **tile cuja cor indica a coleção**, não o app ([ADS logos](https://atlassian.design/foundations/logos); [rebrand](https://www.atlassian.com/blog/announcements/our-bold-new-brand)). Modelo direto para os 15 módulos do GACO. |
| **Mercury** | **Arcadia / Arcadia Display** (Family Type), variável, com pesos intermediários 360/420/480 (sec., [designmd.cc](https://designmd.cc/benchmarks/mercury); [blakecrosley](https://blakecrosley.com/guides/design/mercury)) | Índigo #5266EB (sec.) e neutros | Calma "institucional" | **Peso 480**: nunca negrito, nunca fino. Uma assinatura feita só de tipografia. |
| **Ramp** | **TWK Lausanne** (Weltkern) em UI e texto; logo derivado dela ([Fonts In Use](https://fontsinuse.com/uses/56961/ramp-2023-campaign); [identidade](https://fontsinuse.com/uses/38468/ramp-identity)). Serifa **Burgess** em display (sec.) | **Ramp Lime #E5FE54** (sec., [oh-my-design](https://oh-my-design.kr/design-systems/ramp)) | Denso, financeiro | Um verde-limão que ninguém mais usa em finanças. |
| **Rippling** | **Rippling Sans** (prop., variável do extra-estreito ao largo, com itálico) ([Rippling blog](https://www.rippling.com/blog/how-we-pulled-off-an-in-house-rebrand-in-four-months); [A+ Type](https://www.a-plus-type.com/projects/rippling)) | Roxo dominante | Não confirmado | Wordmark com leve distorção de "onda" (ripple). |
| **monday.com** | UI em **Figtree**, marketing em **Poppins** ([brand-monday](https://www.brand-monday.com/typography); [Vibe](https://github.com/mondaycom/vibe/blob/master/packages/core/README.md)) | Roxo #6161FF (sec.) e muitas cores de status | Design system "Vibe" | Cor como dado (status colorido). Aqui o arco-íris é o produto. |
| **Height** | Não confirmado | Não confirmado | Animações e sons | **Encerrou em 24/09/2025** ([Height no X](https://x.com/height_app/status/1903820182557999555); [AlternativeTo](https://alternativeto.net/news/2025/3/height-project-management-tool-to-shut-down-by-september-2025/)). Lição: design bonito não sustenta produto. |
| **Plain** | "Plain Sans" aparece num brandbook ([brandpad.io/plain](https://brandpad.io/plain/)), mas **não confirmei** que é da Plain.com | Não confirmado | Não confirmado | Não confirmado |
| **Pylon** | **Matter** (Displaay) em peso leve (sec., [withfudge](https://design.withfudge.com/share/usepylon.com-design)) | Quase monocromático com acento roxo (sec.) | Identidade da agência Slope com base em **estruturas de apoio de pontes e plantas arquitetônicas** ([Slope no X](https://x.com/slopeagency/status/1957881595861561827)) | **Metáfora arquitetônica** (pilar/suporte). Precedente direto para o GACO usar planta baixa. |
| **Retool** | Rebrand interno (set/2024): **Alaska** (Newglyph) + **Social** (Dinamo) ([Brand New](https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_retool_done_in_house.php); [Retool blog](https://retool.com/blog/retool-brand-story)) | Não confirmado | Não confirmado | "R" feito de blocos modulares. |

### Padrões que se repetem nos maduros
1. **Uma tipografia com dono** (Söhne, Arcadia, Lausanne, Salesforce Sans, 72, Charlie, Rippling Sans, Nu Sans). Quem não tem fonte própria compensa com **uso próprio**: o peso 480 da Mercury, as três opções de fonte por página do Notion, o monocromático radical da Geist.
2. **Uma única cor-assinatura** usada com disciplina: blurple, lime, Fin Orange, verde Pipedrive. O resto é neutro.
3. **Cor de produto/módulo fica na marca, não na UI de trabalho** (Zendesk, Atlassian com cor por coleção).
4. **Metáfora do domínio**: a planta/ponte da Pylon, o funil da Pipedrive, o ripple da Rippling.
5. **Densidade é argumento** em produtos de operação (Stripe, Attio, Linear), e com ela vem a menor quantidade possível de ornamento.
6. Tendência 2025–26: **acalmar** (refresh do Linear, SLDS 2, Horizon), com menos cor e menos ícone.

---

## 3. Referências brasileiras

| Marca | O que faz | Fonte |
|---|---|---|
| **Nubank** | **Nu Sans**, primeira família proprietária (Blackletra/Daniel Sabino), feita em 14 meses, 32 variações, para PT/ES/EN. Substituiu o par Gellix + Graphik. O "n" nasce do laço n-u do logo (Pentagram, 2022). Roxo escolhido para fugir do azul/vermelho dos bancos. A fonte própria também ajuda contra fraude e cópia. | [Blackletra (Medium)](https://medium.com/@blackletra/designing-nubanks-typeface-69e47072f8fb); [PT](https://medium.com/@blackletra/nu-sans-a-nova-fonte-do-nubank-16266b8830f6); [blog Nubank](https://blog.nubank.com.br/nu-sans/) |
| **Stone** | Rebrand com FutureBrand SP. Verde mais intenso e **família de verdes**. Logo com estrutura circular. Grafismos inspirados em **mapas de calor da atividade empreendedora**. Biblioteca própria de ilustração/3D. Fonte própria: não confirmado. | [Propmark](https://propmark.com.br/anunciantes/stone-apresenta-nova-identidade-visual-para-reforcar-posicionamento-como-ecossistema-de-solucoes-financeiras/); [Mundo do Marketing](https://mundodomarketing.com.br/stone-apresenta-nova-identidade-visual-e-reforca-posicionamento-como-ecossistema-financeiro) |
| **Conta Azul** | Tipografia customizada com **Fábio Haag** chamada **"Ping Pong"** (homenagem às mesas de pingue-pongue da empresa). Rebrand com Firmorama (Joinville). Guia de expressão visual público e biblioteca de ilustração customizável. | [Medium Conta Azul](https://medium.com/design-contaazul/branding-como-constru%C3%ADmos-a-nova-identidade-visual-da-marca-conta-azul-f998075e44e5); [guia](https://www.contaazul.design/brandbook/guia-de-expressao-visual-da-conta-azul); [ilustrações](https://medium.com/design-contaazul/a-nova-biblioteca-de-ilustra%C3%A7%C3%B5es-da-conta-azul-da-conceitua%C3%A7%C3%A3o-%C3%A0-implementa%C3%A7%C3%A3o-c631dc3e63ab) |
| **Omie** | Rebrand em 2021 com Superunion. Símbolo de **seta** ("seguir em frente"). | [Omie blog](https://www.omie.com.br/blog/omie-anuncia-rebranding-e-ampliacao-do-foco-para-grandes-empresas-em-2021/); [Propmark](https://propmark.com.br/superunion-assina-rebranding-da-omie/) |
| **RD Station** | Em 2025 a identidade evoluiu para se integrar ao portfólio da TOTVS. É um caso de sub-marca dentro de um guarda-chuva, útil para pensar o GACO com módulos. | [rdstation.com/nova-marca](https://www.rdstation.com/nova-marca/) |
| **Pipefy** | Identidade modular com **círculos baseados em Fibonacci** e logotipo que forma "pipe" + seta. Oferece **White Label** (esconde o logo Pipefy, aplica a marca do cliente). | [Behance, Nelson Balaban](https://www.behance.net/gallery/176469417/Pipefy); [Pipefy White Label](https://help.pipefy.com/en/articles/8365213-pipefy-white-label-bring-your-company-s-brand-to-the-pipefy-environment) |
| **VTEX** | **Rebel Pink** como cor principal, para se destacar no "oceano azul e verde" da tecnologia. Tipografia **VTEX Trust**. Azuis e branco equilibram o rosa. | [VTEX brand guidelines](https://www.vtex.com/en-us/brand-guidelines/) |
| **Superlógica** (concorrente direto) | Redesign de identidade em 2021 (plataforma de marca completa). Tem design language pública (superlogica.design) com **paleta própria para a BU Condomínios** (tons 200/400/600/800). Rebrand do evento Next 2024. | [Behance](https://www.behance.net/gallery/150524005/Superlogica-Rebranding?locale=en_US); [cores](https://superlogica.design/superlogica/guidelines/institucional/cores/); [Next 2024](https://blog.superlogica.com/imprensa/releases/superlogica-apresenta-novidades-para-o-next-2024/) |
| **Vindi** | Rebrand pensando em médias e grandes empresas, com logo "sério, objetivo, direto e confiável". A Locaweb Company (Interbrand) ficou com cores menos vibrantes e visual mais sóbrio. | [Medium Vindi](https://medium.com/vindi/nova-marca-vindi-df898d414e40); [NeoFeed](https://neofeed.com.br/negocios/depois-de-onda-de-mas-locaweb-muda-nome-corporativo-e-integra-marcas/) |
| **Cora** | Campanha institucional "Retratos de um Brasil que não para", com clientes reais. Identidade da campanha por Mario Caruso (Tullece). Detalhes de paleta e fonte: **não confirmados**. | [Cora blog](https://www.cora.com.br/blog/campanha-institucional/); [GNP](https://grandesnomesdapropaganda.com.br/mercado-digital/banco-digital-cora-lanca-primeira-campanha-institucional/) |
| **QuintoAndar** | Studio Porto Rocha. **Logo = planta baixa de um cômodo com a porta aberta** (lê-se "Q"). "Azul Quinto" + terrosos. Ilustração com traço manual e texturas. | [Abduzeedo](https://abduzeedo.com/quintoandars-branding-visual-identity-redefines-real-estate); [Mercado&Consumo](https://mercadoeconsumo.com.br/18/01/2022/noticias/quintoandar-lancamento-novo-posicionamento-de-marca-e-identidade-visual/) |
| **Loft** | Unificou CredPago, Credihome e Vista na marca única **Loft** (foco B2B em imobiliárias). Detalhes visuais: não confirmados. | [Portal Loft](https://portal.loft.com.br/loft-marca-unica/) |

**Lições para o GACO:** (a) Nubank e Conta Azul mostram que **fonte própria é viável no Brasil** e vira ativo (antifraude inclusive, o que importa para boletos de condomínio). (b) QuintoAndar e Pylon mostram que a **planta baixa** funciona como metáfora de marca, então o GACO precisa se diferenciar desse uso e não copiá-lo. (c) Superlógica, o concorrente, já tem design language com cor por BU. O GACO precisa de algo que não seja "mais uma paleta".

---

## 4. Tipografia

### 4.1 Tabela verificada (arquivos oficiais do google/fonts, inspecionados com fontTools em 30/09/2026)

"Tabular" = tem o recurso `tnum` **ou** os algarismos já têm largura fixa por padrão. "pt-BR" = contém os 25 acentuados + ç + ü. Todas as da tabela têm `ordn` (º/ª).

| Fonte | Licença | Tabular? | pt-BR | Eixos | Designer | Personalidade / quem usa |
|---|---|---|---|---|---|---|
| **Geist** | OFL | sim (`tnum`) | sim | wght 100–900 | Basement/Vercel | Suíça, técnica. Vercel. **Já é marcador de "IA de bom gosto".** |
| **Instrument Sans** | OFL | sim (`tnum`) | sim | wght 400–700, **wdth 75–100** | Rodrigo Fuenzalida, Jordan Egstad | Grotesca contemporânea, com 12 stylistic sets e largura variável (ótimo para tabelas estreitas). |
| **Figtree** | OFL | sim | sim | wght 300–900 | Erik Kennedy | Geométrica amigável. **monday.com (UI)**. |
| **Onest** | OFL | sim | sim | wght 100–900 | Dmitri Voloshin, Andrey Kudryavtsev | Neutra, "escolar", muito legível. Pouco usada no Brasil. |
| **Manrope** | OFL | sim | sim | wght 200–800 | Mikhail Sharanda | Semi-condensada e geométrica. Bem popular em templates (risco médio). |
| **Schibsted Grotesk** | OFL | sim (+ `zero`) | sim | wght 400–900 | Bakken & Bæck, Henrik Kongsvoll | Nasceu para o grupo de mídia Schibsted: **jornal/documento**, séria, com zero cortado. |
| **Hanken Grotesk** | OFL | **dígitos tabulares por padrão** (sem `tnum`/`pnum`) | sim | wght 100–900 | Hanken Design Co. | Grotesca calma. Números sempre alinhados, mas **sem opção proporcional** em texto corrido. |
| **Public Sans** | OFL | sim (+ lnum/onum) | sim | wght 100–900 | USWDS (governo dos EUA) | "Institucional/serviço público". Neutra e confiável. |
| **Atkinson Hyperlegible Next** | OFL | sim | sim | wght 200–800 | Braille Institute et al. | Máxima distinção entre caracteres (Il1, 0O). Versão *Next* entrou no GF em jan/2025. |
| **Source Sans 3** | OFL | dígitos tabulares por padrão (tem `pnum` e `zero`) | sim | wght 200–900 | Paul D. Hunt (Adobe) | Humanista, excelente em UI densa. Um pouco "Adobe/2012". |
| **Red Hat Text / Display** | OFL | sim (+ `zero`) | sim | Text 300–700 / Display 300–900 | MCKL | Par Text+Display pronto. Personalidade "Red Hat" forte. |
| **Bricolage Grotesque** | OFL | sim (+ onum) | sim | **opsz 12–96**, wght 200–800, wdth 75–100 | Mathieu Triay | Grotesca com "tinta" e irregularidade no display. Ousada. |
| **Familjen Grotesk** | OFL | sim, **tabular por padrão** + `zero` | sim | wght 400–700 | Familjen STHLM | Grotesca sueca de agência, com caráter. |
| **Mona Sans / Hubot Sans** | OFL | sim | sim | wdth 75–125, wght 200–900 | GitHub + Degarism | Grotesca do GitHub, com largura variável. |
| **Archivo** | OFL | sim (+ `zero`) | sim | wght 100–900, **wdth 62–125** | Omnibus-Type | Grotesca de "sinalização", com larguras extremas. Boa para display. |
| **Work Sans** | OFL | sim | sim | wght 100–900 | Wei Huang | Grotesca com traços de sinalização antiga. |
| **Afacad** | OFL | sim, tabular por padrão + `zero` | sim | wght 400–700 | Dicotype | Pouco usada. Neutra. |
| **Plus Jakarta Sans** | OFL | sim | sim | wght 200–800 | Tokotype | Popular em templates (risco alto de "template"). |
| **Syne** (atual) | OFL | sim | sim | wght 400–800 | Bonjour Monde | Display de portfólio de agência. |
| IBM Plex Sans (atual) | OFL | dígitos tabulares por padrão | sim | wght 100–700, wdth 75–100 | Mike Abbink, Bold Monday | Identidade IBM. |
| Inter (referência) | OFL | sim | sim | opsz, wght | Rasmus Andersson | O default universal. |
| **Albert Sans / DM Sans / Libre Franklin** | OFL | **não** (sem `tnum` e dígitos proporcionais) | sim | | | **Descartar** para UI com números. |

Serifas e monoespaçadas úteis (verificadas):
- **Source Serif 4** (OFL, `tnum`, `opsz` 8–60, tabular por padrão): serifa de documento, ótima para "atas/circulares".
- **Newsreader** (OFL, `tnum`, opsz 6–72, tabular por padrão): editorial.
- **Literata** (OFL, `tnum`, opsz).
- **Fraunces e Instrument Serif:** evitar, porque estão na lista de "tasteful AI" e não têm `tnum`.
- Monos: **JetBrains Mono**, **Fragment Mono** (Wei Huang/URW), **Geist Mono**, **Space Mono**. Todas OFL e monoespaçadas por definição.

Fonte do método: [github.com/google/fonts](https://github.com/google/fonts) (diretórios `ofl/*`, arquivos METADATA.pb e .ttf).

### 4.2 Fontes gratuitas não-OFL e comerciais (não inspecionadas por mim)
| Fonte | Licença | Observações |
|---|---|---|
| **General Sans / Satoshi** (Indian Type Foundry, via Fontshare) | **ITF Free Font License**: uso comercial liberado. Redistribuir ou modificar os arquivos não é permitido ([Fontshare Satoshi](https://www.fontshare.com/fonts/satoshi); [madegooddesigns](https://madegooddesigns.com/fontshare/)) | Satoshi tem algarismos tabulares segundo [fontalternatives](https://fontalternatives.com/fonts/satoshi/) (não verificado no arquivo). As duas são muito usadas em landing pages de startup (risco "template"). **White label:** a proibição de redistribuir pode complicar o self-host em instâncias de cliente. Verificar. |
| **Söhne** (Klim) | Comercial. Base de US$60 por estilo; licença web a partir de 20 mil pageviews ou 5 mil usuários únicos/mês ([Klim FAQ](https://klim.co.nz/faqs/); [licenças](https://klim.co.nz/licences/)) | Identidade da Stripe (e de outros produtos de IA). Usar hoje parece imitação. |
| **GT America** (Grilli) | Comercial. **App license da família completa: US$945**; subfamília US$630; estilo US$75 (valores do buscador, conferir em [grillitype.com](https://www.grillitype.com/typeface/gt-america)) | Grotesca americana/europeia muito usada em fintechs. |
| **Aeonik** (CoType) | Comercial, preço não confirmado | Popular em startups de 2022–24. |
| **Matter / Saans** (Displaay) | Comercial, preço não confirmado | Pylon, Intercom/Fin. |
| **TWK Lausanne** (Weltkern) | Comercial, preço não confirmado | Ramp. |
| **Fundições brasileiras**: **Plau** (RJ; fontes quase todas variáveis; **licença por porte da empresa**, a padrão cobre até 500 funcionários; a *Carbona* tem recursos para interface/código), **Fabio Haag Type** (licença "Client" distribuível; fez a Ping Pong da Conta Azul), **Blackletra** (Nu Sans) | Comercial ou sob medida ([Plau FAQ](https://plau.design/faq/); [Plau](https://plau.design/en/); [FHT](https://fabiohaagtype.com/en/product-category/fonts/)) | Caminho para uma **fonte GACO** a médio prazo, com narrativa "feito no Brasil". |

### 4.3 Pares display + UI recomendados (sem Inter/Roboto/Plex)
1. **Schibsted Grotesk (UI) + Source Serif 4 (documentos/títulos de página)**: jornal + documento, tudo com `tnum`, tudo OFL. Sóbrio.
2. **Instrument Sans (UI, com wdth para colunas estreitas) + Archivo Expanded/SemiExpanded (display)**: grotesca + sinalização predial.
3. **Public Sans (UI) + Fragment Mono (códigos, unidades, protocolos)**: "serviço público" confiável, com o mono como assinatura.
4. **Hanken Grotesk ou Onest (UI) + Bricolage Grotesque (display, opsz alto)**: a opção ousada.
5. **Atkinson Hyperlegible Next (UI)**: se o foco for acessibilidade (síndicos idosos, portaria), num par com Source Serif 4.

---

## 5. Cor: neutros, acento, cor por módulo e white label

### 5.1 Neutros com matiz
- **Radix Colors** oferece 6 escalas de cinza: gray (puro), mauve (roxo), slate (azul), sage (verde), olive (lima), sand (amarelo). A regra é **parear o cinza com a matiz mais próxima do acento** para dar harmonia; texto em cinza dá um efeito "mais funcional" ([Radix, composing a palette](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette); [Radix Colors](https://www.radix-ui.com/colors)).
- **Linear** gera o tema inteiro em **LCH** a partir de base + acento + contraste ([Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)). A **Evil Martians** defende OKLCH e oferece o **Harmonizer** (paletas por OKLCH + contraste APCA, com croma e contraste consistentes entre matizes) ([OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl); [Harmonizer](https://github.com/evilmartians/harmonizer)).
- **Carbon** usa camadas de cinza neutro (#161616 → #262626 → #393939) no lugar de sombra ([Carbon themes](https://v10.carbondesignsystem.com/guidelines/themes/overview/)).
- Recomendação para o GACO: gerar a rampa de neutros em **OKLCH com croma de 0,005 a 0,015** na matiz do acento escolhido. Não usar zinc/slate do Tailwind.

### 5.2 Acento único vs múltiplo
- Maduros: **um acento de marca + cores semânticas** (sucesso, alerta, erro, info), com o azul/cor de marca **reservado para ação e seleção** (Zendesk Garden: "primary (blue) is dedicated to buttons, links, and selection states"; [Garden color](https://garden.zendesk.com/design/color/)).
- O acento não deve coincidir com uma cor semântica. Laranja de marca + laranja de alerta, como no GACO hoje, gera ambiguidade.

### 5.3 Cor por módulo sem virar arco-íris
- **Atlassian:** cada app tem um glifo por função dentro de um tile, e **a cor do tile indica a coleção**, não o app ([ADS logos](https://atlassian.design/foundations/logos)).
- **Zendesk:** as cores de produto (support, guide, chat, talk, sell) existem, mas ficam na **marca/logos**, fora da UI de trabalho (sec.).
- **Linear 2026:** **removeu fundos coloridos de ícones de time** ([changelog](https://linear.app/changelog/2026-03-12-ui-refresh)).
- **Superlógica:** paleta específica por BU (Condomínios) ([superlogica.design](https://superlogica.design/superlogica/guidelines/institucional/cores/)).
- **Proposta para o GACO:** reduzir de 15 cores para **4 famílias**, cada uma com 1 cor de baixa saturação. Por exemplo: *Gestão* (ERP, Financeiro, Cobrança…), *Relacionamento* (CRM, Chat…), *Atendimento* (Suporte/Tickets…), *Pessoas & Saber* (Academy/LMS, RH…). A diferença entre módulos fica no **glifo** (ícone próprio), nunca na cor. A cor da família só aparece num marcador de 3–4px no breadcrumb/header e no tile do launcher. Botões e estados nunca mudam de cor por módulo.

### 5.4 White label convivendo com identidade do produto
- **Salesforce** (Themes and Branding): o admin define logo, **cor da marca**, fundo e banner. Até 300 temas, **só um ativo** por org, e os temas embutidos não podem ser editados. Por padrão **usa uma versão acessível da cor da marca**, e o override não vale para divisor de navegação nem componentes de status/fluxo ([SF Help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.brand_your_org_in_lightning_experience.htm&type=5)). No SLDS 2, a arquitetura separa estrutura de estilo via *styling hooks* ([SF dev](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html)).
- **Zendesk:** o admin define **5 cores** (marca, texto sobre a marca, texto, link, fundo). **No dark mode a cor da marca não muda** ([Zendesk Help](https://support.zendesk.com/hc/en-us/articles/203950436-Branding-the-agent-interface)).
- **Shopify admin:** **não é customizável pelo lojista**. Apps embutidos herdam o visual automaticamente, e o novo visual (Polaris, com Inter) está sendo liberado a partir de 15/09/2026 segundo o changelog ([shopify.dev](https://shopify.dev/changelog/posts/prepare-your-app-for-the-shopify-admins-new-look)).
- **SAP:** o cliente cria tema próprio no **UI Theme Designer** ([SAP Learning](https://learning.sap.com/courses/learning-the-basics-of-sap-fiori/using-the-ui-theme-designer_e269f16a-7009-4467-9b6f-4d3dd689da32)).
- **Pipefy:** White Label esconde o logo Pipefy e aplica a marca do cliente ([Pipefy](https://help.pipefy.com/en/articles/8365213-pipefy-white-label-bring-your-company-s-brand-to-the-pipefy-environment)).
- **Regra para o GACO:** como o cliente vai trocar a cor, **a identidade do GACO não pode morar na cor.** Ela deve morar em **forma**: tipografia, grid, espessura de filete, ícones de ponta quadrada, o "detalhe assinatura" de cada direção, microcópia e comportamento. A cor do cliente entra em **2–3 slots controlados**: logo, faixa/topo e botão primário. Passa por **clamp de contraste** (como a Salesforce, com versão acessível automática e texto sobre a marca calculado) e **não entra** em status, gráficos nem alertas. Em dark, calcular uma variante da cor do cliente em OKLCH (mesma matiz, L ajustado).

---

## 6. Direções de identidade para o GACO

Contrastes WCAG calculados sobre o fundo principal de cada direção. Todas mantêm os **cantos quase retos** e os **ícones de ponta quadrada** atuais, que viram parte da assinatura. Nenhuma usa gradiente, glow, glass ou Tailwind cru.

### Direção A: "LIVRO-CAIXA" (clara/papel, light-first)
**Conceito.** A administradora de condomínio vive de documentos: balancete, livro-caixa, ata, circular, boleto, 2ª via, protocolo. A interface é um **livro contábil bem-feito**: papel levemente cinza (não creme), tinta azul-preta, filetes de pautado e números perfeitamente alinhados. Remete ao **papel-carbono azul** da 2ª via, sem cair na nostalgia.

**Paleta**
| Papel | Hex | Contraste |
|---|---|---|
| Fundo (papel) | `#F5F5F0` | n/a |
| Superfície (folha) | `#FFFFFF` | n/a |
| Filete / pauta | `#E3E3DC` (divisória), `#CFCFC6` (borda de controle) | n/a |
| Texto | `#1B1F24` | 15,1:1 |
| Texto secundário | `#5B616B` | 5,7:1 |
| Texto desabilitado | `#8A9099` | 2,9:1 (só desabilitado/placeholder) |
| **Acento "azul-carbono"** | `#23408E` | 8,75:1; branco sobre ele 9,6:1 |
| Sucesso ("verde-livro") | `#1E6B45` | 5,9:1 |
| Alerta | `#8A5A00` | 5,4:1 |
| Erro ("tinta vermelha" de estorno) | `#B42318` | 6,0:1 |
| Info | usar o acento com tint `#E8ECF6` | n/a |

**Tipografia.** **Schibsted Grotesk** na UI (tnum, zero cortado, origem editorial). **Source Serif 4** para títulos de página e para todo documento gerado (ata, circular, recibo), com `opsz`. Valores sempre em `font-variant-numeric: tabular-nums`, e `slashed-zero` em códigos.
**Superfície / borda / raio.** Sem sombra. Separação por **filete de 1px** e tom de papel. Raio 2px em controles e 0 em tabelas. Tabelas com **pautado alternado muito sutil** (`#FAFAF7`).
**Ícones.** Traço 1,5px, ponta quadrada, canvas 16/20. Um conjunto de "objetos de escritório" (pasta, carimbo, grampo, livro, chave) para os módulos.
**Densidade.** Alta nas tabelas (linha de 32px, texto de 13–14px) e média nos formulários.
**Detalhe assinatura.** **Linha de total com dupla sublinha contábil** (o "double underline" dos balancetes) em todo valor consolidado. Além disso, **carimbos de estado** para documentos: selo retangular com filete duplo, texto e data (ex.: `PAGO · 12/09/26`, `PROTOCOLADO`, `APROVADO EM ASSEMBLEIA`), usados só em estados documentais e nunca como badge genérico.
**Riscos.** Pode ficar "burocrático/cartório" se exagerar no carimbo. Papel claro pode lembrar o "creme + serifa" da IA se o fundo esquentar demais: manter `#F5F5F0` (neutro-esverdeado), **nunca** `#F4F1EA` + terracota. A serifa deve ficar restrita a documentos e títulos.

### Direção B: "CASA DE MÁQUINAS" (escura e sóbria)
**Conceito.** A operação do prédio: portaria, casa de máquinas, quadro de chaves, **placas de latão** do hall e painel de elevador. Um escuro de **grafite**, não preto-azulado de "dev tool", com um único metal quente usado como sinalização discreta. Pensado para quem opera o dia inteiro: portaria, central de atendimento, plantão.

**Paleta**
| Papel | Hex | Contraste |
|---|---|---|
| Fundo (grafite) | `#121517` | n/a |
| Superfície 1 / 2 | `#181C1F` / `#1F2427` | n/a |
| Filete | `#2A3035` | n/a |
| Texto | `#E6E8E6` | 14,9:1 |
| Texto secundário | `#A3AAAD` | 7,8:1 |
| Texto terciário | `#7D858A` | 4,9:1 |
| **Acento "latão"** | `#D2A857` | 8,3:1; texto `#121517` sobre ele 8,3:1 |
| Sucesso | `#5FB38A` | 7,3:1 |
| Alerta | `#EB8A3C` (sempre com ícone, para não confundir com o latão) | 7,2:1 |
| Erro | `#F0776B` | 6,6:1 |
| Info | `#7FA8D9` | 7,4:1 |

**Tipografia.** **Hanken Grotesk** na UI (dígitos sempre tabulares, calma) ou Onest. **Fragment Mono** para identificadores (unidade, bloco, protocolo, placa, OS).
**Superfície / borda / raio.** Camadas por tom (estilo Carbon), sem glow, sem gradiente e sem sombra. Raio 2/4px. Borda de 1px `#2A3035`, e foco com **anel de latão 2px**.
**Ícones.** Os atuais de ponta quadrada, em traço de 1,5px, na cor do texto secundário. Latão só no ativo.
**Densidade.** Máxima: linha de 28–32px, sidebar estreita e atalhos de teclado.
**Detalhe assinatura.** **"Plaquetas"**: todo identificador físico (Bloco B · Ap 1204, Vaga 37, Chave 12) vira uma plaqueta em mono com filete fino e cantos retos, como as plaquinhas gravadas de apartamento. Isso atravessa CRM, tickets, ERP e chat, e ninguém mais faz.
**Riscos.** "Escuro + um acento quente" é o default de segunda geração da IA. O que salva é a **temperatura grafite, não azul**, o **latão dessaturado** (não laranja/vermelhão), zero glow e a plaqueta. Em dark, a cor do cliente white label precisa de variante calculada. Também é preciso oferecer tema claro equivalente, porque síndicos e conselheiros usam de dia e no celular.

### Direção C: "AZULEJO" (ousada)
**Conceito.** O hall do prédio brasileiro: **azulejaria modernista** e pisos modulares, a tradição que Athos Bulcão levou para edifícios em Brasília, com um módulo simples que se repete e vira padrão. O GACO é um sistema de módulos, e cada módulo é um "azulejo" desenhado sobre a mesma grade 2×2. **Usar como inspiração, não como reprodução.** A obra de Athos Bulcão tem direitos geridos pela Fundação Athos Bulcão (não verifiquei os termos, então é preciso consultar antes de qualquer citação explícita).

**Paleta**
| Papel | Hex | Contraste |
|---|---|---|
| Fundo | `#FAFAF7` | n/a |
| Superfície | `#FFFFFF` | n/a |
| Texto | `#111111` | 18,1:1 |
| Texto secundário | `#55585E` | 6,8:1 |
| **Acento "azul-azulejo"** (cobalto) | `#1A3DB8` | 8,4:1; branco sobre ele 8,7:1 |
| Sucesso | `#12804F` | 4,75:1 |
| Alerta | `#A15C00` | 5,0:1 |
| Erro | `#C02A1D` | 5,6:1 |
| Famílias de módulo (só em tiles) | cobalto `#1A3DB8`, verde-garrafa `#12804F`, ocre `#B8860B`, preto `#111111` | n/a |

**Tipografia.** **Bricolage Grotesque** no display (opsz alto, wdth reduzido para títulos de página e números grandes de dashboard). **Instrument Sans** na UI (com wdth 75–100 para colunas estreitas).
**Superfície / borda / raio.** Raio 0 nos tiles e 2px nos controles. Blocos de **cor chapada** (sem gradiente) só em áreas estruturais: launcher de módulos, capa do módulo e estados vazios. Filetes pretos de 1px em tabelas.
**Ícones.** Cada módulo tem um **glifo-azulejo**: quadrado dividido em 2×2 com quartos de círculo, diagonais e meias-luas, combinados de forma única. É o mesmo sistema geométrico dos ícones de ponta quadrada, então os ícones de ação continuam de traço.
**Densidade.** Média. A ousadia fica na moldura (launcher, capas, vazios) e o miolo de trabalho é sóbrio.
**Detalhe assinatura.** **O padrão de azulejos gerado pelos próprios módulos que o cliente contratou.** A tela de entrada e o cabeçalho do condomínio mostram um "painel de azulejos" composto pelos glifos dos módulos ativos. É uma assinatura gerativa, única por cliente, e **sobrevive ao white label** (o padrão pode ser tingido com a cor do cliente).
**Riscos.** Virar decoração: o padrão tem de ficar fora das telas de trabalho. Pode soar "cultural/turístico" se mal dosado. Bricolage é expressiva e cansa em corpo pequeno (usar só em display). É a direção que exige mais direção de arte.

### Direção D: "PROTOCOLO" (neutra, pensada para white label)
**Conceito.** Tudo que a administradora faz vira **protocolo**: número, data, hora, responsável e status. A interface é quase acromática para receber qualquer marca de cliente. A identidade GACO fica na **tipografia de registro** (mono para números de protocolo e carimbo de tempo), na **linha do tempo vertical** de cada registro e no rigor do grid.

**Paleta**
| Papel | Hex | Contraste |
|---|---|---|
| Fundo | `#FFFFFF` (com `#F6F7F7` para áreas de apoio) | n/a |
| Texto | `#16181B` | 17,8:1 |
| Texto secundário | `#5F646C` | 6,0:1 |
| **Acento padrão GACO (substituível pela marca do cliente)** | grafite `#3A3F46` | 10,6:1; branco sobre ele 10,6:1 |
| Sucesso / Alerta / Erro | `#15803D` / `#A16207` / `#B91C1C` | 5,0 / 4,9 / 6,5:1 |
| Tema escuro equivalente | fundo `#15171A` e demais tons pela mesma matiz em OKLCH | n/a |

**Tipografia.** **Public Sans** na UI (institucional, tnum). **JetBrains Mono** ou **Fragment Mono** para protocolos, horários e valores em extratos.
**Superfície / borda / raio.** Filete de 1px, raio 2px e nenhuma sombra fora de popovers.
**Ícones.** Os atuais, de ponta quadrada, sempre monocromáticos.
**Densidade.** Alta, ajustável pelo usuário (compacto/confortável).
**Detalhe assinatura.** **A "fita de protocolo"**: todo objeto (ticket, cobrança, OS, lead, matrícula no Academy) tem no topo uma linha mono no formato `GACO-2026-004812 · aberto 12/09 14:03 · Portaria → Financeiro`, com a mesma forma em todos os módulos. Clicar abre a linha do tempo vertical com filete e nós quadrados. É o fio que costura os 5 produtos.
**Riscos.** É a mais segura e a que tem mais chance de parecer "genérica" se a fita de protocolo e o mono não forem levados a sério. Funciona melhor como **base técnica** combinada com A ou B do que como identidade isolada.

### Recomendação de direção de arte
- **Caminho principal: A "Livro-Caixa" como tema padrão (claro) + B "Casa de Máquinas" como tema escuro oficial**, compartilhando tipografia, grid, ícones e o sistema de "fita de protocolo" da D. A C "Azulejo" entra como **camada de marca** (launcher, onboarding, marketing, estados vazios) se o dono quiser ousadia sem comprometer a operação.
- Remover imediatamente: gradiente do botão, brilho radial, Syne, as 15 cores de módulo (virar 4 famílias + glifos) e os hex crus do Tailwind (`#F97316`, `#FB923C`, `#2563EB`).
- Manter: cantos quase retos, ícones de ponta quadrada e tema escuro (como opção, não padrão).
- Médio prazo: encomendar uma **fonte GACO** (ou uma customização de uma OFL, como a Atlassian fez com o Inter) a uma fundição brasileira (Plau, Fabio Haag Type, Blackletra). Precedentes: Nu Sans, Ping Pong da Conta Azul.

---

## Apêndice: fontes consultadas (lista)
- avoid-ai-design: https://github.com/funboy322/avoid-ai-design
- Anthropic frontend-design skill: https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
- vibecodekit: https://vibecodekit.dev/ai-slop-design · designpixil: https://designpixil.com/blog/ai-slop-design · uxskill: https://uxskill.laithjunaidy.com/what-is-ai-slop.html · https://uxskill.laithjunaidy.com/blog/shadcn-ui-looks-generic.html
- 925studios: https://www.925studios.co/blog/ai-slop-design-tells · mania.design: https://www.mania.design/blog/spot-the-slop-a-ui-designers-guide-to-fixing-ai-defaults/
- HN: https://news.ycombinator.com/item?id=46179202 · Medium: https://medium.com/@ryan.almeida86/why-modern-saas-apps-all-look-the-same-f99de1192fac · https://rectangle.substack.com/p/the-linear-effect · https://www.overpass.studio/blog/why-saas-websites-look-the-same
- Linear: https://linear.app/now/how-we-redesigned-the-linear-ui · https://linear.app/changelog/2024-03-20-new-linear-ui · https://linear.app/changelog/2026-03-12-ui-refresh · https://linear.app/now/behind-the-latest-design-refresh
- Stripe/Söhne: https://klim.co.nz/fonts/soehne/ · https://fontsinuse.com/uses/35338/stripe-website-2020 · https://www.designsystems.one/design-systems/stripe-design
- Geist: https://vercel.com/font
- Notion: https://www.notion.com/help/customize-and-style-your-content · https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign · https://www.itsnicethat.com/articles/buck-notion-graphic-design-illustration-project-170724
- Attio: https://verifiedinsider.substack.com/p/design-at-attio · https://www.designmd.co/d/attio-com
- Intercom/Fin: https://www.intercom.com/blog/how-and-why-we-refreshed-our-brand/ · https://www.intercom.com/blog/today-intercom-becomes-fin/ · https://oh-my-design.kr/design-systems/intercom
- Atlassian: https://www.atlassian.com/blog/announcements/our-bold-new-brand · https://atlassian.design/foundations/typography · https://atlassian.design/foundations/logos · https://www.atlassian.com/blog/design/behind-the-screens-building-atlassians-new-icon-system
- Salesforce: https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.customize_ui_enhancedlex.htm&type=5 · https://www.salesforce.com/blog/what-is-slds-2/ · https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html · https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.brand_your_org_in_lightning_experience.htm&type=5
- SAP: https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/visual/theming · https://www.sap.com/design-system/fiori-design-web/v1-108/foundations/visual/colors/morning-horizon
- Carbon: https://v10.carbondesignsystem.com/guidelines/themes/overview/
- Zendesk: https://garden.zendesk.com/design/color/ · https://support.zendesk.com/hc/en-us/articles/203950436-Branding-the-agent-interface
- Pipedrive: https://www.pipedrive.com/en/newsroom/pipedrive-unveils-its-new-evolved-brand-reflecting-the-companys-commitment-to-driving-the-growth-of-smbs
- monday: https://www.brand-monday.com/typography · https://github.com/mondaycom/vibe/blob/master/packages/core/README.md
- Mercury: https://designmd.cc/benchmarks/mercury · Ramp: https://fontsinuse.com/uses/56961/ramp-2023-campaign · Rippling: https://www.rippling.com/blog/how-we-pulled-off-an-in-house-rebrand-in-four-months · Retool: https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_retool_done_in_house.php · Pylon: https://x.com/slopeagency/status/1957881595861561827 · Height: https://x.com/height_app/status/1903820182557999555
- Shopify: https://shopify.dev/changelog/posts/prepare-your-app-for-the-shopify-admins-new-look
- Radix: https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette · Evil Martians: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl · https://github.com/evilmartians/harmonizer
- Brasil: https://blog.nubank.com.br/nu-sans/ · https://medium.com/@blackletra/designing-nubanks-typeface-69e47072f8fb · https://propmark.com.br/anunciantes/stone-apresenta-nova-identidade-visual-para-reforcar-posicionamento-como-ecossistema-de-solucoes-financeiras/ · https://medium.com/design-contaazul/branding-como-constru%C3%ADmos-a-nova-identidade-visual-da-marca-conta-azul-f998075e44e5 · https://www.omie.com.br/blog/omie-anuncia-rebranding-e-ampliacao-do-foco-para-grandes-empresas-em-2021/ · https://www.rdstation.com/nova-marca/ · https://www.behance.net/gallery/176469417/Pipefy · https://www.vtex.com/en-us/brand-guidelines/ · https://www.behance.net/gallery/150524005/Superlogica-Rebranding?locale=en_US · https://medium.com/vindi/nova-marca-vindi-df898d414e40 · https://www.cora.com.br/blog/campanha-institucional/ · https://abduzeedo.com/quintoandars-branding-visual-identity-redefines-real-estate · https://portal.loft.com.br/loft-marca-unica/
- Fontes: https://github.com/google/fonts · https://www.fontshare.com/fonts/satoshi · https://klim.co.nz/faqs/ · https://www.grillitype.com/typeface/gt-america · https://plau.design/faq/ · https://fabiohaagtype.com/en/product-category/fonts/
