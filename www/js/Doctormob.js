/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loaddate() {
//    $("#txtfromdate").datepicker({dateFormat: 'dd/mm/yy', minDate: 0});
//
//
//    $("#txttodate").datepicker({dateFormat: 'dd/mm/yy', minDate: 0});
}
function displaydiv(id) {
    debugger;
    if (id.parentNode.childNodes[1].className == "abc") {
        $(".abc").hide();
        id.parentNode.childNodes[1].className = "";
        id.className = "col-xs-4 col-sm-4 col-md-3 downarrow";
    }
    else {
        id.parentNode.childNodes[1].className = "abc";
        id.parentNode.childNodes[1].style.display = "block";
        if (id.parentNode.childNodes[1].childNodes.length == 1) {
            id.parentNode.childNodes[1].childNodes[0].onclick();
        }
        id.className = "col-xs-4 col-sm-4 col-md-3 downarrow iconbak";
    }
}
function showDoctors(id) {
    debugger;
    
  var locid =localStorage.locid;
  //alert(""+locid+"---"+$(loc_text_id).val());
    id.setAttribute("onclick", "displaydiv(this)");
    localStorage.ipadrs = localStorage.appurl;
    var speid = id.id;
//                        document.getElementById("txtspl").value=id.id;
//alert();
    document.getElementById(id.getAttribute("name")).value = id.id;

    $('.iconbak').removeClass("iconbak");
    $(id.parentNode.childNodes[0]).addClass("iconbak");
//                $('#imgpaticon').val(img);

//                        document.getElementById("docdiv").style.display="block";
    var qry = id.getAttribute("subqry");
    var sdata = document.getElementById("id_scrdata").value.split("@");
    for (var i = 1; i < sdata.length; i++) {
        qry = qry.replace(sdata[i], document.getElementById("txt_" + sdata[i]).value);
    }
    document.getElementById("mydiv").style.display = "block";
    qry = qry.replace($(loc_text_id).val(),locid);
    qry = encodeURIComponent(qry);
    var nextid = id.getAttribute("nextid");
    $.get(localStorage.ipadrs + "/patientAppMobileAppts?type=getdoctors&subqry=" + qry + '&nextid=' + nextid, function (responjson) {
        if (responjson != null && responjson != "") {
            debugger;
            if (responjson.indexOf("EXCEPTION") < 0) {
//                                     document.getElementById("docdiv").innerHTML=responjson;
                debugger;
                $(".abc").hide();
                $('.abc').removeClass("abc");
                id.parentNode.childNodes[1].innerHTML = responjson;
                if (id.parentNode.childNodes[1].childNodes.length == 1) {
//                                         alert(id.parentNode.childNodes[1].childNodes[0].id);
                    id.parentNode.childNodes[1].childNodes[0].onclick();
                }
                id.parentNode.childNodes[1].style.display = "block";
//                                    document.getElementById("docdiv").style.display="none";

                $(id.parentNode.childNodes[1]).addClass("abc");
            }
            else {
//                                    document.getElementById("docdiv").innerHTML=responjson;
            }
            document.getElementById("mydiv").style.display = "none";
        }
        else {
            $(".abc").hide();
            $('.abc').removeClass("abc");
            id.parentNode.childNodes[1].innerHTML = "<label class='nodoctor'>Sorry ! No Doctors Available For This Specialization</label>";

            id.parentNode.childNodes[1].style.display = "block";

            $(id.parentNode.childNodes[1]).addClass("abc");
            document.getElementById("mydiv").style.display = "none";
        }
    });
}

function showAppoitments(id, flg, speid) {
//                        var docid=id.id;
//"div#DOC00050.row.row1"
    debugger;
    localStorage.payDoctorId = id.id;
//    alert("id=="+id);
//    alert("insideShowAppointmentDoctorId:"+id.id);
//    alert("id.getAttribute====="+id.getAttribute("doctext"));
    localStorage.paydoctextid=id.getAttribute("doctext");
    document.getElementById(id.getAttribute("doctext")).value = id.id;

    var path = localStorage.ipadrs;
    var formid = localStorage.patmenuformid;
    var locid = "";
    document.getElementById("mydiv").style.display = "block";
    var sdata = document.getElementById("id_scrdata").value.split("@");
    var scrdata1 = "";
    var data = "";
    for (var i = 1; i < sdata.length; i++) {
        scrdata1 = scrdata1 + "&" + sdata[i] + "=" + document.getElementById("txt_" + sdata[i]).value;
    }
    // alert("sdata=="+ sdata);
//      alert("sdata=="+ scrdata1);
      localStorage.paySrcdata=scrdata1;
//    for(var i=1;i<sdata.length;i++){
//        scrdata1=scrdata1+"-->"+document.getElementById("txt_"+sdata[i]).value+"@"+sdata[i];
//    }

//     var spl
//    if(flg=="1"){
//         var spl=speid;
//    }
//    else{
//    var spl=document.getElementById("txtspl").value;
//    }
    path = path + "/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=" + formid + '&mrno=' + localStorage.patmrno + '&locid=' + locid + '' + scrdata1 + '&patapp=1';
    $.get(path, function (responseText) {
        debugger;
//alert(responseText);
//        $('#formdiv').html(responseText);
        try {
            document.getElementById("displayschedules").style.display = "none";
            document.getElementById("displayappts").style.display = "block";
            $('#displayappts').html(responseText);
        }
        catch (ee) {

        }
        localStorage.patapp = 1;
        document.getElementById("mydiv").style.display = "none";
        loadform();

//        $("#Date1").datepicker({
//            dateFormat: 'dd/mm/yy'
//        });
    });
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
//}

function fillspl(id) {
    debugger;
    document.getElementById("txt_" + id.getAttribute("name")).value = id.id;
    localStorage.payDoctorId=id.id;
    if (id.getAttribute("enterqry").indexOf("SH:QRY") >= 0) {
        var qry = id.getAttribute("enterqry");
        qry = qry.replace("SH:QRY", "");
        var data = qry.split("==");
        qry = data[1];
        var sdata = document.getElementById("id_scrdata").value.split("@");
        for (var i = 1; i < sdata.length; i++) {
            qry = qry.replace(sdata[i], document.getElementById("txt_" + sdata[i]).value);
        }
        qry = encodeURIComponent(qry);
        $.get(localStorage.appurl + "/patientAppMobileAppts?type=fill&qry=" + qry, function (responcejson) {
            if (responcejson != "") {
                debugger;
                document.getElementById("txt_" + data[0].trim()).value = responcejson;

                var path = localStorage.ipadrs;
                var formid = localStorage.patmenuformid;
                var locid = "";
                document.getElementById("mydiv").style.display = "block";
                var sdata = document.getElementById("id_scrdata").value.split("@");
                var scrdata1 = "";

                for (var i = 1; i < sdata.length; i++) {
                    scrdata1 = scrdata1 + "&" + sdata[i] + "=" + document.getElementById("txt_" + sdata[i]).value;
                }
            localStorage.paySrcdata=scrdata1;
                path = path + "/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=" + formid + '&mrno=' + localStorage.patmrno + '&locid=' + locid + '' + scrdata1 + '&patapp=1';
                $.get(path, function (responseText) {
                    debugger;

                    document.getElementById("displayschedules").style.display = "none";
                    document.getElementById("displayappts").style.display = "block";
                    $('#displayappts').html(responseText);
                    localStorage.patapp = 1;
                    document.getElementById("mydiv").style.display = "none";
                    loadform();

                });
            }
        });



    }
    else {
        var path = localStorage.ipadrs;
        var formid = localStorage.patmenuformid;
        var locid = "";
        document.getElementById("mydiv").style.display = "block";
        var sdata = document.getElementById("id_scrdata").value.split("@");
        var scrdata1 = "";

        for (var i = 1; i < sdata.length; i++) {
            scrdata1 = scrdata1 + "&" + sdata[i] + "=" + document.getElementById("txt_" + sdata[i]).value;
        }

        path = path + "/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=" + formid + '&mrno=' + localStorage.patmrno + '&locid=' + locid + '' + scrdata1 + '&patapp=1';
        $.get(path, function (responseText) {
            debugger;

            document.getElementById("displayschedules").style.display = "none";
            document.getElementById("displayappts").style.display = "block";
            $('#displayappts').html(responseText);
            localStorage.patapp = 1;
            document.getElementById("mydiv").style.display = "none";
            loadform();

        });
    }
}

function gotodoctors() {
    debugger;
 var fromnotification=  getParameterByName("fromnotification");
         if(fromnotification=="1"){
         var appname= localStorage.appname;
           if (appname=="dashboard"){
            localStorage.apptback="1";
         location.href='dashboardmenubuttons.html';
           }else{
               location.href = 'PatientLoginThirdScreen.html';
             }
    }else{
    document.getElementById("displayschedules").style.display = "block";
    document.getElementById("displayappts").style.display = "none";
    var sdata = document.getElementById("id_scrdata").value.split("@");
    for (var i = 1; i < sdata.length; i++) {
        document.getElementById(sdata[i]).value = "";
    }
}
}

function shafilspl(id) {
    debugger;
//                        if(id.parentNode.id=="spl"){
//                        localStorage.ipadrs = localStorage.appurl;
    var con = id.value.toUpperCase();

    var divdata = document.getElementById("div_" + id.id);
    try{
//                            alert(divdata.children[0].childNodes[0].childNodes[0].getAttribute("class").indexOf("downarrow"));
    if (divdata.children[0].childNodes[0].childNodes[0].getAttribute("class").indexOf("downarrow") >= 0) {
        for (var i = 0; i < divdata.children.length; i++) {
            if (divdata.children[i].childNodes[0].childNodes[0].textContent.toUpperCase().indexOf(con) >= 0) {
                divdata.children[i].style.display = "block";

            }
            else {
                divdata.children[i].style.display = "none";
            }
        }
    }
    else {



        var divdata = document.getElementById("div_" + id.id);
//                            alert(divdata.children[0].childNodes[1].childNodes[0].childNodes[0].textContent);
        for (var i = 0; i < divdata.children.length; i++) {
            if (divdata.children[i].childNodes[1].childNodes[0].childNodes[0].textContent.toUpperCase().indexOf(con) >= 0) {
                divdata.children[i].style.display = "block";

            }
            else {
                divdata.children[i].style.display = "none";
            }
        }

    }
}catch(err){
    $('[id^="maindiv_"]').each(function () {
        //alert(this.id)
        debugger;
            var data = this.id.replace("maindiv_","");
            if (data.toUpperCase().indexOf(con) >= 0) {
                $(this).removeClass("displaynone");
                this.style.display = "block";
            }
            else {
                $(this).addClass("displaynone");
                this.style.display = "none";
               // $(this).hide();
            }
        });
}
//                        }

//                        else if(id.parentNode.id=="doc"){
//                            var con=id.value.toUpperCase();
//
//                            var divdata=document.getElementById("docdiv");
//                            for(var i=0;i<divdata.children.length;i++){
//                                if(divdata.children[i].childNodes[1].childNodes[0].childNodes[0].textContent.toUpperCase().indexOf(con)>=0){
//                                    divdata.children[i].style.display="block";
//
//                                }
//                                else{
//                                    divdata.children[i].style.display="none";
//                                }
//                            }
//                        }

}

function seldiv(id) {
    debugger;
//                        if(id.className.indexOf("inactive")>=0){
//                            var doc=document.getElementById("doc");
//                            var spl=document.getElementById("spl");
//                        if(id.id=="doc"){
//                            doc.className="active";
//                            spl.className="inactive";
//                            spl.children[0].value="";
//                            spl.children[0].onchange();
//                            document.getElementById("docdiv").style.display="block";
//                            document.getElementById("spldiv").style.display="none";
//                        }
//                        else if(id.id=="spl"){
//                            doc.className="inactive";
//                            spl.className="active";
//                            doc.children[0].value="";
//                            doc.children[0].onchange();
//                            
//                            document.getElementById("docdiv").style.display="none";
//                            document.getElementById("spldiv").style.display="block";
//                        }
//                    }
    var scrdata = document.getElementById("id_scrdata").value;
    var idval = "div_" + id.children[0].id;
    var divids = scrdata.split("@");
    try {
        for (var i = 1; i < divids.length; i++) {
            document.getElementById("div_" + divids[i]).style.display = "none";
            document.getElementById(divids[i]).parentNode.setAttribute("class", "inactive specldiv");

        }
    }
    catch (ee) {

    }
    document.getElementById(idval).style.display = "block";
    id.setAttribute("class", "active specldiv");
}
  $(document).ready(function () {
    debugger;
    var textbox = localStorage.patformpath;
    var formtype = localStorage.patformtype;
    var webformid = localStorage.patmenuformid;
    var fromnotification=  getParameterByName("fromnotification");
         if(fromnotification=="1"){
         $("#mydiv").show();
           try{ var htldo = window.innerHeight;
        var asgnmrgn=htldo/2;
       $(".divforsearch").find("#mydiv").css("margin-top",parseInt(asgnmrgn)+-50+"px");
   }catch(err){}
          
         $(".divforsearch").find("header").css("display","none");
//          $("#divforsearch").css("display","none");
     if(localStorage.appname=="dashboard"){
       localStorage.appurl = localStorage.ipadrs;
  } 
      var docid= getParameterByName("value_id");
               var speid= getParameterByName("value_id1");
               var locid =localStorage.locid;
 var path1 = localStorage.appurl+ '/MobileAppointment?formmenuid=' + webformid;
        $.get(path1, function (responcejson) {
            if (responcejson != "" && responcejson != null) {
                debugger;
         var data1=responcejson[0];
                localStorage.patformpath = responcejson[0]['FORMNAME'];
                localStorage.patformtype = responcejson[0]['FORMTYPE'];
                localStorage.patmenuname = responcejson[0]['MENUNM'];
                var mrno = localStorage.patmrno;
                var path = localStorage.patformpath;
        
                var theme = ''
        var  loc_text_id="";
        if (localStorage.patformtype == '9') {
                  var path1 = localStorage.appurl+ '/MobileAppointment?type=apptnotification&formmenuid=' + webformid;
        $.get(path1, function (responcejson) {
            if (responcejson != "" && responcejson != null) {
             localStorage.patselectedlocid=locid; 
             loc_text_id=responcejson[0]["LOC_TEXT_ID"];
        var path2 =localStorage.appurl+ '/admin/PatientAppMobileAppts.jsp?loc_text_id='+loc_text_id+'&locid='+locid+'&webformid=' + webformid + '&mrno=' + mrno + '&theme=' + encodeURIComponent(theme);
//                     var path2=localStorage.appurl + '/admin/apptlocations.jsp?webformid='+webformid+'&mrno=' + mrno + '&theme=' + encodeURIComponent(theme);
               $.get(path2, function (restext) {
           debugger;
                        $('#displayschedules').html(restext); 
            try{
                        document.getElementById("patheadname").innerHTML=localStorage.patheadname;
                        document.getElementById("formname").innerHTML = localStorage.formname;
            }catch(err){}
//                        $("#mydiv").hide();
              $('#displayappts').hide();
              $('#displayschedules').show();
                         $('#displayschedules').hide();
                $('#displayforms').hide();
                localStorage.patselectedlocid=locid;
                 fillsplnotification(locid,docid,speid);
                    });
 
       }
       });
        }
       }
 }); 
    }else{ 
        var locid =localStorage.locid;  
var path2 =localStorage.appurl+ '/admin/PatientAppMobileAppts.jsp?webformid=' + localStorage.currentformid + '&mrno= &locid='+locid;
 $.get(path2, function (restext) {
     if(restext!=""){
          $('#displayschedules').html(restext);
                       }
       });  
     }
  });
function load(textbox, formtype, webformid) {
    debugger;
    var mrno = localStorage.patmrno;
    var srcdata = localStorage.patsrcdata;
    if (srcdata.indexOf("-->") >= 0) {
        var scr = srcdata.split("-->");
        for (var n = 1; n < scr.length; n++) {
            var scr1 = scr[n].split("@");
            if (n == 1)
            {
                var speid = scr1[1].trim();
            }
            if (n == 2)
            {
                var locid = scr1[1].trim();
                localStorage.patapplocid = locid;
            }
            if (n == 4)
            {
                var mapopdocid = scr1[1].trim();
            }
        }
    }
    var theme = ''
    if (formtype != '9') {
        if (path.indexOf("?") == -1) {
            var path = path + '?fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&locid=' + locid + '&docid=' + mapopdocid + '&speid=' + speid;
            $.get(path, function (responseText) {
                $('#displayschedules').html(responseText);

            });
        } else {
            path = path + '&fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&speid=' + speid + '&docid=' + mapopdocid;
            $.get(path, function (responseText) {
                $('#displayschedules').html(responseText)
            });
        }
    } else {
        debugger;
        if (localStorage.patdisslot == "1") {
            var path = localStorage.appurl + '/formViewDIS?type=getcond&webformid=' + webformid;
            $.get(path, function (responseText) {
                $('#displayschedules').html(responseText)
            });
        } else {
//            path = path + "admin/ScheduleDivPopMobile.jsp?type=getavldates&webid="+formid+'&mrno='+localStorage.mrno+'&locid='+locid+'&theme=&docid='+localStorage.opdocid+'&speid='+localStorage.speid;
            var path = localStorage.appurl + '/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=' + webformid + '&mrno=' + mrno + '&locid=' + locid + '&theme=' + encodeURIComponent(theme) + '&docid=' + mapopdocid + '&speid=' + speid;
            $.get(path, function (responseText) {
                $('#displayschedules').html(responseText);
                loadform();
            });
        }
    }

}
function  fillsplnotification(locid,docid,speid){
    debugger;
       var formid = localStorage.patmenuformid;
         var webformid = localStorage.patmenuformid;
             var path1 = localStorage.appurl+ '/MobileAppointment?type=apptnotification&formmenuid=' + webformid;
        $.get(path1, function (responcejson) {
         if (responcejson != "" && responcejson != null) {
                debugger;
         var txtdocid = responcejson[0]['DOC_TEXT_ID'];
                     var txtspeid =  responcejson[0]['SPE_TEXT_ID'];
                     var txtlocid =  responcejson[0]['LOC_TEXT_ID']; 
//        var srcdata="&"+txtdocid+"="+docid+"&"+txtspeid+"="+speid;
            locid = "";
            var srcdata1 = "";
 srcdata1 = srcdata1 +"&"+txtdocid+"="+docid+"&"+txtspeid+"="+speid;
//                for (var i = 1; i < sdata.length; i++) {
//                    scrdata1 = scrdata1 + "&" + sdata[i] + "=" + document.getElementById("txt_" + sdata[i]).value;
//                }
       var  path = localStorage.appurl + "/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=" + formid + '&mrno=' + localStorage.patmrno + '&locid=' + locid+''+srcdata1+'&patapp=1';
                $.get(path, function (responseText) {
                    debugger;
             $('#displayappts').html(responseText);
                    document.getElementById("displayschedules").style.display = "none";
                    document.getElementById("displayappts").style.display = "block";
                   
                    localStorage.patapp = 1;
                    document.getElementById("mydiv").style.display = "none";
                    loadform();
            $(".divforsearch").find("header").css("display","block");
            
                 });
         }
          });
}
 function loadform(){
    debugger;
    loaddate();
    document.getElementById("head1").innerHTML=document.getElementById("headdata").value;
    var srcdata = localStorage.patsrcdata;
    if (srcdata.indexOf("-->") >= 0) {
        var scr = srcdata.split("-->");
        for (var n = 1; n < scr.length; n++) {
            var scr1 = scr[n].split("@");
            if (n == 1)
            {
            document.getElementById(scr1[0]).value= scr1[1].trim();
            localStorage.patspeid=scr1[1].trim();
            }
            if (n == 2)
            {
             document.getElementById(scr1[0]).value= scr1[1].trim();
             localStorage.patlocid=scr1[1].trim();
            }
            if (n ==3)
            {
             document.getElementById(scr1[0]).value= scr1[1].trim();
             localStorage.patdate=scr1[1].trim();
            }
            if (n == 4)
            {
            document.getElementById(scr1[0]).value= scr1[1].trim();
            localStorage.patdocid=scr1[1].trim();
           }
        }
    }
       document.getElementById("head1").style.display="none";
        document.getElementById("popdiv1").innerHTML=document.getElementById("divdatasch").value;
                
                 var resdata=document.getElementById("scrdata").value;
                if(resdata.indexOf("-->")>=0){
                    var data=resdata.split("-->");
                    for(var n=1;n<data.length;n++){
                        var data1=data[n].split("@");
                        document.getElementById(data1[0]).value=data1[1];
                    }
                }
                debugger;
          try{
         if(document.getElementById("txtlocation").value!="null"){
                    var lid=document.getElementById("locid").value;
                    
                    document.getElementById(lid).value=document.getElementById("txtlocation").value;
                }
                var docid = document.getElementById('hdnDocid').value ; 
                var speid = document.getElementById('hdnSpeid').value;        
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
function closeapp()
{
    location.href = 'DoctorApp.html';
}


function displaynumbers() {
    debugger;
    $('#head3 table').each(function () {
        if (this.getAttribute("class") == "intbl") {
            if (this.rows.length > 0) {
                for (var i = 0; i < this.rows.length; i++) {
                    for (var j = 0; j < this.rows[i].cells.length; j++) {
                        try {
                            if (this.rows[i].cells[j].getAttribute("rownum") != "") {
                                this.rows[i].cells[j].textContent = this.rows[i].cells[j].getAttribute("rownum");
                            }
                        }
                        catch (ee) {
                        }
                    }
                }
            }
        }
    });
}
   function getAvalDates1(id){
                debugger;
//                $("#mydiv1").show();
               var webid=localStorage.patmenuformid;
                var colsqry=document.getElementById("colsqry").value;
                var condition=id.title;
                var scrdata1=document.getElementById("s").value;
                var scrdata="";
                 var scrdata1 = localStorage.patsrcdata;
          var scrdata = "";
            if (scrdata1.indexOf("-->") >= 0) {
          var scr = scrdata1.split("-->");
        for (var n = 1; n < scr.length; n++) {
            var scr1 = scr[n].split("@");
            if (n == 2)
            {
                var patlocid = scr1[1].trim();
            }
            scrdata = scrdata + "-->" + scr1[0] + "@" + scr1[1];
        }
    }
                var fromdate=document.getElementById("txtfromdate").value;
                var todate=document.getElementById("txttodate").value;
//               document.getElementById("mydiv1").style.display="block";
                $.get(localStorage.appurl+'/TestingSchedule?type=getavldates&webid='+webid+'&patilocid='+patlocid+'&condition='+condition+'&colsqry='+colsqry+'&scrdata='+scrdata+'&fromdate='+fromdate+'&todate='+todate+'&mobile=1&patmobile=2',function(responcejson){
                    debugger;
                    if(responcejson!="" && responcejson!=null){
                        var avldiv=document.getElementById("head3");
                        avldiv.innerHTML=responcejson;
                        localStorage.banknm=$("#id_bankname").val();
//         alert(localStorage.banknm);
//                        $("#mydiv1").hide();
//                        document.getElementById("mydiv1").style.display="none";
                   }
                    else{
//                        document.getElementById("mydiv1").style.display="none";
                      }
                });
            }
           

function showPopup(id,flg)
{
 debugger;
 var iddata = id.id;
  var iddata1 = iddata.split("@");  
 localStorage.notsaveval=$("#txtnotsave").val();
 localStorage.patflg=flg;
 localStorage.patrownum=id.getAttribute("rownum");
 localStorage.patfromtime=id.title;
 localStorage.patclimid=iddata1[1];
 localStorage.patid=id;
 popgenid();
location.href="Doctorappointmentapp.html";  
}

function popgenid() {
    var locid = "";
   var popdt = "";
    debugger;
    var data = "";
    var s =localStorage.patsrcdata;
    var clm = document.getElementById("clm").value;
    var type = document.getElementById("type").value;
    var type1 = type.split("@");
       var s1 = s.split("@");
    var clm1 = clm.split("@");
    for (var k = 1; k < s1.length; k++) {
        var v =s1[k].trim();
        data = data + "-->" + v + "@" + clm1[k] + "@" + type1[k];
    }
    var webid = localStorage.patmenuformid;;
    $.get(localStorage.appurl+ '/TestingSchedule?popdt=' + popdt + '&webid=' + webid + '&type=popgenid&locid=' + locid + '&data=' + data, function (responcejson1) {
        if (responcejson1 != null) {
            document.getElementById("txtunicid").value = responcejson1;
            localStorage.patunicid=document.getElementById("txtunicid").value;
             
        }
        else {

        }
        
    });
}

function closebutton()
{ 
    debugger;
     var fromnotification=  getParameterByName("fromnotification");
         if(fromnotification=="1"){
         var appname= localStorage.appname;
           if (appname=="dashboard"){
            localStorage.apptback="1";
         location.href='dashboardmenubuttons.html';
           }else{
             location.href = 'PatientLoginThirdScreen.html';
         }
         }else{
    if(getParameterByName("dashboard")=="1"){
        localStorage.apptback="1";
         location.href='dashboardmenubuttons.html';
    }
    else{
    location.href = 'DoctorApp.html';
    }
         }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}