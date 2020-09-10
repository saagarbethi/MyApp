/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if (localStorage.ipadrs == undefined || localStorage.ipadrs == "") {
    debugger;

} else {
    try{
    debugger;
try{
    $.get(localStorage.ipadrs +'/ThemeSave?gettheme=1&userid='+localStorage.userid, function (responsetext) {
                    //confirm(responsetext+"--"+localStorage.userid);
                    //confirm(responsetext+"--"+localStorage.userid);
                    localStorage.themecolor = responsetext;
                });
}catch(err){}
    if (localStorage.settings === '1') {
        checkdefaultconfig();
//        $("input[name=ipaddress]").val(localStorage.ipaddres);
//        $("input[name=portnumber]").val(localStorage.portno);
//        $("input[name=hostname]").val(localStorage.hostname);
//        $("input[name=username]").val(localStorage.usernm);
//        $("input[name=password]").val(localStorage.pwd);
//        $("input[name=hospname]").val(localStorage.hospname);
        localStorage.settings = '0';
        // localStorage.clear();
//        location.href = 'index.html';

    } else if (localStorage.adduseredit === '1') {


    } else {
        var hosp1 = localStorage.iphospname;
        if (hosp1.indexOf("@@@") > 0) {
            var hosp = hosp1.split("@@@");
            if (hosp.length === 2) {
		if(localStorage.existfornodept=="1"){
                     localStorage.existfornodept=0;
		    //localStorage.removeItem("existfornodept");
		}else{
                    askpassword(0);
                    //onchangehosp(0);
                //location.href = 'locations.html';
	    }
            }
            else {
//                 $("input[name=ipaddress]").val(localStorage.ipaddres);
//        $("input[name=portnumber]").val(localStorage.portno);
//        $("input[name=hostname]").val(localStorage.hostname);
//        $("input[name=username]").val(localStorage.usernm);
//        $("input[name=password]").val(localStorage.pwd);
//        $("input[name=hospname]").val(localStorage.hospname);
                location.href = 'Entrence.html';
            }
        }
//        location.href = 'locations.html';
    }
    }catch(err){
        location.href = 'index_1.html';
    }
}

function checkdefaultconfig()
{
    debugger;

    debugger;
    var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
    db.transaction(dqueryDBi, derrorCBi);

}

function dqueryDBi(tx)
{

    debugger;

    tx.executeSql('CREATE TABLE IF NOT EXISTS defaultConfig(pid INTEGER PRIMARY KEY AUTOINCREMENT,dhospname TEXT,dipadd TEXT,dport TEXT,dhostnm TEXT ) ');
    tx.executeSql('SELECT distinct dhospname,dipadd,dport,dhostnm FROM defaultConfig', [], dquerrySuccessi, derrorCBi);
}
function derrorCBi(err)
{
    debugger;
    alert("Error processing SQL" + err.code);
}
function  dquerrySuccessi(tx, results) {
    debugger;
    var len = 0;
    var len = results.rows.length;
    var hospnm, ipadd, port, host = "";
    if (len > 0) {
//        $('.lblnm').css('position','absolute');
//        $('.lblnm').css('padding-top','10px');
        hospnm = results.rows.item(0).dhospname;
        ipadd = results.rows.item(0).dipadd;
        port = results.rows.item(0).dport;
        host = results.rows.item(0).dhostnm;
        $("input[name=ipaddress]").val(ipadd);
        $("input[name=portnumber]").val(port);
        $("input[name=hostname]").val(host);
        $("input[name=username]").val('');
        $("input[name=password]").val('');
        $("input[name=hospname]").val(hospnm);
	 $('.icheck').show();
          if($('.form-control').val()===""){
        $('.lblnm').removeClass('active');
    }
    else{ $('.lblnm').addClass('active');}
        return;

    } else {
 
//        $('.lblnm').css('position','relative');
//        $('.lblnm').css('padding-top','0px');
        $("input[name=ipaddress]").val(localStorage.ipaddres);
        $("input[name=portnumber]").val(localStorage.portno);
        $("input[name=hostname]").val(localStorage.hostname);
        $("input[name=username]").val(localStorage.usernm);
        $("input[name=password]").val(localStorage.pwd);
        $("input[name=hospname]").val(localStorage.hospname);
        if($('.form-control').val()===""){
        $('.lblnm').removeClass('active');
    }
    else{ $('.lblnm').addClass('active');}
//        if (localStorage.getItem("userdetials") !== null) {
//            var arr = JSON.parse(localStorage.getItem('userdetials'));
//            for (var u = 0; u < arr.length; u++) {
//                if (arr[u]["ipadress"] === localStorage.ipaddres && arr[u]["username"].toString().toUpperCase() === localStorage.usernm.toString().toUpperCase() && arr[u]["askpwd"]==="1") {
//                        $('.icheck').hide();
////                        break;
//                }
//            }
//    }
 var ipaddress = $("input[name=ipaddress]").val().trim();
        var port = $("input[name=portnumber]").val().trim();
        var hostname = $("input[name=hostname]").val().trim();
        var username = $("input[name=username]").val().trim();
        var password = $("input[name=password]").val().trim();
        var hospname = $("input[name=hospname]").val().trim();
        var path = "https://" + ipaddress + ":" + port + "/" + hostname + "/" + "login?username=" + username + "&password=" + password + "&type=login";
         var server = "https://" + ipaddress + ":" + port;
         if(localStorage.isHttp == 1){
              path = "http://" + ipaddress + ":" + port + "/" + hostname + "/" + "login?username=" + username + "&password=" + password + "&type=login";
          server = "http://" + ipaddress + ":" + port;
         }
        localStorage.server = server;
	var naskpwd="0";
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {
                if (responseJson.length > 0) {
		    
		      naskpwd= responseJson[0]["ASKPWD"];
		      if (naskpwd==="1") {
                            $('.icheck').hide();
                            }else{
                        $('.icheck').show();
                               }
		}
	    },
	error: function (error) {
	      $('.icheck').show();
	}
	  });
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
                        //alert("8--"+localStorage.iphospname);
                        localStorage.ippassword = lgnpwd.replace(/@/g, '~') + "@@@" + localStorage.ippassword;
                    }
                }
                else {
                    localStorage.ipsel = lgnip + "@@@" + (localStorage.ipsel === undefined ? "" : localStorage.ipsel);
                    localStorage.ipport = lgnport + "@@@" + (localStorage.ipport === undefined ? "" : localStorage.ipport);
                    localStorage.iphostname = lgnhostname + "@@@" + (localStorage.iphostname === undefined ? "" : localStorage.iphostname);
                    localStorage.ipusername = lgnusernm + "@@@" + (localStorage.ipusername === undefined ? "" : localStorage.ipusername);
                    localStorage.iphospname = lgnhospname + "@@@" + (localStorage.iphospname === undefined ? "" : localStorage.iphospname);
                    //alert("2"+localStorage.iphospname);
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
//                var notoff = "0";
//                notoff = localStorage.notificationoff;
//                if (notoff != "1") {
//                    saveRegid(localStorage.deviceregid);
//                }

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
                                                                try{
                                                                $("#Date1").datepicker({
                                                                    dateFormat: 'dd/mm/yy'
                                                                });
                                                            }catch(err){}
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

//function saveRegid(regid) {
//
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4) {
//            var data = xhr.responseText;
//        }
//    };
//    var devicenm = device.name;
//    var platform = device.platform;
//    var uuid = device.uuid;
//    var version = device.version;
//    var manufacturer = device.manufacturer;
//    var data = 'regid=' + regid + '&apptype=dashboard&uuid=' + uuid + '&userid=' + localStorage.userid + '&platform=' + platform + '&devicenm=' + manufacturer;
//    var url = localStorage.ipadrs + '/DeviceRegistrations';
//    xhr.open("POST", url, true);
//    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//    xhr.send(data);
//}


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