const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login("NzYwMzEyMTM3MDc5MTkzNjMw.X3KN2w.JSG4ST6eN5xAQbvtHibbPeOZcr4");
bot.once('ready', () => {   console.log(`Bot online: ${bot.user.tag}!`);
});
bot.on('message', msg => {
    if (msg.content === '-quem foi?') {
    msg.reply('FOI A LUCIEDA!')
    }
    if (msg.content === '-diga a verdade') {
    msg.reply('O MESTRE GABRIEL É SEMPRE INJUSTIÇADO!'); 
    }
    if (msg.content === '-certeza?') {
        msg.reply('SIM PARÇA! FOI A LUCIEDA NA ELÉTRICA! EU VI ELA MATANDO, ACREDITE EM MIM!!!!!!!');
    }
    if (msg.content === '-acusar o colega e feio') {
        msg.reply('EU ESTOU DIZENDO! ACREDITE SE QUISER! FOI A LUCIEDA MESMO!'); 
    }
    if (msg.content === '-boa noite') {
        msg.reply('Bons sonhos, cuidado com a Lucixxxx ROSA na tubulação')
    }
    if (msg.content === '-Vamo jogar?') {
        msg.reply('só se for pra acusar a Lucieda')
    }
    if (msg.content === '-pause') {
        msg.reply('AGORA A BONITA QUER PARAR A MUSICA É? SÓ PRA GRITAR: FOI A LUCIEDA!!!!')
    }

});