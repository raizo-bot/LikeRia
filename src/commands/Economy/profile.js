const BaseCommand = require("../../utils/structures/BaseCommand");

const { MessageEmbed, MessageAttachment } = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
const Canvas = require("canvas");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "profile",
      desc: "Shows (Someone/Your) Profile Card *Notice:* `Progress Bar Under The Developed By Jimp`",
      usage: "[p]profile <user/img/title>",
      category: "Economy",
      aliases: [],
      examples: ["img", "title"]
    });
  }

  async run(client, message, args) {
    let member = message.mentions.users.first() || message.author;
    const data = await client.getUserData(member.id);
    if (args[0] && args[0].toLowerCase() === "img") {
      if (!args[1])
        return message.channel.send(
          new MessageEmbed()
            .setDescription("Please provide url next time")
            .setColor("#cf1919")
        );
      if (!args[1].startsWith("https://"))
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setDescription("Please provide vaild url")
        );
      if (!args[1].match(/\.(jpeg|jpg|gif|png)$/))
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setDescription("Please send a valid image link")
        );
      await client.db.user.findOneAndUpdate(
        { userID: message.author.id },
        { img: args[1] }
      );
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription("Profile image has setup to :")
          .setImage(`${args[1]}`)
      );
    }
    if (args[0] && args[0].toLowerCase() === "title") {
      if (!args[1])
        return message.channel.send(
          new MessageEmbed()
            .setDescription("Please provide description next time")
            .setColor("#cf1919")
        );
      let g = message.content
        .split(" ")
        .slice(2)
        .join(" ");
      await client.db.user.findOneAndUpdate(
        { userID: message.author.id },
        { title: g }
      );
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription("Profile title has setup to : " + `\`${g}\``)
      );
    } else {

const leftright = 400;const upkdown = 270.3;
const namleftright04 = 900;const namupdown14 = 220;const ksize = 165.1;let color = "WHITE";let textsize = 90;
const canvas =  Canvas.createCanvas(2310, 1076);
const ctx = canvas.getContext('2d');
let words = member.username;
if(member.bot) return;
let bg = data.img
let ti = data.title  
message.channel.send("Loading........").then(m => m.delete({timeout:800}))
const WelcomeImage1 = await Canvas.loadImage(bg);ctx.drawImage(WelcomeImage1, 0, 0, canvas.width, canvas.height);
const WelcomeImage = await Canvas.loadImage("https://cdn.discordapp.com/attachments/801178537373466684/807329029765464074/PicsArt_02-05-08.17.11.png")
ctx.drawImage(WelcomeImage, 0, 0, canvas.width, canvas.height);
ctx.font = `${textsize}px Poppins`;ctx.fillStyle = color;ctx.fillText(words, namleftright04, namupdown14);
ctx.font = `${textsize}px Poppins`;ctx.fillStyle = color;ctx.fillText(ti, 900, 400);
ctx.font = `50px Poppins`;ctx.fillStyle = color;ctx.fillText(member.id, 125, 690);
ctx.font = `70px Poppins`;ctx.fillStyle = color;ctx.fillText(`Rank: ${data.rank}`, 900, 700);
ctx.font = `70px Poppins`;ctx.fillStyle = color;ctx.fillText(`Level: ${data.level} | XP: ${data.xp}`, 900, 830);
ctx.font = `70px Poppins`;ctx.fillStyle = color;ctx.fillText(`Coins: ${data.coins}`, 900, 975);
ctx.beginPath();
  ctx.arc(leftright, upkdown, ksize, 0, Math.PI * 2, true);
ctx.closePath();
ctx.clip();
const avatarUser = await Canvas.loadImage(member.avatarURL({ format: "jpg"}) || "https://media.discordapp.net/attachments/734444022235660319/745269711801155731/AATXAJw1tXvJInOnm44MdEF3kS0b8x-W4Twj27SYvJ9gRws900-c-k-c0xffffffff-no-rj-mo.png?width=677&height=677") ;
ctx.drawImage(avatarUser, leftright-162, upkdown-159.5, ksize+180.6, ksize+180.6);
    const at = new MessageAttachment(canvas.toBuffer(),"profile.png")
    message.channel.send(at)    
      }
  
  }
  
};
