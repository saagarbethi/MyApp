/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    debugger
    try {
        if (!CheckConnection()) {
            $('.rightdiv').fadeTo("slow", 0.33);
            $('.login').attr('disabled', 'disabled');
            $('.register').attr('disabled', 'disabled');
            $('.alert-warning').show();
            return;
        } else {
            $('.alert-warning').hide();
            try {
              convert("http://johal.myemrhub.com/");
            } catch (err) {
                
            }
        }
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
function convert(path) {

    debugger;
    $('#btnGenPwd').attr("disabled","disabled");
    $('#btnMob').attr("disabled","disabled");
    $('#btnwait').show();
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
                url = url.substr(0,url.lastIndexOf("/")+1);
                localStorage.mahappurl = url;
                localStorage.mah = '1';
                localStorage.appname = "johal";
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

                localStorage.entrance = '';
                location.href = '404.html';

            }
        }

    });
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
        localStorage.terminal = 'PATELAPP'
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
                filename1 = url + "/mobilejs/PatientLoginSecondScreensql.js";
                $('<script  type="text/javascript" src="' + filename1 + '" >').appendTo("head");
                var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
                db.transaction(queryDBi, errorCBi);
            } else {
                location.href = 'AppIntro.html?formid=' + responseJson[0]['WEBFORMID'];
            }
        },
        error: function (error) {

        }
    });
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


