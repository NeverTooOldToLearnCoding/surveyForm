var session = require('express-session');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


app.use(bodyParser.urlencoded({extended: true}));

// invoke express and store the result in the variable app

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get("/", function (request, response){

    response.render('index');
})

app.get("/result", function (request, response){

    response.render('result',{result:request.session});
})

app.post("/process", function (request, response){

    // console.log(request.body);

    console.log("POST DATA \n\n", request.body)
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comment = request.body.comment;

    response.redirect('/result');
})






// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  // console.log("listening on port 8000");
})