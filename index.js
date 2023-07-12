const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const passport = require('passport')
const session = require('express-session')
const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } 
    })
  )
  app.use(passport.initialize())
app.use(passport.session())
  .use(require("./routes"));
  
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });
  
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
    
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
