/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 
            function onDeviceReady() {
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
                        //alert(err);
                    }
                    var push = PushNotification.init({
                        android: {
//                            senderID: "756359640025"
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
                        saveRegid(data.registrationId);
                    });

                } catch (err) {
                    //alert(err);
                }
            }
            $(document).ready(function () {
                try{ var htldo = window.innerHeight;
                    var asgnmrgn=htldo/2;
                    $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
                }catch(err){}
                 $('#mydiv').show();
//                if(localStorage.getItem("registrationId")!==null){
                    document.addEventListener("deviceready", onDeviceReady, false);
//                }else{
//                    location.href = 'locations.html';
//                }
            });
             function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
            function saveRegid(regid) {

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var data = xhr.responseText;
//                        location.href = 'locations.html';
                    }
                };
                var devicenm = device.name;
                var platform = device.platform;
                var uuid = device.uuid;
                var version = device.version;
                var manufacturer = device.manufacturer;
                var data = 'regid=' + regid + '&apptype=dashboard&userid=' + localStorage.userid + '&platform=' + platform + '&devicenm=' + manufacturer;
                var url = localStorage.ipadrs + '/DeviceRegistrations';
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(data);
            }
 
function settings() {
    location.href = 'settings.html';
}
$(document).ready(function () {
    debugger;
             document.addEventListener("backbutton", function (e) {
                 logout()
            }, false);
    var path = localStorage.ipadrs;
    var formid = localStorage.menubuttonformid;
    //    if(!localStorage.reportid == ""){
//        formid=localStorage.formid;
//    }
    var locid = localStorage.locid;
    var frmtype = localStorage.frmtype;
    var mobnewflg = localStorage.mobnewflg;
    if (localStorage.newbuild === "1") {
        $('.bkimg').css("display", "none");
    } else {
        $('.bkimg').attr('display', 'block');
        $('.bkimg').css("display", "block");
    }
    //dashBoardReportMenuMobile
    if (frmtype === "1") {
        path = path + "/formview?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
        $.get(path, function (responseText) {

            $('#divMenubuttons').html(responseText);
            try{
            $("#Date1").datepicker({
                dateFormat: 'dd/mm/yy'
            });
        }catch(err){}
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
                  try{
                    $('#divMenubuttons').html(responseText);
}catch(err){$('#mydiv').hide();}
                    try{$("#Date1").datepicker({
                        dateFormat: 'dd/mm/yy'
                    });
                }catch(err){}
                    loadsinglereport();
                })


            } else {

                path = path + "admin/dashboardmenumobileall.jsp?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
                $.get(path, function (responseText) {
                    try{
                       // confirm(localStorage.isFromSingle+"---"+localStorage.storediv);
                       var neosoftmenu=  getParameterByName("neosoftmenu");
                    if(localStorage.isFromSingle == 1){
                        localStorage.isFromSingle = 0;
                        $('#divMenubuttons').html(responseText);
                       // $('.pad').hide();
                        localStorage.isFromSingle == 0;
                        $('.backcolr').html(localStorage.storediv);
                        //confirm(localStorage.storediv);
                        //$('#newdivmenu').html(localStorage.storediv);
                         var wnht = window.innerHeight;
            $(".backcolr").css('display','table');
            $(".backcolr").css('width','100%');
//            $(".menudivs "+localStorage.neosoftmenuclass).css('display','table-cell');
    $(".menudivs").each(function(){
//                     alert($(this).css("display"))
              $(this).css("display","none")
             
              });
             // $('.backcolr').append(div);
            $(".menudivs "+localStorage.neosoftmenuclass).css('display','block');
            $(".menudivs").css('width','100%');
            $(".menudivs").css('vertical-align','middle');
                    $(".menudivs").css("height", parseInt(wnht) + -110 + "px");
                     $(".backcolr").show();
                     $('#mydiv').hide();
                     $('.pad').show();
                    return false;
                    }else if(neosoftmenu == 1){
                        //confirm("inside");
                        $('#divMenubuttons').hide();
                        $('#divMenubuttons').html(responseText);
                    }else{
                                            $('#divMenubuttons').html(responseText);

                    }
		    }catch(err){$('#mydiv').hide();}
                    try{$("#Date1").datepicker({
                        dateFormat: 'dd/mm/yy'
                    });}catch(err){}
                    var neosoftmenu=  getParameterByName("neosoftmenu");
                if(neosoftmenu=="1"){
                     localStorage.removeItem("disback");
                     //confirm("calling from here");
                     loadmultipleforms();
                }else{
                    localStorage.neosoftmenuflg="0";
                    loadsingle()
                }
                })

            }
        } else {

            path = path + "admin/dashBoardReportMenuMobile.jsp?webformid=" + formid + "&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm;
            $.get(path, function (responseText) {
 try{
                $('#divMenubuttons').html(responseText);
 }catch(err){$('#mydiv').hide();}
 try{
                $("#Date1").datepicker({
                    dateFormat: 'dd/mm/yy'
                });
            }catch(err){
                
            }
                loadsinglereport();
            })

        }
    }
//    getDoctorloc();
 try{
                   if(localStorage.devicetype.toLowerCase()==='iphone' || localStorage.devicetype.toLowerCase()==='ipad'){
//                         confirm(localStorage.devicetype); 
                        $('.iosstatusbar').css('display','block');
                    }
    }catch(err){}
});
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
	    if("loadsingleform" in localStorage){
		
	    }else{
	    localStorage.removeItem("disback");
	}
            logout();
        }
        else if ("apptback" in localStorage) {
	    if("loadsingleform" in localStorage){
		
	    }else{
	  localStorage.removeItem("apptback");
	}
	     
            logout();
        } else {
            loadpage($('#hdncountforms').val(), $('#hdnrights').val());
        }
    }else{
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
        if ("repback" in localStorage||"apptback" in localStorage||"disback" in localStorage) {
	     if("loadsingleform" in localStorage){
		
	    }else{
	   localStorage.removeItem("repback");
	   localStorage.removeItem("apptback");
	   localStorage.removeItem("disback");
	}
            
            logout();
        }
        else {
            loadreport(dispname, repid, paramtype);
        }
    }else{
	 $('#mydiv').hide();
	localStorage.removeItem("repback");
	localStorage.removeItem("disback");
	localStorage.removeItem("apptback");
    }
}
var cnt=0;
function loadpage(pageid, rights,label,thisid) {
  // alert("thisid="+$(thisid).attr("formid"));
    debugger;
//    alert("loadpage fn js/dashboardmenubuttons.js");
try{localStorage.apptback = 0;}catch(err){}
    if(localStorage.neo!="1"){
         var backnew="1";
         localStorage.backnew=backnew;
          localStorage.backbuttonnew=localStorage.backbuttonnew;
     }
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
          var backnew="1";
         localStorage.backnew=backnew;
          localStorage.backbuttonnew=localStorage.backnew;
      }catch(err){}
     $('#mydiv').show();
    pageid = pageid.split("?");
    
    var dis = pageid[0].indexOf('DIS');
     var logoutcurrentid=localStorage.currentformid;;
    localStorage.currentformid = getParameterName(pageid[1], 'webformid');
   
    localStorage.logoutcurrentid=logoutcurrentid;
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
//function logout() {
//    debugger;
//             // localStorage.frmlogout="1";              
//    var neosoftmenu=getParameterByName("neosoftmenu");
////    var neosoftmenu1=getParameterByName("neosoftmenu1");
//     if(localStorage.neosoftmenuflg=="1" && neosoftmenu!="1"){
//          var done=0;
//
//         $(".menudivs").each(function(){
//            
//             if($(this).css("display")=="block" && done==0)
//             {    
//                 var numberfield=$(this).attr("numberfield");
//                 var number=numberfield.replace("class","");
//                 var number1=parseInt(number)-1;//parseInt
//                   if(number1==0){
//                       cnt=0;
//                   localStorage.neosoftmenuflg="0";
////                  $(".tap").each(function(){ 
////                  var url=$(this).attr("url");
////                  if(url.indexOf("frmtype=6")!=-1)
////                  $(this).css("display","block");
////                  });
//                  location.href = "dashboardmenu.html";  
////$(".tap").css("display","none");
////  $(".neo").css("display","block");
//                     }
//                $(".class"+number).css("display","none");
////                 if(!(".backcolr").hasClass("class"+number1)){
////                     $(".class"+number1).css("display","block");
////                 }
//                 $(".class"+number1).css("display","block");
//                 $(".class"+number1).find(".tap").css("display","block");
//               localStorage.neosoftmenuclass="class"+number1;
//               if(number1){
//                   var i;
//                 for(i=number;i>number1;i--){
//                   $(".class"+number).remove();
//                  }
//               }
//               
//               var hedlabel=$(this).attr("label");
//                $('.header1').html(hedlabel);
//               done=1;
//             }
//          });
//      }else{
//          if(localStorage.neosoftmenuflg=="1"  && localStorage.neosoftmenuclass!="class1"){
//              localStorage.frmlogout="1"; 
//              //var hedlabel=$(this).attr("label");
//              //var headlabel=localStorage.lbl;
//               // $('.header1').html(hedlabel);
//                     loadmultipleforms();
//                }else{
//    location.href = "dashboardmenu.html";
//                }
//     }
//}

function logout() {
    debugger;
    var backnew=localStorage.backnew;
    if(backnew=="1"){
        localStorage.backnew="0";
//    localStorage.formid=localStorage.drillformid;
    localStorage.formid=localStorage.logoutcurrentid;
             // localStorage.frmlogout="1";              
    var neosoftmenu=getParameterByName("neosoftmenu");
//    var neosoftmenu1=getParameterByName("neosoftmenu1");
     if(localStorage.neosoftmenuflg=="1" && neosoftmenu!="1"){
          var done=0;

         $(".menudivs").each(function(){
            
             if($(this).css("display")=="block" && done==0)
             {    
                 var numberfield=$(this).attr("numberfield");
                 var number=numberfield.replace("class","");
                 var number1=parseInt(number)-1;//parseInt
                   if(number1==0){
                       cnt=0;
                   localStorage.neosoftmenuflg="0";
//                  $(".tap").each(function(){ 
//                  var url=$(this).attr("url");
//                  if(url.indexOf("frmtype=6")!=-1)
//                  $(this).css("display","block");
//                  });
                  location.href = "dashboardmenubuttons.html";  
//$(".tap").css("display","none");
//  $(".neo").css("display","block");
                     }
                $(".class"+number).css("display","none");
//                 if(!(".backcolr").hasClass("class"+number1)){
//                     $(".class"+number1).css("display","block");
//                 }
                 $(".class"+number1).css("display","block");
                 $(".class"+number1).find(".tap").css("display","block");
               localStorage.neosoftmenuclass="class"+number1;
               if(number1){
                   var i;
                 for(i=number;i>number1;i--){
                   $(".class"+number).remove();
                  }
               }
               
               var hedlabel=$(this).attr("label");
                $('.header1').html(hedlabel);
               done=1;
             }
          });
      }else{
          if(localStorage.neosoftmenuflg=="1"  && localStorage.neosoftmenuclass!="class1"){
              localStorage.frmlogout="1"; 
              //var hedlabel=$(this).attr("label");
              //var headlabel=localStorage.lbl;
               // $('.header1').html(hedlabel);
                     loadmultipleforms();
                }else{
    location.href = "dashboardmenubuttons.html";
                }
     }
}else{
      //localStorage.formid=localStorage.drillformid;
      localStorage.formid=localStorage.logoutcurrentid;
             // localStorage.frmlogout="1";              
    var neosoftmenu=getParameterByName("neosoftmenu");
//    var neosoftmenu1=getParameterByName("neosoftmenu1");
     if(localStorage.neosoftmenuflg=="1" && neosoftmenu!="1"){
          var done=0;

         $(".menudivs").each(function(){
            
             if($(this).css("display")=="block" && done==0)
             {    
                 var numberfield=$(this).attr("numberfield");
                 var number=numberfield.replace("class","");
                 var number1=parseInt(number)-1;//parseInt
                   if(number1==0){
                       cnt=0;
                   localStorage.neosoftmenuflg="0";
//                  $(".tap").each(function(){ 
//                  var url=$(this).attr("url");
//                  if(url.indexOf("frmtype=6")!=-1)
//                  $(this).css("display","block");
//                  });
                  location.href = "dashboardmenu.html";  
//$(".tap").css("display","none");
//  $(".neo").css("display","block");
                     }
                $(".class"+number).css("display","none");
//                 if(!(".backcolr").hasClass("class"+number1)){
//                     $(".class"+number1).css("display","block");
//                 }
                 $(".class"+number1).css("display","block");
                 $(".class"+number1).find(".tap").css("display","block");
               localStorage.neosoftmenuclass="class"+number1;
               if(number1){
                   var i;
                 for(i=number;i>number1;i--){
                   $(".class"+number).remove();
                  }
               }
               
               var hedlabel=$(this).attr("label");
                $('.header1').html(hedlabel);
               done=1;
             }
          });
      }else{
          if(localStorage.neosoftmenuflg=="1"  && localStorage.neosoftmenuclass!="class1"){
              localStorage.frmlogout="1"; 
              //var hedlabel=$(this).attr("label");
              //var headlabel=localStorage.lbl;
               // $('.header1').html(hedlabel);
                     loadmultipleforms();
                }else{
    location.href = "dashboardmenu.html";
                }
     }  
}
}

function logout1() {
    debugger;
              localStorage.frmlogout="1";
    var neosoftmenu=getParameterByName("neosoftmenu");
//    var neosoftmenu1=getParameterByName("neosoftmenu1");
     if(localStorage.neosoftmenuflg=="1" && neosoftmenu!="2"){
          var done=0;

         $(".menudivs").each(function(){
            
             if($(this).css("display")=="block" && done==0)
             {
                 var numberfield=$(this).attr("numberfield");
                 var number=numberfield.replace("class","");
                 var number1=parseInt(number)-1;//parseInt
                   if(number1==0){
                       cnt=0;
                   localStorage.neosoftmenuflg="0";
//                  $(".tap").each(function(){ 
//                  var url=$(this).attr("url");
//                  if(url.indexOf("frmtype=6")!=-1)
//                  $(this).css("display","block");
//                  });
                  location.href = "dashboardmenu.html";  
//$(".tap").css("display","none");
//  $(".neo").css("display","block");
                     }
                 $(".class"+number).css("display","none");
//                 if(!(".backcolr").hasClass("class"+number1)){
//                     $(".class"+number1).css("display","block");
//                 }
                 $(".class"+number1).css("display","block");
                 $(".class"+number1).find(".tap").css("display","block");
               
               done=1;
             }
          });
      }else{
          if(localStorage.neosoftmenuflg=="1"  && localStorage.neosoftmenuclass!="class1"){
                     loadmultipleforms();
                }else{
    location.href = "dashboardmenu.html";
                }
     }
}

 
function loadreport(reportnm, reportid, paramtype) {
    localStorage.reportid = reportid;
    localStorage.paramtype = paramtype;
    localStorage.reportnm = reportnm;
       $('#mydiv').hide();
    location.href = 'webreports.html';
}
 function loadmultipleforms(label) {
 debugger;
    try {
       // alert(localStorage.currentformid);
         var neosoftmenu="";
           neosoftmenu=getParameterByName("neosoftmenu");
          localStorage.formid=localStorage.currentformid;
        if(neosoftmenu=="1"  &&   localStorage.frmlogout=="0"){    
            if(localStorage.currentformid=="dashboard"){
              localStorage.formid=getParameterByName("wfid");
             localStorage.currentformid=getParameterByName("frompage");
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
//                    var neosoftmenu=  getParameterByName("neosoftmenu");
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
//           function loadmultipleforms(label) {
//debugger;
//    try {
//        $('.header1').html(label);
//         var path = localStorage.ipadrs;
//        var formid = localStorage.formid;
//        var currentformid = localStorage.currentformid;
//        var locid = localStorage.locid;
//        $.get(path + "/CheckFormMobile?type=1&webformid=" + currentformid + "&frompage=" + formid + "&&mobile=yes&locid=" + locid + "&userid=" + localStorage.userid + "&usernm=" + localStorage.usernm, function (responseText) {
//            $('#mydiv').hide();
//            $('.pad').hide();
//            $('.active').remove();
//            var div = "<div class='row pad "+currentformid+" "+localStorage.neosoftmenuclass+"  active divs menudivs' style='margin:0px;'>"+responseText+"</div>";
//            $('.backcolr').append(div);
//             var wnht = window.innerHeight;
//            $(".backcolr").css('display','table');
//            $(".backcolr").css('width','100%');
//            $(".menudivs").css('display','table-cell');
//            $(".menudivs").css('width','100%');
//            $(".menudivs").css('vertical-align','middle');
//                    $(".menudivs").css("height", parseInt(wnht) + -110 + "px");
////            $("."+currentformid).children().each(function(){
////                var url = $(this).attr("url");
////                var index = url.lastIndexOf("=");
////                url = url.substr(index+1).toString().trim();
////               if(url==="6"){
////                   $("."+currentformid).addClass("menudivs");
////               }
////            });
//            //console.log(responseText);
//        });
//    } catch (err) {
//        $('#mydiv').hide();
//        alert(err);
//    }
//}
