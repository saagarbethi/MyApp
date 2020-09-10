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
    
    
    var loginuser = localStorage.appurl;
    var path = loginuser + "/admin/manageAttachments.jsp?medid=" + localStorage.mgkeyid + "&mobile=sendsms&time="+localStorage.mtime+"&imgdate="+localStorage.mdate+"&mmedid="+localStorage.mmedid;
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
