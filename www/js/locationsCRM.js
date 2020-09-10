/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    localStorage.neosoftmenuflg = "0";
    try {
        var htldo = window.innerHeight;
        var asgnmrgn = htldo / 2;
        $('#mydiv img').css("margin-top", parseInt(asgnmrgn) + -50 + "px");
    } catch (err) {
    }
    $('#mydiv').hide();
    var path = localStorage.ipadrs + "login?type=loc&usernm=" + localStorage.usernm + "&pwd=" + localStorage.pwd;
    var row = "";
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            debugger;
            try {
                var platform = device.platform;
                if (platform.toUpperCase() === "ANDROID") {
                    navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo);
                }

            } catch (err) {

            }
            try{
                    if(localStorage.devicetype.toLowerCase()==='iphone' || localStorage.devicetype.toLowerCase()==='ipad'){
//                         confirm(localStorage.devicetype); 
                        $('.iosstatusbar').css('display','block');
                        $('.setfootbtn').css('width','auto');
                        $('.loccont').css('margin-top','65px');
                    }
    }catch(err){}
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
            if (responseJson.length == 1) {
                localStorage.locid = responseJson[0]['LOCID'];
                localStorage.locnm = responseJson[0]['LOCNM'];
                if (localStorage.getItem("exit") === null) {
                    $('#mydiv').hide();
                    location.href = "subdepts.html";
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
//    
});
function getlocid(locid, locnm) {
    localStorage.locid = locid;
    localStorage.locnm = locnm;
    // location.href = "subdepts.html";
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
                                       // alert("--" + responseJson.length);
                                        if (responseJson.length == 1)
                                        {
                                            var pageid = responseJson[0]["QUERYDATA"];
                                            var rights = responseJson[0]["FORMTEMPTYPE"];
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
                    location.href = "locations.html";
                    //location.href = "index.html";
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
function settings() {
    debugger;
    location.href = 'settings.html';
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
        alert(err);
    }
}
function onErrorGeo(error) {
//    alert('code: ' + error.code + '\n' +
//            'message: ' + error.message + '\n');
}


