const BaseCommand = require("../../utils/structures/BaseCommand");

const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "play",
      desc: "Plays a music song",
      usage: "[p]play <song_name>",
      botPerm: ["SPEAK", "CONNECT"],
      category: "Music",
      aliases: [],
      examples: ["Sia"]
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

    // Create player
    const player = bot.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true
    });

    let res;
    const search = args.join(" ");
    if (!search) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription("Please enter something to be searched!")
      );
    }
    // Search for track
    try {
      res = await player.search(search, message.author);
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`There was an error while searching`)
      );
    }
    // Workout what to do with thse results
    if (res.loadType == "NO_MATCHES") {
      // An error occured or couldn't find the track
      if (!player.queue.current) player.destroy();
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription("I can't find that song.")
      );
    } else if (res.loadType == "PLAYLIST_LOADED") {
      // Connect to voice channel if not already
      if (player.state !== "CONNECTED") player.connect();
      // Show how many songs have been added
      message.channel.send({
        embed: {
          color: message.member.displayHexColor || "GREEN",
          description: `Queued (\`${res.tracks.length}\`) tracks`
        }
      });
      // Add songs to queue
      player.queue.add(res.tracks);
      // PLay the song(s) if not already
      if (
        !player.playing &&
        !player.paused &&
        player.queue.totalSize === res.tracks.length
      )
        player.play();
    } else {
      // add track to queue and play
      if (player.state !== "CONNECTED") player.connect();
      player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused && !player.queue.size) {
        player.play();
      } else {
        message.channel.send({
          embed: {
            color: message.member.displayHexColor || "GREEN",
            description: `Added to queue: (\`${res.tracks[0].title}\`)`
          }
        });
      }
    }
  }
};
