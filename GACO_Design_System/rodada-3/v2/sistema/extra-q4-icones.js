/* GACO V2 · extra-q4-icones.js
   Ícones que faltaram no Sistema Interno parte B. Mesma receita: grade 24, traço por CSS,
   ponta quadrada, quina viva, sem preenchimento. Registra no mesmo objeto global (window.CM_ICONES).
   Carregar depois de icones.js e antes do fim do <head>. Para o coordenador incluir no gerador. */
(function(){
  var I=window.CM_ICONES;if(!I) return;
  var novos={
    /* cronograma em barras escalonadas (Gantt) */
    "gantt":"<path d=\"M3 3L3 21L21 21\"/><path d=\"M6 7L13 7\"/><path d=\"M9 12L18 12\"/><path d=\"M12 17L20 17\"/>",
    /* fio de conversa: resposta que desce e segue à direita */
    "fio":"<path d=\"M5 3L5 16L20 16\"/><path d=\"M16 12L20 16L16 20\"/><path d=\"M9 4L17 4\"/><path d=\"M9 8L14 8\"/>",
    /* balança: balancete, prestação de contas */
    "balanca":"<path d=\"M12 3L12 21\"/><path d=\"M7 21L17 21\"/><path d=\"M4 7L20 7\"/><path d=\"M4 7L1.5 14L6.5 14Z\"/><path d=\"M20 7L17.5 14L22.5 14Z\"/>",
    /* frequência: lista de chamada com tique */
    "chamada-presenca":"<path d=\"M5 3L19 3L19 21L5 21Z\"/><path d=\"M8 8L9.5 9.5L12 7\"/><path d=\"M14 8.5L16 8.5\"/><path d=\"M8 14L9.5 15.5L12 13\"/><path d=\"M14 14.5L16 14.5\"/>",
    /* sprint: ciclo com seta e marco */
    "sprint":"<path d=\"M20 12A8 8 0 1 1 16 5.07\"/><path d=\"M16 2L16 6L20 6\"/><path d=\"M9 12L11 14L15 10\"/>",
    /* release: etiqueta de versão */
    "versao":"<path d=\"M3 3L11 3L21 13L13 21L3 11Z\"/><path d=\"M7.5 7.5L7.51 7.5\"/><path d=\"M10 14L14 10\"/>"
  };
  for(var k in novos) if(!I[k]) I[k]=novos[k];
})();
