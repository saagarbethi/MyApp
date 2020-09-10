/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    debugger;
    $("#mydiv").show();
    var mrno = localStorage.patmrno;
    var webformid = localStorage.lowebformid;
    var webviewid = localStorage.webviewid;
    var formname = localStorage.formname;
    var formtype = localStorage.formtype;
    var menuformid = localStorage.patmenuformid;
    var formorderno = localStorage.formorderno;
    try{
         
            
        document.getElementById("patheadname").innerHTML=localStorage.patheadname;
            
        document.getElementById("patheadimg").src=localStorage.patheadimg;
//        alert(localStorage.patheadname);
    }
    catch(e){
        
    }
    var path = localStorage.appurl + "/Displyform?orderno=" + formorderno + "&webviewid=" + webviewid + "&mrno=" + mrno + "&webformid=" + webformid + "&formname=" + formname + "&formtype=" + formtype + "&menuformid=" + menuformid;
    if (menuformid == "" || menuformid == '-Select-') {
        $.get(path, function (responseText) {
            $('#displayforms').html(responseText);
            document.getElementById("formname").innerHTML = localStorage.formname;
            $("#mydiv").hide();
        });
    } else {
        webformid = localStorage.patmenuformid;
        var path1 = localStorage.appurl + '/MobileAppointment?formmenuid=' + webformid;
        $.get(path1, function (responcejson) {
            if (responcejson != "" && responcejson != null) {
                debugger;
                localStorage.patformpath = responcejson[0]['FORMNAME'];
                localStorage.patformtype = responcejson[0]['FORMTYPE'];
                localStorage.patmenuname = responcejson[0]['MENUNM'];
                var mrno = localStorage.patmrno;
                var path = localStorage.patformpath;
                var theme = ''
                var path2 = localStorage.appurl + '/admin/PatientAppMobileAppts.jsp?webformid=' + webformid + '&mrno=' + mrno + '&theme=' + encodeURIComponent(theme);
                if (localStorage.patformtype == '9') {
                    $.get(path2, function (restext) {
                        $('#displayforms').html(restext);
                        document.getElementById("formname").innerHTML = localStorage.formname;
                        $("#mydiv").hide();
                    });
                } else if (localStorage.patformtype == '2') {
                    localStorage.currentformid = webformid;
                    getpatdata();
                }
                else if (localStorage.patformtype == "14") {
                    localStorage.currentformid = webformid;

                    localStorage.ipadrs = localStorage.appurl;
                    localStorage.patapp = 1;
                    localStorage.mrno = localStorage.patmrno;
                    location.href = 'Drilldashboard.html';

                }
                else if (localStorage.patformtype == "15") {
                    localStorage.currentformid = webformid;

                    localStorage.ipadrs = localStorage.appurl;
                    localStorage.patapp = 1;
                    localStorage.mrno = localStorage.patmrno;
                    path = 'chartFrameWorkViewMobile.jsp?webformid=' + webformid + '&fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + localStorage.mrno;
//            localStorage.path = path;
                    $.get(localStorage.ipadrs + '/admin/' + path, function (responseText) {
//                document.getElementById("divpdf").style.display = 'none';
//                document.getElementById("divdata").style.display = 'none';
//                document.getElementById('divFrame').style.display = 'inline-block'
                        $('#displayforms').html(responseText);
                        document.getElementById("mydiv").style.display = "none";
                        loadmrnodata();

                    });

                }
                else if (localStorage.patformtype == "-1") {
                    document.getElementById("mydiv").style.display = "block";
                    localStorage.currentformid = webformid;

                    localStorage.ipadrs = localStorage.appurl;
                    localStorage.patapp = 1;
                    localStorage.mrno = localStorage.patmrno;
                    localStorage.patapp = 1;
                    $.get(localStorage.appurl + '/admin/FeedbackTemplateMobile.jsp?formid=' + webformid, function (responseText) {
                        $('#displayforms').html(responseText);
                        var path1 = localStorage.appurl + '/FeedBackTemplate?formid=' + webformid + '&type=chkmainquestion';
                        $.get(path1, function (responseText) {
                            debugger;
                            if (responseText != "") {
                                if (responseText == "1") {
                                    $('#mainqtnid').val("1");
                                    loadnext1();
                                } else {
                                     $('#mainqtnid').val("0");
                                    loadnext();
                                }

                            }
                        });
//        loadnext();
//        document.getElementById("mydiv").style.display="none";
                    });
                }

//               checkSlot(localStorage.patformpath,localStorage.patformtype,localStorage.patmenuformid);   
            }


        });
    }
});
function loadnext1() {
    debugger;
    document.getElementById("txtId").value = localStorage.patmrno;
    var id = $('#txtId').val();
    var webformid = localStorage.currentformid;
    var userid = "PATAPP";
    var locid = "PATAPP";

    $.get(localStorage.appurl + '/FeedBackTemplate?type=get&id=' + id + '&webformid=' + webformid + '&userid=' + userid + '&locid=' + locid, function (responseText) {
        debugger;
        var data = responseText.split("$");

        if (data[0].trim() == "") {
            $('#txtId').focus();
            $('#spnError').html("No Data with this Number.");
            $(button).removeAttr('disabled');
            return;
        }
        else if (data[0] == "0") {
            $('#spnError').html("You have Already Given Feedback Today.");
            alert("You have Already Given Feedback Today.");
            location.href = 'PatientLoginThirdScreen.html';
            return;
            document.getElementById("mydiv").style.display = "none";
        }
        else {
            $('#hdnmainId').val(id);
            $('.patdatamain').html(data[0]);
            $('#spnError').html("");
            $('#hdnmainFeedId').val(data[1]);
            $('#hdnSmsText').val(data[2]);
            $('#hdnMobile').val(data[3]);
            try {
                $(".mainque").show();
                $('.feedbackfooter').hide();
            }
            catch (e) {
            }
            document.getElementById('go-left').click();
            document.getElementById("mydiv").style.display = "none";
        }

    });
}
function gotonext(id,div,qid) {
    debugger;
    var no = id.getAttribute('alt');
      $('#hdnmain' + qid).val(no);
      $('#mainimgno').val(no);
      var imgno = $(id).attr("alt");
                for (var i = 0; i < 5; i++) {
                    toggleLike("like", div.children[i]);
                }
                for (var i = 0; i < imgno; i++) {
                    toggleLike("normal", div.children[i]);
                }
                var id = $('#hdnmainId').val();
                var feedid = $('#hdnmainFeedId').val();
                var userid = "";
                if("userid" in localStorage){
                    userid = localStorage.userid;
                }
                else{
                    userid="PATAPP";
                }
                
                var locid = "";
                if("locid" in localStorage){
                    locid = localStorage.locid;
                }
                else{
                    locid="PATAPP";
                }
                var ratingtype="0";
                var mainqtn="1";
                $.get(localStorage.appurl + '/FeedBackTemplate?type=save&id=' + id + '&ratingtype=' + ratingtype + '&ratingdata=' + imgno + '&qtnid=' + qid + '&userid=' + userid + '&locid=' + locid + '&feedid=' + feedid+'&mainqtn='+mainqtn, function (responseText) {
 if (no == "5") {
       $('#hdnFeedId').val(feedid);
              var divid = $('.active').attr('id');
       var divno = divid.replace("div","");
       if(divno<=0){
           $('#'+divid).removeClass('active');
                        divno = parseInt(divno)+1;
                         divid = "div"+divno;
                        $('#'+divid).addClass('active');
                         $('#go-left').show();
                    if ($('.active').next('.slide').length) {
                        $('.active').removeClass('active').next('.slide').addClass('active');
                    } else {
                        $('.active').removeClass('active');
                        $('.slide').first().addClass('active');
                    }
                    var noofscreens = $('#hdnScreen').val();
                    var divid = $('.active').attr('id');
                    
                    if(divid==="divThanku"){
                        $('#go-right').hide();
                    }
                     $('.feedbackfooter').show();
       }
    }else{
        $('.feedbackfooter').show();
        loadnext();
    }
                });
   
}
function loadnext() {

    document.getElementById("txtId").value = localStorage.patmrno;
    var id = $('#txtId').val();
    var webformid = localStorage.currentformid;
    var userid = "PATAPP";
    var locid = "PATAPP";
//                if (id == "") {
//                    $(button).removeAttr('disabled');
//                    alert('Please Enter your number');
//                    return;
//                }
    $.get(localStorage.appurl + '/FeedBackTemplate?type=get&id=' + id + '&webformid=' + webformid + '&userid=' + userid + '&locid=' + locid, function (responseText) {
        debugger;
        var data = responseText.split("$");

        if (data[0].trim() == "") {
            $('#txtId').focus();
            $('#spnError').html("No Data with this Number.");
            $(button).removeAttr('disabled');
            return;
        }
        else if (data[0] == "0") {
            $('#spnError').html("You have Alredy Given Feedback Today.");
//                        $(button).removeAttr('disabled');
//                        $('#txtId').focus();
            alert("You have Alredy Given Feedback Today.");
            location.href = 'PatientLoginThirdScreen.html';
            return;
            document.getElementById("mydiv").style.display = "none";
        }
        else {
            $('.patdata').html(data[0]);
            $('#hdnId').val(id);
            $('#spnError').html("");
            $('#hdnFeedId').val(data[1]);
            $('#hdnSmsText').val(data[2]);
            $('#hdnMobile').val(data[3]);
//                        alert(data[3]);
            document.getElementById('go-left').click();
            //$('#go-left').show();
            $('#go-right').show();
            document.getElementById("mydiv").style.display = "none";
        }

    });
}


function closebutton(clflg)
{
    if(clflg=="1"){
        location.href = 'PatientLoginThirdScreen.html';
        return;
    }
    if (localStorage.drillappt == "1") {
        localStorage.patapp = 1;
        localStorage.mrno = localStorage.patmrno;
        localStorage.currentformid = localStorage.backformid;
        localStorage.patmenuformid = localStorage.currentformid;
        location.href = 'DisplayForms.html';
        localStorage.drillappt = "0";
    }
    else {
        location.href = 'PatientLoginThirdScreen.html';
    }
}
function fixedappointment()
{
    location.href = 'DoctorApp.html';
}
function popdiv() {

    var scrdata = $("#txtsrcdata").val();
    if (scrdata.indexOf("-->") >= 0) {
        var scr = scrdata.split("-->");
        for (var n = 1; n < scr.length; n++) {
            var scr1 = scr[n].split("@");
            document.getElementById(scr1[0]).value = scr1[1].trim();
        }
    }
    localStorage.patsrcdata = scrdata;
    document.getElementById("mydiv").style.display = "none";
    loaddate1();
}

function loadLocation() {
    var webformid = localStorage.patmenuformid;
    var locid = $("#txtlocid").val();
    $.get(localStorage.appurl + '/TestingScheduleNew?type=getLocation&webid=' + webformid, function (responcejson) {
        if (responcejson != "" && responcejson != null) {
            debugger;
            if (locid != null) {
                document.getElementById(responcejson).value = locid;
//                                    document.getElementById(responcejson).onchange();     
            }
            if (document.getElementById("txtdocid").value != "null") {
                var lid = document.getElementById("txtdocid").value;
//                    if(lid!=null)
//                    {
//                      document.getElementById(lid).value=document.getElementById("txtdocid").value;
//                     document.getElementById(lid).onchange();    
//                    }

            }

        }
    });

}
function loadheadcond() {
    debugger;
    var tab = document.getElementById("tabhdr");
    for (var i = 0; i < tab.rows[0].cells.length; i++) {
        if (tab.rows[0].cells[i].children.length > 0) {
            //                alert(tab.rows[0].cells[i].childNodes[0].tagName);
            if (tab.rows[0].cells[i].childNodes[0].tagName == "SELECT") {
                var cond = tab.rows[0].cells[i].childNodes[0].getAttribute("onentercond");
                if (cond.indexOf("SH:QRY") >= 0) {
                    var cond1 = cond.split("==");
                    //                       alert(cond1[0].replace("SH:QRY","").replace("$","").trim());
                    if (tab.rows[0].cells[i].childNodes[0].value.trim() != '') {
                        //                      alert(document.getElementById(cond1[0].replace("SH:QRY","").replace("$","").trim()).value);
                        if (document.getElementById(cond1[0].replace("SH:QRY", "").replace("$", "").trim()).value == '') {
                            fillcondition(tab.rows[0].cells[i].childNodes[0].id, "2");
                        }

                    }
                }

            }
        }
    }
}

function loadhdrcombo() {
    debugger;
    var tab = document.getElementById("tabhdr");
    for (var i = 0; i < tab.rows[0].cells.length; i++) {
        if (tab.rows[0].cells[i].children.length > 0) {
            //                alert(tab.rows[0].cells[i].childNodes[0].tagName);
            if (tab.rows[0].cells[i].childNodes[0].tagName == "SELECT") {
                //                   alert(tab.rows[0].cells[i].childNodes[0].value);
                if (tab.rows[0].cells[i].childNodes[0].value == "") {
                    if (tab.rows[0].cells[i].childNodes[0].options.length == 2) {
                        //                           alert("hi");
                        tab.rows[0].cells[i].childNodes[0].selectedIndex = "1";
                        tab.rows[0].cells[i].childNodes[0].onchange();

                    }
                }
            }
            ;
        }
    }

}
function fillcondition(id, flg, kid) {

    var webid = localStorage.patmenuformid;
    var id = id;
    var kval = "";
    if (flg == "5") {
        kval = document.getElementById(kid).value;
    }
    else {
        kid = "";
    }
    var rval = document.getElementById(id).value;
    if (flg == 2) {
        flg = 2;
    }
    else {
        flg = 1;
    }
    var scrdata = $("#txtsrcdata").val();
    //                alert(flg);
    $.get(localStorage.appurl + '/TestingSchedule?type=chkcondition&webid=' + webid + '&id=' + id + '&rval=' + rval + '&flg=' + flg + '&scrdata=' + scrdata + '&kid=' + kid + '&kval=' + kval, function (responcejson) {
        if (responcejson != "" && responcejson != null) {
            debugger;

            //                        var res=responcejson.split("@@");
            //                        document.getElementById(res[1]).value=res[0];
            //                        document.getElementById(res[1]).onchange();
            var res1 = responcejson.split("-->");
            for (var i = 0; i < res1.length; i++) {
                var res = res1[i].split("@@");
                try {
                    document.getElementById(res[1]).value = res[0];
                }
                catch (ee) {

                }
                //                        document.getElementById(res[1]).onchange();
                if (res[2] == "1") {

                    if (res[3] == "1") {
                        document.getElementById(res[1]).setAttribute("onchange", "onchangefun(this,'10')");
                        document.getElementById(res[1]).onchange();
                    }
                    else {
                        document.getElementById(res[1]).onchange();
                    }
                }
            }
        }
    });
}

function onchangefun(id, flg) {
    debugger
    document.getElementById("mydiv").style.display = "block";
    var condition = id.title;
    var temp = $("#temp").val()
    var srcd = $("#txtsrcdata").val();

    var fid = localStorage.patmenuformid;
    var theme = "";
    if (condition == "loadcolums") {

        var s = temp;
        var s1 = s.split("@");
        var data = "";

        if (flg != '10') {
            var cond = id.getAttribute("onentercond");
            if (cond != null) {
                if (cond.indexOf('SH:VAR') >= 0) {
                    var cond1 = cond.split("==");
                    document.getElementById(cond1[0].replace("SH:VAR", "").trim()).value = '';
                    //                
                }
            }
        }

        for (var i = 1; i < s1.length; i++) {
            data = data + "&" + s1[i] + "=" + document.getElementById(s1[i]).value;
        }
        var mrno = localStorage.patmrno;
        var path = localStorage.appurl + '/admin/Doctormobileapp.jsp?webformid=' + fid + '' + data + '&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&chflg=' + flg;
        $.get(path, function (responsetext) {
//                    var url=localStorage.appurl+'/admin/Doctormobileapp.jsp?webformid='+fid+''+data+'&theme='+encodeURIComponent(theme)+'&mrno='+mrno+'&chflg='+flg;
            $('#displayforms').html(responsetext);
//                    location.href=url;
        });
    }
    if (condition.indexOf("settime") >= 0) {
        var fromtm = document.getElementById("id_From_Time").value;
        var dur = document.getElementById(id.id).value;
        var webid = localStorage.patmenuformid;
        var scrdata = srcd;
        $.get(localStorage.appurl + '/TestingSchedule?fromtm=' + fromtm + '&dur=' + dur + '&type=gettime&webid=' + webid + "&scrdata=" + scrdata, function (responcejson) {
            if (responcejson != "" && responcejson != null) {
                var txtid = condition.split("==");
                var fid = txtid[0].replace("$", "");
                var resp = responcejson.split("-->");
                document.getElementById(fid).value = resp[0];
                var tab = document.getElementById("sctable");
                var rowcount = tab.rows.length;
                var tmcnt = resp[1].split("@");
                for (var z = 2; z < tmcnt.length; z++) {
                    responcejson = tmcnt[z];
                    var flg = "0";
                    for (var i = 1; i < rowcount; i++) {
                        debugger;
                        for (var j = 1; j < tab.rows[i].cells.length; j++) {

                            if (tab.rows[0].cells[j].title == document.getElementById("id_clmid").value) {

                                if (tab.rows[i].cells[j].title == responcejson) {
                                    if (tab.rows[i].cells[j].id != "") {
                                        alert(" Time Will be Overlaped");
                                        $("#popdiv").dialog("close");
                                        return;
                                    }
                                    else {
                                        flg = "1";
                                    }
                                }


                            }
                        }

                    }

                }
                if (flg == "0") {
                    alert("Operation Time Will be Overlaped");
                    return;
                }
            }
        });
    }
    if (id.type == "radio") {

        $.get(localStorage.appurl + 'admin/TestingSchedule?cond=' + condition + '&fid=' + fid + '&type=radiocond', function (responcejson) {
            if (responcejson != "" && responcejson != null) {
                debugger;
                var res = responcejson.split("-->");
                if (res[0].indexOf("@") >= 0) {
                    var res1 = res[0].split("@");
                    for (var i = 1; i < res1.length; i++) {
                        document.getElementById(res1[i]).style.display = "";
                    }
                }
                if (res[1].indexOf("@") >= 0) {
                    var res1 = res[1].split("@");
                    for (var i = 1; i < res1.length; i++) {
                        document.getElementById(res1[i]).style.display = "none";
                    }
                }
            }
        });

    }
    if (id.title == "loadgrid") {
        loadDate();
    }

    if (id.title.indexOf("SH:QRY") >= 0) {
        var webid = localStorage.patmenuformid;
        var scrdata = srcd;
        scrdata = scrdata + "-->" + id.id + "@" + document.getElementById(id.id).value;
        scrdata = scrdata + "-->id_clmid@" + document.getElementById("id_clmid").value;
        var unic = document.getElementById("txtunicid").value;
        $.get(localStorage.appurl + 'admin/TestingSchedule?webid=' + webid + '&type=validation&id=' + id.id + '&scrdata=' + scrdata + '&unicid=' + unic, function (responcejson) {
            if (responcejson != "" && responcejson != null) {
                if (responcejson.indexOf("@") >= 0) {
                    debugger;
                    var res = responcejson.split("@");
                    if (res[0] == "FALSE") {
                        //                                alert(res[1]);
                        if (res[1].indexOf("DONTALLOW") >= 0) {
                            res[1].replace("DONTALLOW", "");
                            document.getElementById("alertmsg").innerHTML = res[1];
                            displaymsg6();
                            document.getElementById(id.id).value = "";
                            return;
                        }
                        else {
                            document.getElementById("alertmsg").innerHTML = res[1];
                            displaymsg6();
                        }

                        //                                document.getElementById(id.id).value="";
                        //                                
                        //                                return;
                        fillcondition(id.id, flg);
                    }
                    else {
                        fillcondition(id.id, flg);
                    }
                }
                else {
                    fillcondition(id.id, flg);
                }
            }
            else {
                alert(responcejson);
            }
        });

        //            fillcondition(id.id,flg);
    }
}
function loaddate1() {
    $('#tabhdr').find('input[class=Date2]').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2020',
        //                    maxDate: new Date(currentYear, currentMonth, currentDate),
        dateFormat: "dd/mm/yy"
    });
    //            $('#tabhdr').find('input[class=Date2]').val("<%=dd%>");

    $('#id_div').find('input[class=Date2]').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2020',
        //                    maxDate: new Date(currentYear, currentMonth, currentDate),
        dateFormat: "dd/mm/yy"
    });
//                $('#id_div').find('input[class=Date2]').val($("#date").val());
}
function getpatdata() {
    debugger;
    var id = localStorage.patmrno;
    getPatdetails("", id, "");
}
function getPatdetails(patnm, id, lable) {
    localStorage.ipadrs = localStorage.appurl;
    var path = localStorage.ipadrs + '/DisDetails?mrno=' + id + '&type=patdetails';
    $.get(path, function (responseJson) {
        if (responseJson.length > 0) {
            var age = responseJson[0]["AGE"];
            var sex = responseJson[0]["SEX"];
            var name = responseJson[0]["FNAME"];
            var encounterid = responseJson[0]["ENCOUNTER"];
            localStorage.patname = name;
            localStorage.age = age;
            localStorage.sex = sex;
            localStorage.mrno = id;
            localStorage.label = lable;
            localStorage.encounterid = encounterid;
            location.href = 'dissecondscreen.html';
            localStorage.patapp = 1;


        } else {
            localStorage.patname = "";
            localStorage.age = "";
            localStorage.sex = "";
            alert('No Records Found');
        }
    });
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
    debugger;
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
            document.getElementById("displayforms").style.display = "none";
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

function fillspl(id) {
    debugger;
    document.getElementById("txt_" + id.getAttribute("name")).value = id.id;
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

                path = path + "/admin/ScheduleDivPopMobile.jsp?type=getavldates&webid=" + formid + '&mrno=' + localStorage.patmrno + '&locid=' + locid + '' + scrdata1 + '&patapp=1';
                $.get(path, function (responseText) {
                    debugger;

                    document.getElementById("displayforms").style.display = "none";
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

            document.getElementById("displayforms").style.display = "none";
            document.getElementById("displayappts").style.display = "block";
            $('#displayappts').html(responseText);
            localStorage.patapp = 1;
            document.getElementById("mydiv").style.display = "none";
            loadform();

        });
    }
}

function gotodoctors() {
    document.getElementById("displayforms").style.display = "block";
    document.getElementById("displayappts").style.display = "none";
    var sdata = document.getElementById("id_scrdata").value.split("@");
    for (var i = 1; i < sdata.length; i++) {
        document.getElementById(sdata[i]).value = "";
    }

}

function shafilspl(id) {
    debugger;
//                        if(id.parentNode.id=="spl"){
//                        localStorage.ipadrs = localStorage.appurl;
    var con = id.value.toUpperCase();

    var divdata = document.getElementById("div_" + id.id);
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