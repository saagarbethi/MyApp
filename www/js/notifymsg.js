/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    debugger;
 var  notifymsg=getParameterByName("notifymsg");
 var  imagepath=getParameterByName("imagepath");
 $('#divmessages').html("<b>"+notifymsg+"</b>");
 var path="<b>"+notifymsg+"</b><br><br><input type='image' id='imgsrc' src='"+imagepath+"' style='vertical-align: middle; width:100px; height:100px;border:none;'>"
// alert("notifymsg"+notifymsg);
//$('#divmessages').html("<b>"+notifymsg+"</b><input type="image" id="imgsrc" src="+imagepath+" style="vertical-align: middle; width:40px; height:30px;border:none;display:none">");
$('#divmessages').html(path);
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function settings() {
    location.href = 'settings.html';
}

function gohome(){
      location.href = 'Notificationdashboardmenubtns.html'
}