const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "disable",
    desc: "Disables a channel or command",
    category: "Settings",
    aliases: [],
    usage:"[p]disable",
    memberPerm: ["ADMINISTRATOR"],
    botPerm: [],
    examples:["{channel}", "ping"]              
    });
  }

  async run(client, message, args, settings) {
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Couldn't find command or channel"));
const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
const channel =  message.mentions.channels.first();
if(!channel && !command)return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Couldn't find command or channel"));
if(channel && !command){
if(settings.ignoredChannels.includes(channel.id))return message.channel.send(
new Discord.MessageEmbed().setColor("#cf1919").setDescription("This channel is already disabled."));
await client.db.server.findOneAndUpdate(
  { id: message.guild.id },
   { $push: { ignoredChannels: [`${channel.id}`] } });
 message.channel.send(new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Disabled Channel")
           .setDescription(`You have been Disabled: __${channel}__ from use commands.`));
}else if(command && !channel){
if(settings.ignoredCommands.includes(command.name))return message.channel.send(new Discord.MessageEmbed()
        .setColor("#cf1919")
.setDescription("This command is already disabled."));
await client.db.server.findOneAndUpdate(
  { id: message.guild.id },
   { $push: { ignoredCommands: [`${command.name}`] } });
 message.channel.send(new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Disabled Command")
               .setDescription(`You have been Disabled: __\`${command.name}\`__ command.`));

  }}
};
