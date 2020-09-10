/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    loaddetails();
    loaddoctors();
    getlogindocid();
});
function getlogindocid(){
    $.get(localStorage.ipadrs + "/Approvemobresults.jsp?type=dtls&userid=" + localStorage.userid, function (responsejson) {
        localStorage.consdocid = responsejson.trim();
    });
}
function loaddetails() {
    $.get(localStorage.ipadrs + "/Approvemobresults.jsp?type=depts&userid=" + localStorage.userid, function (responsejson) {
        var dropdown = $('#ddlDepts');
        debugger;
        for (var i = 0; i < responsejson.length; i++) {
            var option = $('<option value=' + responsejson[i]['DEPTID'] + '>' + responsejson[i]['DEPTNM'] + '</option>');
            option.appendTo(dropdown);
        }
    });
}
function loaddoctors() {
    $.get(localStorage.ipadrs + "/Approvemobresults.jsp?type=doctors&userid=" + localStorage.userid, function (responsejson) {
        var dropdown = $('#ddldoctors');
        debugger;
        for (var i = 0; i < responsejson.length; i++) {
            var option = $('<option value=' + responsejson[i]['DOCID'] + '>' + responsejson[i]['DOCTORNM'] + '</option>');
            option.appendTo(dropdown);
        }
    });
}
function loadgrid() {
    $('#grid').trigger("reloadGrid");
}
function go()
{
    $('#grid').trigger("reloadGrid");
}
function  _exit() {
    location.href = 'dashboardmenu.html';
}
function settings() {
    location.href = 'settings.html';
}
function Forwarddoctor(thi) {
    var id1 = thi.id.split(",!");
    $("#reqid2").val(id1[1]);
    $("#testid2").val(id1[2]);
    $('#ddldoctors').val("0");
    $("#mydiv2").show();
}
function forwardresult(id)
{
    debugger;
    $('#divProcess').show();
    var testid1 = $("#testid2").val();
    var reqid1 = $("#reqid2").val();
    var docid1 = $('#ddldoctors').val();
    var fordocid = localStorage.consdocid;
     if(docid1=="0"){
      $('#lbmsg').show();
      $('#divProcess').hide();
      return;
    }
    var path = localStorage.ipadrs +"/ReqOrderforConsDoc?reqid1=" + reqid1 + "&testid1=" + testid1 + "&fordocid=" + fordocid + "&docid1=" + docid1 + "&saveFwd=1&usernm="+localStorage.usernm+"&userid="+localStorage.userid;
    $.get(path, function (response) {
        debugger;
        $('#divProcess').hide();
        var res = response;
        var r = res.split("$$");
        if (r[0] == "1")
        {   
            $("#mydiv2").hide();
            alert("This Test is Already Approved by " + r[1] + "");
            return;
        }
        else if (r[0] == "2")
        {
            $("#mydiv2").hide();
            alert("Record Saved Successfully");
            $("#mydoctor").hide();
            return;
        }
        else {
            $("#mydiv2").hide();
            alert(res);
        }
    });
}
function docselect(docid){
    if(docid=="0"){
        $('#lbmsg').show();
    }else{
        $('#lbmsg').hide();
    }
}
