const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const Logentries = require('le_node');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const favicon = require('serve-favicon');

module.exports = (express, app) => {
  // const icoUrl = path.resolve(path.join('public', 'assets', 'images', 'smile.ico'));
  app.use(express.static(path.resolve(path.join('client', 'build'))));

  const logger = new (winston.Logger)({
    transports: [
        // new winston.transports.File({
        //     level: 'info',
        //     filename: './logs/all-logs.log',
        //     handleExceptions: true,
        //     json: true,
        //     maxsize: 5242880, //5MB
        //     maxFiles: 5,
        //     colorize: false
        // }),
      //new Logentries({ token: process.env.LOGENTRIES_TOKEN }),
      new winston.transports.Console({
        level: 'verbose',
        handleExceptions: true,
        json: true,
        colorize: true,
      }),
    ],
    exitOnError: false,
  });

  logger.stream = {
    write(message, encoding) {
      logger.info(message);
    },
  };

  //if(process.env.NODE_ENV !== 'test') {
  	app.use(morgan('combined', { stream: logger.stream }));
    app.set('logger', logger);
  //}

  app.use(cookieParser());
  // app.use(favicon(icoUrl));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 2419200000 },
  }));
  app.use(connectFlash());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
};
