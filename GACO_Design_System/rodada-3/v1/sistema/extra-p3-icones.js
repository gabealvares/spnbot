/* GACO V1 — extra-p3-icones.js (agente p3). Ícones que faltavam, na mesma receita (24×24, traço 1,5, ponta quadrada).
   Registra no mesmo objeto global window.LC_ICONES e na família "Extras p3". Carregar depois de icones.js. */
(function(){
"use strict";
var X = {
  "fila": '<path d="M3 6h11"/><path d="M3 11h11"/><path d="M3 16h6"/><circle cx="17.5" cy="14" r="2.5"/><path d="M13 21a4.5 4.5 0 0 1 9 0"/>',
  "termometro": '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 9v6"/>',
  "botao": '<rect x="3" y="8" width="18" height="8" rx="1"/><path d="M8 12h8"/>',
  "espacador": '<path d="M3 4h18"/><path d="M3 20h18"/><path d="m9 9 3-3 3 3"/><path d="m9 15 3 3 3-3"/><path d="M12 6v12"/>',
  "transferir": '<path d="M4 8h13"/><path d="m13 4 4 4-4 4"/><path d="M20 16H7"/><path d="m11 12-4 4 4 4"/>',
  "whatsapp": '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1 -.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
  "modelo-aprovado": '<path d="M4 3h11l5 5v13H4z"/><path d="M15 3v5h5"/><path d="m8.5 14 2.5 2.5 4.5-4.5"/>'
};
var I = window.LC_ICONES; if(!I){ console.warn("[extra-p3-icones] carregue depois de icones.js"); return; }
Object.keys(X).forEach(function(k){ if(!I[k]) I[k]=X[k]; });
if(window.LC_ICONE_FAMILIAS) window.LC_ICONE_FAMILIAS["Extras p3"] = Object.keys(X);
})();
