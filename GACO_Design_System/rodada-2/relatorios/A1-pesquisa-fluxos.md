# A1 — Pesquisa de fluxos de tela em sistemas B2B maduros (base para o redesenho do GACO)

Data da pesquisa: 30/09/2026 · Foco: usabilidade de quem opera o sistema o dia todo (backoffice de administradora de condomínio / empresa de serviços), não visual.

## 0. Método e limites (leia antes)

- **Acesso à internet restrito.** O proxy desta sessão bloqueou por política o acesso direto (WebFetch/curl) à maioria dos sites oficiais: `experience.sap.com`, `www.sap.com`, `polaris-react.shopify.com`, `carbondesignsystem.com`, `primer.style`, `design.gitlab.com`, `www.nngroup.com` e outros. **Não contornei o bloqueio.**
- Por isso usei duas fontes:
  - **[aberto]**: páginas que abri e li na íntegra. São as fontes oficiais publicadas no GitHub: Primer (`github.com/primer/design`), SAP (`github.com/SAP-docs/sapui5`, a documentação oficial do SAPUI5/Fiori elements) e Microsoft (`github.com/MicrosoftDocs/powerapps-docs`).
  - **[busca]**: páginas oficiais que apareceram no buscador, com o trecho que o buscador devolveu. As URLs são reais (vieram da busca), mas li o resumo do buscador e não a página inteira. Antes de citar literalmente em um documento de decisão, vale confirmar no navegador.
- Não inventei nenhuma URL. Todas as URLs abaixo apareceram na busca ou foram abertas.

---

## 1. Bases de design system relevantes para ERP/CRM/Helpdesk

| Sistema | Por que importa para o GACO | URL (encontrada) |
|---|---|---|
| Salesforce Lightning Design System 2 (tema Cosmos) | CRM de referência: página de registro, edição inline, console com abas, split view, densidade por usuário | https://www.lightningdesignsystem.com/2e1ef8501 · https://www.salesforce.com/blog/what-is-slds-2/ · https://help.salesforce.com/s/articleView?id=release-notes.rn_slds_slds2.htm&language=en_US&release=254&type=5 |
| SAP Fiori (Fiori elements) | ERP de referência: List Report + Object Page, rascunho (draft), footer toolbar, "Save and Next", flexible column layout | https://github.com/SAP-docs/sapui5 (docs oficiais) · https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/best-practices/global-patterns/action-placement |
| Microsoft Fluent 2 + Dynamics 365 / Power Apps model-driven | Quick create, autosave de 30 s, navegação por conjunto de registros, multisessão, chat do Teams dentro do registro | https://fluent2.microsoft.design/components/web/react/core/button/usage · https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/create-edit-quick-create-forms |
| IBM Carbon | Regras claras de ordem de botões por contexto, batch actions em tabela, estados vazios | https://carbondesignsystem.com/components/button/usage/ · https://carbondesignsystem.com/patterns/forms-pattern/ |
| Atlassian Design System | Edição inline (Jira), navegador de issues com anterior/próximo | https://atlassian.design/components/inline-edit/inline-editable-textfield/ |
| Shopify Polaris | Contextual save bar e page actions (salvar no rodapé) | https://polaris-react.shopify.com/components/deprecated/contextual-save-bar · https://polaris.shopify.com/components/actions/page-actions |
| GitHub Primer | Padrão de salvamento muito explícito (um botão por página, nunca desabilitar Salvar), atalhos de teclado | https://github.com/primer/design/blob/main/content/ui-patterns/saving.mdx [aberto] · https://primer.style/accessibility/patterns/keyboard-shortcuts/ |
| GitLab Pajamas | Padrão "Saving and feedback", ordem de botões pela borda externa | https://design.gitlab.com/patterns/saving-and-feedback/ |
| PatternFly (Red Hat) | Primary-detail, seleção em massa, modais | https://www.patternfly.org/patterns/primary-detail/design-guidelines/ · https://www.patternfly.org/components/table/design-guidelines/ |
| Zendesk Garden + Zendesk Agent Workspace | Helpdesk: views, painel de contexto, "Submit as" com próxima ação | https://garden.zendesk.com/content/principles/ · https://support.zendesk.com/hc/en-us/articles/4408883355546 |
| HubSpot (Canvas / UI extensions) | Registro em 3 colunas, edição por propriedade, lixeira de 90 dias | https://knowledge.hubspot.com/records/work-with-records · https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/overview |
| Twilio Paste | Tem padrões dedicados de "Create" e "Delete" | https://paste.twilio.design/ |
| Workday Canvas | ERP de RH: rótulos de botão com verbo e objeto | https://canvas.workday.com/guidelines/content/ui-text/buttons-and-calls-to-action |
| ServiceNow Horizon (Next Experience) | Workspace com abas de registro, record page, lista com paginação | https://horizon.servicenow.com/workspace/components/record-page-tabs · https://horizon.servicenow.com/workspace/patterns/navigation/navigation-pattern |
| GOV.UK Design System | "Check answers" com links "Alterar", botão à esquerda, clareza extrema | https://design-system.service.gov.uk/components/summary-list/ |
| Ant Design / Ant Design Pro | Templates de página (lista, tabela, detalhe, formulário) para backoffice | https://ant.design/docs/spec/research-form/ · https://ant.design/docs/spec/data-list/ |
| Elastic EUI | Bottom bar fixa para formulários longos | https://eui.elastic.co/docs/components/containers/bottom-bar/ |
| **AWS Cloudscape** (achado extra, muito relevante) | Padrões de *gestão de recurso*: quando criar em modal ou em página, edição, 3 níveis de exclusão, alterações não salvas | https://cloudscape.design/patterns/resource-management/create/ · https://cloudscape.design/patterns/general/unsaved-changes/ |

**Agregadores úteis para achar outras bases:**
- Adele (UXPin), repositório de design systems públicos: https://adele.uxpin.com/zendesk-garden · https://adele.uxpin.com/twilio-paste
- The Component Gallery (cerca de 90 design systems, mais de 2.500 exemplos, busca por componente): referência em https://www.vintasoftware.com/lessons-learned/the-component-gallery-is-an-up-to-date-repository-of-interface-components
- Design Systems Repo (curadoria de Jad Limcaco): https://uiuxshowcase.com/resources/design-systems-repo/
- Awesome Design System: https://github.com/flipflop/Awesome-Design-System
- designsystems.surf (fichas de Atlassian, Zendesk, Workday, Twilio): https://designsystems.surf/design-systems/atlassian

> Recomendação de base: para um ERP/CRM de backoffice, os mais úteis são **Fiori** (fluxo de objeto e rascunho), **Cloudscape** (regras objetivas de criar, editar e excluir), **Salesforce/Dynamics** (CRM, console, quick create) e **Zendesk/Help Scout** (fila de atendimento). O Carbon é bom para as regras de tabela e de botões.

---

## 2. Salvar

### 2.1 Salvar explícito, autosave ou rascunho

| Padrão | Quem usa | Como funciona |
|---|---|---|
| **Salvar explícito** (padrão inicial) | GitHub Primer [aberto] — https://github.com/primer/design/blob/main/content/ui-patterns/saving.mdx | "Start with this pattern for forms". Nunca misturar salvar explícito e automático no mesmo formulário: "never mix save patterns in a single form". "There should only be one save button on a page". **Não desabilitar o Salvar** (botão desabilitado não recebe foco e tem pouco contraste). |
| **Salvar automático em controles imperativos** | Primer (mesma página) | Toggles e segmented controls aplicam na hora. |
| **Manual + autosave** | GitLab Pajamas — https://design.gitlab.com/patterns/saving-and-feedback/ | Define os dois métodos. Ao sair sem salvar, o modal "Your changes are not saved" oferece *Save changes* (primário) e *Discard changes and leave page*. |
| **Autosave com indicador** | Dynamics 365 / Power Apps — https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/manage-auto-save | Salva 30 s depois da alteração e também ao sair do registro. Só vale para registro existente (**não vale no formulário de criação**). No canto inferior direito aparece "Unsaved changes"; erros de validação aparecem no rodapé e bloqueiam o autosave. |
| **Rascunho (draft) com autosave** | SAP Fiori elements [aberto] — https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/draft-handling-b0eb3cc.md | O rascunho é salvo em segundo plano a cada 20 s e também ao sair de campos com side effects. "An indicator shows when a draft is saved implicitly". O objeto ativo só muda no **Salvar** explícito. É um rascunho exclusivo: o objeto fica bloqueado para outros usuários ([busca] https://www.sap.com/design-system/fiori-design-web/v1-38/foundations/best-practices/global-patterns/object-handling/draft-handling). |

**Evidência (NN/g):** usuários aprenderam a salvar explicitamente. O autosave evita perda de trabalho, mas convém manter um "Salvar" visível e um status claro (heurística de visibilidade do status do sistema) — https://www.nngroup.com/articles/user-control-and-freedom/ · https://www.nngroup.com/articles/usability-heuristics-complex-applications/ [busca].

**Prós e contras para quem opera o dia todo:**
- Salvar explícito. Prós: previsível e auditável, o que importa em dado financeiro, contrato ou cobrança. Contras: perde trabalho se a pessoa esquecer, e exige o modal de "sair sem salvar".
- Autosave puro. Prós: nada se perde. Contras: grava estado intermediário inválido e dispara integrações e notificações antes da hora. Em ERP é arriscado em campos com efeito colateral (valor de boleto, status).
- **Rascunho + Salvar (Fiori).** Prós: une os dois. O trabalho não se perde, a publicação continua deliberada e o rascunho aparece na lista ("meus rascunhos"). Contras: exige backend (tabela de rascunho, bloqueio, expiração).

### 2.2 Onde fica o botão Salvar

| Posição | Quem usa | Detalhe |
|---|---|---|
| **Barra contextual que aparece só quando há alteração** | Shopify Polaris Contextual Save Bar — https://polaris-react.shopify.com/components/deprecated/contextual-save-bar (hoje "App Bridge Save Bar") | Aparece quando o formulário tem alterações. Salva ou descarta **tudo** da página. Mensagem "Unsaved changes" ou "Unsaved {recurso}". Evitar vários formulários editáveis ao mesmo tempo; para seções independentes, usar "Edit" que abre um modal por seção. |
| **Footer toolbar fixo (ações finalizadoras)** | SAP Fiori — https://www.sap.com/design-system/fiori-design-web/v1-71/ui-elements/footer-toolbar/usage · [aberto] https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/actions-cbf16c5.md | Botões **sempre à direita**, do mais usado para o menos usado. Rodapé só para ações que valem para a página inteira ("Don't define actions that are specific to a control or parts of the page as finalizing actions"). Não se usa em List Report. |
| **Page actions no fim da página** | Polaris Page actions — https://polaris.shopify.com/components/actions/page-actions | Primário (Salvar) à direita, destrutivo (Excluir) à esquerda. Existe porque "o CTA primário fica difícil de alcançar no fim da página". |
| **Bottom bar escura fixa** | Elastic EUI — https://eui.elastic.co/docs/components/containers/bottom-bar/ | Para páginas longas e formulários complexos. Só aparece quando o formulário está em estado salvável. Em Kibana/Advanced Settings lista as alterações pendentes (https://github.com/elastic/kibana/pull/53693). |
| **Docked form footer ao editar** | Salesforce — record detail em edição: ao clicar no lápis de um campo, todos os campos editáveis abrem e aparecem Cancelar/Salvar (https://developer.salesforce.com/docs/platform/lwc/guide/data-edit-record) | O rodapé fixo aparece só no modo edição. |
| **Botão ao lado do input (inline)** | Primer [aberto] | Na edição inline, Salvar/Cancelar ficam colados ao campo. |

**Evidência sobre botão fixo (sticky):** não achei estudo NN/g ou Baymard específico sobre "sticky save". Os indícios são de design systems (Polaris Page actions, EUI, Fiori) e de um artigo da UX Movement dizendo que usuários **não percebem** botões de formulário colocados na barra de ação superior e saem sem salvar — https://uxmovement.com/mobile/why-users-miss-form-buttons-placed-in-the-action-bar/ [busca]. Conclusão prática: o Salvar deve ficar no fim do fluxo de leitura (rodapé fixo) e não só no cabeçalho.

### 2.3 "Salvar e fechar / Salvar e novo / Salvar e próximo"

| Variação | Quem usa | Fonte |
|---|---|---|
| **Save and Next** (salva e abre o próximo objeto da lista já em edição) | SAP Fiori elements (OData V2, `editFlow: direct`) | [aberto] https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/navigation-to-an-object-page-in-edit-mode-7952b13.md |
| **Save and Back / Create and Back** (salva e volta à lista) | SAP Fiori elements (`enableSaveAndLeave`). O padrão é **ficar** no objeto depois de salvar. | [aberto] https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/save-and-navigation-options-on-the-object-page-55d81bc.md |
| **Save & New** | Salesforce, modal de criação (Cancel · Save & New · Save) | [busca] https://trailhead.salesforce.com/trailblazer-community/feed/0D54V00007PfyWJSAZ |
| **Submit as + próxima ação**: "Close tab", "Next ticket in view", "Stay on ticket" | Zendesk | [busca] https://support.zendesk.com/hc/en-us/articles/4408883355546-Introduction-to-the-Support-agent-interface-standard-agent-interface |
| **Send and stay / Send and back to folder / Send and next active**, com padrão escolhido por usuário | Help Scout | [busca] https://docs.helpscout.com/article/228-redirect-options |
| **Send and set as [status]** | Freshdesk | [busca] https://support.freshdesk.com/en/support/articles/37562-replying-to-a-ticket |

Prós: menos cliques em trabalho de lote (conferir 170 leituras de hidrômetro, baixar boletos, triar chamados). Contras: botões demais no rodapé. O padrão Zendesk/Help Scout resolve isso com **um botão principal + seta de menu com a ação seguinte**, lembrando a última escolha.

### 2.4 Edição inline, página de edição ou modo edição da página inteira

| Modelo | Quem usa | Prós e contras |
|---|---|---|
| **Click-to-edit por campo** (lápis no hover) | Salesforce (lápis no registro e na list view: https://help.salesforce.com/s/articleView?language=en_US&id=inline_editing_in_a_list.htm&type=5), HubSpot (sidebar esquerda: https://knowledge.hubspot.com/records/work-with-records), Atlassian/Jira (https://atlassian.design/components/inline-edit/inline-editable-textfield/) | + muito rápido para ajustar 1 ou 2 campos. − difícil validar regras entre campos; risco de alterar sem querer; ruim para quem usa só teclado se não for bem feito. |
| **Edição por seção** (botão "Editar" no cabeçalho da seção, que vira Salvar/Cancelar) | SAP Fiori "partial edit in place" (o preferido) e "partial edit with dialog" — https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/best-practices/global-patterns/object-handling/manage-parts-of-an-object [busca]; Cloudscape: o Edit do container abre modal só daquele container — https://cloudscape.design/patterns/resource-management/edit/ | + escopo claro, valida o grupo, pouco risco. − um clique a mais que o inline. **É o melhor meio-termo para ERP.** |
| **Modo edição da página inteira** (Editar → tudo editável → footer Salvar/Cancelar) | SAP Fiori Object Page (display/edit + draft) — https://www.sap.com/design-system/fiori-design-web/v1-96/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements; Cloudscape "Page edit" — https://cloudscape.design/patterns/resource-management/edit/page-edit/ | + transacional, bom para cadastro complexo. − pesado para ajustes pequenos. |
| **Página de edição separada** | Cloudscape (edição em página única ou em várias páginas, conforme a complexidade) | + foco. − perde o contexto do detalhe e soma um vai-e-volta. |

Em todos: **aviso de perda de dados** ao sair ou cancelar com alterações (Fiori, Cloudscape, Pajamas, PatternFly). A Cloudscape reforça que o modal **não** deve aparecer se nada mudou — https://cloudscape.design/patterns/general/unsaved-changes/.

---

## 3. Vai e volta (navegação)

| Padrão | Quem usa | Prós e contras |
|---|---|---|
| **Ficar no registro depois de salvar** (padrão) e oferecer "Salvar e voltar" como opção | Fiori elements [aberto] (link em 2.3) | + o usuário confere o resultado. − para trabalho em lote, é melhor "Salvar e próximo". |
| **Anterior/próximo dentro do detalhe, com posição ("3 de 170")** | Jira Issue Navigator: um mini-navegador no título mostra a posição no resultado, com setas para anterior e próximo — https://confluence.atlassian.com/jira061/jira-user-s-guide/searching-for-issues/using-the-issue-navigator; Dynamics 365 "record set navigation": setas e painel com a lista da view, volta à lista pelo cabeçalho — https://community.dynamics.com/blogs/post/?postid=8c85116f-9126-4b96-81a9-224c8bbbac70; Zendesk "Next ticket" no canto superior direito (link Zendesk acima); Help Scout J/K — https://docs.helpscout.com/article/419-keyboard-shortcuts | + elimina o vai-e-volta lista → registro → lista. − exige guardar o conjunto de resultados (query + ordenação) na sessão ou na URL. |
| **Split view / primary-detail / flexible column layout** | Salesforce Split View (lista à esquerda, registro à direita, dá para editar sem sair) — https://www.salesforceben.com/your-complete-guide-to-salesforce-split-view/; PatternFly Primary-detail ("navegar pela lista e editar sem perder o contexto") — https://www.patternfly.org/patterns/primary-detail/design-guidelines/; Fiori Flexible Column Layout (lista + objeto + subobjeto em até 3 colunas) — https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/enabling-the-flexible-column-layout-e762257.md | + ótimo para triagem e conferência. − aperta a tela em notebook de 13"; o detalhe fica estreito. |
| **Abas de registros (workspace/console)** | Salesforce Console: abas primárias e subtabs, fixar aba, Shift+W fecha as não fixadas — https://developer.salesforce.com/docs/component-library/bundle/lightning:workspaceAPI; ServiceNow Workspace tabs — https://horizon.servicenow.com/workspace/basics/structure; Dynamics Customer Service workspace: sessões na vertical, abas na horizontal, até 9 sessões — https://learn.microsoft.com/en-us/previous-versions/dynamics365-release-plan/2020wave2/service/dynamics365-customer-service/customer-service-new-multi-session-app | + multitarefa real (atendente com vários condôminos ao mesmo tempo). − carga cognitiva; exige gestão de abas (fechar todas, fixar). |
| **Histórico recente** | Salesforce: Ctrl/Cmd+E para itens recentes; H abre History no console — https://help.salesforce.com/s/articleView?language=en_US&id=service.console_lex_keyboard_shortcuts.htm&type=5 | + volta rápida ao que acabou de ver. |
| **Breadcrumbs** | NN/g: mostram a hierarquia, **não** o histórico da sessão; não quebram linha; truncar com overflow — https://www.nngroup.com/articles/breadcrumbs/ | + orientação em hierarquias (Administradora > Condomínio > Unidade). − não substituem o "voltar à lista filtrada". |
| **Preservar filtro/página/scroll ao voltar** | Heurística "User control and freedom" (NN/g) — https://www.nngroup.com/articles/user-control-and-freedom/; Dynamics record set ("navigate back without losing their place") | Implementação recomendada: **estado da lista na URL** (filtros, ordenação, página) e restauração do scroll e do item em foco. |
| **Command palette** | GitHub (Ctrl/Cmd+K) — https://primer.style/accessibility/patterns/keyboard-shortcuts/; Linear (Cmd+K contextual, mostra o atalho de cada ação e assim ensina as teclas) — https://linear.app/changelog/page/14 | + power users; uma entrada única para ações e destinos. − precisa de bom ranking e contexto. |
| **Abrir em nova aba** | Implícito em todos os que usam URL por registro (Salesforce, HubSpot, Fiori) | Todo registro precisa de URL própria e de links reais (`<a>`), para que o Ctrl+clique funcione. |

---

## 4. Criação

| Padrão | Quem usa | Regra, prós e contras |
|---|---|---|
| **Regra por tamanho** | Cloudscape — https://cloudscape.design/patterns/resource-management/create/ | **Modal para 1 campo; página única para 2 a 15 campos (ou até 5 grupos); multipágina acima de 16 campos ou mais de 5 grupos.** Pedir confirmação ao sair do fluxo com dados. |
| **Quick create** (formulário curto sobreposto, de qualquer lugar: menu +, lookup, subgrid, timeline) | Dynamics 365 / Power Apps — https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/create-edit-quick-create-forms · [aberto] https://github.com/MicrosoftDocs/powerapps-docs/blob/main/powerapps-docs/maker/model-driven-apps/design-productive-forms.md | + cria sem sair do contexto (ex.: cria o contato de dentro do lookup da ocorrência). − só os campos essenciais; o resto vai no formulário completo. |
| **Criação a partir do contexto (sub-recurso)** | Cloudscape Sub-resource create — https://cloudscape.design/patterns/resource-management/create/sub-resource-create/; HubSpot (sidebar direita "Associations": criar ou associar) — https://knowledge.hubspot.com/records/work-with-records; Dynamics (form component control para editar registro relacionado inline, main form dialog) | + o vínculo já vem preenchido (condomínio → unidade → morador). |
| **Modal x página** | NN/g: modal para tarefas curtas e focadas, avisos críticos e confirmações; tarefa longa ou em etapas vai em página — https://www.nngroup.com/articles/modal-nonmodal-dialog/ | Modal longo gera armadilha de scroll e perda de trabalho ao fechar sem querer. |
| **Drawer/painel lateral** | PatternFly primary-detail (drawer); Carbon põe o primário à direita em side panels | + mantém a lista visível. − espaço limitado. |
| **Criação inline na tabela** | Salesforce datatable inline edit (edição; criação inline é menos comum) — https://developer.salesforce.com/docs/platform/lwc/guide/data-table-inline-edit.html | + ideal para linhas simples (itens de rateio, leituras). − ruim para validação complexa. |
| **Duplicar/clonar** | Salesforce (Clone), comum em ERPs | + acelera cadastro repetitivo. Recomendação: abrir a cópia em modo edição, com título "Cópia de…" e sem salvar sozinho. |

---

## 5. Posição de ações e ordem de botões

| Sistema | Regra de ordem | Fonte |
|---|---|---|
| **SAP Fiori** | Footer toolbar: botões **alinhados à direita**, do mais usado para o menos usado, e o overflow recolhe primeiro os menos usados. O ícone de mensagens fica à esquerda. Ações globais no cabeçalho; ações de linha na toolbar da tabela. | https://www.sap.com/design-system/fiori-design-web/v1-71/ui-elements/footer-toolbar/usage · [aberto] https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/actions-cbf16c5.md |
| **IBM Carbon** | **Formulário em página: primário à esquerda** (alinhado à esquerda). **Dialog, side panel e wizard: primário à direita**, secundário à esquerda. Em grupos de botões, primário à direita. | https://carbondesignsystem.com/components/button/usage/ · https://carbondesignsystem.com/patterns/forms-pattern/ |
| **GitHub Primer** | Formulário: botão no **canto inferior esquerdo**. Dialog e comentário: **à direita**. Inline: ao lado do campo. | [aberto] https://github.com/primer/design/blob/main/content/ui-patterns/saving.mdx |
| **GitLab Pajamas** | A ação afirmativa fica na **borda externa**: se os botões estão à esquerda, ela é a mais à esquerda; se estão à direita, a mais à direita. | https://design.gitlab.com/patterns/saving-and-feedback/ |
| **Microsoft Fluent 2** | O primário vem **primeiro** (em cima ou à esquerda). No rodapé do dialog, primário à esquerda e secundário à direita (convenção Windows). | https://fluent2.microsoft.design/components/web/react/core/button/usage · https://github.com/microsoft/fluentui/issues/33601 |
| **Shopify Polaris** | Page actions: primário à direita, destrutivo à esquerda. | https://polaris.shopify.com/components/actions/page-actions |
| **Salesforce** | Modal de criação: Cancel · Save & New · **Save** (primário à direita). | [busca] https://trailhead.salesforce.com/trailblazer-community/feed/0D54V00007PfyWJSAZ |
| **Ant Design** | Formulário: grupo de botões **alinhado à esquerda com os inputs**. | https://ant.design/docs/spec/research-form/ |
| **PatternFly** | Modal de edição: primário = primary button, secundário = secondary, Cancelar = **link**. | https://www.patternfly.org/components/modal/design-guidelines/ |
| **Workday Canvas** | Rótulo com até 3 palavras e verbo + objeto ("Submit Expenses"). | https://canvas.workday.com/guidelines/content/ui-text/buttons-and-calls-to-action |

**Evidência (NN/g, OK-Cancel ou Cancel-OK):** há argumentos para os dois lados. OK primeiro segue a ordem de leitura e economiza um Tab; OK por último "fecha" o fluxo e fica onde está o "Avançar". **Seguir a convenção da plataforma importa mais que otimizar um diálogo isolado** — https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/.

**Recomendação para o GACO (web, público brasileiro que usa Windows e Google):** escolher **uma** regra e aplicá-la sempre. A mais comum em SaaS web B2B (Salesforce, Carbon em dialogs, Fiori, Polaris) é **Cancelar à esquerda e primário à direita, no rodapé fixo à direita**, com o destrutivo separado na ponta esquerda.

**Outros pontos de posição:**
- **Cabeçalho do registro fixo (sticky)** com nome, status e ações principais: Fiori Object Page (header com ações globais) e Dynamics (header de alta densidade com até 4 campos e flyout para editar sem navegar — [aberto] design-productive-forms.md).
- **Ações de linha:** reveladas no hover (Polaris index table — https://shopify.dev/docs/api/app-home/patterns/compositions/index-table); coluna de ação inline (Fiori).
- **Bulk actions:** barra que aparece no topo da tabela quando há seleção, com até 5 ações e o resto no overflow; desabilitar as ações de linha enquanto a seleção em massa está ativa; Cancelar à direita da barra (Carbon — https://carbondesignsystem.com/components/data-table/usage/). "Selecionar tudo" pega **só a página atual** quando há paginação (PatternFly — https://www.patternfly.org/components/table/design-guidelines/). Polaris separa `promotedBulkActions` das demais (https://polaris-react.shopify.com/components/tables/index-table).
- **Overflow (⋯):** Fiori ordena por frequência para que os raros caiam primeiro no overflow.

---

## 6. Confirmações, desfazer e exclusão

| Padrão | Quem usa | Regra |
|---|---|---|
| **Três níveis de exclusão** | AWS Cloudscape — https://cloudscape.design/patterns/resource-management/delete/ | (1) **One-click delete + Undo** para itens de baixo risco e fáceis de recriar (https://cloudscape.design/patterns/resource-management/delete/one-click-delete/). (2) **Confirmação simples em modal** para itens que dão trabalho recriar (https://cloudscape.design/patterns/resource-management/delete/delete-with-simple-confirmation/). (3) **Confirmação digitada** ("digite excluir") quando há efeito irreversível ou em cascata (https://cloudscape.design/patterns/resource-management/delete/delete-with-additional-confirmation/). |
| **Undo no lugar de "Tem certeza?"** | NN/g: confirmações só funcionam se forem raras, porque o uso excessivo faz o usuário clicar sem ler; reservar para consequências graves e oferecer undo sempre que possível — https://www.nngroup.com/articles/confirmation-dialog/; Gmail "Undo send" / snackbar do Material — https://m2.material.io/components/snackbars | Executa na hora e mostra um toast com "Desfazer" por alguns segundos. |
| **Soft delete + lixeira** | Salesforce Recycle Bin: 15 dias, restauração pelo App Launcher — https://help.salesforce.com/s/articleView?id=recycle_bin_manage.htm&language=en_US&type=0; HubSpot: 90 dias, mostra quem excluiu e quando, restaura pelo menu Ações da lista — https://knowledge.hubspot.com/articles/kcs_article/contacts/restore-deleted-contacts-companies-deals-or-tickets | Exclusão LGPD/GDPR é permanente e não passa pela lixeira (HubSpot). |
| **Aviso de perda de dados** | Cloudscape, Fiori, Pajamas, PatternFly (links acima) | Mostrar só se houver alteração; opções "Continuar editando" e "Descartar e sair". |

Para quem opera o dia todo, confirmação em tudo gera cegueira ao aviso, e o "Tem certeza?" vira reflexo. Melhor: **undo para ações reversíveis, lixeira para registros e confirmação digitada só para o irreversível** (ex.: excluir condomínio, cancelar remessa bancária).

---

## 7. Listas grandes: paginação, scroll infinito ou "carregar mais"

**Evidência:**
- **NN/g:** scroll infinito serve para navegar sem objetivo por itens homogêneos (feeds) e é ruim para achar um item específico, voltar a ele ou chegar ao rodapé. Alternativas: botão "load more", paginação integrada ao scroll longo e páginas tradicionais — https://www.nngroup.com/videos/infinite-scrolling-when/ · https://www.nngroup.com/videos/alternatives-to-infinite-scrolling/ · https://www.nngroup.com/topic/pagination/
- **Baymard (e-commerce, mais de 50 sites):** "Load more" com lazy-loading teve o melhor desempenho; scroll infinito pode prejudicar, sobretudo em resultados de busca e no mobile; o load more fez o usuário ver mais itens que a paginação — https://www.smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons/
- **NN/g, tabelas de dados:** tabelas precisam apoiar 4 tarefas: encontrar registros por critério, comparar, ver/editar/adicionar uma linha e agir sobre registros — https://www.nngroup.com/articles/data-tables/

**Quem usa o quê em B2B:** ServiceNow record list com controle de paginação (https://horizon.servicenow.com/workspace/components/now-record-list-connected); PatternFly e Carbon com paginação e seleção por página; Intercom e Zendesk com filas (views) e contagem.

**Recomendação para o ERP:** **paginação com total visível ("1–50 de 1.240") e tamanho de página escolhido pelo usuário** em listas de trabalho, porque a posição fica estável, o link é compartilhável, o "voltar" funciona e o "anterior/próximo" do detalhe tem um conjunto definido. "Carregar mais" só em timelines e históricos (ocorrências, mensagens). Scroll infinito, não.

---

## 8. Chat e atendimento

### 8.1 Inbox de atendimento (externo)

| Sistema | Layout | Fonte |
|---|---|---|
| **Zendesk Agent Workspace** | Views (filas salvas) à esquerda; no ticket: propriedades à esquerda, conversa no centro, painel de contexto à direita (solicitante, histórico, apps, base de conhecimento). Botão Submit com "Close tab / Next ticket in view / Stay on ticket". Layouts customizáveis por formulário. | https://support.zendesk.com/hc/en-us/articles/4408883355546-Introduction-to-the-Support-agent-interface-standard-agent-interface · https://support.zendesk.com/hc/en-us/articles/5447690090138-About-custom-layouts-with-layout-builder · https://support.zendesk.com/hc/en-us/articles/4408832735130 |
| **Intercom Inbox** | 3 painéis (navegação, conversa, detalhes do cliente); alterna entre layout **Chat** e **Tabela** com a tecla L; seções da sidebar recolhíveis; apps fixados na sidebar. | https://www.intercom.com/help/en/articles/6258745-the-inbox-explained · https://www.intercom.com/help/en/articles/7911926-customize-the-inbox-to-suit-you-and-how-you-work-best |
| **Front** | Inbox compartilhada; **comentários internos na própria conversa** (o cliente não vê) com @menção; "discussions" internas. | https://help.front.com/en/articles/2256 · https://help.front.com/en/articles/2098 |
| **Help Scout** | J/K para próxima e anterior; R responde; redirecionamento depois de enviar (ficar, voltar à pasta, próxima ativa), escolhido por usuário. | https://docs.helpscout.com/article/419-keyboard-shortcuts · https://docs.helpscout.com/article/228-redirect-options |
| **Freshdesk** | "Send and set as [status]" no botão de enviar. | https://support.freshdesk.com/en/support/articles/37562-replying-to-a-ticket |
| **Dynamics Customer Service workspace** | Multisessão (sessões na vertical, abas na horizontal) + painel de produtividade (scripts, KB, Teams). | link na seção 3 |

### 8.2 Chat interno

- **Slack:** barra lateral com Home/DMs/Activity/Later; canais e DMs em seções customizáveis; threads em canais e DMs; huddle em janela própria que não tapa a sidebar — https://slack.com/help/articles/360043207674-Organize-your-sidebar-with-custom-sections · https://www.computerworld.com/article/2503287/how-to-use-slacks-new-interface.html
- **Teams:** hierarquia time → canal; threads só em canais — https://zapier.com/blog/slack-vs-microsoft-teams/

### 8.3 Chat dentro do registro

- **Dynamics 365 + Teams:** o chat é **conectado ao registro** (caso, conta, contato), todos os participantes veem, e as listas mostram os chats recentes ligados aos registros — https://learn.microsoft.com/en-us/dynamics365/sales/teams-integration/using-teams-chat-in-dynamics · https://learn.microsoft.com/en-us/dynamics365/customer-service/administer/configure-teams-chat
- **Front:** comentário interno ancorado na conversa (acima).
- **HubSpot:** timeline de atividades na coluna central do registro — https://knowledge.hubspot.com/records/work-with-records

Prós e contras: o chat ancorado no registro mantém a decisão junto do dado (auditoria), mas duplica canais se também houver chat geral. Regra: a **conversa sobre um registro vive no registro**; o chat geral fica para o resto.

---

## 9. Superadmin e impersonação ("logado como")

| Sistema | Como mostra e controla | Fonte |
|---|---|---|
| **GitHub Enterprise Server** | Banner no topo "Return to your mundane life as *username*"; **motivo obrigatório**; sessão de no máximo 1 h; **e-mail ao usuário** impersonado (não dá para desligar); ações vão para o audit log da empresa e para o security log do usuário. | https://docs.github.com/en/enterprise-server@3.17/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/impersonating-a-user |
| **Salesforce** | "Log in as" pelo admin (política Login Access); indicação "Logged in as" no topo e link de logout que volta à sessão do admin. | https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.logging_in_as_another_user.htm&type=5 |
| **Zendesk** | "Assume identity" abre **outra aba** logada como o usuário; as ações ficam registradas como feitas pelo usuário; banner com link para reverter. | https://support.zendesk.com/hc/en-us/articles/4408894200474-Assuming-end-users · https://support.zendesk.com/hc/en-us/articles/4408824477082-Granting-Zendesk-temporary-access-to-assume-your-account |
| **Freshdesk** | Assumir identidade de agente ou cliente. | https://support.freshdesk.com/support/solutions/articles/224634-assuming-identities |

**Boas práticas (guias de mercado):** indicador persistente e impossível de ignorar (faixa colorida, borda); motivo registrado; limite de tempo; audit log imutável marcando cada escrita com o contexto de impersonação; opção de modo só leitura — https://yaro-labs.com/blog/user-impersonation-tool-saas [busca].

---

## 10. Densidade, atalhos de teclado e estados vazios

**Densidade**
- Salesforce: cada usuário escolhe **Comfy** ou **Compact**; o Compact tem cerca de 30% mais densidade, com rótulo à esquerda do campo — https://developer.salesforce.com/blogs/2018/08/new-density-settings-for-the-lightning-experience-ui-in-winter-19
- Dynamics: header de alta densidade, primeira aba só com o essencial, sem esconder campo obrigatório — [aberto] https://github.com/MicrosoftDocs/powerapps-docs/blob/main/powerapps-docs/maker/model-driven-apps/design-productive-forms.md
- NN/g: tabelas são mais eficientes que cards para comparar — https://www.nngroup.com/articles/data-tables/

**Atalhos**
- Zendesk: Ctrl+Alt+S/P/O enviam como Resolvido/Pendente/Aberto; Ctrl+Alt+↓ vai ao próximo ticket; Ctrl+Alt+M abre macros — https://support.zendesk.com/hc/en-us/articles/4408832849946-Viewing-and-deactivating-keyboard-shortcuts
- Salesforce console: Ctrl+/ lista atalhos; H abre o histórico; Shift+W fecha abas — link na seção 3
- Help Scout J/K/R; Linear C cria, A atribui, S status, Cmd+K — https://linear.app/changelog/page/14
- Primer: atalho não pode conflitar com navegador, SO ou leitor de tela; testar com NVDA/VoiceOver — https://primer.style/accessibility/patterns/keyboard-shortcuts/
- Zendesk permite **desativar** atalhos (acessibilidade).

**Estados vazios**
- NN/g (3 diretrizes): comunicar o status ("Nenhum registro no período"), ensinar a funcionalidade e dar caminho direto para a tarefa-chave — https://www.nngroup.com/articles/empty-state-interface-design/
- Carbon: título positivo, corpo com a próxima ação, imagem opcional; cobre primeiro uso, "sem resultado de filtro" e erro — https://carbondesignsystem.com/patterns/empty-states-pattern/
- PatternFly: em primary-detail com seleção múltipla, o painel de detalhe mostra um vazio orientando a selecionar — https://www.patternfly.org/patterns/primary-detail/design-guidelines/

---

## 11. Evidência de pesquisa: resumo

| Tema | O que a evidência diz | Fonte |
|---|---|---|
| Autosave | Evita perda, mas usuários esperam salvar explicitamente; mostrar o status. | NN/g https://www.nngroup.com/articles/user-control-and-freedom/ [busca] |
| Botão Salvar fixo | Sem estudo NN/g/Baymard específico; os design systems (Polaris, EUI, Fiori) põem no fim fixo; usuários perdem botões na barra superior. | https://uxmovement.com/mobile/why-users-miss-form-buttons-placed-in-the-action-bar/ |
| OK/Cancel | Consistência com a plataforma acima de tudo. | https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/ |
| Paginação x infinito | Infinito ruim para tarefa orientada; load more melhor em e-commerce; paginação melhor para achar e voltar. | NN/g (vídeos acima); Baymard via https://www.smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons/ |
| Modal x página | Modal para tarefa curta, crítica ou confirmação; longa vai em página; drawer para manter o contexto. | https://www.nngroup.com/articles/modal-nonmodal-dialog/ |
| Confirmação x undo | Confirmação em excesso perde efeito; preferir undo. | https://www.nngroup.com/articles/confirmation-dialog/ |
| Tabelas | 4 tarefas: encontrar, comparar, ver/editar linha, agir. | https://www.nngroup.com/articles/data-tables/ |
| Estados vazios | Status, aprendizado, atalho para a tarefa. | https://www.nngroup.com/articles/empty-state-interface-design/ |
| Breadcrumbs | Hierarquia, não histórico. | https://www.nngroup.com/articles/breadcrumbs/ |

---

## 12. Oportunidades de inovação para o GACO (ERP/CRM de administradoras de condomínio e empresas de serviço)

1. **"Salvar e próximo" com contador "12 de 170" no detalhe.** Para conferência em lote: leituras de consumo, lançamentos de rateio, baixas de boleto, triagem de ocorrências. O conjunto é a lista filtrada de onde o usuário veio. *Base:* Fiori "Save and Next" [aberto], Jira mini-navegador, Dynamics record set navigation, Zendesk "Next ticket in view".
2. **Botão principal com "próxima ação" lembrada por usuário** (Salvar ▾ → ficar / voltar à lista / próximo / novo). *Base:* Help Scout redirect options, Zendesk "Submit as", Freshdesk "Send and set as".
3. **Edição por seção no detalhe** (card "Dados financeiros" → Editar → Salvar/Cancelar só daquela seção), no lugar de um modo edição da página inteira. *Base:* Fiori "partial edit in place" (preferido), Cloudscape "Edit em container", Polaris (uma seção por vez).
4. **Rascunho automático com "Rascunho salvo às 14:32" e item "Meus rascunhos" na lista**, com o registro oficial alterado só no Salvar. Ideal para assembleia, ata, orçamento e contrato de prestador. *Base:* Fiori draft handling [aberto], Dynamics autosave com "Unsaved changes".
5. **Barra de alterações pendentes fixa no rodapé**, que aparece só quando há alteração, lista os campos alterados e oferece Descartar e Salvar. *Base:* Polaris Contextual Save Bar, EUI Bottom bar / Kibana, Fiori footer toolbar.
6. **Fila de trabalho unificada (worklist)** por papel: "Ocorrências sem resposta há mais de 24 h", "Boletos vencidos sem acordo", "Manutenções preventivas da semana", com contadores e "próximo item". *Base:* Zendesk Views, Linear Triage, ServiceNow workspace.
7. **Split view na lista de trabalho** (lista estreita + detalhe editável) com alternância para tabela cheia. *Base:* Salesforce Split View, PatternFly primary-detail, Fiori Flexible Column Layout, Intercom Chat/Table (tecla L).
8. **Estado da lista na URL e restauração exata ao voltar** (filtros, ordenação, página, scroll e linha destacada). *Base:* NN/g "user control and freedom", Dynamics "voltar sem perder o lugar".
9. **Quick create contextual**: criar morador, fornecedor ou unidade a partir do campo de busca (lookup) da ocorrência ou do lançamento, já vinculado ao condomínio atual. *Base:* Dynamics quick create (lookup/subgrid), Cloudscape sub-resource create, HubSpot associations.
10. **Regra objetiva de criação**: 1 campo em modal; 2 a 15 em página; mais que isso em etapas. Acaba com a discussão caso a caso no time. *Base:* Cloudscape Create resource.
11. **Exclusão em 3 níveis + lixeira de 30 a 90 dias com "quem excluiu e quando"**: undo em toast para itens leves, modal para registros e confirmação digitada para o irreversível (remessa bancária, fechamento de mês). *Base:* Cloudscape delete patterns, HubSpot Recycle Bin, NN/g confirmation dialogs.
12. **Chat interno ancorado no registro** (conversa sobre a ocorrência, a unidade ou a cobrança fica no registro, com @menção e visível na auditoria), separado do chat com o condômino. *Base:* Dynamics + Teams connected chat, Front comentários internos, Zendesk nota interna.
13. **Command palette (Ctrl+K) + atalhos de fila** (J/K anterior e próximo, E editar, Ctrl+Enter salvar, "?" lista os atalhos, com opção de desativar). *Base:* GitHub/Primer, Linear, Help Scout, Zendesk (desativar atalhos), Salesforce Ctrl+/.
14. **Impersonação do superadmin com faixa colorida persistente, motivo obrigatório, prazo de 1 h, aviso ao cliente e log imutável** (essencial para suporte multi-tenant e LGPD). *Base:* GitHub Enterprise impersonation, Zendesk assume identity, Salesforce Log in as.
15. **Densidade escolhida pelo usuário (Confortável/Compacto)** e primeira aba do registro só com o essencial, com cabeçalho de 4 campos-chave (saldo, inadimplência, síndico, vencimento). *Base:* Salesforce Comfy/Compact, Dynamics design-productive-forms [aberto].

---

## 13. Próximos passos sugeridos

- Confirmar no navegador (fora desta sessão) as páginas marcadas [busca] antes de citar literalmente: Fiori action placement e draft handling, Polaris, Carbon, NN/g.
- Fazer um teste rápido com 5 operadores de administradora: tarefa "conferir 20 leituras" em três versões (lista → detalhe → voltar; split view; Salvar e próximo) e medir tempo e erros.
