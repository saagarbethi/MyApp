/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReadyReg, false);
});
function onDeviceReadyReg() {
     try{
                    if(localStorage.devicetype.toLowerCase()==='iphone' || localStorage.devicetype.toLowerCase()==='ipad'){
//                         confirm(localStorage.devicetype); 
                        $('.iosstatusbar').css('display','block');
                        $('.setfootbtn').css('width','auto');
                         $('.subdcont').css('margin-top','65px');
                        
                    }
    }catch(err){}
    try {
        debugger;

        try {
            var platform = device.platform;
            localStorage.platform = platform;
            localStorage.removeItem("dishistory");
            try {
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
            } catch (err) {

            }
            localStorage.model = device.model;
        } catch (err) {
            platform = "";
        }
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
//            alert(err);
        }
        var push = PushNotification.init({
            android: {
//               senderID: "756359640025"
senderID: "940836237549"
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });
        push.on('registration', function (data) {
            //exitapp();
            localStorage.deviceregid = data.registrationId;
//            alert(data.registrationId);
            var notoff = "0";
            notoff = localStorage.notificationoff;
            if (notoff != "1") {
                saveRegid(data.registrationId);
            }
        });
        push.on('notification', function (data) {
            var ipadress = data.additionalData.ipaddress;
            localStorage.ipadrs = ipadress + "/";
            localStorage.userid = data.additionalData.userid;
            localStorage.locid = data.additionalData.rlocid;
            localStorage.deptid = data.additionalData.rdeptid;
            localStorage.sdeptid = data.additionalData.rsdeptid;
            localStorage.setItem("notificationdata", JSON.stringify(data.additionalData));
            var additionalData = localStorage.getItem("notificationdata");
            var notificationsdata = JSON.parse(additionalData);
            if (notificationsdata.foreground === true) {
                notifymsg(notificationsdata.notifymsg);
            } else {
                location.href = 'Notificationdashboardmenubtns.html';
            }

        });
    } catch (err) {
//        alert(err);
    }
}
function saveRegid(regid) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var data = xhr.responseText;
        }
    };
    var devicenm = device.name;
    var platform = device.platform;
    var uuid = device.uuid;
    var version = device.version;
    var manufacturer = device.manufacturer;
    var data = 'regid=' + regid + '&apptype=dashboard&uuid=' + uuid + '&userid=' + localStorage.userid + '&platform=' + platform + '&devicenm=' + manufacturer;
    var url = localStorage.ipadrs + '/DeviceRegistrations';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}
$(document).ready(function () {
    debugger;
    try {
        var htldo = window.innerHeight;
        var asgnmrgn = htldo / 2;
        $('#mydiv img').css("margin-top", parseInt(asgnmrgn) + -50 + "px");
    } catch (err) {
    }
    $('#mydiv').show();
    var path = localStorage.ipadrs + "login?type=subdepts&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid;
    var row = "";
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            debugger;
            //  alert("subdepts2.html");
            if (responseJson.length > 0) {
                if (responseJson.length === 1) {
                    var exitfrom = getParameterByName("exitfrom");
                    if (exitfrom === "1") {
                        logout();
                        return;
                    }
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
                            "DashBoard", // title
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
//    
});
function getsubdeptid(subdeptid, deptid) {
    localStorage.sdeptid = subdeptid;
    localStorage.deptid = deptid;
    //location.href = "dashboardmenu.html";
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
                       // alert("--" + responseJson.length);
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
function settings() {
    location.href = 'settings.html';
}

function logout() {
    localStorage.exit = '1';
    //location.href = "locations.html";
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
                localStorage.appcheck = responseJson[0]["NEWFLG"];
                localStorage.loclen = reslength;
                if (reslength > 1)
                {
                    location.href = 'locations.html';
                }
                else
                {
                    location.href = 'Entrence.html';
                }
            }catch (err) {

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
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function onSuccessGeo(position) {
    try {
        var element = 'Latitude: ' + position.coords.latitude + '<br />' +
                'Longitude: ' + position.coords.longitude + '<br />' +
                'Altitude: ' + position.coords.altitude + '<br />' +
                'Accuracy: ' + position.coords.accuracy + '<br />' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                'Heading: ' + position.coords.heading + '<br />' +
                'Speed: ' + position.coords.speed + '<br />' +
                'Timestamp: ' + position.timestamp + '<br />';
        // alert(element);

//    var geocoder;
//    geocoder = new google.maps.Geocoder();
//    var latlng = new google.maps.LatLng(latitude, longitude);
//
//    geocoder.geocode(
//    {
//        'latLng': latlng
//    }, 
//    function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//            if (results[0]) {
//                var add= results[0].formatted_address ;
//                var  value=add.split(",");
//
//                count=value.length;
//                country=value[count-1];
//                state=value[count-2];
//                city=value[count-3];
//                alert("city name is: " + city);
//            }
//            else  {
//                alert("address not found");
//            }
//        }
//        else {
//            alert("Geocoder failed due to: " + status);
//        }
//    }
//    );

        var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCtFI4R6E1-YHHCFUbWEj6iVON2UD1nbQU";

        $.getJSON(geocodingAPI, function (json) {
            if (json.status == "OK") {
                //Check result 0
                var result = json.results[0];
                // alert(result.formatted_address);
                localStorage.geolocation = result.formatted_address;
                //look for locality tag and administrative_area_level_1
                var city = "";
                var state = "";
                for (var i = 0, len = result.address_components.length; i < len; i++) {
                    var ac = result.address_components[i];
                    if (ac.types.indexOf("administrative_area_level_1") >= 0)
                        state = ac.short_name;
                }
                if (state != '') {
                    // alert("Hello to you out there in " + city + ", " + state + "!");
                }
            }

        });


    }
    catch (err) {
//        alert(err);
    }
}
function onErrorGeo(error) {
//    alert('code: ' + error.code + '\n' +     'message: ' + error.message + '\n');

}
function loadpage(pageid, rights,label,thisid) {
  // alert("thisid="+$(thisid).attr("formid"));
    debugger;
         var backnew="1";
         localStorage.backnew=backnew;
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
     $('#mydiv').show();
    pageid = pageid.split("?");
    var dis = pageid[0].indexOf('DIS');
    localStorage.currentformid = getParameterName(pageid[1], 'webformid');
     localStorage.reportid=getParameterName(pageid[1],'rid');
    if(!localStorage.reportid == ""){
        localStorage.reportid=getParameterName(pageid[1],'rid');
         localStorage.paramtype =getParameterName(pageid[1],'ptype');
          localStorage.reportnm = getParameterName(pageid[1],'id');
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
                    if(frmtype=="6"){
		        cnt++;
                 $('#mydiv').show();
                  localStorage.neosoftmenuflg="1";
                  if("neosoftmenuclass" in localStorage){
                      var cls= localStorage.neosoftmenuclass.replace("class","").trim();
                       cls= parseInt(cls);
                       cls=cls+1;
                      localStorage.neosoftmenuclass="class"+cls;
                  }else{
                  localStorage.neosoftmenuclass="class"+cnt;
              }
                    loadmultipleforms(label) ;
                    }else{
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
            }else if(frmtype === "6"){
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
                var formid_backscreenid=$(thisid).attr("formid");
                if(formid_backscreenid!=undefined){
                      localStorage.backformid=  formid_backscreenid; //taking form id form checkfromMobile.java pass with this and get here
                  }else{
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
            else if(resval === "6"){
                cnt++;
                 $('#mydiv').show();
                  localStorage.neosoftmenuflg="1";
                  if("neosoftmenuclass" in localStorage){
                      var cls= localStorage.neosoftmenuclass.replace("class","").trim();
                       cls= parseInt(cls);
                       cls=cls+1;
                        localStorage.neosoftmenuclass="class"+cls;
                      
                  }else{
                  localStorage.neosoftmenuclass="class"+cnt;
              }
                    loadmultipleforms(label) ;
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
        var path = localStorage.ipadrs + "/disfirstscreen?userid=" + userid+"&"+pageid[1]+"&locid="+localStorage.locid;
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


