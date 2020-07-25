var express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

var router_admin = express.Router();

router_admin.use(bodyParser.urlencoded({extended: true}));

router_admin.use(passport.initialize());
router_admin.use(passport.session()); 

router_admin.get('/', function(req, res){
    res.render(path.join(__dirname, '..', 'dashboard/views/index.ejs'),{noti:false, titulo:null});
});
//TODOR 1- Dividir los mantenimientos que trenda el programa 
//TODOR 2- Agregar el sidenav 
//TODOR 3- Buscar una manera de reutulizar ejs y solo cambiar el contenido que se muestre en el body 
router_admin.get('/login_admin', function(req, res){
    res.render(path.join(__dirname, '..', 'dashboard/views/statics.ejs'),{noti:false, subtitulo:"Estadisticas"});
});
module.exports=router_admin;