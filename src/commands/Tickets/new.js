const BaseCommand = require("../../utils/structures/BaseCommand");

const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "new",
      desc: "Open a privacy ticket with server support",
      usage: "[p]new <subject>",
      botPerm: ["MANAGE_CHANNELS"],
      category: "Tickets",
      aliases: [],
      examples:["Support"]
      
    });
  }

  async run(client, message, args, settings) {
    let subject = args.join(" ");
    let number = 0;
    let ticket = settings.Ticketss;
    let role;
    let cato
    if (ticket.role){
      role = message.guild.roles.cache.find(z => z.id === ticket.role);
      }
    if(ticket.category){cato = message.guild.channels.cache.find(z => z.id === ticket.category);}
    let already = message.guild.channels.cache.find(
      c =>
        c.topic ===
        `Author: ${message.author.username} 
ID: ${message.author.id}`
    );

    let everyone = message.guild.roles.cache.find(
      role => role.name === "@everyone"
    );

    let open = new Discord.MessageEmbed()
      .setColor("#cf1919")
      .setDescription(`You already have a ticket opened __${already}__.`);
    if (already)
      return already
        .send(message.author, open)
        .catch(err => console.log(err.console));

    message.guild.channels
      .create(`ticket-${settings.number + 1}`, { type: "text" })
      .then(ticket => {
        if (ticket.category) ticket.setParent(ticket.category);
        ticket.createOverwrite(role, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true
        });
        ticket.createOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false
        });
        ticket.createOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true
        });
        let ms;
        if(role) ms = `| ${role}`
        if(!role) ms = ``;
        let succes = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`Your ticket has been created <#${ticket.id}>`)
          .setFooter(
            `${message.author.username}`,
            message.author.avatarURL({ dynamic: true })
          );
        ticket.setTopic(
          `Author: ${message.author.username}    
ID: ${message.author.id}`
        );
        message.channel.send({ embed: succes });
        const nonedear = new Discord.MessageEmbed()
          .setDescription(
            `Dear custumer, 

Thank you for reaching out to our support team!

We will get back to you as soon as possible`
          )
          .addField("Subject", subject || "No Subject")
          .setColor("GREEN")
          .setFooter(
            `${client.user.username}`,
            client.user.avatarURL({ dynamic: true })
          )
          .setTimestamp();
        ticket.send(`${message.author} | ${ms}`, { embed: nonedear });
      });
    await client.db.server.findOneAndUpdate({ id: message.guild.id },
      { number: settings.number + 1 }
    );
  }
};
