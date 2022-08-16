const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const createBar = require('string-progressbar')
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "np",
      desc: 'Shows what is playing',
      usage: "[p]bassboost",
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
	const { title, requester, thumbnail, uri, duration } = player.queue.current;
		const end = (duration > 6.048e+8) ? '🔴 LIVE' : new Date(duration).toISOString().slice(11, 19);
		// Display current song information
		try {
			const embed = new Discord.MessageEmbed()
				.setAuthor('Now playing:')
				.setColor(message.member.displayHexColor)
				.setThumbnail(thumbnail)
				.setDescription(`[${title}](${uri}) [${message.guild.member(requester)}]`)
				.addField('\u200b', new Date(player.position).toISOString().slice(11, 19) + ' [' + createBar(duration > 6.048e+8 ? player.position : duration, player.position, 15)[0] + '] ' + end, false);
			message.channel.send(embed);
		} catch (err) {
			if (message.deletable) message.delete();
		}
  }};
