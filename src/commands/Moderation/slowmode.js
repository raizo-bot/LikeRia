const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms")
const humanize = require('humanize-duration');
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "slowmode",
      desc: "Change cooldown for a channel",
      usage: "[p]slowmode <time>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_CHANNELS"],
      botPerm: ["MANAGE_CHANNELS"],
      examples:["10s","reset"]
    });
  }
  async run(client, message, args) {
       let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel;
        
        let time = message.mentions.channels.first() ? args[1] : args[0];
        
        if(!time) {
            return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Please insert a time."));
        } else if(time.toLowerCase() === "reset" || time.toLowerCase() === "off") {
            if(channel.rateLimitPerUser < 1) return message.channel.send(new Discord.MessageEmbed().setDescription("This/that channel doesn't have a slowmode.").setColor("#cf1919"))
            await channel.setRateLimitPerUser(0);
            return message.channel.send(new Discord.MessageEmbed().setDescription(`<#${channel.id}> slowmode has been reseted.`).setColor("GREEN"));
        }
        
        let toMS = ms(time);
        let result  = Math.floor(toMS / 1000);
        
        if(!result) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Please insert a valid time."));
        
        if(result > 21600) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Time should be less than or equal to \`6\` hours."));
        else if(result < 1) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Time should be more than or equal to 1 second. (you can use **off** or **reset** to disable the slowmode.)"))
        await channel.setRateLimitPerUser(result);
        return message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`<#${channel.id}> slowmode is now \`${humanize(toMS)}\`.`).setColor("GRREN"))
}}