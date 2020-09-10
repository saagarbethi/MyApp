/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    
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

});
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
$(document).ready(function () {
    
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

});
function closepanel(id){
    document.getElementById(id).style.display = "none";
}
function checkpanel(value){
    
    var kk = value.split(":");
    var panel = kk[0].trim().replace(/ /g,'');
    var boo = kk[1].trim();
    var divid1 = "";
    var divids = document.getElementsByTagName("div");
    for(var i = 0;i < divids.length; i++){
                try{
                    //confirm("id--"+divids[i].id+"--title--"+divids[i].title+"--"+panel);
                    if(divids[i].title != undefined){
                if(divids[i].title == panel.trim()){
                    divid1 = divids[i].id;
                }
            }
            }catch(err){}
            }
            var tablenm = "tabgrd"+divid1.replace("div_","tab_");
//            $( '#'+divid1 ).on( 'keydown', function ( e ) {
//    if ( e.keyCode === 27 ) { // ESC
//        $( '#'+divid1 ).hide();
//    }
//});

            if(boo == "true"){
            document.getElementById(divid1).style.display = 'block';
            $("#"+divid1).css({"height":"80%", "width":"90%","position":"fixed",overflow:"auto"});
            $("#"+divid1).css({"left":"2%", "top":"10%","z-index":"999"});
            $("#"+divid1).css({"margin":"1% auto", "background":"white","filter":"alpha(opacity=70)"});
            $("#"+divid1).css({"opacity":"1"});
            $("#"+divid1).css({"boarder":"thin"});
            $("#"+divid1).css('border', '3px solid #ccc');
            $('#'+divid1).css('draggable','true');
            var d = document.getElementById(divid1);
            d.addEventListener("keypress",    function(e){e.keyCode==27 &&(d.style.display="none")},false);
        }else{
            document.getElementById(divid1).style.display = 'none';
        }
            //$(".grdtable").css({"background":"#fff"});
//            height:100%;
//                width:99.5%;
//                position:absolute;
//                left:2px;
//                top:0px;
//                padding:20% 45% 30% 45%;
//                background:black;
//                filter:alpha(opacity=70);
//                opacity:0.7;
//                z-index : 9999;
//    var dialog = $("#"+divid1).dialog({
//                        resizable: false,
//                        height: 'auto',
//                        width: 'auto',
//                        modal: true,
//                        close: function() {
////                            $(dialog).dialog("close");
//                        },
//                        buttons: {
//                            "Close":  function(){
//                                $(dialog).dialog("close");
//                            }
//                        }
//                    });
}
function setStyle(data,inptype){
    ;
    var ids = data.split(":");
    var id = ids[0].trim();
    var isrow = 0;
            if(id.indexOf("_row")!= -1){
                id = id.replace("_row","");
                isrow = 1;
            }
    var result = ids[1].trim().split('!');
    for(var s = 0 ; s < result.length; s++){
        var res = result[s].split("~");
        if(inptype != "grid"){
        $('#'+id.replace("$","")).css(res[0].trim(), res[1].trim());
    }
        else{
            //loop for grid style
            var proptype = res[0];
            var propvalue = res[1];
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
            
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            var isexists = 0;
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
                    continue;
                }
                if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == id.replace("txtdt", "txtdtgrd").replace("txttm", "txttmgrd").replace("$", "").trim()) {
                    isexists = 1;
                     //confirm(id.replace("txtdt", "txtdtgrd"));
                    if(proptype.toString().toLowerCase().replace(/ /g,'') == "color"){
                        if(isrow == 0){
                    oTable.rows[rownum].cells[km].childNodes[0].style.color = propvalue;
                }else{
                    oTable.rows[rownum].style.color = propvalue;
                }
                }
                    else if(proptype.toString().toLowerCase().replace(/ /g,'') == "font-size"){
                        if(isrow == 0){
                        oTable.rows[rownum].cells[km].childNodes[0].style.fontSize = propvalue;
                    }else{
                        oTable.rows[rownum].style.fontSize = propvalue;
                    }
                    }else if(proptype.toString().toLowerCase().replace(/ /g,'') == "width"){
                        if(isrow == 0){
                        oTable.rows[rownum].cells[km].childNodes[0].style.width = propvalue;
                    }else{
                        oTable.rows[rownum].style.width = propvalue;
                    }
                    }else if(proptype.toString().toLowerCase().replace(/ /g,'') == "background-color"){
                        if(isrow == 0){
                        oTable.rows[rownum].cells[km].childNodes[0].style.backgroundColor = propvalue;
                    }else{
                        oTable.rows[rownum].style.backgroundColor = propvalue;
                    }
                    }
                }
            }
            if(isexists == 0){
                $('#'+id.replace("$","")).css(proptype.toString(), propvalue);
            }
        }
    }
}
function setgridvalues(key,value){
    var res = key.split(":");
    var result = "";
    var gridnm = res[1].trim();
    var data = res[0].trim();
    var data = data.replace("$","");
    var idtype = 0;
    if(data.indexOf(".")){
        var dt = data.split(".");
        data = dt[0];
        if(dt[1] == "id"){
            idtype = 1;
        }
    }
    var tableid = gridnm.replace("grd_","tab_dyna_");
    var oTable = document.getElementById(tableid);
    var rowLength = oTable.rows.length;
    var sumtype = 0;
    
    var oCells = oTable.rows.item(rowLength-1).cells;
        var celLength = oCells.length;
        for (var km = 2; km < celLength; km++) {
            if(oTable.rows[rowLength-1].cells[km].childNodes[0].id.trim() == data){
                if(idtype == 1){
                    oTable.rows[rowLength-1].cells[km].childNodes[0].title = value;
                }else{
                 oTable.rows[rowLength-1].cells[km].childNodes[0].value = value;
            }
            oTable.rows[rowLength-1].cells[km].childNodes[0].onchange();
            }
        }
}
function clearGrid() {
    var tablist = document.getElementsByTagName("table");
    var griddetails = "";
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var t = tablist[k].title.split("@@@");
            var gridid = t[0];
            var gridtype = t[1];
            var qrycolnum;
            if (gridtype == "QueryRowsQueryCols" || gridtype == "UserRowsQueryCols") {
                qrycolnum = t[2];
            }
            griddetails = griddetails + "@@##@@@" + tabid + ",!" + gridid + ",!" + gridtype + ",!" + qrycolnum;
            var oTable = document.getElementById(tabid);
            var rowLength = oTable.rows.length;
            if (gridtype == "QueryRowsFixedCols" || gridtype == "QueryRowsQueryCols") {
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i != 0) {
                        var j = 2;
                        if (gridtype == "QueryRowsQueryCols") {
                            var j = parseInt(qrycolnum) + 1;
                        }
                        for (j; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            var idchck = oTable.rows[i].cells[j].childNodes[0].id;
                            if (idchck.indexOf("chkbox") == 0) {
                                oTable.rows[i].cells[j].childNodes[0].checked = false;
                            }
                            if (type == "INPUT") {
                                oTable.rows[i].cells[j].childNodes[0].value = "";
                            }
                        }
                    }
                }
            }
            if (gridtype == "UserRowsQueryCols" || gridtype == "UserRowsFixedCols") {
                for (i = rowLength; i >= 2; i--) {
                    $('#' + tabid + " tr:eq('" + i + "')").remove();
                }
                var oCells = oTable.rows.item(1).cells;
                var celLength = oCells.length;
                for (j = 0; j < celLength; j++)
                {
                    var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                    var value = "";
                    try {
                        var idchk = oTable.rows[1].cells[j].childNodes[0].id;
                        if (idchk.indexOf("_searchid") != -1) {
                            oTable.rows[1].cells[j].childNodes[0].title = "";
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                        }
                        else if (idchk.indexOf("chkbox") == 0) {
                            oTable.rows[1].cells[j].childNodes[0].checked = false;
                        } else if (idchk.indexOf("sel") == 0) {
                            value = oTable.rows[1].cells[j].childNodes[0].title;
                            var pselect = oTable.rows[1].cells[j].childNodes[0];
                            for (var chki = 0; chki < pselect.options.length; chki++) {
                                var val = pselect.options[chki].innerHTML;
                                if (val == value) {
                                    pselect.selectedIndex = chki;
                                    break;
                                }
                            }
                        }
                        else {
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                            try {
                                oTable.rows[1].cells[j].childNodes[0].onkeyup();
                                if(oTable.rows[1].cells[j].childNodes[0].id.indexOf("txtdtgrd") == 0){
                                var appdt = $('#'+oTable.rows[1].cells[j].childNodes[0].id).attr("applydate");
                    if(appdt == "0")
                    oTable.rows[1].cells[j].childNodes[0].value = $('#dd').val();
            }
                            } catch (err) {

                            }
                        }
                    } catch (err) {

                    }
                }

            }
        }         
    }
}
function clearOneGrid(id) {
    var tablist = document.getElementsByTagName("table");
    var griddetails = "";
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if(tabid.replace("tab_dyna_","").replace(/_/g,"") == id.replace("$","").replace("grd_","")){
        if (tabid.indexOf("tab_dyna") != -1) {
            var t = tablist[k].title.split("@@@");
            var gridid = t[0];
            var gridtype = t[1];
            var qrycolnum;
            if (gridtype == "QueryRowsQueryCols" || gridtype == "UserRowsQueryCols") {
                qrycolnum = t[2];
            }
            griddetails = griddetails + "@@##@@@" + tabid + ",!" + gridid + ",!" + gridtype + ",!" + qrycolnum;
            var oTable = document.getElementById(tabid);
            var rowLength = oTable.rows.length;
            if (gridtype == "QueryRowsFixedCols" || gridtype == "QueryRowsQueryCols") {
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i != 0) {
                        var j = 2;
                        if (gridtype == "QueryRowsQueryCols") {
                            var j = parseInt(qrycolnum) + 1;
                        }
                        for (j; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            var idchck = oTable.rows[i].cells[j].childNodes[0].id;
                            if (idchck.indexOf("chkbox") == 0) {
                                oTable.rows[i].cells[j].childNodes[0].checked = false;
                            }
                            if (type == "INPUT") {
                                oTable.rows[i].cells[j].childNodes[0].value = "";
                            }
                        }
                    }
                }
            }
            if (gridtype == "UserRowsQueryCols" || gridtype == "UserRowsFixedCols") {
                for (i = rowLength; i >= 2; i--) {
                    $('#' + tabid + " tr:eq('" + i + "')").remove();
                }
                var oCells = oTable.rows.item(1).cells;
                var celLength = oCells.length;
                for (j = 0; j < celLength; j++)
                {
                    var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                    var value = "";
                    try {
                        var idchk = oTable.rows[1].cells[j].childNodes[0].id;
                        if (idchk.indexOf("_searchid") != -1) {
                            oTable.rows[1].cells[j].childNodes[0].title = "";
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                        }
                        else if (idchk.indexOf("chkbox") == 0) {
                            oTable.rows[1].cells[j].childNodes[0].checked = false;
                        } else if (idchk.indexOf("sel") == 0) {
                            value = oTable.rows[1].cells[j].childNodes[0].title;
                            var pselect = oTable.rows[1].cells[j].childNodes[0];
                            for (var chki = 0; chki < pselect.options.length; chki++) {
                                var val = pselect.options[chki].innerHTML;
                                if (val == value) {
                                    pselect.selectedIndex = chki;
                                    break;
                                }
                            }
                        }
                        else {
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                            try {
                                oTable.rows[1].cells[j].childNodes[0].onkeyup();
                            } catch (err) {

                            }
                        }
                    } catch (err) {

                    }
                }

            }
        }
    }
    }
}
function isHeadField(framerowid) {
    //var changedata = data;
    
    var isHeadField = 0;
    framerowid = framerowid.replace(".id","").replace(".value","").replace("$","").trim();
    framerowid = replaceFunction(framerowid, "dollorsymbol", "");
    framerowid = replaceFunction(framerowid, "`", "");
    framerowid = replaceFunction(framerowid, "'", "");
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    var tablist = document.getElementsByTagName("table");
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
            try {
                tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
                document.getElementById(tid);
            } catch (err) {
                continue;
            }
        }else if(tabid.indexOf("tabgrd") == 0){
            try {
                tables.push(tabid);
            } catch (err) {
                continue;
            }
        }
    }
    for (var ta = 0; ta < tables.length; ta++) {
        var table = document.getElementById(tables[ta]);
        var textbox = table.getElementsByTagName("input");
        var dropdown = table.getElementsByTagName("select");
        var checkbox = table.getElementsByTagName("checkbox");
        var textarea = table.getElementsByTagName("textarea");
        for (var i = 0; i < textbox.length; i++) {
            if(textbox[i].type == "radio"){
                if(framerowid == textbox[i].name){
                isHeadField = 1;
                return isHeadField;
            }
            }else{
            if(framerowid == textbox[i].id){
                isHeadField = 1;
                return isHeadField;
            }
        }
        }
        for (var i = 0; i < dropdown.length; i++) {
           if(framerowid == dropdown[i].id){
                isHeadField = 1;
                return isHeadField;
            }
        }
        for (var i = 0; i < textarea.length; i++) {
            if(framerowid == textarea[i].id){
                isHeadField = 1;
                return isHeadField;
            }
        }
        for (var i = 0; i < checkbox.length; i++) {
            if(framerowid == textarea[i].id){
                isHeadField = 1;
                return isHeadField;
            }
        }
    }
    return isHeadField;
}
function setValue(key, value, inptype) {
 ;
 if(value == undefined){
     return false;
 }
// $('#userwiselog').val($('#userwiselog').val() +"\n"+$('#currentdate').val()+ " "+gettime(new Date)+" setvalue function is called with key "+key+" value is "+value);      
//    getlogdata("~@#"+key+"!!,"+value+"!!,"+inptype+"!!,"+$('#curtable').val()+"!!,"+$('#currow').val());
     try {
        key = key.trim();
        if(key == "STYLE"){
            setStyle(value,inptype);
            return false;
        }
        if(key == "SHOWPANEL"){
            checkpanel(value);
            return false;
        }
        if(key.trim() == "OPENFORM"){
            if(inptype="grid" && value.trim().indexOf("wf") != 0){
               // alert("before going");
                changefunctiongridbtn(id, '','','','',value,"grid");
            }else{
            openform(value);
        }
             return false;
        }
        if(key.indexOf(":")!= -1){
            if(key.indexOf("grd_")!= -1){
                setgridvalues(key,value);
                return false;
            }
        }
        key = key.trim().replace("$","");
        var chkid = key;
        if (key.trim() == "CLEARGRID") {
            if ($('#txtSaveType').val().trim() == 'new'){
                value = value.trim();
                if(value != ""){
                    clearOneGrid(value);
                }else{
                clearGrid();
            }
            }else{
                value = value.trim();
                if(value != ""){
                    clearOneGrid(value);
                }
            }
            return false;
        }
        if (value.toString() == 'NaN' || value == NaN) {
            value = "";
        }
        var ext = "";
        if (key.replace("$", "").indexOf("lbl") == 0) {
            key = key.replace("$", "").trim();
             value = replacehead(value);
            document.getElementById(key).innerHTML = value.trim();
            return false;
        }
        if (key.indexOf(".") != -1) {
            var ch = key.split(".");
            chkid = ch[0];
            ext = ch[1];
        } else {
            chkid = key;
            ext == "";
        }
        if(inptype !='grid'){
            if (chkid != "MSG" && chkid != "READONLY" && chkid != "CLEARGRID" && chkid != "DISPLAY" && chkid != "KEYUP" && chkid != "INWORDS" && chkid != "FOCUS" && chkid != "STYLE" && chkid != "CONFIRMMSG"){
                var isheadfield = isHeadField(chkid);
//        if(chkid == "txtpkgflg")
//        confirm(isheadfield+"--"+chkid);
        if(isheadfield == 0){
            try{
            var tableid = $('#curtable').val();
            var oTable = document.getElementById(tableid);
            if(tableid.trim() != ""){
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            inptype = "grid";
        }
        }catch(err){
            
        }
        }
            }else{
                if(chkid != "INWORDS" && chkid != "CLEARGRID"){
                var rowid = "";
                if(value.indexOf(":") != -1){
                var ids = value.split(":");
                if(chkid == "CONFIRMMSG"){
                    rowid = ids[1].trim();
                }else{
                rowid = ids[0];
            }
                if(rowid.trim().indexOf("tr") == 0 && rowid.replace("tr","").trim().indexOf("textbox") ==0){
                    rowid = rowid.replace("tr","");
                }
                else if(rowid.trim().indexOf("tr") == 0 ){
                    rowid = rowid.replace("tr","txt");
                }    
            }else{
                rowid = value.trim();
            }
                
                        try{
                var isheadfield = isHeadField(rowid);
//        if(chkid == "txtpkgflg")
//        confirm(isheadfield+"--"+chkid);
        if(isheadfield == 0){
            
            var tableid = $('#curtable').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
            if(tableid.trim() != ""){
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            inptype = "grid";
        }}
            }catch(err){
            
        }
    }
    }
    }
        if (inptype == "grid") {
            try {
                document.getElementById(chkid.replace("grdsum_", "")).tagName
            } catch (err) {
                chkid = chkid.replace("txtdt", "txtdtgrd");
                chkid = chkid.replace("txttm", "txttmgrd");
            }
        }
        chkid = chkid.replace("$", "");
        chkid = chkid.replace("`", "");
        if (key.trim() == "MSG" && inptype == "grid") {
            
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var idtitle = "", idvalue = "";
            var fdata = value;
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
                    continue;
                }
                var orgid = oTable.rows[rownum].cells[km].childNodes[0].id;
                var ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                var orgid = orgid.replace("txtdtgrd", "txtdt").replace(/[0-9]/g, '');
                var orgid = orgid.replace("txttmgrd", "txttm").replace(/[0-9]/g, '');
                if (ctype == "Combo" || ctype == "Radio") {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].value;
                    var e = oTable.rows[rownum].cells[km].childNodes[0];
                    idvalue = e.options[e.selectedIndex].text;
                } else {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].title;
                    idvalue = oTable.rows[rownum].cells[km].childNodes[0].value;
                }
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".id", idtitle);
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".value", idvalue);
//                                    data = data.replace("$"+chkid+".id",idtitle);
//                                    data = data.replace("$"+chkid+".value",idvalue)
            }
            value = fdata;
            value = replacehead(value);
            alert(value);
            return false;
        }
        else if (key.trim() == "CONFIRMMSG" && inptype == "grid") {

            var kk = value.split(":");
            var chk = confirm(kk[0]);
            
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == kk[1].replace("$", "").trim()) {
                    if (chk == true) {
                        oTable.rows[rownum].cells[km].childNodes[0].value = 1;
                    } else {
                        oTable.rows[rownum].cells[km].childNodes[0].value = 0;
                    }
                    oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                    oTable.rows[rownum].cells[km].childNodes[0].onchange();
                }
            }
            //alert("chk---"+chk);
            return false;
        } else if (key.trim() == "REPLACEMSG" && inptype == "grid") {
            //alert(value);
            //document.getElementById("medreplace").style.dispaly = 'block';
            if($('#loopprocess').val() == '1'){
                 var medrepfields = value.split(":");
                            var curmedid = medrepfields[1].trim();
                            var repmedid = medrepfields[2].trim();
            var jkl = $('#replacedata').val();
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
             $('#replacedata').val(jkl+tableid+",!"+rownum+",!"+$('#reprowid').val()+"@@@");
             return false;
            }
             var medchk = "";
             var fieldlength = value.split(":").length;
             var medreplace = value.split(":");
             //if($('#loopprocess').val() != '1'){
             if(fieldlength > 3) {
                 var valuerep = medreplace[3];
                 var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var idtitle = "", idvalue = "";
            var fdata = valuerep;
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
                    continue;
                }
                var orgid = oTable.rows[rownum].cells[km].childNodes[0].id;
                var ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                var orgid = orgid.replace("txtdtgrd", "txtdt").replace(/[0-9]/g, '');
                var orgid = orgid.replace("txttmgrd", "txttm").replace(/[0-9]/g, '');
                if (ctype == "Combo" || ctype == "Radio") {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].value;
                    var e = oTable.rows[rownum].cells[km].childNodes[0];
                    idvalue = e.options[e.selectedIndex].text;
                } else {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].title;
                    idvalue = oTable.rows[rownum].cells[km].childNodes[0].value;
                }
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".id", idtitle);
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".value", idvalue);
//                                    data = data.replace("$"+chkid+".id",idtitle);
//                                    data = data.replace("$"+chkid+".value",idvalue)
            }
            valuerep = fdata;
            
             //if($('#loopprocess').val() != '1'){
                 valuerep = replacehead(valuerep);
                  medchk = confirm(valuerep); 
             }else{
                  medchk = confirm("No Stock Available! , Do You Want to replace"); 
             }
            if (medchk == true) {
                $('#medreplaceqry').val(value);
                $('#medreplaceid').val("");
                if($('#isreplaceopen').val() != "1"){
                 $('#medrepcol').val($('#currow').val());
             }
             var width = $(window).width()-20;
                document.getElementById('medreplaceid').title = "";
                var dialog = $("#medreplace").dialog({
                    resizable: false,
                    height: 'auto',
                    width: "auto",
                    modal: true,
                    title: "Medicine Replacement",
                    close: function () {
                        $(dialog).dialog("close");
                        $('#btnsave').removeAttr('disabled');
                        //replacedata();
                        $('#isreplaceopen').val("0");
                        $('#isreplaceopen').val("0");
                            if($('#replacedata').val().trim() == "" && $('#batchdata').val().trim() != ""){
                                    batchdata();
                            }
                    },
                    buttons: [{
                            text :"Close",id:"buttonclos",class:"btn btn-danger",click : function(){
                               $(dialog).dialog("close");
                            $('#btnsave').removeAttr('disabled');
                            $('#isreplaceopen').val("0");replacedata();
                            }},{
                        text :"OK",id:"medok",class:"btn btn-success",click : function(){
                              if(document.getElementById("medreplaceid").value == "" || document.getElementById("medreplaceid").title == ""){
                                  confirm("Please select any Item");
                                  document.getElementById("medreplaceid").focus();
                                  return false;
                              }
                              $(dialog).dialog("close");
                            var qry = $('#medreplaceqry').val();
                            var medrepfields = qry.split(":");
                            var curmedid = medrepfields[1].trim();
                            var repmedid = medrepfields[2].trim();
                            var value = document.getElementById("medreplaceid").value;
                            var key = document.getElementById("medreplaceid").title;
                            var curid = document.getElementById(curmedid).title;
                            var tableid = $('#curtable').val();
                            var rownum = $('#medrepcol').val();
                            var oTable = document.getElementById(tableid);
                            //var oCells = oTable.rows.item(rownum).cells;
                             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                            var celLength = oCells.length;
                            var val = "";
                            var isexists = 0;
                            for (var km = 2; km < celLength; km++) {
                                if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == curmedid) {
                                     var curid = oTable.rows[rownum].cells[km].childNodes[0].title;
                                }
                               if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == repmedid) {
                                    isexists = 1;
                                    try {

                                        oTable.rows[rownum].cells[km].childNodes[0].value = curid;
                                    } catch (err) {
                                        alert("Problem in Medreplacement --" + curmedid + "--" + repmedid)
                                    }
                                }
                            }
                            for (var km = 2; km < celLength; km++) {
                                if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == curmedid) {
                                    isexists = 1;
                                    try {
                                        oTable.rows[rownum].cells[km].childNodes[0].title = key;
                                        oTable.rows[rownum].cells[km].childNodes[0].value = value;
                                        $('#curkeycode').val("0");
                                        oTable.rows[rownum].cells[km].childNodes[0].onchange();
                                    } catch (err) {
                                        alert(err+"Problem in Medreplacement --" + curmedid + "--" + repmedid)
                                    }
                                }
                            }
                            //replacedata();
                            $('#isreplaceopen').val("0");
//                            if($('#replacedata').val().trim() == "" && $('#batchdata').val().trim() != ""){
//                                    batchdata();
//                            }
                        }}
                    ]
//                    buttons: {
//                        "Close": function () {
//                            $(dialog).dialog("close");
//                            $('#btnsave').removeAttr('disabled');
//                        },
//                        "Ok": function () {
//                            $(dialog).dialog("close");
//                            var qry = $('#medreplaceqry').val();
//                            var medrepfields = qry.split(":");
//                            var curmedid = medrepfields[1].trim();
//                            var repmedid = medrepfields[2].trim();
//                            var value = document.getElementById("medreplaceid").value;
//                            var key = document.getElementById("medreplaceid").title;
//                            var curid = document.getElementById(curmedid).title;
//                            var tableid = $('#curtable').val();
//                            var rownum = $('#currow').val();
//                            var oTable = document.getElementById(tableid);
//                            var oCells = oTable.rows.item(rownum).cells;
//                            var celLength = oCells.length;
//                            var val = "";
//                            var isexists = 0;
//                            for (var km = 2; km < celLength; km++) {
//                                if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == repmedid) {
//                                    isexists = 1;
//                                    try {
//
//                                        oTable.rows[rownum].cells[km].childNodes[0].value = curid;
//                                    } catch (err) {
//                                        alert("Problem in Medreplacement --" + curmedid + "--" + repmedid)
//                                    }
//                                }
//                            }
//                            for (var km = 2; km < celLength; km++) {
//                                if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == curmedid) {
//                                    isexists = 1;
//                                    try {
//                                        oTable.rows[rownum].cells[km].childNodes[0].title = key;
//                                        oTable.rows[rownum].cells[km].childNodes[0].value = value;
//                                        oTable.rows[rownum].cells[km].childNodes[0].onchange();
//                                    } catch (err) {
//                                        alert("Problem in Medreplacement --" + curmedid + "--" + repmedid)
//                                    }
//                                }
//                            }
////        var curid = document.getElementById(curmedid).title;
////        document.getElementById(repmedid).value = curid;
////        document.getElementById(curmedid).value = value;
////        document.getElementById(curmedid).title = key;
//                            //document.getElementById(repmedid).onchange();
//                        }
//                    }
                });
            }else{
                $('#isreplaceopen').val("0");replacedata();
                if($('#replacedata').val().trim() == "" && $('#batchdata').val().trim() != ""){
                                    batchdata();
                            }
            }
            
            return false;
        }
        else if (key.trim() == "BATCHMSG") {
            var qty = $('#curcolval').val();
            var qtyid = $('#curcolid').val();
            //var qty = getFormulaValue()
            //qty = $('#'+qtyid).val();
            var curfield = "";
            if (value.indexOf(":") != -1) {
                var val = value.split(":");
                value = val[0];
                curfield = val[1];
            }
            $('#curkeycode').val("1");
            var fdata = value;
            var tableid = $('#curtable').val();
                            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            //fdata = replaceLabelvaluesgrid("getvalue=="+fdata, rownum, tableid).replace("getvalue==","").replace("^","").trim();
            if($('#loopprocess').val() != '1'){
                if(($('#replacedata').val().trim() == "" && $('#isreplaceopen').val() != "1") && $('#medreplace').is(":visible") == false){
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
                    continue;
                }
                var orgid = oTable.rows[rownum].cells[km].childNodes[0].id;
                var ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                var orgid = orgid.replace("txtdtgrd", "txtdt").replace(/[0-9]/g, '');
                var orgid = orgid.replace("txttmgrd", "txttm").replace(/[0-9]/g, '');
                if (ctype == "Combo" || ctype == "Radio") {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].value;
                    var e = oTable.rows[rownum].cells[km].childNodes[0];
                    idvalue = e.options[e.selectedIndex].text;
                } else {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].title;
                    idvalue = oTable.rows[rownum].cells[km].childNodes[0].value;
                }
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".id", idtitle);
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".value", idvalue);
//                                    data = data.replace("$"+chkid+".id",idtitle);
//                                    data = data.replace("$"+chkid+".value",idvalue)
            }
            value = fdata;
            value = replacehead(value);
            //alert($('#batchprevious').val() +"=="+ rownum+""+chkid+qty);
            if($('#batchprevious').val() == rownum+""+chkid+qty){
                return false;
            }
            var totqty = window.prompt(value, qty);
            if(totqty != null){
                if(totqty < 0){
                    confirm("-ve field not allowed");
                    while(1){
                     totqty = window.prompt(value, qty);
                     if(totqty ==null){
                         break;
                     }else if(totqty >= 0){
                         break;
                     }else if(totqty < 0){
                         confirm("-ve field not allowed");
                     }
                 }
                }
            }
            if (totqty == null) {
                var tableid = $('#curtable').val();
               // var rownum = $('#currow').val();
                var oTable = document.getElementById(tableid);
                //var oCells = oTable.rows.item(rownum).cells;
                 try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                var celLength = oCells.length;
                var val = "";
                var chkid = qtyid;
                $('#curkeycode').val("0")
                for (var km = 2; km < celLength; km++) {
                    if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                        isexists = 1;
                        try {
                            oTable.rows[rownum].cells[km].childNodes[0].value = '';
                            oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                        } catch (err) {

                        }
                    }
                }
                batchdata();
            } else {
                $('#batchprevious').val(rownum+""+chkid+totqty);
                $('#curkeycode').val("0")
                var tableid = $('#curtable').val();
                var oTable = document.getElementById(tableid);
                //var oCells = oTable.rows.item(rownum).cells;
                 try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                var celLength = oCells.length;
                var val = "";
                var chkid = qtyid;
                for (var km = 2; km < celLength; km++) {
                    if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                        isexists = 1;
                        try {
                            oTable.rows[rownum].cells[km].childNodes[0].value = totqty;
                            $('#curkeycode').val("0");
                            //oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                            var isFirefox = typeof InstallTrigger !== 'undefined';
//                            if(oTable.rows[rownum].cells[km].childNodes[0].id == "txtIssueQty"){
//                            var da = $('#allids').val();
//                $('#allids').val(da+","+rownum+"--"+totqty);
//                            }
                                       if (isFirefox) {
                                           try{
                                if (oTable.rows[rownum].cells[km + 1].childNodes[0].style.display == "none" || oTable.rows[rownum].cells[km + 1].childNodes[0].style.display == "") {
                                    var jk = 2;
                                    while(1){
                                    if(oTable.rows[rownum].cells[km + jk].childNodes[0].style.display== "none" || oTable.rows[rownum].cells[km + jk].childNodes[0].style.display== ""){
                                        jk++;
                                    }else{
                                    oTable.rows[rownum].cells[km + jk].childNodes[0].focus();
                                    //alert(oTable.rows[rownum].cells[km + jk].childNodes[0].id);
                                    break;
                                }
                                if(jk == celLength -1){
                                    break;
                                }else if(jk >14){
                                    break;
                                }
                                
                            }
                                } else {
                                    oTable.rows[rownum].cells[km + 1].childNodes[0].focus();
                                    //alert(oTable.rows[rownum].cells[km + 1].childNodes[0].id);
                                   // alert("in first only");
                                }
                            }catch(err){}
                                oTable.rows[rownum].cells[km].childNodes[0].onchange();
                            } else {
                                oTable.rows[rownum].cells[km].childNodes[0].onchange();
                            }
                            break;
                        } catch (err) {
alert(err);
                        }
                    }
                }
            }
        }else{
            var jkl = $('#batchdata').val();
//            if(jkl == ""){
//                $('#batchdata').val(tableid+",!"+rownum+",!"+qtyid);
//            }else{          
            $('#batchdata').val(jkl+tableid+",!"+rownum+",!"+qtyid+"@@@");
        }
        }else{
            var jkl = $('#batchdata').val();
//            if(jkl == ""){
//                $('#batchdata').val(tableid+",!"+rownum+",!"+qtyid);
//            }else{
            $('#batchdata').val(jkl+tableid+",!"+rownum+",!"+qtyid+"@@@");
        //}
        }
            return false;
        } else if (key.trim() == "READONLY" && inptype == "grid") {
            var ids = value.split(":");
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            var isdt = 0;
            if(ids[0].replace("$", "").trim().indexOf("txtdt") == 0){
                    ids[0] = ids[0].replace("txtdt", "txtdtgrd");
                    isdt = 1;
                }else if(ids[0].replace("$", "").trim().indexOf("txttm") == 0){
                    ids[0] = ids[0].replace("txttm", "txttmgrd");
                    isdt = 1;
                }
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == ids[0].replace("$", "").trim()) {
                    if (ids[1].trim() == "false")
                        oTable.rows[rownum].cells[km].childNodes[0].readOnly = false;
                    else if (ids[1].trim() == "true")
                        oTable.rows[rownum].cells[km].childNodes[0].readOnly = true;
                    try{if(isdt == 1){
                        if (ids[1].trim() == "false")
                        oTable.rows[rownum].cells[km].childNodes[0].disabled = false;
                    else if (ids[1].trim() == "true")
                        oTable.rows[rownum].cells[km].childNodes[0].disabled = true;
                    }}catch(err){}
                    var ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                    
                    if (ctype == "Combo" || ctype == "Radio" || ctype == "Checkbox") {
                        if (ids[1].trim() == "false")
                            oTable.rows[rownum].cells[km].childNodes[0].disabled = false;
                        else if (ids[1].trim() == "true")
                            oTable.rows[rownum].cells[km].childNodes[0].disabled = true;
                    }
                    if(ctype == "SearchText"){
                       if (ids[1].trim() == "false")
                        oTable.rows[rownum].cells[km].childNodes[1].disabled = false;
                        else if (ids[1].trim() == "true")   
                         oTable.rows[rownum].cells[km].childNodes[1].disabled = true;
                    }
                }
            }
            return false;
        }
        else if (key.trim() == "FOCUS" && inptype == "grid") {
            var ids = value.split(":");
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == ids[0].replace("$", "").trim()) {
                    oTable.rows[rownum].cells[km].childNodes[0].focus();
                }
            }
            return false;
        }
        else if (key.trim() == "DISPLAY" && inptype == "grid") {
            var ids = value.split(":");
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            var isexists = 0;
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == ids[0].replace("txtdt", "txtdtgrd").replace("txttm", "txttmgrd").replace("$", "").trim()) {
                    isexists = 1;
                    if (ids[1].trim() == "false") {
                        oTable.rows[rownum].cells[km].childNodes[0].style.display = "none";
                        if (oTable.rows[rownum].cells[km].childNodes[0].id.indexOf("_searchid") != -1) {
                            oTable.rows[rownum].cells[km].childNodes[1].style.display = "none";
                        }
                    }
                    else if (ids[1].trim() == "true") {
                        oTable.rows[rownum].cells[km].childNodes[0].style.display = "inline-block";
                        if (oTable.rows[rownum].cells[km].childNodes[0].id.indexOf("_searchid") != -1) {
                            oTable.rows[rownum].cells[km].childNodes[1].style.display = "inline-block";
                        }
                    }
                }
                 if (oTable.rows[0].cells[km].id.replace(/[0-9]/g, '') == ids[0].replace("$", "").trim()) {
                      if (ids[1].trim() == "false") {
                          for(var vb=0;vb<oTable.rows.length;vb++){
                              oTable.rows[vb].cells[km].style.display = "none";
                          }
                      } else if (ids[1].trim() == "true") {
                          for(var vb=0;vb<oTable.rows.length;vb++){
                              oTable.rows[vb].cells[km].style.visibility = "";
                               $('td:nth-child('+km+')').show();
                          }
                      }
                 }
            }
            if (isexists == 0) {
                var ids = value.split(":");
                if (ids[1].trim() == "false") {
                    $('#' + ids[0].trim()).hide();
                }else if(ids[1].trim() == "true"){
                    $('#' + ids[0].trim()).show();
                }
                tddisplay();
            }
            return false;
        } else if (key.trim() == "KEYUP" && inptype == "grid") {
            var tableid = $('#curtable').val();
            var rownum = $('#currow').val();
            var oTable = document.getElementById(tableid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            var isexists = 0;
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == value.trim().replace("$", "").trim()) {
                    isexists = 1;
                    oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                }
            }
            if (isexists == 0) {
                $("#" + value.trim().replace("$", "")).keydown();
            }
            return false;
        }
        if (key.trim() == "MSG") {
            value = replacehead(value);
            alert(value);
            return false;
        } else if (key.trim() == "CONFIRMMSG") {
            //value = replacehead(value);
            var kk = value.split(":");
            var chk = confirm(kk[0]);
             //confirm("clickedjjj"+chk+"--"+kk[1]);
             
            if (chk == true) {
                document.getElementById(kk[1].replace("$", "").trim()).value = 1;
            } else {
                document.getElementById(kk[1].replace("$", "").trim()).value = 0;
            }
            document.getElementById(kk[1].replace("$", "").trim()).onkeyup();
            document.getElementById(kk[1].replace("$", "").trim()).onchange();
            return false;
        } else if (key.trim() == "REPLACEMSG") {
            //alert("did")
        }
        else if (key.trim() == "DISPLAY") {
            var ids = value.split(":");
            try {
                document.getElementById(ids[0].trim()).value;
            } catch (err) {
                ids[0] = ids[0].trim().replace("txtdt", "txtdtgrd");
                ids[0] = ids[0].trim().replace("txttm", "txttmgrd");
                //alert(ids[0].trim());
            }
            if (ids[1].trim() == "false") {
                $('#' +  ids[0].trim().replace("$", "")).hide();
            }
            else if (ids[1].trim() == "true") {
                $('#' + ids[0].trim().replace("$", "")).show();
            }
            tddisplay(ids[0]);
            return false;
        }
        else if (key.trim() == "FOCUS") {

            var ids = value.split(":");
            $('#' + ids[0].replace("$", "").trim()).focus();
            return false;
        }
        else if (key.trim() == "READONLY") {
            var ids = value.split(":");
            if (ids[1].trim() == "false") {
                try {
                    document.getElementById(ids[0].replace("$", "").trim()).readOnly = false;
                    if (ids[0].indexOf("txtdob") == 0 || ids[0].indexOf("txtdob") == 0) {
                        document.getElementById(ids[0].replace("$", "").trim()).disabled = false;
                        try{
                        var repid = ids[0].replace("$", "").replace("txtdob","").trim();
                        document.getElementById("txtYears"+repid).disabled = false;
                        document.getElementById("txtMonths"+repid).disabled = false;
                        document.getElementById("txtDays"+repid).disabled = false;
                    }catch(err){
                        
                    }
                    } else if ($('#' + ids[0].replace("$", "").trim()).attr('controltype') == "Date") {
                        document.getElementById(ids[0].replace("$", "").trim()).disabled = false;
                    }
                    else if ($('#' + ids[0].replace("$", "").trim()).attr('controltype') == "SearchText") {
                     try{  var id= ids[0].replace("txt", "btnsearch")
                        document.getElementById(id.replace("$", "").trim()).disabled = false;
                    }catch(err){}
                    }else if($('#' + ids[0].replace("$", "").trim()).attr('controltype') == "Checkbox"){
                        document.getElementById(ids[0].replace("$", "").trim()).disabled = false;
                    }
                    if (ids[0].replace("$", "").trim().indexOf("sel") == 0) {
                        $('#' + ids[0].replace("$", "").trim() + ':not(:selected)').attr('disabled', false);
                    }
                } catch (err) {

                }
            }
            else if (ids[1].trim() == "true") {
                try {
                    document.getElementById(ids[0].replace("$", "").trim()).readOnly = true;
                    if (ids[0].replace("$", "").trim().indexOf("txtdob") == 0 || ids[0].indexOf("txtst") == 0) {
                        document.getElementById(ids[0].replace("$", "").trim()).disabled = true;
                         try{
                        var repid = ids[0].replace("$", "").replace("txtdob","").trim();
                        document.getElementById("txtYears"+repid).disabled = true;
                        document.getElementById("txtMonths"+repid).disabled = true;
                        document.getElementById("txtDays"+repid).disabled = true;
                    }catch(err){
                        
                    }
                    } else if ($('#' + ids[0].replace("$", "").trim()).attr('controltype') == "Date") {
                        document.getElementById(ids[0].replace("$", "").trim()).disabled = true;
                    }
                     else if ($('#' + ids[0].replace("$", "").trim()).attr('controltype') == "SearchText") {
                       try{ var id= ids[0].replace("txt", "btnsearch");
                        document.getElementById(id.replace("$", "").trim()).disabled = true;
                    }catch(err){
                        
                    }
                    }else if($('#' + ids[0].replace("$", "").trim()).attr('controltype') == "Checkbox"){
                        document.getElementById(ids[0].replace("$", "").trim()).disabled = true;
                    }
                    if (ids[0].replace("$", "").trim().indexOf("sel") == 0) {
                        $('#' + ids[0].replace("$", "").trim() + ':not(:selected)').attr('disabled', true);
                    }
                } catch (err) {

                }
            }
            return false;
        } else if (key.trim() == "KEYUP") {
            $("#" + value.trim().replace("$", "")).keydown();
            return false;
        } else if (key.trim() == "INWORDS") {
            var ids = value.split(":");
            test_skill(ids[1], ids[0]);
            return false;
        }
        var isradio = 0;
        try {
            document.getElementById(chkid).tagName
        } catch (err) {
            if (chkid.indexOf("txtdt") != -1 || chkid.indexOf("txttm") != -1)
                chkid = chkid.replace("txtdt", "txtdtgrd");
            chkid = chkid.replace("txttm", "txttmgrd");
            if(chkid.indexOf("sel") == 0){
                if(key.indexOf(".")!=-1){
                    var ext1 = key.trim().split(".")[1];
                    isradio = 1;
                    if(ext1 == "value"){
                        $("input[name="+chkid+"][title='" + value.toString().trim() + "']").prop('checked', 'true');
                    }else{
                        $("input[name="+chkid+"][value='" + value.toString().trim() + "']").prop('checked', 'true');
                    }
                }
                
            }
        }
        //confirm(isradio+"--"+key+"--"+value);
        if(isradio == 1){
            return false;
        }
        chkid = chkid.replace("$","").trim();
        if (document.getElementById(chkid).tagName == "INPUT") {
            if (inptype == "grid") {
                var tableid = $('#curtable').val();
                var rownum = $('#currow').val();
                var oTable = document.getElementById(tableid);
                //var oCells = oTable.rows.item(rownum).cells;
                 try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                var celLength = oCells.length;
                var val = "";
                var isexists = 0;
                for (var km = 2; km < celLength; km++) {
                    if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
                    continue;
                }
                    if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                        isexists = 1;
                        try {
                            if (value.toString().indexOf(":") != -1) {
                                var val1 = value.split(":");
                                var actval = val1[0];
                                var round = val1[1].replace("ROUND(", "").replace(")", "");
                                if (!isNaN(actval)) {
                                    value = parseFloat(actval).toFixed(round);
                                }
                            }
                            if (ext == "id") {
                                oTable.rows[rownum].cells[km].childNodes[0].title = value;
                            } else {
                                oTable.rows[rownum].cells[km].childNodes[0].value = value;
                            }
                        } catch (err) {

                        }
                        if (chkid.indexOf("chkbox") != -1) {
                            if (value == 1)
                                oTable.rows[rownum].cells[km].childNodes[0].checked = true;
                            else
                                oTable.rows[rownum].cells[km].childNodes[0].checked = false;
                        }
                    }
                }
                if (isexists == 0) {

                    $('#' + chkid).val(value);
                }
            } else {
                if (value.toString().indexOf(":") != -1) {
                    alert(value);
                    var val1 = value.split(":");
                    var actval = val1[0];
                    var round = val1[1].replace("ROUND(", "").replace(")", "");
                    if (!isNaN(actval)) {
                        value = parseFloat(actval).toFixed(round);
                    }
                }
                if (ext == "id") {
                    //$('#'+chkid).attr("title").val(value);
                    try {
                        document.getElementById(chkid).title = value;
                    } catch (err) {

                    }
                } else {
                    $('#' + chkid).val(value);
                }
                if (chkid.indexOf("chkbox") != -1) {
                    if (value == 1)
                        document.getElementById(chkid).checked = true;
                    else
                        document.getElementById(chkid).checked = false;
                }


            }
        } else if (document.getElementById(chkid).tagName == "TEXTAREA") {
            $('#' + chkid).val(value);
        }
        else if (document.getElementById(chkid).tagName == "SELECT") {
            if (inptype == "grid") {
                var tableid = $('#curtable').val();
                var rownum = $('#currow').val();
                var oTable = document.getElementById(tableid);
                //var oCells = oTable.rows.item(rownum).cells;
                 try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                var celLength = oCells.length;
                var val = "";
                for (var km = 2; km < celLength; km++) {
                    if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid.trim()) {
                        if (ext == "id") {
                            var pselect = oTable.rows[rownum].cells[km].childNodes[0];
                            for (var i = 0; i < pselect.options.length; i++) {
                                var val = pselect.options[i].value;
                                if (val == value) {
                                    pselect.selectedIndex = i;
                                    break;
                                }
                            }
                        } else {
                            var pselect = oTable.rows[rownum].cells[km].childNodes[0];
                            for (var i = 0; i < pselect.options.length; i++) {
                                if (pselect.options[i].text == value.toString().trim()) {
                                    pselect.selectedIndex = i;
                                    break;
                                }
                            }
                        }
                    }
                }

            } else {
                if (ext == "id") {
                    $('#' + chkid).val(value);
                } else {
                    $("#" + chkid.trim().replace("$", "") + " option").each(function () {
                        if ($(this).text().trim() == value.toString().trim()) {
                            $(this).attr('selected', 'selected');
                            this.selected = true;
                        }
                    });
                }
            }
        }
    } catch (err) {
        if (key.trim() != 'DISPLAY')
            alert(err + "setvalue--In--table" +$('#curtable').val()+"--rownum--"+$('#currow').val()+"--id--"+ chkid + "--key--" + key+"--val--"+value);
        ;
    }
// $('#userwiselog').val($('#userwiselog').val() +"\n"+$('#currentdate').val()+ " "+gettime(new Date)+" setvalue function is completed with key "+key+" value is "+value+" for inputtype "+inptype);      
// getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" setvalue function is completed with key "+key+" value is "+value+" for inputtype "+inptype);
}
 function showPop(restext){
        $("#tabPop").find("tr").remove();
        var tabdata = "";
        var lprows = restext.split("~lprow~");
        var chk = 0;
        var total = 0;
 for(var lp = 0; lp < lprows.length; lp++){ 
     if(lprows[lp] == undefined)
     continue;
     if(lprows[lp].trim() == "")
         continue;
     chk++;
            var dt = lprows[lp].split("@@@");
            tabdata = tabdata + "<tr>";
                                    for (var i = 1; i < dt.length; i++) {
                                        var chk1 = dt[i].split(",!")
                                        if(chk == 1){
                                            tabdata = tabdata + "<td>"+chk1[0]+"</td>";
                                            lp--;
                                        }else{
                                            tabdata = tabdata + "<td>"+chk1[1]+"</td>";
                                            if(i == dt.length-1){
                                                try{
                                                total = parseFloat(total)+parseFloat(chk1[1]);
                                            }catch(err){}
                                            }
                                        }
                                    }
                                    tabdata = tabdata + "</tr>";
 }
 if(total != 0){
     tabdata = tabdata+"<tr>";
     for (var i = 1; i < dt.length-2; i++) {
         tabdata = tabdata+"<td></td>";
     }
     tabdata = tabdata +"<td>Toal</td><td>"+total+"<td><tr>";
 }
 $("#tabPop").append(tabdata);
        var dialog = $("#popdiv").dialog({
                        resizable: false,
                        height: 'auto',
                        width: 'auto',
                        modal: true,
                        close: function() {
                            $(dialog).dialog("close");
                            $('#btnsave').removeAttr('disabled');
//                            $('#btnpgsave').removeAttr('disabled');
                        },
                        buttons: {
                            "Close":  function(){
                                $(dialog).dialog("close");
                                $('#btnsave').removeAttr('disabled');
//                                $('#btnpgsave').removeAttr('disabled');
                            }
                        }
                    });
        }
function fillquerycolsgrd(gridid,resp){
   
//  alert(tabid);
  var respo=resp.split("@@@");
    var rowdata= $('#curtable').val();
    var currow = $('#currow').val();
    for(var i=1;i<respo.length;i++){
        var heads=respo[i].split(",!");
        var lable=heads[0].trim();
        var valuegrd=heads[1];
        var oTable=document.getElementById(rowdata);
        var oCells = oTable.rows.item(currow).cells;
        var celLength = oCells.length; 
        for(var kr=2;kr<celLength;kr++){
            var tit = oTable.rows[currow].cells[kr].childNodes[0].title;
            if(tit.trim() == lable){
             oTable.rows[currow].cells[kr].childNodes[0].value = valuegrd;
            }
        }
    }
}
function replacefunnew(field) {
    field = field.replace(/andsymbol/g, "&");
    field = field.replace(/persymbol/g, "%");
    field = field.replace(/colonsymbol/g, ":");
    field = field.replace(/plussymbol/, "+");
    return field;
}

function fillgrid(resp) {
    $('#loopprocess').val("1");
    $('#batchdata').val("");
    $('#batchprevious').val("");
    ;
    try{
        //confirm("fillgrid---"+resp);
    document.getElementById("mydiv1").style.display = 'block';
    var res = resp.split("^^");
    var restext= "";var tablist= "";var tableid= "";var tabid= "";var t= "";var gridid= "";var lprows= "";var curtab= "";var gp= "";var currow= "";var isrowfilled= "";var oTable= "";var lp= "";var dt= "";var i= "";var ispoponly= "";var d= "";var fieldid= "";var rownum= "";var ch= "";var ctype= "";var rownum= "";var celLength= "";var val= "";var isexists= "";var km= "";var tabrowid= "";var titid= "";var fil= "";var orgid= "";var ctype= "";var pselect= "";var lm= "";var val= "";var pselect= "";var lm= "";var val= "";var tables= "";var table= "";var ta= "";var textbox= "";var dropdown= "";var paramdata= "";
    var grdid = res[0].replace("$", "");
    var isappend = false;
//    getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" Loop function is called for grid,id is "+grdid);
    if (grdid.indexOf("_append") != -1) {
        grdid = grdid.replace("_append", "");
        isappend = true;
    } else {
    }
    if (grdid.trim() == "grd_POPUP") {
        showPop(res[1]);
    }else if(grdid.indexOf("UserRowsQueryCols") !=-1){
        var rest=res[0].split("$$$");
         var tablist = document.getElementsByTagName("table");
        var tableid = "";
        var gridid=rest[1].replace("$","").trim();
        fillquerycolsgrd(gridid,res[1]);
    } else {
        restext = res[1];
        if(restext.indexOf("~lprow~") != -1  && restext.indexOf("<tr>")!= -1){
    //confirm("new div");
    document.getElementById("mydiv2").style.display = 'block';
    
    }
        tablist = document.getElementsByTagName("table");
        
        tableid = "";
        for (var k = 0; k < tablist.length; k++) {
            tabid = tablist[k].id;
            if (tabid.indexOf("tab_dyna") != -1) {
                t = tablist[k].title.split("@@@");
                gridid = t[0];
                if (gridid.trim() == grdid.trim()) {
                    tableid = tabid;
                    break;
                }
            }
        }
        tablist = null;
        //alert(gridid+"---"+tableid);
        var isfillgrid = false;
        if (isappend == false)
            $("#" + tableid).find("tr:gt(1)").remove();
        if(restext.indexOf("~lprow~") != -1  && restext.indexOf("<tr>")!= -1){
            isfillgrid = true;
            if(restext.replace('<tr>','').replace('~lprow~','').trim() != ''){
             //   confirm(restext.replace('<tr>','').trim());
            $("#" + tableid).find("tr:gt(0)").remove();}
//            confirm(restext);
//            alert(restext);

//            $('#' + tableid).append(function(){document.getElementById("mydiv1").style.display = 'block';}).append(restext).append(function() {document.getElementById("mydiv1").style.display = 'none'; });
//            $('#' + tableid).show('slow');
document.getElementById("lblgrd").innerHTML = gridid.replace("grd_","").replace("_"," ");
var ggrd = $('#loadinggrd').val().replace("$"+gridid+"$","")+"$"+gridid+"$";
$('#loadinggrd').val(ggrd);
var wfid = localStorage.currentformid;
            var urldata = localStorage.ipadrs + "/WebFormSave1?reqtype=loadgrd&gridid="+gridid+"&wfid="+wfid+mobile;
            $.ajax({
                                                url:urldata,type:"get",
                                                async :false,
                                             success :function(result) {
                                                 if(restext.replace('<tr>','').replace('~lprow~','').trim() == ''){
                                                     
                                                 }else{
                                                 $('#' + tableid).append(restext);
                                             }
                                                 //confirm(result);
                                                 $('#loadedgrd').val(result);
                                             },complete:function(result){
                                                    // alert(tableid+"-xx-"+isfillgrid);
                                                    //alert($('#loadinggrd').val()+"---"+gridid);
//                                                    var ggrd = $('#loadedgrd').val()+""+gridid;
//$('#loadedgrd').val(ggrd);
//confirm($('#loadedgrd').val().length +"=="+ $('#loadinggrd').val().length);
//confirm($('#loadedgrd').val() +"=="+ $('#loadinggrd').val());
                                                    if($('#loadedgrd').val().toString().length == $('#loadinggrd').val().toString().length){
                                                     document.getElementById("mydiv2").style.display = 'none';
                                                     document.getElementById("mydiv1").style.display = 'none';
                                                    alert("Population Details Completed");
                                                     $('#loadedgrd').val("");
                                                     $('#loadinggrd').val("");
                                                    }
                                                     
                                             }
                                         });
        }
        lprows = restext.split("~lprow~");
        curtab = tabid;
        gp = 0;
        currow = 1;
        isrowfilled = 0;
        var isemptyrow= 0;
        if (isappend == true) {
            isrowfilled = 1;
            var rowlen = document.getElementById(tableid).rows.length;
            try{if(rowlen == 2){
                var oTable1 = document.getElementById(tabid);     
                    var oCells = oTable1.rows.item(1).cells;
                    var celLength = oCells.length;
                        var j = 2;                      
                        for (j; j < celLength; j++)
                        {
                            var type = oTable1.rows[1].cells[j].childNodes[0].tagName;
                             ctype = $('#' + oTable1.rows[1].cells[j].childNodes[0].id).attr("controltype");
                            if (type == "INPUT") {
                                if(ctype == "SearchText" || ctype == "Text"){
                                if(oTable1.rows[1].cells[j].childNodes[0].value == "" && isemptyrow == 0){
                                    isemptyrow = 0;
                                }else{
                                    isemptyrow = 1;
                                    break;
                                }
                            }
                            }
                        }
            }}catch(err){}
        rowlen = document.getElementById(tableid).rows.length;
            currow = rowlen;
            if(isemptyrow == 0 && rowlen ==2){
                 isrowfilled =0;
                 currow = rowlen-1;
            }             
        }
        oTable = document.getElementById(tableid);
        for (lp = 0; lp < lprows.length; lp++) {
            if (lprows[lp].trim() != "") {
                gp++;
            } else {
                continue;
            }
            if (isrowfilled == 1) {
                var b = addrowgridGrd(curtab,'1');
//                try{getlogdata($('#currentdate').val()+ " "+gettime(new Date)+"In Loop function is added rownum "+(currow+1)+" for grid,id is "+grdid)}catch(err){};
            } else
            {
                isrowfilled = 1;
            }
            dt = lprows[lp].split("@@@");
            for (i = 1; i < dt.length; i++) {
                ispoponly = 0;
                if (dt[i].indexOf(":POPONLY") != -1) {
                    ch = dt[i].split(":POPONLY");
                    dt[i] = ch[0];
                    ispoponly = 1;
                }
                dt[i] = replacefunnew(dt[i]);
                d = dt[i].split(",!");
                fieldid = d[0].replace(/ /g, '_');
                if (fieldid == "COLOR") {
                    rownum = parseInt(currow) + (gp - 1);
                    oTable.rows[rownum].cells[1].style.background = d[1];
                    continue;
                }
                if (fieldid.trim().toLowerCase().replace("$", "").indexOf("txtdt") == 0) {
                    ctype = $('#' + fieldid).attr("controltype");
                    if (ctype == "Date")
                        fieldid = fieldid.toLowerCase().replace("txtdt", "txtdtgrd");
                }
                if (fieldid.trim().toLowerCase().replace("$", "").indexOf("txttm") == 0) {
                    var ctype = $('#' + fieldid).attr("controltype");
                    if (ctype == "Date")
                        fieldid = fieldid.toLowerCase().replace("txttm", "txttmgrd");
                }
                rownum = parseInt(currow) + (gp - 1);
//                var oCells = oTable.rows.item(rownum).cells;
//                var celLength = oCells.length;
                celLength = oTable.rows.item(rownum).cells.length;
                val = "";
                isexists = 0;
                //if(lprows <2){
                for (km = 2; km < celLength; km++) {
                    tabrowid = oTable.rows[rownum].cells[km].childNodes[0].id;
                    
                    if (fieldid.toString().toLowerCase().replace("$", "").indexOf("txtdt") == 0)
                        tabrowid = tabrowid.replace(/\d+/g, '');
                    titid = 0;
                    if (fieldid.toLowerCase().indexOf("_id") != -1) {
                        titid = 1;
                        fieldid = fieldid.toLowerCase();
                    }
                    fil = fieldid.replace("$", "").trim().toLowerCase();
                    if (titid == "1")
                        fil = fieldid.replace("$", "").trim().toLowerCase().replace("_id", "");
                    orgid = tabrowid.trim().toLowerCase();
                     if(orgid.toLowerCase().trim().indexOf("txttmgrd") == 0)
                        orgid = orgid.replace(/[0-9]/g, '');
                    ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                    if (ctype == "Date")
                        orgid = orgid.replace("txtdtgrd", "txtdt");
                    if (ctype == "Time")
                        orgid = orgid.replace("txttmgrd", "txttm");
                    if (orgid.trim() == fil.trim()) {
                        isexists = 1;
                        if (fieldid.indexOf("searchid") != -1) {
                            if (d.length == 2)
                                oTable.rows[rownum].cells[km].childNodes[0].title = d[1];
                            else
                                oTable.rows[rownum].cells[km].childNodes[0].title = d[2];
                        } else if (ctype == "Checkbox") {
                            if (d[1].trim() == 1) {
                                oTable.rows[rownum].cells[km].childNodes[0].checked = true;
                            } else {
                                oTable.rows[rownum].cells[km].childNodes[0].checked = false;
                            }
                        } else if (ctype == "Combo" || ctype == "Radio") {
                            if (titid != "1") {
                                pselect = oTable.rows[rownum].cells[km].childNodes[0];
                                for (lm = 0; lm < pselect.options.length; lm++) {
                                    val = pselect.options[lm].text;
                                    if (val == d[1].trim()) {
                                        pselect.selectedIndex = lm;
                                        break;
                                    }
                                }
                                pselect = null;
                            } else {
                                pselect = oTable.rows[rownum].cells[km].childNodes[0];
                                for (lm = 0; lm < pselect.options.length; lm++) {
                                    val = pselect.options[lm].value;
                                    if (val == d[1].trim()) {
                                        pselect.selectedIndex = lm;
                                        break;
                                    }
                                }
                                pselect = null;

                            }
                        }
                        else {
                            if (titid == 1)
                                oTable.rows[rownum].cells[km].childNodes[0].title = d[1];
                            else
                                oTable.rows[rownum].cells[km].childNodes[0].value = d[1];
                        }
                        try {
                            if (ispoponly == 0 && oTable.rows[rownum].cells[km].childNodes[0].id.indexOf("txtarea") ==-1){
                                if(oTable.rows[rownum].cells[km].childNodes[0].id.indexOf("_searchid") != -1){
                                    //searchid
                                    //confirm(oTable.rows[rownum].cells[km].childNodes[0].id.indexOf("_searchid"));
                                }else{
                                oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                            }
                            }
                            if (isappend == true) {
                                if (oTable.rows[rownum].cells[km].childNodes[0].id.indexOf("searchid")) {
                                    if (titid == 1) {
                                        oTable.rows[rownum].cells[km].childNodes[0].onchange();
                                    }
                                } else {
                                    oTable.rows[rownum].cells[km].childNodes[0].onchange();
                                }
                            }
                        } catch (err) {
                            alert(err);
                        }
                        try {
                        } catch (err) {
                        }
                        break;
                    }
               // }
            }
                oCells = null;
                titid = 0;
                if (isexists == 0 && lprows ==lp-1) {
                    tables = ["dynamictable", "tabhidden", "tabAfter"];
                    for (ta = 0; ta < tables.length; ta++) {
                        table = document.getElementById(tables[ta]);
                        textbox = table.getElementsByTagName("input");
                        dropdown = table.getElementsByTagName("select");
                        paramdata = '';
                        for (var i2 = 0; i2 < textbox.length; i2++) {
                            if (titid == 1) {
                                fieldid = fieldid.replace("_id", "");
                            }
                            if (textbox[i2].id.toUpperCase() == fieldid.toUpperCase()) {
                                if (titid == 1) {
                                    textbox[i2].title = d[1];
                                } else {
                                    textbox[i2].value = d[1];
                                }
                            }
                        }
                        table = null;textbox = null;dropdown = null;
                    }
                }
            }
            
            dt = null;
            d = null;
        }//;loop ends 
        changesr(tabid);
            var i = 0;
    $('[id^="txtdtgrd"]').each(function () {
        i++;
        if (i != 1){
            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
            this.id = rid + "" + i;
        }
        this.className = this.className.replace(" hasDatepicker", "");
    });
    $('[id^="txttmgrd"]').each(function () {
        i++;
        if (i != 1) {
            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
            this.id = rid + "" + i;
        }
        this.className = this.className.replace(" ui-timepicker-input", "");
    });
    $(".Date1").datepicker("destroy");
    $(".Date1").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2040',
        dateFormat: "dd/mm/yy"
    });
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
        $('.Hide').hide();
    }
    catch (err)
    {
        document.getElementById("mydiv2").style.display = 'none';
    }
        document.getElementById("mydiv1").style.display = 'none';
         
    }
    if(restext.indexOf("~lprow~") != -1  && restext.indexOf("<tr>")!= -1){
        var oTable=document.getElementById(tabid);
        var rowLength = oTable.rows.length;
    for (var i = 0; i < 1; i++) {
        var oCells = oTable.rows.item(currow).cells;
        var celLength = oCells.length; 
        for(var kr=2;kr<celLength;kr++){
            var id = oTable.rows[currow].cells[kr].childNodes[0].id;
            if(id.indexOf("_searchid") == -1){
             oTable.rows[1].cells[kr].childNodes[0].onkeyup();
            }
        }
    }
    checkStyleChanges(gridid,tabid);
    }
    try {
        $(function() {$(".readonly" ).attr("readonly",true);});
        gridid = null;
        restext = null;
        tablist = null;
        //tableid = null;
        tabid = null;
        lprows = null;
        rowlen = null;
        curtab = null;
        gp = null;
        currow = null;
        isrowfilled = null;
        oTable = null;
        lp = null;
        ispoponly = null;
        dt = null;
        d = null;
        fieldid = null;
        rownum = null;
        ctype = null;
        oCells = null;
        celLength = null;
        val = null;
        isexists = null;
        km = null;
        tabrowid = null;
        titid = null;
        fil = null;
        orgid = null;
        ctype = null;
        pselect = null;
        lm = null;
        tables = null;
        textbox = null;
        dropdown = null;
        paramdata = null;
    } catch (err) {
        alert(error);
        document.getElementById("mydiv2").style.display = 'none';
    }}
    finally{
        $('#loopprocess').val("0");
        //confirm($('#batchdata').val());
        batchdata();
        $('#isreplaceopen').val("0");
        replacedata();
        //$('#curkeycode').val("0");
    document.getElementById("mydiv1").style.display = 'none';}
}
function batchdata(){
    var jkl = $('#batchdata').val();
    if($('#isreplaceopen').val() == "1" || $('#medreplace').is(":visible") == true){
        return false;
    }else{
      //  alert("in batchdata--"+jkl);
    }
   // confirm("in--"+jkl);
    if(jkl!=""){
    var jk = jkl.split("@@@");
    $('#batchdata').val(jkl.replace(jk[0]+"@@@",''));
    if(jk[0].indexOf(",!") != -1){
        var j = jk[0].split(",!");
        var tabid = j[0];
        var rownum = j[1];
        var chkid = j[2];
        var oTable = document.getElementById(tabid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
                var celLength = oCells.length;
                var val = "";
                $('#curkeycode').val("0")
                for (var km = 2; km < celLength; km++) {
                    if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                        try {
                            oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                            var isFirefox = typeof InstallTrigger !== 'undefined';
                   if(isFirefox){
                   wait(2000);
                   }
                        } catch (err) {

                        }
                    }
                }
    }
    }
}
function replacedata(){
    //confirm("lkjk");
    $('#isreplaceopen').val("1");
    var jkl = $('#replacedata').val();
    ;
//    var chk = $('#medreplace').dialog('isOpen');
//    confirm(jkl+"--"+chk);
//    if(chk == true){
//        return false;
//    }
    if(jkl!=""){
    var jk = jkl.split("@@@");
    $('#replacedata').val(jkl.replace(jk[0]+"@@@",''));
    if(jk[0].indexOf(",!") != -1){
        var j = jk[0].split(",!");
        var tabid = j[0];
        var rownum = j[1];
        var chkid = j[2];
        $('#medrepcol').val(rownum);
        var oTable = document.getElementById(tabid);
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
                var celLength = oCells.length;
                var val = "";
                $('#curkeycode').val("0");
                for (var km = 2; km < celLength; km++) {
                    if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                        try {
                            oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                        } catch (err) {

                        }
                    }
                }
    }
    }else{
        $('#isreplaceopen').val("0");
    }
}
function checkStyleChanges(gridid,tabid){
    var wfid =localStorage.currentformid;
    $.get( localStorage.ipadrs + "/WebFormSave1?reqtype=stylefields&wfid=" + wfid+"&gridid="+gridid+mobile, function (responseJson) {
        var mem = responseJson;
        var frowid = "";
        var cellno = 1;
            for (var j = 0; j < mem.length; j++) {
                var frowid = responseJson[j]['FRAMEROWID'];
            }
        var oTable=document.getElementById(tabid);
        var rowLength = oTable.rows.length;
    for (var i = 1; i < 2; i++) {
        var oCells = oTable.rows.item(i).cells;
        var celLength = oCells.length; 
        for(var kr=2;kr<celLength;kr++){
            var id = oTable.rows[i].cells[kr].childNodes[0].id;
            //confirm(id+"--"+frowid)
            if(id == frowid){
             cellno = kr;
             break;
            }
        }
    }
    //confirm(responseJson+"--"+frowid+"--"+cellno);
    for (var i = 1; i < rowLength; i++) {
        try{oTable.rows[i].cells[cellno].childNodes[0].onkeyup();}catch(err){}
    }
    });
}
function addrowgridGrd(tablename,change) {
    
    var rowdata = $('#' + tablename + " tr:eq('1')").clone();
    $('#' + tablename).append(rowdata);
    rowdata = null;
    $('#' + tablename + ' tr:last').find('input[type=text]').val("");
    $('#' + tablename + ' tr:last').find('input[type=checkbox]').removeAttr("disabled");
    if(change == undefined){
    var i = 0;
    $('[id^="txtdtgrd"]').each(function () {
        i++;
        if (i != 1){
            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
            this.id = rid + "" + i;
        }
        this.className = this.className.replace(" hasDatepicker", "");
    });
    $('[id^="txttmgrd"]').each(function () {
        i++;
        if (i != 1) {
            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
            this.id = rid + "" + i;
        }
        this.className = this.className.replace(" ui-timepicker-input", "");
    });
    $(".Date1").datepicker("destroy");
    $(".Date1").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2040',
        dateFormat: "dd/mm/yy"
    });
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
}
    if(change == undefined)
    changesr(tablename);
    return true;
}
function changesr(tableid) {
    var oTable = document.getElementById(tableid);
    var rowLength = oTable.rows.length;
    for (i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        oCells.item(1).innerHTML = i;
    }
}
function griddiscount(grddiscfield, totdiscfield) {
    var curtab = $('#curtable').val();
    var oTable = document.getElementById(curtab);
    var oCells = oTable.rows.item(0).cells;
    var celLength = oCells.length;
    var val = "";
    var rows = oTable.rows.length;
    var chkid = totdiscfield.trim().replace("grddisc_", "").replace("$", "");
    var value = $('#' + chkid).val();
    if (value == "")
        value = 0;
    chkid = grddiscfield.trim().replace("$", "").trim();
    for (var i = 0; i < rows; i++) {
        for (var km = 2; km < celLength; km++) {
            if (oTable.rows[i].cells[km].childNodes[0].id == chkid) {
                try {
                    oTable.rows[i].cells[km].childNodes[0].value = value;
                    oTable.rows[i].cells[km].childNodes[0].onchange();
                    oTable.rows[i].cells[km].childNodes[0].onkeyup();
                } catch (err) {

                }
            }
        }
    }
}
//function getFormulaValue(formula, inptype) {
//    var result = "";
//
//    try {
//        for (var l = 0; l < formula.length; l++) {
//            var g = formula.charAt(l);
//            if (g.match("^[a-zA-Z]+$") || g == "$" || g == "`") {
//                var k = g;
//                while (1) {
//                    l++;
//                    var m = formula.charAt(l);
//                    if (m == "_" || m == "." || m == "$") {
//                        k = k + m;
//                        continue;
//                    }
//                    if (m.match("^[a-zA-Z]+")) {
//                        k = k + m;
//                    } else {
//                        if (k.indexOf("$") != -1) {
//                            if (k != "$") {
//                                var chkid = "";
//                                var actid = "";
//                                var ext = "";
//                                if (k.indexOf(".") != -1) {
//                                    var ch = k.split(".");
//                                    chkid = ch[0];
//                                    ext = ch[1];
//                                    actid = ch[0];
//                                } else {
//                                    chkid = k;
//                                    actid = k;
//                                }
//                                if (chkid.indexOf("$") != -1) {
//                                    chkid = chkid.replace("$", "");
//                                    chkid = chkid.replace("`", "");
//                                    if (inptype == "grid") {
//                                        try {
//                                            document.getElementById(chkid.replace("grdsum_", "")).tagName
//                                        } catch (err) {
//                                            chkid = chkid.replace("txtdt", "txtdtgrd");
//                                        }
//                                    }
//                                    if (document.getElementById(chkid.replace("grdsum_", "")).tagName == "INPUT") {
//                                        if (inptype == "grid") {
//                                            var tableid = $('#curtable').val();
//                                            var rownum = $('#currow').val();
//                                            var oTable = document.getElementById(tableid);
//                                            var oCells = oTable.rows.item(rownum).cells;
//                                            var celLength = oCells.length;
//                                            var val = "";
////                                                if(chkid.indexOf("txtdt") == 0){
////                                                    chkid = chkid.replace("txtdt","txtdtgrd");
////                                                }
//                                            if (chkid.indexOf("grdsum") != -1) {
//                                                val = getGridTotal(chkid);
//                                            } else {
//                                                var isexists = 0;
//                                                for (var km = 2; km < celLength; km++) {
//                                                    if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
//                                                        isexists = 1;
//                                                        try {
//                                                            if (ext == "id") {
//                                                                val = oTable.rows[rownum].cells[km].childNodes[0].title;
//                                                            } else {
//                                                                val = oTable.rows[rownum].cells[km].childNodes[0].value;
//                                                            }
//                                                        } catch (err) {
//
//                                                        }
//                                                        if (chkid.indexOf("chkbox") != -1) {
//                                                            if (oTable.rows[rownum].cells[km].childNodes[0].checked == true) {
//                                                                val = 1;
//                                                            } else {
//                                                                val = 0;
//                                                            }
//                                                        }
//                                                    }
//                                                }
//                                                if (isexists == 0) {
//                                                    val = $('#' + chkid.trim()).val();
//                                                    if (chkid.indexOf("chkbox") != -1) {
//                                                        if (document.getElementById(chkid.trim()).checked == true) {
//                                                            val = 1;
//                                                        } else {
//                                                            val = 0;
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                        else {
//                                            if (chkid.indexOf("grdsum") != -1) {
//                                                val = getGridTotal(chkid);
//                                            } else {
//                                                if (ext == "id") {
//                                                    val = $('#' + chkid).attr("title");
//                                                } else {
//                                                    val = $('#' + chkid).val();
//                                                }
//                                                if (chkid.indexOf("chkbox") != -1) {
//                                                    if (document.getElementById(chkid).checked == true)
//                                                        val = 1;
//                                                    else
//                                                        val = 0;
//                                                }
//                                            }
//                                        }
//                                    } else if (document.getElementById(chkid).tagName == "SELECT") {
//
//                                        if (inptype == "grid") {
//                                            var tableid = $('#curtable').val();
//                                            var rownum = $('#currow').val();
//                                            var oTable = document.getElementById(tableid);
//                                            var oCells = oTable.rows.item(rownum).cells;
//                                            var celLength = oCells.length;
//                                            var val = "";
//                                            var isexists = 0;
//                                            for (var km = 2; km < celLength; km++) {
//                                                if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
//                                                    isexists = 1;
//                                                    try {
//                                                        if (ext == "id") {
//                                                            val = oTable.rows[rownum].cells[km].childNodes[0].value;
//                                                        } else {
//                                                            var e = oTable.rows[rownum].cells[km].childNodes[0];
//                                                            val = e.options[e.selectedIndex].text;
//                                                        }
//                                                    } catch (err) {
//                                                        alert(err);
//                                                    }
//                                                }
//                                            }
//                                            if (isexists == 0) {
//                                                if (ext == "id") {
//                                                    val = $('#' + chkid).val();
//                                                } else {
//                                                    val = $("#" + chkid + " option:selected").text();
//                                                }
//                                            }
//                                        } else {
//                                            if (ext == "id") {
//                                                val = $('#' + chkid).val();
//                                            } else {
//                                                //actval = $('#'+fi[0]).attr("title");
//                                                val = $("#" + chkid + " option:selected").text();
//                                            }
//                                        }
//                                    }
//                                } else
//                                {
//                                    val = chkid;
//                                }
//                                if (actid.indexOf("`") != -1) {
//                                    val = "`" + val;
//                                }
//                            }
//                        } else {
//                            var val = k;
//                        }
//                        if (val == "")
//                            val = 0;
//
//                        result = result + val;
//                        l--;
//                        break;
//                    }
//                }
//            }
//            else {
//                result = result + g;
//            }
//        }
//
//        while (1) {
//            if (result.indexOf("$") != -1) {
//                result = result.replace("$", "");
//            } else {
//                break;
//            }
//        }
//        result = result.replace(/`/g, "'");
//        var formularesult = "";
//        if (result.trim() != "") {
//            try {
//                if (result.toString().indexOf(":") != -1) {
//                    var val1 = result.split(":");
//                    var actval = val1[0];
//                    var round = val1[1].replace("ROUND(", "").replace(")", "");
//                    var actval = eval(actval);
//                    if (!isNaN(actval)) {
//                        result = parseFloat(actval).toFixed(round);
//                    }
//                    formularesult = result;
//                }
//                else {
//                    formularesult = eval(result);
//                }
//            } catch (err) {
//                if (result.indexOf("=") != -1) {
//                    var result = result.replace("==", "=");
//                    var res = result.split("=");
//                    if (res[0].trim() == res[1].trim()) {
//                        formularesult = true;
//                    }
//                } else {
//                    formularesult = result;
//                }
//            }
//        }
//        else
//            formularesult = "";
//        return formularesult;
//    } catch (err) {
//        alert(err + "--wrong formula-->" + formula);
//    }
//}
function getgridvalues(formula){
    //(formula);
    
    var res = formula.split(":");
    var result = "";
    var gridnm = res[1].trim();
    var data = res[0].trim();
    var frm = "";
    if(res.length > 2){
        frm = res[2];
        frm = frm.replace(/==/g,"~");
        //confirm("before"+frm);
        frm = replaceWithHeadFields(frm);
        frm = replaceLabelvaluesgrid("getvalue=="+frm, $('#currow').val(), $('#curtable').val()).replace("getvalue==","").replace("^","").trim();
        //confirm($('#pretable').val()+"---"+frm);
    }
    var data = data.replace("$","");
    var idtype = 0;
    if(data.indexOf(".")){
        var dt = data.split(".");
        data = dt[0];
        if(dt[1] == "id"){
            idtype = 1;
        }
    }
    var tableid = gridnm.replace("grd_","tab_dyna_");
    var tableids = document.getElementsByTagName("table");
    for(var i = 0;i < tableids.length; i++){
                    //confirm("id--"+divids[i].id+"--title--"+divids[i].title+"--"+panel);
                    if(tableids[i].id.replace("tab_dyna_","").replace(/_/g,'') == gridnm.replace("grd_","").replace(/ /g,'')){
                        tableid = tableids[i].id;
                    }
                }
    var oTable = document.getElementById(tableid);
    var rowLength = oTable.rows.length;
    var sumtype = 0;
    
    if(data.indexOf("grdall_") != -1 || data.indexOf("grdsum_") != -1){
    loop1: for (var i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        data = data.replace("grdall_","");
        if(data.indexOf("grdsum_") != -1){
            data = data.replace("grdsum_","");
            sumtype = 1;
            result = 0;
        }
        var celLength = oCells.length;
        for (var km = 2; km < celLength; km++) {
            if(oTable.rows[i].cells[km].childNodes[0].id.trim() == data){
                var frm1 = frm;
                if(frm1 != ""){
                   // confirm("formula"+frm1);
                frm1 = replaceLabelvaluesgrid("getvalue=="+frm1, i, tableid).replace("getvalue==","").replace("^","").trim();
        frm1 = frm1.replace(/~/g,"==");
                        var chk = getFormulaValue(frm1,"");
                       // confirm(frm1+"---"+chk);
                        if(chk != true){
                            continue loop1;
                        }else{
                            //confirm(oTable.rows[i].cells[km].childNodes[0].value);
                        }
                }
                if(idtype == 1){
                    var val = oTable.rows[i].cells[km].childNodes[0].title;
                }else{
                var val = oTable.rows[i].cells[km].childNodes[0].value;
            }
                if(val.trim() != ""){
                    if(sumtype == 0){
                if(result == ""){
                    result = "'"+val+"'";
                }else{
                    result = result+",'"+val+"'";
                }
                    }else{
                        result = parseFloat(result)+parseFloat(val);
                    }
            }
            }
        }
    }
}else{
    var oCells = oTable.rows.item(rowLength-1).cells;
        var celLength = oCells.length;
        for (var km = 2; km < celLength; km++) {
            if(oTable.rows[rowLength-1].cells[km].childNodes[0].id.trim() == data){
                if(idtype == 1){
                    var val = oTable.rows[rowLength-1].cells[km].childNodes[0].title;
                }else{
                var val = oTable.rows[rowLength-1].cells[km].childNodes[0].value;
            }
                if(val.trim() != ""){
                if(result == ""){
                    var chk = isNaN(val.trim());
                    if(chk == false)
                    result = "'"+val+"'";
                    else
                        result = val;
                }else{
                    result = result+",'"+val+"'";
                }
            }
            }
        }
}
    return result;
}
//function getFormulaValue(formula, inptype) {
//    ;    
////      alert("hi");
//    var result = "";
//    if (formula.trim() == "$serverDate") {
//        return $('#currentdate').val()
//    }
//    formula = replaceFunction(formula, "dollorsymbolsavetype", $('#txtSaveType').val().trim().toUpperCase());
//    if(formula.toString().indexOf(":") != -1){
//        if(formula.toString().indexOf("grd_")!=-1){
//            var formularep = formula.replace(/\+/g,"~").replace(/\-/g,"~").replace(/\</g,"~").replace(/\>/g,"~").replace(/\-/g,"~").replace(/\(/g,"~").replace(/\)/g,"~").replace(/\&/g,"~").replace(/\|/g,"~").replace(/\=/g,"~");
//            if(formularep.indexOf("~") != -1){
//            var formulasp = formularep.split("~");
//            for(var jk = 0;jk < formulasp.length;jk++){
//                if(formulasp[jk]=="")
//                    continue;
//                if(formulasp[jk].indexOf("grd_") != -1){
//                    var res = getgridvalues(formulasp[jk]);
//                }else{
//                    var res = getFormulaValueNew(formulasp[jk],"grid");
//                }
//                if(res == ""){
//                    res = 0;
//                }
//                formula = formula.replace(formulasp[jk],res);
//            }
//            var finres = eval(formula);
//            return finres;
//            }else{
//            return getgridvalues(formula);
//        }
//        }
//    }
//    try {
//        var chkid = formula.replace("$", "").trim();
//        if (chkid.indexOf(".") != -1)
//            chkid = chkid.substr(0, chkid.indexOf("."))
//        var chktype = $('#' + chkid).attr("controltype");
//        if (chktype == "Date") {
//            return $('#' + chkid).val();
//        }
//    } catch (err) {
//    }
//    
//    try {
//        for (var l = 0; l < formula.length; l++) {
//            var g = formula.charAt(l);
//            if (g.match("^[a-zA-Z]+$") || g == "$" || g == "`") {
//                var k = g;
//                while (1) {
//                    l++;
//                    var m = formula.charAt(l);
//                    if (m == "_" || m == "." || m == "$") {
//                        k = k + m;
//                        continue;
//                    }
//                    if (m.match("^[a-zA-Z]+")) {
//                        k = k + m;
//                    } else {
//                        if (k.indexOf("$") != -1) {
//                            if (k != "$") {
//                                var chkid = "";
//                                var actid = "";
//                                var ext = "";
//                                if (k.indexOf(".") != -1) {
//                                    var ch = k.split(".");
//                                    chkid = ch[0];
//                                    ext = ch[1];
//                                    actid = ch[0];
//                                } else {
//                                    chkid = k;
//                                    actid = k;
//                                }
//                                if (chkid.indexOf("$") != -1) {
//                                    chkid = chkid.replace("$", "");
//                                    chkid = chkid.replace("`", "");
//                                    //confirm(chkid);
//                                    if (inptype == "grid") {
//                                        try {
//                                            document.getElementById(chkid.replace("grdsum_", "")).tagName
//                                        } catch (err) {
//                                            chkid = chkid.replace("txtdt", "txtdtgrd");
//                                            chkid = chkid.replace("txttm", "txttmgrd");
//                                        }
//                                    }
//                                    if (chkid.trim() == "savetype") {
//                                        chkid = chkid.replace("savetype", "txtSaveType");
//                                    }
//                                    var isradio = 0;
//                                    try{document.getElementById(chkid.replace("grdsum_", "")).tagName}catch(err){
//                                        if(chkid.indexOf("sel"==0)){
//                                            var jkl=getRadioValue(chkid,ext);
//                                            //result = result + jk; 
//                                            val = jkl;
//                                            isradio = 1;
//                                           // confirm("Here"+jk)
//                                           // continue;
//                                        }}
//                                    if(isradio == 0){
//                                    if (document.getElementById(chkid.replace("grdsum_", "")).tagName == "INPUT") {
//                                        if (inptype == "grid") {
//                                            var tableid = $('#curtable').val();
//                                            var rownum = $('#currow').val();
//                                            var oTable = document.getElementById(tableid);
//                                            try{
//                                            var oCells = oTable.rows.item(rownum).cells;
//                                        }catch(err){ return "";}
//                                            var celLength = oCells.length;
//                                            var val = "";
////                                                if(chkid.indexOf("txtdt") == 0){
////                                                    chkid = chkid.replace("txtdt","txtdtgrd");
////                                                }
//                                            if (chkid.indexOf("grdsum") != -1) {
//                                                val = getGridTotal(chkid);
//                                            } else {
//                                                var isexists = 0;
//                                                for (var km = 2; km < celLength; km++) {
//                                                    if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
//                                                        isexists = 1;
//                                                        try {
//                                                            if (ext == "id") {
//                                                                val = oTable.rows[rownum].cells[km].childNodes[0].title;
//                                                            } else {
//                                                                val = oTable.rows[rownum].cells[km].childNodes[0].value;
//                                                            }
//                                                        } catch (err) {
//
//                                                        }
//                                                        if (chkid.indexOf("chkbox") != -1) {
//                                                            if (oTable.rows[rownum].cells[km].childNodes[0].checked == true) {
//                                                                val = 1;
//                                                            } else {
//                                                                val = 0;
//                                                            }
//                                                        }
//                                                    }
//                                                }
//                                                if (isexists == 0) {
//                                                    if (ext == "id")
//                                                        val = $('#' + chkid.trim()).prop("title");
//                                                    else
//                                                        val = $('#' + chkid.trim()).val();
//                                                    if (chkid.indexOf("chkbox") != -1) {
//                                                        if (document.getElementById(chkid.trim()).checked == true) {
//                                                            val = 1;
//                                                        } else {
//                                                            val = 0;
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                        else {
//                                            if (chkid.indexOf("grdsum") != -1) {
//                                                val = getGridTotal(chkid);
//                                            } else {
//                                                if (ext == "id") {
//                                                    val = $('#' + chkid).attr("title");
//                                                } else {
//                                                    val = $('#' + chkid).val();
//                                                }
//                                                if (chkid.indexOf("chkbox") != -1) {
//                                                    if (document.getElementById(chkid).checked == true)
//                                                        val = 1;
//                                                    else
//                                                        val = 0;
//                                                }
//                                            }
//                                        }
//                                    } else if (document.getElementById(chkid).tagName == "SELECT") {
//
//                                        if (inptype == "grid") {
//                                            var tableid = $('#curtable').val();
//                                            var rownum = $('#currow').val();
//                                            var oTable = document.getElementById(tableid);
//                                             try{
//                                            var oCells = oTable.rows.item(rownum).cells;
//                                        }catch(err){ return "";}
//                                            var celLength = oCells.length;
//                                            var val = "";
//                                            var isexists = 0;
//                                            for (var km = 2; km < celLength; km++) {
//                                                if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
//                                                    isexists = 1;
//                                                    try {
//                                                        if (ext == "id") {
//                                                            val = oTable.rows[rownum].cells[km].childNodes[0].value;
//                                                        } else {
//                                                            var e = oTable.rows[rownum].cells[km].childNodes[0];
//                                                            val = e.options[e.selectedIndex].text;
//                                                        }
//                                                    } catch (err) {
//                                                        alert("getformulavalue--"+err);
//                                                    }
//                                                }
//                                            }
//                                            if (isexists == 0) {
//                                                if (ext == "id") {
//                                                    val = $('#' + chkid).val();
//                                                } else {
//                                                    val = $("#" + chkid + " option:selected").text();
//                                                }
//                                            }
//                                        } else {
//                                            if (ext == "id") {
//                                                val = $('#' + chkid).val();
//                                            } else {
//                                                //actval = $('#'+fi[0]).attr("title");
//                                                val = $("#" + chkid + " option:selected").text();
//                                            }
//                                        }
//                                    }
//                                }
//                                } else
//                                {
//                                    val = chkid;
//                                }
//                                if (actid.indexOf("`") != -1) {
//                                    val = "`" + val;
//                                }
//                            }
//                        } else {
//                            var val = k;
//                        }
//                        if (val == "")
//                            val = 0;
//                        var cher = isNaN(val);
//                        if(cher == false)
//                            val = val * 1;
//                        result = result + val;
//                        l--;
//                        break;
//                    }
//                }
//            }
//            else {
//                result = result + g;
//            }
//        }
//
//        while (1) {
//            if (result.indexOf("$") != -1) {
//                result = result.replace("$", "");
//            } else {
//                break;
//            }
//        }
//        result = result.replace(/`/g, "'");
//        var formularesult = "";
//        if (result.trim() != "") {
//            try {
//                if (result.toString().indexOf(":") != -1) {
//                    var val1 = result.split(":");
//                    var actval = val1[0];
//                    var round = val1[1].replace("ROUND(", "").replace(")", "");
//                    var actval = eval(actval);
//                    if (!isNaN(actval)) {
//                        result = parseFloat(actval).toFixed(round);
//                    }
//                    if (isNaN(actval)) {
//                        if (result.toString().indexOf("ROUND") != -1) {
//                            //alert("wrong formula-->"+result);
//                            return "0";
//                        }
//                        if (result.toString().indexOf("POPONLY") != -1) {
//                            //alert("wrong formula-->"+result);
//                            return "0";
//                        }
//                    }
//                    formularesult = result;
//                }
//                else {
//                    formularesult = eval(result);
//                }
//            } catch (err) {
//                if (result.indexOf("=") != -1) {
//                    var result = result.replace("==", "=");
//                    var res = result.split("=");
//                    if (res[0].trim() == res[1].trim()) {
//                        formularesult = true;
//                    }
//                } else {
//                    formularesult = result;
//                }
//            }
//        }
//        else
//            formularesult = "";
//        return formularesult;
//    } catch (err) {
//        if (formula.replace("$", "").trim() == "serverDate") {
//            return $('#currentdate').val();
//        }
//        alert(err + "--wrong formula-->" + formula);
//    }
//}
function getFormulaValueNew(formula, inptype) {
    
    var result = "";
    if (formula.trim() == "$serverDate") {
        return $('#currentdate').val();
    }
    if (formula.indexOf("$serverDate")!=-1) {
        var  nwdate= $('#currentdate').val().split("/");
        val=new Date();
        val= val.setFullYear(nwdate[2],nwdate[1]-1,nwdate[0]);
        formula =formula.replace("$serverDate",val);
    }
    if(formula.toString().indexOf(":") != -1){
        if(formula.toString().indexOf("grd_")!=-1){
            var formularep = formula.replace(/\+/g,"~").replace(/\-/g,"~").replace(/\</g,"~").replace(/\>/g,"~").replace(/\-/g,"~").replace(/\(/g,"~").replace(/\)/g,"~").replace(/\&/g,"~").replace(/\|/g,"~").replace(/\=/g,"~");
            if(formularep.indexOf("~") != -1){
            var formulasp = formularep.split("~");
            for(var jk = 0;jk < formulasp.length;jk++){
                if(formulasp[jk].trim()=="")
                    continue;
                if(formulasp[jk].indexOf("grd_") != -1){
                    var res = getgridvalues(formulasp[jk]);
                }else{
                    var res = getFormulaValueNew(formulasp[jk],"grid");
                }
               // confirm(res +"--"+ formulasp[jk]);
                if(res == ""){
                    res = 0;
                }
                formula = formula.replace(formulasp[jk],res);
            }
            var finres = eval(formula);
            //confirm("testing--"+formula+"--"+finres);
            return finres;
            }else{
            return getgridvalues(formula);
        }
        }
    }
    try {
        var chkid = formula.replace("$", "").trim();
        if (chkid.indexOf(".") != -1)
            chkid = chkid.substr(0, chkid.indexOf("."))
        var chktype = $('#' + chkid).attr("controltype");
        if (chktype == "Date") {
           
        }
    } catch (err) {
    }
    
    try {
        for (var l = 0; l < formula.length; l++) {
            var g = formula.charAt(l);
            if (g.match("^[a-zA-Z]+$") || g == "$" || g == "`") {
                var k = g;
                while (1) {
                    l++;
                    var m = formula.charAt(l);
                    if (m == "_" || m == "." || m == "$") {
                        k = k + m;
                        continue;
                    }
                    if (m.match("^[a-zA-Z]+")) {
                        k = k + m;
                    } else {
                        if (k.indexOf("$") != -1) {
                            if (k != "$") {
                                var chkid = "";
                                var actid = "";
                                var ext = "";
                                if (k.indexOf(".") != -1) {
                                    var ch = k.split(".");
                                    chkid = ch[0];
                                    ext = ch[1];
                                    actid = ch[0];
                                } else {
                                    chkid = k;
                                    actid = k;
                                }
                                if (chkid.indexOf("$") != -1) {
                                    chkid = chkid.replace("$", "");
                                    chkid = chkid.replace("`", "");
                                    if (inptype == "grid") {
                                        try {
                                            document.getElementById(chkid.replace("grdsum_", "")).tagName
                                        } catch (err) {
                                            chkid = chkid.replace("txtdt", "txtdtgrd");
                                            chkid = chkid.replace("txttm", "txttmgrd");
                                        }
                                    }
                                    if (chkid.trim() == "savetype") {
                                        chkid = chkid.replace("savetype", "txtSaveType");
                                    }
                                    var isradio = 0;
                                    try{document.getElementById(chkid.replace("grdsum_", "")).tagName}catch(err){
                                        if(chkid.indexOf("sel"==0)){
                                            var jkl=getRadioValue(chkid,ext);
                                            //result = result + jk; 
                                            val = jkl;
                                            isradio = 1;
                                            //continue;
                                        }}
                                    var chktype = $('#' + chkid.replace(/[0-9]/g, '').trim()).attr("controltype");
                                    if(chktype == undefined)
                                        chktype="";
                                    if(isradio == 0){
                                    if (document.getElementById(chkid.replace("grdsum_", "")).tagName == "INPUT") {
                                        if (inptype == "grid") {
                                            var tableid = $('#curtable').val();
                                            var rownum = $('#currow').val();
                                            var oTable = document.getElementById(tableid);
                                             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                                            var celLength = oCells.length;
                                            var val = "";
                                            if (chkid.indexOf("grdsum") != -1) {
                                                val = getGridTotal(chkid);
                                            } else {
                                                var isexists = 0;
                                                for (var km = 2; km < celLength; km++) {
                                                    if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
                                                        isexists = 1;
                                                        try {
                                                            if (ext == "id") {
                                                                val = oTable.rows[rownum].cells[km].childNodes[0].title;
                                                            } else {
                                                                if(chktype == "Date"){
                                                               var  newdate = oTable.rows[rownum].cells[km].childNodes[0].value.split("/");
                                                                    val=new Date();
                                                                   val= val.setFullYear(newdate[2],newdate[1]-1,newdate[0]);
                                                                }else{
                                                                val = oTable.rows[rownum].cells[km].childNodes[0].value;
                                                            }}
                                                        } catch (err) {

                                                        }
                                                        if (chkid.indexOf("chkbox") != -1) {
                                                            if (oTable.rows[rownum].cells[km].childNodes[0].checked == true) {
                                                                val = 1;
                                                            } else {
                                                                val = 0;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (isexists == 0) {
                                                    if (ext == "id"){
                                                        val = $('#' + chkid.trim()).prop("title");
                                                       }else{
                                                        if(chktype == "Date"){
                                                       var  newdate = $('#' + chkid).val().split("/");
                                                        val=new Date();
                                                       val= val.setFullYear(newdate[2],newdate[1]-1,newdate[0]);
                                                    }else{
                                                        val = $('#' + chkid.trim()).val();
                                                    }
                                                    }
                                                    if (chkid.indexOf("chkbox") != -1) {
                                                        if (document.getElementById(chkid.trim()).checked == true) {
                                                            val = 1;
                                                        } else {
                                                            val = 0;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (chkid.indexOf("grdsum") != -1) {
                                                val = getGridTotal(chkid);
                                            } else {
                                                if (ext == "id") {
                                                    val = $('#' + chkid).attr("title");
                                                } else {
                                                    if(chktype == "Date"){
                                                       var  newdate = $('#' + chkid).val().split("/");
                                                        val=new Date();
                                                       val= val.setFullYear(newdate[2],newdate[1]-1,newdate[0]);
                                                    }else{
                                                    val = $('#' + chkid).val();
                                                }
                                                }
                                                if (chkid.indexOf("chkbox") != -1) {
                                                    if (document.getElementById(chkid).checked == true)
                                                        val = 1;
                                                    else
                                                        val = 0;
                                                }
                                            }
                                        }
                                    } else if (document.getElementById(chkid).tagName == "SELECT") {

                                        if (inptype == "grid") {
                                            var tableid = $('#curtable').val();
                                            var rownum = $('#currow').val();
                                            var oTable = document.getElementById(tableid);
                                             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
                                            var celLength = oCells.length;
                                            var val = "";
                                            var isexists = 0;
                                            for (var km = 2; km < celLength; km++) {
                                                if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
                                                    isexists = 1;
                                                    try {
                                                        if (ext == "id") {
                                                            val = oTable.rows[rownum].cells[km].childNodes[0].value;
                                                        } else {
                                                            var e = oTable.rows[rownum].cells[km].childNodes[0];
                                                            val = e.options[e.selectedIndex].text;
                                                        }
                                                    } catch (err) {
                                                        alert("getformulanew"+err);
                                                    }
                                                }
                                            }
                                            if (isexists == 0) {
                                                if (ext == "id") {
                                                    val = $('#' + chkid).val();
                                                } else {
                                                    val = $("#" + chkid + " option:selected").text();
                                                }
                                            }
                                        } else {
                                            if (ext == "id") {
                                                val = $('#' + chkid).val();
                                            } else {
                                                //actval = $('#'+fi[0]).attr("title");
                                                val = $("#" + chkid + " option:selected").text();
                                            }
                                        }
                                    }
                                }
                                } else
                                {
                                    val = chkid;
                                }
                                if (actid.indexOf("`") != -1) {
                                    val = "`" + val;
                                }
                            }
                        } else {
                            var val = k;
                        }
                        if (val == "")
                            val = 0;
                        var cher = isNaN(val);
                        if(cher == false)
                            val = val * 1;
                        result = result + val;
                        l--;
                        break;
                    }
                }
            }
            else {
                result = result + g;
            }
        }

        while (1) {
            if (result.indexOf("$") != -1) {
                result = result.replace("$", "");
            } else {
                break;
            }
        }
        result = result.replace(/`/g, "'");
        var formularesult = "";
        if (result.trim() != "") {
            try {
                if (result.toString().indexOf(":") != -1) {
                    var val1 = result.split(":");
                    var actval = val1[0];
                    var round = val1[1].replace("ROUND(", "").replace(")", "");
                    var actval = eval(actval);
                    if (!isNaN(actval)) {
                        result = parseFloat(actval).toFixed(round);
                    }
                    if (isNaN(actval)) {
                        if (result.toString().indexOf("ROUND") != -1) {
                            //alert("wrong formula-->"+result);
                            return "0";
                        }
                        if (result.toString().indexOf("POPONLY") != -1) {
                            //alert("wrong formula-->"+result);
                            return "0";
                        }
                    }
                    formularesult = result;
                }
                else {
                    formularesult = eval(result);
                }
            } catch (err) {
                if (result.indexOf("=") != -1) {
                    var result = result.replace("==", "=");
                    var res = result.split("=");
                    if (res[0].trim() == res[1].trim()) {
                        formularesult = true;
                    }
                } else {
                    formularesult = result;
                }
            }
        }
        else
            formularesult = "";
        return formularesult;
    } catch (err) {
        if (formula.replace("$", "").trim() == "serverDate") {
            return $('#currentdate').val();
        }
        alert(err + "--wrong formula-->" + formula);
    }
}
function replaceChangeData(data) {

    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();
    while (1) {
        if (data.indexOf("$fd") != -1) {
            data = data.replace("$fd", fromdt);
        } else {
            break;
        }
    }
    while (1) {
        if (data.indexOf("$td") != -1) {
            data = data.replace("$td", todt);
        } else {
            break;
        }
    }
    if (data.indexOf("ENDIF") != -1) {
        var dtl = data.trim().split("ENDIF");
        for (var j = 0; j < dtl.length; j++) {
            var qrytemp = dtl[j];
            qrytemp = qrytemp;
            if (qrytemp.trim().replace("ENDSH:QRY", "").replace("ENDSH:ROW", "") == "")
                continue;
            if (qrytemp.indexOf("ELSE ") != -1) {
                var chk = true;
                var wholedata = qrytemp.replace("ELSE ", "");
            } else {
                var qrytempdtl = qrytemp.split("THEN ");
                var condition = qrytempdtl[0];
                condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                condition = condition.trim().replace("ENDSH:ROW", "").replace("SH:ROW", "");
                var chk = getFormulaValue(condition, "");
                var wholedata = qrytempdtl[1];
            }
            if (chk) {
                data = wholedata;
                var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
                //var temptdata = data.replace("SH:QRY","").replace("ENDSH:QRY","");
                var temp = temptdata.split("^");
                try {
                    for (var t = 0; t < temp.length; t++) {
                        var temp1 = temp[t];
                        var tem = temp1.split("==");
                        var temp2 = tem[1].split(" ");
                        for (var i = 0; i < temp2.length; i++) {
                            if (temp2[i].indexOf("$") != -1) {
                                var chkid = "";
                                if (temp2[i].indexOf(".id") != -1 || temp2[i].indexOf(".value") != -1) {
                                    var ch = temp2[i].split(".");
                                    chkid = ch[0];
                                } else {
                                    chkid = temp2[i];
                                }
                                while (1) {
                                    if (chkid.indexOf("$") != -1) {
                                        chkid = chkid.replace("$", "");
                                    } else {
                                        break;
                                    }
                                }
                                chkid = chkid.replace(/`/g, "");
                                chkid = chkid.replace(/'/g, "");
                                var idvalue = "";
                                var idtitle = "";
                                try {
                                    if (document.getElementById(chkid).tagName == "INPUT") {
                                        idvalue = $('#' + chkid).val();
                                        idtitle = document.getElementById(chkid).title;
                                    } else if (document.getElementById(chkid).tagName == "SELECT") {
                                        idtitle = $('#' + chkid).val();
                                        idvalue = $("#" + chkid + " option:selected").text();
                                    }
                                    wholedata = wholedata.replace(chkid + ".id", idtitle);
                                    wholedata = wholedata.replace(chkid + ".value", idvalue);
                                } catch (err) {
                                    continue;
                                }
                                data = wholedata;
                            }
                        }
                    }
                } catch (err) {
                    //alert(err);
                }
                break;
            }
        }
    }


    else {
        if (data.indexOf("SH:QRY") != -1) {
            var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
            //var temptdata = data.replace("SH:QRY","").replace("ENDSH:QRY","");
            var temp = temptdata.split("^");
            try {
                for (var t = 0; t < temp.length; t++) {
                    var temp1 = temp[t];
                    var tem = temp1.split("==");
                    var temp2 = tem[1].split(" ");
                    for (var i = 0; i < temp2.length; i++) {
                        if (temp2[i].indexOf("$") != -1) {
                            var chkid = "";
                            if (temp2[i].indexOf(".id") != -1 || temp2[i].indexOf(".value") != -1) {
                                var ch = temp2[i].split(".");
                                chkid = ch[0];
                            } else {
                                chkid = temp2[i];
                            }
                            while (1) {
                                if (chkid.indexOf("$") != -1) {
                                    chkid = chkid.replace("$", "");
                                } else {
                                    break;
                                }
                            }
                            chkid = chkid.replace(/`/g, "");
                            chkid = chkid.replace(/'/g, "");
                            var idvalue = "";
                            var idtitle = "";
                            try {
                                if (document.getElementById(chkid).tagName == "INPUT") {
                                    idvalue = $('#' + chkid).val();
                                    idtitle = document.getElementById(chkid).title;
                                } else if (document.getElementById(chkid).tagName == "SELECT") {
                                    idtitle = $('#' + chkid).val();
                                    idvalue = $("#" + chkid + " option:selected").text();
                                }
                                data = data.replace(chkid + ".id", idtitle);
                                data = data.replace(chkid + ".value", idvalue)
                            } catch (err) {

                            }
                        }
                    }
                }
            } catch (err) {
            }
        }
    }
    data = data.replace(/`/g, "'");
    return data;
}
function getGridTotal(chkid) {
    var val = 0;

    chkid = chkid.replace("grdsum_", "");
    var tabid = $('#curtable').val();
    var oTable = document.getElementById(tabid);
    var rowLength = oTable.rows.length;
    for (var i = 0; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        var celLength = oCells.length;
        for (var km = 2; km < celLength; km++) {
            if (oTable.rows[i].cells[km].childNodes[0].id == undefined) {
                continue;
            }
            if (oTable.rows[i].cells[km].childNodes[0].id.trim() == chkid.trim()) {
                var idvalue = oTable.rows[i].cells[km].childNodes[0].value;
                if (idvalue.trim() == "")
                    idvalue = 0;
                val = parseFloat(val) + parseFloat(idvalue);
            }
        }
    }
    return val;
}
function replaceLabelvaluesnew(data) {

    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();

    while (1) {
        if (data.indexOf("$fd") != -1) {
            data = data.replace("$fd", fromdt);
        } else {
            break;
        }
    }
    while (1) {
        if (data.indexOf("$td") != -1) {
            data = data.replace("$td", todt);
        } else {
            break;
        }
    }
    data = data.replace(/`/g, "'");
}
function replacehead(data) {
    ;
    var dt = data.split(" ");
    for (var i = 0; i < dt.length; i++) {
        var chkid = dt[i];
        if (chkid.indexOf("$") == -1)
            continue;
        while (1) {
            if (chkid.indexOf("$") != -1) {
                chkid = chkid.replace("$", "");
            } else {
                break;
            }
        }
        chkid = chkid.replace(/`/g, "");
        chkid = chkid.replace(/'/g, "");
        var idvalue = "";
        var idtitle = "";
        var isradio = 0;
        try {
            document.getElementById(chkid).tagName;
        } catch (err) {
            if (chkid.indexOf("txtdt") != -1 || chkid.indexOf("txttm") != -1)
                chkid = chkid.replace("txtdt", "txtdtgrd");
            chkid = chkid.replace("txttm", "txttmgrd");
            if(chkid.indexOf("sel") == 0){
                    isradio = 1;
            }
        }
        if(isradio == 0){
        if (document.getElementById(chkid).tagName == "INPUT") {
            idvalue = $('#' + chkid).val();
            idtitle = document.getElementById(chkid).title;
        } else if (document.getElementById(chkid).tagName == "SELECT") {
            idtitle = $('#' + chkid).val();
            idvalue = $("#" + chkid + " option:selected").text();
        }
    }else{
        if(chkid.indexOf(".")!=-1){
            chkid = chkid.split(".")[0];
        }
        idvalue = getRadioValue(chkid,"value");
        idtitle = getRadioValue(chkid,"id");
    }
        data = data.replace(chkid + ".id", idtitle);
        data = data.replace(chkid + ".value", idvalue);
        data = data.replace(chkid, idvalue)
    }
    while (1) {
        if (data.indexOf("$") != -1) {
            data = data.replace("$", "");
        } else {
            break;
        }
    }
    return data;
}
//function replacehead(data) {
//    var dt = data.split(" ");
//    var fromdt = $('#txtFromDt').val();
//    var todt = $('#txtToDt').val();
//    for (var i = 0; i < dt.length; i++) {
//        var chkid = dt[i];
//        if (chkid.indexOf("$") == -1)
//            continue;
//        while (1) {
//            if (chkid.indexOf("$") != -1) {
//                chkid = chkid.replace("$", "");
//            } else {
//                break;
//            }
//        }
//        chkid = chkid.replace(/`/g, "");
//        chkid = chkid.replace(/'/g, "");
//        var idvalue = "";
//        var idtitle = "";
//        if (document.getElementById(chkid).tagName == "INPUT") {
//            idvalue = $('#' + chkid).val();
//            idtitle = document.getElementById(chkid).title;
//        } else if (document.getElementById(chkid).tagName == "SELECT") {
//            idtitle = $('#' + chkid).val();
//            idvalue = $("#" + chkid + " option:selected").text();
//        }
//        data = data.replace(chkid + ".id", idtitle);
//        data = data.replace(chkid + ".value", idvalue);
//        data = data.replace(chkid, idvalue);
//        data = data.replace("$fd",fromdt);
//        data = data.replace("$td",todt);
//    }
//    while (1) {
//        if (data.indexOf("$") != -1) {
//            data = data.replace("$", "");
//        } else {
//            break;
//        }
//    }
//    return data;
//}
function replaceLabelvalues(data) {
    
    ;
    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();
    
    var finalquery = "";
    while (1) {
        if (data.indexOf("$fd") != -1) {
            data = data.replace("$fd", fromdt);
        } else {
            break;
        }
    }
    while (1) {
        if (data.indexOf("$td") != -1) {
            data = data.replace("$td", todt);
        } else {
            break;
        }
    }
    var temptdata = "";
    if (data.indexOf("SH:QRY") != -1)
        temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
    else
        temptdata = data;
    var temp = temptdata.split("^");
    try {
        for (var t = 0; t < temp.length; t++) {
            var temp1 = temp[t];
            if (temp1.trim() == "")
                continue;
            var tem = temp1.split("==");
            var temp2 = tem[1].split(" ");
            finalquery = finalquery + " " + tem[0] + "==" + replaceWithHeadFields(tem[1]) + " ^ ";
//                    for(var i=0 ; i<temp2.length;i++){
//                        if(temp2[i].indexOf("$") != -1){
//                         m   var chkid = "";
//                            if(temp2[i].indexOf("$loc") != -1 || temp2[i].indexOf("$dept") != -1 || temp2[i].indexOf("$sdept")!= -1 ||temp2[i].indexOf("$serverDate")!= -1 ||temp2[i].indexOf("$gFinYearStart")!= -1 ||temp2[i].indexOf("$gFinYearEnd")!= -1 ||temp2[i].indexOf("$soc") != -1 ||temp2[i].indexOf("$shiftid")!= -1 ||temp2[i].indexOf("$terminal")!= -1 ||temp2[i].indexOf('$version')!= -1 ||temp2[i].indexOf('$userid')!= -1 ||temp2[i].indexOf('$usernm')!= -1)
//                                continue;
//                            if(temp2[i].indexOf(".id") !=-1 || temp2[i].indexOf(".value") !=-1){
//                                var ch = temp2[i].split(".");
//                                chkid = ch[0];
//                            }else{
//                                chkid = temp2[i];
//                            }
//                            while(1){
//                                if(chkid.indexOf("$") != -1){
//                                    chkid = chkid.replace("$","");
//                                }else{
//                                    break;
//                                }
//                            }
//                            chkid = chkid.replace(/`/g,"");
//                            chkid = chkid.replace(/'/g,"");
//                             chkid = chkid.replace(/persymbol/g,"");
//                            chkid = chkid.replace(/%/g,"");
//                            var idvalue = "";
//                            var idtitle = "";
//                            try{
//                            if(document.getElementById(chkid).tagName == "INPUT"){
//                                idvalue = $('#'+chkid).val();
//                                idtitle = document.getElementById(chkid).title;
//                            }else if(document.getElementById(chkid).tagName == "SELECT"){
//                                idtitle = $('#'+chkid).val();
//                                idvalue = $("#"+chkid+" option:selected").text();
//                            }
//                            data = data.replace(chkid+".id",idtitle);
//                            data = data.replace(chkid+".value",idvalue);
//                        }catch(err){
//                            continue;
//                        }
//                        }
//                    }
        }
    } catch (err) {
        // alert(err);
    }
    data = finalquery;
    data = data.replace(/`/g, "'");
    return data;
}
//function replaceLabelvalues(data) {
//
//    var fromdt = $('#txtFromDt').val();
//    var todt = $('#txtToDt').val();
//
//    while (1) {
//        if (data.indexOf("$fd") != -1) {
//            data = data.replace("$fd", fromdt);
//        } else {
//            break;
//        }
//    }
//    while (1) {
//        if (data.indexOf("$td") != -1) {
//            data = data.replace("$td", todt);
//        } else {
//            break;
//        }
//    }
//    var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
//    var temp = temptdata.split("^");
//    try {
//        for (var t = 0; t < temp.length; t++) {
//            var temp1 = temp[t];
//            var tem = temp1.split("==");
//            var temp2 = tem[1].split(" ");
//            for (var i = 0; i < temp2.length; i++) {
//                if (temp2[i].indexOf("$") != -1) {
//                    var chkid = "";
//                    if (temp2[i].indexOf("$loc") != -1 || temp2[i].indexOf("$dept") != -1 || temp2[i].indexOf("$sdept") != -1 || temp2[i].indexOf("$serverDate") != -1 || temp2[i].indexOf("$gFinYearStart") != -1 || temp2[i].indexOf("$gFinYearEnd") != -1 || temp2[i].indexOf("$soc") != -1 || temp2[i].indexOf("$shiftid") != -1 || temp2[i].indexOf("$terminal") != -1 || temp2[i].indexOf('$version') != -1 || temp2[i].indexOf('$userid') != -1 || temp2[i].indexOf('$usernm') != -1)
//                        continue;
//                    if (temp2[i].indexOf(".id") != -1 || temp2[i].indexOf(".value") != -1) {
//                        var ch = temp2[i].split(".");
//                        chkid = ch[0];
//                    } else {
//                        chkid = temp2[i];
//                    }
//                    while (1) {
//                        if (chkid.indexOf("$") != -1) {
//                            chkid = chkid.replace("$", "");
//                        } else {
//                            break;
//                        }
//                    }
//                    chkid = chkid.replace(/`/g, "");
//                    chkid = chkid.replace(/'/g, "");
//                    var idvalue = "";
//                    var idtitle = "";
//                    if (document.getElementById(chkid).tagName == "INPUT") {
//                        idvalue = $('#' + chkid).val();
//                        idtitle = document.getElementById(chkid).title;
//                    } else if (document.getElementById(chkid).tagName == "SELECT") {
//                        idtitle = $('#' + chkid).val();
//                        idvalue = $("#" + chkid + " option:selected").text();
//                    }
//                    data = data.replace(chkid + ".id", idtitle);
//                    data = data.replace(chkid + ".value", idvalue)
//                }
//            }
//        }
//    } catch (err) {
//        // alert(err);
//    }
//    data = data.replace(/`/g, "'");
//    return data;
//}
//function replaceLabelvaluesgrid(data, rownum, tablename) {
//
//    var fromdt = $('#txtFromDt').val();
//    var todt = $('#txtToDt').val();
//    while (1) {
//        if (data.indexOf("$fd") != -1) {
//            data = data.replace("$fd", fromdt);
//        } else {
//            break;
//        }
//    }
//    while (1) {
//        if (data.indexOf("$td") != -1) {
//            data = data.replace("$td", todt);
//        } else {
//            break;
//        }
//    }
//    var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
//    var temp = temptdata.split("^");
//    try {
//        for (var t = 0; t < temp.length; t++) {
//            var temp1 = temp[t];
//            var tem = temp1.split("==");
//            var temp2 = tem[1].split(" ");
//            for (var i = 0; i < temp2.length; i++) {
//                if (temp2[i].indexOf("$") != -1) {
//                    var chkid = "";
//                    if (temp2[i].indexOf(".id") != -1 || temp2[i].indexOf(".value") != -1) {
//                        var ch = temp2[i].split(".");
//                        chkid = ch[0];
//                    } else {
//                        chkid = temp2[i];
//                    }
//                    while (1) {
//                        if (chkid.indexOf("$") != -1) {
//                            chkid = chkid.replace("$", "");
//                        } else {
//                            break;
//                        }
//                    }
//                    chkid = chkid.replace(/`/g, "");
//                    var idvalue = "";
//                    var idtitle = "";
//                    var oTable = document.getElementById(tablename);
//                    var oCells = oTable.rows.item(rownum).cells;
//                    var celLength = oCells.length;
//                    var val = "";
//                    for (var km = 2; km < celLength; km++) {
//                        if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
//                            continue;
//                        }
//                        if (oTable.rows[rownum].cells[km].childNodes[0].id.trim() == chkid.trim()) {
//                            idtitle = oTable.rows[rownum].cells[km].childNodes[0].title;
//                            idvalue = oTable.rows[rownum].cells[km].childNodes[0].value;
//                            data = data.replace("$" + chkid + ".id", idtitle);
//                            data = data.replace("$" + chkid + ".value", idvalue)
//                        }
//                    }
//                }
//            }
//        }
//    } catch (err) {
//    }
//    data = data.replace(/`/g, "'");
//    return data;
//}
function replaceLabelvaluesgrid(data, rownum, tablename) {
    ;
    var finalquery = "";
    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();
    while (1) {
        if (data.indexOf("$fd") != -1) {
            data = data.replace("$fd", fromdt);
        } else {
            break;
        }
    }
    while (1) {
        if (data.indexOf("$td") != -1) {
            data = data.replace("$td", todt);
        } else {
            break;
        }
    }
    var temptdata = "";
    if(data.indexOf("SH:QRY")!=-1){
        temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
    }else{
        temptdata = data;
    }
    //var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
    var temp = temptdata.split("^");
    try {
        for (var t = 0; t < temp.length; t++) {
            var temp1 = temp[t];
            if (temp1.trim() == "")
                continue;
            var tem = temp1.split("==");
            var fdata = tem[1];
            var temp2 = tem[1].split(" ");
            var idvalue = "";
            var idtitle = "";
            var oTable = document.getElementById(tablename);
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                                        }catch(err){ return "";}
            var celLength = oCells.length;
            var val = "";
            for (var km = 2; km < celLength; km++) {
                if (oTable.rows[rownum].cells[km].childNodes[0].id == undefined) {
                    continue;
                }
                var orgid = oTable.rows[rownum].cells[km].childNodes[0].id;
                var ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                var orgid = orgid.replace("txtdtgrd", "txtdt").replace("txttmgrd", "txttm").replace(/[0-9]/g, '');
                if (ctype == "Combo" || ctype == "Radio") {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].value;
                    var e = oTable.rows[rownum].cells[km].childNodes[0];
                    idvalue = e.options[e.selectedIndex].text;
                } else {
                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].title;
                    idvalue = oTable.rows[rownum].cells[km].childNodes[0].value;
                }
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".id", idtitle);
                fdata = replaceFunction(fdata, "dollorsymbol" + orgid + ".value", idvalue);
//                                    data = data.replace("$"+chkid+".id",idtitle);
//                                    data = data.replace("$"+chkid+".value",idvalue)
            }
            finalquery = finalquery + tem[0] + "==" + fdata + " ^ ";
//                    for(var i=0 ; i<temp2.length;i++){
//                        if(temp2[i].indexOf("$") != -1){
//                            var chkid = "";
//                            if(temp2[i].indexOf(".id") !=-1 || temp2[i].indexOf(".value") !=-1){
//                                var ch = temp2[i].split(".");
//                                chkid = ch[0];
//                            }else{
//                                chkid = temp2[i];
//                            }
//                            while(1){
//                                if(chkid.indexOf("$") != -1){
//                                    chkid = chkid.replace("$","");
//                                }else{
//                                    break;
//                                }
//                            }
//                            chkid = chkid.replace(/`/g,"");
//                            chkid = chkid.replace(/persymbol/g,"");
//                            chkid = chkid.replace(/%/g,"");
//                            var idvalue = "";
//                            var idtitle = "";
//                            var oTable = document.getElementById(tablename);
//                            var oCells = oTable.rows.item(rownum).cells;
//                            var celLength = oCells.length;
//                            var val = "";
//                            for(var km = 2;km<celLength;km++){
//                                if(oTable.rows[rownum].cells[km].childNodes[0].id == undefined){
//                                    continue;
//                                }
//                                if(oTable.rows[rownum].cells[km].childNodes[0].id.trim() == chkid.trim()){
//                                    idtitle = oTable.rows[rownum].cells[km].childNodes[0].title;
//                                    idvalue = oTable.rows[rownum].cells[km].childNodes[0].value;   
//                                    data = data.replace("$"+chkid+".id",idtitle);
//                                    data = data.replace("$"+chkid+".value",idvalue)
//                                }
//                            }
//                        }
//                    }
        }
    } catch (err) {
    }
    data = finalquery;
    data = data.replace(/`/g, "'");
    return data;
}
function test_skill(id, id1) {
    id = id.replace("$", "").trim();
    id1 = id1.replace("$", "").trim();
    var junkVal = document.getElementById(id).value;
    junkVal = Math.floor(junkVal);
    var obStr = new String(junkVal);
    var numReversed = obStr.split("");
    var actnumber = numReversed.reverse();

    if (Number(junkVal) >= 0) {
        //do nothing
    }
    else {
        alert('wrong Number cannot be converted');
        document.getElementById(id1).value = "";
        return false;
    }
    if (Number(junkVal) == 0) {
        document.getElementById(id1).value = 'Rupees Zero Only';
        return false;
    }
    if (actnumber.length > 9) {
        alert('Oops!!!! the Number is too big to convert');
        return false;
    }

    var iWords = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
    var ePlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
    var tensPlace = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

    var iWordsLength = numReversed.length;
    var totalWords = "";
    var inWords = new Array();
    var finalWord = "";
    j = 0;
    for (i = 0; i < iWordsLength; i++) {
        switch (i)
        {
            case 0:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                inWords[j] = inWords[j] + ' Only';
                break;
            case 1:
                tens_complication();
                break;
            case 2:
                if (actnumber[i] == 0) {
                    inWords[j] = '';
                }
                else if (actnumber[i - 1] != 0 && actnumber[i - 2] != 0) {
                    inWords[j] = iWords[actnumber[i]] + ' Hundred and';
                }
                else {
                    inWords[j] = iWords[actnumber[i]] + ' Hundred';
                }
                break;
            case 3:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
                    inWords[j] = inWords[j] + " Thousand";
                }
                break;
            case 4:
                tens_complication();
                break;
            case 5:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
                    inWords[j] = inWords[j] + " Lakh";
                }
                break;
            case 6:
                tens_complication();
                break;
            case 7:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                inWords[j] = inWords[j] + " Crore";
                break;
            case 8:
                tens_complication();
                break;
            default:
                break;
        }
        j++;
    }

    function tens_complication() {
        if (actnumber[i] == 0) {
            inWords[j] = '';
        }
        else if (actnumber[i] == 1) {
            inWords[j] = ePlace[actnumber[i - 1]];
        }
        else {
            inWords[j] = tensPlace[actnumber[i]];
        }
    }
    inWords.reverse();
    for (i = 0; i < inWords.length; i++) {
        finalWord += inWords[i];
    }
    document.getElementById(id1).value = finalWord;
}
function close1() {
    location.href = 'dashboardmenubuttons.html';
}
//function replaceWithHeadFields(data) {
//    
//    var changedata = data;
//    var tables = ["dynamictable", "tabhidden", "tabAfter"];
//    var tablist = document.getElementsByTagName("table");
//    for (var k = 0; k < tablist.length; k++) {
//        var tabid = tablist[k].id;
//        if (tabid.indexOf("tab_dyna") != -1) {
//            var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
//            try {
//                tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
//                document.getElementById(tid);
//            } catch (err) {
//                continue;
//            }
//        }
//    }
//    for (var ta = 0; ta < tables.length; ta++) {
//        ;
//        var table = document.getElementById(tables[ta]);
//        var textbox = table.getElementsByTagName("input");
//        var dropdown = table.getElementsByTagName("select");
//        var checkbox = table.getElementsByTagName("checkbox");
//        var textarea = table.getElementsByTagName("textarea");
//        for (var i = 0; i < textbox.length; i++) {
//            
//            try {
//                var controltype = $(textbox[i]).attr("controltype");
//                if (controltype != undefined) {
//                    var id = textbox[i].id;
//                    var value = "";
//                    if (controltype == "Text" || controltype == "Date" || controltype == "Time" || controltype == "AgeDOB") {
//                        value = textbox[i].value;
//                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
//                        data = replaceFunction(data, "dollorsymbol" + id + ".id", value);
//                        // data = replaceFunction(data,"dollorsymbol"+id,value);
//                    } else if (controltype == "SearchText") {
//                        value = textbox[i].value;
//                        var titl = textbox[i].title;
//                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
//                        data = replaceFunction(data, "dollorsymbol" + id + ".id", titl);
//                        //data = replaceFunction(data,"dollorsymbol"+id,value);
//                    } else if (controltype == "Checkbox") {
//                        var value = 0;
//                        if (document.getElementById(textbox[i].id.trim()).checked == true) {
//                            value = 1;
//                        } else {
//                            value = 0;
//                        }
//                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
//                        data = replaceFunction(data, "dollorsymbol" + id + ".id", value);
//                        //data = replaceFunction(data,"dollorsymbol"+id,value);
//                    }
//                }
//            } catch (err) {
//                alert(err + "---" + textbox[i].id);
//            }
//           
//        }
//        for (var i = 0; i < dropdown.length; i++) {
//            try {
//                var controltype = $(dropdown[i]).attr("controltype");
//                if (controltype != undefined) {
//                    var id = dropdown[i].id;
//                    var value = "";
//                    if (controltype == "Combo" || controltype == "Radio") {
//                       
//                        value = $("#" + dropdown[i].id + " option:selected").text();
//                        var idval = document.getElementById(dropdown[i].id).value;
//                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
//                        data = replaceFunction(data, "dollorsymbol" + id + ".id", idval);
//                    }
//                }
//            } catch (err) {
//                alert(err);
//            }
//        }
//    }
//    return data;
//}
function replaceWithHeadFields(data) {
    var changedata = data;
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    var tablist = document.getElementsByTagName("table");
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
            try {
                tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
                document.getElementById(tid);
            } catch (err) {
                continue;
            }
        }else if(tabid.indexOf("tabgrd") == 0){
            try {
                tables.push(tabid);
            } catch (err) {
                continue;
            }
        }
    }
    for (var ta = 0; ta < tables.length; ta++) {
        var table = document.getElementById(tables[ta]);
        var textbox = table.getElementsByTagName("input");
        var dropdown = table.getElementsByTagName("select");
        var checkbox = table.getElementsByTagName("checkbox");
        var textarea = table.getElementsByTagName("textarea");
        for (var i = 0; i < textbox.length; i++) {
            try {
                var controltype = $(textbox[i]).attr("controltype");
                if (controltype != undefined) {
                    var id = textbox[i].id;
                    var value = "";
                    if (controltype == "Text" || controltype == "Date" || controltype == "Time" || controltype == "AgeDOB" || controltype == "Password") {
                        value = textbox[i].value;
                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
                        data = replaceFunction(data, "dollorsymbol" + id + ".id", value);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".VALUE", value);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".ID", value);
                    } else if (controltype == "SearchText") {
                        value = textbox[i].value;
                        var titl = textbox[i].title;
                        var nm = document.getElementById(id).name;
                        var nm1 = nm.split(",!");
                        if (nm1[2] == 1) {
                            value = getMultiSelData(id, "value", value);
                            titl = getMultiSelData(id, "id", titl);
                        }
                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
                        data = replaceFunction(data, "dollorsymbol" + id + ".id", titl);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".VALUE", value);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".ID", titl);
                    } else if (controltype == "Checkbox") {
                        var value = 0;
                        if (document.getElementById(textbox[i].id.trim()).checked == true) {
                            value = 1;
                        } else {
                            value = 0;
                        }
                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
                        data = replaceFunction(data, "dollorsymbol" + id + ".id", value);
                           data = replaceFunction(data, "dollorsymbol" + id.toUpperCase()  + ".VALUE", value);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase()  + ".ID", value);
                    }
                }
            } catch (err) {
                alert(err + "---" + textbox[i].id);
            }
        }
        for (var i = 0; i < dropdown.length; i++) {
            try {
                var controltype = $(dropdown[i]).attr("controltype");
                if (controltype != undefined) {
                    var id = dropdown[i].id;
                    var value = "";
                    if (controltype == "Combo" || controltype == "Radio") {
                        value = $("#" + dropdown[i].id + " option:selected").text();
                        var idval = document.getElementById(dropdown[i].id).value;
                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
                        data = replaceFunction(data, "dollorsymbol" + id + ".id", idval);
                         data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".VALUE", value);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".ID", idval);
                    }
                }
            } catch (err) {
            }
        }
        for (var i = 0; i < textarea.length; i++) {
            var id = textarea[i].id;
            //confirm(textarea[i].id+"--"+$('#'+textarea[i].id).val());
                        var value = $('#'+textarea[i].id).val();
                        data = replaceFunction(data, "dollorsymbol" + id + ".value", value);
                        data = replaceFunction(data, "dollorsymbol" + id + ".id", idval);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".VALUE", value);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".ID", idval);
        }
    }
    ;
    try{
        var soc = $('#txtsocid').val();
        id = "txtsocid";
        data = replaceFunction(data, "dollorsymbol" + id + ".value", soc);
                        data = replaceFunction(data, "dollorsymbol" + id + ".id", soc);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".VALUE", soc);
                        data = replaceFunction(data, "dollorsymbol" + id.toUpperCase() + ".ID", soc);
    }catch(err){}
    try{
    if(data.indexOf("grd_") != -1){
        var res = data.split(" ");
        
        for(i =0;i<res.length;i++){
            var qryfield = res[i];
            if(qryfield.indexOf("grd_")!= -1){
                qryfield = qryfield.replace(/'/g,"");
                qryfield = qryfield.replace(/`/g,"");
                qryfield = qryfield.replace(/\(/g,"");
                qryfield = qryfield.replace(/\)/g,"");
                var alldata = getgridvalues(qryfield);
                qryfield = qryfield.replace("$","");
                data = replaceFunction(data, "dollorsymbol" + qryfield, alldata);
                data = replaceFunction(data, "dollorsymbol" + qryfield.toUpperCase(), alldata);
                       // data = replaceFunction(data, "dollorsymbol" + qryfield + ".id", alldata);
        }
    }
}

    }catch(err){
        
    }
    return data;
}

function replaceFunction(data, id, value) {
    while (1) {
        if (data.indexOf("$") != -1) {
            data = data.replace("$", "dollorsymbol");
        } else {
            break;
        }
    }
    var chg = replaceAllFunc(id, value, data);
    chg = chg.replace(/dollorsymbol/g, '$');
    return chg;
}
function replaceAllFunc(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function changefunctiongridbtn(id, id1,gridtype,rowdata,thisid,bubbleform,type) {
    ;
    var bubblefromdt = $('#txtdtFrom_Date').val();
    var bubbletodt = $('#txtdtTo_Date').val();
    if(bubblefromdt == undefined || bubblefromdt == "undefined" )
        bubblefromdt = $('#txtFromDt').val();
      if(bubbletodt == undefined || bubbletodt == "undefined" )
        bubbletodt = $('#txtToDt').val();
    localStorage.bubblefromdt=bubblefromdt;
    localStorage.bubbletodt=bubbletodt;
//        var form = document.createElement("form");
//form.setAttribute("method", "post");
var bubbledata = $('#bubbledata').val();
//alert(bubbledata);
if(bubbledata.trim() != ""){
    var p1 = bubbledata.toString().split("@!!@");
                for (var k = 1; k < p1.length; k++) {
                   var pk = p1[k].split(",!");
                   if(pk[0].trim() == bubbleform.trim()){
                       bubbleform = pk[1].trim();
                       break;
                   }
                }
}
//form.setAttribute("action", localStorage.ipadrs+"/admin/DrillDashboardview.jsp?webformid="+bubbleform+"&formid="+bubbleform+"&drillfromdt="+bubblefromdt+"&drilltodt="+bubbletodt+mobile);

//form.setAttribute("target", "view");

//var hiddenField = document.createElement("input"); 
//hiddenField.setAttribute("type", "hidden");
//hiddenField.setAttribute("name", "formviewdata");

var paramdata = getHeadDataSearch();
var griddata = "";
//document.body.appendChild(form);
if(type=="grid"){
var i = $('#currow').val();
        var tablename = $('#curtable').val();
        $('#curtable').val(tablename);
        $('#currow').val(i);
var oTable = document.getElementById(tablename);
var rownum = i;
            //var oCells = oTable.rows.item(rownum).cells;
             try{
                                            var oCells = oTable.rows.item(rownum).cells;
                            var celLength = oCells.length;
                            for (j = 2; j < celLength; j++)
                            {
                                var type = oTable.rows[rownum].cells[j].childNodes[0].tagName;
                                var value = "";
                                value = oTable.rows[rownum].cells[j].childNodes[0].id;
                                var ctype = $(oTable.rows[rownum].cells[j].childNodes[0]).attr("controltype");
                                if(ctype == "Date"){
                                    value = value.replace(/[0-9]/g, '');
                                }
                                if(ctype == "Time"){
                                    value = value.replace(/[0-9]/g, '');
                                }
                                var idval = value;
                                if (type == "INPUT") {
                                    var name = oTable.rows[i].cells[j].childNodes[0].name;
                                    if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {value = "to_date('','dd/mm/yyyy')";}
                                        else {value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";}
                                    }else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {value = "to_date('','hh:mi:ss AM')";}
                                        else {value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";}
                                    }else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0){
                                        if (oTable.rows[i].cells[j].childNodes[0].checked == true) {value = "1";}
                                        else{value = "0";}
                                    }  else {
                                        var controltype = $(oTable.rows[i].cells[j].childNodes[0]).attr("controltype");
                                        try{if(controltype == "SearchText"){if(oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value!= ""){alert("Please select the search Properly for rownum  "+i+", for "+oTable.rows[i].cells[j].childNodes[0].value);$('#btnsave').removeAttr('disabled'); $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';oTable.rows[i].cells[j].childNodes[0].focus();return false;}}}catch(err){}
                                        if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                            value = oTable.rows[i].cells[j].childNodes[0].value;
                                        else
                                            value = oTable.rows[i].cells[j].childNodes[0].title;
                                    }
                                }else if(type == "SELECT"){value = oTable.rows[i].cells[j].childNodes[0].value;}
                                else if(type == "TEXTAREA"){value = oTable.rows[i].cells[j].childNodes[0].value;}
                                if (value == "")
                                    value = " ";
                                griddata = griddata + "@!!@" + idval + ",!"+value;
                            }
            }catch(err){alert("error--"+err) }
        }
       // alert(griddata);
//            hiddenField.setAttribute("value", griddata+paramdata);
            localStorage.formviewdata=griddata+paramdata;
            localStorage.currentformid=bubbleform;
            location.href="Drilldashboard.html";
//form.appendChild(hiddenField);
//window.open('', 'view');

//form.submit();
    }