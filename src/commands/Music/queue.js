const BaseCommand = require("../../utils/structures/BaseCommand");
function paginator(page, msg, queue, Currentposition, prefix) {
  if (page == 1) {
    // display queue
    let resp = "```ml\n";
    resp += "\t⬐ current track   \n";
    resp += `0) ${queue.current.title} ${new Date(
      queue.current.duration - Currentposition
    )
      .toISOString()
      .slice(14, 19)} left\n`;
    resp += "\t⬑ current track \n";
    for (let i = 0; i < 10; i++) {
      if (queue[i] != undefined) {
        resp += `${i + 1}) ${queue[i].title} ${new Date(queue[i].duration)
          .toISOString()
          .slice(14, 19)}\n`;
      }
    }
    if (queue.length < 10) {
      resp += `\n\tThis is the end of the queue!\n\tUse ${prefix}play to add more :^)\n`;
    }
    resp += "```";
    msg.edit(resp);
  } else {
    const songs = page * 10;
    let resp = "```ml\n",
      end = false;
    for (let i = songs - 10; i < songs; i++) {
      // make song has been found
      if (queue[i] != undefined) {
        resp += `${i}) ${queue[i].title} ${new Date(queue[i].duration)
          .toISOString()
          .slice(14, 19)}\n`;
      } else if (!end) {
        // show end of queue message
        resp += `\n\tThis is the end of the queue!\n\tUse ${prefix}play to add more :^)\n`;
        end = true;
      }
    }
    resp += "```";
    msg.edit(resp);
  }
}
const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "queue",
      desc: "Shows Server's Queue",
      usage: "[p]queue",
      botPerm: ["SPEAK", "CONNECT", "ADD_REACTIONS", "MANAGE_MESSAGES"],
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

    // Check if bot has permission to connect to voice channel
    // get queue
    const queue = player.queue;
    if (queue.size == 0) {
      // eslint-disable-next-line quotes
      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("The queue is empty")
          .setColor("#cf1919")
      );
      return;
    }
    // display queue
    let resp = "```ml\n";
    resp += "\t⬐ current track   \n";
    resp += `0) ${queue.current.title} ${new Date(
      queue.current.duration - player.position
    )
      .toISOString()
      .slice(14, 19)} left\n`;
    resp += "\t⬑ current track \n";
    for (let i = 0; i < 10; i++) {
      if (queue[i] != undefined) {
        resp += `${i + 1}) ${queue[i].title} ${new Date(queue[i].duration)
          .toISOString()
          .slice(14, 19)}\n`;
      }
    }
    if (queue.length < 10) {
      resp += `\n\tThis is the end of the queue!\n\tUse ${settings.prefix}play to add more :^)\n`;
    }
    resp += "```";

    // Displays message
    message.channel.send(resp).then(async msg => {
      // react to queue message
      await msg.react("⏬");
      await msg.react("🔽");
      await msg.react("🔼");
      await msg.react("⏫");

      // set up filter and page number
      const filter = (reaction, user) => {
        return (
          ["⏬", "🔽", "🔼", "⏫"].includes(reaction.emoji.name) && !user.bot
        );
      };
      let page = 1;
      // create collector
      const collector = msg.createReactionCollector(filter, {
        time: queue.current.duration - player.position
      });
      collector.on("collect", reaction => {
        // find what reaction was done
        const totalPage = queue.length >= 1 ? Math.round(queue.length / 10) : 1;
        if (reaction.emoji.name === "⏬") {
          // last page
          page = totalPage;
          paginator(page, msg, queue, player.position, settings.prefix);
        } else if (reaction.emoji.name === "🔽") {
          // Show next 10 songs
          page = page + 1;
          if (page <= 1) page = 1;
          if (page >= totalPage) page = totalPage;
          paginator(page, msg, queue, player.position, settings.prefix);
        } else if (reaction.emoji.name === "🔼") {
          // show the last 10 previous songs
          page = page - 1;
          if (page == 0) page = 1;
          if (page >= totalPage) page = totalPage;
          paginator(page, msg, queue, player.position, settings.prefix);
        } else {
          // This will show the first 10 songs (in queue)
          page = 1;
          paginator(page, msg, queue, player.position, settings.prefix);
        }
      });
    });
  }
};
