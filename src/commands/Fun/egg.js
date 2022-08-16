const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const Canvas = require('canvas');
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "egg",
    description: "invite command",
    category: "Fun"
    });
  }

  async run(client, message, args) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let user = message.mentions.users.first() || message.author;
    let avatar1 = user.avatarURL({ dynamic: false, format: 'png' });
   message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
	const canvas = Canvas.createCanvas(1717, 1717);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/779845256002273281/801551311559589928/egg.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		const avatar = await Canvas.loadImage(avatar1);
	ctx.drawImage(avatar, 680, 890, 280,280);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'egg.png');

	message.channel.send(attachment);
  }
};
