const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

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
  }
  //
  // if (req.method === "GET") {
  //   if(req.url === '/') {
  //     res.writeHead(200, headers);
  //     res.end(randomCommandGenerator());
  //   }
  // }

  if (req.method === "GET") {
    if(req.url === '/') {
      console.log(messages)
      res.writeHead(200, headers);
      res.end(messages.dequeue());
    }

    if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        }
        else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end();
      })
    }
  }


  next(); // invoke next() at the end of a request to help with testing!

};

// var randomCommandGenerator = () => {
//   var command = ['up', 'down', 'left', 'right'];
//   var random = Math.floor(Math.random() * 4);
//   return (command[random]);
// }
