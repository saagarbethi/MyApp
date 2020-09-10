$(document).ready(function () {
    var path = location.search + "&mobile=yes";

    $.get(localStorage.ipadrs + "/formview" + path, function (responseText) {
        $('#divComparitive').html(responseText);
        path = path.split("?");
        $("#txtFrom").datepicker({dateFormat: 'dd/mm/yy'});
        $("#txtTo").datepicker({dateFormat: 'dd/mm/yy'});
        $("#txtFrom").val(localStorage.fromdt);
        $("#txtTo").val(localStorage.todt);
        localStorage.ycheck = getParameterName(path[1], "ycheck");
        localStorage.fromdt = getParameterName(path[1], "fromdt");
        localStorage.todt = getParameterName(path[1], "todt");
        loadData();
    });
});
function loadData() {
    var ycheck = localStorage.ycheck;
    if (ycheck == 0)
        document.getElementById("rdbDaily").checked = true;
    else if (ycheck == 1)
        document.getElementById("rdbMonthly").checked = true;
    else if (ycheck == 2)
        document.getElementById("rdbYearly").checked = true;
    $.get(localStorage.ipadrs + "login?type=loc&usernm="+localStorage.usernm, function (responseJson) {
        if (responseJson !== null) {

            var select = document.getElementById("ddlLoc");
            select.length = 0;
            var mem = responseJson;
            for (var i = 0; i < mem.length; i++) {
                //Agentname,AgentID
                var sourcename = responseJson[i]['LOCNM'];
                var indexo = responseJson[i]['LOCID'];
                select.options[select.options.length] = new Option(sourcename, indexo);
            }
        }
        document.getElementById('ddlLoc').value = localStorage.locid;
        $('#txtFrom').val(localStorage.fromdt);
        $('#txtTo').val(localStorage.todt);
        getColNm();
    });

}
function getColNm() {
    var wfid = localStorage.currentformid;
    var locid =document.getElementById('ddlLoc').value;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    var label = localStorage.label;
    var rtype = 'graphgrids';
    $.get(localStorage.ipadrs + "/DashBoardComparitive?reqtype=colnm&wfid=" + wfid + "&fromdt=" + fromdt + "&todt=" + todt + "&locid=" + locid + "&label=" + label + "&rtype=" + rtype, function (responseJson) {
        $('#tabcolnm').find("tr").remove();
        $('#tabcolnm').append(responseJson);
        refresh();
    });
}
function getParameterName(name, path) {
    name = name.split("&");
    for (var i = 0; i < name.length; i++) {
        value = name[i].split("=");
        if (value[0] == path) {
            return value[1];
        }
    }
}
function refresh() {
    var locid = localStorage.locid;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    document.getElementById("imgProgress").style.visibility = "visible";
    var daily = document.getElementById("rdbDaily").checked;
    var monthly = document.getElementById("rdbMonthly").checked;
    var yearly = document.getElementById("rdbYearly").checked;
    var ycheck = 0;
    if (daily == true) {
        ycheck = 0;
    }
    else if (monthly == true) {
        var year_f = fromdt.substr(3);
        var year_t = todt.substr(3);
        fromdt = "01/" + year_f;
        document.getElementById("txtFrom").value = fromdt;
        // todt= "31/12/"+year_t;

        ycheck = 1;
    }
    else if (yearly == true) {
        var year_f = fromdt.substr(3);
        var year_t = todt.substr(3);
        fromdt = "01/" + year_f;
        document.getElementById("txtFrom").value = fromdt;
        ycheck = 2
    }
    var comparitive;

    comparitive = $('input:radio[name=col]:checked').val();
    var label = localStorage.label;
    var rtype = 'graphgrids';
    var url = localStorage.ipadrs + "/DashBoardComparitive";
    var wfid = localStorage.currentformid;
    url += '?locid=' + locid + '&reqtype=data&fromdt=' + fromdt + '&todt=' + todt + '&comparitive=' + comparitive + '&daily=' + ycheck + "&wfid=" + wfid + "&label=" + label + "&rtype=" + rtype;
    //alert(url);
    if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    request.onreadystatechange = grdRefresh;
    request.open("POST", url, true);
    request.send();
}
function grdRefresh() {
    if (request.readyState == 4) {
        var res = request.responseText;
        var response = res.split("@@@");
        document.getElementById("imgProgress").style.visibility = "hidden";
        if (res == "1") {
            document.getElementById("container").style.visibility = "hidden";
            document.getElementById("tabledept").style.visibility = "hidden";
        }
        else {
            document.getElementById("container").style.visibility = "visible";
            document.getElementById("tabledept").style.visibility = "visible";
            document.getElementById("tabledept").innerHTML = response[0];
            document.getElementById("lblmonths").innerHTML = response[1];
            document.getElementById("lbldays").innerHTML = response[2];
            document.getElementById("lblyears").innerHTML = response[3];
            displaychart1();
        }
    }
}
function displaychart1() {
    var count = document.getElementById("tabcomp").rows.length;

    if (count > 0) {
        document.getElementById("container").style.visibility = "visible";
        var array4 = new Array();

        var days = document.getElementById("lbldays").innerHTML;
        if (document.getElementById("rdbDaily").checked == true) {

            for (var x = 2; x < count - 1; x++) {
                var array1 = new Array();
                var array2 = new Array();
                var array3 = new Array();
                var table = document.getElementById("tabcomp");
                for (var i = 0; i <= days; i++) {
                    var dates = table.rows[0].cells[i + 2].innerHTML;
                    var daytot = table.rows[x].cells[i + 2].innerHTML;
                    array3.push(dates);
                    var a = parseInt(daytot);
                    array2.push(a);
                }
                var total = document.getElementById("deptnm" + x).innerHTML;
                array1.push(total);
                array4.push({
                    name: array1,
                    data: array2
                });
            }
        }
        else if (document.getElementById("rdbMonthly").checked == true) {
            var months = document.getElementById("lblmonths").innerHTML;

            for (var x = 1; x < count - 1; x++) {
                var array1 = new Array();
                var array2 = new Array();
                var array3 = new Array();
                var table = document.getElementById("tabcomp");
                for (var i = 0; i <= months; i++) {
                    var monthnames = table.rows[0].cells[i + 2].innerHTML;
                    var daytot = table.rows[x].cells[i + 2].innerHTML;
                    array3.push(monthnames);
                    var a = parseInt(daytot);
                    array2.push(a);
                }
                var total = document.getElementById("deptnm" + x).innerHTML;
                array1.push(total);
                array4.push({
                    name: array1,
                    data: array2
                });
            }

        }
        else if (document.getElementById("rdbYearly").checked == true) {
            var years = document.getElementById("lblyears").innerHTML;

            for (var x = 1; x < count - 1; x++) {
                var array1 = new Array();
                var array2 = new Array();
                var array3 = new Array();
                var table = document.getElementById("tabcomp");
                for (var i = 0; i < years; i++) {
                    var monthnames = table.rows[0].cells[i + 2].innerHTML;
                    var daytot = table.rows[x].cells[i + 2].innerHTML;
                    array3.push(monthnames);
                    var a = parseInt(daytot);
                    array2.push(a);
                }
                var total = document.getElementById("deptnm" + x).innerHTML;
                array1.push(total);
                array4.push({
                    name: array1,
                    data: array2
                });
            }

        }

        $('#container').highcharts({
            title: {
                text: '',
                x: -20 //center
            },
            xAxis: {
                categories: array3
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: array4
        });


    }
    else {
        document.getElementById("container").style.visibility = "hidden";
    }

}
function weekago() {
    document.getElementById("txtFrom").value = $('#hdnweek').val();
    document.getElementById("txtTo").value = $('#txtTo').val();
    document.getElementById("rdbDaily").checked = true;
    refresh();
}
function today() {
    document.getElementById("txtFrom").value = $('#txtTo').val();
    document.getElementById("txtTo").value = $('#txtTo').val();
    document.getElementById("rdbDaily").checked = true;
    refresh();
}
function lastonemonth() {
    document.getElementById("txtFrom").value = $('#hdnmonth').val();
    document.getElementById("txtTo").value = $('#txtTo').val();
    document.getElementById("rdbDaily").checked = true;
    refresh();
}
function lastyear() {
    document.getElementById("txtFrom").value = $('#hdnyear').val();
    document.getElementById("txtTo").value = $('#txtTo').val();
    document.getElementById("rdbMonthly").checked = true;
    refresh();
}
function lastfiveyears() {
    document.getElementById("txtFrom").value = $('#hdnfiveyear').val();
    document.getElementById("txtTo").value = $('#txtTo').val();
    document.getElementById("rdbYearly").checked = true;
    refresh();
}
function settings() {
    location.href = 'settings.html';
}
function logout() {
    var fromdt = localStorage.fromdt;
    var todt = localStorage.todt;
    var locid = localStorage.locid;
    var wfid = localStorage.currentformid;
    var frompage = localStorage.formid;
    var label = localStorage.label;
    location.href = "graphs.html?fromdt=" + fromdt + "&todt=" + todt + "&gloc=" + locid + "&type=0&wfid=" + wfid + "&reqtype=graphgrids&label=" + label + "&frompage=" + frompage;
}