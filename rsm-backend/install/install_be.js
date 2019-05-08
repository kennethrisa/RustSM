const uuidv4 = require('uuid/v4');
const fs = require('fs');
const debug = false;

var configdir = '../config';

if (!fs.existsSync(configdir)){
    fs.mkdirSync(configdir);
}

if (fs.existsSync("../config/globalconfig.json")) {
    var defaultGlobalConfig = require("../config/globalconfig.json");
    if(debug) console.log("true")
    if((!defaultGlobalConfig.apiPort && !defaultGlobalConfig.servers) || !defaultGlobalConfig.apiPort) {
        if(debug) console.log("globalconfig is incorrect, use _default instead")
        var defaultGlobalConfig = require("../default/_globalconfig.json");
    }
}
else {
    if(debug) console.log("false")
    var defaultGlobalConfig = require("../default/_globalconfig.json");
}

if (fs.existsSync("../config/globalconfig.json")) {
    var defaultGlobalConfig = require("../config/globalconfig.json");
    if(debug) console.log("true")
    if((!defaultGlobalConfig.apiPort && !defaultGlobalConfig.servers) || !defaultGlobalConfig.apiPort) {
        if(debug) console.log("globalconfig is incorrect, use _default instead")
        var defaultGlobalConfig = require("../default/_globalconfig.json");
    }
}
else {
    if(debug) console.log("false")
    var defaultGlobalConfig = require("../default/_globalconfig.json");
}

const globalConfigFile = "../config/globalconfig.json";
var prompt = require('prompt-async');

function SaveGlobalConfig(servers,apiPort) {

    let globalConfig = require("../config/globalconfig.json");
    globalConfig.servers = servers;
    globalConfig.apiPort = apiPort;

    fs.writeFile(globalConfigFile, JSON.stringify(globalConfig, null, 2), function (err) {
        if (err) {
            console.log("Error writing globalconfig.json")
            if(debug) console.log(err);
        }
        if(debug) console.log('writing to ' + globalConfigFile);
        console.log( 'Saved config file');
        return GenerateConfig();
    });
}

function SaveConfig(id, startbot, token, prefix, roles, apiUrl) {

    let config = {}
    config.id = id;
    config.startbot = startbot;
    config.token = token;
    config.prefix = prefix;
    config.roles = roles;
    config.apiUrl = apiUrl;

    const configFile = "../config/config"+id+".json";
    fs.writeFile(configFile, JSON.stringify(config, null, 2), function (err) {
        if (err) {
            console.log("Error writing config")
            if(debug) console.log(err);
        }
    });
    
}

function SaveServerConfig(id, serverip,serverport,rconip,rconport,rconpassword,maxplayers,hostname,identity,level,uselevelurl,levelurl,seed,worldsize,saveinterval,headerimage,serverurl,oxide,branch,update,forceupdate,wipe,custom,title) {

    let server = {}
    server.id = id;
    server.dir = "serverfiles";
    server.serverip = serverip;
    server.serverport = serverport;
    server.rconip = rconip;
    server.rconport = rconport;
    server.rconpassword = rconpassword;
    server.maxplayers = maxplayers;
    server.hostname = hostname;
    server.identity = identity;
    server.level = level;
    server.uselevelurl = uselevelurl;
    server.levelurl = levelurl;
    server.seed = seed;
    server.worldsize = worldsize;
    server.saveinterval = saveinterval;
    server.headerimage = headerimage;
    server.serverurl = serverurl;
    server.update = update;
    server.forceupdate = forceupdate;
    server.wipe = wipe;
    server.oxide = oxide;
    server.branch = branch;
    server.custom = custom;
    server.title = title;

    const configFile = "../config/server"+id+".json";
    fs.writeFile(configFile, JSON.stringify(server, null, 2), function (err) {
        if (err) {
            console.log("Error writing config")
            if(debug) console.log(err);
        }
    });
    
}

function GenerateApikey() {
    
    if(!defaultGlobalConfig.apikey == "" || !defaultGlobalConfig.apikey == undefined) {
        if(debug) {
            console.log("Found apikey")
            console.log(defaultGlobalConfig.apikey)
        }
        
        return UpdateGlobalConfig()
        
    }
    else {
        // Generate random apikey
        let globalConfig = {}
        const apikey = uuidv4();
        globalConfig.apikey = apikey;

        fs.writeFile(globalConfigFile, JSON.stringify(globalConfig, null, 2), function (err) {
            if (err) {
                console.log("Error writing apikey to config! - apikey generator did not generate sucessfully")
                if(debug) console.log(err);
                return;
            }
            if(debug) {
                console.log(JSON.stringify(globalConfig, null, 2));
                console.log('writing to ' + globalConfigFile);
                console.log('Updated: apikey' + ' to :' + apikey);
            }
            console.log('Saved new apikey')
            return UpdateGlobalConfig()
        });

    }

}

async function UpdateGlobalConfig(){
    var globalConfigSchema = {
        properties: {
            servers: {
            default: defaultGlobalConfig.servers,
            message: 'How many servers you want to setup? (Max 5) (Press enter for default)',
            hidden: false,
            required: true
            },
            apiPort: {            
            default: defaultGlobalConfig.apiPort,
            message: 'Api port: (Press enter for default)',
            required: false
            }
        }
    };
    console.log("Globalconfig: ");
    console.log("How many servers and apiport: ");
    prompt.start();
    prompt.get(globalConfigSchema, function (err, result) {
        if (err) {
            if(debug) console.log(err);
            console.log("\nInstall Canceled")
            return 1;
        }else {

            let servers = result.servers;
            let apiPort = result.apiPort;

            console.log('Command-line input received:');
            console.log('  Total servers to setup: ' + servers );
            console.log('  ApiPort set to: ' + apiPort);
            
            // Save
            SaveGlobalConfig(servers,apiPort);
        }
    });
}

async function ConfigPrompt(s) {
    try {
        if (fs.existsSync("../config/config"+s+".json")) {
            var configExist = true;
            var defaultConfig = require("../config/config"+s+".json");
            if(debug) console.log("true")
        }
        else {
            var configExist = false;
            var defaultConfig = require("../default/_config.json");
            if(debug) console.log("false")
        }
        if(configExist) {
            var apiurl = defaultConfig.apiUrl
            if(debug) console.log("True apiurl")
        }
        else {
            var apiurl = defaultConfig.apiUrl+s
            if(debug) console.log("false apiurl")
        }
        
        var ConfigSchema = {
            properties: {
                startbot: {
                default: defaultConfig.startbot,
                message: 'Enable discord bot (Press enter for default)',
                hidden: false,
                required: true
                },
                token: {            
                default: defaultConfig.token,
                message: 'Discord token: (Press enter for default)',
                required: false
                },
                prefix: {            
                default: defaultConfig.prefix,
                message: 'Discord prefix: (Press enter for default)',
                required: false
                },
                roles: {            
                default: defaultConfig.roles,
                message: 'Discord role permission: (Press enter for default)',
                required: false
                },
                apiUrl: {            
                default: apiurl,
                message: 'Api url for server: (Press enter for default)',
                required: true
                }
            }
        };
        id = s;
        console.log(`config for server id: ${id}`)
        console.log("Config for discord, token, permission and apiurl")
        const {startbot, token, prefix, roles, apiUrl} = await prompt.get(ConfigSchema);
        
        console.log(`   Finish config for Server id: ${id}`)
        SaveConfig(id, startbot, token, prefix, roles, apiUrl);
           
        }
        catch (err) {
            if(debug) console.log(err)
            return console.log("Install canceled")
        }
        
}

async function ConfigServerPrompt(s) {
    try {
        if (fs.existsSync("../config/server"+s+".json")) {
            var server = require("../config/server"+s+".json");
            if(debug) console.log("true")
        }
        else {
            var server = require("../default/_server.json");
            if(debug) console.log("false")
        }
        var schema = {
            properties: {
                serverip: {
                default: server.serverip,
                message: 'serverip: ',
                hidden: false,
                required: true
                },
                serverport: {            
                default: server.serverport,
                message: 'Server port: (Press enter for default)'
                },
                rconip: {            
                default: server.rconip,
                message: 'Rconip: (Press enter for default)'
                },
                rconport: {            
                default: server.rconport,
                message: 'Rcon port (Press enter for default)',
                },
                rconpassword: {  
                default: server.rconpassword,
                message: 'Rconpassword: (Press enter for default)',
                required: true
                },
                maxplayers: {  
                default: server.maxplayers,
                message: 'maxplayers: (Press enter for default)',
                },
                hostname: {  
                default: server.hostname,
                message: 'hostname: (Press enter for default)',
                },
                identity: {  
                default: server.identity,
                message: 'identity: (Press enter for default)',
                },
                level: {  
                default: server.level,
                message: 'Map level: (Press enter for default)',
                },
                uselevelurl: {  
                default: server.uselevelurl,
                message: 'uselevelurl: (custom map) (Press enter for default) [0/1]',
                },
                levelurl: {  
                default: server.levelurl,
                message: 'levelurl: (Press enter for default)',
                },
                seed: {  
                default: server.seed,
                message: 'seed: (Press enter for default)',
                },
                worldsize: {  
                default: server.worldsize,
                message: 'worldsize: (Press enter for default)',
                },
                saveinterval: {  
                default: server.saveinterval,
                message: 'saveinterval: (Press enter for default)',
                },
                headerimage: {  
                default: server.headerimage,
                message: 'headerimage: (Press enter for default)',
                },
                serverurl: {  
                default: server.serverurl,
                message: 'serverurl: (Press enter for default)',
                },
                oxide: {  
                default: server.oxide,
                message: 'Enable Oxide/Umod (0/1): (Press enter for default)',
                },
                branch: {  
                default: server.branch,
                message: 'branch: (public/staging)(Press enter for default)',
                },
                title: {  
                default: server.title,
                message: 'A server title: (Press enter for default)',
                }
            }
        };
        id = s;
        
        let update = "1";
        let forceupdate = "0";
        let wipe = "0";
        let custom = "";

        console.log(`Generating server config for server id: ${id}`);
        console.log("All server parameters will be prompted");
        const {serverip,serverport,rconip,rconport,rconpassword,maxplayers,hostname,identity,level,uselevelurl,levelurl,seed,worldsize,saveinterval,headerimage,serverurl,oxide,branch,title} = await prompt.get(schema);
        
        console.log(`   Finish server config for Server id: ${id}`)
        SaveServerConfig(id, serverip,serverport,rconip,rconport,rconpassword,maxplayers,hostname,identity,level,uselevelurl,levelurl,seed,worldsize,saveinterval,headerimage,serverurl,oxide,branch,update,forceupdate,wipe,custom,title);

        }
        catch (err) {
            if(debug) console.log(err)
            return console.log("Install canceled")
        }
        
}

async function GenerateConfig() {
    const globalConfig = require("../config/globalconfig.json");
    const defaultConfig = require("../default/_config.json");

    const totalServers = globalConfig.servers;
    // Generate config
    for (var s = 1; s <= totalServers; s++){
        await ConfigPrompt(s)
    }
    // Generate server config
    for (var s = 1; s <= totalServers; s++){
        await ConfigServerPrompt(s)
    }
    
}

GenerateApikey()