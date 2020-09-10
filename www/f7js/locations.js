/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).on('load', function() {
    debugger;
    loadlocations();
});
function loadlocations() {
    debugger;
    app.preloader.show();
    var path = localStorage.ipadrs + "login?type=loc&usernm=" + localStorage.usernm + "&pwd=" + localStorage.pwd;
    var row = "<ul>";
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
                localStorage.fromdt = responseJson[0]['SERVERDATE'];
                localStorage.todt = responseJson[0]['SERVERDATE'];
                loadsubdepts('divlocation');
                
            } else {


                for (var i = 0; i < responseJson.length; i++) {
                    var color = '';
                    if (i % 4 == 0) {
                        color = 'bg-blue';
                    } else if (i % 4 == 1) {
                        color = 'bg-aqua';
                    }
                    else if (i % 4 == 2) {
                        color = 'bg-yellow';
                    }
                    else if (i % 4 == 3) {
                        color = 'bg-green';
                    }
//                    row = row + " <div class=' col-md-4 col-sm-6 col-xs-12'> " +
//                            "<div class='info-box' style='cursor:pointer' onclick=getlocid('" + responseJson[i]["LOCID"] + "','"+responseJson[i]["LOCNM"]+"')  > " +
//                            "<span class='info-box-icon bg-" + color + "'><span class='fa fa-map-marker'>" +
//                            "</span></span>" +
//                            "<div class='info-box-content'>" +
//                            "<span class='info-box-text'></span>" +
//                            "<span class='info-box-number'><br><a >" + responseJson[i]["LOCNM"] + "</a></span>" +
//                            "</div>  </div> </div> ";
                    row = row + ' <li> ' +
                            '<a  class="item-content item-link" onclick=getlocid("' + responseJson[i]["LOCID"] + '","' + responseJson[i]["LOCNM"] + '")> ' +
                            ' <div class="item-media"> ' +
                            ' <div class="loclft_01 ' + color + '"><i class="material-icons loc">location_on</i></div> ' +
                            ' </div> ' +
                            ' <div class="item-inner"> ' +
                            ' <div class="item-title">' + responseJson[i]["LOCNM"] + '</div> ' +
                            ' </div> ' +
                            ' </a> ' +
                            ' </li>';
                    localStorage.fromdt = responseJson[i]['SERVERDATE'];
                    localStorage.todt = responseJson[i]['SERVERDATE'];

                }
                row = row + "</ul>";
                $('#divlocation').html(row);
                app.preloader.hide()
//                app.ptr.done();
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
            app.preloader.hide();
        }
    });
//    
}
;
function getlocid(locid, locnm) {
    debugger;
    app.preloader.show();
    localStorage.locid = locid;
    localStorage.locnm = locnm;
    var path = localStorage.ipadrs + "login?type=subdepts&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid;
    var row = "<ul>";
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            app.preloader.hide();
            if (responseJson.length === 1) {
                localStorage.subdeptid = responseJson[0]['SDEPTID'];
                localStorage.subdeptnm = responseJson[0]['SUBDEPTNM'];
                localStorage.sdeptid = responseJson[0]['SDEPTID'];
                localStorage.deptid = responseJson[0]['DEPTID'];
                localStorage.deptnm = responseJson[0]['DEPTNM'];
                app.router.navigate("/dashboardmenu/");
            } else if (responseJson.length > 1) {
                localStorage.subdepts = JSON.stringify(responseJson);
//                console.log(JSON.parse((localStorage.subdepts)));
                app.router.navigate("/subdepts/");
            } else {
                localStorage.subdeptid = '';
                localStorage.subdeptnm = '';
                app.dialog.alert("No Department Assigned To This User,Please Assign The Department to user or change the Location","Shivam Dashboard")
                

            }
        }
    });


    // location.href = "subdepts.html";
}
function settings() {
    debugger;
    app.router.navigate("/settings/");
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

        var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyAYwD4_K3fGYusp8Oth3MNBJ_Okf73keq8";

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
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}
var $ptrContent = $('.ptr-content');
$ptrContent.on('ptr:refresh', function (e) {
    debugger;
    loadlocations();
});


