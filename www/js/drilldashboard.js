/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    
$(document).ready(function () {
    debugger;
    try{ var htldo = window.innerHeight;
     var asgnmrgn=htldo/2;
     $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
}catch(err){}
    debugger;
    var ipads = localStorage.ipadrs;
    var formid = localStorage.currentformid;
    var locid = localStorage.locid;
    var mrno="";
    if("mrno" in localStorage){
        mrno=localStorage.mrno;
    }
    else{
        mrno="";
    }
    var ffid="";
    var subdrill="";
    try{
        if(getParameterByName("ffid").indexOf("wf")>=0){
            formid=getParameterByName("ffid");
        }
        
        subdrill=getParameterByName("subdrill");
    }
    catch(ee){
        
    }
//    alert(localStorage.currentformid);
//alert(mrno);
//alert(localStorage.docid);
//document.getElementById("mydiv").style.display="block";
var patapp=localStorage.patapp;
var appName = localStorage.appname;
    $.get(ipads + '/admin/DrillDashboardview.jsp?formid=' + formid + '&locid=' + locid+'&mrno='+mrno+'&patapp='+patapp+'&subdrill='+subdrill+'&ffid='+ffid + "&appName=" + appName, function (responseText) {
        debugger;
        $('#data').html(responseText);
        $("#txtFromdt").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:2020'
        });
        $("#txttodt").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:2020'
        });
        try{
//        loadLocNm();
    }
    catch(ee){
        
    }
    try{
        loaddata();
    }
    catch(ee){
       // document.getElementById("mydiv").style.display="none";
    }
    
        if(localStorage.patapp==1){
            $(".lbldisnon").css("display","none");
            document.getElementById("txtFromdt").style.display="none";
            document.getElementById("txttodt").style.display="none";
            document.getElementById("fromlabel").style.display="none";
            document.getElementById("tolabel").style.display="none";
            document.getElementById("settbutton").style.display="none";
            document.getElementById("btnRefresh").style.display="none";
        }
      //  else{
        try{
            if($("#dateopt").val()=="1"){
                $(".lbldisnon").css("display","block");
                //for displaying dates and refresh...
                 document.getElementById("txtFromdt").style.display="";
           
                //for displaying dates and refresh...
                 document.getElementById("txttodt").style.display="";
                 $("#btnRefresh").show();
            }
        }
        catch(ee){
//             document.getElementById("mydiv").style.display="none";
        }
   // }
            // document.getElementById("mydiv").style.display="none";
    });

});

function showdetails(id) {
    debugger;
//        var audio = document.getElementById("audio");
//       audio.play();
    var screen = $(id).attr('screen');
    document.getElementById("screenid").value=screen;
    var label = $(id).attr('label');
    document.getElementById("hdnlabel").value=label;
    var key_id = $(id).attr('key_id');
    document.getElementById("hdnkeyid").value=key_id;
    var webid = document.getElementById("hdnwebid").value;
     var fd = document.getElementById("txtFromdt").value;
    var td = document.getElementById("txttodt").value;
    var locid = localStorage.locid;
    var uitype="0";
    if(document.getElementById("chklist").checked==true){
    var uitype="0"    ;
//    document.getElementById("chkmenu").checked=false;
    
    }else if(document.getElementById("chkbubble").checked==true){
     uitype="1";    
    }else{
     uitype="2";  
//     document.getElementById("chkmenu").checked=false;
    }
    
    var chkmenu="";
    try{
    if(document.getElementById("chkmenu").checked==true){
        chkmenu="1";
        uitype="1";
        
    }
    }
    catch(ee){
        
    }
    document.getElementById("mydiv").style.display = 'block';
    try {
        var type="";
        try{
        document.getElementById(screen).value = key_id + "@" + label;
    }
    catch(ee){
        
    }
        var mrno=document.getElementById("txtmrno").value;
        var loaddata=id.getAttribute("replacedata");
        document.getElementById("hdndata").value=loaddata;
        var printdata=id.getAttribute("print");
        document.getElementById("printdata").value=printdata;
        if(printdata!=null){
       var printdata1=printdata;
            if(printdata.indexOf("@")>=0){
            if(printdata.toUpperCase().indexOf("SELECT")<0){
                printrecord(printdata,id);
                return;
            }
          else if(printdata.toUpperCase().indexOf("QRY")<=0){
              var dischprint = printdata.split('@');
              if(dischprint[0]==='Discharge Summary'){
                  printDisch(dischprint[1].replace(/\$key_id/g,"'"+key_id+"'"),key_id);
                  return;
              }else{
                printrecord(printdata1,id);
                return;
            }
            }
            else{
                type="loadnextscreen";
            }
            
        }
    
        else if(printdata=="DGPRINT"){
            dgprint(id);
            return;
        }
        else if(printdata=="formview"){
            loadformview(id);
            return;
        }
        else{
            type="loadnextscreen";
            printdata="";
        }
    }
    var docid=localStorage.opdocid;
        $.get(localStorage.ipadrs + '/DrillDashboardview?table=loadnextscreen&webformid=' + webid + '&key_id=' + key_id + '&label=' + label + '&screen=' + screen+'&locid='+locid+'&fd='+fd+'&td='+td+'&mrno='+mrno+'&loaddata='+loaddata+'&printdata='+printdata+'&uitype='+uitype+'&docid='+docid+'&icons='+chkmenu+'&deptid='+localStorage.deptid+'&subdeptid='+localStorage.sdeptid, function (responsetext) {
            debugger;
            
            if (responsetext === "No Records Found") {
                document.getElementById("mydiv").style.display = 'none';
                 document.getElementById("btnRefresh").style.display = 'none';
                 document.getElementById("drilldata").applyClasses="col-md-12 clkdivempty";
                return;
            } else {
                var id = screen.replace("Screen", "");
                document.getElementById("btnRefresh").style.display = 'none';
                 document.getElementById("mydiv").style.display = 'none';
                document.getElementById("drilldata").innerHTML = responsetext;
               
            }
        });
    } catch (e) {
        document.getElementById("mydiv").style.display = 'none';
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function printDisch(qry,keyid) {
    $.get(localStorage.ipadrs + '/DischPrintMobile?qry='+encodeURIComponent(qry)+"&keyid="+keyid,function(responseText){
        if (responseText.indexOf("$")==-1) {
           load_homeorders(responseText)
        }else{
            alert(responseText);
            document.getElementById("mydiv").style.display = "none";
            localStorage.showpdf = "1";
        }
    });

}
$(document).ready(function () {
    try{ var htldo = window.innerHeight;
     var asgnmrgn=htldo/2;
     $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
}catch(err){}
    $(".Date2").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2020'
    });
    $(".Date1").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2020'
    });

});

function loadscreendata(){
    debugger;
    var div = document.getElementById("drilldata");
     var screen = div.childNodes[0].getAttribute("screen");
    var nxtscreenid = screen.replace("Screen", "");
    var id1="";
//    var screen=document.getElementById("screenid").value;
    if(nxtscreenid=="" ||nxtscreenid=="1"){
       loaddata();
   }
   else{
       id1 = parseInt(nxtscreenid)-1;
       if (id1 > 0) {
        var hiddenid = document.getElementById("Screen" + id1).value.split("@");
      var  key_id = hiddenid[0];
      var  label = hiddenid[1];
      var webid = document.getElementById("hdnwebid").value;
      var screen1=screen.replace("Screen","");
      screen1=parseInt(screen1)-1;
      screen="Screen"+screen1;
      
    }
       var printdata=document.getElementById("printdata").value;
       var load=document.getElementById("hdndata").value;
       var key_id= document.getElementById("hdnkeyid").value;
         var mrno=document.getElementById("txtmrno").value;
       var label= document.getElementById("hdnlabel").value;
       var webid = document.getElementById("hdnwebid").value;
     var fd = document.getElementById("txtFromdt").value;
    var td = document.getElementById("txttodt").value;
    var locid = localStorage.locid;
    var uitype="0";
    if(document.getElementById("chklist").checked==true){
    var uitype="0";
//    document.getElementById("chkmenu").checked=false;
    }else if(document.getElementById("chkbubble").checked==true){
     uitype="1";    
     
    }else{
     uitype="2";  
//     document.getElementById("chkmenu").checked=false;
    }
    var chkmenu="0";
    try{
    if(document.getElementById("chkmenu").checked==true){
        uitype="1";
        chkmenu="1";
    }
    }
    catch(ee){
        
    }
//    alert(uitype);
     document.getElementById("mydiv").style.display = 'block';
        $.get(localStorage.ipadrs + '/DrillDashboardview?table=loadnextscreen&webformid=' + webid + '&key_id=' + key_id + '&label=' + label + '&screen=' + screen+'&locid='+locid+'&fd='+fd+'&td='+td+'&mrno='+mrno+'&loaddata='+load+'&printdata='+printdata+'&uitype='+uitype+'&icons='+chkmenu+'&deptid='+localStorage.deptid+'&subdeptid='+localStorage.sdeptid, function (responsetext) {
            debugger;
            
            if (responsetext === "No Records Found") {
                document.getElementById("mydiv").style.display = 'none';
                 document.getElementById("btnRefresh").style.display = 'none';
                 document.getElementById("drilldata").applyClasses="col-md-12 clkdivempty";
                return;
            } else {
                var id = screen.replace("Screen", "");
                document.getElementById("btnRefresh").style.display = 'none';
                 document.getElementById("mydiv").style.display = 'none';
                document.getElementById("drilldata").innerHTML = responsetext;
                if(document.getElementById("chklist").checked==true){
    document.getElementById("backimgID").style.display = 'none';
    }else if(document.getElementById("chkbubble").checked==true){
    document.getElementById("backimgID").style.display = 'block';
    }else{
    document.getElementById("backimgID").style.display = 'none';
    }
               
            }
        });
   }
}
function loaddata() {
    debugger;
document.getElementById("mydiv").style.display = 'block';
    var fd = document.getElementById("txtFromdt").value;
    var td = document.getElementById("txttodt").value;
    var locid = localStorage.locid;
    var uitype="0";
    if(document.getElementById("chklist").checked==true){
    var uitype="0" 
//    document.getElementById("chkmenu").checked=false;
    }else if(document.getElementById("chkbubble").checked==true){
     uitype="1";    
     
    }else{
     uitype="2";  
//     document.getElementById("chkmenu").checked=false;
    }
    var chkmenu="";
    try{
    if(document.getElementById("chkmenu").checked==true){
        chkmenu="1";
        uitype="1";
    }
    }
    catch(ee){
        
    }
//    var locid = getselvalue('ddlLocation');
var docid=localStorage.opdocid;
    var webid = document.getElementById("hdnwebid").value;
    var mrno=document.getElementById("txtmrno").value;
    $.get(localStorage.ipadrs + '/DrillDashboardview?table=load&webformid=' + webid + '&locid=' + locid + '&td=' + td + '&fd=' + fd+'&mrno='+mrno+'&uitype='+uitype+'&docid='+docid+'&icons='+chkmenu+'&deptid='+localStorage.deptid+'&subdeptid='+localStorage.sdeptid, function (responsetext) {
        if (responsetext === "No Records Found") {
            return;
        } else {
            document.getElementById("drilldata").innerHTML = responsetext;
              if(document.getElementById("chklist").checked==true){
    document.getElementById("backimgID").style.display = 'none';
    }else if(document.getElementById("chkbubble").checked==true){
    document.getElementById("backimgID").style.display = 'block';
    }else{
    document.getElementById("backimgID").style.display = 'none';
    }
            var sc = document.getElementById("id_firstscreen");
    //            alert(sc.children.length);
                                if (sc.children.length == 1) {
//                                    alert("clicked");
                                    sc.children[0].onclick();
                                }
        }
        document.getElementById("mydiv").style.display = 'none';
    });
   
}
function getselvalue(selid) {
    debugger;
    var id = document.getElementById(selid);
    var selvalue = id.options[id.selectedIndex].value;
    return selvalue;
}

function loadLocNm() {
    $.get(localStorage.ipadrs + '/TOPDOCTORSAPPTS?table=LocNm', function (responseJson) {
        if (responseJson !== null) {
            debugger;
            try{
            var select = document.getElementById("ddlLocation");
            select.length = 1;
            var mem = responseJson;
            for (var i = 0; i < mem.length; i++) {

                var sourcename = responseJson[i]['LOCNM'];
                var indexo = responseJson[i]['LOCID'];
                select.options[select.options.length] = new Option(sourcename, indexo);
            }
            document.getElementById("ddlLocation").value = document.getElementById("locid").value;
        }
        catch(ee){
        
    }
    }
    
    });
}
function popselvalue(selid, pval)
{
    var psel = document.getElementById(selid);
    if (pval.length > 1)
    {
        for (var i = 0; i < psel.options.length; i++) {
            if (psel.options[i].value === pval) {
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

function backscreen(id) {
    debugger;
    document.getElementById("screenid").value="";
    var div = document.getElementById("drilldata");
    
//    localStorage.showpdf="1";
    
    if("showpdf" in localStorage){
        if(localStorage.showpdf==="1"){
            localStorage.showpdf="0";
            document.getElementById("drilldata").style.display="block";
            document.getElementById("divpdf").style.display="none";
            document.getElementById("mydiv").style.display="none";
            return;
            
        }
    }
    if(localStorage.pdfchart=="1"){
        document.getElementById("divpdfchart").style.display="none";
                document.getElementById("divpdf").style.display="block";
                localStorage.pdfchart="0";
                return;
    }
    if("chart" in localStorage){
        if(localStorage.chart=="1"){
            localStorage.chart="0";
            document.getElementById("drilldata").style.display="block";
            document.getElementById("divpdf").style.display="none";
            document.getElementById("mydiv").style.display="none";
            return;
        }
    }
    
     var screenid = div.childNodes[0].getAttribute("screen");
    var nxtscreenid = screenid.replace("Screen", "");
    var uitype="0";
    if(document.getElementById("chklist").checked==true){
    var uitype="0"    
    }else if(document.getElementById("chkbubble").checked==true){
     uitype="1";    
    }else{
     uitype="2";  
    }
    
//    alert(nxtscreenid);
    if(localStorage.patapp==1 && nxtscreenid==="1"){
    location.href="PatientLoginThirdScreen.html";

    }
    else if(localStorage.backformid="dashboard" && nxtscreenid==="1"){
        location.href="dashboardmenubuttons.html";
    }
    else{
        var locid = localStorage.locid;
    var len = "", screenid = "", screenno = "";
    var fromdate = document.getElementById("txtFromdt").value;
    var todate = document.getElementById("txttodt").value;
    var keyid = "", label = "";
    var div = document.getElementById("drilldata");
     var screenid = div.childNodes[0].getAttribute("screen");
    var nxtscreenid = screenid.replace("Screen", "");
    var id1 = parseInt(nxtscreenid) - 1;
    if (id1 == 0) {
        location.href = "dashboardmenubuttons.html";
        return;
    }
    var lastid = parseInt(id1) - 1;
    if (lastid > 0) {
        var hiddenid = document.getElementById("Screen" + lastid).value.split("@");
        keyid = hiddenid[0];
        label = hiddenid[1];
    }
    var webid = document.getElementById("hdnwebid").value;
    document.getElementById("mydiv").style.display = 'block';
    var mrno=document.getElementById("txtmrno").value;
//    var loaddata=id.getAttribute("replacedata");
var docid=localStorage.opdocid;
var chkmenu="0";
 try{
    if(document.getElementById("chkmenu").checked==true){
        uitype="1";
        chkmenu="1";
    }
    }
    catch(ee){
        
    }
    $.get(localStorage.ipadrs + '/DrillDashboardview?table=loadbackscreen&webformid=' + webid + '&fromdate=' + fromdate + '&todate=' + todate + '&keyid=' + keyid + '&screen=' + id1 + '&label=' + label+'&locid='+locid+'&mrno='+mrno+'&uitype='+uitype+'&docid='+docid+'&icons='+chkmenu+'&deptid='+localStorage.deptid+'&subdeptid='+localStorage.sdeptid, function (responsetext) {
        if (responsetext == "No Records Found") {
            return;
        } else {
           if(id1>1){
              document.getElementById("btnRefresh").style.display = 'none';  
           }else{
                document.getElementById("btnRefresh").style.display = 'inline-block';
           }
            document.getElementById("drilldata").innerHTML = responsetext;
            var data=document.getElementById("drilldata");
            if(data!=null){
           if(data.children[0].children.length==1){
               $('.bublehdngrow').each(function(){
                    $('.bublehdngrow').addClass('v1');
                });
           }
           else if(data.children[0].children.length==2){
               $('.bublehdngrow').each(function(){
                    $('.bublehdngrow').addClass('v2');
                });
           }
           else if(data.children[0].children.length==3){
               $('.bublehdngrow').each(function(){
                    $('.bublehdngrow').addClass('v3');
                });
           }
           else{
               $('.bublehdngrow').each(function(){
                    $('.bublehdngrow').addClass('v3');
                });
           }
       }
        }
        document.getElementById("mydiv").style.display = 'none';
    });
    }
}

function settings() {
    location.href = 'settings.html';
}


function printrecord(printdata,id){
//                var encid=$('#txtenc').val();
//                var enc=encid.split("@");
//                 var subpid=$('#cmbprint').val();
                getPdf(id.getAttribute("key_id"),'','','0',printdata,'patprint',id);
                
            }
            function getPdf(key_id_value,date_id_value,label,all,subpid,patprint,id){
                debugger;
                  var replacedata=id.getAttribute("replacedata");
                  var subpid1=subpid;
                if(subpid.toUpperCase().indexOf("WF")<0 || subpid.substring(0,3)=='Qry'){
 
    var mrno=document.getElementById("txtmrno").value;
    
    key_id_value = key_id_value.replace(/`/g,"'");
    key_id_value  = encodeURIComponent( key_id_value.toUpperCase().trim());
    subpid1=subpid1.replace(/\+/g, '_pp');

    $('#tabs').hide();
    var img = '<img src="'+localStorage.ipadrs+'/icons/pdf_loading.gif"  style="margin-top:25%;width:150px;height:150px" />'
    $('#attachview').html(img);
    var div = document.getElementById('divFrame1');
    var drillwebid = document.getElementById("hdnwebid").value;
    var path = localStorage.ipadrs+'/DisData';
//    $.get(path,function(responseText){
//        debugger;
//        load_homeorders(responseText);
//        
//        
//    });
    
    $.ajax({
                         
        url: path,
        type: "POST",
        data:'type=pdf&mrno='+mrno+'&docid= &keyid='+key_id_value+'&dateid='+date_id_value+'&formid= &label='+label+'&all='+all+'&subprintid='+subpid1+'&mobile=1&patprint='+patprint+'&replacedata='+replacedata+'&drillwebid='+drillwebid+'&rtype='+id.getAttribute("rtype"),
        dataType: "text/html",
        success: function (responceJson) {
            if (responceJson.statusText == "OK") {
                var responceJson=responceJson.responseText;
                load_homeorders(responceJson);
            }
        },
        error:function(error){
            if (error.statusText == "OK") {
                var responceJson=error.responseText;
                load_homeorders(responceJson);
            }
        }
    });
            }
            
            else{
                var webformid="";
                if(subpid.indexOf("@")>=0){
                    var ww=subpid.split("@");
                    webformid=ww[1];
                }
                var drillwebid = document.getElementById("hdnwebid").value;
                var path = localStorage.ipadrs+'/patientAppMobileAppts?type=gettransid&webformid='+webformid+'&replacedata='+replacedata+'&drillwebid='+drillwebid;
    $.get(path,function(responseText){
        debugger;
//        alert(responseText);
           
                    var path = localStorage.ipadrs+'/WebFormPrint?type=gettransid&webformid='+webformid+'&transid='+responseText+'&wfid='+webformid+'&id='+key_id_value+'&reqtype=print&mobile=1&patapp=1&replacedata='+replacedata;
                    $.get(path,function(responseText1){
                        debugger;
                        if(responseText1=="1"){
                         load_homeorders(webformid+""+key_id_value+".pdf");
                     }
                     else{
                         alert(responseText1);
                         return;
                     }
                    });
        
        
        
    });
            }
            
            }
//function selshow(id){
//                        debugger;
//                        var con=id.value.toUpperCase();
//                            var divdata=document.getElementById("drilldata");
//                            if(divdata.children.length>= 1){
//                                var divsz=divdata.children[0].childNodes.length;
//                                for(var i=0;i<divsz;i++){
//                                      if(divdata.children[0].childNodes[i].tagName!="LABEL"){
//                                    var innerdiv=divdata.children[0].children[i].childNodes.length;
//                                       if(innerdiv>2){
//                                    for(var k=0;k<innerdiv;k++){
//                                            if(divdata.children[0].children[i].childNodes[k].tagName!="LABEL"){
//                                               if(divdata.children[0].children[i].childNodes[k].innerText.toUpperCase().indexOf(con)>=0){
//                                               divdata.children[0].children[i].children[k].style.display="block";
//                                           }else{
//                                               divdata.children[0].children[i].children[k].style.display="none";
//                                           }
//                                       }
//                                    }
//                                                                       }else{
//                                    if(divdata.children[0].childNodes[i].innerText.toUpperCase().indexOf(con)>=0){
//                                       divdata.children[0].childNodes[i].style.display="block";
//                                    }else{
//                                        divdata.children[0].childNodes[i].style.display="none";
//                                    }
//                                      }
//                                    
//                                      }
//                                }
//                            }
//                    }
            function load_homeorders(filename) {
                debugger;
                document.getElementById("divpdf").style.display="block";
                document.getElementById("drilldata").style.display="none";
                localStorage.showpdf="1";
//                document.getElementById("data").style.display="none";
try{
document.getElementById("pdfpath").value=filename;
}
catch(ee){
    
}
    var pdfpath = localStorage.ipadrs+"/pdfjs-1.1.366-dist/web/viewer.jsp?mrno="+filename;
         document.getElementById("divpdf").innerHTML = '<object class="mob" type="text/html" data="'+pdfpath+'" style="width:100%;" ></object><input type="button" onclick="sharethis()" value="Share" class="btn btn-success" style="position:fixed;z-index:999999999;bottom:50px;outline:none;right:30px;">';
     document.getElementById("mydiv").style.display="none";
// localStorage.pdfpath = pdfpath;
////            $('#mydiv').hide();
//localStorage.prdboard="1";
//            location.href = 'globalreport.html';
}

function dgprint(id){
    debugger;
    document.getElementById("mydiv").style.display="block";
    var data=id.getAttribute("replacedata");
    var fid=id.getAttribute("dgwebid");
    var dgprintweb=id.getAttribute("dgprintweb");
   
    var locid = localStorage.locid;
     var path="",wordole="0",reqno="";
     var reqid=id.getAttribute("reqid");
     if(dgprintweb=="1"){
          
          $.get(localStorage.ipadrs + '/DrillDashboardview?table=chkwordole&testid=' + id.getAttribute("key_id") +'&reqid='+reqid , function (responcejson) {
                                if(responcejson!="" || responcejson!= null ){
                                    wordole=responcejson[0]['WORDOLE'];
                             reqno=responcejson[0]['REQNO'];
                                }
                                 if(wordole=="1"){
             path=localStorage.ipadrs+"/DgWordole?tresultid=&scheme_testid=&reporthead=1&testid=$key_id&formid="+fid+"&reqno="+reqno+"&locid="+locid+"&reqid="+reqid+"&ptype=0&rep=0&calledfrom=2&keyid=$REQID&mobile=1&drill=1"; 
          }else{
             path=localStorage.ipadrs+"/DgReporting?tresultid=&scheme_testid=&chkrephead=1&testid=$key_id&formid="+fid+"&locid="+locid+"&reqid="+reqid+"&ptype=0&rep=0&calledfrom=2&keyid=$REQID&mobile=1&drill=1"; 
          }
           path=path.replace("$key_id",id.getAttribute("key_id"));
     if(data.trim()!=""){
                            if(data.indexOf("-->")>=0){
                                var loadd=data.split("-->");
                                for(var k=0;k<loadd.length;k++){
                                    if(loadd[k].indexOf("@")>=0){
                                        var loaddd=loadd[k].split("@");
                                        path=path.replace("$"+loaddd[0].toUpperCase().replace("_HIDDEN",""),loaddd[1]);
                                    }
                                }
                            }
                        }
    
    $.get(path,function(responcejson){
        if(responcejson!=null){
            debugger;
            document.getElementById("divpdf").style.display="block";
                document.getElementById("drilldata").style.display="none";
//            document.getElementById("divpdf").innerHTML=responcejson;
//            var pdfpath =responcejson;
try{
document.getElementById("pdfpath").value=responcejson;
}
catch(ee){
    
}
            var pdfpath = localStorage.ipadrs+"//pdfjs-1.1.366-dist/web/viewer.jsp?mrno="+responcejson;
            
            
                document.getElementById("divpdf").innerHTML = '<object class="mob" type="text/html" data="'+pdfpath+'" style="width:100%;" ></object><input type="button" onclick="sharethis()" value="Share" class="btn btn-success" style="position:fixed;z-index:999999999;bottom:50px;outline:none;right:30px;">';
    document.getElementById("mydiv").style.display="none";
    localStorage.showpdf="1";
    
        }
    });
        
                            });
         
         
     }else{
         
         $.get(localStorage.ipadrs + '/DrillDashboardview?table=chkwordole&testid=' + id.getAttribute("key_id") +'&reqid='+reqid , function (responcejson) {
                                if(responcejson!="" || responcejson!= null ){
                                    wordole=responcejson[0]['WORDOLE'];
                             reqno=responcejson[0]['REQNO'];
                                }
                                if(wordole=="1"){
         path=localStorage.ipadrs+"/DgWordoleVF?tresultid=&scheme_testid=&reporthead=1&testid=$key_id&formid="+fid+"&reqno="+reqno+"&locid="+locid+"&reqid="+reqid+"&ptype=0&rep=0&calledfrom=2&keyid=$REQID&mobile=1&drill=1"; 
     }
     else{
         path=localStorage.ipadrs+"/DgReportingVF?tresultid=&scheme_testid=&chkrephead=1&testid=$key_id&formid="+fid+"&ptype=0&rep=0&calledfrom=2&keyid=$REQID&mobile=1";
     }
          path=path.replace("$key_id",id.getAttribute("key_id"));
     if(data.trim()!=""){
                            if(data.indexOf("-->")>=0){
                                var loadd=data.split("-->");
                                for(var k=0;k<loadd.length;k++){
                                    if(loadd[k].indexOf("@")>=0){
                                        var loaddd=loadd[k].split("@");
                                        path=path.replace("$"+loaddd[0].toUpperCase().replace("_HIDDEN",""),loaddd[1]);
                                    }
                                }
                            }
                        }
    
    $.get(path,function(responcejson){
        if(responcejson!=null){
            debugger;
            document.getElementById("divpdf").style.display="block";
                document.getElementById("drilldata").style.display="none";
//            document.getElementById("divpdf").innerHTML=responcejson;
//            var pdfpath =responcejson;
try{
document.getElementById("pdfpath").value=responcejson;
}
catch(ee){
    
}
            var pdfpath = localStorage.ipadrs+"//pdfjs-1.1.366-dist/web/viewer.jsp?mrno="+responcejson;
            
            
                document.getElementById("divpdf").innerHTML = '<object class="mob" type="text/html" data="'+pdfpath+'" style="width:100%;" ></object><input type="button" onclick="sharethis()" value="Share" class="btn btn-success" style="position:fixed;z-index:999999999;bottom:50px;outline:none;right:30px;">';
                document.getElementById("mydiv").style.display="none";
    localStorage.showpdf="1";
    
        }
    });
         });
        
     }
//    var path=localStorage.ipadrs+"/DgReportingVF?tresultid=&scheme_testid=&chkrephead=1&testid=$key_id&formid="+fid+"&ptype=0&rep=0&calledfrom=2&keyid=$REQID&mobile=1";
//    path=path.replace("$key_id",id.getAttribute("key_id"));
//     if(data.trim()!=""){
//                            if(data.indexOf("-->")>=0){
//                                var loadd=data.split("-->");
//                                for(var k=0;k<loadd.length;k++){
//                                    if(loadd[k].indexOf("@")>=0){
//                                        var loaddd=loadd[k].split("@");
//                                        path=path.replace("$"+loaddd[0].toUpperCase().replace("_HIDDEN",""),loaddd[1]);
//                                    }
//                                }
//                            }
//                        }
//    
//    $.get(path,function(responcejson){
//        if(responcejson!=null){
//            debugger;
//            document.getElementById("divpdf").style.display="block";
//                document.getElementById("drilldata").style.display="none";
////            document.getElementById("divpdf").innerHTML=responcejson;
////            var pdfpath =responcejson;
//            var pdfpath = localStorage.ipadrs+"//pdfjs-1.1.366-dist/web/viewer.jsp?mrno="+responcejson;
//            
//            
//    document.getElementById("divpdf").innerHTML = '<object class="mob" type="text/html" data="'+pdfpath+'" style="width:100%;" ></object>';
//    document.getElementById("mydiv").style.display="none";
//    localStorage.showpdf="1";
//    
//        }
//    });
//        
    
}

function loadformview(id){
    debugger;
//    var webid=id.getAttribute("dgwebid");
//    localStorage.showpdf="1";
//     $.get(localStorage.ipadrs + "/formview?webformid=" + webid + "&frompage=&mobile=yes&locid=&usernm="+localStorage.usernm+"&fromdis=1&theme=&mrno=" + localStorage.mrno + "&locid=" + localStorage.locid + "&docid=" + localStorage.mapopdocid + "&speid=" + localStorage.speid, function (responsetext) {
//            $('#divpdf').html(responsetext);
//            document.getElementById("divpdf").style.display="block";
//            document.getElementById("drilldata").style.display="none"
//            fillCalander();
//            checking();
////            $('#mydiv').hide();
//        });
//         localStorage.ipadrs=loc
//        localStorage.formid=localStorage.currentformid;
        $.get(localStorage.ipadrs+'/DrillDashboardview?table=checkgrph&webformid='+id.getAttribute("dgwebid"),function(responcejson){
            if(responcejson!=""){
                debugger;
                if(responcejson=="graph"){
                   
                var replacedata=id.getAttribute("replacedata");
                var key_id=id.getAttribute("key_id");
                var mrno=localStorage.mrno;
                var patapp=localStorage.patapp;
                var appName = localStorage.appname;
                $.get(localStorage.ipadrs+'/admin/chartFrameWorkViewMobile.jsp?webformid='+id.getAttribute("dgwebid")+'&replacedata='+replacedata+'&key_id='+key_id+'&mrno='+mrno+'&patapp='+patapp+'&appName='+appName,function(responcejson){
                    if(responcejson!=""){
                         document.getElementById("divpdf").style.display="block";
                document.getElementById("drilldata").style.display="none";
//                document.getElementById("divpdf").innerHTML=responcejson;
                $("#divpdf").html(responcejson);
                document.getElementById("mydiv").style.display="none";
                loadmrnodata();
                    }
                });
                }
                else if(responcejson=="manage"){
                    var key_id=id.getAttribute("key_id");
                    var imgurl = "";
                    var imgdata = "";
                    try{
                    if (document.getElementById("chkbubble").checked == true && document.getElementById("chkmanage").value=="1") {
                        for (var k = 0; k < id.childNodes.length; k++) {
                            if (id.childNodes[k].tagName == "IMG") {
                                imgurl = id.childNodes[k].src;
    //                    alert(imgurl);
                                k = id.childNodes.length;
                            }
//                            else {
//                                try {
//                                    for (var i = 0, len = id.childNodes[k].children.length; i < len; i++) {
//                                        if (id.childNodes[k].children[i].className = 'col-xs-4 col-sm-4 col-md-3') { //change child class name.
//                                            imgdata = imgdata + "@" + id.childNodes[k].children[i].textContent;
//                                        }
//                                    }
//                                }
//                                catch (ee) {
//
//                                }
//                            }
                        }
                        for(var j=0;j<id.parentNode.childNodes[id.parentNode.childNodes.length-1].childNodes.length;j++){
                            if(id.parentNode.childNodes[id.parentNode.childNodes.length-1].childNodes[j].className=='dataclmn'){
                                imgdata = imgdata + "@" + id.parentNode.childNodes[id.parentNode.childNodes.length-1].childNodes[j].textContent;
                            }
                        }
                    }
                }
                catch(e){
                    
                }
                imgdata=encodeURIComponent(imgdata);
                imgurl=encodeURIComponent(imgurl);
                var webformid=id.getAttribute("dgwebid");
                var fromdate = document.getElementById("txtFromdt").value;
    var todate = document.getElementById("txttodt").value;
    localStorage.mwebformid=webformid;
    localStorage.mkeyid=key_id;
    localStorage.mfdt=fromdate;
    localStorage.mtdt=todate;
    localStorage.imgurl=imgurl;
    localStorage.imgdata=imgdata;
    location.href='manage.html';
//                    $.get(localStorage.ipadrs+"/admin/managementMobileView.jsp?webformid="+webformid+"&mrno="+key_id+"&bkey_id="+key_id+"&bfd="+fromdate+"&btd="+todate+"&bmrno="+key_id+"&imageurl="+imgurl+"&imgdata="+imgdata+'&key_id='+key_id+'&formid='+webformid,function(responcejson){
//                        if(responcejson!=""){
//                            document.getElementById("divpdf").style.display="block";
//                document.getElementById("drilldata").style.display="none";
//                document.getElementById("divpdf").innerHTML=responcejson;
//                document.getElementById("mydiv").style.display="none";
//                        loadtable();loaddate();loaddiv();
//                        }
//                    });
                }
                else if(responcejson=="appoitments"){
                    debugger;
                    localStorage.backformid=localStorage.currentformid;
                     localStorage.currentformid = id.getAttribute("dgwebid");
        localStorage.key_id=id.getAttribute("key_id");
            localStorage.patapp = 1;
                    localStorage.mrno=localStorage.patmrno;
                    localStorage.drillappt="1";
                    localStorage.patmenuformid=localStorage.currentformid;
                    location.href = 'DisplayForms.html';
                }
                else{
                    localStorage.backformid=localStorage.currentformid;
        localStorage.currentformid=id.getAttribute("dgwebid");;
        localStorage.drill="1";
        localStorage.key_id=id.getAttribute("key_id");
//        var locid = localStorage.locid;
        
        location.href='form.html';
                }
            }
            else{
                localStorage.backformid=localStorage.currentformid;
        localStorage.currentformid=id.getAttribute("dgwebid");;
        localStorage.drill="1";
        localStorage.key_id=id.getAttribute("key_id");
//        var locid = localStorage.locid;
        
        location.href='form.html';
            }
        });
        
}



