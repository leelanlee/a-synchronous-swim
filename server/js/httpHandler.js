const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};


module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);


  if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
    console.log(req);
    console.log(res);
  }

  if (req.method === "GET") {
    res.writeHead(200, headers);
    res.end('up');
    console.log(req);
    console.log(res);
  }


  next(); // invoke next() at the end of a request to help with testing!

};
