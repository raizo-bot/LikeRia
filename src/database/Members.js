const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Member",
  new Schema({
    userID: { type: String },
    guildID: { type: String },
    warns: { type: Array, default: [] },
    xp: { type: Number, default: 0 },
    xp_voice: { type: Number, default: 0 },
    next: { type: Number, default: 50 },
    level: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    time: { type: Object, default: null },
    protect: { type: Object, default: 0 },
    protectchannelc: { type: Object, default: 0 },
  })
);
