const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class ShipCommand extends BaseCommand {
  constructor() {
    super({
    name: "ejected",
    description: "ejected command",
    category: "Fun"
    });
  }

  async run(client, message) {
        let Member = message.mentions.members.first();
let embed = new Discord.MessageEmbed()
   .setColor('#FF0000')
   .setDescription(`**Please Mention User **`)
        if (!Member) return message.channel.send(embed);
      
        let Colors = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"];

        let Colord = Colors[Math.floor(Math.random() * Colors.length)];

        let Imposter = [true, false];

        let Impost = Imposter[Math.floor(Math.random() * Imposter.length)];

        let Link = `https://vacefron.nl/api/ejected?name=${Member.user.username.replace("  ", "").split(" ").join("+")}&impostor=${Impost}&crewmate=${Colord}`;

        let attachment = new Discord.MessageAttachment(Link, "ejected.png");
        return message.channel.send(attachment);
  } 
};