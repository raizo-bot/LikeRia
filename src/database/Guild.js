const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const settings = require("../settings.js");

module.exports = mongoose.model(
  "Guild",
  new Schema({
    id: { type: String, unique: true },
    prefix: { type: String, default: settings.Prefix },
    log: {
      type: Object,
      default: {
        toggle: "off",
        token: null,
        id: null,
        channel: null
      }
    },
    modlog: {
      type: Object,
      default: {
        enabled: false,
        channel: null
      }
    },
    welcome: {
      type: Object,
      default: {
        toggle: "off",
        channel: null,
        message: null
      }
    },
    autoRole: {
      type: Object,
      default: {
        toggle: "off",
        role: null
      }
    },
    Ticketss: {
      type: Object,
      default: {
        category: null,
        role: null,
        toggle: "on"
      }
    },
    number: { type: Number, default: 0 },
    protect: {
      type: Object,
      default: {
        toggle: "off",
        ban: 5,
        kick: 5,
        channeld: 5,
        channelc: 5,
        rolec: 5,
        roled: 5,
        time: 30,
        timelet: "m",
        antibotsto: "off",
        antius: null
      }
    },
    reaction_roles: {
      type: Object,
      default: {
        reaction: null,
        reaction_review: null,
        guild_id: null,
        message_id: null,
        channel_id: null,
        role_id: null,
        by: null,
        id: null,
        type: null
      }
    },
    aliases: { type: Array, default: [] },
    ignoredCommands: { type: Array, default: [] },
    ignoredChannels: { type: Array, default: [] }
  })
);
