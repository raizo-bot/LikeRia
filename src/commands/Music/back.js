const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "back",
      desc: 'Plays the previous song in the queue.',
      usage: "[p]back",
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
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("Nothing be played!")
          .setColor("#cf1919")
      );
	if (player.queue.previous == null) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription('There are no previous songs.'));

		// Start playing the previous song
		player.queue.unshift(player.queue.previous);
		player.stop();
  }
};
