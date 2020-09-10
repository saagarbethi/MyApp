/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var pdffiles = "";
try {
    var platform = device.platform;
} catch (err) {
    platform = "";
}
$(document).ready(function () {
    createSessions();
    window.addEventListener("orientationchange", orientationChange, true);
});
function orientationChange(e) {

    var currentOrientation = "";

    if (window.orientation == 0) {
        currentOrientation = "portrait";
    } else if (window.orientation == 90) {
        currentOrientation = "landscape";
    } else if (window.orientation == -90) {
        currentOrientation = "landscape";
    } else if (window.orientation == 180) {
        currentOrientation = "portrait";
    }
    try {
        if (currentOrientation === "landscape") {
            try {
                if (platform.toString().toLowerCase() === "ios") {
                    oab.resize(0, 50, parseInt(height), width - 100);
                } else {
                    alert("resize")
                    oab.resize(0, 50, 360, 567);
                }

            } catch (err) {
                //alert(err)
            }
            try {
                oab1.resize(0, 135, parseInt(height), width - 180);
            } catch (err) {
                //alert(err)
            }
        }
        else {
            try {
                if (platform.toString().toLowerCase() === "ios") {
                    oab.resize(0, 50, width, parseInt(height) - 100);
                } else {
                    oab.resize(0, 50, width, parseInt(height) - 100);
                }

            } catch (err) {

            }
            try {
                oab1.resize(0, 135, width, parseInt(height) - 180);
            } catch (err) {

            }

        }
    } catch (err) {

    }
}
function createSessions() {
    debugger;
    var docid = localStorage.docid;
    var docnm = localStorage.docnm;
    var speid = localStorage.speid;
    var date = localStorage.fromdt;
    var webformid = localStorage.currentformid;
    var locid = localStorage.locid;
    var mrno = localStorage.mrno;
    var userid = localStorage.userid;
    $('#mydiv').show();
    var path = localStorage.ipadrs + "/admin/TemplateDisSecondMobile.jsp?docid=" + docid + "&date2=" + date + "&docname=" + docnm;
    path = path + "&webformid=" + webformid + "&locid=" + locid + "&prewebformid=" + localStorage.formid + "&lable=" + localStorage.label;
    path = path + "&visitid=&theme=&speid=" + speid + "&patnm=" + localStorage.patname + "&patage=" + localStorage.age;
    path = path + "&patsex=" + localStorage.sex + "&docnm=" + localStorage.docnm + "&mrno=" + mrno + '&userid=' + userid;
    //admin/TemplateDisSecond.jsp?docid=" + docid + "&date2=" + date + "&docname=" + docnm + "&webformid=" + webformid + "&locid=" + locid + "&prewebformid=" + prewebformid+"&lable="+lable+"&visitid="+id+"&theme="+theme+"&speid="+speid
    $.get(path, function (responseText) {
        try {
            debugger;
            $('#divDis').html(responseText);
            $('#mydiv').hide();
            loadalldetails("def");
        } catch (err) {
            $('#mydiv').hide();
            alert(err);
        }
    });

}
function logout() {
    debugger;
    try {
        oab.close();
    } catch (err) {
        // alert(err);
    }
    try {
        oab1.close();
    } catch (err) {
        // alert(err);
    }
    if (localStorage.patapp == "1") {
        location.href = 'PatientLoginThirdScreen.html';
        localStorage.patapp = 0;
    }
    else if ("orders" in localStorage) {
        if (localStorage.orders == "1") {
            localStorage.currentformid = localStorage.orderformid;
            localStorage.orders = "0";
            location.href = 'disfirstscreen.html';
        }
        else {
            localStorage.currentformid = localStorage.formid;
            location.href = 'disfirstscreen.html';
        }
    }
    else {
        localStorage.currentformid = localStorage.formid;
        location.href = 'disfirstscreen.html';
    }

}
function loadalldetails(load) {
    $('#mydiv').show();
    debugger;
    var formid = localStorage.currentformid;
    var docid = localStorage.docid;
    var locid = localStorage.locid;
    var mrno = localStorage.mrno;
    var dt = localStorage.fromdt
    var path = localStorage.ipadrs + '/formViewDIS?type=fill&formid=' + formid + '&docid=' + docid + '&locid=' + locid + "&dt=" + dt + '&load=' + load + "&mrno=" + mrno;
    $.get(path, function (responseText) {
        try {
            debugger;
            var data = responseText.trim().split("$$");
            for (var i = 0; i < data.length - 1; ) {
                var table = data[i];
                $('#gview_' + data[i]).html(data[++i]);
                i = i + 1;
                var noofrows = document.getElementById('tbl_' + table).rows.length;
                if (noofrows === 1) {
                    try {
                        document.getElementById('div' + table).style.display = 'none';
                    } catch (err) {

                    }
                }
            }
            fillAttachments();
            $('#divSecondDtls').html($('#divdata').html());
            loadGplStyles();
            var seell = $('#hdndefseeall').val();
//            $('#divdata').hide();
//            $('#divpdf').show();


            if (seell === 1) {

//                $('#divdata').hide();
                $('#divpdf').show();
            } else {
                $('#divdata').addClass('showdivdata');
                $('#divpdf').hide();
            }
            fillallpdfs();
            //$('#mydiv').hide();
            toggleSeeall(seell);

        } catch (err) {
            $('#mydiv').hide();
            //            alert(err);
        }
    });
}
function fillAttachments() {

    var mrno = localStorage.mrno;
    var path = localStorage.ipadrs + '/formViewDIS?type=attachments&mrno=' + mrno;
    debugger;
    $.get(path, function (responseText) {
        $('.divattachments').html(responseText);
    });
}
function loadGplStyles() {
    debugger;
    var formid = localStorage.currentformid;
    var docid = localStorage.docid;
    var locid = localStorage.locid;
    var mrno = localStorage.mrno;
    var dt = localStorage.fromdt;
    var path = localStorage.ipadrs + '/formViewDIS?type=fillgplstyle&formid=' + formid + '&docid=' + docid + '&locid=' + locid + "&dt=" + dt + "&mrno=" + mrno + "&mobile=0";
    $.get(path, function (responseText) {
        $('#tblgpls').html(responseText);
    });
}
function settings() {
    location.href = 'settings.html';
}
function fillallpdfs() {
    debugger;
    localStorage.pdf = "";
    var buttons = $(".all").find("input");
    var len = buttons.prevObject.length;
    var totallength = 0;
    for (var i = 0; i < len; i++) {
        var table = buttons.prevObject[i].id.replace("btn", "tbl")
        totallength = totallength + (document.getElementById(table).rows.length - 1);
    }
    var len = buttons.prevObject.length;
    $('#hdnTotal').val(totallength);
    for (var i = 0; i < len; i++) {
        debugger;
        var btn = buttons.prevObject[i].id.replace("btn_", "").trim();
        var tableid = "tbl_" + btn;
        $('#hdnSeaAll').val("1");
        seeallpdfs(tableid, btn);
    }
}
function seeallpdfs(id, label) {
    debugger;
    var table = document.getElementById(id);
    var key_id_column = "", key_id_value = "";
    var date_id_column = "", date_id_value = "";
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        if (table.rows[0].cells[i].textContent.toUpperCase().trim() == 'KEY ID') {
            key_id_column = i;
        }
        if (table.rows[0].cells[i].textContent.toUpperCase().trim() == 'DATE') {
            date_id_column = i;
        }
    }
    for (var r = 1; r < table.rows.length; r++) {
        if (key_id_column != "") {
            key_id_value = "'" + table.rows[r].cells[key_id_column].textContent + "'";
        }
        if (date_id_column != "") {
            date_id_value = "'" + table.rows[r].cells[date_id_column].textContent + "'";
        }
        fillpdf(key_id_value, date_id_value, label, '2');
    }


}
function fillpdf(key_id_value, date_id_value, label, all) {
    debugger;
    $('#mydiv').hide();
    $('#tabs').removeClass('showtabs');
//    $('#tabs').hide();
    var root = window.location.protocol + "//" + window.location.host + "/";
    var docid = localStorage.docid;
    var mrno = localStorage.mrno;
    var formid = localStorage.currentformid;
    key_id_value = key_id_value.replace(/`/g, "'");
    key_id_value = encodeURIComponent(key_id_value.toUpperCase().trim());
    date_id_value = encodeURIComponent(date_id_value.toUpperCase().trim());
    label = encodeURIComponent(label.replace(/_/g, " "));
    var div = document.getElementById('divpdf');
    //     if(key_id_value!="" && date_id_value!=""){
    var path = localStorage.ipadrs + '/DisData?type=pdf&mrno=' + mrno + '&docid=' + docid + '&keyid=' + key_id_value + '&dateid=' + date_id_value + '&formid=' + formid + '&label=' + label + '&all=' + all + '&mobile=1&locid=' + localStorage.locid + '&userid=' + localStorage.userid;
    $.get(path, function (responseText) {
        debugger;
        if ($('#hdnSeaAll').val() == "0") {
            if (responseText.indexOf("$") > 0) {
                // div.innerHTML = responseText.replace("$","<br>");
                // alert(responseText.replace("$", "<br>"))
                $('#hdnCount').val('0');
                $('#hdnTotal').val('0');
                $('#hdnSeaAll').val("0");
                $('#mydiv').hide();
            } else {
                path = localStorage.server + "/disfiles/" + responseText;
                //div.innerHTML = " <object data=" +path+ " type='application/pdf' width='100%' height='99%' > ";

                $('#hdnCount').val('0');
                $('#hdnTotal').val('0');
                $('#hdnSeaAll').val("0");
                $('#mydiv').hide();
                document.getElementById("divpdf").style.display = 'inline-block';
//                document.getElementById("divdata").style.display = 'none';
                document.getElementById('divFrame').style.display = 'none'
                localStorage.pdf = path;
                load_home(responseText);
            }
        } else {
            if (responseText.indexOf("$") > 0) {
                if (responseText == 'No Records$') {

                } else {
                    $('#hdnCount').val('0');
                    $('#hdnTotal').val('0');
                    $('#hdnSeaAll').val("0");
                    // alert(responseText.replace("$", "<br>"));
                    $('#mydiv').hide();
                    return;
                }
            }
            var count = $('#hdnCount').val();
            count = parseInt(count) + 1;
            $('#hdnCount').val(count);
            pdffiles = pdffiles + responseText + ",";
            if ($('#hdnCount').val() == $('#hdnTotal').val()) {
                var mergePath = localStorage.ipadrs + '/DisData?type=pdfmerge&mrno=' + mrno + '&docid=' + docid + "&pdffiles=" + pdffiles + '&all=' + all + "&mobile=1&locid=" + localStorage.locid + "&userid=" + localStorage.userid + "&formid=" + formid;
                $.get(mergePath, function (responseText) {

                    $('#hdnCount').val('0');
                    $('#hdnTotal').val('0');
                    $('#hdnSeaAll').val("0")
                    pdffiles = "";
                    if (responseText.indexOf("$") > 0) {
                        // div.innerHTML = responseText.replace("$","<br>");
                        $('#mydiv').hide();
                        //alert(responseText.replace("$", "<br>"));
                    } else {
                        $('#mydiv').hide();
                        path = localStorage.server + "/disfiles/" + responseText;
                        localStorage.pdf = path;
                        load_home(responseText);
                        $('#mydiv').hide();
                        //location.href = "pdfjs-1.1.366-dist/web/viewer.html";
                        //div.innerHTML = " <object data=" +path+ " type='application/pdf' width='100%' height='99%' > ";
                    }
                });
            }
        }


    });
}
function load_home(filename) {
    $('#mydiv').show();
    var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewerzoom.jsp?mrno=" + filename;
    pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewer.jsp?mrno=" + filename;
    document.getElementById("divpdf").innerHTML = '<object id="dissecondpdf" class="mob" type="text/html" data="' + pdfpath + '" style="width:100%;" ></object>';
    $('#mydiv').hide();
//    $.ajax({
//        url: pdfpath,
//        type: "GET",
//        success: function (responeText) {
//            document.getElementById("divpdf").innerHTML = responeText;
//            loaded();
//            $('#mydiv').hide();
//        },
//        error: function (error) {
//            pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewer.jsp?mrno=" + filename;
//           document.getElementById("divpdf").innerHTML = '<object id="dissecondpdf" class="mob" type="text/html" data="' + pdfpath + '" style="width:100%;" ></object>';
//        }
//    });
}


//

var myScroll;
function loaded() {
    myScroll = new iScroll('wrapper', {zoom: true, mouseWheel: true, wheelAction: 'zoom'});
}
function toggle(text) {
    debugger;
    try {
        oab.close();
    } catch (err) {
        // alert(err);
    }
    try {
        oab1.close();
    } catch (err) {
        // alert(err);
    }
    $('.gpladiv').css('display', 'flex');
    // var text = document.getElementById('showall').innerHTML.trim();
    if (text === "See All") {
//        document.getElementById('showall').innerHTML = "Pdfs";
        document.getElementById("divpdf").style.display = 'none';
        $('#divdata').addClass('showdivdata');
        $('#tabs').removeClass('showtabs');
//        document.getElementById("divdata").style.display = 'inline-block';
//        document.getElementById("tabs").style.display = 'none';
        document.getElementById("divFrame").style.display = 'none';
        $('#divdata').show();
        $('.showtabs').css('width', '60%');
    } else {
//        document.getElementById('showall').innerHTML = "See All";
        document.getElementById("divpdf").style.display = 'inline-block';
        $('#divdata').removeClass('showdivdata');
        $('#divdata').removeClass('showdivdatawithtabs');
        $('#tabs').removeClass('showtabs');
        document.getElementById("divdata").style.display = 'none';
//       document.getElementById("tabs").style.display = 'none';
        document.getElementById("divFrame").style.display = 'none';
    }
}

function toggleSeeall(type) {
    debugger;

    if (type === "0") {
        document.getElementById('showall').innerHTML = "All Info";
        document.getElementById("divpdf").style.display = 'none';
        $('#divdata').addClass('showdivdata');
        $('#tabs').removeClass('showtabs');
//        document.getElementById("divdata").style.display = 'inline-block';
//        document.getElementById("tabs").style.display = 'none';
        document.getElementById("divFrame").style.display = 'none';
    } else {
        document.getElementById('showall').innerHTML = "History";
        document.getElementById("divpdf").style.display = 'inline-block';
        $('#divdata').removeClass('showdivdata');
        $('#divdata').removeClass('showdivdatawithtabs');
        $('#tabs').removeClass('showtabs');
//        document.getElementById("divdata").style.display = 'none';
//        document.getElementById("tabs").style.display = 'none';
        document.getElementById("divFrame").style.display = 'none';
    }
}
function load(textbox, formtype, webformid, rights) {
    debugger;
    $('#mydiv').show();
    var formnm = 'dispatientmenu.jsp';
    $('#tabs').removeClass('showtabs');
//    $('#tabs').hide();
    localStorage.webformid = webformid;
    localStorage.orderwebformid = webformid;
    localStorage.currentformid = webformid;
    if (rights === undefined)
        rights = "All";
    localStorage.rights = rights;
    var div = document.getElementById('divFrame');
    var mrno = localStorage.mrno;
    var docid = document.getElementById('hdndocid').value;
    var mapopdocid = document.getElementById('hdnmapdocid').value;
    localStorage.opdocid = mapopdocid;
    if (mapopdocid == "") {
        mapopdocid = docid;
        localStorage.opdocid = mapopdocid;
    }
    var locid = $('#hdnlocid').val();
    var speid = localStorage.speid;
    document.getElementById("divpdf").style.display = 'none';
    $('#divdata').removeClass('showdivdatawithtabs');
    $('#divdata').removeClass('showdivdata');

//    document.getElementById("divdata").style.display = 'none';
    div.style.display = 'block';
    var path = textbox.name;
    var theme = '';

    if (formtype == '9') {
        path = 'appoitments.html?webid=' + webformid + '&mrno=' + mrno + '&locid=' + locid + '&theme=' + encodeURIComponent(theme) + '&docid=' + mapopdocid + '&speid=' + speid;
        // localStorage.path = path;
        loadappointments();

    } else if (formtype == '12') {
        fillDisTemplates();
    }
    else if (formtype == '15') {
        path = 'chartFrameWorkViewMobile.jsp?webformid=' + webformid + '&fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&locid=' + locid + '&docid=' + mapopdocid + '&speid=' + speid;
        localStorage.path = path;
        $.get(localStorage.ipadrs + '/admin/' + path, function (responseText) {
            document.getElementById("divpdf").style.display = 'none';
            $('#divdata').removeClass('showdivdatawithtabs');
            $('#divdata').removeClass('showdivdata');
//            document.getElementById("divdata").style.display = 'none';
            document.getElementById('divFrame').style.display = 'inline-block'
            $('#divFrame').html(responseText);
            loadmrnodata();
        });
    }
    else if (formtype == '13') {
        path = 'PlanninfViewVfMobile.jsp?webformid=' + webformid + '&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&locid=' + locid + '&docid=' + mapopdocid + '&speid=' + speid;
        localStorage.path = path;
        $.get(localStorage.ipadrs + '/admin/' + path, function (responseText) {
            document.getElementById("divpdf").style.display = 'none';
            $('#divdata').removeClass('showdivdatawithtabs');
            $('#divdata').removeClass('showdivdata');
//            document.getElementById("divdata").style.display = 'none';
            document.getElementById('divFrame').style.display = 'inline-block'
            $('#divFrame').html(responseText);
            loadmrnoPLAN();
        });
    }
    else if (formtype == '14') {
        var ipads = localStorage.ipadrs;
        var formid = localStorage.webformid;
        localStorage.currentformid = webformid;
        var locid = localStorage.locid;
        var mrno = "";
        if ("mrno" in localStorage) {
            mrno = localStorage.mrno;
        }
        else {
            mrno = "";
        }
//    alert(localStorage.currentformid);
//alert(mrno);
        var path = 'DrillDashboardview.jsp?formid=' + webformid + '&locid=' + locid + '&mrno=' + mrno;
        localStorage.path = path;
        document.getElementById("mydiv").style.display = "none";
        document.getElementById('divFrame').style.display = 'inline-block';
        document.getElementById("divFrame").innerHTML = "<object data='./Drilldashboard.html'  width='100%' style='height:500px' >";
    }
    else {
        if (formtype == 'Orders') {
            try {
                oab.close();
            } catch (err) {
                // alert(err);
            }
            try {
                oab1.close();
            } catch (err) {
                // alert(err);
            }
            var episodeid = localStorage.episodeid;
            var encounterid = localStorage.encountid;
            $('.gpladiv').css('display', 'none');
//            alert(encounterid);
            path = 'TemplateOrdersMobile.jsp?webformid=' + webformid + '&fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&locid=' + locid + '&docid=' + mapopdocid + '&speid=' + speid + '&episodeid=' + episodeid + '&encounterid=' + encounterid;
            localStorage.path = path;
            $.get(localStorage.ipadrs + '/admin/' + path, function (responseText) {
                document.getElementById("divpdf").style.display = 'none';
                $('#divdata').removeClass('showdivdatawithtabs');
                $('#divdata').removeClass('showdivdata');
                $('#tabs').removeClass('showtabs');
//                document.getElementById("divdata").style.display = 'none';
                document.getElementById('divFrame').style.display = 'inline-block';
                try {
                    document.getElementById('divFrame').innerHTML = responseText;
                }
                catch (ee) {
                    alert(ee);
                }
//                gethide();
                getdata();
                showall();
//                gethide();

            });



        } else {
            document.getElementById('divFrame').innerHTML = "";
            if (path.indexOf("?") == -1) {
                path = 'disform.html?fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&locid=' + locid + '&docid=' + mapopdocid + '&speid=' + speid + '&locid=' + localStorage.locid;
            } else {
                path = 'disform.html?fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&speid=' + speid + '&docid=' + mapopdocid + '&locid=' + localStorage.locid;
            }
            try {
                oab.close();
            } catch (err) {
                // alert(err);
            }
            try {
                oab1.close();
            } catch (err) {
                // alert(err);
            }
            localStorage.path = path;
            if (platform.toString().toLowerCase() === "ios") {
                openinapp(path);
            } else {
                var obj = "<object class='mob' data='./" + path + "'  width='100%' height='99%' >";
                obj = $('#divFrame').html(obj);
            }

            //window.open(path);

        }
    }



    // div.innerHTML = " <object class='mob' data='" + path + "'  width='100%'> ";
    document.getElementById('mydiv').style.display = 'none';
}
var oab;
var width = $(window).width();
var height = $(window).height();
function openinapp(path) {
    //function(strUrl, originx, originy, width, height, isAutoFadeIn)

    oab = new OverAppBrowser(path, 0, 50, width, parseInt(height) - 100);

//Events : loadstop, loadstart, exit, loaderror
    oab.addEventListener('loadstop', function () {
        //insert inline style
        // oab.insertCSS({code:'#hplogoo {-webkit-transform: rotate(180deg);}'});

        //insert css file
        // oab.insertCSS({file:'http://domain.com/style.css'});

        //execute javascript code
        //oab.executeScript({code:'window.alert("test");'});

        //insert javascript file
        //oab.executeScript({file:'http://domain.com/script.js'});
    });

//Fade the webview
//oab.fade(toAlpha, duration);

//Resize the webview
    if (platform.toString().toLowerCase() === "ios") {
        oab.resize(0, 50, width, parseInt(height) - 100);
    } else {
        oab.resize(0, 50, width, parseInt(height) - 100);
    }
    //alert(oab);

}
function fillfile(filename, type) {
    $('#tabs').removeClass('showtabs');
//    $('#tabs').hide();
    document.getElementById("divpdf").style.display = 'none';
    $('#divdata').removeClass('showdivdatawithtabs');
    $('#divdata').removeClass('showdivdata');
//    document.getElementById("divdata").style.display = 'none';
    var div = document.getElementById('divFrame');
    var res = filename;
    var path = localStorage.server + "/documents/" + res;
    if (type !== 'pdf') {
        document.getElementById("divpdf").style.display = 'none';
        $('#divdata').removeClass('showdivdatawithtabs');
        $('#divdata').removeClass('showdivdata');
//        document.getElementById("divdata").style.display = 'none';
        document.getElementById('divFrame').style.display = 'inline-block'
        div.innerHTML = " <object class='mob' data='" + path + "' type='image/gif'  width='100%'> ";
    } else {
        document.getElementById("divpdf").style.display = 'inline-block';
        $('#divdata').removeClass('showdivdatawithtabs');
        $('#divdata').removeClass('showdivdata');
//        document.getElementById("divdata").style.display = 'none';
        document.getElementById('divFrame').style.display = 'none'
        localStorage.pdf = path;
        $.get(localStorage.ipadrs + '/DisData?filename=' + encodeURIComponent(filename) + '&type=attachedfiles', function (responseText) {
            load_home(responseText);
        });

    }
}
function investigations(reqid, testid) {
    $('#hdnreqid').val(reqid);
    $('#testid').val(testid);
    $.get(localStorage.ipadrs + '/DisData?reqid=' + reqid + '&testid=' + testid + '&type=dtls', function (responseJson) {
        if (responseJson.length > 0) {
            debugger;

            $('#hdnschemeid').val(responseJson[0]['SCHEMEID']);
            $('#hdnwordole').val(responseJson[0]['WORDOLE']);
            $('#hdnTestnm').val(responseJson[0]['TESTNM'])
            $('#templateid').val(responseJson[0]['TEMPLID']);
            $('#hdnReqno').val(responseJson[0]['REQNO']);
            $('#hdnResultid').val(responseJson[0]['RESULTID']);
            $('#hdntestid').val(responseJson[0]['TESTID']);
            var imgpath = responseJson[0]['IMGPATH'];
            var obj = document.getElementById('divpdf');
            if (imgpath != "") {
                var num_tabs = $("div#tabs ul li").length + 1;
                var root1 = window.location.protocol + "//" + window.location.host + "/";
                var path = root1 + "/documents/" + imgpath;
                // obj.innerHTML = " <object data='" +path+ "' type='application/pdf' width='100%' height='580' > ";
                var data = " <object data='" + path + "'  width='100%' height='580' > ";
                $("div#tabs ul").append("<li id='li" + num_tabs + "' onclick='tabs1(this," + num_tabs + "," + wordole + ")'><a href='#" + num_tabs + "'  id=" + reqno + testid + " class='ui-tabs-anchor' >" + responseJson[0]['TESTNM'] + "(Pdf)</a><span style='color:#fff;'  onclick='spnClose(" + num_tabs + ",this.parentNode)' class='closespan'>x</span></li>");
                $("div#tabs").append(
                        "<div id='tab" + num_tabs + "' class='insidetab'>" + data + "</div>");
                var divcounts = $("#tabs > div").length;
                for (var i = 1; i <= divcounts; i++) {
                    $('#tab' + i).hide();
                }
                $('#tab' + divcounts).show();
                $('#li' + divcounts).click();
                obj.innerHTML = " <object data='" + path + "'  width='100%' height='580' > ";
                return;
            } else {
                // obj.innerHTML = "";
            }
            var resultid = $('#hdnResultid').val();
            var reqno = $('#hdnReqno').val();

//               document.getElementById("tabs").style.display = 'inline-block';
            document.getElementById("divpdf").style.display = 'inline-block';
            document.getElementById('divFrame').style.display = 'none';
            $('#divdata').removeClass('showdivdata');
            $('#divdata').addClass('showdivdatawithtabs');
            $('#tabs').addClass('showtabs');
//            document.getElementById('divdata').style.display = 'none';
            try {
                var check = document.getElementById(reqno.trim() + testid.trim()).id;
                var parent = document.getElementById(reqno.trim() + testid.trim()).parentNode.id;
                $('#' + parent).click();
                exist = true;
            } catch (err) {
                exist = false;
            }
            if (exist) {
                $('#divdata').hide();
                return;
            }
            var wordole = $('#hdnwordole').val();
            if (wordole == "0") {
                document.getElementById("rdbGrid").checked = true;
            }
            else {
                document.getElementById("rdbPdf").checked = true;
            }
            if (wordole == "0") {
                fillgridnew(testid, reqid, $('#hdnTestnm').val(), $('#hdnReqno').val())
            } else {
                if (resultid != "") {

                } else {
                    fillwordole();
                }
            }
            $('#divdata').hide();
            $('.showtabs').css('width', '100%');
        }
    });
}
function tabs1(list, divid, wordole) {
    debugger;
    if (wordole == "1") {
        document.getElementById("rdbPdf").checked = true;
    }
    else {
        document.getElementById("rdbGrid").checked = true;
    }
    var divcounts = $("#tabs > div").length;
    $('#tabs>div').each(function () {
        $(this).hide();
    });
    $('#tab' + divid).show();
    $("#divul li").removeClass('ntabs');
    $("#divul li").addClass('seltabs');
    $('#' + list.id).removeClass('seltabs');
    $('#' + list.id).addClass('ntabs');

}
function fillgridnew(testid, reqid, testnm, reqno) {
    debugger;
    var div1 = document.getElementById('tabs');
    $('#tabs').addClass('showtabs');
//    div1.style.display = 'block';
    var div = document.getElementById('divpdf');
    div.style.display = 'none';
    var options = '';
    $.get(localStorage.ipadrs + '/dispatientmenusvlt?type=fillgridnew&testidnew=' + testid + '&reqidnew=' + reqid, function (responseJson) {
        if (responseJson != null && responseJson != "") {
            debugger;
            var num_tabs = $("div#tabs ul li").length + 1;
            var style = 'display:block'
            var nooftest = parseInt(responseJson[0]['NOOFTESTS']);

            if (nooftest <= 1) {
                style = 'display:none';
            }
            var data = "<div class='tabgrid'>"
            data += "<div style='width:100%; overflow:auto;'  align='left' class='ajab2'><table width='100%'  cellpadding='0' cellspacing='0' border='0' bordercolor='lightgray' align='left' class='trend ajab3' id='pdfgrid" + num_tabs + "'>";
            data += "<tr style='font-size:8pt;height:22px;font-weight:normal;' class='label1 ajab4'><td width='10%' align='left' nowrap=''>   Date</td> <td width='40%' align='left' nowrap=''>  Parameter Name</td> <td width='5%' align='left' nowrap=''> Result Value</td><td width='10%' align='left' nowrap='' style='display:none'> compid</td><td width='10%' align='left' nowrap='' style='display:none'>Testid</td><td width='10%'>Trend</td></tr>"
            for (var i = 0; i < responseJson.length; i++) {
                options += '<option value="' + responseJson[i]['TESTCOMPONENT'] + '">' + responseJson[i]['TESTCOMPONENT'] + '</option>';
                data += "<tr style='border-bottom:1px solid #D3D3D3; height:19px;' class='ajab5'><td onclick='fillcomponents1(this)' width='10%'>" + responseJson[i]['REQDT'] + "</td><td onclick='fillcomponents1(this)' width='30%'>" + responseJson[i]['TESTCOMPONENT'] + "</td><td onclick='fillcomponents1(this)' width='13%' align='right'>" + responseJson[i]['RESULTVALUE'] + "</td><td width='14%' style='display:none'>" + responseJson[i]['RESULTVALUE'] + "</td><td width='14%' style='display:none'>" + responseJson[i]['COMPID'] + "</td><td width='14%' style='display:none'>" + responseJson[i]['TESTID'] + "</td><td width='14%' style='" + style + "'><input type='button'  value='Trend' title='" + responseJson[i]['TESTCOMPONENT'] + "_" + responseJson[i]['TESTID'] + "_" + responseJson[i]['COMPID'] + "' onclick='filltab(this," + num_tabs + ")' class='btn btn-success'></td></tr>";

            }
            data += "</table></div>";
            $("div#tabs ul").append(
                    "<li id='li" + num_tabs + "' onclick='tabs(this," + num_tabs + ")'><a href='#" + num_tabs + "' class='ui-tabs-anchor'  id=" + reqno + testid + ">" + testnm + "(Grid)</a><span style='color:#fff;'  onclick='spnClose(" + num_tabs + ",this.parentNode)' class='closespan'>x</span></li>"
                    );

            var ddlchart = " <select id='ddlChart" + num_tabs + "' name='' class='chartslctgrph' onchange='fillcomponents(this.value,this.value,this.id)'><option value='lg2d'>Line Graph 2-D</option><option value='bg2d'>Bar Graph 2-D</option><option value='ag2d'>Area Graph 2-D</option>"
            ddlchart += "<option value='sg2d'>Step Graph 2-D</option>";
            ddlchart += " <option value='pg2d'>Pie Graph 2-D</option>";
            ddlchart += " <option value='xy2d'>XY Scatter Graph 2-D</option>";
            ddlchart += "<option value='bg3d'>Bar Graph 3-D</option>";
            ddlchart += "<option value='pg3d'>Pie Graph 3-D</option>";
            ddlchart += "</select>";

            data += "<div id='divtrend" + num_tabs + "'  style='overflow:auto;margin-top:20px;' class='ajab6'></div></div><div class='grphdiv'><div class='ajab8'>" + ddlchart + "</div><div id='divchart" + num_tabs + "' style='width:100%' class='ajab9'></div></div>"
            $("div#tabs").append(
                    "<div id='tab" + num_tabs + "' class='insidetab ajab10' style='padding:0.2em;'>" + data + "</div>"
                    );
            var divcounts = $("#tabs > div").length;
            for (var i = 1; i <= divcounts; i++) {
                $('#tab' + i).hide();
            }
            $('#tab' + divcounts).show();
            $('#li' + divcounts).click();

            $('#ddlComponets').html(options);
            var button = document.getElementById("pdfgrid" + num_tabs).rows[1].cells[6].children[0];
            filltab(button, num_tabs);
        }
    });
}
function filltab(id, num_tabs) {
    var achors = $("#divul a");
    var id2 = id.title;
    var id3 = id2.split('_');
    var testnm1 = id3[0];
    var testid1 = id3[1];
    var compid1 = id3[2];
    var testnm = testnm1;
    $('#tab' + (num_tabs)).show();
    $('#li' + (num_tabs)).click();
    popvalue("ddlComponets", testnm);
    $('#lblCompnonetNM').html(testnm)
    var testid = testid1;
    var ipno = '';
    var _reqtype = '';
    var mir = 0;
    ipno = document.getElementById("lbl_MrNo").innerHTML;
    _reqtype = 'dg';
    mir = 0;
    var compid = compid1;
    var fromdt = '';
    var todt = '';
    var options = '';

    $.get(localStorage.ipadrs + '/ReqOrderforConsWard?type=graph&ipno=' + ipno + '&from=' + fromdt + '&to=' + todt + '&mir=' + mir + '&_reqtype=' + _reqtype + '&compid=' + compid + '&testid=' + testid + '&type1= ', function (data) {
        var res = data.split("@");
        var date = res[0].substr(0, res[0].length - 1);
        var value = res[1].substr(0, res[1].length - 1);
        var data = "<table width='100%' class='ajab11'><tr><td width='100%' valign='top' >"
        data += "<table style='width:100%;' cellpadding='0' cellspacing='0' border='0' class='graptbl ajab12' bordercolor='lightgray'>";
        var dates = date.split(",");
        data += "<tr style='height:22px;' class='label1 ajab13'><td width='50%'>Date</td><td width='20%'>Parameter</td></tr>";

        var values = value.split(",");
        for (var i = 0; i < dates.length; i++) {
            data += "<tr height='19' class='ajab14'><td width='50%'>" + dates[i] + "</td><td width='30%'><a href='#' style='text-decoration:none;' onclick='showgraph(this)'  id=" + compid + ">" + values[i] + "</a></td></tr>";
        }
        data += "</table>";

        $('#hdnCompid').val(compid);
        if (dates.length > 1) {
            fillcomponentsGraph(testid, compid, testnm, num_tabs);
        }
        $("#divtrend" + num_tabs).html(data);

        var divcounts = $("#tabs > div").length;
        for (var i = 1; i <= divcounts; i++) {
            $('#tab' + i).hide();
        }
        $('#tab' + num_tabs).show();
        $('#li' + num_tabs).click();


    });

}
function tabs(list, divid) {

    document.getElementById('divpdf').style.display = 'none';
    var divcounts = $("#tabs > div").length;
    $('#tabs>div').each(function () {
        $(this).hide();
    });

    $('#tab' + divid).show();

    $("#divul li").removeClass('ntabs');
    $("#divul li").addClass('seltabs');
    $('#' + list.id).removeClass('seltabs');
    $('#' + list.id).addClass('ntabs');
    $('#divImpresion' + divid).show();
    $('#objPdf' + divid).hide();
    if (document.getElementById('rdbPdf').checked) {
        $('#divImpresion' + divid).hide();
        $('#objPdf' + divid).show();
    }
    else {
        $('#divImpresion' + divid).show();
        $('#objPdf' + divid).hide();
    }
}
function fillwordole() {
    debugger;
    var options = '';
    $('#ddlComponets').html(options);

    var repheader = 0;
    var reqno = $('#hdnReqno').val();
    var reqid = $('#hdnreqid').val();
    var testid = $('#hdntestid').val();
    var num_tabs = $("div#tabs ul li").length + 1;
    var obj = document.getElementById('divpdf');
    var testnm = $('#hdnTestnm').val();
    var wordole = $('#hdnwordole').val();
    $.get(localStorage.ipadrs + '/DgWordole?reqno=' + reqno.trim() + '&reqid=' + reqid.trim() + '&testid=' + testid.trim() + '&reporthead=0', function (responsetext) {
        debugger;
        var root1 = window.location.protocol + "//" + window.location.host + "/";
        var path = root1 + "/wordimages/" + responsetext;
        obj.innerHTML = " <object data='" + path + "' type='application/pdf' width='100%' height='580' > ";
        var data = " <object data='" + path + "' type='application/pdf' width='100%' height='580' > ";
        $("div#tabs ul").append("<li id='li" + num_tabs + "' onclick='tabs1(this," + num_tabs + "," + wordole + ")'><a href='#" + num_tabs + "'  id=" + reqno + testid + " class='ui-tabs-anchor' >" + testnm + "(Pdf)</a><span style='color:#fff;'  onclick='spnClose(" + num_tabs + ",this.parentNode)' class='closespan'>x</span></li>");
        $("div#tabs").append(
                "<div id='tab" + num_tabs + "' class='insidetab'>" + data + "</div>");
        var divcounts = $("#tabs > div").length;
        for (var i = 1; i <= divcounts; i++) {
            $('#tab' + i).hide();
        }
        $('#tab' + divcounts).show();
        $('#li' + divcounts).click();
        return;
    });
    document.getElementById("divpdf").style.display = 'none';
}
function fillcomponents(graph, testid, id) {
    debugger;
    document.getElementById("txtsid").value = testid;
    var ipno = '';
    var _reqtype = '';
    var mir = 0;
    ipno = document.getElementById("lbl_MrNo").innerHTML;
    _reqtype = 'dg';
    mir = 0;
    var compid = $('#hdnCompid').val();
    var fromdt = '';
    var todt = '';
    var options = '';
    var num_tabs = id.replace("ddlChart", "");
    fillcomponentsGraph(testid, compid, '', num_tabs, graph, id);
}

function fillcomponentsGraph(testid, compid, testnm, num, chart) {
    debugger;
    var ipno = '';

    var _reqtype = '';
    var mir = 0;
    ipno = document.getElementById("lbl_MrNo").innerHTML;
    _reqtype = 'dg';
    mir = 0;
    //                var compid =document.getElementById("pdfgrid1").rows[id1].cells[4].innerHTML;
    var fromdt = '';
    var todt = '';
    var options = '';
    $.get(localStorage.ipadrs + '/ReqOrderforConsWard?type=graph&ipno=' + ipno + '&from=' + fromdt + '&to=' + todt + '&mir=' + mir + '&_reqtype=' + _reqtype + '&compid=' + compid + '&testid=' + testid + '&type1=loadgraph', function (data) {
        debugger;

        var res = data.split("@");
        var date = res[0].substr(0, res[0].length - 1);
        var value = res[1].substr(0, res[1].length - 1);
        var charttype = $('#ddlChart' + num).val();
        if (chart != undefined) {
            charttype = chart;
        }
        fillchartsGraph(date, value, charttype, num);

    });

}
function popvalue(selid, pval)
{
    debugger;
    var psel = document.getElementById(selid);
    if (pval.length > 1)
    {
        for (var i = 0; i < psel.options.length; i++) {
            if (psel.options[i].value.trim() === pval.trim()) {
                psel.selectedIndex = i;
                break;
            }
        }
    }
    else
    {
        psel.selectedIndex = 0;
    }

}
function spnClose(divno, li) {
    li.remove();
    $('#tab' + divno).remove();
    $('#tabs>div').each(function () {
        $(this).hide();
    });

    $('#tab' + divno).show();
}
function vaultinfo() {
    $('#txtPwd').val("");
    displaypwd();
}
function displaypwd() {
    $("#boxpwd").dialog({
        resizable: false,
        height: 'auto',
        width: '40%',
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
            },
            "Ok": function () {
                checkpwd();
            }

        },
        modal: true


    });

}
function checkpwd() {
    var pwd = $('#txtPwd').val();
    var userid = localStorage.userid;
    $.get(localStorage.ipadrs + '/RemainderSave?pwd=' + pwd + '&type=authvault&userid=' + userid, function (responseJson) {
        if (responseJson == "1") {
            $("#boxpwd").dialog("close");
            displaymsg();
        } else {
            alert('Password not matched');
            return;
        }
    });
}
function displaymsg() {
    $("#box22").dialog({
        resizable: false,
        height: 'auto',
        width: '60%',
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                //                                empty();
            },
            "Save": function () {
                savevaultinfo();
            }

        },
        modal: true


    });

}
function savevaultinfo() {
    debugger;
    var info = encodeURIComponent($('#txtareainfo').val());
    var mrno = $('#lbl_MrNo').html();
    var docid = $('#hdndocid').val();
    $.get(localStorage.ipadrs + '/RemainderSave?info=' + info + '&docid=' + docid + '&type=savevalut&mrno=' + mrno + '&userid=' + localStorage.userid, function (responseJson) {
        if (responseJson == "1") {
            alert('Record Saved');
            $("#box22").dialog("close");
        }
    });
}
//function getdata() {
//    debugger;
//    alert("HI");
//    document.getElementById("mydiv").style.display = "block";
//    var webid = localStorage.webformid;
//    var encid = "";
//    $.get(localStorage.ipadrs + '/DisTemplateView?type=loaddataall&webid=' + webid + '&encid=' + encid, function (responcejson) {
//        if (responcejson != "") {
//            document.getElementById("maindiv").innerHTML = responcejson;
//            document.getElementById("mydiv").style.display = "none";
//            assignval();
//        }
//        else {
//            document.getElementById("mydiv").style.display = "none";
//        }
//    });
//}

function  popencounter(id) {
    debugger;
    document.getElementById("mydiv").style.display = "block";
    var tab = document.getElementById("encountertab");
    var encid = tab.rows[id.parentNode.rowIndex].cells[3].textContent;
    //              alert(encid);
    var webid = localStorage.webformid;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=loaddataall&webid=' + webid + '&encid=' + encid, function (responcejson) {
        if (responcejson != "") {
            document.getElementById("maindiv").innerHTML = responcejson;
            document.getElementById("mydiv").style.display = "none";
            assignval();
        }
        else {
            document.getElementById("mydiv").style.display = "none";
        }
    });
}

function assignval() {
    var e = document.getElementsByTagName("select");
    for (var i = 0; i < e.length; i++) {
        var name = e[i].title;
        if (name != "") {
            e[i].value = name;
        }
    }

    var tx = document.getElementsByTagName("textarea");
    for (var i = 0; i < tx.length; i++) {
        var name = tx[i].title;
        //    alert(name);
        debugger;
        if (name != "") {
            tx[i].value = document.getElementById(name).innerHTML;
            loadtextarea(tx[i].id);
        }
    }
}

function loadtextarea(id) {
    textboxio.replaceAll('#' + id, {
        paste_styles: {
            office: 'clean'
        },
        css: {
            stylesheets: ['example.css']

        }
    });
}

function pop(id, flg, webid) {
    debugger;
    if (flg == '1') {
        var qry = id.title.split("@@");
        var id1 = qry[1];
        var mainqry = qry[0].split("from");

        qry = mainqry[0].split("`").join("'");
        var tab = mainqry[1];
        var txtf = webid.id + "@@" + id.parentNode.parentNode.rowIndex + "@@" + id.parentNode.cellIndex + "@@" + id1;
        var path = "<%=request.getContextPath()%>";
        window.open('' + localStorage.ipadrs + '/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf=' + txtf + '&ordby=', '', 'width=640,height=600');

    }
}

function ReloadOP(rt) {
    debugger;

    var et = rt.split("&");
    if (et[0].indexOf("@@") > 0) {
        var dat = et[0].split("@@");
        //                alert(dat[0]);    
        var tab = document.getElementById(dat[0]);
        tab.rows[dat[1]].cells[dat[2]].childNodes[0].value = et[1];
        tab.rows[dat[1]].cells[parseInt(dat[2]) + 1].childNodes[0].value = et[2];

    }
}
function fillchartsGraph(date, value, chartype, num) {
    debugger;
    //  num=1;

    var array1 = new Array();
    var array2 = new Array();
    var array3 = new Array();
    var array4 = new Array();
    var dates = date.split(',');
    var values = value.split(',');
    for (var i = 0; i < dates.length; i++) {
        array1.push(dates[i]);
        array2.push(parseFloat(values[i]));
        array3.push([dates[i], Math.round(parseFloat(values[i]))]);
        array4.push({
            income: parseFloat(values[i]),
            year: dates[i]
        });
    }
    //                    document.getElementById("datelable").style.display='block';
    try {
        if (chartype == "bg2d") {

            $('#divchart' + num).highcharts({
                chart: {
                    type: 'column'
//                    width: '100%',
//                    height: '100%'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -35,
                        align: 'right',
                        style: {
                            fontSize: '8pt',
                            fontFamily: 'Verdana, sans-serif',
                            font: 'normal'
                        }
                    }
                },
                //                           yAxis: {
                //            
                //            title: {
                //                enabled: false
                //            }
                //        },
                //        xAxis: {
                //            
                //            title: {
                //                enabled: false
                //            }
                //        },
                //                            credits: {
                //                                enabled: false
                //                            },
                series: [{
                        showInLegend: false,
                        name: $("#ddlComponets :selected").text(),
                        data: array2
                    }]
            });
        } else if (chartype == "lg2d") {
            $('#divchart' + num).highcharts({
                chart: {
                    type: 'spline',
                    marginRight: 10,
                    marginBottom: 35,
//                    width: '100%',
//                    height: '100%',
                    fontSize: '8pt'
                },
                title: {
                    text: '',
                    x: -20, //center,
                    enabled: false
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: 0,
                        align: 'right',
                        style: {
                            fontSize: '8pt',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                },
                //                             xAxis: {
                //                                title: {
                //                                    text: ''
                //                                }
                //                               
                //                            },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    borderWidth: 0
                },
                series: [{
                        showInLegend: false,
                        name: 'Range Values',
                        data: array2
                    }]
            });
        }
        else if (chartype == "ag2d") {

            $('#divchart' + num).highcharts({
                chart: {
                    type: 'areaspline',
//                    width: '100%',
//                    height: '100%',
                    fontSize: '8pt'
                },
                title: {
                    text: ''

                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF'
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -25,
                        align: 'right',
                        style: {
                            fontSize: '8pt',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    plotBands: [{// visualize the weekend
                            from: 4.5,
                            to: 6.5,
                            color: 'rgba(68, 170, 213, .2)'
                        }]
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                //                            xAxis: {
                //                                title: {
                //                                    text: ''
                //                                }
                //                            },
                tooltip: {
                    shared: true,
                    valueSuffix: ' units'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                        name: 'DeptRevenues',
                        data: array2
                    }]
            });
        } else if (chartype == "sg2d") {
            $('#divchart' + num).highcharts({
                title: {
                    text: ''
                },
                chart: {
//                    width: '100%',
//                    height: '100%',
                    fontSize: '8pt'
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -20,
                        align: 'right',
                        style: {
                            fontSize: '8pt',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }

                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                //                            xAxis: {
                //                                title: {
                //                                    text: ''
                //                                }
                //                            },
                series: [{
                        showInLegend: false,
                        data: array2,
                        step: 'left',
                        name: $("#ddlComponets :selected").text()
                    }]

            });

        } else if (chartype == "pg2d") {
            $('#divchart' + num).highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
//                    width: '100%',
//                    height: '100%',
                    fontSize: '8pt'
                },
                title: {
                    text: ''
                },
                //                        tooltip: {
                //                          //  pointFormat: '{series.name}: <b>{series.addPoint[a]}</b>',
                //                            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                //                            percentageDecimals: 10
                //                           
                //                        },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        //                                    showInLegend: false, 
                        type: 'pie',
                        name: 'Componentwise',
                        data: array3
                    }]
            });
        } else if (chartype == "xy2d")
        {
            $('#divchart' + num).highcharts({
                chart: {
//                    width: '100%',
//                    height: '100%',
                    fontSize: '8pt'

                },
                yAxis: {
                    min: 0
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: 0,
                        align: 'right',
                        style: {
                            fontSize: '7px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                //                            xAxis: {
                //                                title: {
                //                                    text: ''
                //                                }
                //                            },
                series: [{
                        showInLegend: false,
                        type: 'scatter',
                        name: '',
                        data: array2,
                        marker: {
                            radius: 4
                        }
                    }]
            });
        } else if (chartype == "bg3d")
        {
            var chart;

            chart = new AmCharts.AmSerialChart();
            chart.autoMarginOffset = 0;
            chart.marginRight = 0;
            chart.dataProvider = array4;
            chart.categoryField = "year";
            // this single line makes the chart a bar chart,
            // try to set it to false - your bars will turn to columns               
            chart.rotate = false;
            // the following two lines makes chart 3D
            chart.depth3D = 20;
            chart.angle = 30;
            // AXES
            // Category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = "start";
            categoryAxis.axisColor = "#DADADA";
            categoryAxis.fillAlpha = 1;
            categoryAxis.gridAlpha = 0;
            categoryAxis.fillColor = "#FAFAFA";
            // value
            var valueAxis = new AmCharts.ValueAxis();
            //  valueAxis.axisColor = "#DADADA";
            //valueAxis.title = "Income in millions, USD";
            //valueAxis.gridAlpha = 0.1;
            //chart.addValueAxis(valueAxis);

            // GRAPH
            var graph = new AmCharts.AmGraph();
            graph.title = "";
            graph.valueField = "income";
            graph.type = "column";
            graph.balloonText = "Range Value in [[category]]:[[value]]";
            graph.lineAlpha = 0;
            graph.fillColors = "#bf1c25";
            graph.fillAlphas = 1;
            chart.addGraph(graph);
            // WRITE
            chart.write("divchart" + num);
        }
        else if (chartype == "pg3d")
        {
            $("#container").css({
                "margin-left": 0 + "px",
                "min-width": 40 + "%"
            });
            var chart;

            // PIE CHART
            chart = new AmCharts.AmPieChart();
            chart.dataProvider = array4;
            chart.titleField = "year";
            chart.valueField = "income";
            chart.outlineColor = "#FFFFFF";
            chart.outlineAlpha = 0.8;
            chart.outlineThickness = 2;
            // this makes the chart 3D
            chart.depth3D = 15;
            chart.angle = 30;
            // WRITE
            chart.write("divchart" + num);
        }
    } catch (erro) {
        //alert(erro);
    }
}
            