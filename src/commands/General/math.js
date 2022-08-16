const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "math",
    desc: "Calclute a equation",
    category: "General",
    aliases: [],
    usage:"[p]math <equation>",
    memberPerm: [],
    botPerm: [],
    examples:["10+10","90/10","1-1","10*10"]              
    });
  }

  async run(client, message, args) {
const fetch = require('node-fetch')
var allowed = ["+", "-", "*", "/", "(", ")", " "];
   let exercise = args.join("").trim();
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription("Type a equation"))
for (var i = 0; i < exercise.length; i++) {
      let c = exercise.charAt(i);
      let found = allowed.find(element => element === c);
      if (c == "0") found = true; 
      if (!(Number(c) || found))return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription(`Invalid equation. Please use "*" for multiplication and "/" for division!`));
    }
    let result = new Function("return " + exercise)();
    message.channel.send(new Discord.MessageEmbed().setDescription(`${exercise} = ${result}`).setColor("GREEN"));

  
  
  }
};
