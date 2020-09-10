/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loadsubdetpsdynaminc() {
    debugger;
    var row = "<ul>";
    var responseJson =  JSON.parse((localStorage.subdepts));
    for (var i = 0; i < responseJson.length; i++) {
        var color = '';
        if (i % 5 == 0) {
            color = 'bg-aqua';
        } else if (i % 5 == 1) {
            color = 'bg-red';
        }
        else if (i % 5 == 2) {
            color = 'bg-green';
        }
        else if (i % 5 == 3) {
            color = 'bg-yellow';
        }
        else if (i % 5 == 4) {
            color = 'bg-blue';
        }
        row = row + ' <li> ' +
                '<a  class="item-content item-link" data-ripple="rgba(0,0,0, 0.2)" onclick=getsubdeptid("' + responseJson[i]["SDEPTID"] + '","' + responseJson[i]["DEPTID"] + '")> ' +
                ' <div class="item-media"> ' +
                ' <div class="loclft_01 ' + color + '"><i class="fa fa-building Depticon" aria-hidden="true"></i></div> ' +
                ' </div> ' +
                ' <div class="item-inner"> ' +
                ' <div class="item-title">' + responseJson[i]["SUBDEPTNM"] + '</div> ' +
                ' </div> ' +
                ' </a> ' +
                ' </li>';
    }
    row = row + "</ul>";
    $('#divsubdepts').html(row);
    localStorage.removeItem("subdepts");
}
function loadsubdepts(div) {
    app.preloader.show()
    var path = localStorage.ipadrs + "login?type=subdepts&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm + "&locid=" + localStorage.locid;
    var row = "<ul>";
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            debugger;
            if (responseJson.length > 0) {
                if (responseJson.length === 1) {
                    localStorage.subdeptid = responseJson[0]['SDEPTID'];
                    localStorage.subdeptnm = responseJson[0]['SUBDEPTNM'];
                    localStorage.sdeptid = responseJson[0]['SDEPTID'];
                    localStorage.deptid = responseJson[0]['DEPTID'];
                    localStorage.deptnm = responseJson[0]['DEPTNM'];
                }
                else if (responseJson.length > 0) {

                    for (var i = 0; i < responseJson.length; i++) {
                        var color = '';
                        if (i % 5 == 0) {
                            color = 'bg-aqua';
                        } else if (i % 5 == 1) {
                            color = 'bg-red';
                        }
                        else if (i % 5 == 2) {
                            color = 'bg-green';
                        }
                        else if (i % 5 == 3) {
                            color = 'bg-yellow';
                        }
                        else if (i % 5 == 4) {
                            color = 'bg-blue';
                        }
                        row = row + ' <li> ' +
                                '<a  class="item-content item-link" data-ripple="rgba(0,0,0, 0.2)" onclick=getsubdeptid("' + responseJson[i]["SDEPTID"] + '","' + responseJson[i]["DEPTID"] + '")> ' +
                                ' <div class="item-media"> ' +
                                ' <div class="loclft_01 ' + color + '"><i class="material-icons loc"></i></div> ' +
                                ' </div> ' +
                                ' <div class="item-inner"> ' +
                                ' <div class="item-title">' + responseJson[i]["SUBDEPTNM"] + '</div> ' +
                                ' </div> ' +
                                ' </a> ' +
                                ' </li>';
                    }
                    row = row + "</ul>";
                    app.preloader.hide();
                    if(div!==undefined){
                        $('#'+div).html(row);
                    }else{
                        $('#divsubdepts').html(row);
                    }
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
}
;
function getsubdeptid(subdeptid, deptid) {
    localStorage.sdeptid = subdeptid;
    localStorage.deptid = deptid;
    app.router.navigate("/dashboardmenu/")
    //location.href = "dashboardmenu.html";
}


function logout() {
    localStorage.exit = '1';
    location.href = "locations.html";
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}