const BaseCommand = require("../../utils/structures/BaseCommand");

const Discord = require("discord.js");

module.exports = class MAgicCommand extends BaseCommand {

  constructor() {

    super({

    name: "8ball",

    desc: "Asks The Bot Some Questions",
      
    usage: "[p]8ball <questions>",

    category: "Fun",

    aliases: ["magicball"]

    });

  }



  async run(client, message) {

    let args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send(

      new Discord.MessageEmbed()

      .setColor('RED')

        .setDescription("Please ask a full question")

    );

    let replies = [

        'Maybe.',

	    'Certainly not.',
	    'I hope so.',

	    'Not in your wildest dreams.',

    	'There is a good chance.',

	    'Quite likely.',

    	'I think so.',

    	'I hope not.',

    	'I hope so.',

    	'Never!',

    	'Pfft.',

	    'Sorry, bucko.',

    	'Hell, yes.',

    	'Hell to the no.',

    	'The future is bleak.',

	    'The future is uncertain.',

	    'I would rather not say.',

    	'Who cares?',

    	'Possibly.',

    	'Never, ever, ever.',

    	'There is a small chance.',

    	'Yes!',

    	'lol no.',

    	'There is a high probability.',

    	'What difference does it makes?',

    	'Not my problem.',

        'Ask someone else.'

    ];



    let result = Math.floor((Math.random() * replies.length));

    let question = args.slice(0).join(" ");



    let embed = new Discord.MessageEmbed()

    .setColor(`${message.member.roles.highest.hexColor ? message.member.roles.highest.hexColor : "RED"}`)

    .setDescription(`Q:\n\`\`\`${question}\`\`\`\nA:\n\`\`\`${replies[result]}\`\`\``);



    message.channel.send({embed});

  }

};
