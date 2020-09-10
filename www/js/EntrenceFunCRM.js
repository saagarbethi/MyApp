$(document).on("click", function (event) {
    $(".dropdownCont").css("display", "none");
});
document.addEventListener("backbutton", function (e) {
    if ($.mobile.activePage.is('#homepage')) {
        /* 
         Event preventDefault/stopPropagation not required as adding backbutton
         listener itself override the default behaviour. Refer below PhoneGap link.
         */
        //e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory();
    }
}, false);
$(document).ready(function () {
//    $('#btnExit').click(function () {
//        navigator.app.exitApp(); //
//    });
});
var myTimeoutn = "";
$(document).ready(function () {
    debugger;
    $(".dropdownCont").click(function () {
    });

    localStorage.removeItem("donotaskpwd");
    if ("iphospname" in localStorage) {
        var color = "";
        var row = "";
        var data = localStorage.iphospname;
        var ipsel = localStorage.ipsel;
        var ipport = localStorage.ipport;
        var iphostname = localStorage.iphostname;
        var username = localStorage.ipusername;
        var ippassword = localStorage.ippassword;
        if (data.indexOf("@@@") > 0) {
            var sel = data.split("@@@");
            ipsel = ipsel.split("@@@");
            ipport = ipport.split("@@@");
            iphostname = iphostname.split("@@@");
            username = username.split("@@@");
            ippassword = ippassword.split("@@@");
            for (var i = 0; i < sel.length - 1; i++) {
                if (sel[i] !== 'undefined') {
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

                    row = row + " <div class='col-md-4 col-sm-6 col-xs-12'> " +
                            "<div  id='div" + i + "' class='info-box' style='cursor:pointer' onclick=askpassword(" + i + ")  > " +
                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-user'>" +
                            "</span></span>" +
                            "<div class='info-box-content'>" +
                            "<span class='info-box-text'></span>" +
                            "<div><span class='info-box-number'><br><a >" + sel[i] + "</a><br>" + username[i] + "</span></div>" +
                            "<div class='glyphicon glyphicon-option-vertical iclr' onclick=rightclick(" + i + ")></div>\n\
                             <div  id='divsedit" + i + "' class='dropdownCont' >\n\
                       <div  onclick=EditUser(" + i + ")><button type='button' class='btn editbtn'><span class='glyphicon glyphicon-edit editicon'>\n\
         </span><span class='edittxt'   >Edit</span></button></div>\n\
      <br><div onclick=\"deleteUsercon('" + i + "','" + sel[i] + "','" + username[i] + "','" + ippassword[i] + "','" + ipsel[i] + "','" + ipport[i] + "','" + iphostname[i] + "')\"><button type='button' class='btn removebtn'  >\n\
  <span class='glyphicon glyphicon-remove removeicon'></span><span class='deltxt'>Delete</span></button></div></div>\n\
   </div>  </div> </div> ";

                }
            }
            $('#divhospitals').html(row);
            var lengthofdivs = $('#divhospitals>div').length;
            localStorage.loadsingleform = "1";
            if ("loadsingleform" in localStorage) {
                var unm = localStorage.ipusername;
                var ipusernamelen = unm.split("@@@");
                if (ipusernamelen.length == 2) {
                    localStorage.removeItem("loadsingleform");
                    myTimeoutn = setTimeout(function () {
                        exitAppForSinglUser()
                    }, 1000);
                }
            } else if (lengthofdivs == 1) {
                location.href = "index.html";
            }
        }
    }

});
function exitAppForSinglUser() {
    debugger;
    try {
        playBeepForSinglUser();
    } catch (err) {

    }
    try {
        navigator.notification.confirm(
                'Do you want to exit the app?', // message
                onConfirmForSinglUser, // callback to invoke with index of button pressed
                'Shivam CRM', // title
                ['No', 'Yes']         // buttonLabels
                );
        clearTimeout(myTimeoutn);
    } catch (err) {
//        alert(err)
    }

}
function onConfirmForSinglUser(buttonIndex) {
    if (buttonIndex === 2) {
        navigator.app.exitApp();
    }
}
function playBeepForSinglUser() {
    navigator.notification.beep(1);
}
function EditUser(id) {
    debugger;
    event.stopPropagation();
    event.preventDefault();

    localStorage.edituserval = id;
    localStorage.adduseredit = "1";
    location.href = 'index.html?show=1';
}

function rightclick(id) {
    debugger;
    $(".dropdownCont").css("display", "none");
    event.stopPropagation();
    event.preventDefault();
    document.getElementById('divsedit' + id).style.display = "block";
}


function onConfirm1(buttonIndex) {
    debugger;

    if (buttonIndex === 2) {

        var i = $("#hdncntval").val();
        var hospitalname = $("#hdnhospitalname").val();
        var uname = $("#hdnuname").val();
        var pwd = $("#hdnpwd").val();
        var localip = $("#hdnlocalip").val();
        var portnumber = $("#hdnportnumber").val();
        var hostnm = $("#hdnhostnm").val();

        deleteUser(i, hospitalname, uname, pwd, localip, portnumber, hostnm);
    } else {

    }
}
function delUserFrmNotDevLst(i, hospitalname, uname, pwd, localip, portnumber, hostnm) {

    debugger;
    var regid = localStorage.deviceregid;
//			var regid="APA91bGo3ngYVmBoYKpQM37ghz29yzBuMyz4iYztwtUBjYS5dDLj1YNPilgC0m26-HuxnSB0KaKQfDf_fXWXTItALbDgr9XLTxIlDrI9FcRkv1rF-rqXSPyZdOTa8iYVjsJxr3gHV2MY";
var path = "https://" + localip + ":" + portnumber + "/" + hostnm + "/DeviceRegistrations?type=deleteregidfrmdev&username=" + uname + "&password=" + pwd + "&regid=" + regid + "&userid=1&apptype=patientapp";
    if(localStorage.isHttp == 1){
        path = "http://" + localip + ":" + portnumber + "/" + hostnm + "/DeviceRegistrations?type=deleteregidfrmdev&username=" + uname + "&password=" + pwd + "&regid=" + regid + "&userid=1&apptype=patientapp";
    }
    $.ajax({
        url: path,
        type: "POST",
        dataType: "",
        success: function (responseText) {
            debugger;
            var lengthofdivs = $('#divhospitals>div').length;

            if (lengthofdivs == 1) {

                location.href = "index.html";
            }

        },
        error: function (error) {
            debugger;
            var lengthofdivs = $('#divhospitals>div').length;

            if (lengthofdivs == 1) {

                location.href = "index.html";
            }
        }
    });

}

function deleteUsercon(i, hospitalname, uname, pwd, localip, portnumber, hostnm) {
    debugger
    event.stopPropagation();
    event.preventDefault();
    $("#hdncntval").val(i);
    $("#hdnhospitalname").val(hospitalname);
    $("#hdnuname").val(uname);
    $("#hdnpwd").val(pwd);
    $("#hdnlocalip").val(localip);
    $("#hdnportnumber").val(portnumber);
    $("#hdnhostnm").val(hostnm);
//    , hospitalname, uname, pwd, localip, portnumber, hostnm

//if (confirm('Do You Want To Delete This User?')) { 
//  onConfirm1(2);
//}

    try {

        navigator.notification.confirm(
                'Do You Want To Delete This User?', // message
                onConfirm1, // callback to invoke with index of button pressed
                'Shivam CRM', // title
                ['No', 'Yes']         // buttonLabels
                );
    } catch (err) {
        if (confirm('Do You Want To Delete This User?')) {
            onConfirm1(2);
        }
    }



}


function deleteUser(j, hospitalname, uname, pwd, localip, portnumber, hostnm) {
    debugger;
    //confirm("delete user");
//    event.stopPropagation();
//    event.preventDefault();

    var iphospname = localStorage.iphospname;
    var ipusername = localStorage.ipusername;
    var ippassword = localStorage.ippassword;
    var iphostname = localStorage.iphostname;
    var ipsel = localStorage.ipsel;
    var ipport = localStorage.ipport;
    var hospnamelen = iphospname.split("@@@");
    var hostnm = iphostname.split("@@@");
    var ipsellen = ipsel.split("@@@");
    var ipportlen = ipport.split("@@@");
    var usernamelen = ipusername.split("@@@");
    var passwordlen = ippassword.split("@@@");
    var deletedhostnm = "";
    var deletedipsel = "";
    var deletedipport = "";
    var deletedusername = "";
    var deletedpassword = "";
    var deletedhospname = "";
    var deletednumber = 0;
    $('#div' + j).parent().css('display', 'none');
    $('#div' + j).parent().remove();
    var data = localStorage.iphospname;
    for (var i = 0; i < hospnamelen.length; i++) {
        if (hospitalname === hospnamelen[i] && uname === usernamelen[i] && pwd === passwordlen[i] && localip === ipsellen[i] && portnumber === ipportlen[i]) {
            deletednumber = i;
            deletedhospname = hospnamelen[i];
            deletedhostnm = hostnm[i];
            deletedipsel = ipsellen[i];
            deletedipport = ipportlen[i];
            deletedusername = usernamelen[i];
            deletedpassword = passwordlen[i];
            hospnamelen.splice(i, 1);
            hostnm.splice(i, 1);
            ipsellen.splice(i, 1);
            ipportlen.splice(i, 1);
            usernamelen.splice(i, 1);
            passwordlen.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("iphospname", "");
    localStorage.setItem("ipsel", "");
    localStorage.setItem("ipport", "");
    localStorage.setItem("iphostname", "");
    localStorage.setItem("ipusername", "");
    localStorage.setItem("ippassword", "");
    for (var i = 0; i < hospnamelen.length - 1; i++) {

        localStorage.ipsel = ipsellen[i] + "@@@" + localStorage.ipsel;
        localStorage.ipport = ipportlen[i] + "@@@" + localStorage.ipport;
        localStorage.iphostname = hostnm[i] + "@@@" + localStorage.iphostname;
        localStorage.ipusername = usernamelen[i] + "@@@" + localStorage.ipusername;
        localStorage.iphospname = hospnamelen[i] + "@@@" + localStorage.iphospname;
        //alert("4--"+localStorage.iphospname);
        localStorage.ippassword = passwordlen[i] + "@@@" + localStorage.ippassword;
    }
//    .replace(/@/g, '~')
//    .replace(/~/g, '@'));
    $("#hdncntval").val("");
    $("#hdnhospitalname").val("");
    $("#hdnuname").val("");
    $("#hdnpwd").val("");
    $("#hdnlocalip").val("");
    $("#hdnportnumber").val("");
    $("#hdnhostnm").val("");
    delUserFrmNotDevLst(j, deletedhospname, deletedusername, deletedpassword, deletedipsel, deletedipport, deletedhostnm);


}

function askpassword(id) {
    debugger;
    var userDetails = [];

    if (localStorage.getItem("userdetials") !== null) {
        userDetails = JSON.parse(localStorage.getItem('userdetials'));
    }
    var ind = id;
    var selip = localStorage.ipsel;
    var selport = localStorage.ipport;
    var selhostname = localStorage.iphostname;
    var selusername = localStorage.ipusername;
    var hospname = localStorage.iphospname;
    var password = localStorage.ippassword;

    var lgnip = "";
    var lgnport = "";
    var lgnhostname = "";
    var lgnusernm = "";
    var lgnhospname = "";
    var lgnpwd = "";

    if (selip.indexOf("@@@") > 0) {
        var selip1 = selip.split("@@@");
//        $("input[name=ipaddress]").val(selip1[ind]);
        lgnip = selip1[ind];
    }
    if (selport.indexOf("@@@") >= 0) {
        var selport1 = selport.split("@@@");
//        document.getElementById("portnumber").value=selport1[ind];
//           $("input[name=portnumber]").val(selport1[ind]);  
        lgnport = selport1[ind];
    }
    if (selhostname.indexOf("@@@")) {
        var selhostname1 = selhostname.split("@@@");
//        $("input[name=hostname]").val(selhostname1[ind]); 
        lgnhostname = selhostname1[ind];
    }
    if (selusername.split("@@@")) {
        var selusername1 = selusername.split("@@@");
//        $("input[name=username]").val(selusername1[ind]);
        lgnusernm = selusername1[ind];
    }
    if (hospname.indexOf("@@@")) {
        var hospname1 = hospname.split("@@@");
//        $("input[name=hospname]").val(hospname1[ind]);
        lgnhospname = hospname1[ind];

    }
    if (password.indexOf("@@@")) {
        var password1 = password.split("@@@");
//        $("input[name=password]").val(password1[ind]);
        lgnpwd = password1[ind].toString().replace(/~/g, '@');
    }
    var path = "https://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/" + "login?username=" + lgnusernm + "&password=" + lgnpwd + "&type=login";
    if(localStorage.isHttp == 1){
        path = "http://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/" + "login?username=" + lgnusernm + "&password=" + lgnpwd + "&type=login";
    }
    var path1 = "https://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/";
    if(localStorage.isHttp == 1){
        path1 = "http://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/";
    }
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            $('#hdnrowid').val(id);
            $('#hdnpwd').val(lgnpwd);
            if (responseJson.length > 0) {
                debugger;

                if (responseJson[0]['ASKPWD'] === '1') {
                    $('#txtPwdCheck').val("");
                    $("#backlight").css("display", "block");
                    $('#myModalpassword').slideDown();
                    if (!checkUserExists(lgnusernm, lgnip, responseJson[0]['ASKPWD']))
                        userDetails.push({username: lgnusernm, askpwd: '1', ipadress: lgnip});
                } else {
                    onchangehosp(id);
                    if (!checkUserExists(lgnusernm, lgnip, responseJson[0]['ASKPWD']))
                        userDetails.push({username: lgnusernm, askpwd: '0', ipadress: lgnip});
                }
            }
            localStorage.setItem("userdetials", JSON.stringify(userDetails));
            console.log(localStorage.userdetials);
        },
        error: function (error) {

            if (error.statusText == "OK") {
                alert(error.responseText);
            } else {
                location.href = '404.html';
            }
        }
        //
    });
}
function showpwd(id) {
    if ($(id).is(":checked")) {
        $('#txtPwdCheck').attr("type", "text");
    } else {
        $('#txtPwdCheck').attr("type", "password");
    }
}
function passwordcheck() {
    var password = $('#txtPwdCheck').val();
    var lgnpwd = $('#hdnpwd').val();
    var id = $('#hdnrowid').val();
    if (password.toString().toUpperCase() !== lgnpwd.toString().toUpperCase()) {
        alert("Invalid Password For this user");
        return;
    } else {
        localStorage.donotaskpwd = 1;
        onchangehosp(id);
    }
}
function onchangehosp(id) {
    debugger;
    var ind = id;
    var selip = localStorage.ipsel;
    var selport = localStorage.ipport;
    var selhostname = localStorage.iphostname;
    var selusername = localStorage.ipusername;
    var hospname = localStorage.iphospname;
    var password = localStorage.ippassword;

    var lgnip = "";
    var lgnport = "";
    var lgnhostname = "";
    var lgnusernm = "";
    var lgnhospname = "";
    var lgnpwd = "";

    if (selip.indexOf("@@@") > 0) {
        var selip1 = selip.split("@@@");
//        $("input[name=ipaddress]").val(selip1[ind]);
        lgnip = selip1[ind];
    }
    if (selport.indexOf("@@@") >= 0) {
        var selport1 = selport.split("@@@");
//        document.getElementById("portnumber").value=selport1[ind];
//           $("input[name=portnumber]").val(selport1[ind]);  
        lgnport = selport1[ind];
    }
    if (selhostname.indexOf("@@@")) {
        var selhostname1 = selhostname.split("@@@");
//        $("input[name=hostname]").val(selhostname1[ind]); 
        lgnhostname = selhostname1[ind];
    }
    if (selusername.split("@@@")) {
        var selusername1 = selusername.split("@@@");
//        $("input[name=username]").val(selusername1[ind]);
        lgnusernm = selusername1[ind];
    }
    if (hospname.indexOf("@@@")) {
        var hospname1 = hospname.split("@@@");
//        $("input[name=hospname]").val(hospname1[ind]);
        lgnhospname = hospname1[ind];

    }
    if (password.indexOf("@@@")) {
        var password1 = password.split("@@@");
//        $("input[name=password]").val(password1[ind]);
        lgnpwd = password1[ind].toString().replace(/~/g, '@');
    }
    var path = "https://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/" + "login?username=" + lgnusernm + "&password=" + lgnpwd + "&type=login";
    var path1 = "https://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/";
    if(localStorage.isHttp == 1){
        path = "http://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/" + "login?username=" + lgnusernm + "&password=" + lgnpwd + "&type=login";
        path1 = "http://" + lgnip + ":" + lgnport + "/" + lgnhostname + "/";
    }
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            if (responseJson.length > 0) {
//                    alert('Login Successful');
                if ("iphospname" in localStorage) {
                    var lgnpwd1 = lgnpwd.replace(/@/g, '~');
                    if (localStorage.ipsel.toUpperCase().indexOf(lgnip.toUpperCase()) < 0 || (localStorage.ipport.toUpperCase().indexOf(lgnport.toUpperCase()) < 0) || (localStorage.iphostname.toUpperCase().indexOf(lgnhostname.toUpperCase()) < 0) || (localStorage.ipusername.toUpperCase().indexOf(lgnusernm.toUpperCase()) < 0) || (localStorage.iphospname.toUpperCase().indexOf(lgnhospname.toUpperCase()) < 0) || (localStorage.ippassword.toUpperCase().indexOf(lgnpwd1.toUpperCase()) < 0)) {
                        localStorage.ipsel = lgnip + "@@@" + localStorage.ipsel;
                        localStorage.ipport = lgnport + "@@@" + localStorage.ipport;
                        localStorage.iphostname = lgnhostname + "@@@" + localStorage.iphostname;
                        localStorage.ipusername = lgnusernm + "@@@" + localStorage.ipusername;
                        localStorage.iphospname = lgnhospname + "@@@" + localStorage.iphospname;
                        //alert("6--"+localStorage.iphospname);
                        localStorage.ippassword = lgnpwd.replace(/@/g, '~') + "@@@" + localStorage.ippassword;
                    }
                }
                else {
                    localStorage.ipsel = lgnip + "@@@" + (localStorage.ipsel === undefined ? "" : localStorage.ipsel);
                    localStorage.ipport = lgnport + "@@@" + (localStorage.ipport === undefined ? "" : localStorage.ipport);
                    localStorage.iphostname = lgnhostname + "@@@" + (localStorage.iphostname === undefined ? "" : localStorage.iphostname);
                    localStorage.ipusername = lgnusernm + "@@@" + (localStorage.ipusername === undefined ? "" : localStorage.ipusername);
                    localStorage.iphospname = lgnhospname + "@@@" + (localStorage.iphospname === undefined ? "" : localStorage.iphospname);
                    //confirm("7"+localStorage.iphospname);
                    localStorage.ippassword = lgnpwd.replace(/@/g, '~') + "@@@" + (localStorage.ippassword === undefined ? "" : localStorage.ippassword);
                }

                localStorage.ipadrs = path1;
                localStorage.fromdt = responseJson[0]["SERVERDATE"];
                localStorage.todt = responseJson[0]["SERVERDATE"];
                localStorage.usernm = responseJson[0]['USERNM'];
                localStorage.userid = responseJson[0]['USERID'];
                localStorage.ipaddres = lgnip;
                localStorage.portno = lgnport;
                localStorage.hostname = lgnhostname;
                localStorage.pwd = lgnpwd;
                localStorage.hospname = lgnhospname;
                var notoff = "0";
                notoff = localStorage.notificationoff;
                if (notoff != "1") {
                    saveRegid(localStorage.deviceregid);
                }

                //location.href = 'locations.html'
                var path = localStorage.ipadrs + "login?type=loc&usernm=" + localStorage.usernm + "&pwd=" + localStorage.pwd + "&userid=" + localStorage.userid;
                debugger;
                var row = "";
                $.ajax({
                    url: path,
                    type: "GET",
                    dataType: "json",
                    success: function (responseJson) {
                        debugger;
                        try {

                            var reslength = responseJson.length;

                            if (reslength > 1)
                            {
                                location.href = 'locations.html';
                            }
                            else
                            {
                                localStorage.locid = responseJson[0]["LOCID"];
                                localStorage.locnm = responseJson[0]["LOCNM"];
//                    location.href = "subdepts.html";
                                var path = localStorage.ipadrs + "login?type=subdepts&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid;
                                var row = "";
                                $.ajax({
                                    url: path,
                                    type: "GET",
                                    dataType: "json",
                                    success: function (responseJson) {
                                        debugger;
                                        if (responseJson.length > 0) {
                                            if (responseJson.length == 1) {

                                                localStorage.subdeptid = responseJson[0]['SDEPTID'];
                                                localStorage.subdeptnm = responseJson[0]['SUBDEPTNM'];
                                                localStorage.sdeptid = responseJson[0]['SDEPTID'];
                                                localStorage.deptid = responseJson[0]['DEPTID'];
                                                localStorage.deptnm = responseJson[0]['DEPTNM'];
                                                $('#mydiv').hide();
                                                /// location.href = "dashboardmenu.html";
                                                var path = localStorage.ipadrs + "/dashboardmenu?userid=" + localStorage.userid + "&mobnewflg=1&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid + "&locnm=" + localStorage.locnm;
                                                var row = "";
                                                $.ajax({
                                                    url: path,
                                                    type: "GET",
                                                    dataType: "json",
                                                    success: function (responseJson) {
                                                        debugger;

                                                        if (responseJson.length === 1 && responseJson[0]["TYPE"] !== '2') {
//                                                alert("res--" + responseJson[0]["WEBFORMID"]);
                                                            localStorage.formid = responseJson[0]["WEBFORMID"];
                                                            localStorage.menubuttonformid = responseJson[0]["WEBFORMID"];
                                                            localStorage.frmtype = responseJson[0]["TYPE"];
                                                            localStorage.newbuild = "";
                                                            //localStorage.formid = th;
                                                            ///localStorage.menubuttonformid = th;
//                                                localStorage.frmtype = type;
//                                                localStorage.newbuild = newbuild;
//                                                $('#mydiv').hide();
                                                            //location.href = 'dashboardmenubuttons.html';
                                                            var path1 = localStorage.ipadrs;
                                                            var formid = localStorage.menubuttonformid;
                                                            var locid = localStorage.locid;
                                                            path1 = path1 + "/DashboardMenuMobileAll?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
                                                            $.post(path1, function (responseJson) {
                                                                try {
                                                                  //  alert("--" + responseJson.length);
                                                                    if (responseJson.length == 1)
                                                                    {
                                                                        var pageid = responseJson[0]["QUERYDATA"];
                                                                        var rights = responseJson[0]["RIGHTS"];
                                                                        var formtemptype = responseJson[0]["FORMTEMPTYPE"];
                                                                        //confirm(formtemptype);
                                                                        if(formtemptype == "6"){
                                                                            rights = formtemptype;
                                                                        }
                                                                        loadpage(pageid, rights);
                                                                    }
                                                                    else
                                                                    {
                                                                        location.href = 'dashboardmenubuttons.html';
                                                                    }
                                                                    //console.log(responseText);

                                                                } catch (err) {
                                                                    $('#mydiv').hide();
                                                                }
                                                                $("#Date1").datepicker({
                                                                    dateFormat: 'dd/mm/yy'
                                                                });
                                                                var neosoftmenu = getParameterByName("neosoftmenu");
                                                                if (neosoftmenu == "1") {
                                                                    localStorage.removeItem("disback");
                                                                    loadmultipleforms();
                                                                } else {
                                                                    localStorage.neosoftmenuflg = "0";
                                                                    loadsingle()
                                                                }
                                                            });
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
                                                                // getmenu(responseJson[0]["WEBFORMID"], responseJson[0]["TYPE"], localStorage.newbuild);
                                                            }
                                                        } else {
                                                            location.href = "dashboardmenu.html";

//                 row = row + " <div class='col-md-4 col-sm-6 col-xs-12'> " +
//                            "<div class='info-box' style='cursor:pointer'> " +
//                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-list-alt'>" +
//                            "</span></span>" +
//                            "<div class='info-box-content'>" +
//                            "<span class='info-box-text'></span>" +
//                            "<span class='info-box-number'><br><a href='backspace.html'>back</a></span>" +
//                            "</div>  </div> </div> ";

                                                            $('#divmenu').html(row);
                                                            $('#mydiv').hide();
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
                                            else
                                            {
                                                location.href = "subdepts.html";
                                                var path = localStorage.ipadrs + "/dashboardmenu?userid=" + localStorage.userid + "&mobnewflg=1&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid + "&locnm=" + localStorage.locnm;
                                                var row = "";
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
                                                                row = row + " <div class='col-md-4 col-sm-6 col-xs-12'> " +
                                                                        "<div class='info-box' style='cursor:pointer' onclick=getmenu('" + responseJson[i]["WEBFORMID"] + "','" + responseJson[i]["TYPE"] + "','" + newbuild + "')> " +
                                                                        "<span class='info-box-icon bg-" + color + "'><span class='fa fa-list-alt'>" +
                                                                        "</span></span>" +
                                                                        "<div class='info-box-content'>" +
                                                                        "<span class='info-box-text'></span>" +
                                                                        "<span class='info-box-number'><br><a  >" + responseJson[i]["FORMNAME"] + "</a></span>" +
                                                                        "</div>  </div> </div> ";
                                                            }
//                 row = row + " <div class='col-md-4 col-sm-6 col-xs-12'> " +
//                            "<div class='info-box' style='cursor:pointer'> " +
//                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-list-alt'>" +
//                            "</span></span>" +
//                            "<div class='info-box-content'>" +
//                            "<span class='info-box-text'></span>" +
//                            "<span class='info-box-number'><br><a href='backspace.html'>back</a></span>" +
//                            "</div>  </div> </div> ";

                                                            $('#divmenu').html(row);
                                                            $('#mydiv').hide();
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

                                        }
                                        else {
                                            localStorage.subdeptid = '';
                                            localStorage.subdeptnm = '';
                                            try {
                                                navigator.notification.alert(
                                                        "No Department Assigned To This User,Please Assign The Department to user or change the Location", // message
                                                        null, // callback
                                                        "Shivam CRM", // title
                                                        'OK'        // buttonName
                                                        );
//    $("input[name=username]").focus();
                                                localStorage.existfornodept = "1";
                                                location.href = "index.html";
                                                return;

                                            } catch (err) {
                                                alert("No Department Assigned To This User,Please Assign The Department to user or change the Location");
//		     $("input[name=username]").focus();
                                                localStorage.existfornodept = "1";
                                                location.href = "index.html";
                                                return;

                                            }

                                            location.href = "locations.html";
                                            var menu = "0";
                                            try {
                                                menu = localStorage.ismenu;
                                            } catch (err) {
                                                // menu = "0"
                                            }
                                            $('#mydiv').hide();
                                            if (menu === "1") {
                                                location.href = "locations.html";
                                                localStorage.ismenu = "0"
                                            } else {
                                                location.href = "dashboardmenu.html";
                                            }

                                        }
                                    },
                                    error: function (error) {
                                        $('#mydiv').hide();
                                        if (error.statusText == "OK") {
                                            alert(error.responseText);
                                        } else {
                                            location.href = '404.html'
                                        }
                                        $('#mydiv').hide();
                                    }
                                });
                            }


                            var platform = device.platform;
                            if (platform.toUpperCase() === "ANDROID") {
                                navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo);
                            }

                        } catch (err) {

                        }
                        try {
                            networkinterface.getWiFiIPAddress(function (ip) {
                                localStorage.wifiipadress = ip
                            });
                            localStorage.model = device.model;
                        } catch (err) {

                        }




                        var msg = responseJson.message;
                        if (typeof (msg) != "undefined")
                        {
                            alert(msg);
                            localStorage.settings = 1;
                            $('#mydiv').hide();
                            location.href = "index.html";
                        }

                        try {
                            if (responseJson.length == 1) {
                                localStorage.locid = responseJson[0]['LOCID'];
                                localStorage.locnm = responseJson[0]['LOCNM'];
                                if (localStorage.getItem("exit") === null) {
                                    $('#mydiv').hide();
                                    // location.href = "subdepts.html";
                                } else {
                                    $('#mydiv').hide();
                                    location.href = "Entrence.html";
                                    localStorage.removeItem("exit");
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
                                    row = row + " <div class=' col-md-4 col-sm-6 col-xs-12'> " +
                                            "<div class='info-box' style='cursor:pointer' onclick=getlocid('" + responseJson[i]["LOCID"] + "','" + responseJson[i]["LOCNM"] + "')  > " +
                                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-map-marker'>" +
                                            "</span></span>" +
                                            "<div class='info-box-content'>" +
                                            "<span class='info-box-text'></span>" +
                                            "<span class='info-box-number'><br><a >" + responseJson[i]["LOCNM"] + "</a></span>" +
                                            "</div>  </div> </div> ";
                                    localStorage.fromdt = responseJson[i]['SERVERDATE'];
                                    localStorage.todt = responseJson[i]['SERVERDATE'];

                                }
                                $('#mydiv').hide();
                                $('#divlocation').html(row);
                            }
                        } catch (err) {
                            alert(err);
                        }
                    },
                    error: function (error) {

                        if (error.statusText == "OK") {
                            $('#mydiv').hide();
                            alert(error.responseText);
                        } else {
                            $('#mydiv').hide();
                            location.href = '404.html'
                        }
                    }
                });
            } else {
                alert('UsreName/Password is wrong! Please Login Again');
                localStorage.settings = 1;
                location.href = "index.html";
            }

        },
        error: function (error) {

            if (error.statusText == "OK") {
                alert(error.responseText);
            } else {
                location.href = '404.html';
            }
        }
    });
}

function getlocid(locid) {
    localStorage.locid = locid;
    location.href = 'dashboardmenu.html';
}
function settings() {
    location.href = 'settings.html';
}
function checkUserExists(user, ipadress, askpwd) {
    debugger;

    var isExist = false;
    try {
        if (localStorage.getItem("userdetials") !== null) {
            var arr = JSON.parse(localStorage.getItem('userdetials'));
            for (var u = 0; u < arr.length; u++) {
                if (arr[u]["ipadress"].toUpperCase() === ipadress && arr[u]["username"].toUpperCase() === user.toUpperCase()) {
                    if (arr[u]["askpwd"] === askpwd) {

                    } else {
                        var userDetails = [];
                        arr.splice(u, 1);
                        if (arr.length === 0) {
                            localStorage.setItem("userdetials", "");
                            userDetails.push({username: user, askpwd: askpwd, ipadress: ipadress});
                            localStorage.setItem("userdetials", JSON.stringify(userDetails));
                            return true;
                        } else {
                            arr.push({username: user, askpwd: askpwd, ipadress: ipadress});
                        }
                        localStorage.setItem("userdetials", "");
                        for (var i = 0; i < arr.length; i++) {
                            userDetails.push({username: arr[i]["username"], askpwd: arr[i]["askpwd"], ipadress: arr[i]["ipadress"]});
                            localStorage.setItem("userdetials", JSON.stringify(userDetails));
                        }
                    }
                    isExist = true;
                }
            }

            //  localStorage.setItem( "userdetials", JSON.stringify(arr) );
        } else {
            var userDetails = [];
            userDetails.push({username: user, askpwd: askpwd, ipadress: ipadress});
            // localStorage.setItem("userdetials",JSON.stringify(userDetails));
        }
    } catch (err) {
    }
    return isExist;

}
