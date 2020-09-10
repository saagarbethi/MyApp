/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
//     $('head').append('<script type="text/javascript" src="'+localStorage.ipadrs+'js/template.js">');
    try {
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.webformid;
        debugger;
         localStorage.formid = localStorage.webformid;
        var mrno = getParameterName(localStorage.path,"mrno");
        var locid = getParameterName(localStorage.path,"locid");
        var mapopdocid = getParameterName(localStorage.path,"mapopdocid");
        var speid = getParameterName(localStorage.path,"speid");
        $.get(path + "/formview?webformid=" + currentformid + "&frompage=" + formid + "&mobile=yes&locid=" + locid+"&usernm="+localStorage.usernm+"&fromdis=1&theme=&mrno=" + mrno + "&locid=" + locid + "&docid=" + localStorage.docid + "&speid="+speid+"&userid="+localStorage.userid+"&encounterid="+localStorage.encountid+"&episodeid="+localStorage.episodeid, function (responsetext) {
            $('#divgraphs').html(responsetext);
            fillCalander();
            checking();
            $('#mydiv').hide();
        });
    } catch (err) {
        $('#mydiv').hide();
       // alert(err);
    }
});
function loadformnew(){
    try {
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.webformid;
        debugger;
        var mrno = getParameterName(localStorage.path,"mrno");
        var locid = getParameterName(localStorage.path,"locid");
        var mapopdocid = getParameterName(localStorage.path,"mapopdocid");
        var speid = getParameterName(localStorage.path,"speid");
        $.get(path + "/formview?webformid=" + currentformid + "&frompage=" + formid + "&mobile=yes&locid=" + locid+"&usernm="+localStorage.usernm+"&fromdis=1&theme=&mrno=" + mrno + "&locid=" + locid + "&docid=" + mapopdocid + "&speid=" + speid+'&userid='+localStorage.userid, function (responsetext) {
            $('#divFrame').html(responsetext);
            fillCalander();
            checking();
            $('#mydiv').hide();
        });
    } catch (err) {
        $('#mydiv').hide();
        alert(err);
    }
}
function settings() {
    location.href = 'settings.html';
}
function close1() {
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
function getParameterName(name, path) {
    debugger;
    var res = ""
    name = name.split("&");
    for (var i = 0; i < name.length; i++) {
        value = name[i].split("=");
        if (value[0] == path) {
            res =  value[1];
        } 

    }
    return res ;
}