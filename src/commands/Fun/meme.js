const BaseCommand = require("../../utils/structures/BaseCommand");
const got = require("got");
const Discord = require("discord.js");
module.exports = class BadCommand extends BaseCommand {
  constructor() {
    super({
    name: "meme",
    description: "meme command",
    category: "Fun"
    });
  }

  async run(client, message) {
    const embed = new Discord.MessageEmbed();
    got("https://www.reddit.com/r/meme/random/.json")
      .then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setColor("#ffffff");
        embed.setFooter(`❤️ ${memeUpvotes} 💬 ${memeNumComments}`);
        message.channel
          .send(embed)
          .then(sent => console.log(`Sent a reply to ${sent.author.username}`));
        console.log("Bot responded with: " + memeImage);
      })
      .catch(console.error);
  }
};