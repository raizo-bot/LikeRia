const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
const prettyMilliseconds = require("pretty-ms");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "rep",
      desc: "Rep a user",
      usage: "[p]rep",
      category: "Economy",
      aliases: [],
      examples: ["{user}"]
    });
  }

  async run(client, message, args) {
    let member =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      client.users.cache.get([0]);
    const authorData = await client.getUserData(message.author.id);
    if (!args[0])
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`Make sure to mention or type user's id next time!`)
      );
    if (!member) {
      return message.channel.send(new MessageEmbed().setColor("#cf1919").setDescription(`I can't find __\`${args[0]}\`__`)
      );
    }

    const MainUser = await client.getUserData(message.author.id);
    if (member.bot)
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`The bots cannot have respect.`)
          .setTitle("Failed!")
      );
    client.getUserData(member.id).then(async data => {
      if (data.userID == message.author.id)
        return message.channel.send(new MessageEmbed().setColor("#cf1919").setDescription(`You can't thank yourself.`).setTitle("Failed!"));
      if (Date.now() < MainUser.rep_cooldown)
        return message.channel.send(
          new MessageEmbed()
            .setColor("#cf1919")
            .setDescription(
              `You can thank someone after ( \`${prettyMilliseconds(
                MainUser.rep_cooldown - Date.now(),
                { verbose: false }
              )}\` )`
            )
        );
      await client.db.user.findOneAndUpdate(
        { userID: data.userID },
        { rep: data.rep + 1 }
      );
      await client.db.user.findOneAndUpdate(
        { userID: message.author.id },
        { rep_cooldown: Date.now() + 86400000 }
      );
      message.channel.send({
        embed: new MessageEmbed()
          .setDescription(`You gave ${member} a reputation point.`)
          .setColor("GREEN")
      });
    });
  }
};
