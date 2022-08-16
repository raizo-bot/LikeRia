const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = mongoose.model(
  "User",
  new Schema({
    userID: { type: String, unique: true },
    img: {type: Object, default:"https://cdn.discordapp.com/attachments/804372460299616256/808709671941570590/PicsArt_02-09-03.43.23.jpg"  },
    title: {type: Object, default:"  "  },
    xp: { type: Number, default: 0 },
    next: { type: Number, default: 100 },
    level: { type: Number, default: 0 },
    rep: { type: Number, default: 0 },
    coins: { type: Number, default: 5 },
    rank: { type: Number, default: 0 },
    daily_cooldown: { type: Number, default: 0 },
    rep_cooldown: { type: Number, default: 0 },
    used_commands: { type: Number, default: 0 }
  })
);