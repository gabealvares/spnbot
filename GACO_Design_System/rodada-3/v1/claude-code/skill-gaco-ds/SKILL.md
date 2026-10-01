---
name: gaco-ds
description: Use ao criar, revisar ou reescrever qualquer tela, componente, estilo ou ícone do frontend GACO. Aplica o design system V1 Livro-Caixa e remove resquícios do design system antigo.
---

# GACO V1 Livro-Caixa

1. Leia `design-system/v1/README-SISTEMA.md` e `design-system/v1/sistema/tokens.css` antes de qualquer alteração visual.
2. Ache o modelo da tela em `design-system/v1/index.html` (por módulo) e leia o HTML do modelo. Siga a estrutura, os rótulos, a ordem dos botões, o fluxo e os estados dele.
3. Converta o HTML do modelo para o framework do projeto como componente reutilizável. As classes `.lc-*` e os tokens são o contrato: não renomeie, não duplique, não crie variações locais.
4. Componente que não existe no DS: crie no arquivo de componentes do DS do projeto, documente e reutilize. Nunca estilo solto na tela.
5. Ao terminar cada tela: sem cor/fonte/tamanho literal (grep por `#[0-9a-fA-F]{3,6}`, `rgb(`, `px` fora dos tokens), sem import do DS antigo, temas claro e escuro funcionando, foco visível, 390 px sem rolagem lateral, testes e build passando.
