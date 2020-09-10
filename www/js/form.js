/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on('ready', function() {
    debugger;
//     $('head').append('<script type="text/javascript" src="'+localStorage.ipadrs+'js/template.js">');
    try {
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.currentformid;
        var locid = localStorage.locid;
	var userid=localStorage.userid;
        if(localStorage.tree == "1"){
               $.get(path + "/formview?webformid=" + currentformid + "&frompage=" + formid + "&mobile=yes&locid=" + locid + "&fromdis=1&theme=&mrno=" + localStorage.key_id+'&drill=1', function (responsetext) {
                $('#divgraphs').html(responsetext);
                    localStorage.drill = "0"
                    fillCalander();
                    checking();
                    hideProgress();
             
                });
        }
        else if ("drill" in localStorage) {
	    debugger;
            if (localStorage.drill == "1") {
		var drillflg=getParameterByName("drillflg");
		var data="";
	          if(drillflg==="1"){ 
			    data = '&drillflg=1';
		  }
                  var url = path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid + "&fromdis=1&theme=&mrno="+localStorage.key_id.trim()+"&drill=1"+data;
                  $('#divgraphs').load(url,function(){
                       localStorage.drill = "0"
                    fillCalander();
//                  checking();
                   hideProgress();
                    document.getElementById("mydiv1").style.display = "block";
                    setTimeout(function(){ checking(drillflg); }, 2000);
                  });
//                $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid + "&fromdis=1&theme=&mrno=" + localStorage.key_id+'&drill=1'+data, function (responsetext) {
//                    $('#divgraphs').html(responsetext);
//                    localStorage.drill = "0"
//                    fillCalander();
//                    checking();
//                    hideProgress();
//                });
            }
            else if("orders" in localStorage){
            if(localStorage.orders=="1"){
//                localStorage.orders="0";
//                localStorage.rights="All";
//                alert(localStorage.mrno);
                $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid + "&fromdis=1&theme=&mrno=" + localStorage.mrno+'&docid='+localStorage.docid+'&encounterid='+localStorage.encountid+'&episodeid='+localStorage.episodeid+'&orders=1', function (responsetext) {
                    $('#divgraphs').html(responsetext);
                    fillCalander();
                    checking();
                    hideProgress();
                });
            }
            else {
                $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid, function (responsetext) {
                    $('#divgraphs').html(responsetext);
                    fillCalander();
                    checking();
                    hideProgress();
                });
            }
        }
            else {
                $('#divgraphs').load(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid,function(){
                       localStorage.drill = "0"
//                    fillCalander();
                 checking();
                   hideProgress();
//                    document.getElementById("mydiv1").style.display = "block";
//                    setTimeout(function(){ checking(); }, 2000);
                  });
//                $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid, function (responsetext) {
//                    $('#divgraphs').html(responsetext);
//                    fillCalander();
//                    checking();
//                    hideProgress();
//                });
                
            }
        }
        else if("orders" in localStorage){
            if(localStorage.orders=="1"){
//                localStorage.orders="0";
//                localStorage.rights="All";
//                alert(localStorage.mrno);
                $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid + "&fromdis=1&theme=&mrno=" + localStorage.mrno+'&docid='+localStorage.docid+'&encounterid='+localStorage.encountid+'&episodeid='+localStorage.episodeid+'&orders=1', function (responsetext) {
                    $('#divgraphs').html(responsetext);
                    fillCalander();
                    checking();
                    hideProgress();
                });
            }
            else{
                $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid , function (responsetext) {
                    $('#divgraphs').html(responsetext);
                    fillCalander();
                    checking();
                    hideProgress();
                });
            }
        }
        else {
            $.get(path + "/formview?webformid=" + currentformid + "&userid="+userid+"&frompage=" + formid + "&mobile=yes&locid=" + locid, function (responsetext) {
                $('#divgraphs').html(responsetext);
                fillCalander();
                checking();
                hideProgress();
            });
        }
    } catch (err) {
        hideProgress();
    }
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function settings() {
    location.href = 'settings.html';
}
function close1() {
     localStorage.disback ="1";
    location.href = "dashboardmenubuttons.html";
}
function fillCalander() {
    debugger;
    try
    {
        $('.Time').timepicker(
                {
                    'step': '1', //startTime: "02.00"
                    'minTime': '12:00:00',
                    'maxTime': '12:00:00',
                    'show24Hours': 'false',
                    'separator': '.',
                    'timeFormat': 'h:i:s a'
                }
        );

        $('.Time').on('changeTime', function () {
            $('#mySpan').text($(this).val());
            $(this).val();
        });
    }
    catch (err)
    {
    }


    $(function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();
        try {
            $(".Date1").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: '1870:2040',
                dateFormat: "dd/mm/yy"
            });
            $(".Date2").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: '1870:2040',
                maxDate: new Date(currentYear, currentMonth, currentDate),
                dateFormat: "dd/mm/yy"
            });
            //$(".dateclass").pickadate();
        } catch (e)
        {

        }
        $('.Hide').hide();
        //
    });
    debugger;
    try
    {

        $('.Time').pickatime({
            interval: 1,
            formatSubmit: 'hh.i a',
            editable: true,
            formatLabel: 'hh:i A'
        });
    }
    catch (err)
    {
    }

}

function logout() {
    debugger;
    localStorage.currentformid = localStorage.backformid;
    if (localStorage.formid == 'mah') {
        location.href = 'mah_index.html';
        return;
    }
//    alert(location.currentformid);
    if (localStorage.backformid.indexOf("wf") >= 0) {
        localStorage.drill="0";
        location.href = 'Drilldashboard.html';
    }
    else if (localStorage.backformid == "dashboard") {
//        var path = localStorage.ipadrs;
//    var formid = localStorage.menubuttonformid;
//    var locid = localStorage.locid;
//    var frmtype = localStorage.frmtype;
            localStorage.disback ="1";
        location.href = 'dashboardmenubuttons.html';
    }

}
function hideProgress() {
    try {
        window.plugins.spinnerDialog.hide();
    } catch (err) {

    }
}
