/* GACO V1 "Livro-Caixa" — extra-p2-icones.js (agente p2: padrões de tela e fluxos)
   Ícones que faltaram, na mesma receita (24×24, traço 1,5, ponta e junção quadradas, base Lucide 1.49).
   Registra no mesmo objeto global (window.LC_ICONES). Carregue depois de icones.js. Fundir em icones.js. */
(function(){
"use strict";
var I = window.LC_ICONES; if(!I) return;
I["wifi-desligado"] = '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>';
I["teclado"] = '<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4"/>';
I["link-copiar"] = '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><path d="M8 12h8"/>';
I["sessao-expirando"] = '<path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"/><path d="M9 17H4v5"/>';
if(window.LC_ICONE_FAMILIAS){ (window.LC_ICONE_FAMILIAS["Estados"]||[]).push("wifi-desligado","sessao-expirando"); (window.LC_ICONE_FAMILIAS["Ações"]||[]).push("link-copiar"); (window.LC_ICONE_FAMILIAS["Navegação e moldura"]||[]).push("teclado"); }
if(window.lcIcones && document.readyState!=="loading") window.lcIcones(document);
})();
