const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const createBar = require('string-progressbar')
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "resume",
      desc: 'Resume a now playing',
      usage: "[p]resume",
      botPerm: ["SPEAK", "CONNECT"],
      category: "Music",
      aliases: [],
      examples: []
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
      return message.channel.send(new Discord.MessageEmbed()
          .setDescription("Nothing be played!")
          .setColor("#cf1919"));
 if (!player.paused)
      return message.channel.send(new Discord.MessageEmbed()
          .setDescription("The queue is already resumed")
          .setColor("#cf1919"));

		// Pauses the music
		player.pause(false);
      return message.channel.send(new Discord.MessageEmbed()
          .setDescription("The queue is now (\`Resumed\`)")
          .setColor("GREEN"));
  }};
