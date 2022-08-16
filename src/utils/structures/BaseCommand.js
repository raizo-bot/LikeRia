const path = require("path")
  const home = path.resolve(`${process.cwd()}${path.sep}/src/commands`);

module.exports = class BaseCommand {

  constructor({

    name = null,

    desc = "None",
 
    usage = `[p]${name}`,
    
    category = undefined,

    cooldown = undefined,

    aliases = [],
    
    memberPerm = [],
    
    botPerm = ["ATTACH_FILES", "SEND_MESSAGES"],
    
    examples=[]

  }) {

    this.name = name;

    this.desc = desc;
    
    this.usage = usage;

    this.category = category

    this.cooldown = cooldown;

    this.aliases = aliases;
    
    this.memberPerm = memberPerm
  
    this.botPerm = botPerm
    
    this.examples = examples
 
  }

};

