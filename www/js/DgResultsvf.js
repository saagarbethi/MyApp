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
    debugger;
    var webformid = localStorage.dgformid;
    var schemeid = localStorage.dgschemeid;
    var testid = localStorage.dgtestid;
    var reqid = localStorage.dgreqid;
    var reqno = localStorage.dgreqno;
    var  locreqno= localStorage.dglocreqno;
    var patnm = localStorage.dgpatnm;
    var testnm = localStorage.dgtestnm;
    var variables = "?testid=" + testid + "&keyid=" + reqid + "&formid=" + webformid + "&locreqno=" + locreqno + "&reqno=" + reqno + "&scheme=" + schemeid + "&patnm=" + encodeURIComponent(patnm) + "&testnm=" + encodeURIComponent(testnm);
    var path = localStorage.ipadrs + '/admin/DgReportResultsMobilevf.jsp' + variables;
    $.get(path, function (responseText) {
        debugger;
        $('#mydiv').hide();
        $('#divResults').html(responseText);
    });
}
function back() {
    localStorage.filterback="1";
    location.href = 'DoctorApprovalvf.html';
}
function approveResult(btn,next) {
    debugger;
    var terminal=localStorage.terminal;
    var approve = $(btn).html().trim();//"approve"
    var check=0;
    if(approve==="Approve"){
        approve = "0";
        check = "1";
    }else{
         approve = "1";
         check = "0";
    }
    if(next==="1"){
        approve = "0";
       check = "1";
    }
    var reqno=localStorage.dgreqno;
    var reqid = localStorage.dgreqid;
    var testid = localStorage.dgtestid;
    var type = localStorage.dgtype;
    var webformid=    localStorage.menubuttonformid ;
     var docid=    localStorage.seldocid ;
      var docnm=    localStorage.seldocnm ;
        if(docid=='null'||docid=='0'||docid=='undefined'){
                alert('Assign Doctor to User!!');
                 return;
            }
    //   var url = "../ApproveResutlsviewvf";
     //       url += "?reqid=" + reqid + "&webformid=" + hdnformid + "&testid=" + testid + "&docnm=" + docnm + "&docid=" + docid + "&table1=reqsave&check=" + checked + '&type=' + type + '&reqno=' + reqno;
    $.get(localStorage.ipadrs + "/ApproveResutlsviewvf?table1=reqsave&mobile=1&terminal=" + terminal + "&reqid=" + reqid + "&webformid=" + webformid + "&testid=" + testid + "&docnm=" + docnm + "&docid=" + docid + "&check=" + check + "&type="+ type + "&reqno="+ reqno+"&locid="+localStorage.locid + "&userid=" + localStorage.userid + "&username=" + localStorage.usernm, function (responseText) {
       // alert(responseText);
        debugger;
        var res =responseText;
        if(res.length>0){
         
         if($(btn).html().trim()==="Approve" && res.trim()=="1") {
             $('#btnSave').html("UnApprove");
             $('#btnSaveNext').attr('disabled','disabled');
         }else if($(btn).html().trim()==="UnApprove" && res.trim()=="0") {
             $('#btnSave').html("Approve");
             $('#btnSaveNext').removeAttr('disabled');
         }
         else if($(btn).html().trim()==="Approve" && res.trim()=="-3") {
             $('#btnSave').html("Approve");
             $('#btnSaveNext').removeAttr('disabled');
             alert("Please Check The Update Query In Master Form")
         }
          else if($(btn).html().trim()==="UnApprove" && res.trim()=="-2") {
             $('#btnSave').html("UnApprove");
             $('#btnSaveNext').attr('disabled','disabled');
             alert("This Test Has Been Already Approved By Another User ,Please UnApprove The Test With Same User Or Please Check The Update Query In Master Form")
         }if(next==="1"){
             callnext();
         }
        }
    });

}
function callnext() {
    debugger;
   document.getElementById('mydiv').style.display = 'block';
    var rnum = $('#hdnrnum').val();
    rnum = parseInt(rnum)+1;
   var  webformid=localStorage.menubuttonformid ;
   var selotherid=  encodeURIComponent(localStorage.selotherid);
   var seldeptid=encodeURIComponent(localStorage.seldeptid);
   var locid=localStorage.locid;
   var userid=localStorage.userid;
 
//   var path = localStorage.ipadrs + 'Approvemobresultsvf.jsp?type=nextpending&selotherid='+selotherid+'&seldeptid='+seldeptid+'&webformid='+webformid+'&userid=' +userid+'&locid='+locid+'&fromdt=' + localStorage.dgfromdt + '&todt=' + localStorage.dgtodt+'&rnum='+rnum;
    var path = localStorage.ipadrs + 'Approvemobresultsvf.jsp?type=nextpending&webformid='+webformid+'&selotherid='+selotherid+'&seldeptid='+seldeptid+'&locid='+locid+'&userid='+userid+'&fromdt=' + localStorage.dgfromdt+'&todt=' + localStorage.dgtodt+'&rnum='+rnum;
    $.get(path, function (responseJson) {
        debugger;
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
             $('#mydiv').hide();
        }

    });
}

