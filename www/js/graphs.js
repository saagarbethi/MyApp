/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    debugger;
    var label = getParameterByName("label");
    var fromdt=getParameterByName("fromdt");
    var todt=getParameterByName("todt");
   
    var gloc=getParameterByName("gloc");
    var frompage = localStorage.formid;
    var wfid =localStorage.currentformid;
    var path = localStorage.ipadrs;
    var locid = localStorage.locid;
    path=path+"/formview?fromdt="+fromdt+"&todt="+todt+"&gloc="+gloc+"&locid="+locid+"&type=0&wfid="+wfid+"&reqtype=graphgrids&label="+label+"&frompage="+frompage+"&mobile=yes";
    $.get(path,function(responsetext){
        $('#divGraphs').html(responsetext);
        $("#txtFrom").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#txtTo").datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#txtFrom").hide();
    $("#txtTo").hide();
    $("#txtFrom").val(localStorage.fromdt);
     $("#txtTo").val(localStorage.todt);
        loadData() ;
    });
});
function loadData() {
    var path = localStorage.ipadrs;
    $.get(path+"login?type=loc&usernm="+localStorage.usernm, function(responseJson) {
        if (responseJson !== null) {
            var select = document.getElementById("ddlLoc");
            select.length = 0;
            var mem = responseJson;
            for (var i = 0; i < mem.length; i++) {
                var sourcename = responseJson[i]['LOCNM'];
                var indexo = responseJson[i]['LOCID'];
                select.options[select.options.length] = new Option(sourcename, indexo);
            }
        }
        document.getElementById('ddlLoc').value = localStorage.locid;
        var fromdt=getParameterByName("fromdt");
        if(fromdt===""){
            try{
            today1();
            }catch(err){
                
            }
        }else{
            refresh1();
        }
        
    });
}
function refresh1() {
    var locid = document.getElementById('ddlLoc').value;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    document.getElementById("imgProgress").style.visibility = "visible";
    var dept = document.getElementById("rdbDeptwise").checked;
    var total = document.getElementById("rdbTotal").checked;
    var deptcheck = 0;
    if (total == true) {
        deptcheck = 0;
    }
    else if (dept == true) {
        deptcheck = 1;
    }

    var daily = document.getElementById("rdbDaily").checked;
    var monthly = document.getElementById("rdbMonthly").checked;
    var yearly = document.getElementById("rdbYearly").checked;
    var ycheck = 0;
    if (daily == true) {
        ycheck = 0;
    }
    else if (monthly == true) {
        ycheck = 1;
    }
    else if (yearly == true) {
        ycheck = 2
    }
    var table1 = document.getElementById('grd3');
    var count = table1.rows.length;
    var selcol = "";
    for (var x = 1; x < count; x++) {
        //var total=ref.getElementsByTagName("deptnm"+x)[0].firstChild.data;
        var oCells = table1.rows.item(x).cells;
        if( x== 1)
            var selcol = table1.rows[x].cells[0].innerHTML;
    }

    var wfid = localStorage.currentformid
    var label = localStorage.label;
    var rtype = 'graphgrids';
    //alert(rtype+"--->"+label);
    var url = localStorage.ipadrs+"/DashBoardGraph";
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    document.getElementById("mydiv").style.display = 'block';
    url += '?locid=' + locid + '&fromdt=' + fromdt + '&todt=' + todt + '&deptcheck=' + deptcheck + '&ycheck=' + ycheck + "&wfid=" + wfid + "&reqtype=maindata&selcol=" + selcol + "&rtype=" + rtype + "&label=" + label;
    $.get(url, function(responseText) {
        $('#grdTotal').find("tr").remove();
        document.getElementById("mydiv").style.display = 'none';
        if (responseText !== null) {
            //alert(responseText);
            $('#grdTotal').append(responseText);
        }
        displaychart();
        refreshdate();
        document.getElementById("imgProgress").style.visibility = "hidden";
    });

}
function displaychart(id) {
    var trtype = document.getElementById("ddlChart").value;
    var array1 = new Array();
    var array2 = new Array();
    var array3 = new Array();
    var array4 = new Array();
    var table1 = document.getElementById('grdTotal');
    var count = table1.rows.length;
    var totalvalue = 0;
    for (var x = 1; x < count; x++) {
        //var total=ref.getElementsByTagName("deptnm"+x)[0].firstChild.data;
        var oCells = table1.rows.item(x).cells;
        var celLength = oCells.length;
        var total = 0;
        var total = table1.rows[x].cells[0].innerHTML;
        array1.push(total);
        var values;
        if(total == "Total"){
            if (id == undefined || id == "") {
                totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[celLength - 1].innerHTML);
            } else {
                totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[id].innerHTML);
            }
            continue;
        }
        if (id == undefined) {
            values = table1.rows[x].cells[celLength - 1].innerHTML;
        } else {
            values = table1.rows[x].cells[id].innerHTML;
        }
        var a = parseInt(values);
        if (a == "NaN") {
            return false;
        }
        array2.push(a);
        array3.push([total, Math.round(a)]);
        array4.push({
            income: a, 
            year: total
        });

    }
    $("#container").css({
        "margin-left": 0 + "px", 
        "min-width": 40 + "%"
    });
    var array5 = new Array();
                 var oCells = table1.rows.item(0).cells;
                    var celLength = oCells.length;
                    var total = 0;
                    for(var colno=1;colno<celLength;colno++){
                    var arraynew = new Array();
                    var values;
                    var allnum = 1;
                    for (var x = 1; x < count-1; x++) {
                    try{
                        values = table1.rows[x].cells[colno].innerHTML;
                    var a = parseInt(values);
                    if (isNaN(values)) {
                        allnum=0;
                        continue;
                    }
                    arraynew.push(a);
                }catch(err){
                }
                    }
                if(allnum =1){
                    array5.push({name:table1.rows[0].cells[colno].innerHTML,data:arraynew})
                }
                    }
    if (trtype == "bg2d") {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Bar Graph'
            },
            xAxis: {
                categories: array1,
                labels: {
                    rotation: -35,
                    align: 'right',
                    style: {
                        fontSize: '8pt',
                        fontFamily: 'Verdana, sans-serif',
                        font: 'Bold'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: array5
//            ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.series.name + ': ' + this.y}
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
        });
    }
    else if (trtype == "lg2d") {
        $('#container').highcharts({
            chart: {
                type: 'spline',
                marginRight: 130,
                marginBottom: 35
            },
            title: {
                text: 'Line Graph',
                x: -20 //center
            },
            xAxis: {
                categories: array1,
                labels: {
                    rotation: -15,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
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
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                borderWidth: 0
            },
            series: array5
//            ,
//                         plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true,
//                        crop: true,
//                overflow: 'none'
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
        });
    }
    else if (trtype == "ag2d") {

        $('#container').highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Area Graph'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: array1,
                labels: {
                    rotation: -25,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                plotBands: [{// visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]

            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: array5
//            ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
        });
    }
    else if (trtype == "sg2d") {
        $('#container').highcharts({
            title: {
                text: 'Step line Graph'
            },
            xAxis: {
                categories: array1,
                labels: {
                    rotation: -20,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }

            },
            series: array5
//            ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }

        });

    }
    else if (trtype == "pg2d") {
        $('#container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Pie Chart'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'DeptWise',
                data: array3
            }]
        });
    }
    else if (trtype == "xy2d")
    {
        $('#container').highcharts({
            chart: {
            },
            yAxis: {
                min: 0
            },
            title: {
                text: 'Scatter plot'
            },
            xAxis: {
                categories: array1,
                labels: {
                    rotation: -20,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }

            },
            series: [{
                enableMouseTracking: false
            }, {
                type: 'scatter',
                name: 'Observations',
                data: array2,
                marker: {
                    radius: 4
                }
            }]
        });
    }
    else if (trtype == "bg3d")
    {
        var chart;

        chart = new AmCharts.AmSerialChart();
        chart.autoMarginOffset = 0;
        chart.marginRight = 0;
        chart.dataProvider = array4;

        chart.categoryField = "year";
        // this single line makes the chart a bar chart,
        // try to set it to false - your bars will turn to columns               
        chart.rotate = false;
        // the following two lines makes chart 3D
        chart.depth3D = 20;
        chart.angle = 30;

        // AXES
        // Category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.gridPosition = "start";
        categoryAxis.axisColor = "#DADADA";
        categoryAxis.fillAlpha = 1;
        categoryAxis.gridAlpha = 0;
        categoryAxis.fillColor = "#FAFAFA";

        // value
        var valueAxis = new AmCharts.ValueAxis();
        //  valueAxis.axisColor = "#DADADA";
        //valueAxis.title = "Income in millions, USD";
        //valueAxis.gridAlpha = 0.1;
        //chart.addValueAxis(valueAxis);

        // GRAPH
        var graph = new AmCharts.AmGraph();
        graph.title = "Income";
        graph.valueField = "income";
        graph.type = "column";
        graph.balloonText = "Income in [[category]]:[[value]]";
        graph.lineAlpha = 0;
        graph.fillColors = "#bf1c25";
        graph.fillAlphas = 1;

        chart.addGraph(graph);

        // WRITE
        chart.write("container");

    }
    else if (trtype == "pg3d")
    {
        $("#container").css({
            "margin-left": 0 + "px", 
            "min-width": 40 + "%"
        });
        var chart;

        // PIE CHART
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = array4;
        chart.titleField = "year";
        chart.valueField = "income";
        chart.outlineColor = "#FFFFFF";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 2;
        // this makes the chart 3D
        chart.depth3D = 15;
        chart.angle = 30;

        // WRITE
        chart.write("container");
    }



}
function displaychart1(id) {
                var trtype = document.getElementById("ddlChart1").value;

                //var response=request.responseXML;
                //var dg = response.getElementsByTagName("dbclick");
                //var ref = dg[0];

                var array5 = new Array();
                var array6 = new Array();
                var array7 = new Array();
                var array8 = new Array();

                var table1 = document.getElementById('grdDaily');
                var count = table1.rows.length;
                var totalvalue = 0;
                for (var x = 1; x < count; x++) {
                    //var total=ref.getElementsByTagName("deptnm"+x)[0].firstChild.data;
                    var oCells = table1.rows.item(x).cells;
                    var celLength = oCells.length;
                    var total = 0;
                    var total = table1.rows[x].cells[0].innerHTML;
                    array5.push(total);
                    if(total == "Total"){
                        if (id == undefined || id == "") {
                        totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[celLength - 1].innerHTML);
                    } else {
                        totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[id].innerHTML);
                    }
                        continue;
                    }
                    var values
                    if (id == undefined) {
                        values = table1.rows[x].cells[celLength - 1].innerHTML;
                    } else {
                        values = table1.rows[x].cells[id].innerHTML;
                    }
                    var a = parseInt(values);
                    if (a == "NaN") {
                        return false;
                    }
                    array6.push(a);
                    //var date=ref.getElementsByTagName("dtmn"+x)[0].firstChild.data;
                    //var amount=ref.getElementsByTagName("all"+x)[0].firstChild.data;
//                    array5.push(date);
//                    var b=parseInt(amount);
//                    array6.push(b);
                    array7.push([total, a]);
                    array8.push({income: a, year: total});
                }
                var array12= new Array();
                 var oCells = table1.rows.item(0).cells;
                    var celLength = oCells.length;
                    var total = 0;
                    for(var colno=1;colno<celLength;colno++){
                    var arraynew = new Array();
                    var values;
                    var allnum = 1;
                    for (var x = 1; x < count-1; x++) {
                    try{
                        values = table1.rows[x].cells[colno].innerHTML;
                    var a = parseInt(values);
                    if (isNaN(values)) {
                        allnum=0;
                        continue;
                    }
                    arraynew.push(a);
                }catch(err){
                }
                    }
                if(allnum =1){
                    array12.push({name:table1.rows[0].cells[colno].innerHTML,data:arraynew})
                }
                    }
                $("#container1").css({"margin-left": 0 + "px", "min-width": 37 + "%"});
                if (trtype == "bg2d") {
                    $('#container1').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Bar Graph'
                        },
                        xAxis: {
                            categories: array5,
                            labels: {
                                rotation: -35,
                                align: 'right',
                                style: {
                                    fontSize: '10pt',
                                    fontFamily: 'Verdana, sans-serif',
                                    font: 'Bold'
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: array12
//                        ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.series.name + ': ' + this.y}
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
                    });
                }
                else if (trtype == "lg2d") {
                    $('#container1').highcharts({
                        chart: {
                            type: 'spline',
                            marginRight: 130,
                            marginBottom: 35
                        },
                        title: {
                            text: 'Line Graph',
                            x: -20 //center
                        },
                        xAxis: {
                            categories: array5,
                            labels: {
                                rotation: -15,
                                align: 'right',
                                style: {
                                    fontSize: '8px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
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
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: 150,
                            y: 100,
                            borderWidth: 0
                        }
                        ,
//                       plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true,
//                        crop: true,
//                overflow: 'none'
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            },
            series : array12
                    });
                }
                else if (trtype == "ag2d") {

                    $('#container1').highcharts({
                        chart: {
                            type: 'areaspline'
                        },
                        title: {
                            text: 'Area Graph'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: 150,
                            y: 100,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: '#FFFFFF'
                        },
                        xAxis: {
                            categories: array5,
                            labels: {
                                rotation: -25,
                                align: 'right',
                                style: {
                                    fontSize: '8px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            },
                            plotBands: [{// visualize the weekend
                                    from: 4.5,
                                    to: 6.5,
                                    color: 'rgba(68, 170, 213, .2)'
                                }]

                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        tooltip: {
                            shared: true,
                            valueSuffix: ' units'
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            areaspline: {
                                fillOpacity: 0.5
                            }
                        },
                        series: array12
//                        ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
                    });
                }
                else if (trtype == "sg2d") {
                    $('#container1').highcharts({
                        title: {
                            text: 'Step line Graph'
                        },
                        xAxis: {
                            categories: array5,
                            labels: {
                                rotation: -20,
                                align: 'right',
                                style: {
                                    fontSize: '8px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }

                        },
                       series: array12
//                       ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }

                    });

                }
                else if (trtype == "pg2d") {
                    $('#container1').highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: 'Pie Chart'
                        },
//                        tooltip: {
//                            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
//                            percentageDecimals: 1
//                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                                type: 'pie',
                                name: $('#lblmain').val(),
                                data: array7
                            }]
                    });
                }
                else if (trtype == "xy2d")
                {
                    $('#container1').highcharts({
                        chart: {
                        },
                        yAxis: {
                            min: 0
                        },
                        title: {
                            text: 'Scatter plot'
                        },
                        xAxis: {
                            categories: array5,
                            labels: {
                                rotation: -20,
                                align: 'right',
                                style: {
                                    fontSize: '8px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }

                        },
                        series: [{
                                enableMouseTracking: false
                            }, {
                                type: 'scatter',
                                name: 'Observations',
                                data: array6,
                                marker: {
                                    radius: 4
                                }
                            }]
                    });
                }
                else if (trtype == "bg3d")
                {

                    var chart;

                    chart = new AmCharts.AmSerialChart();
                    chart.autoMarginOffset = 0;
                    chart.marginRight = 0;
                    chart.dataProvider = array8;

                    chart.categoryField = "year";
                    // this single line makes the chart a bar chart,
                    // try to set it to false - your bars will turn to columns               
                    chart.rotate = false;
                    // the following two lines makes chart 3D
                    chart.depth3D = 20;
                    chart.angle = 30;

                    // AXES
                    // Category
                    var categoryAxis = chart.categoryAxis;
                    categoryAxis.gridPosition = "start";
                    categoryAxis.axisColor = "#DADADA";
                    categoryAxis.fillAlpha = 1;
                    categoryAxis.gridAlpha = 0;
                    categoryAxis.fillColor = "#FAFAFA";


                    // value
                    var valueAxis = new AmCharts.ValueAxis();
                    //  valueAxis.axisColor = "#DADADA";
                    //valueAxis.title = "Income in millions, USD";
                    //valueAxis.gridAlpha = 0.1;
                    //chart.addValueAxis(valueAxis);

                    // GRAPH
                    var graph = new AmCharts.AmGraph();
                    graph.title = "Income";
                    graph.valueField = "income";
                    graph.type = "column";
                    graph.balloonText = "Income in [[category]]:[[value]]";
                    graph.lineAlpha = 0;
                    graph.fillColors = "#bf1c25";
                    graph.fillAlphas = 1;

                    chart.addGraph(graph);
                    // Chart1.ChartAreas["Default"].Area3DStyle.XAngle = 45;

                    // WRITE
                    chart.write("container1");

                }
                else if (trtype == "pg3d")
                {
                    $("#container1").css({"margin-left": 0 + "px", "min-width": 37 + "%"});
                    var chart;

                    // PIE CHART
                    chart = new AmCharts.AmPieChart();
                    chart.dataProvider = array8;
                    chart.titleField = "year";
                    chart.valueField = "income";
                    chart.outlineColor = "#FFFFFF";
                    chart.outlineAlpha = 0.8;
                    chart.outlineThickness = 2;
                    // this makes the chart 3D
                    chart.depth3D = 15;
                    chart.angle = 30;

                    // WRITE
                    chart.write("container1");
                }

            }
function displaychart2(id) {
                debugger;
                if (document.getElementById("rdbYearly").checked == false) {

                    document.getElementById("container2").style.visibility = "visible";
                    var trtype = document.getElementById("ddlChart2").value;

                    //var response=request.responseXML;
                    //var dg = response.getElementsByTagName("dbclick");
                    //var ref = dg[0];
                    //var count=ref.getElementsByTagName("count2")[0].firstChild.data;
                    var array1 = new Array();
                    var array2 = new Array();
                    var array3 = new Array();
                    var array4 = new Array();


                    var table1 = document.getElementById('grd3');
                    var totalvalue = 0;
                    var count = table1.rows.length;
                    for (var x = 1; x < count; x++) {
                        //var total=ref.getElementsByTagName("deptnm"+x)[0].firstChild.data;
                        var oCells = table1.rows.item(x).cells;
                        var celLength = oCells.length;
                        var total = 0;
                        var total = table1.rows[x].cells[0].innerHTML;
                        array1.push(total);
                        if(total == "Total"){
                        if (id == undefined || id == "") {
                        totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[celLength - 1].innerHTML);
                    } else {
                        totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[id].innerHTML);
                    }
                        continue;
                    }
                        var values;
                        if (id == undefined) {
                            values = table1.rows[x].cells[celLength - 1].innerHTML;
                        } else {
                            values = table1.rows[x].cells[id].innerHTML;
                        }
                        var a = parseInt(values);
                        if (a == "NaN") {
                            return false;
                        }
                        array2.push(a);
                        //var total=ref.getElementsByTagName("regdt"+x)[0].firstChild.data;
                        //array1.push(total);
                        //var values=ref.getElementsByTagName("tott"+x)[0].firstChild.data;
                        //var a=parseInt(values);
                        // array2.push(a);
                        array3.push([total, a]);
                        array4.push({income: a, year: total});

                    }
                    var array5 = new Array();
                       var oCells = table1.rows.item(0).cells;
                    var celLength = oCells.length;
                    var total = 0;
                    for(var colno=1;colno<celLength;colno++){
                    var arraynew = new Array();
                    var values;
                    var allnum = 1;
                    for (var x = 1; x < count-1; x++) {
                    try{
                        values = table1.rows[x].cells[colno].innerHTML;
                    var a = parseInt(values);
                    if (isNaN(values)) {
                        allnum=0;
                        continue;
                    }
                    arraynew.push(a);
                }catch(err){
                }
                    }
                if(allnum =1){
                    array5.push({name:table1.rows[0].cells[colno].innerHTML,data:arraynew})
                }
                    }
                    $("#container2").css({"margin-left": 0 + "px", "min-width": 37 + "%"});
                    if (trtype == "bg2d") {
                        $('#container2').highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Bar Graph'
                            },
                            xAxis: {
                                categories: array1,
                                labels: {
                                    rotation: -35,
                                    align: 'right',
                                    style: {
                                        fontSize: '10pt',
                                        fontFamily: 'Verdana, sans-serif',
                                        font: 'Bold'
                                    }
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            series: array5
//                            ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.series.name + ': ' + this.y}
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
                        });
                    }
                    else if (trtype == "lg2d") {
                        $('#container2').highcharts({
                            chart: {
                                type: 'spline',
                                marginRight: 130,
                                marginBottom: 35
                            },
                            title: {
                                text: 'Line Graph',
                                x: -20 //center
                            },
                            xAxis: {
                                categories: array1,
                                labels: {
                                    rotation: -15,
                                    align: 'right',
                                    style: {
                                        fontSize: '8px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }
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
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: 150,
                                y: 100,
                                borderWidth: 0
                            },
                            series : array5
//                            ,
//                             plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true,
//                        crop: true,
//                overflow: 'none'
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
                        });
                    }
                    else if (trtype == "ag2d") {

                        $('#container2').highcharts({
                            chart: {
                                type: 'areaspline'
                            },
                            title: {
                                text: 'Area Graph'
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: 150,
                                y: 100,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF'
                            },
                            xAxis: {
                                categories: array1,
                                labels: {
                                    rotation: -25,
                                    align: 'right',
                                    style: {
                                        fontSize: '8px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                },
                                plotBands: [{// visualize the weekend
                                        from: 4.5,
                                        to: 6.5,
                                        color: 'rgba(68, 170, 213, .2)'
                                    }]

                            },
                            yAxis: {
                                title: {
                                    text: ''
                                }
                            },
                            tooltip: {
                                shared: true,
                                valueSuffix: ' units'
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                areaspline: {
                                    fillOpacity: 0.5
                                }
                            },
                            series: array5
//                            ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
                        });
                    }
                    else if (trtype == "sg2d") {
                        $('#container2').highcharts({
                            title: {
                                text: 'Step line Graph'
                            },
                            xAxis: {
                                categories: array1,
                                labels: {
                                    rotation: -20,
                                    align: 'right',
                                    style: {
                                        fontSize: '8px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }

                            },
                            series: array5
//                            ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }

                        });

                    }
                    else if (trtype == "pg2d") {
                        $('#container2').highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            },
                            title: {
                                text: 'Pie Chart'
                            },
//                        tooltip: {
//                            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
//                            percentageDecimals: 1
//                        },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            },
                            series: [{
                                    type: 'pie',
                                    name: $('#lblmain').val(),
                                    data: array3
                                }]
                        });
                    }
                    else if (trtype == "xy2d")
                    {
                        $('#container2').highcharts({
                            chart: {
                            },
                            yAxis: {
                                min: 0
                            },
                            title: {
                                text: 'Scatter plot'
                            },
                            xAxis: {
                                categories: array1,
                                labels: {
                                    rotation: -20,
                                    align: 'right',
                                    style: {
                                        fontSize: '8px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }

                            },
                            series: [{
                                    enableMouseTracking: false
                                }, {
                                    type: 'scatter',
                                    name: 'Observations',
                                    data: array2,
                                    marker: {
                                        radius: 4
                                    }
                                }]
                        });
                    }
                    else if (trtype == "bg3d")
                    {
                        var chart;

                        chart = new AmCharts.AmSerialChart();
                        chart.autoMarginOffset = 0;
                        chart.marginRight = 0;
                        chart.dataProvider = array4;

                        chart.categoryField = "year";
                        // this single line makes the chart a bar chart,
                        // try to set it to false - your bars will turn to columns               
                        chart.rotate = false;
                        // the following two lines makes chart 3D
                        chart.depth3D = 20;
                        chart.angle = 30;

                        // AXES
                        // Category
                        var categoryAxis = chart.categoryAxis;
                        categoryAxis.gridPosition = "start";
                        categoryAxis.axisColor = "#DADADA";
                        categoryAxis.fillAlpha = 1;
                        categoryAxis.gridAlpha = 0;
                        categoryAxis.fillColor = "#FAFAFA";

                        // value
                        var valueAxis = new AmCharts.ValueAxis();
                        //  valueAxis.axisColor = "#DADADA";
                        //valueAxis.title = "Income in millions, USD";
                        //valueAxis.gridAlpha = 0.1;
                        //chart.addValueAxis(valueAxis);

                        // GRAPH
                        var graph = new AmCharts.AmGraph();
                        graph.title = "Income";
                        graph.valueField = "income";
                        graph.type = "column";
                        graph.balloonText = "Income in [[category]]:[[value]]";
                        graph.lineAlpha = 0;
                        graph.fillColors = "#bf1c25";
                        graph.fillAlphas = 1;

                        chart.addGraph(graph);

                        // WRITE
                        chart.write("container2");

                    }
                    else if (trtype == "pg3d")
                    {
                        $("#container2").css({"margin-left": 0 + "px", "min-width": 37 + "%"});
                        var chart;

                        // PIE CHART
                        chart = new AmCharts.AmPieChart();
                        chart.dataProvider = array4;
                        chart.titleField = "year";
                        chart.valueField = "income";
                        chart.outlineColor = "#FFFFFF";
                        chart.outlineAlpha = 0.8;
                        chart.outlineThickness = 2;
                        // this makes the chart 3D
                        chart.depth3D = 15;
                        chart.angle = 30;

                        // WRITE
                        chart.write("container2");
                    }

                }
                else {
                    document.getElementById("container2").style.visibility = "hidden";
                    document.getElementById("ddlChart2").selectedIndex = 0;
                }

            }
function refreshdate() {
    $('#lblTotal').html("Daily");
    var locid = document.getElementById('ddlLoc').value;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    document.getElementById("imgProgress").style.visibility = "visible";
    var dept = document.getElementById("rdbDeptwise").checked;
    var total = document.getElementById("rdbTotal").checked;
    var deptcheck = 0;
    if (total == true) {
        deptcheck = 0;
    }
    else if (dept == true) {
        deptcheck = 1;
    }

    var daily = document.getElementById("rdbDaily").checked;
    var monthly = document.getElementById("rdbMonthly").checked;
    var yearly = document.getElementById("rdbYearly").checked;
    var ycheck = 0;
    if (daily == true) {
        ycheck = 0;
    }
    else if (monthly == true) {
        ycheck = 1;
    }
    else if (yearly == true) {
        ycheck = 2
    }
    var label = localStorage.label;
    var rtype ='graphgrids';
    var wfid = localStorage.currentformid;
    var url = localStorage.ipadrs+"/DashBoardGraph";
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    document.getElementById("mydiv").style.display = 'block';
    url += '?locid=' + locid + '&fromdt=' + fromdt + '&todt=' + todt + '&deptcheck=' + deptcheck + '&ycheck=' + ycheck + "&wfid=" + wfid + "&reqtype=dailydata&label=" + label + "&rtype=" + rtype;
    $.get(url, function(responseText) {
        document.getElementById("mydiv").style.display = 'none';
        $('#grdDaily').find("tr").remove();
        if (responseText !== null) {
            //alert(responseText);
            $('#grdDaily').append(responseText);
        }
        displaychart1();
        refreshyear();
    });

}
function refreshyear() {
    var locid = document.getElementById('ddlLoc').value;
    var fromdt = document.getElementById("txtFrom").value;
    var todt = document.getElementById("txtTo").value;
    var dept = document.getElementById("rdbDeptwise").checked;
    var total = document.getElementById("rdbTotal").checked;
    var deptcheck = 0;
    if (total == true) {
        deptcheck = 0;
    }
    else if (dept == true) {
        deptcheck = 1;
    }

    var daily = document.getElementById("rdbDaily").checked;
    var monthly = document.getElementById("rdbMonthly").checked;
    var yearly = document.getElementById("rdbYearly").checked;
    var ycheck = 0;
    if (daily == true) {
        ycheck = 0;
    }
    else if (monthly == true) {
        ycheck = 1;
    }
    else if (yearly == true) {
        ycheck = 2
    }
    var table1 = document.getElementById('grdDaily');
    var count = table1.rows.length;
    var selcol = "";
    for (var x = 1; x < count; x++) {
        //var total=ref.getElementsByTagName("deptnm"+x)[0].firstChild.data;
        var oCells = table1.rows.item(x).cells;
        if(x == 1)
            var selcol = table1.rows[x].cells[0].textContent;
    }
    // alert(selcol);
    var wfid = localStorage.currentformid
    var label = localStorage.label;
    var rtype = 'graphgrids';
    //alert(rtype+"--->"+label);
    var url = localStorage.ipadrs+"/DashBoardGraph";
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    document.getElementById("mydiv").style.display = 'block';
    url += '?locid=' + locid + '&fromdt=' + fromdt + '&todt=' + todt + '&deptcheck=' + deptcheck + '&ycheck=' + ycheck + "&wfid=" + wfid + "&reqtype=yeardata&selcol=" + selcol + "&rtype=" + rtype + "&label=" + label;
    $.get(url, function(responseText) {
        document.getElementById("mydiv").style.display = 'none';
        $('#grd3').find("tr").remove();
        if (responseText !== null) {
            //alert(responseText);
            $('#grd3').append(responseText);
        }
        displaychart2();
    });

}
function today() {
    debugger;
    var fromdt =$('#txtdd').val();
    var todt =  $('#txtdd').val();
    document.getElementById("txtFrom").value = fromdt;
    document.getElementById("txtTo").value = todt;
    document.getElementById("rdbDaily").checked = true;
    refresh1();
}
function weekago() {
    debugger;
    var fromdt = $('#hdnweek').val();
    var todt = $('#txtdd').val();
    document.getElementById("txtFrom").value = fromdt;
    document.getElementById("txtTo").value = todt;
    document.getElementById("rdbDaily").checked = true;
    refresh1();
}
//function lastonemonth() {
//    var fromdt = $('#hdnmonth').val();
//    var todt = $('#txtTo').val();
//    document.getElementById("txtFrom").value = fromdt;
//    document.getElementById("txtTo").value = todt;
//    document.getElementById("rdbDaily").checked = true;
//    refresh1();
//}
 function lastonemonth() {
     debugger; 
                var fromdt = $("#txtfirstDayPrevMonth").val();
                var todt = $("#txtlastDayPrevMonth").val();
                document.getElementById("txtFrom").value = fromdt;
                document.getElementById("txtTo").value = todt;
                document.getElementById("rdbDaily").checked = true;
                refresh1();
            }
function lastoneyear() {
    var fromdt = $('#hdnyear').val();
    var todt =  $('#txtdd').val();
    document.getElementById("rdbMonthly").checked = true;
    var ycheck = 1;
    document.getElementById("txtFrom").value = fromdt;
    document.getElementById("txtTo").value = todt;
    refresh1();
}
function lastfiveyears() {
    var fromdt = $('#hdnfiveyear').val();
    var todt = $('#txtTo').val();
    document.getElementById("txtFrom").value = fromdt;
    document.getElementById("txtTo").value = todt;
    document.getElementById("rdbYearly").checked = true;
    refresh1();
}
function formcomparitive() {
                var fromdt = document.getElementById("txtFrom").value;
                var todt = document.getElementById("txtTo").value;
                var locid = localStorage.locid;
                var wfid = localStorage.currentformid
                var label = localStorage.label;
                var rtype = 'graphgrids';
                var frompage = localStorage.formid;
                var daily = document.getElementById("rdbDaily").checked;
                var monthly = document.getElementById("rdbMonthly").checked;
                var yearly = document.getElementById("rdbYearly").checked;
                var ycheck = 0;
                if (daily == true) {
                    ycheck = 0;
                }
                else if (monthly == true) {
                    ycheck = 1;
                }
                else if (yearly == true) {
                    ycheck = 2
                }
                location.href = "comparative.html?fromdt=" + fromdt + "&todt=" + todt + "&gloc=" + locid + "&type=0&wfid=" + wfid + "&reqtype=compare&rtype=" + rtype + "&label=" + label+"&frompage="+frompage+"&ycheck="+ycheck;
            }
                        function logout(){
                            debugger;
                                          if(localStorage.patapp==="1"){
                  location.href = 'grids.html';
                }else{
//                     localStorage.disback=1;
                 
                     
                var wfid =   $("#hdngraphformid").val();; 
                var frompage =   $("#hdngraphfrompage").val();
                var isGrid3 =   $("#hdngraphfromGrid3").val();
                 if(frompage != 'null' || frompage != " "){
                
                if(isGrid3 == "1"){
                    wfid = frompage;
//                    frompage = "";
                }
                      location.href = "dashboardmenubuttons.html?neosoftmenu=1&wfid="+wfid+"&frompage="+frompage;
                }else{
                    
                    location.href = 'grids.html';
                }
            }
                        }

          
function settings(){
    location.href = 'settings.html'
}
