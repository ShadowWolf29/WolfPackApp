var express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.use(passport.initialize());
router.use(passport.session()); 

router.get('/', function(req, res){
    res.render(path.join(__dirname, '..', 'dashboard/views/index.ejs'),{noti:false, titulo:null});
});
router.post('/login', function(req, res){
    res.render(path.join(__dirname, '..', 'dashboard/views/statics.ejs'),{noti:false, subtitulo:"Estadisticas"});
});
module.exports=router;