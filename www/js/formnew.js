/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mobile = "&mobile=yes&terminalid=" + localStorage.terminal + "&shiftid=SH000001&subdeptid=" + localStorage.sdeptid + "&deptid=" + localStorage.deptid + "&loc=" + localStorage.locid + "&usernm=" + localStorage.usernm + "&userid=" + localStorage.userid + "&guserid=" + localStorage.userid + "&gusernm=" + localStorage.usernm + "&gloc=" + localStorage.locid + "&gdept=" + localStorage.deptid + "&gsubdept=" + localStorage.sdeptid + "&ShiftId=SH000001&version=" + localStorage.appname + "&clientip=" + localStorage.terminal+"&rights="+encodeURIComponent(localStorage.rights);
function checking() {
    newData();
    try {
        var searchinform = $('#serachform').val();
        var showcompanynm = $('#subcompany').val();
        try {
            document.getElementById("mydiv1").style.display = 'none';
        }
        catch (ee) {

        }
        if (showcompanynm == 1) {
            getCompanyNames();
            document.getElementById("displaycompany").style.display = "block";
        }
        if (searchinform == 1) {
            getSearchData()
        } else {
            try {
                document.getElementById("divsearchdata").style.display = 'none';
            } catch (ee) {

            }
        }
//        logtext();
    }
    catch (err) {
        alert(err);
    }
    var dis = $('#hdnnewdisable').val();
    var imgcap = $('#hdnimgcap').val();
    var masterform = '';
    if (masterform == 1) {
        document.getElementById("tabactive").style.display = "inline-block";
    } else {
        document.getElementById("tabactive").style.display = "none";
    }
    if (imgcap == 1) {
        document.getElementById("imagetd").style.display = "inline-block";
        document.getElementById("imgPatient").style.display = "inline-block";
        $('#booth').animate({'height': '50', 'width': '50'}, 900);
        $('#imgPatient').animate({'height': '50', 'width': '50'}, 900);
    } else {
        document.getElementById("imagetd").style.display = "none";
    }
    if (dis == 1) {
        $('#btnnew').attr('disabled', 'disabled');
    }
    var dis = $('#hdnoptionform').val();
    if (dis == 1) {
        editData();
        $('#btnedit').removeAttr('disabled');
        searchData();
    }
    // $('.Date1').val('<%= date10%>');
    fillPrints();
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    for (var ta = 0; ta < tables.length; ta++) {
        var table = document.getElementById(tables[ta]);
        var textbox = table.getElementsByTagName("input");
        var dropdown = table.getElementsByTagName("select");

        for (var i = 0; i < dropdown.length; i++) {
            var value = dropdown[i].title;
            var chkid = dropdown[i].id;
            try {
                document.getElementById(chkid).onchange();
            } catch (err) {
            }
        }
    }
debugger;
    var transid = $('#hdntransid').val();
    ;
    if (transid != 'null') {
        document.getElementById('search_qry').value = transid;
        document.getElementById('search_qry').onchange();
    }
    else if (document.getElementById('disfrom').value === "1")
        var id = document.getElementById('disid').value;


    try {
        document.getElementById(id).value = document.getElementById('disvalue').value;
        document.getElementById(id).title = document.getElementById('disvalue').value;
        var dateid = document.getElementById("disdateid").value;
        document.getElementById(dateid).value = document.getElementById('disdatevalue').value;
    } catch (err) {

    }
    try {
        var surgeryid = document.getElementById("dissurgeryid").value;
        document.getElementById(surgeryid).value = document.getElementById('dissurgeryvalue').value;
        document.getElementById(surgeryid).title = document.getElementById('dissurgeryvalue').value;
        document.getElementById(surgeryid).onchange();
    } catch (err) {

    }
    try {
        var disdocid = document.getElementById('disdoctorid').value;
        try {
            document.getElementById(disdocid).value = document.getElementById('disdoctorvalue').value;
        } catch (ee) {

        }
        document.getElementById(id).onchange();
    } catch (errr) {

    }
    try {
        var imgid = $('#hdniconid').val();
        if (imgid != "") {
            document.getElementById("imgsrc").style.display = 'inline-block';
            var str1 = imgid;
            var root = window.location.protocol + "//" + window.location.host + "/";
            var path = root + "icons/" + str1;
            document.getElementById("imgsrc").src = path;
        }
    } catch (err) {
        alert(err);
    }




    if (document.getElementById('disid').value != "" && document.getElementById('disfrom').value != "1") {

        var linktoform = $('#hdnlinktoform').val();
        var fieldid = document.getElementById('disid').value;
        if (linktoform != 'null') {
            if (fieldid.indexOf("_searchid") != -1) {
                getkeyward(fieldid, linktoform);
            } else {
                document.getElementById(fieldid).value = linktoform;
                document.getElementById(fieldid).onchange();
            }
        }
    }
    var isdb = $('#hdndblayerexists').val();
    if (isdb == 0) {
        $('.sidebar').hide();
        $('.sidebar3').hide();
        $('.sidebar4').hide();
    }
}
function newData() {

    $('#txtSaveType').val("new");
    try {
        var imgcap = $('#hdnimgcap').val();
        if (imgcap == 1) {
            document.getElementById("imagetd").style.display = "inline-block";
            document.getElementById("imgPatient").style.display = "inline-block";
            $('#booth').animate({'height': '50', 'width': '50'}, 900);
            $('#imgPatient').animate({'height': '50', 'width': '50'}, 900);
        }
        document.getElementById("lbl_UserNm").innerHTML = localStorage.usernm;
        document.getElementById("mm").value = $('#hdntime10').val();
        document.getElementById("dd").value = $('#hdndate10').val();
        $('#txtFromDt').val($('#hdndate10').val());
        $('#txtToDt').val($('#hdndate10').val());
        document.getElementById("lbl_LocNm").innerHTML = localStorage.locnm;
        //$('.Date1').val($('#dd').val());
        $('#btnsave').removeAttr('disabled');
        $('#btnnew').attr('disabled', 'disabled');
        $('#btnedit').attr('disabled', 'disabled');
        $('#btncancel').removeAttr('disabled');
        $('#btncancel1').removeAttr('disabled');
        $('#btndelete').attr('disabled', 'disabled');

        var tables = ["dynamictable", "tabhidden", "tabAfter"];
        for (var ta = 0; ta < tables.length; ta++) {
            var table = document.getElementById(tables[ta]);
            var textbox = table.getElementsByTagName("input");
            var dropdown = table.getElementsByTagName("select");
            var paramdata = '';
            var rowids = "";
            for (var i = 0; i < textbox.length; i++) {
                if (textbox[i].type == "text") {
                    if (textbox[i].name == "" && textbox[i].id.indexOf("chkbox") == -1) {
                        var rowid = textbox[i].id.replace("txt", "tr");
                        //$('#'+rowid).remove();
                        if (rowids == "") {
                            rowids = rowid;
                        } else {
                            rowids = rowids + "," + rowid;
                        }
                        continue;
                    }
                    textbox[i].value = "";
                    try {
                        textbox[i].title = "";
                    } catch (err) {

                    }
                }

                if (textbox[i].id.indexOf("txtdt") != -1) {
                    var appdt = $('#' + textbox[i].id).attr("applydate");
                    if (appdt == "0")
                        $('#' + textbox[i].id).val($('#dd').val());
                    else
                        $('#' + textbox[i].id).val("");
                }
                if (textbox[i].id.indexOf("txttm") != -1) {
                    var appdt = $('#' + textbox[i].id).attr("applydate");
                    if (appdt == "0") {
                        var today = new Date();
                        var h = today.getHours();
                        var m = today.getMinutes();
                        var s = today.getSeconds();
                        var tm = "am";
                        if (h >= 12) {
                            tm = "pm";
                            if (h != 12)
                                h = h - 12;
                        }
                        if (h < 10) {
                            h = "0" + h;
                        }
                        var curtm = h + ":" + m + ":00 " + tm;
                        $('#' + textbox[i].id).val(curtm);
                    } else {
                        $('#' + textbox[i].id).val("");
                    }
                }
            }

            if (rowids != "") {
                var rw = rowids.split(",");
                for (var r = 0; r < rw.length; r++) {
                    $('#' + rw[r]).remove();
                }
            }
            var textarea = table.getElementsByTagName("textarea");
            for (var i = 0; i < textarea.length; i++) {
                if (textarea[i].id.indexOf("txtarea") != -1)
                    ;
                if (textarea[i].id == "textbox") {
                    var editor = textboxio.replace('#textbox');
                    editor.content.set("");
                } else {
                    textarea[i].value = "";
                }
            }
            try {
                for (var i = 0; i < dropdown.length; i++) {
                    var value = dropdown[i].title;
                    var chkid = dropdown[i].id;
                    $("#" + chkid.trim().replace("$", "") + " option").each(function () {
                        if ($(this).text().trim() == value.trim()) {
                            $(this).attr('selected', 'selected');
                            this.selected = true;
                        }
                    });
                    dropdown[i].onchange();
                }
            } catch (err) {

            }
        }
        clearGrid();
        checkRights("new");
        if ($('#hdnwizard').val() === "1") {
            $('.btnprevnextnewdiv').hide();
            $('.btnprevnextprintdiv').hide();
            changedivs('1', $('#page1'));
        }
        autoTextareaHeight();

    } catch (err) {
        hideProgress();
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
                                var val = pselect.options[chki].value;
                                if (val == value) {
                                    pselect.selectedIndex = chki;
                                    break;
                                }
                            }
                        }
                        else {
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                        }
                    } catch (err) {

                    }
                }

            }
        }
    }
}
function checkRights(type) {
    debugger;
    var buttons;
    var rights = localStorage.rights;
    rights = rights.trim();
    if (localStorage.reg === "1") {
        document.getElementById("btnsave").style.display = 'inline-block';
        document.getElementById("btndelete").style.display = 'none';
        document.getElementById("btnprint").style.display = 'none';
        document.getElementById("divsearchbtn").style.display = 'none';

        var saveButton = " <a href='#' class='savewthflpy'><span class='glyphicon glyphicon-floppy-save'></span> Save</a>";
        $('#btnsave').html(saveButton);
        return;

    }
    if (rights == 'null' || rights == 'All') {
        document.getElementById("btnsave").style.display = 'inline-block';
        if ($('#hdnwizard').val() == "0") {
            var saveButton = " <a href='#' class='savewthflpy'><span class='glyphicon glyphicon-floppy-save'></span> Save</a>";
            $('#btnsave').html(saveButton);
        }

        return;
    }

    try
    {
        document.getElementById("btnsave").style.display = 'none';
        document.getElementById("btndelete").style.display = 'none';
        if (type == "new") {
            if (rights == 'New' || rights == 'Add') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Edit') {
                document.getElementById("btnsave").style.display = 'none';
            }
            else if (rights == 'Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
            }
            else if (rights == 'Add Edit') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Add Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Edit Delete') {
                document.getElementById("btnsave").style.display = 'none';
                document.getElementById("btndelete").style.display = 'inline-block';
            }
            else {
                document.getElementById("btnsave").style.display = 'none';
                document.getElementById("btndelete").style.display = 'none';
            }
        }
        if (type == "edit") {
            if (rights == 'New' || rights == 'Add') {
                document.getElementById("btnsave").style.display = 'none';
            }
            else if (rights == 'Edit') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
            }
            else if (rights == 'Add Edit') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Add Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
                document.getElementById("btnsave").style.display = 'none';
            }
            else if (rights == 'Edit Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
                document.getElementById("divdelete").style.display = 'inline-block';
            }
            else {
                document.getElementById("btnsave").style.display = 'none';
                document.getElementById("btndelete").style.display = 'none';
            }
        }
    }
    catch (err) {
        alert(err);
    }

}
function editData() {
    $('#btnsave').removeAttr('disabled');
    $('#btnnew').attr('disabled', 'disabled');
    $('#btnedit').attr('disabled', 'disabled');
    $('#btncancel').removeAttr('disabled');
    $('#btncancel1').removeAttr('disabled');
    $('#btndelete').attr('disabled', 'disabled');
    $('#txtSaveType').val("edit");
    checkRights("edit");
}
function getSearchData() {
    var wfid = localStorage.currentformid;
    document.getElementById("divsearchbtn").style.display = 'none';
    var finqry = "";
    var data = "";
    $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=searchqry&wfid=" + wfid, function (responseText) {

        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }
        if (responseText.indexOf("ENDIF") != -1) {
        } else {
            var disfield = document.getElementById('disvalue').value;
            data = replaceFunction(responseText, "dollorsymbolDISFIELD", disfield);
            data = data.replace(/`/g, "'");
            data = replaceWithHeadFields(data);
        }
        $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=searchqrydata&wfid=" + wfid + "&qry=" + data, function (responseText) {

            if (responseText.indexOf("Exception") != -1) {
                alert("Error" + responseText);
            } else {
                $("#tabsearchdata").find("tr").remove();
                $("#tabsearchdata").append(responseText);
            }
        });
    });
}
function fillPrints() {
    var wfid = localStorage.currentformid;
    $.get(localStorage.ipadrs + "/WebFormSave1?wfid=" + wfid + "&reqtype=printlist" + mobile, function (responseJson) {
        if (responseJson !== null) {
            var select = document.getElementById("selPrints");
            select.length = 0;
            var mem = responseJson;
            for (var i = 0; i < mem.length; i++) {
                var sourcename = responseJson[i]['TRANSNM'];
                var indexo = responseJson[i]['VALUE'];
                select.options[select.options.length] = new Option(sourcename, indexo);
            }
        }
    });
}

