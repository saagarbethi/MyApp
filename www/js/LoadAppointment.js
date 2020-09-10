/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 
            function loaddate(){
//                $("#txtfromdate").datepicker({dateFormat: 'dd/mm/yy', minDate: 0});
//            
//            
//                $("#txttodate").datepicker({dateFormat: 'dd/mm/yy', minDate: 0});
            }
            
             function displayalert() {
                $(function() {
                    debugger;

                    $("#alertdiv").dialog({
                        resizable: false,
                        height: 'auto',
                        width: '50%',
                        modal: true,
                        zIndex:99999999999999,
                        buttons: {
                            "Cancel": function() {
                                $(this).dialog("close");
                            }
                        }
                    });
                    //document.getElementById("txtmrnum").focus();
                });
            }
        
$(document).ready(function () {
    debugger;
//    alert("hi");
localStorage.pageNo = "1" ;
//    alert(localStorage.pageNo);
//    alert("PayDoctorIdOutside:"+localStorage.payDoctorId);
//        alert("PayBock outside:"+localStorage.payBack);
//         alert("PayBock outside:"+localStorage.apppayback);
//alert("docid=="+localStorage.payDoctorId);
// //localStorage.payBack = "0"
//    if(localStorage.apppayback=="1"){
//       alert("Inside if Condition");
////        alert("PayBack:"+localStorage.payBack);
//        var payDoc = localStorage.payDoctorId;
////        alert("payDoc:"+payDoc);
//        var flg = "";
//        var speid = "";
//        showAppoitment1(payDoc,flg,speid);
//        localStorage.payBack = "0";
//    }
    
   var path = localStorage.ipadrs;
    var formid = localStorage.webformid;
    var locid = localStorage.locid;
    //webid='+webformid+'&mrno='+mrno+'&locid='+locid+'&theme='+encodeURIComponent(theme)+'&docid='+mapopdocid+'&speid='+speid
    path = path + "admin/ScheduleDivPopMobile.jsp?type=getavldates&webid="+formid+'&mrno='+localStorage.mrno+'&locid='+locid+'&theme=&docid='+localStorage.opdocid+'&speid='+localStorage.speid;
    $.get(path, function (responseText) {
        debugger;
        try{
        document.getElementById("formdiv").innerHTML=responseText;
        loadform();
        }catch(err){
            
        }
        
//        $("#Date1").datepicker({
//            dateFormat: 'dd/mm/yy'
//        });
    }) ;
});
function loadappointments() {
    debugger;
//    alert("hi");
   var path = localStorage.ipadrs;
    var formid = localStorage.webformid;
    var locid = localStorage.locid;
    //webid='+webformid+'&mrno='+mrno+'&locid='+locid+'&theme='+encodeURIComponent(theme)+'&docid='+mapopdocid+'&speid='+speid
    path = path + "admin/ScheduleDivPopMobile.jsp?type=getavldates&webid="+formid+'&mrno='+localStorage.mrno+'&locid='+locid+'&theme=&docid='+localStorage.opdocid+'&speid='+localStorage.speid;
    $.get(path, function (responseText) {
        debugger;
//alert(responseText);
//        $('#formdiv').html(responseText);
        document.getElementById("divFrame").innerHTML=responseText;
        loadform();
        
//        $("#Date1").datepicker({
//            dateFormat: 'dd/mm/yy'
//        });
    }) ;
}


function loadform(){
    
    loaddate();
    document.getElementById("head1").innerHTML=document.getElementById("headdata").value;
    if("patapp" in localStorage){
        if(localStorage.patapp==1){
            document.getElementById("head1").style.display="none";
        }
    }
                document.getElementById("popdiv1").innerHTML=document.getElementById("divdatasch").value;
                
                 var resdata=document.getElementById("scrdata").value;
                if(resdata.indexOf("-->")>=0){
                    var data=resdata.split("-->");
                    for(var n=1;n<data.length;n++){
                        var data1=data[n].split("@");
                        document.getElementById(data1[0]).value=data1[1];
                    }
                }
                if(document.getElementById("txtlocation").value!="null"){
                    var lid=document.getElementById("locid").value;
                    
                    document.getElementById(lid).value=document.getElementById("txtlocation").value;
                }
                var docid = document.getElementById('hdnDocid').value ; 
                var speid = document.getElementById('hdnSpeid').value;
                try{
                if(docid!="null"){
                     var _docid =document.getElementById("docid").value;
                     //var option = $('<option>')
                     document.getElementById(_docid).value = docid;
                }
                if(speid!="null"){
                    
                     var _speid =document.getElementById("speid").value;
                     document.getElementById(_speid).value = speid;
                }
            }catch (errr){
                
            }
                document.getElementById("btnavl").onclick();
                
              
}

function getAvalDates1(id){
                debugger;
        var patselectedlocid=localStorage.patselectedlocid;
         var patmobile=2;
                //                alert("hi");
                 var path = localStorage.ipadrs;
                var webid=document.getElementById("webid").value;
                var colsqry=document.getElementById("colsqry").value;
                var condition=id.title;
                var scrdata1=document.getElementById("s").value;
                var scrdata="";
                if(scrdata1.indexOf("@")>=0){
                    var scr=scrdata1.split("@");
                    for(var n=1;n<scr.length;n++){
                        scrdata=scrdata+"-->"+scr[n]+"@"+document.getElementById(scr[n]).value;
                        //                    condition=condition.replace(scr[n].trim(),document.getElementById(scr[n]).value);
                        //                    colsqry=colsqry.replace(scr[n].trim(),document.getElementById(scr[n]).value);

                    }
                }
                var fromdate=document.getElementById("txtfromdate").value;
                var todate=document.getElementById("txttodate").value;
         var fromnotification=  getParameterByName("fromnotification");
         if(fromnotification=="1"){
         
         }else{
                //                document.getElementById("mydiv1").style.display="block";
                 try{ var htldo = window.innerHeight;
                        var asgnmrgn=htldo/2;
                        $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
                  }catch(err){}
          }
                document.getElementById("mydiv").style.display="block";
                $.get(path+'/TestingSchedule?patmobile='+patmobile+'&patilocid='+patselectedlocid+'&type=getavldates&webid='+webid+'&condition='+condition+'&colsqry='+colsqry+'&scrdata='+scrdata+'&fromdate='+fromdate+'&todate='+todate+'&mobile=1',function(responcejson){
                    debugger;
                    if(responcejson!="" && responcejson!=null){
                        var avldiv=document.getElementById("head3");
                        avldiv.innerHTML=responcejson;
                        localStorage.banknm=$("#id_bankname").val();
//         alert(localStorage.banknm);
                        document.getElementById("mydiv").style.display="none";
//                        document.getElementById("mydiv1").style.display="none";
//                        displaymsg2();
                    }
                    else{
                        document.getElementById("mydiv").style.display="none";
                        //                    alert("none");
                        //                    document.getElementById("mydiv1").style.dispaly="none";
                    }
                });
               var het2 = $(".tophed").css("height");
               var het3 = $("header").css("height");
//               var het4 = $(".headrowht").css("height");
                $('.bdcontaant').css("margin-top",parseInt(het2)+1+"px"); 
                $('.btnrow1').css("margin-top",parseInt(het3)+1+"px");
//                $('.btnrow1').css("margin-top",parseInt(het4)+1+"px");
                $(".rowdisplayf").css("overflow-x","hidden");

            }
            function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
             function onchangefun(id,flg){
                debugger;
                var path = localStorage.ipadrs;
                var condition=id.title;
                var fid=document.getElementById("webid").value;
                var theme = "";
                if(condition=="loadcolums"){
            
                    var s=document.getElementById("s").value;
                    var s1=s.split("@");
                    var data="";
                    for(var i=1;i<s1.length;i++){
                        data=data+"&"+s1[i]+"="+document.getElementById(s1[i]).value;
                    }
                    var locid=document.getElementById("txtlocation").value;
                    var mrno=document.getElementById("txtMrno").value;
                    var url=path+'admin/ScheduleDivPopMobile.jsp?webid='+fid+''+data+'&locid='+locid+'&mrno='+mrno;
            
//                    path = path + "admin/ScheduleDivPop.jsp?webid="+fid+""+data+"&locid="+locid+"&mrno="+mrno+
    $.get(url, function (responseText) {
        debugger;
//alert(responseText);
//        $('#formdiv').html(responseText);
        document.getElementById("divFrame").innerHTML=responseText;
        loadform();

//        $("#Date1").datepicker({
//            dateFormat: 'dd/mm/yy'
//        });
    }) ;
                }
                if(condition.indexOf("settime")>=0){
                    debugger;
                    var fromtm=document.getElementById("id_From_Time").value;
                    var dur=document.getElementById(id.id).value;
                    var webid=document.getElementById("webid").value;
                    var s=document.getElementById("s1").value;
                var scrdata="";
                var s1=s.split("@");
                var clm=document.getElementById("clm").value;
                var clm1=clm.split("@");
                for(var k=1;k<s1.length;k++){
                    var v=document.getElementById(s1[k]).value;
                    scrdata=scrdata+"-->"+s1[k]+"@"+v;
                }
                    $.get(path+'/TestingSchedule?fromtm='+fromtm+'&dur='+dur+'&type=gettime&webid='+webid+'&scrdata='+scrdata,function(responcejson){
                        if(responcejson!="" && responcejson!=null){
                            var txtid=condition.split("==");
                            var fid=txtid[0].replace("$","");
                            if(responcejson.indexOf("-->")>=0){
                                var res1=responcejson.split("-->");
                                responcejson=res1[0];
                            }
                            document.getElementById(fid).value=responcejson;
                            var tab=document.getElementById("sctable");
                            var rowcount=tab.rows.length;
                            for(var i=1;i<rowcount;i++){
                                debugger;
                                for(var j=1;j<tab.rows[i].cells.length;j++){
                                    if(tab.rows[0].cells[j].title==document.getElementById("id_clmid").value){
                                        if(tab.rows[i].cells[j].id!="" && tab.rows[i].cells[j].title==responcejson){
                                            //                                    alert("Operation Time Will be Overlaped");
                                            //                                    return;
                                        }
                                    }
                                }
                        
                        
                        
                            }
                        }
                    });
                }
                
        
                if(id.title.indexOf("SH:QRY")>=0){
                    var webid=document.getElementById("webid").value;
                    var scrdata=document.getElementById("scrdata").value;
                    scrdata=scrdata+"-->"+id.id+"@"+document.getElementById(id.id).value;
                    var unic=document.getElementById("txtunicid").value;
                    $.get(path+'/TestingSchedule?webid='+webid+'&type=validation&id='+id.id+'&scrdata='+scrdata+'&unicid='+unic,function(responcejson){
                        if(responcejson!=""&&responcejson!=null){
                            if(responcejson.indexOf("@")>=0){
                                debugger;
                                var res=responcejson.split("@");
                                if(res[0]=="FALSE"){
                                    if(res[1].indexOf("DONTALLOW")>=0){
                                        res[1]=res[1].replace("DONTALLOW","");
                                        document.getElementById("alertdiv").innerHTML=res[1];
                                        document.getElementById(id.id).value="";
                                    displayalert();
                                    document.getElementById("head3").style.display="block";
                document.getElementById("popdiv1").style.display="none";
                                    return;
                                    }
                                     else if(res[1].indexOf("$EXECUTE")>=0){
                                        var qry=res[1].split("$EXECUTE");
                                        
                                            var r = confirm(qry[0]);
                                                    if (r == true) {
//                                                         displayalert();
                                                         fillcondition(id.id,flg,'',1,qry[1]);
                                                        
                                                        return;
                                                        
                                                    } else {
                                                        return;
                                                    }
                                        }
                                    else{
                                        document.getElementById("alertdiv").innerHTML=res[1];
                                    displayalert();
                                    fillcondition(id.id,flg);
                                    }
                                    
//                                    alert(res[1]);
//                                    document.getElementById(id.id).value="";
//                                
//                                    return;
                                      
                                }
                                else{
                                    fillcondition(id.id,flg);
                                }
                            }
                            else{
                                fillcondition(id.id,flg);
                            }
                        }
                        else {
                            alert(responcejson);
                        }
                    });
                    //            fillcondition(id.id,flg);
                }
            }
            
            
            function showPopup(id,flg){
                debugger;
                  $(".fotr").css("display","none");
                $(id).addClass("identify");
                  document.getElementById("btnaptsave").disabled=false;
                var path = localStorage.ipadrs;
                var webid=document.getElementById("webid").value;
                document.getElementById("txtunicid").value="";
                var allflg="true";
                if(id.id!=""){
                allflg="true";
                }
                else{
                allflg="false";
                }

//                var date=document.getElementById(dateid).value;
                var date="";
                if(flg=='3'){
                    date="01/01/2030";
                }
                else{
                    var tdata=id.id.split("@");
                 document.getElementById(tdata[2]).value=tdata[0];
                  date=document.getElementById(tdata[2]).value
                }
                var servertm="";
                var systm="";
                $.get(path+'/TestingSchedule?type=chktime&webid='+webid+'&allflg='+allflg+'&time='+id.title+'&date='+date,function(responcejson1){
                if(responcejson1!=""){
                    allflg=responcejson1;
                    var all=responcejson1.split("@");
                    servertm=all[1];
                    systm=all[2];
                    allflg=all[0];
                }
                else{
                    allflg="true";
                }
                if(allflg=="true"){
                $.get(path+'/TestingSchedule?type=cleargrid&webid='+webid,function(responcejson){
                    if(responcejson!="" && responcejson!=null){
                        debugger;
                        document.getElementById("id_From_Time").value=id.title;
                        
                        if(flg=="1"){
                            var iddata=id.id;
                            var iddata1=iddata.split("@");
                            document.getElementById("id_clmid").value=iddata1[1];
                            //                             alert(iddata1[2]);
                            document.getElementById(iddata1[2]).value=iddata1[0];
                            document.getElementById(iddata1[4]).value=iddata1[3];
                            document.getElementById("id_rownum").value=id.getAttribute("rownum");
                        }
                        popgenid();
                        displaymsg12();
                        debugger;
                        var res=responcejson.split("-->");
                        var fields=res[0].split("@");
                        //                     alert(fields);
                        for(var i=0;i<fields.length-1;i++){
                            if(fields[i].indexOf("<>")>=0){
                                var a=fields[i].split("<>");
                             
                                if(a[1].indexOf("$")>=0){
                                    var v=a[1].replace("$","").trim();
                                    //                                 alert(document.getElementById("id_From_Time").value);
                                    document.getElementById(a[0]).value=document.getElementById(v).value;
                                    if(a[2]=="1"){
                                        document.getElementById(a[0]).onchange();
                                    }
                                }
                                else if(a[1].indexOf("LOGIN")>=0){
                                    var v=a[1].replace("LOGIN.","");
                                    v=v.replace("USERNAME",localStorage.usernm);
                                    v=v.replace("SYSDATE",document.getElementById("sdate").value);
                                    v=v.replace("SYSTIME",systm);
                                    v=v.replace("SERVERTIME",servertm);
                                    v=v.replace("TERMINALID","");
                                    v=v.replace("TERMINAL",document.getElementById("terminal").value);
                                 
                                    v=v.replace("USERID",localStorage.userid);
                                    document.getElementById(a[0]).value=v;
                                }
                                else{
                                    document.getElementById(a[0]).value=a[1];
                                }
                            }
                            else{
                                //                             document.getElementById(fields[i]).value="";
                            }
                            //                         document.getElementById(fields[i]).value="";
                        }

                        //            if(document.getElementById("txtMrno").value!="null"){
                        //                document.getElementById("id_Mrno").value=document.getElementById("txtMrno").value;
                        //                document.getElementById("id_Mrno").onchenge();
                        //                     }

                
                    }
                });
             try{
                if(document.getElementById("txtMrno").value!="null"){
                    
                                var mrnoid=document.getElementById("mrno").value;
//                                alert(id);
                    document.getElementById(mrnoid).value=document.getElementById("txtMrno").value;
                    document.getElementById(mrnoid).onchange();
                }
            }catch(err){
                
            }
                    try{
                       var data = $('#head2').css("height");
                     
                data = data.replace("px","");
                       $('#popdiv1').css("margin-top",parseInt(data)+6+"px");
                   }
                   catch(ee){
                       
                   }
               }
               else{
                alert("Appoitments Are not Allowed For this time today..,Already Time is over.");
                    return;
                }
               });  
                    
            }
            
             function popgenid(){
                 var path = localStorage.ipadrs;
                var locid="";
                var popdt="";
                debugger;
                var data="";
                var s=document.getElementById("s1").value;
                var clm=document.getElementById("clm").value;
                var type=document.getElementById("type").value;
                var type1=type.split("@");
                var s1=s.split("@");
                var clm1=clm.split("@");
                for(var k=1;k<s1.length;k++){
                    var v=document.getElementById(s1[k]).value;
                    data=data+"-->"+v+"@"+clm1[k]+"@"+type1[k];
                }
                //                alert(data);
                var webid=document.getElementById("webid").value;
                $.get(path+'/TestingSchedule?popdt='+popdt+'&webid='+webid+'&type=popgenid&locid='+locid+'&data='+data,function(responcejson1){
                    if(responcejson1!=null){
                        document.getElementById("txtunicid").value=responcejson1;
                        //                        populatesc();
                    }
                    else{
                        //                        populatesc();
                    }
                });
            }
            
            
             function displaymsg12() {
//                $(function() {
//                    debugger;
//
//                    $("#popdiv1").dialog({
//                        resizable: false,
//                        height: 'auto',
//                        width: '95%',
//                        modal: true,
//                        
//                        buttons: {
//                            "Cancel": function() {
//                                $(this).dialog("close");
//                            }
//                        }
//                    });
//                    //document.getElementById("txtmrnum").focus();
//                });
                document.getElementById("head3").style.display="none";
                document.getElementById("popdiv1").style.display="block";
            }
            function cancelFun(){
                debugger;
                 $(".fotr").css("display","block");
                document.getElementById("head3").style.display="block";
                document.getElementById("popdiv1").style.display="none";
            }
            
             function fillcondition(id,flg,kid,exeflg,exeqry){
                debugger;
                var path = localStorage.ipadrs;
                var webid=document.getElementById("webid").value;
                var id=id;
                var kval="";
                if(flg=="5"){
                    kval=document.getElementById(kid).value;
                }
                else{
                    kid="";
                }
                var rval=document.getElementById(id).value;
                if(flg==2){
                    flg=2;
                }
                else{
                    flg=1;
                }
                //                alert(flg);
                var clm=document.getElementById("clm").value;
                var type=document.getElementById("type").value;
                var type1=type.split("@");
                var s=document.getElementById("s1").value;
                var scrdata="";
                var s1=s.split("@");
                var clm1=clm.split("@");
                for(var k=1;k<s1.length;k++){
                    var v=document.getElementById(s1[k]).value;
                    scrdata=scrdata+"-->"+s1[k]+"@"+v;
                }
                $.get(path+'/TestingSchedule?type=chkcondition&webid='+webid+'&id='+id+'&rval='+rval+'&flg='+flg+'&scrdata='+scrdata+'&kid='+kid+'&kval='+kval,function(responcejson){
                    if(responcejson!="" && responcejson!=null){
                        debugger;
                        
                        //                        var res=responcejson.split("@@");
                        //                        document.getElementById(res[1]).value=res[0];
                        //                        document.getElementById(res[1]).onchange();
                        var res1=responcejson.split("-->");
                        for(var i=0;i<res1.length-1;i++){
                            var res=res1[i].split("@@");
                            try{
                            document.getElementById(res[1]).value=res[0];
                        }
                        catch(eee){
                            
                        }
                            //                        document.getElementById(res[1]).onchange();
                            if(res[2]=="1"){
                                try{
                                document.getElementById(res[1]).onchange();
                            }
                            catch(eee){
                                
                            }
                            }
                        }
                        if(exeflg=="1"){
                            setTimeout(function(){
                            save('15',exeqry);
                        },2000);
                        }
                    }
                });
            }
            
            function save(flg,exeqry){
                document.getElementById("txttypevalue").value="new";
                chkmandatory(flg,exeqry);
                
            }
            
            function chkmandatory(flg,exeqry){
                var path = localStorage.ipadrs;
                var webid=document.getElementById("webid").value;
                $.get(path+'/TestingSchedule?type=chkman&webid='+webid,function(responcejson){
                    if(responcejson!="" && responcejson!=null){
                        for(var i=0;i<responcejson.length;i++){
                            var id=responcejson[i]['COMPID'];
                            var label=responcejson[i]['LABEL'];
                            if(id.indexOf("<--")>0){
                                var ids=id.split("<--");
                                if(document.getElementById(ids[1]).value==""){
                                    alert(label +" is Mandatory");
                                    return;
                                }
                            }
                            else{
                                if(document.getElementById(id).value==""){
                                    alert(label +" is Mandatory");
                                    return;
                                }
                            }
                        }
                        save1(flg,exeqry);
                    }
                    else {
                        save1(flg,exeqry);
                    }
                });
            }
            
            function save1(flg,exeqry){
                debugger;
                var mai=$('#id_pgmail').val();
                try{
                if(mai.trim()!=""){
                    mai=$('#'+mai).val();
                    if(mai.toUpperCase().indexOf("@")<0 || mai.toUpperCase().indexOf(".COM")<0){
                        alert("Please Enter Proper email address..");
                        document.getElementById(mai).focus();
                        return ;
                    }
                }
            }
            catch(ee){
                
            }
                document.getElementById("btnaptsave").disabled=true;
                var path = localStorage.ipadrs;
                var divdata=document.getElementById("popdiv");
                var webid=document.getElementById("webid").value;
                var finaldata="";
                var smsdata="";
                var scrdata=document.getElementById("scrdata").value;
                 document.getElementById("mydiv").style.display="block";
                $.get(path+'/TestingSchedule?type=getdata&webid='+webid+'&flg='+flg,function(responceJson){
                    if(responceJson!=""&& responceJson!=null){
                        debugger;
                        var data=responceJson;
                        var data1=data.split("-->");
                        for(var i=0;i<data1.length;i++){
                            var data2=data1[i].split("@");
                            if(data2[0]=="text" || data2[0]=="combo" || data2[0]=="time" || data2[0]=="hidden"){
                                finaldata=finaldata+"-->"+document.getElementById(data2[1]).value.replace("@","at_rate")+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
                                  smsdata=smsdata+"-->"+data2[1]+"@@ "+document.getElementById(data2[1]).value;
                            }
                            else if(data2[0]=="date"){
                                finaldata=finaldata+"-->to_date('"+document.getElementById(data2[1]).value+"','dd/mm/yyyy')"+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
                                  smsdata=smsdata+"-->"+data2[1]+"@@ "+document.getElementById(data2[1]).value;
                            }
                            else if(data2[0]=="search text"){
                                var data3=data2[1].split("<--");
                                finaldata=finaldata+"-->"+document.getElementById(data3[1]).value+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
                                  smsdata=smsdata+"-->"+data3[1]+"@@ "+document.getElementById(data3[1]).value;
                            }
                            else if(data2[0]=="radio"){
                                if(document.getElementById(data2[1]).checked==true){
                                    finaldata=finaldata+"-->"+document.getElementById(data2[1]).value+"@"+data2[2]+"@"+data2[3]+"@"+data2[0]; 
                                }
                            }
                        }
                    }
                    
                     var notsave=document.getElementById("txtnotsave").value;
//                    alert(notsave);
                    if(notsave.indexOf("@")>=0){
                        var nsv=notsave.split("@");
                        for(var j=1;j<nsv.length;j++){
                            smsdata=smsdata+"-->"+nsv[j]+"@@ "+document.getElementById(nsv[j]).value;
                        }
                    }
                    var typevalue=document.getElementById("txttypevalue").value;
                    var genune=document.getElementById("txtgenid").value;
                    debugger;
                    var formtype="";
                    var duration="0";
                    var fromtm="";
                    var totm="";
                    if(formtype=="scan"){
                        duration=document.getElementById("id_Duration").value;
                        fromtm=document.getElementById("id_From_Time").value;
                        totm=document.getElementById("id_To_Time").value;
                    }
                    var unicid=document.getElementById("txtunicid").value;
                    var data=path+'/TestingSchedule?type=save&webid='+webid+'&finaldata='+finaldata+'&typevalue='+typevalue+'&genune='+genune+'&formtype='+formtype+'&duration='+duration+'&fromtm='+fromtm+'&totm='+totm+'&unicid='+unicid+'&flg='+flg+'&scrdata='+scrdata+'&smsdata='+smsdata;
//                    alert(flg);
                    if(flg=="5"){
                        
                        var fname=$('#id_pgfname').val();
                        var lname=$('#id_pglname').val();
                        var email=$('#id_pgmail').val();
                        var pmobile=$('#id_pgmblno').val();
                        var amount=$('#id_pgamt').val();
                        data=data+""+"&pgfname=" + $('#'+fname).val() + "&pglname=" + $('#'+lname).val() + "&pgemail=" + $('#'+email).val() + "&pgmobile=" + $('#'+pmobile).val() + "&pgamount=" + $('#'+amount).val() + "&pgreturnurl=" + webid;
                        localStorage.data = data;
            location.href = 'PaymentGetway.html';
                    }
                    else{
                        $.get(data,function(responceJson){
                        debugger;
                        if(responceJson!=null && responceJson!=""){
                            if(responceJson=="1"){
                                debugger;
                                 document.getElementById("mydiv").style.display="none";
                                 var savealert=$('#savealert').val();
                                 if(savealert.trim()!=""){
                                 if (scrdata.indexOf("-->")>=0) {
                        var scr = scrdata.split("-->");
                        for (var n = 1; n < scr.length; n++) {
                            var scr1 = scr[n].split("@");
                            if(scr1.length!=1){
                            savealert = savealert.replace(scr1[0].trim(), scr1[1].trim()).replace("$", "");
                            }
                        }
                    }
                                             
                                             if (smsdata.indexOf("-->")>=0) {
                        var scr = smsdata.split("-->");
                        for (var n = 1; n < scr.length; n++) {
                            var scr1 = scr[n].split("@@");
                            savealert = savealert.replace(scr1[0].trim(), scr1[1].trim()).replace("$", "");
                            
                        }
                    }
                    
                    alert(savealert);
                                             }
                                             else{
                                                 alert("Booked Successfully");
                                             }
                                         
                                             
                                
                                if(flg=="15"){
                                executeupdate(exeqry);
                            }
                                document.getElementById("popdiv1").style.display="none";
                               document.getElementById("btnaptsave").disabled=false;
                               document.getElementById("head3").style.display="block";
                               $('.identify').removeAttr('style');
                               $('.identify').prop('onclick',null).off('click');
                                $('.identify').attr('disabled',true);
                               $('.identify').css("background","#ff9c9c");
                               $('.identify').removeClass('identify');
                                   
                               
//                                getAvalDates1(document.getElementById("btnavl"));
//                                document.getElementById("btnavl").onclick();
                            }
                            else if(responceJson=="2"){
                                alert("Record Updated Successfully");
                                 document.getElementById("popdiv1").style.display="none";
                               document.getElementById("btnaptsave").disabled=false;
                               document.getElementById("head3").style.display="block";
                                //                                savegrid();
                            }
                            else {
                                alert(responceJson);
//                                 $('.identify').removeAttr('style');
//                               $('.identify').css("background","#ff9c9c");
//                                 $('.identify').prop('onclick',null).off('click');
//                                $('.identify').attr('disabled',true);
//                               $('.identify').removeClass('identify');
                               document.getElementById("popdiv1").style.display="none";
                               document.getElementById("btnaptsave").disabled=false;
                               document.getElementById("head3").style.display="block";
                            }

                              
                               
                        }
                    });
                    }
                    
                });
                
            }
            
            function closeappt(){
            debugger;
            gotodoctors();
             
        }
function gotodoctorsnew() {
    document.getElementById("displayforms").style.display = "block";
     var c = $(".DOCtable > div").length;
                      //alert(c);
                        if (c == 1)
                        {
                             // $(".divbtn").click();
                             closebutton();
                              
                        }
    document.getElementById("displayappts").style.display = "none";
    var sdata = document.getElementById("id_scrdata").value.split("@");
    for (var i = 1; i < sdata.length; i++) {
        document.getElementById(sdata[i]).value = "";
    }

}
//function showAppoitments1(id, flg, speid) {
////                        var docid=id.id;
////alert("inside showAppoitments1()");
//    debugger;
//            // localStorage.payDoctorId = id.id;
//           // localStorage.payDoctorId = id.id;
////    alert("id=="+id);
////    alert("id.id==="+id.id);
////    alert("insideShowAppointmentDoctorId:"+id.id);
////   alert(" localStorage.paydoctextid=="+ localStorage.paydoctextid);
//   var txtid=localStorage.paydoctextid;
////   alert("txtid=="+txtid);
//   // document.getElementById("txt_id_Doctor").value = id;
////alert(" localStorage.ipadrs=="+ localStorage.ipadrs);
//    var path = localStorage.ipadrs;
//    var formid = localStorage.patmenuformid;
////    alert("formid=="+ formid);
//    var locid = "";
//    //document.getElementById("mydiv").style.display = "block";
//   
////    var sdata = document.getElementById("id_scrdata").value.split("@");
////      alert("sdata=="+ sdata);
////    var scrdata1 = "";
//    var data = "";
////    for (var i = 1; i < sdata.length; i++) {
////        scrdata1 = scrdata1 + "&" + sdata[i] + "=" + document.getElementById("txt_" + sdata[i]).value;
////    }
//    var scrdata1 = localStorage.paySrcdata;
////    for(var i=1;i<sdata.length;i++){
////        scrdata1=scrdata1+"-->"+document.getElementById("txt_"+sdata[i]).value+"@"+sdata[i];
////    }
//
////     var spl
////    if(flg=="1"){
////         var spl=speid;
////    }
////    else{
////    var spl=document.getElementById("txtspl").value;
////    }
//    path = path + "/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=" + formid + '&mrno=' + localStorage.patmrno + '&locid=' + locid + '' + scrdata1 + '&patapp=1';
//    $.get(path, function (responseText) {
//        debugger;
////alert(responseText);
////        $('#formdiv').html(responseText);
//        try {
//            document.getElementById("displayschedules").style.display = "none";
//            document.getElementById("displayappts").style.display = "block";
//            $('#displayappts').html(responseText);
//        }
//        catch (ee) {
//
//        }
//        localStorage.patapp = 1;
//        document.getElementById("mydiv").style.display = "none";
//        loadform();
//
////        $("#Date1").datepicker({
////            dateFormat: 'dd/mm/yy'
////        });
//    });
//    localStorage.apppayback=="0";
//}
