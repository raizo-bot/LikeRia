const BaseCommand = require("../../utils/structures/BaseCommand");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient("cbc0dc74aa2c77fe906be96cf4a15142bbc94ad8be23986b097806bf1a9d1295b383f31e6212673099be0e934bba4ec32c95585ca46827bb83de1c4d41080d48");

const Discord = require("discord.js");
module.exports = class TDicataCommand extends BaseCommand {
  constructor() {
    super({
    name: "fire",
    description: "dictator command",
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
    let image = await AmeAPI.generate("fire", { url: avatar});
    let attachment = new Discord.MessageAttachment(image, "fire.png");
    message.channel.send(attachment);
  }
};
