/**
 * You must have to:
 *  - copy this files and rename it "port.js"
 *  - edit this one with your port
 */




/*
 *  IF YOU WANT TO USE YOUR LOCAL API
 */
const api_url = "http://localhost:3000";
const api_port = 3000;


/*
 *  IF YOU WANT TO USE PROD API UNCOMMENT THIS BLOCK
 */
/*const api_url = "http://161.35.17.111:3000";
const api_port = 3000;*/



module.exports.api_port = api_port;
module.exports.api_url = api_url;