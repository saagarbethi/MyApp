/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    debugger
    try {
        // try{
//                StatusBar.backgroundColorByHexString("#c93437");
//                }catch(err){
//                    alert('err')
//                }   
    if(!CheckConnection()){
        $( '.rightdiv' ).fadeTo( "slow", 0.33 );
        $('.login').attr('disabled','disabled');
        $('.register').attr('disabled','disabled');
            $('.alert-warning').show();
            return;
    }else{
            $('.alert-warning').hide();
        try{
//            localStorage.mahappurl = "http://192.168.0.55:9999/fh/";
//             localStorage.mah = '1';
//             localStorage.appname = "fernandez";
//             localStorage.appurl = "http://192.168.0.55:9999/fh/";
//		getIntro(localStorage.appurl);
//               convert(localStorage.appurl);
            } catch (err) {
                alert(err)
//             localStorage.mahappurl = "http://192.168.0.140:8888/fh/";
//             localStorage.mah = '1';
//             localStorage.appname = "fernandez";
//             localStorage.appurl = "http://192.168.0.140:8888/fh/";
            }
        }
        $('.login').on("click", function () {
            debugger;
            var logintype = $('.top1').text();
            if (logintype === "Mobile No") {
                mrno = $("input[name=mobile]").val();
                password = $("input[name=mobilepwd]").val();
            } else if (logintype === "Email") {
                mrno = $("input[name=email]").val();
                password = $("input[name=emailpwd]").val();
            } else {
                mrno = $("input[name=mrno]").val();
                password = $("input[name=mrnopwd]").val();
            }
            loginmahfh(localStorage.mahappurl, mrno, password, "", "0", logintype);
        });
        $('.register').click(function () {
            register()


        });
    } catch (err) {
        // alert(err);
    }
});

function CheckConnection()
{

    try {
        if (!navigator.network)
        {
            // set the parent windows navigator network object to the child window
            navigator.network = window.top.navigator.network;
        }

        // return the type of connection found
        return ((navigator.network.connection.type === "none" || navigator.network.connection.type === null ||
                navigator.network.connection.type === "unknown") ? false : true);
    } catch (err) {
        return true;
    }
}
function getConnection() {
    try {
        if (!CheckConnection()) {
            showAlert1();
            return;
        } else {
            hello.greet("fh", successmah, failuremah);
        }

    } catch (err) {
        localStorage.mahappurl = "http://localhost:8888/fh/";
        localStorage.mah = '1';
        localStorage.appname = "fernandez";
    }

}
function getConnectionreg() {
    try {
        if (!CheckConnection()) {
            showAlert1();
            return;
        } else {
            hello.greet("fh", successmah, failuremah);
        }

    } catch (err) {
        localStorage.mahappurl = "http://localhost:8888/fh/";
        localStorage.mah = '1';
        localStorage.appname = "fernandez";
//        alert(err);
    }

}
var successmahreg = function (message) {
    localStorage.mahappurl = message;
    localStorage.mah = '1';
    localStorage.appname = "fernandez";
    localStorage.appurl = message;
    register();

}

var failuremahreg = function () {
    alert("Error calling Hello Plugin");
}
var successmah = function (message) {
    
    convert(message);
}
function convert(path) {

    debugger;

    $.ajax({
        url: path,
        type: "GET",
        success: function (data, textstatus, xhrreq) {
            debugger;
            data = data.trim();
            var url = data;
            if (data.indexOf("frame src") > 0) {
                debugger;
                data = data.substring(data.indexOf("frame src")).replace('frame src="', "");
                var dqts = data.indexOf('"');
                url = data.substring(0, dqts).trim();
                localStorage.mahappurl = url;
                localStorage.mah = '1';
                localStorage.appname = "fernandez";
                localStorage.appurl = url;
                localStorage.ipadrs = url;
                getIntro(url);
            }

        },
        error: function (error) {
            if (error.statusText == "OK") {
                alert(error.responseText);
            }
            else {
 try{  
		   
   window.plugins.spinnerDialog.hide();
                 
		       }catch(err){
                         }
                localStorage.entrance = '';
                location.href = '404.html';

            }
        }

    });
}
var failuremah = function () {
    alert("Error calling Hello Plugin");
}
function mah() {
    try {
        getConnection();

    } catch (err) {
        alert(err)
    }

}
function mahreg() {
    try {
        getConnectionreg();

    } catch (err) {
        alert(err)
    }

}
function playBeep() {
    navigator.notification.beep(1);
}
function showAlert1() {
    try {
        playBeep();
        navigator.notification.alert(
                'You are not connected to network.\nPlease connect and try again', // message
                '', // title
                'No Network'                  // buttonName
                );

    } catch (err) {
        alert(err);
    }
}
function register()
{
    try {
        window.plugins.spinnerDialog.show("Loading..", "Please Wait..", false);
    } catch (err) {

    }
    localStorage.rights = 'All';
    var path = localStorage.mahappurl + "/formviewlogin?mobile=register";
    debugger;
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            if (responseJson.length > 0) {
                debugger;
                hideProgress();
                localStorage.ipadrs = localStorage.mahappurl;
                localStorage.formid = 'fh';
                localStorage.userid = 'U0000000';
                localStorage.usernm = 'SHIVAM';
                getIp();
                localStorage.reg = "1";
                localStorage.currentformid = responseJson[0]["REGISTERPAGE"];
                localStorage.locid = 'Loc00001'
                location.href = 'form.html';

            } else {
                hideProgress();
            }
        },
        error: function (error) {
            if (error.statusText == "OK") {

                alert(error.responseText);
            }
            else {
                localStorage.entrance = '';
                location.href = '404.html';

            }
            hideProgress();
        }

    });

}
function hideProgress() {
    try {
        window.plugins.spinnerDialog.hide();
    } catch (err) {

    }
}
function getIp() {
    try {
        networkinterface.getIPAddress(function (ip) {
            localStorage.terminal = device.model + "REG";
        });
    } catch (err) {
        localStorage.terminal = 'FMHAPP'
    }
}
function getIntro(url) {
    $.ajax({
        url: url + '/formviewlogin?type=appintro',
        type: "GET",
        dataType: 'json',
        success: function (responseJson) {
            if (responseJson.length === 0) {
                $('#btnGenPwd').removeAttr("disabled");
                $('#btnMob').removeAttr("disabled");
                $('#btnwait').hide();
                filename = url + "/mobilejs/fmh1.js";
                filename1 = url + "/mobilejs/PatientLoginSecondScreensql.js";
                $('<script  type="text/javascript" src="' + filename + '" >').appendTo("head");
                $('<script  type="text/javascript" src="' + filename1 + '" >').appendTo("head");
                var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
                db.transaction(queryDBi, errorCBi);
            } else {
		localStorage.AppIntrowebid=responseJson[0]['WEBFORMID'];
                location.href = 'AppIntro.html?formid=' + responseJson[0]['WEBFORMID'];
            }
        },
        error: function (error) {

        }
    });
}


