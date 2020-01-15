const express = require('express');
const path = require('path');
const open = require('open');
const compression = require('compression');
// import http from 'http';
/*import https from 'https';
import fs from 'fs';*/

/*eslint-disable no-console */

// const sslPort = 443;
const nonSSLPort = 3002;
const app = express();

app.use(compression());
app.use(express.static('dist'));
// app.use(express.static('web/dist/rjsapp/joinNow/v2/static'));

// app.get('/joinNow/v2/static/css/main.722760fa.css', function(req, res) {
//   res.sendFile(path.join(__dirname, '../dist/joinNow/v2/static/css/main.722760fa.css'));
// });

// app.get('/rjsapp/joinNow/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../dist/rjsapp/joinNow/v2/index.html'));
// });

app.get('/chat-app/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../dist/rjsapp/index.html'));
// });

app.listen(nonSSLPort, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${nonSSLPort}`);
  }
});

// let options = {
//   key: fs.readFileSync('/Users/admin/Desktop/cer/server.key'),
//   cert: fs.readFileSync('/Users/admin/Desktop/cer/server.crt'),
// };

// let httpsServer = https.createServer(options, app).listen(nonSSLPort, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     open(`https://localhost:${nonSSLPort}`);
//   }
// });
