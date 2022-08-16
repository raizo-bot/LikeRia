const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient("cbc0dc74aa2c77fe906be96cf4a15142bbc94ad8be23986b097806bf1a9d1295b383f31e6212673099be0e934bba4ec32c95585ca46827bb83de1c4d41080d48");

module.exports = class ShipCommand extends BaseCommand {
  constructor() {
    super({
    name: "gayrate",
    description: "gayrate command",
    category: "Fun"
    });
  }

  async run(client, message) {
   let user = message.mentions.users.first();
   let gay = Math.floor(Math.random() * 101);
   if(!user) {
            message.channel.send( new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("**:rainbow_flag:Gay Rate Machine:rainbow_flag:**")
            .setThumbnail(message.author.avatarURL())
            .setDescription(`**You are \`${gay}\`% gay:rainbow_flag:**`))
   } else {
            message.channel.send( new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("**:rainbow_flag:Gay Rate Machine:rainbow_flag:**")
            .setThumbnail(user.avatarURL())
            .setDescription(`**he is \`${gay}\`% gay:rainbow_flag:**`))
          }
        }
};