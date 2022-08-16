const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const Canvas = require('canvas');
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "gay",
    description: "invite command",
    category: "Fun"
    });
  }

  async run(client, message, args) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let user = message.mentions.users.first() || message.author;
    let avatar = user.avatarURL({ dynamic: false, format: 'png' });
	const canvas = Canvas.createCanvas(248, 247);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage(avatar);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      let blurImage = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/799374912992444476/801748569287557140/PicsArt_01-21-10.38.53.png"
    );

    ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'gay.png');
	message.channel.send(" Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
	message.channel.send(attachment);
  }
};
