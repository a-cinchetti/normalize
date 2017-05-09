var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sw = require('stopword');
var index = require('./routes/index');
var users = require('./routes/users');
var jsonfile = require('./videodata.json');
var app = express();
var  appoggio = new Array();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//console.log(jsonfile.categories[0]);
var arr = jsonfile.categories;
for (var i = 0; i < arr.length; i++){
    var tmp = JSON.stringify(arr[i]);  //thus i copy elements but not the references
    //var obj = arr[i];
    var obj = JSON.parse(tmp);
    appoggio.push(obj); //create an array so it will become a file json
    for (var key in obj){
        var attrName = key;
        var attrValue = obj[key];
        //obj[key] = myfunction(attrValue);
        //console.log(obj[key]);
        appoggio[i][key] = myfunction(attrValue)
    }
}
var jsonArray = JSON.parse(JSON.stringify(appoggio))
//var esempio = myfunction(jsonfile.categoryName);

function myfunction(esempio) {
const oldString = esempio.split(' ')
const newString = sw.removeStopwords(oldString)
var file = newString.join(' ');
file = file.replace(/;/g , "");
file = file.replace(/[()?!]/g, "");
file = file.toLowerCase();
file = file.replace(/&/g, "and");
file = file.replace(/\.$/g, "");
return file;
}

//console.log(jsonfile.categories[0]);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/esempio', function(req,res){
  res.send("" +JSON.stringify(jsonArray) + "\n" + JSON.stringify(jsonfile.categories));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
