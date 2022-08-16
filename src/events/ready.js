const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(bot) {
    const { Manager } = require("erela.js");
    const Spotify = require("erela.js-spotify");
    const nodes = [
      {
        host: bot.settings.lava_host,
        password: bot.settings.lava_pass,
        port: bot.settings.lava_port
      }
    ];

    const clientID = bot.settings.spID;
    const clientSecret = bot.settings.spSecret;

    //HERE spCID and spCS are your SPOTIFY APPLICATION'S ID AND SECRET. MAKE AN APP ON SPOTIFY'S WEB DEV PORTAL TO ACCESS THE TOKEN KEYS
    bot.manager = new Manager({
      nodes,
      plugins: [new Spotify({ clientID, clientSecret })],
      autoPlay: true,
      secure: false,
      send: (id, payload) => {
        const guild = bot.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      }
    })
      .on("nodeConnect", node =>
        console.log(`Node ${node.options.identifier} has connected.`)
      )
      .on("nodeError", (node, error) =>
        console.log(
          `Node: '${node.options.identifier}', has error: '${error.message}'.`
        )
      )
      .on("trackStart", (player, track) => {
        // When a song starts
        const embed = new MessageEmbed()
          .setTitle("Now playing:")
          .setColor("#cf1919")
          .setDescription(
            `[${track.title}](${track.uri}) [${bot.guilds.cache
              .get(player.guild)
              .member(track.requester)}]`
          );
        bot.channels.cache
          .get(player.textChannel)
          .send(embed)
          .then(m => m.delete({ timeout: track.duration }));
      })
      .on("queueEnd", player => {
        // When the queue has finished
        const embed = new MessageEmbed()
          .setColor("#cf1919")
          .setDescription("Queue has ended.");
        bot.channels.cache.get(player.textChannel).send(embed);
        player.destroy();
      })
      .on("playerMove", (player, currentChannel, newChannel) => {
        player.voiceChannel = bot.channels.cache.get(newChannel);
        player.pause(true);
        const embed = new MessageEmbed().setDescription(
          "Someone Moved to another channel, Now i'm (`Paused`)"
        );
        bot.channels.cache.get(player.textChannel).send(embed);
      });
    // update voice states
    bot.manager.init(bot.user.id);
    bot.on("raw", d => bot.manager.updateVoiceState(d));
    bot.user.setActivity(`.help | specialbot.me`, { type: "LISTENING" });
  }
};
