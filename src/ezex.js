const Discord = require("discord.js");
const client = new (require("./Base/Client"))({ disableMentions: "everyone" });
const Dashboard = require("./dashboard/dashboard.js");
const settings = require("./settings.js");
const mongoose = require("mongoose");
client.on("ready", () => {
  Dashboard(client);
});
const { Collection, Client, MessageEmbed } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
(async () => {
  client.commands = new Collection();
  client.aliases = new Collection();
  client.events = new Collection();
  client.settings = settings;

  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(client.settings.Token);
  mongoose
    .connect(client.settings.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Connected to the Mongodb database.");
    });
})();
