/**
 * Created by tehetenamasresha on 28/03/2017.
 */
const express = require('express')
const https = require('https');
const fs = require('fs');
const cookieParser  = require('cookie-parser')
const bodyParser  = require('body-parser')
const validator  = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const moment = require('moment')
const passport = require('passport')
const flash = require('connect-flash')
const apiController = require('./controllers/apiController')
const htmlController = require('./controllers/htmlController')
const _ = require('underscore')

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
    key: sslkey,
    cert: sslcert
};

const app = express()

require('dotenv').config()

mongoose.Promise = global.Promise; //ES6 Promise
//mongoose.connect('mongodb://localhost:27017/test').then(() => {

//mongoose.connect(db)

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/cats`).then(() => {

    console.log('Connected successfully.')



    app.use (cookieParser())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

    app.use (validator())


    require('./config/passport')
    app.use (session({
        secret: 'thisisasecret',
        resave: false,
        saveUninitialized: false,
        store : new MongoStore({mongooseConnection: mongoose.connection})
    }))
    app.use(flash())
    app.use (passport.initialize())
    app.use (passport.session())

    app.locals._ = _;
    app.locals.moment = moment;

 require('./routes/user')(app)
 require('./routes/book')(app)
 require('./routes/review')(app)
 require('./routes/message')(app)

    const port = process.env.PORT || 3030;
    https.createServer(options, app).listen(port);

    //app.listen(port)
    apiController(app)
    htmlController(app)


}, err => {
    console.log('Connection to db faileed: ' + err)
});





