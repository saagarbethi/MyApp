/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back buttloadon
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
    $('#mydiv').hide();
    // location.href = 'dashboardmenubuttons.html';
    var path1 = localStorage.ipadrs;
    var formid = localStorage.menubuttonformid;
    var locid = localStorage.locid;
    path1 = path1 + "/DashboardMenuMobileAll?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
    if(localStorage.appcheck=="1"){
    $.post(path1, function (responseJson) {
        try {
           // alert("--" + responseJson.length);
            if (responseJson.length == 1)
            {  var usertype = responseJson[0]["USERTYPENM"];
                
                if(usertype.trim()=="NEOSOFT MENU"){
                    localStorage.neo="1";
                    location.href = 'dashboardmenubuttons.html';
                    
                }else{
                var pageid = responseJson[0]["QUERYDATA"];
                var rights = responseJson[0]["RIGHTS"];
                loadpage(pageid, rights);
            }
            }
            else
            {
                location.href = 'dashboardmenubuttons.html';
            }
            //console.log(responseText);

        } catch (err) {
            $('#mydiv').hide();
        }
//        $("#Date1").datepicker({
//            dateFormat: 'dd/mm/yy'
//        });
//        var neosoftmenu = getParameterName("neosoftmenu");
//        if (neosoftmenu == "1") {
//            localStorage.removeItem("disback");
//            loadmultipleforms();
//        } else {
//            localStorage.neosoftmenuflg = "0";
//            loadsingle()
//    }
    });
    }else{
        
                location.href = 'dashboardmenubuttons.html';
//                $("#Date1").datepicker({
//            dateFormat: 'dd/mm/yy'
//        });
//        var neosoftmenu = getParameterName("neosoftmenu");
//        if (neosoftmenu == "1") {
//            localStorage.removeItem("disback");
//            loadmultipleforms();
//        } else {
//            localStorage.neosoftmenuflg = "0";
//            loadsingle()
//    }


}
}
$(document).ready(function () {
    debugger;
    localStorage.frmlogout = "0";
    localStorage.neosoftmenuflg = "0"
    localStorage.removeItem("neosoftmenuclass");

//    document.getElementById("mydiv").style.display="block";
    try {
        var htldo = window.innerHeight;
        var asgnmrgn = htldo / 2;
        $('#mydiv img').css("margin-top", parseInt(asgnmrgn) + -50 + "px");
    } catch (err) {
    }
    $('#mydiv').show();
    var mobnewflg = "1";
    localStorage.newbuild = "0";
    localStorage.mobnewflg = "1";
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
});

function settings() {
    location.href = 'settings.html';
}
function logout() {
    debugger;
//    location.href = "subdepts.html?exitfrom=1";
//    localStorage.ismenu = "1";
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

                    location.href = "Entrence.html";
                }
                else
                {  
                    location.href = "subdepts.html?exitfrom=1";
                    localStorage.ismenu = "1";
                  
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
var cnt=0;
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



//function printrep(){
//    alert(localStorage.server);
//     var ref = window.open("http://google.com", '_blank', 'location=no,closebuttoncaption=back');
//     ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
//     ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
//     ref.addEventListener('exit', function() { alert(event.type); });
//    
//}
//function printrep1(){
//    alert(localStorage.server);
//     var ref = window.open("http://122.169.250.199:8080/neosoft", '_blank', 'location=no,closebuttoncaption=back');
//     ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
//     ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
//     ref.addEventListener('exit', function() { alert(event.type); });
//    
//}
//function printrep2(){
//    alert(localStorage.server);
//     var ref = window.open("http://122.169.250.199:8080/wordimages/test.pdf", '_system', 'location=no,closebuttoncaption=back');
//     ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
//     ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
//     ref.addEventListener('exit', function() { alert(event.type); });
//    
//}
//function printrep3(){
//    alert(localStorage.server);
//     window.open('https://docs.google.com/viewer?url=http://122.169.250.199:8080/wordimages/test.pdf&embedded=true', '_blank', 'location=yes'); 
//     ref = window.open('pdfviewer.html', '_self');
//    
//}
