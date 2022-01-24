'use strict';
let express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");

let app     = express();
//Set express variable
app.use(cors({orgin: '*'}));
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes

// Necessary for posting data
// Support json encoded bodies
app.use(bodyParser.json());
// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Test connection to server
app.get('/welcome', (req, res) => {
    res.json({message: "Server connection has started! Grüezi Herr Garavaldi, viel Spass beim Schauen unserer LB02!"});
});

//Add customer routes
require("./customer/api.js")(app);