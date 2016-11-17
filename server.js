const express = require('express');

const app = express();

const models = require('./server/models');

require('./server/config/express.js')(express, app);
require('./server/config/passport.js')(app, models);
require('./server/api/routers')(app, models);

app.set('port', (process.env.PORT || 3001));

app.get('/api/list', (req, res) => {
  res.send({
    id: 1000,
    message: "Deu certo",
    tel: "88766666"
  });
});

app.get('/*', (req, res) => {
  // /token/5776a237-22f8-495a-b5c7-c80d07f79f4e
  res.sendfile(__dirname + '/client/build/index.html');
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
