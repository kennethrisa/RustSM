const uuidv4 = require('uuid/v4');
const fs = require('fs');

const file = "../config/globalconfig.json";
const debug = false;

// Read json
let config = require("../config/globalconfig.json");

console.log("This is a random generated uuid by uuid/v4");

// Generate random apikey
const apikey = uuidv4();
config.apikey = apikey;

// Write apikey to config
fs.writeFile(file, JSON.stringify(config, null, 2), function (err) {
    if (err) {
        console.log("Error writing apikey to config! - apikey generator did not generate sucessfully")
        if(debug) console.log(err);
        // return
    }
    // console.log(JSON.stringify(file, null, 4));
    if(debug) console.log('writing to ' + file);
   console.log( 'Updated: apikey' + ' to: ' + apikey);
    return;
});