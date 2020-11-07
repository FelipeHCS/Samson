const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const mandrakizin = new Discord.Client();

mandrakizin.commands = new Discord.Collection();
mandrakizin.queues = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

const folders = fs.readdirSync(path.join(__dirname, "/commands"))
for (var folder of folders) {
    const files = fs.readdirSync(path.join(__dirname, "/commands", folder)).filter((filename) => /^.*\.(t|j)s$/.test(filename))
    for (var filename of files) {
        const command = require(`./commands/${folder}/${filename}`);
        mandrakizin.commands.set(command.name, command);
    }
}

for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", `${file}`));
    mandrakizin.commands.set(command.name, command);
}

console.log(mandrakizin.commands);

mandrakizin.on("ready", () => {
    let activites = [
        `Digite s.help`,
        `Criado por Felipe Hilário #5995`,
        `Acesse: https://discord.gg/rBrdzXj`,
        `Digite s.help`,
        `Samson Servidor`,
        `Criado por Felipe Hilário #5995`
    ]
    i = 0;

    setInterval(() => mandrakizin.user.setActivity(`${activites[i++ % activites.length]}`, {
        type: "WATCHING"
    }), 1000 * 60);
    console.log(` ----------------------|Status do Bot|--------------------
                  ${mandrakizin.user.username} Foi conectado com sucesso!
 ----------------------|Status do Bot|--------------------`)
});

//Comando de reação

mandrakizin.on('raw', async dados => {
    if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if (dados.d.message_id !== "738182433253621811") return //Id da mensagem

    let servidor = mandrakizin.guilds.cache.get("737462133356363846")//Id do Servidor
    let membro = servidor.members.cache.get(dados.d.user_id)//Id do membro

    let cargo1 = servidor.roles.cache.get('738177564757065780') // Id do cargo 1
    let cargo2 = servidor.roles.cache.get('738177839035318302') // Id do cargo 2
    let cargo3 = servidor.roles.cache.get('738534011281997854') // Id do cargo 3


    if(dados.t==="MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.name === "🙅‍♂️"){
            if(membro.roles.cache.has(cargo1))return
            membro.roles.add(cargo1)
        }else if(dados.d.emoji.name === "⛏️"){
            if(membro.roles.cache.has(cargo2))return
            membro.roles.add(cargo2)
        }else if(dados.d.emoji.name ==="🎥"){
            if(membro.roles.cache.has(cargo3))return
            membro.roles.add(cargo3)
        }
    }
    if(dados.t==="MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.name === "🙅‍♂️"){
            if(membro.roles.cache.has(cargo1))return
            membro.roles.remove(cargo1)
        }else if(dados.d.emoji.name === "⛏️"){
            if(membro.roles.cache.has(cargo2))return
            membro.roles.remove(cargo2)
        }else if(dados.d.emoji.name ==="🎥"){
            if(membro.roles.cache.has(cargo3))return
            membro.roles.remove(cargo3)
        }
    }
})

mandrakizin.on("guildMemberAdd", async (member) => {

    let channel = mandrakizin.channels.cache.get("774631674678870038"); // Id do canal.
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === '');

    let embed = new Discord.MessageEmbed()
        .setColor('#50ff00')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`Boas Vindas!`)
        .setDescription(`${member.user} Boas Vindas ao servidor ${member.guild.name}, agora estamos com ${member.guild.memberCount} no servidor.`)
        .addField('Regras', 'Siga as regras para evitar advertências e banimentos: <#737463195823767595> ')
        .addField('Dúvida?', 'Em caso de dúvidas mencione algum admin: <@&737464983088005133>')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setTimestamp()
        .setFooter(mandrakizin.user.username, mandrakizin.user.displayAvatarURL());

    await channel.send(embed)
}
)

mandrakizin.on('message', (message) => {
    if (!message.content.toLocaleLowerCase().startsWith(process.env.BOT_PREFIX) || message.author.mandrakizin || message.channel.type == "dm") return;

    const args = message.content.toLocaleLowerCase().slice(process.env.BOT_PREFIX.length).split(" ");
    const command = args.shift();
    try {
        mandrakizin.commands.get(command).execute(mandrakizin, message, args);
    } catch (e) {
        return message.reply("Ainda não sou capaz de entender isso 🙁")
    }
})

mandrakizin.login(process.env.BOT_TOKEN);
