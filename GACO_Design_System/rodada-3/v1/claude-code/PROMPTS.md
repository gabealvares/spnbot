# Prompts para o Claude Code no repositório do frontend

Rode um por vez. Revise o diff e faça commit entre eles.

## 1. Inventário (não altera nada)
Leia CLAUDE.md e a skill gaco-ds. Faça um inventário do design system atual deste frontend: arquivos de tema, tokens, variáveis, bibliotecas de UI e ícones no package.json, componentes base, CSS global, e todos os lugares que os usam (com contagem por arquivo). Mapeie cada tela/rota do produto para o modelo correspondente em design-system/v1/index.html e liste as que não têm modelo. Grave em docs/migracao-ds.md com um plano em fases (fundação, componentes base, telas por módulo, remoção). Não altere código.

## 2. Fundação
Seguindo docs/migracao-ds.md, instale a fundação V1 no projeto: tokens.css, base.css, componentes.css e os extra-* fundidos conforme README-SISTEMA.md seção 9, fontes locais de sistema/fontes, ícones de icones.js como componente <Icone nome>, marca.js como provedor de tema/marca, moldura.js como layout (trilho + barra do módulo). Configure lint (stylelint/eslint) para barrar cor e fonte literais e imports do DS antigo. Build e testes devem passar.

## 3. Componentes base
Reescreva os componentes base (botão, campos, select, tabela, modal, painel lateral, abas, toast, barra de salvar, paginação, etiqueta, avatar, vazio/erro/carregando) usando as classes .lc-* de 03-componentes, 04-formularios e 05-tabelas-e-listas. Mantenha a API pública dos componentes quando possível para não quebrar telas. Testes e build passando.

## 4. Telas, um módulo por vez (repita trocando o módulo)
Reescreva todas as telas do módulo <Financeiro> seguindo os modelos 26*.html, os fluxos de 11-fluxos-de-salvar e 12-fluxos-de-navegacao e os estados de 14-feedback-e-estados. Não mude regra de negócio nem chamadas de API; só interface e fluxo. Use subagentes em paralelo por tela se ajudar. Ao final, rode build, testes e capture as telas em 1440 e 390, claro e escuro, comparando com os modelos.

## 5. Remoção do DS antigo
Remova tudo do design system antigo: arquivos de tema e tokens, componentes antigos sem uso, CSS global antigo, dependências de UI e ícones antigas do package.json, aliases e configurações. Prove com grep que não sobra nenhuma referência (liste os comandos e o resultado vazio). Build, testes e lint passando.

## 6. Auditoria final
Use /web-design-guidelines e a skill gaco-ds para auditar o frontend inteiro contra o DS V1: valores literais, telas sem estados, fluxos diferentes do modelo, acessibilidade. Corrija o que encontrar e grave o relatório em docs/migracao-ds.md.
