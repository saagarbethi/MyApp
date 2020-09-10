/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//$(document).ready(function () {
//    $(window).scroll(function() {
//    if($(window).scrollTop()) {
//        alert("hi");
//           // ajax call get data from server and append to the div
//    }
//});
//});



function closethis(){
    document.getElementById("myModalss").style.display="none";
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function loadmobgraph(){
    debugger;
    var webformid=localStorage.currentformid;
    var data="";
    if(localStorage.mrno!=""){
        data="&mrno="+localStorage.mrno+"&fromdis="+localStorage.fromdis;
        if(getParameterByName("webformid")!=""){
            webformid=getParameterByName("webformid");
        }
    }
    $.get(localStorage.ipadrs+'/admin/chartFrameWorkViewMobile.jsp?webformid='+webformid+''+data,function(responcejson){
        if(responcejson!=""){
            $("#divframe1").html(responcejson);
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
            loadmrno();
        }
    }
    );
}
function loadmrnodata(){
    debugger;
    var flag=document.getElementById("txtmul").value;
    localStorage.chart="1";
//            alert(flag);
            if(flag!="1"){
            var mrnofield=document.getElementById("txtmrnofield").value;
            var mrno=document.getElementById("txtchrtmrno").value;
            if(mrno!="null"){
                document.getElementById(mrnofield).value=mrno;
                document.getElementById(mrnofield).onchange();
                
            }
        }
        else{
             document.getElementById("changechart").style.display="none";
            document.getElementById("loadmcharts").style.display="inline-block";
            var chids=document.getElementById("chids").value;
            var ch=chids.split("@@");
            for(var i=0;i<ch.length;i++){
                if(ch[i].trim()!=""){
                    document.getElementById(ch[i]).onclick();
                }
            }
            if(chids==""){
                loadprintchart($('#txttid').val());
            }
        }
        }
        
         function handleClick(event){
            debugger;
//            alert("HI");
//            alert(event.item.dataContext.myid);
            var linkformid="";
            var param="";
            if(event.dataItem!=undefined){
                linkformid=event.dataItem.dataContext.formid;
                 param=event.dataItem.dataContext.parameter;
            }
            else{
                linkformid=event.item.dataContext.formid;
                 param=event.item.dataContext.parameter;
            }
            
            
            var screenno=document.getElementById("id_screenno").value;
             var fromdate=document.getElementById("txtFromdt").value;
            var todate=document.getElementById("txttodt").value;
            var mrno=document.getElementById("txtchrtmrno").value;
            $.get(localStorage.ipadrs+'/ChartFrameWorkView?type=getinnerchart&linkformid='+linkformid+'&param='+param+'&fromdate='+fromdate+'&todate='+todate+'&mrno='+mrno,function(responcejson){
                debugger;
        if(responcejson!="" && responcejson.indexOf("EXCEPTION")<0){
                    debugger;
                    var res=responcejson.split("@@@@");
                    if(res[0].trim()!=""){
                    var scr=parseInt(screenno)+1;
//                    alert("screen0"+scr);
                    if(document.getElementById("screen"+scr)!=null){
                        document.getElementById("screen"+scr).innerHTML=res[0];
                        document.getElementById("screen"+scr).style.display="block";
                        var cnt=document.getElementById("id_maxscreen").value;
                        for(var ij=0;ij<cnt;ij++){
                            if("screen"+parseInt(ij)=="screen"+scr){
                            }
                            else{
                                document.getElementById("screen"+parseInt(ij)).style.display="none";
                            }
                        }
                        document.getElementById("id_screenno").value=parseInt(screenno)+1;
                    }
                    else{
                        document.getElementById("id_screenno").value=parseInt(screenno)+1;
                        document.getElementById("id_maxscreen").value=parseInt(document.getElementById("id_maxscreen").value)+1;
                        
                    var div=document.getElementById("maindiv");
                    var iDiv = document.createElement('div');
iDiv.className = 'block-2';
iDiv.id = "screen"+document.getElementById("id_screenno").value;

div.appendChild(iDiv);
iDiv.innerHTML=res[0];

var itext = document.createElement("input");
itext.setAttribute("value",res[1]);
itext.setAttribute("id","id_screen"+document.getElementById("id_screenno").value);
itext.style.display="none";
div.appendChild(itext);
//document.getElementbyId("testing").innerHTML=responcejson;

                    }
                     var ch=res[1].split("@@");
            for(var i=0;i<ch.length;i++){
                if(ch[i].trim()!=""){
                    if(document.getElementById(ch[i])!=null){
                        document.getElementById(ch[i]).onclick();
                    }
                    
                }
            }
            
            var cnt=document.getElementById("id_maxscreen").value;
                        for(var ij=0;ij<cnt;ij++){
                            
                            var val=parseInt(screenno)+1;
//                            alert("screen"+val);
                            if("screen"+""+parseInt(ij)=="screen"+val){
                            }
                            else{
//                                alert("screen"+"0"+parseInt(ij));
                                document.getElementById("screen"+""+parseInt(ij)).style.display="none";
                            }
                        }
                    }
                }
            });
        }
        
        function showthis(){
           document.getElementById("loadmcharts").onchange();
       }
        
        function getBack(){
            debugger;
            if(document.getElementById("id_screenno").value>0){
            var maxscreen=document.getElementById("id_maxscreen").value;
            var pscreen=document.getElementById("id_screenno").value;
            var pss=parseInt(pscreen)-1;
            document.getElementById("id_screenno").value=parseInt(document.getElementById("id_screenno").value)-1;
            for(var i=0;i<=maxscreen;i++){
//                alert("screen0"+pss+"-------"+"screen"+"0"+i);
                if("screen"+pss=="screen"+""+i){
                    document.getElementById("screen"+""+i).style.display="block";
                }
                else{
                   document.getElementById("screen"+""+i).style.display="none"; 
                }
            }
        }
        }
       
        
        
        
        

        function loadchart(id){
            
 debugger;
 var webformid=$('#txtwebformid').val();
 var scrdata=$('#txtheaddata').val();
                var data=scrdata.split("@");
                var result="";
                for(var i=1;i<data.length;i++){
                    result=result+"-->"+data[i]+"@ "+$('#'+data[i]).val();
                }
                var mrno=$('#txtchrtmrno').val();
                var replacedata=$('#chartreplacedata').val();
$.get(localStorage.ipadrs+'/ChartFrameWorkView?type=loadchart&webformid='+webformid+'&result='+result+'&mrno='+mrno+'&replacedata='+replacedata,function(responcejson){
    if(responcejson!=null){
        if(responcejson.indexOf("ERROR")>0){
            
        }
        else {
            debugger;
            var xaxisnm=$('#txtxaxisnm').val();
            var yaxixnm=$('#txtyaxisnm').val();;
            var graphnm=$('#txtgraphnm').val();
            var sugnm=$('#txtsubgraphnm').val();
            if(responcejson.indexOf("$$")>=0){
                var resul=responcejson.split("$$");
                var mainarray=new Array();
                var dummyarray=new Array();
                var subarray=new Array();
                for(var i=0;i<resul.length;i++){
                    if(resul[i].indexOf("<--")>0){
                        var resdata=resul[i].split("<--");
                        var clr=resdata[1];
                        var nm=resdata[0]
                        var data1=resdata[2].split(",");
                        for(var j=0;j<data1.length;j++){
                            if(data1[j].indexOf("@")>=0){
                            var val=data1[j].split("@");
                            var xval=val[0];
                            var yval=val[1];
                            if(xval.trim()!="" && yval.trim()!=""){
                                dummyarray.push(parseFloat(xval));
                            dummyarray.push(parseFloat(yval));
                            subarray.push(dummyarray);
                            dummyarray=[];
                            }
                            }
                        }
                        mainarray.push({
                            name:nm,
                            color:clr,
                            data:subarray
                            
                        });
                        subarray=[];
                    }
                }
            }
            

    $('#container').highcharts({
    
        chart: {
            type: id,
            zoomType: 'xy',
//            height: $(document).height()-120,
//            width:$(document).width(),
              
//                marginRight:100
marginBottom:150
            
        },
        title: {
            text: graphnm
        },
        subtitle: {
            text: sugnm
        },
        xAxis: {
            title: {
                enabled: true,
                text: xaxisnm
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            tickInterval:20,
            title: {
                text: yaxixnm
            },
             
            
            minorGridLineColor: '#E0E0E0',
            minorGridLineWidth: 0.5,
            minorTickLength: 0,
            minorTickInterval:'auto'
//            gridLineDashStyle: 'longdash'
        },
        
        legend: {
//            layout: 'vertical',
           align: 'center',
           verticalAlign:'bottom',
//           width:$(document).width()-20,
//            x: 10,
//            y: 40,
//            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
            
        },
        
        
        series:mainarray
    });
            
        }
    }
});





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
                var path=localStorage.ipadrs;
                qry=qry.replace("`","'");
                window.open(''+path+'/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf='+txtf+'&ordby=', '', 'width=640,height=600');
                
            }
            
            function ReloadOP(rt) {
                debugger;
                var et=rt.split("&");
                if(et[0].indexOf("@@")>0){
                    var dat=et[0].split("@@");
                    document.getElementById(dat[0]).value=et[1];
                    document.getElementById(dat[1]).value=et[2];
//                    chkvalidation(dat[0],dat[1]);
                    fillconditionchart(dat[1],'5',dat[0]);
                }
               
                
            }
            
            function fillconditionchart(id,flg,kid,condition){
                debugger;
                var webid=$('#txtwebformid').val();
                var id=id;
                var kval="";
                var rval="";
                if(flg=="5"){
                kval=document.getElementById(kid).value;
                rval=document.getElementById(kid).value
                var fid="";;
                }
               
                var scrdata=$('#txtheaddata').val();
                var data=scrdata.split("@");
                var result="";
                for(var i=1;i<data.length;i++){
                    result=result+"-->"+data[i]+"@ "+$('#'+data[i]).val();
                }
//                alert(flg);
                $.get(localStorage.ipadrs+'/ChartFrameWorkView?type=chkcondition&webid='+webid+'&id='+id+'&rval='+rval+'&flg='+flg+'&result='+result+'&kid='+kid+'&kval='+kval+'&condition='+condition,function(responcejson){
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
            
            function onchangefunchart(id,flg){
        debugger;
        var condition=id.title;
        
        
        if(id.title.indexOf("SH:QRY")>=0){
                        fillconditionchart(id.id,flg,condition);
        }
        if(id.title=='LOADCHART'){
            loadchart(document.getElementById("changechart").value);
        }
    }
        
        function showalert(){
//            alert("hi");
        }
        
        function onchangechart(id){
            debugger;
            if(id.getAttribute("flg")=="old"){
            loadchart(id.value);
        }
        else{
            loadmrno();
        }
//            loadchart(id.value);
        }
        
        function loadmrno(){
            var flag=document.getElementById("txtmul").value;
//            alert(flag);
            debugger;
            if(flag!="1"){
            var mrnofield=$('#txtmrnofield').val();
            var mrno=$('#txtchrtmrno').val();
            if(mrno.trim()!=""){
                document.getElementById(mrnofield).value=mrno;
                document.getElementById(mrnofield).onchange();
                
            }
        }
        else{
            try{
            document.getElementById("changechart").style.display="none";
        }
        catch(ee){
            
        }
            document.getElementById("loadmcharts").style.display="inline-block";
            var chids=document.getElementById("id_screen"+document.getElementById("id_screenno").value).value;
            var ch=chids.split("@@");
            for(var i=0;i<ch.length;i++){
                if(ch[i].trim()!=""){
                    document.getElementById(ch[i]).setAttribute("onclick","showchart(this,'1')");
                    document.getElementById(ch[i]).onclick();
                }
            }
        }
        }
        function searchthis(id){
            debugger;
            var maindiv=document.getElementById("maindiv");
            if(maindiv.children.length>0){
                for(var i=0;i<maindiv.children[0].children.length;i++){
                    if(maindiv.children[0].children[i].id.toUpperCase().indexOf(id.value.replace("sub_","").toUpperCase())>=0){
                        maindiv.children[0].children[i].style.display="block";
                    }
                    else{
                        maindiv.children[0].children[i].style.display="none";
                    }
                }
            }
        }
        function backscreenchart(){
            debugger;
            if(document.getElementById("id_screenno").value>0){
           getBack();
        }
        else{
            if("patapp" in localStorage){
                if(localStorage.patapp=="1"){
                    location.href="PatientLoginThirdScreen.html";
                }
                else{
		    localStorage.disback="1";
                    location.href="dashboardmenubuttons.html";
                }
            }
            else{
		localStorage.disback="1";
                location.href="dashboardmenubuttons.html";
            }
             
        }
        }
        function settings(){
            location.href="settings.html";
        }
    


