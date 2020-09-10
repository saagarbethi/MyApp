/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    debugger;
    var webformid=localStorage.mwebformid;
    var key_id=localStorage.mkeyid;
    var fromdate=localStorage.mfdt;
    var todate=localStorage.mtdt;
    var imgurl1=localStorage.imgurl;
    var imgdata1=localStorage.imgdata;
    $.get(localStorage.ipadrs+"/admin/managementMobileView.jsp?webformid="+webformid+"&mrno="+key_id+"&bkey_id="+key_id+"&bfd="+fromdate+"&btd="+todate+"&bmrno="+key_id+"&imageurl="+imgurl1+"&imgdata="+imgdata1+'&key_id='+key_id+'&formid='+webformid,function(responcejson){
                        if(responcejson!=""){
                            document.getElementById("divpdf").style.display="block";
//                document.getElementById("drilldata").style.display="none";
//                document.getElementById("divpdf").innerHTML=responcejson;
                $("#divpdf").html(responcejson);
//                document.getElementById("mydiv").style.display="none";
                        loadtable();loaddate();loaddiv();
                        }
                    });

});


function loadtable(){
                debugger;
                var webformid=$('#mwebformid').val();
                var cellcount=$('#cellcount').val();
                var date=$('#id_date').val();
                var replacedata=$('#mreplacedata').val();
                if(replacedata=="null"){
                    replacedata="";
                }
                var keyid=$('#mkeyid').val();
                var lblids=$("#alllabels").val();
                var lbl=lblids.split("@");
                for(var k=0;k<lbl.length;k++){
                    if(lbl[k]!=""){
                 $.get(localStorage.ipadrs+'/managementview?type=loadtable&webformid='+webformid+'&cellcount='+cellcount+'&date='+date+'&replacedata='+replacedata+'&keyid='+keyid+'&lblid='+lbl[k],function(responcejson){
                     if(responcejson!=""){
                         debugger;
                         var abc=responcejson.split("@@@");
                         var maintab=document.getElementById(abc[1]);
                         $("#"+abc[1]).find("tr:gt(0)").remove();
                         var rownew=$(abc[0]);
                         rownew.appendTo(maintab);
                         populateslots(abc[1]);
//                         maintab.innerHTML=maintab.innerHTML+""+responcejson;
                     }
                 });
             }
             }
            }
            function populateslots(tabid){
                debugger;
                var maintab=document.getElementById(tabid);
                var celllen=maintab.rows[0].cells.length;
                var ftime="",ttime="";
                var comtm=$('#comtm').val();
                for(var i=1;i<maintab.rows.length;i++){
                    var tms=maintab.rows[i].cells[0].getAttribute("times");
                    if(tms!=null){
                    var tms1=tms.split("@");
                    for(var j=0;j<tms1.length;j++){
                        if(tms1[j].trim()!=""){
                        for(var k=1;k<celllen;k++){
                            ftime=maintab.rows[0].cells[k].getAttribute("fromtime");
                           ttime=maintab.rows[0].cells[k].getAttribute("totime");
                            if(Date.parse('01/01/2011 '+ftime)<= Date.parse('01/01/2011 '+tms1[j])&&Date.parse('01/01/2011 '+ttime)> Date.parse('01/01/2011 '+tms1[j])){
                                maintab.rows[i].cells[k].style.backgroundColor="rgb(86, 136, 73)";
                                maintab.rows[i].cells[k].setAttribute("onclick","showpopup(this)");
                                 maintab.rows[i].cells[k].setAttribute("alttime",tms1[j]);
                                if(Date.parse('01/01/2011 '+tms1[j])<=Date.parse('01/01/2011 '+comtm)){
                                    maintab.rows[i].cells[k].style.backgroundColor="rgb(42, 245, 35)";
                                    maintab.rows[i].cells[k].setAttribute("class","anm");
                                }
                                break;
                            }
                        }
                    }
                    }
                }
                else{
                    maintab.rows[i].cells[0].innerHTML="<strike>"+maintab.rows[i].cells[0].textContent+"</strike>";
                }
                }
                filldata(tabid);
                document.getElementById("show"+tabid).style.display="none";
                document.getElementById("hide"+tabid).style.display="inline-block";
//                removecells(tabid);
            }
            function filldata(tabid){
                debugger;
                 var date=$('#id_date').val();
                var replacedata=$('#mreplacedata').val();
                var webformid=$('#mwebformid').val();
                 var keyid=$('#mkeyid').val();
                 
                $.get(localStorage.ipadrs+'/managementview?type=filldata&webformid='+webformid+'&date='+date+'&replacedata='+replacedata+'&keyid='+keyid+'&lblid='+tabid,function(res){
                    if(res!=""){
                        debugger;
                        var tab=document.getElementById(tabid);
                        var id="",time="",data="",color="",celllen=tab.rows[0].cells.length,ftime="",ttime="";
                        for(var i=0;i<res.length;i++){
                            id=res[i]['KEY_VALUE'];time=res[i]['TIME'];data=res[i]['DATA'];color=res[i]['COLOR'];
                            for(var j=1;j<tab.rows.length;j++){
                                if(tab.rows[j].cells[0].getAttribute("medid")==id){
                                    for(var k=1;k<celllen;k++){
                            ftime=tab.rows[0].cells[k].getAttribute("fromtime");
                           ttime=tab.rows[0].cells[k].getAttribute("totime");
                            if(Date.parse('01/01/2011 '+ftime)<= Date.parse('01/01/2011 '+time)&&Date.parse('01/01/2011 '+ttime)> Date.parse('01/01/2011 '+time)){
                                tab.rows[j].cells[k].childNodes[0].style.backgroundColor=color;
                                tab.rows[j].cells[k].style.backgroundColor=color;
                                tab.rows[j].cells[k].childNodes[0].innerHTML=data;
//                                tab.rows[j].cells[k].setAttribute("alttime",ftime);
                                
                                break;
                            }
                        }
                        
                                }
                               
                            }
                        }
                    }
                });
            }
            
            function showpopup(id){
                debugger;
                var tabid=id.parentNode.parentNode.parentNode.id;
                $('#id_tabid').val(tabid);
                var webformid=$('#mwebformid').val();
                $.get(localStorage.ipadrs+'/managementview?type=loaddtl&tableid='+tabid+'&webformid='+webformid+'&mobile=1',function(resp){
                    if(resp!="" && resp.indexOf("$@$")>=0){
                        var data=resp.split("$@$");
                        document.getElementById("popdiv").innerHTML=data[0];
                        var dtlids=data[1];
                        $('#dtlids').val(data[1]);
                        document.getElementById("dtlclmdata").value=data[2];
                        
                        var dtlid=dtlids.split("@");
                var headids=$('#headids').val();
                for(var i=0;i<dtlid.length;i++){
                    if(dtlid[i]!=""){
                        
                        if(document.getElementById(dtlid[i]).getAttribute("fvalue")!=undefined){
                            if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$serverdate"){
                                document.getElementById(dtlid[i]).value=$('#sdate').val();
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$servertime"){
                                document.getElementById(dtlid[i]).value=$('#stime').val();
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$username"){
                                document.getElementById(dtlid[i]).value=localStorage.usernm;
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$userid"){
                                document.getElementById(dtlid[i]).value=localStorage.userid;
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$terminalid"){
                                document.getElementById(dtlid[i]).value="";
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$date"){
                                document.getElementById(dtlid[i]).value=$("#id_date").val();
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$terminal"){
                                document.getElementById(dtlid[i]).value="";
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$value"){
                                document.getElementById(dtlid[i]).value=id.parentNode.cells[0].textContent;
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$id"){
                                document.getElementById(dtlid[i]).value=id.parentNode.cells[0].getAttribute("medid");
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$time"){
                                document.getElementById(dtlid[i]).value=id.parentNode.cells[id.cellIndex].getAttribute("alttime");
                            }
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")=="$key_id"){
                                document.getElementById(dtlid[i]).value=$('#mkeyid').val();
                            }
                            
                            else if(document.getElementById(dtlid[i]).getAttribute("fvalue")!=""){
                                document.getElementById(dtlid[i]).value=$('#'+document.getElementById(dtlid[i]).getAttribute("fvalue").replace("$","")).val();
                            }
                            else{
                                document.getElementById(dtlid[i]).value="";
                            }
                            try{
                                if(document.getElementById(dtlid[i]).getAttribute("poponly")!="1"){
                                    document.getElementById(dtlid[i]).onchange();
                                }
                            }
                            catch(ee){
                            }
                        }
                        else{
                           document.getElementById(dtlid[i]).value=""; 
                        }
                    }
                }
                localStorage.mgkeyid=$('#mkeyid').val();
                localStorage.mtime=id.parentNode.cells[id.cellIndex].getAttribute("alttime");
                localStorage.mdate=$('#id_date').val();
                localStorage.mmedid=id.parentNode.cells[0].getAttribute("medid");
                        mdisplaymsg1(id.parentNode.parentNode.parentNode.id.replace("id_","")+"  Details:");
                        try{
                            loadattachments();
                        }
                        catch(ee){
                            
                        }
                    }
                });
                    
                
//                debugger;
//                var dtlids=$('#dtlids').val();
                
            }
            
            function mdisplaymsg1(tit) {
                $(function() {
                    debugger;

                    $("#popdiv").dialog({
                        resizable: false,
                        height: 'auto',
                        width: '95%',
                        modal: true,
                        title:tit,
                        buttons: {
                            "Cancel": function() {
                                $(this).dialog("close");
                            }
                        }
                    });
                    //document.getElementById("txtmrnum").focus();
                });
            }
            
            function loaddate(){
                 $(".Date2").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2020'
    });
            }
            
            function loaddiv(){
                document.getElementById("headerdiv").innerHTML=document.getElementById("headdata").value;
                
                $('#headerdiv').find('input[class=Date2]').datepicker({
                    changeMonth:true,
                    changeYear: true,
                    yearRange: '1870:2020',
                    //                    maxDate: new Date(currentYear, currentMonth, currentDate),
                    dateFormat: "dd/mm/yy"
                });
                
                $('#popdiv').find('input[class=Date2]').datepicker({
                    changeMonth:true,
                    changeYear: true,
                    yearRange: '1870:2020',
                    //                    maxDate: new Date(currentYear, currentMonth, currentDate),
                    dateFormat: "dd/mm/yy"
                });
            }
            
//            function onchangehead(){
//                
//            }
            
            function onchangehead(id){
                debugger;
                var dtlids=document.getElementById("dtlids").value;
                var dtl=dtlids.split("@");
                var scrdata="";
                for(var i=0;i<dtl.length;i++){
                    scrdata=scrdata+"-->"+dtl[i]+"@"+$('#'+dtl[i]).val();
                }
                var condition=id.getAttribute("condition");
                if(condition.indexOf("SH:QRY")>=0){
                var webid=$('#mwebformid').val();
                $.get(localStorage.ipadrs+'/managementview?type=chkcondition&webid='+webid+'&scrdata='+scrdata+'&condition='+condition,function(responcejson){
                    if(responcejson!=""){
                        var res1=responcejson.split("-->");
                        for(var i=0;i<res1.length;i++){
                            var res=res1[i].split("@@");
                            try{
                                document.getElementById(res[1]).value=res[0];
                                if(document.getElementById(res[1]).getAttribute("poponly")=="1"){
                                    
                                }
                                else{
                                    document.getElementById(res[1]).onchange();
                                }
                            }
                            catch(ee){
                                
                            }
                            
                        }
                    }
                });
            }
            }
            function closepatient(){
                debugger;
//               document.getElementById("divpdf").style.display="none";
//                document.getElementById("drilldata").style.display="block";
//                
//                document.getElementById("mydiv").style.display="none";
location.href='Drilldashboard.html';
            }
            
            function savethis(){
            debugger;
            var dtldata=$("#dtlclmdata").val();
            var dtl=dtldata.split("$$");
            var clm="",val="";
            for(var i=0;i<dtl.length;i++){
                if(dtl[i]!=""){
                    if(dtl[i].indexOf("@")>=0){
                    var dtl1=dtl[i].split("@");
                    if(dtl1[0]=="search"){
                        clm=clm+","+dtl1[2];
                        var id=dtl1[1].replace("<--","@@").split("@@");
                        val=val+",'"+$('#'+id[1]).val()+"'";
                    }
                    else if(dtl1[0]=="date"){
                        clm=clm+","+dtl1[2];
//                        var id=dtl1[1].replace("<--","@@").split("@@");
                        val=val+",to_date('"+$('#'+dtl1[1]).val()+"','dd/mm/yyyy')";
                    }
                    else if(dtl1[0]=="time"){
                        clm=clm+","+dtl1[2];
//                        var id=dtl1[1].replace("<--","@@").split("@@");
//                        alert($('#'+dtl1[1]).val().lastIndexOf(":"));
                        if($('#'+dtl1[1]).val().lastIndexOf(":")>2){
                            val=val+",to_date('"+$('#'+dtl1[1]).val()+"','hh:mi:ss AM')";
                        }
                        else{
                            val=val+",to_date('"+$('#'+dtl1[1]).val()+"','hh:mi AM')";
                        }
                        
                    }
                    else{
                        clm=clm+","+dtl1[2];
                        val=val+",'"+$('#'+dtl1[1]).val()+"'";
                    }
                }
                }
            }
            var labelid=$('#id_tabid').val();
            var webformid=$('#mwebformid').val();
            $.get(localStorage.ipadrs+'/managementview?type=savedata&clm='+clm+'&val='+val+'&labelid='+labelid+'&webformid='+webformid,function(responce){
                if(responce!=""){
                    if(responce=="1"){
                        alert("Record saved successfully..");
                        loadtable();
                         $('#popdiv').dialog("close");
//                        
                    }
                }
            });
            
            }
            
            function loadattachments(){
//                 location.href='myFiles.html';
                 document.getElementById("attach").innerHTML='<object class="mob" type="text/html" data="myFilesformanage.html" style="width:100%;" ></object>';
            }
            function removecells(tabid){
                debugger;
                 document.getElementById("show"+tabid).style.display="inline-block";
                document.getElementById("hide"+tabid).style.display="none";
                var flg="0";
                var tab=document.getElementById(tabid);
                if(tab.rows.length>1){
                    for(var j=1;j<tab.rows[0].cells.length;j++){
                        flg="0";
                    for(var i=1;i<tab.rows.length;i++){
                       if(tab.rows[i].cells[j].getAttribute("alttime")!=null){
                           flg="1";
                           break;
                       }
                       else{
                           
                       }
                    }
                    if(flg=="0"){
//                        alert("inside");
                        for(var i=0;i<tab.rows.length;i++){
                       tab.rows[i].cells[j].style.display="none";
                    }
                    }
                }
                }
            }
            
            function showcells(tabid){
                debugger;
                document.getElementById("show"+tabid).style.display="none";
                document.getElementById("hide"+tabid).style.display="inline-block";
                var tab=document.getElementById(tabid);
                if(tab.rows.length>1){
                    for(var i=0;i<tab.rows.length;i++){
                    for(var j=0;j<tab.rows[0].cells.length;j++){
                    tab.rows[i].cells[j].style.display="";
                }
                    }
                }
            }