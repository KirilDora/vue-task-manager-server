const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cors = require('cors');

const logger = require('morgan');
const fileUpload = require('express-fileupload');

const github = require('./routes/github');

const options = require('./config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
    allowedHeaders: ['*', 'front-host', 'content-type'],
    exposedHeaders: ['*', 'front-host', 'content-type'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, options.FILEPATH)));

app.use('/api', github);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, options.FILEPATH + '/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
