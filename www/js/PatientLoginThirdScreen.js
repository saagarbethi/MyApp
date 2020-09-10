/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    debugger;
    var loginuser = localStorage.appurl;
    var mrno = localStorage.patmrno;
    var webformid = "";
    var path = loginuser + "/admin/PatientLoginThirdScreen.jsp?mrno=" + mrno + "&webformid=" + webformid;
    $.ajax({
        url: path,
        type: "GET",
        success: function (responseText) {
            $('#divscreen').html(responseText);
            localStorage.patheadname=$("#id_patname").val();
            localStorage.patheadimg=$("#id_patimage").val();
        },
        error: function (error) {

            if (error.statusText == "OK") {
                alert(error.responseText);
            }
            else {
                localStorage.entrance = '';
                location.href = '404.html';

            }

        }
    });

});
function loadforms(name, webformid, webviewid, type1, orderno, menuformid,mtype)
{
    debugger;
//         $("#mydiv").show();
    localStorage.lowebformid = webformid;
    localStorage.webviewid = webviewid;
    localStorage.formname = name;
    localStorage.formtype = type1;
    localStorage.patmenuformid = menuformid;
    localStorage.formorderno = orderno;
    
       if(mtype==="MYPROFILE"){
       location.href = 'myprofile.html';
        }else{
    location.href = 'DisplayForms.html';
      }
      }

function loginpage() {
    debugger;
    localStorage.entrance = '';
    msg = 'Are you sure you want to logout?'
    if (confirm(msg)) {
        
        var storedNames = JSON.parse(localStorage.getItem("emrnames"));
        var storedUrls = JSON.parse(localStorage.getItem("emrurls"));
        var storedUhids = JSON.parse(localStorage.getItem("emruhids"));
        var storedPwds = JSON.parse(localStorage.getItem("emrpasswords"));
        if(storedUhids != null){
        for (var i = 0; i < storedUhids.length; i++) {
            if (localStorage.patmrno === storedUhids[i]) {
                storedUhids.splice(i, 1);
                storedNames.splice(i, 1);
                storedUrls.splice(i, 1);
                storedPwds.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("emrnames", JSON.stringify(storedNames));
        localStorage.setItem("emrurls", JSON.stringify(storedUrls));
        localStorage.setItem("emruhids", JSON.stringify(storedUhids));
        localStorage.setItem("emrpasswords", JSON.stringify(storedPwds));
        
        
         storedNames = JSON.parse(localStorage.getItem("emrnames"));
         if(storedUhids.length===1){
             localStorage.appurl = storedUrls[0];
             localStorage.patmrno = storedUhids[0];
         }
     }
      localStorage.adduser = '1';
        if (localStorage.appname === 'emr') {
            location.href = 'emr.html';
        } else if (localStorage.appname === 'fernandez') {
            location.href = 'fh_index.html';
        } else if (localStorage.appname === 'mah') {
            location.href = 'mah_index.html';
        }else if(localStorage.appname==='ankura'){
            location.href = 'ankura_index.html';
        }else if(localStorage.appname==='patel'){
            location.href = 'patel_index.html';
        }else if(localStorage.appname==='bvc'){
            location.href = 'belve_index.html';
        }
        else {
            location.href = 'index.html?show=1';;
        }
    }

//    if (localStorage.getItem("mah") === null) {
//        if (localStorage.appname == 'myemr') {
//            location.href = 'emr.html';
//        } else {
//            location.href = 'index.html';
//        }
//    } else {
//        localStorage.removeItem("mah");
//        localStorage.removeItem("mahappurl");
//        localStorage.removeItem("patmrno")
//        location.href = 'mah_index.html'
//    }

}
function adduser() {
    debugger;
    if (localStorage.appname == 'myemr') {
        localStorage.adduser = '1';
        location.href = 'emr.html';
    } else if (localStorage.appname == "mah") {
        localStorage.adduser = '1';
        location.href = 'mah_index.html';
    } else if (localStorage.appname == "fernandez") {
        localStorage.adduser = '1';
        location.href = 'fh_index.html';
    }else if (localStorage.appname == "patel") {
        localStorage.adduser = '1';
        location.href = 'patel_index.html';
    }else if (localStorage.appname == "ankura") {
        localStorage.adduser = '1';
        location.href = 'ankura_index.html';
    }else if(localStorage.appname==='bvc'){
        localStorage.adduser = '1';
            location.href = 'belve_index.html';
        }
}
function files() {
    location.href = 'myFiles.html';
}


