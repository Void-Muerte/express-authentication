require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const session = require('express-session');
const passport = require('passport');
const path = require('path')
//const SQliteStore = require('connect-sqlite3')(session);
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const app = express();
app.locals.pluralize = require('pluralize');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//static path set to public folder
app.use(express.static(path.join(__dirname, 'public')));
// a session secret is simply used to compute hash


// app.use(session({
//     secret:'avogadro constant', 
//     resave:false,
//     saveUninitialized:false,
//     store: new SQliteStore({db:'sessionStorage.db', dir: './var/dir'})
// }));
// // we want passport to authenticate our session
// app.use(passport.authenticate('session'));
// app.use((req, res, next)=>{
//     const msgs = req.session.messages || [];
//     res.locals.messages = msgs;
//     res.locals.hasMessages = !! msgs.length;
//     res.session.messages = [];
//     next();
// })

// using the router
app.use('/', indexRouter);
app.use('/', authRouter);
// catch 404 and   forward to error handler
app.use((req, res, next)=>{
    next(createError(404));
});

// Error handler
app.use((err,req, res, next)=>{
    // set locals, only providing error in dev
    res.locals.message = err.message;
    res.locals.error = req.app.get('env'==='development'? err: {});

    // render the error page

    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;