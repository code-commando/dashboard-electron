'use strict';

import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/oauth', (req, res) => {
  res.send('yup it works');
  console.log(req.body);
  window.sessionStorage.setItem('jwt', req.body.jwt);
  window.sessionStorage.setItem('gjwt', req.body.gjwt);
  // res.redirect('/');
});


let server = false;
module.exports = {
  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log('Server running on ' + port);
      });
    } else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    server.close(() => {
      console.log('Server has closed');
    });
  },
  server: app,
};