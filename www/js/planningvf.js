/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadmrnoPLAN(){
    var formid = localStorage.webformid;
    var docid = localStorage.docid;
    var locid = localStorage.locid;
    var mrno = localStorage.mrno;
                var mrnoid=$('#txtmrno').val();
                if(mrno!="null"){
                    $('#'+mrnoid).val(mrno);
                    document.getElementById(mrnoid).onchange();
                }
            }
            
              function onchangefunPLAN(id,flg){
        debugger;
        var condition=id.title;
        var fid=localStorage.webformid;
        
        if(id.title.indexOf("SH:QRY")>=0){
                        fillconditionPlan(id.id,flg,condition);
        }
        if(id.title=='LOADGRID'){
            loadplan();
        }
    }
      function addDate(date,days){
                debugger;
var days1=parseInt(days);
      var dt=date.split("/");
      var oridt=dt[1]+"/"+dt[0]+"/"+dt[2];
    var result = new Date(oridt);
    result.setDate(result.getDate() +days1);


     var dd=result.getDate();
     if(dd<10){
         dd="0"+dd;
     }
     var mm1=result.getMonth()+1;
     if(mm1<10){
         mm1="0"+mm1;
     }
     
    return dd+"/"+mm1+"/"+result.getFullYear();
            }
             
            function loadvacdates(tabnm){
                var date = new Date();
            var currentMonth = date.getMonth();
            var currentDate = date.getDate();
            var currentYear = date.getFullYear();
                
                 $('#'+tabnm).find('input[class=datecls]').datepicker({
                    changeMonth:true,
                    changeYear: true,
                    yearRange: '1870:2020',
                    maxDate: new Date(currentYear, currentMonth, currentDate),
                    dateFormat: "dd/mm/yy"
                });

            }
             function loadinitial(tabnm){
                var tab=document.getElementById(tabnm);
                debugger;
                var dateid=$('#txtdateid').val();
                if(tab.rows.length>0){
                    var dep="";
                var indp="";
                var dif="";
                var scdt="";
                for(var k=0;k<tab.rows[0].cells.length;k++){
                    if(tab.rows[0].cells[k].getAttribute("condition")=="INDEPENDENTID"){
                        indp=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="DEPENDENTID"){
                        dep=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="DIFFERENCE"){
                        dif=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="SCHEDULEDATE"){
                        scdt=k;
                    }
                }
                    for(var i=0;i<tab.rows.length;i++){
                        if(tab.rows[i].cells[dep].childNodes[0].value=="BIRTHDATE"){
                            if(tab.rows[i].cells[scdt].childNodes[0].value.trim()==""){
                                tab.rows[i].cells[scdt].childNodes[0].value=addDate($('#'+dateid).val(),tab.rows[i].cells[dif].childNodes[0].value)
                               tab.rows[i].cells[scdt].childNodes[0].onchange(); 
                            }
                        }
                    }
                }
            }
             function loadplan(){
//            var mrno="";
             var scrdata=$('#txtheaddata').val();
                var data=scrdata.split("@");
                var result="";
                for(var i=1;i<data.length;i++){
                    result=result+"-->"+data[i]+"@ "+$('#'+data[i]).val();
                }
            var webformid=localStorage.webformid;
            $.get(localStorage.ipadrs+'/planningViewVF?type=loadgrid&webformid='+webformid+'&result='+result,function(responcejson){
              if(responcejson.indexOf("Error")>0){
              debugger;
              alert(responcejson);    
              }
              else {
                  debugger;
                  document.getElementById("planningdiv").innerHTML=responcejson;
                  loadclass(document.getElementById("planningdiv").childNodes[0].id);
                  loaddisplay(document.getElementById("planningdiv").childNodes[0].id);
              }
              
            });
            }
            function loaddisplay(tabnm){
                debugger;
                var tab=document.getElementById(tabnm);
                var cellln=tab.rows[0].cells.length;
                for(var i=0;i<cellln;i++){
                    if(tab.rows[0].cells[i].getAttribute("dis")=="1"){
                        for(var j=1;j<tab.rows.length;j++){
                            tab.rows[j].cells[i].childNodes[0].setAttribute("disabled","true");
                        }
                    }
                    else if(tab.rows[0].cells[i].getAttribute("vis")=="1"){
                        for(var j=0;j<tab.rows.length;j++){
                            tab.rows[j].cells[i].style.display="none";
                        }
                    }
                }
                
                for(var k=0;k<cellln;k++){
                    if(tab.rows[0].cells[k].getAttribute("condition")=="GIVENDATE"){
                        var flg="1";
                        for(var l=1;l<tab.rows.length;l++){
                            if(tab.rows[l].cells[k].childNodes[0].value.trim()!=""){
                               
                                flg="0";
                                break;
                            }
                        }
                        if(flg=="1"){
                             sortthis();
                        }
                    }
                }
            }
            var asc = true;

    function sortthis(idd) {
        debugger;
        var cnt="";
        
        var tbl = document.getElementById("vactab").tBodies[0];
        for(var k=0;k<tbl.rows[0].cells.length;k++){
            if(tbl.rows[0].cells[k].getAttribute("condition")=="SCHEDULEDATE"){
                cnt=k;
            }
        }
        var store = [];
        for (var i = 1, len = tbl.rows.length; i < len; i++) {
            var row = tbl.rows[i];
            var rowdatedata = row.cells[cnt].childNodes[0].value;
            var rowdatesplit = rowdatedata.split('/');
          
            var rowdatetimestamp = new Date(parseInt(rowdatesplit[2],10), parseInt(rowdatesplit[1],10) - 1, parseInt(rowdatesplit[0],10), 0, 0, 0).getTime() /1000;
            if (!isNaN(rowdatetimestamp)) store.push([rowdatetimestamp, row]);
        }

        if (asc) {
            store.sort(function(x, y) {
                return x[0] - y[0];
            });
        }
        else {
            store.sort(function(x, y) {
                return y[0] - x[0];
            });
            asc = true;
        }

        for (var i = 0, len = store.length; i < len; i++) {
            tbl.appendChild(store[i][1]);
        }
        store = null;
    }
            function loadclass(tabnm){
                var tab=document.getElementById(tabnm);
                debugger;
                if(tab.rows.length>0){
                    var cellln=tab.rows[0].cells.length;
                    for(var i=0;i<cellln;i++){
                        if(tab.rows[0].cells[i].getAttribute("class")=="datecls"){
                            for(var j=1;j<tab.rows.length;j++){
                                tab.rows[j].cells[i].childNodes[0].setAttribute("class","datecls");
                            }
                        }
                    }
                }
                loadvacdates(tabnm);
                loadinitial(tabnm);
            }
             function change(id){
                debugger;
                var rownum=id.parentNode.parentNode.rowIndex;
                 var tab=document.getElementById("vactab");
                 
                 var dep="";
                var indp="";
                var dif="";
                var scdt="";
                for(var k=0;k<tab.rows[0].cells.length;k++){
                    if(tab.rows[0].cells[k].getAttribute("condition")=="INDEPENDENTID"){
                        indp=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="DEPENDENTID"){
                        dep=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="DIFFERENCE"){
                        dif=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="SCHEDULEDATE"){
                        scdt=k;
                    }
                }
                 
                if(tab.rows[0].cells[id.parentNode.cellIndex].getAttribute("condition")=="SCHEDULEDATE"){
                
               
                var vacid=tab.rows[rownum].cells[indp].childNodes[0].value;
                for(var i=1;i<tab.rows.length;i++){
                    if(tab.rows[i].cells[dep].childNodes[0].value==vacid){
                        var date=id.value;
                        var days=tab.rows[i].cells[dif].childNodes[0].value;
                       tab.rows[i].cells[id.parentNode.cellIndex].childNodes[0].value=addDate(date,days);
                       tab.rows[i].cells[id.parentNode.cellIndex].childNodes[0].onchange();
                    }
                }
                }
                
                else if(tab.rows[0].cells[id.parentNode.cellIndex].getAttribute("condition")=="GIVENDATE"){
                    tab.rows[rownum].cells[scdt].childNodes[0].value=id.value;
                    tab.rows[rownum].cells[scdt].childNodes[0].onchange();
                    
                }
            }
    function clickfun(id){
                debugger;
                var tab=document.getElementById("vactab");
                if(tab.rows[0].cells[id.cellIndex].getAttribute("control")=='combo'){
                    var webformid= localStorage.webformid;
                    var qry=tab.rows[0].cells[id.cellIndex].getAttribute("qry");
                    for(var i=0;i<tab.rows[0].cells.length;i++){
                        qry=qry.replace("id_"+tab.rows[0].cells[1].textContent.split(" ").join("_"),tab.rows[id.parentNode.rowIndex].cells[1].childNodes[0].value);
                    }
                    $.get(localStorage.ipadrs+'/planningViewVF?type=loadcombo&webformid='+webformid+'&qry='+qry,function(responcejson){
                        debugger;
                        if(responcejson.trim()!=""){
                        
                        if(responcejson.indexOf("Error")>0){
                            alert(responcejson);
                        }
                        else{
                            if(document.getElementById(id.childNodes[0].id).getAttribute("flg")=="0"){
                            document.getElementById(id.childNodes[0].id).innerHTML=responcejson;
                            document.getElementById(id.childNodes[0].id).setAttribute("flg","1");
                            }
                        }
                        }
                    });
                    

                }
                
                
                
            }
      
             function popsearch(id){
                debugger;
                var data=id.name;
                var data1=data.split("@@");
                var qry=data1[2];
                qry=qry.replace("@","'");
                var tab=data1[3];
                tab=tab.split("@").join("'");
                var txtf=data1[0]+"@@"+data1[1];
                qry=qry.replace("`","'");
                window.open(localStorage.ipadrs+'/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf='+txtf+'&ordby=', '', 'width=640,height=600');
                
            }
            
             function saveplan(){
                var finaldata="";
             
               var mrnoid=$('#txtmrno').val();
                var mrno=$('#'+mrnoid).val();
                var webid=localStorage.webformid;

                    var table = $('#vactab').tableToJSON();
                    var grddtls = (JSON.stringify(table));
//                    alert(grddtls);
                    
                    grddtls = grddtls.replace(/\+/g,'_pp');
                    grddtls=encodeURIComponent(grddtls);
                            var path=localStorage.ipadrs+"/planningViewVF";
                            document.getElementById("blockdiv").style.display="block";
                            debugger;
                             $.ajax({
                         
        url: path,
        type: "POST",
        data:'type=save&webformid='+webid+'&finaldata='+finaldata+'&grddtls='+grddtls+'&mrno='+mrno,
        dataType: "text/html",
        success: function (responceJson) {
            debugger;
            document.getElementById("blockdiv").style.display="none";
            alert(responceJson.responseText);
        },
        error:function (error){
            debugger;
            document.getElementById("blockdiv").style.display="none";
            alert(error.responseText );
        }
                             });
                            
                        }
            
     function ReloadOP(rt) {
                debugger;
                var et=rt.split("&");
                if(et[0].indexOf("@@")>0){
                    var dat=et[0].split("@@");
                    document.getElementById(dat[0]).value=et[1];
                    document.getElementById(dat[1]).value=et[2];
                    fillconditionPlan(dat[1],'5',dat[0]);
                }
               
                
            }
            function showspl(id){
                var loadqry=id.getAttribute("qry");
                 var scrdata=$('#txtheaddata').val();
                var data=scrdata.split("@");
                var result="";
                for(var i=1;i<data.length;i++){
                    result=result+"-->"+data[i]+"@ "+$('#'+data[i]).val();
                }
                var webformid=localStorage.webformid;
                $.get(localStorage.ipadrs+'/planningViewVF?type=loadgrid&webformid='+webformid+'&result='+result+'&loadqry='+loadqry,function(responcejson){
              if(responcejson.indexOf("Error")>0){
              debugger;
              alert(responcejson);    
              }
              else {
                  debugger;
                  document.getElementById("splgrd").innerHTML=responcejson;
                  loaddisplay(document.getElementById("splgrd").childNodes[0].id);
                  var tabid=document.getElementById(document.getElementById("splgrd").childNodes[0].id);
                  for(var n=1;n<tabid.rows.length;n++){
                      for(var l=0;l<tabid.rows[n].cells.length;l++){
                          tabid.rows[n].cells[l].childNodes[0].setAttribute("disabled","true");
                      }
                  }
                  displaymsg();
              }
              
            });
                
                
            }
            function transferrow(id){
 debugger;
            if(id.parentNode.parentNode.parentNode.id=="splgrd"){
                var appdtab=document.getElementById("vactab");
                var tab=document.getElementById(id.parentNode.parentNode.id);
                var indp="";
                var dep="";
                var dif="";
                var scdt="";
                for(var k=0;k<tab.rows[0].cells.length;k++){
                     if(tab.rows[0].cells[k].getAttribute("condition")=="INDEPENDENTID"){
                        indp=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="DEPENDENTID"){
                        dep=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="DIFFERENCE"){
                        dif=k;
                    }
                    else if(tab.rows[0].cells[k].getAttribute("condition")=="SCHEDULEDATE"){
                        scdt=k;
                    }
                }
                
                   var maintab=document.getElementById("vactab");
                   for(var j=1;j<maintab.rows.length;j++){
                       if(id.cells[indp].childNodes[0].value==maintab.rows[j].cells[indp].childNodes[0].value){
                           alert(id.cells[indp-1].childNodes[0].value+" is Already Exist in List");
                           $("#splgrd").dialog("close");
                          for(var m=0;m<tab.rows[j].cells.length;m++){
                              maintab.rows[j].cells[m].childNodes[0].style.backgroundColor='aquamarine';
                               
                          }
                          
                              return;
                       }
                   }
                var row=$(id.outerHTML);
                row.appendTo(appdtab);
                $("#splgrd").dialog("close");
                debugger;
                var flg="0";
                var maintab=document.getElementById("vactab");
                for(var k=1;k<maintab.rows.length;k++){
                    if(id.cells[dep].childNodes[0].value.trim()==maintab.row[k].cells[indp].childNodes[0].value.trim()){
                        maintab.rows[k].cells[scdt].childNodes[0].onchange();
                        flg="1";
                    }
                }
                if(flg=="0"){
                    var dtid=$('#txtdateid').val();
                    tab.rows[tab.rows.length-1].cells[scdt].childNodes[0].value=$('#'+dtid).val();
                }
            }
            }
            
            function getPrint(){
                var webid=localStorage.webformid;
                 var scrdata=$('#txtheaddata').val();
                var data=scrdata.split("@");
                var result="";
                for(var i=1;i<data.length;i++){
                    result=result+"-->"+data[i]+"@ "+$('#'+data[i]).val();
                }
                 window.open(localStorage.ipadrs+'/planningViewVF?type=print&result='+result+'&webid='+webid);
            }
            
               function displaymsg() {
                $(function() {
                    debugger;

                    $("#splgrd").dialog({
                        resizable: false,
                        height: 'auto',
                        width: '90%',
                        modal: true,
                        top:'100px',
                        buttons: {
                            "Cancel": function() {
                                $(this).dialog("close");
                            }
                        }
                    });
                });
            }
            
            function fillconditionPlan(id,flg,kid,condition){
                debugger;
                var webid=localStorage.webformid;
                var id=id;
                var kval="";
                var rval="";
                if(flg=="5"){
                kval=document.getElementById(kid).value;
                rval=document.getElementById(kid).value;
                }
               
                var scrdata=$('#txtheaddata').val();
                var data=scrdata.split("@");
                var result="";
                for(var i=1;i<data.length;i++){
                    result=result+"-->"+data[i]+"@ "+$('#'+data[i]).val();
                }
//                alert(flg);
                $.get(localStorage.ipadrs+'/planningViewVF?type=chkcondition&webid='+webid+'&id='+id+'&rval='+rval+'&flg='+flg+'&result='+result+'&kid='+kid+'&kval='+kval+'&condition='+condition,function(responcejson){
                    if(responcejson!="" && responcejson!=null){
                        debugger;
                        

                         var res1=responcejson.split("-->");
                         for(var i=0;i<res1.length;i++){
                            var res=res1[i].split("@@");
                            document.getElementById(res[1]).value=res[0];
//                        document.getElementById(res[1]).onchange();
                           if(res[2]=="1"){
                               document.getElementById(res[1]).onchange();
                           }
                         }
                    }
                });
            }