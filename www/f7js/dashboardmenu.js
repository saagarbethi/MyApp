/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back button
//
function onBackKeyDown() {
    if (confirm('Are you sure,you want to exit?')) {
        navigator.app.exitApp();
    }
}

function getmenu(th, type, newbuild) {
    debugger;
    localStorage.formid = th;
    localStorage.menubuttonformid = th;
    localStorage.frmtype = type;
    localStorage.newbuild = newbuild;
    checkmultipleforms();

    // location.href = 'dashboardmenubuttons.html';

}
function checkmultipleforms() {
    var path = localStorage.ipadrs;
    var formid = localStorage.menubuttonformid;
    var locid = localStorage.locid;
    var frmtype = localStorage.frmtype;
    var path = path + "admin/dashboardmenumobileallnew.jsp?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
    //location.href = path;
    if (frmtype === "0") {
        $.get(path, function (responseJson) {
            if (responseJson.length === 1) {
                var frmtype = responseJson[0]["FRMTYPE"];
                loadsingle(frmtype);
            }
        });
    }

}
function loadmenu() {
    debugger;
//    document.getElementById("mydiv").style.display="block";
    app.preloader.show();
    var mobnewflg = "1";
    localStorage.newbuild = "0";
    localStorage.mobnewflg = "1";
    var $ptrContent = $('.ptr-content');
    $ptrContent.on('ptr:refresh', function (e) {
        loadmenu();
    });
    var path = localStorage.ipadrs + "/dashboardmenu?userid=" + localStorage.userid + "&mobnewflg=1&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid + "&locnm=" + localStorage.locnm;
    var row = "<ul>";
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            debugger;

            if (responseJson.length === 1 && responseJson[0]["TYPE"] !== '2') {
                localStorage.formid = responseJson[0]["WEBFORMID"];
                localStorage.menubuttonformid = responseJson[0]["WEBFORMID"];
                localStorage.frmtype = 1;
                localStorage.newbuild = "";
                try {
                    localStorage.newbuild = responseJson[0]["NEWBUILD"];
                } catch (err) {
                    localStorage.newbuild = "0";
                }
                if ("loadsingleform" in localStorage && ("disback" in localStorage || "repback" in localStorage || "apptback" in localStorage)) {
                    var unm = localStorage.ipusername;
                    var ipusernamelen = unm.split("@@@");
                    if (ipusernamelen.length > 2) {
                        localStorage.removeItem("loadsingleform");
                    }
                    localStorage.removeItem("disback");
                    localStorage.removeItem("repback");
                    localStorage.removeItem("apptback");
                    logout();
                } else {
                    localStorage.loadsingleform = "1"
                    getmenu(responseJson[0]["WEBFORMID"], responseJson[0]["TYPE"], localStorage.newbuild);
                }
            } else {
                for (var i = 0; i < responseJson.length; i++) {
                    var color = '';
                    if (i % 4 == 0) {
                        color = 'aqua';
                    } else if (i % 4 == 1) {
                        color = 'red';
                    }
                    else if (i % 4 == 2) {
                        color = 'green';
                    }
                    else if (i % 4 == 3) {
                        color = 'yellow';
                    }
                    try {
                        var newbuild = ""
                        var newbuild = responseJson[i]["NEWBUILD"];
                    } catch (err) {
                        var newbuild = "";
                    }
                    row = row + ' <li> ' +
                            '<a  class="item-content item-link" data-ripple="rgba(0,0,0, 0.2)" onclick=getmenu("' + responseJson[i]["WEBFORMID"] + '","' + responseJson[i]["TYPE"] + '","' + newbuild + '")> ' +
                            ' <div class="item-media"> ' +
                            ' <div class="loclft_01 ' + color + '"><i class="fa fa-list-alt Depticon" aria-hidden="true"></i></div> ' +
                            ' </div> ' +
                            ' <div class="item-inner"> ' +
                            ' <div class="item-title">' + responseJson[i]["FORMNAME"] + '</div> ' +
                            ' </div> ' +
                            ' </a> ' +
                            ' </li>';
//                    row = row + " <div class='col-md-4 col-sm-6 col-xs-12'> " +
//                            "<div class='info-box' style='cursor:pointer' onclick=getmenu('" + responseJson[i]["WEBFORMID"] + "','" + responseJson[i]["TYPE"] + "','"+newbuild+"')> " +
//                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-list-alt'>" +
//                            "</span></span>" +
//                            "<div class='info-box-content'>" +
//                            "<span class='info-box-text'></span>" +
//                            "<span class='info-box-number'><br><a  >" + responseJson[i]["FORMNAME"] + "</a></span>" +
//                            "</div>  </div> </div> ";
                }
                row = row + "</ul>"
//                 row = row + " <div class='col-md-4 col-sm-6 col-xs-12'> " +
//                            "<div class='info-box' style='cursor:pointer'> " +
//                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-list-alt'>" +
//                            "</span></span>" +
//                            "<div class='info-box-content'>" +
//                            "<span class='info-box-text'></span>" +
//                            "<span class='info-box-number'><br><a href='backspace.html'>back</a></span>" +
//                            "</div>  </div> </div> ";

                $('#divmenu').html(row);
                app.preloader.hide();
                $ptrContent.removeClass('ptr-refreshing').addClass('ptr-transitioning');

            }
        },
        error: function (error) {
            $('#mydiv').hide();
            if (error.statusText == "OK") {
                alert(error.responseText);
            } else {
                location.href = '404.html'
            }
        }
    });
}
;


function logout() {
    debugger;
    location.href = "subdepts.html?exitfrom=1";
    localStorage.ismenu = "1";
}
function loadsingle(fororrreptype) {
    debugger;
    if (fororrreptype === "0") {//for form
        loadpage($('#hdncountforms').val(), $('#hdnrights').val());
    } else {
        loadsinglereport()
    }
}
function loadsingleform() {
    debugger;
    loadpage($('#hdncountforms').val(), $('#hdnrights').val());
}



function loadsinglereport() {
    debugger;
    var frmcnt = $('#hdncount').val();
    var dispname = $('#hdndisplayname').val();
    var repid = $('#hdnreportid').val();
    var paramtype = $('#hdnparametertype').val();
    if (frmcnt === "1" || frmcnt === "0") {
        if ("repback" in localStorage || "apptback" in localStorage || "disback" in localStorage) {
            if ("loadsingleform" in localStorage) {

            } else {
                localStorage.removeItem("repback");
                localStorage.removeItem("apptback");
                localStorage.removeItem("disback");
            }

            logout();
        }
        else {
            loadreport(dispname, repid, paramtype);
        }
    } else {
        $('#mydiv').hide();
        localStorage.removeItem("repback");
        localStorage.removeItem("disback");
        localStorage.removeItem("apptback");
    }
}