const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const { CaptchaGenerator } = require("captcha-canvas");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "pay",
      desc: "Transfer a credits to user",
      usage: "[p]pay <user> <amount>",
      category: "Economy",
      aliases: [],
      examples:["{user} 1"]
    });
  }
  async run(client, message, args) {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      client.users.cache.get([0]);
    const authorData = await client.getUserData(message.author.id);
    if(!args[0])
  return message.channel.send(new MessageEmbed().setColor("#cf1919").setDescription(`Make __mention__ next time.`))
if(!user){
  return message.channel.send(new MessageEmbed().setColor("#cf1919").setDescription(`I can't __\`${args[0]}\`__`))
}
const memberData = await client.getUserData(user.id);
    if (message.author.id == user.id)
      return message.channel.send(
        new MessageEmbed()
          .setDescription("You Cant Pay To YourSelf ")
          .setColor("#cf1919")
      );
if(user.bot) return message.channel.send(new MessageEmbed().setColor("#cf1919").setDescripiton("The bots don't have credits."))
    if (authorData.coins < parseInt(args[1]))
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(
            `You don't have Enough credits to give to ${user.username}`
          )
      );
    if (parseInt(args[1]) < 1)
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`You Must transfer Coins above \`1\`.`)
      );
    if (isNaN(parseInt(args[1])))
      return message.channel.send(
        new MessageEmbed()
          .setDescription("Invaild Number.")
          .setColor("#cf1919")
      );    

    var taxval = Math.floor(parseInt(args[1]) * (5.4 / 100));
    var amount = Math.floor(parseInt(args[1]) - taxval);
    const captcha = new CaptchaGenerator() //.setDimension(120, 200)
      .setCaptcha({
        size: 40,
        text: `${Math.floor(Math.random() * (9854 - 1245 + 1)) + 1245}`
      })
      .setDecoy({ opacity: 0.5 });
    const buffer = await captcha.generate();
    const msg = await message.channel.send(
      `**${message.author.username}, Transfer Fees: \`${taxval}\`, Amount :\`$${amount}\`**\ntype these numbers to confirm :`,
      { files: [buffer] }
    ); 
    const responses = message.channel
      .awaitMessages(response => response.content === captcha.text, {
        max: 1,
        time: 20000,
        errors: ["time"]
      })
      .then(async collected => {
        if (responses !== captcha.text) {
          msg.delete().catch(() => {});
        }
       message.channel.send(new MessageEmbed().setDescription(`**${message.author}, has transferred \`$${amount}\` to ${user}**`).setColor("GREEN").setTitle("Success!"));
        await client.db.user.findOneAndUpdate(
          { userID: memberData.userID },
          { coins: memberData.coins + amount }
        );
        await client.db.user.findOneAndUpdate({ userID: authorData.userID }, { coins: authorData.coins - parseInt(Math.floor(args[1])) }
        );
        user
          .send(
            new MessageEmbed()
              .setDescription(
                `🏧 | You have been received \`$${amount}\` from **${message.author.username}#${message.author.discriminator}** (ID: \`${message.author.id}\`)`
              )
              .setColor("GREEN")
              .setFooter("Ezex Coins", client.user.avatarURL())
              .setTimestamp()
          )
          .catch(() => {});
      })
      .catch(() => {
        msg.delete();
      });
  }
};
