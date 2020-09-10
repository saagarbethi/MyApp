/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function loaddashboardmenu() {
    debugger;

    var path = localStorage.ipadrs;
    var formid = localStorage.menubuttonformid;
    var locid = localStorage.locid;
    var frmtype = localStorage.frmtype;
    var mobnewflg = localStorage.mobnewflg;
    //dashBoardReportMenuMobile
    if (frmtype === "1") {
        path = path + "/formview?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
        $.get(path, function (responseText) {
            $('#divMenubuttons').html(responseText);
            loadsingleform();
        })
    }
    else if (frmtype === "2") {
        localStorage.reg = "2";
        // $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=depts&locid="+locid+"&webformid="+webformid+"&userid="+userid, function (responsejson) {
        $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=checkreplace&webformid=" + formid + "&userid=" + localStorage.userid, function (responsejson) {
            if (responsejson.length > 0) {
                var res = responsejson.trim();
                if (res == "0" || res == "" || res == "null") {
                    $('#mydiv').hide();
                    location.href = 'DoctorApproval.html';

                } else {

                    localStorage.menubuttonformid = res;
                    //location.href = 'consultantapproval.html';
                    $('#mydiv').hide();
                    location.href = 'ApproveResultFilter.html';
                }

            } else {
                $('#mydiv').hide();
                location.href = 'DoctorApproval.html';
            }
        });

    }
    else if (frmtype === "18") {
        localStorage.reg = "5";
        //location.href = 'consultantapproval.html';
        $('#mydiv').hide();
        location.href = 'ApproveResultFilter.html';
    }
    else {
        if (localStorage.newbuild === "1") {
            if (localStorage.usernm.trim().toUpperCase() === "SHIVAM") {

                path = path + "admin/dashBoardReportMenuMobile.jsp?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
                $.get(path, function (responseText) {
                    try {
                        $('#divMenubuttons').html(responseText);
                    } catch (err) {
                        $('#mydiv').hide();
                    }
                    loadsinglereport();
                })


            } else {

                path = path + "admin/dashboardmenumobileall.jsp?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
                $.get(path, function (responseText) {
                    try {
                        $('#divMenubuttons').html(responseText);
                    } catch (err) {
                        $('#mydiv').hide();
                    }
                    loadsingle()

                })

            }
        } else {

            path = path + "admin/dashBoardReportMenuMobile.jsp?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
            $.get(path, function (responseText) {
                try {
                    $('#divMenubuttons').html(responseText);
                } catch (err) {
                    $('#mydiv').hide();
                }
                $("#Date1").datepicker({
                    dateFormat: 'dd/mm/yy'
                });
                loadsinglereport();
            })

        }
    }
//    getDoctorloc();
}
function loadsingle() {
    debugger;
    var fororrreptype = $('#hdnreporformtype').val();
    if (fororrreptype === "0") {//for form
        loadsingleform()
    } else {
        loadsinglereport()
    }
}
function loadsingleform() {
    debugger;
    var frmcnt = $('#hdncount').val();

//    if (localStorage.getItem("disback") === null) {

    if (frmcnt === "1") {
        if ("disback" in localStorage) {
            if ("loadsingleform" in localStorage) {

            } else {
                localStorage.removeItem("disback");
            }
            logout();
        }
        else if ("apptback" in localStorage) {
            if ("loadsingleform" in localStorage) {

            } else {
                localStorage.removeItem("apptback");
            }

            logout();
        } else {
            loadpage($('#hdncountforms').val(), $('#hdnrights').val());
        }
    } else {
        $('#mydiv').hide();
        localStorage.removeItem("disback");
        localStorage.removeItem("apptback");
    }
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
function loadpage(pageid, rights, label) {
    debugger;
    pageid = pageid.split("?");
    var dis = pageid[0].indexOf('DIS');
    localStorage.currentformid = getParameterName(pageid[1], 'webformid');
    var frmtype = "";
    try {
        frmtype = getParameterName(pageid[1], 'frmtype');
    }
    catch (ee) {

    }
    var formid = pageid;
//    alert(pageid[1]);
    var path1 = localStorage.ipadrs + "/CheckFormMobile?" + pageid[1];
//    alert(path1);

//    $.ajax({
//        
//        url:path1,
//        type:"GET",
//        dataType: 'text/html',
//        success : function (responseJson) {
//            alert(responseJson);
//            if(responseJson==="1"){
//                location.href='form.html';
//            }
//        },
//        error:function (responseJson) {
//            alert(responseJson);
//        }
//        
//    });



    if (dis === -1) {
        if (rights === undefined || rights === "") {
            $.get(path1, function (res) {
                try {
                    var data = res.split("$");
                    res = data[0];
                    localStorage.rights = data[1];
                } catch (err) {

                }

                if (res != "" && res != null) {
                    if (res === "1") {
                        //localStorage.formid = getParameterName(pageid[1], 'webformid');
                        localStorage.backformid = "dashboard";
                        $('#mydiv').hide();
                        location.href = 'form.html';
                    } else if (res === "-1") {
                        $('#mydiv').hide();
                        location.href = 'Feedback.html';
                    }
                    else if (res === "2") {
                        localStorage.backformid = "dashboard";
                        $('#mydiv').hide();
                        location.href = 'Drilldashboard.html';
                    }
                    else if (res === "3") {
                        $('#mydiv').hide();
                        location.href = "chartframework.html";
                    }
                    else if (res === "4") {
                        $('#mydiv').hide();
                        localStorage.patmenuformid = localStorage.currentformid;
                        location.href = "DoctorApp.html?dashboard=1";
                    } else if (res == "5") {
                        $('#mydiv').hide();
                        var userid = localStorage.userid;
                        location.href = "treeframework.html";
                    }
                    else {
                        $('#mydiv').hide();
                        location.href = 'grids.html';
                    }
                }
                else {
                    $('#mydiv').hide();
                    location.href = 'grids.html';
                }
            });
        }
        else {
            localStorage.rights = rights;
            var resval = "";
            if (frmtype === "3") {
                resval = "1";
            }
            else if (frmtype === "14") {
                resval = "2";
            }
            else if (frmtype === "15") {
                resval = "3";
            }
            else if (frmtype === "9") {
                resval = "4";
            }
            else if (frmtype === "-1") {
                resval = "-1";
            }
            else if (frmtype === "16") {
                resval = "5";
            } else if (frmtype === "6") {
                resval = "6";
            }

            if (resval === "1") {
                //localStorage.formid = getParameterName(pageid[1], 'webformid');
                localStorage.backformid = "dashboard";
                $('#mydiv').hide();
                location.href = 'form.html';
            } else if (resval === "-1") {
                $('#mydiv').hide();
                location.href = 'Feedback.html';
            }
            else if (resval === "2") {
                $('#mydiv').hide();
                localStorage.backformid = "dashboard";
                location.href = 'Drilldashboard.html';
            }
            else if (resval === "3") {
                $('#mydiv').hide();
                location.href = "chartframework.html";
            }
            else if (resval === "4") {
                $('#mydiv').hide();
                localStorage.patmenuformid = localStorage.currentformid;
                location.href = "DoctorApp.html?dashboard=1";
            } else if (resval == "5") {
                $('#mydiv').hide();
                var userid = localStorage.userid;
                location.href = "treeframework.html";
            }
            else if (resval === "6") {
                $('#mydiv').hide();
                loadmultipleforms(label);
            }
            else {
                $.get(path1, function (res) {
                    try {
                        var data = res.split("$");
                        res = data[0];
                        localStorage.rights = data[1];
                    } catch (err) {

                    }

                    if (res != "" && res != null) {
                        if (res === "1") {
                            //localStorage.formid = getParameterName(pageid[1], 'webformid');
                            localStorage.backformid = "dashboard";
                            $('#mydiv').hide();
                            location.href = 'form.html';
                        } else if (res === "-1") {
                            $('#mydiv').hide();
                            location.href = 'Feedback.html';
                        }
                        else if (res === "2") {
                            $('#mydiv').hide();
                            localStorage.backformid = "dashboard";
                            location.href = 'Drilldashboard.html';
                        }
                        else if (res === "3") {
                            $('#mydiv').hide();
                            location.href = "chartframework.html";
                        }
                        else if (res === "4") {
                            $('#mydiv').hide();
                            localStorage.patmenuformid = localStorage.currentformid;
                            location.href = "DoctorApp.html?dashboard=1";
                        } else if (res == "5") {
                            $('#mydiv').hide();
                            var userid = localStorage.userid;
                            location.href = "treeframework.html";
                        }
                        else {
                            $('#mydiv').hide();
                            location.href = 'grids.html';
                        }
                    }
                    else {
                        $('#mydiv').hide();
                        location.href = 'grids.html';
                    }
                });
            }

        }

    } else {

        var userid = localStorage.userid;
        var path = localStorage.ipadrs + "/disfirstscreen?userid=" + userid + "&" + pageid[1] + "&locid=" + localStorage.locid;
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {
                if (responseJson.length > 0) {
                    localStorage.defdoctor = "1";
                    localStorage.docid = responseJson[0]['DOCID'];
                    localStorage.docnm = responseJson[0]['DOCNM'];
                    localStorage.speid = responseJson[0]['SPEID'];
                    localStorage.menuform = localStorage.formid;
                    $('#mydiv').hide();
                    location.href = 'disfirstscreen.html';
                } else {
                    localStorage.defdoctor = "0";
                    $('#mydiv').hide();
                    location.href = 'selectdoctor.html';
//                    $('#myModal').modal('show');
//                    alert('Please assign Doctor to user!');
                    return;
                }
            },
            error: function (error) {
                $('#mydiv').hide();
                if (error.statusText === "OK") {
                    alert(error.responseText);
                } else {
                    location.href = '404.html'
                }
            }
        });
        $.get(path + "/disfirstscreen?userid=" + currentformid + "&frompage=" + formid + "&mobile=yes&locid=" + locid, function (responsetext) {
            $('#divDis').html(responsetext);
            $('#mydiv').hide();
        });
    }
}

function goback() {
    debugger;
    var flg = localStorage.nodoc;
    if (flg == "1") {
        localStorage.docid = "";
        localStorage.docnm = "";
        localStorage.speid = "";
    }
    localStorage.formid = localStorage.menuform;
    $('#mydiv').hide();
    location.href = "dashboardmenubuttons.html";
}

function getParameterName(name, path) {
    name = name.split("&");
    for (var i = 0; i < name.length; i++) {
        value = name[i].split("=");
        if (value[0] == path) {
            return value[1];
        } else {
//	    return "";
        }

    }
    return "";
}
function logout() {
    debugger;
    location.href = "dashboardmenu.html";
}
function loadreport(reportnm, reportid, paramtype) {
    localStorage.reportid = reportid;
    localStorage.paramtype = paramtype;
    localStorage.reportnm = reportnm;
    $('#mydiv').hide();
    location.href = 'webreports.html';
}
function loadmultipleforms(label) {

    try {
        $('.header1').html(label);
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.currentformid;
        var locid = localStorage.locid;
        $.get(path + "/CheckFormMobile?type=1&webformid=" + currentformid + "&frompage=" + formid + "&&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm, function (responseText) {
            $('#mydiv').hide();
            $('.pad').hide();
            $('.active').remove();
            var div = "<div class='col-sm-12 pad " + currentformid + " active divs'>" + responseText + "</div>";
            $('.backcolr').append(div);
            console.log(responseText);
        });
    } catch (err) {
        $('#mydiv').hide();
        alert(err);
    }
}
