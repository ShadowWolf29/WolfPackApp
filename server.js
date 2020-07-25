//jshint esversion:6
//Constantes nesesarias
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = ("passport-local-mongoose");

//Rutas
var publicRouter = require("./routes/public.js");
var DashboardRouter = require("./routes/dashboard.js");

//app de express
const app = express();

//metodo del login
app.use(passport.initialize());
app.use(passport.session());

//quitar esto ya que sera con sql
mongoose.connect("mongodb+srv://admin-wolf:Test123@cluster0-si2q6.mongodb.net/WolfPackApp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);

//vista con ejs
app.set('view engine', 'ejs');

//setiando las routas para ser usadas por la app
app.use('/',publicRouter);
app.use('/dashboard/',DashboardRouter);

//variables para body parser, para pasar archivos entre el server y vista Y static para obtener
//recursos desde el local css, img, js, etc. 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("dashboard"));

//Metodo para identificar el puerto
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function() {
  console.log("Server started on port 8000");
});
