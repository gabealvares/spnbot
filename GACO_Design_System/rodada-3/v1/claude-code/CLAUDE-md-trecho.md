## Design system (obrigatório)

O único design system deste frontend é o **GACO V1 Livro-Caixa**, em `design-system/v1/`.
- Fonte da verdade: `design-system/v1/sistema/tokens.css` (cores, tipografia, espaço, raios, temas, white label), `componentes.css` (classes `.lc-*`), `icones.js` (ícones), `moldura.js` (navegação: trilho de módulos + barra do módulo), `marca.js` (marca do cliente e tema) e os `extra-*` listados no README-SISTEMA.md seção 9.
- Cada tela do produto tem um modelo em `design-system/v1/NN-*.html`. Antes de mexer numa tela, abra o modelo correspondente (índice em `design-system/v1/index.html`) e reproduza estrutura, posição dos botões, fluxo de salvar e estados (vazio, carregando, erro, sem permissão).
- Proibido: cor, fonte, sombra, raio ou espaçamento escrito à mão (use variável de tokens.css); biblioteca de UI externa (MUI, Bootstrap, Ant, Chakra, shadcn etc.); ícones de outro conjunto; fileira de KPIs na Home.
- White label: a cor do cliente só entra por `--marca*` e nunca pinta estado, contador, etiqueta ou bolha de conversa.
- Fluxos fixos: edição no próprio registro; barra de salvar só aparece com alteração, com "Salvar ▾"; "14 de 63" com anterior/próximo; lista lembra filtro e posição; lixeira de 30 dias com desfazer.
- Textos da interface em português do Brasil, sem "A · B" como separador.
