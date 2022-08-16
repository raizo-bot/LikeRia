// We import modules.
const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Discord = require("discord.js");

// We instantiate express app and the session store.
const app = express();
const MemoryStore = require("memorystore")(session);
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
// We export the dashboard as a function which we call in ready event.
module.exports = async client => {
  const dataDir = path.resolve(`${process.cwd()}${path.sep}/src/dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`); // Absolute path of ./templates directory.
  // We declare absolute paths.
  // The absolute path of current this directory.

  // Deserializing and serializing users without any additional logic.
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  // We set the passport to use a new discord strategy, we pass in client id, secret, callback url and the scopes.
  /** Scopes:
   *  - Identify: Avatar's url, username and discriminator.
   *  - Guilds: A list of partial guilds.
   */
  passport.use(
    new Strategy(
      {
        clientID: "801791354236829697",
        clientSecret: "Mi7B0XgJe0IcPt01RgAA3YI8Ug2obRKn",
        callbackURL: "https://ashour1.glitch.me/auth",
        scope: ["identify", "guilds", "guilds.join"]
      },
      (accessToken, refreshToken, profile, done) => {
        // eslint-disable-line no-unused-vars
        // On login we pass in profile with no logic.
        process.nextTick(() => done(null, profile));
      }
    )
  );

  // We initialize the memorystore middleware with our express app.
  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret:
        "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false
    })
  );

  // We initialize passport middleware.
  app.use(passport.initialize());
  app.use(passport.session());

  // We bind the domain.
  app.locals.domain = "https://ashour1.glitch.me/";

  // We set out templating engine.
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");

  // We initialize body-parser middleware to be able to read forms.
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // We declare a renderTemplate function to make rendering of a template in a route as easy as possible.
  const renderTemplate = (res, req, template, data = {}) => {
    const botStats = [
      { botty: client, user: req.isAuthenticated() ? req.user : null }
    ];
    // Default base data which passed to the ejs template by default.
    const baseData = {
      client: client,
      botStats,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    // We render template using the absolute path of the template and the merged default data with the additional data provided.
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };

  // We declare a checkAuth function middleware to check if an user is logged in or not, and if not redirect him.
  const checkAuth = (req, res, next) => {
    // If authenticated we forward the request further in the route.
    if (req.isAuthenticated()) return next();
    // If not authenticated, we set the url the user is redirected to into the memory.
    req.session.backURL = req.url;
    // We redirect user to login endpoint/route.
    res.redirect("/login");
  };

  // Login endpoint.
  app.get(
    "/login",
    (req, res, next) => {
      // We determine the returning url.
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL; // eslint-disable-line no-self-assign
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      // Forward the request to the passport middleware.
      next();
    },
    passport.authenticate("discord")
  );

  // Callback endpoint.
  app.get(
    "/auth",
    passport.authenticate("discord", { failureRedirect: "/" }),
    /* We authenticate the user, if user canceled we redirect him to index. */ (
      req,
      res
    ) => {
      // If user had set a returning url, we redirect him there, otherwise we redirect him to index.
      if (req.session.backURL) {
        const url = req.session.backURL;
        req.session.backURL = null;
        res.redirect(url);
      } else {
        res.redirect("/");
      }
    }
  );

  // Logout endpoint.
  app.get("/logout", function(req, res) {
    // We destroy the session.
    req.session.destroy(() => {
      // We logout the user.
      req.logout();
      // We redirect user to index.
      res.redirect("/");
    });
  });

  // Index endpoint.
  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs", { client: client });
  });

  // Dashboard endpoint.
  app.get("/dashboard", checkAuth, async (req, res) => {
    const user = req.isAuthenticated() ? req.user : null;
    const botStats = [
      { client: client, user: req.isAuthenticated() ? req.user : null }
    ];
    const memberData = await client.getUserData(user.id);
    const coins = memberData.coins;
    const rank = memberData.rank;
    const level = memberData.level;
    const rep = memberData.rep;
    const id = "794373762027880458";
    renderTemplate(res, req, "dashboard.ejs", {
      bot: botStats,
      user,
      client,
      Discord,
      coins,
      rank,
      level,
      rep,
      id
    });
  });
  app.get("/discord", (req, res) => {
    res.redirect(
      "https://discord.com/api/oauth2/authorize?client_id=512712219398766613&permissions=8&scope=bot"
    );
  });

  app.get("/invite", (req, res) => {
    res.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=512712219398766613&permissions=8&scope=bot`
    );
  });

  app.get("/commands", async (req, res) => {
    renderTemplate(res, req, "commands.ejs", { client: client });
  });
  app.get("/profile", checkAuth, async (req, res) => {
    const user = req.isAuthenticated() ? req.user : null;
    const botStats = [
      { client: client, user: req.isAuthenticated() ? req.user : null }
    ];
    const memberData = await client.getUserData(user.id);
    const coins = memberData.coins;
    const rank = memberData.rank;
    const level = memberData.level;
    const rep = memberData.rep;
    const id = "512712219398766613";

    renderTemplate(res, req, "profile.ejs", {
      bot: botStats,
      user,
      client,
      Discord,
      coins,
      rank,
      level,
      rep,
      id
    });
  });
  app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    const botStats = [
      { client: client, user: req.isAuthenticated() ? req.user : null }
    ];
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged =
      guild && Boolean(guild.member(req.user.id))
        ? guild.member(req.user.id).permissions.has("MANAGE_GUILD")
        : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    const groles = app.get(
      `https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`
    );
    let on = `${
      guild.members.cache.filter(r => r.presence.status === "online").size
    }`;
    const settings = await client.getGuildSettings(guild.id);
    const prefix = settings.prefix;
    const user = req.isAuthenticated() ? req.user : null;
    let g = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
    const welcomer = settings.welcome;
    const autorole = settings.autoRole;
    const log = settings.log;
    const protect = settings.protect;
    const ticket = settings.Ticketss;
    if (!guild.icon) {
      g =
        "https://media.discordapp.net/attachments/734444022235660319/745269711801155731/AATXAJw1tXvJInOnm44MdEF3kS0b8x-W4Twj27SYvJ9gRws900-c-k-c0xffffffff-no-rj-mo.png?width=677&height=677";
    }
    let all = guild.memberCount;
    renderTemplate(res, req, "server.ejs", {
      guild,
      user,
      all,
      client: client,
      g,
      on,
      bot: botStats,
      Discord,
      prefix,
      welcomer,
      autorole,
      ticket,
      protect,
      log
    });
  });

  app.post("/welcome", async (req, res) => {
    var channel = req.body.channelID;

    var message = req.body.message;

    var guild = req.body.guild;

    var onoff = req.body.WelcomeToggle;

    if (!client.channels.cache.get(channel))
      return res.send(
        "Error, no channel specified. <a href='/'>Back To Home Page</a>"
      );

    if (!client.guilds.cache.get(guild))
      return res.send(
        "Error, no channel specified. <a href='/'>Back To Home Page</a>"
      );

    if (!message)
      return res.send(
        "Error, no message specified. <a href='/'>Back To Home Page</a>"
      );
    const settings = await client.getGuildSettings(guild);

    await client.db.server.findOneAndUpdate(
      { id: guild },
      {
        welcome: {
          channel: channel,
          message: message,
          toggle: onoff
        }
      }
    );

    console.log(
      `For ${guild}, welcome channel is: ${
        client.channels.cache.get(channel).name
      } |${settings.welcome.toggle}, message is ${message}`
    );

    res.redirect(`/server/${guild}`);
  });

  app.post("/autorole", async (req, res) => {
    var role = req.body.channelID;

    var guild = req.body.guild;

    var onoff = req.body.AutoToggle;

    if (!guild) return;

    if (!role)
      return res.send(
        "Error, no role specified. <a href='/'>Back To Home Page</a>"
      );

    if (!client.guilds.cache.get(guild).roles.cache.find(x => x.name === role))
      return res.send(
        "Error, no role specified. <a href='/'>Back To Home Page</a>"
      );

    let roleid = client.guilds.cache
      .get(guild)
      .roles.cache.find(x => x.name === role);

    if (!client.guilds.cache.get(guild))
      return res.send(
        "Error, no guild specified. <a href='/'>Back To Home Page</a>"
      );
    const settings = await client.getGuildSettings(guild);
    if (onoff === "on") {
      await client.db.server.findOneAndUpdate(
        { id: guild },
        { autoRole: { role: roleid.id, toggle: onoff } }
      );
      console.log(
        `For ${guild}, role is ${role} with the id ${roleid} ${onoff},,,,,${settings.autoRole.toggle}`
      );

      res.redirect(`/dashboard/${guild}`);
    } else {
      await client.db.server.findOneAndUpdate(
        { id: guild },
        { autoRole: { role: roleid.id, toggle: "off" } }
      );
      console.log(
        `For ${guild}, role is ${role} with the id ${roleid} ${onoff}     ${settings.autoRole.toggle}`
      );
      res.redirect(`/dashboard/${guild}`);
    }
  });

  app.post("/log", (req, res) => {
    var channel = req.body.channelID;
    var guild = req.body.guild;
    var onoff = req.body.LogToggle;
    if (onoff === "on") {
      client.channels.cache
        .get(channel)
        .createWebhook("Special - Logging", { avatar: client.user.avatarURL() })
        .then(async wb => {
          await client.db.server.findOneAndUpdate(
            { id: guild },
            { log: { channel: channel, id: wb.id, toggle: onoff } }
          );
        });
      console.log(
        `For ${guild}, log channel is: ${channel}, toggle is ${onoff}`
      );
      res.redirect(`/dashboard/${guild}`);
    } else {
      client.channels.cache
        .get(channel)
        .createWebhook("Special - Logging", { avatar: client.user.avatarURL() })
        .then(async wb => {
          await client.db.server.findOneAndUpdate(
            { id: guild },
            { log: { channel: channel, id: wb.id, toggle: "off" } }
          );
        });
      console.log(
        `For ${guild}, log channel is: ${channel}, toggle is ${onoff}`
      );
      res.redirect(`/dashboard/${guild}`);
    }
  });

  app.post("/name", async (req, res) => {
    var prefix = req.body.prefix;
    var guild = req.body.guild;
    await client.db.server.findOneAndUpdate({ id: guild }, { prefix: prefix });
    console.log(`For ${guild} \n prefix has been set to : ${prefix}`);
  });
  app.post("/prefix", async (req, res) => {
    var prefix = req.body.prefix;
    var guild = req.body.guild;
    await client.db.server.findOneAndUpdate({ id: guild }, { prefix: prefix });
    console.log(`For ${guild} \n prefix has been set to : ${prefix}`);
  });

  app.post("/tickets", async (req, res) => {
    var category = req.body.category;
    var role = req.body.role;
    var guild = req.body.guild;
    var on = req.body.TicketToggle;
    console.log(role);
    const settings = await client.getGuildSettings(guild);
    let o;
    if (on === "on") {
      if (settings.Ticketss.role === role) {
        console.log(`For ${guild} ${role} ${category} ${o}`);
        await client.db.server.findOneAndUpdate(
          { id: guild },
          { Ticketss: { role: role, category: category, toggle: on } }
        );
        res.redirect(`/dashboard/${guild}`);
      } else {
        let roleid = client.guilds.cache
          .get(guild)
          .roles.cache.find(x => x.name === role).id;
        console.log(`For ${guild} \n${role}\n${category}\${o}`);
        await client.db.server.findOneAndUpdate(
          { id: guild },
          { Ticketss: { role: roleid, category: category, toggle: on } }
        );

        res.redirect(`/dashboard/${guild}`);
      }
    } else {
      if (settings.Ticketss.role === role) {
        console.log(`For ${guild} ${role} ${category} ${on}`);
        await client.db.server.findOneAndUpdate(
          { id: guild },
          { Ticketss: { role: role, category: category, toggle: "off" } }
        );
        res.redirect(`/dashboard/${guild}`);
      } else {
        let roleid = client.guilds.cache
          .get(guild)
          .roles.cache.find(x => x.name === role).id;
        console.log(`For ${guild} \n${role}\n${category}\n${on}`);
        await client.db.server.findOneAndUpdate(
          { id: guild },
          { Ticketss: { role: roleid, category: category, toggle: "off" } }
        );
        res.redirect(`/dashboard/${guild}`);
      }
    }
  });
  app.post("/protection", async (req, res) => {
    var ban = req.body.banlimit;
    var kick = req.body.kicklimit;
    var rolec = req.body.rolecreatelimit;
    var roled = req.body.roledeletelimit;
    var roomc = req.body.roomcreatelimit;
    var roomd = req.body.roomdeletelimit;
    var time = req.body.digits;
    var on = req.body.ProToggle;
    var timelet = req.body.letters;
    var guild = req.body.guild;
    await client.db.server.findOneAndUpdate(
      { id: guild },
      {
        protect: {
          kick: kick,
          ban: ban,
          rolec: rolec,
          roled: roled,
          channeld: roomd,
          channelc: roomc,
          time: time,
           timelet:timelet,
          toggle: on
        }
      }
    );
    if (on === "on") {
      console.log(`For ${guild}
    Ban: ${ban}
    Kick: ${kick}
    rolec: ${rolec}
    roled: ${roled}
    roomc: ${roomc}
    roomd: ${roomd}
    time: ${time}
    toggle: ${on}
    letters: ${timelet}
    `);
    } else {
      await client.db.server.findOneAndUpdate(
        { id: guild },
        {
          protect: {
            kick: kick,
            ban: ban,
            rolec: rolec,
            roled: roled,
            channeld: roomd,
          channelc: roomc,
            time: time,
            timelet:timelet,
            toggle: "off"
          }
        }
      );
      console.log(`For ${guild}
    Ban: ${ban}
    Kick: ${kick}
    rolec: ${rolec}
    roled: ${roled}
    roomc: ${roomc}
    roomd: ${roomd}
    time: ${time}
    toggle: off
    letters: ${timelet}
    `);
    }
  });
};
//client.login("ODAxNzkxMzU0MjM2ODI5Njk3.YAl0Yw.3r2uZlrqEylebacv9LRtWiRsXLg")
