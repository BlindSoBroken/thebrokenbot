const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "#";

bot.on("ready", function() {
    bot.user.setGame("Created by Broken")
});

client.login("NTYxODAwODMyNzUyODEyMDQy.XKBmyw.8mgnJ-3nABWVQ9GpDXB3nFgkPJE");

client.on("guildMemberAdd", member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(":tada: **" + member.user.username + "** viens de nous rejoindres ! " + member.guild.name)
        .setFooter("Nous sommes dès maintenant: " + member.guild.memberCount + ".")
    member.guild.channels.get("561815628202377217").send(embed)
    member.addRole("548978280544469010")
});

client.on("guildMemberRemove", member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(":broken_heart: **" + member.user.username + "** viens de nous quitter ! " + member.guild.name)
        .setFooter("Nous ne sommes plus que: " + member.guild.memberCount + ".")
    member.guild.channels.get("561815628202377217").send(embed)
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "kick"){
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.** :warning:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("**Erreur, mentionnez un utilisateur.** :warning:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Erreur, vous ne pouvez pas expulser cet utilisateur.")
        if (!member.kickable) return message.channel.send("**Erreur, utilisateur protégé.** :warning:")
        member.kick()
        message.channel.send("**" + member.user.username + "** à été expulser du serveur. :white_check_mark:")
    }
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "ban"){
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.** :warning:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("**Erreur, mentionnez un utilisateur.** :warning:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Erreur, vous ne pouvez pas expulser cet utilisateur.")
        if (!member.bannable) return message.channel.send("**Erreur, utilisateur protégé.** :warning:")
        member.ban()
        message.channel.send("**" + member.user.username + "** à été banni du serveur. :white_check_mark:")
    }
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

if (args[0].toLowerCase() === prefix + "clear") {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.** :warning:")
    let count = args[1]
    if (!count) return message.channel.send("**Veuillez indiquez un nombre de message à supprimer.** :warning:")
    if (isNaN(count)) return message.channel.send("**Veuillez indiquez un nombre valide.** :warning:")
    if (count < 1 || count > 100) return message.channel.send("**Veuillez indiquez un nombre en 1 et 100.** :warning:")
    message.channel.bulkDelete(parseInt(count) + 1)
}

if (args[0].toLowerCase() === prefix + "mute") {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.** :warning:")
    let member = message.mentions.members.first()
    if (!member) return message.channel.send("**Erreur, membre introuvable.** :warning")
    if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande sur cette personne.** :warning:")
    if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("**Erreur, ce joueur est protégé.** :warning:")
    let muterole = message.guild.roles.find(role => role.name === 'Muted')
    if (muterole) {
        member.addRole(muterole)
        message.channel.send(member + ' a été mute du serveur. :white_check_mark:')
    }
    else {
        message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
            message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                channel.overwritePermissions(role, {
                    SEND_MESSAGES: false
                })
            })
            member.addRole(role)
            message.channel.send(member + ' a été mute du serveur. :white_check_mark:')
        })
    }
}
});
