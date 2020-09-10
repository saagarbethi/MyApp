/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// jQuery(function($) {
//
//  // MAD-RIPPLE // (jQ+CSS)
//  $(document).on("click", "[data-ripple]", function(e) {
//
//    var $self = $(this);
//    if($self.is(".btn-disabled")) {
//      return;
//    }
//    if($self.closest("[data-ripple]")) {
//      e.stopPropagation();
//    }
//
//    var initPos = $self.css("position"),
//        offs = $self.offset(),
//        x = e.pageX - offs.left,
//        y = e.pageY - offs.top,
//        dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
//        $ripple = $('<div/>', {class : "ripple",appendTo : $self });
//
//    if(!initPos || initPos==="static") {
//      $self.css({position:"relative"});
//    }
//
//    $('<div/>', {
//      class : "rippleWave",
//      css : {
//        background: $self.data("ripple"),
//        width: dia,
//        height: dia,
//        left: x - (dia/2),
//        top: y - (dia/2),
//      },
//      appendTo : $ripple,
//      one : {
//        animationend : function(){
//          $ripple.remove();
//        }
//      }
//    });
//  });
//
//});

 $(document).on('focus fltlblactiov', '.inputbx',function(){
        $('.flotlbl[for='+$(this).attr('name')+']').addClass('fltlblactiov');
//        $('.lblnms[for='+$(this).attr('name')+']').css('position','relative');

    });
    $(document).on('blur', '.inputbx',function(){
        if($(this).val()===""){
        $('.flotlbl[for='+$(this).attr('name')+']').removeClass('fltlblactiov');
//         $('.lblnms[for='+$(this).attr('name')+']').css('position','absolute');
     }
    });