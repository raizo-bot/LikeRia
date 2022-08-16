const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class ShipCommand extends BaseCommand {
  constructor() {
    super({
    name: "lesbianrate",
    description: "gayrate command",
    category: "Fun"
    });
  }

  async run(client, message) {
   let user = message.mentions.users.first();
   let gay = Math.floor(Math.random() * 101);
   if(!user) {
            message.channel.send( new Discord.MessageEmbed()
            .setColor("#e100ff")
            .setTitle("**:transgender_flag:Lesbian Rate Machine:transgender_flag:**")
            .setThumbnail(message.author.avatarURL())
            .setDescription(`**You are \`${gay}\`% Lesbian :transgender_flag:**`))
   } else {
            message.channel.send( new Discord.MessageEmbed()
            .setColor("#e100ff")
            .setTitle("**:transgender_flag:Lesbian Rate Machine:transgender_flag:**")
            .setThumbnail(user.avatarURL())
            .setDescription(`**She is \`${gay}\`% Lesbian:transgender_flag:**`))
          }
        }
};