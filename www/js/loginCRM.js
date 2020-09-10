/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function DeviceregonDeviceReady() {
    var manufacturer = "", platform = "", uuid = "";
    try {
        platform = device.platform;

    } catch (err) {
        platform = "";
    }
    localStorage.platform = platform;
    try {
        manufacturer = device.manufacturer;

    } catch (err) {
        manufacturer = "";
    }
    localStorage.manufacturer = manufacturer;
    try {
        uuid = device.uuid;

    } catch (err) {
        uuid = "";
    }
    localStorage.uuid = uuid;

    try {

        debugger;
        //ref = cordova.InAppBrowser.open("https://www.npmjs.com/package/phonegap-plugin-push-pgb", '_blank', 'location=no,toolbar=yes,closebuttoncaption=Close');
        try {
            var i, link_tag ;
            var isExists = 0;
                              link_tag = document.getElementsByTagName("link") ;
    var css_title = localStorage.themecolor;
            StatusBar.backgroundColorByHexString("#31708F");
            if(css_title != undefined && css_title != ""){
                 for (i = 0, link_tag = document.getElementsByTagName("link"); i < link_tag.length ; i++ ) {
             if ((link_tag[i].rel.indexOf( "stylesheet" ) !== -1) &&
                 link_tag[i].title) {
                 if (link_tag[i].title === css_title) {
                     isExists = 1;
                 }
             }
         }
                if (css_title === "orange") {
                    StatusBar.backgroundColorByHexString("#c72915");
                    }
                    else if (css_title === "green"){
                         StatusBar.backgroundColorByHexString("#496b03");
                    }
                    else if (css_title === "blue"){
                         StatusBar.backgroundColorByHexString("#033261");
                    }
                    else if (css_title === "teal"){
                         StatusBar.backgroundColorByHexString("#00635f");
                    }
                    else if (css_title === "yellow"){
                         StatusBar.backgroundColorByHexString("#5e6100");
                    }
                    else if (css_title === "gray"){
                         StatusBar.backgroundColorByHexString("#383838");
                    }
                    else if (css_title === "peach"){
                         StatusBar.backgroundColorByHexString("#a04d00");
                    }
                    else if (css_title === "pink"){
                         StatusBar.backgroundColorByHexString("#ca1967");
                    }
                    else if (css_title === "purple"){
                         StatusBar.backgroundColorByHexString("#37196f");
                    }
                    else if (css_title === "red"){
                         StatusBar.backgroundColorByHexString("#4b0150");
                    }
                    else if (css_title === "skyblue"){
                         StatusBar.backgroundColorByHexString("#005b65");
                    }
                    else if (css_title === "yellownew"){
                         StatusBar.backgroundColorByHexString("#946e00");
                    }
                    }
                     if(isExists == 0){
         var color = localStorage.themecolor;
         color = color.replace("%23","#");
         //confirm(color);
         chnagecssnew(color);
         //confirm(cssdata);
     }
        } catch (err) {
//	    alert(err);
        }
        var push = PushNotification.init({
            android: {
                senderID: "940836237549"
            },
            browser: {
                pushServiceURL: 'https://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });
        push.on('registration', function (data) {
            var deviceregid = data.registrationId;
            localStorage.deviceregid = deviceregid;
//                        saveRegid(data.registrationId);
        });

    } catch (err) {
//	alert(err);
    }
    try{
                    if(localStorage.devicetype.toLowerCase()==='iphone' || localStorage.devicetype.toLowerCase()==='ipad'){
//                         confirm(localStorage.devicetype); 
                        $('.iosstatusbar').css('display','block');
                    }
    }catch(err){}
}
$(document).ready(function () {
    try {

    } catch (err) {

    }

});

function subdepartments(locationid) {
    debugger;
    var path = localStorage.ipadrs + "login?type=subdepts&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm + "&locid=" + locationid;
    var row = "";
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            debugger;
            if (responseJson.length > 0) {
                if (responseJson.length === 1) {
                    var exitfrom = getParameterByName("exitfrom");
                    if (exitfrom === "1") {
                        logout();
                        return;
                    }
                    alert(responseJson[0]['SDEPTID']);
                    localStorage.subdeptid = responseJson[0]['SDEPTID'];
                    localStorage.subdeptnm = responseJson[0]['SUBDEPTNM'];
                    localStorage.sdeptid = responseJson[0]['SDEPTID'];
                    localStorage.deptid = responseJson[0]['DEPTID'];
                    localStorage.deptnm = responseJson[0]['DEPTNM'];
                    $('#mydiv').hide();
                    location.href = "dashboardmenu.html";
                }
                else if (responseJson.length > 0) {

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
                                "<div class='info-box' style='cursor:pointer' onclick=getsubdeptid('" + responseJson[i]["SDEPTID"] + "','" + responseJson[i]["DEPTID"] + "')  > " +
                                "<span class='info-box-icon bg-" + color + "'><span class='fa fa-building'>" +
                                "</span></span>" +
                                "<div class='info-box-content'>" +
                                "<span class='info-box-text'></span>" +
                                "<span class='info-box-number'><br><a >" + responseJson[i]["SUBDEPTNM"] + "</a></span>" +
                                "</div>  </div> </div> ";

                    }
                    $('#mydiv').hide();
                    $('#divsubdepts').html(row);
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
function location1(userid) {
    var path = localStorage.ipadrs + "login?type=loc&usernm=" + localStorage.usernm + "&pwd=" + localStorage.pwd + "&userid=" + userid;
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
                localStorage.appcheck = responseJson[0]["NEWFLG"];
                localStorage.loclen = reslength;
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
                                localStorage.subdeptlen = responseJson.length;
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
                                            localStorage.dashboardmenulen = responseJson.length;
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
                                                if (localStorage.appcheck == "1") {
                                                    $.post(path1, function (responseJson) {
                                                        try {
                                                            // alert("--"+responseJson.length);
                                                            if (responseJson.length == 1)
                                                            {
                                                                var pageid = responseJson[0]["QUERYDATA"];
                                                                var rights = responseJson[0]["RIGHTS"];
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
//                                                        $("#Date1").datepicker({
//                                                            dateFormat: 'dd/mm/yy'
//                                                        });
//                                                        var neosoftmenu = getParameterByName("neosoftmenu");
//                                                        if (neosoftmenu == "1") {
//                                                            localStorage.removeItem("disback");
//                                                            loadmultipleforms();
//                                                        } else {
//                                                            localStorage.neosoftmenuflg = "0";
//                                                            loadsingle()
//                                                        }
                                                    });
                                                } else {

                                                    location.href = 'dashboardmenubuttons.html';
//                                                    $("#Date1").datepicker({
//                                                        dateFormat: 'dd/mm/yy'
//                                                    });
//                                                    var neosoftmenu = getParameterByName("neosoftmenu");
//                                                    if (neosoftmenu == "1") {
//                                                        localStorage.removeItem("disback");
//                                                        loadmultipleforms();
//                                                    } else {
//                                                        localStorage.neosoftmenuflg = "0";
//                                                        loadsingle()
//                                                    }
                                                }
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
}
$(document).ready(function () {
    $('#btnConnect').click(function () {
        debugger;
        var uuid = "";
        var manufacturer = "", platform = "", regid = "", deviceregid = "";
        try {
            manufacturer = localStorage.manufacturer;
            platform = localStorage.platform;
            deviceregid = localStorage.deviceregid;
            uuid = localStorage.uuid;
        } catch (err) {

        }
        getIp();
        var userDetails = [];
        var ipaddress = $("input[name=ipaddress]").val().trim();
        var port = $("input[name=portnumber]").val().trim();
        var hostname = $("input[name=hostname]").val().trim();
        var username = $("input[name=username]").val().trim();
        var password = $("input[name=password]").val().trim();
        var hospname = $("input[name=hospname]").val().trim();
         if(hospname.trim() == ""){
            alert("Please enter the Hospital Name");
            $("input[name=hospname]").focus();
            return false;
        }
        if(ipaddress.trim() == ""){
            alert("Please enter the IP Address");
            $("input[name=ipaddress]").focus();
            return false;
        }
        if(port.trim() == ""){
            alert("Please enter the Port Number");
            $("input[name=portnumber]").focus();
            return false;
        }
        if(hostname.trim() == ""){
            alert("Please enter the Host Name");
            $("input[name=hostname]").focus();
            return false;
        }
        if(username.trim() == ""){
            alert("Please enter the User Name");
            $("input[name=username]").focus();
            return false;
        }
        if(password.trim() == ""){
            alert("Please enter the Password");
            $("input[name=password]").focus();
            return false;
        }
        var path = "http://" + ipaddress + ":" + port + "/" + hostname + "/" + "login?regid=" + deviceregid + "&uuid=" + uuid + "&apptype=dashboard&platform=" + platform + "&devicenm=" + manufacturer + "&username=" + username + "&password=" + password + "&type=login";
        var path1 = "http://" + ipaddress + ":" + port + "/" + hostname + "/";
        var server = "http://" + ipaddress + ":" + port;
        localStorage.server = server;
        localStorage.isHttp = 1;
//        if ("iphospname" in localStorage) {
//            var unm = localStorage.ipusername;
//            var pwd = localStorage.ippassword;
//            var iphpnm = localStorage.iphospname;
//            var hospnamelen = iphpnm.split("@@@");
//            var unmlen = unm.split("@@@");
//            var pwdlen = pwd.split("@@@");
//
//            if ("edituserval" in localStorage) {
//
//            } else {
//                for (var j = 0; j < hospnamelen.length; j++) {
//                    if (hospnamelen[j].toUpperCase() === hospname.toUpperCase()) {
//                        if (unmlen[j].toUpperCase() != username.toUpperCase() && pwdlen[j].toUpperCase() != password.toUpperCase())
//                        {
//                            try {
//                                navigator.notification.alert(
//                                        "Hospital Name Should  Not Be Same,Please Change The Hospital Name", // message
//                                        null, // callback
//                                        "Shivam CRM", // title
//                                        'OK'        // buttonName
//                                        );
//                                $("input[name=hospname]").focus();
//                                return;
//
//                            } catch (err) {
//                                alert("Hospital Name Should   Not Be Same,Please Change The Hospital Name");
//                                $("input[name=hospname]").focus();
//                                return;
//
//                            }
//                        }
//
//                    }
//                }
//            }
//        }
        
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {
                if (responseJson.length > 0) {
//		 
                    try {
                        navigator.notification.alert(
                                "Login Successful", // message
                                null, // callback
                                "Shivam CRM", // title
                                'OK'        // buttonName
                                );
                    } catch (err) {
                        alert('Login Successful');

                    }
                    debugger;
                    if (localStorage.getItem("userdetials") !== null) {
                        userDetails = JSON.parse(localStorage.getItem('userdetials'));
                    }
                    if ("iphospname" in localStorage) {
                        if ("edituserval" in localStorage) {
                            var idval = localStorage.edituserval;

                            deleteUser(idval, hospname, username, password.replace(/@/g, '~'), ipaddress, port, hostname);
                        }
                        if (localStorage.ipsel.toUpperCase().indexOf(ipaddress.toUpperCase()) < 0 || (localStorage.ipport.toUpperCase().indexOf(port.toUpperCase()) < 0) || (localStorage.iphostname.toUpperCase().indexOf(hostname.toUpperCase()) < 0) || (localStorage.ipusername.toUpperCase().indexOf(username.toUpperCase()) < 0) || (localStorage.iphospname.toUpperCase().indexOf(hospname.toUpperCase()) < 0) || (localStorage.ippassword.toUpperCase().indexOf(password.toUpperCase()) < 0)) {
                            localStorage.ipsel = ipaddress + "@@@" + localStorage.ipsel;
                            localStorage.ipport = port + "@@@" + localStorage.ipport;
                            localStorage.iphostname = hostname + "@@@" + localStorage.iphostname;
                            localStorage.ipusername = username + "@@@" + localStorage.ipusername;
                            localStorage.iphospname = hospname + "@@@" + localStorage.iphospname;
                            localStorage.ippassword = password.replace(/@/g, '~') + "@@@" + localStorage.ippassword;
                        }
//                        if (localStorage.ipport.toUpperCase().indexOf(port.toUpperCase()) < 0) {
//                            localStorage.ipport = port + "@@@" + localStorage.ipport;
//                        }
//                        if (localStorage.iphostname.toUpperCase().indexOf(hostname.toUpperCase()) < 0) {
//                            localStorage.iphostname = hostname + "@@@" + localStorage.iphostname;
//                        }
//                        if (localStorage.ipusername.toUpperCase().indexOf(username.toUpperCase()) < 0) {
//                            localStorage.ipusername = username + "@@@" + localStorage.ipusername;
//                        }
//                        if (localStorage.iphospname.toUpperCase().indexOf(hospname.toUpperCase()) < 0) {
//                            localStorage.iphospname = hospname + "@@@" + localStorage.iphospname;
//                        }
//                        if (localStorage.ippassword.toUpperCase().indexOf(password.toUpperCase()) < 0) {
//                            localStorage.ippassword = password.replace(/@/g, '~') + "@@@" + localStorage.ippassword;
//                        }
                    }
                    else {
                        localStorage.ipsel = ipaddress + "@@@" + (localStorage.ipsel === undefined ? "" : localStorage.ipsel);
                        localStorage.ipport = port + "@@@" + (localStorage.ipport === undefined ? "" : localStorage.ipport);
                        localStorage.iphostname = hostname + "@@@" + (localStorage.iphostname === undefined ? "" : localStorage.iphostname);
                        localStorage.ipusername = username + "@@@" + (localStorage.ipusername === undefined ? "" : localStorage.ipusername);
                        localStorage.iphospname = hospname + "@@@" + (localStorage.iphospname === undefined ? "" : localStorage.iphospname);
                        //alert("3"+localStorage.iphospname);
                        localStorage.ippassword = password.replace(/@/g, '~') + "@@@" + (localStorage.ippassword === undefined ? "" : localStorage.ippassword);
                    }
                    localStorage.ipadrs = path1;
                    localStorage.fromdt = responseJson[0]["SERVERDATE"];
                    localStorage.todt = responseJson[0]["SERVERDATE"];
                    localStorage.usernm = responseJson[0]['USERNM'];
                    localStorage.userid = responseJson[0]['USERID'];
                    localStorage.ipaddres = ipaddress;
                    localStorage.portno = port;
                    localStorage.hostname = hostname;
                    localStorage.pwd = password;
                    localStorage.hospname = hospname;
                    localStorage.appurl = path1;
                    if (localStorage.getItem("tempipaddress") !== null) {
                        localStorage.removeItem("tempipaddress");
                        localStorage.removeItem("tempport");
                        localStorage.removeItem("tempusername");
                        localStorage.removeItem("temppassword");
                        localStorage.removeItem("temphospname");
                        localStorage.removeItem("temphostname");
                    }
                    localStorage.appname = 'dashboard';
                    if (!checkUserExists(username, ipaddress, responseJson[0]["ASKPWD"])) {
                        userDetails.push({username: username, askpwd: responseJson[0]["ASKPWD"], ipadress: ipaddress});
                        localStorage.setItem("userdetials", JSON.stringify(userDetails));
                    }
//                    location.href = 'deviceregistration.html';

//hek if user have more than on location
                    //if yes then
                    location1(localStorage.userid);
                    // alert(loc);
                    //  location.href = 'locations.html';
//else (meANS user have only one loction) 
                    // check if user has more than one department 
                    //if yes then call depattment.html
                    //else (means user have only one department)
                    // then cCHECK IF USER has more than one subdepartment
                    //if yes then call subdepartments.html
                    //else (means user has only one subdepartment)
                    //then check if user has more than one user type
                    //if yes then call usertypes.html
                    //else (means user has only one user type
                    // then check if user has more than one form assigned in the user type
                    //if yes call the forms.html
                    // else (means user has only one form)
                    // open the form diretly.



                } else {
//		    alert('UsreName/Password is wrong!');
                    try {
                        navigator.notification.alert(
                                "UsreName/Password is wrong!", // message
                                null, // callback
                                "Shivam CRM", // title
                                'OK'        // buttonName
                                );
                    } catch (err) {
                        alert('UsreName/Password is wrong!');

                    }
                }

            },
            error: function (error) {
                //confirm(error+"---"+error.responseText+"--"+path);
                localStorage.tempipaddress = ipaddress;
                localStorage.tempport = port;
                localStorage.tempusername = username;
                localStorage.temppassword = password;
                localStorage.temphospname = hospname;
                localStorage.temphostname = hostname;
                if (error.statusText == "OK") {
                    alert(error.responseText);
                } else {
                    callWithHttp();
                    //location.href = '404.html';
                }
            }
        });
                    var i, link_tag ;
                    var isExists = 0;
                              link_tag = document.getElementsByTagName("link") ;
    var css_title = localStorage.themecolor;
            if(css_title != undefined && css_title != ""){
                for (i = 0, link_tag = document.getElementsByTagName("link"); i < link_tag.length ; i++ ) {
             if ((link_tag[i].rel.indexOf( "stylesheet" ) !== -1) &&
                 link_tag[i].title) {
                 if (link_tag[i].title === css_title) {
                     isExists = 1;
                 }
             }
         }
                if (css_title === "orange") {
                    StatusBar.backgroundColorByHexString("#c72915");
                    }
                    else if (css_title === "green"){
                         StatusBar.backgroundColorByHexString("#496b03");
                    }
                    else if (css_title === "blue"){
                         StatusBar.backgroundColorByHexString("#033261");
                    }
                    else if (css_title === "teal"){
                         StatusBar.backgroundColorByHexString("#00635f");
                    }
                    else if (css_title === "yellow"){
                         StatusBar.backgroundColorByHexString("#5e6100");
                    }
                    else if (css_title === "gray"){
                         StatusBar.backgroundColorByHexString("#383838");
                    }
                    else if (css_title === "peach"){
                         StatusBar.backgroundColorByHexString("#a04d00");
                    }
                    else if (css_title === "pink"){
                         StatusBar.backgroundColorByHexString("#ca1967");
                    }
                    else if (css_title === "purple"){
                         StatusBar.backgroundColorByHexString("#37196f");
                    }
                    else if (css_title === "red"){
                         StatusBar.backgroundColorByHexString("#4b0150");
                    }
                    else if (css_title === "skyblue"){
                         StatusBar.backgroundColorByHexString("#005b65");
                    }
                    else if (css_title === "yellownew"){
                         StatusBar.backgroundColorByHexString("#946e00");
                    }
                    }
                     if(isExists == 0){
         var color = localStorage.themecolor;
         color = color.replace("%23","#");
         //confirm(color);
         chnagecssnew(color);
         //confirm(cssdata);
     }
    })
});
function callWithHttp(){
        debugger;
        var uuid = "";
        localStorage.isHttp = 0;
        //confirm(localStorage.isHttp);
        var manufacturer = "", platform = "", regid = "", deviceregid = "";
        try {
            manufacturer = localStorage.manufacturer;
            platform = localStorage.platform;
            deviceregid = localStorage.deviceregid;
            uuid = localStorage.uuid;
        } catch (err) {

        }
        getIp();
        var userDetails = [];
        var ipaddress = $("input[name=ipaddress]").val().trim();
        var port = $("input[name=portnumber]").val().trim();
        var hostname = $("input[name=hostname]").val().trim();
        var username = $("input[name=username]").val().trim();
        var password = $("input[name=password]").val().trim();
        var hospname = $("input[name=hospname]").val().trim();
         if(hospname.trim() == ""){
            alert("Please enter the Hospital Name");
            $("input[name=hospname]").focus();
            return false;
        }
        if(ipaddress.trim() == ""){
            alert("Please enter the IP Address");
            $("input[name=ipaddress]").focus();
            return false;
        }
        if(port.trim() == ""){
            alert("Please enter the Port Number");
            $("input[name=portnumber]").focus();
            return false;
        }
        if(hostname.trim() == ""){
            alert("Please enter the Host Name");
            $("input[name=hostname]").focus();
            return false;
        }
        if(username.trim() == ""){
            alert("Please enter the User Name");
            $("input[name=username]").focus();
            return false;
        }
        if(password.trim() == ""){
            alert("Please enter the Password");
            $("input[name=password]").focus();
            return false;
        }
        var path = "https://" + ipaddress + ":" + port + "/" + hostname + "/" + "login?regid=" + deviceregid + "&uuid=" + uuid + "&apptype=dashboard&platform=" + platform + "&devicenm=" + manufacturer + "&username=" + username + "&password=" + password + "&type=login";
        var path1 = "https://" + ipaddress + ":" + port + "/" + hostname + "/";
        var server = "https://" + ipaddress + ":" + port;
        localStorage.server = server;
//        if ("iphospname" in localStorage) {
//            var unm = localStorage.ipusername;
//            var pwd = localStorage.ippassword;
//            var iphpnm = localStorage.iphospname;
//            var hospnamelen = iphpnm.split("@@@");
//            var unmlen = unm.split("@@@");
//            var pwdlen = pwd.split("@@@");
//
//            if ("edituserval" in localStorage) {
//
//            } else {
//                for (var j = 0; j < hospnamelen.length; j++) {
//                    if (hospnamelen[j].toUpperCase() === hospname.toUpperCase()) {
//                        if (unmlen[j].toUpperCase() != username.toUpperCase() && pwdlen[j].toUpperCase() != password.toUpperCase())
//                        {
//                            try {
//                                navigator.notification.alert(
//                                        "Hospital Name Should  Not Be Same,Please Change The Hospital Name", // message
//                                        null, // callback
//                                        "Shivam CRM", // title
//                                        'OK'        // buttonName
//                                        );
//                                $("input[name=hospname]").focus();
//                                return;
//
//                            } catch (err) {
//                                alert("Hospital Name Should   Not Be Same,Please Change The Hospital Name");
//                                $("input[name=hospname]").focus();
//                                return;
//
//                            }
//                        }
//
//                    }
//                }
//            }
//        }
        
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {
                if (responseJson.length > 0) {
//		 
                    try {
                        navigator.notification.alert(
                                "Login Successful", // message
                                null, // callback
                                "Shivam CRM", // title
                                'OK'        // buttonName
                                );
                    } catch (err) {
                        alert('Login Successful');

                    }
                    debugger;
                    if (localStorage.getItem("userdetials") !== null) {
                        userDetails = JSON.parse(localStorage.getItem('userdetials'));
                    }
                    if ("iphospname" in localStorage) {
                        if ("edituserval" in localStorage) {
                            var idval = localStorage.edituserval;

                            deleteUser(idval, hospname, username, password.replace(/@/g, '~'), ipaddress, port, hostname);
                        }
                        if (localStorage.ipsel.toUpperCase().indexOf(ipaddress.toUpperCase()) < 0 || (localStorage.ipport.toUpperCase().indexOf(port.toUpperCase()) < 0) || (localStorage.iphostname.toUpperCase().indexOf(hostname.toUpperCase()) < 0) || (localStorage.ipusername.toUpperCase().indexOf(username.toUpperCase()) < 0) || (localStorage.iphospname.toUpperCase().indexOf(hospname.toUpperCase()) < 0) || (localStorage.ippassword.toUpperCase().indexOf(password.toUpperCase()) < 0)) {
                            localStorage.ipsel = ipaddress + "@@@" + localStorage.ipsel;
                            localStorage.ipport = port + "@@@" + localStorage.ipport;
                            localStorage.iphostname = hostname + "@@@" + localStorage.iphostname;
                            localStorage.ipusername = username + "@@@" + localStorage.ipusername;
                            localStorage.iphospname = hospname + "@@@" + localStorage.iphospname;
                            localStorage.ippassword = password.replace(/@/g, '~') + "@@@" + localStorage.ippassword;
                        }
//                        if (localStorage.ipport.toUpperCase().indexOf(port.toUpperCase()) < 0) {
//                            localStorage.ipport = port + "@@@" + localStorage.ipport;
//                        }
//                        if (localStorage.iphostname.toUpperCase().indexOf(hostname.toUpperCase()) < 0) {
//                            localStorage.iphostname = hostname + "@@@" + localStorage.iphostname;
//                        }
//                        if (localStorage.ipusername.toUpperCase().indexOf(username.toUpperCase()) < 0) {
//                            localStorage.ipusername = username + "@@@" + localStorage.ipusername;
//                        }
//                        if (localStorage.iphospname.toUpperCase().indexOf(hospname.toUpperCase()) < 0) {
//                            localStorage.iphospname = hospname + "@@@" + localStorage.iphospname;
//                        }
//                        if (localStorage.ippassword.toUpperCase().indexOf(password.toUpperCase()) < 0) {
//                            localStorage.ippassword = password.replace(/@/g, '~') + "@@@" + localStorage.ippassword;
//                        }
                    }
                    else {
                        localStorage.ipsel = ipaddress + "@@@" + (localStorage.ipsel === undefined ? "" : localStorage.ipsel);
                        localStorage.ipport = port + "@@@" + (localStorage.ipport === undefined ? "" : localStorage.ipport);
                        localStorage.iphostname = hostname + "@@@" + (localStorage.iphostname === undefined ? "" : localStorage.iphostname);
                        localStorage.ipusername = username + "@@@" + (localStorage.ipusername === undefined ? "" : localStorage.ipusername);
                        localStorage.iphospname = hospname + "@@@" + (localStorage.iphospname === undefined ? "" : localStorage.iphospname);
                        //alert("3"+localStorage.iphospname);
                        localStorage.ippassword = password.replace(/@/g, '~') + "@@@" + (localStorage.ippassword === undefined ? "" : localStorage.ippassword);
                    }
                    localStorage.ipadrs = path1;
                    localStorage.fromdt = responseJson[0]["SERVERDATE"];
                    localStorage.todt = responseJson[0]["SERVERDATE"];
                    localStorage.usernm = responseJson[0]['USERNM'];
                    localStorage.userid = responseJson[0]['USERID'];
                    localStorage.ipaddres = ipaddress;
                    localStorage.portno = port;
                    localStorage.hostname = hostname;
                    localStorage.pwd = password;
                    localStorage.hospname = hospname;
                    localStorage.appurl = path1;
                    if (localStorage.getItem("tempipaddress") !== null) {
                        localStorage.removeItem("tempipaddress");
                        localStorage.removeItem("tempport");
                        localStorage.removeItem("tempusername");
                        localStorage.removeItem("temppassword");
                        localStorage.removeItem("temphospname");
                        localStorage.removeItem("temphostname");
                    }
                    localStorage.appname = 'dashboard';
                    if (!checkUserExists(username, ipaddress, responseJson[0]["ASKPWD"])) {
                        userDetails.push({username: username, askpwd: responseJson[0]["ASKPWD"], ipadress: ipaddress});
                        localStorage.setItem("userdetials", JSON.stringify(userDetails));
                    }
//                    location.href = 'deviceregistration.html';

//hek if user have more than on location
                    //if yes then
                    location1(localStorage.userid);
                    // alert(loc);
                    //  location.href = 'locations.html';
//else (meANS user have only one loction) 
                    // check if user has more than one department 
                    //if yes then call depattment.html
                    //else (means user have only one department)
                    // then cCHECK IF USER has more than one subdepartment
                    //if yes then call subdepartments.html
                    //else (means user has only one subdepartment)
                    //then check if user has more than one user type
                    //if yes then call usertypes.html
                    //else (means user has only one user type
                    // then check if user has more than one form assigned in the user type
                    //if yes call the forms.html
                    // else (means user has only one form)
                    // open the form diretly.



                } else {
//		    alert('UsreName/Password is wrong!');
                    try {
                        navigator.notification.alert(
                                "UsreName/Password is wrong!", // message
                                null, // callback
                                "Shivam CRM", // title
                                'OK'        // buttonName
                                );
                    } catch (err) {
                        alert('UsreName/Password is wrong!');

                    }
                }

            },
            error: function (error) {
                //confirm(error+"--hts-"+error.responseText+"--"+path);
                localStorage.tempipaddress = ipaddress;
                localStorage.tempport = port;
                localStorage.tempusername = username;
                localStorage.temppassword = password;
                localStorage.temphospname = hospname;
                localStorage.temphostname = hostname;
                if (error.statusText == "OK") {
                    alert(error.responseText);
                } else {
                    location.href = '404.html';
                }
            }
        });
                    var i, link_tag ;
                    var  isExists = 0;
                              link_tag = document.getElementsByTagName("link") ;
    var css_title = localStorage.themecolor;
            if(css_title != undefined && css_title != ""){
                 for (i = 0, link_tag = document.getElementsByTagName("link"); i < link_tag.length ; i++ ) {
             if ((link_tag[i].rel.indexOf( "stylesheet" ) !== -1) &&
                 link_tag[i].title) {
                 if (link_tag[i].title === css_title) {
                     isExists = 1;
                 }
             }
         }
                if (css_title === "orange") {
                    StatusBar.backgroundColorByHexString("#c72915");
                    }
                    else if (css_title === "green"){
                         StatusBar.backgroundColorByHexString("#496b03");
                    }
                    else if (css_title === "blue"){
                         StatusBar.backgroundColorByHexString("#033261");
                    }
                    else if (css_title === "teal"){
                         StatusBar.backgroundColorByHexString("#00635f");
                    }
                    else if (css_title === "yellow"){
                         StatusBar.backgroundColorByHexString("#5e6100");
                    }
                    else if (css_title === "gray"){
                         StatusBar.backgroundColorByHexString("#383838");
                    }
                    else if (css_title === "peach"){
                         StatusBar.backgroundColorByHexString("#a04d00");
                    }
                    else if (css_title === "pink"){
                         StatusBar.backgroundColorByHexString("#ca1967");
                    }
                    else if (css_title === "purple"){
                         StatusBar.backgroundColorByHexString("#37196f");
                    }
                    else if (css_title === "red"){
                         StatusBar.backgroundColorByHexString("#4b0150");
                    }
                    else if (css_title === "skyblue"){
                         StatusBar.backgroundColorByHexString("#005b65");
                    }
                    else if (css_title === "yellownew"){
                         StatusBar.backgroundColorByHexString("#946e00");
                    }
                    }
                     if(isExists == 0){
         var color = localStorage.themecolor;
         color = color.replace("%23","#");
         //confirm(color);
         chnagecssnew(color);
         //confirm(cssdata);
     }
}
function deleteUser(i, hospitalname, uname, pwd, localip, portnumber, hostnm) {
    debugger;

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

    localStorage.removeItem("adduseredit");
    localStorage.removeItem("edituserval");

    hospnamelen.splice(i, 1);
    hostnm.splice(i, 1);
    ipsellen.splice(i, 1);
    ipportlen.splice(i, 1);
    usernamelen.splice(i, 1);
    passwordlen.splice(i, 1);

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
        localStorage.ippassword = passwordlen[i].replace(/@/g, '~') + "@@@" + localStorage.ippassword;
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function () {
    $('#lblPwd').click(function () {
        var checkbox = document.getElementById("chkShowPwd");
        if (!checkbox.checked)
            document.getElementsByName("password")[0].type = "text";
        else
            document.getElementsByName("password")[0].type = "password";
    });
})
function getIp() {
    try {
        networkinterface.getIPAddress(function (ip) {
            localStorage.terminal = device.model;
        });
    } catch (err) {
        localStorage.terminal = 'APP'
    }
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
function loadpage(pageid, rights, label, thisid) {
    // alert("thisid="+$(thisid).attr("formid"));
    debugger;
    var backnew = "1";
    localStorage.backnew = backnew;
    try {
        var htldo = window.innerHeight;
        var asgnmrgn = htldo / 2;
        $('#mydiv img').css("margin-top", parseInt(asgnmrgn) + -50 + "px");
    } catch (err) {
    }
    $('#mydiv').show();
    pageid = pageid.split("?");
    var dis = pageid[0].indexOf('DIS');
    localStorage.currentformid = getParameterName(pageid[1], 'webformid');
    localStorage.reportid = getParameterName(pageid[1], 'rid');
    if (!localStorage.reportid == "") {
        localStorage.reportid = getParameterName(pageid[1], 'rid');
        localStorage.paramtype = getParameterName(pageid[1], 'ptype');
        localStorage.reportnm = getParameterName(pageid[1], 'id');
        $('#mydiv').hide();
        location.href = 'webreports.html';
    }
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
                    if (frmtype == "6") {
                        cnt++;
                        $('#mydiv').show();
                        localStorage.neosoftmenuflg = "1";
                        if ("neosoftmenuclass" in localStorage) {
                            var cls = localStorage.neosoftmenuclass.replace("class", "").trim();
                            cls = parseInt(cls);
                            cls = cls + 1;
                            localStorage.neosoftmenuclass = "class" + cls;
                        } else {
                            localStorage.neosoftmenuclass = "class" + cnt;
                        }
                        loadmultipleforms(label);
                    } else {
                        $('#mydiv').hide();
                        location.href = 'grids.html';
                    }
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
                var formid_backscreenid = $(thisid).attr("formid");
                if (formid_backscreenid != undefined) {
                    localStorage.backformid = formid_backscreenid; //taking form id form checkfromMobile.java pass with this and get here
                } else {
                    localStorage.backformid = "dashboard";
                }
                $('#mydiv').hide();
                // localStorage.backformid = "dashboard";
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
                cnt++;
                $('#mydiv').show();
                localStorage.neosoftmenuflg = "1";
                if ("neosoftmenuclass" in localStorage) {
                    var cls = localStorage.neosoftmenuclass.replace("class", "").trim();
                    cls = parseInt(cls);
                    cls = cls + 1;
                    localStorage.neosoftmenuclass = "class" + cls;

                } else {
                    localStorage.neosoftmenuclass = "class" + cnt;
                }
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
                    debugger;
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
function loadmultipleforms(label) {
 debugger;
    try {
       // alert(localStorage.currentformid);
         var neosoftmenu="";
           neosoftmenu=getParameterName("neosoftmenu");
          localStorage.formid=localStorage.currentformid;
        if(neosoftmenu=="1"  &&   localStorage.frmlogout=="0"){    
            if(localStorage.currentformid=="dashboard"){
              localStorage.formid=getParameterName("wfid");
             localStorage.currentformid=getParameterName("frompage");
         }
              neosoftmenu="";
                 }else if(localStorage.frmlogout=="1"){
                     var cls=localStorage.neosoftmenuclass.replace("class","").trim();
                      var   cls1=parseInt(cls)-1;
                      localStorage.neosoftmenuclass="class"+cls1;
                     neosoftmenu="0";
                       }
                       else{
                            neosoftmenu="";
                       }
        $('.header1').html(label);
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.currentformid;
        var locid = localStorage.locid;
        $.get(path + "/CheckFormMobile?type=1&webformid="+currentformid+"&neosoftmenu="+neosoftmenu+"&frompage=" + formid + "&&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm, function (responseText) {
        debugger;   
        $('#mydiv').hide();
            $('.pad').hide();
//            $('.active').remove();
            var div = "<div class='row pad "+currentformid +" "+localStorage.neosoftmenuclass+"   active divs menudivs' numberfield="+localStorage.neosoftmenuclass+" style='margin:0px;'>"+responseText+"</div>";
            
            var wnht = window.innerHeight;
            $(".backcolr").css('display','table');
            $(".backcolr").css('width','100%');
//            $(".menudivs "+localStorage.neosoftmenuclass).css('display','table-cell');
    $(".menudivs").each(function(){
//                     alert($(this).css("display"))
              $(this).css("display","none")
             
              });
              $('.backcolr').append(div);
            $(".menudivs "+localStorage.neosoftmenuclass).css('display','block');
            $(".menudivs").css('width','100%');
            $(".menudivs").css('vertical-align','middle');
                    $(".menudivs").css("height", parseInt(wnht) + -110 + "px");
                    debugger;  
//                 var currentformid=$("."+localStorage.neosoftmenuclass).find(".containrdiv").attr("formid");
          if(localStorage.frmlogout=="1"){   
                 $(".menudivs").find(".navcls").each(function(){
//                     alert($(this).css("display"))
             if($(this).css("display")=="block")
             {
                 currentformid=$(this).attr("formid");
             }  
              });
        localStorage.currentformid  =currentformid; 
                             localStorage.frmlogout="0";
                                }
                                  localStorage.frmlogout="0";
                                   var storediv=div;
      localStorage.storediv=storediv;
      //confirm("here");
      div="";
      //$('.backcolr').append("");
      if(location.href.indexOf("dashboardmenubuttons.html") == -1){
          localStorage.isFromSingle = 1;
        location.href = "dashboardmenubuttons.html";
//        path = path + "admin/dashboardmenumobileall.jsp?webformid=" + localStorage.menubuttonformid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
//                $.get(path, function (responseText) {
//                    try{
//                    $('#divMenubuttons').html(responseText);
//		    }catch(err){$('#mydiv').hide();}
//                    
//                    try{$("#Date1").datepicker({
//                        dateFormat: 'dd/mm/yy'
//                    });
//                }catch(err){}
//                    var neosoftmenu=  getParameterName("neosoftmenu");
//                if(neosoftmenu=="1"){
//                     localStorage.removeItem("disback");
//                     loadmultipleforms();
//                }else{
//                    localStorage.neosoftmenuflg="0";
//                    loadsingle()
//                }
//                })
       // loadsingle();
    }
    });
    } catch (err) {
        $('#mydiv').hide();
        alert(err);
    }
}


