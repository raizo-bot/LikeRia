const BaseEvent = require("../utils/structures/BaseEvent");

const dab = require("quick.db");

const Discord = require("discord.js");

const mongoose = require("mongoose");
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("m1231essage");
  }

  async run(client, message) {
    if (message.author.bot) return;
 /* // require("../Base/Leveler.js")(client, message);
    const _0x4c02=['level','8LpUqJY','ceil','coins','find','14jrhXZK','findOneAndUpdate','sort','map','user','113591eZkIBV','584971tONVyM','has','floor','1ftQtrk','exports','author','759206kboXDY','guild','1634025miadzH','channel','51643YinmPu','bot','648424gdlMVT','next','random','member','496199sYyAXj','add','userID'];const _0x2251=function(_0x4d2b8c,_0x13ea51){_0x4d2b8c=_0x4d2b8c-0x1a3;let _0x4c02fb=_0x4c02[_0x4d2b8c];return _0x4c02fb;};const _0x3da84d=_0x2251;(function(_0x4ed8b3,_0x4c6db0){const _0x236f95=_0x2251;while(!![]){try{const _0x30b879=-parseInt(_0x236f95(0x1bb))+parseInt(_0x236f95(0x1a5))+-parseInt(_0x236f95(0x1b9))+-parseInt(_0x236f95(0x1a9))*-parseInt(_0x236f95(0x1b2))+parseInt(_0x236f95(0x1b3))+parseInt(_0x236f95(0x1b6))*parseInt(_0x236f95(0x1bf))+-parseInt(_0x236f95(0x1ad))*-parseInt(_0x236f95(0x1bd));if(_0x30b879===_0x4c6db0)break;else _0x4ed8b3['push'](_0x4ed8b3['shift']());}catch(_0x49d9c6){_0x4ed8b3['push'](_0x4ed8b3['shift']());}}}(_0x4c02,0xec59d));function generate(_0x9e15c8,_0xf0d7b2){const _0x424ff9=_0x2251;return Math[_0x424ff9(0x1aa)](Math[_0x424ff9(0x1a3)]()*(_0xf0d7b2-_0x9e15c8+0x1));}const cooldown=new Set();module[_0x3da84d(0x1b7)]=async(_0x59f171,_0x300eca)=>{const _0x5913bf=_0x3da84d;if(_0x300eca[_0x5913bf(0x1b8)][_0x5913bf(0x1be)])return;const _0x4e104b=await _0x59f171['getMemberData'](_0x300eca[_0x5913bf(0x1b8)]['id'],_0x300eca[_0x5913bf(0x1ba)]['id']),_0x10de4f=await _0x59f171['getUserData'](_0x300eca[_0x5913bf(0x1b8)]['id']);if(_0x300eca[_0x5913bf(0x1bc)]['id']=='756299031289921566')return;try{if(!cooldown[_0x5913bf(0x1b4)](_0x300eca[_0x5913bf(0x1b8)]['id'])){if(_0x4e104b['xp']>=_0x4e104b['next'])await _0x59f171['db']['member'][_0x5913bf(0x1ae)]({'userID':_0x4e104b[_0x5913bf(0x1a7)],'guildID':_0x300eca['guild']['id']},{'xp':_0x4e104b['xp']+generate(0x1,0x3),'level':_0x4e104b[_0x5913bf(0x1a8)]+0x1,'next':Math[_0x5913bf(0x1b5)](_0x4e104b[_0x5913bf(0x1c0)]*1.45)});else await _0x59f171['db'][_0x5913bf(0x1a4)]['findOneAndUpdate']({'userID':_0x4e104b[_0x5913bf(0x1a7)],'guildID':_0x300eca['guild']['id']},{'xp':_0x4e104b['xp']+generate(0x1,0x3)});if(_0x10de4f['xp']>=_0x10de4f['next'])await _0x59f171['db'][_0x5913bf(0x1b1)][_0x5913bf(0x1ae)]({'userID':_0x10de4f['userID']},{'xp':_0x10de4f['xp']+generate(0x1,0x3),'level':_0x10de4f[_0x5913bf(0x1a8)]+0x1,'next':Math['floor'](_0x10de4f[_0x5913bf(0x1c0)]*1.45),'coins':_0x10de4f[_0x5913bf(0x1ab)]+0x10});else await _0x59f171['db'][_0x5913bf(0x1b1)]['findOneAndUpdate']({'userID':_0x10de4f[_0x5913bf(0x1a7)]},{'xp':_0x10de4f['xp']+generate(0x1,0x5),'coins':_0x10de4f[_0x5913bf(0x1ab)]+generate(0x1,0xa)});cooldown[_0x5913bf(0x1a6)](_0x300eca[_0x5913bf(0x1b8)]['id']),setTimeout(()=>cooldown['delete'](_0x300eca[_0x5913bf(0x1b8)]['id']),0x1388*0x2),await _0x59f171['db'][_0x5913bf(0x1a4)][_0x5913bf(0x1ac)]({'guildID':_0x300eca['guild']['id']},async(_0x33f660,_0x1cdbd1)=>{const _0x25a54d=_0x5913bf;if(_0x33f660)return;let _0x4fd12c=_0x1cdbd1[_0x25a54d(0x1b0)](_0x3be7b1=>_0x3be7b1[_0x25a54d(0x1a7)]),_0x5ee710=0x0;while(_0x4fd12c[_0x5ee710]){await _0x59f171['db']['member'][_0x25a54d(0x1ae)]({'userID':_0x4fd12c[_0x5ee710],'guildID':_0x300eca['guild']['id']},{'rank':_0x5ee710+0x1}),_0x5ee710++;}})[_0x5913bf(0x1af)]({'xp':-0x1}),await _0x59f171['db'][_0x5913bf(0x1b1)][_0x5913bf(0x1ac)]({},async(_0x2cd7cb,_0x277a57)=>{const _0x2c80f1=_0x5913bf;if(_0x2cd7cb)return;let _0xa5f117=_0x277a57[_0x2c80f1(0x1b0)](_0x503686=>_0x503686[_0x2c80f1(0x1a7)]),_0x10d666=0x0;while(_0xa5f117[_0x10d666]){await _0x59f171['db']['user'][_0x2c80f1(0x1ae)]({'userID':_0xa5f117[_0x10d666]},{'rank':_0x10d666+0x1}),_0x10d666++;}})[_0x5913bf(0x1af)]({'xp':-0x1});}}catch{}};
    let settings = await client.getGuildSettings(message.guild.id);
    if (
      message.content.toLowerCase() === `<@${client.user.id}>` ||
      message.content.toLowerCase() === `<@!${client.user.id}>`
    ) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `Prefix of **__${message.guild.name}__** is: \`${settings.prefix}\``
          )
      );
    }
    if (message.content.toLowerCase().startsWith(settings.prefix)) {
      if (message.author.bot || message.channel.type === "dm") return;
      const args = message.content

        .slice(settings.prefix.length)

        .trim()

        .split(/ +/);

      let cmd = args.shift().toLowerCase();
      const aliase = settings.aliases.find(x => x.name == cmd);

      const command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd)) ||
        client.commands.get(aliase ? aliase.command : undefined);
      const aliases = [];
      if (!command) return;
      command.aliases.forEach(c => aliases.push(c));

      settings.aliases
        .filter(x => x.command == command.name)
        .forEach(c => aliases.push(c.name));
      if (command.memberPerm) {
        const requiredPermissions = message.guild.member(message.author);
        if (command.memberPerm.length !== 0) {
          if (!requiredPermissions.hasPermission(command.memberPerm))
            return message.channel.send({
              embed: new Discord.MessageEmbed()
                .setDescription(
                  `You don't have \`${command.memberPerm}\` permissions, to run this command.`
                )
                .setColor("#cf1919")
            });
        }
      }
      if (command.botPerm) {
        const requiredPermissions = message.guild.member(client.user);
        const missingPermissions = [];
        if (command.category === "Music") {
          let channel = message.member.voice.channel;
          if (!channel)
            return message.channel.send(
              new Discord.MessageEmbed()
                .setColor("#cf1919")
                .setDescription("You're not in voice channel")
            );
          const permissions = channel.permissionsFor(message.client.user);
          if (!permissions.has(command.botPerm))
            return message.channel.send({
              embed: new Discord.MessageEmbed()
                .setDescription(
                  `I don't have \`${command.botPerm}\` permissions, to run this command.`
                )
                .setColor("#cf1919")
            });
        }
        if (command.botPerm.length !== 0) {
          if (!requiredPermissions.hasPermission(command.botPerm))
            return message.channel.send({
              embed: new Discord.MessageEmbed()
                .setDescription(
                  `I don't have \`${command.botPerm}\` permissions, to run this command.`
                )
                .setColor("#cf1919")
            });
        }
      }
      if (settings.ignoredChannels.includes(message.channel.id))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription(
              `This channel is __\`Disabled\`__ from use commands.`
            )
        );
      if (settings.ignoredCommands.includes(command.name))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription(`This command is __\`Disabled\`__.`)
        );

      if (command) {
        command.run(client, message, args, settings);

        const channel = client.channels.cache.get("818611806292672523");
        if (channel) {
          channel.send(`\`\`\`

User : ${message.author.tag}

Command : ${settings.prefix}${command.name} 

Guild :	${message.guild.name}

Channel : ${message.channel.name} \`\`\``);
        }
      }
    }*/
  }};
