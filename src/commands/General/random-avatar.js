const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require('discord.js');
module.exports = class BadCommand extends BaseCommand {

  constructor() {

    super({
      name: "random-avatar",
      descr: "Gets The Random Avatars Users",
      usage:"[p]random-avatar", 
      category: "General",
      aliases: ['r-avatar']
    });

  }

  async run(client, message) {

let user = client.users.cache.random()

let embed = new Discord.MessageEmbed()

.setTitle('Download')

.setURL(user.avatarURL({dynamic: true,

 size: 2048}))

.setDescription(`Here is your random avatar\nThis avatar from \`${user.tag} (ID:${user.id})\``)

.setColor(message.guild.me.displayColor)

.setImage(user.displayAvatarURL({

      dynamic: true,

      size: 2048,

      format: "png"

    }))

message.channel.send(embed)

  }

};
