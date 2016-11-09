const express = require('express');

const app = express();

const models = require('./server/models');

require('./server/config/express.js')(express, app);
//require('./server/config/passport.js')(app, models);

// const Users = require('./api/routers/users.js');
// new Users(app, models);

// const UserRegister = require('./api/routers/UserRegister.js');
// new UserRegister(app, models);

app.set('port', (process.env.PORT || 3001));

app.get('/api/list', (req, res) => {
  res.send({
    id: 1000,
    message: "Deu certo",
    tel: "88766666"
  });
});

app.get('/*', (req, res) => {
  res.render('./public/index.html');
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});