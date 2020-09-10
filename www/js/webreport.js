/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//generalparameterMobile.jsp		1
//singleparameterMobile.jsp		2
//doubleparameterMobile.jsp		3
//userinputparameterMobile.jsp  	5




$(document).ready(function () {
    ///ShivamHMSWebApplication/generalparameter.jsp?id=Login%20User%20Collection&rid=184&ptype=1&theme=blue
    debugger;
     try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    $('#mydiv').show();
    var paramtype = localStorage.paramtype;
    var reportid = localStorage.reportid;
    var reportnm = localStorage.reportnm;
    var usernm = localStorage.usernm;
    var userid = localStorage.userid;
    var locid = localStorage.locid;
    var path = "";
    if (paramtype === "1") {
        path = localStorage.ipadrs + "/generalparameterMobile.jsp?id=" + reportnm + "&rid=" + reportid + "&ptype=" + paramtype + "&userid=" + userid + "&usernm=" + usernm + "&locid=" + locid;
    } else if (paramtype === "2") {
        path = localStorage.ipadrs + "/singleparameterMobile.jsp?id=" + reportnm + "&rid=" + reportid + "&ptype=" + paramtype + "&userid=" + userid + "&usernm=" + usernm + "&locid=" + locid;
    }
    else if (paramtype === "3") {
        path = localStorage.ipadrs + "/doubleparameterMobile.jsp?id=" + reportnm + "&rid=" + reportid + "&ptype=" + paramtype + "&userid=" + userid + "&usernm=" + usernm + "&locid=" + locid;
    }
    else if (paramtype === "5") {
        path = localStorage.ipadrs + "/userinputparameterMobile.jsp?id=" + reportnm + "&rid=" + reportid + "&ptype=" + paramtype + "&userid=" + userid + "&usernm=" + usernm + "&locid=" + locid;
    }
    $.get(path, function (responseText) {
        $('#mydiv').hide();
        $('#divData').html(responseText);
        chk();
//        $("#txtFrom").datepicker({
//            changeMonth: true,
//            changeYear: true,
//            yearRange: '1900:2020'
//        });
//        $("#txtTo").datepicker({
//            changeMonth: true,
//            changeYear: true,
//            yearRange: '1900:2020'
//        });
//        $(document).ready(function () {
//            try
//
//            {
//                $('#txtFromTime').timepicker(
//                        {
//                            'step': '1',
//                            'minTime': '1:00',
//                            'maxTime': '24:00',
//                            'timeFormat': 'H:i:s '
//                        }
//                );
//
//                $('#myTimepicker').on('changeTime', function () {
//                    $('#mySpan').text($(this).val());
//                });
//            }
//            catch (err)
//            {
//                alert(err);
//            }
//        });
//        $(document).ready(function () {
//            debugger;
//            try {
//                $('#txtToTime').timepicker(
//                        {
//                            'step': '1',
//                            'minTime': '1:00',
//                            'maxTime': '24:00',
//                            'timeFormat': 'H:i:s '
//                        }
//                );
//
//                $('#myTimepicker').on('changeTime', function () {
//                    $('#mySpan').text($(this).val());
//                });
//            }
//            catch (err)
//            {
//                alert(err);
//            }
//
//        });
    });

});
function check() {
    show();
}
function show() {

    debugger;
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    $('#mydiv').show();
    var type = document.getElementById("typevalue").value;
    var reportid = localStorage.reportid;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    var locid = "", locnm = "";
//    var checkbox = document.getElementById("phoneLabelAU");
//    var l = checkbox.childElementCount / 2;
    $('#locations input[type=checkbox]').each(function () {
        if (this.checked) {
            locid += $(this).val() + ",";
            locnm += $(this).attr('title') + ",";
        }
    });
    locid = locid.replace(/,$/, '');
    if (locid === "")
    {
         $('#mydiv').hide();
        alert("please select location");
        return;
    }
    var chkmsexcel;
    if (document.getElementById('chkPdf').checked === true)
    {
        chkmsexcel = 0;
    } else if (document.getElementById('chkMsexcel').checked === true)
    {
        chkmsexcel = 1;
    } else {
        chkmsexcel = 2;
    }
    var txtDesc = document.getElementById('txtDesc').textContent;
    txtDesc = encodeURIComponent(txtDesc);
    var txtVerify = document.getElementById('txtVerify').textContent;
    txtVerify = encodeURIComponent(txtVerify);
    var fromtm = document.getElementById('txtFromTime').value;
    var totm = document.getElementById('txtToTime').value;
    var fromrange = document.getElementById('txtfrange').value;
    var torange = document.getElementById('txttrange').value;
    var userid = localStorage.userid;
    var usernm = localStorage.usernm;
    var loginlocid = localStorage.locid;
   
    var path = localStorage.ipadrs + 'globalreport?desc=' + txtDesc + '&varify=' + txtVerify +
            '&type=' + type + '&fromdt=' + fromdt + '&todt=' + todt + '&locid=' + locid + '&reportid='
            + reportid + "&locnm=" + locnm + '&chkmsexcel=' + chkmsexcel + '&fromtm=' + fromtm +
            '&totm=' + totm + '&fromrange=' + fromrange + '&torange=' + torange + '&spval=&userid=' + userid + '&usernm=' + usernm + '&loginlocid=' + loginlocid + '&mnewflg=1&mobile=1';
    $.get(path, function (responseText) {
	debugger;
        if (responseText.indexOf("error") < 0) {
	         if (responseText.indexOf("|") < 0) {
		     	   var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewerzoom.jsp?mrno=" + responseText;
            localStorage.pdfpath = pdfpath;
            $('#mydiv').hide();
            location.href = 'globalreport.html';
             
	}else{
	     localStorage.mnewflg="1";  
	     var res =responseText.split("|");
             $('#mydiv').hide();
	     var data = 'noofpages='+res[1]+'&filenm='+res[0];
            location.href = 'globalreport.html?'+data;
	}
        } else {
            localStorage.error = responseText;
             location.href = 'reporterror.html';
        }
    });




}
function load_home(filename) {
    var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewer.jsp?mrno=" + filename;
    document.getElementById("divpdf").innerHTML = '<object class="mob" type="text/html" data="' + pdfpath + '" style="width:100%;" ></object>';
}
function  allsele()
{
    debugger;
    if (document.getElementById("chkAll").checked === true)
    {
        var checkbox = document.getElementById("phoneLabelAU");
        var l = checkbox.childElementCount / 2;
        for (var i = 0; i < l; i++)
        {
            document.getElementById("chkloc" + i).checked = true;
        }
    }
    else
    {
        var checkbox = document.getElementById("phoneLabelAU");
        var l = checkbox.childElementCount / 2;
        for (var i = 0; i < l; i++)
        {

            document.getElementById("chkloc" + i).checked = false;

        }
    }
}
function chk()
{
    debugger;
    try{
       if($("#tmdect").val()==="1"){
            $(".coldtleft").css("width","100%");
        }
    }
    catch(ee){
        
    }
    var glocid = localStorage.locid;
    var datetype = $('#hdndatetype').val();
    var locid='',locnm='';
    $('#locations input[type=checkbox]').each(function () {
        
            locid = $(this).val() ;            
            if(locid===glocid){
                $(this).attr('checked','checked');
                return;
            }
    });
    if (datetype === '1')
    {

    }
    else if (datetype === '2')
    {
        document.getElementById('txtTo').style.visibility = "hidden";
        document.getElementById('tdtdt').style.visibility = "hidden";

    }
    else
    {
        document.getElementById('trdate').style.visibility = "hidden";

    }
}
function fundatechangeyest() {
    document.getElementById("txtFrom").value = $('#hdnyesterday').val();
    document.getElementById("txtTo").value = $('#hdnyesterday').val();

}

function check() {
    debugger;
    var exceloption = $('#hdnexcelpwd').val();//adminoptions
    var exceldownload = $('#hdnexceldownload').val();//createusers
    if (document.getElementById('chkPdf').checked === true)
    {
        show();
    }
    else
    {

        if (exceloption == "1") {
            if (exceldownload == "true") {
                csave();
            } else {
                alert("You need permission to download the report");
                return;
            }
        }
        else {
            show();
        }
    }
}
function allsel1(id) {
    $('#locations input[type=checkbox]').each(function () {
        if (id.checked) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });

}
function allSingleSel(id) {
    $('#singleparams input[type=checkbox]').each(function () {
        if (id.checked) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });

}
function allDoubleSel(id) {
    $('#doubleparams input[type=checkbox]').each(function () {
        if (id.checked) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });

}
function csave() {
    document.getElementById("mydiv1").style.display = 'block';
    document.getElementById("txtpwd").focus();
}
function cancelpwd() {
    document.getElementById("mydiv1").style.display = 'none';
}


function fundatechangemonth() {
    debugger;
    var lastmonth = $('#hdnlastmonth').val();


    document.getElementById("txtFrom").value = '01/' + lastmonth;
    document.getElementById("txtTo").value = $('#hdndaysinmonth').val() + "/" + $('#hdnlastmonth').val();

}
function fundatechangeyear() {
    var years = $('#hdnyears').val();
    document.getElementById("txtFrom").value = '01/01/' + years;
    document.getElementById("txtTo").value = '31/12/' + years;

}
function fundatechangetill() {
    var tilldate = $('#hdntilldate').val();
    var dd = $('#hdndd').val();
    document.getElementById("txtFrom").value = '01/' + tilldate;
    document.getElementById("txtTo").value = dd;

}
function createmultideptview()
{
    //multi dept
    debugger;

    if (document.getElementById("rdbmulti").checked === true)
    {
        var deptid = "", deptnm = "";
        debugger;
        var tb = document.getElementById('tbcheckbox');
        $('#singleparams input[type=checkbox]').each(function () {
            if (this.checked) {
                deptid += $(this).val() + ",";
                deptnm += $(this).attr('title') + ",";
            }
        });
        deptid = deptid.substr(0, deptid.length - 1);
        deptid = deptid.replace(/[,]/g, "','");
        if (deptid === "")
        {
            alert("please select Department");
            return;
        }
        else
        {

            debugger;
            subdeptview1(deptid);
        }
    }
    else
    {
        var id = document.getElementById('txtSingle').name;
        subdeptview1(id);
    }
}
function subdeptview1(id)
{
    debugger;
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    $('#mydiv').show();
    var usernm = localStorage.usernm;
    var userid = localStorage.userid;
    var loginlocid = localStorage.locid;
    var strqry = $('#hdnstrqry').val();
    debugger;
    var qry = strqry.split(":");
    var col = qry[0];
    var collst = col.split(",");
    var sqry = strqry.toUpperCase().split('WHERE');
    var strnames = "";
    debugger;
    if (document.getElementById("chkParamAll").checked === true) {
        strqry = "select " + collst[1] + " From " + qry[1];
        strnames = "" + collst[0] + " From " + qry[1];
    }
    else {
        if (sqry.length > 1)
        {
            strqry = "select " + collst[1] + " From " + qry[1] + " and " + collst[1] + " in ('" + id + "') ";
            strnames = "" + collst[0] + " From " + qry[1] + " and " + collst[1] + " in ('" + id + "') ";
        }
        else
        {
            strqry = "select " + collst[1] + " From " + qry[1] + "  Where   " + collst[1] + " in ('" + id + "') ";
            strnames = "" + collst[0] + " From " + qry[1] + "  Where   " + collst[1] + " in ('" + id + "') ";
        }
    }
     var sdeptid=localStorage.sdeptid ;
     var deptid= localStorage.deptid;
    var url = localStorage.ipadrs + "globalreport";
    url += "?Createsubdeptview=SubDeptView&view_qry=" + strqry + '&sdeptid='+sdeptid+'&deptid='+deptid+'&strnames=' + strnames + '&fromdt=' + $('#txtFrom').val() + '&todt=' + $('#txtTo').val() + '&userid=' + userid + '&usernm=' + usernm + '&loginlocid=' + loginlocid + '&mobile=1';

    $.ajax({
        type: 'POST',
        url: url,
        traditional: true,
        async: false, //this property block popups
        success: function () {
            showsingle();

        }
    });
    //        });
}
function logout() {
     localStorage.repback='1';
    location.href = 'dashboardmenubuttons.html';
   
}

function showsingle() {

    debugger;

    var type = document.getElementById("typevalue").value;
    var reportid = localStorage.reportid;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    var locid = "", locnm = "";

    var checkbox = document.getElementById("phoneLabelAU");
    var l = checkbox.childElementCount / 2;
//    for (var i = 0; i < l; i++) {
//        if (document.getElementById("chkloc" + i).checked === true) {
//            locid += document.getElementById("chkloc" + i).value + ",";
//            locnm += document.getElementById("chkloc" + i).title + ",";
//        }
//    }
    $('#locations input[type=checkbox]').each(function () {
        if (this.checked) {
            locid += $(this).val() + ",";
            locnm += $(this).attr('title') + ",";
        }
    });
    locid = locid.replace(/,$/, '');
    if (locid === "")
    {
         $('#mydiv').hide();
        alert("please select location");
        return;
    }
    //multi dept
    if (document.getElementById("rdbmulti").checked === true)
    {
        var deptid = "", deptnm = "";
        var tb = document.getElementById('tbcheckbox');
         $('#singleparams input[type=checkbox]').each(function () {
            if (this.checked) {
                deptid += $(this).val() + ",";
                deptnm += $(this).attr('title') + ",";
            }
        });
        debugger;
        deptid = deptid.replace(/,$/, '');
        if (deptid === "")
        {
             $('#mydiv').hide();
            var msg = $('#hdnparamter').val().toString().toUpperCase();
            alert('Please Select ' + msg);
            //alert("please select Department");
            return;
        }
        var sname1 = "All Doctorwise Coll";
        document.getElementById('txtSingle').value = "";
        //                    var sval=deptnm;
    }

    else if (document.getElementById("chkParamAll").checked === true && document.getElementById("rdbmulti").checked === false)
    {
        var deptid = "", deptnm = "";
        var tb = document.getElementById('tbcheckbox');
        var chk = tb.getElementsByTagName('input');
        var checkbox = document.getElementById("phoneLabelAU_dept");
        var l = checkbox.childElementCount / 2;
        l = chk.length;
        for (var i = 0; i < l; i++) {
            if (document.getElementById("chkdept" + i).checked === true) {
                deptid += document.getElementById("chkdept" + i).value + ",";
                deptnm += document.getElementById("chkdept" + i).title + ",";
            }
        }
        deptid = deptid.replace(/,$/, '');
        if (deptid === "")
        {
             $('#mydiv').hide();
            var msg = $('#hdnparamter').val().toString().toUpperCase();
            alert('Please Select ' + msg);
            //alert("please select Department");
            return;
        }
        var sname1 = "All Doctorwise Coll";
        document.getElementById('txtSingle').value = "";
        //                    var sval=deptnm;
    }
    debugger;
    var sval = document.getElementById('txtSingle').value;
    if (sval != "")
    {
        sval = sval;
    }
    else
    {
        sval = deptnm;
    }
    var chkparamall;
    if (document.getElementById("chkParamAll").checked === true) {
        chkparamall = 0;
        var sname = "All SubDepartments";

    }
    else if ((document.getElementById("chkParamAll").checked === false) && (document.getElementById("rdbmulti").checked === false))
    {
        chkparamall = 1;
        if (document.getElementById('txtSingle').value === "") {
            var msg = $('#hdnparamter').val().toString().toUpperCase();
             $('#mydiv').hide();
            alert('Please Select ' + msg);
            return;
        }

    }
    var chkmsexcel;
    if (document.getElementById('chkMsexcel').checked === true)
    {
        chkmsexcel = 1;
    }
    else
    {
        chkmsexcel = 0;
    }

    debugger;
    var usernm = localStorage.usernm;
    var userid = localStorage.userid;
    var loginlocid = localStorage.locid;
    var sid = document.getElementById('txtSingle').name;
    var subdeptname = document.getElementById('txtsubdepts').innerHTML;
    var txtDesc = document.getElementById('txtDesc').textContent;
    txtDesc = encodeURIComponent(txtDesc);
    var txtVerify = document.getElementById('txtVerify').textContent;
    txtVerify = encodeURIComponent(txtVerify);
    var fromtm = document.getElementById('txtFromTime').value;
    var totm = document.getElementById('txtToTime').value;
    var path = localStorage.ipadrs + 'globalreport?desc=' + txtDesc + '&subdeptname=' + subdeptname + '&varify=' + txtVerify + '&type=' + type + '&sname=' + sname + '&sname1=' + sname1 + '&fromdt=' + fromdt + '&todt=' + todt + '&locid=' + locid + '&reportid=' + reportid + '&locnm=' + locnm + '&spid=' + sid + '&chkparamall=' + chkparamall + '&chkmsexcel=' + chkmsexcel + '&fromtm=' + fromtm + '&totm=' + totm + '&userid=' + userid + '&usernm=' + usernm + '&loginlocid=' + loginlocid + '&mnewflg=1&mobile=1';
    //window.open('globalreport?desc=' + txtDesc + '&subdeptname=' + subdeptname + '&varify=' + txtVerify + '&type=' + type + '&sname=' + sname + '&sname1=' + sname1 + '&fromdt=' + fromdt + '&todt=' + todt + '&locid=' + locid + '&reportid=' + reportid + '&locnm=' + locnm + '&spid=' + sid + '&chkparamall=' + chkparamall + '&chkmsexcel=' + chkmsexcel + '&fromtm=' + fromtm + '&totm=' + totm, '_blank', '');
    $.get(path, function (responseText) {
        if (responseText.indexOf("error") < 0) {
//            var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewer.jsp?mrno=" + responseText;
//            localStorage.pdfpath = pdfpath;
//            $('#mydiv').hide();
//	        location.href = 'globalreport.html';
       if (responseText.indexOf("|") < 0) {//for old build
		     	   var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewerzoom.jsp?mrno=" + responseText;
            localStorage.pdfpath = pdfpath;
            $('#mydiv').hide();
            location.href = 'globalreport.html';
             
	}else{//for new build
	     localStorage.mnewflg="1";  
	     var res =responseText.split("|");
             $('#mydiv').hide();
	     var data = 'noofpages='+res[1]+'&filenm='+res[0];
            location.href = 'globalreport.html?'+data;
	}
        } else {
            localStorage.error = responseText;
             location.href = 'reporterror.html';
        }
    });
}
function searchSingle(val) {
    debugger;
    var found = false;
    $('#singleparams input[type=checkbox]').each(function () {

        var regExp = new RegExp(val, 'i');
        var len = val.length;
        var name = "";
        found = false;
        name = $(this).attr('title').trim().substr(0, len);

        if (regExp.test(name)) {
            found = true;

        }
        if (found) {
            $(this).parent().parent().show();
        } else {
            $(this).parent().parent().hide();
        }



    });

}


function searchDouble(val) {
    debugger;
    var found = false;
    $('#doubleparams input[type=checkbox]').each(function () {

        var regExp = new RegExp(val, 'i');
        var len = val.length;
        var name = "";
        found = false;
        name = $(this).attr('title').trim().substr(0, len);

        if (regExp.test(name)) {
            found = true;

        }
        if (found) {
            $(this).parent().parent().show();
        } else {
            $(this).parent().parent().hide();
        }



    });

}
function showdouble() {
    create_Single_View();
}
function create_Single_View()
{
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    $('#mydiv').show();
    debugger;
    var parameternm = $('#hdnparameternm').val();
    if ((document.getElementById("rdbmulti").checked === true))
    {
        var deptid = "", deptnm = "";
        debugger;
        $('#singleparams input[type=checkbox]').each(function () {
            if (this.checked) {
                deptid += $(this).val() + ",";
                deptnm += $(this).attr('title') + ",";
            }
        });
        deptid = deptid.substr(0, deptid.length - 1);
        deptid = deptid.replace(/[,]/g, "','");
        if (deptid === "")
        {
             $('#mydiv').hide();
            var sss = parameternm;
            alert("please select " + sss);
            return;
        }
        else
        {

            debugger;
            create_Single_Multi_View(deptid, 'SingleParamView');
        }
    }
    else
    {

        var sid = document.getElementById('txtSingle').name;
        if (sid === "")
        {
             $('#mydiv').hide();
            var sss = parameternm;
            alert("please select " + sss);
            return;
        }
        else
        {

            debugger;
            deptid = document.getElementById('txtSingle').name;
            create_Single_Multi_View(sid, 'SingleParamView');
        }


    }
}

function create_Double_View()
{
    var parameternm = $('#hdnparameternm').val();
    if (document.getElementById("rdbmulti").checked === true)
    {
        var deptid = "", deptnm = "";
        debugger;
        $('#doubleparams input[type=checkbox]').each(function () {
            if (this.checked) {
                deptid += $(this).val() + ",";
                deptnm += $(this).attr('title') + ",";
            }
        });
        deptid = deptid.substr(0, deptid.length - 1);
        deptid = deptid.replace(/[,]/g, "','");
        if (deptid === "")
        {
             $('#mydiv').hide();
            var sss = parameternm;
            alert("please select " + sss);
            return;
        }
        else
        {

            debugger;
            create_Single_Multi_View1(deptid, 'DoubleParamView');
        }
    }
    else
    {

        var sid = document.getElementById('txtDouble').name;
        if (sid === "")
        {

            var sss = parameternm;
            alert("please select " + sss);
            return;
        }
        else
        {

            debugger;
            sid = document.getElementById('txtDouble').name;
            create_Single_Multi_View1(sid, 'DoubleParamView');
        }


    }

}
function create_Single_Multi_View(id, vname)
{
    debugger;
    var usernm = localStorage.usernm;
    var userid = localStorage.userid;
    var locid = localStorage.locid;
    var strqry = '';
    if (vname === "SingleParamView")
    {
        strqry = $('#hdnstrqry').val();
    }
    else
    {
        strqry = $('#hdnstrqry1').val();
    }

    debugger;
    var qry = strqry.split(":");
    var col = qry[0];
    var collst = col.split(",");
    var sqry = strqry.toUpperCase().split('WHERE');
    if (sqry.length > 1)
    {
        strqry = "select " + collst[1] + " From " + qry[1] + "  and " + collst[1] + " in ('" + id + "') ";
    }
    else
    {
        strqry = "select " + collst[1] + " From " + qry[1] + "  where " + collst[1] + " in ('" + id + "')  ";
    }
//                }
  var sdeptid=localStorage.sdeptid ;
     var deptid= localStorage.deptid;
    var url = localStorage.ipadrs + "/globalreport";
    var data1 = "create_Single_Multi_View=" + vname + "&sdeptid="+sdeptid+"&deptid="+deptid+"&view_qry=" + strqry + "&userid=" + userid + "&usernm=" + usernm + "&locid=" + locid + "&loginlocid=" + locid;
    $.ajax({
        type: 'POST',
        url: url,
        data: data1,
        traditional: true,
        async: false, //this property block popups
        success: function () {
            create_Double_View();
        }
    });

}
function create_Single_Multi_View1(id, vname)
{
    debugger;
    var usernm = localStorage.usernm;
    var userid = localStorage.userid;
    var locid = localStorage.locid;
    var strqry = '';
    if (vname === "SingleParamView")
    {
        strqry = $('#hdnstrqry').val();
    }
    else
    {
        strqry = $('#hdnstrqry1').val();
    }

    debugger;
    var qry = strqry.split(":");
    var col = qry[0];
    var collst = col.split(",");
    var sqry = strqry.toUpperCase().split('WHERE');
    if (sqry.length > 1)
    {
        strqry = "select " + collst[1] + " From " + qry[1] + "  and " + collst[1] + " in ('" + id + "') ";
    }
    else
    {
        strqry = "select " + collst[1] + " From " + qry[1] + "  where " + collst[1] + " in ('" + id + "')  ";
    }
//                }
    var url = localStorage.ipadrs + "/globalreport";
    var date1 = "create_Single_Multi_View=" + vname + "&view_qry=" + strqry + "&userid=" + userid + "&usernm=" + usernm + "&locid=" + locid + "&loginlocid=" + locid;
    $.ajax({
        type: 'POST',
        url: url,
        data: date1,
        traditional: true,
        async: false, //this property block popups
        success: function () {
            showdoubleparam();
        }
    });
}
function showdoubleparam() {

    debugger;
    var usernm = localStorage.usernm;
    var userid = localStorage.userid;
    var loginlocid = localStorage.locid;
    var type = document.getElementById("typevalue").value;
    var reportid = localStorage.reportid;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    var locid = "", locnm = "";
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv .imgnload').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    $('#mydiv').show();
    $('#locations input[type=checkbox]').each(function () {
        if (this.checked) {
            locid += $(this).val() + ",";
            locnm += $(this).attr('title') + ",";
        }
    });
    locid = locid.replace(/,$/, '');

    if (locid === "")
    {
         $('#mydiv').hide();
        alert("please select location");
        return;
    }
    var sval = document.getElementById('txtSingle').value;
    var sid = document.getElementById('txtSingle').name;
    var dbval = document.getElementById('txtDouble').value;
    var dbid = document.getElementById('txtDouble').name;
    var txtDesc = document.getElementById('txtDesc').textContent;
    txtDesc = encodeURIComponent(txtDesc);
    var txtVerify = document.getElementById('txtVerify').textContent;
    txtVerify = encodeURIComponent(txtVerify);
    var chkmsexcel;
    if (document.getElementById('chkMsexcel').checked === true)
    {
        chkmsexcel = 1;
    }
    else
    {
        chkmsexcel = 0;
    }
    var fromtm = document.getElementById('txtFromTime').value;
    var totm = document.getElementById('txtToTime').value;
    var path = localStorage.ipadrs + "globalreport?desc=" + txtDesc + "&varify=" + txtVerify + "&type=" + type + "&fromdt=" + fromdt + "&todt=" + todt + "&locid=" + locid + "&reportid=" + reportid + "&locnm=" + locnm + "&spval=" + sval + "&spid=" + sid + "&dbval=" + dbval + "&dbid=" + dbid + "&fromtm=" + fromtm + "&totm=" + totm + '&chkmsexcel=' + chkmsexcel + '&fromtm=' + fromtm + '&totm=' + totm + '&userid=' + userid + '&usernm=' + usernm + '&loginlocid=' + loginlocid + '&mnewflg=1&mobile=1';
    //window.open('globalreport?desc=' + txtDesc + '&subdeptname=' + subdeptname + '&varify=' + txtVerify + '&type=' + type + '&sname=' + sname + '&sname1=' + sname1 + '&fromdt=' + fromdt + '&todt=' + todt + '&locid=' + locid + '&reportid=' + reportid + '&locnm=' + locnm + '&spid=' + sid + '&chkparamall=' + chkparamall + '&chkmsexcel=' + chkmsexcel + '&fromtm=' + fromtm + '&totm=' + totm, '_blank', '');
    $.get(path, function (responseText) {
        if (responseText.indexOf("error") < 0) {
//            var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewer.jsp?mrno=" + responseText;
//            localStorage.pdfpath = pdfpath;
//            $('#mydiv').hide();
//	        location.href = 'globalreport.html';
       if (responseText.indexOf("|") < 0) {//for old build
		     	   var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewerzoom.jsp?mrno=" + responseText;
            localStorage.pdfpath = pdfpath;
            $('#mydiv').hide();
            location.href = 'globalreport.html';
             
	}else{//for new build new app
	     localStorage.mnewflg="1";  
	     var res =responseText.split("|");
             $('#mydiv').hide();
	     var data = 'noofpages='+res[1]+'&filenm='+res[0];
            location.href = 'globalreport.html?'+data;
	}
        } else {
             localStorage.error = responseText;
             location.href = 'reporterror.html';
        }

    });
}

