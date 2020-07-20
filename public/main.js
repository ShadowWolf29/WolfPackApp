var height = screen.height;
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();//inicializar todo el js
    var elems = document.querySelector('.slider');
    var instances = M.Slider.init(elems,{
      height: height - (height *0.2)
    });
    var flechaderecha = document.querySelector('.indicador-right');
    var flechaizquierda = document.querySelector('.indicador-left');
  
    flechaderecha.addEventListener("click", function(){
      instances.next();
    })
    flechaizquierda.addEventListener("click", function(){
      instances.prev();
    })
    
  });
  var team_show = document.querySelector(".dropequipos");
  var team_trigger = document.querySelector(".dropequipos_trigger");

 
  

