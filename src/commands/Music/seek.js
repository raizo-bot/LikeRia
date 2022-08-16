const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const humanize = require('humanize-duration');
function hmsToSecondsOnly(str) {
  const p = str.split(":");
  let s = 0,
    m = 1;

  while (p.length > 0) {
    s = +m * parseInt(p.pop(), 10);
    m = m * 60;
  }
  return s;
}

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "seek",
      desc: "Sets  the playing track's position to the specified position.",
      usage: "[p]seek <time>",
      botPerm: ["SPEAK", "CONNECT"],
      category: "Music",
      aliases: [],
      examples: ["0:15"]
    });
  }

  async run(bot, message, args, settings) {
    if (!message.member.voice.channel)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription(
            "You're not in a voice channel that I can connect to."
          )
      );

    // Check that user is in the same voice channel
    if (bot.manager.players.get(message.guild.id)) {
      if (
        message.member.voice.channel.id !=
        bot.manager.players.get(message.guild.id).voiceChannel
      )
        return message.channel
          .send(
            new Discord.MessageEmbed()
              .setColor("#cf1919")
              .setDescription("You're not in the same voice channel as me.")
          )
          .then(m => m.delete({ timeout: 5000 }));
    }
    // Check that a song is being played
    const player = bot.manager.players.get(message.guild.id);
    if (!player)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("Nothing be played!")
          .setColor("#cf1919")
      );
   if(!args[0]){
      return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription(`Please insert a time next time.`));
   }
    const time = hmsToSecondsOnly(args[0]) * 1000;
    if (time > player.queue.current.duration) {
      message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription(`Less than (**Current Music**: \`${player.queue.current.duration}\`)`));
    } else {
      player.seek(time);
      const embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor || "Green")
        .setDescription(`Time moved to ${humanize(time)}`
        );
      message.channel.send(embed);
    }
  }
};
