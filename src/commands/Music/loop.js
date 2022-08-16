const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "loop",
      desc: 'Sets the player\'s loop settings.',
      usage: "[p]bassboost",
      botPerm: ["SPEAK", "CONNECT"],
      category: "Music",
      aliases: [],
      examples: ["queue"]
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
	if (!args[0] || args[0].toLowerCase() == 'song') {
			// (un)loop the song
			player.setTrackRepeat(!player.trackRepeat);
			const trackRepeat = player.trackRepeat ? 'Enabled' : 'Disabled';
			return message.channel.send(new Discord.MessageEmbed().setDescription(`Song repeat are ${trackRepeat}`).setColor("GREEN"));
		} else if (args[0].toLowerCase() == 'queue') {
			// (un)loop the queue
			player.setQueueRepeat(!player.queueRepeat);
			const queueRepeat = player.queueRepeat ? 'Enabled' : 'Disabled';
			return message.channel.send(new Discord.MessageEmbed().setDescription(`Queue repeat are ${queueRepeat}`).setColor("GREEN"));
		}}};
