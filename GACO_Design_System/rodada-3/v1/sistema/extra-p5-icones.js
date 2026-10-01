/* =====================================================================
   GACO V1 "Livro-Caixa" — extra-p5-icones.js
   Ícones que faltavam para portal, páginas públicas e documentos. Mesma receita:
   24×24, área 2–22, traço 1,5, ponta e junção quadradas, sem preenchimento.
   Carregar DEPOIS de icones.js e antes do fim do <body> (entra antes do DOMContentLoaded).
   ===================================================================== */
(function(){
"use strict";
var I = window.LC_ICONES || (window.LC_ICONES = {});
var novos = {
  /* balão com fone: canal WhatsApp (signo consagrado, sem logotipo) */
  "whatsapp": '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1 -.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
  /* código de barras do boleto (linha digitável) */
  "codigo-de-barras": '<path d="M3 5v14"/><path d="M6 5v14"/><path d="M10 5v14"/><path d="M12 5v14"/><path d="M15 5v14"/><path d="M18 5v14"/><path d="M21 5v14"/>',
  /* urna: votação online da assembleia */
  "urna": '<path d="M3 13h18v8H3z"/><path d="M7 13V4h10v9"/><path d="m9.5 8.5 2 2 3.5-4"/><path d="M8 17h8"/>',
  /* cone: manutenção programada */
  "manutencao": '<path d="M4 21h16"/><path d="M6 21 10.5 3h3L18 21"/><path d="M8 13h8"/><path d="M9.2 8h5.6"/>',
  /* impressão digital / biometria (entrar pelo aparelho) */
  "biometria": '<path d="M12 11v3a6 6 0 0 1-1.5 4"/><path d="M8.5 9.5A3.5 3.5 0 0 1 15.5 11v2a10 10 0 0 1-1 4.5"/><path d="M5.5 15.5A12 12 0 0 0 6 11a6 6 0 0 1 10.5-4"/><path d="M18.5 9.5a6 6 0 0 1 .5 2.5v1.5"/><path d="M4 7a9 9 0 0 1 14.5-3"/>'
};
Object.keys(novos).forEach(function(k){ if(!I[k]) I[k]=novos[k]; });
if(window.LC_ICONE_FAMILIAS) window.LC_ICONE_FAMILIAS["Extra p5 (portal e público)"] = Object.keys(novos);
})();
