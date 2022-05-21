const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv/config')

// IMPORT UTILITIES
const dbConnection = require('./configuration/dbConnection');

// CORS OBJECT CONFIGS

// WHITELIST 
const whitelist = ['http://localhost:4041'];
// CORS Options 
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('ORIGIN NOT ALLOWED BY CORS'), null);
        }
    },
    optionsSuccessStatus: 200
}

// MIDDLWARES
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({ maxAge: 24 * 60 * 60 })); // FORCE HTTPS ONLY 
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noSniff())
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "default-src": ["*", "'unsafe-inline'"],
        "script-src": ["*", "'unsafe-inline'"],
        "object-src": ["*", "'unsafe-inline'"],
        "img-src": ["*", "data:", "blob:", "'unsafe-inline'"],
        upgradeInsecureRequests: []
    }
})); // IMPLEMENT CONTENT SECURITY POLICY (CSP)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// START DB CONNECTION
dbConnection(process.env.DB_CONNECTION_URI);

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
