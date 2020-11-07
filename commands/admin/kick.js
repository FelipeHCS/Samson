const Discord = require('discord.js');
const execute = (mandrakzin, message, args) => {
  message.delete();

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Quem você acha que é?");

  const user = message.mentions.users.first() || args[0];

  let reason = args[1];

  if (args.length === 0) return message.reply(`Utilize ${process.env.BOT_PREFIX}kick <@usuario> <@motivo>`);
  if (user.id === '7718563075229352017') return message.reply("Você não pode expulsar o próprio bot!");
  if (user.id === '450828668751839244') return message.reply("Você não pode expulsar o fundador do Servidor!");
  if (user.id === '608046959403728917') return message.reply("Você não pode expulsar o Administrador do Servidor!");
  if (user.id === '672129775829254164') return message.reply("Você não pode expulsar o Administrador do Servidor!");
  if (user.id === '705409072048111618') return message.reply("Você não pode expulsar o Administrador do Servidor!");
  const bChannel = message.guild.channels.cache.get('706552904022229065');

  if (!user) {
    return message.reply("Você deve informar o usuário!")
  }
  if (!reason) {
    return message.reply("Informe o motivo!")
  }

  if (user) {
    message.guild.member(user).kick(reason);
    bChannel.send(`${user} Foi expulso do servidor!`);
  }

}
module.exports = {
  name: "kick",
  execute,
}