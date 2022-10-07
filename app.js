var createError = require('http-errors');
var express = require('express');
var expressValidator = require('express-validator');

var expressLayouts = require('express-ejs-layouts');

var mysql = require('mysql');
var conn = require('./database');



var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var method_override = require('method-override');




var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//ROUTER
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var BahanBakuRouter = require('./routes/bahan_baku');
var ProdukJadiRouter = require('./routes/produk_jadi');
const { urlencoded } = require('body-parser');




var app = express();

// view engine setup


// Coba Pake Express Layouts

// app.use(expressLayouts);
// app.set('layout','./views/template');



// Cara Biasa

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// HUBUNGAN DENGAN DB 
app.use((req,res,next)=>{

  req.conn = conn;
  next();

});


app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:6000}

}));


app.use(flash());

app.use(method_override("_method"));

app.use(express.json());

app.use(urlencoded({extended:true}));







app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public')));

// app.use(expressValidator());




//REALISASI ROUTER
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bahan_baku',BahanBakuRouter);
app.use('/produk_jadi',ProdukJadiRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
