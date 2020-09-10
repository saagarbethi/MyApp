/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    try {
        debugger;
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.currentformid;
        var locid = localStorage.locid;
        var userid = localStorage.userid;
        var docid = localStorage.docid;
        var docnm = localStorage.docnm;

        $.get(path + "/formViewDIS?webformid=" + currentformid + "&frompage=" + formid + "&mobile=yes&locid=" + locid + '&docid=' + docid + '&docname=' + docnm, function (responsetext) {
            $('#divDis').html(responsetext);
            $('#ddlLocation').val(localStorage.locid);
            loadalldetails('def');
        });
    } catch (err) {
        $('#mydiv').hide();
        // alert(err);
    }
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function loadalldetails(load) {
    var path = localStorage.ipadrs;
    document.getElementById("cubiclemsg").style.display="none";
    $('#mydiv').show();
    var formid = $('#hdnformid').val();
    var docid = $('#hdndocid').val();
    var locid = $('#ddlLocation').val();
    var root = $('#hdnpath').val();
    var dt = $('#txtdate').val();
    path = path + '/formViewDIS?type=fill&formid=' + formid + '&docid=' + docid + '&locid=' + locid + "&dt=" + dt + '&load=' + load + '&mobile=1';
    $.get(path, function (responseText) {
        try {
            var data = responseText.trim().split("$$");
            for (var i = 0; i < data.length - 1; ) {
                debugger;
                var table = data[i];
                $('#gview_' + data[i]).html(data[++i]);
                i = i + 1;
                var isdata = document.getElementById('tbl_' + table).textContent;
                if (isdata.trim() === "") {
                    document.getElementById('div' + table).style.display = 'none';
                } else {
                    document.getElementById('div' + table).style.display = 'table';
                }
             }
            $('#mydiv').hide();
        } catch (err) {
            $('#mydiv').hide();
            //alert(err);
        }
    });
}

function cnp() {
    debugger;
    var path = localStorage.ipadrs;
    var noofcubicals = document.getElementById('ddlCubicals').options.length;
    var cubicals = $('#ddlCubicals').val();
    var docid = $('#hdndocid').val();
    var locid = $('#ddlLocation').val();
    var formid = $('#hdnformid').val();

    if (parseInt(noofcubicals) > 1 && cubicals === "0") {
        alert('Please Select Cubicles');
        $('#ddlCubicals').focus();
        return;
    }
    path = path + '/formViewDIS?type=cnp&locid=' + locid + '&webformid=' + formid + '&cubical=' + cubicals + '&mobile=1&docid=' + docid;
    $.get(path, function (responseText) {
        debugger;
        if (responseText.indexOf("$") > 0) {
           
            var res = responseText.split("$");
           if (res[0] === "1") {
                document.getElementById("cubiclemsg").style.display="block";
             $('#lblmsg').html('Done MRNO:' + res[1]);
                  $('#txtSrchMrno').val(res[1]);
           } else {
//                $('#lblmsg').html(res[1]);
                   var path1=localStorage.ipadrs;
                 if(res[1]!="No Patients in this Location"){
                     document.getElementById("cubiclemsg").style.display="none";
                   var mr=res[1].replace("Please Close Mrno"," ").replace("<b>","").replace("</b>","").replace("First.","");
                 var re=res[1].replace("<b>","").replace("</b>","").replace("'","");
                if(confirm(""+re+" \n\Do you want to close this patient!")){
                  var path1 = path1 + '/formViewDIS?type=closeapprove&close=1&lable=&docid='+docid+'&mrno='+mr.trim()+'&formid='+ formid;
                    $.get(path1,function(responseText1){
                   if(responseText1=="1")
                    {
                        alert("Patient Closed");
                    }  
                    });
                }
                }
                else
                {
                    document.getElementById("cubiclemsg").style.display="block";
                 $('#lblmsg').html(res[1]);
                }
            }
        } else {
            alert(responseText);
        }
    })
}


function loadalldetailsbtn(load, lable) {
      
    $('#mydiv').show();
    var path = localStorage.ipadrs;
    var formid = $('#hdnformid').val();
    var docid = $('#hdndocid').val();
    var locid = $('#ddlLocation').val();
    var root = $('#hdnpath').val();
    var dt = $('#txtdate').val();
    path = path + '/formViewDIS?type=fill&formid=' + formid + '&docid=' + docid + '&locid=' + locid + "&dt=" + dt + '&load=' + load + '&lable=' + lable;
    $.get(path, function (responseText) {
        try {
            debugger;
            var data = responseText.trim().split("$$");
            for (var i = 0; i < data.length - 1; ) {
                $('#gview_' + lable.replace(" ", "_")).html(data[++i]);
                i = i + 1;
            }
            $('#mydiv').hide();
        } catch (err) {
            $('#mydiv').hide();
            //alert(err);
        }
    });
}
function bttonall(lable) {
    loadalldetailsbtn('all', lable)
}
function recallappoints(lable) {
    loadalldetailsbtn('rec', lable)
}
function displaydocuments() {

    var id = '#dialog';

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({
        'width': maskWidth,
        'height': maskHeight
    });

    //transition effect		
    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow", 0.8);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    // $(id).css('top',  winH/2-$(id).height()/2);
    //$(id).css('left', winW/2-$(id).width()/2);

    //transition effect
    $(id).fadeIn(2000);

    //if close button is clicked
    $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();

        $('#mask').hide();
        $('.window').hide();
    });

}
function getForm(path, title) {
    displaydocuments();
    path = '..' + path;
    $('#lblTitle').html(title);
    $('#divForm').load('../' + path);
}
function fillimage() {
    var img = $('#hdnimg').val();
    var srcpath = $('#hdnpath').val();
    var root = window.location.protocol + "//" + window.location.host + "/";
    var str2 = "";
    var str1 = "";
    if (img == "0")
    {
        document.getElementById("imgdoctor").src = "./" + srcpath + "/OP/Images/FemalePhoto.gif";

    }
    else if (img == "1")
    {
        str2 = ".png";
        str1 = $('#hdndocid').val();
        n = str1.concat(str2);
        path = root + "/MRPhotos/" + n;
        document.getElementById("imgdoctor").src = path;
    } else {
        str2 = ".jpg";
        str1 = $('#hdndocid').val();
        n = str1.concat(str2);
        path = root + "/doctorsigns/" + n;
        document.getElementById("imgdoctor").src = path;
    }
}
function logout() {
    localStorage.formid = localStorage.menuform;
    location.href = 'dashboardmenubuttons.html';
}
function settings() {
    location.href = 'settings.html';
}
function gotonxtpage(){
    debugger;
    var txtSrchMrno=$('#txtSrchMrno').val();
    nextPage(txtSrchMrno,'','');
}
function nextPage(id, row, label) {
    debugger;
    $('#hdnepid').val(id);
    $('#hdneplable').val(label);
    id = id.replace(/_/g, ' ');
    localStorage.ordermrno=id;
    label = label.replace(/_/g, ' ');
    try{
    var patnm = document.getElementById('div' + id).textContent;}
catch(e){
    
}
 if (id === '') {
        alert('No Key_Id Value');
        return;
    } else {
          GetEpisode(id, label);  
        // getPatdetails(patnm, id, label);
        }

 }
function newEpisode() {
    $('#txtEpisode').show();
    $('#ddlEpisode').hide();
}
function  GetEpisode(id, lable) {
    debugger;
    document.getElementById("txtSrchMrno").value = id;
    var patnm = "";

    try {
        patnm = document.getElementById('div' + id).innerHTML;
    } catch (err) {
        patnm = "";
    }

    var path = localStorage.ipadrs + '/formViewDIS?type=getepisodes&mobile=yes&mrno=' + id;
    $.get(path, function (responseJson) {
        var res=responseJson;
        if(res.indexOf("$$")>0){
            alert("Please Enter Valid Mrno");
            return;
        }
        else{
        if (responseJson.length > 0) {
            document.getElementById('rdbExistingEpisode').checked = true;
//            episode(id);
//            displaymsg(id, row, lable);
            debugger;
//            $('#tblPatEpisodes tr:gt(0)').remove();
//            var table = $('#tblPatEpisodes');
            if ( responseJson.length>0) {
                var caseid = responseJson[0]["CASEID"];
                var episodeid = responseJson[0]["EPISODEID"];
                var episodeno = responseJson[0]["EPISODENO"];
                  var docid=localStorage.docid ;
                //patnm = patnm.replace(/&nbsp;/g,'&nbsp;');
                lable = lable.replace(/&nbsp;/g, '&nbsp;');
                createepisodes(caseid,episodeid,episodeno)
                //var row = $('<tr class="episoderow" onclick=selectepisode("'+id+'","'+row+'","'+caseid+'","'+episodeid+'","'+episodeno+'")><td>'+responseJson[i]["CASENM"]+'</td><td>'+responseJson[i]["EPISODEDATE"]+'</td><td style="display:none">'+responseJson[i]["CASEID"]+'</td><td style="display:none">'+responseJson[i]["EPISODEID"]+'</td><td style="display:none">'+responseJson[i]["EPISODENO"]+'</td></tr>')
                // var row = $('<tr class="encounter("'+caseid+'","'+episodeid+'","'+episodeno+'","'+id+'","'+docid+'") episoderow createSessions1("","'+id+'","IndoorPatient","'+caseid+'","'+episodeid+'","'+episodeno+'")" onclick=getpatdata()--createSessions("","'+id+'","IndoorPatient")=createSessions("","'+id+'","'+lable+'","'+caseid+'","'+episodeid+'","'+episodeno+'")><td>'+responseJson[i]["CASENM"]+'</td><td>'+responseJson[i]["EPISODEDATE"]+'</td><td style="display:none">'+responseJson[i]["CASEID"]+'</td><td style="display:none">'+responseJson[i]["EPISODEID"]+'</td><td style="display:none">'+responseJson[i]["EPISODENO"]+'</td></tr>')
//                var row = $('<tr class="episoderow" onclick= createepisodes("'+caseid+'","'+episodeid+'","'+episodeno+'")><td>' + responseJson[i]["CASENM"] + '</td><td>' + responseJson[i]["EPISODEDATE"] + '</td><td style="display:none">' + responseJson[i]["CASEID"] + '</td><td style="display:none">' + responseJson[i]["EPISODEID"] + '</td><td style="display:none">' + responseJson[i]["EPISODENO"] + '</td><td align="right" style="width:30px;"><button class="btn btn-primary" style="padding:2px 4px;">Go</button></td></tr>')
//                row.appendTo(table);
//                $('#btnepisodego').hide();
//                document.getElementById("rdbExistingEpisode").checked = true;
            }
//            episode(id);
//            checkrdbdisable(id);
        }
//        else {
//            document.getElementById('rdbNewEpisode').checked = true;
//            $('#tblPatEpisodes tr:gt(0)').remove();
//            episode(id);
//            displaymsg(id, row, lable);
//        }
    }


    });

}
function createepisodes(caseid,episodeid,episodeno){
    localStorage.caseid = caseid;
    localStorage.episodeid = episodeid;
    localStorage.episodeno = episodeno;
    getpatdata();
}

function checksameepisode(id){
    debugger;
                var mrno=localStorage.ordermrno;
                var episode=document.getElementById("ddlEpisode").value;
                $.get(localStorage.ipadrs+'/formViewDIS?type=sameepisodes&mrno='+mrno+'&episode='+episode,function(responcejson){
                    if(responcejson!=""){
                        if(responcejson=="true"){
                            alert("This Episode Is Already Selected Today");
                            $('.ui-dialog-buttonpane button:contains("Go")').button().hide();
                            return;
                        }
                        else{
                            $('.ui-dialog-buttonpane button:contains("Go")').button().show();
                        }
                    }
            });
                
            }
function displaymsg(id, row, lable) {
    debugger;
    $("#myModal").hide();
    $("#divEpisode").show();
//    $("#divEpisode").dialog({
//        resizable: false,
//        height: 'auto',
//        width: '80%',
//        left: '10px',
//        modal: true,
//        buttons: {
//            "Cancel": function () {
//                $(this).dialog("close");
//                //                                empty();
//            },
//            "Go": function () {
//                saveEpisode(id, row, lable);
//            }
//
//        }
//
//    });
    document.getElementById("txtSrchMrno").focus();
}
function episodeGo(){
   var id =  $('#hdnepid').val();
   var lable =  $('#hdneplable').val();
    saveEpisode(id, "", lable);
}
function closeepisode(){
     $("#divEpisode").hide();
//     $("#myModal").show();
}
function saveEpisode(id, row, lable) {
    debugger;
    id = id.replace(/_/g, ' ');
    lable = lable.replace("tbl", "").replace(/_/g, ' ');
    var patnm = localStorage.patname;
    if (id == '') {
        alert('No Key_Id Value');
        return;
    }
    var caseid = "";
    var casenm = document.getElementById('txtEpisode').value;
    if (casenm == "") {
        caseid = $('#ddlEpisode').val();
        if (caseid == "-Select-") {
            alert('Please Select Episode');
            return;
        }
    }
    casenm = encodeURIComponent(casenm);
    
     var mrno=id;
                var episode1=document.getElementById("ddlEpisode").value;
                 $.get(localStorage.ipadrs+'/formViewDIS?type=sameepisodes&mrno='+mrno+'&episode='+episode1,function(responcejson){
                    if(responcejson!=""){
                        if(responcejson=="true"){
                            alert("This EPisode Is Already Selected today");
                            $('.ui-dialog-buttonpane button:contains("Go")').button().hide();
                            return;
                        }
                        else{
                            $('.ui-dialog-buttonpane button:contains("Go")').button().show();
                            var path = localStorage.ipadrs + '/formViewDIS?type=episode&mobile=yes&casenm=' + casenm + '&caseid=' + caseid + '&mrno=' + id;
    $.get(path, function (responseText) {
        if (responseText.trim() != "") {
            var data = responseText.split(",");
            var caseid = data[0];
            var episodeid = data[1];
            var episodeno = data[2];
            localStorage.caseid = caseid;
            localStorage.episodeid = episodeid;
            localStorage.episodeno = episodeno;
            
            //                        $('<option></option>').val(caseid).html($('#txtEpisode').val());
            getpatdata();
            //   createSessions(patnm,id,lable,caseid,episodeid,episodeno);
        } else {

            getpatdata();
        }
        

//                createSessions("", id, lable)

        //   createSessions(patnm,id,lable,caseid,episodeid,episodeno);
    });
                        }
                    }
                });
    

}
function createSessions1(patnm, id, lable, caseid, episodeid, episodeno) {
    debugger;

    var docid = localStorage.docid;
    var docnm = localStorage.docnm;
    var speid = localStorage.speid;
    var date = localStorage.fromdt;
    var webformid = localStorage.formid;
    var prewebformid = localStorage.currentformid;
    var locid = localStorage.locid;
    var ipno = localStorage.ipno;
    var userid = localStorage.userid;


    location.href = localStorage.ipadrs + '/Dis/dissessions.jsp?type=session&mobile=yes&userid=' + userid + '&mrnum=' + id + '&patnm=' + patnm + '&docid=' + docid + '&docnm=' + docnm + '&speid=' + speid + '&webformid=' + webformid + '&date=' + date + '&locid=' + locid + '&lable=' + lable + '&prewebformid=' + prewebformid + '&caseid=' + caseid + '&episodeid=' + episodeid + '&episodeno=' + episodeno;

}
function episode(id) {
    debugger;
    document.getElementById("txtSrchMrno").value = id;
    if (document.getElementById('rdbExistingEpisode').checked == true) {
        $('#trExistingCase').show();
        $('#trNewCase').hide();

        $('#btnepisodego').hide();
    } else if (document.getElementById('rdbNewEpisode').checked == true) {
        $('#trExistingCase').hide();
        $('#trNewCase').show();
        $('#btnepisodego').show();
        getCasedtls(id);
    }
}

function getCasedtls(id) {
    var ddlcases = $('#ddlEpisode');
    var path = localStorage.ipadrs + '/formViewDIS?type=getepisodesdata&mobile=yes&mrno=' + id;
    $.get(path, function (responseJson) {
        if (responseJson.length > 0) {
            debugger;
            $('#ddlEpisode').empty();
            for (var i = 0; i < responseJson.length; i++) {
                var option = $("<option value=" + responseJson[i]['CASEID'] + ">" + responseJson[i]['CASENM'] + "</option>");
                option.appendTo(ddlcases);
            }
        }
    });
}

function checkrdbdisable(mrno) {
    debugger;
    var docid = localStorage.docid;
    var path = localStorage.ipadrs + '/DisTemplateView?type=chkrdbdisable&mobile=yes&mrno=' + mrno + '&docid=' + docid;
    $.get(path, function (responseJson) {
        debugger;
        if (responseJson != "") {
            if (responseJson == "TRUE") {
                //                            alert(responseJson);
                document.getElementById("rdbNewEpisode").disabled = true;
            }
            else {
                document.getElementById("rdbNewEpisode").disabled = false;
            }
        }
    });
}
function getpatdata() {
    debugger;
    var id = $('#hdnepid').val();
    getPatdetails("", id, "");
}
function getPatdetails(patnm, id, lable) {
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
            getWebformid();

        } else {
            localStorage.patname = "";
            localStorage.age = "";
            localStorage.sex = "";
            alert('No Records Found');
        }
    });
}
function getWebformid( ) {
    
    debugger;
    var path = localStorage.ipadrs + '/DisDetails?docid='+localStorage.docid+'&mrnum='+localStorage.mrno+'&webformid=' + localStorage.currentformid + '&type=webformid';
    $.get(path, function (responseJson) {
        debugger;
        var encounterid="",encountid="";
        var data=responseJson.split("|");
        encounterid=data[1]; 
        localStorage.disfirstscreen = localStorage.formid;
        localStorage.formid        = localStorage.currentformid;
        localStorage.currentformid = data[0];
        localStorage.encountid   = encounterid;
        localStorage.patapp = 0;
        location.href = 'dissecondscreen.html';
    });
}
function createSessions(patnm, id, lable) {
    debugger;
    var docid = localStorage.docid;
    var docnm = localStorage.docnm;
    var speid = localStorage.speid;
    var date = localStorage.fromdt;
    var webformid = localStorage.formid;
    var locid = localStorage.currentformid;

    $('#mydiv').show();
    var path = localStorage.ipadrs + "/admin/TemplateDisSecondMobile.jsp?docid=" + docid + "&date2=" + date + "&docname=" + docnm;
    path = path + "&webformid=" + webformid + "&locid=" + locid + "&prewebformid=" + localStorage.formid + "&lable=" + lable;
    path = path + "&visitid=" + id + "&theme=&speid=" + speid + "&patnm=" + localStorage.patname + "&patage=" + localStorage.age;
    path = path + "&patsex=" + localStorage.sex + "&docnm=" + localStorage.docnm;
    //admin/TemplateDisSecond.jsp?docid=" + docid + "&date2=" + date + "&docname=" + docnm + "&webformid=" + webformid + "&locid=" + locid + "&prewebformid=" + prewebformid+"&lable="+lable+"&visitid="+id+"&theme="+theme+"&speid="+speid
    $.get(path, function (responseText) {
        try {
            debugger;

            $('#mydiv').hide();
        } catch (err) {
            $('#mydiv').hide();
            alert(err);
        }
    });

}
