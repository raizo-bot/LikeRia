const BaseCommand = require("../../utils/structures/BaseCommand");
const AmeClient = require("amethyste-api");

const Discord = require("discord.js");
module.exports = class TDicataCommand extends BaseCommand {
  constructor() {
    super({
    name: "heaven",
    description: "heaven command",
    category: "Fun"
    });
  }

  async run(client, message) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let user = message.mentions.users.first() || message.author;
    let avatar = user.avatarURL({ dynamic: false, format: 'png' });
    message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
    let image = `https://vacefron.nl/api/heaven?user=${avatar}`;
    let attachment = new Discord.MessageAttachment(image, "heaven.png");
    message.channel.send(attachment);
  }
};
