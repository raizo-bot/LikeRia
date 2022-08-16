const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "reactrole",
      description:
        "Reaction based roles is an intuitive way to offer your members the ability to add and remove roles to themselves.",
      usage: "[p]rr-add <channel> <msg-id> <emoji> <role>",
      category: "Settings",
      aliases: ["rr"],
      botPerm: ["MANAGE_GUILD"],
      memberPerm: ["MANAGE_GUILD"]
    });
  }

  async run(client, message, args, settings) {
    async function fetchMessage(client, messageID, channelID) {
      try {
        const channel = await client.channels.cache.get(channelID);
        const message = await channel.messages.fetch(messageID);
        return message;
      } catch {
        return null;
      }
    }
    function idgen() {return `${Math.random().toString(36).substr(2, 5)}`;}
    function parseEmoji(text) {
      if (text.includes("%")) text = decodeURIComponent(text);
      if (!text.includes(":")) return false;
      const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
      if (!m) return false;
      return {
        animated: Boolean(m[1]),
        name: m[2],
        id: m[3] || null
        //  review: text
      };
    }
    if (!args[0])
      return message.channel.send(
        new Discord.MessageEmbed({
          fields: [
            {
              name: "add [channel] <msg_id> <emoji> <role>",
              value:
                "Adds a single emoji-role pair to a message through its ID. This is really only"
            },
            {
              name: "list",
              value:
                "Shows the emoji-role pairs and their associated message id"
            },
            {
              name: "purge [id/all]",
              value:
                "Clears all reaction roles in the server or from a message if one is supplied."
            }
          ]
        })
          .setColor("#cf1919")
          .setTitle("Reaction Roles HelpList")
          .setFooter(
            `Reqeusted By: ${message.author.tag}`,
            message.author.avatarURL({ dynamic: true })
          )
      );
    if (args[0] && args[0].toLowerCase() === "add") {
      const ARGS = ["channel", "message_id", "emoji", "role"];
      if (!args[1])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription('Missing argument, the "channel" is required')
            .setColor("#cf1919")
        );

      const channelMentioned = message.mentions.channels.first(); //filter(c => c.guild.id == message.guild.id).first()
      if (!args[2])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription('Missing argument, the "MessageID" is required')
            .setColor("#cf1919")
        );

      const msg = await fetchMessage(
        message.client,
        args[2],
        channelMentioned ? channelMentioned.id : message.channel.id
      );

      if (!msg)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription('Missing argument, the "MessageID" not vaild')
            .setColor("#cf1919")
        );

      if (!args[3])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription('Missing argument, the "emoji" is required')
            .setColor("#cf1919")
        );
      const emoji = Discord.Util.parseEmoji(args[3]);
      console.log(idgen().toUpperCase());
      if (!emoji)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription("That does not seem to be an emoji.")
            .setColor("#cf1919")
        );
      if (!args[4])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription('Missing argument, the "role" is required')
            .setColor("#cf1919")
        );
      const role = message.guild.roles.cache.find(r => {
        if (r.id === args[4]) return true;
        if (r.name.toLowerCase() === args[4].toLowerCase()) return true;
        if (
          /<@&(\d{17,19})>/.test(args[4]) &&
          r.id == args[4].match(/<@&(\d{17,19})>/)[1]
        )
          return true;
        return false;
      });

      if (!role)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription(
              `I couldn't find a role with the name \`${args[4]}\`.`
            )
            .setColor("#cf1919")
        );

      if (role.managed)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription(
              `The role \`${role.name}\` is managed and cannot be assigned.`
            )
            .setColor("#cf1919")
        );
      try {
        await msg.react(emoji.id ? emoji.id : emoji.name);
        await client.db.server.findOneAndUpdate(
          { id: message.guild.id },
          {
            $push: {
              reaction_roles: {
                reaction: emoji.id || emoji.name,
                reaction_review: args[3], //`<a:${emoji.name}:${emoji.id}>`|| emoji.name ,
                guild_id: message.guild.id,
                message_id: msg.id,
                channel_id: msg.channel.id,
                role_id: role.id,
                by: message.author.tag,
                id: idgen().toUpperCase(),
                type: "normal"
              }
            }
          }
        );
        return message.channel.send(
          new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setColor("GREEN")
            .setTitle("New Reaction Role Created Succesfully")
            .addField("__Channel__:", msg.channel)
            .addField(
              "__Message Link__:",
              `[Link](https://discord.com/channels/${message.guild.id}/${msg.channel_id}/${msg.id})`
            )
            .addField("__Role__:", role)
            .addField("__Emoji__:", emoji.name)
            .addField("__ID__:", idgen().toUpperCase())
            .setFooter(
              message.author.tag,
              message.author.avatarURL({ dynamic: true })
            )
        );
      } catch {
        return message.channel.send("Something bad happened :/");
      }
    } else if (args[0] && args[0].toLowerCase() === "list") {
      /*if (settings.reaction_roles.guild_id === null)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("You do not have any reaction roles.")
        );
*/
      const database = settings.reaction_roles;
      // if (database.length <= 0)
      if (database.id === null)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("You do not have any reaction roles.")
        );
      const data = database.filter(
        val => val && val.message_id && val.reaction_review
      );
      if (data.length <= 0)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("You do not have any reaction roles.")
        );

      const embed = {
        title: `Reaction Roles List Of ${message.guild.name}`,
        color: 3447003,
        footer: {
          text: `Requested By: ${message.author.tag}`,
          icon_url: message.author.avatarURL({ dynamic: true })
        },
        fields: []
      };

      for (const msg_id of new Set(data.map(r => r.id))) {
        embed.fields.push({
          name: `ID: __${msg_id}__`, //`${data.map(x => x.id)}`,
          value: `${data
            .filter(r => r.id === msg_id)
            .map(
              r =>
                `**__Message Link__:** [Link](https://discord.com/channels/${message.guild.id}/${r.channel_id}/${r.msg_id})\n**__Channel__**: <#${r.channel_id}>\n**__Emoji__**:${r.reaction_review}\n**__Role__**: <@&${r.role_id}>\n**__Created By__**: ${r.by}`
            )}`,
          inline: true
        });
      }

      message.channel.send({ embed });
    } else if (args[0] && args[0].toLowerCase() === "purge") {
      const data = settings.reaction_roles;
      if (!args[1])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription(
              `Missing argument, the "input" is required\nExample: \`all\`: for purge all, \`reactrole id\` for purge one`
            )
        );
      if (args[1] && args[1].toLowerCase() !== "all") {
        //if (args[1]) {
        const toDelete = data.filter(r => r.id == args[1]);

        if (!toDelete || toDelete.length <= 0)
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("BLACK")
              .setDescription(
                "That **__ID__** does not have any registered reaction roles."
              )
          );

        await client.db.server.findOneAndUpdate(
          { id: message.guild.id },
          { reaction_roles: data.filter(r => r.id !== args[1]) }
        );
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `**__${toDelete.length}__** reaction roles removed from that message.`
            )
        );
      }
      if (args[1] && args[1].toLowerCase() === "all") {
        const m = await message.channel.send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              "This will remove *__ALL__* reaction roles, are you sure?"
            )
        );

        await m.react("✅");
        await m.react("❌");

        const filter = (reaction, user) =>
          user.id === message.author.id &&
          ["✅", "❌"].includes(reaction.emoji.name);

        m.awaitReactions(filter, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
          .then(async collected => {
            m.reactions.removeAll().catch(() => null);

            const emoji = collected.first().emoji.name;

            if (emoji == "❌" && m.editable) m.delete();
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor("BLACK")
                .setDescription(
                  `__**${
                    [...new Set(data.map(r => r.id))].length
                  }**__ reaction roles removed`
                )
            );

            await client.db.server.findOneAndUpdate(
              { id: message.guild.id },
              { reaction_roles: [] }
            );
          })
          .catch(() => message.channel.send("You took too long."));
      }
    }
  }
};
