module.exports = function(app) {

    const config = require("../config/globalconfig.json");
    const fs = require('fs');
    const rcon = require("../rcon_app/app.js");

    const debug = config.debug;

    const checkApiKey = function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); 
        if (req.headers.apikey !== config.apikey) {
            return res.status(401).json({status: 'Access-Denied'});
        }
        next();
    };
    
    app.all('/api*', checkApiKey);

    app.get('/api/server/:id', function(req, res) {
        let readServerFile = "./config/server"+req.params.id+".json"
        callback = fs.readFile(readServerFile, 'utf8', function (err, data) {
        if (!err){
            let calldata = (JSON.parse(data));
            return res.json(calldata);
        }
        else {
            console.log(err.message);
            return res.status(500).json({Status: 'Error'});
        }
        });
    });
    app.put('/api/server/:id/:name', function (req, res) {
        if (req.body.value == null) {return res.json({status: 'error'})};
        if (req.body.value === "") {return res.json({status: 'error', message: 'value cannot be null'});}
        else {
            try {
                let defaultConfig = require("../default/_server.json" );
                let file = require("../config/server"+req.params.id+".json" );
                const writeFile = "./config/server"+req.params.id+".json";
                let key = req.params.name;
                for (key in defaultConfig) {
                    let value = req.body.value;
                    if(key == req.params.name) {
                        file[key] = value;
                        fs.writeFile(writeFile, JSON.stringify(file, null, 2), function (err) {
                            if (err) {
                                console.log(err);
                                return res.status(404).json({Status: 'Error writing file '})
                            }
                            if(debug) console.log('writing to ' + writeFile);
                        });
                        return res.json({Status: 'Updated: ' + req.params.name + ' to ' + req.body.value })
                    }
                }
                if(debug) console.log("Not found " + file)
                return res.status(404).json({Status: 'Not found: ' + req.params.name })
            }
            catch (e) {
                if(debug) console.log("Server file with id: %o not found",req.params.id )
                return res.status(404).json({Status: 'Error: Server not found', id: req.params.id })
            }
        }
    });
    app.post('/api/server/:id/rcon', function (req, res) {
    if (req.body.value == null) {return res.json({status: 'error'})};
    let readServerFile = "./config/server"+req.params.id+".json"
        callback = fs.readFile(readServerFile, 'utf8', function (err, data) {
        if (!err){
            const calldata = (JSON.parse(data));
            argumentString = req.body.value;
            rconhost = calldata.rconip;
            rconport = calldata.rconport;
            rconpass = calldata.rconpassword;
            rcon.RconApp(argumentString, rconhost, rconport,rconpass);
            return res.json({status: 'ok', rcon_command: argumentString});
        }
        else {
            console.log(err.message);
            return res.status(500).json({Status: 'Error'});
        }
        });
    });
};
