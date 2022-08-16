const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const url = require('url');
const fetch = require('node-fetch');
const prettyMilliseconds = require("pretty-ms");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "daily",
    desc: "Claim a daily gift",
    usage:"[p]daily",
    category: "Economy",
    aliases: []
    });
  }

  async run(client, message, args) {
 const data = await client.getUserData(message.author.id);
if (Date.now() > data.daily_cooldown) {
let c = Math.floor(Math.random() * 1000);
await client.db.user.findOneAndUpdate({ userID: message.author.id }, { daily_cooldown: Date.now() + 86400000 });
await client.db.user.findOneAndUpdate({ userID: message.author.id }, { coins: c + data.coins });
return message.channel.send(new Discord.MessageEmbed().setColor("GREEN")
.setAuthor(message.author.username, message.author.avatarURL()).setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL()).setTimestamp().setThumbnail(message.author.avatarURL({dynamic:true}))
.setDescription(`You got **__$${c}__** your daily.`))
} else   return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription(`You can get your reward daily after ( __\`${prettyMilliseconds(data.daily_cooldown - Date.now(), { verbose: true, separateMilliseconds: false })}\`__ )`)); 

  
  }
};
