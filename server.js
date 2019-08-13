//importujem module
var express=require("express"); 
var logger=require("morgan");  
var path=require("path");
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
//ne treba mi ovdje passport
var passport=require("passport");
var mongoose=require("mongoose");
//
var helmet=require("helmet");
//
var session=require("express-session");
//
var compression=require("compression");
var favicon=require("serve-favicon");
//da dozvolim koriscenje sa svih portova
var cors = require('cors');

//predstavlja citav user fajl
var userRoutes = require('./routes/user');
var adminRoutes=require('./routes/admin');

//
var flash=require("connect-flash");

var app=express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));


//da li ce mi trebati passport 
//require('./config/passport')(passport);

var config=require('./config/database');


mongoose.connect(config.database,{useNewUrlParser: true});

mongoose.connection.on('connected',function(){
  console.log('Connected to database');
});

//port 3000 da bude standardni ali moze da se pokrene i na ostalima
var port=process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');

// 
app.disable('x-powered-by');

//kada zahtjevamo home page da posalje kao odgovor HELLO WORLD
app.get('/',function(req,res){
  res.send("HELLO WORLD");
});


app.use(logger("dev"));
//
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(flash());
/*
app.use(session({ secret: 'thisisassessionsecretwhichwillbetoolongtotraceback',
saveUninitialized:true,
resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
*/




//koristi static folder-za klijent side fajlove
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
//sve sto bude iza /user ce koristiti user fajl
app.use('/user', userRoutes);

app.use('/admin',adminRoutes);


//SAMO SAM DODALA ERRO
// error handlers
/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.message);
  res.render('error', {
      message: err.message,
      error: {}
  });
});
*/

app.use((err, req, res, next) => {

  if(err.name == 'ValidationError'){
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(442).send(valErrors);
  }

});


//na kom portu slusa
app.listen(port,function(){
    console.log("Running the server");
});