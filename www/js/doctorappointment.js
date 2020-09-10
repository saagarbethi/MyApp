/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
 debugger;
 var webformid=localStorage.patmenuformid;
 var mrno=localStorage.patmrno;
 var locid=localStorage.patlocid;
 var docid=localStorage.patdocid;
 var speid=localStorage.patspeid;
 var theme="";
 var path = localStorage.appurl+'/admin/ScheduleMobile.jsp?type=getavldates&webid=' + webformid + '&mrno=' + mrno + '&locid=' + locid + '&theme=' + encodeURIComponent(theme) + '&docid=' + docid + '&speid=' + speid;
$.get(path,function(respones){
 $("#doctordiv").html(respones);
 document.getElementById("appointdiv").innerHTML=document.getElementById("divdatasch").value;
 document.getElementById("appointdiv").style.display="block";
  showPopup();
  
//  displaymsg12();
  
});
});
 function displaymsg12() {
    $(function () {
        debugger;
        $("#appointdiv").dialog({
            resizable: false,
            height: '50%',
            width: '100%',
            modal: true,
            buttons: {
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}
  function save(flg){
                document.getElementById("txttypevalue").value="new";
                chkmandatory(flg);
                
            }
            
            function chkmandatory(flg){
               var webid=localStorage.patmenuformid;
                $.get(localStorage.appurl+'/TestingSchedule?type=chkman&webid='+webid,function(responcejson){
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
                        save1(flg);
                    }
                    else {
                        save1(flg);
                    }
                });
            }
            
            function save1(flg){
                debugger;
//              var divdata=document.getElementById("popdiv");
                var webid=localStorage.patmenuformid;
                var finaldata="";
                var smsdata="";
                var scrdata=localStorage.patsrcdata;
                $.get(localStorage.appurl+'/TestingSchedule?type=getdata&webid='+webid+'&flg='+flg,function(responceJson){
                    if(responceJson!=""&& responceJson!=null){
                        debugger;
                        var data=responceJson;
                        var data1=data.split("-->");
                        for(var i=0;i<data1.length;i++){
                            var data2=data1[i].split("@");
                            if(data2[0]=="text" || data2[0]=="combo" || data2[0]=="time" || data2[0]=="hidden"){
                                finaldata=finaldata+"-->"+document.getElementById(data2[1]).value+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
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
                    
                     var notsave=localStorage.notsaveval;
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
                        fromtm=localStorage.patfromtime;
                        totm=document.getElementById("id_To_Time").value;
                    }
                    var unicid=localStorage.patunicid;
                    $.get(localStorage.appurl+'/TestingSchedule?type=save&webid='+webid+'&finaldata='+finaldata+'&typevalue='+typevalue+'&genune='+genune+'&formtype='+formtype+'&duration='+duration+'&fromtm='+fromtm+'&totm='+totm+'&unicid='+unicid+'&flg='+flg+'&scrdata='+scrdata+'&smsdata='+smsdata,function(responceJson){
                        debugger;
                        if(responceJson!=null && responceJson!=""){
                            if(responceJson=="1"){
                                debugger;
                                alert("Record Inserted Successfully");
                                $("#appointdiv").dialog("close");
//                                document.getElementById("btnavl").onclick();
                            }
                            else if(responceJson=="2"){
                                alert("Record Updated Successfully");
                                //                                savegrid();
                            }
                            else {
                                alert(responceJson);
                            }
                        }
                    });
                });
                
            }
    function showPopup() {
    debugger;
    var webid = localStorage.patmenuformid;
    var usernm=$("#usernm").val();
      $.get(localStorage.appurl + '/TestingSchedule?type=cleargrid&webid=' + webid, function (responcejson) {
        if (responcejson != "" && responcejson != null) {
            debugger;
            document.getElementById("id_From_Time").value=localStorage.patfromtime;
            var flg=localStorage.patflg;
            if (flg == "1") {
//                var iddata = id.id;
//                var iddata1 = iddata.split("@");
                document.getElementById("id_clmid").value =localStorage.patclimid;
//                document.getElementById(iddata1[2]).value = iddata1[0];
//                document.getElementById(iddata1[4]).value = iddata1[3];
                document.getElementById("id_rownum").value =localStorage.patrownum;
            }
             debugger;
            var res = responcejson.split("-->");
            var fields = res[0].split("@");
           for (var i = 0; i < fields.length - 1; i++) {
                if (fields[i].indexOf("<>") >= 0) {
                    var a = fields[i].split("<>");
                    if (a[1].indexOf("$") >= 0) {
                        var v = a[1].replace("$", "").trim();
                        if(v=="id_rownum")
                        {
                        document.getElementById(a[0]).value =localStorage.patrownum;     
                        }
                        if(v=="id_clmid")
                        {
                        document.getElementById(a[0]).value =localStorage.patclimid;     
                        }
                        if(v=="id_Doctor")
                        {
                        document.getElementById(a[0]).value =localStorage.patdocid;     
                        }
                        if(v=="id_Location")
                        {
                        document.getElementById(a[0]).value =localStorage.patlocid;     
                        }
                        if(v=="id_From_Time")
                        {
                        document.getElementById(a[0]).value =localStorage.patfromtime;    
                        }
//                        document.getElementById(a[0]).value = document.getElementById(v).value;
                        if (a[2] == "1") {
//                            document.getElementById(a[0]).onchange();
                        }
                    }
                    else if (a[1].indexOf("LOGIN") >= 0) {
                        var v = a[1].replace("LOGIN.", "");
                        v = v.replace("USERNAME", localStorage.usernm);
                        v = v.replace("SYSDATE", document.getElementById("sdate").value);
                        v = v.replace("SYSTIME", document.getElementById("stime").value);
                        v = v.replace("TERMINALID", "");
                        v = v.replace("TERMINAL", document.getElementById("terminal").value);

                        v = v.replace("USERID", localStorage.userid);
                        document.getElementById(a[0]).value = v;
                    }
                    else {
                        document.getElementById(a[0]).value = a[1];
                    }
                }
                else {
                    
                }
               
            }
 
        }
    });
    try {
        var mrno=localStorage.patmrno;
        if (mrno!= "null") {

            var mrnoid =localStorage.patmrno;
            document.getElementById(mrnoid).value =localStorage.patmrno;
            document.getElementById(mrnoid).onchange();
           
        }
    } catch (err) {

    }
   
}
function closebutton()
{
    location.href ='DoctorApp.html';
}