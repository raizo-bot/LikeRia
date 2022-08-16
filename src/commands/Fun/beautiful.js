const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class BeautifulCommand extends BaseCommand {
  constructor() {
    super({
    name: "beautiful",
    desc: "None",
    usage:"[p]beautiful",
    category: "Fun"
    });
  }

  async run(client, message, args) {
    let user = message.mentions.users.first() || message.author;
    let avatar = user.avatarURL({ dynamic: false, format: 'png' });
    message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
    let image = await canvacord.Canvas.beautiful(avatar);
    let attachment = new Discord.MessageAttachment(image, "beautiful.png");
     message.channel.send(attachment);
  }
};
