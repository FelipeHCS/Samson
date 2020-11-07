const Discord = require("discord.js")
const execute = async (mandrakzin, message, args) => {

    let supportCategory = message.guild.channels.cache.get("774617745349804052");

    if (message.guild.me.hasPermission("MANAGE_CHANNELS") && !supportCategory) {
        supportCategory = await message.guild.channels.create('Tickets',{
            type: "category",
        });
    };
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") && !supportCategory){
        message.channel.send("Você não tem permissões para criar a categoria do ticket")
    }

    if (!message.guild.roles.cache.find(role => role.name === "Support Team")){
        await (message.guild.roles.create({
            name: "Support Team",
            color: "Blue",
        }));
    };


    const channelName = `ticket-${message.author.username}-${message.author.discriminator}`
    if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`)){
        return message.channel.send("Desculpe, mas você já possui um ticket aberto!")
    }

    message.guild.channels.create(channelName, { parent: '730386405481775190', topic: `Ticket Owner: ${message.author.id}`}).then(c => {
        
        const sr = message.guild.roles.cache.get('774649197857079296') // Id do cargo do bot
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        c.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        c.updateOverwrite(message.author,{
            SEND_MESSAGES:true,
            VIEW_CHANNEL:true,
        });
        let CreatedTicketEmbed = new Discord.MessageEmbed()
            .setColor('#50ff00')
            .setTitle("Ticket para Suporte")
            .setDescription(`<@${message.author.id}> Seu canal de suporte é <#${c.id}> `)
            .setTimestamp()
            .setFooter(mandrakzin.user.username, mandrakzin.user.displayAvatarURL())
            message.channel.send(CreatedTicketEmbed)
            // Comando enviado no canal após a mensagem.

            let GreetEmbed = new Discord.MessageEmbed()
            .setColor('#50ff00')
            .addField("Ticket para Suporte", `<@${message.author.id}> Obrigado por entrar em contato conosco!`)
            .setTimestamp()
            .setFooter(mandrakzin.user.username, mandrakzin.user.displayAvatarURL())
            // Comando enviado após a criação do canal de ticket.
                 c.send(GreetEmbed)
    }).catch(console.error);
}

module.exports = {
    name: "ticket",
    execute,
}