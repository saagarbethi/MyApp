/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    loadFiles();
});
function loadFiles() {
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    $("#mydiv").show();
    var mrno = localStorage.patmrno;
    var loginuser = localStorage.appurl;
    var webformid=localStorage.appwebformid;
    var appName = localStorage.appname;
    var path = loginuser + "/admin/patientAttachments.jsp?mrno=" + mrno+"&webformid="+webformid+"&appName="+appName+"&mobile=sendsms";
    $.ajax({
        url: path,
        type: "GET",
        success: function (responseText) {
            $("#mydiv").hide();
            $('#divAttachments').html(responseText.trim());
        },
        error: function (error) {
            $("#mydiv").hide();
            alert(error.responseText);

        }
    });
}
function closebutton()
{
    location.href = 'PatientLoginThirdScreen.html';
}
