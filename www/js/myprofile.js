/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
      debugger;
    loadFiles();
});
function loadFiles() {
      debugger;
    var  webformid=  localStorage.lowebformid  ;
    var webviewid=  localStorage.webviewid   ;
    var name= localStorage.formname   ;
    var type1=localStorage.formtype;
    var menuformid= localStorage.patmenuformid;
    var orderno=localStorage.formorderno ;
    try{ var htldo = window.innerHeight;
        var asgnmrgn=htldo/2;
        $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
    }catch(err){}
    $("#mydiv").show();
    var mrno = localStorage.patmrno;
    var webformid = localStorage.lowebformid;
    var webviewid = localStorage.webviewid;
    var formname = localStorage.formname;
    var appName = localStorage.appname;
    var formtype = localStorage.formtype;
    var menuformid = localStorage.patmenuformid;
    var formorderno = localStorage.formorderno;
     var path = localStorage.appurl + "/admin/patientprofile.jsp?orderno=" + formorderno + "&webviewid=" + webviewid + "&mrno=" + mrno + "&webformid=" + webformid + "&formname=" + formname + "&formtype=" + formtype + "&menuformid=" + menuformid + "&appName=" +appName;
    if (menuformid == "" ||menuformid == '-Select-') {
        $.get(path, function (responseText) {
            debugger;
 
            var res =responseText;
             $('#displayforms').html(res);
             
             
             document.getElementById("formname").innerHTML = localStorage.formname;
             try {
                var donotShowCapture = document.getElementById("hdndonotShowCapture").value;

                if (donotShowCapture === 1) {
                    $('#btnCapture').hide();
                }
            } catch (e) {
            }
            $("#mydiv").hide();
//            var h = window.innerHeight;
//            alert(h);
//           var data = $('.herad').css("height");
//           var data1 = $('.imgrow').css("height");
//           var ht=parseInt(data)+parseInt(data1);
//           var ht1=parseInt(h)-parseInt(ht);
//            $('.rowsend').css("height",parseInt(ht1)+-52+"px");
//            var proimgdiv =  $(".proimgdiv").css("height");
//            $('.rowsend').css("margin-top",parseInt(proimgdiv)+2+"px");
        });
                    } 
    
    }
 function   Editimage(){
     debugger;
      var showphoto=document.getElementById("showphoto").value;
      var editphoto=document.getElementById("editphoto").value;
     if(editphoto=="1") {
     
     document.getElementById('myModal').style.display='block'
     }else{
         document.getElementById('myModal').style.display='none'
     }
     
 }
  function   rightclick(){
    debugger;
         document.getElementById('myModal').style.display='none'
     
     
 }
    
    

function closebutton()
{debugger;
    location.href = 'PatientLoginThirdScreen.html';
}
  