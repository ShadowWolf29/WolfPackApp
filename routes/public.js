var express = require("express");
const path = require('path'); 
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(session({
  secret:"un secreto",
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

const usersSchema = new mongoose.Schema ({
  name:String,
  last:String, 
  correo:String, 
  pass:String
});

usersSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", usersSchema); 

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res){
    res.render(path.join(__dirname, '..', 'public/views/index.ejs'),{noti:false, titulo:null, contenido:null, icono:null});
});
router.get('/team', function(req, res){
  res.render(path.join(__dirname, '..', 'public/views/Team.ejs'),{noti:false, titulo:null, contenido:null, icono:null});
});
router.get('/register', function(req, res){
  res.render(path.join(__dirname, '..', 'public/views/register.ejs'),{noti:false});
})
/*TODOE 1- Crear base con el nombre WolfPack y conectarla y que por el momento solo tenga una tabla de usuarios con los atributos que se piden en la ventana de register*/
/*TODOE 2- Reformar el mantenimiento de register para que funcione con mysql*/
router.post('/register', function(req, res){
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const correo = req.body.correo;
  const pass = req.body.pass;
  const Rpass = req.body.Rpass;

  if(Fname !== "" && Lname !== "" && correo !=="" && pass !=="" && Rpass !==""){
    User.findOne({correo:correo}, function(err, foundUser){
      if(!foundUser){
        if(pass === Rpass){
          User.register({username:req.body.correo, name:Fname, last:Lname}, pass, function(err, user){
            if(err){
              console.log(err);
              res.render(path.join(__dirname, '..', 'public/views/register.ejs'), {noti:true, titulo:'Ese correo ya esta definido', contenido:'Puede iniciar sesion o utilizar otro correo', icono:'error'});
            }else{
              res.render(path.join(__dirname, '..', 'public/views/index.ejs'),{noti:true, titulo:'Registrado', contenido:'Su usuario se registro con exito, bienvenido a Wollf Pack', icono:'success'});
              passport.authenticate("local"),function(req, res){
                console.log('termino de entrar')
              }
            }
          })
        }else{
          res.render(path.join(__dirname, '..', 'public/views/register.ejs'), {noti:true, titulo:'Error', contenido:'Las contraseñas no coiciden', icono:'error'});
        }
      }else{
        res.render(path.join(__dirname, '..', 'public/views/register.ejs'), {noti:true, titulo:'Error', contenido:'ese correo ya esta registrado', icono:'error'});
      }
    })
  }else{
    res.render(path.join(__dirname, '..', 'public/views/register.ejs'), {noti:true, titulo:'Error', contenido:'debe llenar todos los campos', icono:'error'});
  }
  
})
router.post('/Contact', (req, res)=>{
    const email = req.body.email;
    const asunto = req.body.asunto;
    const body = req.body.mensaje;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'wolfpackemail1@gmail.com',
        pass: 'wolf1234!'
      }
    });

    
    var mailOptions = {
      from: 'wolfpackemail1@gmail.com',
      to: 'wolfpackemail1@gmail.com',
      subject: asunto,
      html: '<h2> correo de envio: '+email+'</h2> <h3> mensaje:<br>'+body+'</h3>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send(error);
      } else {
            res.render(path.join(__dirname, '..', 'public/views/index.ejs'), {noti:true,titulo:'Enviado', contenido:'El correo a sido enviado con exito', icono:'success',});
      }
    
})})

/*TODOE 3- Crear un mantenimiento post para el login*/
module.exports=router;