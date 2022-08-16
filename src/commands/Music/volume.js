const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "volume",
      desc: "Changes the volume of the song",
      usage: "[p]volume <time>",
      botPerm: ["SPEAK", "CONNECT"],
      category: "Music",
      aliases: [],
      examples: ["75"]
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
    if (!args[0]) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`Current Volume: \`${player.volume}\``)
      );
    }
    if (Number(args[0]) <= 0 || Number(args[0]) > 250) {
      const embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor || "#cf1919")
        .setDescription("Please input a number between 0 and 250.");
      return message.channel.send(embed);
    }

    // Update volume
    player.setVolume(Number(args));
    const embed = new Discord.MessageEmbed()
      .setColor(message.member.displayHexColor || "GREEN")
      .setDescription(`Player sound set to (\`${args}\`)`);
    return message.channel.send(embed);
  }
};
