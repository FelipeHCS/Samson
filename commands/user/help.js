const Discord = require("discord.js");
const execute = async (mandrakizin, message, args) => {
    message.delete();

    let embed0 = new Discord.MessageEmbed()
        .setColor('#50ff00')
        .setImage('https://media.giphy.com/media/AeWoyE3ZT90YM/giphy.gif')
        .setDescription('Meus comandos:')
        .addField(`${process.env.BOT_PREFIX}Ticket`, '```Abre um ticket de comunicação entre o usuário e o admin```')
        .addField(`${process.env.BOT_PREFIX}Clear`, '```Limpa o chat```')
        .setFooter(mandrakizin.user.username, mandrakizin.user.displayAvatarURL())
    await message.channel.send(embed0);
}
module.exports = {
    name: "help",
    execute,
}