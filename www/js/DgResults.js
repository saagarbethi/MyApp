/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('#mydiv').show();
    debugger;
    load();
})
function load() {
    var webformid = localStorage.dgformid;
    var schemeid = localStorage.dgschemeid;
    var testid = localStorage.dgtestid;
    var reqid = localStorage.dgreqid;
    var reqno = localStorage.dgreqno;
    var patnm = localStorage.dgpatnm;
    var testnm = localStorage.dgtestnm;
    var variables = "?testid=" + testid + "&keyid=" + reqid + "&formid=" + webformid + "&reqno=" + reqno + "&scheme=" + schemeid + "&patnm=" + encodeURIComponent(patnm) + "&testnm=" + encodeURIComponent(testnm);
    var path = localStorage.ipadrs + '/admin/DgReportResultsMobile.jsp' + variables;
    $.get(path, function (responseText) {
        $('#mydiv').hide();
        $('#divResults').html(responseText);
    });
}
function back() {
    location.href = 'DoctorApproval.html';
}
function approveResult(btn,next) {
    debugger;
    var approve = $(btn).html().trim();
    if(approve==="Approve"){
        approve = "0";
    }else{
         approve = "1";
    }
    if(next==="1"){
        approve = "0";
    }
    var reqid = localStorage.dgreqid;
    var testid = localStorage.dgtestid;
    var type = localStorage.dgtype;
    $.get(localStorage.ipadrs + "/ReqOrderforConsDoc?table=mobapprove&userid=" + localStorage.userid + "&username=" + localStorage.usernm + "&reqid=" + reqid + "&gtestid=" + testid + "&type=" + type+"&approve="+approve, function (responseText) {
        alert(responseText);
         if($(btn).html().trim()==="Approve"){
             $('#btnSave').html("UnApprove");
             $('#btnSaveNext').attr('disabled','disabled');
         }else{
             $('#btnSave').html("Approve");
             $('#btnSaveNext').removeAttr('disabled');
         }
         if(next==="1"){
             callnext();
         }
    });

}
function callnext() {
    debugger;
   document.getElementById('mydiv').style.display = 'block';
    var rnum = $('#hdnrnum').val();
    rnum = parseInt(rnum)+1;
    var path = localStorage.ipadrs + 'Approvemobresults.jsp?type=nextpending&userid=' + localStorage.userid + '&fromdt=' + localStorage.dgfromdt + '&todt=' + localStorage.dgtodt+'&rnum='+rnum;
    $.get(path, function (responseJson) {
        if (responseJson.length > 0) {
            $('#hdnrnum').val(rnum);
            localStorage.dgschemeid = responseJson[0]['SCHEMEID'];
            localStorage.dgtestid = responseJson[0]['TESTID'];
            localStorage.dgreqid = responseJson[0]['REQID'];
            localStorage.dgreqno = responseJson[0]['REQNO'];
            localStorage.dgpatnm = responseJson[0]['PATIENTNM'];
            localStorage.dgtestnm = responseJson[0]['TESTNM'];
            load();
        } else {
            alert('No Records Pending For Approval');
        }

    });
}

