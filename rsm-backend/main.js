const Discord = require("discord.js");
const express = require('express');
const request = require('request');
const routes = require('./routes/routes');

const fs = require('fs');
var globalConfig = require("./config/globalconfig.json");
// const config = config;

const debug = globalConfig.debug;

const app = express()
const port = process.env.PORT || globalConfig.apiPort;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

let totalServers = globalConfig.servers;
const maxServers = 5;

for (var i = 1; i <= totalServers; i++){
    if (i > maxServers) {
      console.log("Max servers is over " + maxServers);
      console.log("Please verify max servers and try again");
      process.exit()
    }
    const client = new Discord.Client();
    const config = require("./config/config"+i+".json");
    const serverFile = require("./config/server"+i+".json");

    client.on("ready", () => {
        console.log(`Bot ${client.user.tag} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
        // Make it so it uses serverFile.title
        // client.user.setActivity(`Test`);
      });
      
      client.on("guildCreate", guild => {
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        // client.user.setActivity(`Serving ${client.guilds.size} servers`);
      });
      
      client.on("guildDelete", guild => {
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
        // client.user.setActivity(`Serving ${client.guilds.size} servers`);
      });

      client.on('error', function (error) {
        if (debug) console.log(error);
    });

    client.on("message", async message => {

        function readDiscordFile(value) {
            callback = fs.readFile(value, 'utf8', function (err, data) {
              if (!err){
                  let calldata = (data);
                  if(debug) console.log(calldata)
                  message.channel.send(calldata);
                  return;
              }
              if(err){
                console.log(err)
                message.channel.send(err)
                return;
              }
            });
        }

        function sendRconCommand(argumentString) {
            var headers = {
              'User-Agent':       'discord-rsm',
              'Content-Type':     'application/x-www-form-urlencoded',
              'apikey': globalConfig.apikey
            }
            var options = {
              url: config.apiUrl + "/rcon",
              method: 'POST',
              headers: headers,
              form: {'value': argumentString}
            }
            request(options, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                if(debug) {
                  console.log(body)
                }
                return message.channel.send(`Message: ${body}`);
              }
            })
            
          }
        
          function getServerInfo(getMessage, i) {
            var headers = {
              'User-Agent':       'discord-rsm',
              'Content-Type':     'application/x-www-form-urlencoded',
              'apikey': globalConfig.apikey
            }
        
            var options = {
              url: config.apiUrl,
              method: 'GET',
              headers: headers,
            }
            request(options, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                json = JSON.parse(body);
                
                try {
                  let obj = getMessage;
                  for (obj in serverFile) {
                      let value = json[obj];
                      if(obj == getMessage) {
                          return message.channel.send(`${getMessage}: ${value}`);
                      }
                  }
                  if(debug) console.log("Not found")
                  return message.channel.send(`Not found`);
                  }
                  catch (e) {
                      if(debug) console.log("Error" + e)
                      return message.channel.send(`No match to ${getMessage}`);
                  }
              }
              if(error) {
                console.log(error) 
                return message.channel.send(`Message: ${error}`);
              }
            })
          }
        
          function updateParameters(name, value) {
            var headers = {
              'User-Agent':       'discord-rsm',
              'Content-Type':     'application/x-www-form-urlencoded',
              'apikey': globalConfig.apikey
            }
            let apiurl = config.apiUrl + "/" + name
            if(debug)console.log(apiurl)
            var options = {
              url: config.apiUrl + "/" + name,
              method: 'PUT',
              headers: headers,
              form: {'value': value}
            }      
            request(options, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                if(debug) console.log(body);
                return message.channel.send(`Message: ${body}`);
              }
              if (!error && response.statusCode == 404) {
                return message.channel.send(`Message: ${body}`);
              }
            })
          }

        if(message.author.bot) return;

        if(message.content.indexOf(config.prefix) !== 0) return;
      
        var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();

        if(command === "help") {
            if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
            return message.reply("Sorry, you don't have permissions to use this!");
            let value = "discord/help.txt";
            readDiscordFile(value)
        }
        if(command === "parameters") {
          if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this!");
          let value = "discord/parameters.txt";
          readDiscordFile(value)
      }
        if(command === "rcon") {
            if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
              return message.reply("Sorry, you don't have permissions to use this!");
          
            var getMessage = args.join(" ");
            sendRconCommand(getMessage);
        }
        if(command === "restart") {
        if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
            return message.reply("Sorry, you don't have permissions to use this!");
        
        var getMessage = args.join(" ");
        if (`${getMessage.length}` < 1) {
            return message.channel.send(`Usage: !restart 600 - restart min value is 10`);
        }
        argumentString = `restart ${getMessage}`;
        sendRconCommand(argumentString);
        }
        if(command === "abortrestart") {
        if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
            return message.reply("Sorry, you don't have permissions to use this!");
        
        var getMessage = args.join(" ");
        argumentString = "restart -1";
        sendRconCommand(argumentString);
        }
        if(command === "say") {
        if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
            return message.reply("Sorry, you don't have permissions to use this!");
        
        var getMessage = args.join(" ");
        if (`${getMessage.length}` < 1) {
            return message.channel.send(`Usage: !say hello`);
        }
        argumentString = `say ${getMessage}`;
        sendRconCommand(argumentString);
        }
        if(command === "wipe") {
            if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
                return message.reply("Sorry, you don't have permissions to use this!");
        
            var getMessage = args.join(" ");
        
            let value = "discord/wipe.txt";
            readDiscordFile(value)
        }
        if(command === "get") {
            if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
                return message.reply("Sorry, you don't have permissions to use this!");
        
            var getMessage = args.join(" ");
        
            
            getServerInfo(getMessage, i);
        }
        if(command === "set") {
            if(!message.member.roles.some(r=>config.roles.includes(r.name)) )
            return message.reply("Sorry, you don't have permissions to use this!");
        
            let name = args.slice(0,1).join(' ');
            if(debug) console.log(`${name}`);
            let value = args.slice(1).join(' ');
            if(debug) console.log(`${value}`);
            
            if (`${value.length}` < 1) {
            return message.channel.send(`Usage: !set ${name} <parameter>`);
            }
            updateParameters(name, value);
        }
    });
    if(config.startbot == "1") {
      client.login(config.token);
    }
    else {
      console.log("Discord bot "+i+" deactivated");
    }
}

app.listen(port, () => console.log('Discord-RSM on port '+ port))